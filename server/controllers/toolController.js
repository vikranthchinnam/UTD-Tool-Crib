const asyncHandler = require("express-async-handler")
const queryTool = require("../db-service")

/*
@desc Fetches the tool table from the database
@route GET /teams
@access Private
*/
const getTools = asyncHandler(async (req, res) => {
  queryTool.query("SELECT * FROM managetools ORDER BY id DESC", (err, result) => {
    if (err) {
      console.log(err);
    }
    else {
      res.send(result);
    }
  })
});

/*
@desc Adds the tool onto the tool table
@route POST /teams
@access Private
*/
const setTools = asyncHandler(async (req, res) => {
  const toolName = req.body.toolName;

  queryTeam.query(

    "INSERT INTO managetools (toolName) VALUES (?,?,?)",
    toolName, 
    (err, result) => {
      if (err) {
        console.log(err);
      }
      else {
        res.send("Tool name inserted");
      }
    }
  );

});

/*
@desc Deletes the tool from the managetools table
@route DELETE /teams:id
@access Private
*/

const deleteTeams = async (req, res) => {
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
const exportTeams = (req, res) => {
  res.status(200).json({message: 'exported teams'})
}

module.exports = {
  getTools,
  setTools,
  deleteTools,
  exportTools,
}