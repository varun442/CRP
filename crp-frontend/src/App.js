import React, {useState} from 'react';
import {BrowserRouter as Router, Navigate, Route, Routes} from 'react-router-dom';
import HomePage from './pages/HomePage';
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';
import UserDashboard from './pages/UserDashboard';
import EventPage from './pages/EventPage';
import NavBar from "./components/NavBar";
import ForumFeed from "./components/Forum";

const ProtectedRoute = ({children, allowedRoles}) => {
    const userRole = localStorage.getItem('user');
    const isAuthenticated = !!localStorage.getItem('token');

//   if (!isAuthenticated) {
//     return <Navigate to="/login" />;
//   }

    if (allowedRoles && !allowedRoles.includes(userRole)) {
        return <Navigate to="/"/>;
    }

    return children;
};

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(true);
    const [points, setPoints] = useState(0);  // You might want to load this from somewhere
    const maxPoints = 1000;  // This could be dynamic

    return (
        <Router>
            <NavBar isLoggedIn={isLoggedIn} points={points} maxPoints={maxPoints}/>
            <Routes>
                <Route path="/" element={<HomePage/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/forum" element={<ForumFeed />}/>
                <Route path="/events" element={<EventPage/>}/>
                <Route
                    path="/admin-dashboard"
                    element={
                        <ProtectedRoute allowedRoles={['admin']}>
                            <AdminDashboard/>
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/user-dashboard"
                    element={
                        //       <ProtectedRoute allowedRoles={['user']}>
                        <UserDashboard/>
                        //    </ProtectedRoute>
                    }
                />
            </Routes>
        </Router>
    );
}

export default App;