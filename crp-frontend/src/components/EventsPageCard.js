import React from 'react';
import { Card, CardContent, Typography, Box, Chip, Button } from '@mui/material';
import { CalendarDays, Clock, MapPin, CheckCircle, XCircle } from 'lucide-react';

const EventsPageCard = ({ event, onApprove, onReject, showActions }) => {
  const eventDate = new Date(event.date);

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
      </Box>

      {/* Right side - Event Information */}
      <CardContent className="sm:w-2/3 p-4 flex flex-col justify-between">
        <Box>
          <Typography variant="h6" className="font-bold text-blue-600 mb-2">
            {event.title}
          </Typography>
          <Box className="flex items-center mb-1">
            <CalendarDays className="mr-2 text-gray-500" size={16} />
            <Typography variant="body2">
              {eventDate.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
            </Typography>
          </Box>
          <Box className="flex items-center mb-1">
            <Clock className="mr-2 text-gray-500" size={16} />
            <Typography variant="body2">
              {eventDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
            </Typography>
          </Box>
          <Box className="flex items-center mb-2">
            <MapPin className="mr-2 text-gray-500" size={16} />
            <Typography variant="body2">
              {event.location}
            </Typography>
          </Box>
        </Box>
        
        <Box className="flex justify-between items-center mt-2">
          <Chip 
            label={event.type.replace('_', ' ')}
            color={event.type === 'town_hall' ? 'success' : event.type === 'volunteer_opportunity' ? 'warning' : 'error'}
            size="small"
          />
          <Typography variant="subtitle1" className="font-semibold text-green-600">
            {event.pointsReward ? `${event.pointsReward} Points` : 'Free'}
          </Typography>
        </Box>

        {showActions && (
          <Box className="flex justify-end mt-4 space-x-2">
            <Button
              variant="contained"
              color="success"
              startIcon={<CheckCircle size={16} />}
              onClick={() => onApprove(event._id)}
            >
              Approve
            </Button>
            <Button
              variant="contained"
              color="error"
              startIcon={<XCircle size={16} />}
              onClick={() => onReject(event._id)}
            >
              Reject
            </Button>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default EventsPageCard;