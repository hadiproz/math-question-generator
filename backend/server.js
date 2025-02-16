require('dotenv').config();
const express = require("express");
const cors = require("cors");
const { generateMathQuestion } = require("./openaiIntegration");
const { insertQuestion, getAllQuestions } = require("./database");

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
    const prompt = "Generate a math question similar to 'What is 2 + 2?' with different numbers.";
    const question = await generateMathQuestion(prompt);

    // Store the question in the database
    insertQuestion(question, (err, questionId) => {
      if (err) {
        console.error('Error saving question to database:', err);
        return res.status(500).json({ error: "Error saving question to database" });
      }
      res.json({ 
        question,
        questionId,
        message: "Question generated and saved successfully" 
      });
    });
  } catch (error) {
    res.status(500).json({ error: "Error generating question. Please try again later." });
  }
});

// New endpoint to get all questions
app.get("/questions", (req, res) => {
  getAllQuestions((err, questions) => {
    if (err) {
      console.error('Error retrieving questions:', err);
      return res.status(500).json({ error: "Error retrieving questions" });
    }
    res.json({ questions });
  });
});