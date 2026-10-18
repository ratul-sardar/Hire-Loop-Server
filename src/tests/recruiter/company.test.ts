import { afterAll, beforeAll, describe, expect, test } from "bun:test";
import request from "supertest";
import app from "../../app";
import { Company } from "../../models/company.model";

const userId = "demo-user-1234";
const demoCompanydata = {
	owner: userId,
	name: "Demo Company",
	description: "Demo Company Description",
	logo: "https://demo-company-logo.com",
	website: "https://demo-company.com",
	location: "Demo Company Location",
	industry: "Demo Company Industry",
	employeeCount: "1-10",
	status: "approved",
	plan: "free",
} as const;

beforeAll(async () => {
	await Company.create(demoCompanydata);
});
afterAll(async () => {
	await Company.deleteMany({ owner: userId });
});

describe("To test /company/:id api that get's the users company data", () => {
	test("to get company's data", async () => {
		const res = await request(app).get(`/api/v1/recruiter/company/${userId}`);

		expect(res.status).toBe(200);
		expect(res.body.owner).toBe(userId);
	});

	test("returns 404 when the owner has no company", async () => {
		const res = await request(app).get(
			"/api/v1/recruiter/company/no-such-user",
		);

		expect(res.status).toBe(404);
		expect(res.body.message).toBe("company dosen't exist for this user!");
	});
});
