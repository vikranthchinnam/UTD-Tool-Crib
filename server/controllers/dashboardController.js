const asyncHandler = require("express-async-handler")
const queryTeam = require("../db-service")

/*
@desc Fetches the team table from the database
@route GET /teams
@access Private
*/
const getDashboard = asyncHandler(async (req, res) => {
  queryTeam.query("SELECT * FROM manageteams ORDER BY id DESC", (err, result) => {
    if (err) {
      console.log(err);
    }
    else {
      res.send(result);
    }
  })
});

/*
@desc Adds the team onto the team table
@route POST /teams
@access Private
*/
const setDashboard = asyncHandler(async (req, res) => {

  queryTeam.query(
    "INSERT INTO dashboard (teamNumber, tableNumber, teamMember, dueDate, toolLimit, toolName, notes) VALUES (?,?,?)",
    [teamNumber, tableNumber, teamMember, dueDate, toolLimit, toolName, notes], 
    (err, result) => {
      if (err) {
        console.log(err);
      }
      else {
        res.send("Values inserted into dashboard");
      }
    }
  );

});

/*
@desc Deletes the team from the manageteams table
@route DELETE /teams:id
@access Private
*/

const deleteDashboard = async (req, res) => {
  res.status(200).json({message: `deleted team number ${req.params.id}`})

  const id = req.params.id
  db.query("DELETE FROM manageteams WHERE id = ?", id, (err) => {
    if (err) {
      console.log(err)
    }
    else {
      res.send(`Team ${id} deleted`)
    }
  })
}

/*
@desc
@route
@access
*/

module.exports = {
  getDashboard,
  setDashboard,
  deleteDashboard
}