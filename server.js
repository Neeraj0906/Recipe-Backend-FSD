import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import recipeRoutes from "./routes/recipeRoutes.js";

dotenv.config();

const app = express();

// Middleware
app.use(cors({ origin: "*" })); // Allow all origins (or specify your frontend URL)
app.use(express.json());

// MongoDB Connection
const mongoURI = process.env.MONGO_URI;

mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => {
    console.error("❌ MongoDB Connection Error:", err);
    process.exit(1); // Exit the process if MongoDB fails
  });

// Routes
app.use("/api/recipes", recipeRoutes);

// Root Route
app.get("/", (req, res) => {
  res.send("AI Recipe Generator API is running!");
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));