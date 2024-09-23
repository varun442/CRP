import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import { 
  Card, 
  CardContent, 
  Typography, 
  TextField, 
  Select, 
  MenuItem, 
  InputLabel, 
  FormControl, 
  Paper, 
  Modal, 
  Fade, 
  Backdrop, 
  Button 
} from '@mui/material';
import { Search, X, Plus, ChevronLeft, ChevronRight } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import EventsPageCard from '../components/EventsPageCard';
import CreateEventModal from '../components/CreateEventModal';
import '../customCalendar.css';
import 'react-big-calendar/lib/css/react-big-calendar.css';

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
        toast.error('Failed to load events. Please try again later.');
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
        display: 'block',
        fontSize: '14px',
        padding: '4px',
        textOverflow: 'ellipsis',
        overflow: 'hidden',
        whiteSpace: 'nowrap'
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
        toast.success('Your event has been submitted for approval!', {
          duration: 4000,
          position: 'top-center',
        });
        setCreateEventModalOpen(false);
        // Optionally, refresh the events list here
      } else {
        throw new Error('Failed to submit event');
      }
    } catch (error) {
      console.error('Error submitting event:', error);
      toast.error('Failed to submit event. Please try again.', {
        duration: 4000,
        position: 'top-center',
      });
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <Toaster />
      <main className="flex-grow p-8 max-w-7xl mx-auto w-full">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-blue-700">Community Events</h1>
          <Button
            variant="contained"
            color="primary"
            startIcon={<Plus size={20} />}
            onClick={handleCreateEventClick}
            className="rounded-full px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            Create Event
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column: Calendar View */}
          <Card className="rounded-lg overflow-hidden shadow-xl">
            <CardContent className="p-0">
              <Calendar
                localizer={localizer}
                events={filteredEvents}
                startAccessor="start"
                endAccessor="end"
                style={{ height: '600px' }}
                eventPropGetter={eventStyleGetter}
                views={['month']}
                defaultView='month'
                onSelectSlot={handleDateSelect}
                selectable
                className="custom-calendar"
                components={{
                  toolbar: CustomToolbar,
                }}
              />
            </CardContent>
          </Card>

          {/* Right Column: Filters and Event Cards */}
          <div className="space-y-8">
            {/* Filters */}
            <Paper elevation={3} className="p-6 bg-white rounded-lg shadow-md">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <TextField
                  variant="outlined"
                  label="Search Events"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  InputProps={{
                    startAdornment: <Search className="mr-2 text-gray-400" size={20} />,
                  }}
                  fullWidth
                />
                <FormControl variant="outlined" fullWidth>
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
                <FormControl variant="outlined" fullWidth>
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

            {/* Event Cards */}
            <div className="space-y-6 overflow-y-auto max-h-[500px] pr-4">
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
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-8 rounded-lg shadow-2xl max-w-lg w-full">
              <button
                onClick={handleCloseModal}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors duration-300"
              >
                <X size={24} />
              </button>
              {selectedEvent ? (
                <EventsPageCard event={selectedEvent} />
              ) : (
                <Typography variant="h6" component="h2" className="text-center text-gray-800">
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

// Custom Toolbar component for the Calendar
const CustomToolbar = (toolbar) => {
  const goToBack = () => {
    toolbar.date.setMonth(toolbar.date.getMonth() - 1);
    toolbar.onNavigate('prev');
  };

  const goToNext = () => {
    toolbar.date.setMonth(toolbar.date.getMonth() + 1);
    toolbar.onNavigate('next');
  };

  const goToCurrent = () => {
    const now = new Date();
    toolbar.date.setMonth(now.getMonth());
    toolbar.date.setYear(now.getFullYear());
    toolbar.onNavigate('current');
  };

  const label = () => {
    const date = moment(toolbar.date);
    return (
      <span className="text-lg font-semibold">{date.format('MMMM YYYY')}</span>
    );
  };

  return (
    <div className="flex items-center justify-between mb-4 px-4 py-2 bg-gray-100 rounded-t-lg">
      <div className="flex items-center space-x-2">
        <button
          onClick={goToBack}
          className="p-2 rounded-full hover:bg-gray-200 transition-colors duration-300"
        >
          <ChevronLeft size={20} />
        </button>
        <button
          onClick={goToNext}
          className="p-2 rounded-full hover:bg-gray-200 transition-colors duration-300"
        >
          <ChevronRight size={20} />
        </button>
      </div>
      <div className="text-gray-800">{label()}</div>
      <button
        onClick={goToCurrent}
        className="px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors duration-300"
      >
        Today
      </button>
    </div>
  );
};

export default EventPage;