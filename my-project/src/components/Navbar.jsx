import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';

const Navbar = () => (
  <nav className="bg-white shadow p-4 flex items-center justify-between">
    <div className="flex items-center gap-4">
      <Link to="/">
        <img src={logo} alt="Logo" className="h-10" />
      </Link>
      <Link to="/" className="text-xl font-semibold text-blue-800">Ontario Fencing Referees</Link>
    </div>
    <div className="space-x-4">
      <Link to="/signup" className="text-blue-600 hover:underline">Sign Up</Link>
      <Link to="/login" className="text-blue-600 hover:underline">Log In</Link>
      <Link to="/" className="text-blue-600 hover:underline">Search</Link>
      <Link to="/profile" className="text-blue-600 hover:underline">My Profile</Link>
      <Link to="/availability" className="text-blue-600 hover:underline">Hiring & Availability</Link>
    </div>
  </nav>
);

export default Navbar;
