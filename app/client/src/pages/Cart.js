import React, { useContext, useState, useEffect } from "react";
import BreadCrumb from "../Components/BreadCrumb";
import { Link } from "react-router-dom";
import Container from "../Components/Container";
import CartContext from "../context/CartProvider";
import axios from "axios";
import useAuth from "../hooks/useAuth";

const Cart = () => {
  const { addToCart, getCart, removeFromCart } = useContext(CartContext);
  const [serverProducts, setServerProducts] = useState([]);
  const [cartItemsWithDetails, setCartItemsWithDetails] = useState([]);
  const { user } = useAuth();
  useEffect(() => {
    // Extract product IDs
    const cartItems = getCart();
    const productIds = cartItems.map((item) => item.productId);

    // Fetch updated product data from the server
    axios
      .post("/products/ids", { productIds })
      .then((response) => {
        setServerProducts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching product data:", error);
      });
  }, []);

  useEffect(() => {
    // Update local cart based on the server data and create a detailed copy
    const updatedCartItemsWithDetails = [];

    serverProducts.forEach((serverProduct) => {
      const cartProduct = getCart().find(
        (item) => item.productId === serverProduct.id
      );

      if (cartProduct) {
        if (serverProduct.stock < cartProduct.quantity) {
          removeFromCart(
            cartProduct.productId,
            cartProduct.quantity - serverProduct.stock
          );
        } else if (serverProduct.stock <= 0) {
          removeFromCart(cartProduct.productId, cartProduct.quantity);
        }

        updatedCartItemsWithDetails.push({
          quantity: cartProduct.quantity,
          maxQuantity: serverProduct.stock,
          ...serverProduct,
        });
      }
    });

    setCartItemsWithDetails(updatedCartItemsWithDetails);
  }, [serverProducts]);

  const handleQuantityChange = (productId, newQuantity) => {
    newQuantity = parseInt(newQuantity);
    console.log(productId, newQuantity);
    const productInCart = getCart().find(
      (item) => item.productId === productId
    );
    console.log(productInCart);
    if (productInCart) {
      if (newQuantity > productInCart.maxQuantity) {
        // Don't allow quantity to be set higher than available
        newQuantity = productInCart.maxQuantity;
      }
      removeFromCart(productId, productInCart.quantity);
      addToCart(productId, newQuantity);
    }
    // Update the quantity in the cartItemsWithDetails state
    setCartItemsWithDetails((prevCartItemsWithDetails) =>
      prevCartItemsWithDetails.map((item) => {
        if (item.id === productId) {
          return { ...item, quantity: newQuantity };
        }
        return item;
      })
    );
    console.log("b");
  };

  const handleRemove = (productId) => {
    const productInCart = getCart().find(
      (item) => item.productId === productId
    );
    if (productInCart) {
      removeFromCart(productId, productInCart.quantity);
    }
    // Remove the product from the cartItemsWithDetails state
    setCartItemsWithDetails((prevCartItemsWithDetails) =>
      prevCartItemsWithDetails.filter((item) => item.id !== productId)
    );
  };

  return (
    <>
      <BreadCrumb title="Cart" />
      <Container class1="cart-wrapper home-wrapper-2 py-5">
        <div className="row">
          <div className="col-12">
            <div className="cart-header py-3 d-flex justify-content-between align-items-center">
              <h4 className="cart-col-1">Product</h4>
              <h4 className="cart-col-2">Price</h4>
              <h4 className="cart-col-3">Quantity</h4>
              <h4 className="cart-col-4">Total</h4>
            </div>
            {cartItemsWithDetails.length === 0 ? (
              <p>Your cart is empty.</p>
            ) : (
              cartItemsWithDetails.map((cartItem) => (
                <>
                  <div className="cart-data py-3 mb-2 d-flex justify-content-between align-items-center">
                    <div className="cart-col-1 gap-15 d-flex align-items-center">
                      <div className="w-25">
                        <img
                          src={cartItem.image}
                          className="img-fluid"
                          alt="product image"
                        />
                      </div>
                      <div className="w-75">
                        <p>{cartItem.name}</p>
                      </div>
                    </div>
                    <div className="cart-col-2">
                      <h5 className="price">${cartItem.price}</h5>
                    </div>
                    <div className="cart-col-3 d-flex align-items-center gap-15">
                      <div>
                        <input
                          className="form-control"
                          type="number"
                          name=""
                          min={1}
                          max={cartItem.maxQuantity}
                          id=""
                          value={cartItem.quantity}
                          onChange={(e) =>
                            handleQuantityChange(cartItem.id, e.target.value)
                          }
                        />
                      </div>
                    </div>
                    <div className="cart-col-4">
                      <h5 className="price">
                        ${cartItem.quantity * cartItem.price}
                      </h5>
                    </div>
                    <button onClick={() => handleRemove(cartItem.id)}>
                      Remove
                    </button>
                  </div>
                </>
              ))
            )}
          </div>
          <div className="col-12 py-2 mt-4">
            <div className="d-flex justify-content-between align-items-baseline">
              <Link to="/" className="button">
                Continue To Shopping
              </Link>
              <div className="d-flex flex-column align-items-end">
                <h4>
                  Subtotal: $
                  {cartItemsWithDetails.reduce((sum, item) => {
                    return sum + item.price * item.quantity;
                  }, 0)}
                </h4>
                {cartItemsWithDetails.length <= 0 ? null : user ? (
                  <Link to="/checkout" className="button">
                    Checkout
                  </Link>
                ) : (
                  <Link to="/login" className="button">
                    Login to proceed
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Cart;
