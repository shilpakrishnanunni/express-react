// import "../styles/dashboard.css";

import { TotalIncomeExpense } from './TotalIncomeExpense';
import { Transactions } from './Transactions';

export default function Dashboard() {
  return (
    <div className="dashboard">
      {/* < Transactions /> */}
      <TotalIncomeExpense />
    </div>
  );
}
