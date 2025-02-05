import express from "express";
import together from "../utils/togetherAI.js"; // Import Together AI instance
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();

router.post("/generate", async (req, res) => {
    try {
      const { ingredients } = req.body;
      console.log("Received ingredients:", ingredients);  // Log the ingredients
  
      if (!ingredients || ingredients.length === 0) {
        return res.status(400).json({ error: "Please provide ingredients." });
      }
  
      const prompt = `I have these ingredients: ${ingredients.join(
        ", "
      )}. Suggest a simple recipe with clear, numbered step-by-step instructions.`;
  
      const response = await together.chat.completions.create({
        model: "deepseek-ai/DeepSeek-R1-Distill-Llama-70B-free",
        messages: [{ role: "user", content: prompt }],
        max_tokens: 300,
      });
  
      console.log("AI Response:", response);
  
      const recipeText =
        response.choices[0]?.message?.content?.trim() || "No recipe found.";
  
      const steps = recipeText.split(/\d+\.\s+/).filter((step) => step.trim());
  
      res.json({ steps });
    } catch (error) {
      console.error("Together AI API Error:", error);
      res.status(500).json({ error: "Failed to generate recipe" });
    }
  });
  
export default router;
