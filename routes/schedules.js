const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('schedules/index', { title: 'Schedules' });
});

router.get('/:year', (req, res) => {
  const year = req.params.year;
  res.render('schedules/year', { title: `Schedules for ${year}`, year });
});

module.exports = router;