import { Link } from "react-router-dom";
import "../styles/header.css";
import { useState, useEffect } from "react";
import "../styles/ManageTools.css";
import axios from "axios";

function ManageTools() {
  const [data, setData] = useState([]);

  const [addTool, setAdd] = useState(false);

  const [toolName, setToolName] = useState("");

  const PORT = 3002;

  useEffect(() => {
    async function fetchData() {
      await getToolData();
    }

    fetchData();
  }, []);

  async function getToolData() {
    axios.get(`http://localhost:${PORT}/tools`).then((resp) => {
      setData(resp.data);
    });
    // fetch("http://localhost:8000/tools")
    //   .then((res) => {
    //     return res.json();
    //   })
    //   .then((resp) => {
    //     setData(resp);
    //   })
    //   .catch((err) => {
    //     console.log(err.message);
    //   });
  }

  const cancelAddUserEvent = (event) => {
    setAdd(!addTool);
  };

  const addUserEvent = (event) => {
    setAdd(!addTool);
  };

  const removeUserEvent = (item) => {
    if (window.confirm("Do you want to remove " + item.tool + "?")) {
      axios.delete(`http://localhost:${PORT}/tools/` + item.id).then(() => {
        window.location.reload();
      });
      // fetch("http://localhost:8000/tools/" + item.id, {
      //   method: "DELETE",
      // })
      //   .then((res) => {
      //     alert("Removed successfully.");
      //     window.location.reload();
      //   })
      //   .catch((err) => {
      //     console.log(err.message);
      //   });
    }
  };

  const submitToolEvent = (event) => {
    const filteredData = data.filter((item) => item.tool == toolName);
    if (filteredData.length > 0) {
      alert("Tool Already Exists");
    } else {
      const toolData = { tool: toolName };
      axios.post(`http://localhost:${PORT}/tools`, toolData).then(() => {
        window.location.reload();
      });
      // fetch("http://localhost:8000/tools", {
      //   method: "POST",
      //   headers: { "content-type": "application/json" },
      //   body: JSON.stringify(toolData),
      // })
      //   .then((res) => {
      //     window.location.reload();
      //   })
      //   .catch((err) => {
      //     console.log(err.message);
      //   });
    }
  };

  const addToolHtml = () => {
    if (addTool) {
      return (
        <div>
          <p>Tool Name</p>
          <input type="text" onChange={(e) => setToolName(e.target.value)} />
          <button onClick={cancelAddUserEvent}>Cancel</button>
          <button onClick={submitToolEvent}>Submit</button>
        </div>
      );
    } else {
      return (
        <div>
          <button onClick={addUserEvent}>Add Tool</button>
        </div>
      );
    }
  };
  return (
    <div className="manage-tools">
      <div className="header">
        <div className="title">
          <h1>Admin Panel</h1>
        </div>
        <div className="header-buttons">
          <Link to="/Manage-Teams">
            <button>Manage Teams</button>
          </Link>
          <Link to="/Manage-Tools">
            <button id="manage-tools-button">Manage Tools</button>
          </Link>
          <button>Create Users</button>
          <Link to="/">
            <button>Dashboard</button>
          </Link>
        </div>
      </div>
      {addToolHtml()}
      <div className="grid-3">
        <div className="column-grid-3">
          {/* <div className="cell">Id</div> */}
          <div className="cell">Tool</div>
          <div className="cell">options</div>
        </div>

        {data &&
          data.map((item) => (
            <div className="column-grid-3">
              {/* <div className="cell">{item.id}</div> */}
              <div className="cell">{item.tool}</div>
              <div className="cell">
                <button
                  onClick={() => {
                    removeUserEvent(item);
                  }}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
export default ManageTools;
