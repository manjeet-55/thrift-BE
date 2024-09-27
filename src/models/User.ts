import mongoose, { Schema, Document } from "mongoose";

enum UserRoles {
  ADMIN = "Admin",
  COMPANY = "Company",
  CANDIDTAE = "Candidate",
}
interface IUser extends Document {
  email: string;
  password: string;
  username: string;
  phone: string;
  role: UserRoles;
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
      required: [true, "Please add a password"],
    },
    username: {
      type: String,
      required: [true, "Please add a username"],
    },
    phone: {
      required: [true, "Please add a phone number"],
    },
    role: {
      type: String,
      enum: UserRoles,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
export const userModel = mongoose.model<IUser>("User", UserSchema);
