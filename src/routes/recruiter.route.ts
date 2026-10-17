import { Router } from "express";
import {
	createCompany,
	createCompanyJob,
	deleteCompanyJob,
	getCompanyData,
	getCompanyJobs,
	updateCompanyJob,
} from "../controller/recruiter.contorller";

export const recruiterRouter = Router();

// Company related api's
recruiterRouter.get("/company/:id", getCompanyData);
recruiterRouter.post("/company", createCompany);

// Job realted api's
recruiterRouter.get("/company/job/:id", getCompanyJobs);
recruiterRouter.post("/company/job/:id", createCompanyJob);
recruiterRouter.patch("/company/job/:id", updateCompanyJob);
recruiterRouter.delete("/company/job/:id", deleteCompanyJob);
