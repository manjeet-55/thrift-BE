import { CustomError } from "../middleware/errorHandler";
import { userModel } from "../models/User";

export const getUserByEmail = async (email: string) => {
  try {
    const user = await userModel.findOne({ email });
    return user;
  } catch (error: any) {
    throw new CustomError(
      `Error fetching user by email: ${error.message}`,
      500
    );
  }
};

export const createUser = async (values: Record<string, any>) => {
  try {
    const userData = await new userModel(values).save();
    return userData;
  } catch (error: any) {
    throw new CustomError(`Error creating user: ${error.message}`, 500);
  }
};
