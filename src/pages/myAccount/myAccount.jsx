import React, { useState, useEffect } from 'react';
import "./myAccount.scss";
import Newsletter from '../../components/newsletter/newsletter';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import newRequest from '../../utils/newRequest';
import { useNavigate } from 'react-router-dom';
import PersonIcon from '@mui/icons-material/Person';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import EmailIcon from '@mui/icons-material/Email';
import BadgeIcon from '@mui/icons-material/Badge';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';

const MyAccount = () => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { isLoading, error, data } = useQuery({
    queryKey: ["users", currentUser._id],
    queryFn: () =>
      newRequest.get(`/users/${currentUser._id}`).then((res) => {
        return res.data;
      }),
  });

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [isFormChanged, setIsFormChanged] = useState(false);

  useEffect(() => {
    if (data) {
      setFirstName(data.firstName || '');
      setLastName(data.lastName || '');
      setEmail(data.email || '');
    }
  }, [data]);

  useEffect(() => {
    if (data) {
      const hasChanged = 
        firstName !== (data.firstName || '') ||
        lastName !== (data.lastName || '') ||
        email !== (data.email || '');
      setIsFormChanged(hasChanged);
    }
  }, [firstName, lastName, email, data]);

  const updateUserMutation = useMutation({
    mutationFn: (userData) => {
      return newRequest.put(`/users/${currentUser._id}`, userData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["users", currentUser._id]);
      // Update localStorage with new data
      const updatedUser = { ...currentUser, firstName, lastName, email };
      localStorage.setItem("currentUser", JSON.stringify(updatedUser));
    },
  });

  const handleChangeFirstName = (e) => {
    setFirstName(e.target.value);
  };

  const handleChangeLastName = (e) => {
    setLastName(e.target.value);
  };

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!isFormChanged) return;
    
    try {
      await updateUserMutation.mutateAsync({
        firstName,
        lastName,
        email
      });
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const handleReset = () => {
    if (data) {
      setFirstName(data.firstName || '');
      setLastName(data.lastName || '');
      setEmail(data.email || '');
    }
  };

  if (isLoading) {
    return (
      <div>
        <div className="myAccount">
          <div className="container">
            <div className="loading-state">
              <div className="loading-spinner"></div>
              <p>Loading your account information...</p>
            </div>
          </div>
        </div>
        <Newsletter />
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <div className="myAccount">
          <div className="container">
            <div className="error-state">
              <ErrorIcon className="error-icon" />
              <h2>Unable to load account</h2>
              <p>Please try refreshing the page or contact support if the problem persists.</p>
            </div>
          </div>
        </div>
        <Newsletter />
      </div>
    );
  }

  return (
    <div>
      <div className="myAccount">
        <div className="container">
          <div className="account-wrapper">
            <div className="account-header">
              <div className="header-content">
                <div className="user-avatar">
                  <PersonIcon className="avatar-icon" />
                </div>
                <div className="header-text">
                  <h1>My Account</h1>
                  <p>Manage your personal information and preferences</p>
                </div>
              </div>
              <div className="edit-indicator">
                <EditIcon className="edit-icon" />
              </div>
            </div>

            {updateUserMutation.isSuccess && (
              <div className="success-message">
                <CheckCircleIcon className="success-icon" />
                <span>Account updated successfully!</span>
              </div>
            )}

            {updateUserMutation.isError && (
              <div className="error-message">
                <ErrorIcon className="error-icon" />
                <span>Failed to update account. Please try again.</span>
              </div>
            )}

            {currentUser && data && (
              <form className="account-form" onSubmit={handleSubmit}>
                <div className="form-section">
                  <h3>Personal Information</h3>
                  
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="firstName">
                        <BadgeIcon className="field-icon" />
                        First Name
                      </label>
                      <input
                        id="firstName"
                        type="text"
                        value={firstName}
                        onChange={handleChangeFirstName}
                        placeholder="Enter your first name"
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="lastName">
                        <BadgeIcon className="field-icon" />
                        Last Name
                      </label>
                      <input
                        id="lastName"
                        type="text"
                        value={lastName}
                        onChange={handleChangeLastName}
                        placeholder="Enter your last name"
                        required
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="email">
                      <EmailIcon className="field-icon" />
                      Email Address
                    </label>
                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={handleChangeEmail}
                      placeholder="Enter your email address"
                      required
                    />
                  </div>
                </div>

                <div className="form-actions">
                  <button
                    type="button"
                    className="reset-btn"
                    onClick={handleReset}
                    disabled={!isFormChanged}
                  >
                    Reset Changes
                  </button>
                  
                  <button
                    type="submit"
                    className={`update-btn ${updateUserMutation.isLoading ? 'loading' : ''}`}
                    disabled={!isFormChanged || updateUserMutation.isLoading}
                  >
                    {updateUserMutation.isLoading ? (
                      <>
                        <div className="btn-spinner"></div>
                        <span>Updating...</span>
                      </>
                    ) : (
                      <>
                        <SaveIcon />
                        <span>Update Account</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyAccount;
