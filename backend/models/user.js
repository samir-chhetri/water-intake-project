import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    trim: true,
    minLength: 3,
    maxLength: 20,
  },
  password: {
    type: String,
    required: true,
    minLength: 6,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true,
  },
  accessToken: {
    type: String,
  },
  createdAt: Date,
});

export const validateUser = (schema, user) => {
  const validatedUser = schema.safeParse(user);
  return validatedUser;
};

export const UserModel = mongoose.model("User", userSchema);
