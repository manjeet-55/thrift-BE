import express, { NextFunction } from "express";
import { getUserByEmail, createUser } from "../services/auth";
import { random } from "../helpers";
import { CustomError } from "../middleware/errorHandler";
import { registerSchemaValidation } from "../validations/auth.validation";

export const register = async (
  req: express.Request,
  res: express.Response,
  next: NextFunction
) => {
  try {
    const { error, value } = registerSchemaValidation.validate(req.body);
    if (error) {
      throw new CustomError(
        error.details.map((detail) => detail.message).join(", "),
        400
      );
    }
    const { email, password, username } = value;
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
