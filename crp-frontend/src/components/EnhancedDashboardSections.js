import React, { useState } from 'react';
import { Coffee, HandHeart, Plus, AlertTriangle, ChevronRight, Check, XCircle } from 'lucide-react';

const EnhancedDashboardSections = () => {
  const [hoveredButton, setHoveredButton] = useState(null);

  const neighborhoodIssues = [
    { id: 1, title: 'Broken streetlight on Oak St', status: 'In Progress', votes: 15 },
    { id: 2, title: 'Playground equipment needs repair', status: 'Reported', votes: 8 },
    { id: 3, title: 'Pothole on Main St', status: 'Resolved', votes: 22 },
  ];

  return (
    <>
      {/* Connect with Neighbors */}
      <div className="bg-gradient-to-br from-blue-50 to-green-50 rounded-lg shadow-lg p-6 transform transition-all duration-300 hover:shadow-xl">
        <h2 className="text-2xl font-semibold mb-6 text-blue-800">Connect with Neighbors</h2>
        <div className="grid grid-cols-2 gap-6 mb-6">
          {[
            { title: 'Coffee Meetup', icon: Coffee, color: 'blue' },
            { title: 'Volunteer', icon: HandHeart, color: 'green' }
          ].map((item, index) => (
            <button
              key={index}
              className={`flex flex-col items-center justify-center p-4 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-md ${
                hoveredButton === item.title
                  ? `bg-${item.color}-100 border-2 border-${item.color}-400`
                  : `bg-white border-2 border-${item.color}-200`
              }`}
              onMouseEnter={() => setHoveredButton(item.title)}
              onMouseLeave={() => setHoveredButton(null)}
            >
              <item.icon className={`w-10 h-10 mb-2 text-${item.color}-600`} />
              <span className={`text-sm font-medium text-${item.color}-800`}>{item.title}</span>
            </button>
          ))}
        </div>
        <p className="text-sm text-gray-600 text-center italic">
          Join our community activities and get to know your neighbors!
        </p>
      </div>

      {/* Neighborhood Issues */}
      <div className="bg-white rounded-lg shadow-lg p-6 transform transition-all duration-300 hover:shadow-xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">Neighborhood Issues</h2>
          <button className="text-blue-600 hover:text-blue-800 transition-colors duration-300 p-2 rounded-full hover:bg-blue-100">
            <Plus className="w-6 h-6" />
          </button>
        </div>
        <ul className="space-y-4 mb-6">
          {neighborhoodIssues.map((issue) => (
            <li key={issue.id} className="flex items-start bg-gray-50 p-4 rounded-lg hover:bg-gray-100 transition-colors duration-300">
              <div className={`rounded-full p-2 mr-4 ${
                issue.status === 'Resolved' ? 'bg-green-100' : 
                issue.status === 'In Progress' ? 'bg-yellow-100' : 'bg-red-100'
              }`}>
                {issue.status === 'Resolved' ? (
                  <Check className="w-5 h-5 text-green-600" />
                ) : issue.status === 'In Progress' ? (
                  <AlertTriangle className="w-5 h-5 text-yellow-600" />
                ) : (
                  <XCircle className="w-5 h-5 text-red-600" />
                )}
              </div>
              <div className="flex-grow">
                <h3 className="font-medium text-gray-800">{issue.title}</h3>
                <p className="text-sm text-gray-600">Status: {issue.status}</p>
                <div className="flex items-center mt-2">
                  <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                    {issue.votes} votes
                  </span>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </li>
          ))}
        </ul>
        <button className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-300 transform hover:scale-105 flex items-center justify-center">
          <AlertTriangle className="w-5 h-5 mr-2" />
          Report an Issue
        </button>
      </div>
    </>
  );
};

export default EnhancedDashboardSections;