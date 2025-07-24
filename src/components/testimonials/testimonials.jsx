import React, { useState } from 'react';
import './testimonials.scss';

const Testimonials = () => {
  const [activeReview, setActiveReview] = useState(0);

  const testimonials = [
    {
      id: 1,
      name: "Sarah Chen",
      role: "Fashion Blogger",
      location: "New York, NY",
      rating: 5,
      review: "SoleCraze has completely transformed my sneaker game. The quality is unmatched, and their customer service goes above and beyond. Every pair I've purchased has exceeded my expectations.",
      image: "/img/testimonial-1.jpg",
      verified: true
    },
    {
      id: 2,
      name: "Marcus Johnson",
      role: "Professional Athlete",
      location: "Los Angeles, CA",
      rating: 5,
      review: "As someone who demands the best from my footwear, SoleCraze delivers every time. Their collection is curated perfectly, and the authenticity guarantee gives me complete confidence.",
      image: "/img/testimonial-2.jpg",
      verified: true
    },
    {
      id: 3,
      name: "Emma Rodriguez",
      role: "Creative Director",
      location: "Miami, FL",
      rating: 5,
      review: "The shopping experience at SoleCraze is pure luxury. From browsing to delivery, everything is seamless. Their attention to detail and packaging is absolutely incredible.",
      image: "/img/testimonial-3.jpg",
      verified: true
    },
    {
      id: 4,
      name: "David Kim",
      role: "Entrepreneur",
      location: "San Francisco, CA",
      rating: 5,
      review: "I've been a loyal customer for over two years. The quality, service, and selection are consistently outstanding. SoleCraze sets the standard for premium sneaker retail.",
      image: "/img/testimonial-4.jpg",
      verified: true
    },
    {
      id: 5,
      name: "Alexandra Williams",
      role: "Interior Designer",
      location: "Chicago, IL",
      rating: 5,
      review: "Every purchase feels like an investment in quality and style. The team at SoleCraze truly understands luxury footwear and curates an incredible selection.",
      image: "/img/testimonial-5.jpg",
      verified: true
    }
  ];

  const nextReview = () => {
    setActiveReview((prev) => (prev + 1) % testimonials.length);
  };

  const prevReview = () => {
    setActiveReview((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goToReview = (index) => {
    setActiveReview(index);
  };

  return (
    <div className="testimonials-section">
      <div className="container">
        <div className="testimonials-header">
          <div className="section-badge">
            <span>Customer Stories</span>
          </div>
          
          <h2 className="section-title">
            <span className="title-line">What Our</span>
            <span className="title-line highlight">Customers Say</span>
          </h2>
          
          <p className="section-subtitle">
            Don't just take our word for it. Here's what our satisfied customers 
            have to say about their SoleCraze experience.
          </p>
        </div>

        <div className="testimonials-carousel">
          <div className="carousel-container">
            <div className="testimonials-track" style={{ transform: `translateX(-${activeReview * 100}%)` }}>
              {testimonials.map((testimonial, index) => (
                <div 
                  key={testimonial.id} 
                  className={`testimonial-card ${index === activeReview ? 'active' : ''}`}
                >
                  <div className="testimonial-content">
                    <div className="rating">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <svg 
                          key={i}
                          width="20" 
                          height="20" 
                          viewBox="0 0 24 24" 
                          fill="currentColor"
                        >
                          <path d="M12 2L15.09 8.26L22 9L17 14L18.18 21L12 17.77L5.82 21L7 14L2 9L8.91 8.26L12 2Z"/>
                        </svg>
                      ))}
                    </div>
                    
                    <blockquote className="review-text">
                      "{testimonial.review}"
                    </blockquote>
                    
                    <div className="testimonial-author">
                      <div className="author-image">
                        <img src={testimonial.image} alt={testimonial.name} />
                        {testimonial.verified && (
                          <div className="verified-badge">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 6.5V4.5C15 3.4 14.6 2.4 13.9 1.7C13.2 1 12.2 0.6 11.1 0.6H10.9C9.8 0.6 8.8 1 8.1 1.7C7.4 2.4 7 3.4 7 4.5V6.5L1 7V9L7 8.5V11.5C7 12.6 7.4 13.6 8.1 14.3C8.8 15 9.8 15.4 10.9 15.4H11.1C12.2 15.4 13.2 15 13.9 14.3C14.6 13.6 15 12.6 15 11.5V8.5L21 9ZM9 10.5V4.5C9 4.2 9.1 3.9 9.3 3.7C9.5 3.5 9.8 3.4 10.1 3.4H11.9C12.2 3.4 12.5 3.5 12.7 3.7C12.9 3.9 13 4.2 13 4.5V10.5C13 10.8 12.9 11.1 12.7 11.3C12.5 11.5 12.2 11.6 11.9 11.6H10.1C9.8 11.6 9.5 11.5 9.3 11.3C9.1 11.1 9 10.8 9 10.5Z"/>
                            </svg>
                          </div>
                        )}
                      </div>
                      
                      <div className="author-details">
                        <h4 className="author-name">{testimonial.name}</h4>
                        <p className="author-role">{testimonial.role}</p>
                        <p className="author-location">{testimonial.location}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="carousel-controls">
            <button className="control-btn prev" onClick={prevReview}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            
            <div className="carousel-dots">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  className={`dot ${index === activeReview ? 'active' : ''}`}
                  onClick={() => goToReview(index)}
                />
              ))}
            </div>
            
            <button className="control-btn next" onClick={nextReview}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>

        <div className="testimonials-stats">
          <div className="stats-grid">
            <div className="stat-item">
              <span className="stat-number">4.9</span>
              <span className="stat-label">Average Rating</span>
              <div className="stat-stars">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2L15.09 8.26L22 9L17 14L18.18 21L12 17.77L5.82 21L7 14L2 9L8.91 8.26L12 2Z"/>
                  </svg>
                ))}
              </div>
            </div>
            
            <div className="stat-item">
              <span className="stat-number">15K+</span>
              <span className="stat-label">Happy Reviews</span>
            </div>
            
            <div className="stat-item">
              <span className="stat-number">98%</span>
              <span className="stat-label">Would Recommend</span>
            </div>
            
            <div className="stat-item">
              <span className="stat-number">4.8</span>
              <span className="stat-label">Trustpilot Score</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
