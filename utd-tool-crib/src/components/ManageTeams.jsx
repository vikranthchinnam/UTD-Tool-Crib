import {Link} from "react-router-dom"
import "../styles/header.css"

function ManageTeams(){

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

                <div>
                    
                </div>

                
                
            </div>
        </div>
    );
}
export default ManageTeams;