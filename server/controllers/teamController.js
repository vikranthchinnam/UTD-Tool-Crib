const asyncHandler = require("express-async-handler")
const queryTeam = require("../db-service")
/*
@desc Fetches the team table from the database
@route GET /teams
@access Private
*/
const getTeams = asyncHandler(async (req, res) => {
  queryTeam.query("SELECT * FROM manageteams ORDER BY id DESC", (err, result) => {
    if (err) {
      console.log(err);
    }
    else {
      res.send(result);
    }

  })
});


const editTeams = asyncHandler(async (req, res) => {
  const putNumber = req.body.teamNumber;
  // const setMember = req.body.teamMembersValues.join(", ");
  const putToken = req.body.tokenNumber;
  const putTableNumber = req.body.tableNumber;
  const id = req.body.id;

  queryTeam.query(
    "UPDATE manageteams SET number = ?, tableNumber = ?, tokens = ? WHERE id = ?", 
    [putNumber, putTableNumber, putToken, id],
    (err, result) => {
    if (err) {
      console.log(err);
    }
    else {
      res.send("Values updated");
    }

  })
});


/*
@desc Adds the team onto the team table
@route POST /teams
@access Private
*/
const setTeams = asyncHandler(async (req, res) => {
  const postNumber = req.body.teamNumber;
  const postMember = req.body.teamMembersValues.join(", ");
  const postToken = req.body.tokenNumber;
  const postTableNumber = req.body.tableNumber;

  queryTeam.query(
    "INSERT INTO manageteams (number, tableNumber, members, tokens) VALUES (?,?,?,?)",
    [postNumber, postTableNumber, postMember, postToken], 
    (err, result) => {
      if (err) {
        console.log(err);
      }
      else {
        res.send("Values Inserted");
      }
    }
  );

});

/*
@desc Deletes the team from the manageteams table
@route DELETE /teams:id
@access Private
*/

const deleteTeams = async (req, res) => {
  // res.status(200).json({message: `deleted team number ${req.params.id}`})

  const id = req.params.id
  queryTeam.query("DELETE FROM manageteams WHERE id = ?", id, (err) => {
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
  getTeams,
  editTeams,
  setTeams,
  deleteTeams,
  exportTeams,
}