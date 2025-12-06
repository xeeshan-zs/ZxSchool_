
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { db } from '../firebase/config';
import { doc, getDoc, getDocs, collection, query, where } from 'firebase/firestore';
import { uploadReceipt } from '../firebase/storage';
import { createApplication as firestoreCreateApplication } from '../firebase/firestore';
import Button from '../components/Button';
import Card from '../components/Card';
import Input from '../components/Input';
import PaymentQR from '../assets/payment.png';

const CourseDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth();
    const [course, setCourse] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [promoCode, setPromoCode] = useState('');
    const [discountedPrice, setDiscountedPrice] = useState(null);
    const [receiptFile, setReceiptFile] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [promoError, setPromoError] = useState('');

    useEffect(() => {
        const fetchCourse = async () => {
            const docRef = doc(db, "courses", id);
            const snap = await getDoc(docRef);
            if (snap.exists()) setCourse({ id: snap.id, ...snap.data() });
        };
        fetchCourse();
    }, [id]);

    const handleApplyPromo = async () => {
        if (!promoCode) return;
        setPromoError('');

        const q = query(collection(db, "promos"), where("code", "==", promoCode), where("active", "==", true));
        const snap = await getDocs(q);

        if (!snap.empty) {
            const promo = snap.docs[0].data();
            const discount = (course.fee * promo.discountPercent) / 100;
            setDiscountedPrice(course.fee - discount);
        } else {
            setPromoError("Invalid or expired promo code");
            setDiscountedPrice(null);
        }
    };

    const handleRegister = async () => {
        if (!user) {
            navigate('/login');
            return;
        }
        if (!receiptFile) {
            alert("Please upload a payment receipt.");
            return;
        }

        setIsSubmitting(true);
        try {
            const appId = `app_${Date.now()}_${user.uid}`;
            const receiptUrl = await uploadReceipt(receiptFile, appId);

            await firestoreCreateApplication({
                userId: user.uid,
                courseId: course.id,
                originalPrice: course.fee,
                discountedPrice: discountedPrice || course.fee,
                paidAmount: 0,
                receiptUrl,
                promoCode: promoCode || null,
                isVerified: false,
                aiMessage: ''
            });

            alert("Application submitted successfully! Wait for verification.");
            setShowModal(false);
            navigate('/dashboard');
        } catch (error) {
            console.error("Registration failed", error);
            alert("Failed to submit application.");
        }
        setIsSubmitting(false);
    };

    if (!course) return <div className="container" style={{ padding: '50px' }}>Loading...</div>;

    return (
        <div className="container" style={{ padding: '2rem 0' }}>
            <Card>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                    <div>
                        <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>{course.title}</h1>
                        <p style={{ fontSize: '1.2rem', color: '#666', lineHeight: 1.6, marginBottom: '2rem' }}>
                            {course.description}
                        </p>
                        <div style={{ fontSize: '2rem', fontWeight: 600, color: '#2563eb', marginBottom: '2rem' }}>
                            {course.fee} PKR
                        </div>
                        <Button variant="primary" className="px-8 py-3 text-lg" onClick={() => setShowModal(true)}>
                            Register Now
                        </Button>
                    </div>
                    {course.image && (
                        <img src={course.image} alt={course.title} style={{ width: '100%', borderRadius: '1rem' }} />
                    )}
                </div>
            </Card>

            {/* Registration Modal */}
            {showModal && (
                <div style={{
                    position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
                    background: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center',
                    backdropFilter: 'blur(5px)', zIndex: 100
                }}>
                    <Card style={{ width: '100%', maxWidth: '500px', background: 'white' }}>
                        <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Register for {course.title}</h2>

                        <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
                            <img src={PaymentQR} alt="Payment QR" style={{ marginBottom: '0.5rem', maxWidth: '200px' }} />
                            <p style={{ fontSize: '0.9rem', color: '#666' }}>Scan to pay {discountedPrice || course.fee} PKR</p>
                        </div>

                        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-end', marginBottom: '1rem' }}>
                            <div style={{ flex: 1 }}>
                                <Input
                                    label="Promo Code"
                                    value={promoCode}
                                    onChange={e => setPromoCode(e.target.value)}
                                    placeholder="Enter code"
                                />
                            </div>
                            <Button type="button" onClick={handleApplyPromo} variant="outline" style={{ marginBottom: '1rem' }}>Apply</Button>
                        </div>
                        {promoError && <p style={{ color: 'red', marginTop: '-0.5rem', marginBottom: '1rem' }}>{promoError}</p>}
                        {discountedPrice && <p style={{ color: 'green', fontWeight: 'bold', marginBottom: '1rem' }}>Discount Applied! New Price: {discountedPrice} PKR</p>}

                        <div style={{ marginBottom: '1.5rem' }}>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Upload Payment Receipt</label>
                            <input type="file" accept="image/*" onChange={e => setReceiptFile(e.target.files[0])} style={{ width: '100%' }} />
                        </div>

                        <div style={{ display: 'flex', gap: '1rem' }}>
                            <Button onClick={handleRegister} variant="primary" className="w-full" style={{ flex: 1 }} disabled={isSubmitting}>
                                {isSubmitting ? 'Uploading...' : 'Submit Application'}
                            </Button>
                            <Button onClick={() => setShowModal(false)} variant="ghost" className="w-full" style={{ flex: 1 }}>
                                Cancel
                            </Button>
                        </div>
                    </Card>
                </div>
            )}
        </div>
    );
};

export default CourseDetails;
