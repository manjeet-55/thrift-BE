import express, { Application } from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import compression from "compression";
import router from "./router";
import connectDB from "./db";
dotenv.config();

const app: Application = express();

app.use(cors());
app.use(cookieParser());
app.use(helmet());
app.use(express.json());
app.use(compression());

app.use("/", router());

export default app;
