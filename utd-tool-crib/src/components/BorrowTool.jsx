import {Link} from "react-router-dom"
import "../styles/header.css"

function BorrowTool(){
    return(
        <div>
            <div className="header">
                <p className="title">Borrow Tool</p>

                <Link to="/"><button>Back</button></Link>
                
            </div>
        </div>
    );
}
export default BorrowTool;