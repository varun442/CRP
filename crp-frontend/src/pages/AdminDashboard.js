import React, { useState, useEffect } from 'react';
import { Grid, Paper, Typography, Button, Box, CircularProgress, IconButton, Tooltip, TextField } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Calendar, CheckCircle, XCircle, AlertTriangle, Award, RefreshCcw, Plus, ArrowLeft } from 'lucide-react';

import { getPendingEvents, getApprovedEvents, getRejectedEvents, approveEvent, rejectEvent, fetchUsers } from '../services/api';
import AdminLeaderBoard from '../components/AdminLeaderBoard';
import AdminLessActiveUsers from '../components/AdminLessActiveUsers';
import EventsPageCard from '../components/EventsPageCard';
import ConfirmationModal from '../components/ConfirmationModal';
import AdminOperationsGrid from '../components/AdminOperationsGrid';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  display: 'flex',
  flexDirection: 'column',
  borderRadius: theme.shape.borderRadius,
  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  transition: 'box-shadow 0.3s ease-in-out, transform 0.3s ease-in-out',
  '&:hover': {
    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    transform: 'translateY(-4px)',
  },
}));

const QuickAccessButton = styled(Button)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(2),
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.background.paper,
  color: theme.palette.text.primary,
  transition: 'all 0.3s ease-in-out',
  border: `1px solid ${theme.palette.divider}`,
  '&:hover': {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    transform: 'translateY(-4px)',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  },
}));

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('pending');
  const [events, setEvents] = useState([]);
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalAction, setModalAction] = useState({ type: '', eventId: '' });
  const [selectedOperation, setSelectedOperation] = useState(null);

  useEffect(() => {
    fetchEvents();
    fetchLeaderboard();
  }, [activeTab]);

  const fetchLeaderboard = async () => {
    try {
      const fetchedUsers = await fetchUsers();
      setUsers(fetchedUsers.sort((a, b) => b.points - a.points));
    } catch (error) {
      console.error('Error fetching leaderboard:', error);
    }
  };

  const fetchEvents = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const fetchFunctions = {
        pending: getPendingEvents,
        approved: getApprovedEvents,
        rejected: getRejectedEvents,
      };
      const fetchedEvents = await fetchFunctions[activeTab]();
      setEvents(fetchedEvents);
    } catch (error) {
      setError('Failed to fetch events');
      console.error('Error fetching events:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAction = (type, id) => {
    setModalAction({ type, eventId: id });
    setModalOpen(true);
  };

  const confirmAction = async (reason = '') => {
    try {
      const actionFunction = modalAction.type === 'approve' ? approveEvent : rejectEvent;
      await actionFunction(modalAction.eventId, reason);
      fetchEvents();
    } catch (error) {
      console.error(`Error ${modalAction.type}ing event:`, error);
    }
    setModalOpen(false);
  };

  const renderEventCards = () => (
    <Box sx={{ overflow: 'auto', pr: 2 }}>
      {events.map((event) => (
        <Box key={event._id} sx={{ mb: 2 }}>
          <EventsPageCard 
            event={event} 
            onApprove={() => handleAction('approve', event._id)}
            onReject={() => handleAction('reject', event._id)}
            showActions={activeTab === 'pending'}
          />
        </Box>
      ))}
    </Box>
  );

  const renderContent = () => {
    if (isLoading) return <CircularProgress />;
    if (error) return <Typography color="error">{error}</Typography>;
    return renderEventCards();
  };

  const quickAccessItems = [
    { title: 'Pending Events', icon: Calendar, action: () => { setActiveTab('pending'); setSelectedOperation(null); } },
    { title: 'Approved Events', icon: CheckCircle, action: () => { setActiveTab('approved'); setSelectedOperation(null); } },
    { title: 'Rejected Events', icon: XCircle, action: () => { setActiveTab('rejected'); setSelectedOperation(null); } },
    { title: 'Manage Points', icon: Award, action: () => setSelectedOperation('managePoints') },
    { title: 'Handle Issues', icon: AlertTriangle, action: () => setSelectedOperation('handleIssues') },
  ];

  const renderSelectedOperation = () => {
    switch (selectedOperation) {
      case 'managePoints':
        return (
          <Box>
            <Typography variant="h6" gutterBottom>Manage User Points</Typography>
            <TextField
              fullWidth
              label="User ID"
              variant="outlined"
              margin="normal"
            />
            <TextField
              fullWidth
              label="Points to Add/Remove"
              type="number"
              variant="outlined"
              margin="normal"
            />
            <Button variant="contained" color="primary" sx={{ mt: 2 }}>
              Update Points
            </Button>
          </Box>
        );
      case 'handleIssues':
        return (
          <Box>
            <Typography variant="h6" gutterBottom>Handle Issues</Typography>
            <TextField
              fullWidth
              label="Issue Description"
              multiline
              rows={4}
              variant="outlined"
              margin="normal"
            />
            <Button variant="contained" color="secondary" sx={{ mt: 2 }}>
              Submit Issue
            </Button>
          </Box>
        );
      default:
        return null;
    }
  };

  return (
    <Box sx={{ flexGrow: 1, bgcolor: 'grey.100', minHeight: '100vh', p: { xs: 2, md: 4 } }}>
      <Typography variant="h4" component="h1" gutterBottom sx={{ color: 'primary.main', fontWeight: 'bold', mb: 4 }}>
        Admin Dashboard
      </Typography>
      <Grid container spacing={4} alignItems="flex-start">
        {/* Admin Operations and Inactive Users */}
        <Grid item xs={12} md={3} gap={2}>
        <AdminOperationsGrid quickAccessItems={quickAccessItems} />
            <AdminLessActiveUsers users={users.slice(-5).reverse()} />
        </Grid>

        {/* Events Display or Selected Operation */}
        <Grid item xs={12} md={6}>
          <StyledPaper>
            {selectedOperation ? (
              <Box>
                <Button
                  startIcon={<ArrowLeft size={20} />}
                  onClick={() => setSelectedOperation(null)}
                  sx={{ mb: 2 }}
                >
                  Back to Events
                </Button>
                {renderSelectedOperation()}
              </Box>
            ) : (
              <>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <Typography variant="h6" sx={{ fontWeight: 'semibold' }}>
                    {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Events
                  </Typography>
                  <Box>
                    <Tooltip title="Add new event">
                      <IconButton color="primary" size="small" sx={{ mr: 1 }}>
                        <Plus size={20} />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Refresh events">
                      <IconButton onClick={fetchEvents} size="small" color="primary">
                        <RefreshCcw size={20} />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </Box>
                {renderContent()}
              </>
            )}
          </StyledPaper>
        </Grid>

        {/* Leaderboard */}
        <Grid item xs={12} md={3}>
            <AdminLeaderBoard users={users.slice(0, 10)} />
        </Grid>
      </Grid>
      <ConfirmationModal 
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onConfirm={confirmAction}
        action={modalAction.type}
      />
    </Box>
  );
};

export default AdminDashboard;
