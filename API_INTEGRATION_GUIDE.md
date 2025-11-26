# API Integration Guide for Biggmate Frontend

## Overview
This document provides a comprehensive guide for integrating the Django REST API with all frontend components.

## Base Configuration

### Environment Variable
Update `.env` or `.env.local`:
```
VITE_API_URL=http://localhost:8000/api
```

### API Service
Created centralized API service at `src/services/api.js` with:
- Axios instance with interceptors
- Automatic token management
- Token refresh on 401 errors
- All API endpoint methods organized by domain

## Component Integration Status

### ✅ COMPLETED

#### 1. Authentication (Auth.jsx + authSlice.js)
**Status**: Integrated
**Changes**: 
- Updated `src/store/slices/authSlice.js` to use `authAPI` from `services/api.js`
- Using real endpoints: `/auth/login/`, `/auth/register/`, `/auth/logout/`
- Token storage and refresh implemented

---

### 🔄 PENDING INTEGRATION

#### 2. User Profile (EntrepreneurProfile.jsx)
**File**: `src/components/EntrepreneurProfile.jsx`
**API Module**: `profileAPI`
**Required Changes**:
```javascript
import { profileAPI } from '../services/api';

// Replace mock data fetching with:
const fetchProfile = async () => {
  try {
    const response = await profileAPI.getMyProfile();
    setProfile(response.data);
  } catch (error) {
    console.error('Error fetching profile:', error);
  }
};

// Update profile save:
const handleSave = async () => {
  try {
    await profileAPI.updateProfile(profileId, profileData);
    // Success handling
  } catch (error) {
    console.error('Error updating profile:', error);
  }
};

// Avatar upload:
const handleAvatarUpload = async (file) => {
  try {
    const response = await profileAPI.uploadAvatar(file);
    setAvatarUrl(response.data.avatar_url);
  } catch (error) {
    console.error('Error uploading avatar:', error);
  }
};
```

---

#### 3. Pitches (MyPitches.jsx)
**File**: `src/components/MyPitches.jsx`
**API Module**: `pitchesAPI`
**Required Changes**:
```javascript
import { pitchesAPI } from '../services/api';

// Fetch pitches:
const fetchPitches = async () => {
  try {
    const response = await pitchesAPI.getMyPitches({ status, search });
    setPitches(response.data.results);
  } catch (error) {
    console.error('Error fetching pitches:', error);
  }
};

// Create pitch:
const handleCreatePitch = async (pitchData) => {
  try {
    await pitchesAPI.createPitch(pitchData);
    fetchPitches();
  } catch (error) {
    console.error('Error creating pitch:', error);
  }
};

// Respond to pitch:
const handleRespondToPitch = async (pitchId, response) => {
  try {
    await pitchesAPI.respondToPitch(pitchId, response);
    fetchPitches();
  } catch (error) {
    console.error('Error responding to pitch:', error);
  }
};
```

---

#### 4. Pitch Back System (PitchBackSystem.jsx)
**File**: `src/components/PitchBackSystem.jsx`
**API Module**: `pitchbacksAPI`
**Required Changes**:
```javascript
import { pitchbacksAPI } from '../services/api';

// Fetch pitchbacks:
const fetchPitchbacks = async () => {
  try {
    const response = await pitchbacksAPI.getPitchbacks({ status });
    setPitchbacks(response.data.results);
  } catch (error) {
    console.error('Error fetching pitchbacks:', error);
  }
};

// Send pitchback:
const handleSendPitchback = async (pitchbackData) => {
  try {
    const response = await pitchbacksAPI.createPitchback(pitchbackData);
    await pitchbacksAPI.sendPitchback(response.data.id);
    fetchPitchbacks();
  } catch (error) {
    console.error('Error sending pitchback:', error);
  }
};
```

---

#### 5. Co-founder Matching (CofounderMatching.jsx)
**File**: `src/components/CofounderMatching.jsx`
**API Module**: `matchingAPI`
**Required Changes**:
```javascript
import { matchingAPI } from '../services/api';

// Fetch daily matches:
const fetchMatches = async () => {
  try {
    const response = await matchingAPI.getDailyMatches();
    setMatches(response.data.results);
  } catch (error) {
    console.error('Error fetching matches:', error);
  }
};

// Like a match:
const handleLike = async (matchId) => {
  try {
    await matchingAPI.likeMatch(matchId);
    // Move to next match
  } catch (error) {
    console.error('Error liking match:', error);
  }
};

// Pass a match:
const handlePass = async (matchId) => {
  try {
    await matchingAPI.passMatch(matchId);
    // Move to next match
  } catch (error) {
    console.error('Error passing match:', error);
  }
};

// Get compatibility score:
const getCompatibilityScore = async (userId) => {
  try {
    const response = await matchingAPI.getCompatibilityScore(userId);
    return response.data.score;
  } catch (error) {
    console.error('Error getting compatibility:', error);
  }
};
```

