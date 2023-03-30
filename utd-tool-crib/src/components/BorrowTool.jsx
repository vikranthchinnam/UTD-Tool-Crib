import {Link} from "react-router-dom"
import "../styles/header.css"
import "../styles/BorrowTools.css"
import { useState } from "react";

function BorrowTool(){

    const [teamNum, setTeamNum] = useState('');
    const [teamMember, setTeamMember] = useState('');
    const [notes, setNotes] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [dueTime, setDueTimes] = useState('');

    return(
        <>
            <div className="borrow-tools">
                <div className="header">
                    <p className="title">Borrow Tool</p>
                    <Link to="/"><button>Back</button></Link>
                </div>
                <div className="input-box">
                    <label>Team Number</label>
                    <input type="text" placeholder="Type here" onChange = {(event) => setTeamNum(event.target.value)}/>
                    <label>Team Member</label>
                    <input type="text" placeholder="Type here" onChange = {(event) => setTeamMember(event.target.value)}/>
                    <label id="notes">Notes</label>
                    <input type="text" placeholder="Type here" onChange = {(event) => setNotes(event.target.value)}/>
                    <div className="date">
                        <label>Due Date</label>
                        <input type="text" placeholder="MM-DD-YYYY" id="due-date" onChange = {(event) => setDueDate(event.target.value)}/>
                        <label>Due Time</label>
                        <input type="text" onChange = {(event) => setDueTimes(event.target.value)}/>
                    </div>
                    <center><button className="submit">Submit</button></center>
                </div>
            </div>
        </>
    )};
export default BorrowTool;