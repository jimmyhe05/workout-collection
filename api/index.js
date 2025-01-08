import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from "./routes/user.route.js";
import authRoutes from "./routes/auth.route.js";

dotenv.config();

if (!process.env.MONGO || !process.env.JWT_SECRET) {
  throw new Error("Missing required environment variables.");
}

const app = express();
app.use(express.json()); // Middleware to parse JSON requests

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO)
  .then(() => console.log("Connected to the database!"))
  .catch((err) => console.error("Database connection error:", err));

// Routes
app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);

// Error handling middleware
app.use((err, req, res) => {
  res
    .status(err.status || 500)
    .json({ message: err.message || "Server Error" });
});

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server running on port ${process.env.PORT || 3000}!`);
});
