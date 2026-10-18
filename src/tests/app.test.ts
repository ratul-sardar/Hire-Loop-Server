import { describe, expect, test } from "bun:test";
import request from "supertest";
import app from "../app";

describe("GET /", () => {
	test("should return 200 and hello world", async () => {
		const res = await request(app).get("/");
		expect(res.status).toBe(200);
		expect(res.text).toBe(`
  <h2>Hello, visitor! Wellcome to the HireLoop Server.</h2>
  <h3>You will find the public Api's below:</h3>
  `);
	});
});
