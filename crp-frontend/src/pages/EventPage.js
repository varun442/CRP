import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import { Card, CardContent, Typography, Box, TextField, Select, MenuItem, InputLabel, FormControl, Button, Grid, Paper, Chip } from '@mui/material';
import { Search, CalendarDays, MapPin, Users, Award } from 'lucide-react';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';

// Import the CSS for react-big-calendar
import 'react-big-calendar/lib/css/react-big-calendar.css';
import EventCard from '../components/EventCard';

// Set up the localizer for react-big-calendar
const localizer = momentLocalizer(moment);

const EventPage = () => {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [sortBy, setSortBy] = useState('date');

  useEffect(() => {
    // Fetch events from your API
    const fetchEvents = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/events');
        const data = await response.json();
        const formattedEvents = data.map(event => ({
          ...event,
          start: new Date(event.date),
          end: new Date(new Date(event.date).getTime() + 2 * 60 * 60 * 1000) // Assume 2 hour duration
        }));
        setEvents(formattedEvents);
        setFilteredEvents(formattedEvents);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };
    fetchEvents();
  }, []);

  useEffect(() => {
    let result = events;

    // Apply search filter
    if (searchTerm) {
      result = result.filter(event => 
        event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply type filter
    if (filterType !== 'all') {
      result = result.filter(event => event.type === filterType);
    }

    // Apply sorting
    result.sort((a, b) => {
      if (sortBy === 'date') {
        return new Date(a.date) - new Date(b.date);
      } else if (sortBy === 'points') {
        return b.pointsReward - a.pointsReward;
      }
      return 0;
    });

    setFilteredEvents(result);
  }, [events, searchTerm, filterType, sortBy]);

  const eventStyleGetter = (event) => {
    let backgroundColor = '#3174ad';
    if (event.type === 'town_hall') backgroundColor = '#4CAF50';
    if (event.type === 'volunteer_opportunity') backgroundColor = '#FFC107';
    if (event.type === 'community_event') backgroundColor = '#FF5722';
    return {
      style: {
        backgroundColor,
        borderRadius: '5px',
        opacity: 0.8,
        color: 'white',
        border: '0px',
        display: 'block'
      }
    };
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <NavBar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8 text-blue-600 text-center">Community Events</h1>

        <Grid container spacing={4}>
          {/* Left Column: Filtering Options */}
          <Grid item xs={12} md={3}>
            <Paper elevation={3} className="p-6 bg-white rounded-lg shadow-md">
              <Typography variant="h6" className="mb-6 font-semibold text-gray-800">Event Filters</Typography>
              <Box className="space-y-6">
                <TextField
                  fullWidth
                  variant="outlined"
                  label="Search Events"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  InputProps={{
                    startAdornment: <Search className="mr-2 text-gray-400" size={20} />,
                  }}
                />
                <FormControl fullWidth variant="outlined">
                  <InputLabel>Event Type</InputLabel>
                  <Select
                    value={filterType}
                    onChange={(e) => setFilterType(e.target.value)}
                    label="Event Type"
                  >
                    <MenuItem value="all">All Types</MenuItem>
                    <MenuItem value="town_hall">Town Hall</MenuItem>
                    <MenuItem value="community_event">Community Event</MenuItem>
                    <MenuItem value="volunteer_opportunity">Volunteer Opportunity</MenuItem>
                  </Select>
                </FormControl>
                <FormControl fullWidth variant="outlined">
                  <InputLabel>Sort by</InputLabel>
                  <Select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    label="Sort by"
                  >
                    <MenuItem value="date">Date</MenuItem>
                    <MenuItem value="points">Points Reward</MenuItem>
                  </Select>
                </FormControl>
                
              </Box>
            </Paper>
          </Grid>

          {/* Right Column: Calendar and Event Cards */}
          <Grid item xs={12} md={9}>
            {/* Calendar View */}
            <Card className="mb-8 rounded-lg overflow-hidden shadow-lg">
              <CardContent className="p-0">
                <Calendar
                  localizer={localizer}
                  events={filteredEvents}
                  startAccessor="start"
                  endAccessor="end"
                  style={{ height: 400 }}
                  eventPropGetter={eventStyleGetter}
                  views={['month']}
                  defaultView='month'
                />
              </CardContent>
            </Card>

            {/* Event Cards */}
            <Grid container spacing={4}>
              {filteredEvents.map((event) => (
                <Grid item xs={12} sm={6} key={event._id}>
                  <EventCard event={event} />
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </main>
      <Footer />
    </div>
  );
};

export default EventPage;