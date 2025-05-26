// src/components/Layout.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <nav className="flex items-center justify-between px-6 py-3 bg-white shadow-md">
        <div className="flex items-center gap-3">
          <img src={logo} alt="Ontario Fencing Logo" className="h-10 w-auto" />
          <span className="text-lg font-semibold">Ontario Fencing Referees</span>
        </div>
        <div className="flex gap-6 text-blue-600 font-medium">
          <Link to="/" className="hover:underline">Search</Link>
          <Link to="/dashboard" className="hover:underline">My Profile</Link>
          <Link to="/availability" className="hover:underline">Hiring & Availability</Link>
        </div>
      </nav>
      <main className="max-w-4xl mx-auto p-6">{children}</main>
    </div>
  );
};

export default Layout;
