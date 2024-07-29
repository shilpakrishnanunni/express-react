import { useState, useEffect, useLayoutEffect } from 'react';
import api from '../utils/api';
import { useQuery, QueryClient, useQueryClient, useMutation } from '@tanstack/react-query';
import '../styles/transactions.css';

export default function HelloWorld() {
  const [response, setResponse] = useState('');

  const handleClick = async () => {
    try {
      const result = await api.get('hello-world');
      console.log('result', result);
      setResponse(result.data.response);
    } catch (error) {
      console.log('error fetching data', error);
    }
  };

  return (
    <div>
      <button onClick={handleClick}>Click Here</button>
      <div>{response}</div>
    </div>
  );
}

export function Timer() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      setCount((count) => count + 1);
    }, 1000);
  });

  return <h1>Rendered {count} times.</h1>;
}

export const Transactions = () => {
  const [txn, setTxn] = useState([]);

  useLayoutEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await api.get('home/transaction-history');
      console.log('data', response.data.data);
      setTxn(response.data.data);
    } catch (error) {
      console.log('Error fetching data', error);
    }
  };

  const onFormSubmit = async (formData) => {
    try {
      await api.post('home/add-transaction', JSON.stringify(formData));
      fetchData();
    } catch (error) {
      console.log('Error submitting form', error);
    }
  };

  return (
    <div className="txn-container">
      <TransactionForm onFormSubmit={onFormSubmit} />
      <TransactionTable transactions={txn} />
    </div>
  );
};

const TransactionForm = ({ onFormSubmit }) => {
  const [formData, setFormData] = useState({ description: '', amount: '', type: 'debit' });

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.description && formData.amount) {
      onFormSubmit(formData);
      setFormData({ description: '', amount: '', type: 'debit' });
    }
  };

  const handleCheckBox = (e) => {
    const isChecked = e.target.checked;
    console.log('checked', isChecked);
    setFormData({
      ...formData,
      type: isChecked ? 'credit' : 'debit'
    });
  };

  return (
    <div className="txn-form-container">
      <h4>Add Transaction</h4>
      <form onSubmit={handleSubmit} className="txn-form">
        {/* <h4>Add Transaction</h4> */}
        <div className="input-field input-description">
          <input
            id="description"
            type="text"
            className="validate"
            name="description"
            placeholder="description"
            value={formData.description}
            onChange={handleChange}
          />
          {/* <label htmlFor="description">Description</label> */}
        </div>
        <div className="input-field input-amount">
          <label htmlFor="amount">₹</label>
          <input
            id="amount"
            type="number"
            className="validate"
            name="amount"
            placeholder="amount"
            value={formData.amount}
            onChange={handleChange}
          />
          {/* <label htmlFor="amount">Amount</label> */}
        </div>
        <div className="input-field credit-debit">
          <label className="toggle-switch">
            <input type="checkbox" onChange={handleCheckBox} checked={formData.type === 'credit'} />
            <div className="toggle-switch-background">
              <div className="toggle-switch-handle"></div>
            </div>
          </label>
        </div>
        <div className="input-field submit-button">
          <button className="button" type="submit">
            Add
          </button>
        </div>
      </form>
    </div>
  );
};

const TransactionTable = ({ transactions }) => {
  console.log('new table');
  return (
    <div className="table-container">
      <h1>Transaction History</h1>
      <ul>
        {transactions.map((txn, index) => (
          <li key={index} className="table-row">
            <span className="txn-description">{txn.description ?? '<No Description>'}</span>
            <span
              className={txn.type == 'credit' ? 'txn-amount green-text' : 'txn-amount red-text'}
            >
              {txn.amount}
            </span>
            <span className="txn-date">{txn.createdAt}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};
