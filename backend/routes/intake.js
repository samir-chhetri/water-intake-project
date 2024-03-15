import express from "express";
import { auth } from "../middlewares/auth.js";
import {
  addIntake,
  createIntakeGoal,
  getTodayIntake,
} from "../controllers/intake.js";

const router = express.Router();

router.get("/", auth, getTodayIntake);

router.post("/goal", auth, createIntakeGoal);

router.patch("/add", auth, addIntake);

export default router;
