import cors from "cors";
import dotenv from "dotenv";
import express, { type Express, type Request, type Response } from "express";
import { connectToDB } from "./db/database.db";
import { errorHandler } from "./middleware/error.middleware";
import { recruiterRouter } from "./routes/recruiter.route";
import { seekerRouter } from "./routes/seeker.route";

dotenv.config();

const app: Express = express();
app.use(cors());
app.use(express.json());

// API's
app.use("/api/v1/recruiter", recruiterRouter);
app.use("/api/v1/", seekerRouter);

// Error Handler
app.use(errorHandler);

// Bottom of the file
const serverDescription = `
  <h2>Hello, visitor! Wellcome to the HireLoop Server.</h2>
  <h3>You will find the public Api's below:</h3>
  `;
app.get("/", (req: Request, res: Response) => {
	res.send(serverDescription);
});
export default app;