---

#### 6. Projects & Workspace (StartupWorkspace.jsx, TeamWorkspace.jsx, ProjectBoard.jsx)
**Files**: Multiple workspace components
**API Module**: `projectsAPI`
**Required Changes**:
```javascript
import { projectsAPI } from '../services/api';

// Fetch projects:
const fetchProjects = async () => {
  try {
    const response = await projectsAPI.getProjects();
    setProjects(response.data.results);
  } catch (error) {
    console.error('Error fetching projects:', error);
  }
};

// Create project:
const handleCreateProject = async (projectData) => {
  try {
    await projectsAPI.createProject(projectData);
    fetchProjects();
  } catch (error) {
    console.error('Error creating project:', error);
  }
};

// Add team member:
const handleAddMember = async (projectId, userId) => {
  try {
    await projectsAPI.addMember(projectId, userId);
    fetchProjects();
  } catch (error) {
    console.error('Error adding member:', error);
  }
};

// Create task:
const handleCreateTask = async (projectId, taskData) => {
  try {
    await projectsAPI.createTask(projectId, taskData);
    fetchTasks(projectId);
  } catch (error) {
    console.error('Error creating task:', error);
  }
};
```

---

#### 7. Skills Dashboard (SkillsDashboard.jsx)
**File**: `src/components/SkillsDashboard.jsx`
**API Module**: `skillsAPI`
**Required Changes**:
```javascript
import { skillsAPI } from '../services/api';

// Fetch skills:
const fetchSkills = async () => {
  try {
    const response = await skillsAPI.getSkills();
    setSkills(response.data.results);
  } catch (error) {
    console.error('Error fetching skills:', error);
  }
};

// Add skill:
const handleAddSkill = async (skillData) => {
  try {
    await skillsAPI.createSkill(skillData);
    fetchSkills();
  } catch (error) {
    console.error('Error adding skill:', error);
  }
};

// Search skills:
const searchSkills = async (query) => {
  try {
    const response = await skillsAPI.searchSkills(query);
    return response.data.results;
  } catch (error) {
    console.error('Error searching skills:', error);
  }
};
```

---

#### 8. Marketplace (Marketplace.jsx)
**File**: `src/components/Marketplace.jsx`
**API Module**: `marketplaceAPI`
**Required Changes**:
```javascript
import { marketplaceAPI } from '../services/api';

// Fetch services:
const fetchServices = async () => {
  try {
    const response = await marketplaceAPI.getServices({ category, search });
    setServices(response.data.results);
  } catch (error) {
    console.error('Error fetching services:', error);
  }
};

// Create order:
const handleCreateOrder = async (orderData) => {
  try {
    await marketplaceAPI.createOrder(orderData);
    // Success handling
  } catch (error) {
    console.error('Error creating order:', error);
  }
};

// Fetch products:
const fetchProducts = async () => {
  try {
    const response = await marketplaceAPI.getProducts({ category });
    setProducts(response.data.results);
  } catch (error) {
    console.error('Error fetching products:', error);
  }
};
```

---

#### 9. Events (Events.jsx)
**File**: `src/components/Events.jsx`
**API Module**: `eventsAPI`
**Required Changes**:
```javascript
import { eventsAPI } from '../services/api';

// Fetch events:
const fetchEvents = async () => {
  try {
    const response = await eventsAPI.getEvents({ 
      type: filterType, 
      category: filterCategory, 
      status: filterStatus 
    });
    setEvents(response.data.results);
  } catch (error) {
    console.error('Error fetching events:', error);
  }
};

// Create event:
const handleCreateEvent = async (eventData) => {
  try {
    await eventsAPI.createEvent(eventData);
    fetchEvents();
  } catch (error) {
    console.error('Error creating event:', error);
  }
};

// Register for event:
const handleRegister = async (eventId) => {
  try {
    await eventsAPI.registerForEvent(eventId);
    fetchEvents();
  } catch (error) {
    console.error('Error registering for event:', error);
  }
};
```

---

