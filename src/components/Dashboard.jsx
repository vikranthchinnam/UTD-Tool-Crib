import "../styles/header.css"
import {Link} from "react-router-dom"

function Dashboard(){

    return(
        <div>
            <div className="header">
                <p className="title">Dashboard</p>
                <div className="header-buttons">
                    <Link to="/Borrow-Tool"><button>Borrow Tool</button></Link>
                    
                    <Link to="/Return-Tool"><button>Return Tool</button></Link>

                    <Link to="/Manage-Teams"><button>Admin Panel</button></Link>
                    
                    <button>Log Out</button>
                </div>
            </div>


        </div>
    );
}
export default Dashboard;