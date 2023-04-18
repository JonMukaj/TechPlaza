import { useState } from "react";
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  MenuItem,
  Select,
  Slider,
  Typography,
} from "@mui/material";
import ProductCard from "./ProductCard";
const products = [
  {
    id: 1,
    title: "Product 1",
    description: "This is a product description",
    price: 9.99,
    image: "https://via.placeholder.com/150",
    inStock: true,
  },
  {
    id: 2,
    title: "Product 2",
    description: "This is a product description",
    price: 19.99,
    image: "https://via.placeholder.com/150",
    inStock: true,
  },
  {
    id: 3,
    title: "Product 3",
    description: "This is a product description",
    price: 29.99,
    image: "https://via.placeholder.com/150",
    inStock: false,
  },
  {
    id: 4,
    title: "Product 4",
    description: "This is a product description",
    price: 39.99,
    image: "https://via.placeholder.com/150",
    inStock: true,
  },
  {
    id: 5,
    title: "Product 5",
    description: "This is a product description",
    price: 49.99,
    image: "https://via.placeholder.com/150",
    inStock: false,
  },
];

const ProductList = () => {
  const [inStockOnly, setInStockOnly] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [sortOrder, setSortOrder] = useState("");

  const handleInStockChange = (event) => {
    setInStockOnly(event.target.checked);
  };

  const handlePriceRangeChange = (event, newValue) => {
    setPriceRange(newValue);
  };

  const handleSortOrderChange = (event) => {
    setSortOrder(event.target.value);
  };

  let filteredProducts = products.filter((product) => {
    if (inStockOnly && !product.inStock) {
      return false;
    }
    return product.price >= priceRange[0] && product.price <= priceRange[1];
  });

  if (sortOrder === "priceLowToHigh") {
    filteredProducts = filteredProducts.sort((a, b) => a.price - b.price);
  } else if (sortOrder === "priceHighToLow") {
    filteredProducts = filteredProducts.sort((a, b) => b.price - a.price);
  } else if (sortOrder === "nameAZ") {
    filteredProducts = filteredProducts.sort((a, b) =>
      a.title.localeCompare(b.title)
    );
  } else if (sortOrder === "nameZA") {
    filteredProducts = filteredProducts.sort((a, b) =>
      b.title.localeCompare(a.title)
    );
  }

  return (
    <>
      <FormControl component="fieldset">
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox checked={inStockOnly} onChange={handleInStockChange} />
            }
            label="In Stock Only"
          />
        </FormGroup>
      </FormControl>
      <Typography id="price-range-slider" gutterBottom>
        Price Range
      </Typography>
      <Slider
        value={priceRange}
        onChange={handlePriceRangeChange}
        valueLabelDisplay="auto"
        min={0}
        max={1000}
        step={10}
      />
      <FormControl sx={{ minWidth: 120 }}>
        <Select
          value={sortOrder}
          onChange={handleSortOrderChange}
          displayEmpty
          inputProps={{ "aria-label": "Sort By" }}
        >
          <MenuItem value="">Sort By</MenuItem>
          <MenuItem value="priceLowToHigh">Price: Low to High</MenuItem>
          <MenuItem value="priceHighToLow">Price: High to Low</MenuItem>
          <MenuItem value="nameAZ">Name: A-Z</MenuItem>
          <MenuItem value="nameZA">Name: Z-A</MenuItem>
        </Select>
      </FormControl>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </>
  );
};

export default ProductList;
