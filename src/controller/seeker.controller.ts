import type { RequestHandler } from "express";
import { Company } from "../models/company.model";
import { Job } from "../models/job.model";

// Company related controllers
export const getAllCompany: RequestHandler = async (req, res, next) => {
	try {
		const companyData = await Company.find({}).sort({ createdAt: -1 });

		if (!companyData)
			return res.status(404).json({ message: "No Company available to show" });
		return res.status(200).json(companyData);
	} catch (e) {
		next(e);
	}
};
export const getOneCompany: RequestHandler = async (req, res, next) => {
	const { id: company_id } = req.params;

	try {
		const companyData = await Job.findById(company_id).exec();

		if (!companyData)
			return res
				.status(404)
				.json({ message: "Couldn't find the item you are looking for!" });
		return res.status(200).json(companyData);
	} catch (e) {
		next(e);
	}
};

// Job realted controllers
export const getAllJobs: RequestHandler = async (req, res, next) => {
	try {
		const jobData = await Job.find({}).sort({ createdAt: -1 });

		if (!jobData)
			return res.status(404).json({ message: "No jobs available to show" });
		return res.status(200).json(jobData);
	} catch (e) {
		next(e);
	}
};
export const getOneJob: RequestHandler = async (req, res, next) => {
	const { id: job_id } = req.params;

	try {
		const jobData = await Job.findById(job_id).exec();

		if (!jobData)
			return res
				.status(404)
				.json({ message: "Couldn't find the item you are looking for!" });
		return res.status(200).json(jobData);
	} catch (e) {
		next(e);
	}
};
