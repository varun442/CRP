import React, { useState, useEffect } from 'react';
import { getPendingEvents, getApprovedEvents, getRejectedEvents, approveEvent, rejectEvent, fetchUsers } from '../services/api';
import { Home, Calendar, AlertTriangle, CheckCircle, XCircle, Menu, Award } from 'lucide-react';

import AdminLeaderBoard from '../components/AdminLeaderBoard';
import EventsPageCard from '../components/EventsPageCard';
import ConfirmationModal from '../components/ConfirmationModal';
const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [events, setEvents] = useState([]);
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalAction, setModalAction] = useState({ type: '', eventId: '' });

  useEffect(() => {
    if (activeTab === 'dashboard') {
      fetchLeaderboard();
    } else {
      fetchEvents();
    }
  }, [activeTab]);

  const fetchLeaderboard = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const fetchedUsers = await fetchUsers();
      setUsers(fetchedUsers.sort((a, b) => b.points - a.points));
    } catch (error) {
      setError('Failed to fetch leaderboard');
      console.error('Error fetching leaderboard:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchEvents = async () => {
    setIsLoading(true);
    setError(null);
    try {
      let fetchedEvents;
      switch (activeTab) {
        case 'pending':
          fetchedEvents = await getPendingEvents();
          break;
        case 'approved':
          fetchedEvents = await getApprovedEvents();
          break;
        case 'rejected':
          fetchedEvents = await getRejectedEvents();
          break;
        default:
          fetchedEvents = [];
      }
      setEvents(fetchedEvents);
      console.log(fetchEvents);
      
    } catch (error) {
      setError('Failed to fetch events');
      console.error('Error fetching events:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleApprove = (id) => {
    setModalAction({ type: 'approve', eventId: id });
    setModalOpen(true);
  };

  const handleReject = (id) => {
    setModalAction({ type: 'reject', eventId: id });
    setModalOpen(true);
  };

  const confirmAction = async (reason = '') => {
    try {
      if (modalAction.type === 'approve') {
        await approveEvent(modalAction.eventId);
      } else {
        await rejectEvent(modalAction.eventId, reason);
      }
      fetchEvents();
    } catch (error) {
      console.error(`Error ${modalAction.type}ing event:`, error);
    }
    setModalOpen(false);
  };

  const sidebarItems = [
    { name: 'Dashboard', icon: Home, onClick: () => setActiveTab('dashboard') },
    { name: 'Pending Events', icon: Calendar, onClick: () => setActiveTab('pending') },
    { name: 'Approved Events', icon: CheckCircle, onClick: () => setActiveTab('approved') },
    { name: 'Rejected Events', icon: XCircle, onClick: () => setActiveTab('rejected') },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-blue-600 text-white transition-all duration-300 ease-in-out`}>
        <div className="p-4">
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-white">
            <Menu size={24} />
          </button>
        </div>
        <nav className="mt-8">
          {sidebarItems.map((item, index) => (
            <a
              key={index}
              className={`flex items-center py-2 px-4 text-gray-300 hover:bg-blue-700 cursor-pointer ${activeTab === item.name.toLowerCase().split(' ')[0] ? 'bg-blue-700' : ''}`}
              onClick={item.onClick}
            >
              <item.icon className="mr-3" size={20} />
              {sidebarOpen && <span>{item.name}</span>}
            </a>
          ))}
        </nav>
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-x-hidden overflow-y-auto">
        <header className="bg-white shadow">
          <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold text-gray-900">Welcome, Admin</h1>
          </div>
        </header>
        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          {isLoading ? (
            <div className="text-center">Loading...</div>
          ) : error ? (
            <div className="text-center text-red-500">{error}</div>
          ) : activeTab === 'dashboard' ? (
            <AdminLeaderBoard users={users} />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {events.map((event) => (
                <EventsPageCard 
                key={event._id} 
                event={event} 
                onApprove={() => handleApprove(event._id)}
                onReject={() => handleReject(event._id)}
                showActions={activeTab === 'pending'}
              />
              ))}
            </div>
          )}
        </main>
      </div>
      <ConfirmationModal 
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onConfirm={confirmAction}
        action={modalAction.type}
      />
    </div>
  );
};

export default AdminDashboard;