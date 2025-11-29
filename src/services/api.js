import axios from 'axios';
//import.meta.env.VITE_API_URL ||
// Base API URL from environment variable
const API_BASE_URL =  'http://localhost:8000/api';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle token refresh
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If 401 and we haven't retried yet, try to refresh token
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem('refreshToken');
        if (refreshToken) {
          const response = await axios.post(`${API_BASE_URL}/auth/token/refresh/`, {
            refresh: refreshToken,
          });

          const { access } = response.data;
          localStorage.setItem('accessToken', access);

          // Retry original request with new token
          originalRequest.headers.Authorization = `Bearer ${access}`;
          return api(originalRequest);
        }
      } catch (refreshError) {
        // Refresh failed, logout user
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        window.location.href = '/auth';
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  register: (data) => api.post('/auth/register/', data),
  login: (data) => api.post('/auth/login/', data),
  logout: (data) => api.post('/auth/logout/', data),
  refreshToken: (refresh) => api.post('/auth/token/refresh/', { refresh }),
  getCurrentUser: () => api.get('/auth/me/'),
  updateProfile: (data) => api.patch('/auth/me/', data),
  changePassword: (data) => api.post('/auth/change-password/', data),
  requestPasswordReset: (email) => api.post('/auth/password-reset/', { email }),
  resetPassword: (data) => api.post('/auth/password-reset-confirm/', data),
  verifyEmail: (token) => api.post('/auth/verify-email/', { token }),
  completeOnboarding: (data) => api.post('/auth/onboarding/', data),
  getOnboardingStatus: () => api.get('/auth/onboarding/'),
  getOnboardingOptions: () => api.get('/auth/onboarding/options/'),
};

