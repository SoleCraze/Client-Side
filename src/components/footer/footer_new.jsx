import Facebook from '@mui/icons-material/FacebookOutlined';
import Instagram from '@mui/icons-material/Instagram';
import Twitter from '@mui/icons-material/Twitter';
import Pinterest from '@mui/icons-material/Pinterest';
import Room from '@mui/icons-material/Room';
import Phone from '@mui/icons-material/Phone';
import Email from '@mui/icons-material/Email';
import "./footer_new.scss";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <div className="footer">
      <div className="container">
        <div className="footer-main">
          <div className="footer-section brand-section">
            <div className="brand-content">
              <h2 className="brand-logo">SoleCraze</h2>
              <p className="brand-description">
                Step into luxury with SoleCraze - your premier destination for authentic, 
                premium sneakers from the world's leading brands. We deliver dreams, one sole at a time.
              </p>
              
              <div className="social-links">
                <a href="#" className="social-link instagram" aria-label="Follow us on Instagram">
                  <Instagram />
                </a>
                <a href="#" className="social-link facebook" aria-label="Follow us on Facebook">
                  <Facebook />
                </a>
                <a href="#" className="social-link twitter" aria-label="Follow us on Twitter">
                  <Twitter />
                </a>
                <a href="#" className="social-link pinterest" aria-label="Follow us on Pinterest">
                  <Pinterest />
                </a>
              </div>
            </div>
          </div>

          <div className="footer-section links-section">
            <h3 className="section-title">Quick Links</h3>
            <ul className="footer-links">
              <li><a href="/" className="footer-link">Home</a></li>
              <li><a href="/men" className="footer-link">Men's Collection</a></li>
              <li><a href="/women" className="footer-link">Women's Collection</a></li>
              <li><a href="/kids" className="footer-link">Kids Collection</a></li>
              <li><a href="/brands" className="footer-link">Brands</a></li>
              <li><a href="/about" className="footer-link">About Us</a></li>
            </ul>
          </div>

          <div className="footer-section support-section">
            <h3 className="section-title">Customer Care</h3>
            <ul className="footer-links">
              <li><a href="/account" className="footer-link">My Account</a></li>
              <li><a href="/orders" className="footer-link">Order Tracking</a></li>
              <li><a href="/shipping" className="footer-link">Shipping Info</a></li>
              <li><a href="/returns" className="footer-link">Returns & Exchanges</a></li>
              <li><a href="/size-guide" className="footer-link">Size Guide</a></li>
              <li><a href="/contact" className="footer-link">Contact Support</a></li>
            </ul>
          </div>

          <div className="footer-section contact-section">
            <h3 className="section-title">Get in Touch</h3>
            <div className="contact-info">
              <div className="contact-item">
                <div className="contact-icon">
                  <Room />
                </div>
                <div className="contact-details">
                  <p>123 Luxury Street</p>
                  <p>New York, NY 10001</p>
                </div>
              </div>
              
              <div className="contact-item">
                <div className="contact-icon">
                  <Phone />
                </div>
                <div className="contact-details">
                  <p>+1 (555) 123-4567</p>
                  <p>Mon-Fri: 9AM-6PM EST</p>
                </div>
              </div>
              
              <div className="contact-item">
                <div className="contact-icon">
                  <Email />
                </div>
                <div className="contact-details">
                  <p>hello@solecraze.com</p>
                  <p>support@solecraze.com</p>
                </div>
              </div>
            </div>

            <div className="newsletter">
              <h4>Stay Updated</h4>
              <p>Subscribe for exclusive offers and latest drops</p>
              <div className="newsletter-form">
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="newsletter-input"
                />
                <button className="newsletter-btn">Subscribe</button>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <div className="footer-bottom-left">
              <p className="copyright">
                © {currentYear} SoleCraze. All rights reserved.
              </p>
              <div className="legal-links">
                <a href="/privacy" className="legal-link">Privacy Policy</a>
                <a href="/terms" className="legal-link">Terms of Service</a>
                <a href="/cookies" className="legal-link">Cookie Policy</a>
              </div>
            </div>
            
            <div className="footer-bottom-right">
              <div className="payment-methods">
                <span className="payment-label">Secure Payments</span>
                <div className="payment-icons">
                  <img src="/img/visa.png" alt="Visa" />
                  <img src="/img/mastercard.png" alt="Mastercard" />
                  <img src="/img/amex.png" alt="American Express" />
                  <img src="/img/paypal.png" alt="PayPal" />
                  <img src="/img/apple-pay.png" alt="Apple Pay" />
                  <img src="/img/google-pay.png" alt="Google Pay" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
