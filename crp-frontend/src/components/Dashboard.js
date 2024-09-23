import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Star, CalendarDays, AlertTriangle, Coffee, HandHeart, Plus
} from 'lucide-react';
import Leaderboard from './LeaderBoard';
import UpcomingEvents from './UpcomingEvents';
import { fetchUsers, getEvents } from '../services/api';

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
        console.log(eventsData);
        
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
        <h1 className="text-3xl font-bold mb-8 text-blue-500">Welcome, User</h1>
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

            {/* Connect with Neighbors */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Connect with Neighbors</h2>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <button className="flex items-center justify-center bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300">
                  <Coffee className="w-5 h-5 mr-2" />
                  Coffee Meetup
                </button>
                <button className="flex items-center justify-center bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition duration-300">
                  <HandHeart className="w-5 h-5 mr-2" />
                  Volunteer
                </button>
              </div>
              <p className="text-sm text-gray-600">
                Join our community activities and get to know your neighbors!
              </p>
            </div>

            {/* Neighborhood Issues */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Neighborhood Issues</h2>
                <button className="text-blue-600 hover:text-blue-800">
                  <Plus className="w-5 h-5" />
                </button>
              </div>
              <ul className="space-y-4 mb-4">
                {neighborhoodIssues.map((issue) => (
                  <li key={issue.id} className="flex items-start">
                    <div className="bg-red-100 rounded-full p-2 mr-4">
                      <AlertTriangle className="w-5 h-5 text-red-600" />
                    </div>
                    <div>
                      <h3 className="font-medium">{issue.title}</h3>
                      <p className="text-sm text-gray-600">Status: {issue.status}</p>
                    </div>
                  </li>
                ))}
              </ul>
              <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300">
                Report an Issue
              </button>
            </div>
          </div>

          <Leaderboard users={users} loading={loading} error={error} />

        </div>
      </div>
    </div>
  );
};

export default Dashboard;