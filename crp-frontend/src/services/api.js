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

// Add more API functions as needed

export default api;
