import "./App.css";
import Home from "./pages/Home";
import { useEffect } from "react";
import axios from "axios";
import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { useUser } from './UserContext';
import AddStudentForm from "./components/AddStudentForm";

import StudentTable from "./components/StudentTable";
function App() {
  const { user, setUser } = useUser();

  const getUser = async () => {
    try {
     const {data} = await axios.get("http://localhost:8080/auth/login/success", {withCredentials: true});
     const userData = data.data.user._json;


     localStorage.setItem('user', JSON.stringify(userData));

     setUser(userData);
     console.log(data);
    } catch (error) {
      console.error(error.message);
    }
  };
  useEffect(() => {

    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setUser(storedUser);
    } else {
      getUser();
    }
  }, [setUser]);
  return (
    <>
      <Routes>
        <Route path="/login" element={user ? <Navigate to={"/"}/> : <Login /> } />
        <Route path="/signup" element={user ? <Navigate to={"/"}/> : <Signup />} />
        <Route  path="/"  element={user? <Home user={user} /> : <Navigate to={"/login"}/>} />
        <Route  path="/form" element={user? <AddStudentForm /> : <Navigate to={"/login"}/>} />
        <Route path="/table" element={user? <StudentTable /> : <Navigate to={"/login"}/>} />
      </Routes>
    </>
  );
}

export default App;
