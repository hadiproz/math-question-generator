// Function to call the backend API and fetch a new question
async function fetchNewQuestion() {
    try {
      // Make a GET request to API endpoint
      const response = await fetch('http://localhost:3000/generate-question');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      // Parse the response JSON
      const data = await response.json();
      
      // Update the new question display with the generated question
      document.getElementById('generated-question').innerText = data.question;
    } catch (error) {
      console.error('Error fetching new question:', error);
      document.getElementById('generated-question').innerText = 'Error generating question!';
    }
  }
  
  // Add an event listener to the button to simulate a wrong answer
  document.getElementById('wrong-answer-btn').addEventListener('click', fetchNewQuestion);
  