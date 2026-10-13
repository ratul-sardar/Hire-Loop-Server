import mongoose from "mongoose";

const uri = process.env.MONGODB_URI || "";
if (!uri) throw new Error("MONGODB_URI is not defined");

export async function connectToDB() {
	try {
		await mongoose.connect(uri, {
			dbName: "HireLoop",
		});
		console.log("Connected to MongoDB");
	} catch (e) {
		console.log("Error connecting to MongoDB");
		console.log(e);
	}
}
