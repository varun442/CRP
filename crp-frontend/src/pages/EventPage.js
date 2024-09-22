import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import { Card, CardContent, Typography, Box, TextField, Select, MenuItem, InputLabel, FormControl, Paper, Modal, Fade, Backdrop, Grid, Button } from '@mui/material';
import { Search, X, Plus } from 'lucide-react';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import EventsPageCard from '../components/EventsPageCard';
import CreateEventModal from '../components/CreateEventModal';
import '../customCalendar.css';

// Import the CSS for react-big-calendar
import 'react-big-calendar/lib/css/react-big-calendar.css';

// Set up the localizer for react-big-calendar
const localizer = momentLocalizer(moment);

const EventPage = () => {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [sortBy, setSortBy] = useState('date');
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [createEventModalOpen, setCreateEventModalOpen] = useState(false);

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

    if (searchTerm) {
      result = result.filter(event => 
        event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filterType !== 'all') {
      result = result.filter(event => event.type === filterType);
    }

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

  const handleDateSelect = (slotInfo) => {
    const clickedDate = slotInfo.start;
    const eventsOnDate = filteredEvents.filter(event => 
      moment(event.start).isSame(clickedDate, 'day')
    );

    if (eventsOnDate.length > 0) {
      setSelectedEvent(eventsOnDate[0]);
      setModalOpen(true);
    } else {
      setSelectedDate(clickedDate);
      setModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedDate(null);
    setSelectedEvent(null);
  };

  const handleCreateEventClick = () => {
    setCreateEventModalOpen(true);
  };

  const handleCreateEventClose = () => {
    setCreateEventModalOpen(false);
  };

  const handleCreateEventSubmit = async (eventDetails) => {
    try {
      const response = await fetch('http://localhost:5000/api/events', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(eventDetails),
      });

      if (response.ok) {
        alert('Event submitted for approval successfully!');
      } else {
        throw new Error('Failed to submit event');
      }
    } catch (error) {
      console.error('Error submitting event:', error);
      alert('Failed to submit event. Please try again.');
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <NavBar />
      <main className="flex-grow py-8 max-w-8l mx-auto w-full">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-blue-600">Community Events</h1>
          <Button
            variant="contained"
            color="primary"
            startIcon={<Plus size={20} />}
            onClick={handleCreateEventClick}
            className="rounded-full"
          >
            Create Event
          </Button>
        </div>

        <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-4">
          {/* Left Column: Calendar View */}
          <div className="w-full lg:w-1/2">
            <Card className="rounded-lg overflow-hidden shadow-lg">
              <CardContent className="p-0">
                <Calendar
                  localizer={localizer}
                  events={filteredEvents}
                  startAccessor="start"
                  endAccessor="end"
                  style={{ height: 'calc(100vh - 200px)' }}
                  eventPropGetter={eventStyleGetter}
                  views={['month']}
                  defaultView='month'
                  onSelectSlot={handleDateSelect}
                  selectable
                  className="custom-calendar"
                />
              </CardContent>
            </Card>
          </div>

          {/* Right Column: Filters and Event Cards */}
          <div className="w-full lg:w-1/2">
            {/* Horizontal Filters */}
            <Paper elevation={3} className="p-4 bg-white rounded-lg shadow-md mb-4">
              <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4 items-center">
                <TextField
                  variant="outlined"
                  label="Search Events"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  InputProps={{
                    startAdornment: <Search className="mr-2 text-gray-400" size={20} />,
                  }}
                  className="w-full md:w-auto flex-grow"
                />
                <FormControl variant="outlined" className="w-full md:w-auto min-w-[150px]">
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
                <FormControl variant="outlined" className="w-full md:w-auto min-w-[120px]">
                  <InputLabel>Sort by</InputLabel>
                  <Select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    label="Sort by"
                  >
                    <MenuItem value="date">Date</MenuItem>
                    <MenuItem value="points">Points</MenuItem>
                  </Select>
                </FormControl>
              </div>
            </Paper>

            {/* Event Cards in 2x2 Grid */}
            <div className="space-y-4">
  {filteredEvents.map((event) => (
    <EventsPageCard key={event._id} event={event} />
  ))}
</div>
          </div>
        </div>

        {/* Modal for displaying event or no event message */}
        <Modal
          open={modalOpen}
          onClose={handleCloseModal}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={modalOpen}>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-xl max-w-lg w-full">
              <button
                onClick={handleCloseModal}
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              >
                <X size={24} />
              </button>
              {selectedEvent ? (
                <EventsPageCard event={selectedEvent} />
              ) : (
                <Typography variant="h6" component="h2">
                  No events on {selectedDate && selectedDate.toDateString()}
                </Typography>
              )}
            </div>
          </Fade>
        </Modal>

        {/* Create Event Modal */}
        <CreateEventModal
          open={createEventModalOpen}
          handleClose={handleCreateEventClose}
          handleSubmit={handleCreateEventSubmit}
        />
        
      </main>
      <Footer />
    </div>
  );
};

export default EventPage;