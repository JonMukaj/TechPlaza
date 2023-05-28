import React from "react";
import Container from "../Components/Container";
import { Link } from "react-router-dom";

const StaticCategories = () => {
  const staticCategories = [
    {
      id: 1,
      name: "Android",
      image: "images/android-static.jpg",
      noOfProducts: 10,
    },
    {
      id: 2,
      name: "iPhone",
      image: "images/iphone-static.png",
    },
    {
      id: 3,
      name: "Laptop",
      image: "images/laptop-static.png",
    },
    {
      id: 4,
      name: "Smart Tv",
      image: "images/tv-static.webp",
    },
  ];

  const linkStyle = {
    textDecoration: "none",
    color: "black",
  };
  const renderItems = () => {
    return staticCategories.map((item) => (
      <div key={item.id} className="d-flex gap align-items-center">
        <div>
          <Link to={`/categories/${item.id}`} style={linkStyle}>
            <h6>{item.name}</h6>
            <p>{item.noOfProducts} Items</p>
          </Link>
        </div>
        <img src={item.image} alt={item.name} className="static-categories" />
      </div>
    ));
  };

  return (
    <>
      <Container class1="home-wrapper-2 py-5">
        <div className="row">
          <div className="col-12">
            <div className="categories d-flex justify-content-between flex-wrap align-items-center">
              {renderItems()}
            </div>
          </div>
        </div>
      </Container>
      ;
    </>
  );
};

export default StaticCategories;
