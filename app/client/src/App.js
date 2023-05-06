import React, { Component } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import SignIn from "./Components/SignIn";
import SignUp from "./Components/SignUp";
import MainPage from "./Components/MainPage";
import Navbar from "./Components/Navbar";

function App() {
  let isAuthenticated = false;

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/" element={<MainPage />} />
      </Routes>
    </>
  );
}
export default App;
