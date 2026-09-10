const API_BASE = import.meta.env.VITE_API_BASE_URL || '/api';

export const getAuthToken = () => localStorage.getItem('mood_to_move_token');
export const setAuthToken = (token) => localStorage.setItem('mood_to_move_token', token);
export const removeAuthToken = () => localStorage.removeItem('mood_to_move_token');

async function request(endpoint, options = {}) {
  const token = getAuthToken();
  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...(options.headers || {})
  };

  const url = `${API_BASE}${endpoint}`;
  let response;

  try {
    response = await fetch(url, { ...options, headers });
  } catch (err) {
    throw new Error('Unable to connect to server. Please ensure the backend is running.');
  }

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    if (response.status === 401) {
      // If token expired, clean up token
      removeAuthToken();
    }
    const message = data.message || `Request failed with status ${response.status}`;
    throw new Error(message);
  }

  return data;
}

export const api = {
  // Auth
  auth: {
    register: (userData) => request('/auth/register', { method: 'POST', body: JSON.stringify(userData) }),
    login: (credentials) => request('/auth/login', { method: 'POST', body: JSON.stringify(credentials) }),
    demoLogin: () => request('/auth/demo', { method: 'POST' }),
    logout: () => {
      removeAuthToken();
      return request('/auth/logout', { method: 'POST' }).catch(() => ({}));
    },
    getMe: () => request('/auth/me')
  },

  // Users
  users: {
    updateProfile: (data) => request('/users/me', { method: 'PATCH', body: JSON.stringify(data) }),
    savePreferences: (data) => request('/users/preferences', { method: 'POST', body: JSON.stringify(data) })
  },

  // Activities
  activities: {
    getAll: (category) => request(`/activities${category && category !== 'All' ? `?category=${category}` : ''}`),
    getById: (id) => request(`/activities/${id}`)
  },

  // Recommendations
  recommendations: {
    get: (payload) => request('/recommendations', { method: 'POST', body: JSON.stringify(payload) })
  },

  // Moods
  moods: {
    record: (payload) => request('/moods', { method: 'POST', body: JSON.stringify(payload) }),
    getHistory: () => request('/moods/history'),
    getToday: () => request('/moods/today')
  },

  // Sessions
  sessions: {
    create: (payload) => request('/sessions', { method: 'POST', body: JSON.stringify(payload) }),
    getAll: (category) => request(`/sessions${category && category !== 'All' ? `?category=${category}` : ''}`)
  },

  // Statistics
  stats: {
    getDashboard: () => request('/stats/dashboard')
  }
};
