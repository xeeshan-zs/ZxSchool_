import { useState, useEffect } from 'react';
import { getAllReviews, approveReview, rejectReview, updateReview, deleteReview } from '../../services/reviewService';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button';
import Card from '../../components/Card';
import Input from '../../components/Input';
import { Star, Trash2, Edit2, Check, X, Filter, MessageSquare, LogOut } from 'lucide-react';

const ManageReviews = () => {
    const [reviews, setReviews] = useState([]);
    const [filter, setFilter] = useState('all');
    const [loading, setLoading] = useState(true);
    const [editingReview, setEditingReview] = useState(null);
    const [editForm, setEditForm] = useState({ rating: 0, comment: '' });
    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await logout();
            navigate('/login');
        } catch (error) {
            console.error("Failed to log out", error);
        }
    };

    useEffect(() => {
        fetchReviews();
    }, [filter]);

    const fetchReviews = async () => {
        setLoading(true);
        try {
            const data = await getAllReviews(filter);
            setReviews(data);
        } catch (error) {
            console.error('Error fetching reviews:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleApprove = async (reviewId) => {
        if (window.confirm('Approve this review?')) {
            await approveReview(reviewId);
            fetchReviews();
        }
    };

    const handleReject = async (reviewId) => {
        if (window.confirm('Reject this review?')) {
            await rejectReview(reviewId);
            fetchReviews();
        }
    };

    const handleDelete = async (reviewId) => {
        if (window.confirm('Are you sure you want to delete this review? This action cannot be undone.')) {
            await deleteReview(reviewId);
            fetchReviews();
        }
    };

    const startEdit = (review) => {
        setEditingReview(review.id);
        setEditForm({ rating: review.rating, comment: review.comment });
    };

    const cancelEdit = () => {
        setEditingReview(null);
        setEditForm({ rating: 0, comment: '' });
    };

    const saveEdit = async (reviewId) => {
        try {
            await updateReview(reviewId, editForm);
            setEditingReview(null);
            fetchReviews();
        } catch (error) {
            console.error('Error updating review:', error);
            alert('Failed to update review');
        }
    };

    const stats = {
        total: reviews.length,
        approved: reviews.filter(r => r.status === 'approved').length,
        pending: reviews.filter(r => r.status === 'pending').length,
        rejected: reviews.filter(r => r.status === 'rejected').length
    };

    return (
        <div className="container" style={{ padding: '2rem 1rem' }}>
            <div className="admin-header" style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '2rem',
                flexWrap: 'wrap',
                gap: '1rem'
            }}>
                <div>
                    <h2 style={{
                        fontSize: 'clamp(1.75rem, 3vw, 2rem)',
                        fontWeight: '700',
                        color: 'var(--color-text)',
                        marginBottom: '0.5rem'
                    }}>
                        Manage Reviews
                    </h2>
                    <p style={{
                        fontSize: '0.9375rem',
                        color: 'var(--color-text-secondary)'
                    }}>
                        {stats.total} total reviews
                    </p>
                </div>

                <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', alignItems: 'center' }}>
                    {/* Filter Buttons */}
                    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                        <Button
                            variant={filter === 'all' ? 'primary' : 'outline'}
                            onClick={() => setFilter('all')}
                            style={{ fontSize: '0.875rem' }}
                        >
                            All ({stats.total})
                        </Button>
                        <Button
                            variant={filter === 'approved' ? 'primary' : 'outline'}
                            onClick={() => setFilter('approved')}
                            style={{ fontSize: '0.875rem' }}
                        >
                            Approved ({stats.approved})
                        </Button>
                        <Button
                            variant={filter === 'pending' ? 'primary' : 'outline'}
                            onClick={() => setFilter('pending')}
                            style={{ fontSize: '0.875rem' }}
                        >
                            Pending ({stats.pending})
                        </Button>
                        <Button
                            variant={filter === 'rejected' ? 'primary' : 'outline'}
                            onClick={() => setFilter('rejected')}
                            style={{ fontSize: '0.875rem' }}
                        >
                            Rejected ({stats.rejected})
                        </Button>
                    </div>
                    <Button
                        variant="outline"
                        onClick={handleLogout}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            color: 'var(--color-danger)',
                            borderColor: 'var(--color-danger)'
                        }}
                    >
                        <LogOut size={18} />
                        Logout
                    </Button>
                </div>
            </div>

            {/* Reviews List */}
            {loading ? (
                <Card style={{ textAlign: 'center', padding: '3rem 2rem' }}>
                    <div className="skeleton" style={{
                        width: '100px',
                        height: '100px',
                        borderRadius: '50%',
                        margin: '0 auto'
                    }} />
                </Card>
            ) : reviews.length === 0 ? (
                <Card style={{ textAlign: 'center', padding: '3rem 2rem' }}>
                    <MessageSquare size={48} style={{ color: 'var(--color-text-secondary)', margin: '0 auto 1rem' }} />
                    <p style={{ color: 'var(--color-text-secondary)' }}>
                        No {filter !== 'all' ? filter : ''} reviews found.
                    </p>
                </Card>
            ) : (
                <div style={{ display: 'grid', gap: '1rem' }}>
                    {reviews.map(review => (
                        <Card key={review.id} className="card-hover">
                            {editingReview === review.id ? (
                                // Edit Mode
                                <div>
                                    <div style={{ marginBottom: '1rem' }}>
                                        <label style={{
                                            display: 'block',
                                            fontSize: '0.875rem',
                                            fontWeight: '500',
                                            color: 'var(--color-text)',
                                            marginBottom: '0.5rem'
                                        }}>
                                            Rating
                                        </label>
                                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                                            {[1, 2, 3, 4, 5].map((star) => (
                                                <button
                                                    key={star}
                                                    type="button"
                                                    onClick={() => setEditForm({ ...editForm, rating: star })}
                                                    style={{
                                                        background: 'none',
                                                        border: 'none',
                                                        cursor: 'pointer',
                                                        padding: '0.25rem'
                                                    }}
                                                >
                                                    <Star
                                                        size={24}
                                                        fill={star <= editForm.rating ? '#f59e0b' : 'none'}
                                                        stroke={star <= editForm.rating ? '#f59e0b' : 'var(--color-text-secondary)'}
                                                    />
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                    <div style={{ marginBottom: '1rem' }}>
                                        <label style={{
                                            display: 'block',
                                            fontSize: '0.875rem',
                                            fontWeight: '500',
                                            color: 'var(--color-text)',
                                            marginBottom: '0.5rem'
                                        }}>
                                            Comment
                                        </label>
                                        <textarea
                                            value={editForm.comment}
                                            onChange={(e) => setEditForm({ ...editForm, comment: e.target.value })}
                                            rows={4}
                                            style={{
                                                width: '100%',
                                                padding: '0.75rem',
                                                fontSize: '0.9375rem',
                                                color: 'var(--color-text)',
                                                backgroundColor: 'var(--color-bg)',
                                                border: '1px solid var(--color-border)',
                                                borderRadius: 'var(--radius-md)',
                                                resize: 'vertical',
                                                fontFamily: 'inherit'
                                            }}
                                        />
                                    </div>
                                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                                        <Button
                                            variant="primary"
                                            onClick={() => saveEdit(review.id)}
                                            style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                                        >
                                            <Check size={16} />
                                            Save
                                        </Button>
                                        <Button
                                            variant="outline"
                                            onClick={cancelEdit}
                                            style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                                        >
                                            <X size={16} />
                                            Cancel
                                        </Button>
                                    </div>
                                </div>
                            ) : (
                                // View Mode
                                <div>
                                    <div style={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'flex-start',
                                        marginBottom: '1rem'
                                    }}>
                                        <div>
                                            <h3 style={{
                                                fontSize: '1.125rem',
                                                fontWeight: '600',
                                                color: 'var(--color-text)',
                                                marginBottom: '0.25rem'
                                            }}>
                                                {review.userName}
                                            </h3>
                                            <div style={{ display: 'flex', gap: '0.25rem', marginBottom: '0.5rem' }}>
                                                {[1, 2, 3, 4, 5].map((star) => (
                                                    <Star
                                                        key={star}
                                                        size={16}
                                                        fill={star <= review.rating ? '#f59e0b' : 'none'}
                                                        stroke={star <= review.rating ? '#f59e0b' : 'var(--color-text-secondary)'}
                                                    />
                                                ))}
                                            </div>
                                        </div>
                                        <span style={{
                                            padding: '0.25rem 0.75rem',
                                            backgroundColor: review.status === 'approved' ? 'rgba(16, 185, 129, 0.1)' :
                                                review.status === 'rejected' ? 'rgba(239, 68, 68, 0.1)' :
                                                    'rgba(245, 158, 11, 0.1)',
                                            color: review.status === 'approved' ? 'var(--color-success)' :
                                                review.status === 'rejected' ? 'var(--color-danger)' :
                                                    'var(--color-warning)',
                                            borderRadius: 'var(--radius-sm)',
                                            fontSize: '0.75rem',
                                            fontWeight: '600',
                                            textTransform: 'capitalize'
                                        }}>
                                            {review.status}
                                        </span>
                                    </div>

                                    <p style={{
                                        color: 'var(--color-text-secondary)',
                                        lineHeight: '1.6',
                                        marginBottom: '1rem'
                                    }}>
                                        {review.comment}
                                    </p>

                                    <div style={{
                                        display: 'flex',
                                        gap: '0.5rem',
                                        paddingTop: '1rem',
                                        borderTop: '1px solid var(--color-border)',
                                        flexWrap: 'wrap'
                                    }}>
                                        {review.status !== 'approved' && (
                                            <Button
                                                variant="outline"
                                                onClick={() => handleApprove(review.id)}
                                                style={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: '0.5rem',
                                                    fontSize: '0.875rem',
                                                    color: 'var(--color-success)',
                                                    borderColor: 'var(--color-success)'
                                                }}
                                            >
                                                <Check size={16} />
                                                Approve
                                            </Button>
                                        )}
                                        {review.status !== 'rejected' && (
                                            <Button
                                                variant="outline"
                                                onClick={() => handleReject(review.id)}
                                                style={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: '0.5rem',
                                                    fontSize: '0.875rem',
                                                    color: 'var(--color-warning)',
                                                    borderColor: 'var(--color-warning)'
                                                }}
                                            >
                                                <X size={16} />
                                                Reject
                                            </Button>
                                        )}
                                        <Button
                                            variant="outline"
                                            onClick={() => startEdit(review)}
                                            style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '0.5rem',
                                                fontSize: '0.875rem'
                                            }}
                                        >
                                            <Edit2 size={16} />
                                            Edit
                                        </Button>
                                        <Button
                                            variant="outline"
                                            onClick={() => handleDelete(review.id)}
                                            style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '0.5rem',
                                                fontSize: '0.875rem',
                                                color: 'var(--color-danger)',
                                                borderColor: 'var(--color-danger)'
                                            }}
                                        >
                                            <Trash2 size={16} />
                                            Delete
                                        </Button>
                                    </div>
                                </div>
                            )}
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ManageReviews;
