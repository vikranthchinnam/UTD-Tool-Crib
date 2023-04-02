const asyncHandler = require("express-async-handler")
/*
@desc gets the teams list
@route GET /teams
@access Private
*/
const getTeams = asyncHandler(async (req, res) => {
  res.status(200).json({message: 'get teams'})

  // db.query("SELECT * FROM databaseName")
});

/*
@desc
@route
@access
*/
const deleteTeams = async (req, res) => {
  res.status(200).json({message: `deleted team number ${req.params.id}`})
  // db.query("SELECT * FROM databaseName")
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
  deleteTeams,
  exportTeams
}