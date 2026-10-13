import type { RequestHandler } from "express";
import { Company } from "../models/company.model";

// Company related controllers
export const getCompanyData: RequestHandler = async (req, res, next) => {
	const payload = await req.body;

	try {
		await Company.create(payload);
		res.status(200).json(payload);
	} catch (e) {
		next(e);
	}
};
export const createCompany: RequestHandler = async (req, res, next) => {
	const payload = await req.body;

	try {
		await Company.create(payload);
		res.status(200).json(payload);
	} catch (e) {
		next(e);
	}
};

// Job realted controllers
