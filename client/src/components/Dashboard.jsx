import { useState } from 'react';
import { hooks } from '../hooks/dashboard.hooks';
import '../styles/dashboard.css';
import BudgetChart from './BudgetChart.jsx';
import { Transactions } from './Transactions';

const Dashboard = () => {
  const expenses = [
    { id: 2, category: 'Travel', budget: 720, amount: 850 },
    { id: 3, category: 'Medicine', budget: 1299.85, amount: 1563.54 },
    { id: 1, category: 'Phone Bill', budget: 319.01, amount: 319.01 },
    { id: 4, category: 'Rent', budget: 21995, amount: 21995 },
    { id: 5, category: 'Fuel', budget: 1500, amount: 1250 },
    { id: 6, category: 'Savings Account', budget: 10000, amount: 1000 },
    { id: 7, category: 'Mutual Funds', budget: 30000, amount: 30000 },
    { id: 8, category: 'Misc.', budget: 5000, amount: 2500 }
  ];
  const transactions = [
    {
      id: 1,
      description: 'Salary',
      category: 'Misc.',
      amount: 1000000000,
      type: 'credit',
      date: '12/07/2024'
    },
    {
      id: 2,
      description: 'Lunch',
      category: 'Misc.',
      amount: 150,
      type: 'debit',
      date: '12/07/2024'
    },
    {
      id: 3,
      description: 'Cat Food',
      category: 'Misc.',
      amount: 110,
      type: 'debit',
      date: '12/07/2024'
    },
    {
      id: 4,
      description: 'Face Wash',
      category: 'Medicine',
      amount: 350,
      type: 'debit',
      date: '12/07/2024'
    },
    {
      id: 5,
      description: 'Auto',
      category: 'Travel',
      amount: 65,
      type: 'debit',
      date: '12/07/2024'
    },
    {
      id: 6,
      description: 'Lunch',
      category: 'Misc.',
      amount: 110,
      type: 'debit',
      date: '11/07/2024'
    }
  ];
  return (
    <div className="dashboard">
      <DashboardChart expenses={expenses} />
      <UpcomingPaymentCard />
      <TotalsDisplay />
      {/* <TotalIncomeExpense /> */}
      <ExpensesTotal expenses={expenses} />
      <DashboardTransactionHistory transactions={transactions} />
    </div>
  );
};

const DashboardChart = ({ expenses }) => {
  const [activeChart, setActiveChart] = useState('0');
  const onClick = () => {
    setActiveChart(activeChart === '0' ? '1' : '0');
  };
  const chartData = expenses.map((item) => ({ label: item.category, value: item.budget }));
  return (
    <div className="dashboard-budget-chart">
      <div className="chart-header outline">
        <a href="#" onClick={onClick}>
          {'<-'}
        </a>
        <span>MONTHLY BREAKDOWN</span>
        <a href="#" onClick={onClick}>
          {'->'}
        </a>
      </div>
      <div className="chart-container">
        <BudgetChart chartData={chartData} />
      </div>
    </div>
  );
};

const UpcomingPaymentCard = () => {
  return (
    <div className="upcoming-payment-card">
      <div className="left-arrow"></div>
      <div className=""></div>
      <div className="right-arrow"></div>
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
        <div className="amount">{totalSavings}</div>
        <div className="label">TOTAL SAVINGS</div>
      </div>
      <div className="total-income-expense">
        <div className="income">
          <p className="label">MONTHLY INCOME</p>
          <p className="amount">{totalIncome}</p>
        </div>
        <div className="expense">
          <p className="label">MONTHLY EXPENSES</p>
          <p className="amount">{totalExpenses}</p>
        </div>
      </div>
    </div>
  );
};

const ExpensesTotal = ({ expenses }) => {
  return (
    <div className="expenses-table">
      <table className="dashboard-table">
        <caption className="expenses-table-caption">MONTHLY SPLIT UP</caption>
        <thead>
          <tr>
            <th>Category</th>
            <th>Budgeted Amount</th>
            <th>Realised Amount</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((row) => (
            <tr>
              {/* <th scope="row">{row.category}</th> */}
              <td>{row.category}</td>
              <td>{row.budget}</td>
              <td style={{ color: row.amount > row.budget ? '#d9534f' : '#76ae76' }}>
                {row.amount}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const DashboardTransactionHistory = ({ transactions }) => {
  return (
    <div className="dashboard-transaction-history">
      <table className="dashboard-table">
        <caption>TRANSACTION HISTORY</caption>
        <thead>
          <tr>
            <th>Description</th>
            <th>Category</th>
            <th>Amount</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((row) => (
            <tr>
              <td>{row.description}</td>
              <td>{row.category}</td>
              <td style={{ color: row.type === 'debit' ? '#d9534f' : '#76ae76' }}>{row.amount}</td>
              <td>{row.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;
