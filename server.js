const express = require('express');
const path = require('path');
const multer = require('multer');
const studentsRouter = require('./routes/students');
const schedulesRouter = require('./routes/schedules');
const instructorsRouter = require('./routes/instructors'); // Add this line

const app = express();

// Middleware to parse incoming requests
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Set the view engine to EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Configure Multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/uploads');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage });

// Use the students router
app.use('/students', studentsRouter(upload));
app.use('/schedules', schedulesRouter);
app.use('/instructors', instructorsRouter); // Add this line

// Route to render the homepage => index.ejs.
app.get('/', (req, res) => {
  res.render('index', { title: 'Home', message: 'Welcome to the Language School Management System', page: 'home' });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});