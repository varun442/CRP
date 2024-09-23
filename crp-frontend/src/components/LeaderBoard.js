import React from 'react';
import { Link } from 'react-router-dom';
import { Trophy, Medal, User, ArrowRight } from 'lucide-react';

const TruncatedName = ({ name, className }) => (
  <span className={`truncate block ${className}`} title={name}>
    {name}
  </span>
);

const LeaderboardPodium = ({ users }) => (
  <div className="flex items-end justify-center mb-8 mt-4">
    {/* Second Place */}
    <div className="flex flex-col items-center mx-2">
      <div className="bg-gray-200 rounded-full p-3 mb-2">
        <Medal className="w-8 h-8 text-gray-600" />
      </div>
      <div className="bg-gray-200 p-4 rounded-t-lg w-28 flex flex-col items-center">
        <TruncatedName name={users[1].fullName} className="text-lg font-bold w-full text-center" />
        <span className="text-sm">{users[1].points} pts</span>
      </div>
      <div className="bg-gray-300 p-2 w-28 text-center font-bold">2nd</div>
    </div>

    {/* First Place */}
    <div className="flex flex-col items-center mx-2">
      <div className="bg-yellow-200 rounded-full p-3 mb-2">
        <Trophy className="w-10 h-10 text-yellow-600" />
      </div>
      <div className="bg-yellow-200 p-4 rounded-t-lg w-32 flex flex-col items-center">
        <TruncatedName name={users[0].fullName} className="text-xl font-bold w-full text-center" />
        <span className="text-sm">{users[0].points} pts</span>
      </div>
      <div className="bg-yellow-300 p-3 w-32 text-center font-bold">1st</div>
    </div>

    {/* Third Place */}
    <div className="flex flex-col items-center mx-2">
      <div className="bg-orange-200 rounded-full p-3 mb-2">
        <Medal className="w-6 h-6 text-orange-600" />
      </div>
      <div className="bg-orange-200 p-4 rounded-t-lg w-24 flex flex-col items-center">
        <TruncatedName name={users[2].fullName} className="text-base font-bold w-full text-center" />
        <span className="text-sm">{users[2].points} pts</span>
      </div>
      <div className="bg-orange-300 p-1 w-24 text-center font-bold">3rd</div>
    </div>
  </div>
);

const LeaderboardList = ({ users }) => (
  <ul className="space-y-3 mb-6">
    {users.slice(3, 8).map((user, index) => (
      <li key={user.id} className="flex items-center bg-white rounded-lg shadow p-3 transition-transform hover:scale-105">
        <div className="bg-blue-100 rounded-full p-2 mr-4 flex-shrink-0">
          <User className="w-5 h-5 text-blue-600" />
        </div>
        <div className="flex-grow min-w-0">
          <TruncatedName name={user.fullName} className="font-medium" />
          <p className="text-sm text-gray-600">{user.points} points</p>
        </div>
        <span className="text-xl font-bold text-blue-600 flex-shrink-0">#{index + 4}</span>
      </li>
    ))}
  </ul>
);

const Leaderboard = ({ users, loading, error }) => {
  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6 flex justify-center items-center h-96">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6">
        <p className="text-red-500 text-center">{error}</p>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-b from-blue-100 to-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-6 text-center text-blue-800">Leaderboard</h2>
      
      <LeaderboardPodium users={users} />
      <LeaderboardList users={users} />

      <Link 
        to="/leaderboard" 
        className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-300 text-center block font-semibold flex items-center justify-center"
      >
        View Full Leaderboard
        <ArrowRight className="ml-2 w-5 h-5" />
      </Link>
    </div>
  );
};

export default Leaderboard;