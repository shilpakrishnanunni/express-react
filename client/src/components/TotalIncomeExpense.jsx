import { useState, useLayoutEffect } from 'react';
import '../styles/totalIncomeExpense.css';
import api from '../utils/api';

export const TotalIncomeExpense = () => {
  const [totalAmounts, setTotalAmounts] = useState({ totalCredit: 0, totalDebit: 0 });

  useLayoutEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    const response = await api.get('home/total-income-expense');
    console.log('data', response.data);
    setTotalAmounts(response.data);
  }
  return (
    <div className="totals-container">
      <div className="total-balance">
        <span className="text">TOTAL SAVINGS</span>
        <span className="value">{totalAmounts?.totalSavings}</span>
      </div>
      <div className="monthly-income">
        <span className="value">{totalAmounts?.monthIncome}</span>
        <span className="text">THIS MONTH'S INCOME</span>
      </div>
      <div className="monthly-expenses">
        <span className="value">{totalAmounts?.monthDebit}</span>
        <span className="text">THIS MONTH'S EXPENSES</span>
      </div>
    </div>
  );
};
