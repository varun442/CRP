import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
    const navigate = useNavigate();

    useEffect(() => {
        // Perform logout logic here
        // Then redirect to login or home page
        navigate('/');
    }, [navigate]);

    return <div>Logging out...</div>;
};

export default Logout;