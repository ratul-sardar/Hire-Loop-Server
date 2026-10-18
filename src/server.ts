import app from "./app";
import { connectToDB } from "./db/database.db";

const port = process.env.SERVER_URI || 8888;

app.listen(port, async () => {
	console.log(`Server running at http://localhost:${port}`);
	await connectToDB();
});
