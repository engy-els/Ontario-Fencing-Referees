import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './routes/PrivateRoute';

import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Availability from './pages/Availability';
import RefereeSearch from './pages/RefereeSearch';
import RefereeProfile from './pages/RefereeProfile';

import Navbar from './components/Navbar';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Navbar />
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/search" element={<RefereeSearch />} />
          <Route path="/referee/:name" element={<RefereeProfile />} />

          {/* Private Routes */}
          <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
          <Route path="/availability" element={<PrivateRoute><Availability /></PrivateRoute>} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
