import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import recipeRoutes from "./routes/recipeRoutes.js"; // Import routes

dotenv.config();

const app = express();
app.use(cors({ origin: "https://ai-recipe-generator-delta.vercel.app/" })); // Allow frontend requests
app.use(express.json());

// MongoDB Connection
const mongoURI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.oyul6ke.mongodb.net/your_db_name`;

mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

// Routes
app.use("/api/recipes", recipeRoutes);

// Root Route
app.get("/", (req, res) => {
  res.send("AI Recipe Generator API is running!");
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
