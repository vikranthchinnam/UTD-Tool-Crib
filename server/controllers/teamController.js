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
@desc gets the teams list
@route GET /teams
@access Private
*/
const setTeams = asyncHandler(async (req, res) => {
  const postNumber = req.body.teamnumber;
  const postMember = req.body.teammembers;
  const postToken = req.body.token;
  res.status(200).json({message: 'set teams: ' + postNumber + ' ' + postMember + ' ' + postToken})

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
  setTeams,
  deleteTeams,
  exportTeams
}