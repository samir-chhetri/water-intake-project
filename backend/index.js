import express from "express";
import authRouter from "./routes/auth.js";
import mongoose from "mongoose";
import "dotenv/config";
import cookieParser from "cookie-parser";

const app = express();
const PORT = 3000;
const MONGODB_CONN_URI = process.env.MONGODB_CONNECTION_STRING;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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

app.listen(PORT, () => {
  console.log(`the server is running at port ${PORT}`);
});
