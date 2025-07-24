import "./productView.scss";
import { Slider } from "infinite-react-carousel/lib";
import Newsletter from "../../components/newsletter/newsletter";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery } from '@tanstack/react-query';
import newRequest from './../../utils/newRequest';
import { useState } from "react";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShareIcon from '@mui/icons-material/Share';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import VerifiedIcon from '@mui/icons-material/Verified';
import StarIcon from '@mui/icons-material/Star';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Reviews from "../../components/reviews/reviews";

const Product = () => {
  const {id} = useParams();
  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [productsAtCart, setProductsAtCart] = useState([]);
  const [isFavorite, setIsFavorite] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const navigate = useNavigate();

  const { isLoading, error, data } = useQuery({
    queryKey: ["product"],
    queryFn: () =>
      newRequest.get(`/products/${id}`).then((res) => {
        return res.data;
      }),
  });

  const mutation = useMutation({
    mutationFn: async (cart) => {
      return newRequest.post("/cart", cart);
    },
    onSuccess: () => {
      navigate("/cart");
    },
  });
  
  const handleCart = (e) => {
    e.preventDefault();
    
    if (!selectedSize) {
      alert("Please select a size before adding to cart");
      return;
    }
  
    const cartData = {
      userId: currentUser._id,
      products: [
        {
          productId: id,
          quantity: quantity,
          size: selectedSize,
          price: data.price
        },
      ]
    };
  
    mutation.mutate(cartData);
  };

  const changeSize = (size) => {
    setSelectedSize(size);
  };

  const handleQuantityAdd = () => {
    setQuantity(prev => prev + 1);
  };

  const handleQuantityRemove = () => {
    setQuantity(prev => prev > 1 ? prev - 1 : 1);
  };

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: data?.title,
        text: `Check out this amazing sneaker: ${data?.title}`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  if (isLoading) {
    return (
      <div className="productView">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading premium sneaker details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="productView">
        <div className="error-container">
          <h3>Oops! Something went wrong</h3>
          <p>Unable to load product details. Please try again later.</p>
          <button onClick={() => window.location.reload()} className="retry-btn">
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="product-page">
      <div className="productView">
        <div className="container">
          <div className="breadcrumb">
            <Link to="/">Home</Link>
            <span className="separator">/</span>
            <Link to="/products">Products</Link>
            <span className="separator">/</span>
            <span className="brand-link">{data?.brand}</span>
            <span className="separator">/</span>
            <span className="current">{data?.title}</span>
          </div>

          <div className="product-wrapper">
            <div className="image-section">
              <div className="main-image">
                <Slider 
                  slidesToShow={1} 
                  arrowsScroll={1} 
                  className="product-slider"
                  beforeChange={(current, next) => setActiveImageIndex(next)}
                >
                  {data?.imgs?.map((img, index) => (
                    <div key={index} className="slide-container">
                      <img src={img} alt={`${data.title} - View ${index + 1}`} />
                    </div>
                  ))}
                </Slider>
                
                <div className="image-indicators">
                  {data?.imgs?.map((_, index) => (
                    <div 
                      key={index}
                      className={`indicator ${activeImageIndex === index ? 'active' : ''}`}
                    />
                  ))}
                </div>
              </div>

              <div className="product-features">
                <div className="feature-item">
                  <VerifiedIcon />
                  <span>100% Authentic</span>
                </div>
                <div className="feature-item">
                  <LocalShippingIcon />
                  <span>Free Shipping</span>
                </div>
              </div>
            </div>

            <div className="product-info">
              <div className="product-header">
                <div className="brand-badge">{data?.brand}</div>
                <div className="action-buttons">
                  <button className="favorite-btn" onClick={toggleFavorite}>
                    {isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                  </button>
                  <button className="share-btn" onClick={handleShare}>
                    <ShareIcon />
                  </button>
                </div>
              </div>

              <h1 className="product-title">{data?.title}</h1>
              <p className="product-category">{data?.cat}</p>

              {!isNaN(data?.totalStars / data?.starNumber) && (
                <div className="rating-section">
                  <div className="stars">
                    {Array(5).fill().map((_, i) => (
                      <StarIcon 
                        key={i} 
                        className={i < Math.round(data.totalStars / data.starNumber) ? 'filled' : 'empty'} 
                      />
                    ))}
                  </div>
                  <span className="rating-score">{Math.round(data.totalStars / data.starNumber)}.0</span>
                  <span className="rating-count">({data.starNumber} reviews)</span>
                </div>
              )}

              <div className="price-section">
                <span className="current-price">${data?.price}</span>
                <span className="original-price">${Math.round(data?.price * 1.2)}</span>
                <span className="discount">Save 20%</span>
              </div>

              <div className="product-details">
                <div className="detail-item">
                  <label>Color</label>
                  <div className="color-display">
                    <div className="color-swatch" style={{backgroundColor: data?.color?.toLowerCase()}}></div>
                    <span>{data?.color}</span>
                  </div>
                </div>

                <div className="detail-item">
                  <label>Select Size</label>
                  {data?.size?.length > 0 ? (
                    <div className="size-options">
                      {data.size.map((s) => (
                        <button
                          key={s}
                          className={`size-btn ${selectedSize === s ? 'selected' : ''}`}
                          onClick={() => changeSize(s)}
                        >
                          US {s}
                        </button>
                      ))}
                    </div>
                  ) : (
                    <div className="out-of-stock">
                      <span>Currently Out of Stock</span>
                    </div>
                  )}
                </div>

                <div className="detail-item">
                  <label>Quantity</label>
                  <div className="quantity-controls">
                    <button className="qty-btn minus" onClick={handleQuantityRemove}>
                      <RemoveIcon />
                    </button>
                    <span className="quantity-display">{quantity}</span>
                    <button className="qty-btn plus" onClick={handleQuantityAdd}>
                      <AddIcon />
                    </button>
                  </div>
                </div>
              </div>

              <div className="purchase-section">
                <button 
                  className={`add-to-cart-btn ${!selectedSize ? 'disabled' : ''}`}
                  onClick={handleCart}
                  disabled={!selectedSize || data?.size?.length === 0}
                >
                  <ShoppingCartIcon />
                  <span>Add to Cart</span>
                </button>
                
                <button className="buy-now-btn">
                  <span>Buy Now</span>
                </button>
              </div>

              <div className="shipping-info">
                <div className="shipping-item">
                  <LocalShippingIcon />
                  <div className="shipping-details">
                    <span className="shipping-title">Free Shipping</span>
                    <span className="shipping-desc">On orders over $100</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="reviews-section">
            <Reviews productId={id} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
