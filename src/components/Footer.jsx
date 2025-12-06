import { Link } from 'react-router-dom';
import { Instagram, Github, Linkedin } from 'lucide-react';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer style={{
            backgroundColor: 'var(--color-bg-secondary)',
            borderTop: '1px solid var(--color-border)',
            padding: '3rem 0 2rem',
            marginTop: 'auto'
        }}>
            <div className="container">
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                    gap: '2rem',
                    marginBottom: '2rem'
                }}>
                    {/* Brand Section */}
                    <div>
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.75rem',
                            marginBottom: '1rem'
                        }}>
                            <div style={{
                                width: '40px',
                                height: '40px',
                                backgroundColor: 'var(--color-primary)',
                                borderRadius: 'var(--radius-md)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '1.25rem',
                                fontWeight: '700',
                                color: 'white'
                            }}>
                                Zx
                            </div>
                            <span style={{
                                fontSize: '1.25rem',
                                fontWeight: '700',
                                color: 'var(--color-text)'
                            }}>
                                School
                            </span>
                        </div>
                        <p style={{
                            fontSize: '0.875rem',
                            color: 'var(--color-text-secondary)',
                            lineHeight: '1.6',
                            marginBottom: '1rem'
                        }}>
                            Empowering the next generation of developers with quality education.
                        </p>
                        {/* Social Links */}
                        <div style={{
                            display: 'flex',
                            gap: '0.75rem'
                        }}>
                            <a
                                href="https://www.instagram.com/zeeshan_sarfraz_"
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{
                                    width: '36px',
                                    height: '36px',
                                    borderRadius: '50%',
                                    backgroundColor: 'var(--color-bg)',
                                    border: '1px solid var(--color-border)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: 'var(--color-text-secondary)',
                                    transition: 'all 0.2s',
                                    textDecoration: 'none'
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.backgroundColor = 'var(--color-primary)';
                                    e.currentTarget.style.borderColor = 'var(--color-primary)';
                                    e.currentTarget.style.color = 'white';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.backgroundColor = 'var(--color-bg)';
                                    e.currentTarget.style.borderColor = 'var(--color-border)';
                                    e.currentTarget.style.color = 'var(--color-text-secondary)';
                                }}
                            >
                                <Instagram size={18} />
                            </a>
                            <a
                                href="https://github.com/xeeshan-zs"
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{
                                    width: '36px',
                                    height: '36px',
                                    borderRadius: '50%',
                                    backgroundColor: 'var(--color-bg)',
                                    border: '1px solid var(--color-border)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: 'var(--color-text-secondary)',
                                    transition: 'all 0.2s',
                                    textDecoration: 'none'
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.backgroundColor = 'var(--color-primary)';
                                    e.currentTarget.style.borderColor = 'var(--color-primary)';
                                    e.currentTarget.style.color = 'white';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.backgroundColor = 'var(--color-bg)';
                                    e.currentTarget.style.borderColor = 'var(--color-border)';
                                    e.currentTarget.style.color = 'var(--color-text-secondary)';
                                }}
                            >
                                <Github size={18} />
                            </a>
                            <a
                                href="https://www.linkedin.com/in/xeeshan-zs/"
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{
                                    width: '36px',
                                    height: '36px',
                                    borderRadius: '50%',
                                    backgroundColor: 'var(--color-bg)',
                                    border: '1px solid var(--color-border)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: 'var(--color-text-secondary)',
                                    transition: 'all 0.2s',
                                    textDecoration: 'none'
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.backgroundColor = 'var(--color-primary)';
                                    e.currentTarget.style.borderColor = 'var(--color-primary)';
                                    e.currentTarget.style.color = 'white';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.backgroundColor = 'var(--color-bg)';
                                    e.currentTarget.style.borderColor = 'var(--color-border)';
                                    e.currentTarget.style.color = 'var(--color-text-secondary)';
                                }}
                            >
                                <Linkedin size={18} />
                            </a>
                        </div>
                    </div>

                    {/* Courses Section */}
                    <div>
                        <h3 style={{
                            fontSize: '0.875rem',
                            fontWeight: '600',
                            color: 'var(--color-text)',
                            marginBottom: '1rem',
                            textTransform: 'uppercase',
                            letterSpacing: '0.5px'
                        }}>
                            Courses
                        </h3>
                        <ul style={{
                            listStyle: 'none',
                            padding: 0,
                            margin: 0,
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '0.5rem'
                        }}>
                            <li>
                                <Link
                                    to="/courses"
                                    style={{
                                        fontSize: '0.875rem',
                                        color: 'var(--color-text-secondary)',
                                        textDecoration: 'none',
                                        transition: 'color 0.2s'
                                    }}
                                    onMouseEnter={(e) => e.currentTarget.style.color = 'var(--color-primary)'}
                                    onMouseLeave={(e) => e.currentTarget.style.color = 'var(--color-text-secondary)'}
                                >
                                    C++ Programming
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/courses"
                                    style={{
                                        fontSize: '0.875rem',
                                        color: 'var(--color-text-secondary)',
                                        textDecoration: 'none',
                                        transition: 'color 0.2s'
                                    }}
                                    onMouseEnter={(e) => e.currentTarget.style.color = 'var(--color-primary)'}
                                    onMouseLeave={(e) => e.currentTarget.style.color = 'var(--color-text-secondary)'}
                                >
                                    Java Programming
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/courses"
                                    style={{
                                        fontSize: '0.875rem',
                                        color: 'var(--color-text-secondary)',
                                        textDecoration: 'none',
                                        transition: 'color 0.2s'
                                    }}
                                    onMouseEnter={(e) => e.currentTarget.style.color = 'var(--color-primary)'}
                                    onMouseLeave={(e) => e.currentTarget.style.color = 'var(--color-text-secondary)'}
                                >
                                    SQL & Databases
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Quick Links Section */}
                    <div>
                        <h3 style={{
                            fontSize: '0.875rem',
                            fontWeight: '600',
                            color: 'var(--color-text)',
                            marginBottom: '1rem',
                            textTransform: 'uppercase',
                            letterSpacing: '0.5px'
                        }}>
                            Quick Links
                        </h3>
                        <ul style={{
                            listStyle: 'none',
                            padding: 0,
                            margin: 0,
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '0.5rem'
                        }}>
                            <li>
                                <Link
                                    to="/about"
                                    style={{
                                        fontSize: '0.875rem',
                                        color: 'var(--color-text-secondary)',
                                        textDecoration: 'none',
                                        transition: 'color 0.2s'
                                    }}
                                    onMouseEnter={(e) => e.currentTarget.style.color = 'var(--color-primary)'}
                                    onMouseLeave={(e) => e.currentTarget.style.color = 'var(--color-text-secondary)'}
                                >
                                    About Us
                                </Link>
                            </li>

                            <li>
                                <Link
                                    to="/contact"
                                    style={{
                                        fontSize: '0.875rem',
                                        color: 'var(--color-text-secondary)',
                                        textDecoration: 'none',
                                        transition: 'color 0.2s'
                                    }}
                                    onMouseEnter={(e) => e.currentTarget.style.color = 'var(--color-primary)'}
                                    onMouseLeave={(e) => e.currentTarget.style.color = 'var(--color-text-secondary)'}
                                >
                                    Contact
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/privacy"
                                    style={{
                                        fontSize: '0.875rem',
                                        color: 'var(--color-text-secondary)',
                                        textDecoration: 'none',
                                        transition: 'color 0.2s'
                                    }}
                                    onMouseEnter={(e) => e.currentTarget.style.color = 'var(--color-primary)'}
                                    onMouseLeave={(e) => e.currentTarget.style.color = 'var(--color-text-secondary)'}
                                >
                                    Privacy Policy
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Copyright */}
                <div style={{
                    paddingTop: '2rem',
                    borderTop: '1px solid var(--color-border)',
                    textAlign: 'center'
                }}>
                    <p style={{
                        fontSize: '0.875rem',
                        color: 'var(--color-text-secondary)',
                        margin: 0
                    }}>
                        © {currentYear} ZxSchool. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
