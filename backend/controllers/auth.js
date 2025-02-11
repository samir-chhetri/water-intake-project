import { UserModel } from "../models/user.js";
import bcrypt from "bcryptjs";
import { LoginSchema, RegisterSchema } from "../schemas/index.js";
import "dotenv/config";
import jwt from "jsonwebtoken";
import { validateData } from "../utils/validator.js";
const { JsonWebTokenError } = jwt;

const JWT_SECRET = process.env.JWT_SECRET_KEY;

export const register = async (req, res) => {
  try {
    const validatedUser = validateData(RegisterSchema, req.body);

    if (!validatedUser.success) {
      return res.status(400).send({
        error: validatedUser.error.issues[0].message,
      });
    }

    const userExists = await UserModel.findOne({
      email: validatedUser.data.email,
    }).exec();

    if (userExists) {
      return res.status(400).send({
        error: "This email is already used!",
      });
    }

    const { password } = validatedUser.data;
    const hashedPassword = bcrypt.hashSync(password, 10);

    const userData = {
      ...validatedUser.data,
      password: hashedPassword,
      createdAt: new Date(),
    };

    const user = new UserModel(userData);

    await user.save();

    return res.send({
      message: "User was registered successfully!",
    });
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
};

export const login = async (req, res) => {
  try {
    const validatedUser = validateData(LoginSchema, req.body);

    if (!validatedUser.success) {
      return res.status(400).send({
        error: "validation failed",
      });
    }

    const { email, password } = validatedUser.data;

    const user = await UserModel.findOne({ email: email }).exec();

    if (!user) {
      return res.status(401).send({
        error: "Invalid email or password",
      });
    }

    const isPasswordValid = bcrypt.compareSync(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).send({
        error: "Invalid email or password",
      });
    }

    const accessToken = jwt.sign(
      { id: user._id, email: user.email, username: user.username },
      JWT_SECRET,
      { expiresIn: "1d" }
    );

    user.accessToken = accessToken;
    await user.save();

    const userWithoutPassword = {
      id: user._id,
      email: user.email,
      username: user.username,
      createdAt: user.createdAt,
      accessToken: accessToken,
    };

    res.cookie("auth_token", accessToken, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24, // 1 day
      sameSite: "none",
    });

    return res.send({
      message: "User logged in successfully",
      user: userWithoutPassword,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
};

export const logout = async (req, res) => {
  try {
    let authToken = req.headers["authorization"];
    if (!authToken) {
      return res.status(401).send({
        error: "User is not logged in",
      });
    }

    if (authToken) {
      authToken = authToken.split(" ")[1];
    }

    const decoded = jwt.verify(authToken, JWT_SECRET);

    const user = await UserModel.findById(decoded.id).exec();

    if (!user) {
      return res.status(404).send({
        error: "User not found",
      });
    }

    if (user.accessToken !== authToken) {
      return res.status(401).send({
        error: "Invalid access token",
      });
    }

    user.accessToken = null;

    await user.save();

    res.send({
      message: "User logged out successfully",
    });
  } catch (error) {
    console.error(error);

    if (error instanceof JsonWebTokenError) {
      return res.status(401).send({
        error: "Invalid access token",
      });
    }

    res.status(500).send(error);
  }
};
