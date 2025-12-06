import { motion } from 'framer-motion';
import Card from '../components/Card';

const PrivacyPolicy = () => {
    const sections = [
        {
            title: 'Information We Collect',
            content: [
                'When you register for our courses, we collect personal information such as your name, email address, phone number, and educational institution.',
                'We may also collect payment information when you enroll in paid courses.',
                'Usage data including your interactions with our platform, course progress, and learning activities.'
            ]
        },
        {
            title: 'How We Use Your Information',
            content: [
                'To provide and maintain our educational services',
                'To process your course enrollments and manage your account',
                'To communicate with you about courses, updates, and support',
                'To improve our platform and develop new features',
                'To ensure the security and integrity of our services'
            ]
        },
        {
            title: 'Data Security',
            content: [
                'We implement industry-standard security measures to protect your personal information.',
                'Your data is stored securely using Firebase and Supabase services with encryption.',
                'We regularly review and update our security practices to ensure your data remains protected.',
                'Access to personal information is restricted to authorized personnel only.'
            ]
        },
        {
            title: 'Information Sharing',
            content: [
                'We do not sell, trade, or rent your personal information to third parties.',
                'We may share information with service providers who assist in operating our platform (e.g., payment processors, hosting services).',
                'We may disclose information when required by law or to protect our rights and safety.'
            ]
        },
        {
            title: 'Your Rights',
            content: [
                'You have the right to access, update, or delete your personal information.',
                'You can request a copy of the data we hold about you.',
                'You may opt-out of marketing communications at any time.',
                'You can close your account by contacting us directly.'
            ]
        },
        {
            title: 'Cookies and Tracking',
            content: [
                'We use cookies and similar technologies to enhance your experience on our platform.',
                'These help us remember your preferences and analyze site usage.',
                'You can control cookie settings through your browser preferences.'
            ]
        },
        {
            title: 'Changes to This Policy',
            content: [
                'We may update this privacy policy from time to time.',
                'We will notify you of any significant changes via email or through our platform.',
                'Continued use of our services after changes constitutes acceptance of the updated policy.'
            ]
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
                    Privacy Policy
                </h1>
                <p style={{
                    fontSize: '1rem',
                    color: 'var(--color-text-secondary)',
                    maxWidth: '700px',
                    margin: '0 auto',
                    lineHeight: '1.8'
                }}>
                    Last updated: December 2025
                </p>
            </motion.div>

            {/* Introduction */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                style={{ marginBottom: '3rem' }}
            >
                <Card style={{ padding: '2rem' }}>
                    <p style={{
                        fontSize: '1.125rem',
                        color: 'var(--color-text-secondary)',
                        lineHeight: '1.8',
                        margin: 0
                    }}>
                        At <strong style={{ color: 'var(--color-primary)' }}>ZxSchool</strong>, we take your privacy seriously.
                        This Privacy Policy explains how we collect, use, and protect your personal information when you use our
                        educational platform. By using our services, you agree to the collection and use of information in
                        accordance with this policy.
                    </p>
                </Card>
            </motion.div>

            {/* Policy Sections */}
            <div style={{ display: 'grid', gap: '2rem' }}>
                {sections.map((section, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                        <Card style={{ padding: '2rem' }}>
                            <h2 style={{
                                fontSize: '1.5rem',
                                fontWeight: '600',
                                color: 'var(--color-text)',
                                marginBottom: '1rem'
                            }}>
                                {section.title}
                            </h2>
                            <ul style={{
                                listStyle: 'none',
                                padding: 0,
                                margin: 0,
                                display: 'grid',
                                gap: '0.75rem'
                            }}>
                                {section.content.map((item, itemIndex) => (
                                    <li
                                        key={itemIndex}
                                        style={{
                                            display: 'flex',
                                            alignItems: 'flex-start',
                                            gap: '0.75rem',
                                            fontSize: '0.9375rem',
                                            color: 'var(--color-text-secondary)',
                                            lineHeight: '1.6'
                                        }}
                                    >
                                        <span style={{
                                            color: 'var(--color-primary)',
                                            fontSize: '1.25rem',
                                            lineHeight: '1',
                                            marginTop: '0.125rem'
                                        }}>
                                            •
                                        </span>
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </Card>
                    </motion.div>
                ))}
            </div>

            {/* Contact Section */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                style={{ marginTop: '3rem' }}
            >
                <Card style={{
                    padding: '2rem',
                    backgroundColor: 'rgba(59, 130, 246, 0.05)',
                    border: '1px solid rgba(59, 130, 246, 0.2)'
                }}>
                    <h2 style={{
                        fontSize: '1.25rem',
                        fontWeight: '600',
                        color: 'var(--color-text)',
                        marginBottom: '0.75rem'
                    }}>
                        Questions About Privacy?
                    </h2>
                    <p style={{
                        fontSize: '0.9375rem',
                        color: 'var(--color-text-secondary)',
                        lineHeight: '1.6',
                        margin: 0
                    }}>
                        If you have any questions or concerns about our privacy policy or how we handle your data,
                        please don't hesitate to contact us at{' '}
                        <a
                            href="mailto:privacy@zxschool.com"
                            style={{
                                color: 'var(--color-primary)',
                                textDecoration: 'none',
                                fontWeight: '500'
                            }}
                        >
                            privacy@zxschool.com
                        </a>
                    </p>
                </Card>
            </motion.div>
        </div>
    );
};

export default PrivacyPolicy;
