import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

// Basic error response function
const errorResponse = (res, statusCode, message) => {
  return res.status(statusCode).json({ success: false, message });
};

// Signup functionality
export const signup = async (req, res) => {
  const { username, email, password } = req.body;

  // Validate request
  if (!username || !email || !password) {
    return errorResponse(res, 400, "All fields are required.");
  }
  if (password.length < 6) {
    return errorResponse(
      res,
      400,
      "Password must be at least 6 characters long."
    );
  }

  try {
    // Check for existing user
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return errorResponse(res, 409, "Invalid credentials.");
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();

    res
      .status(201)
      .json({ success: true, message: "User created successfully!" });
  } catch (error) {
    console.error("Error during signup:", error);
    errorResponse(res, 500, "Internal server error.");
  }
};

// Signin functionality
export const signin = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return errorResponse(res, 400, "All fields are required.");
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return errorResponse(res, 404, "Invalid credentials.");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return errorResponse(res, 401, "Invalid credentials.");
    }

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1m" }
    );

    res
      .status(200)
      .cookie("access_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
      })
      .json({ success: true, user: { id: user._id, username: user.username } });
  } catch (error) {
    console.error("Error during signin:", error);
    errorResponse(res, 500, "Internal server error.");
  }
};
