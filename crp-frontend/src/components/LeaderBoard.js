import React from 'react';
import { Link } from 'react-router-dom';
import { Trophy, User } from 'lucide-react';

const Leaderboard = ({ users, loading, error }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-semibold mb-4">Leaderboard</h2>
      {loading ? (
        <p>Loading leaderboard...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <ul className="space-y-4 mb-4">
          {users.slice(0, 5).map((user, index) => (
            <li key={user.id} className="flex items-center">
              <div className="bg-yellow-100 rounded-full p-2 mr-4">
                {index === 0 ? (
                  <Trophy className="w-5 h-5 text-yellow-600" />
                ) : (
                  <User className="w-5 h-5 text-blue-600" />
                )}
              </div>
              <div className="flex-grow">
                <h3 className="font-medium">{user.name}</h3>
                <p className="text-sm text-gray-600">{user.points} points</p>
              </div>
              <span className="text-2xl font-bold text-blue-600">#{index + 1}</span>
            </li>
          ))}
        </ul>
      )}
      <Link to="/leaderboard" className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300 text-center block">
        View Full Leaderboard
      </Link>
    </div>
  );
};

export default Leaderboard;