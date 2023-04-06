import { Link } from "react-router-dom";
import "../styles/header.css";
import orderData from "../data/db.json";
import { useState, useEffect } from "react";
//import myFunction from "../scripts/returnTools.js"

function ReturnTool() {
  const [data, setData] = useState([]);

  //  const [teamnumber, setNumber] = useState(0);

  const [toolnames, setTool] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const _data = await getOrderData();
      setData(_data);
    }
    fetchData();
  }, []);

  const handleEnterData = (event) => {
    // setNumber(event.target.value);
    const filteredData = data.filter(
      (entry) => entry["team-number"] == event.target.value
    );
    if (filteredData.length > 0) {
      const toolNames = filteredData.map((entry) => entry["tool-name"]);
      setTool(toolNames);
    } else {
      setTool([]);
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
    return orderData;
  }
  return (
    <div>
      <div className="header">
        <p className="title">Return Tool</p>

        <Link to="/">
          <button>Back</button>
        </Link>
      </div>
      <div>
        <div>
          <p>Team Number</p>
          <input type="text" id="teamnumber" onChange={handleEnterData} />
        </div>
        <div>
          {toolnames &&
            toolnames.map((tool) => (
              <div>
                <input type="checkbox" id={tool} />
                <p>{tool}</p>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
export default ReturnTool;