// Profile API
export const profileAPI = {
  getProfile: (userId) => api.get(`/profiles/${userId}/`),
  updateProfile: (userId, data) => api.patch(`/profiles/${userId}/`, data),
  getMyProfile: () => api.get('/profiles/me/'),
  getComprehensiveProfile: () => api.get('/profiles/comprehensive/'),
  updateComprehensiveProfile: (data) => api.patch('/profiles/comprehensive/', data),
  searchProfiles: (params) => api.get('/profiles/list/', { params }),
  getPublicProfile: (username) => api.get(`/profiles/${username}/`),
  uploadAvatar: (file) => {
    const formData = new FormData();
    formData.append('avatar', file);
    return api.post('/profiles/upload-avatar/', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },
  // Portfolio items
  getPortfolioItems: () => api.get('/profiles/me/portfolio/'),
  createPortfolioItem: (data) => api.post('/profiles/me/portfolio/', data),
  updatePortfolioItem: (id, data) => api.patch(`/profiles/me/portfolio/${id}/`, data),
  deletePortfolioItem: (id) => api.delete(`/profiles/me/portfolio/${id}/`),
  // Testimonials
  getTestimonials: () => api.get('/profiles/me/testimonials/'),
  createTestimonial: (data) => api.post('/profiles/me/testimonials/', data),
  updateTestimonial: (id, data) => api.patch(`/profiles/me/testimonials/${id}/`, data),
  deleteTestimonial: (id) => api.delete(`/profiles/me/testimonials/${id}/`),
};

// Pitches API - matches Django ViewSet at /api/pitches/pitches/
export const pitchesAPI = {
  // List all pitches (public + user's own)
  getAllPitches: (params) => api.get('/pitches/pitches/', { params }),
  // Get user's own pitches
  getMyPitches: (params) => api.get('/pitches/pitches/my_pitches/', { params }),
  // Get a single pitch by ID
  getPitchById: (id) => api.get(`/pitches/pitches/${id}/`),
  // Create a new pitch
  createPitch: (data) => api.post('/pitches/pitches/', data),
  // Update an existing pitch
  updatePitch: (id, data) => api.patch(`/pitches/pitches/${id}/`, data),
  // Delete a pitch
  deletePitch: (id) => api.delete(`/pitches/pitches/${id}/`),
  // Save a pitch (bookmark)
  savePitch: (id) => api.post(`/pitches/pitches/${id}/save/`),
  // Unsave a pitch
  unsavePitch: (id) => api.post(`/pitches/pitches/${id}/unsave/`),
  // Get saved pitches
  getSavedPitches: (params) => api.get('/pitches/pitches/saved/', { params }),
  // Like a pitch
  likePitch: (id) => api.post(`/pitches/pitches/${id}/like/`),
  // Unlike a pitch
  unlikePitch: (id) => api.post(`/pitches/pitches/${id}/unlike/`),
  // Get liked pitches
  getLikedPitches: (params) => api.get('/pitches/pitches/liked/', { params }),
};

// Pitchbacks API
export const pitchbacksAPI = {
  getPitchbacks: (params) => api.get('/pitchbacks/', { params }),
  createPitchback: (data) => api.post('/pitchbacks/', data),
  updatePitchback: (id, data) => api.patch(`/pitchbacks/${id}/`, data),
  deletePitchback: (id) => api.delete(`/pitchbacks/${id}/`),
  sendPitchback: (id) => api.post(`/pitchbacks/${id}/send/`),
};

// Matching API
export const matchingAPI = {
  getMatches: (params) => api.get('/matching/', { params }),
  getMatchById: (id) => api.get(`/matching/${id}/`),
  likeMatch: (id) => api.post(`/matching/${id}/like/`),
  passMatch: (id) => api.post(`/matching/${id}/pass/`),
  getDailyMatches: () => api.get('/matching/daily/'),
  getCompatibilityScore: (userId) => api.get(`/matching/compatibility/${userId}/`),
};

// Projects API
export const projectsAPI = {
  getProjects: (params) => api.get('/projects/', { params }),
  getProjectById: (id) => api.get(`/projects/${id}/`),
  createProject: (data) => api.post('/projects/', data),
  updateProject: (id, data) => api.patch(`/projects/${id}/`, data),
  deleteProject: (id) => api.delete(`/projects/${id}/`),
  addMember: (id, userId) => api.post(`/projects/${id}/add-member/`, { user_id: userId }),
  removeMember: (id, userId) => api.post(`/projects/${id}/remove-member/`, { user_id: userId }),
  createTask: (projectId, data) => api.post(`/projects/${projectId}/tasks/`, data),
  updateTask: (projectId, taskId, data) => api.patch(`/projects/${projectId}/tasks/${taskId}/`, data),
  deleteTask: (projectId, taskId) => api.delete(`/projects/${projectId}/tasks/${taskId}/`),
};

// Skills API
export const skillsAPI = {
  getSkills: (params) => api.get('/skills/', { params }),
  getSkillById: (id) => api.get(`/skills/${id}/`),
  createSkill: (data) => api.post('/skills/', data),
  updateSkill: (id, data) => api.patch(`/skills/${id}/`, data),
  deleteSkill: (id) => api.delete(`/skills/${id}/`),
  searchSkills: (query) => api.get('/skills/search/', { params: { q: query } }),
};

// Marketplace API
export const marketplaceAPI = {
  getServices: (params) => api.get('/marketplace/services/', { params }),
  getServiceById: (id) => api.get(`/marketplace/services/${id}/`),
  createService: (data) => api.post('/marketplace/services/', data),
  updateService: (id, data) => api.patch(`/marketplace/services/${id}/`, data),
  deleteService: (id) => api.delete(`/marketplace/services/${id}/`),
  getProducts: (params) => api.get('/marketplace/products/', { params }),
  getProductById: (id) => api.get(`/marketplace/products/${id}/`),
  createOrder: (data) => api.post('/marketplace/orders/', data),
  getMyOrders: () => api.get('/marketplace/orders/my-orders/'),
};

// Events API
export const eventsAPI = {
  getEvents: (params) => api.get('/events/', { params }),
  getEventById: (id) => api.get(`/events/${id}/`),
  createEvent: (data) => api.post('/events/', data),
  updateEvent: (id, data) => api.patch(`/events/${id}/`, data),
  deleteEvent: (id) => api.delete(`/events/${id}/`),
  registerForEvent: (id) => api.post(`/events/${id}/register/`),
  unregisterFromEvent: (id) => api.post(`/events/${id}/unregister/`),
  getMyEvents: () => api.get('/events/my-events/'),
};

// Messaging API
export const messagingAPI = {
  getConversations: () => api.get('/messaging/conversations/'),
  getConversationById: (id) => api.get(`/messaging/conversations/${id}/`),
  createConversation: (data) => api.post('/messaging/conversations/', data),
  sendMessage: (conversationId, data) => api.post(`/messaging/conversations/${conversationId}/messages/`, data),
  markAsRead: (conversationId) => api.post(`/messaging/conversations/${conversationId}/mark-read/`),
  deleteConversation: (id) => api.delete(`/messaging/conversations/${id}/`),
};

// Equity API
export const equityAPI = {
  getEquityStructures: () => api.get('/equity/structures/'),
  getEquityStructureById: (id) => api.get(`/equity/structures/${id}/`),
  createEquityStructure: (data) => api.post('/equity/structures/', data),
  updateEquityStructure: (id, data) => api.patch(`/equity/structures/${id}/`, data),
  calculateEquity: (data) => api.post('/equity/calculate/', data),
  getVestingSchedules: (structureId) => api.get(`/equity/structures/${structureId}/vesting-schedules/`),
};

// AI Co-founder API
export const aiCofounderAPI = {
  chat: (data) => api.post('/ai-cofounder/chat/', data),
  analyzePitch: (data) => api.post('/ai-cofounder/analyze-pitch/', data),
  generateIdeas: (data) => api.post('/ai-cofounder/generate-ideas/', data),
  createBusinessPlan: (data) => api.post('/ai-cofounder/business-plan/', data),
  reviewContract: (data) => api.post('/ai-cofounder/review-contract/', data),
  getCoachingSession: (sessionId) => api.get(`/ai-cofounder/coaching/${sessionId}/`),
  createCoachingSession: (data) => api.post('/ai-cofounder/coaching/', data),
};

// Stakeholders API
export const stakeholdersAPI = {
  getStakeholders: (params) => api.get('/stakeholders/', { params }),
  getStakeholderById: (id) => api.get(`/stakeholders/${id}/`),
  createStakeholder: (data) => api.post('/stakeholders/', data),
  updateStakeholder: (id, data) => api.patch(`/stakeholders/${id}/`, data),
  deleteStakeholder: (id) => api.delete(`/stakeholders/${id}/`),
  addInteraction: (id, data) => api.post(`/stakeholders/${id}/interactions/`, data),
  getInteractions: (id) => api.get(`/stakeholders/${id}/interactions/`),
};

// Sprint Tools API
export const sprintToolsAPI = {
  getSprints: () => api.get('/sprint-tools/sprints/'),
  getSprintById: (id) => api.get(`/sprint-tools/sprints/${id}/`),
  createSprint: (data) => api.post('/sprint-tools/sprints/', data),
  updateSprint: (id, data) => api.patch(`/sprint-tools/sprints/${id}/`, data),
  deleteSprint: (id) => api.delete(`/sprint-tools/sprints/${id}/`),
  getTasks: (sprintId) => api.get(`/sprint-tools/sprints/${sprintId}/tasks/`),
  createTask: (sprintId, data) => api.post(`/sprint-tools/sprints/${sprintId}/tasks/`, data),
  updateTask: (sprintId, taskId, data) => api.patch(`/sprint-tools/sprints/${sprintId}/tasks/${taskId}/`, data),
  getMVPBuilder: () => api.get('/sprint-tools/mvp-builder/'),
  saveMVPBuilder: (data) => api.post('/sprint-tools/mvp-builder/', data),
};

export default api;
