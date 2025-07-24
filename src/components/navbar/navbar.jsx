import Search from '@mui/icons-material/Search';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import PersonIcon from '@mui/icons-material/Person';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import LogoutIcon from '@mui/icons-material/Logout';
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./navbar.scss";
import newRequest from '../../utils/newRequest';
import { useQuery } from '@tanstack/react-query';


const Navbar = () => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, right: 0 });

  const handleLogout = async () => {
    try {
      await newRequest.post("/auth/logout");
      localStorage.setItem("currentUser", null);
      navigate("/");
      setMobileMenuOpen(false);
      setUserDropdownOpen(false);
    } catch (err) {
      console.log(err);
    }
  };

  // Close mobile menu when clicking outside or navigating
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setMobileMenuOpen(false);
      }
    };

    const handleClickOutside = (event) => {
      if (!event.target.closest('.user-menu') && 
          !event.target.closest('.mobile-menu-overlay') && 
          !event.target.closest('.user-dropdown-options')) {
        setMobileMenuOpen(false);
        setUserDropdownOpen(false);
        setOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    document.addEventListener('click', handleClickOutside);

    return () => {
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const toggleMobileMenu = (e) => {
    e.stopPropagation();
    setMobileMenuOpen(!mobileMenuOpen);
    setUserDropdownOpen(false);
    setOpen(false);
  };

  const toggleUserDropdown = (e) => {
    e.stopPropagation();
    
    if (!userDropdownOpen) {
      // Calculate position based on user element
      const userElement = e.currentTarget;
      const rect = userElement.getBoundingClientRect();
      const windowWidth = window.innerWidth;
      
      setDropdownPosition({
        top: rect.bottom + 8,
        right: windowWidth - rect.right
      });
    }
    
    setUserDropdownOpen(!userDropdownOpen);
    setOpen(!userDropdownOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
    setUserDropdownOpen(false);
    setOpen(false);
  };

  const { data: cartData, isLoading, isError } = useQuery({
    queryKey: ['cart', currentUser?._id],
    queryFn: async () => {
      if (currentUser) {
        const response = await newRequest.get(`/cart/${currentUser._id}`);
        return response.data;
      }
      return null;
    },
  });

  const cartQuantity = cartData?.products.reduce((total, product) => total + product.quantity, 0) || 0;

  return (
    <>
      <div className="navbar">
        <div className="container">
          <div className="wrapper">
            <div className="left">
              <Link to={"/"} className='link brand-logo' onClick={closeMobileMenu}>
                <span className="brand-text">SoleCraze</span>
              </Link>
            </div>
            
            <div className="center">
              <nav className="nav-links desktop-nav">
                <Link to={"/men"} className='link nav-item'>
                  <span>Men</span>
                </Link>
                <Link to={"/women"} className='link nav-item'>
                  <span>Women</span>
                </Link>
                <Link to={"/kids"} className='link nav-item'>
                  <span>Kids</span>
                </Link>
              </nav>
            </div>
            
            <div className="right">
              <div className="desktop-actions">
                <div className="auth-section">
                  {!currentUser && (
                    <>
                      <div className="menuItem">
                        <Link className='link auth-link' to="/register">
                          Register
                        </Link>
                      </div>
                      <div className="menuItem">
                        <Link className='link auth-link primary' to="/login">
                          Sign In
                        </Link>
                      </div>
                    </>
                  )}
                </div>
                
                <div className="actions-section">
                  <div className="menuItem cart-item">
                    <Link className='link' to="/cart">
                      {cartQuantity > 0 && (
                        <div className="cart-badge">
                          <span>{cartQuantity}</span>
                        </div>
                      )}
                      <ShoppingBagOutlinedIcon className="cart-icon"/>
                    </Link>
                  </div>
                  
                  {currentUser && (
                    <div className="menuItem user-menu">
                      <div className="user" onClick={toggleUserDropdown}>
                        <img src="/img/noavatar.jpg" alt="User Avatar" />
                        <span className="user-name">{currentUser?.firstName}</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Mobile Cart and Hamburger */}
              <div className="mobile-actions">
                <div className="mobile-cart">
                  <Link className='link' to="/cart" onClick={closeMobileMenu}>
                    {cartQuantity > 0 && (
                      <div className="cart-badge">
                        <span>{cartQuantity}</span>
                      </div>
                    )}
                    <ShoppingBagOutlinedIcon className="cart-icon"/>
                  </Link>
                </div>
                
                <button 
                  className={`hamburger-btn ${mobileMenuOpen ? 'active' : ''}`}
                  onClick={toggleMobileMenu}
                  aria-label="Toggle mobile menu"
                >
                  {mobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* User Dropdown - Outside navbar to prevent height issues */}
      {userDropdownOpen && currentUser && (
        <div className="user-dropdown-options" style={{
          position: 'fixed',
          top: `${dropdownPosition.top}px`,
          right: `${dropdownPosition.right}px`,
          zIndex: 10002
        }}>
          <Link className="link dropdown-item" to="/myAccount" onClick={closeMobileMenu}>
            <PersonIcon className="dropdown-icon" />
            <span>My Account</span>
          </Link>
          <Link className="link dropdown-item" to="/orders" onClick={closeMobileMenu}>
            <ShoppingBagIcon className="dropdown-icon" />
            <span>My Orders</span>
          </Link>
          <div className="link dropdown-item logout" onClick={handleLogout}>
            <LogoutIcon className="dropdown-icon" />
            <span>Logout</span>
          </div>
        </div>
      )}

      {/* Mobile Menu Overlay - Outside navbar container */}
      <div className={`mobile-menu-overlay ${mobileMenuOpen ? 'active' : ''}`}>
        <div className="mobile-menu">
          {/* Navigation Links */}
          <div className="mobile-nav-section">
            <h3>Categories</h3>
            <Link to={"/men"} className='mobile-nav-link' onClick={closeMobileMenu}>
              <span>Men</span>
            </Link>
            <Link to={"/women"} className='mobile-nav-link' onClick={closeMobileMenu}>
              <span>Women</span>
            </Link>
            <Link to={"/kids"} className='mobile-nav-link' onClick={closeMobileMenu}>
              <span>Kids</span>
            </Link>
          </div>

          {/* User Section */}
          {currentUser ? (
            <div className="mobile-user-section">
              <div className="mobile-user-info">
                <img src="/img/noavatar.jpg" alt="User Avatar" />
                <div className="user-details">
                  <span className="user-name">{currentUser?.firstName} {currentUser?.lastName}</span>
                  <span className="user-email">{currentUser?.email}</span>
                </div>
              </div>
              
              <div className="mobile-user-links">
                <Link to={"/myAccount"} className='mobile-nav-link' onClick={closeMobileMenu}>
                  <PersonIcon className="mobile-icon" />
                  <span>My Account</span>
                </Link>
                <Link to={"/orders"} className='mobile-nav-link' onClick={closeMobileMenu}>
                  <ShoppingBagIcon className="mobile-icon" />
                  <span>My Orders</span>
                </Link>
                <button className='mobile-nav-link logout-btn' onClick={handleLogout}>
                  <LogoutIcon className="mobile-icon" />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="mobile-auth-section">
              <h3>Account</h3>
              <Link to={"/register"} className='mobile-nav-link' onClick={closeMobileMenu}>
                <span>Register</span>
              </Link>
              <Link to={"/login"} className='mobile-nav-link primary' onClick={closeMobileMenu}>
                <span>Sign In</span>
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;
