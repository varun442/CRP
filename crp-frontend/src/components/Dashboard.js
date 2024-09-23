import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Star, CalendarDays, AlertTriangle, Coffee, HandHeart, Plus
} from 'lucide-react';
import Leaderboard from './LeaderBoard';
import UpcomingEvents from './UpcomingEvents';
import { fetchUsers, getEvents } from '../services/api';
import EnhancedDashboardSections from './EnhancedDashboardSections';

const Dashboard = () => {
  const [hoveredButton, setHoveredButton] = useState(null);
  const [users, setUsers] = useState([]);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [userData, eventsData] = await Promise.all([
          fetchUsers(),
          getEvents()
        ]);
        const sortedUsers = userData.sort((a, b) => b.points - a.points);
        setUsers(sortedUsers);
        setEvents(eventsData);
        setLoading(false);
      } catch (err) {
        setError('Failed to load data');
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const features = [
    { title: 'Points', icon: <Star className="w-6 h-6" />, link: '/points' },
    { title: 'Events', icon: <CalendarDays className="w-6 h-6" />, link: '/events' },
    { title: 'Issue', icon: <AlertTriangle className="w-6 h-6" />, link: '/messages' },
  ];

  const neighborhoodIssues = [
    { id: 1, title: 'Broken streetlight on Oak St', status: 'In Progress' },
    { id: 2, title: 'Playground equipment needs repair', status: 'Reported' },
  ];

  return (
    <div className="bg-gray-100 min-h-screen p-8">
      <div className="container mx-auto">
        <h2 className="text-2xl font-extrabold mb-8 text-gradient bg-clip-text text-transparent bg-gradient-to-r from-cyan-950 to-cyan-500 tracking-wide font-serif">
          Welcome, {JSON.parse(localStorage.getItem('user')).fullName}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-8">
            {/* Quick Access */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Quick Access</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {features.map((feature, index) => (
                  <Link
                    key={index}
                    to={feature.link}
                    className={`flex flex-col items-center justify-center p-4 rounded-lg transition-all duration-300 ${
                      hoveredButton === feature.title
                        ? 'bg-blue-100 transform scale-105'
                        : 'bg-gray-100 hover:bg-blue-50'
                    }`}
                    onMouseEnter={() => setHoveredButton(feature.title)}
                    onMouseLeave={() => setHoveredButton(null)}
                  >
                    <div className="text-blue-600 mb-2">{feature.icon}</div>
                    <span className="text-sm font-medium">{feature.title}</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Upcoming Events */}
            {loading ? (
              <div className="text-center">Loading events...</div>
            ) : error ? (
              <div className="text-center text-red-500">{error}</div>
            ) : (
              <UpcomingEvents events={events} />
            )}

            <EnhancedDashboardSections/>
          </div>

          {/* Leaderboard */}
          <Leaderboard users={users} loading={loading} error={error} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;