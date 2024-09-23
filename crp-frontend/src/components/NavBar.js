import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Calendar, Menu, User, LogIn } from 'lucide-react';
import { Box } from '@mui/material';
import ProfileCard from './ProfileCard';
import crpLogo from '../assets/crp.png';

const NavBar = ({ isLoggedIn, points, maxPoints, userRole, user, onLogin }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [showProfileCard, setShowProfileCard] = useState(false);
    const [isLoginHovered, setIsLoginHovered] = useState(false);
    const percentComplete = (points / maxPoints) * 100;
    const location = useLocation();

    const NavLink = ({ to, icon: Icon, children }) => {
        const isActive = location.pathname === to;
        return (
            <Link
                to={to}
                className={`flex items-center px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 ease-in-out transform hover:scale-105 hover:bg-blue-600 hover:text-white ${
                    isActive
                        ? 'bg-blue-500 text-white shadow-md'
                        : 'text-gray-300 bg-gray-700 hover:shadow-lg'
                }`}
            >
                <Icon className="mr-2" size={18} />
                <span>{children}</span>
            </Link>
        );
    };

    return (
        <nav className="bg-gray-800 shadow-lg">
            <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
                <div className={`flex items-center justify-between ${isLoggedIn ? 'h-20' : 'h-40'}`}>
                    <div className={`flex items-center ${isLoggedIn ? 'flex-1' : 'w-full justify-center'}`}>
                        <Link to="/" className={`flex-shrink-0 flex items-center group ${isLoggedIn ? '' : 'flex-col'}`}>
                            <img src={crpLogo} alt="Logo" className={`${isLoggedIn ? 'h-10 w-auto mr-2' : 'h-20 w-auto mb-4'}`} />
                            <div className="relative overflow-hidden">
                                <span
                                    className={`text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-teal-300 font-bold font-sans tracking-wide group-hover:animate-pulse transition-all duration-300 ease-in-out ${
                                        isLoggedIn ? 'text-2xl' : 'text-4xl'
                                    }`}
                                >
                                   {"Community Restoration Project"}
                                </span>
                                <span
                                    className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-blue-400 to-teal-300 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out"></span>
                            </div>
                        </Link>
                        {isLoggedIn && (
                            <div className="hidden md:ml-10 md:flex md:space-x-4 flex-1 justify-center">
                                {userRole === 'admin' ? (
                                    <NavLink to="/admin/events" icon={Calendar}>Events</NavLink>
                                ) : (
                                    <>
                                        <NavLink to="/user-dashboard" icon={Calendar}>Dashboard</NavLink>
                                        <NavLink to="/forum" icon={Calendar}>Forum</NavLink>
                                    </>
                                )}
                            </div>
                        )}
                    </div>
                    {isLoggedIn ? (
                        <div className="flex items-center">
                            {userRole !== 'admin' && (
                                <Box
                                    position="relative"
                                    onMouseEnter={() => setShowProfileCard(true)}
                                    onMouseLeave={() => setShowProfileCard(false)}
                                >
                                    <div
                                        className="group relative flex items-center bg-gradient-to-r from-cyan-900 to-cyan-500 rounded-full py-3 px-5 shadow-md hover:shadow-lg cursor-pointer transition-all duration-300 overflow-hidden"
                                    >
                                        <div className="absolute inset-0 bg-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                        <div className="relative z-10 flex items-center mr-3">
                                            <div className="flex flex-col items-start">
                                                <span className="text-white font-bold text-base">{points}</span>
                                                <span className="text-xs text-gray-200">points</span>
                                            </div>
                                        </div>
                                        <div
                                            className="relative z-10 hidden sm:block bg-blue-700 rounded-full h-2 w-24 mr-3 overflow-hidden"
                                        >
                                            <div
                                                className="bg-white h-full rounded-full transition-all duration-500 ease-out relative"
                                                style={{width: `${percentComplete}%`}}
                                            >
                                                {percentComplete < 100 && (
                                                    <div
                                                        className="absolute right-0 top-0 h-full w-1 bg-blue-300 opacity-50 animate-pulse"
                                                    ></div>
                                                )}
                                            </div>
                                        </div>
                                        <User className="relative z-10 w-6 h-6 text-white" />
                                    </div>
                                    {showProfileCard && <ProfileCard user={{...user, points, maxPoints}} />}
                                </Box>
                            )}
                            <div className="ml-4 md:hidden">
                                <button
                                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                                    className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white transition-all duration-300 transform hover:scale-110"
                                >
                                    <Menu className={`${isMenuOpen ? 'hidden' : 'block'} h-8 w-8`} />
                                    <svg className={`${isMenuOpen ? 'block' : 'hidden'} h-8 w-8`}
                                         xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                         stroke="currentColor" aria-hidden="true">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                              d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="absolute right-4 sm:right-6 lg:right-8">
                            <button
                                onClick={onLogin}
                                onMouseEnter={() => setIsLoginHovered(true)}
                                onMouseLeave={() => setIsLoginHovered(false)}
                                className="group relative inline-flex items-center justify-center px-6 py-3 overflow-hidden font-bold text-white rounded-md shadow-2xl group"
                            >
                                <span
                                    className="absolute inset-0 w-full h-full transition duration-300 ease-out opacity-0 bg-gradient-to-br from-purple-600 via-pink-600 to-red-600 group-hover:opacity-100"></span>
                                <span
                                    className="absolute top-0 left-0 w-full bg-gradient-to-b from-white to-transparent opacity-5 h-1/3"></span>
                                <span
                                    className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-white to-transparent opacity-5"></span>
                                <span
                                    className="absolute bottom-0 left-0 w-4 h-full bg-gradient-to-r from-white to-transparent opacity-5"></span>
                                <span
                                    className="absolute bottom-0 right-0 w-4 h-full bg-gradient-to-l from-white to-transparent opacity-5"></span>
                                <span
                                    className="absolute inset-0 w-full h-full border border-white rounded-md opacity-10"></span>
                                <span
                                    className="absolute w-0 h-0 transition-all duration-300 ease-out bg-white rounded-full group-hover:w-56 group-hover:h-56 opacity-5"></span>
                                <span className="relative flex items-center">
                                    {isLoginHovered ? (
                                        <>
                                            <User className="mr-2" size={18} />
                                            Login
                                        </>
                                    ) : (
                                        <>
                                            <LogIn className="mr-2" size={18} />
                                            Login
                                        </>
                                    )}
                                </span>
                            </button>
                        </div>
                    )}
                </div>
            </div>
            {/* Mobile menu, show/hide based on menu state */}
            {isLoggedIn && (
                <div className={`${isMenuOpen ? 'block' : 'hidden'} md:hidden`}>
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        {userRole === 'admin' ? (
                            <NavLink to="/admin/events" icon={Calendar}>Events</NavLink>
                        ) : (
                            <>
                                <NavLink to="/user-dashboard" icon={Calendar}>Dashboard</NavLink>
                                <NavLink to="/events" icon={Calendar}>Events</NavLink>
                                <NavLink to="/forum" icon={Calendar}>Forum</NavLink>
                            </>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default NavBar;