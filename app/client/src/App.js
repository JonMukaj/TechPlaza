import React, { Component } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import SignIn from "./Components/SignIn";
import SignUp from "./Components/SignUp";
import MainPage from "./Components/MainPage";
import Navbar from "./Components/Navbar";
import ProductList from "./Components/ProductList";
import RequireAuth from "./Components/RequireAuth";
import Layout from "./Components/Layout";
import Unauthorized from "./Components/Unauthorized";

function App() {
  let isAuthenticated = false;

  const ROLES = {
    admin: 1,
    user: 2,
  };

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<MainPage />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />

          <Route element={<RequireAuth allowedRoles={[ROLES.user]} />}>
            <Route path="/category/:category" element={<ProductList />} />
          </Route>
          <Route path="/unauthorized" element={<Unauthorized />} />
          <Route path="*" element={<h1>404 Not Found</h1>} />
        </Route>
      </Routes>
    </>
  );
}
export default App;
