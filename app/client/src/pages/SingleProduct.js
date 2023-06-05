import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import BreadCrumb from "../Components/BreadCrumb";
import ProductCard from "../Components/productCard/ProductCard";
import ReactImageZoom from "react-image-zoom";
import { AiOutlineHeart } from "react-icons/ai";
import { Link } from "react-router-dom";
import Container from "../Components/Container";
import CartContext from "../context/CartProvider";
import { useParams } from "react-router-dom";
import { makeRequest } from "../services/product.service";
import useAuth from "../hooks//useAuth";
import {
  addToWishlist,
  removeFromWishlist,
  isWishlisted,
} from "../services/wishlist.service";

const SingleProduct = () => {
  const { id } = useParams();
  const pageLink = window.location.href;
  const [product, setProduct] = useState({});
  const [isProductLoading, setIsProductLoading] = useState(false);
  const [addedQuantity, setAddedQuantity] = useState(1);
  const [isCopied, setIsCopied] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [reviewCount, setReviewCount] = useState(0);
  const [rating, setRating] = useState(0);
  const [reviewsLoaded, setReviewsLoaded] = useState(false);
  const [reviewText, setReviewText] = useState("");
  const [reviewRating, setReviewRating] = useState(0);
  const { addToCart } = useContext(CartContext);
  const navigate = useNavigate();
  const { user } = useAuth();

  const copyToClipboard = () => {
    navigator.clipboard.writeText(pageLink);
    setIsCopied(true);
  };

  const getItem = async (id) => {
    const item = await makeRequest(`/products/${id}`, "GET");
    setProduct(item);
  };

  const handleWishlist = () => {
    if (isWishlisted) {
      removeFromWishlist(product.id);
      setIsWishlisted(false);
    } else {
      addToWishlist(product.id);
      setIsWishlisted(true);
    }
  };

  const handleCartAction = (event) => {
    event.preventDefault();
    if (!user) {
      navigate("/login");
    } else {
      addToCart(product.id, parseInt(addedQuantity));
    }
  };

  const getReviews = async () => {
    const response = await makeRequest(`/reviews/product/${id}`, "GET");
    setReviews(response);
  };

  useEffect(() => {
    let cleanUP = false;
    try {
      !cleanUP && (async () => await getReviews())();
    } catch (error) {
      console.log(`Error while fetching reviews`);
    }
    return () => {
      cleanUP = true;
    };
  }, []);

  useEffect(() => {
    let cleanUP = false;
    const counter = reviews.length;
    const ratingTotal = reviews.reduce((acc, review) => {
      return acc + review.rating;
    }, 0);
    setReviewCount(counter);
    setRating(ratingTotal / counter);
    console.log(ratingTotal / counter);
    setReviewsLoaded(true);
    return () => {
      cleanUP = true;
    };
  }, [reviews]);

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

  const submitReview = async (event) => {
    event.preventDefault();
    const data = {
      rating: reviewRating,
      comment: reviewText,
      productId: id,
    };
    await makeRequest(`/reviews`, "POST", data);
    setReviews([...reviews, data]);
    setReviewText("");
  };

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
                      img: `/${product.image}`,
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
                        value={rating}
                        edit={false}
                        activeColor="#ffd700"
                      />
                      <p className="mb-0 t-review">( {reviewCount} Reviews )</p>
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
                        {product?.stock
                          ? `Stock: ${product?.stock}`
                          : "Out of Stock"}
                      </p>
                    </div>
                    {product?.stock ? (
                      <div className="d-flex align-items-center gap-15 flex-row mt-2 mb-3">
                        <h3 className="product-heading">Quantity :</h3>
                        <div className="">
                          <input
                            type="number"
                            name=""
                            min={1}
                            max={product?.stock}
                            className="form-control"
                            style={{ width: "70px" }}
                            id=""
                            value={addedQuantity}
                            onChange={(event) =>
                              setAddedQuantity(event.target.value)
                            }
                          />
                        </div>
                        <div className="d-flex align-items-center gap-30 ms-5">
                          <button
                            className="button border-0"
                            type="button"
                            onClick={(event) => handleCartAction(event)}
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
                      <div onClick={handleWishlist}>
                        <a href="javascript:void(0);" onClick={handleWishlist}>
                          {isWishlisted ? (
                            <>
                              {" "}
                              <AiOutlineHeart className="fs-5 me-2" /> Remove
                              from Wishlist{" "}
                            </>
                          ) : (
                            <>
                              {" "}
                              <AiOutlineHeart className="fs-5 me-2" /> Add to
                              Wishlist
                            </>
                          )}
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
            {product ? (
              <>
                <div className="row">
                  <div className="col-12">
                    <h4>Description</h4>
                    <div className="bg-white p-3">
                      <p>{product.description}</p>
                    </div>
                  </div>
                </div>
              </>
            ) : null}
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
                        {reviewsLoaded == true ? (
                          <ReactStars
                            count={5}
                            size={24}
                            value={3.5}
                            edit={false}
                            activeColor="#ffd700"
                          />
                        ) : null}
                        <p className="mb-0">Based on {reviewCount} Reviews</p>
                      </div>
                    </div>
                    <div>
                      <a
                        className="text-dark text-decoration-underline"
                        href=""
                      >
                        Write a Review
                      </a>
                    </div>
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
                          onChange={(event) => setReviewRating(event)}
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
                          value={reviewText}
                          onChange={(event) =>
                            setReviewText(event.target.value)
                          }
                        ></textarea>
                      </div>
                      <div className="d-flex justify-content-end">
                        <button
                          className="button border-0"
                          onClick={(event) => submitReview(event)}
                        >
                          Submit Review
                        </button>
                      </div>
                    </form>
                  </div>
                  <div className="reviews mt-4">
                    {reviews.length > 0
                      ? reviews.map((review) => (
                          <>
                            <div className="review">
                              <div className="d-flex gap-10 align-items-center">
                                <h6 className="mb-0">Anonymous</h6>
                                <ReactStars
                                  count={5}
                                  size={24}
                                  value={review.rating}
                                  edit={false}
                                  activeColor="#ffd700"
                                />
                              </div>
                              <p className="mt-3">{review.comment}</p>
                            </div>
                          </>
                        ))
                      : null}
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </div>
      ) : (
        <p>Product Not found</p>
      )}
    </>
  );
};

export default SingleProduct;
