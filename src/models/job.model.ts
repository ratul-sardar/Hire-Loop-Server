import type { InferSchemaType } from "mongoose";
import { model, Schema } from "mongoose";

const jobSchema = new Schema(
	{
		company: {
			type: Schema.Types.ObjectId,
			ref: "Company",
			required: true,
			index: true,
		},
		postedBy: { type: String, required: true, unique: true, index: true },
		title: { type: String, required: true, trim: true },
		category: { type: String, required: true, index: true },
		type: {
			type: String,
			enum: ["full-time", "part-time", "remote", "contract", "internship"],
			required: true,
		},
		salary: {
			min: { type: Number, required: true, min: 0 },
			max: { type: Number, required: true, min: 0 },
			currency: { type: String, default: "USD" },
		},
		location: {
			city: String,
			country: String,
			isRemote: { type: Boolean, default: false },
		},
		deadline: { type: Date, required: true },
		responsibilities: { type: String, required: true },
		requirements: { type: String, required: true },
		benefits: String,
		status: {
			type: String,
			enum: ["active", "closed", "draft"],
			default: "active",
			index: true,
		},
		applicantsCount: { type: Number, default: 0 },
	},
	{ timestamps: true },
);

jobSchema.pre("validate", function () {
	const min = this.salary?.min;
	const max = this.salary?.max;

	if (min != null && max != null && min > max) {
		this.invalidate("salary.max", "Max salary must be ≥ min salary");
	}
});

jobSchema.index({ title: "text" }); // keyword search

export type IJob = InferSchemaType<typeof jobSchema>;
export const Job = model("Job", jobSchema);
