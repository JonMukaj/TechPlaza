import React, { useState, useEffect } from "react";
import ReactStars from "react-rating-stars-component";
import BreadCrumb from "../Components/BreadCrumb";
import ProductCard from "../Components/productCard/ProductCard";
import ReactImageZoom from "react-image-zoom";
import { AiOutlineHeart } from "react-icons/ai";
import { Link } from "react-router-dom";
import Container from "../Components/Container";
import { ShopContext } from "../context/shopContext";
import { useParams } from "react-router-dom";
import { makeAuthenticatedRequest } from "../services/product.service";
// const product = {
//   id: 1,
//   name: "Product 1",
//   description: "This is a product description",
//   price: 9.99,
//   image: "https://via.placeholder.com/150",
//   inStock: 1,
//   category: "Electronics",
//   rating: 4,
//   quantity: 4,
//   ratingCount: 69,
//   categoryID: 2,
// };

const SingleProduct = () => {
  const { id } = useParams();
  const { addToCart } = React.useContext(ShopContext);
  const pageLink = window.location.href;
  const [product, setProduct] = useState({});
  const [isProductLoading, setIsProductLoading] = useState(false);
  const [orderedProduct, setorderedProduct] = useState(true);
  const [addedQuantity, setAddedQuantity] = useState(1);
  const [isCopied, setIsCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(pageLink);
    setIsCopied(true);
  };

  const getItem = async (id) => {
    const item = await makeAuthenticatedRequest(`/products/${id}`, "GET");
    setProduct(item);
  };

  useEffect(() => {
    let cleanUP = false;
    if (id) {
      setIsProductLoading(true);
      try {
        !cleanUP && (async () => await getItem(id))();
      } catch (error) {
        console.log(`Error while fetching products`);
      } finally {
        setIsProductLoading(false);
      }
    }
    return () => {
      cleanUP = true;
    };
  }, [id]);

  return (
    <>
      {isProductLoading ? (
        <Box sx={{ width: 1080 }}>
          <Skeleton />
          <Skeleton animation="wave" />
          <Skeleton animation={false} />
        </Box>
      ) : product ? (
        <div>
          <BreadCrumb title={product?.name} />
          <Container class1="main-product-wrapper py-5 home-wrapper-2">
            <div className="row">
              <div className="col-6">
                <div className="main-product-image">
                  <ReactImageZoom
                    {...{
                      width: 600,
                      height: 600,
                      zoomWidth: 500,
                      img: "/images/laptop-static.png",
                    }}
                  />
                </div>
              </div>
              <div className="col-6">
                <div className="main-product-details">
                  <div className="border-bottom">
                    <h3 className="title">{product?.name}</h3>
                  </div>
                  <div className="border-bottom py-3">
                    <p className="price">${product?.price}</p>
                    <div className="d-flex align-items-center gap-10">
                      <ReactStars
                        count={5}
                        size={24}
                        value={product?.rating}
                        edit={false}
                        activeColor="#ffd700"
                      />
                      <p className="mb-0 t-review">
                        ( {product?.ratingCount} Reviews )
                      </p>
                    </div>
                    <a className="review-btn" href="#review">
                      Write a Review
                    </a>
                  </div>
                  <div className=" py-3">
                    <div className="d-flex gap-10 align-items-center my-2">
                      <h3 className="product-heading">Category :</h3>
                      <p className="product-data">{product?.category}</p>
                    </div>
                    <div className="d-flex gap-10 align-items-center my-2">
                      <h3 className="product-heading">Availablity :</h3>
                      <p className="product-data">
                        {product?.inStock
                          ? `Stock: ${product?.quantity}`
                          : "Out of Stock"}
                      </p>
                    </div>
                    {product?.inStock ? (
                      <div className="d-flex align-items-center gap-15 flex-row mt-2 mb-3">
                        <h3 className="product-heading">Quantity :</h3>
                        <div className="">
                          <input
                            type="number"
                            name=""
                            min={1}
                            max={product?.quantity}
                            className="form-control"
                            style={{ width: "70px" }}
                            id=""
                            value={addedQuantity}
                          />
                        </div>
                        <div className="d-flex align-items-center gap-30 ms-5">
                          <button
                            className="button border-0"
                            data-bs-toggle="modal"
                            data-bs-target="#staticBackdrop"
                            type="button"
                          >
                            Add to Cart
                          </button>
                        </div>
                      </div>
                    ) : (
                      <p style={{ color: "red", fontWeight: "bold" }}>
                        Item is out of stock! Please return later to check for
                        product availablity.
                      </p>
                    )}
                    <div className="d-flex align-items-center gap-15">
                      <div>
                        <a href="">
                          <AiOutlineHeart className="fs-5 me-2" /> Add to
                          Wishlist
                        </a>
                      </div>
                    </div>
                    <div className="d-flex gap-10 flex-column  my-3">
                      <h3 className="product-heading">
                        Purchase Information :
                      </h3>
                      <p className="product-data">
                        Before the order is shipped, the delivery driver will
                        contact you.
                        <br /> Payment is made in cash upon recieving the order.
                      </p>
                    </div>
                    <div className="d-flex gap-10 align-items-center my-3">
                      <h3 className="product-heading">Product Link:</h3>
                      <a href="javascript:void(0);" onClick={copyToClipboard}>
                        <span>
                          {isCopied ? "Copied!" : "Copy Product Link"}
                        </span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Container>
          <Container class1="description-wrapper py-5 home-wrapper-2">
            <div className="row">
              <div className="col-12">
                <h4>Description</h4>
                <div className="bg-white p-3">
                  <p>
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                    Tenetur nisi similique illum aut perferendis voluptas,
                    quisquam obcaecati qui nobis officia. Voluptatibus in harum
                    deleniti labore maxime officia esse eos? Repellat?
                  </p>
                </div>
              </div>
            </div>
          </Container>
          <Container class1="reviews-wrapper home-wrapper-2">
            <div className="row">
              <div className="col-12">
                <h3 id="review">Reviews</h3>
                <div className="review-inner-wrapper">
                  <div className="review-head d-flex justify-content-between align-items-end">
                    <div>
                      <h4 className="mb-2">Customer Reviews</h4>
                      <div className="d-flex align-items-center gap-10">
                        <ReactStars
                          count={5}
                          size={24}
                          value={4}
                          edit={false}
                          activeColor="#ffd700"
                        />
                        <p className="mb-0">Based on 2 Reviews</p>
                      </div>
                    </div>
                    {orderedProduct && (
                      <div>
                        <a
                          className="text-dark text-decoration-underline"
                          href=""
                        >
                          Write a Review
                        </a>
                      </div>
                    )}
                  </div>
                  <div className="review-form py-4">
                    <h4>Write a Review</h4>
                    <form action="" className="d-flex flex-column gap-15">
                      <div>
                        <ReactStars
                          count={5}
                          size={24}
                          value={4}
                          edit={true}
                          activeColor="#ffd700"
                        />
                      </div>
                      <div>
                        <textarea
                          name=""
                          id=""
                          className="w-100 form-control"
                          cols="30"
                          rows="4"
                          placeholder="Comments"
                        ></textarea>
                      </div>
                      <div className="d-flex justify-content-end">
                        <button className="button border-0">
                          Submit Review
                        </button>
                      </div>
                    </form>
                  </div>
                  <div className="reviews mt-4">
                    <div className="review">
                      <div className="d-flex gap-10 align-items-center">
                        <h6 className="mb-0">Navdeep</h6>
                        <ReactStars
                          count={5}
                          size={24}
                          value={4}
                          edit={false}
                          activeColor="#ffd700"
                        />
                      </div>
                      <p className="mt-3">
                        Lorem ipsum dolor sit amet consectetur, adipisicing
                        elit. Consectetur fugit ut excepturi quos. Id
                        reprehenderit voluptatem placeat consequatur suscipit
                        ex. Accusamus dolore quisquam deserunt voluptate, sit
                        magni perspiciatis quas iste?
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </div>
      ) : (
        <p>Product Not found</p>
      )}

      <Container class1="popular-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <h3 className="section-heading">Our Popular Products</h3>
          </div>
        </div>
        <div className="row">
          <ProductCard />
        </div>
      </Container>

      <div
        className="modal fade"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered ">
          <div className="modal-content">
            <div className="modal-header py-0 border-0">
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body py-0">
              <div className="d-flex align-items-center">
                <div className="flex-grow-1 w-50">
                  <img
                    src="images/laptop-static.png"
                    className="img-fluid"
                    alt="product imgae"
                  />
                </div>
                <div className="d-flex flex-column flex-grow-1 w-50">
                  <h6 className="mb-3">Apple Watch</h6>
                  <p className="mb-1">Quantity: asgfd</p>
                  <p className="mb-1">Color: asgfd</p>
                  <p className="mb-1">Size: asgfd</p>
                </div>
              </div>
            </div>
            <div className="modal-footer border-0 py-0 justify-content-center gap-30">
              <button type="button" className="button" data-bs-dismiss="modal">
                View My Cart
              </button>
              <button type="button" className="button signup">
                Checkout
              </button>
            </div>
            <div className="d-flex justify-content-center py-3">
              <Link
                className="text-dark"
                to="/product"
                onClick={() => {
                  closeModal();
                }}
              >
                Continue To Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleProduct;
