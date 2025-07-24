import React, { useState } from 'react';
import './reviews.scss';  
import Review from '../review/review';
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import newRequest from '../../utils/newRequest';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import RateReviewIcon from '@mui/icons-material/RateReview';
import SendIcon from '@mui/icons-material/Send';

const Reviews = ({ productId }) => {
    const queryClient = useQueryClient();
    const { isLoading, error, data } = useQuery({
        queryKey: ["reviews", productId],
        queryFn: () =>
            newRequest.get(`/reviews/${productId}`).then((res) => {
                return res.data;
            }),
    });

    const [selectedRating, setSelectedRating] = useState(0);
    const [reviewDescription, setReviewDescription] = useState('');
    const [hoveredRating, setHoveredRating] = useState(0);

    const handleStarClick = (rating) => {
        setSelectedRating(rating);
    };

    const handleStarHover = (rating) => {
        setHoveredRating(rating);
    };

    const handleStarLeave = () => {
        setHoveredRating(0);
    };

    const mutation = useMutation({
        mutationFn: (review) => {
            return newRequest.post("/reviews", review);
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["reviews", productId]);
        }
    });

    const handleReviewSubmit = (e) => {
        e.preventDefault();
        
        if (selectedRating === 0) {
            alert("Please select a rating before submitting your review.");
            return;
        }
        
        if (reviewDescription.trim() === '') {
            alert("Please write your review before submitting.");
            return;
        }

        const desc = reviewDescription;
        const star = selectedRating;
        mutation.mutate({ productId, desc, star });

        setSelectedRating(0);
        setReviewDescription("");
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

    const averageRating = data && data.length > 0 
        ? (data.reduce((sum, review) => sum + review.star, 0) / data.length).toFixed(1)
        : 0;

    return (
        <div className="reviews-section">
            <div className="reviews-header">
                <div className="reviews-title">
                    <RateReviewIcon className="reviews-icon" />
                    <h2>Customer Reviews</h2>
                </div>
                
                {data && data.length > 0 && (
                    <div className="reviews-summary">
                        <div className="average-rating">
                            <span className="rating-score">{averageRating}</span>
                            <div className="rating-stars">
                                {Array.from({ length: 5 }, (_, index) => (
                                    <StarIcon 
                                        key={index}
                                        className={index < Math.round(averageRating) ? 'filled' : 'empty'}
                                    />
                                ))}
                            </div>
                        </div>
                        <span className="review-count">Based on {data.length} review{data.length !== 1 ? 's' : ''}</span>
                    </div>
                )}
            </div>

            <div className="reviews-content">
                {isLoading ? (
                    <div className="loading-state">
                        <div className="loading-spinner"></div>
                        <p>Loading reviews...</p>
                    </div>
                ) : error ? (
                    <div className="error-state">
                        <p>Unable to load reviews. Please try again later.</p>
                    </div>
                ) : data && data.length > 0 ? (
                    <div className="reviews-list">
                        {data.map((review) => (
                            <Review key={review._id} review={review} />
                        ))}
                    </div>
                ) : (
                    <div className="empty-state">
                        <RateReviewIcon className="empty-icon" />
                        <h3>No reviews yet</h3>
                        <p>Be the first to share your experience with this product!</p>
                    </div>
                )}
            </div>

            <div className="review-form-section">
                <div className="form-header">
                    <h3>Write a Review</h3>
                    <p>Share your experience to help others make informed decisions</p>
                </div>

                <form className="review-form" onSubmit={handleReviewSubmit}>
                    <div className="rating-section">
                        <label className="rating-label">Your Rating *</label>
                        <div className="star-rating">
                            {Array.from({ length: 5 }, (_, index) => {
                                const starValue = index + 1;
                                const isActive = starValue <= (hoveredRating || selectedRating);
                                
                                return (
                                    <button
                                        key={starValue}
                                        type="button"
                                        className={`star-btn ${isActive ? 'active' : ''}`}
                                        onClick={() => handleStarClick(starValue)}
                                        onMouseEnter={() => handleStarHover(starValue)}
                                        onMouseLeave={handleStarLeave}
                                    >
                                        {isActive ? <StarIcon /> : <StarBorderIcon />}
                                    </button>
                                );
                            })}
                        </div>
                        {(hoveredRating > 0 || selectedRating > 0) && (
                            <span className="rating-text">
                                {getRatingText(hoveredRating || selectedRating)}
                            </span>
                        )}
                    </div>

                    <div className="review-text-section">
                        <label className="review-label">Your Review *</label>
                        <textarea
                            className="review-textarea"
                            placeholder="Share your thoughts about this product. What did you like or dislike? How was the quality, fit, and comfort?"
                            value={reviewDescription}
                            onChange={(e) => setReviewDescription(e.target.value)}
                            rows={4}
                            maxLength={500}
                        />
                        <div className="character-count">
                            {reviewDescription.length}/500 characters
                        </div>
                    </div>

                    <button 
                        type="submit" 
                        className={`submit-btn ${mutation.isLoading ? 'loading' : ''}`}
                        disabled={mutation.isLoading || selectedRating === 0 || reviewDescription.trim() === ''}
                    >
                        {mutation.isLoading ? (
                            <>
                                <div className="btn-spinner"></div>
                                <span>Submitting...</span>
                            </>
                        ) : (
                            <>
                                <SendIcon />
                                <span>Submit Review</span>
                            </>
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Reviews