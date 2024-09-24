import mongoose, { Schema, Document } from "mongoose";

interface IUser extends Document {
  email: string;
  password: string;
  username: string;
  createdAt: Date;
}

const UserSchema: Schema = new Schema({
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
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
export const userModel = mongoose.model<IUser>("User", UserSchema);

export const getUserByEmail = (email: string) => userModel.findOne({ email });
export const createUser = async (values: Record<string, any>) => {
  const userData = await new userModel(values).save();
  console.log(userData);
  return userData;
};
