import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import Container from "../Components/Container";
import axios from "axios";
import CartContext from "../context/CartProvider";
const Checkout = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [error, setError] = useState("");
  const { getCart, removeAll } = useContext(CartContext);
  const navigate = useNavigate();

  const handlePurchase = async (e) => {
    e.preventDefault();
    //check if all fields are filled
    if (
      !firstName ||
      !lastName ||
      !email ||
      !phoneNumber ||
      !address ||
      !city ||
      !zipcode
    ) {
      alert("Please fill all fields");
    } else {
      const data = {
        firstName,
        lastName,
        email,
        phoneNumber,
        address,
        city,
        zipcode,
      };
      const cartItems = getCart();
      const updatedCart = cartItems.map((item) => ({
        id: item.productId,
        quantity: item.quantity,
      }));
      data.order = updatedCart;
      const accessToken = JSON.parse(localStorage.getItem("user")).accessToken;
      console.log(data);
      console.log(accessToken);
      if (cartItems.length > 0) {
        try {
          await axios.post("/orders/shipping", data, {
            headers: { Authorization: `Token ${accessToken}` },
          });
          removeAll();
          navigate("/");
        } catch (error) {
          console.err(error);
          setError(true);
        }
      }
    }
  };

  return (
    <>
      <Container class1="checkout-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-7">
            <div className="checkout-left-data">
              <h3 className="website-name">TechPlaza</h3>
              <nav
                style={{ "--bs-breadcrumb-divider": ">" }}
                aria-label="breadcrumb"
              >
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link className="text-dark total-price" to="/cart">
                      Cart
                    </Link>
                  </li>
                </ol>
              </nav>
              <h4 className="mb-3">Shipping Address</h4>
              <form
                action=""
                className="d-flex gap-15 flex-wrap justify-content-between"
              >
                <div className="flex-grow-1">
                  <input
                    type="text"
                    placeholder="First Name"
                    className="form-control"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </div>
                <div className="flex-grow-1">
                  <input
                    type="text"
                    placeholder="Last Name"
                    className="form-control"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>
                <div className="w-100">
                  <input
                    type="email"
                    placeholder="Email Address"
                    className="form-control"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="w-100">
                  <input
                    type="phone"
                    placeholder="Phone Number"
                    className="form-control"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                </div>
                <div className="flex-grow-1">
                  <input
                    type="text"
                    placeholder="Address"
                    className="form-control"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </div>
                <div className="flex-grow-1">
                  <input
                    type="text"
                    placeholder="City"
                    className="form-control"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                  />
                </div>
                <div className="flex-grow-1">
                  <input
                    type="text"
                    placeholder="Zipcode"
                    className="form-control"
                    value={zipcode}
                    onChange={(e) => setZipcode(e.target.value)}
                  />
                </div>
                <div className="w-100">
                  <div className="d-flex justify-content-between align-items-center">
                    <Link to="/cart" className="text-dark">
                      <BiArrowBack className="me-2" />
                      Return to Cart
                    </Link>
                    <button
                      type="button"
                      onClick={async (e) => await handlePurchase(e)}
                      className="button"
                    >
                      Purchase Products
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Checkout;
