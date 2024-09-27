import mongoose, { Schema, Document } from "mongoose";

enum UserRoles {
  ADMIN = "Admin",
  COMPANY = "Company",
  CANDIDATE = "Candidate",
}

enum InvitationStatus {
  PENDING = "Pending",
  ACCEPTED = "Accepted",
  REJECTED = "rejected",
}
interface IUser extends Document {
  email: string;
  password?: string;
  username: string;
  phone: string;
  role: UserRoles;
  isInvited: boolean;
  invitationToken?: string;
  invitationStatus?: InvitationStatus;
}

const UserSchema: Schema = new Schema(
  {
    email: {
      type: String,
      required: [true, "Please add an email"],
      unique: true,
    },
    password: {
      type: String,
    },
    username: {
      type: String,
      required: [true, "Please add a username"],
    },
    phone: {
      type: String,
      required: [true, "Please add a phone number"],
    },
    role: {
      type: String,
      enum: UserRoles,
      required: true,
    },
    isInvited: {
      type: Boolean,
      default: false,
    },
    invitationToken: {
      type: String,
    },
    invitationStatus: {
      type: String,
      enum: InvitationStatus,
      default: "Pending",
    },
  },
  {
    timestamps: true,
  }
);

export const userModel = mongoose.model<IUser>("User", UserSchema);