#### 10. Messaging (Real-time chat components)
**Files**: Various messaging components
**API Module**: `messagingAPI`
**Required Changes**:
```javascript
import { messagingAPI } from '../services/api';

// Fetch conversations:
const fetchConversations = async () => {
  try {
    const response = await messagingAPI.getConversations();
    setConversations(response.data.results);
  } catch (error) {
    console.error('Error fetching conversations:', error);
  }
};

// Send message:
const handleSendMessage = async (conversationId, messageData) => {
  try {
    await messagingAPI.sendMessage(conversationId, messageData);
    fetchMessages(conversationId);
  } catch (error) {
    console.error('Error sending message:', error);
  }
};

// Mark as read:
const markConversationAsRead = async (conversationId) => {
  try {
    await messagingAPI.markAsRead(conversationId);
  } catch (error) {
    console.error('Error marking as read:', error);
  }
};
```

---

#### 11. Equity Framework (EquityFramework.jsx)
**File**: `src/components/EquityFramework.jsx`
**API Module**: `equityAPI`
**Required Changes**:
```javascript
import { equityAPI } from '../services/api';

// Fetch equity structures:
const fetchEquityStructures = async () => {
  try {
    const response = await equityAPI.getEquityStructures();
    setStructures(response.data.results);
  } catch (error) {
    console.error('Error fetching equity structures:', error);
  }
};

// Calculate equity:
const handleCalculateEquity = async (calculationData) => {
  try {
    const response = await equityAPI.calculateEquity(calculationData);
    setEquityResults(response.data);
  } catch (error) {
    console.error('Error calculating equity:', error);
  }
};

// Create equity structure:
const handleCreateStructure = async (structureData) => {
  try {
    await equityAPI.createEquityStructure(structureData);
    fetchEquityStructures();
  } catch (error) {
    console.error('Error creating equity structure:', error);
  }
};
```

---

#### 12. AI Co-founder (All AI components in ai-cofounder folder)
**Files**: `CoCoach.jsx`, `CoPlan.jsx`, `CoDesign.jsx`, `CoScript.jsx`, etc.
**API Module**: `aiCofounderAPI`
**Required Changes**:
```javascript
import { aiCofounderAPI } from '../../services/api';

// AI Chat:
const handleChat = async (message) => {
  try {
    const response = await aiCofounderAPI.chat({ 
      message, 
      conversation_id: conversationId 
    });
    return response.data.reply;
  } catch (error) {
    console.error('Error in AI chat:', error);
  }
};

// Analyze pitch:
const analyzePitch = async (pitchData) => {
  try {
    const response = await aiCofounderAPI.analyzePitch(pitchData);
    return response.data.analysis;
  } catch (error) {
    console.error('Error analyzing pitch:', error);
  }
};

// Generate ideas:
const generateIdeas = async (prompt) => {
  try {
    const response = await aiCofounderAPI.generateIdeas({ prompt });
    return response.data.ideas;
  } catch (error) {
    console.error('Error generating ideas:', error);
  }
};

// Create business plan:
const createBusinessPlan = async (planData) => {
  try {
    const response = await aiCofounderAPI.createBusinessPlan(planData);
    return response.data.plan;
  } catch (error) {
    console.error('Error creating business plan:', error);
  }
};
```

---

#### 13. Stakeholder CRM (StakeholderCRM.jsx)
**File**: `src/components/StakeholderCRM.jsx`
**API Module**: `stakeholdersAPI`
**Required Changes**:
```javascript
import { stakeholdersAPI } from '../services/api';

// Fetch stakeholders:
const fetchStakeholders = async () => {
  try {
    const response = await stakeholdersAPI.getStakeholders({ 
      category: filterCategory,
      search: searchQuery 
    });
    setStakeholders(response.data.results);
  } catch (error) {
    console.error('Error fetching stakeholders:', error);
  }
};

// Create stakeholder:
const handleCreateStakeholder = async (stakeholderData) => {
  try {
    await stakeholdersAPI.createStakeholder(stakeholderData);
    fetchStakeholders();
  } catch (error) {
    console.error('Error creating stakeholder:', error);
  }
};

// Add interaction:
const handleAddInteraction = async (stakeholderId, interactionData) => {
  try {
    await stakeholdersAPI.addInteraction(stakeholderId, interactionData);
    fetchInteractions(stakeholderId);
  } catch (error) {
    console.error('Error adding interaction:', error);
  }
};
```

---

