const express = require('express');
const router = express.Router();
const {getLogs,setLogs, removeLogs , exportLogs} = require("../controllers/logController.js");

router.post("/", setLogs);
router.get("/", getLogs);
router.delete("/:id", removeLogs);
router.post("/export/", exportLogs);
module.exports = router;