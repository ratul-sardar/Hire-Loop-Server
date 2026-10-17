import { Router } from "express";
import {
	getAllCompany,
	getAllJobs,
	getOneCompany,
	getOneJob,
} from "../controller/seeker.controller";

export const seekerRouter = Router();

// Company related api's
seekerRouter.get("/jobs", getAllCompany);
seekerRouter.get("/jobs/:id", getOneCompany);

// Job realted api's
seekerRouter.get("/jobs", getAllJobs);
seekerRouter.get("/jobs/:id", getOneJob);
