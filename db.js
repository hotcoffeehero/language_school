const mysql = require('mysql2');

const pool = mysql.createPool({
  connectionLimit: 10,
  host: '127.0.0.1',
  user: 'root',
  password: 'Mysql5000!',
  database: 'language_school'
});

function generateUniqueId() {
  return new Promise((resolve, reject) => {
    const id = Math.floor(1000000 + Math.random() * 9000000); // Generate a random 7-digit number
    pool.query('SELECT id FROM students WHERE id = ?', [id], (error, results) => {
      if (error) {
        return reject(error);
      }
      if (results.length > 0) {
        // ID already exists, generate a new one
        return resolve(generateUniqueId());
      }
      resolve(id);
    });
  });
}

module.exports = {
  getStudents: () => {
    return new Promise((resolve, reject) => {
      pool.query('SELECT id, name, phone_number, level FROM students', (error, results) => { // Use phone_number instead of phone
        if (error) {
          return reject(error);
        }
        resolve(results);
      });
    });
  },
  getStudentById: (id) => {
    return new Promise((resolve, reject) => {
      pool.query('SELECT * FROM students WHERE id = ?', [id], (error, results) => {
        if (error) {
          return reject(error);
        }
        resolve(results[0]);
      });
    });
  },
  addStudent: (student) => {
    return new Promise(async (resolve, reject) => {
      try {
        const id = await generateUniqueId();
        const query = `
          INSERT INTO students (id, name, email, level, occupation, phone_number, address_line1, address_line2, postal_code, photo_url)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;
        const values = [
          id, student.name, student.email, student.level, student.occupation, student.phone_number,
          student.address_line1, student.address_line2, student.postal_code, student.photo_url
        ];
        pool.query(query, values, (error, results) => {
          if (error) {
            return reject(error);
          }
          resolve(results);
        });
      } catch (error) {
        reject(error);
      }
    });
  },
  updateStudent: (id, student) => {
    return new Promise((resolve, reject) => {
      const query = `
        UPDATE students
        SET name = ?, level = ?, email = ?, occupation = ?, phone_number = ?,
            address_line1 = ?, address_line2 = ?, postal_code = ?, photo_url = ?
        WHERE id = ?
      `;
      const values = [
        student.name, student.level, student.email, student.occupation, student.phone_number,
        student.address_line1, student.address_line2, student.postal_code, student.photo_url, id
      ];
      pool.query(query, values, (error, results) => {
        if (error) {
          return reject(error);
        }
        resolve(results);
      });
    });
  },
  deleteStudent: (id) => {
    return new Promise((resolve, reject) => {
      pool.query('DELETE FROM students WHERE id = ?', [id], (error, results) => {
        if (error) {
          return reject(error);
        }
        resolve(results);
      });
    });
  },
  getAllInstructors: () => {
    return new Promise((resolve, reject) => {
      pool.query('SELECT * FROM instructors', (error, results) => {
        if (error) {
          return reject(error);
        }
        resolve(results);
      });
    });
  }
};