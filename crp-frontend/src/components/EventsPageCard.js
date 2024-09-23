import React from 'react';
import { Card, CardContent, Typography, Box, Chip, Button } from '@mui/material';
import { CalendarDays, Clock, MapPin, Users, Award, CheckCircle, XCircle } from 'lucide-react';

const EventsPageCard = ({ event, onApprove, onReject, showActions }) => {
  const eventDate = new Date(event.date);

  const formatDate = (date) => {
    const options = { weekday: 'short', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return date.toLocaleDateString('en-US', options);
  };

  return (
    <Card className="flex flex-col sm:flex-row h-full rounded-lg overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl m-5">
      {/* Left side - Image */}
      <Box className="sm:w-1/3 h-48 sm:h-auto relative">
        <img
          src={event.imageUrl || "https://www.eventbrite.ie/blog/wp-content/uploads/2022/09/dance-event-768x511.jpg"}
          alt={event.title}
          className="w-full h-full object-cover"
        />
        <Chip 
          label={event.status || "Pending"}
          color={event.status === 'pending' ? 'warning' : event.status === 'approved' ? 'success' : 'error'}
          size="small"
          className="absolute top-2 left-2"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
          <Button
            variant="contained"
            color="primary"
            className="transform hover:scale-105 transition duration-300"
          >
            RSVP Now
          </Button>
        </div>
      </Box>

      {/* Right side - Event Information */}
      <CardContent className="sm:w-2/3 p-4 flex flex-col justify-between">
        <Box>
          <Typography variant="h5" className="font-bold text-gray-800 mb-2">
            {event.title}
          </Typography>
          <Typography variant="body2" className="text-gray-600 mb-3 line-clamp-2">
            {event.description}
          </Typography>
          <Box className="flex items-center mb-1 text-sm text-gray-600">
            <CalendarDays className="mr-2 text-blue-600" size={16} />
            <Typography variant="body2">
              {formatDate(eventDate)}
            </Typography>
          </Box>
          <Box className="flex items-center mb-1 text-sm text-gray-600">
            <MapPin className="mr-2 text-blue-600" size={16} />
            <Typography variant="body2">
              {event.location}
            </Typography>
          </Box>
          <Box className="flex items-center mb-1 text-sm text-gray-600">
            <Users className="mr-2 text-blue-600" size={16} />
            <Typography variant="body2">
              {event.attendees?.length || 0} / {event.maxAttendees || '∞'} attendees
            </Typography>
          </Box>
          <Box className="flex items-center text-sm text-green-600 font-semibold">
            <Award className="mr-2" size={16} />
            <Typography variant="body2">
              Earn {event.pointsReward} points for attending!
            </Typography>
          </Box>
        </Box>
        
        <Box className="flex justify-between items-center mt-4">
          <Chip 
            label={event.type.replace('_', ' ')}
            color={event.type === 'town_hall' ? 'success' : event.type === 'volunteer_opportunity' ? 'warning' : 'info'}
            size="small"
          />
          {showActions && (
            <Box className="flex space-x-2">
              <Button
                variant="contained"
                color="success"
                startIcon={<CheckCircle size={16} />}
                onClick={() => onApprove(event._id)}
                size="small"
              >
                Approve
              </Button>
              <Button
                variant="contained"
                color="error"
                startIcon={<XCircle size={16} />}
                onClick={() => onReject(event._id)}
                size="small"
              >
                Reject
              </Button>
            </Box>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

export default EventsPageCard;