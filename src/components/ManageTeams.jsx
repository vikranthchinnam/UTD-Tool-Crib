import {Link} from "react-router-dom"
import "../styles/header.css"

function ManageTeams(){
    return(
        <div>
            <div className="header">
                <p className="title">Manage Teams</p>

                <div className="header-buttons">
                    <Link to="/Manage-Tools">
                        <button>Manage Tools</button>
                    </Link>
                    
                    <button>Create Users</button>
                    <Link to="/"><button>Back</button></Link>

                </div>

                
                
            </div>
        </div>
    );
}
export default ManageTeams;