import React, { useState } from 'react';
import "./login.scss";
import {Link, useNavigate} from "react-router-dom";
import newRequest from '../../utils/newRequest';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");
        
        try {
            const res = await newRequest.post("/auth/login", {email, password});
            localStorage.setItem("currentUser", JSON.stringify(res.data));
            navigate("/"); 
        } catch (err) {
            setError(err.response?.data?.message || "Login failed. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="login">
            <div className="login-container">
                <div className="login-left">
                    <div className="brand-section">
                        <h1 className="brand-logo">SoleCraze</h1>
                        <p className="brand-tagline">Step into Luxury</p>
                        <div className="features">
                            <div className="feature-item">
                                <div className="feature-icon">✓</div>
                                <span>Premium Authentic Sneakers</span>
                            </div>
                            <div className="feature-item">
                                <div className="feature-icon">✓</div>
                                <span>Worldwide Shipping</span>
                            </div>
                            <div className="feature-item">
                                <div className="feature-icon">✓</div>
                                <span>30-Day Returns</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="login-right">
                    <div className="login-form-container">
                        <div className="login-header">
                            <h2>Welcome Back</h2>
                            <p>Sign in to your account to continue your journey</p>
                        </div>

                        {error && (
                            <div className="error-message">
                                {error}
                            </div>
                        )}

                        <form className="login-form" onSubmit={handleSubmit}>
                            <div className="input-group">
                                <label>Email Address</label>
                                <div className="input-container">
                                    <EmailIcon className="input-icon" />
                                    <input 
                                        type="email" 
                                        placeholder="Enter your email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="input-group">
                                <label>Password</label>
                                <div className="input-container">
                                    <LockIcon className="input-icon" />
                                    <input 
                                        type={showPassword ? "text" : "password"}
                                        placeholder="Enter your password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                    <button 
                                        type="button"
                                        className="password-toggle"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                                    </button>
                                </div>
                            </div>

                            <div className="form-options">
                                <label className="remember-me">
                                    <input type="checkbox" />
                                    <span className="checkmark"></span>
                                    Remember me
                                </label>
                                <Link to="/forgot-password" className="forgot-password">
                                    Forgot Password?
                                </Link>
                            </div>

                            <button type="submit" className="login-btn" disabled={isLoading}>
                                {isLoading ? (
                                    <span className="loading">Signing In...</span>
                                ) : (
                                    <>
                                        <span>Sign In</span>
                                        <ArrowForwardIcon className="btn-icon" />
                                    </>
                                )}
                            </button>

                            <div className="divider">
                                <span>or</span>
                            </div>

                            <div className="social-login">
                                <button type="button" className="social-btn google">
                                    <img src="/img/google-icon.png" alt="Google" />
                                    Continue with Google
                                </button>
                                <button type="button" className="social-btn apple">
                                    <img src="/img/apple-icon.svg" alt="Apple" />
                                    Continue with Apple
                                </button>
                            </div>

                            <div className="signup-link">
                                <span>Don't have an account? </span>
                                <Link to="/register" className="signup-btn">
                                    Create Account
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
