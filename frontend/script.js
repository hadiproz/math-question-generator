async function fetchNewQuestion() {
    const loadingElement = document.getElementById('loading');
    const generatedQuestionElement = document.getElementById('generated-question');
  
    // Show the loading indicator
    loadingElement.classList.remove('hidden');
    generatedQuestionElement.innerText = ''; // Optionally clear previous question
  
    try {
      // Make a GET request to your API endpoint
      const response = await fetch('http://localhost:3000/generate-question');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      // Parse the response JSON
      const data = await response.json();
      
      // Update the new question display with the generated question
      generatedQuestionElement.innerText = data.question;
    } catch (error) {
      console.error('Error fetching new question:', error);
      generatedQuestionElement.innerText = 'Error generating question!';
    } finally {
      // Hide the loading indicator after the API call completes
      loadingElement.classList.add('hidden');
    }
  }
  
  // Add an event listener to the button to simulate a wrong answer
  document.getElementById('wrong-answer-btn').addEventListener('click', fetchNewQuestion);  