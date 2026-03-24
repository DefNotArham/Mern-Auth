// NPMS
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

// import files
import connectDB from "./db/connectDb.js";
import authRoutes from "./routes/auth.route.js";

dotenv.config();

const PORT = process.env.PORT;
const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

app.use(cookieParser());
app.use(express.json());
app.use("/api/auth", authRoutes);

// run server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB();
});
