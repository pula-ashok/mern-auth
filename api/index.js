import express from "express";
import dotenv from "dotenv";
import { conncectDB } from "./db/createConnection.js";
import useRouter from "./routes/user.router.js";

const app = express();

dotenv.config();

app.listen(3000, () => {
  conncectDB();
  console.log(`server is running at port 3000`);
});
app.use("/api/user", useRouter);

// app.get("/", (req, res) => {
//   res.json({ message: "test api working" });
// });
