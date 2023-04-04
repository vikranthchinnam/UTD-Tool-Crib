import {Link} from "react-router-dom"
import "../styles/header.css"
import { useEffect, useState } from "react";
import "../styles/manageTeams.css"
// import Axios from 'axios';

function ManageTeams() {

    // these are states, which re-renders when the variable changes
    // const [variableName, functionName] = useState(initial value of the variable)

    const [memberCounter, setMemberCounter] = useState(1);
    const [data, setData] = useState([]);
    const [addUser, setAdd] = useState(false);
    const [teamNumber, setNumber] = useState(0);
    const [teamMember, setMember] = useState([]);
    const [token, setToken] = useState(0);

    useEffect(() => {
        async function fetchData() {
            const data = await getOrderData();
        }
        fetchData();
    }, []);

    const addUserEvent = (event) => {
        console.log(teamMember);
        const teamdata = {teamNumber, teamMember, token};
        if(addUser) {
            fetch("http://localhost:8000/teams",{
                method: "POST",
                headers: {"content-type":"application/json"},
                body:JSON.stringify(teamdata)
            }).then((res) =>{
                window.location.reload();
                // Axios.post('http://localhost:5000/teams', { 
                //     teamnumber: teamnumber, 
                //     teammembers: teammembers, 
                //     token: token,
                // });
            }).catch((err) => {
                console.log(err.message);
            })
        }
        setAdd(!addUser);
    }

    const addInputEvent = (event) => {
        setMemberCounter(memberCounter + 1);
    }

    const addUserHtml = () => {
        if(addUser) {
            return(
                <div>
                    <p>Team Number:</p>
                    <input 
                        type="text" 
                        name="" id="" 
                        onChange = {(event) => {
                            setNumber(event.target.value);
                        }}
                    />
                    <p>Team Members</p>
                    {Array.apply(null, Array(memberCounter)).map((c, i) => 
                        <div>
                            <input 
                                type="text" 
                                onChange = {(event) => {
                                    setMember(event.target.value);
                                }}
                            />
                        </div>
                    )}
                    <p>Token</p>
                    <input 
                        type="text" 
                        value={5}
                        onChange = {(event) => {
                            setToken(event.target.value);
                        }}
                    />
                    <button onClick={addInputEvent}>New Member</button>
                    <button onClick={addUserEvent}>Submit</button>
                </div>
            );
        }
        else{
            return (
                <div>
                    <button onClick={addUserEvent}>Add User</button>
                </div>
            );
        }
    }

    async function getOrderData() {
        fetch("http://localhost:8000/teams").then((res) => {
            return res.json();
        })
        .then((resp => { 
            setData(resp); 
        }))
        .catch((err) => {
            console.log(err.message);
        })
    }

    return (
        <div>
            <div className="header">
                <p className="title">Manage Teams</p>
                <div className="header-buttons">
                    <Link to="/Manage-Tools"><button>Manage Tools</button></Link>
                    <button>Create Users</button>
                    <Link to="/"><button>Back</button></Link>
                </div>
            </div>

            <div>
                {addUserHtml()}
            </div>

            <div className="grid-2">

                <div className="column-grid-2">
                    <div className="cell">Team Number</div>
                    <div className="cell">Team Members</div>
                    <div className="cell">Tokens</div>
                </div>

                {data && data.map((item) => 
                    <div className="column-grid-2">
                        <div className="cell-2">{item['team-number']}</div>
                        <div className="single-row">{item['team-members'] && item['team-members'].length > 0 && item['team-members'].map((item_) => <span><p>{item_ + ", "}</p></span>)}</div>
                        <div className="cell-2">{item['tokens']}</div>
                    </div>
                )}
            
            </div>
            
        </div>
    );
}
export default ManageTeams;