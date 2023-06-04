import React, { useState, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import { BsSearch } from "react-icons/bs";
import { Button } from "@mui/material";
import { makeRequest } from "../../services/product.service";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MenuIcon from "@mui/icons-material/Menu";
import "./Header.css";
import useAuth from "../../hooks/useAuth";

const Header = () => {
  const { user, logout } = useAuth();
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    let cleanUP = false;
    try {
      !cleanUP && (async () => await getCategories())();
    } catch (error) {
      console.log(error);
    }
    return () => {
      cleanUP = true;
    };
  }, []);

  const getCategories = async () => {
    try {
      const response = await makeRequest("/categories", "GET");
      setCategories(response);
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogout = () => {
    logout();
  };
  return (
    <>
      <header className="header-upper py-3">
        <div className="container-xxl">
          <div className="row align-items-center">
            <div className="col-2">
              <h2>
                <Link to="/" className="text-white">
                  TechPlaza
                </Link>
              </h2>
            </div>
            <div className="col-5">
              <div className="input-group">
                <input
                  type="text"
                  className="form-control py-2"
                  placeholder="Search Product Here..."
                  aria-label="Search Product Here..."
                  aria-describedby="basic-addon2"
                />
                <span className="input-group-text p-3" id="basic-addon2">
                  <BsSearch className="fs-6" />
                </span>
              </div>
            </div>
            <div className="col-5">
              <div className="header-upper-links d-flex align-items-center justify-content-between">
                <div>
                  <Link
                    to="/wishlist"
                    className="d-flex align-items-center gap-10 text-white"
                  >
                    <FavoriteIcon />
                    <p className="mb-0">Wishlist</p>
                  </Link>
                </div>
                <div>
                  {user ? (
                    <>
                      <AccountCircleIcon />
                      <Link to="/account">
                        <Button>Account</Button>
                      </Link>
                      <Button onClick={handleLogout}>Logout</Button>
                    </>
                  ) : (
                    <>
                      <Link to="/login">
                        <Button>Log in</Button>
                      </Link>
                      <Link to="/signup">
                        <Button>Sign Up</Button>
                      </Link>
                    </>
                  )}
                </div>
                <div>
                  <Link
                    to="/cart"
                    className="d-flex align-items-center gap-10 text-white"
                  >
                    <ShoppingCartIcon />
                    <div className="d-flex flex-column gap-10">
                      <span className="badge bg-white text-dark">0</span>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      <header className="header-bottom py-3">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <div className="menu-bottom d-flex align-items-center gap-30">
                <div>
                  <div className="dropdown">
                    <button
                      className="btn btn-secondary dropdown-toggle bg-transparent border-0 gap-15 d-flex align-items-center"
                      type="button"
                      id="dropdownMenuButton1"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <MenuIcon />
                      <span className="me-5 d-inline-block">
                        Shop Categories
                      </span>
                    </button>
                    <ul
                      className="dropdown-menu"
                      aria-labelledby="dropdownMenuButton1"
                    >
                      {categories ? (
                        categories.map((category) => (
                          <li key={category.id}>
                            <Link
                              className="dropdown-item text-white"
                              to={`/categories/${category.id}`}
                            >
                              {category.name}
                            </Link>
                          </li>
                        ))
                      ) : (
                        <li>No categories found</li>
                      )}
                    </ul>
                  </div>
                </div>
                <div className="menu-links">
                  <div className="d-flex align-items-center gap-15">
                    <NavLink to="/">
                      <Button variant="outlined">Home</Button>
                    </NavLink>
                    <NavLink to="/products">
                      {" "}
                      <Button variant="outlined">All Products</Button>
                    </NavLink>
                    <NavLink to="/contact">
                      {" "}
                      <Button variant="outlined">Contact</Button>
                    </NavLink>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
