import { userModel } from "../models/User";

export const getUserByEmail = (email: string) => userModel.findOne({ email });
export const createUser = async (values: Record<string, any>) => {
  const userData = await new userModel(values).save();
  console.log(userData);
  return userData;
};
