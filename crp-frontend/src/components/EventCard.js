import React from 'react';
import { Calendar, MapPin, Users, Award } from 'lucide-react';

const EventCard = ({ event }) => {
  const formatDate = (dateString) => {
    const options = { weekday: 'short', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
      <div className="relative">
        <img 
          src="https://www.eventbrite.ie/blog/wp-content/uploads/2022/09/dance-event-768x511.jpg" 
          alt={event.title} 
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-0 right-0 bg-blue-600 text-white text-xs font-bold px-3 py-1 m-2 rounded-full">
          {event.type.replace('_', ' ')}
        </div>
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
          <button className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300 transform hover:scale-105">
            RSVP Now
          </button>
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-bold text-lg mb-2 text-gray-800">{event.title}</h3>
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">{event.description}</p>
        <div className="flex items-center text-sm text-gray-600 mb-1">
          <Calendar className="w-4 h-4 mr-2 text-blue-600" />
          {formatDate(event.date)}
        </div>
        <div className="flex items-center text-sm text-gray-600 mb-2">
          <MapPin className="w-4 h-4 mr-2 text-blue-600" />
          {event.location}
        </div>
        <div className="flex items-center text-sm text-gray-600 mb-2">
          <Users className="w-4 h-4 mr-2 text-blue-600" />
          {event.attendees.length} / {event.maxAttendees || '∞'} attendees
        </div>
        <div className="flex items-center text-sm text-green-600 font-semibold">
          <Award className="w-4 h-4 mr-2" />
          Earn {event.pointsReward} points for attending!
        </div>
      </div>
    </div>
  );
};

export default EventCard;