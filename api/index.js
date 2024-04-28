import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { conncectDB } from "./db/createConnection.js";
import cookieParser from "cookie-parser";
import useRouter from "./routes/user.route.js";
import authRouter from "./routes/auth.route.js";

const app = express();

app.use(express.json());
app.use(cors());
app.use(cookieParser());
dotenv.config();

app.listen(3000, () => {
  conncectDB();
  console.log(`server is running at port 3000`);
});
app.use("/api/user", useRouter);
app.use("/api/auth", authRouter);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal server error";
  return res.status(statusCode).json({
    success: false,
    message: message,
    statusCode: statusCode,
  });
});
// app.get("/", (req, res) => {
//   res.json({ message: "test api working" });
// });
