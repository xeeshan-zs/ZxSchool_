import { useState, useEffect } from 'react';
import { db } from '../../firebase/config';
import { collection, getDocs, updateDoc, doc, orderBy, query, getDoc } from 'firebase/firestore';
import Button from '../../components/Button';
import Card from '../../components/Card';
import { FileText, ExternalLink, CheckCircle, XCircle, Clock, User } from 'lucide-react';

const ManageApplications = () => {
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchApplications();
    }, []);

    const fetchApplications = async () => {
        try {
            const q = query(collection(db, "applications"), orderBy("timestamp", "desc"));
            const querySnapshot = await getDocs(q);
            const apps = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

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
            const querySnapshot = await getDocs(collection(db, "applications"));
            const apps = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

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
        }
        setLoading(false);
    };

    const updateStatus = async (id, status) => {
        if (window.confirm(`Are you sure you want to ${status} this application?`)) {
            await updateDoc(doc(db, "applications", id), { status });
            fetchApplications();
        }
    };

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

    if (loading) {
        return (
            <div className="container" style={{ padding: '2rem 1rem', textAlign: 'center' }}>
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
        <div className="container" style={{ padding: '2rem 1rem' }}>
            <div style={{ marginBottom: '2rem' }}>
                <h2 style={{
                    fontSize: 'clamp(1.75rem, 3vw, 2rem)',
                    fontWeight: '700',
                    color: 'var(--color-text)',
                    marginBottom: '0.25rem'
                }}>
                    Student Applications
                </h2>
                <p style={{
                    fontSize: '0.875rem',
                    color: 'var(--color-text-secondary)'
                }}>
                    {applications.length} total application{applications.length !== 1 ? 's' : ''} • {applications.filter(a => a.status === 'pending').length} pending
                </p>
            </div>

            <div style={{ display: 'grid', gap: '1rem' }}>
                {applications.length === 0 ? (
                    <Card style={{ textAlign: 'center', padding: '3rem 2rem' }}>
                        <FileText size={48} style={{
                            color: 'var(--color-text-secondary)',
                            margin: '0 auto 1rem'
                        }} />
                        <p style={{
                            color: 'var(--color-text-secondary)',
                            fontSize: '1rem'
                        }}>
                            No applications submitted yet.
                        </p>
                    </Card>
                ) : (
                    applications.map(app => (
                        <Card key={app.id} className="card-hover">
                            <div style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'flex-start',
                                marginBottom: '1rem',
                                flexWrap: 'wrap',
                                gap: '1rem'
                            }}>
                                <div style={{ flex: 1, minWidth: '250px' }}>
                                    <div style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.75rem',
                                        marginBottom: '0.75rem'
                                    }}>
                                        <div style={{
                                            padding: '0.5rem',
                                            backgroundColor: 'rgba(59, 130, 246, 0.1)',
                                            borderRadius: 'var(--radius-md)',
                                            display: 'flex'
                                        }}>
                                            <FileText size={20} style={{ color: 'var(--color-primary)' }} />
                                        </div>
                                        <div>
                                            <h3 style={{
                                                fontSize: '1.125rem',
                                                fontWeight: '600',
                                                color: 'var(--color-text)',
                                                marginBottom: '0.25rem'
                                            }}>
                                                {app.courseName}
                                            </h3>
                                            <div style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '0.5rem',
                                                color: 'var(--color-text-secondary)',
                                                fontSize: '0.875rem'
                                            }}>
                                                <User size={14} />
                                                <span>Student ID: {app.userId.substring(0, 8)}...</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '1rem',
                                        flexWrap: 'wrap',
                                        fontSize: '0.875rem',
                                        color: 'var(--color-text-secondary)',
                                        marginLeft: '3rem'
                                    }}>
                                        <div>
                                            Paid: <strong style={{ color: 'var(--color-primary)' }}>{app.paidAmount} PKR</strong>
                                        </div>
                                        {app.promoCode && (
                                            <span style={{
                                                padding: '0.25rem 0.5rem',
                                                backgroundColor: 'rgba(245, 158, 11, 0.1)',
                                                color: 'var(--color-secondary)',
                                                borderRadius: 'var(--radius-sm)',
                                                fontSize: '0.75rem',
                                                fontWeight: '600'
                                            }}>
                                                Promo: {app.promoCode}
                                            </span>
                                        )}
                                    </div>
                                </div>

                                {getStatusBadge(app.status)}
                            </div>

                            {app.receiptUrl && (
                                <div style={{ marginBottom: '1rem' }}>
                                    <a
                                        href={app.receiptUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        style={{
                                            display: 'inline-flex',
                                            alignItems: 'center',
                                            gap: '0.5rem',
                                            color: 'var(--color-primary)',
                                            fontSize: '0.875rem',
                                            fontWeight: '500',
                                            textDecoration: 'none',
                                            padding: '0.5rem 1rem',
                                            backgroundColor: 'rgba(59, 130, 246, 0.1)',
                                            borderRadius: 'var(--radius-md)',
                                            transition: 'all 0.2s'
                                        }}
                                        onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(59, 130, 246, 0.2)'}
                                        onMouseLeave={(e) => e.target.style.backgroundColor = 'rgba(59, 130, 246, 0.1)'}
                                    >
                                        <ExternalLink size={16} />
                                        View Receipt
                                    </a>
                                </div>
                            )}

                            {app.aiMessage && (
                                <div style={{
                                    fontSize: '0.875rem',
                                    marginBottom: '1rem',
                                    backgroundColor: 'rgba(139, 92, 246, 0.1)',
                                    padding: '0.75rem 1rem',
                                    borderRadius: 'var(--radius-md)',
                                    borderLeft: '3px solid #8b5cf6',
                                    color: 'var(--color-text)'
                                }}>
                                    <strong>🤖 AI Verification:</strong> {app.aiMessage}
                                </div>
                            )}

                            {app.status === 'pending' && (
                                <div style={{
                                    display: 'flex',
                                    gap: '0.75rem',
                                    paddingTop: '1rem',
                                    borderTop: '1px solid var(--color-border)'
                                }}>
                                    <Button
                                        variant="primary"
                                        onClick={() => updateStatus(app.id, 'verified')}
                                        style={{
                                            flex: 1,
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            gap: '0.5rem'
                                        }}
                                    >
                                        <CheckCircle size={18} />
                                        Approve
                                    </Button>
                                    <Button
                                        variant="danger"
                                        onClick={() => updateStatus(app.id, 'rejected')}
                                        style={{
                                            flex: 1,
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            gap: '0.5rem'
                                        }}
                                    >
                                        <XCircle size={18} />
                                        Reject
                                    </Button>
                                </div>
                            )}
                        </Card>
                    ))
                )}
            </div>
        </div>
    );
};

export default ManageApplications;
