import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { login, loginWithGoogle } from '../firebase/auth';
import Button from '../components/Button';
import Input from '../components/Input';
import Card from '../components/Card';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            await login(email, password);
            navigate('/dashboard'); // Will be redirected to onboarding if needed
        } catch (err) {
            setError('Failed to log in. Please check your credentials.');
            console.error(err);
        }
        setLoading(false);
    };

    const handleGoogleLogin = async () => {
        try {
            setLoading(true);
            await loginWithGoogle();
            navigate('/dashboard');
        } catch (err) {
            setError('Failed to log in with Google.');
            console.error(err);
        }
        setLoading(false);
    };

    return (
        <div className="container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
            <Card className="w-full max-w-md" style={{ width: '100%', maxWidth: '450px' }}>
                <h2 style={{ fontSize: '2rem', marginBottom: '1.5rem', textAlign: 'center' }} className="title-gradient">Welcome Back</h2>

                {error && <div style={{ color: 'red', marginBottom: '1rem', textAlign: 'center' }}>{error}</div>}

                <form onSubmit={handleSubmit}>
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

                    <Button type="submit" variant="primary" className="w-full" style={{ width: '100%', marginTop: '1rem' }} disabled={loading}>
                        {loading ? 'Logging in...' : 'Log In'}
                    </Button>
                </form>

                <div style={{ margin: '1.5rem 0', textAlign: 'center', color: '#666' }}>OR</div>

                <Button onClick={handleGoogleLogin} variant="outline" className="w-full" style={{ width: '100%' }} disabled={loading}>
                    Sign in with Google
                </Button>

                <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
                    Don't have an account? <Link to="/signup" className="text-blue-600 font-semibold">Sign Up</Link>
                </div>
            </Card>
        </div>
    );
};

export default Login;
