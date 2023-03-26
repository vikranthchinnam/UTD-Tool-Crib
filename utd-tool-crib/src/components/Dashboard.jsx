import "../styles/header.css";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
// import {orderData} from "../data/db";
import orderData from "../data/db.json";
import "../styles/logGrid.css";

function Dashboard() {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const _data = await getOrderData();
      setData(_data);
    }
    fetchData();
  }, []);

  async function getOrderData() {
    return orderData;
  }

  return (
    <div>
      <div className="header">
        <p className="title">Dashboard</p>
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
      <div className="row-grid">
        <div className="column-grid">
            <div className="cell">Team Number</div>
            <div className="cell">Table Number</div>
            <div className="cell">Team Member</div>
            <div className="cell">Due Date</div>
            <div className="cell">Tool Name</div>
            <div className="cell">Notes</div>

            <div className="cell">Tool Limit</div>
        </div>
        {data && data.map((item) => 
            <div className="column-grid">
                <div className="cell">{item['team-number']}</div>
                <div className="cell">{item['table-number']}</div>
                <div className="cell">{item['team-member']}</div>
                <div className="cell">{item['due-date']}</div>
                <div className="cell">{item['tool-name']}</div>
                <div className="cell">{item['notes']}</div>
                <div className="cell">{item['tool-limit']}</div>
                
            </div>
            
        )}
        
        
      </div>
      
    </div>
  );
}
export default Dashboard;