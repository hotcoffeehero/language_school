const express = require('express');
const router = express.Router();
const db = require('../db'); // Assuming you have a database module

// Route to get all students
router.get('/', async (req, res) => {
  try {
    const students = await db.getStudents(); // Fetch students from the database
    res.render('students', { title: 'Students', students });
  } catch (error) {
    console.error('Error retrieving student data:', error);
    res.status(500).send('Error retrieving student data');
  }
});

// Route to get a student's profile
router.get('/:id', async (req, res) => {
  const studentId = req.params.id;
  try {
    const student = await db.getStudentById(studentId); // Fetch student from the database
    res.render('student_profile', { student });
  } catch (error) {
    console.error('Error retrieving student data:', error);
    res.status(500).send('Error retrieving student data');
  }
});

// Route to update a student's profile
router.post('/:id', async (req, res) => {
  const studentId = req.params.id;
  const updatedData = req.body;
  try {
    await db.updateStudentById(studentId, updatedData); // Update student in the database
    res.redirect(`/students/${studentId}`);
  } catch (error) {
    console.error('Error updating student data:', error);
    res.status(500).send('Error updating student data');
  }
});

// Route to delete a student's profile
router.post('/:id/delete', async (req, res) => {
  const studentId = req.params.id;
  try {
    await db.deleteStudentById(studentId); // Delete student from the database
    res.redirect('/students');
  } catch (error) {
    console.error('Error deleting student data:', error);
    res.status(500).send('Error deleting student data');
  }
});

module.exports = router;