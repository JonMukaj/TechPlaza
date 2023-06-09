import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// import Marquee from "react-fast-marquee";
import ProductCard from "../Components/productCard/ProductCard";
import Container from "../Components/Container";
import StaticCategories from "./StaticCategories";
import { makeRequest } from "../services/product.service";
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";

const Home = () => {
  const [isProductsLoading, setIsProductsLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const getItems = async () => {
    const items = await makeRequest("/products", "GET");
    setProducts(items);
  };

  useEffect(() => {
    let cleanUP = false;
    setIsProductsLoading(true);
    try {
      !cleanUP && (async () => await getItems())();
    } catch (error) {
      console.log("An error occurred while fetching products");
    }
    setIsProductsLoading(false);
    return () => {
      cleanUP = true;
    };
  }, []);

  return (
    <>
      <Container class1="home-wrapper-1 py-5">
        <div className="row">
          <div className="col-12">
            <div className="main-banner position-relative ">
              <img
                src="images/Banner-img.webp"
                alt="main banner"
                className="img-fluid"
              />
              <div className="main-banner-content position-absolute">
                <Link to="categories/2" className="button">
                  SHOP NOW
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Container>
      <StaticCategories />
      <Container class1="featured-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <h3 className="section-heading">Featured Collection</h3>
          </div>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-between",
            }}
          >
            {isProductsLoading ? (
              <Box sx={{ width: 1080 }}>
                <Skeleton />
                <Skeleton animation="wave" />
                <Skeleton animation={false} />
              </Box>
            ) : products?.length > 0 ? (
              products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))
            ) : (
              <p>No products found</p>
            )}
          </div>
        </div>
      </Container>

      {/* <Container class1="marque-wrapper home-wrapper-2 py-5">
        <div className="row">
          <div className="col-12">
            <div className="marquee-inner-wrapper card-wrapper">
              <Marquee className="d-flex">
                <div className="mx-4 w-25">
                  <img src="" alt="brand" />
                </div>
                <div className="mx-4 w-25">
                  <img src="" alt="brand" />
                </div>
                <div className="mx-4 w-25">
                  <img src="" alt="brand" />
                </div>
                <div className="mx-4 w-25">
                  <img src="" alt="brand" />
                </div>
                <div className="mx-4 w-25">
                  <img src="" alt="brand" />
                </div>
                <div className="mx-4 w-25">
                  <img src="" alt="brand" />
                </div>
                <div className="mx-4 w-25">
                  <img src="" alt="brand" />
                </div>
                <div className="mx-4 w-25">
                  <img src="" alt="brand" />
                </div>
              </Marquee>
            </div>
          </div>
        </div>
      </Container> */}
    </>
  );
};

export default Home;
