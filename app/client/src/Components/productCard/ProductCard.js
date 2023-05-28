import React from "react";
import ReactStars from "react-rating-stars-component";
import { Link } from "react-router-dom";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteIcon from "@mui/icons-material/Favorite";
import VisibilityIcon from "@mui/icons-material/Visibility";
import "./ProductCard.css";
const ProductCard = ({ product }) => {
  return (
    <>
      <div>
        <Link
          to={"/product/" + product?.id}
          className="product-card position-relative"
        >
          <div className="wishlist-icon position-absolute">
            <button className="border-0 bg-transparent">
              <FavoriteIcon />
            </button>
          </div>
          <div className="product-image">
            <img
              src={product?.image}
              className="img-fluid"
              alt="product image"
            />
          </div>
          <div className="product-details">
            <h6 className="brand">brand</h6>
            <h5 className="product-title">{product?.title}</h5>
            <ReactStars
              count={5}
              size={24}
              value={product?.rating ? product.rating : 0}
              edit={false}
              activeColor="#ffd700"
            />
            <p className="price">${product?.price}</p>
          </div>
          <div className="action-bar position-absolute">
            <div className="d-flex flex-column gap-15">
              <button className="border-0 bg-transparent">
                <VisibilityIcon />
              </button>
              <button className="border-0 bg-transparent">
                <ShoppingCartIcon />
              </button>
            </div>
          </div>
        </Link>
      </div>
    </>
  );
};

export default ProductCard;
