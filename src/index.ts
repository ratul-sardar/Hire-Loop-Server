import cors from "cors";
import dotenv from "dotenv";
import express, { type Express, type Request, type Response } from "express";

dotenv.config();

const app: Express = express();
app.use(cors());
app.use(express.json());

const port = 9696;

app.get("/", (req: Request, res: Response) => {
	res.send("Hello World!");
});

app.listen(port, () => {
	console.log(`Server running at http://localhost:${port}`);
});
