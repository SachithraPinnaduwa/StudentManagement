import React, { MouseEvent } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../UserContext';

function Login() {
  const { user, setUser } = useUser();
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const googleAuth = (e: MouseEvent) => {
    window.open("http://localhost:8080/auth/google/callback", "_self");
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/admin/check', { 
        name: name, 
        password: password,
      });
      if (response.data !== null) {  
        console.log('Admin logged in:', response.data); 
        setUser(response.data);
        localStorage.setItem('user', JSON.stringify(response.data)); 
        navigate('/'); 
      } else {
        console.log('Login failed:', response.data); 
        alert('Login failed. Please check your credentials and try again.'); 
      }
    } catch (error : any) {
      if (error.response && error.response.status === 400) {
        console.error('Login error:', error.response.data); 
      } else {
        console.error('Server error:', error.message); 
      }
    }
  };
  

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="max-w-md px-6 py-8 bg-white shadow-lg rounded-lg">
        <h1 className="text-2xl font-bold mb-4">Log in form</h1>
        <div className="flex justify-center items-center mb-6">
          <img src="login.jpg" alt="logo" className="w-16 h-16 mr-2" />
          <h1 className="text-xl font-bold">Admin login</h1>
        </div>
        <form onSubmit={handleLogin}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your Name"
          className="w-full border border-gray-300 rounded-md py-2 px-3 mb-3"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
          className="w-full border border-gray-300 rounded-md py-2 px-3 mb-3"
        />
        <button type='submit' className="w-full bg-blue-500 text-white py-2 rounded-md mb-3">
          Log in
        </button>
        <p className="text-center mb-3">or</p>
        <button  className="w-full bg-red-500 text-white py-2 rounded-md mb-3" onClick={googleAuth}>
          Sign in with Google
        </button>
        </form>
        <Link to="/signup" className="text-center block text-blue-500">Signup</Link>
      </div>
    </div>
  );
}

export default Login;
