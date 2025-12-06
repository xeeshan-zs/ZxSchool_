import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';
import Button from './Button';
import { Menu, X, User, LogOut, Sun, Moon, Shield, Home, GraduationCap, Info } from 'lucide-react';

const Navbar = () => {
    const { user, userData, logout } = useAuth();
    const { theme, toggleTheme } = useTheme();
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);

    const handleLogout = async () => {
        try {
            await logout();
            navigate('/login');
        } catch (error) {
            console.error("Failed to log out", error);
        }
    };

    return (
        <>
            <nav className="navbar glass-panel" style={{
                margin: '1rem',
                width: 'calc(100% - 2rem)',
                position: 'sticky',
                top: '1rem',
                zIndex: 100,
                backdropFilter: 'blur(20px)',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.18)'
            }}>
                <div className="container" style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '1rem 1.5rem'
                }}>
                    <Link to="/" style={{
                        textDecoration: 'none',
                        fontSize: '1.75rem',
                        fontWeight: '900',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        letterSpacing: '-0.02em'
                    }}>
                        <span className="title-gradient" style={{
                            background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 50%, #06b6d4 100%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text'
                        }}>ZXSchool</span>
                    </Link>

                    {/* Desktop Menu */}
                    <div style={{
                        display: 'flex',
                        gap: '0.5rem',
                        alignItems: 'center'
                    }} className="desktop-menu">
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <Link to="/" style={{
                                textDecoration: 'none',
                                color: 'var(--color-text)',
                                fontWeight: 600,
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                                transition: 'all 0.3s ease',
                                padding: '0.625rem 1.25rem',
                                borderRadius: 'var(--radius-lg)'
                            }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.color = 'var(--color-primary)';
                                    e.currentTarget.style.backgroundColor = 'rgba(59, 130, 246, 0.1)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.color = 'var(--color-text)';
                                    e.currentTarget.style.backgroundColor = 'transparent';
                                }}>
                                <Home size={18} />
                                Home
                            </Link>
                        </motion.div>

                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <Link to="/courses" style={{
                                textDecoration: 'none',
                                color: 'var(--color-text)',
                                fontWeight: 600,
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                                transition: 'all 0.3s ease',
                                padding: '0.625rem 1.25rem',
                                borderRadius: 'var(--radius-lg)'
                            }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.color = 'var(--color-primary)';
                                    e.currentTarget.style.backgroundColor = 'rgba(59, 130, 246, 0.1)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.color = 'var(--color-text)';
                                    e.currentTarget.style.backgroundColor = 'transparent';
                                }}>
                                <GraduationCap size={18} />
                                Courses
                            </Link>
                        </motion.div>

                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <Link to="/about" style={{
                                textDecoration: 'none',
                                color: 'var(--color-text)',
                                fontWeight: 600,
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                                transition: 'all 0.3s ease',
                                padding: '0.625rem 1.25rem',
                                borderRadius: 'var(--radius-lg)'
                            }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.color = 'var(--color-primary)';
                                    e.currentTarget.style.backgroundColor = 'rgba(59, 130, 246, 0.1)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.color = 'var(--color-text)';
                                    e.currentTarget.style.backgroundColor = 'transparent';
                                }}>
                                <Info size={18} />
                                About
                            </Link>
                        </motion.div>

                        <div style={{
                            width: '1px',
                            height: '24px',
                            backgroundColor: 'var(--color-border)',
                            margin: '0 0.5rem'
                        }} />

                        <motion.button
                            whileHover={{ scale: 1.1, rotate: 180 }}
                            whileTap={{ scale: 0.9 }}
                            transition={{ type: 'spring', stiffness: 300 }}
                            onClick={toggleTheme}
                            style={{
                                background: 'rgba(255, 255, 255, 0.05)',
                                border: '1px solid rgba(255, 255, 255, 0.1)',
                                cursor: 'pointer',
                                color: 'var(--color-text)',
                                padding: '0.625rem',
                                borderRadius: 'var(--radius-lg)',
                                display: 'flex',
                                alignItems: 'center',
                                transition: 'all 0.2s',
                                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)'
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.backgroundColor = 'rgba(59, 130, 246, 0.1)';
                                e.currentTarget.style.borderColor = 'var(--color-primary)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
                                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                            }}
                        >
                            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
                        </motion.button>

                        {user ? (
                            <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                                {userData?.role === 'admin' && (
                                    <Link to="/admin">
                                        <Button variant="secondary" style={{
                                            padding: '0.625rem 1.25rem',
                                            fontSize: '0.9375rem',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '0.5rem',
                                            fontWeight: '600'
                                        }}>
                                            <Shield size={16} />
                                            Admin
                                        </Button>
                                    </Link>
                                )}
                                <Link to="/dashboard">
                                    <Button variant="ghost" style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.5rem',
                                        fontWeight: '600'
                                    }}>
                                        <User size={18} />
                                        {userData?.name || 'Dashboard'}
                                    </Button>
                                </Link>
                            </div>
                        ) : (
                            <div style={{ display: 'flex', gap: '0.75rem' }}>
                                <Link to="/login">
                                    <Button variant="ghost" style={{ fontWeight: '600' }}>Login</Button>
                                </Link>
                                <Link to="/signup">
                                    <Button variant="primary" style={{
                                        fontWeight: '600',
                                        boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)'
                                    }}>Get Started</Button>
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Mobile Toggle */}
                    <div className="md:hidden" style={{ gap: '0.75rem', alignItems: 'center' }}>
                        <button onClick={toggleTheme} style={{
                            background: 'rgba(255, 255, 255, 0.05)',
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                            cursor: 'pointer',
                            color: 'var(--color-text)',
                            padding: '0.5rem',
                            borderRadius: 'var(--radius-md)'
                        }}>
                            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
                        </button>
                        <button onClick={() => setIsOpen(!isOpen)} style={{
                            background: 'rgba(255, 255, 255, 0.05)',
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                            cursor: 'pointer',
                            color: 'var(--color-text)',
                            padding: '0.5rem',
                            borderRadius: 'var(--radius-md)'
                        }}>
                            {isOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsOpen(false)}
                            style={{
                                position: 'fixed',
                                top: 0,
                                left: 0,
                                right: 0,
                                bottom: 0,
                                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                                backdropFilter: 'blur(4px)',
                                zIndex: 999
                            }}
                        />

                        {/* Slide-in Menu from Right */}
                        <motion.div
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                            className="glass-panel"
                            style={{
                                position: 'fixed',
                                top: 0,
                                right: 0,
                                bottom: 0,
                                width: '80%',
                                maxWidth: '320px',
                                padding: '2rem 1.5rem',
                                zIndex: 1000,
                                overflowY: 'auto',
                                boxShadow: '-8px 0 32px rgba(0, 0, 0, 0.2)',
                                backdropFilter: 'blur(20px)',
                                background: 'var(--color-bg)',
                                borderLeft: '1px solid rgba(255, 255, 255, 0.1)'
                            }}
                        >
                            {/* Close Button */}
                            <div style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                marginBottom: '2rem'
                            }}>
                                <span style={{
                                    fontSize: '1.5rem',
                                    fontWeight: '900',
                                    background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 50%, #06b6d4 100%)',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                    backgroundClip: 'text'
                                }}>
                                    Menu
                                </span>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    style={{
                                        background: 'rgba(255, 255, 255, 0.05)',
                                        border: '1px solid rgba(255, 255, 255, 0.1)',
                                        cursor: 'pointer',
                                        color: 'var(--color-text)',
                                        padding: '0.5rem',
                                        borderRadius: 'var(--radius-md)',
                                        display: 'flex',
                                        alignItems: 'center'
                                    }}
                                >
                                    <X size={24} />
                                </button>
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                <Link
                                    to="/"
                                    onClick={() => setIsOpen(false)}
                                    style={{
                                        textDecoration: 'none',
                                        color: 'var(--color-text)',
                                        padding: '1rem',
                                        borderRadius: 'var(--radius-lg)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.75rem',
                                        fontWeight: '600',
                                        fontSize: '1.0625rem',
                                        transition: 'all 0.2s',
                                        background: 'rgba(255, 255, 255, 0.03)'
                                    }}
                                >
                                    <Home size={20} />
                                    Home
                                </Link>
                                <Link
                                    to="/courses"
                                    onClick={() => setIsOpen(false)}
                                    style={{
                                        textDecoration: 'none',
                                        color: 'var(--color-text)',
                                        padding: '1rem',
                                        borderRadius: 'var(--radius-lg)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.75rem',
                                        fontWeight: '600',
                                        fontSize: '1.0625rem',
                                        transition: 'all 0.2s',
                                        background: 'rgba(255, 255, 255, 0.03)'
                                    }}
                                >
                                    <GraduationCap size={20} />
                                    Courses
                                </Link>
                                <Link
                                    to="/about"
                                    onClick={() => setIsOpen(false)}
                                    style={{
                                        textDecoration: 'none',
                                        color: 'var(--color-text)',
                                        padding: '1rem',
                                        borderRadius: 'var(--radius-lg)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.75rem',
                                        fontWeight: '600',
                                        fontSize: '1.0625rem',
                                        transition: 'all 0.2s',
                                        background: 'rgba(255, 255, 255, 0.03)'
                                    }}
                                >
                                    <Info size={20} />
                                    About
                                </Link>
                                {user ? (
                                    <>
                                        {userData?.role === 'admin' && (
                                            <Link
                                                to="/admin"
                                                onClick={() => setIsOpen(false)}
                                                style={{
                                                    textDecoration: 'none',
                                                    color: 'var(--color-primary)',
                                                    fontWeight: '700',
                                                    padding: '1rem',
                                                    borderRadius: 'var(--radius-lg)',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: '0.75rem',
                                                    fontSize: '1.0625rem',
                                                    background: 'rgba(59, 130, 246, 0.1)',
                                                    border: '1px solid rgba(59, 130, 246, 0.2)',
                                                    marginTop: '1rem'
                                                }}
                                            >
                                                <Shield size={20} />
                                                Admin Dashboard
                                            </Link>
                                        )}
                                        <Link
                                            to="/dashboard"
                                            onClick={() => setIsOpen(false)}
                                            style={{
                                                textDecoration: 'none',
                                                color: 'var(--color-text)',
                                                padding: '1rem',
                                                borderRadius: 'var(--radius-lg)',
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '0.75rem',
                                                fontWeight: '600',
                                                fontSize: '1.0625rem',
                                                transition: 'all 0.2s',
                                                background: 'rgba(255, 255, 255, 0.03)',
                                                marginTop: userData?.role === 'admin' ? '0' : '1rem'
                                            }}
                                        >
                                            <User size={20} />
                                            Dashboard
                                        </Link>
                                    </>
                                ) : (
                                    <>
                                        <Link to="/login" onClick={() => setIsOpen(false)} style={{ marginTop: '1rem' }}>
                                            <Button variant="ghost" style={{
                                                width: '100%',
                                                justifyContent: 'flex-start',
                                                padding: '1rem',
                                                fontSize: '1.0625rem',
                                                fontWeight: '600'
                                            }}>Login</Button>
                                        </Link>
                                        <Link to="/signup" onClick={() => setIsOpen(false)}>
                                            <Button variant="primary" style={{
                                                width: '100%',
                                                padding: '1rem',
                                                fontSize: '1.0625rem',
                                                fontWeight: '600',
                                                boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)'
                                            }}>Get Started</Button>
                                        </Link>
                                    </>
                                )}
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
};

export default Navbar;
