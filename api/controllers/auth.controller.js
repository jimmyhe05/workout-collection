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
      return errorResponse(
        res,
        409,
        "Email or username already exists. Please try another."
      );
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
  const { login, password } = req.body;

  if (
    !login ||
    !password ||
    typeof login !== "string" ||
    typeof password !== "string"
  ) {
    return errorResponse(res, 400, "All fields are required.");
  }

  try {
    // Detect if input is email or username
    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(login);

    // Find user by email or username
    const validUser = await User.findOne({
      $or: [
        { email: isEmail ? login : null },
        { username: !isEmail ? login : null },
      ],
    });

    // Validate password if user exists
    const isPasswordValid = validUser
      ? await bcrypt.compare(password, validUser.password)
      : false;

    // Determine error message
    const errorMessage = isEmail
      ? "Invalid email or password."
      : "Invalid username or password.";

    // Return error response if validation fails
    if (!validUser || !isPasswordValid) {
      return res.status(401).json({ message: errorMessage });
    }

    // Ensure JWT secret exists
    if (!process.env.JWT_SECRET) {
      console.error("JWT_SECRET is not defined in the environment variables.");
      return errorResponse(res, 500, "Server configuration error.");
    }

    // Generate JWT token
    const token = jwt.sign(
      { email: validUser.email, id: validUser._id },
      process.env.JWT_SECRET,
      { expiresIn: "1m" }
    );

    // Respond with a token and user details
    res
      .status(200)
      .cookie("access_token", token, {
        httpOnly: true,
        sameSite: "Strict",
        secure: process.env.NODE_ENV === "production",
      })
      .json({
        success: true,
        message: "Login successful.",
        user: {
          id: validUser._id,
          username: validUser.username,
          email: validUser.email,
        },
      });
  } catch (error) {
    console.error("Error during signin:", error);
    errorResponse(res, 500, "Something went wrong. Please try again.");
  }
};
