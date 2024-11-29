import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Button,
  Container,
  Grid,
  TextField,
  Snackbar,
  Alert,
  useMediaQuery
} from "@mui/material";
import { styled } from "@mui/system";
import { Link } from "react-router-dom";
// import { FiMinus, FiPlus, FiTrash2 } from "react-icons/fi";

const StyledCard = styled(Card)(({ theme }) => ({
  display: "flex",
  marginBottom: "16px",
  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  transition: "transform 0.2s ease-in-out",
  "&:hover": {
    transform: "translateY(-4px)"
  }
}));

const CartPage = () => {
  const isMobile = useMediaQuery("(max-width:600px)");
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Premium Wireless Headphones",
      price: 199.99,
      quantity: 1,
      image: "images.unsplash.com/photo-1505740420928-5e560c06d30e"
    },
    {
      id: 2,
      name: "Smart Fitness Watch",
      price: 299.99,
      quantity: 1,
      image: "images.unsplash.com/photo-1523275335684-37898b6baf30"
    },
    {
      id: 3,
      name: "Bluetooth Speaker",
      price: 149.99,
      quantity: 1,
      image: "images.unsplash.com/photo-1608043152269-423dbba4e7e1"
    },

  ]);

  const [error, setError] = useState("");

  useEffect(() => {
    const savedCart = localStorage.getItem("cartItems");
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  const handleQuantityChange = (id, newQuantity) => {
    if (newQuantity < 1) {
      setError("Quantity cannot be less than 1");
      return;
    }
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const handleRemoveItem = (id) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography
        variant="h4"
        component="h1"
        gutterBottom
        sx={{ mb: 4 }}
        align="center"
      >
        <Link to="/productpage">
          Shopping Cart
        </Link>
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          {cartItems.map((item) => (
            <StyledCard key={item.id}>
              <CardMedia
                component="img"
                sx={{ width: isMobile ? 100 : 150 }}
                image={`https://${item.image}`}
                alt={item.name}
                onError={(e) => {
                  e.target.src = "https://images.unsplash.com/photo-1595246140563-1c1c3aa3b038";
                }}
              />
              <CardContent sx={{ flex: 1 }}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: isMobile ? "column" : "row",
                    justifyContent: "space-between",
                    alignItems: isMobile ? "flex-start" : "center"
                  }}
                >
                  <Typography variant="h6" component="h2">
                    {item.name}
                  </Typography>
                  <Typography
                    variant="h6"
                    color="primary"
                    sx={{ mt: isMobile ? 1 : 0 }}
                  >
                    ${(item.price * item.quantity).toFixed(2)}
                  </Typography>
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    mt: 2,
                    gap: 1
                  }}
                  role="group"
                  aria-label="quantity controls"
                >
                  <IconButton
                    onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                    aria-label="decrease quantity"
                  >
                    {/* <FiMinus /> */}
                    <i class="bi bi-dash"></i>
                  </IconButton>
                  <TextField
                    size="small"
                    value={item.quantity}
                    onChange={(e) =>
                      handleQuantityChange(item.id, parseInt(e.target.value) || 0)
                    }
                    inputProps={{
                      min: 1,
                      "aria-label": "quantity",
                      style: { textAlign: "center", width: "50px" }
                    }}
                  />
                  <IconButton
                    onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                    aria-label="increase quantity"
                  >
                    {/* <FiPlus /> */}
                    <i class="bi bi-plus"></i>
                  </IconButton>
                  <IconButton
                    onClick={() => handleRemoveItem(item.id)}
                    color="error"
                    aria-label="remove item"
                  >
                    {/* <FiTrash2 /> */}
                    <i class="bi bi-x"></i>
                  </IconButton>
                </Box>
              </CardContent>
            </StyledCard>
          ))}
        </Grid>

        <Grid item xs={12} md={4}>
          <Card sx={{ position: "sticky", top: 16 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Cart Summary
              </Typography>
              <Box sx={{ my: 2 }}>
                <Typography>Total Items: {totalItems}</Typography>
                <Typography variant="h5" sx={{ mt: 2 }}>
                  Total: ${calculateTotal().toFixed(2)}
                </Typography>
              </Box>
              <Button
                variant="contained"
                fullWidth
                size="large"
                sx={{ mt: 2 }}
                disabled={cartItems.length === 0}
              >
                Proceed to Checkout
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Snackbar
        open={Boolean(error)}
        autoHideDuration={3000}
        onClose={() => setError("")}
      >
        <Alert severity="error" onClose={() => setError("")}>
          {error}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default CartPage;