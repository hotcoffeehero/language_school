const express = require('express');
const router = express.Router();
const db = require('../db'); // Assuming you have a database module

module.exports = (upload) => {
  // Route to get all students
  router.get('/', async (req, res) => {
    try {
      const students = await db.getStudents(); // Fetch all students from the database
      res.render('students/index', { title: 'Students', page: 'students', students });
    } catch (error) {
      console.error('Error fetching students:', error);
      res.status(500).send('Error fetching students');
    }
  });

  // Route to display add student form
  router.get('/add', (req, res) => {
    res.render('students/add_student', { title: 'Add Student' });
  });

  // Route to get a student's profile
  router.get('/:id', async (req, res) => {
    const studentId = req.params.id;
    try {
      const student = await db.getStudentById(studentId); // Fetch student from the database
      if (!student) {
        return res.redirect('/students/add'); // Redirect to add student page if student data is not available
      }
      res.render('students/student_profile', { title: 'Student Profile', student });
    } catch (error) {
      console.error('Error fetching student:', error);
      res.status(500).send('Error fetching student');
    }
  });

  // Route to handle add student form submission with file upload
  router.post('/add', upload.single('photo'), async (req, res) => {
    try {
      const photoUrl = req.file ? `/uploads/${req.file.filename}` : null;

      // Add new student to the database
      await db.addStudent({
        name: req.body.name,
        level: req.body.level,
        email: req.body.email,
        occupation: req.body.occupation,
        phone_number: req.body.phone_number,
        address_line1: req.body.address_line1,
        address_line2: req.body.address_line2,
        postal_code: req.body.postal_code,
        photo_url: photoUrl
      });
      res.redirect('/students');
    } catch (error) {
      console.error('Error adding student:', error);
      res.status(500).send('Error adding student');
    }
  });

  // Route to display edit form
  router.get('/:id/edit', async (req, res) => {
    const studentId = req.params.id;
    try {
      const student = await db.getStudentById(studentId); // Fetch student from the database
      if (!student) {
        return res.redirect('/students/add'); // Redirect to add student page if student data is not available
      }
      res.render('students/edit_student', { title: 'Edit Student Profile', student });
    } catch (error) {
      console.error('Error retrieving student data:', error);
      res.status(500).send('Error retrieving student data');
    }
  });

  // Route to handle edit form submission with file upload
  router.post('/:id/edit', upload.single('photo'), async (req, res) => {
    const studentId = req.params.id;
    try {
      const photoUrl = req.file ? `/uploads/${req.file.filename}` : req.body.photo_url;

      // Update student data in the database
      await db.updateStudent(studentId, {
        name: req.body.name,
        level: req.body.level,
        email: req.body.email,
        occupation: req.body.occupation,
        phone_number: req.body.phone_number,
        address_line1: req.body.address_line1,
        address_line2: req.body.address_line2,
        postal_code: req.body.postal_code,
        photo_url: photoUrl
      });
      res.redirect(`/students/${studentId}`);
    } catch (error) {
      console.error('Error updating student data:', error);
      res.status(500).send('Error updating student data');
    }
  });

  // Route to delete a student
  router.post('/:id/delete', async (req, res) => {
    const studentId = req.params.id;
    try {
      await db.deleteStudent(studentId); // Delete student from the database
      res.redirect('/students?deleted=true'); // Redirect with query parameter for notification
    } catch (error) {
      console.error('Error deleting student:', error);
      res.status(500).send('Error deleting student');
    }
  });

  return router;
};