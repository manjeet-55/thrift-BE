import express, { Application } from 'express';
import dotenv from 'dotenv';
import cors from "cors";
import helmet from "helmet";
dotenv.config();

const app: Application = express();
app.use(cors());
app.use(helmet());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

export default app;
