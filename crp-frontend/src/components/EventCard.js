import React from 'react';
import { Link } from 'react-router-dom';
import { Home as HomeIcon, Calendar, Users, ArrowRight, MapPin, User } from 'lucide-react';
import Footer from '../components/Footer';
import NavBar from '../components/NavBar';

const events = [
  { 
    id: 1,
    title: 'Community Clean-up', 
    date: '2024-10-01', 
    description: 'Join us for a neighborhood clean-up event!',
    location: 'Main Street Park',
    organizer: 'Green Initiative',
    attendees: 30,
    type: 'Volunteer Opportunity'
  },
  { 
    id: 2,
    title: 'Town Hall Meeting', 
    date: '2024-10-15', 
    description: 'Discuss important community issues with local leaders.',
    location: 'City Hall',
    organizer: 'Mayor\'s Office',
    attendees: 50,
    type: 'Town Hall'
  },
  { 
    id: 3,
    title: 'Volunteer Fair', 
    date: '2024-10-30', 
    description: 'Explore various volunteer opportunities in our area.',
    location: 'Community Center',
    organizer: 'Volunteer Network',
    attendees: 75,
    type: 'Community Event'
  },
];

const EventCard = ({ event }) => (
  <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
    <div className="bg-blue-600 text-white py-2 px-4">
      <span className="text-sm font-semibold">{event.type}</span>
    </div>
    <div className="p-6">
      <h3 className="text-xl font-bold mb-2">{event.title}</h3>
      <p className="text-gray-600 mb-4">{event.description}</p>
      <div className="flex items-center text-gray-500 mb-2">
        <Calendar size={16} className="mr-2" />
        <span>{new Date(event.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
      </div>
      <div className="flex items-center text-gray-500 mb-2">
        <MapPin size={16} className="mr-2" />
        <span>{event.location}</span>
      </div>
      <div className="flex items-center text-gray-500 mb-4">
        <User size={16} className="mr-2" />
        <span>{event.organizer}</span>
      </div>
      <div className="flex justify-between items-center">
        <span className="text-blue-600 font-semibold">{event.attendees} Attendees</span>
        <Link to={`/events/${event.id}`} className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm hover:bg-blue-700 transition duration-300">
          RSVP
        </Link>
      </div>
    </div>
  </div>
);

export default EventCard