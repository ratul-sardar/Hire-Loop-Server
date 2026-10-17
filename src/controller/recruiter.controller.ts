import type { RequestHandler, Response } from "express";
import { Company, PLAN_LIMITS } from "../models/company.model";
import { Job } from "../models/job.model";

// Company related controllers
export const getCompanyData: RequestHandler = async (req, res, next) => {
	const { id: user_id } = req.params;

	try {
		const result = await Company.findOne({ owner: user_id });

		if (!result)
			return res
				.status(404)
				.json({ message: "company dosen't exist for this user!" });

		return res.status(200).json(result);
	} catch (e) {
		next(e);
	}
};
export const createCompany: RequestHandler = async (req, res, next) => {
	const payload = await req.body;

	try {
		const result = await Company.create(payload);
		return res.status(200).json(result);
	} catch (e) {
		next(e);
	}
};

// Job realted controllers
export const getCompanyJobs: RequestHandler = async (req, res, next) => {
	const { id: user_id } = req.params;

	try {
		const companyData = await Company.findOne({ owner: user_id });
		if (!companyData) return res.status(404).json({ message: "Not Found!" });

		const jobData = await Job.find({
			$or: [{ postedBy: user_id }, { company: companyData._id }],
		}).sort({ createdAt: -1 });
		return res.status(200).json(jobData);
	} catch (e) {
		next(e);
	}
};
export const createCompanyJob: RequestHandler = async (req, res, next) => {
	const { id: user_id } = req.params;

	try {
		const company = await checkCompanyExist(user_id as string, res);
		if (!company) return;

		const maxJobCount = PLAN_LIMITS[company?.plan as keyof typeof PLAN_LIMITS];

		const activeCount = await Job.countDocuments({
			company: company?._id,
			status: "active",
		});
		if (activeCount >= maxJobCount)
			return res
				.status(403)
				.json({ message: "You have reached your job posting limit" });

		const job = await Job.create({
			...req.body,
			company: company?._id,
			postedBy: user_id,
			status: "active",
		});

		res.status(201).json(job);
	} catch (e) {
		next(e);
	}
};
export const updateCompanyJob: RequestHandler = async (req, res, next) => {
	const { id: job_id } = req.params;
	const user_id = await req.body?.user_id;
	const payload = await req.body?.payload;

	try {
		const company = await checkCompanyExist(user_id, res);
		if (!company) return;

		const job = await Job.findByIdAndUpdate(job_id, payload);
		res.status(204).json(job);
	} catch (e) {
		next(e);
	}
};
export const deleteCompanyJob: RequestHandler = async (req, res, next) => {
	const { id: job_id } = req.params;
	const user_id = await req.body?.user_id;

	try {
		const company = await checkCompanyExist(user_id, res);
		if (!company) return;

		const job = await Job.findByIdAndDelete(job_id);
		res.status(204).json(job);
	} catch (e) {
		next(e);
	}
};

// Controller helper functions
export const checkCompanyExist = async (user_id: string, res: Response) => {
	if (!user_id) {
		res.status(404).json({ message: "User id is requred" });
		return null;
	}
	const company = await Company.findOne({ owner: user_id });

	if (!company) {
		res.status(404).json({ message: "Company not found" });
		return null;
	}
	if (company.status !== "approved") {
		res.status(403).json({ message: "Company is not approved" });
		return null;
	}

	return company;
};
