import React, { MouseEvent } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../UserContext";
import Lottie from "lottie-react";
import animationlogin from "../../public/loginanimation/loginanimation.json";
import { motion } from "framer-motion";

function Login() {
  const { setUser } = useUser();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const googleAuth = (e: MouseEvent) => {
    window.open("http://localhost:8080/auth/google/callback", "_self");
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/admin/check", {
        name: name,
        password: password,
      });
      if (response.data !== null) {
        console.log("Admin logged in:", response.data);
        setUser(response.data);
        localStorage.setItem("user", JSON.stringify(response.data));
        navigate("/");
      } else {
        console.log("Login failed:", response.data);
        alert("Login failed. Please check your credentials and try again.");
      }
    } catch (error: any) {
      if (error.response && error.response.status === 400) {
        console.error("Login error:", error.response.data);
      } else {
        console.error("Server error:", error.message);
      }
    }
  };
  

  return (
    <div className="flex h-screen overflow-x-hidden">
      <div className="grid w-screen grid-cols-1 px-10 py-10 mx-auto bg-gray-800 shadow-lg md:grid-cols-2">
        <motion.div
          initial={{ x: -1000 }}
          animate={{ x: 0 }}
          transition={{ duration: 2 }}
          className=" flex-col items-center justify-center md:flex hidden"
        >
          {/* <img src="login.jpg" alt="logo" className="w-64 h-64 p-5" /> */}
          <Lottie
            animationData={animationlogin}
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
            Log in form
          </motion.h1>
          <motion.form
            initial={{ x: 800 }}
            animate={{ x: 0 }}
            transition={{ duration: 2 }}
            onSubmit={handleLogin}
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
<div className="flex flex-col justify-center items-center">
            <button
              type="submit"
              className=" block px-[5vw] py-2 mb-3 text-white bg-blue-500 rounded-md "
            >
              Log in
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
            <Link to="/signup">Signup</Link>
          </motion.button>
        </div>
      </div>
    </div>
  );
}

export default Login;
