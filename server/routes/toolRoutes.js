const express = require('express');
const router = express.Router();
const {getTools, deleteTools, exportTools} = require('../controller/toolController');

// available to admin only
router.get('/', getTools)
router.delete('/:id', deleteTools)
router.post('/', exportTools)

module.exports = {
  getTools,
  deleteTools,
  exportTools,
}