const express = require('express');
const router = express.Router();
const Project = require('../models/Project');

// GET /admin/dashboard
router.get('/dashboard', async (req, res) => {
  try {
    const projects = await Project.find();
    res.render('dashboard', { projects });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
