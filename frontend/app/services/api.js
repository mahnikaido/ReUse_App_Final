// app/services/api.js
import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://192.168.15.7:3000', // 👈 seu IP local e porta do backend
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
});

