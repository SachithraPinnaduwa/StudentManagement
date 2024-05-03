import "./App.css";
import Home from "./pages/Home";
import { useEffect, useState } from "react";
import axios from "axios";
import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { useUser } from './UserContext';
function App() {
  const { user, setUser } = useUser();

  const getUser = async () => {
    try {
     const {data} = await axios.get("http://localhost:8080/auth/login/success", {withCredentials: true});
     setUser(data.user._json);
     console.log(data);
    } catch (error) {
      console.error(error.message);
    }
  };
useEffect(() => {
  getUser();
}
, []);
  return (
    <>
      <Routes>
        <Route path="/login" element={user ? <Navigate to={"/"}/> : <Login /> } />
        <Route path="/signup" element={user ? <Navigate to={"/"}/> : <Signup />} />
        <Route  path="/"  element={user? <Home user={user} /> : <Navigate to={"/login"}/>} />
      </Routes>
    </>
  );
}

export default App;
