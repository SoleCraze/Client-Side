import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./orders.scss";
import newRequest from './../../utils/newRequest';
import { useMutation, useQuery } from '@tanstack/react-query';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import ErrorIcon from '@mui/icons-material/Error';
import InfoIcon from '@mui/icons-material/Info';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const navigate = useNavigate();

  const { isLoading, error, data } = useQuery({
    queryKey: ["orders", currentUser._id],
    queryFn: () =>
      newRequest.get(`/orders/${currentUser._id}`).then((res) => {
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
  
    if (!data || data.length === 0) {
      console.log("Orders are empty");
      return rows;
    }
  
    for (const order of data) {
      const products = order.products;
  
      if (!products || products.length === 0) {
        console.log("Products in the order are empty");
        continue;
      }
  
      for (const product of products) {
        const productData = await fetchProducts(product.productId);
  
        rows.push({
          orderId: order._id,
          orderDate: order.createdAt,
          id: productData._id,
          img: productData.cover,
          title: productData.title,
          brand: productData.brand,
          price: productData.price,
          quantity: product.quantity,
          size: product.size,
          color: productData.color,
          totalPrice: (productData.price * product.quantity).toFixed(2),
        });
      }
    }
  
    return rows;
  };

  useEffect(() => {
    if (data) {
      renderCart().then((orders) => setOrders(orders));
    }
  }, [data]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getTotalItems = () => {
    return orders.reduce((total, order) => total + order.quantity, 0);
  };

  const getTotalValue = () => {
    return orders.reduce((total, order) => total + (order.price * order.quantity), 0).toFixed(2);
  };

  if (isLoading) {
    return (
      <div className="orders">
        <div className="container">
          <div className="loading-state">
            <div className="loading-spinner"></div>
            <p>Loading your orders...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="orders">
        <div className="container">
          <div className="error-state">
            <ErrorIcon className="error-icon" />
            <h2>Unable to load orders</h2>
            <p>Please try refreshing the page or contact support if the problem persists.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="orders">
      <div className="container">
        <div className="orders-header">
          <div className="header-content">
            <div className="title-section">
              <ShoppingBagOutlinedIcon className="orders-icon" />
              <div className="title-text">
                <h1>Order History</h1>
                <p>Track and manage all your purchases</p>
              </div>
            </div>

            {orders.length > 0 && (
              <div className="orders-summary">
                <div className="summary-card">
                  <div className="summary-item">
                    <span className="summary-label">Total Orders</span>
                    <span className="summary-value">{orders.length}</span>
                  </div>
                  <div className="summary-item">
                    <span className="summary-label">Total Items</span>
                    <span className="summary-value">{getTotalItems()}</span>
                  </div>
                  <div className="summary-item">
                    <span className="summary-label">Total Value</span>
                    <span className="summary-value">${getTotalValue()}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {!data || orders.length === 0 ? (
          <div className="empty-orders">
            <ShoppingBagOutlinedIcon className="empty-icon" />
            <h2>No orders yet</h2>
            <p>You haven't placed any orders yet. Start shopping to see your order history here!</p>
            <Link to="/products">
              <button className="shop-now-btn">
                <ShoppingBagOutlinedIcon />
                <span>Start Shopping</span>
              </button>
            </Link>
          </div>
        ) : (
          <div className="orders-content">
            <div className="orders-grid">
              {orders.map((order, index) => (
                <div className="order-card" key={`${order.orderId}-${order.id}-${index}`}>
                  <div className="order-header">
                    <div className="order-info">
                      <div className="order-id">Order #{order.orderId.slice(-8)}</div>
                      <div className="order-date">
                        <CalendarTodayIcon className="date-icon" />
                        <span>{formatDate(order.orderDate)}</span>
                      </div>
                    </div>
                    <div className="order-status">
                      <LocalShippingOutlinedIcon className="shipping-icon" />
                      <span>Delivered</span>
                    </div>
                  </div>

                  <Link to={`/products/${order.id}`} className="product-link">
                    <div className="product-section">
                      <div className="product-image">
                        <img src={order.img} alt={order.title} />
                      </div>
                      
                      <div className="product-details">
                        <h3 className="product-title">{order.title}</h3>
                        <div className="product-brand">{order.brand}</div>
                        <div className="product-specs">
                          <span className="spec-item">Size: EU {order.size}</span>
                          <span className="spec-item">Color: {order.color}</span>
                          <span className="spec-item">Qty: {order.quantity}</span>
                        </div>
                      </div>

                      <div className="product-price">
                        <div className="unit-price">${order.price}</div>
                        <div className="total-price">${order.totalPrice}</div>
                      </div>
                    </div>
                  </Link>

                  <div className="order-actions">
                    <Link to={`/products/${order.id}`}>
                      <button className="view-product-btn">View Product</button>
                    </Link>
                    <button className="reorder-btn">
                      <ShoppingBagOutlinedIcon />
                      <span>Reorder</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="orders-info">
              <div className="info-card">
                <InfoIcon className="info-icon" />
                <div className="info-content">
                  <h3>Need Help?</h3>
                  <p>Contact our customer support for any questions about your orders or returns.</p>
                  <button className="support-btn">Contact Support</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;
