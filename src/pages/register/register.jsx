import { useState } from "react";
import newRequest from "../../utils/newRequest";
import "./register.scss";
import { useNavigate, Link } from 'react-router-dom';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!agreeToTerms) {
      setError("Please agree to the terms and conditions to continue.");
      return;
    }

    if (confirmPassword !== password) {
      setError("Passwords do not match. Please confirm your password again.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    setIsLoading(true);
    
    try {
      const res = await newRequest.post("/auth/register", {
        firstName,
        lastName,
        email,
        password
      });
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="register">
      <div className="register-container">
        <div className="register-left">
          <div className="brand-section">
            <h1 className="brand-logo">Join SoleCraze</h1>
            <p className="brand-tagline">Create Your Premium Account</p>
            <div className="benefits">
              <div className="benefit-item">
                <div className="benefit-icon">
                  <CheckCircleIcon />
                </div>
                <span>Exclusive member discounts</span>
              </div>
              <div className="benefit-item">
                <div className="benefit-icon">
                  <CheckCircleIcon />
                </div>
                <span>Early access to new releases</span>
              </div>
              <div className="benefit-item">
                <div className="benefit-icon">
                  <CheckCircleIcon />
                </div>
                <span>Personalized recommendations</span>
              </div>
              <div className="benefit-item">
                <div className="benefit-icon">
                  <CheckCircleIcon />
                </div>
                <span>Priority customer support</span>
              </div>
            </div>
          </div>
        </div>

        <div className="register-right">
          <div className="register-form-container">
            <div className="register-header">
              <h2>Create Account</h2>
              <p>Join thousands of sneaker enthusiasts worldwide</p>
            </div>

            {error && (
              <div className="error-message">
                {error}
              </div>
            )}

            <form className="register-form" onSubmit={handleSubmit}>
              <div className="name-row">
                <div className="input-group">
                  <label>First Name</label>
                  <div className="input-container">
                    <PersonIcon className="input-icon" />
                    <input 
                      type="text" 
                      placeholder="Enter your first name"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="input-group">
                  <label>Last Name</label>
                  <div className="input-container">
                    <PersonIcon className="input-icon" />
                    <input 
                      type="text" 
                      placeholder="Enter your last name"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      required
                    />
                  </div>
                </div>
              </div>

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

              <div className="password-row">
                <div className="input-group">
                  <label>Password</label>
                  <div className="input-container">
                    <LockIcon className="input-icon" />
                    <input 
                      type={showPassword ? "text" : "password"}
                      placeholder="Create password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      minLength="6"
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

                <div className="input-group">
                  <label>Confirm Password</label>
                  <div className="input-container">
                    <LockIcon className="input-icon" />
                    <input 
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirm password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                    />
                    <button 
                      type="button"
                      className="password-toggle"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                    </button>
                  </div>
                </div>
              </div>

              <div className="terms-section">
                <label className="terms-checkbox">
                  <input 
                    type="checkbox" 
                    checked={agreeToTerms}
                    onChange={(e) => setAgreeToTerms(e.target.checked)}
                  />
                  <span className="checkmark"></span>
                  <span className="terms-text">
                    I agree to the <Link to="/terms" className="terms-link">Terms of Service</Link> and{' '}
                    <Link to="/privacy" className="terms-link">Privacy Policy</Link>
                  </span>
                </label>
              </div>

              <button type="submit" className="register-btn" disabled={isLoading}>
                {isLoading ? (
                  <span className="loading">Creating Account...</span>
                ) : (
                  <>
                    <span>Create Account</span>
                    <ArrowForwardIcon className="btn-icon" />
                  </>
                )}
              </button>

              <div className="divider">
                <span>or</span>
              </div>

              <div className="social-register">
                <button type="button" className="social-btn google">
                  <img src="/img/google-icon.png" alt="Google" />
                  Sign up with Google
                </button>
                <button type="button" className="social-btn apple">
                  <img src="/img/apple-icon.svg" alt="Apple" />
                  Sign up with Apple
                </button>
              </div>

              <div className="login-link">
                <span>Already have an account? </span>
                <Link to="/login" className="login-btn-link">
                  Sign In
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
