import { useState, useEffect } from 'react';
import { db } from '../../firebase/config';
import { collection, getDocs, updateDoc, doc } from 'firebase/firestore';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button';
import Card from '../../components/Card';
import { Users, Mail, Phone, Shield, ShieldOff, User, LogOut } from 'lucide-react';

const ManageUsers = () => {
    const [users, setUsers] = useState([]);
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
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        const querySnapshot = await getDocs(collection(db, "users"));
        setUsers(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };

    const toggleAdmin = async (userId, currentRole) => {
        const newRole = currentRole === 'admin' ? 'student' : 'admin';
        if (window.confirm(`Are you sure you want to ${newRole === 'admin' ? 'grant admin access to' : 'revoke admin access from'} this user?`)) {
            await updateDoc(doc(db, "users", userId), { role: newRole });
            fetchUsers();
        }
    };

    return (
        <div className="container" style={{ padding: '2rem 1rem' }}>
            <div className="admin-header" style={{
                marginBottom: '2rem',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: '1rem'
            }}>
                <div>
                    <h2 style={{
                        fontSize: 'clamp(1.75rem, 3vw, 2rem)',
                        fontWeight: '700',
                        color: 'var(--color-text)',
                        marginBottom: '0.25rem'
                    }}>
                        Registered Users
                    </h2>
                    <p style={{
                        fontSize: '0.875rem',
                        color: 'var(--color-text-secondary)'
                    }}>
                        {users.length} total user{users.length !== 1 ? 's' : ''} • {users.filter(u => u.role === 'admin').length} admin{users.filter(u => u.role === 'admin').length !== 1 ? 's' : ''}
                    </p>
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

            <div style={{ display: 'grid', gap: '1rem' }}>
                {users.length === 0 ? (
                    <Card style={{ textAlign: 'center', padding: '3rem 2rem' }}>
                        <Users size={48} style={{
                            color: 'var(--color-text-secondary)',
                            margin: '0 auto 1rem'
                        }} />
                        <p style={{
                            color: 'var(--color-text-secondary)',
                            fontSize: '1rem'
                        }}>
                            No users registered yet.
                        </p>
                    </Card>
                ) : (
                    users.map(user => (
                        <Card key={user.id} className="card-hover">
                            <div className="user-card-content" style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
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
                                            padding: '0.75rem',
                                            backgroundColor: user.role === 'admin' ? 'rgba(139, 92, 246, 0.1)' : 'rgba(59, 130, 246, 0.1)',
                                            borderRadius: 'var(--radius-md)',
                                            display: 'flex'
                                        }}>
                                            {user.role === 'admin' ? (
                                                <Shield size={24} style={{ color: '#8b5cf6' }} />
                                            ) : (
                                                <User size={24} style={{ color: 'var(--color-primary)' }} />
                                            )}
                                        </div>
                                        <div>
                                            <h3 style={{
                                                fontSize: '1.125rem',
                                                fontWeight: '600',
                                                color: 'var(--color-text)',
                                                marginBottom: '0.25rem'
                                            }}>
                                                {user.name}
                                            </h3>
                                            <div style={{
                                                display: 'inline-flex',
                                                alignItems: 'center',
                                                gap: '0.5rem',
                                                padding: '0.25rem 0.75rem',
                                                borderRadius: 'var(--radius-md)',
                                                backgroundColor: user.role === 'admin' ? 'rgba(139, 92, 246, 0.1)' : 'rgba(59, 130, 246, 0.1)',
                                                color: user.role === 'admin' ? '#8b5cf6' : 'var(--color-primary)',
                                                fontSize: '0.75rem',
                                                fontWeight: '600',
                                                textTransform: 'uppercase',
                                                letterSpacing: '0.5px'
                                            }}>
                                                {user.role}
                                            </div>
                                        </div>
                                    </div>

                                    <div style={{
                                        display: 'grid',
                                        gap: '0.5rem',
                                        fontSize: '0.875rem',
                                        color: 'var(--color-text-secondary)',
                                        marginLeft: '3.5rem'
                                    }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                            <Mail size={16} />
                                            <span>{user.email}</span>
                                        </div>
                                        {user.phone && (
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                                <Phone size={16} />
                                                <span>{user.phone}</span>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <Button
                                    variant={user.role === 'admin' ? 'danger' : 'secondary'}
                                    onClick={() => toggleAdmin(user.id, user.role)}
                                    style={{
                                        padding: '0.5rem 1rem',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.5rem'
                                    }}
                                >
                                    {user.role === 'admin' ? (
                                        <>
                                            <ShieldOff size={16} />
                                            Revoke Admin
                                        </>
                                    ) : (
                                        <>
                                            <Shield size={16} />
                                            Make Admin
                                        </>
                                    )}
                                </Button>
                            </div>
                        </Card>
                    ))
                )}
            </div>
        </div>
    );
};

export default ManageUsers;
