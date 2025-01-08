import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const errorResponse = (res, statusCode, message) => {
  return res.status(statusCode).json({ success: false, message });
};

export const signup = async (req, res) => {
  const { username, email, password } = req.body;

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
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return errorResponse(
        res,
        409,
        "Email or username already exists. Please try another."
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);
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
    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(login);

    const validUser = await User.findOne({
      $or: [
        { email: isEmail ? login : null },
        { username: !isEmail ? login : null },
      ],
    });

    const isPasswordValid = validUser
      ? await bcrypt.compare(password, validUser.password)
      : false;

    const errorMessage = isEmail
      ? "Invalid email or password."
      : "Invalid username or password.";

    if (!validUser || !isPasswordValid) {
      return res.status(401).json({ message: errorMessage });
    }

    if (!process.env.JWT_SECRET) {
      console.error("JWT_SECRET is not defined in the environment variables.");
      return errorResponse(res, 500, "Server configuration error.");
    }

    const token = jwt.sign(
      { email: validUser.email, id: validUser._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

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

export const google = async (req, res) => {
  const { name, email, googlePhotoURL } = req.body;

  if (!name || !email || !googlePhotoURL) {
    return res
      .status(400)
      .json({ success: false, message: "All fields are required." });
  }

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      const token = jwt.sign(
        { email: existingUser.email, id: existingUser._id },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
      );
      const { password, ...rest } = existingUser._doc;
      return res
        .status(200)
        .cookie("access_token", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
        })
        .json(rest);
    }

    const generatedPassword = Math.random().toString(36).slice(-16); // Combined for more complexity
    const hashedPassword = await bcrypt.hash(generatedPassword, 10);

    const username =
      name.toLowerCase().replace(/\s+/g, "") +
      Math.random().toString(9).slice(-4);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      profilePicture: googlePhotoURL,
    });
    await newUser.save();

    const token = jwt.sign(
      { email: newUser.email, id: newUser._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );
    const { password, ...rest } = newUser._doc;

    res
      .status(201)
      .cookie("access_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      })
      .json(rest);
  } catch (error) {
    console.error("Error during Google OAuth:", error);
    res.status(500).json({
      success: false,
      message: "Something went wrong. Please try again.",
    });
  }
};
