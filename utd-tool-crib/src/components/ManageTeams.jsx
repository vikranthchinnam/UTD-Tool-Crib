import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import "../styles/header.css";
import "../styles/manageTeams.css";

function ManageTeams() {
  const apiURL = "http://localhost:5000/team";

  const [newMemberCounter, setCounter] = useState(1); // team Member Counter
  
  const [addUser, setAdd] = useState(false); // add a team (user)

  const [currentEditingId, setID] = useState(0); // primary key identifier for each team

  // states for each input: team number, members, and token
  const [teamNumber, setTeamNumber] = useState(0);
  const [teamMembers, setTeamMember] = useState([]);
  const [token, setToken] = useState(0);

  const [teamList, setTeamList] = useState([]); // state to load the table content

  const removeUserEvent = (item) => {
    if (
      window.confirm(
        "Do you want to remove team number " + item.teamNumber + "?"
      )) 
    {
      // fetches dummy data of teams
      // route axios to teams delete
      // instead of item.id it could be ${id}
      axios.delete(apiURL + item.id)
        .then((res) => {
          console.log('Successfully deleted id ' + item.id)
          alert("Removed successfully.");
          window.location.reload();
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  };

  const editUserEvent = (id) => {
    setID(id);
  };

  // processes before page render
  useEffect(() => {
    async function fetchData(){
      getTeamData();
    }
      fetchData();
      
  }, []);

  const cancelEvent = (event) => {
    setAdd(!addUser);
  };

  const addUserEvent = (event) => {
    if (addUser) {
      const teamMemDetails = document.querySelectorAll(
        "div.team-member-container > input"
      );

      const teamMembersValues = [];
      teamMemDetails.forEach((input) => {
        teamMembersValues.push(input.value);
      });
      setTeamMember(teamMembersValues)

      // fetches data of teams
      axios.post('http://localhost:5000/team', {
        teamNumber: teamNumber,
        teamMembersValues: teamMembersValues,
        tokenNumber: token,
      })
      // console.log(teamdata);

      // use teamlist object, but change the attributes
      setTeamList([...teamList, {
        number: teamNumber,
        members: teamMembers,
        tokens: token,
      }
      ])
    }

    setAdd(!addUser);
  };

  const addInputEvent = (event) => {
    setCounter(newMemberCounter + 1);
  };

  const addUserHtml = () => {
    if (addUser) {
      return (
        <div>
          <p>Team Number:</p>
          <input type="text" name="" id="teamnumber" />
          <p>Table Number:</p>
          <input type="text" name="" id="tablenumber" />
          <p>Team Members:</p>
          {Array.apply(null, Array(newMemberCounter)).map((c, i) => (
            <div className="team-member-container">
              <input type="text" />
            </div>
          ))}
          <button onClick={addInputEvent}>new member</button>
          <p>Token:</p>
          <input type="text" id="tokennumber" defaultValue={5} />

          <button onClick={addUserEvent}>submit</button>
          <button onClick={cancelEvent}>Cancel</button>
        </div>
      );
    } else {
      return (
        <div>
          <button onClick={addUserEvent}>Add User</button>
        </div>
      );
    }
  };

  const submitEditUserEvent = (id) => {
    if (id > 0) {
      const editTeamMemDetailsInputs = document.querySelectorAll(
        "input.editing-team-details-input"
      );

      let editTeamMemDetails = [];

      editTeamMemDetailsInputs.forEach((input) => {
        editTeamMemDetails.push(input.value);
      });

      const editTeamNumber = document.getElementById(id + "number").value;
      const editTableNumber = document.getElementById(id + "tnumber").value;
      const editTokens = document.getElementById(id + "token").value;
      const teamdata = {
        teamNumber: editTeamNumber,
        tableNumber: editTableNumber,
        teamMembers: editTeamMemDetails,
        tokens: editTokens,
      };
      fetch("http://localhost:8000/teams/" + id, {
        method: "PUT",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(teamdata),
      })
        .then((res) => {
          window.location.reload();
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  };

  async function getTeamData() {
    
    axios.get('http://localhost:5000/team').then((response) => {
      setTeamList(response.data); //teamList is now response.data
      console.log(response.data);
    })

  }

  const returnTeamMemberArrays = (membersString) => {
    return membersString.split(",");
  }

  const editUserHtml = (id) => {
    if (id > 0) {
      return teamList.map((item) => (
        <div className="grid-2">
          {item.id == id ? (
            <div className="column-grid-2">
              <div className="cell-2">
                <input
                  type="text"
                  defaultValue={item["teamNumber"]}
                  id={item.id + "number"}
                />
              </div>
              <div className="cell-2">
                <input
                  type="text"
                  defaultValue={item["tableNumber"]}
                  id={item.id + "tnumber"}
                />
              </div>
              <div className="editing-team-details-container">
                {item["teamMembers"] &&
                  item["teamMembers"].length > 0 &&
                  item["teamMembers"].map((item_) => (
                    <span>
                      <input
                        type="text"
                        defaultValue={item_}
                        className="editing-team-details-input"
                      />
                    </span>
                  ))}
              </div>
              <div className="cell-2">
                <input
                  type="text"
                  defaultValue={item["tokens"]}
                  id={id + "token"}
                />
              </div>
              <div className="cell-2">
                <button
                  onClick={() => {
                    setID(0);
                  }}
                >
                  Cancel
                </button>

                <button
                  onClick={() => {
                    submitEditUserEvent(currentEditingId);
                  }}
                >
                  Submit
                </button>
              </div>
            </div>
          ) : (
            <div className="column-grid-2">
              <div className="cell-2" id={item.id + "number"}>
                {item["number"]}
              </div>
              <div className="cell-2" id={item.id + "tnumber"}>
                {item["tableNumber"]}
              </div>
              <div className="single-row">
                {item["teamMembers"] &&
                  item["teamMembers"].length > 0 &&
                  item["teamMembers"].map((item_) => (
                    <span>
                      <p>{item_ + ", "}</p>
                    </span>
                  ))}
              </div>
              <div className="cell-2">{item["tokens"]}</div>
              <div className="cell-2">
                <button
                  onClick={() => {
                    editUserEvent(item.id);
                  }}
                >
                  Edit
                </button>
                <button
                  onClick={() => {
                    removeUserEvent(item);
                  }}
                >
                  Remove
                </button>
              </div>
            </div>
          )}
        </div>
      ));
    } else {

      // teamlist now is response.data
      return teamList && teamList.map((item) => (
        <div className="column-grid-2" id={item.id + "div"}>
          <div className="cell-2" id={item.id + "number"}>
            {item["number"]}
          </div>
          <div className="cell-2" id={item.id + "tnumber"}>
            {item["tableNumber"]}
          </div>
          <div className="single-row">
            {item["members"] &&
              item["members"].length > 0 &&
              returnTeamMemberArrays(item["members"]).map((item_) => (
                <span>
                  <p>{item_ + ", "}</p>
                </span>
              ))}
          </div>
          <div className="cell-2">{item["tokens"]}</div>
          <div className="cell-2">
            <button
              onClick={() => {
                editUserEvent(item.id);
              }}
            >
              Edit
            </button>
            <button
              onClick={() => {
                removeUserEvent(item);
              }}
            >
              Remove
            </button>
          </div>
        </div>
      ));
    }
  };

  return (
    <div>
      <div className="header">
        <p className="title">Manage Teams</p>

        <div className="header-buttons">
          <Link to="/Manage-Tools">
            <button>Manage Tools</button>
          </Link>

          <button>Create Users</button>
          <Link to="/">
            <button>Back</button>
          </Link>
        </div>
      </div>

      <div>{addUserHtml()}</div>

      <div className="grid-2">
        <div className="column-grid-2">
          <div className="cell">Team Number</div>
          <div className="cell">Table Number</div>
          <div className="cell">Team Members</div>
          <div className="cell">Tokens</div>
          <div className="cell">options</div>
        </div>
        {editUserHtml(currentEditingId)}
        {/* {data &&
          data.map((item) => (
            <div className="column-grid-2" id={item.id + "div"}>
              <div className="cell-2" id={item.id + "number"}>
                {item["teamNumber"]}
              </div>
              <div className="single-row">
                {item["teamMembers"] &&
                  item["teamMembers"].length > 0 &&
                  item["teamMembers"].map((item_) => (
                    <span>
                      <p>{item_ + ", "}</p>
                    </span>
                  ))}
              </div>
              <div className="cell-2">{item["tokens"]}</div>
              <div className="cell-2">
                <button
                  onClick={() => {
                    editUserEvent(item.id);
                  }}
                >
                  Edit
                </button>
                <button>Remove</button>
              </div>
            </div>
          ))} */}
      </div>
    </div>
  );
}
export default ManageTeams;