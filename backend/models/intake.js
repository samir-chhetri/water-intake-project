import mongoose from "mongoose";

const Schema = mongoose.Schema;

const intakeSchema = new Schema({
  intakeGoal: {
    type: Number,
    required: true,
    min: 1,
  },
  date: {
    type: String,
    required: true,
  },
  waterIntake: {
    type: Number,
    min: 0,
    default: 0,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

export const IntakeModel = mongoose.model("Intake", intakeSchema);
