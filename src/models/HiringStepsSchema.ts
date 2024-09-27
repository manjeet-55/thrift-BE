import mongoose, { Schema, Document } from "mongoose";

interface IHiringStep {
  _id: mongoose.Schema.Types.ObjectId;
  name: string;
}

interface IHiringSteps extends Document {
  companyId: mongoose.Schema.Types.ObjectId;
  steps: IHiringStep[];
}

const HiringStepSchema: Schema = new Schema(
  {
    companyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
      required: true,
    },
    steps: [
      {
        _id: {
          type: mongoose.Schema.Types.ObjectId,
          default: new mongoose.Types.ObjectId(),
        },
        name: {
          type: String,
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

export const hiringStepsModel = mongoose.model<IHiringSteps>(
  "HiringSteps",
  HiringStepSchema
);
