import mongoose, { Schema, Types } from "mongoose";

enum TeamRoles {
  HR = "hr",
  RECRUITER = "recruiter",
  MANAGER = "manager",
  PANELIST = "panelist",
  ADMIN = "admin",
}
interface IMember {
  userId: Types.ObjectId;
  role: TeamRoles;
  invitedAt: Date;
  JoinedAt: Date;
  joiningStatus: "pending" | "active";
}

interface ITeam extends Document {
  companyId: Types.ObjectId;
  members: IMember[];
}

const TeamSchema: Schema<ITeam> = new mongoose.Schema(
  {
    companyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
      required: true,
    },
    members: [
      {
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
        role: {
          type: String,
          enum: TeamRoles,
          required: true,
        },
        invitedAt: {
          type: Date,
          default: Date.now,
        },
        joinedAt: Date,
        status: {
          type: String,
          enum: ["pending", "active"],
          default: "pending",
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Team = mongoose.model("Team", TeamSchema);
