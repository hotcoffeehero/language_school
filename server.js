const express = require('express');
const path = require('path');
const studentsRouter = require('./routes/students');
const db = require('./db'); // Import the database connection

const app = express(); // Initialize the Express application

// Set the port to listen on
const PORT = process.env.PORT || 3000;

// Set EJS as the template engine
app.set('view engine', 'ejs');

// Set the views directory
app.set('views', path.join(__dirname, 'views'));

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Middleware to parse incoming requests
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Use the students router
app.use('/students', studentsRouter);

// Route to render the instructors page
app.get('/instructors', async (req, res) => {
  try {
    const rows = await db.getInstructors(); // Assuming you have a function to get instructors
    res.render('instructors', { title: 'Instructors', instructors: rows });
  } catch (error) {
    console.error('Error retrieving instructor data:', error);
    res.status(500).send('Error retrieving instructor data');
  }
});

// Route to render the schedules page
app.get('/schedules', (req, res) => {
  res.render('schedules', { title: 'Schedules' });
});

// Route to render the settlement page
app.get('/settlement', (req, res) => {
  res.render('settlement', { title: 'Settlement' });
});

// Route to render the homepage => index.ejs.
app.get('/', (req, res) => {
  res.render('index', { title: 'Home', message: 'Welcome to the Language School Management System' });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});