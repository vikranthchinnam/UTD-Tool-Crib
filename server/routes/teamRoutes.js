const express = require('express');
const router = express.Router();
const {getTeams, deleteTeams, exportTeams} = require('../controller/teamController');

// available to admin only
router.get('/', getTeams)
router.delete('/:id', deleteTeams)
router.post('/', exportTeams)

module.exports = {
  getTeams,
  deleteTeams,
  exportTeams,
}