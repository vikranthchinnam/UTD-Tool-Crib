const express = require('express');
const router = express.Router();
const {getTeams, setTeams, deleteTeams, exportTeams} = require('../controllers/teamController');

// available to admin only
router.get('/', getTeams)
router.post('/', setTeams)
router.delete('/:id', deleteTeams)
router.post('/', exportTeams)

module.exports = router