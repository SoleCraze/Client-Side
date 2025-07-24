import Add from '@mui/icons-material/Add';
import Remove from '@mui/icons-material/Remove';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import SecurityIcon from '@mui/icons-material/Security';
import "./cart.scss";
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import newRequest from '../../utils/newRequest';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Cart = () => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const [products, setProducts] = useState([]);
  const queryClient = useQueryClient();

  const { isLoading, error, data } = useQuery({
    queryKey: ["cart"],
    queryFn: () =>
      newRequest.get(`/cart/${currentUser._id}`).then((res) => {
        return res.data;
      }),
  });

  const fetchProducts = async (productId) => {
    try {
      const response = await newRequest.get(`/products/${productId}`);
      return response.data;
      
    } catch (err) {
      console.log(err);
      return 'Unknown Product';
    }
  }

  const renderCart = async () => {
    const rows = [];

    if (!data || !data.products) {
      // Handle the case where data or data.products is undefined
      console.log("Cart is empty")
      return rows;
    }
    
    console.log(data.products)
    for (const product of data.products) {
      const productData = await fetchProducts(product.productId);

      rows.push({
        id: productData._id,
        img: productData.cover,
        title: productData.title,
        price: product.price,
        quantity: product.quantity,
        size: product.size,
        color: productData.color
      });
    }

    return rows;
  }

  

  useEffect(() => {
    renderCart().then((products) => setProducts(products));
  }, [data]);

  const updateProductQuantity = async (productId, newQuantity) => {
    try {
      console.log("Updating quantity:", { productId, newQuantity });
  
      // Make a PUT request to update the quantity on the server
      const response = await newRequest.put(`/cart/${currentUser._id}`, {
        productId,
        quantity: newQuantity,
      });
  
      console.log("PUT response:", response);
  
      // Update the local state to reflect the new quantity
      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product.id === productId ? { ...product, quantity: newQuantity } : product
        )
      );
    } catch (error) {
      console.error("Error updating quantity:", error);
      // Handle error as needed
    }
  };
  

  const handleQuantityAdd = (productId, q) => {
    const newQuantity = q + 1;
    updateProductQuantity(productId, newQuantity); // Update the quantity for the specific product
  };

  const handleQuantityRemove = (productId, q) => {
    const newQuantity = q <= 1 ? 1 : q - 1;
    updateProductQuantity(productId, newQuantity); // Update the quantity for the specific product
  };

  const handleRemoveProduct = (productId) => {
      mutation.mutate(productId);
  };

  const mutation = useMutation({
    mutationFn: (productId) => {
      return newRequest.delete(`/cart/${currentUser._id}/${productId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["cart"]);
    },
  });

  console.log(data)
  const subTotal = products.reduce((total, product) => total + (product.quantity * product.price), 0) || 0;

  if (isLoading) {
    return (
      <div className="cart">
        <div className="container">
          <div className="loading-state">
            <div className="loading-spinner"></div>
            <p>Loading your cart...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="cart">
        <div className="container">
          <div className="error-state">
            <p>Unable to load cart. Please try again.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="cart">
      <div className="container">
        <div className="cart-header">
          <div className="title-section">
            <ShoppingBagOutlinedIcon className="cart-icon" />
            <h1>Shopping Cart</h1>
          </div>
          <div className="item-count">
            {products.length} {products.length === 1 ? 'item' : 'items'}
          </div>
        </div>

        <div className="cart-actions">
          <Link className="continue-shopping-link" to="/products">
            <button className="continue-shopping-btn">
              Continue Shopping
            </button>
          </Link>
        </div>

        {products.length === 0 ? (
          <div className="empty-cart">
            <ShoppingBagOutlinedIcon className="empty-icon" />
            <h2>Your cart is empty</h2>
            <p>Discover our latest sneaker collections and find your perfect pair</p>
            <Link to="/products">
              <button className="shop-now-btn">Shop Now</button>
            </Link>
          </div>
        ) : (
          <div className="cart-content">
            <div className="cart-items">
              {products.map((product) => (
                <div className="cart-item" key={product.id}>
                  <div className="product-image">
                    <img src={product.img} alt={product.title} />
                  </div>
                  
                  <div className="product-details">
                    <h3 className="product-title">{product.title}</h3>
                    <div className="product-specs">
                      <span className="color-spec">Color: {product.color}</span>
                      <span className="size-spec">Size: EU {product.size}</span>
                    </div>
                    <div className="unit-price">
                      ${product.price}
                    </div>
                  </div>

                  <div className="quantity-controls">
                    <div className="quantity-selector">
                      <button 
                        className="quantity-btn decrease"
                        onClick={() => handleQuantityRemove(product.id, product.quantity)}
                        disabled={product.quantity <= 1}
                      >
                        <Remove />
                      </button>
                      <span className="quantity-display">{product.quantity}</span>
                      <button 
                        className="quantity-btn increase"
                        onClick={() => handleQuantityAdd(product.id, product.quantity)}
                      >
                        <Add />
                      </button>
                    </div>
                    
                    <button 
                      className="remove-item-btn"
                      onClick={() => handleRemoveProduct(product.id)}
                      disabled={mutation.isLoading}
                    >
                      <DeleteOutlineIcon />
                      <span>Remove</span>
                    </button>
                  </div>

                  <div className="item-total">
                    <span className="total-price">
                      ${(product.price * product.quantity).toFixed(2)}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="order-summary">
              <div className="summary-card">
                <h2>Order Summary</h2>
                
                <div className="summary-details">
                  <div className="summary-row">
                    <span>Subtotal ({products.length} {products.length === 1 ? 'item' : 'items'})</span>
                    <span>${subTotal.toFixed(2)}</span>
                  </div>
                  
                  <div className="summary-row shipping">
                    <div className="shipping-info">
                      <LocalShippingOutlinedIcon className="shipping-icon" />
                      <span>Estimated Shipping</span>
                    </div>
                    <span>${data ? '20.00' : '0.00'}</span>
                  </div>
                  
                  <div className="summary-divider"></div>
                  
                  <div className="summary-row total">
                    <span>Total</span>
                    <span>${data ? (subTotal + 20).toFixed(2) : '0.00'}</span>
                  </div>
                </div>

                <div className="security-badge">
                  <SecurityIcon className="security-icon" />
                  <span>Secure checkout guaranteed</span>
                </div>

                <Link to={data && `/pay/${data._id}`}>
                  <button className="checkout-btn" disabled={!data}>
                    <span>Proceed to Checkout</span>
                  </button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
