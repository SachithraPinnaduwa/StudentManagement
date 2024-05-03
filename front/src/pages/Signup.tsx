import React, { MouseEvent } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../UserContext';
function Signup() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { user, setUser } = useUser();
  const navigate = useNavigate();


  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    try {
      const response = await axios.post("http://localhost:8080/admin", { 
        name: name, 
        password : password,
      });
      if (response.status === 201) {
        console.log("Admin registered:", response.data); 
        setUser(response.data);
        navigate("/");
      }
    } catch (error : any) {
      console.error(
        "Registration error:",
        error.response ? error.response.data : "Unknown error"
      );
      alert(
        "Failed to register: " +
          (error.response ? error.response.data : "Unknown error")
      );
    }
  };
  
  const googleAuth = (e: MouseEvent) => {
    window.open("http://localhost:8080/auth/google/callback", "_self");
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="max-w-md px-6 py-8 bg-white shadow-lg rounded-lg">
        <h1 className="text-2xl font-bold mb-4">Signup form</h1>
        <div className="flex justify-center items-center mb-6">
          <img src="Signup.jpg" alt="logo" className="w-16 h-16 mr-2" />
          <h1 className="text-xl font-bold">Admin Create account</h1>
        </div>
        <form onSubmit={handleRegister}>
       
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your Email"
          className="w-full border border-gray-300 rounded-md py-2 px-3 mb-3"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
          className="w-full border border-gray-300 rounded-md py-2 px-3 mb-3"
        />
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm your password"
          className="w-full border border-gray-300 rounded-md py-2 px-3 mb-3"
        />
        <button type='submit' className="w-full bg-blue-500 text-white py-2 rounded-md mb-3">
          Signup
        </button>
        </form>
        <p className="text-center mb-3">or</p>
        <button className="w-full bg-red-500 text-white py-2 rounded-md mb-3" onClick={googleAuth}>
          Sign up with Google
        </button>
        <Link to="/login" className="text-center block text-blue-500">Login</Link>
      </div>
    </div>
  );
}

export default Signup;
