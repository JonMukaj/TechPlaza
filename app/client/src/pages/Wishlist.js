import React, { useState, useEffect } from "react";
import BreadCrumb from "../Components/BreadCrumb";
import Container from "../Components/Container";
import { makeRequest } from "../services/product.service";
import { getWishlist, removeFromWishlist } from "../services/wishlist.service";
import { Link } from "react-router-dom";
import { LinearProgress } from "@mui/material";

const Wishlist = () => {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [isWishlistLoading, setIsWishlistLoading] = useState(false);

  const handleRemoveFromWishlist = (productId) => {
    removeFromWishlist(productId);
    let response = getWishlistItems();
    setWishlistItems(response);
  };

  const getWishlistItems = async () => {
    let items = getWishlist();
    if (!items) return;
    items = { productIds: items };
    const response = await makeRequest(`/products/ids`, "POST", items);
    setWishlistItems(response);
  };

  useEffect(() => {
    let cleanUP = false;
    setIsWishlistLoading(true);
    try {
      !cleanUP && (async () => await getWishlistItems())();
    } catch (error) {
      console.log(`Error while fetching products`);
    } finally {
      setIsWishlistLoading(false);
    }
    return () => {
      cleanUP = true;
    };
  }, []);

  return (
    <>
      <BreadCrumb title="Wishlist" />
      <Container class1="wishlist-wrapper home-wrapper-2 py-5">
        {isWishlistLoading ? (
          <>
            <LinearProgress color="secondary" />
            <LinearProgress color="success" />
            <LinearProgress color="inherit" />
          </>
        ) : !wishlistItems.length ? (
          <p>No items in wishlist</p>
        ) : (
          <>
            <div className="row">
              {wishlistItems.map((item) => (
                <>
                  <div className="col-3" style={{ border: "1px solid black" }}>
                    <div className="wishlist-card position-relative">
                      <div
                        className="product-remove"
                        onClick={() => handleRemoveFromWishlist(item.id)}
                      >
                        X
                      </div>
                      <img
                        src={item.image}
                        className="img-fluid"
                        alt={item.name}
                        width={100}
                        height={100}
                      />
                    </div>
                    <div className="py-3 px-3">
                      <Link to={`/product/${item.id}`}>
                        <h5 className="title">{item.name}</h5>
                      </Link>
                      <h6 className="price">${item.price}</h6>
                    </div>
                  </div>
                </>
              ))}
            </div>
          </>
        )}
      </Container>
    </>
  );
};

export default Wishlist;
