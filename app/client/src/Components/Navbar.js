import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemText,
  TextField,
} from "@mui/material";
import { Menu as MenuIcon, ShoppingCart } from "@mui/icons-material";

const categories = [
  { id: 1, name: "Electronics" },
  { id: 2, name: "Clothing" },
  { id: 3, name: "Home & Kitchen" },
  { id: 4, name: "Sports & Outdoors" },
  { id: 5, name: "Books" },
];

const Navbar = () => {
  const [anchorEl] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(-1);
  const loggedIn = false;

  const handleCategoryClick = (index) => {
    setSelectedCategoryIndex(index);
    handleDrawerToggle();
  };

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleLogoutClick = () => {
    // handle login logic here
  };

  const categoryItems = categories.map((category) => {
    return {
      itemId: `category/${category.id}`,
      itemName: category.name,
    };
  });

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={handleDrawerToggle}
        >
          <MenuIcon />
        </IconButton>
        <Drawer open={drawerOpen} onClose={handleDrawerToggle}>
          <List>
            {categoryItems.map((item) => (
              <Link key={item.itemId} to={item.itemId}>
                <ListItem
                  button
                  selected={selectedCategoryIndex === item.itemId}
                  onClick={() => handleCategoryClick(item.itemId)}
                >
                  <ListItemText primary={item.itemName} />
                </ListItem>
              </Link>
            ))}
          </List>
        </Drawer>
        <Link to="/" style={{ textDecoration: "none", color: "white" }}>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            My Ecommerce Site
          </Typography>
        </Link>
        <TextField
          variant="outlined"
          placeholder="Search"
          style={{ marginRight: 10 }}
        />
        {loggedIn ? (
          <>
            <IconButton color="inherit" component={Link} to="/profile">
              <Typography variant="body1">View Profile</Typography>
            </IconButton>
            <IconButton color="inherit" component={Link} to="/cart">
              <ShoppingCart />
            </IconButton>
            <IconButton color="inherit" onClick={handleLogoutClick}>
              <Typography variant="body1">Logout</Typography>
            </IconButton>
          </>
        ) : (
          <>
            <IconButton color="inherit" component={Link} to="/signin">
              <Typography variant="body1">Sign In</Typography>
            </IconButton>
            <IconButton color="inherit" component={Link} to="/signup">
              <Typography variant="body1">Sign Up</Typography>
            </IconButton>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
