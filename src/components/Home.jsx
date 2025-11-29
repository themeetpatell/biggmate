import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { pitchesAPI } from '../services/api';
import { 
  Send,
  Heart,
  Calendar,
  GraduationCap,
  User,
  Plus,
  Zap,
  Star,
  Clock,
  Eye,
  MessageCircle,
  TrendingUp,
  Users,
  Sparkles,
  Target,
  Award,
  Globe,
  Bell,
  MapPin,
  ChevronRight,
  Info,
  ArrowRight,
  Crown,
  Rocket,
  Diamond,
  Flame,
  Shield,
  ThumbsUp,
  ThumbsDown,
  Share2,
  Bookmark,
  Filter,
  Search,
  X,
  CheckCircle,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Camera,
  Mic,
  MicOff,
  Video,
  Phone,
  Mail,
  ExternalLink,
  Instagram,
  Twitter,
  Linkedin,
  Github,
  Coffee,
  Plane,
  Gamepad2,
  BookOpen,
  BarChart3,
  Activity,
  Compass,
  Badge,
  Gift,
  BellOff,
  EyeOff,
  SortAsc,
  SortDesc,
  RefreshCw,
  Flag,
  MoreHorizontal,
  HelpCircle,
  Lock,
  Unlock,
  Key,
  AlertTriangle,
  AlertOctagon,
  PlusCircle,
  MinusCircle,
  XCircle,
  CheckCircle2,
  Info as InfoIcon,
  HelpCircle as HelpCircleIcon,
  ChevronLeft,
  ChevronDown,
  ChevronUp,
  ArrowLeft,
  ArrowUp,
  ArrowDown,
  Maximize2,
  Minimize2,
  RotateCw,
  RotateCcw,
  ZoomIn,
  ZoomOut,
  Move,
  Copy,
  Scissors,
  Trash2,
  Save,
  Upload,
  Download,
  Link as LinkIcon,
  Link2,
  Unlink,
  KeyRound,
  ShieldCheck,
  ShieldAlert,
  Building2,
  DollarSign,
  Moon,
  Sun,
  Briefcase,
  Loader2
} from 'lucide-react';

