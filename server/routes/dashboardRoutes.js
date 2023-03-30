const express = require('express');
const router = express.Router();
const {getDashboard} = require('../controller/dashboardController');

// available to admin only
router.get('/', getDashboard)

module.exports = {
  getDashboard
}