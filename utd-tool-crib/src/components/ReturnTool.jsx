import {Link} from "react-router-dom"
import "../styles/header.css"

function ReturnTool(){
    return(
        <div>
            <div className="header">
                <p className="title">Return Tool</p>

                <Link to="/"><button>Back</button></Link>
                
            </div>
        </div>
    );
}
export default ReturnTool;