import React, { useState } from 'react';
import { Modal, Box, Typography, TextField, Button, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { X } from 'lucide-react';

const CreateEventModal = ({ open, handleClose, handleSubmit }) => {
  const [eventDetails, setEventDetails] = useState({
    title: '',
    description: '',
    date: '',
    location: '',
    organizer: '', // You might want to get this from the current user's session
    type: '',
    maxAttendees: 50,
    pointsReward: 0
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventDetails(prevDetails => ({
      ...prevDetails,
      [name]: value
    }));
  };

  const onSubmit = (e) => {
  
    e.preventDefault();
    const formattedEvent = {
      ...eventDetails,
      date: new Date(eventDetails.date).toISOString(),
      maxAttendees: parseInt(eventDetails.maxAttendees, 10),
      pointsReward: parseInt(eventDetails.pointsReward, 10),
      organizer:"6141ca9b2c4c3c001f5a1d23"
    };
    console.log(formattedEvent)
    handleSubmit(formattedEvent);
    handleClose();
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="create-event-modal"
      aria-describedby="modal-to-create-new-event"
    >
      <Box sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
        borderRadius: 2,
        maxHeight: '90vh',
        overflowY: 'auto'
      }}>
        <button
          onClick={handleClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          <X size={24} />
        </button>
        <Typography variant="h6" component="h2" mb={2}>
          Create New Event
        </Typography>
        <form onSubmit={onSubmit}>
          <TextField
            fullWidth
            label="Event Title"
            name="title"
            value={eventDetails.title}
            onChange={handleChange}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Description"
            name="description"
            value={eventDetails.description}
            onChange={handleChange}
            margin="normal"
            multiline
            rows={3}
            required
          />
          <TextField
            fullWidth
            label="Date and Time"
            name="date"
            type="datetime-local"
            value={eventDetails.date}
            onChange={handleChange}
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
            required
          />
          <TextField
            fullWidth
            label="Location"
            name="location"
            value={eventDetails.location}
            onChange={handleChange}
            margin="normal"
            required
          />
          <FormControl fullWidth margin="normal" required>
            <InputLabel>Event Type</InputLabel>
            <Select
              name="type"
              value={eventDetails.type}
              onChange={handleChange}
              label="Event Type"
            >
              <MenuItem value="town_hall">Town Hall</MenuItem>
              <MenuItem value="community_event">Community Event</MenuItem>
              <MenuItem value="volunteer_opportunity">Volunteer Opportunity</MenuItem>
            </Select>
          </FormControl>
          <TextField
            fullWidth
            label="Max Attendees"
            name="maxAttendees"
            type="number"
            value={eventDetails.maxAttendees}
            onChange={handleChange}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Points Reward"
            name="pointsReward"
            type="number"
            value={eventDetails.pointsReward}
            onChange={handleChange}
            margin="normal"
            required
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
          >
            Submit for Approval
          </Button>
        </form>
      </Box>
    </Modal>
  );
};

export default CreateEventModal;