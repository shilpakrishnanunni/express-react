import { useState, useLayoutEffect } from "react";
import "../styles/totalIncomeExpense.css";
import api from "../utils/api";

export const TotalIncomeExpense = () => {
    const [totalAmounts, setTotalAmounts] = useState({ totalCredit: 0, totalDebit: 0 });

    useLayoutEffect(() => {
        fetchData();
    }, []);

    async function fetchData() {
        const response = await api.get("home/total-income-expense");
        console.log("data",response.data.data)
        setTotalAmounts(response.data.data);
    }
    return (
        <div className="totals-container" >
            <div className="total-credit">
                <span className="text">TOTAL INCOME:</span>
                <span className="value">{totalAmounts.totalCredit}</span>
            </div>
            <div className="total-debit">
            <span className="text">TOTAL EXPENSES:</span>
            <span className="value">{totalAmounts.totalDebit}</span>
                
            </div>
        </div>
    )
}

