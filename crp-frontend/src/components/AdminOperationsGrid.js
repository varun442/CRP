import React from 'react';
import { Settings, AlertCircle } from 'lucide-react';

const AdminOperationsGrid = ({ quickAccessItems }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="px-3 py-4 sm:px-4 flex justify-between items-center bg-gradient-to-r from-purple-500 to-indigo-500">
        <h2 className="text-lg leading-6 font-medium text-white flex items-center">
          <Settings className="mr-2" size={24} /> Admin Operations
        </h2>
        <AlertCircle className="text-white" size={24} />
      </div>
      <ul className="divide-y divide-gray-200">
        {quickAccessItems.map((item, index) => (
          <li 
            key={index} 
            onClick={item.action} 
            className="flex items-center px-3 py-2 sm:px-4 sm:py-3 hover:bg-gray-50 transition-colors duration-150 cursor-pointer"
          >
            <div className="flex items-center justify-center w-10 h-10 rounded-full mr-3 bg-indigo-100">
              <item.icon className="text-indigo-600" size={20} />
            </div>
            <div className="flex-grow">
              <p className="text-sm font-medium text-gray-900">{item.title}</p>
              {item.description && (
                <p className="text-xs text-gray-500 mt-1">{item.description}</p>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminOperationsGrid;
