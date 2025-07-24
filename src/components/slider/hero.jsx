import React from 'react';
import { Link } from 'react-router-dom';
import './hero.scss';
import heroImg from '../../assest/hero-image.png';

const HeroSection = () => {
  return (
    <div className="hero-container">
      <div className="hero-background">
        <img
          src={heroImg}
          alt="Premium Sneaker Collection"
          className="hero-image"
        />
        <div className="hero-gradient-overlay"></div>
      </div>
      
      <div className="hero-content">
        <div className="hero-text">
          <div className="hero-badge">
            <span>New Collection</span>
          </div>
          <h1 className="hero-title">
            <span className="title-line">Step Into</span>
            <span className="title-line luxury">Luxury</span>
          </h1>
          <p className="hero-subtitle">
            Discover premium sneakers that blend comfort, 
            style, and craftsmanship for the modern individual.
          </p>
          <div className="hero-actions">
            <Link to="/products" className="hero-button primary">
              Explore Collection
            </Link>
            <Link to="/featured" className="hero-button secondary">
              View Featured
            </Link>
          </div>
        </div>
        
        <div className="hero-features">
          <div className="feature-item">
            <div className="feature-icon">✨</div>
            <span>Premium Quality</span>
          </div>
          <div className="feature-item">
            <div className="feature-icon">🚀</div>
            <span>Fast Delivery</span>
          </div>
          <div className="feature-item">
            <div className="feature-icon">🔄</div>
            <span>Easy Returns</span>
          </div>
        </div>
      </div>
      
      {/* <div className="hero-scroll-indicator">
        <div className="scroll-line"></div>
        <span>Scroll to explore</span>
      </div> */}
    </div>
  );
};

export default HeroSection;
