import "./product.scss";
import { Link } from 'react-router-dom';
  
  const Product = ({ item }) => {
    return (
      <div className="product">
        <Link to={`/products/${item._id}`} className="link">
          <div className="product-card">
            <div className="image-container">
              <img src={item.cover} alt={item.title} />
              <div className="product-overlay">
                <span className="view-details">View Details</span>
              </div>
            </div>
            
            <div className="product-info">
              <div className="product-brand">
                <span>{item.brand}</span>
              </div>
              <h3 className="product-title">{item.title}</h3>
              <div className="product-price">
                <span className="price">${item.price}</span>
                {item.originalPrice && item.originalPrice > item.price && (
                  <span className="original-price">${item.originalPrice}</span>
                )}
              </div>
            </div>
          </div>
        </Link>
      </div>
    );
  };
  
  export default Product;
  