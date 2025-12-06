import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children, requiredRole = null }) => {
    const { user, userData, loading } = useAuth();
    const location = useLocation();

    if (loading) {
        return <div className="container" style={{ textAlign: 'center', marginTop: '50px' }}>Loading...</div>;
    }

    if (!user) {
        return <Navigate to="/login" />;
    }

    // Force onboarding if not completed and not currently on the onboarding page
    if (userData && !userData.onboardingCompleted && location.pathname !== '/onboarding') {
        return <Navigate to="/onboarding" />;
    }

    if (requiredRole && userData?.role !== requiredRole) {
        return <div className="container" style={{ textAlign: 'center', marginTop: '50px' }}>Access Denied: Requires {requiredRole} role.</div>;
    }

    return children;
};

export default ProtectedRoute;
