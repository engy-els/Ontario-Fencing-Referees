import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';

const Navbar = () => {
  return (
    <nav className="bg-white border-b shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Left: Logo + Title */}
        <div className="flex items-center space-x-3">
          <img
            src={logo}
            alt="Ontario Fencing Association"
            className="h-10 w-auto object-contain"
            style={{ maxHeight: '40px' }}
          />
          <span className="text-lg font-semibold text-blue-800">
            Ontario Fencing Referees
          </span>
        </div>

        {/* Right: Navigation */}
        <div className="flex space-x-6 text-sm font-medium">
          <Link to="/search" className="text-gray-700 hover:text-blue-600">Search</Link>
          <Link to="/dashboard" className="text-gray-700 hover:text-blue-600">My Profile</Link>
          <Link to="/availability" className="text-gray-700 hover:text-blue-600">Hiring & Availability</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
