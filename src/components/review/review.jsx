import { useQuery } from "@tanstack/react-query";
import React from "react";
import newRequest from "../../utils/newRequest";
import "./review.scss";
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import PersonIcon from '@mui/icons-material/Person';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

const Review = ({ review }) => {
  const { isLoading, error, data } = useQuery(
    {
      queryKey: [review.userId],
      queryFn: () =>
        newRequest.get(`/users/${review.userId}`).then((res) => {
          return res.data;
        }),
    },
  );

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const getRatingText = (rating) => {
        const ratings = {
            1: 'Poor',
            2: 'Fair',
            3: 'Good',
            4: 'Very Good',
            5: 'Excellent'
        };
        return ratings[rating] || '';
    };

    return (
        <div className="review-card">
            <div className="review-header">
                <div className="user-info">
                    <div className="avatar">
                        {isLoading ? (
                            <div className="avatar-skeleton"></div>
                        ) : error ? (
                            <PersonIcon className="default-avatar" />
                        ) : (
                            <>
                                {data?.img ? (
                                    <img src={data.img} alt={`${data.firstName} ${data.lastName}`} />
                                ) : (
                                    <PersonIcon className="default-avatar" />
                                )}
                            </>
                        )}
                    </div>
                    
                    <div className="user-details">
                        <div className="username">
                            {isLoading ? (
                                <div className="username-skeleton"></div>
                            ) : error ? (
                                'Anonymous User'
                            ) : (
                                `${data?.firstName || ''} ${data?.lastName || ''}`.trim() || 'Anonymous User'
                            )}
                        </div>
                        
                        <div className="review-date">
                            <AccessTimeIcon className="time-icon" />
                            <span>{formatDate(review.createdAt)}</span>
                        </div>
                    </div>
                </div>

                <div className="rating-display">
                    <div className="stars">
                        {Array.from({ length: 5 }, (_, index) => (
                            <span key={index} className="star">
                                {index < review.star ? (
                                    <StarIcon className="filled-star" />
                                ) : (
                                    <StarBorderIcon className="empty-star" />
                                )}
                            </span>
                        ))}
                    </div>
                    <span className="rating-text">{getRatingText(review.star)}</span>
                </div>
            </div>

            <div className="review-content">
                <p>{review.desc}</p>
            </div>

            <div className="review-actions">
                <div className="helpful-section">
                    <span className="helpful-label">Was this helpful?</span>
                    <div className="helpful-buttons">
                        <button className="helpful-btn" title="Yes, this was helpful">
                            <ThumbUpIcon />
                            <span>Yes</span>
                        </button>
                        <button className="helpful-btn" title="No, this wasn't helpful">
                            <ThumbDownIcon />
                            <span>No</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Review;