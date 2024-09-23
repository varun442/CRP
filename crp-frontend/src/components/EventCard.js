import React, { useState } from 'react';
import { Calendar, MapPin, Users, Award } from 'lucide-react';
import toast from 'react-hot-toast';

const EventCard = ({ event }) => {
  const [isRsvping, setIsRsvping] = useState(false);

  const formatDate = (dateString) => {
    const options = { weekday: 'short', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  const handleRSVP = async () => {
    setIsRsvping(true);
    try {
      // Simulating an API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Show the toast notification
      toast.success(
        `You've successfully RSVP'd! You'll earn ${event.pointsReward} points after attending this event!`,
        {
          duration: 5000,
          position: 'top-center',
          icon: '🎉',
          style: {
            borderRadius: '10px',
            background: '#333',
            color: '#fff',
          },
        }
      );
      
      // Here you would typically also send an RSVP request to your backend
    } catch (error) {
      toast.error('Failed to RSVP. Please try again.', {
        duration: 4000,
        position: 'top-center',
      });
    } finally {
      setIsRsvping(false);
    }
  };

  const isEventFull = event.attendees.length >= event.maxAttendees;

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
          <button 
            className={`${
              isEventFull ? 'bg-gray-500 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
            } text-white py-2 px-4 rounded-lg transition duration-300 transform hover:scale-105 disabled:opacity-50`}
            onClick={handleRSVP}
            disabled={isRsvping || isEventFull}
            aria-label={isEventFull ? "Event is full" : "RSVP for this event"}
          >
            {isRsvping ? 'RSVPing...' : isEventFull ? 'Event Full' : 'RSVP Now'}
          </button>
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-bold text-lg mb-2 text-gray-800">{event.title}</h3>
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">{event.description}</p>
        <div className="flex items-center text-sm text-gray-600 mb-1">
          <Calendar className="w-4 h-4 mr-2 text-blue-600" aria-hidden="true" />
          <span>{formatDate(event.date)}</span>
        </div>
        <div className="flex items-center text-sm text-gray-600 mb-2">
          <MapPin className="w-4 h-4 mr-2 text-blue-600" aria-hidden="true" />
          <span>{event.location}</span>
        </div>
        <div className="flex items-center text-sm text-gray-600 mb-2">
          <Users className="w-4 h-4 mr-2 text-blue-600" aria-hidden="true" />
          <span>{event.attendees.length} / {event.maxAttendees || '∞'} attendees</span>
        </div>
        <div className="flex items-center text-sm text-green-600 font-semibold group">
          <Award className="w-4 h-4 mr-2 group-hover:animate-bounce" aria-hidden="true" />
          <span className="group-hover:text-green-700 transition-colors duration-300">
            Earn {event.pointsReward} points for attending!
          </span>
        </div>
      </div>
    </div>
  );
};

export default EventCard;