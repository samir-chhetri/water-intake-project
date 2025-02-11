import express from "express";
import mongoose from "mongoose";
import authRouter from "./routes/auth.js";
import intakeRouter from "./routes/intake.js";
// import emailRouter from "./routes/emailRoute.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import bodyParser from "body-parser";
import "dotenv/config";

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
app.use(bodyParser.json());

// MongoDB connection
mongoose
  .connect(MONGODB_CONN_URI, {
    dbName: "water-intake",
  })
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => {
    console.log(err);
  });

// Routes
app.use("/auth", authRouter);
app.use("/intake", intakeRouter);


app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
});
