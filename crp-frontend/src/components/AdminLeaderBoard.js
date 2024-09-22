import React from 'react';
import { Award, User } from 'lucide-react';

const AdminLeaderBoard = ({ users }) => {
  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
      <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
        <h2 className="text-lg leading-6 font-medium text-gray-900 flex items-center">
          <Award className="mr-2" /> Leaderboard
        </h2>
      </div>
      <ul className="divide-y divide-gray-200">
        {users.map((user, index) => (
          <li key={user.id} className="px-4 py-4 sm:px-6 flex items-center">
            <div className={`flex items-center justify-center w-8 h-8 rounded-full mr-4 ${index < 3 ? 'bg-yellow-400' : 'bg-gray-200'}`}>
              {index < 3 ? (
                <span className="font-bold text-white">{index + 1}</span>
              ) : (
                <User className="text-gray-600" size={16} />
              )}
            </div>
            <div className="flex-grow">
              <p className="text-sm font-medium text-gray-900">{user.name}</p>
              <p className="text-sm text-gray-500">{user.email}</p>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium text-gray-900">{user.points} points</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminLeaderBoard;