import React, { useState, useEffect } from "react";
import BreadCrumb from "../components/BreadCrumb";
import ReactStars from "react-rating-stars-component";
import ProductCard from "../components/productCard/ProductCard";
import Container from "../components/Container";
import { makeAuthenticatedRequest } from "../services/product.service";
import { useParams } from "react-router-dom";

const Products = () => {
  const { id } = useParams();
  const [products, setProducts] = useState([]);
  const [sortType, setSortType] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [inStockOnly, setInStockOnly] = useState(false);
  const [sortedProducts, setSortedProducts] = useState([]);
  const [isProductsLoading, setIsProductsLoading] = useState(false);

  const getCategoryItems = async (categoryId) => {
    const items = await makeAuthenticatedRequest(
      `/categories/${categoryId}/products`,
      "GET"
    );
    setProducts(items);
  };

  useEffect(() => {
    let cleanUP = false;
    if (id) {
      setIsProductsLoading(true);
      try {
        !cleanUP && (async () => await getCategoryItems(id))();
      } catch (error) {
        console.log(`Error while fetching products`);
      } finally {
        setIsProductsLoading(false);
      }
    }
    return () => {
      cleanUP = true;
    };
  }, [id]);

  useEffect(() => {
    const sortArray = (type, productList) => {
      let sorted;
      switch (type) {
        case "title-asc":
          sorted = [...productList].sort((a, b) =>
            a.name.localeCompare(b.name)
          );
          break;
        case "title-desc":
          sorted = [...productList].sort((a, b) =>
            b.name.localeCompare(a.name)
          );
          break;
        case "price-asc":
          sorted = [...productList].sort((a, b) => a.price - b.price);
          break;
        case "price-desc":
          sorted = [...productList].sort((a, b) => b.price - a.price);
          break;
        default:
          sorted = productList;
      }
      return sorted;
    };

    const filterByPrice = (productsArray) => {
      return productsArray.filter(
        (product) => product.price >= minPrice && product.price <= maxPrice
      );
    };

    const filterInStock = (productsArray) => {
      return productsArray.filter((product) => product.inStock);
    };

    let productsArray = [...products];

    if (minPrice !== "" && maxPrice !== "") {
      productsArray = filterByPrice(productsArray);
    }

    if (inStockOnly) {
      productsArray = filterInStock(productsArray);
    }

    productsArray = sortArray(sortType, productsArray);

    setSortedProducts(productsArray);
  }, [products, sortType, minPrice, maxPrice, inStockOnly]);

  return (
    <>
      <BreadCrumb title="Category" />
      <Container class1="store-wrapper home-wrapper-2 py-5">
        <div className="row">
          <div className="col-3">
            <div className="filter-card mb-3">
              <h3 className="filter-title">Filter By</h3>
              <div>
                <h5 className="sub-title">Availablity</h5>
                <div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value={inStockOnly}
                      onChange={(e) => setInStockOnly(e.target.checked)}
                    />
                    <label className="form-check-label" htmlFor="">
                      In Stock Only
                    </label>
                  </div>
                </div>
                <h5 className="sub-title">Price</h5>
                <div className="d-flex align-items-center gap-10">
                  <div className="form-floating">
                    <input
                      type="email"
                      className="form-control"
                      id="floatingInput"
                      placeholder="From"
                      value={minPrice}
                      onChange={(e) => setMinPrice(e.target.value)}
                    />
                    <label htmlFor="floatingInput">From</label>
                  </div>
                  <div className="form-floating">
                    <input
                      type="email"
                      className="form-control"
                      id="floatingInput1"
                      placeholder="To"
                      value={maxPrice}
                      onChange={(e) => setMaxPrice(e.target.value)}
                    />
                    <label htmlFor="floatingInput1">To</label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-9">
            <div className="filter-sort-grid mb-4">
              <div className="d-flex justify-content-between align-items-center">
                <div className="d-flex align-items-center gap-10">
                  <p className="mb-0 d-block" style={{ width: "100px" }}>
                    Sort By:
                  </p>
                  <select
                    defaultValue={""}
                    className="form-control form-select"
                    onChange={(e) => setSortType(e.target.value)}
                  >
                    <option value="">--Select--</option>
                    <option value="title-asc">Alphabetically, A-Z</option>
                    <option value="title-desc">Alphabetically, Z-A</option>
                    <option value="price-asc">Price, low to high</option>
                    <option value="price-desc">Price, high to low</option>
                  </select>
                </div>
                <div className="d-flex align-items-center gap-10">
                  <p className="totalproducts mb-0">
                    {sortedProducts ? sortedProducts.length : 0} Products
                  </p>
                </div>
              </div>
            </div>
            <div className="products-list pb-5">
              <div className="d-flex gap-25 flex-wrap">
                <div style={{ display: "flex", flexWrap: "wrap" }}>
                  {sortedProducts?.length > 0 ? (
                    sortedProducts.map((product) => (
                      <ProductCard key={product.id} product={product} />
                    ))
                  ) : (
                    <p>No products found</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Products;
