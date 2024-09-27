import mongoose, { Schema, Document, Types } from "mongoose";

export interface IApplication extends Document {
  candidate: Types.ObjectId;
  job: Types.ObjectId;
  currentStatus: Types.ObjectId;
  statusHistory: {
    status: Types.ObjectId;
    updatedAt: Date;
  }[];
  createdAt: Date;
  notes?: string;
}

const ApplicationSchema: Schema<IApplication> = new Schema(
  {
    candidate: {
      type: Schema.Types.ObjectId,
      ref: "Candidate",
      required: true,
    },
    job: {
      type: Schema.Types.ObjectId,
      ref: "Job",
      required: true,
    },
    currentStatus: {
      type: Schema.Types.ObjectId,
      ref: "HiringStepSchema.steps",
    },
    statusHistory: [
      {
        status: {
          type: Schema.Types.ObjectId,
          ref: "HiringStepSchema.steps",
        },
        updatedAt: { type: Date, default: Date.now },
      },
    ],
    notes: { type: String },
  },
  {
    timestamps: { createdAt: true, updatedAt: true },
  }
);

export const Application = mongoose.model<IApplication>(
  "Application",
  ApplicationSchema
);
