import React, { useState } from "react";
import { BrowserRouter as Router, Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import HomePage from "./pages/HomePage";
import Login from "./components/Login";
import AdminDashboard from "./pages/AdminDashboard";
import UserDashboard from "./pages/UserDashboard";
import EventPage from "./pages/EventPage";
import NavBar from "./components/NavBar";
import ForumFeed from "./components/Forum";
import PointsManagement from "./components/Points";
import { login } from "./services/api";
import Logout from "./components/Logout";
import ChatBot from "./components/Chatbot";

const LoadingSpinner = () => {
    return (
        <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
        </div>
    );
};

const ProtectedRoute = ({ children, isLoggedIn }) => {
    if (!isLoggedIn) {
        return <Navigate to="/" replace />;
    }
    return children;
};

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [showLogin, setShowLogin] = useState(false);
    const [showLogout, setShowLogout] = useState(false);
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const maxPoints = 2000;
    const navigate = useNavigate();

    const handleLogout = () => {
        setIsLoading(true);
        // Simulate logout process
        setTimeout(() => {
            localStorage.removeItem('user');
            setUser(null);
            setIsLoggedIn(false);
            setShowLogout(false);
            setIsLoading(false);
            navigate('/');
            toast.success('Logged out successfully!');
        }, 1000);
    };

    const handleLogin = async (email, password, isSignUp) => {
        setIsLoading(true);
        try {
            if (isSignUp) {
                console.log('Sign-up functionality not implemented yet');
                toast.warning('Sign-up functionality is not available yet.');
                setIsLoading(false);
                return;
            }

            const response = await login(email, password);
            console.log('Login response:', response);

            if (response && response.message === "Login successful" && response.user) {
                localStorage.setItem('user', JSON.stringify(response.user));
                setUser(response.user);

                toast.success('Login successful!');
                // Show loading spinner for 1 second
                setTimeout(() => {
                    setIsLoggedIn(true);
                    setShowLogin(false);
                    setIsLoading(false);
                    if (response.user.role === 'admin') {
                        navigate('/admin');
                    } else {
                        navigate('/user-dashboard');
                    }
                }, 2000);
            } else {
                throw new Error('Invalid login response');
            }
        } catch (error) {
            console.error('Login error:', error);
            setIsLoading(false);
            toast.error('Login failed. Please check your credentials!', {
                autoClose: 3000
            });
        }
    };

    return (
        <div>
            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
            <NavBar
                isLoggedIn={isLoggedIn}
                points={user?.points || 0}
                maxPoints={maxPoints}
                onLogin={() => setShowLogin(true)}
                user={user || {
                    fullName: "Guest User",
                    location: {
                        address: "",
                        city: "",
                        state: "",
                        zipCode: ""
                    },
                    role: "Guest",
                    email: "",
                    username: "Guest",
                    gained_points: 0,
                    gifted_points: 0,
                    available_points: 0
                }}
            />
            {isLoading && <LoadingSpinner />}
            <Routes>
                <Route path="/" element={isLoggedIn ? (user?.role === 'admin' ? <Navigate to="/admin" /> :
                    <Navigate to="/user-dashboard" />) : <HomePage />} />
                <Route path="/forum" element={
                    <ProtectedRoute isLoggedIn={isLoggedIn}>
                        <ForumFeed />
                    </ProtectedRoute>
                } />
                <Route path="/events" element={
                    <ProtectedRoute isLoggedIn={isLoggedIn}>
                        <EventPage />
                    </ProtectedRoute>
                } />
                <Route path="/points" element={
                    <ProtectedRoute isLoggedIn={isLoggedIn}>
                        <PointsManagement />
                    </ProtectedRoute>
                } />
                <Route path="/admin" element={
                    <ProtectedRoute isLoggedIn={isLoggedIn}>
                        <AdminDashboard />
                    </ProtectedRoute>
                } />
                <Route path="/user-dashboard" element={
                    <ProtectedRoute isLoggedIn={isLoggedIn}>
                        <UserDashboard />
                    </ProtectedRoute>
                } />
            </Routes>
            {showLogin && (
                <Login
                    onClose={() => setShowLogin(false)}
                    onLogin={handleLogin}
                    isLoading={isLoading}
                />
            )}
            {showLogout && (
                <Logout
                    onClose={() => setShowLogout(false)}
                    onLogout={handleLogout}
                />
            )}
            <ChatBot /> {/* New ChatBot component added here */}
        </div>
    );
}

function AppWrapper() {
    return (
        <Router>
            <App />
        </Router>
    );
}

export default AppWrapper;