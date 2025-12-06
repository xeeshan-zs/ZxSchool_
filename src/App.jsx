import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';

// Pages
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Onboarding from './pages/Onboarding';
import Dashboard from './pages/Dashboard';
import CoursesPage from './pages/CoursesPage';
import CourseDetails from './pages/CourseDetails';
import AboutUs from './pages/AboutUs';
import Contact from './pages/Contact';
import PrivacyPolicy from './pages/PrivacyPolicy';

// Admin Pages
import AdminHome from './pages/AdminDashboard/AdminHome';
import ManageCourses from './pages/AdminDashboard/ManageCourses';
import ManagePromos from './pages/AdminDashboard/ManagePromos';
import ManageApplications from './pages/AdminDashboard/ManageApplications';
import ManageUsers from './pages/AdminDashboard/ManageUsers';
import ManageReviews from './pages/AdminDashboard/ManageReviews';
import ManageStats from './pages/AdminDashboard/ManageStats';
import ManageInstructors from './pages/AdminDashboard/ManageInstructors';

function App() {
  return (
    <Router>
      <AuthProvider>
        <ThemeProvider>
          <div className="app-container" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Navbar />
            <div style={{ flex: 1 }}>
              <Routes>
                {/* Public Routes */}
                <Route path="/" element={<LandingPage />} />
                <Route path="/courses" element={<CoursesPage />} />
                <Route path="/courses/:id" element={<CourseDetails />} />
                <Route path="/about" element={<AboutUs />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/privacy" element={<PrivacyPolicy />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />

                {/* Protected Student Routes */}
                <Route
                  path="/onboarding"
                  element={
                    <ProtectedRoute>
                      <Onboarding />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/dashboard"
                  element={
                    <ProtectedRoute>
                      <Dashboard />
                    </ProtectedRoute>
                  }
                />

                {/* Protected Admin Routes */}
                <Route path="/admin" element={<ProtectedRoute requiredRole="admin"><AdminHome /></ProtectedRoute>} />
                <Route path="/admin/courses" element={<ProtectedRoute requiredRole="admin"><ManageCourses /></ProtectedRoute>} />
                <Route path="/admin/promos" element={<ProtectedRoute requiredRole="admin"><ManagePromos /></ProtectedRoute>} />
                <Route path="/admin/applications" element={<ProtectedRoute requiredRole="admin"><ManageApplications /></ProtectedRoute>} />
                <Route path="/admin/users" element={<ProtectedRoute requiredRole="admin"><ManageUsers /></ProtectedRoute>} />
                <Route path="/admin/reviews" element={<ProtectedRoute requiredRole="admin"><ManageReviews /></ProtectedRoute>} />
                <Route path="/admin/stats" element={<ProtectedRoute requiredRole="admin"><ManageStats /></ProtectedRoute>} />
                <Route path="/admin/instructors" element={<ProtectedRoute requiredRole="admin"><ManageInstructors /></ProtectedRoute>} />
              </Routes>
            </div>
            <Footer />
          </div>
        </ThemeProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
