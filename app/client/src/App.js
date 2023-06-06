import React from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Layout from "./Components/Layout";
import Unauthorized from "./Components/Unauthorized";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import Products from "./pages/Products";
import Wishlist from "./pages/Wishlist";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import SingleProduct from "./pages/SingleProduct";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import EditProfile from "./pages/EditProfile";

function App() {
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
          <Route path="signup" element={<Signup />} />
          <Route path="account" element={<EditProfile />} />
          <Route path="/*" element={<Unauthorized />} />
        </Route>
      </Routes>
    </>
  );
}
export default App;
