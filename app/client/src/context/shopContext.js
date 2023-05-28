import React from "react";
import { useState } from "react";

export const ShopContext = React.createContext(null);
let cartItems = [
  {
    id: 1,
    title: "Product 1",
    description: "This is a product description",
    price: 9.99,
    image: "https://via.placeholder.com/150",
    inStock: 0,
    category: "Electronics",
    rating: 4,
    quantity: 4,
    ratingCount: 69,
    categoryID: 2,
  },
  {
    id: 2,
    title: "Product 1",
    description: "This is a product description",
    price: 9.99,
    image: "https://via.placeholder.com/150",
    inStock: 0,
    category: "Electronics",
    rating: 4,
    quantity: 4,
    ratingCount: 69,
    categoryID: 2,
  },
];
const getDefaultCart = () => {
  //   let cart = {};
  //   for (let i = 0; i < cartItems.length; i++) {
  //     cart[i] = 0;
  //   }
  //   return cart;
  return (cartItems = [
    {
      id: 1,
      title: "Product 1",
      description: "This is a product description",
      price: 9.99,
      image: "https://via.placeholder.com/150",
      inStock: 0,
      category: "Electronics",
      rating: 4,
      quantity: 4,
      ratingCount: 69,
      categoryID: 2,
    },
    {
      id: 2,
      title: "Product 1",
      description: "This is a product description",
      price: 9.99,
      image: "https://via.placeholder.com/150",
      inStock: 0,
      category: "Electronics",
      rating: 4,
      quantity: 4,
      ratingCount: 69,
      categoryID: 2,
    },
  ]);
};
export const ShopContextProvider = (props) => {
  const [cartItems, setCartItems] = useState(getDefaultCart());

  const addToCart = (productId, addedQuantity) => {
    setCartItems((prevCartItems) => ({
      ...prev,
      [itemId]: prevCartItems[itemId] + addedQuantity,
    }));
  };

  const removeFromCart = (productId) => {
    setCartItems((prevCartItems) => ({
      ...prev,
      [itemId]: prevCartItems[itemId] - 1,
    }));
  };

  const contextValue = { cartItems, addToCart, removeFromCart };
  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};
