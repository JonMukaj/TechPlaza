import React from "react";
import ReactStars from "react-rating-stars-component";
import { Link } from "react-router-dom";

import "./ProductCard.css";
const ProductCard = ({ product }) => {
  return (
    <>
      <div>
        <Link
          to={"/product/" + product?.id}
          className="product-card position-relative"
        >
          <div className="product-image">
            <img
              src={`/${product?.image}`}
              className="img-fluid h-100 w-100"
              alt="product image"
            />
          </div>
          <div className="product-details">
            {/* <h6 className="brand"><Link to='category'></Link> product.category</h6> */}
            <h5 className="product-title">{product?.name}</h5>
            <ReactStars
              count={5}
              size={24}
              value={product?.rating ? product.rating : 0}
              edit={false}
              activeColor="#ffd700"
            />
            <p className="price">${product?.price}</p>
          </div>
        </Link>
      </div>
    </>
  );
};

export default ProductCard;
