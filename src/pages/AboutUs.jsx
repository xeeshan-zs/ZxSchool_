import { motion } from 'framer-motion';
import Card from '../components/Card';
import { GraduationCap, Target, Users, Award } from 'lucide-react';

const AboutUs = () => {
    const values = [
        {
            icon: GraduationCap,
            title: 'Quality Education',
            description: 'We provide comprehensive, well-structured courses that bridge the gap between theory and practice.'
        },
        {
            icon: Target,
            title: 'Practical Focus',
            description: 'Our curriculum emphasizes hands-on learning and real-world application of programming concepts.'
        },
        {
            icon: Users,
            title: 'Student-Centered',
            description: 'We understand that every student learns differently and provide personalized support.'
        },
        {
            icon: Award,
            title: 'Industry Standards',
            description: 'Learn the skills and best practices that are actually used in professional software development.'
        }
    ];

    return (
        <div className="container" style={{ padding: '4rem 1rem' }}>
            {/* Hero Section */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                style={{ textAlign: 'center', marginBottom: '4rem' }}
            >
                <h1 style={{
                    fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
                    fontWeight: '700',
                    color: 'var(--color-text)',
                    marginBottom: '1.5rem'
                }}>
                    About ZxSchool
                </h1>
                <p style={{
                    fontSize: '1.25rem',
                    color: 'var(--color-text-secondary)',
                    maxWidth: '800px',
                    margin: '0 auto',
                    lineHeight: '1.8'
                }}>
                    Empowering the next generation of developers with quality education
                </p>
            </motion.div>

            {/* Mission Section */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                style={{ marginBottom: '4rem' }}
            >
                <Card style={{ padding: '3rem 2rem' }}>
                    <h2 style={{
                        fontSize: 'clamp(1.75rem, 3vw, 2.25rem)',
                        fontWeight: '700',
                        color: 'var(--color-text)',
                        marginBottom: '1.5rem',
                        textAlign: 'center'
                    }}>
                        Our Mission
                    </h2>
                    <div style={{
                        fontSize: '1.125rem',
                        color: 'var(--color-text-secondary)',
                        lineHeight: '1.8',
                        maxWidth: '900px',
                        margin: '0 auto'
                    }}>
                        <p style={{ marginBottom: '1.5rem' }}>
                            At <strong style={{ color: 'var(--color-primary)' }}>ZxSchool</strong>, we believe that programming education should be accessible, practical, and transformative. We're dedicated to helping students become better programmers by filling the gaps left by traditional university and college education.
                        </p>
                        <p style={{ marginBottom: '1.5rem' }}>
                            Many students struggle with programming concepts that weren't adequately covered in their formal education. We understand these challenges because we've been there. That's why we've created courses that focus on:
                        </p>
                        <ul style={{
                            listStyle: 'none',
                            padding: 0,
                            display: 'grid',
                            gap: '1rem'
                        }}>
                            <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                                <span style={{
                                    color: 'var(--color-primary)',
                                    fontSize: '1.5rem',
                                    lineHeight: '1'
                                }}>•</span>
                                <span><strong>Clarifying fundamental concepts</strong> that are often glossed over in academic settings</span>
                            </li>
                            <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                                <span style={{
                                    color: 'var(--color-primary)',
                                    fontSize: '1.5rem',
                                    lineHeight: '1'
                                }}>•</span>
                                <span><strong>Building practical skills</strong> through hands-on projects and real-world examples</span>
                            </li>
                            <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                                <span style={{
                                    color: 'var(--color-primary)',
                                    fontSize: '1.5rem',
                                    lineHeight: '1'
                                }}>•</span>
                                <span><strong>Improving problem-solving abilities</strong> and coding best practices</span>
                            </li>
                            <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                                <span style={{
                                    color: 'var(--color-primary)',
                                    fontSize: '1.5rem',
                                    lineHeight: '1'
                                }}>•</span>
                                <span><strong>Preparing for industry demands</strong> with relevant, up-to-date curriculum</span>
                            </li>
                        </ul>
                        <p style={{ marginTop: '1.5rem' }}>
                            Whether you're looking to strengthen your foundation, catch up on missed concepts, or advance your skill set to professional levels, ZxSchool is here to guide you every step of the way.
                        </p>
                    </div>
                </Card>
            </motion.div>

            {/* Values Section */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
            >
                <h2 style={{
                    fontSize: 'clamp(1.75rem, 3vw, 2.25rem)',
                    fontWeight: '700',
                    color: 'var(--color-text)',
                    marginBottom: '2rem',
                    textAlign: 'center'
                }}>
                    What We Stand For
                </h2>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                    gap: '2rem'
                }}>
                    {values.map((value, index) => {
                        const Icon = value.icon;
                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                            >
                                <Card className="card-hover" style={{
                                    height: '100%',
                                    padding: '2rem',
                                    textAlign: 'center'
                                }}>
                                    <div style={{
                                        width: '64px',
                                        height: '64px',
                                        borderRadius: 'var(--radius-md)',
                                        backgroundColor: 'rgba(59, 130, 246, 0.1)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        margin: '0 auto 1.5rem'
                                    }}>
                                        <Icon size={32} style={{ color: 'var(--color-primary)' }} />
                                    </div>
                                    <h3 style={{
                                        fontSize: '1.25rem',
                                        fontWeight: '600',
                                        color: 'var(--color-text)',
                                        marginBottom: '0.75rem'
                                    }}>
                                        {value.title}
                                    </h3>
                                    <p style={{
                                        fontSize: '0.9375rem',
                                        color: 'var(--color-text-secondary)',
                                        lineHeight: '1.6'
                                    }}>
                                        {value.description}
                                    </p>
                                </Card>
                            </motion.div>
                        );
                    })}
                </div>
            </motion.div>
        </div>
    );
};

export default AboutUs;
