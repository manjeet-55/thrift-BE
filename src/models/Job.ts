import mongoose, { Schema, Document } from "mongoose";

interface IJob extends Document {
  title: string;
  experience: string;
  specialisms: string[];
  sectorExperience: string[];
  description: string;
  workType: "hybrid" | "remote" | "on-site";
  location: string;
  jobType: "full-time" | "part-time";
  sponsorshipOffered: boolean;
  contractType: "permanent" | "contract" | "temporary";
  relocationOffered: boolean;
  salary: {
    min: number;
    max: number;
    currency: string;
  };
  benefits?: string[];
  project: string;
  qualifications: string[];
  company: Schema.Types.ObjectId;
}

const JobSchema: Schema<IJob> = new Schema(
  {
    title: { type: String, required: true },
    experience: { type: String, required: true },
    specialisms: [{ type: String, required: true }],
    sectorExperience: [{ type: String, required: true }],
    description: { type: String, required: true },
    workType: {
      type: String,
      enum: ["hybrid", "remote", "on-site"],
      required: true,
    },
    location: { type: String, required: true },
    jobType: {
      type: String,
      enum: ["full-time", "part-time"],
      required: true,
    },
    sponsorshipOffered: { type: Boolean, default: false },
    contractType: {
      type: String,
      enum: ["permanent", "contract", "temporary"],
      required: true,
    },
    relocationOffered: { type: Boolean, default: false },
    salary: {
      min: { type: Number, required: true },
      max: { type: Number, required: true },
      currency: { type: String, default: "USD", required: true },
    },
    benefits: [{ type: String }],
    project: { type: String },
    qualifications: [{ type: String }],
    company: {
      type: Schema.Types.ObjectId,
      ref: "Company",
      required: true,
    },
  },
  { timestamps: true }
);

const Job = mongoose.model<IJob>("Job", JobSchema);

export default Job;
