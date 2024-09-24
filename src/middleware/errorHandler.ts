import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { ValidationError } from "joi";
import { JsonWebTokenError, TokenExpiredError } from "jsonwebtoken";
import { responseGenerator } from "../helpers";

export class CustomError extends Error {
  statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
  }
}

const ERROR = {
  INTERNAL_SERVER_ERROR: "Internal Server Error",
  TOKEN_EXPIRED: "Token is expired",
  INVALID_TOKEN: "Invalid token",
};

const errorMiddleware = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error instanceof ValidationError) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json(responseGenerator({}, StatusCodes.BAD_REQUEST, error.message));
  }

  if (error instanceof CustomError) {
    return res
      .status(error.statusCode)
      .json(responseGenerator({}, error.statusCode, error.message));
  }

  if (error instanceof TokenExpiredError) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json(
        responseGenerator({}, StatusCodes.UNAUTHORIZED, ERROR.TOKEN_EXPIRED)
      );
  }

  if (error instanceof JsonWebTokenError) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json(
        responseGenerator({}, StatusCodes.UNAUTHORIZED, ERROR.INVALID_TOKEN)
      );
  }

  return res
    .status(StatusCodes.INTERNAL_SERVER_ERROR)
    .json(
      responseGenerator(
        {},
        StatusCodes.INTERNAL_SERVER_ERROR,
        error.message || ERROR.INTERNAL_SERVER_ERROR
      )
    );
};

export default errorMiddleware;
