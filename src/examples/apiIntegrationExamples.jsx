/**
 * API Integration Examples
 * Copy these patterns into your components to replace mock data with real API calls
 */

// ============================================================================
// EXAMPLE 1: Profile Component Integration
// ============================================================================

import { profileAPI } from '../services/api';

const ProfileComponent = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch profile on component mount
  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await profileAPI.getMyProfile();
      setProfile(response.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load profile');
      console.error('Error fetching profile:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateProfile = async (updatedData) => {
    setLoading(true);
    try {
      await profileAPI.updateProfile(profile.id, updatedData);
      await fetchProfile(); // Refresh data
      // Show success message
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const handleAvatarUpload = async (file) => {
    try {
      const response = await profileAPI.uploadAvatar(file);
      setProfile(prev => ({ ...prev, avatar: response.data.avatar_url }));
    } catch (err) {
      console.error('Avatar upload failed:', err);
    }
  };

  if (loading && !profile) return <div>Loading...</div>;
  if (error && !profile) return <div>Error: {error}</div>;

  return (
    <div>
      {/* Your profile UI */}
    </div>
  );
};

// ============================================================================
// EXAMPLE 2: Pitches Component Integration
// ============================================================================

import { pitchesAPI } from '../services/api';

const PitchesComponent = () => {
  const [pitches, setPitches] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({ status: 'all', search: '' });

  useEffect(() => {
    fetchPitches();
  }, [filters]);

  const fetchPitches = async () => {
    setLoading(true);
    try {
      const response = await pitchesAPI.getMyPitches(filters);
      setPitches(response.data.results || response.data);
    } catch (err) {
      console.error('Error fetching pitches:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreatePitch = async (pitchData) => {
    try {
      await pitchesAPI.createPitch(pitchData);
      await fetchPitches(); // Refresh list
      // Show success message
    } catch (err) {
      console.error('Error creating pitch:', err);
      // Show error message
    }
  };

  const handleRespondToPitch = async (pitchId, response) => {
    try {
      await pitchesAPI.respondToPitch(pitchId, { 
        status: response, 
        message: 'Response message' 
      });
      await fetchPitches();
    } catch (err) {
      console.error('Error responding to pitch:', err);
    }
  };

  const handleArchivePitch = async (pitchId) => {
    try {
      await pitchesAPI.archivePitch(pitchId);
      await fetchPitches();
    } catch (err) {
      console.error('Error archiving pitch:', err);
    }
  };

  return (
    <div>
      {loading ? <LoadingSpinner /> : (
        <div>
          {pitches.map(pitch => (
            <PitchCard 
              key={pitch.id} 
              pitch={pitch}
              onRespond={handleRespondToPitch}
              onArchive={handleArchivePitch}
            />
          ))}
        </div>
      )}
    </div>
  );
};

// ============================================================================
// EXAMPLE 3: Matching Component Integration
// ============================================================================

import { matchingAPI } from '../services/api';

const MatchingComponent = () => {
  const [matches, setMatches] = useState([]);
  const [currentMatch, setCurrentMatch] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    fetchDailyMatches();
  }, []);

  const fetchDailyMatches = async () => {
    try {
      const response = await matchingAPI.getDailyMatches();
      setMatches(response.data.results || response.data);
      setCurrentMatch(response.data.results?.[0] || response.data[0]);
    } catch (err) {
      console.error('Error fetching matches:', err);
    }
  };

  const handleLike = async () => {
    if (!currentMatch) return;
    
    try {
      await matchingAPI.likeMatch(currentMatch.id);
      moveToNextMatch();
    } catch (err) {
      console.error('Error liking match:', err);
    }
  };

  const handlePass = async () => {
    if (!currentMatch) return;
    
    try {
      await matchingAPI.passMatch(currentMatch.id);
      moveToNextMatch();
    } catch (err) {
      console.error('Error passing match:', err);
    }
  };

  const moveToNextMatch = () => {
    const nextIndex = currentIndex + 1;
    if (nextIndex < matches.length) {
      setCurrentIndex(nextIndex);
      setCurrentMatch(matches[nextIndex]);
    } else {
      // No more matches, fetch new ones or show completion
      fetchDailyMatches();
    }
  };

  const getCompatibilityScore = async (userId) => {
    try {
      const response = await matchingAPI.getCompatibilityScore(userId);
      return response.data.score;
    } catch (err) {
      console.error('Error getting compatibility score:', err);
      return null;
    }
  };

  return (
    <div>
      {currentMatch && (
        <div>
          <MatchCard match={currentMatch} />
          <button onClick={handleLike}>Like</button>
          <button onClick={handlePass}>Pass</button>
        </div>
      )}
    </div>
  );
};

// ============================================================================
// EXAMPLE 4: Events Component Integration
// ============================================================================

import { eventsAPI } from '../services/api';

const EventsComponent = () => {
  const [events, setEvents] = useState([]);
  const [filters, setFilters] = useState({
    type: '',
    category: '',
    status: 'upcoming'
  });

  useEffect(() => {
    fetchEvents();
  }, [filters]);

  const fetchEvents = async () => {
    try {
      const response = await eventsAPI.getEvents(filters);
      setEvents(response.data.results || response.data);
    } catch (err) {
      console.error('Error fetching events:', err);
    }
  };

  const handleCreateEvent = async (eventData) => {
    try {
      await eventsAPI.createEvent(eventData);
      await fetchEvents();
      // Show success message
    } catch (err) {
      console.error('Error creating event:', err);
    }
  };

  const handleRegister = async (eventId) => {
    try {
      await eventsAPI.registerForEvent(eventId);
      await fetchEvents(); // Refresh to show updated registration status
      // Show success message
    } catch (err) {
      console.error('Error registering for event:', err);
    }
  };

  const handleUnregister = async (eventId) => {
    try {
      await eventsAPI.unregisterFromEvent(eventId);
      await fetchEvents();
    } catch (err) {
      console.error('Error unregistering from event:', err);
    }
  };

  return (
    <div>
      {events.map(event => (
        <EventCard 
          key={event.id}
          event={event}
          onRegister={handleRegister}
          onUnregister={handleUnregister}
        />
      ))}
    </div>
  );
};

// ============================================================================
// EXAMPLE 5: AI Co-founder Component Integration
// ============================================================================

import { aiCofounderAPI } from '../services/api';

const AICofounderComponent = () => {
  const [messages, setMessages] = useState([]);
  const [conversationId, setConversationId] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSendMessage = async (messageText) => {
    const userMessage = { role: 'user', content: messageText };
    setMessages(prev => [...prev, userMessage]);
    setLoading(true);

    try {
      const response = await aiCofounderAPI.chat({
        message: messageText,
        conversation_id: conversationId
      });

      const aiMessage = { 
        role: 'assistant', 
        content: response.data.reply 
      };
      setMessages(prev => [...prev, aiMessage]);
      
      if (response.data.conversation_id) {
        setConversationId(response.data.conversation_id);
      }
    } catch (err) {
      console.error('Error sending message:', err);
      // Show error message
    } finally {
      setLoading(false);
    }
  };

  const handleAnalyzePitch = async (pitchData) => {
    setLoading(true);
    try {
      const response = await aiCofounderAPI.analyzePitch(pitchData);
      return response.data.analysis;
    } catch (err) {
      console.error('Error analyzing pitch:', err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateIdeas = async (prompt) => {
    setLoading(true);
    try {
      const response = await aiCofounderAPI.generateIdeas({ prompt });
      return response.data.ideas;
    } catch (err) {
      console.error('Error generating ideas:', err);
      return [];
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <ChatInterface 
        messages={messages}
        onSendMessage={handleSendMessage}
        loading={loading}
      />
    </div>
  );
};

// ============================================================================
// EXAMPLE 6: Projects Component Integration
// ============================================================================

import { projectsAPI } from '../services/api';

const ProjectsComponent = () => {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await projectsAPI.getProjects();
      setProjects(response.data.results || response.data);
    } catch (err) {
      console.error('Error fetching projects:', err);
    }
  };

  const handleCreateProject = async (projectData) => {
    try {
      const response = await projectsAPI.createProject(projectData);
      setProjects(prev => [response.data, ...prev]);
      return response.data;
    } catch (err) {
      console.error('Error creating project:', err);
      throw err;
    }
  };

  const handleAddMember = async (projectId, userId) => {
    try {
      await projectsAPI.addMember(projectId, userId);
      await fetchProjects(); // Refresh
    } catch (err) {
      console.error('Error adding member:', err);
    }
  };

  const handleCreateTask = async (projectId, taskData) => {
    try {
      await projectsAPI.createTask(projectId, taskData);
      // Refresh tasks or update local state
    } catch (err) {
      console.error('Error creating task:', err);
    }
  };

  return (
    <div>
      <button onClick={() => handleCreateProject({})}>New Project</button>
      {projects.map(project => (
        <ProjectCard 
          key={project.id}
          project={project}
          onAddMember={handleAddMember}
          onCreateTask={handleCreateTask}
        />
      ))}
    </div>
  );
};

// ============================================================================
// EXAMPLE 7: Error Handling Pattern (Use across all components)
// ============================================================================

const handleAPICall = async (apiCall, successMessage = '') => {
  try {
    const response = await apiCall();
    if (successMessage) {
      // Show success toast/notification
      console.log(successMessage);
    }
    return response.data;
  } catch (error) {
    // Extract error message
    const errorMessage = 
      error.response?.data?.message || 
      error.response?.data?.error ||
      error.message || 
      'An error occurred';
    
    // Show error toast/notification
    console.error(errorMessage);
    
    // Handle specific error codes
    if (error.response?.status === 401) {
      // Redirect to login
      window.location.href = '/auth';
    }
    
    throw error;
  }
};

// Usage:
const fetchData = async () => {
  await handleAPICall(
    () => someAPI.getData(),
    'Data loaded successfully'
  );
};

// ============================================================================
// EXAMPLE 8: Loading States Pattern
// ============================================================================

const ComponentWithLoading = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await someAPI.getData();
        setData(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    
    loadData();
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <ErrorDisplay 
        message={error}
        onRetry={() => window.location.reload()}
      />
    );
  }

  return <div>{/* Your content */}</div>;
};

export {
  ProfileComponent,
  PitchesComponent,
  MatchingComponent,
  EventsComponent,
  AICofounderComponent,
  ProjectsComponent,
  handleAPICall,
  ComponentWithLoading
};
