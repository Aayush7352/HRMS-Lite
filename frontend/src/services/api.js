import axios from 'axios';

/*
  Backend runs on:
  http://localhost:5500

  All routes are prefixed with /api
*/
const API_BASE_URL =
  process.env.REACT_APP_API_URL || 'http://localhost:5500/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

/* =========================
   EMPLOYEE APIs
========================= */
export const employeeAPI = {
  // GET /api/employees
  getAll: () => api.get('/employees'),

  // POST /api/employees
  create: (data) => api.post('/employees', data),

  // DELETE /api/employees/:id (Mongo _id)
  delete: (id) => api.delete(`/employees/${id}`)
};

/* =========================
   ATTENDANCE APIs
   (MATCHES YOUR ROUTES EXACTLY)
========================= */
export const attendanceAPI = {
  /*
    GET /api/attendance
    Supports:
    ?employeeId=
    ?date=
    ?startDate=
    ?endDate=
  */
  getAll: (params = {}) => api.get('/attendance', { params }),

  /*
    POST /api/attendance
    body: { employeeId, date, status }
  */
  mark: (data) => api.post('/attendance', data),

  /*
    GET /api/attendance/summary/:employeeId
  */
  getSummary: (employeeId) =>
    api.get(`/attendance/summary/${employeeId}`),

  /*
    GET /api/attendance/history/:employeeId?month=YYYY-MM
  */
  getHistory: (employeeId, month) =>
    api.get(`/attendance/history/${employeeId}`, {
      params: { month }
    })
};

/* =========================
   DASHBOARD APIs
========================= */
export const dashboardAPI = {
  // GET /api/dashboard/stats
  getStats: () => api.get('/dashboard/stats')
};

/* =========================
   HEALTH CHECK
========================= */
export const healthCheck = () => api.get('/health');

export default api;