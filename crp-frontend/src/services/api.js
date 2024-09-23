// src/services/api.js

import axios from "axios";

const API_URL = "http://localhost:5000/api"; // Adjust this to match your backend URL

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add a request interceptor to include the auth token in all requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export const login = async (email, password) => {
  try {
    const response = await fetch("http://localhost:5000/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    console.log("Response status:", response.status);
    console.log("Response headers:", response.headers);

    const responseText = await response.text();
    console.log("Response text:", responseText);

    if (!response.ok) {
      throw new Error(`Login failed: ${response.status} ${responseText}`);
    }

    return JSON.parse(responseText);
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
};
export const signup = async (userData) => {
  try {
    const response = await api.post("/users/signup", userData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
export const getEvents = async () => {
  const response = await api.get("/events");
  console.log(response);
  return response.data;
};
export const createEvent = async (eventData) => {
  const response = await api.post("/events", eventData);
  return response.data;
};
export const getIssues = async () => {
  const response = await api.get("/issues");
  return response.data;
};
export const createIssue = async (issueData) => {
  const response = await api.post("/issues", issueData);
  return response.data;
};
export const getForumPosts = async () => {
  const response = await api.get("/forums");
  return response.data;
};
export const createForumPost = async (postData) => {
  const response = await api.post("/forums", postData);
  return response.data;
};
export const fetchUsers = async () => {
  try {
    const response = await fetch('http://localhost:5000/api/users/');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('There was a problem with the fetch operation:', error);
    throw error;
  }
};
export const getUserPoints = async (userId) => {
  const response = await api.get(`/points/${userId}`);
  return response.data;
};
export const updateUserPoints = async (userId, pointsData) => {
  const response = await api.post(`/points/${userId}`, pointsData);
  return response.data;
};

// Add these functions to your existing api.js file

// Fetch pending events
export const getPendingEvents = async () => {
  try {
    const response = await api.get("/events/pending");
    return response.data;
  } catch (error) {
    console.error("Error fetching pending events:", error);
    throw error;
  }
};

// Fetch approved events
export const getApprovedEvents = async () => {
  try {
    const response = await api.get("/events/approved");
    return response.data;
  } catch (error) {
    console.error("Error fetching approved events:", error);
    throw error;
  }
};

// Fetch rejected events
export const getRejectedEvents = async () => {
  try {
    const response = await api.get("/events/rejected");
    return response.data;
  } catch (error) {
    console.error("Error fetching rejected events:", error);
    throw error;
  }
};

// Approve an event
export const approveEvent = async (eventId) => {
  try {
    const response = await api.post(`/events/approve/${eventId}`);
    return response.data;
  } catch (error) {
    console.error("Error approving event:", error);
    throw error;
  }
};

// Reject an event
export const rejectEvent = async (eventId, rejectionReason) => {
  try {
    const response = await api.post(`/events/reject/${eventId}`, { rejectionReason });
    return response.data;
  } catch (error) {
    console.error("Error rejecting event:", error);
    throw error;
  }
};
// Add more API functions as needed

export default api;
