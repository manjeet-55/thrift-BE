import mongoose, { Schema, Document } from "mongoose";

export interface ICandidate extends Document {
  userId: Schema.Types.ObjectId;
  resume?: string;
  experience?: number;
  qualifications?: string[];
  specialisms?: string[];
  jobsApplied: mongoose.Types.ObjectId[];
  profileImage?: string;
  socialLinks?: {
    linkedIn?: string;
    github?: string;
    portfolio?: string;
  };
  availabilityStatus?: "available" | "unavailable";
  references?: {
    name: string;
    contact: string;
    relation: string;
  }[];
  notes?: string;
  feedback: string;
  createdAt: Date;
  updatedAt: Date;
}

const CandidateSchema: Schema<ICandidate> = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      reuired: true,
    },
    resume: { type: String },
    experience: { type: Number },
    qualifications: [{ type: String }],
    specialisms: [{ type: String }],
    jobsApplied: [{ type: Schema.Types.ObjectId, ref: "Application" }],
    profileImage: { type: String },
    socialLinks: {
      linkedIn: { type: String },
      github: { type: String },
      portfolio: { type: String },
    },
    availabilityStatus: {
      type: String,
      enum: ["available", "unavailable"],
      default: "available",
    },
    references: [
      {
        name: { type: String, required: true },
        contact: { type: String, required: true },
        relation: { type: String, required: true },
      },
    ],
    notes: { type: String },
    feedback: { type: String },
  },
  { timestamps: true }
);

export const Candidate = mongoose.model<ICandidate>(
  "Candidate",
  CandidateSchema
);
