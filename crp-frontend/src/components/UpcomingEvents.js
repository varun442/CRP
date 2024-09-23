import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import EventCard from './EventCard';

const UpcomingEvents = ({ events }) => {
  return (
    <div className="bg-gray-100 rounded-lg shadow-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">Upcoming Events</h2>
        <Link to="/events" className="text-blue-600 hover:text-blue-800 flex items-center">
          View all events
          <ChevronRight className="w-4 h-4 ml-1" />
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.slice(0, 6).map((event) => (
          <EventCard key={event._id} event={event} />
        ))}
      </div>
    </div>
  );
};

export default UpcomingEvents;