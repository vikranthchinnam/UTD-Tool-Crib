import "../styles/dashboard.css"

function Dashboard(){

    return(
        <div>
            <div className="header">
                <p className="dashboard">Dashboard</p>
                <div className="header-buttons">
                    <button>Borrow Tool</button>
                    <button>Return Tool</button>
                    <button>Admin Panel</button>
                    <button>Log Out</button>
                </div>
            </div>

            
        </div>
    );
}
export default Dashboard;