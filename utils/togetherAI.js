import { Together } from "together-ai";
import dotenv from "dotenv";

dotenv.config();

const together = new Together({
  apiKey: process.env.TOGETHER_API_KEY, // Load API key from .env
});

export default together;
