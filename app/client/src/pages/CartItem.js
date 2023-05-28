import React from "react";
import { Link } from "react-router-dom";
import { AiFillDelete } from "react-icons/ai";
import { useState } from "react";

const CartItem = ({ cartItem }) => {
  const [isComponentRendered, setIsComponentRendered] = useState(true);

  const handleDelete = () => {};
  return (
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
            <p>{cartItem.title}</p>
            <p>
              Category: &nbsp;
              <Link to={"/category/" + cartItem.categoryID}>
                {cartItem.category}
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
          <div></div>
        </div>
        <div className="cart-col-4">
          <h5 className="price">$</h5>
        </div>
      </div>
    </>
  );
};

export default CartItem;
