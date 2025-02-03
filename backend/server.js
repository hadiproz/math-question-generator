require('dotenv').config();
const express = require("express");
const cors = require("cors");
const { generateMathQuestion } = require("./openaiIntegration");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Math Question Generator API is running!");
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

app.get("/generate-question", async (req, res) => {
  try {
    // You can dynamically set the prompt based on context. For now, it's hardcoded.
    const prompt = "Generate a math question similar to 'What is 2 + 2?' with different numbers.";
    const question = await generateMathQuestion(prompt);

    // insert question into database here

    res.json({ question });
  } catch (error) {
    res.status(500).json({ question: "Error generating question. Please try again later." });
  }
});