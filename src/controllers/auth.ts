import express, { NextFunction } from "express";
import { getUserByEmail, createUser } from "../services/auth";
import { random } from "../helpers";
import { CustomError } from "../middleware/errorHandler";

export const register = async (
  req: express.Request,
  res: express.Response,
  next: NextFunction
) => {
  try {
    const { email, password, username } = req.body;
    if (!email || !password || !username) {
      throw new CustomError(
        "All fields (email, password, username) are required",
        400
      );
    }
    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      throw new CustomError("User already exists", 400);
    }
    const salt = random();
    const user = await createUser({
      username,
      email,
      password,
    });

    return res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};
