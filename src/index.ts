import express, { Application } from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import compression from "compression";
import router from "./router";
import connectDB from "./db";
import errorMiddleware from "./middleware/errorHandler";
dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(cookieParser());
app.use(helmet());
app.use(express.json());
app.use(compression());
connectDB();

app.use("/api", router());

app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;
