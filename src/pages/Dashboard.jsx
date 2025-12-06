import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { db } from '../firebase/config';
import { doc, updateDoc, collection, query, where, getDocs, getDoc } from 'firebase/firestore';
import { motion } from 'framer-motion';
import Button from '../components/Button';
import Card from '../components/Card';
import Input from '../components/Input';
import { User, Mail, Phone, Building2, Edit2, Save, X, FileText, Clock, CheckCircle, XCircle, Star, LogOut } from 'lucide-react';
import ReviewForm from '../components/ReviewForm';
import { submitReview, updateReview, getUserReview } from '../services/reviewService';

const ProfileTab = ({ userData }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        name: userData?.name || '',
        phone: userData?.phone || '',
        institute: userData?.institute || ''
    });
    const { user } = useAuth();

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const userRef = doc(db, 'users', user.uid);
            await updateDoc(userRef, { ...formData });
            setIsEditing(false);
        } catch (error) {
            console.error("Error updating profile:", error);
        }
    };

    const InfoRow = ({ icon: Icon, label, value }) => (
        <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            padding: '1rem',
            backgroundColor: 'var(--color-bg-secondary)',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--color-border)'
        }}>
            <div style={{
                padding: '0.75rem',
                backgroundColor: 'var(--color-bg)',
                borderRadius: 'var(--radius-md)',
                color: 'var(--color-primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <Icon size={20} />
            </div>
            <div style={{ flex: 1 }}>
                <div style={{
                    fontSize: '0.75rem',
                    color: 'var(--color-text-secondary)',
                    marginBottom: '0.25rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                    fontWeight: '600'
                }}>
                    {label}
                </div>
                <div style={{
                    fontSize: '0.9375rem',
                    color: 'var(--color-text)',
                    fontWeight: '500'
                }}>
                    {value || 'Not provided'}
                </div>
            </div>
        </div>
    );

    return (
        <div className="profile-tab">
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '2rem',
                flexWrap: 'wrap',
                gap: '1rem'
            }}>
                <div>
                    <h2 style={{
                        fontSize: '1.75rem',
                        fontWeight: 700,
                        color: 'var(--color-text)',
                        marginBottom: '0.25rem'
                    }}>
                        Student Profile
                    </h2>
                    <p style={{
                        fontSize: '0.875rem',
                        color: 'var(--color-text-secondary)'
                    }}>
                        Manage your personal information
                    </p>
                </div>
                <Button
                    variant={isEditing ? "ghost" : "outline"}
                    onClick={() => setIsEditing(!isEditing)}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem'
                    }}
                >
                    {isEditing ? (
                        <>
                            <X size={16} />
                            Cancel
                        </>
                    ) : (
                        <>
                            <Edit2 size={16} />
                            Edit Profile
                        </>
                    )}
                </Button>
            </div>

            {isEditing ? (
                <form onSubmit={handleUpdate} style={{ maxWidth: '600px' }}>
                    <Input
                        label="Full Name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                    <Input
                        label="Phone"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                    <Input
                        label="Institute"
                        value={formData.institute}
                        onChange={(e) => setFormData({ ...formData, institute: e.target.value })}
                    />
                    <Button
                        type="submit"
                        variant="primary"
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem'
                        }}
                    >
                        <Save size={16} />
                        Save Changes
                    </Button>
                </form>
            ) : (
                <div className="profile-info-grid" style={{
                    display: 'grid',
                    gap: '1rem',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))'
                }}>
                    <InfoRow icon={User} label="Full Name" value={formData.name} />
                    <InfoRow icon={Mail} label="Email Address" value={userData?.email} />
                    <InfoRow icon={Phone} label="Phone Number" value={formData.phone} />
                    <InfoRow icon={Building2} label="Institute" value={formData.institute} />
                </div>
            )}
        </div>
    );
};

