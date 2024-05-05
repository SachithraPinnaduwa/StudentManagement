import React, { MouseEvent } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../UserContext";
import Lottie from "lottie-react";
import { motion } from "framer-motion";
import animationSignup from "../../public/login.json";

function Signup() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [picture, setPicture] = useState("");
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
        picture: picture,
        password: password,
      });
      if (response.status === 201) {
        console.log("Admin registered:", response.data);
        setUser(response.data);
        navigate("/");
      }
    } catch (error: any) {
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

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const base64 = await convertToBase64(file);
      setPicture(base64); 
     console.log('base64:', base64);
    }
  };

  function convertToBase64(file) {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  }

  return (
    <div className="flex h-screen overflow-x-hidden">
      <div className="grid w-screen grid-cols-1 px-10 py-10 mx-auto bg-gray-800 shadow-lg md:grid-cols-2">
      <motion.div
          initial={{ x: -1000 }}
          animate={{ x: 0 }}
          transition={{ duration: 2 }}
          className=" flex-col items-center justify-center md:flex hidden "
        >
          <Lottie
            animationData={animationSignup}
            className="w-[80%] h-[80%] p-5"
          />
        </motion.div>
        <div className="flex flex-col justify-center items-center">
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 3.5 }}
            className="mb-[10%] text-2xl font-bold text-center text-white"
          >
            Signup form
          </motion.h1>
          <motion.form
            initial={{ x: 800 }}
            animate={{ x: 0 }}
            transition={{ duration: 2 }}
            onSubmit={handleRegister}
            className="w-full max-w-md"
          >
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your Name"
              className="w-full px-3 py-2 mb-3  border border-gray-300 rounded-md"
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full  px-3 py-2 mb-3 border border-gray-300 rounded-md "
            />
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm your password"
              className="w-full  px-3 py-2 mb-3 border border-gray-300 rounded-md "
            />
             <input
              id="file_input"
              type="file"
              accept=".jpeg, .png, .jpg"
              onChange={handleFileUpload}
              className="w-full text-2xl mb-3  border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none  dark:border-gray-600 dark:placeholder-gray-400"
            />
            <div className="flex flex-col justify-center items-center">
              <button
                type="submit"
                className=" block px-[5vw] py-2 mb-3 text-white bg-blue-500 rounded-md "
              >
                Signup
              </button>
              <h2 className="p-3 text-center text-white">OR</h2>
              <button
                className="px-[5vw] py-2 mb-3 text-gray-500 bg-white rounded-md block"
                onClick={googleAuth}
              >
                <img src="google.png" alt="google" className="w-6 h-6 inline-block mr-4" />
              <span className="inline-block">Sign up with Google</span>
              </button>
            </div>
          </motion.form>
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 3.5 }}
            className="py-2 px-[5vw] text-white bg-blue-500 rounded-lg "
          >
            <Link to="/login">Login</Link>
          </motion.button>
        </div>
        
      </div>
    </div>
  );
}

export default Signup;
