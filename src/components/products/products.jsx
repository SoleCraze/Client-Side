import React from "react";
import "./products.scss";
import Product from "../product/product";
import { useQuery } from "@tanstack/react-query";
import newRequest from "./../../utils/newRequest";

const Products = ({ sizeFilter, colorFilter, brandFilter, sortOption }) => {
  const { isLoading, error, data } = useQuery({
    queryKey: ["products"],
    queryFn: () =>
      newRequest
        .get(`/products/?new=true`)
        .then((res) => {
          return res.data;
        }),
  });

  if (isLoading) {
    return (
      <div className="products-loading">
        <div className="container">
          <div className="loading-grid">
            {[...Array(8)].map((_, index) => (
              <div key={index} className="loading-card">
                <div className="loading-image"></div>
                <div className="loading-content">
                  <div className="loading-brand"></div>
                  <div className="loading-title"></div>
                  <div className="loading-price"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="products-error">
        <div className="container">
          <div className="error-content">
            <h3>Unable to Load Products</h3>
            <p>We're experiencing technical difficulties. Please try again later.</p>
            <button onClick={() => window.location.reload()}>Retry</button>
          </div>
        </div>
      </div>
    );
  }

  // Filtering logic
  let filteredProducts = data;

  if (sizeFilter) {
    const numericSizeFilter = parseInt(sizeFilter, 10); // Convert sizeFilter to a number
    filteredProducts = filteredProducts.filter((product) =>
      product.size.includes(numericSizeFilter)
    );
  }

  if (colorFilter) {
    filteredProducts = filteredProducts.filter(
      (product) => product.color === colorFilter
    );
  }

  if (brandFilter) {
    filteredProducts = filteredProducts.filter(
      (product) => product.brand === brandFilter
    );
  }

  // Sorting logic
  if (sortOption === "Price (asc)") {
    filteredProducts.sort((a, b) => a.price - b.price);
  } else if (sortOption === "Price (desc)") {
    filteredProducts.sort((a, b) => b.price - a.price);
  } else if (sortOption === "Newest") {
    filteredProducts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }

  return (
    <div className="products">
      {Array.isArray(filteredProducts) && filteredProducts.length > 0 ? (
        <div className="container">
          <div className="products-header">
            <div className="section-badge">
              <span>Featured Products</span>
            </div>
            <div className="results-info">
              <div className="results-filters">
                {sizeFilter && <span className="filter-tag">Size: {sizeFilter}</span>}
                {colorFilter && <span className="filter-tag">Color: {colorFilter}</span>}
                {brandFilter && <span className="filter-tag">Brand: {brandFilter}</span>}
              </div>
            </div>
          </div>
          
          <div className="products-grid">
            {filteredProducts.map((item, index) => (
              <div 
                key={item._id} 
                className="product-wrapper"
                style={{ 
                  animationDelay: `${index * 0.1}s` 
                }}
              >
                <Product item={item} />
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="container">
          <div className="no-products">
            <div className="no-products-content">
              <h3>No Products Found</h3>
              <p>We couldn't find any products matching your criteria. Try adjusting your filters.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;
