import { Link } from "react-router-dom";
import "../styles/header.css";
import { useState, useEffect } from "react";
import "../styles/BorrowTools.css";

function BorrowTool() {
  const [teamData, setTeamData] = useState([]);
  const [toolData, setToolData] = useState([]);
  const [teamNum, setTeamNum] = useState("");
  const [teamMember, setTeamMember] = useState([]);
  const [notes, setNotes] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [dueTime, setDueTimes] = useState("");

  const filterfunction = (event) => {};

  useEffect(() => {
    async function fetchData() {
      await getTeamData();
      await getToolData();
    }

    fetchData();
  }, []);

  async function getTeamData() {
    fetch("http://localhost:8000/teams")
      .then((res) => {
        return res.json();
      })
      .then((resp) => {
        setTeamData(resp);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }

  async function getToolData() {
    fetch("http://localhost:8000/tools")
      .then((res) => {
        return res.json();
      })
      .then((resp) => {
        setToolData(resp);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }

  const refactorData = (num) => {
    if (num > 0) {
      setTeamNum(num);
      const currentTeam = teamData.filter((item) => item.teamNumber == num);
      setTeamMember(currentTeam.teamMembers);
      console.log(teamMember);
    }
  };

  return (
    <div>
      <div className="header">
        <p className="title">Borrow Tool</p>

        <Link to="/">
          <button>Back</button>
        </Link>
      </div>
      <div className="input-box">
        <label>Team Number</label>
        <input
          type="text"
          placeholder="Type here"
          onChange={(event) => refactorData(event.target.value)}
        />
        <label>Team Member</label>
        <div id="dropdown-member">
          <input
            type="text"
            placeholder="Search..."
            onKeyUp={filterfunction()}
          />
          {/* {teamMember &&
            teamMember.map((entry) => (
              <div>
                <p>{entry}</p>
              </div>
            ))} */}
        </div>

        <label id="notes">Notes</label>
        <input
          type="text"
          placeholder="Type here"
          onChange={(event) => setNotes(event.target.value)}
        />
        <div className="date">
          <label>Due Date</label>
          <input
            type="text"
            placeholder="MM-DD-YYYY"
            id="due-date"
            onChange={(event) => setDueDate(event.target.value)}
          />
          <label>Due Time</label>
          <input
            type="text"
            onChange={(event) => setDueTimes(event.target.value)}
          />
        </div>
        <center>
          <button className="submit">Submit</button>
        </center>
      </div>
    </div>
  );
}
export default BorrowTool;
