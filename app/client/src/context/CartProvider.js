import React, { createContext, useState, useEffect } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    // Load the cart from local storage when initializing the state
    const localData = localStorage.getItem("cart");
    return localData ? JSON.parse(localData) : [];
  });

  useEffect(() => {
    // Store the cart in local storage whenever it changes
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (productId, quantity = 1) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find(
        (item) => item.productId === productId
      );

      if (existingProduct) {
        existingProduct.quantity += quantity;
      } else {
        prevCart.push({ productId, quantity });
      }

      return [...prevCart];
    });
  };

  const removeFromCart = (productId, quantity = 1) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find(
        (item) => item.productId === productId
      );

      if (existingProduct) {
        if (existingProduct.quantity > quantity) {
          existingProduct.quantity -= quantity;
        } else {
          // If the quantity to be removed is greater than or equal to the existing quantity,
          // remove the product from the cart
          return prevCart.filter((item) => item.productId !== productId);
        }
      }

      return [...prevCart];
    });
  };

  const getCart = () => {
    return [...cart];
  };
  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, getCart }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
