import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import BorrowTool from "./components/BorrowTool";
import Dashboard from "./components/Dashboard";
import ManageTeams from "./components/ManageTeams";
import ManageTools from "./components/ManageTools";
import ReturnTool from "./components/ReturnTool";

function App() {
  return (
    <Router>
      <div className="App">
        
        <Routes>
          <Route path="/" element={<Dashboard />}/>
          <Route path="/Borrow-Tool" element={<BorrowTool />}/>
          <Route path="/Return-Tool" element={<ReturnTool />}/>
          <Route path="/Manage-Teams" element={<ManageTeams />}/>
          <Route path="/Manage-Tools" element={<ManageTools />}/>
          
        </Routes>
      </div>
    </Router>
  );
}

export default App;
