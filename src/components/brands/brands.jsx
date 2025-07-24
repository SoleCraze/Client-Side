import React from 'react';
import './brands.scss';

// Import brand logos (you'll need to add these to your assets folder)
import nikelogo from '../../assest/nike-logo.svg';
import adidasLogo from '../../assest/adidas-logo.svg';
import pumaLogo from '../../assest/puma-logo.svg';
import reebokLogo from '../../assest/reebok-logo.svg';
import newBalanceLogo from '../../assest/new-balance-logo.svg';
import vansLogo from '../../assest/vans-logo.svg';

const Brands = () => {
  const brands = [
    {
      id: 1,
      name: 'Nike',
      logo: nikelogo,
      link: '/brands/nike'
    },
    {
      id: 2,
      name: 'Adidas',
      logo: adidasLogo,
      link: '/brands/adidas'
    },
    {
      id: 3,
      name: 'Puma',
      logo: pumaLogo,
      link: '/brands/puma'
    },
    {
      id: 4,
      name: 'Reebok',
      logo: reebokLogo,
      link: '/brands/reebok'
    },
    {
      id: 5,
      name: 'New Balance',
      logo: newBalanceLogo,
      link: '/brands/new-balance'
    },
    {
      id: 6,
      name: 'Vans',
      logo: vansLogo,
      link: '/brands/vans'
    }
  ];

  return (
    <div className="brands-section">
      <div className="container">
        <div className="brands-header">
          <div className="section-badge">
            <span>Featured Partners</span>
          </div>
          <h2 className="section-title">
            <span className="title-line">Trusted by</span>
            <span className="title-line highlight">Leading Brands</span>
          </h2>
          <p className="section-subtitle">
            We partner with the world's most prestigious sneaker brands to bring you 
            authentic, premium footwear that defines modern luxury.
          </p>
        </div>

        <div className="brands-slider">
          <div className="brands-track">
            {/* First set of brands */}
            {brands.map((brand, index) => (
              <div 
                key={`first-${brand.id}`} 
                className="brand-slide"
              >
                <div className="brand-logo-container">
                  <img 
                    src={brand.logo} 
                    alt={`${brand.name} Logo`}
                    className="brand-logo"
                  />
                  <div className="brand-overlay">
                    <span className="brand-name">{brand.name}</span>
                    <div className="brand-link">
                      <span>Explore Collection</span>
                      <svg 
                        width="16" 
                        height="16" 
                        viewBox="0 0 24 24" 
                        fill="none"
                      >
                        <path 
                          d="M7 17L17 7M17 7H7M17 7V17" 
                          stroke="currentColor" 
                          strokeWidth="2" 
                          strokeLinecap="round" 
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            {/* Duplicate set for seamless loop */}
            {brands.map((brand, index) => (
              <div 
                key={`second-${brand.id}`} 
                className="brand-slide"
              >
                <div className="brand-logo-container">
                  <img 
                    src={brand.logo} 
                    alt={`${brand.name} Logo`}
                    className="brand-logo"
                  />
                  <div className="brand-overlay">
                    <span className="brand-name">{brand.name}</span>
                    <div className="brand-link">
                      <span>Explore Collection</span>
                      <svg 
                        width="16" 
                        height="16" 
                        viewBox="0 0 24 24" 
                        fill="none"
                      >
                        <path 
                          d="M7 17L17 7M17 7H7M17 7V17" 
                          stroke="currentColor" 
                          strokeWidth="2" 
                          strokeLinecap="round" 
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="brands-footer">
          <div className="stats-container">
            <div className="stat-item">
              <span className="stat-number">100+</span>
              <span className="stat-label">Premium Models</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">6</span>
              <span className="stat-label">Global Brands</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">24/7</span>
              <span className="stat-label">Customer Support</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Brands;
