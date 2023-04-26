import { Link } from "react-router-dom";
import "../styles/header.css";
import "../styles/ReturnTool.css";
import orderData from "../data/db.json";
import { useState, useEffect } from "react";
//import myFunction from "../scripts/returnTools.js"

function ReturnTool() {
  const [data, setData] = useState([]);

  const [teamnumber, setNumber] = useState(-1);

  const [items, setItem] = useState([]);

  useEffect(() => {
    async function fetchData() {
      await getOrderData();
    }
    fetchData();
  }, []);

  const handleRemoveEvent = (event) => {
    for (let i = 0; i < items.length; i++) {
      if (
        document.getElementById(items[i].toolName) &&
        document.getElementById(items[i].toolName).checked
      ) {
        fetch("http://localhost:8000/logs/" + items[i].id, {
          method: "DELETE",
        }).catch((err) => {
          console.log(err.message);
        });
      }
    }
  };

  const handleEnterData = (event) => {
    setNumber(event.target.value);
    const filteredData = data.filter(
      (entry) => entry["teamNumber"] == event.target.value
    );
    if (filteredData.length > 0) {
      // const toolNames = filteredData.map((entry) => {toolName: entry["toolName"], identity: entry.id});
      setItem(filteredData);
    } else {
      setItem([]);
    }
    // delete orderData[0];
  };

  // function myFunction(item){
  //     if(document.getElementById('teamnumber').value === item['team-number']){
  //         const inputItem = document.createElement('input');
  //         inputItem.setAttribute('id', item['tool-name']);
  //         const toolName = item['tool-name']

  //         return '<div>' +{inputItem}+'<p>'+{toolName}+'</p>'+'</div>';
  //     }

  // }

  async function getOrderData() {
    fetch("http://localhost:8000/logs/")
      .then((res) => {
        return res.json();
      })
      .then((resp) => {
        setData(resp);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }
  return (
    <div className="return-tool">
      <div className="header">
        <div className="title">
            <h1>Return Tool</h1>
        </div>

        <div className="header-buttons">
            <Link to="/">
              <button>Back</button>
            </Link>
        </div>
      </div>

      <center><div className="input-box">
        <div>
          <p>Team Number</p>
          <input type="text" id="teamnumber" onChange={handleEnterData} />
        </div>
        <div>
          {items &&
            items.map((item) => (
              <div className="tool-list">
                <input type="checkbox" id={item.toolName} />
                <p>{item.toolName}</p>
              </div>
            ))}
        </div>
        <div>
          <Link to="/">
            <button onClick={() => handleRemoveEvent()}>Remove</button>
          </Link>
        </div>
      </div></center>
    </div>
  );
}
export default ReturnTool;
