import { useState } from 'react';
import { Star } from 'lucide-react';
import Button from './Button';
import Card from './Card';

const ReviewForm = ({ onSubmit, initialRating = 0, initialComment = '', isEditing = false }) => {
    const [rating, setRating] = useState(initialRating);
    const [hoveredRating, setHoveredRating] = useState(0);
    const [comment, setComment] = useState(initialComment);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (rating === 0) {
            setError('Please select a rating');
            return;
        }

        if (comment.trim().length < 10) {
            setError('Please write at least 10 characters in your review');
            return;
        }

        setIsSubmitting(true);
        try {
            await onSubmit(rating, comment);
            if (!isEditing) {
                setRating(0);
                setComment('');
            }
        } catch (err) {
            setError(err.message || 'Failed to submit review');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Card>
            <h3 style={{
                fontSize: '1.25rem',
                fontWeight: '600',
                color: 'var(--color-text)',
                marginBottom: '1.5rem'
            }}>
                {isEditing ? 'Edit Your Review' : 'Write a Review'}
            </h3>

            <form onSubmit={handleSubmit}>
                {/* Star Rating */}
                <div style={{ marginBottom: '1.5rem' }}>
                    <label style={{
                        display: 'block',
                        fontSize: '0.875rem',
                        fontWeight: '500',
                        color: 'var(--color-text)',
                        marginBottom: '0.5rem'
                    }}>
                        Rating *
                    </label>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                        {[1, 2, 3, 4, 5].map((star) => (
                            <button
                                key={star}
                                type="button"
                                onClick={() => setRating(star)}
                                onMouseEnter={() => setHoveredRating(star)}
                                onMouseLeave={() => setHoveredRating(0)}
                                style={{
                                    background: 'none',
                                    border: 'none',
                                    cursor: 'pointer',
                                    padding: '0.25rem',
                                    transition: 'transform 0.2s'
                                }}
                                onMouseDown={(e) => e.currentTarget.style.transform = 'scale(0.9)'}
                                onMouseUp={(e) => e.currentTarget.style.transform = 'scale(1)'}
                            >
                                <Star
                                    size={32}
                                    fill={star <= (hoveredRating || rating) ? '#f59e0b' : 'none'}
                                    stroke={star <= (hoveredRating || rating) ? '#f59e0b' : 'var(--color-text-secondary)'}
                                    style={{ transition: 'all 0.2s' }}
                                />
                            </button>
                        ))}
                    </div>
                </div>

                {/* Comment */}
                <div style={{ marginBottom: '1.5rem' }}>
                    <label style={{
                        display: 'block',
                        fontSize: '0.875rem',
                        fontWeight: '500',
                        color: 'var(--color-text)',
                        marginBottom: '0.5rem'
                    }}>
                        Your Review *
                    </label>
                    <textarea
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        placeholder="Share your experience with ZxSchool..."
                        rows={5}
                        style={{
                            width: '100%',
                            padding: '0.75rem',
                            fontSize: '0.9375rem',
                            color: 'var(--color-text)',
                            backgroundColor: 'var(--color-bg)',
                            border: '1px solid var(--color-border)',
                            borderRadius: 'var(--radius-md)',
                            resize: 'vertical',
                            fontFamily: 'inherit',
                            lineHeight: '1.6'
                        }}
                    />
                    <p style={{
                        fontSize: '0.75rem',
                        color: 'var(--color-text-secondary)',
                        marginTop: '0.25rem'
                    }}>
                        {comment.length} characters (minimum 10)
                    </p>
                </div>

                {error && (
                    <div style={{
                        padding: '0.75rem',
                        backgroundColor: 'rgba(239, 68, 68, 0.1)',
                        border: '1px solid var(--color-danger)',
                        borderRadius: 'var(--radius-md)',
                        color: 'var(--color-danger)',
                        fontSize: '0.875rem',
                        marginBottom: '1rem'
                    }}>
                        {error}
                    </div>
                )}

                <Button
                    type="submit"
                    variant="primary"
                    disabled={isSubmitting}
                    style={{ width: '100%' }}
                >
                    {isSubmitting ? 'Submitting...' : (isEditing ? 'Update Review' : 'Submit Review')}
                </Button>
            </form>
        </Card>
    );
};

export default ReviewForm;
