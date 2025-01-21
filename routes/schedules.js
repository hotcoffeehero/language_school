const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('schedules/index', { title: 'Schedules' });
});

router.get('/:year', (req, res) => {
  const year = req.params.year;
  res.render('schedules/year', { title: `Schedules for ${year}`, year });
});

router.get('/day/:date', (req, res) => {
  const date = req.params.date;
  res.render('schedules/day', { title: `Schedule for ${date}`, date });
});

module.exports = router;