import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (err) {
      console.error('Failed to logout:', err);
    }
  };

  return (
    <nav className="bg-gray-900 text-white px-6 py-4 flex justify-between items-center">
      <div className="space-x-4">
        <Link to="/search" className="hover:underline">Search</Link>
        {currentUser && (
          <>
            <Link to="/dashboard" className="hover:underline">My Profile</Link>
            <Link to="/availability" className="hover:underline">Hiring & Availability</Link>
          </>
        )}
      </div>
      {currentUser && (
        <button
          onClick={handleLogout}
          className="bg-red-600 hover:bg-red-700 px-4 py-1 rounded text-sm"
        >
          Logout
        </button>
      )}
    </nav>
  );
};

export default Navbar;
