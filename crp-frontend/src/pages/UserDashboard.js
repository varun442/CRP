import React from 'react'
import Dashboard from '../components/Dashboard'
import { Toaster } from 'react-hot-toast';

const UserDashboard = () => {
    return (
        <div>
            <Toaster />
            <Dashboard/>
        </div>
    )
}

export default UserDashboard;