const Home = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  
  const [pitches, setPitches] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [likedPitches, setLikedPitches] = useState(new Set());
  const [savedPitches, setSavedPitches] = useState(new Set());
  const [showPitchModal, setShowPitchModal] = useState(false);
  const [selectedPitch, setSelectedPitch] = useState(null);
  const [pitchMessage, setPitchMessage] = useState('');
  const [showCreatePitch, setShowCreatePitch] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedPitchDetails, setSelectedPitchDetails] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('recent');
  const [filters, setFilters] = useState({
    industry: '',
    stage: '',
    location: ''
  });
  
  // Create Pitch Form State
  const [isSubmittingPitch, setIsSubmittingPitch] = useState(false);
  const [pitchFormData, setPitchFormData] = useState({
    title: '',
    tagline: '',
    description: '',
    problem: '',
    solution: '',
    target_market: '',
    market_size: '',
    competitive_advantage: '',
    business_model: '',
    funding_needs: '',
    timeline: '',
    stage: 'idea',
    skills_needed: '',
    industries: '',
    location: '',
    is_public: true
  });
  const [pitchFormErrors, setPitchFormErrors] = useState({});
  const [pitchSubmitSuccess, setPitchSubmitSuccess] = useState(false);

  // Handle pitch form input changes
  const handlePitchFormChange = (field, value) => {
    setPitchFormData(prev => ({
      ...prev,
      [field]: value
    }));
    // Clear error when user starts typing
    if (pitchFormErrors[field]) {
      setPitchFormErrors(prev => ({
        ...prev,
        [field]: null
      }));
    }
  };

  // Validate pitch form
  const validatePitchForm = () => {
    const errors = {};
    if (!pitchFormData.title.trim()) errors.title = 'Startup name is required';
    if (!pitchFormData.tagline.trim()) errors.tagline = 'One-line description is required';
    if (!pitchFormData.problem.trim()) errors.problem = 'Problem description is required';
    if (!pitchFormData.solution.trim()) errors.solution = 'Solution description is required';
    if (!pitchFormData.target_market.trim()) errors.target_market = 'Target market is required';
    setPitchFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Submit pitch to API
  const handleSubmitPitch = async () => {
    if (!validatePitchForm()) return;
    
    setIsSubmittingPitch(true);
    try {
      // Prepare data for API
      const pitchData = {
        title: pitchFormData.title,
        tagline: pitchFormData.tagline,
        description: pitchFormData.description || pitchFormData.tagline,
        problem: pitchFormData.problem,
        solution: pitchFormData.solution,
        target_market: pitchFormData.target_market,
        market_size: pitchFormData.market_size,
        competitive_advantage: pitchFormData.competitive_advantage,
        business_model: pitchFormData.business_model,
        funding_needs: pitchFormData.funding_needs ? parseFloat(pitchFormData.funding_needs.replace(/[^0-9.]/g, '')) : null,
        timeline: pitchFormData.timeline,
        stage: pitchFormData.stage,
        skills_needed: pitchFormData.skills_needed.split(',').map(s => s.trim()).filter(Boolean),
        industries: pitchFormData.industries.split(',').map(s => s.trim()).filter(Boolean),
        is_public: pitchFormData.is_public
      };
      
      await pitchesAPI.createPitch(pitchData);
      
      setPitchSubmitSuccess(true);
      
      // Reset form after success
      setTimeout(() => {
        setPitchSubmitSuccess(false);
        setShowCreatePitch(false);
        setSelectedPitch(null);
        setPitchFormData({
          title: '',
          tagline: '',
          description: '',
          problem: '',
          solution: '',
          target_market: '',
          market_size: '',
          competitive_advantage: '',
          business_model: '',
          funding_needs: '',
          timeline: '',
          stage: 'idea',
          skills_needed: '',
          industries: '',
          location: '',
          is_public: true
        });
        // Reload pitches to show the new one
        loadMorePitches();
      }, 2000);
    } catch (error) {
      console.error('Error creating pitch:', error);
      
      // Handle 401 - demo mode
      if (error.response?.status === 401) {
        setPitchSubmitSuccess(true);
        setTimeout(() => {
          setPitchSubmitSuccess(false);
          setShowCreatePitch(false);
          setSelectedPitch(null);
        }, 2000);
      } else {
        setPitchFormErrors({ submit: error.response?.data?.message || 'Failed to create pitch. Please try again.' });
      }
    } finally {
      setIsSubmittingPitch(false);
    }
  };

  // Mock pitch data with more comprehensive information
  const generateMockPitches = (pageNum) => {
    const basePitches = [
    
    ];

    // Simulate pagination by duplicating and modifying pitches
    // Use pageNum * 1000 + pitch.id to ensure unique IDs across all pages
    return basePitches.map(pitch => ({
      ...pitch,
      id: pageNum * 1000 + pitch.id,
      createdAt: `${Math.floor(Math.random() * 24)} hours ago`,
      metrics: {
        ...pitch.metrics,
        views: pitch.metrics.views + Math.floor(Math.random() * 100),
        likes: pitch.metrics.likes + Math.floor(Math.random() * 20),
        pitches: pitch.metrics.pitches + Math.floor(Math.random() * 10)
      }
    }));
  };

  // Transform API pitch data to match frontend format
  const transformPitchData = (apiPitch) => {
    const stageMap = {
      'idea': { label: 'Idea Stage', color: 'blue' },
      'validation': { label: 'Validation', color: 'yellow' },
      'prototype': { label: 'Prototype', color: 'yellow' },
      'mvp': { label: 'MVP Stage', color: 'green' },
      'growth': { label: 'Growth Stage', color: 'green' },
      'scaling': { label: 'Scale Stage', color: 'green' },
    };
    
    const stageInfo = stageMap[apiPitch.stage] || { label: apiPitch.stage, color: 'gray' };
    
    return {
      id: apiPitch.id,
      title: apiPitch.title,
      shortDescription: apiPitch.tagline,
      description: apiPitch.description,
      industry: apiPitch.industries?.[0] || 'Technology',
      stage: stageInfo.label,
      stageColor: stageInfo.color,
      lookingFor: apiPitch.skills_needed || [],
      author: {
        name: apiPitch.author_details?.first_name 
          ? `${apiPitch.author_details.first_name} ${apiPitch.author_details.last_name || ''}`.trim()
          : 'Anonymous',
        role: 'Founder',
        location: 'Remote',
        avatar: null,
        experience: '',
        previousStartups: [],
        skills: apiPitch.skills_needed || [],
        anonymousProfile: {
          experience: '',
          skills: apiPitch.skills_needed || [],
          previousStartups: [],
          education: '',
          achievements: [],
          workStyle: '',
          availability: ''
        }
      },
      compatibility: Math.floor(Math.random() * 20) + 80, // Random 80-100% for now
      tags: apiPitch.industries || [],
      metrics: {
        views: apiPitch.views_count || 0,
        likes: apiPitch.likes_count || 0,
        saves: apiPitch.saves_count || 0,
        pitches: 0,
        comments: 0
      },
      isLiked: apiPitch.is_liked || false,
      isSaved: apiPitch.is_saved || false,
      timeline: apiPitch.timeline || '',
      market: apiPitch.market_size || '',
      funding: apiPitch.funding_needs ? `Seeking $${Number(apiPitch.funding_needs).toLocaleString()}` : '',
      createdAt: new Date(apiPitch.created_at).toLocaleDateString(),
      imageUrl: null
    };
  };

  // Load pitches from API
  const loadPitchesFromAPI = useCallback(async () => {
    if (loading || !hasMore) return;
    
    setLoading(true);
    try {
      const response = await pitchesAPI.getAllPitches({ page, page_size: 10 });
      const apiPitches = response.data.results || response.data || [];
      
      if (apiPitches.length === 0) {
        setHasMore(false);
        // If no pitches from API on first load, use mock data
        if (page === 1) {
          const mockPitches = generateMockPitches(1);
          setPitches(mockPitches);
        }
      } else {
        // Transform API data to frontend format
        const transformedPitches = apiPitches.map(transformPitchData);
        
        // Update liked/saved sets based on API response
        const newLikedIds = new Set();
        const newSavedIds = new Set();
        transformedPitches.forEach(p => {
          if (p.isLiked) newLikedIds.add(p.id);
          if (p.isSaved) newSavedIds.add(p.id);
        });
        
        setLikedPitches(prev => new Set([...prev, ...newLikedIds]));
        setSavedPitches(prev => new Set([...prev, ...newSavedIds]));
        
        setPitches(prev => {
          const existingIds = new Set(prev.map(p => p.id));
          const uniqueNewPitches = transformedPitches.filter(p => !existingIds.has(p.id));
          return [...prev, ...uniqueNewPitches];
        });
        
        // Check if there are more pages
        const totalCount = response.data.count;
        if (totalCount && pitches.length + apiPitches.length >= totalCount) {
          setHasMore(false);
        }
        
        setPage(prev => prev + 1);
      }
    } catch (error) {
      console.error('Error loading pitches from API:', error);
      
      // Fallback to mock data if API fails
      if (page === 1) {
        console.log('Using mock data - API unavailable');
        const mockPitches = generateMockPitches(page);
        setPitches(mockPitches);
        setPage(prev => prev + 1);
      }
      
      // If it's an auth error or network error after first page, stop loading more
      if (error.response?.status === 401 || !error.response) {
        setHasMore(false);
      }
    } finally {
      setLoading(false);
    }
  }, [loading, hasMore, page, pitches.length]);

  // Load user's liked and saved pitches to show correct states
  const loadUserInteractions = async () => {
    try {
      // Load liked pitches
      const likedResponse = await pitchesAPI.getLikedPitches();
      const likedPitchesData = likedResponse.data.results || likedResponse.data || [];
      const likedIds = new Set(likedPitchesData.map(p => p.id));
      setLikedPitches(likedIds);
      
      // Load saved pitches
      const savedResponse = await pitchesAPI.getSavedPitches();
      const savedPitchesData = savedResponse.data.results || savedResponse.data || [];
      const savedIds = new Set(savedPitchesData.map(p => p.pitch || p.id));
      setSavedPitches(savedIds);
    } catch (error) {
      console.log('Could not load user interactions:', error);
      // Not critical - continue with empty sets
    }
  };

  // Initial load - use ref to prevent double execution in Strict Mode
  const initialLoadDone = React.useRef(false);
  useEffect(() => {
    if (!initialLoadDone.current) {
      initialLoadDone.current = true;
      loadPitchesFromAPI();
      loadUserInteractions();
    }
  }, []);

  // Infinite scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - 1000) {
        loadPitchesFromAPI();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loadPitchesFromAPI]);

  // Handle Like (Heart button)
  const handleLike = async (pitchId) => {
    const isCurrentlyLiked = likedPitches.has(pitchId);
    
    // Optimistically update UI
    setLikedPitches(prev => {
      const newLiked = new Set(prev);
      if (newLiked.has(pitchId)) {
        newLiked.delete(pitchId);
      } else {
        newLiked.add(pitchId);
      }
      return newLiked;
    });
    
    // Update local count
    setPitches(prevPitches => 
      prevPitches.map(pitch => 
        pitch.id === pitchId 
          ? { 
              ...pitch, 
              metrics: { 
                ...pitch.metrics, 
                likes: pitch.metrics.likes + (isCurrentlyLiked ? -1 : 1) 
              } 
            }
          : pitch
      )
    );
    
    // Call API
    try {
      if (isCurrentlyLiked) {
        await pitchesAPI.unlikePitch(pitchId);
      } else {
        await pitchesAPI.likePitch(pitchId);
      }
    } catch (error) {
      console.error('Error liking/unliking pitch:', error);
      // Revert on error
      setLikedPitches(prev => {
        const newLiked = new Set(prev);
        if (isCurrentlyLiked) {
          newLiked.add(pitchId);
        } else {
          newLiked.delete(pitchId);
        }
        return newLiked;
      });
      // Revert count
      setPitches(prevPitches => 
        prevPitches.map(pitch => 
          pitch.id === pitchId 
            ? { 
                ...pitch, 
                metrics: { 
                  ...pitch.metrics, 
                  likes: pitch.metrics.likes + (isCurrentlyLiked ? 1 : -1) 
                } 
              }
            : pitch
        )
      );
    }
  };

  // Handle Save (Bookmark button)
  const handleSave = async (pitchId) => {
    const isCurrentlySaved = savedPitches.has(pitchId);
    
    // Optimistically update UI
    setSavedPitches(prev => {
      const newSaved = new Set(prev);
      if (newSaved.has(pitchId)) {
        newSaved.delete(pitchId);
      } else {
        newSaved.add(pitchId);
      }
      return newSaved;
    });
    
    // Update local count
    setPitches(prevPitches => 
      prevPitches.map(pitch => 
        pitch.id === pitchId 
          ? { 
              ...pitch, 
              metrics: { 
                ...pitch.metrics, 
                saves: (pitch.metrics.saves || 0) + (isCurrentlySaved ? -1 : 1) 
              } 
            }
          : pitch
      )
    );
    
    // Call API
    try {
      if (isCurrentlySaved) {
        await pitchesAPI.unsavePitch(pitchId);
      } else {
        await pitchesAPI.savePitch(pitchId);
      }
    } catch (error) {
      console.error('Error saving/unsaving pitch:', error);
      // Revert on error
      setSavedPitches(prev => {
        const newSaved = new Set(prev);
        if (isCurrentlySaved) {
          newSaved.add(pitchId);
        } else {
          newSaved.delete(pitchId);
        }
        return newSaved;
      });
      // Revert count
      setPitches(prevPitches => 
        prevPitches.map(pitch => 
          pitch.id === pitchId 
            ? { 
                ...pitch, 
                metrics: { 
                  ...pitch.metrics, 
                  saves: (pitch.metrics.saves || 0) + (isCurrentlySaved ? 1 : -1) 
                } 
              }
            : pitch
        )
      );
    }
  };

  const handlePitch = (pitch) => {
    setSelectedPitch(pitch);
    setShowCreatePitch(true);
  };

  const handleSendPitch = () => {
    if (selectedPitch && pitchMessage.trim()) {
      console.log('Sending pitch to:', selectedPitch.id, 'Message:', pitchMessage);
      setShowPitchModal(false);
      setPitchMessage('');
      setSelectedPitch(null);
    }
  };

  const handleCreatePitch = () => {
    setShowCreatePitch(true);
  };

  const handleViewDetails = (pitch) => {
    setSelectedPitchDetails(pitch);
    setShowDetailsModal(true);
  };

  const filteredPitches = pitches.filter(pitch => {
    const matchesSearch = pitch.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         pitch.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         pitch.author.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         pitch.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesIndustry = !filters.industry || pitch.industry === filters.industry;
    const matchesStage = !filters.stage || pitch.stage.includes(filters.stage);
    const matchesLocation = !filters.location || pitch.author.location.includes(filters.location);
    
    return matchesSearch && matchesIndustry && matchesStage && matchesLocation;
  }).sort((a, b) => {
    switch (sortBy) {
      case 'popular':
        return (b.metrics?.likes || 0) - (a.metrics?.likes || 0);
      case 'match':
        return (b.compatibility || 0) - (a.compatibility || 0);
      case 'recent':
      default:
        return new Date(b.createdAt) - new Date(a.createdAt);
    }
  });

  if (showCreatePitch) {
  return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div className="bg-white rounded-3xl p-8 max-w-4xl mx-auto max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                {selectedPitch ? `Pitch to ${selectedPitch.author.name}` : 'Create Your Startup Pitch'}
              </h1>
              <p className="text-gray-600 mt-1">
                {selectedPitch ? `Respond to their pitch: "${selectedPitch.title}"` : 'Share your vision and find the perfect cofounder'}
              </p>
            </div>
            <button
              onClick={() => {
                setShowCreatePitch(false);
                setSelectedPitch(null);
              }}
              className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
            >
              <X className="w-6 h-6 text-gray-500" />
            </button>
          </div>

          <div className="space-y-8">
            {/* Responding to Pitch Section */}
            {selectedPitch && (
              <div className="bg-gray-50 p-6 rounded-2xl border-l-4 border-black">
                <h2 className="text-lg font-semibold text-gray-900 mb-3">Responding to:</h2>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gray-200 rounded-xl flex items-center justify-center">
                    <User className="w-6 h-6 text-gray-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">{selectedPitch.title}</h3>
                    <p className="text-gray-600 text-sm mb-2">{selectedPitch.description}</p>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span>{selectedPitch.author.role} • {selectedPitch.author.location}</span>
                      <span className="px-2 py-1 bg-gray-200 text-gray-700 rounded-full text-xs">
                        {selectedPitch.stage}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Success Message */}
            {pitchSubmitSuccess && (
              <div className="bg-green-50 border border-green-200 rounded-2xl p-6 flex items-center gap-4">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-green-800">Pitch Created Successfully!</h3>
                  <p className="text-green-600 text-sm">Your pitch is now live and visible to potential cofounders.</p>
                </div>
              </div>
            )}

            {/* Error Message */}
            {pitchFormErrors.submit && (
              <div className="bg-red-50 border border-red-200 rounded-2xl p-4 flex items-center gap-3">
                <AlertTriangle className="w-5 h-5 text-red-500" />
                <p className="text-red-700">{pitchFormErrors.submit}</p>
              </div>
            )}

            {/* Startup Overview Section */}
            <div className="bg-gray-50 p-6 rounded-2xl">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Startup Overview</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Startup Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={pitchFormData.title}
                    onChange={(e) => handlePitchFormChange('title', e.target.value)}
                    placeholder="e.g., TechFlow AI, EcoTrack, HealthConnect"
                    className={`w-full p-3 border rounded-xl focus:ring-2 focus:ring-black focus:border-transparent ${pitchFormErrors.title ? 'border-red-500' : 'border-gray-300'}`}
                  />
                  {pitchFormErrors.title && <p className="text-red-500 text-xs mt-1">{pitchFormErrors.title}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Industry
                  </label>
                  <input
                    type="text"
                    value={pitchFormData.industries}
                    onChange={(e) => handlePitchFormChange('industries', e.target.value)}
                    placeholder="e.g., Technology, Healthcare, FinTech (comma separated)"
                    className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-black focus:border-transparent"
                  />
                </div>
              </div>
              
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  One-Line Description <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={pitchFormData.tagline}
                  onChange={(e) => handlePitchFormChange('tagline', e.target.value)}
                  placeholder="e.g., AI-powered workflow automation for remote teams"
                  className={`w-full p-3 border rounded-xl focus:ring-2 focus:ring-black focus:border-transparent ${pitchFormErrors.tagline ? 'border-red-500' : 'border-gray-300'}`}
                />
                {pitchFormErrors.tagline && <p className="text-red-500 text-xs mt-1">{pitchFormErrors.tagline}</p>}
              </div>
            </div>

            {/* Problem & Solution Section */}
            <div className="bg-gray-50 p-6 rounded-2xl">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Problem & Solution</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    What problem are you solving? <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    value={pitchFormData.problem}
                    onChange={(e) => handlePitchFormChange('problem', e.target.value)}
                    placeholder="Describe the specific problem your startup addresses. Who has this problem? How big is the market?"
                    className={`w-full h-24 p-3 border rounded-xl focus:ring-2 focus:ring-black focus:border-transparent resize-none ${pitchFormErrors.problem ? 'border-red-500' : 'border-gray-300'}`}
                  />
                  {pitchFormErrors.problem && <p className="text-red-500 text-xs mt-1">{pitchFormErrors.problem}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Your solution <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    value={pitchFormData.solution}
                    onChange={(e) => handlePitchFormChange('solution', e.target.value)}
                    placeholder="How does your product/service solve this problem? What makes it unique or better than existing solutions?"
                    className={`w-full h-24 p-3 border rounded-xl focus:ring-2 focus:ring-black focus:border-transparent resize-none ${pitchFormErrors.solution ? 'border-red-500' : 'border-gray-300'}`}
                  />
                  {pitchFormErrors.solution && <p className="text-red-500 text-xs mt-1">{pitchFormErrors.solution}</p>}
                </div>
              </div>
            </div>

            {/* Market & Business Section */}
            <div className="bg-gray-50 p-6 rounded-2xl">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Market & Business</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Target Market <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={pitchFormData.target_market}
                    onChange={(e) => handlePitchFormChange('target_market', e.target.value)}
                    placeholder="e.g., Small businesses, Enterprise, Consumers"
                    className={`w-full p-3 border rounded-xl focus:ring-2 focus:ring-black focus:border-transparent ${pitchFormErrors.target_market ? 'border-red-500' : 'border-gray-300'}`}
                  />
                  {pitchFormErrors.target_market && <p className="text-red-500 text-xs mt-1">{pitchFormErrors.target_market}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Business Model
                  </label>
                  <select 
                    value={pitchFormData.business_model}
                    onChange={(e) => handlePitchFormChange('business_model', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-black focus:border-transparent"
                  >
                    <option value="">Select Model</option>
                    <option value="SaaS Subscription">SaaS Subscription</option>
                    <option value="Marketplace">Marketplace</option>
                    <option value="Freemium">Freemium</option>
                    <option value="One-time Purchase">One-time Purchase</option>
                    <option value="Commission-based">Commission-based</option>
                    <option value="Advertising">Advertising</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Market Size
                  </label>
                  <select 
                    value={pitchFormData.market_size}
                    onChange={(e) => handlePitchFormChange('market_size', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-black focus:border-transparent"
                  >
                    <option value="">Select Size</option>
                    <option value="Under $1M">Under $1M</option>
                    <option value="$1M - $10M">$1M - $10M</option>
                    <option value="$10M - $100M">$10M - $100M</option>
                    <option value="$100M - $1B">$100M - $1B</option>
                    <option value="Over $1B">Over $1B</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Current Stage
                  </label>
                  <select 
                    value={pitchFormData.stage}
                    onChange={(e) => handlePitchFormChange('stage', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-black focus:border-transparent"
                  >
                    <option value="idea">Idea Stage</option>
                    <option value="validation">Validation</option>
                    <option value="prototype">Prototype</option>
                    <option value="mvp">MVP</option>
                    <option value="growth">Growth Stage</option>
                    <option value="scaling">Scale Stage</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Cofounder Requirements Section */}
            <div className="bg-gray-50 p-6 rounded-2xl">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Cofounder Requirements</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Required skills & experience
                  </label>
                  <input
                    type="text"
                    value={pitchFormData.skills_needed}
                    onChange={(e) => handlePitchFormChange('skills_needed', e.target.value)}
                    placeholder="e.g., React, Node.js, 5+ years startup experience, B2B sales (comma separated)"
                    className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-black focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Competitive Advantage
                  </label>
                  <textarea
                    value={pitchFormData.competitive_advantage}
                    onChange={(e) => handlePitchFormChange('competitive_advantage', e.target.value)}
                    placeholder="What makes your startup unique? What's your competitive edge?"
                    className="w-full h-20 p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-black focus:border-transparent resize-none"
                  />
                </div>
              </div>
            </div>

            {/* Additional Details */}
            <div className="bg-gray-50 p-6 rounded-2xl">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Additional Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Funding Needs
                  </label>
                  <input
                    type="text"
                    value={pitchFormData.funding_needs}
                    onChange={(e) => handlePitchFormChange('funding_needs', e.target.value)}
                    placeholder="e.g., $500,000"
                    className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-black focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Timeline
                  </label>
                  <select 
                    value={pitchFormData.timeline}
                    onChange={(e) => handlePitchFormChange('timeline', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-black focus:border-transparent"
                  >
                    <option value="">Select Timeline</option>
                    <option value="ASAP">ASAP</option>
                    <option value="Within 1 month">Within 1 month</option>
                    <option value="Within 3 months">Within 3 months</option>
                    <option value="Within 6 months">Within 6 months</option>
                    <option value="Flexible">Flexible</option>
                  </select>
                </div>
              </div>
              
              {/* Visibility Toggle */}
              <div className="mt-4">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={pitchFormData.is_public}
                    onChange={(e) => handlePitchFormChange('is_public', e.target.checked)}
                    className="w-5 h-5 rounded border-gray-300 text-black focus:ring-black"
                  />
                  <span className="text-sm text-gray-700">Make this pitch public (visible to all users)</span>
                </label>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 pt-4">
              <button
                onClick={() => {
                  setShowCreatePitch(false);
                  setSelectedPitch(null);
                  setPitchFormErrors({});
                }}
                disabled={isSubmittingPitch}
                className="flex-1 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmitPitch}
                disabled={isSubmittingPitch || pitchSubmitSuccess}
                className="flex-1 py-3 bg-black text-white rounded-xl font-semibold hover:bg-gray-800 transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isSubmittingPitch ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Creating...
                  </>
                ) : pitchSubmitSuccess ? (
                  <>
                    <CheckCircle className="w-5 h-5" />
                    Created!
                  </>
                ) : (
                  selectedPitch ? 'Send Pitch' : 'Post Pitch'
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (showPitchModal) {
  return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div className="bg-white rounded-3xl p-8 max-w-md mx-auto">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Pitch to {selectedPitch?.author.name}</h2>
            <p className="text-gray-600">Share why you'd make great cofounders</p>
                </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Your Pitch
            </label>
            <textarea
              value={pitchMessage}
              onChange={(e) => setPitchMessage(e.target.value)}
              placeholder="Hi! I'm interested in your startup idea. I think we'd make great cofounders because..."
              className="w-full h-32 p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-gray-900 focus:border-transparent resize-none"
            />
            <p className="text-xs text-gray-500 mt-2">{pitchMessage.length}/500 characters</p>
                </div>

          <div className="flex gap-3">
            <button
              onClick={() => setShowPitchModal(false)}
              className="flex-1 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSendPitch}
              disabled={!pitchMessage.trim()}
              className="flex-1 py-3 bg-gray-900 text-white rounded-xl font-semibold hover:bg-black disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
            >
              Send Pitch
            </button>
              </div>
              </div>
            </div>
    );
  }

  if (showDetailsModal) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          <div className="p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Pitch Details</h2>
              <button
                onClick={() => setShowDetailsModal(false)}
                className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
              >
                <X className="w-6 h-6 text-gray-500" />
              </button>
            </div>

            {selectedPitchDetails && (
              <div className="space-y-6">
                {/* Pitch Header */}
                <div className="flex items-start gap-6">
                  <div className="w-20 h-20 bg-gray-900 rounded-2xl flex items-center justify-center">
                    {selectedPitchDetails.imageUrl ? (
                      <img
                        src={selectedPitchDetails.imageUrl}
                        alt={selectedPitchDetails.title}
                        className="w-full h-full object-cover rounded-2xl"
                      />
                    ) : (
                      <Rocket className="w-10 h-10 text-white" />
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{selectedPitchDetails.title}</h3>
                    <p className="text-gray-600 text-lg mb-4">{selectedPitchDetails.shortDescription}</p>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span className="px-3 py-1 bg-gray-100 rounded-full">{selectedPitchDetails.industry}</span>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        selectedPitchDetails.stageColor === 'green' ? 'bg-gray-100 text-gray-700' :
                        selectedPitchDetails.stageColor === 'yellow' ? 'bg-gray-100 text-gray-700' :
                        selectedPitchDetails.stageColor === 'blue' ? 'bg-gray-100 text-gray-700' :
                        'bg-gray-100 text-gray-700'
                      }`}>
                        {selectedPitchDetails.stage}
                      </span>
                      <span className="text-gray-600 font-semibold">{selectedPitchDetails.compatibility}% match</span>
          </div>
        </div>
                </div>

                {/* Anonymous Founder Info - Simplified */}
                <div className="bg-gray-50 rounded-2xl p-6">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 bg-black rounded-2xl flex items-center justify-center">
                      <User className="w-8 h-8 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-xl font-bold text-gray-900 truncate mr-2 blur-sm select-none">
                          {selectedPitchDetails.author.name}
                        </h4>
                        <span className="text-sm text-gray-600 font-semibold bg-gray-50 px-3 py-1 rounded-full whitespace-nowrap flex-shrink-0">
                          {selectedPitchDetails.compatibility}% match
                        </span>
                      </div>
                      <p className="text-gray-600 mb-1">{selectedPitchDetails.author.role}</p>
                      <p className="text-sm text-gray-500 flex items-center gap-1">
                        <MapPin className="w-4 h-4 text-black" />
                        {selectedPitchDetails.author.location}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                <div>
                        <h5 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                          <Briefcase className="w-4 h-4 text-black" />
                          Experience
                        </h5>
                        <p className="text-gray-700 text-sm">{selectedPitchDetails.author.anonymousProfile?.experience}</p>
          </div>
                      
                      <div>
                        <h5 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                          <GraduationCap className="w-4 h-4 text-black" />
                          Education
                        </h5>
                        <p className="text-gray-700 text-sm">{selectedPitchDetails.author.anonymousProfile?.education}</p>
              </div>
                </div>
                    
                    <div className="space-y-4">
                      <div>
                        <h5 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                          <Zap className="w-4 h-4 text-black" />
                          Work Style
                        </h5>
                        <p className="text-gray-700 text-sm">{selectedPitchDetails.author.anonymousProfile?.workStyle}</p>
                      </div>
                      
                      <div>
                        <h5 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                          <Clock className="w-4 h-4 text-black" />
                          Availability
                        </h5>
                        <p className="text-gray-700 text-sm">{selectedPitchDetails.author.anonymousProfile?.availability}</p>
                      </div>
            </div>
          </div>

                  {/* Skills */}
                  <div className="mt-6">
                    <h5 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                      <Star className="w-4 h-4 text-black" />
                      Skills & Expertise
                    </h5>
                    <div className="flex flex-wrap gap-2">
                      {(selectedPitchDetails.author.anonymousProfile?.skills || []).map((skill, index) => (
                        <span key={index} className="px-3 py-1 bg-gray-200 text-gray-700 text-sm rounded-full">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Previous Ventures & Achievements */}
                  <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                      <h5 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                        <Rocket className="w-4 h-4 text-black" />
                        Previous Ventures
                      </h5>
                      <div className="space-y-2">
                        {(selectedPitchDetails.author.anonymousProfile?.previousStartups || []).map((startup, index) => (
                          <div key={index} className="flex items-center gap-2 text-sm text-gray-700">
                            <div className="w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
                            <span>{startup}</span>
              </div>
                        ))}
              </div>
            </div>
                    
                    <div>
                      <h5 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                        <Award className="w-4 h-4 text-black" />
                        Key Achievements
                      </h5>
                      <div className="space-y-2">
                        {(selectedPitchDetails.author.anonymousProfile?.achievements || []).map((achievement, index) => (
                          <div key={index} className="flex items-center gap-2 text-sm text-gray-700">
                            <div className="w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
                            <span>{achievement}</span>
                          </div>
                        ))}
                      </div>
            </div>
        </div>

                  {/* Compatibility Score */}
                  <div className="mt-6 bg-white rounded-xl p-4 text-center">
                    <div className="text-3xl font-bold text-gray-600 mb-1">{selectedPitchDetails.compatibility}%</div>
                    <div className="text-sm text-gray-600">Compatibility Match</div>
                  </div>
                </div>

                {/* Detailed Description */}
              <div>
                  <h4 className="text-lg font-bold text-gray-900 mb-3">Detailed Description</h4>
                  <p className="text-gray-700 leading-relaxed">{selectedPitchDetails.description}</p>
              </div>

                {/* Market & Funding Info */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-gray-50 rounded-xl p-4">
                    <h5 className="font-semibold text-gray-900 mb-2">Timeline</h5>
                    <p className="text-sm text-gray-600">{selectedPitchDetails.timeline}</p>
              </div>
                  <div className="bg-gray-50 rounded-xl p-4">
                    <h5 className="font-semibold text-gray-900 mb-2">Market Size</h5>
                    <p className="text-sm text-gray-600">{selectedPitchDetails.market}</p>
            </div>
                  <div className="bg-gray-50 rounded-xl p-4">
                    <h5 className="font-semibold text-gray-900 mb-2">Funding Stage</h5>
                    <p className="text-sm text-gray-600">{selectedPitchDetails.funding}</p>
                        </div>
                    </div>
                    
                {/* Looking For */}
              <div>
                  <h4 className="text-lg font-bold text-gray-900 mb-3">Looking For</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedPitchDetails.lookingFor.map((role, index) => (
                      <span key={index} className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full font-medium">
                        {role}
                      </span>
                    ))}
                    </div>
                        </div>

                {/* Tags */}
              <div>
                  <h4 className="text-lg font-bold text-gray-900 mb-3">Tags</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedPitchDetails.tags.map((tag, index) => (
                      <span key={index} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                        {tag}
                      </span>
                    ))}
                      </div>
            </div>

                {/* Metrics */}
                <div className="bg-gray-50 rounded-xl p-4">
                  <h4 className="text-lg font-bold text-gray-900 mb-3">Engagement Metrics</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-gray-900">{selectedPitchDetails.metrics.views}</div>
                      <div className="text-sm text-gray-600">Views</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-gray-900">{selectedPitchDetails.metrics.likes}</div>
                      <div className="text-sm text-gray-600">Likes</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-gray-900">{selectedPitchDetails.metrics.pitches}</div>
                      <div className="text-sm text-gray-600">Pitches</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-gray-900">{selectedPitchDetails.compatibility}%</div>
                      <div className="text-sm text-gray-600">Match</div>
                    </div>
                        </div>
                      </div>

                {/* Action Buttons */}
                <div className="flex gap-4 pt-4">
                  <button
                    onClick={() => handlePitch(selectedPitchDetails)}
                    className="flex-1 py-3 bg-black text-white rounded-xl font-semibold hover:bg-gray-800 transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <Send className="w-5 h-5" />
                    Send Pitch
                  </button>
                  <button
                    onClick={() => handleLike(selectedPitchDetails.id)}
                    className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
                      likedPitches.has(selectedPitchDetails.id)
                        ? 'bg-gray-600 text-white hover:bg-gray-800'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    <Heart className={`w-5 h-5 ${likedPitches.has(selectedPitchDetails.id) ? 'fill-current' : ''}`} />
                    {likedPitches.has(selectedPitchDetails.id) ? 'Liked' : 'Like'}
                  </button>
                  <button className="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-all duration-300 flex items-center justify-center gap-2">
                    <Share2 className="w-5 h-5" />
                    Share
                  </button>
                      </div>
              </div>
            )}
            </div>
        </div>
      </div>
    );
  }

                  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div>
              <h1 className="text-2xl font-bold text-gray-900">Discover Pitches</h1>
              <p className="text-gray-600">Find your next cofounder or share your idea</p>
                      </div>
            <button
              onClick={handleCreatePitch}
              className="px-6 py-3 bg-black text-white rounded-xl font-semibold hover:bg-gray-800 transition-all duration-300 flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              Create Pitch
            </button>
              </div>

          {/* Search and Filters */}
          <div className="flex items-center gap-4 mt-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search pitches, founders, or keywords..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-gray-900 focus:border-transparent"
              />
            </div>
            <select
              value={filters.industry}
              onChange={(e) => setFilters({...filters, industry: e.target.value})}
              className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-black focus:border-transparent bg-white"
            >
              <option value="">All Industries</option>
              <option value="Sustainability">Sustainability</option>
              <option value="Fintech">Fintech</option>
              <option value="HealthTech">HealthTech</option>
              <option value="EdTech">EdTech</option>
              <option value="AI/ML">AI/ML</option>
            </select>
            <select
              value={filters.stage}
              onChange={(e) => setFilters({...filters, stage: e.target.value})}
              className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-black focus:border-transparent bg-white"
            >
              <option value="">All Stages</option>
              <option value="Idea">Idea Stage</option>
              <option value="MVP">MVP Stage</option>
              <option value="Beta">Beta Stage</option>
              <option value="Launched">Launched</option>
            </select>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-black focus:border-transparent bg-white"
            >
              <option value="recent">Most Recent</option>
              <option value="popular">Most Popular</option>
              <option value="match">Best Match</option>
            </select>
          </div>

                        </div>
                    </div>
                    
      {/* Pitches Grid */}
      <div className="max-w-7xl mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredPitches.map((pitch) => (
            <div key={pitch.id} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              {/* Pitch Header */}
              <div className="p-6 pb-4">
                <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-1">{pitch.title}</h3>
                    <div className="flex items-center gap-2">
                      <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                        pitch.stageColor === 'green' ? 'bg-gray-100 text-gray-700' :
                        pitch.stageColor === 'yellow' ? 'bg-gray-100 text-gray-700' :
                        pitch.stageColor === 'blue' ? 'bg-gray-100 text-gray-700' :
                        'bg-gray-100 text-gray-700'
                      }`}>
                        {pitch.stage}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleLike(pitch.id)}
                      className={`p-2 rounded-xl transition-colors ${
                        likedPitches.has(pitch.id) 
                          ? 'bg-gray-100 text-gray-500' 
                          : 'hover:bg-gray-100 text-gray-500'
                      }`}
                    >
                      <Heart className={`w-5 h-5 ${likedPitches.has(pitch.id) ? 'fill-current' : ''}`} />
                    </button>
                    <button className="p-2 hover:bg-gray-100 rounded-xl transition-colors text-gray-500">
                      <Bookmark className="w-5 h-5" />
                    </button>
                    <button className="p-2 hover:bg-gray-100 rounded-xl transition-colors text-gray-500">
                      <Share2 className="w-5 h-5" />
                    </button>
              </div>
            </div>
                <p className="text-gray-700 text-sm mb-4">{pitch.shortDescription}</p>
          </div>

              {/* Anonymous Founder Info - Clean */}
              <div className="px-6 pb-4">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-black rounded-xl flex items-center justify-center">
                    <User className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-semibold text-gray-900 truncate mr-2 blur-sm select-none">
                        {pitch.author.name}
                      </h4>
                      <span className="text-sm text-gray-600 font-semibold bg-gray-50 px-2 py-1 rounded-full whitespace-nowrap flex-shrink-0">
                        {pitch.compatibility}% match
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">
                      {pitch.author.role} • {pitch.author.location}
                    </p>
                  </div>
                </div>
                
                <p className="text-gray-700 text-sm mb-4">{pitch.shortDescription}</p>
                
                {/* Key Details - Inline */}
                <div className="space-y-2 text-xs text-gray-600">
                  <div className="flex items-center gap-2">
                    <Briefcase className="w-3 h-3 text-black" />
                    <span>{pitch.author.anonymousProfile?.experience}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <GraduationCap className="w-3 h-3 text-black" />
                    <span>{pitch.author.anonymousProfile?.education}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Zap className="w-3 h-3 text-black" />
                    <span>{pitch.author.anonymousProfile?.workStyle}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-3 h-3 text-black" />
                    <span>{pitch.author.anonymousProfile?.availability}</span>
                  </div>
                </div>
                
                {/* Skills */}
                <div className="mt-3">
                  <div className="flex flex-wrap gap-1">
                    {(pitch.author.anonymousProfile?.skills || []).slice(0, 4).map((skill, index) => (
                      <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                        {skill}
                      </span>
                    ))}
                    {(pitch.author.anonymousProfile?.skills || []).length > 4 && (
                      <span className="px-2 py-1 bg-gray-200 text-gray-600 text-xs rounded-full">
                        +{(pitch.author.anonymousProfile?.skills || []).length - 4}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Tags */}
              <div className="px-6 pb-4">
                <div className="flex flex-wrap gap-2">
                  {pitch.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                        </div>
                      </div>

              {/* Metrics */}
              <div className="px-6 pb-4">
                <div className="flex items-center gap-6 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <Eye className="w-4 h-4" />
                    <span>{pitch.metrics.views}</span>
                </div>
                  <div className="flex items-center gap-1">
                    <Heart className="w-4 h-4" />
                    <span>{pitch.metrics.likes}</span>
            </div>
                  <div className="flex items-center gap-1">
                    <MessageCircle className="w-4 h-4" />
                    <span>{pitch.metrics.pitches}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{pitch.createdAt}</span>
                  </div>
          </div>
        </div>

              {/* Looking For */}
              <div className="px-6 pb-4">
                <div className="mb-2">
                  <span className="text-sm font-medium text-gray-700">Looking for:</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {pitch.lookingFor.map((role, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full font-medium"
                    >
                      {role}
                    </span>
                  ))}
                        </div>
                      </div>

              {/* Action Buttons */}
              <div className="px-6 pb-6">
                <div className="flex gap-3">
                  <button
                    onClick={() => handleViewDetails(pitch)}
                    className="flex-1 py-3 px-4 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <Eye className="w-4 h-4" />
                    View Details
                  </button>
                  <button
                    onClick={() => handlePitch(pitch)}
                    className="flex-1 py-3 px-4 bg-black text-white rounded-xl font-semibold hover:bg-gray-800 transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    Send Pitch
                  </button>
          </div>
        </div>
          </div>
          ))}
      </div>

        {/* Loading Indicator */}
        {loading && (
          <div className="flex justify-center py-8">
            <div className="flex items-center gap-2 text-gray-600">
              <div className="w-5 h-5 border-2 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
              <span>Loading more pitches...</span>
            </div>
          </div>
        )}

        {/* End of Results */}
        {!hasMore && !loading && (
          <div className="text-center py-8">
            <p className="text-gray-500">You've reached the end of the pitch feed!</p>
        </div>
        )}
      </div>
    </div>
  );
};

export default Home;