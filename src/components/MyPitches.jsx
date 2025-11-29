import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
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
  Edit3,
  Tag,
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
  Loader2
} from 'lucide-react';
import { pitchbacksAPI } from '../services/api';

const MyPitches = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('received');
  const [showPitchModal, setShowPitchModal] = useState(false);
  const [selectedPitch, setSelectedPitch] = useState(null);
  const [pitchResponse, setPitchResponse] = useState('');
  
  // API data states
  const [receivedPitchbacks, setReceivedPitchbacks] = useState([]);
  const [sentPitchbacks, setSentPitchbacks] = useState([]);
  const [matchedPitchbacks, setMatchedPitchbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [actionLoading, setActionLoading] = useState(null);

  const formatTimeAgo = (dateString) => {
    if (!dateString) return 'Recently';
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);
    
    if (diffInSeconds < 60) return 'just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
    if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)} days ago`;
    return date.toLocaleDateString();
  };

  // Load pitchbacks from API
  const loadPitchbacks = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const [receivedRes, sentRes, matchedRes] = await Promise.all([
        pitchbacksAPI.getReceivedPitchbacks(),
        pitchbacksAPI.getSentPitchbacks(),
        pitchbacksAPI.getMatchedPitchbacks()
      ]);
      
      // Filter received to show only pending (not yet responded)
      const allReceived = receivedRes.data.results || receivedRes.data || [];
      setReceivedPitchbacks(allReceived);
      
      setSentPitchbacks(sentRes.data.results || sentRes.data || []);
      
      // Matched = accepted pitchbacks (both sent and received that were accepted)
      const allMatched = matchedRes.data.results || matchedRes.data || [];
      setMatchedPitchbacks(allMatched);
    } catch (err) {
      console.error('Error loading pitchbacks:', err);
      setError('Failed to load pitchbacks. Please try again.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadPitchbacks();
  }, [loadPitchbacks]);

  // Transform API pitchback data for display
  const transformPitchback = (pitchback) => {
    const pitch = pitchback.pitch_details || {};
    const sender = pitchback.sender_details || {};
    const receiver = pitchback.receiver_details || {};
    const senderProfile = sender.profile || {};
    const receiverProfile = receiver.profile || {};
    
    return {
      id: pitchback.id,
      status: pitchback.status,
      createdAt: formatTimeAgo(pitchback.created_at),
      respondedAt: pitchback.responded_at ? formatTimeAgo(pitchback.responded_at) : null,
      compatibility: pitchback.compatibility_score || Math.floor(Math.random() * 20) + 80,
      message: pitchback.message,
      role: pitchback.role,
      skills: pitchback.skills || [],
      experience: pitchback.experience,
      motivation: pitchback.motivation,
      pitch: {
        id: pitch.id,
        title: pitch.title,
        tagline: pitch.tagline,
        description: pitch.description || pitch.tagline,
        problem: pitch.problem,
        solution: pitch.solution,
        industry: pitch.industries?.[0] || 'Technology',
        stage: pitch.stage,
        timeline: pitch.timeline,
        market: pitch.market_size,
        funding: pitch.funding_stage,
        lookingFor: pitch.looking_for_role ? [pitch.looking_for_role] : (pitch.skills_needed || []),
        tags: pitch.industries || []
      },
      sender: {
        id: sender.id,
        name: sender.first_name ? `${sender.first_name} ${sender.last_name || ''}`.trim() : 'Anonymous',
        email: sender.email,
        role: senderProfile.role || pitchback.role || 'Founder',
        location: senderProfile.location || 'Remote',
        avatar: senderProfile.avatar,
        experience: senderProfile.experience || pitchback.experience || '',
        skills: senderProfile.skills || pitchback.skills || [],
        previousStartups: senderProfile.previous_startups || [],
        availability: senderProfile.availability || 'Flexible',
        education: senderProfile.education?.[0] ? 
          `${senderProfile.education[0].degree || ''} from ${senderProfile.education[0].institution || ''}` : '',
        industries: senderProfile.industries || []
      },
      receiver: {
        id: receiver.id,
        name: receiver.first_name ? `${receiver.first_name} ${receiver.last_name || ''}`.trim() : 'Anonymous',
        email: receiver.email,
        role: receiverProfile.role || 'Founder',
        location: receiverProfile.location || 'Remote',
        avatar: receiverProfile.avatar
      }
    };
  };

  const tabs = useMemo(() => [
    { id: 'received', label: 'Received', icon: MessageCircle, count: receivedPitchbacks.filter(p => p.status === 'pending').length },
    { id: 'sent', label: 'Sent', icon: Send, count: sentPitchbacks.length },
    { id: 'matched', label: 'Matched', icon: CheckCircle, count: matchedPitchbacks.length }
  ], [receivedPitchbacks, sentPitchbacks, matchedPitchbacks]);

  const handleAcceptPitch = async (pitchbackId) => {
    setActionLoading(pitchbackId);
    try {
      await pitchbacksAPI.acceptPitchback(pitchbackId);
      await loadPitchbacks();
    } catch (err) {
      console.error('Error accepting pitchback:', err);
      alert('Failed to accept pitchback. Please try again.');
    } finally {
      setActionLoading(null);
    }
  };

  const handleRejectPitch = async (pitchbackId) => {
    setActionLoading(pitchbackId);
    try {
      await pitchbacksAPI.declinePitchback(pitchbackId);
      await loadPitchbacks();
    } catch (err) {
      console.error('Error declining pitchback:', err);
      alert('Failed to decline pitchback. Please try again.');
    } finally {
      setActionLoading(null);
    }
  };

  const handleWithdrawPitch = async (pitchbackId) => {
    setActionLoading(pitchbackId);
    try {
      await pitchbacksAPI.withdrawPitchback(pitchbackId);
      await loadPitchbacks();
    } catch (err) {
      console.error('Error withdrawing pitchback:', err);
      alert('Failed to withdraw pitchback. Please try again.');
    } finally {
      setActionLoading(null);
    }
  };

  const handleRespondToPitch = (pitch) => {
    setSelectedPitch(pitch);
    setShowPitchModal(true);
  };

  const handlePitchback = (pitch) => {
    navigate('/home', { state: { pitchbackPitch: pitch } });
  };

  const handleSendResponse = () => {
    if (selectedPitch && pitchResponse.trim()) {
      console.log('Sending response to pitch:', selectedPitch.id, 'Response:', pitchResponse);
      setShowPitchModal(false);
      setPitchResponse('');
      setSelectedPitch(null);
    }
  };

  const renderSentPitches = () => (
    <div className="space-y-6">
      {sentPitchbacks.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl">
          <Send className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-gray-900 mb-2">No Sent Pitchbacks Yet</h3>
          <p className="text-gray-600 mb-6">Start sending pitchbacks to pitches from the marketplace</p>
          <button
            onClick={() => navigate('/home')}
            className="px-6 py-3 bg-black text-white rounded-xl font-semibold hover:bg-gray-800 transition-all duration-300"
          >
            Go to Marketplace
          </button>
        </div>
      ) : (
        sentPitchbacks.map((pitchbackData) => {
          const pitchback = transformPitchback(pitchbackData);
          return (
          <div key={pitchback.id} className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300">
            {/* Header Section */}
            <div className="flex items-start gap-4 mb-6">
              <div className="w-16 h-16 bg-black rounded-xl flex items-center justify-center">
                <Rocket className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <h3 className="text-2xl font-bold text-gray-900">Pitchback Sent</h3>
                  <span className={`px-3 py-1 text-sm font-semibold rounded-full ${
                    pitchback.status === 'accepted' ? 'bg-green-100 text-green-700' :
                    pitchback.status === 'declined' ? 'bg-red-100 text-red-700' :
                    pitchback.status === 'withdrawn' ? 'bg-gray-100 text-gray-500' :
                    'bg-yellow-100 text-yellow-700'
                  }`}>
                    {pitchback.status}
                  </span>
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <span>{pitchback.createdAt}</span>
                  <span>•</span>
                  <span className="text-gray-600 font-semibold bg-gray-50 px-2 py-1 rounded-full">
                    {pitchback.compatibility}% match
                  </span>
                </div>
              </div>
            </div>

            {/* Pitch Details */}
            <div className="mb-6">
              <h4 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Target className="w-5 h-5" />
                Pitch: {pitchback.pitch.title}
              </h4>
              <div className="bg-gray-50 p-6 rounded-2xl border-2 border-gray-200">
                <div className="space-y-4">
                  <div>
                    <h6 className="text-sm font-medium text-gray-600 mb-1">Description</h6>
                    <p className="text-gray-700 text-sm">{pitchback.pitch.description || pitchback.pitch.tagline}</p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {pitchback.pitch.industry && (
                      <div>
                        <h6 className="text-sm font-medium text-gray-600 mb-1">Industry</h6>
                        <p className="text-gray-900 font-semibold">{pitchback.pitch.industry}</p>
                      </div>
                    )}
                    {pitchback.pitch.stage && (
                      <div>
                        <h6 className="text-sm font-medium text-gray-600 mb-1">Stage</h6>
                        <p className="text-gray-900 font-semibold">{pitchback.pitch.stage}</p>
                      </div>
                    )}
                    {pitchback.pitch.timeline && (
                      <div>
                        <h6 className="text-sm font-medium text-gray-600 mb-1">Timeline</h6>
                        <p className="text-gray-900 font-semibold text-sm">{pitchback.pitch.timeline}</p>
                      </div>
                    )}
                    {pitchback.pitch.funding && (
                      <div>
                        <h6 className="text-sm font-medium text-gray-600 mb-1">Funding Stage</h6>
                        <p className="text-gray-900 font-semibold text-sm">{pitchback.pitch.funding}</p>
                      </div>
                    )}
                  </div>
                  {pitchback.pitch.lookingFor && pitchback.pitch.lookingFor.length > 0 && (
                    <div>
                      <h6 className="text-sm font-medium text-gray-600 mb-2">Looking For</h6>
                      <div className="flex flex-wrap gap-2">
                        {pitchback.pitch.lookingFor.map((role, index) => (
                          <span key={index} className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full">
                            {role}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* My Pitchback Message */}
            <div className="mb-4">
              <h4 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <MessageCircle className="w-4 h-4 text-black" />
                My Pitchback Message
              </h4>
              <div className="bg-gray-50 p-4 rounded-xl">
                <p className="text-gray-700 text-sm leading-relaxed">{pitchback.message || 'No message provided'}</p>
                {pitchback.role && (
                  <p className="text-gray-500 text-xs mt-2">Role: {pitchback.role}</p>
                )}
              </div>
            </div>

            {/* Action Buttons based on status */}
            {pitchback.status === 'pending' && (
              <div className="flex items-center justify-between">
                <button 
                  onClick={() => handleWithdrawPitch(pitchback.id)}
                  disabled={actionLoading === pitchback.id}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors text-sm flex items-center gap-2 disabled:opacity-50"
                >
                  {actionLoading === pitchback.id ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <X className="w-4 h-4" />
                  )}
                  Withdraw
                </button>
              </div>
            )}

            {pitchback.status === 'accepted' && (
              <div className="bg-green-50 p-4 rounded-xl border border-green-200">
                <p className="text-green-700 font-semibold flex items-center gap-2">
                  <CheckCircle className="w-5 h-5" />
                  Your pitchback was accepted! You can now connect.
                </p>
              </div>
            )}

            {pitchback.status === 'declined' && (
              <div className="bg-red-50 p-4 rounded-xl border border-red-200">
                <p className="text-red-700 font-semibold flex items-center gap-2">
                  <X className="w-5 h-5" />
                  Your pitchback was declined.
                </p>
              </div>
            )}
          </div>
        );})
      )}
    </div>
  );

  const renderReceivedPitches = () => (
    <div className="space-y-6">
      {receivedPitchbacks.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl">
          <MessageCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-gray-900 mb-2">No Pitchbacks Received Yet</h3>
          <p className="text-gray-600 mb-6">Create a pitch to start receiving pitchbacks from potential cofounders</p>
          <button
            onClick={() => navigate('/home')}
            className="px-6 py-3 bg-black text-white rounded-xl font-semibold hover:bg-gray-800 transition-all duration-300"
          >
            Create a Pitch
          </button>
        </div>
      ) : (
        receivedPitchbacks.map((pitchbackData) => {
          const pitchback = transformPitchback(pitchbackData);
          return (
        <div key={pitchback.id} className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300">
          {/* Header Section */}
          <div className="flex items-start gap-4 mb-6">
            <div className="w-16 h-16 bg-black rounded-xl flex items-center justify-center overflow-hidden">
              {pitchback.sender.avatar ? (
                <img src={pitchback.sender.avatar} alt={pitchback.sender.name} className="w-full h-full object-cover" />
              ) : (
                <User className="w-6 h-6 text-white" />
              )}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <h3 className="text-2xl font-bold text-gray-900">Pitchback Received</h3>
                <span className={`px-3 py-1 text-sm font-semibold rounded-full ${
                  pitchback.status === 'accepted' ? 'bg-green-100 text-green-700' :
                  pitchback.status === 'declined' ? 'bg-red-100 text-red-700' :
                  'bg-yellow-100 text-yellow-700'
                }`}>
                  {pitchback.status}
                </span>
              </div>
              <div className="flex items-center gap-4 text-sm text-gray-500">
                <span className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  {pitchback.sender.name}
                </span>
                <span>•</span>
                <span>{pitchback.createdAt}</span>
                <span>•</span>
                <span className="text-gray-600 font-semibold bg-gray-50 px-2 py-1 rounded-full">
                  {pitchback.compatibility}% match
                </span>
              </div>
            </div>
          </div>

          {/* Your Pitch Section */}
          <div className="mb-6">
            <h4 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Target className="w-5 h-5" />
              Your Pitch: {pitchback.pitch.title}
            </h4>
            <div className="bg-gray-50 p-6 rounded-2xl border-2 border-gray-200">
              <div className="space-y-4">
                <div>
                  <h6 className="text-sm font-medium text-gray-600 mb-1">Description</h6>
                  <p className="text-gray-700 text-sm">{pitchback.pitch.description || pitchback.pitch.tagline}</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {pitchback.pitch.industry && (
                    <div>
                      <h6 className="text-sm font-medium text-gray-600 mb-1">Industry</h6>
                      <p className="text-gray-900 font-semibold">{pitchback.pitch.industry}</p>
                    </div>
                  )}
                  {pitchback.pitch.stage && (
                    <div>
                      <h6 className="text-sm font-medium text-gray-600 mb-1">Stage</h6>
                      <p className="text-gray-900 font-semibold">{pitchback.pitch.stage}</p>
                    </div>
                  )}
                  {pitchback.pitch.timeline && (
                    <div>
                      <h6 className="text-sm font-medium text-gray-600 mb-1">Timeline</h6>
                      <p className="text-gray-900 font-semibold text-sm">{pitchback.pitch.timeline}</p>
                    </div>
                  )}
                  {pitchback.pitch.funding && (
                    <div>
                      <h6 className="text-sm font-medium text-gray-600 mb-1">Funding Stage</h6>
                      <p className="text-gray-900 font-semibold text-sm">{pitchback.pitch.funding}</p>
                    </div>
                  )}
                </div>
                {pitchback.pitch.lookingFor && pitchback.pitch.lookingFor.length > 0 && (
                  <div>
                    <h6 className="text-sm font-medium text-gray-600 mb-2">Looking For</h6>
                    <div className="flex flex-wrap gap-2">
                      {pitchback.pitch.lookingFor.map((role, index) => (
                        <span key={index} className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full">
                          {role}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Pitchback Message */}
          <div className="mb-4">
            <h4 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <MessageCircle className="w-4 h-4 text-black" />
              Pitchback Message
            </h4>
            <div className="bg-gray-50 p-4 rounded-xl">
              <p className="text-gray-700 text-sm leading-relaxed">{pitchback.message || 'No message provided'}</p>
              {pitchback.role && (
                <p className="text-gray-500 text-xs mt-2">Role: {pitchback.role}</p>
              )}
            </div>
          </div>

          {/* Sender Profile */}
          <div className="mb-6">
            <h4 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <User className="w-5 h-5" />
              Sender Profile
            </h4>
            <div className="bg-gray-50 p-6 rounded-2xl">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-600">Experience</p>
                  <p className="text-gray-900 font-semibold">{pitchback.sender.experience || 'Not specified'}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-600">Education</p>
                  <p className="text-gray-900 font-semibold">{pitchback.sender.education || 'Not specified'}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-600">Availability</p>
                  <p className="text-gray-900 font-semibold">{pitchback.sender.availability || 'Not specified'}</p>
                </div>
                {pitchback.sender.location && (
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-gray-600">Location</p>
                    <p className="text-gray-900 font-semibold flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {pitchback.sender.location}
                    </p>
                  </div>
                )}
              </div>
              {pitchback.sender.skills && pitchback.sender.skills.length > 0 && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <p className="text-sm font-medium text-gray-600 mb-2">Skills</p>
                  <div className="flex flex-wrap gap-2">
                    {pitchback.sender.skills.map((skill, index) => (
                      <span key={index} className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          {pitchback.status === 'pending' && (
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => handleAcceptPitch(pitchback.id)}
                disabled={actionLoading === pitchback.id}
                className="flex-1 py-3 bg-black text-white rounded-xl font-semibold hover:bg-gray-800 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {actionLoading === pitchback.id ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <CheckCircle className="w-4 h-4" />
                )}
                Accept Pitchback
              </button>
              <button
                onClick={() => handleRejectPitch(pitchback.id)}
                disabled={actionLoading === pitchback.id}
                className="flex-1 py-3 bg-gray-600 text-white rounded-xl font-semibold hover:bg-gray-800 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {actionLoading === pitchback.id ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <X className="w-4 h-4" />
                )}
                Decline
              </button>
            </div>
          )}

          {pitchback.status === 'accepted' && (
            <div className="bg-green-50 p-4 rounded-xl border border-green-200">
              <p className="text-green-700 font-semibold flex items-center gap-2">
                <CheckCircle className="w-5 h-5" />
                Match confirmed! You can now connect with this cofounder.
              </p>
            </div>
          )}

          {pitchback.status === 'declined' && (
            <div className="bg-red-50 p-4 rounded-xl border border-red-200">
              <p className="text-red-700 font-semibold flex items-center gap-2">
                <X className="w-5 h-5" />
                You declined this pitchback.
              </p>
            </div>
          )}
        </div>
      );})
      )}
    </div>
  );

  const renderAcceptedMatches = () => (
    <div className="space-y-6">
      {matchedPitchbacks.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl">
          <CheckCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-gray-900 mb-2">No Matches Yet</h3>
          <p className="text-gray-600 mb-6">Accept pitchbacks to connect with potential cofounders</p>
        </div>
      ) : (
        matchedPitchbacks.map((pitchbackData) => {
          const pitchback = transformPitchback(pitchbackData);
          // Determine if user received or sent this pitchback
          const isReceiver = pitchbackData.receiver?.id === pitchbackData.pitch?.author?.id;
          const cofounder = isReceiver ? pitchback.sender : pitchback.pitch?.author || pitchback.sender;
          
          return (
        <div key={pitchback.id} className="bg-white rounded-3xl p-8 shadow-lg border-2 border-gray-200 hover:shadow-xl transition-all duration-300">
          {/* Header Section */}
          <div className="flex items-start gap-6 mb-6">
            <div className="w-20 h-20 bg-black rounded-2xl flex items-center justify-center overflow-hidden">
              {cofounder.avatar ? (
                <img
                  src={cofounder.avatar}
                  alt={cofounder.name}
                  className="w-full h-full rounded-2xl object-cover"
                />
              ) : (
                <User className="w-8 h-8 text-white" />
              )}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <h3 className="text-2xl font-bold text-gray-900">{pitchback.pitch.title}</h3>
                <span className="px-3 py-1 bg-green-100 text-green-700 text-sm font-semibold rounded-full">
                  ✓ Matched
                </span>
              </div>
              <p className="text-gray-600 text-lg mb-3">{pitchback.pitch.tagline || pitchback.pitch.description}</p>
              <div className="flex items-center gap-4 text-sm text-gray-500">
                <span className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  {cofounder.name}
                </span>
                <span>•</span>
                <span>{pitchback.createdAt}</span>
                <span>•</span>
                <span className="text-gray-600 font-semibold bg-gray-50 px-2 py-1 rounded-full">
                  {pitchback.compatibility}% match
                </span>
              </div>
            </div>
          </div>

          {/* Pitch Details */}
          <div className="mb-6">
            <h4 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Target className="w-5 h-5" />
              Pitch Details
            </h4>
            <div className="bg-gray-50 p-6 rounded-2xl border-2 border-gray-200">
              <div className="space-y-4">
                <div>
                  <h6 className="text-sm font-medium text-gray-600 mb-1">Title</h6>
                  <p className="text-gray-900 font-semibold text-lg">{pitchback.pitch.title}</p>
                </div>
                <div>
                  <h6 className="text-sm font-medium text-gray-600 mb-1">Description</h6>
                  <p className="text-gray-700 text-sm">{pitchback.pitch.description || pitchback.pitch.tagline}</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {pitchback.pitch.industry && (
                    <div>
                      <h6 className="text-sm font-medium text-gray-600 mb-1">Industry</h6>
                      <p className="text-gray-900 font-semibold">{pitchback.pitch.industry}</p>
                    </div>
                  )}
                  {pitchback.pitch.stage && (
                    <div>
                      <h6 className="text-sm font-medium text-gray-600 mb-1">Stage</h6>
                      <p className="text-gray-900 font-semibold">{pitchback.pitch.stage}</p>
                    </div>
                  )}
                  {pitchback.pitch.timeline && (
                    <div>
                      <h6 className="text-sm font-medium text-gray-600 mb-1">Timeline</h6>
                      <p className="text-gray-900 font-semibold text-sm">{pitchback.pitch.timeline}</p>
                    </div>
                  )}
                  {pitchback.pitch.funding && (
                    <div>
                      <h6 className="text-sm font-medium text-gray-600 mb-1">Funding Stage</h6>
                      <p className="text-gray-900 font-semibold text-sm">{pitchback.pitch.funding}</p>
                    </div>
                  )}
                </div>
                {pitchback.pitch.lookingFor && pitchback.pitch.lookingFor.length > 0 && (
                  <div>
                    <h6 className="text-sm font-medium text-gray-600 mb-2">Looking For</h6>
                    <div className="flex flex-wrap gap-2">
                      {pitchback.pitch.lookingFor.map((role, index) => (
                        <span key={index} className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full">
                          {role}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Pitchback Message */}
          <div className="mb-6">
            <h4 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <MessageCircle className="w-5 h-5" />
              Pitchback Message
            </h4>
            <div className="bg-gray-50 p-6 rounded-2xl border-2 border-gray-200">
              <div className="space-y-4">
                {pitchback.message && (
                  <div>
                    <h6 className="text-sm font-medium text-gray-600 mb-2">Message</h6>
                    <p className="text-gray-700 text-sm bg-white p-4 rounded-xl leading-relaxed">{pitchback.message}</p>
                  </div>
                )}
                {pitchback.role && (
                  <div>
                    <h6 className="text-sm font-medium text-gray-600 mb-1">Role</h6>
                    <p className="text-gray-900 font-semibold text-sm">{pitchback.role}</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Cofounder Details */}
          <div className="mb-6">
            <h4 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <User className="w-5 h-5" />
              Cofounder Details
            </h4>
            <div className="bg-gray-50 p-6 rounded-2xl">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-600">Name</p>
                  <p className="text-gray-900 font-semibold">{cofounder.name}</p>
                </div>
                {cofounder.role && (
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-gray-600">Role</p>
                    <p className="text-gray-900 font-semibold">{cofounder.role}</p>
                  </div>
                )}
                {cofounder.location && (
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-gray-600">Location</p>
                    <p className="text-gray-900 font-semibold flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {cofounder.location}
                    </p>
                  </div>
                )}
                {cofounder.experience && (
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-gray-600">Experience</p>
                    <p className="text-gray-900 font-semibold">{cofounder.experience}</p>
                  </div>
                )}
                {cofounder.email && (
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-gray-600">Email</p>
                    <a href={`mailto:${cofounder.email}`} className="text-gray-600 hover:text-gray-800 font-semibold flex items-center gap-1">
                      <Mail className="w-4 h-4" />
                      {cofounder.email}
                    </a>
                  </div>
                )}
                {cofounder.education && (
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-gray-600">Education</p>
                    <p className="text-gray-900 font-semibold">{cofounder.education}</p>
                  </div>
                )}
              </div>
              {cofounder.skills && cofounder.skills.length > 0 && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <p className="text-sm font-medium text-gray-600 mb-2">Skills</p>
                  <div className="flex flex-wrap gap-2">
                    {cofounder.skills.map((skill, index) => (
                      <span key={index} className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Next Steps */}
          <div className="mb-8">
            <h4 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Target className="w-5 h-5" />
              Next Steps
            </h4>
            <div className="bg-green-50 p-6 rounded-2xl border border-green-200">
              <p className="text-green-800 text-lg mb-4">🎉 Congratulations on your match! Here's what to do next:</p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-green-100 text-green-700 text-sm rounded-full">✓ Schedule Introduction Call</span>
                <span className="px-3 py-1 bg-green-100 text-green-700 text-sm rounded-full">✓ Discuss Partnership</span>
                <span className="px-3 py-1 bg-green-100 text-green-700 text-sm rounded-full">✓ Plan First Sprint</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button 
              onClick={() => navigate('/sprinto')}
              className="flex-1 py-4 bg-black text-white rounded-2xl font-semibold hover:bg-gray-800 transition-all duration-300 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl"
            >
              <Rocket className="w-5 h-5" />
              Start Sprint
            </button>
            <button className="flex-1 py-4 bg-gray-600 text-white rounded-2xl font-semibold hover:bg-gray-800 transition-all duration-300 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl">
              <Calendar className="w-5 h-5" />
              Schedule Call
            </button>
          </div>
        </div>
      );})
      )}
    </div>
  );

  if (showPitchModal) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div className="bg-white rounded-3xl p-8 max-w-md mx-auto">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Respond to Pitch</h2>
            <p className="text-gray-600">Send a response to this pitch</p>
          </div>
          
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Your Response
            </label>
            <textarea
              value={pitchResponse}
              onChange={(e) => setPitchResponse(e.target.value)}
              placeholder="Thank you for your interest! I'd love to discuss this further..."
              className="w-full h-32 p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-black focus:border-transparent resize-none"
            />
            <p className="text-xs text-gray-500 mt-2">{pitchResponse.length}/500 characters</p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => setShowPitchModal(false)}
              className="flex-1 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSendResponse}
              disabled={!pitchResponse.trim()}
              className="flex-1 py-3 bg-black text-white rounded-xl font-semibold hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
            >
              Send Response
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto p-6">
        {/* Tabs */}
        <div className="mb-8">
          <div className="flex space-x-1 bg-gray-100 p-1 rounded-xl">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl transition-all duration-300 font-semibold ${
                    activeTab === tab.id
                      ? 'bg-white text-gray-600 shadow-sm'
                      : 'text-gray-600 hover:text-gray-600 hover:bg-white/50'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${activeTab === tab.id ? 'text-gray-600' : 'text-gray-500'}`} />
                  <span className="font-semibold">{tab.label}</span>
                  <span className={`px-2 py-1 text-xs rounded-full font-medium ${
                    activeTab === tab.id
                      ? 'bg-gray-100 text-gray-700'
                      : 'bg-gray-200 text-gray-600'
                  }`}>
                    {tab.count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <Loader2 className="w-12 h-12 text-gray-400 animate-spin mx-auto mb-4" />
              <p className="text-gray-600 font-medium">Loading pitchbacks...</p>
            </div>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="bg-red-50 border border-red-200 rounded-2xl p-6 mb-6">
            <div className="flex items-center gap-3">
              <AlertTriangle className="w-6 h-6 text-red-500" />
              <div className="flex-1">
                <h3 className="text-red-800 font-semibold">Error Loading Data</h3>
                <p className="text-red-600 text-sm">{error}</p>
              </div>
              <button
                onClick={loadPitchbacks}
                className="px-4 py-2 bg-red-100 text-red-700 rounded-xl hover:bg-red-200 transition-colors flex items-center gap-2"
              >
                <RefreshCw className="w-4 h-4" />
                Retry
              </button>
            </div>
          </div>
        )}

        {/* Tab Content */}
        {!loading && !error && (
          <>
            {activeTab === 'received' && renderReceivedPitches()}
            {activeTab === 'sent' && renderSentPitches()}
            {activeTab === 'matched' && renderAcceptedMatches()}
          </>
        )}
      </div>
    </div>
  );
};

export default MyPitches;
