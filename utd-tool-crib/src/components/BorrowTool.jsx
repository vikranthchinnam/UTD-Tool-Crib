import {Link} from "react-router-dom"
import "../styles/header.css"
import "../styles/BorrowTools.css"

function BorrowTool(){
    return(
        <><div className="borrow-tools">
        <div className="header">
            <p className="title">Borrow Tool</p>
            <Link to="/"><button>Back</button></Link>
        </div>
        <div className="input-box">
            <label>Team Number</label>
            <input type="text" placeholder="type here"/>
            <label>Team Member</label>
            <input type="text" placeholder="type here"/>
            <label id="notes">Notes</label>
            <input type="text" placeholder="type here"/>
            <div className="date">
            <label className="notes">Due Date</label>
            <input type="text" placeholder="MM-DD-YYYY" id="due-date"/>
            <label className="notes">Due Time</label>
            <input type="text" />
            </div>
        </div>
        </div></>
    )};
export default BorrowTool;