import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import "../styles/header.css";
import "../styles/manageTeams.css";

function ManageTeams() {
  const [counter, setCounter] = useState(1);

  const [data, setData] = useState([]);

  const [addUser, setAdd] = useState(false);

  //   const [teamNumber, setTeamnumber] = useState(0);

  //   const [teamMembers, setTeammember] = useState([]);

  //   const [tokens, setToken] = useState(0);

  const editUserEvent = (id) => {
    console.log(id);
    const idDiv = document.getElementById(id + "div");
  };

  useEffect(() => {
    async function fetchData() {
      const _data = await getOrderData();
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

      let tokenNumber = Number(document.getElementById("tokennumber").value);

      const teamdata = {
        teamNumber: teamNumber,
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

  const editUserHtml = (id) => {
    if (id > 0) {
    } else {
      return data.map((item) => (
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
      ));
    }
  };

  async function getOrderData() {
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
          <div className="cell">Team Members</div>
          <div className="cell">Tokens</div>
          <div className="cell">options</div>
        </div>
        {editUserHtml(0)}
        {data &&
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
          ))}
      </div>
    </div>
  );
}
export default ManageTeams;
