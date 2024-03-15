import express from "express";
import authRouter from "./routes/auth.js";
import intakeRouter from "./routes/intake.js";
import mongoose from "mongoose";
import "dotenv/config";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();
const PORT = 3000;
const MONGODB_CONN_URI = process.env.MONGODB_CONNECTION_STRING;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(cookieParser());

// mongodb connection
mongoose
  .connect(MONGODB_CONN_URI, {
    dbName: "water-intake",
  })
  .then(() => {
    console.log("mongodb connected");
  })
  .catch((err) => {
    console.log(err);
  });

// routes
app.use("/auth", authRouter);
app.use("/intake", intakeRouter);

app.listen(PORT, () => {
  console.log(`the server is running at port ${PORT}`);
});
