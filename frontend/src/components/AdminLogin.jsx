import React, { useState, useEffect, useContext } from 'react';
import lock from '../assets/lock_icon.svg';
import emailIcon from '../assets/email_icon.svg';
import cross from '../assets/cross_icon.svg';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
  const { setShowAdminLogin, backendUrl, setToken } = useContext(AppContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post(backendUrl + '/api/user/admin-login', { email, password });

      if (data.success) {
        setToken(data.token);
        localStorage.setItem('token', data.token);
        setShowAdminLogin(false);
        toast.success(data.message);
        navigate('/admin'); // Redirect to Admin page after login
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error('Login failed. Please try again.');
    }
  };

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <div className="fixed inset-0 z-10 backdrop-blur-md bg-black/50 flex justify-center items-center animate__animated animate__fadeIn animate__faster">
      <form onSubmit={onSubmitHandler} className="w-80 bg-white rounded-lg shadow-lg p-6 space-y-6 relative animate__animated animate__fadeIn animate__faster">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mt-5 mb-4">Admin Login</h1>
          <p className="text-sm text-gray-500">Welcome back! Please sign in to continue</p>
        </div>
        <div className="space-y-4">
          <div className="flex items-center border rounded-md px-3 py-2 focus-within:ring-2 focus-within:ring-blue-500">
            <img
              src={emailIcon}
              alt="Email Icon"
              className="w-4 h-4 mr-4 ml-1"
            />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
              className="w-full focus:outline-none placeholder-gray-400 text-gray-800"
            />
          </div>
          <div className="flex items-center border rounded-md px-3 py-2 focus-within:ring-2 focus-within:ring-blue-500">
            <img
              src={lock}
              alt="Lock Icon"
              className="w-4 h-4 mr-4 ml-1.5"
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
              className="w-full focus:outline-none placeholder-gray-400 text-gray-800"
            />
          </div>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-200"
        >
          Sign In
        </button>
        <img
          src={cross}
          alt="Close Icon"
          onClick={() => setShowAdminLogin(false)}
          className="absolute top-0 right-5 w-4 h-4 cursor-pointer"
        />
      </form>
    </div>
  );
};

export default AdminLogin;