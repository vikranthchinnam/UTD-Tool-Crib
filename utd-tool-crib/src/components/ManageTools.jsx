import {Link} from "react-router-dom"
import "../styles/header.css"

function ManageTools(){
    return(
        <div>
            <div className="header">
                <p className="title">Manage Teams</p>
                <div className="header-buttons">
                    <Link to="/Manage-Teams"><button>Manage Teams</button></Link>

                    <button>Create Users</button>
                    <Link to="/"><button>Dashboard</button></Link>
                </div>
                
                
            </div>
        </div>
    );
}
export default ManageTools;