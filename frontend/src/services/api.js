import axios from "axios";

const API = axios.create({
  baseURL: "http://127.0.0.1:8888",
});

export const getDashboardData    = () => API.get("/dashboard");
export const predictOverflow     = (data) => API.post("/predict", data);
export const getWasteTrend       = () => API.get("/waste-trend");
export const getOverflowSummary  = () => API.get("/overflow-summary");
export const getWardData         = () => API.get("/wards");
export const getWeather          = () => API.get("/weather");
export const getPredictionHistory = (limit = 50) => API.get(`/history?limit=${limit}`);