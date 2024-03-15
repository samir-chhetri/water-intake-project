import { IntakeModel } from "../models/intake.js";
import { getDateString } from "../utils/date.js";

export const getTodayIntake = async (req, res) => {
  try {
    const user = req.user;
    const date = getDateString();

    const intake = await IntakeModel.findOne({ userId: user.id, date }).exec();

    if (!intake) {
      return res.status(200).json({
        intakeGoal: 1,
        waterIntake: 0,
        completed: false,
      });
    }

    return res.status(200).json(intake);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const createIntakeGoal = async (req, res) => {
  try {
    const user = req.user;

    const { intakeGoal } = req.body;

    if (!intakeGoal || intakeGoal < 1) {
      return res.status(400).json({ error: "Invalid intake goal" });
    }

    const date = getDateString();

    const existingIntake = await IntakeModel.findOne({
      userId: user.id,
      date,
    }).exec();

    if (existingIntake) {
      existingIntake.intakeGoal = intakeGoal;
      await existingIntake.save();
    }

    const newIntake = new IntakeModel({
      intakeGoal,
      date,
      userId: user.id,
    });

    await newIntake.save();

    return res.status(201).json({
      message: "Intake goal set successfully",
      intake: newIntake,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const addIntake = async (req, res) => {
  try {
    const user = req.user;

    const { intakeAmount } = req.body;

    if (!intakeAmount || intakeAmount < 1) {
      return res.status(400).json({ error: "Invalid intake amount" });
    }

    const date = getDateString();

    const existingIntake = await IntakeModel.findOne({
      userId: user.id,
      date,
    }).exec();

    if (!existingIntake) {
      return res.status(404).json({ error: "Intake goal not set for today" });
    }

    existingIntake.waterIntake += intakeAmount;

    if (existingIntake.waterIntake >= existingIntake.intakeGoal) {
      existingIntake.completed = true;
    }

    await existingIntake.save();

    return res.status(200).json({
      message: "Intake added successfully",
      intake: existingIntake,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
