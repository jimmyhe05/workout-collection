import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

// Basic error response function
const errorResponse = (res, statusCode, message) => {
  res.status(statusCode).json({ success: false, message });
};

// Signup functionality
export const signup = async (req, res) => {
  const { username, email, password } = req.body;

  // Basic validation
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
    // Check if the user already exists
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return errorResponse(res, 409, "Email or username already exists.");
    }

    // Hash the password
    const hashedPassword = bcrypt.hashSync(password, 10);

    // Create and save the new user
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();

    res
      .status(201)
      .json({ success: true, message: "User created successfully!" });
  } catch (error) {
    console.error("Error during signup:", error);
    errorResponse(res, 500, "Something went wrong. Please try again.");
  }
};
