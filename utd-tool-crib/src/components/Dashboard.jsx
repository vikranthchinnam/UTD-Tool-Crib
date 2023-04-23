import "../styles/header.css";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
// import {orderData} from "../data/db";
// import orderData from "../data/db.json";
import "../styles/logGrid.css";

function Dashboard() {
  const [data, setData] = useState([]);
  const [currentDate, setDate] = useState("");
  const [currentMonth, setMonth] = useState("");
  const [currentYear, setYear] = useState("");

  useEffect(() => {
    async function fetchData() {
      await getOrderData();
      const current = new Date();
      // const date = `${
      //   current.getMonth() + 1
      // }/${current.getDate()}/${current.getFullYear()}`;
      setDate(current.getDate());
      setMonth(current.getMonth() + 1);
      setYear(current.getFullYear());
      // setData(_data);
    }
    fetchData();
  }, []);

  function compareDate(fullDate) {
    const compareDay = fullDate.substring(3, 5);
    const compareMonth = fullDate.substring(0, 2);
    const compareYear = fullDate.substring(6, 10);
    if (compareYear >= currentYear) {
      if (compareMonth >= currentMonth) {
        if (compareDay >= currentDate) {
          return false;
        } else {
          return true;
        }
      } else {
        return true;
      }
    } else {
      return true;
    }
  }

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
    <div className="dashboard">
      <div className="header">
        <div className="title">
            <h1>Dashboard</h1>
        </div>

        <div className="header-buttons">
          <Link to="/Borrow-Tool">
            <button>Borrow Tool</button>
          </Link>
          <Link to="/Return-Tool">
            <button>Return Tool</button>
          </Link>
          <Link to="/Manage-Teams">
            <button>Admin Panel</button>
          </Link>
          <button>Log Out</button>
        </div>
      </div>

      <div className="grid">
        <div className="column-grid-header">
          <div className="header-cell">Team Number</div>
          <div className="header-cell">Table Number</div>
          <div className="header-cell">Team Member</div>
          <div className="header-cell">Due Date</div>
          <div className="header-cell">Tool Name</div>
          <div className="header-cell">Notes</div>
          <div className="header-cell">Tool Limit</div>
        </div>
        
        {data &&
          data.map((item) =>
            compareDate(item.dueDate) ? (
              <div className="column-grid">
                <div className="cell">
                  <p style={{ color: "red" }}>{item["teamNumber"]}</p>
                </div>
                <div className="cell">
                  <p style={{ color: "red" }}>{item["tableNumber"]}</p>
                </div>
                <div className="cell">
                  <p style={{ color: "red" }}>{item["teamMember"]}</p>
                </div>
                <div className="cell">
                  <p style={{ color: "red" }}>{item["dueDate"]}</p>
                </div>
                <div className="cell">
                  <p style={{ color: "red" }}>{item["toolName"]}</p>
                </div>
                <div className="cell">
                  <p style={{ color: "red" }}>{item["notes"]}</p>
                </div>
                <div className="cell">
                  <p style={{ color: "red" }}>{item["toolLimit"]}</p>
                </div>
              </div>
            ) : (
              <div className="column-grid">
                <div className="cell">{item["teamNumber"]}</div>
                <div className="cell">{item["tableNumber"]}</div>
                <div className="cell">{item["teamMember"]}</div>
                <div className="cell">{item["dueDate"]}</div>
                <div className="cell">{item["toolName"]}</div>
                <div className="cell">{item["notes"]}</div>
                <div className="cell">{item["toolLimit"]}</div>
              </div>
            )
          )}
      </div>
    </div>
  );
}
export default Dashboard;
