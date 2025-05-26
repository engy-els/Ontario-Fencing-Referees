import Availability from './pages/Availability';
import RefereeSearch from './pages/RefereeSearch';
import RefereeProfile from './pages/RefereeProfile';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import { AuthProvider } from './context/AuthContext';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import PrivateRoute from './routes/PrivateRoute';
import Signup from './pages/Signup';
import React from 'react';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Layout><RefereeSearch /></Layout>} />
          <Route path="/login" element={<Layout><Login /></Layout>} />
          <Route path="/signup" element={<Layout><Signup /></Layout>} />
          <Route path="/dashboard" element={<Layout><PrivateRoute><Dashboard /></PrivateRoute></Layout>} />
          <Route path="/availability" element={<Layout><PrivateRoute><Availability /></PrivateRoute></Layout>} />
          <Route path="/referee/:name" element={<Layout><RefereeProfile /></Layout>} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
