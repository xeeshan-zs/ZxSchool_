import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { signup, loginWithGoogle } from '../firebase/auth';
import { createUserDocument } from '../firebase/firestore';
import { incrementStudentCount } from '../services/statsService';
import Button from '../components/Button';
import Input from '../components/Input';
import Card from '../components/Card';

const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [name, setName] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            return setError('Passwords do not match');
        }

        setError('');
        setLoading(true);

        try {
            const { user } = await signup(email, password);
            // Create initial user doc
            await createUserDocument(user, { name });
            // Increment student count
            await incrementStudentCount();
            navigate('/onboarding');
        } catch (err) {
            setError('Failed to create an account. ' + err.message);
            console.error(err);
        }
        setLoading(false);
    };

    const handleGoogleLogin = async () => {
        try {
            setLoading(true);
            const { user } = await loginWithGoogle();
            await createUserDocument(user, { name: user.displayName });
            // Increment student count
            await incrementStudentCount();
            navigate('/onboarding');
        } catch (err) {
            setError('Failed to sign up with Google.');
            console.error(err);
        }
        setLoading(false);
    };

    return (
        <div className="container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
            <Card className="w-full max-w-md" style={{ width: '100%', maxWidth: '450px' }}>
                <h2 style={{ fontSize: '2rem', marginBottom: '1.5rem', textAlign: 'center' }} className="title-gradient">Create Account</h2>

                {error && <div style={{ color: 'red', marginBottom: '1rem', textAlign: 'center' }}>{error}</div>}

                <form onSubmit={handleSubmit}>
                    <Input
                        label="Full Name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                    <Input
                        label="Email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <Input
                        label="Password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <Input
                        label="Confirm Password"
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />

                    <Button type="submit" variant="primary" className="w-full" style={{ width: '100%', marginTop: '1rem' }} disabled={loading}>
                        {loading ? 'Creating Account...' : 'Sign Up'}
                    </Button>
                </form>

                <div style={{ margin: '1.5rem 0', textAlign: 'center', color: '#666' }}>OR</div>

                <Button onClick={handleGoogleLogin} variant="outline" className="w-full" style={{ width: '100%' }} disabled={loading}>
                    Sign up with Google
                </Button>

                <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
                    Already have an account? <Link to="/login" className="text-blue-600 font-semibold">Log In</Link>
                </div>
            </Card>
        </div>
    );
};

export default Signup;
