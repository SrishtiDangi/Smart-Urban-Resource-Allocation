import axios from "axios";

const API = axios.create({
    baseURL: "http://127.0.0.1:8888",
    headers: {
        "Content-Type": "application/json",
    },
});

// Dashboard
export const getDashboardData = () =>
    API.get("/dashboard");

// AI Prediction
export const predictOverflow = (data) =>
    API.post("/predict", data);

// Analytics
export const getWasteTrend = () =>
    API.get("/waste-trend");

export const getOverflowSummary = () =>
    API.get("/overflow-summary");

// Ward Monitoring
export const getWardData = () =>
    API.get("/wards");

// Weather
export const getWeather = () =>
    API.get("/weather");

// Prediction History
export const getPredictionHistory = (limit = 50) =>
    API.get(`/history?limit=${limit}`);

// Auth
export const loginUser = (data) =>
    API.post("/login", data);

export const registerUser = (data) =>
    API.post("/register", data);

export const getCurrentUser = (token) =>
    API.get("/me", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

export default API;