const ApplicationsTab = () => {
    const { user } = useAuth();
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user) return;
        const fetchApps = async () => {
            try {
                const q = query(collection(db, "applications"), where("userId", "==", user.uid));
                const snapshot = await getDocs(q);
                const apps = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

                const appsWithCourses = await Promise.all(
                    apps.map(async (app) => {
                        try {
                            const courseDoc = await getDoc(doc(db, "courses", app.courseId));
                            return {
                                ...app,
                                courseName: courseDoc.exists() ? courseDoc.data().title : `Course ${app.courseId}`
                            };
                        } catch (err) {
                            console.error("Error fetching course:", err);
                            return { ...app, courseName: `Course ${app.courseId}` };
                        }
                    })
                );

                setApplications(appsWithCourses);
            } catch (err) {
                console.error("Error fetching applications", err);
            }
            setLoading(false);
        };
        fetchApps();
    }, [user]);

    const getStatusBadge = (status) => {
        const statusConfig = {
            verified: {
                icon: CheckCircle,
                color: 'var(--color-success)',
                bg: 'rgba(16, 185, 129, 0.1)',
                label: 'Verified'
            },
            rejected: {
                icon: XCircle,
                color: 'var(--color-danger)',
                bg: 'rgba(239, 68, 68, 0.1)',
                label: 'Rejected'
            },
            pending: {
                icon: Clock,
                color: 'var(--color-warning)',
                bg: 'rgba(245, 158, 11, 0.1)',
                label: 'Pending'
            }
        };

        const config = statusConfig[status] || statusConfig.pending;
        const Icon = config.icon;

        return (
            <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.5rem 1rem',
                borderRadius: 'var(--radius-md)',
                backgroundColor: config.bg,
                color: config.color,
                fontWeight: '600',
                fontSize: '0.875rem',
                border: `1px solid ${config.color}`
            }}>
                <Icon size={16} />
                {config.label}
            </div>
        );
    };

    if (loading) return <div style={{ textAlign: 'center', padding: '2rem' }}>Loading applications...</div>;

    return (
        <div className="applications-tab">
            <div style={{ marginBottom: '2rem' }}>
                <h2 style={{
                    fontSize: '1.75rem',
                    fontWeight: 700,
                    color: 'var(--color-text)',
                    marginBottom: '0.25rem'
                }}>
                    My Applications
                </h2>
                <p style={{
                    fontSize: '0.875rem',
                    color: 'var(--color-text-secondary)'
                }}>
                    Track your course enrollment applications
                </p>
            </div>

            {applications.length === 0 ? (
                <Card style={{ textAlign: 'center', padding: '3rem 2rem' }}>
                    <FileText size={48} style={{
                        color: 'var(--color-text-secondary)',
                        margin: '0 auto 1rem'
                    }} />
                    <p style={{
                        color: 'var(--color-text-secondary)',
                        fontSize: '1rem',
                        marginBottom: '1rem'
                    }}>
                        No course applications found yet.
                    </p>
                    <p style={{
                        color: 'var(--color-text-secondary)',
                        fontSize: '0.875rem'
                    }}>
                        Browse courses to get started with your learning journey.
                    </p>
                </Card>
            ) : (
                <div style={{ display: 'grid', gap: '1rem' }}>
                    {applications.map(app => (
                        <Card key={app.id} className="card-hover">
                            <div style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'flex-start',
                                marginBottom: '1rem',
                                flexWrap: 'wrap',
                                gap: '1rem'
                            }}>
                                <div>
                                    <h3 style={{
                                        fontSize: '1.125rem',
                                        fontWeight: '600',
                                        color: 'var(--color-text)',
                                        marginBottom: '0.5rem'
                                    }}>
                                        {app.courseName}
                                    </h3>
                                    <div style={{
                                        fontSize: '0.875rem',
                                        color: 'var(--color-text-secondary)',
                                        display: 'flex',
                                        flexWrap: 'wrap',
                                        gap: '1rem'
                                    }}>
                                        <span>Amount: <strong>{app.paidAmount || 'Pending'}</strong></span>
                                        {app.promoCode && <span>Promo: <strong>{app.promoCode}</strong></span>}
                                    </div>
                                </div>
                                {getStatusBadge(app.status)}
                            </div>

                            {app.aiMessage && (
                                <div style={{
                                    fontSize: '0.875rem',
                                    marginTop: '1rem',
                                    backgroundColor: 'rgba(59, 130, 246, 0.1)',
                                    padding: '0.75rem 1rem',
                                    borderRadius: 'var(--radius-md)',
                                    borderLeft: '3px solid var(--color-primary)',
                                    color: 'var(--color-text)'
                                }}>
                                    <strong>🤖 AI Verification:</strong> {app.aiMessage}
                                </div>
                            )}
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
};

const ReviewsTab = () => {
    const { user, userData } = useAuth();
    const [userReview, setUserReview] = useState(null);
    const [loading, setLoading] = useState(true);
    const [success, setSuccess] = useState('');

    useEffect(() => {
        if (!user) return;
        loadUserReview();
    }, [user]);

    const loadUserReview = async () => {
        try {
            const review = await getUserReview(user.uid);
            setUserReview(review);
        } catch (error) {
            console.error('Error loading review:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmitReview = async (rating, comment) => {
        try {
            if (userReview) {
                // Update existing review
                await updateReview(userReview.id, { rating, comment });
                setSuccess('Review updated successfully!');
            } else {
                // Submit new review
                await submitReview(user.uid, userData?.name || 'Anonymous', rating, comment);
                setSuccess('Review submitted successfully! Thank you for your feedback.');
            }
            await loadUserReview();
            setTimeout(() => setSuccess(''), 5000);
        } catch (error) {
            throw new Error(error.message);
        }
    };

    if (loading) {
        return (
            <div style={{ textAlign: 'center', padding: '2rem' }}>
                <div className="skeleton" style={{
                    width: '100px',
                    height: '100px',
                    borderRadius: '50%',
                    margin: '0 auto'
                }} />
            </div>
        );
    }

    return (
        <div>
            <h2 style={{
                fontSize: '1.75rem',
                fontWeight: '700',
                color: 'var(--color-text)',
                marginBottom: '1rem'
            }}>
                {userReview ? 'Your Review' : 'Write a Review'}
            </h2>
            <p style={{
                fontSize: '0.9375rem',
                color: 'var(--color-text-secondary)',
                marginBottom: '2rem'
            }}>
                {userReview
                    ? 'You can edit your review below. Your feedback helps us improve!'
                    : 'Share your experience with ZxSchool and help others make informed decisions.'}
            </p>

            {success && (
                <div style={{
                    padding: '1rem',
                    backgroundColor: 'rgba(16, 185, 129, 0.1)',
                    border: '1px solid var(--color-success)',
                    borderRadius: 'var(--radius-md)',
                    color: 'var(--color-success)',
                    marginBottom: '1.5rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                }}>
                    <CheckCircle size={20} />
                    {success}
                </div>
            )}

            <ReviewForm
                onSubmit={handleSubmitReview}
                initialRating={userReview?.rating || 0}
                initialComment={userReview?.comment || ''}
                isEditing={!!userReview}
            />

            {userReview && (
                <Card style={{ marginTop: '2rem', backgroundColor: 'var(--color-bg-secondary)' }}>
                    <h3 style={{
                        fontSize: '1.125rem',
                        fontWeight: '600',
                        color: 'var(--color-text)',
                        marginBottom: '0.75rem'
                    }}>
                        Review Status
                    </h3>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        fontSize: '0.875rem'
                    }}>
                        <span style={{ color: 'var(--color-text-secondary)' }}>Status:</span>
                        <span style={{
                            padding: '0.25rem 0.75rem',
                            backgroundColor: userReview.status === 'approved' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(245, 158, 11, 0.1)',
                            color: userReview.status === 'approved' ? 'var(--color-success)' : 'var(--color-warning)',
                            borderRadius: 'var(--radius-sm)',
                            fontWeight: '600',
                            textTransform: 'capitalize'
                        }}>
                            {userReview.status}
                        </span>
                    </div>
                </Card>
            )}
        </div>
    );
};

const Dashboard = () => {
    const { user, userData, loading, logout } = useAuth();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('profile');

    const handleLogout = async () => {
        try {
            await logout();
            navigate('/login');
        } catch (error) {
            console.error("Failed to log out", error);
        }
    };

    if (loading) return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '60vh'
        }}>
            <div className="skeleton" style={{
                width: '100px',
                height: '100px',
                borderRadius: '50%'
            }} />
        </div>
    );

    if (user && !userData) {
        return (
            <div className="container" style={{ padding: '2rem', textAlign: 'center' }}>
                <p style={{ color: 'var(--color-text-secondary)' }}>
                    Profile not found. Please complete onboarding.
                </p>
            </div>
        );
    }

    return (
        <div className="container" style={{ padding: '2rem 1rem' }}>
            <div style={{ marginBottom: '2rem' }}>
                <h1 className="title-gradient" style={{
                    fontSize: 'clamp(2rem, 4vw, 2.5rem)',
                    marginBottom: '0.5rem',
                    fontWeight: '800'
                }}>
                    Welcome back, {userData?.name || 'Student'}!
                </h1>
                <p style={{
                    fontSize: '1rem',
                    color: 'var(--color-text-secondary)'
                }}>
                    Manage your profile and track your applications
                </p>
            </div>

            <div className="dashboard-layout" style={{
                display: 'grid',
                gridTemplateColumns: 'minmax(200px, 250px) 1fr',
                gap: '2rem',
                alignItems: 'start'
            }}>
                {/* Sidebar */}
                <Card className="dashboard-sidebar" style={{ position: 'sticky', top: '6rem' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <Button
                            variant={activeTab === 'profile' ? 'primary' : 'ghost'}
                            onClick={() => setActiveTab('profile')}
                            style={{
                                justifyContent: 'flex-start',
                                width: '100%',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.75rem'
                            }}
                        >
                            <User size={18} />
                            <span className="sidebar-text">Profile</span>
                        </Button>
                        <Button
                            variant={activeTab === 'applications' ? 'primary' : 'ghost'}
                            onClick={() => setActiveTab('applications')}
                            style={{
                                justifyContent: 'flex-start',
                                width: '100%',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.75rem'
                            }}
                        >
                            <FileText size={18} />
                            <span className="sidebar-text">Applications</span>
                        </Button>
                        <Button
                            variant={activeTab === 'reviews' ? 'primary' : 'ghost'}
                            onClick={() => setActiveTab('reviews')}
                            style={{
                                justifyContent: 'flex-start',
                                width: '100%',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.75rem'
                            }}
                        >
                            <Star size={18} />
                            <span className="sidebar-text">Reviews</span>
                        </Button>
                        <div style={{
                            width: '100%',
                            height: '1px',
                            backgroundColor: 'var(--color-border)',
                            margin: '0.5rem 0'
                        }} />
                        <Button
                            variant="outline"
                            onClick={handleLogout}
                            style={{
                                justifyContent: 'flex-start',
                                width: '100%',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.75rem',
                                color: 'var(--color-danger)',
                                borderColor: 'var(--color-danger)'
                            }}
                        >
                            <LogOut size={18} />
                            <span className="sidebar-text">Logout</span>
                        </Button>
                    </div>
                </Card>

                {/* Content Area */}
                <Card>
                    <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        {activeTab === 'profile' && <ProfileTab userData={userData} />}
                        {activeTab === 'applications' && <ApplicationsTab />}
                        {activeTab === 'reviews' && <ReviewsTab />}
                    </motion.div>
                </Card>
            </div>
        </div>
    );
};

export default Dashboard;
