const asyncHandler = require('express-async-handler');
const queryLogs = require("../db-service");

/*
@desc Fetches the logs table from the database
@route GET /logs
@access Private
*/
const getLogs = asyncHandler(async (req, res) => {
    queryLogs.query("SELECT * FROM managelogs ORDER BY id DESC", (err, result) => {
        if (err) {
            console.log(err);
        }
        else {
            res.send(result);
        }
    })
});

const setLogs = asyncHandler(async (req, res) => {
    const postNumber = req.body.teamNumber;
    const postTableNumber = req.body.tableNumber;
    const postMember = req.body.teamMember;
    const postDate = req.body.dueDate;
    const postLimit = req.body.toolLimit;
    const postName = req.body.toolName;
    const postNotes = req.body.notes;
    queryLogs.query("INSERT INTO managelogs (teamNumber,tableNumber, teamMember, dueDate, toolLimit, toolName, notes) VALUES (?, ?, ?, ?, ?, ?, ?)", [postNumber,postTableNumber, postMember, postDate, postLimit, postName, postNotes], (err, result) => {
        if(err){
            console.log(err);
        }
        else{
            res.send("VALUES Inserted");
        }
    });
});

const removeLogs = asyncHandler(async (req, res) => {
    const id = req.params.id;
    queryLogs.query("DELETE FROM managelogs WHERE id = ?",  id, (err) => {
        if(err){
            console.log(err);
        }
        else {
            res.send(`Team ${id} deleted`);
        }
    });
});

module.exports = {
    getLogs,
    removeLogs,
    setLogs,
}