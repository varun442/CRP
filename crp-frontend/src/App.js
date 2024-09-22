import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';
import UserDashboard from './pages/UserDashboard';
import EventPage from './pages/EventPage';

// const ProtectedRoute = ({ children, allowedRoles }) => {
//   const userRole = localStorage.getItem('userRole');
//   const isAuthenticated = !!localStorage.getItem('token');

//   if (!isAuthenticated) {
//     return <Navigate to="/login" />;
//   }

//   if (allowedRoles && !allowedRoles.includes(userRole)) {
//     return <Navigate to="/" />;
//   }

//   return children;
// };

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/events" element={<EventPage/>}/>
        {/* <Route 
          path="/admin-dashboard" 
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AdminDashboard />
            </ProtectedRoute>
          } 
        /> */}
        <Route 
          path="/user-dashboard" 
          element={<UserDashboard />} 
        />
      </Routes>
    </Router>
  );
}

export default App;