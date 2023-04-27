const express = require('express');
const router = express.Router();
const {getLogs,setLogs, removeLogs } = require("../controllers/logController.js");

router.post("/", setLogs);
router.get("/", getLogs);
router.delete("/:id", removeLogs);

module.exports = router;