import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import { Switch, Route, Routes, Link } from "react-router-dom";
import Login from "./LogIn/LogIn";

function App() {
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>{" "}
          </li>
        </ul>
      </nav>
      <h1>App</h1>
      <Routes>
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
