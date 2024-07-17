// import "../styles/mainContent.css";

import { TotalIncomeExpense } from "./TotalIncomeExpense";
import { Transactions } from "./Transactions";


export default function MainContent() {

    return (
        <div className="main-content" >
            {/* < Transactions /> */}
            < TotalIncomeExpense />
        </div>
    )
}