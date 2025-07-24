import React from 'react';
import { Link } from 'react-router-dom';
import './aboutSection.scss';
import aboutMainImg from '../../assest/about-main.jpg';
import aboutSecondaryImg from '../../assest/about-secondary.jpg';

const AboutSection = () => {
  return (
    <div className="about-section">
      <div className="container">
        <div className="about-content">
          <div className="about-left">
            <div className="about-images">
              <div className="main-image">
                <img 
                  src={aboutMainImg} 
                  alt="Premium Sneaker Craftsmanship" 
                />
              </div>
              <div className="secondary-image">
                <img 
                  src={aboutSecondaryImg} 
                  alt="Luxury Footwear Collection" 
                />
              </div>
            </div>
          </div>
          
          <div className="about-right">
            <div className="about-text">
              <div className="section-badge">
                <span>Our Story</span>
              </div>
              
              <h2 className="section-title">
                <span className="title-line">Crafting Excellence</span>
                <span className="title-line highlight">Since 2020</span>
              </h2>
              
              <div className="about-description">
                <p className="lead-text">
                  SoleCraze was born from a passion for exceptional footwear and an 
                  unwavering commitment to luxury that doesn't compromise on comfort.
                </p>
                
                <p>
                  We believe that every step should be a statement of style, confidence, 
                  and authenticity. Our curated collection features the finest sneakers 
                  from world-renowned brands, each piece carefully selected for its 
                  craftsmanship, innovation, and timeless appeal.
                </p>
                
                <p>
                  From the bustling streets of New York to the fashion capitals of Europe, 
                  SoleCraze has become synonymous with premium quality and unparalleled 
                  customer experience. We don't just sell shoes – we deliver dreams, 
                  one sole at a time.
                </p>
              </div>
              
              <div className="about-stats">
                <div className="stat-item">
                  <span className="stat-number">50K+</span>
                  <span className="stat-label">Happy Customers</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">500+</span>
                  <span className="stat-label">Premium Models</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">99%</span>
                  <span className="stat-label">Satisfaction Rate</span>
                </div>
              </div>
              
              <div className="about-actions">
                <Link to="/about" className="about-button primary">
                  Our Full Story
                </Link>
                <Link to="/contact" className="about-button secondary">
                  Get in Touch
                </Link>
              </div>
            </div>
          </div>
        </div>
        
        <div className="about-values">
          <div className="values-grid">
            <div className="value-item">
              <div className="value-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2L15.09 8.26L22 9L17 14L18.18 21L12 17.77L5.82 21L7 14L2 9L8.91 8.26L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
                </svg>
              </div>
              <h4>Premium Quality</h4>
              <p>Every product meets our rigorous quality standards for durability and style.</p>
            </div>
            
            <div className="value-item">
              <div className="value-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2"/>
                  <path d="M8 12L11 15L16 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h4>Authentic Guarantee</h4>
              <p>100% authentic products sourced directly from authorized brand partners.</p>
            </div>
            
            <div className="value-item">
              <div className="value-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h4>Fast Delivery</h4>
              <p>Express shipping worldwide with secure packaging and tracking included.</p>
            </div>
            
            <div className="value-item">
              <div className="value-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h4>Customer First</h4>
              <p>Dedicated support team ensuring your satisfaction with every purchase.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutSection;
