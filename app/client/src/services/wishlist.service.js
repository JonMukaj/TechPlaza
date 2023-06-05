import axios from "axios";

export const addToWishlist = (itemId) => {
  // Get the current wishlist from localStorage
  let wishlist = localStorage.getItem("wishlist");

  // Parse the wishlist to an array
  // If the wishlist doesn't exist, default to an empty array
  wishlist = wishlist ? JSON.parse(wishlist) : [];

  // Check if the item ID already exists in the wishlist
  if (!wishlist.includes(itemId)) {
    // Item ID doesn't exist, add it to the wishlist
    wishlist.push(itemId);

    // Save the updated wishlist to localStorage
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }
};

export const removeFromWishlist = (itemId) => {
  // Get the current wishlist from localStorage
  let wishlist = localStorage.getItem("wishlist");

  // Parse the wishlist to an array
  // If the wishlist doesn't exist, default to an empty array
  wishlist = wishlist ? JSON.parse(wishlist) : [];

  // Remove the item ID from the wishlist
  const index = wishlist.indexOf(itemId);
  if (index !== -1) {
    wishlist.splice(index, 1);

    // Save the updated wishlist to localStorage
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }
};

export const isWishlisted = (itemId) => {
  // Get the current wishlist from localStorage
  let wishlist = localStorage.getItem("wishlist");

  // Parse the wishlist to an array
  // If the wishlist doesn't exist, default to an empty array
  wishlist = wishlist ? JSON.parse(wishlist) : [];

  // Check if the item ID exists in the wishlist
  return wishlist.includes(itemId);
};

export const getWishlist = () => {
  let result = localStorage.getItem("wishlist");
  if (result) {
    return JSON.parse(result);
  }
  return [];
};
