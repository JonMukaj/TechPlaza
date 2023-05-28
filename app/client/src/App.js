import React, { Component } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Layout from "./Components/Layout";
import MainPage from "./Components/MainPage";
import RequireAuth from "./Components/RequireAuth";
import Unauthorized from "./Components/Unauthorized";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Products from "./pages/Products";
import Wishlist from "./pages/Wishlist";
import Login from "./pages/Login";
import Forgotpassword from "./pages/Forgotpassword";
import Signup from "./pages/Signup";
import Resetpassword from "./pages/Resetpassword";
import TermAndContions from "./pages/TermAndContions";
import SingleProduct from "./pages/SingleProduct";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";

function App() {
  const ROLES = {
    admin: 1,
    user: 2,
  };

  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="contact" element={<Contact />} />
          <Route path="categories/:id" element={<Products />} />
          <Route path="product/:id" element={<SingleProduct />} />
          <Route path="cart" element={<Cart />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="wishlist" element={<Wishlist />} />
          <Route path="login" element={<Login />} />
          <Route path="forgot-password" element={<Forgotpassword />} />
          <Route path="signup" element={<Signup />} />
          <Route path="reset-password" element={<Resetpassword />} />
          <Route path="term-conditions" element={<TermAndContions />} />
          <Route path="/*" element={<Unauthorized />} />
        </Route>
      </Routes>
    </>
  );
}
export default App;
