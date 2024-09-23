import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Calendar, Menu, User } from 'lucide-react';
import { Box } from '@mui/material';
import ProfileCard from './ProfileCard';

const NavBar = ({ isLoggedIn, points, maxPoints, userRole, user }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showProfileCard, setShowProfileCard] = useState(false);
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
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center flex-1">
            <Link to="/" className="flex-shrink-0 flex items-center group">
              <span className="ml-2 text-white text-2xl font-semibold group-hover:text-blue-300 transition-colors duration-300">CRP</span>
            </Link>
            <div className="hidden md:ml-10 md:flex md:space-x-4 flex-1 justify-center">
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
          <div className="flex items-center">
            {isLoggedIn && userRole !== 'admin' && (
              <Box 
                position="relative"
                onMouseEnter={() => setShowProfileCard(true)}
                onMouseLeave={() => setShowProfileCard(false)}
              >
                <div className="flex items-center bg-gray-700 rounded-full py-3 px-5 shadow-md hover:bg-gray-600 transition-all duration-300 hover:shadow-lg cursor-pointer">
                  <div className="flex items-center mr-3">
                    <div className="flex flex-col items-start">
                      <span className="text-white font-bold text-base">{points}</span>
                      <span className="text-xs text-gray-400">points</span>
                    </div>
                  </div>
                  <div className="hidden sm:block bg-gray-600 rounded-full h-2 w-24 mr-3 overflow-hidden">
                    <div
                      className="bg-blue-400 h-full rounded-full transition-all duration-500 ease-out relative"
                      style={{ width: `${percentComplete}%` }}
                    >
                      {percentComplete < 100 && (
                        <div className="absolute right-0 top-0 h-full w-1 bg-white opacity-50 animate-pulse"></div>
                      )}
                    </div>
                  </div>
                  <User className="w-6 h-6 text-gray-300" />
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
                <svg className={`${isMenuOpen ? 'block' : 'hidden'} h-8 w-8`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Mobile menu, show/hide based on menu state */}
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
    </nav>
  );
};

export default NavBar;