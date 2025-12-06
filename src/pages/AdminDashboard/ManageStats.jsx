import { useState, useEffect } from 'react';
import { getStats, manualUpdateStats, updateReviewStats } from '../../services/statsService';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button';
import Card from '../../components/Card';
import Input from '../../components/Input';
import { TrendingUp, Users, MessageSquare, Star, RefreshCw, Edit2, Save, X, LogOut } from 'lucide-react';

const ManageStats = () => {
    const [stats, setStats] = useState({
        studentCount: 0,
        reviewCount: 0,
        averageRating: 0,
        lastUpdated: null
    });
    const [loading, setLoading] = useState(true);
    const [editing, setEditing] = useState(null);
    const [editValue, setEditValue] = useState('');
    const [refreshing, setRefreshing] = useState(false);
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
        fetchStats();
    }, []);

    const fetchStats = async () => {
        setLoading(true);
        try {
            const data = await getStats();
            setStats(data);
        } catch (error) {
            console.error('Error fetching stats:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleRefreshReviewStats = async () => {
        setRefreshing(true);
        try {
            await updateReviewStats();
            await fetchStats();
            alert('Review statistics refreshed successfully!');
        } catch (error) {
            console.error('Error refreshing stats:', error);
            alert('Failed to refresh statistics');
        } finally {
            setRefreshing(false);
        }
    };

    const startEdit = (field, value) => {
        setEditing(field);
        setEditValue(value.toString());
    };

    const cancelEdit = () => {
        setEditing(null);
        setEditValue('');
    };

    const saveEdit = async (field) => {
        try {
            const value = field === 'averageRating' ? parseFloat(editValue) : parseInt(editValue);
            if (isNaN(value)) {
                alert('Please enter a valid number');
                return;
            }
            await manualUpdateStats(field, value);
            await fetchStats();
            setEditing(null);
            setEditValue('');
        } catch (error) {
            console.error('Error updating stat:', error);
            alert('Failed to update statistic');
        }
    };

    const statCards = [
        {
            field: 'studentCount',
            label: 'Total Students',
            value: stats.studentCount,
            icon: Users,
            color: 'var(--color-primary)',
            description: 'Number of registered students'
        },
        {
            field: 'reviewCount',
            label: 'Total Reviews',
            value: stats.reviewCount,
            icon: MessageSquare,
            color: '#10b981',
            description: 'Number of approved reviews'
        },
        {
            field: 'averageRating',
            label: 'Average Rating',
            value: stats.averageRating,
            icon: Star,
            color: '#f59e0b',
            description: 'Average rating from all reviews',
            suffix: '★'
        }
    ];

    if (loading) {
        return (
            <div className="container" style={{ padding: '2rem 1rem' }}>
                <Card style={{ textAlign: 'center', padding: '3rem 2rem' }}>
                    <div className="skeleton" style={{
                        width: '100px',
                        height: '100px',
                        borderRadius: '50%',
                        margin: '0 auto'
                    }} />
                </Card>
            </div>
        );
    }

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
                        Site Statistics
                    </h2>
                    <p style={{
                        fontSize: '0.9375rem',
                        color: 'var(--color-text-secondary)'
                    }}>
                        Manage and monitor site-wide statistics
                    </p>
                </div>

                <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                    <Button
                        variant="outline"
                        onClick={handleRefreshReviewStats}
                        disabled={refreshing}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem'
                        }}
                    >
                        <RefreshCw size={16} className={refreshing ? 'spinning' : ''} />
                        {refreshing ? 'Refreshing...' : 'Refresh Review Stats'}
                    </Button>
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

            {stats.lastUpdated && (
                <Card style={{ marginBottom: '2rem', backgroundColor: 'var(--color-bg-secondary)' }}>
                    <p style={{
                        fontSize: '0.875rem',
                        color: 'var(--color-text-secondary)',
                        margin: 0
                    }}>
                        Last updated: {new Date(stats.lastUpdated.seconds * 1000).toLocaleString()}
                    </p>
                </Card>
            )}

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: '1.5rem'
            }}>
                {statCards.map((stat) => {
                    const Icon = stat.icon;
                    const isEditing = editing === stat.field;

                    return (
                        <Card key={stat.field} className="card-hover">
                            <div style={{
                                display: 'flex',
                                alignItems: 'flex-start',
                                justifyContent: 'space-between',
                                marginBottom: '1rem'
                            }}>
                                <div style={{
                                    padding: '0.75rem',
                                    backgroundColor: `${stat.color}15`,
                                    borderRadius: 'var(--radius-md)',
                                    color: stat.color
                                }}>
                                    <Icon size={24} />
                                </div>
                                {!isEditing && (
                                    <button
                                        onClick={() => startEdit(stat.field, stat.value)}
                                        style={{
                                            background: 'none',
                                            border: 'none',
                                            cursor: 'pointer',
                                            padding: '0.5rem',
                                            color: 'var(--color-text-secondary)',
                                            transition: 'color 0.2s'
                                        }}
                                        onMouseEnter={(e) => e.currentTarget.style.color = 'var(--color-primary)'}
                                        onMouseLeave={(e) => e.currentTarget.style.color = 'var(--color-text-secondary)'}
                                    >
                                        <Edit2 size={18} />
                                    </button>
                                )}
                            </div>

                            <h3 style={{
                                fontSize: '0.875rem',
                                fontWeight: '600',
                                color: 'var(--color-text-secondary)',
                                marginBottom: '0.5rem',
                                textTransform: 'uppercase',
                                letterSpacing: '0.5px'
                            }}>
                                {stat.label}
                            </h3>

                            {isEditing ? (
                                <div>
                                    <Input
                                        type="number"
                                        value={editValue}
                                        onChange={(e) => setEditValue(e.target.value)}
                                        step={stat.field === 'averageRating' ? '0.1' : '1'}
                                        min="0"
                                        max={stat.field === 'averageRating' ? '5' : undefined}
                                        style={{ marginBottom: '0.75rem' }}
                                    />
                                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                                        <Button
                                            variant="primary"
                                            onClick={() => saveEdit(stat.field)}
                                            style={{
                                                flex: 1,
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                gap: '0.5rem',
                                                fontSize: '0.875rem'
                                            }}
                                        >
                                            <Save size={14} />
                                            Save
                                        </Button>
                                        <Button
                                            variant="outline"
                                            onClick={cancelEdit}
                                            style={{
                                                flex: 1,
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                gap: '0.5rem',
                                                fontSize: '0.875rem'
                                            }}
                                        >
                                            <X size={14} />
                                            Cancel
                                        </Button>
                                    </div>
                                </div>
                            ) : (
                                <>
                                    <div style={{
                                        fontSize: 'clamp(2rem, 4vw, 2.5rem)',
                                        fontWeight: '800',
                                        color: 'var(--color-text)',
                                        marginBottom: '0.5rem'
                                    }}>
                                        {stat.value}{stat.suffix || ''}
                                    </div>
                                    <p style={{
                                        fontSize: '0.875rem',
                                        color: 'var(--color-text-secondary)',
                                        margin: 0
                                    }}>
                                        {stat.description}
                                    </p>
                                </>
                            )}
                        </Card>
                    );
                })}
            </div>

            <Card style={{ marginTop: '2rem', backgroundColor: 'var(--color-bg-secondary)' }}>
                <h3 style={{
                    fontSize: '1.125rem',
                    fontWeight: '600',
                    color: 'var(--color-text)',
                    marginBottom: '1rem'
                }}>
                    About Statistics
                </h3>
                <ul style={{
                    fontSize: '0.875rem',
                    color: 'var(--color-text-secondary)',
                    lineHeight: '1.8',
                    paddingLeft: '1.5rem'
                }}>
                    <li><strong>Student Count:</strong> Automatically increments when new users sign up</li>
                    <li><strong>Review Count:</strong> Shows only approved reviews</li>
                    <li><strong>Average Rating:</strong> Calculated from all approved reviews</li>
                    <li>Click "Refresh Review Stats" to recalculate review statistics from the database</li>
                    <li>Use the edit button to manually override any statistic if needed</li>
                </ul>
            </Card>
        </div>
    );
};

export default ManageStats;
