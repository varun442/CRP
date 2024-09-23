import React from 'react';
import { User, AlertCircle, Battery, Bell } from 'lucide-react';

const AdminLessActiveUsers = ({ users }) => {
  const handleSendNotification = (userId) => {
    // Implement the notification sending logic here
    console.log(`Sending notification to user ${userId}`);
  };

  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="px-4 py-5 sm:px-6 flex justify-between items-center bg-gradient-to-r from-orange-500 to-red-500">
        <h2 className="text-lg leading-6 font-medium text-white flex items-center">
          <Battery className="mr-2" size={24} /> Less Active Users
        </h2>
        <AlertCircle className="text-white" size={24} />
      </div>
      <ul className="divide-y divide-gray-200">
        {users.map((user) => (
          <li key={user.id} className="px-4 py-4 sm:px-6 flex items-center hover:bg-gray-50 transition-colors duration-150">
            <div className="flex items-center justify-center w-10 h-10 rounded-full mr-4 bg-orange-100">
              <User className="text-orange-600" size={20} />
            </div>
            <div className="flex-grow">
              <p className="text-sm font-medium text-gray-900">{user.fullName}</p>
            </div>
            <div className="text-right flex items-center">
              <div className="mr-4">
                <p className="text-sm font-medium text-orange-600">{user.points} points</p>
                <p className="text-xs text-gray-500 mt-1">Inactive for {user.inactiveDays || 0} days</p>
              </div>
              <button
                onClick={() => handleSendNotification(user.id)}
                className="p-2 rounded-full bg-blue-100 hover:bg-blue-200 transition-colors duration-150"
                title="Send Notification"
              >
                <Bell className="text-blue-600" size={20} />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminLessActiveUsers;