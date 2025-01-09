const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  const years = Array.from({ length: 10 }, (_, i) => 2025 + i);
  res.render('schedules/index', { title: 'Schedules', years });
});

router.get('/:year', (req, res) => {
  const year = req.params.year;
  res.render('schedules/year', { title: `Schedules for ${year}`, year });
});

module.exports = router;