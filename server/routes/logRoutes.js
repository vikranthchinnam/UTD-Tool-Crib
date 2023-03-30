const express = require('express');
const router = express.Router();
const {logIn, logOut} = require('../controller/logController');

// available to everyone 
// will use sso node package?

module.exports = {
  logIn,
  logOut,
}