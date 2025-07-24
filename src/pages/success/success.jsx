import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import newRequest from '../../utils/newRequest';
import './success.scss';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShipping';

const Success = () => {
  const {search } = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(search);
  const payment_intent = params.get("payment_intent");
  const [countdown, setCountdown] = useState(5);
  const [isProcessing, setIsProcessing] = useState(true);

  useEffect(() => {
    const makeRequest = async () => {
      try {
        await newRequest.put("/orders", {payment_intent});
        setIsProcessing(false);
      } catch (err) {
        console.log(err);
        setIsProcessing(false);
      }
    }

    makeRequest();
  }, [payment_intent]);

  useEffect(() => {
    if (!isProcessing && countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
      
      return () => clearTimeout(timer);
    } else if (!isProcessing && countdown === 0) {
      navigate("/orders");
    }
  }, [countdown, isProcessing, navigate]);

  return (
    <div className="success-page">
      <div className="container">
        <div className="success-card">
          <div className="success-animation">
            <div className="checkmark-wrapper">
              <CheckCircleIcon className="checkmark-icon" />
              <div className="success-ripple"></div>
            </div>
          </div>

          <div className="success-content">
            <h1>Payment Successful!</h1>
            <p className="success-message">
              Thank you for your purchase. Your order has been confirmed and is being processed.
            </p>

            <div className="order-details">
              <div className="detail-item">
                <ShoppingBagOutlinedIcon className="detail-icon" />
                <span>Order confirmed and processing</span>
              </div>
              <div className="detail-item">
                <LocalShippingOutlinedIcon className="detail-icon" />
                <span>You'll receive shipping updates via email</span>
              </div>
            </div>

            {isProcessing ? (
              <div className="processing-state">
                <div className="processing-spinner"></div>
                <p>Processing your order...</p>
              </div>
            ) : (
              <div className="redirect-section">
                <div className="countdown-display">
                  <AccessTimeIcon className="countdown-icon" />
                  <span>Redirecting to your orders in {countdown} seconds</span>
                </div>
                
                <div className="action-buttons">
                  <button 
                    className="view-orders-btn"
                    onClick={() => navigate("/orders")}
                  >
                    <ShoppingBagOutlinedIcon />
                    <span>View My Orders</span>
                  </button>
                  
                  <button 
                    className="continue-shopping-btn"
                    onClick={() => navigate("/products")}
                  >
                    Continue Shopping
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="success-footer">
            <p>Need help? <span className="support-link">Contact our support team</span></p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Success