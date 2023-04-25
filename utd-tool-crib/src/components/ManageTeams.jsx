import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import "../styles/header.css";
import "../styles/manageTeams.css";

function ManageTeams() {
  const [counter, setCounter] = useState(1);

  const [data, setData] = useState([]);

  const [addUser, setAdd] = useState(false);

  const [currentEditingId, setID] = useState(0);

  //const [editTeamNumber, setTeamnumber] = useState(0);

  //  const [editTeamMembers, setTeammember] = useState([]);

  //const [editTokens, setToken] = useState(0);

  const removeUserEvent = (item) => {
    if (
      window.confirm(
        "Do you want to remove team number " + item.teamNumber + "?"
      )
    ) {
      fetch("http://localhost:8000/teams/" + item.id, {
        method: "DELETE",
      })
        .then((res) => {
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

  useEffect(() => {
    async function fetchData() {
      const _data = await getTeamData();
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

      let teamNumber = Number(document.getElementById("teamnumber").value);
      let tableNumber = Number(document.getElementById("tablenumber").value);
      let tokenNumber = Number(document.getElementById("tokennumber").value);

      const teamdata = {
        teamNumber: teamNumber,
        tableNumber: tableNumber,
        teamMembers: teamMembersValues,
        tokens: tokenNumber,
      };
      fetch("http://localhost:8000/teams", {
        method: "POST",
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

    setAdd(!addUser);
  };

  const addInputEvent = (event) => {
    setCounter(counter + 1);
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
          {Array.apply(null, Array(counter)).map((c, i) => (
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

  const editUserHtml = (id) => {
    if (id > 0) {
      return data.map((item) => (
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
                {item["teamNumber"]}
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
      return data.map((item) => (
        <div className="column-grid-2" id={item.id + "div"}>
          <div className="cell-2" id={item.id + "number"}>
            {item["teamNumber"]}
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
      ));
    }
  };

  async function getTeamData() {
    fetch("http://localhost:8000/teams")
      .then((res) => {
        return res.json();
      })
      .then((resp) => {
        setData(resp);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }

  const inputFile = (event) => {
    const file = document.getElementById("file-input");
    let fileName = [];
    file.addEventListener("change", (event) => {
      fileName = file.value.split(".");
    });
    if (fileName.length > 0 && fileName[1] == "xlsx") {
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
      <div>
        <input type="file" id="file-input" onClick={() => inputFile()} />
      </div>
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