#### 14. Sprint Tools (All components in sprint-tools folder)
**Files**: `SprintDashboard.jsx`, `ZeroToMVPBuilder.jsx`, `MVPTracker.jsx`, etc.
**API Module**: `sprintToolsAPI`
**Required Changes**:
```javascript
import { sprintToolsAPI } from '../../services/api';

// Fetch sprints:
const fetchSprints = async () => {
  try {
    const response = await sprintToolsAPI.getSprints();
    setSprints(response.data.results);
  } catch (error) {
    console.error('Error fetching sprints:', error);
  }
};

// Create sprint:
const handleCreateSprint = async (sprintData) => {
  try {
    await sprintToolsAPI.createSprint(sprintData);
    fetchSprints();
  } catch (error) {
    console.error('Error creating sprint:', error);
  }
};

// Create task:
const handleCreateTask = async (sprintId, taskData) => {
  try {
    await sprintToolsAPI.createTask(sprintId, taskData);
    fetchTasks(sprintId);
  } catch (error) {
    console.error('Error creating task:', error);
  }
};

// Save MVP builder data:
const handleSaveMVP = async (mvpData) => {
  try {
    await sprintToolsAPI.saveMVPBuilder(mvpData);
  } catch (error) {
    console.error('Error saving MVP:', error);
  }
};
```

---

## Implementation Steps

### Step 1: Update Each Component File
For each component listed above:
1. Import the appropriate API module from `../services/api.js`
2. Replace mock data/functions with real API calls
3. Update error handling to display user-friendly messages
4. Add loading states during API calls

### Step 2: Handle API Responses
Django REST Framework returns data in this format:
```javascript
{
  "success": true,
  "data": {
    "results": [...],  // For list endpoints
    "count": 100,      // Total count
    "next": "url",     // Next page URL
    "previous": null   // Previous page URL
  }
}
```

Update components to access `response.data.results` or `response.data` as needed.

### Step 3: Error Handling Pattern
Use consistent error handling across all components:
```javascript
try {
  const response = await someAPI.method(data);
  // Success handling
} catch (error) {
  const errorMessage = error.response?.data?.message || error.message || 'Operation failed';
  // Display error to user (toast, alert, etc.)
  console.error('Error:', errorMessage);
}
```

### Step 4: Loading States
Add loading states for better UX:
```javascript
const [loading, setLoading] = useState(false);

const fetchData = async () => {
  setLoading(true);
  try {
    const response = await someAPI.getData();
    setData(response.data);
  } catch (error) {
    console.error(error);
  } finally {
    setLoading(false);
  }
};
```

### Step 5: WebSocket Integration (For Real-time Features)
For messaging and notifications, integrate Django Channels WebSocket:
```javascript
const ws = new WebSocket(`ws://localhost:8000/ws/chat/${conversationId}/`);

ws.onmessage = (event) => {
  const data = JSON.parse(event.data);
  // Handle incoming message
};

ws.send(JSON.stringify({
  type: 'chat_message',
  message: messageText
}));
```

---

## Testing Checklist

After integration, test each feature:
- [ ] User Registration & Login
- [ ] Profile View & Update
- [ ] Create & View Pitches
- [ ] Send Pitchbacks
- [ ] Browse & Like Matches
- [ ] Create & Manage Projects
- [ ] Add & Search Skills
- [ ] Browse Marketplace
- [ ] Create & Register for Events
- [ ] Send & Receive Messages
- [ ] Calculate Equity
- [ ] Use AI Co-founder features
- [ ] Manage Stakeholders
- [ ] Create Sprints & Tasks
- [ ] Build MVP

---

## Common Issues & Solutions

### Issue 1: CORS Errors
**Solution**: Ensure Django settings has correct CORS configuration:
```python
CORS_ALLOWED_ORIGINS = ['http://localhost:5173']
```

### Issue 2: 401 Unauthorized
**Solution**: Check that:
1. Token is being sent in Authorization header
2. Token is valid and not expired
3. User is authenticated

### Issue 3: 404 Not Found
**Solution**: Verify:
1. API endpoint URL is correct
2. Django URL patterns are configured
3. Backend server is running

### Issue 4: Token Refresh Not Working
**Solution**: Check:
1. Refresh token is stored in localStorage
2. Refresh endpoint returns new access token
3. Interceptor is configured correctly

---

## Next Steps After Integration

1. **Add Toast Notifications**: Implement user-friendly success/error messages
2. **Add Loading Skeletons**: Improve UX during data fetching
3. **Implement Caching**: Use React Query or SWR for better data management
4. **Add Offline Support**: Implement service worker for offline functionality
5. **Performance Optimization**: Lazy load components, optimize bundle size
6. **Error Boundaries**: Add React error boundaries for graceful error handling

---

## API Documentation

Full API documentation is available at:
- Swagger UI: `http://localhost:8000/api/docs/`
- ReDoc: `http://localhost:8000/api/redoc/`

Use these for detailed endpoint specifications, request/response formats, and testing.
