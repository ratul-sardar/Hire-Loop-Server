import { Router } from "express";
import {
	createCompany,
	getCompanyData,
} from "../controller/recruiter.contorller";

const recruiterRouter = Router();

// Company related api's
recruiterRouter.get("/recruiter/company", getCompanyData);
recruiterRouter.post("/recruiter/company", createCompany);

// Job realted api's
