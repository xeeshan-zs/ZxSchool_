import { useAuth } from '../../context/AuthContext';
import Card from '../../components/Card';
import Button from '../../components/Button';
import { useNavigate } from 'react-router-dom';
import { BookOpen, Tag, FileText, Users, LayoutDashboard, Star, TrendingUp, UserCircle, LogOut } from 'lucide-react';

const AdminHome = () => {
    const { userData, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await logout();
            navigate('/login');
        } catch (error) {
            console.error("Failed to log out", error);
        }
    };

    const adminCards = [
        {
            title: 'Manage Courses',
            description: 'Create, edit, or delete courses',
            icon: BookOpen,
            path: '/admin/courses',
            color: 'var(--color-primary)'
        },
        {
            title: 'Promo Codes',
            description: 'Manage discount codes and offers',
            icon: Tag,
            path: '/admin/promos',
            color: 'var(--color-secondary)'
        },
        {
            title: 'Applications',
            description: 'Review student applications and receipts',
            icon: FileText,
            path: '/admin/applications',
            color: 'var(--color-success)'
        },
        {
            title: 'Users',
            description: 'View and manage registered students',
            icon: Users,
            path: '/admin/users',
            color: '#8b5cf6'
        },
        {
            title: 'Reviews',
            description: 'Manage student reviews and ratings',
            icon: Star,
            path: '/admin/reviews',
            color: '#f59e0b'
        },
        {
            title: 'Statistics',
            description: 'View and manage site statistics',
            icon: TrendingUp,
            path: '/admin/stats',
            color: '#10b981'
        },
        {
            title: 'Instructors',
            description: 'Manage instructor profiles',
            icon: UserCircle,
            path: '/admin/instructors',
            color: '#ec4899'
        }
    ];

    return (
        <div className="container" style={{ padding: '2rem 1rem' }}>
            <div className="admin-header" style={{
                marginBottom: '3rem',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: '1rem'
            }}>
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem'
                }}>
                    <div style={{
                        padding: '1rem',
                        backgroundColor: 'var(--color-bg-secondary)',
                        borderRadius: 'var(--radius-lg)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <LayoutDashboard size={32} style={{ color: 'var(--color-primary)' }} />
                    </div>
                    <div>
                        <h1 className="title-gradient" style={{
                            fontSize: 'clamp(2rem, 4vw, 2.5rem)',
                            marginBottom: '0.25rem',
                            fontWeight: '800'
                        }}>
                            Admin Dashboard
                        </h1>
                        <p style={{
                            fontSize: '1rem',
                            color: 'var(--color-text-secondary)'
                        }}>
                            Welcome back, {userData?.name}
                        </p>
                    </div>
                </div>
                <div className="admin-header-actions">
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

            <div className="admin-cards-grid" style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: '1.5rem'
            }}>
                {adminCards.map((card) => {
                    const Icon = card.icon;
                    return (
                        <Card
                            key={card.path}
                            className="card-hover"
                            onClick={() => navigate(card.path)}
                            style={{
                                cursor: 'pointer',
                                position: 'relative',
                                overflow: 'hidden'
                            }}
                        >
                            <div style={{
                                position: 'absolute',
                                top: '-20px',
                                right: '-20px',
                                width: '100px',
                                height: '100px',
                                borderRadius: '50%',
                                backgroundColor: card.color,
                                opacity: '0.1'
                            }} />

                            <div style={{ position: 'relative', zIndex: 1 }}>
                                <div style={{
                                    padding: '1rem',
                                    backgroundColor: `${card.color}15`,
                                    borderRadius: 'var(--radius-lg)',
                                    display: 'inline-flex',
                                    marginBottom: '1rem'
                                }}>
                                    <Icon size={28} style={{ color: card.color }} />
                                </div>

                                <h3 style={{
                                    fontSize: '1.25rem',
                                    marginBottom: '0.5rem',
                                    color: 'var(--color-text)',
                                    fontWeight: '600'
                                }}>
                                    {card.title}
                                </h3>

                                <p style={{
                                    color: 'var(--color-text-secondary)',
                                    fontSize: '0.9375rem',
                                    lineHeight: '1.5'
                                }}>
                                    {card.description}
                                </p>
                            </div>
                        </Card>
                    );
                })}
            </div>
        </div>
    );
};

export default AdminHome;
