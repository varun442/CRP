import React from 'react';
import { Award, User, Trophy } from 'lucide-react';

const AdminLeaderBoard = ({ users }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="px-4 py-5 sm:px-6 flex justify-between items-center bg-gradient-to-r from-blue-500 to-blue-600">
        <h2 className="text-lg leading-6 font-medium text-white flex items-center">
          <Trophy className="mr-2" size={24} /> Leaderboard
        </h2>
        <Award className="text-yellow-300" size={24} />
      </div>
      <ul className="divide-y divide-gray-200">
        {users.map((user, index) => (
          <li key={user.id} className="px-4 py-4 sm:px-6 flex items-center hover:bg-gray-50 transition-colors duration-150">
            <div className={`flex items-center justify-center w-10 h-10 rounded-full mr-4 ${
              index === 0 ? 'bg-yellow-400' :
              index === 1 ? 'bg-gray-300' :
              index === 2 ? 'bg-yellow-600' : 'bg-blue-100'
            }`}>
              {index < 3 ? (
                <span className="font-bold text-white text-lg">{index + 1}</span>
              ) : (
                <User className="text-blue-600" size={20} />
              )}
            </div>
            <div className="flex-grow">
              <p className="text-sm font-medium text-gray-900">{user.fullName}</p>
              <p className="text-xs text-gray-500">Rank: {index + 1}</p>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium text-blue-600">{user.points} points</p>
              <div className="flex items-center justify-end mt-1">
                <Award className="text-yellow-400 mr-1" size={14} />
                <span className="text-xs text-gray-500">{user.awards || 0}</span>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminLeaderBoard;