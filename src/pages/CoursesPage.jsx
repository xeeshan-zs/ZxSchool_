import { useState, useEffect } from 'react';
import { db } from '../firebase/config';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { Link } from 'react-router-dom';
import Card from '../components/Card';
import Button from '../components/Button';
import { BookOpen, ArrowRight, GraduationCap } from 'lucide-react';

const CoursesPage = () => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const q = query(collection(db, "courses"), where("active", "==", true));
                const snapshot = await getDocs(q);
                setCourses(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
            } catch (error) {
                console.error("Error fetching courses:", error);
            }
            setLoading(false);
        };

        fetchCourses();
    }, []);

    if (loading) {
        return (
            <div className="container" style={{ padding: '4rem 1rem', textAlign: 'center' }}>
                <div className="skeleton" style={{
                    width: '100px',
                    height: '100px',
                    borderRadius: '50%',
                    margin: '0 auto'
                }} />
                <p style={{ marginTop: '1rem', color: 'var(--color-text-secondary)' }}>
                    Loading courses...
                </p>
            </div>
        );
    }

    return (
        <div className="container" style={{ padding: '3rem 1rem' }}>
            {/* Header Section */}
            <div style={{
                textAlign: 'center',
                marginBottom: '3rem',
                maxWidth: '700px',
                margin: '0 auto 3rem'
            }}>
                <div style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '1rem',
                    backgroundColor: 'var(--color-bg-secondary)',
                    borderRadius: 'var(--radius-lg)',
                    marginBottom: '1.5rem'
                }}>
                    <GraduationCap size={40} style={{ color: 'var(--color-primary)' }} />
                </div>

                <h1 className="title-gradient" style={{
                    fontSize: 'clamp(2rem, 5vw, 2.75rem)',
                    marginBottom: '1rem',
                    fontWeight: '800',
                    lineHeight: '1.2'
                }}>
                    Available Courses
                </h1>
                <p style={{
                    fontSize: 'clamp(1rem, 2vw, 1.125rem)',
                    color: 'var(--color-text-secondary)',
                    lineHeight: '1.6'
                }}>
                    Start your journey with our premium courses designed by industry experts
                </p>
            </div>

            {/* Courses Grid */}
            {courses.length === 0 ? (
                <Card style={{ textAlign: 'center', padding: '4rem 2rem' }}>
                    <BookOpen size={64} style={{
                        color: 'var(--color-text-secondary)',
                        margin: '0 auto 1.5rem'
                    }} />
                    <h3 style={{
                        fontSize: '1.5rem',
                        fontWeight: '600',
                        color: 'var(--color-text)',
                        marginBottom: '0.5rem'
                    }}>
                        No Courses Available
                    </h3>
                    <p style={{
                        color: 'var(--color-text-secondary)',
                        fontSize: '1rem'
                    }}>
                        Check back soon for exciting new courses!
                    </p>
                </Card>
            ) : (
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
                    gap: '2rem'
                }}>
                    {courses.map((course, index) => (
                        <Card
                            key={course.id}
                            delay={index * 0.1}
                            className="card-hover"
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                height: '100%',
                                overflow: 'hidden'
                            }}
                        >
                            {/* Course Image */}
                            {course.image ? (
                                <div style={{
                                    width: 'calc(100% + 3.5rem)',
                                    height: '200px',
                                    margin: '-1.75rem -1.75rem 1.5rem',
                                    overflow: 'hidden',
                                    position: 'relative'
                                }}>
                                    <img
                                        src={course.image}
                                        alt={course.title}
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                            objectFit: 'cover'
                                        }}
                                    />
                                    <div style={{
                                        position: 'absolute',
                                        top: '1rem',
                                        right: '1rem',
                                        padding: '0.5rem 1rem',
                                        backgroundColor: 'rgba(0, 0, 0, 0.7)',
                                        backdropFilter: 'blur(10px)',
                                        borderRadius: 'var(--radius-md)',
                                        color: 'white',
                                        fontSize: '0.875rem',
                                        fontWeight: '600'
                                    }}>
                                        {course.fee} PKR
                                    </div>
                                </div>
                            ) : (
                                <div style={{
                                    width: 'calc(100% + 3.5rem)',
                                    height: '200px',
                                    margin: '-1.75rem -1.75rem 1.5rem',
                                    background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-dark) 100%)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}>
                                    <BookOpen size={64} style={{ color: 'rgba(255, 255, 255, 0.5)' }} />
                                </div>
                            )}

                            {/* Course Content */}
                            <div style={{
                                flex: 1,
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '1rem'
                            }}>
                                <div>
                                    <h3 style={{
                                        fontSize: '1.375rem',
                                        fontWeight: '600',
                                        color: 'var(--color-text)',
                                        marginBottom: '0.75rem',
                                        lineHeight: '1.3'
                                    }}>
                                        {course.title}
                                    </h3>
                                    <p style={{
                                        color: 'var(--color-text-secondary)',
                                        fontSize: '0.9375rem',
                                        lineHeight: '1.6'
                                    }}>
                                        {course.description?.length > 120
                                            ? `${course.description.substring(0, 120)}...`
                                            : course.description || 'Comprehensive course designed to help you master new skills.'}
                                    </p>
                                </div>

                                {/* Course Footer */}
                                <div style={{
                                    marginTop: 'auto',
                                    paddingTop: '1rem',
                                    borderTop: '1px solid var(--color-border)'
                                }}>
                                    {!course.image && (
                                        <div style={{
                                            marginBottom: '1rem',
                                            color: 'var(--color-primary)',
                                            fontSize: '1.25rem',
                                            fontWeight: '600'
                                        }}>
                                            {course.fee} PKR
                                        </div>
                                    )}

                                    <Link to={`/courses/${course.id}`} style={{ textDecoration: 'none' }}>
                                        <Button
                                            variant="primary"
                                            style={{
                                                width: '100%',
                                                justifyContent: 'center',
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '0.5rem'
                                            }}
                                        >
                                            View Details
                                            <ArrowRight size={18} />
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
};

export default CoursesPage;
