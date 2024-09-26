import mongoose from "mongoose";

const MONGO_URI =
  "mongodb+srv://akdhandleac:0wLT3USfqQIfwdgb@cluster0.vgmdv.mongodb.net/";

const connectDB = async (): Promise<void> => {
  try {
    const conn = await mongoose.connect(MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error: any) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
