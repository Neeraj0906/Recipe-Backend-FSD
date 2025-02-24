import { Together } from "together-ai";
import dotenv from "dotenv";

dotenv.config();

const together = new Together({
  apiKey: process.env.TOGETHER_API_KEY,
});

export default together;