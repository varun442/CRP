
import React from 'react';
import { CalendarDays, MapPin, Users, Award, CheckCircle, XCircle } from 'lucide-react';

const EventCard = ({ event, onApprove, onReject, showActions }) => {
  const eventDate = new Date(event.date);

  const formatDate = (date) => {
    const options = { weekday: 'short', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return date.toLocaleDateString('en-US', options);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'approved': return 'bg-green-500';
      case 'rejected': return 'bg-red-500';
      default: return 'bg-yellow-500';
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'town_hall': return 'bg-blue-500';
      case 'volunteer_opportunity': return 'bg-purple-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="max-w-4xl mx-auto overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white flex flex-col sm:flex-row">
      <div className="sm:w-2/5 relative">
        <img
          src={event.imageUrl || "https://www.eventbrite.ie/blog/wp-content/uploads/2022/09/dance-event-768x511.jpg"}
          alt={event.title}
          className="w-full h-48 sm:h-full object-cover"
        />
        <span className={`absolute top-2 left-2 px-2 py-1 text-xs font-bold text-white rounded ${getStatusColor(event.status)}`}>
          {event.status || "Pending"}
        </span>
      </div>
      
      <div className="sm:w-3/5 p-4 flex flex-col justify-between">
        <div>
          <h3 className="text-xl font-bold mb-2 text-gray-800">{event.title}</h3>
          <p className="text-sm text-gray-600 mb-4 line-clamp-2">{event.description}</p>
          
          <div className="space-y-2 text-sm text-gray-700">
            <div className="flex items-center">
              <CalendarDays className="w-4 h-4 mr-2 text-blue-500" />
              <span>{formatDate(eventDate)}</span>
            </div>
            <div className="flex items-center">
              <MapPin className="w-4 h-4 mr-2 text-blue-500" />
              <span>{event.location}</span>
            </div>
            <div className="flex items-center">
              <Users className="w-4 h-4 mr-2 text-blue-500" />
              <span>{event.attendees?.length || 0} / {event.maxAttendees || '∞'} attendees</span>
            </div>
            <div className="flex items-center text-green-600 font-semibold">
              <Award className="w-4 h-4 mr-2" />
              <span>Earn {event.pointsReward} points for attending!</span>
            </div>
          </div>
        </div>
        
        <div className="mt-4 flex justify-between items-center">
          <span className={`px-2 py-1 text-xs font-bold text-white rounded ${getTypeColor(event.type)}`}>
            {event.type.replace('_', ' ')}
          </span>
          
          {showActions && (
            <div className="flex space-x-2">
              <button
                onClick={() => onApprove(event._id)}
                className="flex items-center px-3 py-1 bg-green-500 text-white text-sm font-medium rounded hover:bg-green-600 transition-colors duration-300"
              >
                <CheckCircle className="w-4 h-4 mr-1" /> Approve
              </button>
              <button
                onClick={() => onReject(event._id)}
                className="flex items-center px-3 py-1 bg-red-500 text-white text-sm font-medium rounded hover:bg-red-600 transition-colors duration-300"
              >
                <XCircle className="w-4 h-4 mr-1" /> Reject
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventCard;