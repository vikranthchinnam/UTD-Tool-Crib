const express = require('express');
const router = express.Router();
const {checkOut, checkIn} = require('../controller/checkoutController');

// available to everyone
router.post('/', checkOut)
router.post('/', checkIn)

module.exports = {
  checkOut,
  checkIn,
}