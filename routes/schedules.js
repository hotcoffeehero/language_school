const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('schedules/index', { title: 'Schedules', page: 'schedules' });
});

router.get('/:year', (req, res) => {
  const year = req.params.year;
  res.render('schedules/year', { title: `Schedules for ${year}`, year, page: 'schedules' });
});

router.get('/day/:date', (req, res) => {
  const date = req.params.date;
  res.render('schedules/day', { title: `Schedule for ${date}`, date, page: 'schedules' });
});

module.exports = router;