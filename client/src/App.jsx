import React, { useContext, useEffect } from "react";
import "./App.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import MedRecord from "./pages/MedRecord";
import Events from "./pages/Events";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import axios from "axios";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

import { Context } from "./main";
const App= () => {
  const { isAuthenticated, setIsAuthenticated, setUser } =
  useContext(Context);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/api/v1/user/patient/me",
          {
            withCredentials: true,
          }
        );
        setIsAuthenticated(true);
        setUser(response.data.user);
      } catch (error) {
        setIsAuthenticated(false);
        setUser({});
      }
    };
    fetchUser();
  }, [isAuthenticated]);
  return (
    <>
    <Router>
      <Navbar />
      <Routes>
      
        <Route path="/" element={<Home />} />
        <Route path="/medrecord" element={<MedRecord />} />
        {/* <Route path="/events" element={<Layout />}></Route> */}
        <Route path="/events" element={<Events />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        {/* <Route index element = {<IndexPage />} />
        <Route path='/useraccount' element = {<UserAccountPage />}/> */}
      </Routes>
      <Footer />
      <ToastContainer position="top-center" /> 
    </Router>
  </>
  )
}
export default App; 