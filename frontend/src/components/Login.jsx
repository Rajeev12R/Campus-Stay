import React, { useState, useEffect, useContext } from 'react';
import userIcon from '../assets/profile_icon.png';
import lock from '../assets/lock_icon.svg';
import emailIcon from '../assets/email_icon.svg';
import cross from '../assets/cross_icon.svg';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [state, setState] = useState('Login'); // Manage Login/SignUp states
  const { setShowLogin , backendUrl, setToken, setUser} = useContext(AppContext);

  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      if(state === 'Login') {
        const {data} = await axios.post(backendUrl + '/api/user/login', {email, password})

        if(data.success){
          setToken(data.token)
          setUser(data.user)
          localStorage.setItem('token', data.token)
          setShowLogin(false)
          toast.success(data.message)
        }else{
          toast.error(data.message)
        }
      }else{
        const {data} = await axios.post(backendUrl + '/api/user/register', {name, email, password})

        if(data.success){
          setToken(data.token)
          setUser(data.user)
          localStorage.getItem('token', data.token)
          setShowLogin(false)
          toast.success(data.message)
        }else{
          toast.error(data.message)
        }
      }
      
    } catch (error) {
      toast.error(error.message); 
    }
  }

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const toggleState = () => {
    setState((prev) => (prev === 'Login' ? 'Sign Up' : 'Login'));
  };

  return (
    <div className="fixed inset-0 z-10 backdrop-blur-md bg-black/50 flex justify-center items-center animate__animated animate__fadeIn animate__faster">
      <form onSubmit={onSubmitHandler} className="w-80 bg-white rounded-lg shadow-lg p-6 space-y-6 relative animate__animated animate__fadeIn animate__faster">
        {/* Title */}
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mt-5 mb-4">{state}</h1>
          <p className="text-sm text-gray-500">
            {state === 'Login'
              ? 'Welcome back! Please sign in to continue'
              : 'Create an account to get started'}
          </p>
        </div>

        {/* Input Fields */}
        <div className="space-y-4">
          {state === 'Sign Up' && (
            <div className="flex items-center border rounded-md px-3 py-2 focus-within:ring-2 focus-within:ring-blue-500">
              <img
                src={userIcon}
                alt="User Icon"
                className="w-7 h-7 mr-2"
              />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Full Name"
                required
                className="w-full focus:outline-none placeholder-gray-400 text-gray-800"
              />
            </div>
          )}

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

        {state === 'Login' && (
          <a href="/" className="text-[#3d62e6] ml-2 block text-left">
            Forgot Password?
          </a>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-200"
        >
          {state === 'Login' ? 'Sign In' : 'Sign Up'}
        </button>

        {/* Footer Links */}
        <p className="mt-5 text-center text-sm text-gray-500">
          {state === 'Login' ? (
            <>
              Don't have an account?{' '}
              <span
                className="text-blue-600 cursor-pointer"
                onClick={toggleState}
              >
                Sign up
              </span>
            </>
          ) : (
            <>
              Already have an account?{' '}
              <span
                className="text-blue-600 cursor-pointer"
                onClick={toggleState}
              >
                Login
              </span>
            </>
          )}
        </p>

        {/* Close Icon */}
        <img
          src={cross}
          alt="Close Icon"
          onClick={() => setShowLogin(false)}
          className="absolute top-0 right-5 w-4 h-4 cursor-pointer"
        />
      </form>
    </div>
  );
};

export default Login;
