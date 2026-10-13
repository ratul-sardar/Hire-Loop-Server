import type { InferSchemaType } from "mongoose";
import { model, Schema } from "mongoose";

export const PLAN_LIMITS = { free: 3, growth: 10, enterprise: 50 } as const;

const companySchema = new Schema(
	{
		owner: {
			type: String,
			required: true,
			unique: true,
			index: true,
		},
		name: { type: String, required: true, trim: true },
		logo: { type: String, required: true }, // image URL after upload
		industry: { type: String, required: true, index: true },
		website: { type: String, trim: true },
		location: { type: String, required: true },
		employeeCount: {
			type: String,
			enum: ["1-10", "11-50", "51-200", "201-500", "501-1000", "1000+"],
			required: true,
		},
		description: { type: String, required: true, maxlength: 500 },
		status: {
			type: String,
			enum: ["pending", "approved", "rejected"],
			default: "pending",
			index: true,
		},
		plan: { type: String, enum: Object.keys(PLAN_LIMITS), default: "free" },
	},
	{ timestamps: true },
);

export type ICompany = InferSchemaType<typeof companySchema>;
export const Company = model("Company", companySchema);
