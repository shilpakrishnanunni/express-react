import { Navigate, Route, Routes } from 'react-router-dom';
import MainLayout from './components/MainLayout.jsx';
import Login from './components/login/loginPage.jsx';
import { useEffect, useState } from 'react';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem('isAuthenticated') === 'true'
  );
  const handleLogin = (userId) => {
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('userId', userId);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.setItem('isAuthenticated', 'false');
    localStorage.removeItem('userId');
    setIsAuthenticated(false);
  };

  useEffect(() => {
    const storedAuth = localStorage.getItem('isAuthenticated');
    setIsAuthenticated(storedAuth==='true');
  }, []);

  return (
    <Routes>
      {isAuthenticated ? (
        <Route path="*" element={<MainLayout onLogout={handleLogout} />} />
      ) : (
        <>
          <Route path="/" element={<Login onLogin={handleLogin} />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </>
      )}
    </Routes>
  );
}

export default App;
