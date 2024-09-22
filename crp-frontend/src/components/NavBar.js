import React from 'react'
import { Link } from 'react-router-dom'
import { Home, UserCircle, Calendar, MessageSquare, Bell, Award, ChevronRight } from 'lucide-react'

const NavBar = ({ isLoggedIn, points, maxPoints }) => {
  const percentComplete = (points / maxPoints) * 100;

  return (
    <nav className="bg-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-6">
          <Link to="/" className="flex items-center">
            <Home className="text-blue-600" size={28} />
            <span className="ml-2 text-blue-600 text-2xl font-semibold">CRP</span>
          </Link>
          <Link to="/events" className="text-blue-600 hover:text-blue-800 flex items-center transition duration-300">
            <Calendar className="mr-2" size={24} />
            <span className="hidden sm:inline">Events</span>
          </Link>
          <Link to="/forum" className="text-blue-600 hover:text-blue-800 flex items-center transition duration-300">
            <MessageSquare className="mr-2" size={24} />
            <span className="hidden sm:inline">Forum</span>
          </Link>
          <Link to="/notifications" className="text-blue-600 hover:text-blue-800 flex items-center transition duration-300">
            <Bell className="mr-2" size={24} />
            <span className="hidden sm:inline">Notifications</span>
          </Link>
        </div>
        <div className="flex items-center space-x-4">
          {!isLoggedIn ? (
            <div className="flex items-center bg-blue-50 rounded-full py-2 px-4 shadow-md hover:shadow-lg transition duration-300">
              <div className="flex items-center mr-3">
                <Award className="text-yellow-500 mr-2" size={24} />
                <div className="flex flex-col items-start">
                  <span className="text-blue-600 font-bold text-lg">{points}</span>
                  <span className="text-xs text-blue-400">points</span>
                </div>
              </div>
              <div className="hidden sm:block bg-gray-200 rounded-full h-3 w-32 mr-3 overflow-hidden">
                <div 
                  className="bg-blue-600 h-full rounded-full transition-all duration-500 ease-out relative"
                  style={{ width: `${percentComplete}%` }}
                >
                  {percentComplete < 100 && (
                    <div className="absolute right-0 top-0 h-full w-2 bg-white opacity-75 animate-pulse"></div>
                  )}
                </div>
              </div>
              <div className="hidden sm:flex items-center text-blue-400 mr-3">
                <span className="text-xs font-semibold">{maxPoints}</span>
                <ChevronRight size={16} />
              </div>
              <Link to="/profile" className="flex items-center hover:bg-blue-100 rounded-full p-1 transition duration-300">
                <UserCircle className="text-blue-600" size={32} />
              </Link>
            </div>
          ) : (
            <Link to="/login" className="bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700 transition duration-300 text-lg font-semibold">
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  )
}

export default NavBar