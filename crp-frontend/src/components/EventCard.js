import React from 'react';
import { Calendar, MapPin, Users, Clock } from 'lucide-react';

const EventCard = ({ event }) => {
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  return (
    <div className="max-w-sm rounded-xl overflow-hidden shadow-lg bg-white hover:shadow-xl transition-shadow duration-300 ease-in-out">
      <div className="relative">
        <img className="w-full h-48 object-cover" src="https://www.eventbrite.ie/blog/wp-content/uploads/2022/09/dance-event-768x511.jpg" alt={event.title} />
        <div className="absolute top-0 right-0 bg-blue-600 text-white text-xs font-bold px-3 py-1 m-2 rounded-full">
          {event.type}
        </div>
      </div>
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2 text-gray-800">{event.title}</div>
        <p className="text-gray-600 text-sm mb-4">{event.description}</p>
        <div className="flex items-center mb-2 text-sm text-gray-600">
          <Calendar className="w-4 h-4 mr-2 text-blue-600" />
          <span>{formatDate(event.date)}</span>
        </div>
        <div className="flex items-center mb-2 text-sm text-gray-600">
          <MapPin className="w-4 h-4 mr-2 text-blue-600" />
          <span>{event.location}</span>
        </div>
        <div className="flex items-center mb-2 text-sm text-gray-600">
          <Users className="w-4 h-4 mr-2 text-blue-600" />
          <span>{event.attendees.length} / {event.maxAttendees} Attendees</span>
        </div>
        <div className="flex items-center text-sm text-gray-600">
          <Clock className="w-4 h-4 mr-2 text-blue-600" />
          <span>Points Reward: {event.pointsReward}</span>
        </div>
      </div>
      <div className="px-6 py-4 bg-gray-100">
        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out">
          RSVP Now
        </button>
      </div>
    </div>
  );
};

export default EventCard;