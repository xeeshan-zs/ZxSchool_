import { motion } from 'framer-motion';
import { useState } from 'react';
import Card from '../components/Card';
import Input from '../components/Input';
import Button from '../components/Button';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Here you would typically send the form data to a backend
        console.log('Contact form submitted:', formData);
        setSubmitted(true);
        setTimeout(() => {
            setSubmitted(false);
            setFormData({ name: '', email: '', subject: '', message: '' });
        }, 3000);
    };

    const contactInfo = [
        {
            icon: Mail,
            title: 'Email',
            value: 'info@zxschool.com',
            link: 'mailto:info@zxschool.com'
        },
        {
            icon: Phone,
            title: 'Phone',
            value: '+92 XXX XXXXXXX',
            link: 'tel:+92XXXXXXXXX'
        },
        {
            icon: MapPin,
            title: 'Location',
            value: 'Pakistan',
            link: null
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
                    Get in Touch
                </h1>
                <p style={{
                    fontSize: '1.25rem',
                    color: 'var(--color-text-secondary)',
                    maxWidth: '700px',
                    margin: '0 auto',
                    lineHeight: '1.8'
                }}>
                    Have questions about our courses? We'd love to hear from you.
                </p>
            </motion.div>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '2rem',
                marginBottom: '4rem'
            }}>
                {/* Contact Info Cards */}
                {contactInfo.map((info, index) => {
                    const Icon = info.icon;
                    return (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <Card className="card-hover" style={{
                                padding: '2rem',
                                textAlign: 'center',
                                height: '100%'
                            }}>
                                <div style={{
                                    width: '56px',
                                    height: '56px',
                                    borderRadius: '50%',
                                    backgroundColor: 'rgba(59, 130, 246, 0.1)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    margin: '0 auto 1rem'
                                }}>
                                    <Icon size={24} style={{ color: 'var(--color-primary)' }} />
                                </div>
                                <h3 style={{
                                    fontSize: '1rem',
                                    fontWeight: '600',
                                    color: 'var(--color-text)',
                                    marginBottom: '0.5rem'
                                }}>
                                    {info.title}
                                </h3>
                                {info.link ? (
                                    <a
                                        href={info.link}
                                        style={{
                                            fontSize: '0.9375rem',
                                            color: 'var(--color-primary)',
                                            textDecoration: 'none'
                                        }}
                                    >
                                        {info.value}
                                    </a>
                                ) : (
                                    <p style={{
                                        fontSize: '0.9375rem',
                                        color: 'var(--color-text-secondary)',
                                        margin: 0
                                    }}>
                                        {info.value}
                                    </p>
                                )}
                            </Card>
                        </motion.div>
                    );
                })}
            </div>

            {/* Contact Form */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
            >
                <Card style={{ maxWidth: '700px', margin: '0 auto', padding: '2.5rem' }}>
                    <h2 style={{
                        fontSize: '1.75rem',
                        fontWeight: '700',
                        color: 'var(--color-text)',
                        marginBottom: '1.5rem',
                        textAlign: 'center'
                    }}>
                        Send us a Message
                    </h2>

                    {submitted ? (
                        <div style={{
                            padding: '2rem',
                            backgroundColor: 'rgba(34, 197, 94, 0.1)',
                            border: '1px solid rgba(34, 197, 94, 0.3)',
                            borderRadius: 'var(--radius-md)',
                            textAlign: 'center'
                        }}>
                            <p style={{
                                fontSize: '1.125rem',
                                color: 'var(--color-success)',
                                margin: 0
                            }}>
                                ✓ Thank you! Your message has been sent successfully.
                            </p>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit}>
                            <div style={{ display: 'grid', gap: '1.5rem' }}>
                                <Input
                                    label="Name *"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    required
                                    placeholder="Your name"
                                />
                                <Input
                                    label="Email *"
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    required
                                    placeholder="your.email@example.com"
                                />
                                <Input
                                    label="Subject *"
                                    value={formData.subject}
                                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                    required
                                    placeholder="What is this about?"
                                />
                                <div>
                                    <label style={{
                                        display: 'block',
                                        fontSize: '0.875rem',
                                        fontWeight: '500',
                                        color: 'var(--color-text)',
                                        marginBottom: '0.5rem'
                                    }}>
                                        Message *
                                    </label>
                                    <textarea
                                        value={formData.message}
                                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                        required
                                        rows={6}
                                        placeholder="Tell us more..."
                                        style={{
                                            width: '100%',
                                            padding: '0.75rem',
                                            fontSize: '0.9375rem',
                                            color: 'var(--color-text)',
                                            backgroundColor: 'var(--color-bg)',
                                            border: '1px solid var(--color-border)',
                                            borderRadius: 'var(--radius-md)',
                                            resize: 'vertical',
                                            fontFamily: 'inherit'
                                        }}
                                    />
                                </div>
                                <Button
                                    type="submit"
                                    variant="primary"
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        gap: '0.5rem',
                                        width: '100%'
                                    }}
                                >
                                    <Send size={18} />
                                    Send Message
                                </Button>
                            </div>
                        </form>
                    )}
                </Card>
            </motion.div>
        </div>
    );
};

export default Contact;
