import app from "./app";
import connectDB from "./db";

const PORT = process.env.PORT || 8080;

connectDB();
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
