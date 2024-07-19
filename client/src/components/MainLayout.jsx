import { Route, Routes } from "react-router-dom";
import NavBar from "./NavBar.jsx";
import LeftMenu from "./LeftMenu.jsx";
import Dashboard from "./Dashboard.jsx";
import Budget from "./Budget.jsx";
import { Transactions } from "./Transactions.jsx";
import Portfolio from "./Portfolio.jsx";
import "../styles/mainLayout.css";


export default function MainLayout() {
    // TODO homepage api call here.
    // TODO rerender totalincomeexpense when new transaction is added 
    return (
        <div className="main-div">
            < NavBar />
            < LeftMenu />
            <Routes>
                <Route path="/" element={< Dashboard />} />
                <Route path="/budget" element={< Budget />} />
                <Route path="/transactions" element={< Transactions />} />
                <Route path="/portfolio" element={< Portfolio />} />
            </Routes>
            
        </div>
    )

}


