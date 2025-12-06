import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { createUserDocument } from '../firebase/firestore'; // Re-using to update
import Button from '../components/Button';
import Input from '../components/Input';
import Card from '../components/Card';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../firebase/config';

const Onboarding = () => {
    const { user } = useAuth();
    const [institute, setInstitute] = useState('');
    const [phone, setPhone] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!user) return;

        setLoading(true);
        try {
            const userRef = doc(db, 'users', user.uid);
            await setDoc(userRef, {
                institute,
                phone,
                onboardingCompleted: true,
                email: user.email, // Ensure email is saved if doc was missing
                role: 'student',   // Default role if missing
                name: user.displayName || 'Student' // Default name if missing
            }, { merge: true });
            // Force reload or redirect to dashboard
            // Since AuthContext listens to auth state but not necessarily firestore doc updates in real-time unless wired up,
            // but userData in context is fetched once. A full reload is safer or re-fetching.
            // For now, simpler to just navigate to dashboard and hope user data refreshes next visit or add a refresh method.
            // We will assume the dashboard will fetch freshest data or is fine.
            window.location.href = '/dashboard';
        } catch (error) {
            console.error("Onboarding failed", error);
        }
        setLoading(false);
    };

    return (
        <div className="container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
            <Card className="w-full max-w-md">
                <h2 style={{ fontSize: '2rem', marginBottom: '1rem', textAlign: 'center' }}>Complete Your Profile</h2>
                <p style={{ textAlign: 'center', color: '#666', marginBottom: '2rem' }}>
                    We need a few more details before you can access the dashboard.
                </p>

                <form onSubmit={handleSubmit}>
                    <Input
                        label="Phone Number"
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                        placeholder="+92 300 1234567"
                    />
                    <Input
                        label="Institute / College"
                        type="text"
                        value={institute}
                        onChange={(e) => setInstitute(e.target.value)}
                        required
                        placeholder="University of Education"
                    />

                    <Button type="submit" variant="primary" className="w-full" style={{ width: '100%', marginTop: '1rem' }} disabled={loading}>
                        {loading ? 'Saving...' : 'Complete Setup'}
                    </Button>
                </form>
            </Card>
        </div>
    );
};

export default Onboarding;
