const mysql = require('mysql2');

// Create a connection pool
const pool = mysql.createPool({
  host: '127.0.0.1', // Replace with your DB host if not local
  user: 'root', // Replace with your MySQL username
  password: 'Mysql5000!', // Replace with your MySQL password
  database: 'language_school', // Replace with your DB name
  port: 3306,
  waitForConnections: true,
  connectionLimit: 10, // Maximum number of concurrent connections
  queueLimit: 0
});

// Export the connection pool
const promisePool = pool.promise();

module.exports = {
  getStudents: async () => {
    const [rows] = await promisePool.query('SELECT * FROM students');
    return rows;
  },

  getStudentById: async (id) => {
    const [rows] = await promisePool.query('SELECT * FROM students WHERE id = ?', [id]);
    return rows[0];
  },

  updateStudentById: async (id, data) => {
    const { name, email, enrollment_date } = data;
    await promisePool.query(
      'UPDATE students SET name = ?, email = ?, enrollment_date = ? WHERE id = ?',
      [name, email, enrollment_date, id]
    );
  },

  deleteStudentById: async (id) => {
    await promisePool.query('DELETE FROM students WHERE id = ?', [id]);
  }
};