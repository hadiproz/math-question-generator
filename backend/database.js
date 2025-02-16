// backend/database.js
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Define the path for the SQLite database file
const dbPath = path.resolve(__dirname, 'questions.db');

// Open (or create) the database
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
  } else {
    console.log('Connected to the SQLite database.');
  }
});

// Create the questions table if it doesn't exist
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS questions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      question TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `, (err) => {
    if (err) {
      console.error('Error creating questions table:', err.message);
    } else {
      console.log('Questions table ready.');
    }
  });
});

// Function to insert a new question into the database
function insertQuestion(question, callback) {
  const sql = `INSERT INTO questions (question) VALUES (?)`;
  db.run(sql, [question], function (err) {
    if (err) {
      console.error('Error inserting question:', err.message);
      return callback(err);
    }
    callback(null, this.lastID);
  });
}

// Function to retrieve all questions (optional)
function getAllQuestions(callback) {
  const sql = `SELECT * FROM questions ORDER BY created_at DESC`;
  db.all(sql, [], (err, rows) => {
    if (err) {
      console.error('Error retrieving questions:', err.message);
      return callback(err);
    }
    callback(null, rows);
  });
}

module.exports = {
  db,
  insertQuestion,
  getAllQuestions,
};
