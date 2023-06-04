import React, { useContext, useState, useEffect } from "react";
import BreadCrumb from "../Components/BreadCrumb";
import { Link } from "react-router-dom";
import Container from "../Components/Container";
import CartItem from "./CartItem";
import CartContext from "../context/CartProvider";
import axios from "axios";

const Cart = () => {
  const { getCart, removeFromCart } = useContext(CartContext);
  const [serverProducts, setServerProducts] = useState([]);
  const [cartItemsWithDetails, setCartItemsWithDetails] = useState([]);
  let itemList = [];
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
        if (serverProduct.quantity < cartProduct.quantity) {
          removeFromCart(
            cartProduct.productId,
            cartProduct.quantity - serverProduct.quantity
          );
          serverProduct.quantity = serverProduct.quantity; // Update quantity to match server
        } else if (serverProduct.quantity === 0) {
          removeFromCart(cartProduct.productId, cartProduct.quantity);
        }

        updatedCartItemsWithDetails.push({ ...cartProduct, ...serverProduct });
      }
    });

    itemList = getCart();
    setCartItemsWithDetails(updatedCartItemsWithDetails);
  }, [serverProducts]);

  const handleIncrease = (productId) => {
    addToCart(productId, 1);
  };

  const handleDecrease = (productId) => {
    removeFromCart(productId, 1);
  };

  const handleRemove = (productId) => {
    // Removing all quantities of the product
    const product = getCart().find((item) => item.productId === productId);
    if (product) {
      removeFromCart(productId, product.quantity);
    }
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
                        <p>
                          <Link to={"/categories/" + cartItem.categoryID}>
                            Browse category
                          </Link>
                        </p>
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
                          max={10}
                          id=""
                        />
                      </div>
                    </div>
                    <div className="cart-col-4">
                      <h5 className="price">$</h5>
                    </div>
                  </div>
                </>
              ))
            )}
          </div>
          <div className="col-12 py-2 mt-4">
            <div className="d-flex justify-content-between align-items-baseline">
              <Link to="/product" className="button">
                Continue To Shopping
              </Link>
              <div className="d-flex flex-column align-items-end">
                <h4>SubTotal: $ 1000</h4>
                <p>Taxes and shipping calculated at checkout</p>
                <Link to="/checkout" className="button">
                  Checkout
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Cart;
