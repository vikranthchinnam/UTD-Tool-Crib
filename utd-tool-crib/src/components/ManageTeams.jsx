import {Link} from "react-router-dom"
import "../styles/header.css"
import { useEffect, useState } from "react";
import "../styles/manageTeams.css"

function ManageTeams(){

    const [counter, setCounter] = useState(1);

    const [data, setData] = useState([]);

    const [addUser, setAdd] = useState(false);

    const [teamnumber, setTeamnumber] = useState(0);

    const [teammembers, setTeammember] = useState([]);
    
    const [token, setToken] = useState(0);


    useEffect(() => {
        async function fetchData() {
            const _data = await getOrderData();
        }
        fetchData();
    }, []);

    const addUserEvent = (event) => {
        setAdd(!addUser);
    }

    const addInputEvent = (event) =>{
        setCounter(counter + 1);
    }

    const addUserHtml = () => {
        if(addUser){
            return(
                <div>
                    <p>Team Number:</p>
                    <input type="text" name="" id="" />
                    <p>Team Members</p>
                    {Array.apply(null, Array(counter)).map((c) => 
                        <div>
                            <input type="text" />
                        </div>
                    )}
                    <button onClick={addInputEvent}>new member</button>
                    <button onClick={addUserEvent}>submit</button>
                </div>
            );
        }
        else{
            return (
                <div>
                    <button onClick={addUserEvent}>
                        Add User
                    </button>
                </div>
            );
        }
    }

    async function getOrderData() {
        fetch("http://localhost:8000/teams").then((res) => {
            return res.json();
        }).then((resp => {setData(resp);})).catch((err) => {
            console.log(err.message);
        })
    }
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
                        <div className="single-row">{item['team-members'].map((thing) => <div><p>{thing + ", "}</p></div>)}</div>
                        <div className="cell-2">{item['tokens']}</div>
                    
                        
                    </div>
                    
                )}
            
            
            </div>

                
                
            
        </div>
    );
}
export default ManageTeams;