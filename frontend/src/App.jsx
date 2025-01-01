import React, { useContext, useEffect } from 'react';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Footer from './components/Footer';
import Login from './components/Login';
import { AppContext } from './context/AppContext';
import List from './pages/List';
import Admin from './pages/Admin';
import Booking from './pages/Booking';
import AdminLogin from './components/AdminLogin'; // Import AdminLogin

const App = () => {
  const { showLogin, token } = useContext(AppContext);

  useEffect(() => {
    // If no token is available, the user cannot access admin routes
  }, [token]);

  return (
    <div className='px-4 sm:px-10 md:px-14 lg:px-28 min-h-screen min-w-screen bg-gradient-to-b from-teal-50 to-orange-50'>
      <ToastContainer position='bottom-right' />
      <Navbar />
      {showLogin && <Login />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/list' element={<List />} />
        {/* Protected Admin Route */}
        <Route
          path='/admin'
          element={token ? <Admin /> : <Navigate to="/admin-login" />}
        />
        <Route path='/booking' element={<Booking />} />
        <Route path='/admin-login' element={<AdminLogin />} /> {/* AdminLogin route */}
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
