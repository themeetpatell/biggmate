import React, { useState, useEffect, useMemo } from 'react';
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
  Sun
} from 'lucide-react';

const MyPitches = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('received');
  const [showPitchModal, setShowPitchModal] = useState(false);
  const [selectedPitch, setSelectedPitch] = useState(null);
  const [pitchResponse, setPitchResponse] = useState('');

  const formatTimeAgo = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);
    
    if (diffInSeconds < 60) return 'just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
    if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)} days ago`;
    return date.toLocaleDateString();
  };

  const loadSentPitches = () => {
    const storedPitches = JSON.parse(localStorage.getItem('sentPitches') || '[]');
    return storedPitches.map(pitch => ({
      ...pitch,
      sentAt: formatTimeAgo(pitch.sentAt)
    }));
  };

  const [sentPitches, setSentPitches] = useState(() => {
    const stored = loadSentPitches();
    const mock = [
    {
      id: 1,
      pitchId: 101,
      status: "pending",
      sentAt: "2 hours ago",
      compatibility: 92,
      // Anonymous pitch they sent a pitchback to
      anonymousPitch: {
        title: "EcoTrack AI",
        description: "Revolutionary platform that helps companies track and reduce their carbon footprint using advanced AI algorithms. Our solution provides real-time monitoring, predictive analytics, and actionable insights to help businesses achieve their sustainability goals.",
        industry: "Sustainability",
        stage: "MVP Stage",
        founderRole: "Business Co-founder",
        founderLocation: "San Francisco, CA",
        founderSkills: ["Operations", "Strategy", "Fundraising"],
        timeline: "6-12 months to market",
        market: "Carbon management software market ($12B)",
        funding: "Pre-seed, seeking $500K",
        equityOffer: "10-15% for technical cofounder",
        lookingFor: ["Technical Co-founder", "UI/UX Designer"],
        tags: ["AI", "Sustainability", "B2B"],
        cofounderSkills: ["AI/ML", "Scaling", "Product", "Design Systems"],
        cofounderLocation: "SF Bay Area or Remote"
      },
      // My pitchback proposal
      myPitchback: {
        message: "Hi! I'm interested in your EcoTrack AI idea. I have 5+ years in AI/ML and think we'd make great cofounders. I can help with the technical implementation and scaling.",
        sentAt: "2 hours ago"
      },
      response: null
    },
    {
      id: 2,
      pitchId: 102,
      status: "accepted",
      sentAt: "1 day ago",
      compatibility: 88,
      anonymousPitch: {
        title: "HealthConnect",
        description: "Revolutionary telemedicine platform that connects patients with specialized healthcare providers through AI-powered matching and video consultations. Our solution addresses the growing need for accessible healthcare and specialist consultations.",
        industry: "Healthcare",
        stage: "Early Stage",
        founderRole: "Medical Co-founder",
        founderLocation: "Boston, MA",
        founderSkills: ["Clinical", "Product", "Growth"],
        timeline: "12-18 months to market",
        market: "Telemedicine market ($185B)",
        funding: "Seed stage, seeking $1M",
        equityOffer: "8-12% for technical cofounder",
        lookingFor: ["Technical Co-founder", "Healthcare Expert"],
        tags: ["Healthcare", "AI", "Telemedicine"],
        cofounderSkills: ["Platform Architecture", "Security", "Compliance"],
        cofounderLocation: "East Coast preferred, remote possible"
      },
      myPitchback: {
        message: "Your HealthConnect idea is exactly what the healthcare industry needs. I have experience in healthcare tech and would love to discuss this further.",
        sentAt: "1 day ago"
      },
      response: "Thank you for your interest! I'd love to connect and discuss this opportunity."
    },
    {
      id: 3,
      pitchId: 103,
      status: "rejected",
      sentAt: "2 days ago",
      compatibility: 85,
      anonymousPitch: {
        title: "EduFlow",
        description: "Revolutionary EdTech platform that uses AI to create personalized learning experiences for students. Our solution adapts to each student's learning style and pace, providing customized content and assessments.",
        industry: "Education",
        stage: "Growth Stage",
        founderRole: "Product Lead",
        founderLocation: "Remote",
        founderSkills: ["Curriculum Design", "Growth", "Community"],
        timeline: "9-15 months to market",
        market: "EdTech market ($254B)",
        funding: "Series A, seeking $5M",
        equityOffer: "5-10% for founding engineer",
        lookingFor: ["Technical Co-founder", "Education Expert"],
        tags: ["AI", "Education", "Personalization"],
        cofounderSkills: ["Full-stack", "Data Science", "Learning Science"],
        cofounderLocation: "Remote, overlap 4+ hours with PST"
      },
      myPitchback: {
        message: "I'm passionate about EdTech and your EduFlow concept is innovative. I have experience in educational technology and would be excited to collaborate.",
        sentAt: "2 days ago"
      },
      response: "Thanks for reaching out, but I've decided to go in a different direction."
    }
    ];
    return [...stored, ...mock];
  });

  useEffect(() => {
    const stored = loadSentPitches();
    const mock = [
      {
        id: 1,
        pitchId: 101,
        status: "pending",
        sentAt: "2 hours ago",
      compatibility: 92,
      anonymousPitch: {
        title: "EcoTrack AI",
        description: "Revolutionary platform that helps companies track and reduce their carbon footprint using advanced AI algorithms. Our solution provides real-time monitoring, predictive analytics, and actionable insights to help businesses achieve their sustainability goals.",
        industry: "Sustainability",
        stage: "MVP Stage",
        founderRole: "Business Co-founder",
        founderLocation: "San Francisco, CA",
        founderSkills: ["Operations", "Strategy", "Fundraising"],
        timeline: "6-12 months to market",
        market: "Carbon management software market ($12B)",
        funding: "Pre-seed, seeking $500K",
        equityOffer: "10-15% for technical cofounder",
        lookingFor: ["Technical Co-founder", "UI/UX Designer"],
        tags: ["AI", "Sustainability", "B2B"],
        cofounderSkills: ["AI/ML", "Scaling", "Product", "Design Systems"],
        cofounderLocation: "SF Bay Area or Remote"
      },
        myPitchback: {
          message: "Hi! I'm interested in your EcoTrack AI idea. I have 5+ years in AI/ML and think we'd make great cofounders. I can help with the technical implementation and scaling.",
          sentAt: "2 hours ago"
        },
        response: null
      },
      {
        id: 2,
        pitchId: 102,
        status: "accepted",
        sentAt: "1 day ago",
        compatibility: 88,
      anonymousPitch: {
        title: "HealthConnect",
        description: "Revolutionary telemedicine platform that connects patients with specialized healthcare providers through AI-powered matching and video consultations. Our solution addresses the growing need for accessible healthcare and specialist consultations.",
        industry: "Healthcare",
        stage: "Early Stage",
        founderRole: "Medical Co-founder",
        founderLocation: "Boston, MA",
        founderSkills: ["Clinical", "Product", "Growth"],
        timeline: "12-18 months to market",
        market: "Telemedicine market ($185B)",
        funding: "Seed stage, seeking $1M",
        equityOffer: "8-12% for technical cofounder",
        lookingFor: ["Technical Co-founder", "Healthcare Expert"],
        tags: ["Healthcare", "AI", "Telemedicine"],
        cofounderSkills: ["Platform Architecture", "Security", "Compliance"],
        cofounderLocation: "East Coast preferred, remote possible"
      },
        myPitchback: {
          message: "Your HealthConnect idea is exactly what the healthcare industry needs. I have experience in healthcare tech and would love to discuss this further.",
          sentAt: "1 day ago"
        },
        response: "Thank you for your interest! I'd love to connect and discuss this opportunity."
      },
      {
        id: 3,
        pitchId: 103,
        status: "rejected",
        sentAt: "2 days ago",
        compatibility: 85,
      anonymousPitch: {
        title: "EduFlow",
        description: "Revolutionary EdTech platform that uses AI to create personalized learning experiences for students. Our solution adapts to each student's learning style and pace, providing customized content and assessments.",
        industry: "Education",
        stage: "Growth Stage",
        founderRole: "Product Lead",
        founderLocation: "Remote",
        founderSkills: ["Curriculum Design", "Growth", "Community"],
        timeline: "9-15 months to market",
        market: "EdTech market ($254B)",
        funding: "Series A, seeking $5M",
        equityOffer: "5-10% for founding engineer",
        lookingFor: ["Technical Co-founder", "Education Expert"],
        tags: ["AI", "Education", "Personalization"],
        cofounderSkills: ["Full-stack", "Data Science", "Learning Science"],
        cofounderLocation: "Remote, overlap 4+ hours with PST"
      },
        myPitchback: {
          message: "I'm passionate about EdTech and your EduFlow concept is innovative. I have experience in educational technology and would be excited to collaborate.",
          sentAt: "2 days ago"
        },
        response: "Thanks for reaching out, but I've decided to go in a different direction."
      }
    ];
    setSentPitches([...stored, ...mock]);
  }, []);

  // Mock data for received pitchbacks (responses to your pitch)
  const receivedPitches = [
    {
      id: 1,
      pitchbackId: 201,
      receivedAt: "1 hour ago",
      status: "pending",
      compatibility: 90,
      yourPitch: {
        title: "EcoTrack AI",
        description: "Revolutionary platform that helps companies track and reduce their carbon footprint using advanced AI algorithms. Our solution provides real-time monitoring, predictive analytics, and actionable insights to help businesses achieve their sustainability goals.",
        industry: "Sustainability",
        stage: "MVP Stage",
        founderRole: "Business Co-founder",
        founderSkills: ["Operations", "Strategy", "Fundraising"],
        timeline: "6-12 months to market",
        market: "Carbon management software market ($12B)",
        funding: "Pre-seed, seeking $500K",
        equityOffer: "10-15% for technical cofounder",
        lookingFor: ["Technical Co-founder", "UI/UX Designer"]
      },
      message: "I'm really impressed with your EcoTrack AI idea! I have 7+ years in sustainability tech and think our platforms could complement each other perfectly. I'd love to discuss how we could collaborate or potentially merge our visions.",
      author: "Anonymous",
      authorDetails: {
        experience: "7+ years in sustainability tech",
        skills: ["Product Management", "Sustainability", "AI/ML"],
        previousStartups: ["GreenTech Solutions", "EcoVentures"],
        education: "MBA from Stanford",
        achievements: ["Led 3 successful product launches", "Raised $2M+ in funding"],
        workStyle: "Data-driven, collaborative",
        availability: "Full-time, flexible hours"
      }
    },
    {
      id: 4,
      pitchbackId: 204,
      receivedAt: "2 hours ago",
      status: "pending",
      compatibility: 85,
      yourPitch: {
        title: "EcoTrack AI",
        description: "Revolutionary platform that helps companies track and reduce their carbon footprint using advanced AI algorithms. Our solution provides real-time monitoring, predictive analytics, and actionable insights to help businesses achieve their sustainability goals.",
        industry: "Sustainability",
        stage: "MVP Stage",
        founderRole: "Business Co-founder",
        founderSkills: ["Operations", "Strategy", "Fundraising"],
        timeline: "6-12 months to market",
        market: "Carbon management software market ($12B)",
        funding: "Pre-seed, seeking $500K",
        equityOffer: "10-15% for technical cofounder",
        lookingFor: ["Technical Co-founder", "UI/UX Designer"]
      },
      message: "Your EcoTrack AI platform sounds amazing! I'm a full-stack developer with 5+ years of experience building AI/ML products. I'd love to help you build the technical foundation and scale this platform.",
      author: "Anonymous",
      authorDetails: {
        experience: "5+ years in AI/ML development",
        skills: ["Full-stack Development", "AI/ML", "Cloud Infrastructure"],
        previousStartups: ["TechVentures"],
        education: "BS in Computer Science from UC Berkeley",
        achievements: ["Built 2 AI products from scratch", "Scaled platform to 100K+ users"],
        workStyle: "Agile, fast-paced",
        availability: "Full-time, remote"
      }
    },
    {
      id: 5,
      pitchbackId: 205,
      receivedAt: "5 hours ago",
      status: "pending",
      compatibility: 88,
      yourPitch: {
        title: "EcoTrack AI",
        description: "Revolutionary platform that helps companies track and reduce their carbon footprint using advanced AI algorithms. Our solution provides real-time monitoring, predictive analytics, and actionable insights to help businesses achieve their sustainability goals.",
        industry: "Sustainability",
        stage: "MVP Stage",
        founderRole: "Business Co-founder",
        founderSkills: ["Operations", "Strategy", "Fundraising"],
        timeline: "6-12 months to market",
        market: "Carbon management software market ($12B)",
        funding: "Pre-seed, seeking $500K",
        equityOffer: "10-15% for technical cofounder",
        lookingFor: ["Technical Co-founder", "UI/UX Designer"]
      },
      message: "EcoTrack AI is exactly the kind of solution the market needs right now! I'm a UI/UX designer with expertise in B2B SaaS platforms and sustainability-focused products. I can help create an intuitive, engaging user experience that drives adoption.",
      author: "Anonymous",
      authorDetails: {
        experience: "6+ years in UI/UX design",
        skills: ["UI/UX Design", "Product Design", "Design Systems"],
        previousStartups: ["DesignStudio"],
        education: "BFA in Design from RISD",
        achievements: ["Designed 5 successful SaaS products", "Led design for $10M+ revenue products"],
        workStyle: "User-centric, detail-oriented",
        availability: "Part-time, flexible"
      }
    },
    {
      id: 2,
      pitchbackId: 202,
      receivedAt: "3 hours ago",
      status: "pending",
      compatibility: 87,
      yourPitch: {
        title: "HealthConnect",
        description: "Revolutionary telemedicine platform that connects patients with specialized healthcare providers through AI-powered matching and video consultations.",
        industry: "Healthcare",
        stage: "Early Stage",
        founderRole: "Medical Co-founder",
        founderSkills: ["Clinical", "Product", "Growth"],
        timeline: "12-18 months to market",
        market: "Telemedicine market ($185B)",
        funding: "Seed stage, seeking $1M",
        lookingFor: ["Technical Co-founder", "Healthcare Expert"]
      },
      theirPitchback: {
        title: "MedFlow",
        description: "Healthcare workflow automation platform that streamlines patient care coordination and reduces administrative burden for medical practices.",
        industry: "Healthcare",
        stage: "MVP Stage",
        timeline: "6-9 months to market",
        market: "Healthcare IT market ($200B)",
        funding: "Pre-seed, seeking $500K",
        lookingFor: ["Technical Co-founder", "Healthcare Operations"]
      },
      message: "Your HealthConnect concept is exactly what the healthcare industry needs! I have experience in healthcare tech and think our solutions could work together beautifully. Would you like to explore a potential partnership?",
      author: "Anonymous",
      authorDetails: {
        experience: "5+ years in healthcare technology",
        skills: ["Healthcare IT", "Product Development", "Operations"],
        previousStartups: ["MedTech Innovations"],
        education: "MS in Computer Science from MIT",
        achievements: ["Built 2 successful healthcare platforms", "Raised $500K+ in funding"],
        workStyle: "Innovative, user-focused",
        availability: "Part-time, evenings and weekends"
      }
    },
    {
      id: 3,
      pitchbackId: 203,
      receivedAt: "1 day ago",
      status: "accepted",
      compatibility: 89,
      yourPitch: {
        title: "EduTech Pro",
        description: "Revolutionary EdTech platform that uses AI to create personalized learning experiences for students. Our solution adapts to each student's learning style and pace.",
        industry: "Education",
        stage: "Growth Stage",
        founderRole: "Product Lead",
        founderSkills: ["Curriculum Design", "Growth", "Community"],
        timeline: "9-15 months to market",
        market: "EdTech market ($254B)",
        funding: "Series A, seeking $5M",
        lookingFor: ["Technical Co-founder", "Education Expert"]
      },
      theirPitchback: {
        title: "LearnSmart AI",
        description: "Adaptive learning platform that uses machine learning to personalize educational content and track student progress in real-time.",
        industry: "Education",
        stage: "Early Stage",
        timeline: "12-18 months to market",
        market: "EdTech market ($254B)",
        funding: "Seed stage, seeking $1.5M",
        lookingFor: ["Business Co-founder", "Education Content"]
      },
      message: "I'm excited about your EduTech Pro platform! I have 6+ years in education technology and think our AI approaches could create something even more powerful together. Would you be interested in discussing a collaboration?",
      author: "Anonymous",
      authorDetails: {
        experience: "6+ years in EdTech",
        skills: ["Education Technology", "Product Management", "User Experience"],
        previousStartups: ["LearnTech", "EduVentures"],
        education: "PhD in Educational Psychology from Harvard",
        achievements: ["Led 4 successful product launches", "Raised $3M+ in funding"],
        workStyle: "Research-driven, student-focused",
        availability: "Full-time, flexible hours"
      }
    }
  ];

  // Mock data for accepted matches
  const acceptedMatches = [
    {
      id: 1,
      pitchId: 301,
      title: "EcoTrack AI",
      description: "AI-powered carbon footprint tracking for businesses",
      author: "Sarah Martinez",
      authorDetails: {
        name: "Sarah Martinez",
        role: "Business Co-founder",
        location: "San Francisco, CA",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face",
        experience: "5+ years in sustainability tech",
        previousStartups: ["GreenTech Solutions", "EcoVentures"],
        skills: ["Business Strategy", "Sustainability", "Operations"],
        email: "sarah@ecotrack.ai",
        phone: "+1 (555) 123-4567",
        linkedin: "linkedin.com/in/sarahmartinez"
      },
      acceptedAt: "2 days ago",
      compatibility: 92,
      nextSteps: "Schedule a video call to discuss the partnership and next steps",
      yourPitch: {
        title: "EcoTrack AI",
        description: "Revolutionary platform that helps companies track and reduce their carbon footprint using advanced AI algorithms. Our solution provides real-time monitoring, predictive analytics, and actionable insights to help businesses achieve their sustainability goals.",
        industry: "Sustainability",
        stage: "MVP Stage",
        timeline: "6-12 months to market",
        market: "Carbon management software market ($12B)",
        funding: "Pre-seed, seeking $500K",
        tags: ["AI", "Sustainability", "B2B"],
        equityOffer: "10-15% for technical cofounder",
        lookingFor: ["Technical Co-founder", "UI/UX Designer"]
      },
      theirPitchback: {
        message: "Hi! I'm interested in your EcoTrack AI idea. I have 5+ years in AI/ML and think we'd make great cofounders. I can help with the technical implementation and scaling.",
        sentAt: "2 hours ago"
      }
    },
    {
      id: 2,
      pitchId: 302,
      title: "HealthConnect",
      description: "Telemedicine platform connecting patients with specialists",
      author: "Dr. Michael Chen",
      authorDetails: {
        name: "Dr. Michael Chen",
        role: "Medical Co-founder",
        location: "Boston, MA",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
        experience: "8+ years in healthcare",
        previousStartups: ["MedTech Innovations"],
        skills: ["Medical Technology", "Healthcare", "AI"],
        email: "michael@healthconnect.com",
        phone: "+1 (555) 987-6543",
        linkedin: "linkedin.com/in/drmichaelchen"
      },
      acceptedAt: "1 day ago",
      compatibility: 88,
      nextSteps: "Exchange detailed business plans and schedule weekly check-ins",
      yourPitch: {
        title: "HealthConnect",
        description: "Revolutionary telemedicine platform that connects patients with specialized healthcare providers through AI-powered matching and video consultations. Our solution addresses the growing need for accessible healthcare and specialist consultations.",
        industry: "Healthcare",
        stage: "Early Stage",
        timeline: "12-18 months to market",
        market: "Telemedicine market ($185B)",
        funding: "Seed stage, seeking $1M",
        tags: ["Healthcare", "AI", "Telemedicine"],
        equityOffer: "8-12% for technical cofounder",
        lookingFor: ["Technical Co-founder", "Healthcare Expert"]
      },
      theirPitchback: {
        message: "Your HealthConnect idea is exactly what the healthcare industry needs. I have experience in healthcare tech and would love to discuss this further.",
        sentAt: "1 day ago"
      }
    }
  ];

  const [matchRooms, setMatchRooms] = useState(() => {
    const defaults = {};
    acceptedMatches.forEach((match) => {
      defaults[match.id] = {
        status: 'not-created',
        doubleOptIn: false,
        scheduling: 'none',
        selectedSlots: [],
        promptsSent: []
      };
    });
    return defaults;
  });

  const tabs = useMemo(() => [
    { id: 'received', label: 'Received', icon: MessageCircle, count: receivedPitches.length },
    { id: 'sent', label: 'Sent', icon: Send, count: sentPitches.length },
    { id: 'matched', label: 'Matched', icon: CheckCircle, count: acceptedMatches.length }
  ], [receivedPitches.length, sentPitches.length, acceptedMatches.length]);

  const handleAcceptPitch = (pitchId) => {
    console.log('Accepting pitch:', pitchId);
    // Update pitch status to accepted
  };

  const handleRejectPitch = (pitchId) => {
    console.log('Rejecting pitch:', pitchId);
    // Update pitch status to rejected
  };

  const handleRespondToPitch = (pitch) => {
    setSelectedPitch(pitch);
    setShowPitchModal(true);
  };

  const handlePitchback = (pitch) => {
    navigate('/home', { state: { pitchbackPitch: pitch } });
  };

  const handleCreateMatchRoom = (matchId) => {
    setMatchRooms((prev) => ({
      ...prev,
      [matchId]: {
        ...prev[matchId],
        status: 'live',
        doubleOptIn: true,
        createdAt: new Date().toISOString()
      }
    }));
  };

  const handleSendDoubleOptIn = (matchId) => {
    setMatchRooms((prev) => ({
      ...prev,
      [matchId]: {
        ...prev[matchId],
        status: 'awaiting-opt-in',
        doubleOptIn: false
      }
    }));
  };

  const handleConfirmDoubleOptIn = (matchId) => {
    setMatchRooms((prev) => ({
      ...prev,
      [matchId]: {
        ...prev[matchId],
        status: 'live',
        doubleOptIn: true
      }
    }));
  };

  const handleSetSchedulingType = (matchId, type) => {
    setMatchRooms((prev) => ({
      ...prev,
      [matchId]: { ...prev[matchId], scheduling: type }
    }));
  };

  const handleToggleSlot = (matchId, slot) => {
    setMatchRooms((prev) => {
      const existing = prev[matchId]?.selectedSlots || [];
      const updatedSlots = existing.includes(slot)
        ? existing.filter((s) => s !== slot)
        : [...existing, slot];
      return { ...prev, [matchId]: { ...prev[matchId], selectedSlots: updatedSlots } };
    });
  };

  const handleTogglePrompt = (matchId, prompt) => {
    setMatchRooms((prev) => {
      const existing = prev[matchId]?.promptsSent || [];
      const updatedPrompts = existing.includes(prompt)
        ? existing.filter((p) => p !== prompt)
        : [...existing, prompt];
      return { ...prev, [matchId]: { ...prev[matchId], promptsSent: updatedPrompts } };
    });
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
      {sentPitches.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl">
          <Send className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-gray-900 mb-2">No Sent Pitchbacks Yet</h3>
          <p className="text-gray-600 mb-6">Start sending pitchbacks to pitches from the marketplace</p>
          <button
            onClick={() => window.location.href = '/home'}
            className="px-6 py-3 bg-black text-white rounded-xl font-semibold hover:bg-gray-800 transition-all duration-300"
          >
            Go to Marketplace
          </button>
        </div>
      ) : (
        sentPitches.map((pitch) => (
          <div key={pitch.id} className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300">
            {/* Anonymous Pitch Details */}
            <div className="mb-6 space-y-4">
              <div className="flex items-center gap-2">
                <Target className="w-5 h-5" />
                <h4 className="text-lg font-bold text-gray-900">
                  {`About ${pitch.anonymousPitch?.title || 'Startup'}`}
                </h4>
              </div>
              <div className="bg-gray-50 p-6 rounded-2xl border-2 border-gray-200 space-y-3">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xl font-semibold text-gray-900">About Startup</span>
                  {pitch.anonymousPitch?.stage && (
                    <span className="px-2.5 py-1 bg-gray-900 text-white rounded-full text-xs font-semibold">
                      {pitch.anonymousPitch.stage}
                    </span>
                  )}
                  {pitch.anonymousPitch?.industry && (
                    <span className="px-2.5 py-1 bg-gray-200 text-gray-800 rounded-full text-xs font-semibold">
                      {pitch.anonymousPitch.industry}
                    </span>
                  )}
                </div>
                <p className="text-gray-700 text-sm leading-relaxed">{pitch.anonymousPitch?.description}</p>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-white rounded-2xl p-6 border border-gray-200 space-y-4">
                  <div className="flex items-center gap-2">
                    <User className="w-5 h-5 text-gray-800" />
                    <h4 className="text-xl font-semibold text-gray-900">Founder</h4>
                  </div>
                  <div className="space-y-4 text-sm text-gray-800">
                    <div>
                      <p className="text-xs uppercase tracking-wide text-gray-500">Role</p>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {pitch.anonymousPitch?.founderRole ? (
                          <span className="px-4 py-1.5 bg-gray-100 text-gray-800 rounded-full text-sm font-medium">
                            {pitch.anonymousPitch.founderRole}
                          </span>
                        ) : (
                          <span className="text-gray-500">Not provided</span>
                        )}
                      </div>
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-wide text-gray-500">Founder Skills</p>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {pitch.anonymousPitch?.founderSkills?.length ? pitch.anonymousPitch.founderSkills.map((skill, idx) => (
                          <span key={idx} className="px-4 py-1.5 bg-gray-100 text-gray-800 rounded-full text-sm">
                            {skill}
                          </span>
                        )) : <span className="text-gray-500">Not provided</span>}
                      </div>
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-wide text-gray-500">Location</p>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {pitch.anonymousPitch?.founderLocation ? (
                          <span className="px-4 py-1.5 bg-gray-100 text-gray-800 rounded-full text-sm font-medium">
                            {pitch.anonymousPitch.founderLocation}
                          </span>
                        ) : (
                          <span className="text-gray-500">Not provided</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-6 border border-gray-200 space-y-4">
                  <div className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-gray-800" />
                    <h4 className="text-xl font-semibold text-gray-900">Looking For</h4>
                  </div>
                  <div className="space-y-4 text-sm text-gray-800">
                    <div>
                      <p className="text-sm font-semibold text-gray-900">Cofounder Role</p>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {pitch.anonymousPitch?.lookingFor?.length ? pitch.anonymousPitch.lookingFor.map((role, idx) => (
                          <span key={idx} className="px-4 py-1.5 bg-gray-100 text-gray-800 rounded-full text-sm font-medium">
                            {role}
                          </span>
                        )) : <span className="text-gray-500">Not specified</span>}
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900">Cofounder Skills</p>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {pitch.anonymousPitch?.cofounderSkills?.length ? pitch.anonymousPitch.cofounderSkills.map((skill, idx) => (
                          <span key={idx} className="px-4 py-1.5 bg-gray-100 text-gray-800 rounded-full text-sm">
                            {skill}
                          </span>
                        )) : <span className="text-gray-500">Not specified</span>}
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900">Cofounder Location</p>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {pitch.anonymousPitch?.cofounderLocation ? (
                          <span className="px-4 py-1.5 bg-gray-100 text-gray-800 rounded-full text-sm">
                            {pitch.anonymousPitch.cofounderLocation}
                          </span>
                        ) : (
                          <span className="text-gray-500">Not specified</span>
                        )}
                      </div>
                    </div>
                    {pitch.anonymousPitch?.equityOffer && (
                      <div>
                        <p className="text-sm font-semibold text-gray-900">Equity Offer</p>
                        <p className="text-lg font-medium text-gray-900 mt-1">{pitch.anonymousPitch.equityOffer}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* My Pitchback Proposal */}
            <div className="mb-4">
              <h4 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <MessageCircle className="w-4 h-4 text-black" />
                My Pitchback Proposal
              </h4>
              <div className="bg-gray-50 p-4 rounded-xl">
                <p className="text-gray-700 text-sm leading-relaxed">{pitch.myPitchback?.message || 'No message provided'}</p>
                {pitch.myPitchback?.sentAt && (
                  <p className="text-gray-500 text-xs mt-2">Sent: {pitch.myPitchback.sentAt}</p>
                )}
              </div>
            </div>

            {/* Response */}
            {pitch.response && (
              <div className="mb-4">
                <h4 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-black" />
                  Response
                </h4>
                <div className="bg-gray-50 p-4 rounded-xl">
                  <p className="text-gray-700 text-sm leading-relaxed">{pitch.response}</p>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex items-center justify-between">
              <div className="flex flex-wrap gap-3">
                <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors text-sm flex items-center gap-2">
                  <X className="w-4 h-4" />
                  Withdraw
                </button>
                <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors text-sm flex items-center gap-2">
                  <Edit3 className="w-4 h-4" />
                  Modify
                </button>
                <button className="px-4 py-2 bg-gray-900 text-white rounded-xl hover:bg-black transition-colors text-sm flex items-center gap-2">
                  <Rocket className="w-4 h-4" />
                  Boost
                </button>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );

  const renderReceivedPitches = () => (
    <div className="space-y-6">
      {receivedPitches.map((pitchback) => (
        <div key={pitchback.id} className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3 text-sm text-gray-600">
              <User className="w-4 h-4" />
              <span>{pitchback.author || 'Anonymous'}</span>
              <span>•</span>
              <span>{pitchback.receivedAt || 'Recently'}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className={`px-3 py-1 text-sm font-semibold rounded-full ${
                pitchback.status === 'accepted' ? 'bg-green-100 text-green-700' :
                pitchback.status === 'rejected' ? 'bg-red-100 text-red-700' :
                'bg-gray-100 text-gray-700'
              }`}>
                {pitchback.status}
              </span>
              <span className="px-3 py-1 bg-gray-100 text-gray-700 text-sm font-semibold rounded-full">{pitchback.compatibility}% match</span>
            </div>
          </div>

          {/* Your Pitch Section */}
          <div className="mb-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-3">
                <div className="flex items-center gap-2">
                  <Target className="w-5 h-5" />
                  <h4 className="text-lg font-bold text-gray-900">
                    {`About ${pitchback.yourPitch?.title || 'Startup'}`}
                  </h4>
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xl font-semibold text-gray-900">{pitchback.yourPitch?.title || 'Untitled Startup'}</span>
                  {pitchback.yourPitch?.stage && (
                    <span className="px-2.5 py-1 bg-gray-900 text-white rounded-full text-xs font-semibold">
                      {pitchback.yourPitch.stage}
                    </span>
                  )}
                  {pitchback.yourPitch?.industry && (
                    <span className="px-2.5 py-1 bg-gray-200 text-gray-800 rounded-full text-xs font-semibold">
                      {pitchback.yourPitch.industry}
                    </span>
                  )}
                </div>
                <p className="text-gray-700 text-sm leading-relaxed">{pitchback.yourPitch?.description}</p>
              </div>

              <div className="bg-gray-50 rounded-2xl border border-gray-200 p-6 space-y-3">
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-gray-800" />
                  <h4 className="text-lg font-bold text-gray-900">About Looking For</h4>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-gray-700">
                  <div>
                    <p className="text-xs uppercase tracking-wide text-gray-500 mb-2">Cofounder Role</p>
                    <div className="flex flex-wrap gap-2">
                      {pitchback.yourPitch?.lookingFor?.length ? pitchback.yourPitch.lookingFor.map((role, idx) => (
                        <span key={idx} className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm">
                          {role}
                        </span>
                      )) : <span className="text-gray-500">Not specified</span>}
                    </div>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-wide text-gray-500 mb-2">Cofounder Skills</p>
                    <div className="flex flex-wrap gap-2">
                      {pitchback.authorDetails?.skills?.length ? pitchback.authorDetails.skills.map((skill, idx) => (
                        <span key={idx} className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm">
                          {skill}
                        </span>
                      )) : <span className="text-gray-500">Not specified</span>}
                    </div>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-wide text-gray-500 mb-2">Cofounder Availability</p>
                    <p className="text-gray-900 font-semibold">
                      {pitchback.authorDetails?.availability || 'Not specified'}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-wide text-gray-500 mb-2">Cofounder Location</p>
                    <p className="text-gray-900 font-semibold">
                      {pitchback.authorDetails?.location || pitchback.yourPitch?.location || 'Not specified'}
                    </p>
                  </div>
                  {pitchback.yourPitch?.equityOffer && (
                    <div className="sm:col-span-2">
                      <p className="text-xs uppercase tracking-wide text-gray-500 mb-2">Equity Offer</p>
                      <p className="text-gray-900 font-semibold">{pitchback.yourPitch.equityOffer}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Pitchback Message & Founder */}
          <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded-xl border border-gray-200 space-y-3">
              <div className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4 text-black" />
                <h4 className="text-lg font-semibold text-gray-900">Pitchback Message</h4>
              </div>
              <p className="text-gray-700 text-sm leading-relaxed">{pitchback.message || 'No message provided'}</p>
            </div>

            {pitchback.authorDetails && (
              <div className="bg-gray-50 p-6 rounded-2xl border border-gray-200 space-y-3">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  <h4 className="text-lg font-semibold text-gray-900">About Founder</h4>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-gray-700">
                  <div>
                    <p className="text-xs uppercase tracking-wide text-gray-500">Experience</p>
                    <p className="font-semibold text-gray-900">{pitchback.authorDetails.experience}</p>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-wide text-gray-500">Availability</p>
                    <p className="font-semibold text-gray-900">{pitchback.authorDetails.availability}</p>
                  </div>
                  <div className="sm:col-span-2">
                    <p className="text-xs uppercase tracking-wide text-gray-500 mb-1">Skills</p>
                    <div className="flex flex-wrap gap-2">
                      {pitchback.authorDetails.skills.map((skill, idx) => (
                        <span key={idx} className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm">{skill}</span>
                      ))}
                    </div>
                  </div>
                  <div className="sm:col-span-2">
                    <p className="text-xs uppercase tracking-wide text-gray-500 mb-1">Previous Startups</p>
                    <div className="flex flex-wrap gap-2">
                      {pitchback.authorDetails.previousStartups.map((startup, idx) => (
                        <span key={idx} className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm">{startup}</span>
                      ))}
                    </div>
                  </div>
                  <div className="sm:col-span-2">
                    <p className="text-xs uppercase tracking-wide text-gray-500 mb-1">Achievements</p>
                    <div className="flex flex-wrap gap-2">
                      {pitchback.authorDetails.achievements.map((achievement, idx) => (
                        <span key={idx} className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm">{achievement}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          {pitchback.status === 'pending' && (
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => handleAcceptPitch(pitchback.id)}
                className="flex-1 py-3 bg-black text-white rounded-xl font-semibold hover:bg-gray-800 transition-all duration-300 flex items-center justify-center gap-2"
              >
                <CheckCircle className="w-4 h-4" />
                Accept Pitchback
              </button>
              <button
                onClick={() => handleRejectPitch(pitchback.id)}
                className="flex-1 py-3 bg-gray-600 text-white rounded-xl font-semibold hover:bg-gray-800 transition-all duration-300 flex items-center justify-center gap-2"
              >
                <X className="w-4 h-4" />
                Decline
              </button>
            </div>
          )}

          {pitchback.status === 'accepted' && (
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="flex-1 py-4 bg-black text-white rounded-2xl font-semibold hover:bg-gray-800 transition-all duration-300 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl">
                <Rocket className="w-5 h-5" />
                Go to Workspace
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );

  const renderAcceptedMatches = () => (
    <div className="space-y-6">
      {acceptedMatches.map((match) => {
        const roomState = matchRooms[match.id] || {};
        const canvasSections = [
          { title: "Vision & Mission", desc: "Shared 1-year and 3-year picture of where this startup is going." },
          { title: "Roles & Responsibilities", desc: "Clear owner for product, GTM, eng, ops, hiring, and founder rituals." },
          { title: "Equity Expectations", desc: "Target split, vesting guardrails, cliffs, and decision-making rights." },
          { title: "Time Commitment", desc: "Weekly hours, travel cadence, response SLAs, and availability windows." },
          { title: "Money Runway & Funding Status", desc: "Burn, runway, capital plan, and what you need to raise next." },
          { title: "Deal-breakers", desc: "Non-negotiables for culture, values, and must-haves/never-do items." }
        ];

        const introPrompts = [
          "Share your 1-year vision",
          "What are your non-negotiables?",
          "What would make you walk away?",
          "How do you want to work together week-to-week?"
        ];

        return (
          <div key={match.id} className="bg-white rounded-3xl p-8 shadow-lg border-2 border-gray-200 hover:shadow-xl transition-all duration-300">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
              <div>
                <p className="text-xs uppercase tracking-wide text-gray-500">Match Room plan</p>
                <h3 className="text-2xl font-bold text-gray-900 flex items-center gap-2 flex-wrap">
                  {match.yourPitch?.title || match.title}
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${roomState.status === 'live' ? 'bg-emerald-100 text-emerald-800' : roomState.status === 'awaiting-opt-in' ? 'bg-amber-100 text-amber-800' : 'bg-gray-200 text-gray-700'}`}>
                    {roomState.status === 'live' ? 'Match Room live' : roomState.status === 'awaiting-opt-in' ? 'Awaiting double opt-in' : 'Not created'}
                  </span>
                  {roomState.doubleOptIn ? (
                    <span className="px-3 py-1 bg-black text-white rounded-full text-xs font-semibold">Double opt-in confirmed</span>
                  ) : (
                    <span className="px-3 py-1 bg-gray-900 text-white rounded-full text-xs font-semibold">Double opt-in ready</span>
                  )}
                </h3>
                <p className="text-gray-600 mt-1">Create the Match Room as soon as either side accepts (or after double opt-in if required).</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 bg-gray-900 text-white rounded-full text-sm font-semibold">{match.compatibility}% match</span>
                <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm font-semibold">Accepted {match.acceptedAt}</span>
                {roomState.createdAt && (
                  <span className="px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full text-sm font-semibold">
                    Room created {formatTimeAgo(roomState.createdAt)}
                  </span>
                )}
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-3 mb-5">
              <button
                onClick={() => handleCreateMatchRoom(match.id)}
                className="flex items-center justify-center gap-2 py-3 px-4 bg-black text-white rounded-xl font-semibold hover:bg-gray-800 transition-all duration-300"
              >
                <CheckCircle2 className="w-4 h-4" />
                Create Match Room now
              </button>
              <button
                onClick={() => handleSendDoubleOptIn(match.id)}
                className="flex items-center justify-center gap-2 py-3 px-4 bg-white text-gray-900 border border-gray-200 rounded-xl font-semibold hover:border-gray-300 transition-all duration-300"
              >
                <Send className="w-4 h-4" />
                Send double opt-in invite
              </button>
              {roomState.status === 'awaiting-opt-in' && (
                <button
                  onClick={() => handleConfirmDoubleOptIn(match.id)}
                  className="flex items-center justify-center gap-2 py-3 px-4 bg-emerald-600 text-white rounded-xl font-semibold hover:bg-emerald-700 transition-all duration-300"
                >
                  <CheckCircle className="w-4 h-4" />
                  Mark opt-in confirmed
                </button>
              )}
            </div>

            {/* Context block */}
            <div className="grid md:grid-cols-3 gap-4 mb-6">
              <div className="md:col-span-2 bg-gray-50 border border-gray-200 rounded-2xl p-6 space-y-3">
                <div className="flex items-center gap-2">
                  <Rocket className="w-5 h-5 text-gray-800" />
                  <h4 className="text-lg font-semibold text-gray-900">Startup card</h4>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xl font-bold text-gray-900">{match.yourPitch?.title || match.title}</span>
                  {match.yourPitch?.stage && <span className="px-2.5 py-1 bg-gray-900 text-white rounded-full text-xs font-semibold">{match.yourPitch.stage}</span>}
                  {match.yourPitch?.industry && <span className="px-2.5 py-1 bg-gray-200 text-gray-800 rounded-full text-xs font-semibold">{match.yourPitch.industry}</span>}
                </div>
                <p className="text-gray-700 leading-relaxed text-sm">{match.yourPitch?.description || match.description}</p>
                <div className="flex flex-wrap gap-2">
                  {(match.yourPitch?.tags || []).map((tag, idx) => (
                    <span key={idx} className="px-3 py-1 bg-white border border-gray-200 rounded-full text-xs font-semibold text-gray-700">{tag}</span>
                  ))}
                </div>
              </div>
              <div className="bg-white border border-gray-200 rounded-2xl p-6 space-y-4">
                <div>
                  <p className="text-xs uppercase tracking-wide text-gray-500 mb-2">Founders</p>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-100">
                        <img src={match.authorDetails.avatar} alt={match.authorDetails.name} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">{match.authorDetails.name}</p>
                        <p className="text-xs text-gray-600">{match.authorDetails.role}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gray-900 text-white flex items-center justify-center font-semibold">You</div>
                      <div>
                        <p className="font-semibold text-gray-900">Your founder profile</p>
                        <p className="text-xs text-gray-600">Attach your role + availability</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-900 text-white rounded-xl p-4 space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Star className="w-4 h-4" />
                    <span>Match score summary</span>
                  </div>
                  <p className="text-sm text-gray-100">Shared tags, preferred roles, and time commitment will seed your Match Room.</p>
                </div>
              </div>
            </div>

            {/* Chat + Scheduling */}
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div className="bg-white border border-gray-200 rounded-2xl p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <MessageCircle className="w-5 h-5 text-gray-800" />
                    <h4 className="text-lg font-semibold text-gray-900">Match Room chat</h4>
                  </div>
                  <span className="px-2.5 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-semibold">Real-time or async</span>
                </div>
                <p className="text-sm text-gray-700">Pre-load these prompts so both sides can respond immediately.</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {introPrompts.map((prompt, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleTogglePrompt(match.id, prompt)}
                      className={`px-3 py-3 rounded-xl text-sm text-left transition-colors border ${
                        roomState.promptsSent?.includes(prompt)
                          ? 'bg-black text-white border-black'
                          : 'bg-gray-50 text-gray-800 border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-600">
                  <Sparkles className="w-4 h-4" />
                  <span>Keep pitchback message pinned in the chat header.</span>
                  {roomState.promptsSent?.length ? (
                    <span className="px-2 py-1 bg-emerald-50 text-emerald-700 rounded-full font-semibold">
                      {roomState.promptsSent.length} prompt{roomState.promptsSent.length > 1 ? 's' : ''} queued
                    </span>
                  ) : null}
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-2xl p-6 space-y-4">
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-gray-800" />
                  <h4 className="text-lg font-semibold text-gray-900">Fast scheduling</h4>
                </div>
                <div className="space-y-3 text-sm text-gray-800">
                  <button
                    onClick={() => handleSetSchedulingType(match.id, 'calendar')}
                    className={`w-full text-left p-3 rounded-xl border transition-colors ${
                      roomState.scheduling === 'calendar'
                        ? 'bg-black text-white border-black'
                        : 'bg-gray-50 border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <p className="font-semibold mb-1">Calendar widget</p>
                    <p className="text-sm">Parse Calendly/Cal.com links and show embedded availability.</p>
                  </button>
                  <div className={`p-3 rounded-xl border transition-colors ${roomState.scheduling === 'slots' ? 'bg-black text-white border-black' : 'bg-gray-50 border-gray-200 hover:border-gray-300'}`}>
                    <div className="flex items-center justify-between mb-2">
                      <p className="font-semibold">Pick 3 slots flow</p>
                      <button
                        onClick={() => handleSetSchedulingType(match.id, 'slots')}
                        className="text-xs px-2 py-1 rounded-full bg-white text-gray-800 border border-gray-200 hover:border-gray-300"
                      >
                        Use this flow
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {['Tue 10a PT', 'Wed 1p PT', 'Thu 4p PT'].map((slot) => (
                        <button
                          key={slot}
                          onClick={() => handleToggleSlot(match.id, slot)}
                          className={`px-3 py-1 rounded-full text-xs font-semibold border ${
                            roomState.selectedSlots?.includes(slot)
                              ? 'bg-white text-gray-900 border-black'
                              : 'bg-white text-gray-800 border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          {slot}
                        </button>
                      ))}
                    </div>
                    {roomState.selectedSlots?.length ? (
                      <p className="text-xs mt-2 opacity-90">
                        Selected {roomState.selectedSlots.length} slot{roomState.selectedSlots.length > 1 ? 's' : ''} to send inside BiggMate.
                      </p>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>

            {/* Co-founder Canvas */}
            <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <Target className="w-5 h-5 text-gray-800" />
                <h4 className="text-lg font-semibold text-gray-900">Co-founder Canvas</h4>
              </div>
              <p className="text-sm text-gray-700 mb-4">Capture these structured answers before moving to a sprint or partnership agreement.</p>
              <div className="grid md:grid-cols-2 gap-3">
                {canvasSections.map((section, idx) => (
                  <div key={idx} className="bg-white rounded-xl border border-gray-200 p-4">
                    <p className="font-semibold text-gray-900">{section.title}</p>
                    <p className="text-sm text-gray-700 mt-1">{section.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      })}
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

        {/* Tab Content */}
        {activeTab === 'received' && renderReceivedPitches()}
        {activeTab === 'sent' && renderSentPitches()}
        {activeTab === 'matched' && renderAcceptedMatches()}
      </div>
    </div>
  );
};

export default MyPitches;
