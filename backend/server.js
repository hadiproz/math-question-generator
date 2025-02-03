const express = require("express");
const cors = require("cors");

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

app.get("/generate-question", (req, res) => {
    // Generate a simple math question (for demonstration)
    const num1 = Math.floor(Math.random() * 10) + 1;
    const num2 = Math.floor(Math.random() * 10) + 1;
    const newQuestion = `What is ${num1} + ${num2}?`;
  
    // add code to save the new question to database
  
    // Respond with the new question
    res.json({ question: newQuestion });
  });  