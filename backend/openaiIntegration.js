require('dotenv').config();
const { OpenAI } = require("openai");

const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY,
//   defaultHeaders: {
//     "HTTP-Referer": process.env.HTTP_REFERER || "", // Optional: your site URL
//     "X-Title": process.env.X_TITLE || "", // Optional: your site title
//   },
});

async function generateMathQuestion(prompt) {
  try {
    const completion = await openai.chat.completions.create({
      model: "google/gemini-flash-1.5-8b-exp",
      messages: [
        {
          role: "system",
          content: "You are a helpful assistant that creates math questions.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      max_tokens: 50, // Adjust as needed
    });

    return completion.choices[0].message.content.trim();
  } catch (error) {
    console.error("Error generating question:", error);
    throw error;
  }
}

// For testing purposes (uncomment if needed):
// generateMathQuestion("Generate a math question similar to 'What is 2 + 2?' with different numbers.")
//   .then(question => console.log("Generated Question:", question))
//   .catch(error => console.error(error));

// Export the function for use in your server code.
module.exports = { generateMathQuestion };