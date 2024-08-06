import { Navigate, Route, Routes } from 'react-router-dom';
import NavBar from './NavBar.jsx';
import LeftMenu from './LeftMenu.jsx';
import Dashboard from './Dashboard.jsx';
import Budget from './Budget.jsx';
import { Transactions } from './Transactions.jsx';
import Portfolio from './Portfolio.jsx';
import '../styles/mainLayout.css';

export default function MainLayout({onLogout}) {
  // TODO homepage api call here.
  // TODO rerender totalincomeexpense when new transaction is added
  const username = "User 1";
  return (
    <div className="main-div">
      <NavBar username={username} onLogout={onLogout} />
      <LeftMenu />
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/budget" element={<Budget />} />
        <Route path="/transactions" element={<Transactions />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </div>
  );
}
