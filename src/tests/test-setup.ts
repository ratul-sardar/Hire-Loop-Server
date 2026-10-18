// Global test setup
import { afterAll, beforeAll } from "bun:test";
import mongoose from "mongoose";

beforeAll(async () => {
	// Set up test database
	await mongoose.connect(process.env.MONGODB_URI as string);
});

afterAll(async () => {
	// Clean up
	await mongoose.disconnect();
}); // Global test setup
