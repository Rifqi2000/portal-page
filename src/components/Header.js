import React from 'react';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Simulasi logout
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <header className="flex justify-between items-center p-4 bg-green-600 text-white">
      <div className="font-bold text-xl">Portal Data</div>
      <button onClick={handleLogout} className="bg-red-500 px-4 py-2 rounded hover:bg-red-600">
        Logout
      </button>
    </header>
  );
};

export default Header;
