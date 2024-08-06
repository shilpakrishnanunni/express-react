import { hooks } from '../hooks/dashboard.hooks';
import '../styles/dashboard.css';

import { Transactions } from './Transactions';

const Dashboard = () => {
  return (
    <div className="dashboard">
      <BudgetChart />
      <TotalsDisplay />
      {/* <TotalIncomeExpense /> */}
    </div>
  );
};

const BudgetChart = () => {
  return (
    <div className="dashboard-budget-chart outline">
      <p>ONE</p>
    </div>
  );
};

const TotalsDisplay = () => {
  const totalSavings = 500;
  const totalIncome = 1500;
  const totalExpenses = 1000;
  return (
    <div className="dashboard-total">
      <div className="total-savings">
        <div className='amount'>{totalSavings}</div>
        <div className='label'>TOTAL SAVINGS</div>
      </div>
      <div className='total-income-expense'>
        <div className='income'>
          <p className='label'>MONTHLY INCOME</p>
          <p className='amount'>{totalIncome}</p>
        </div>
        <div className='expense'>
          <p className='label'>MONTHLY EXPENSES</p>
          <p className='amount'>{totalExpenses}</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
