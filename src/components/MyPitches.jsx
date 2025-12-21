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
  Lightbulb,
  Moon,
  Sun
} from 'lucide-react';
import CalendlyWidget from './CalendlyWidget';

const MyPitches = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('received');
  const [showPitchModal, setShowPitchModal] = useState(false);
  const [selectedPitch, setSelectedPitch] = useState(null);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [pitchResponse, setPitchResponse] = useState('');
  const [showCalendly, setShowCalendly] = useState(false);
  const [calendlyPrefill, setCalendlyPrefill] = useState({});

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
        role: "Technical Co-founder",
        location: "Boston, MA",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face",
        experience: "7+ years in sustainability tech",
        availability: "Full-time, flexible hours",
        about: "I'm really impressed with your EcoTrack AI idea! I have 7+ years in sustainability tech and think our platforms could complement each other perfectly. I'd love to discuss how we could collaborate or potentially merge our visions.",
        previousStartups: ["GreenTech Solutions", "EcoVentures"],
        skills: ["Product Management", "Sustainability", "AI/ML"],
        achievements: [
          "Led 3 successful product launches",
          "Raised $2M+ in funding"
        ],
        education: "MIT - Computer Science & Environmental Engineering",
        industries: ["Sustainability", "Climate Tech", "AI"]
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
        message: "I'm really impressed with your EcoTrack AI idea! I have 7+ years in sustainability tech and think our platforms could complement each other perfectly. I'd love to discuss how we could collaborate or potentially merge our visions.",
        sentAt: "3 days ago"
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
        role: "Medical Co-founder & Product Lead",
        location: "San Francisco, CA",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
        experience: "10+ years in healthcare technology",
        availability: "Full-time, 40+ hours/week",
        about: "Passionate about making healthcare accessible to everyone. Built and scaled two healthtech companies with successful exits. Looking to build the next generation of telemedicine solutions.",
        previousStartups: ["MedTech Innovations", "CareConnect"],
        skills: ["Healthcare Technology", "Product Strategy", "Clinical Operations", "Growth"],
        achievements: [
          "Built platform serving 500K+ patients",
          "Successfully exited previous startup for $15M",
          "Published researcher in medical AI"
        ],
        education: "Harvard Medical School & Stanford GSB",
        industries: ["Healthcare", "Telemedicine", "AI in Medicine"]
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
        sentAt: "2 days ago"
      }
    }
  ];

  const tabs = useMemo(() => [
    { 
      id: 'received', 
      label: 'Received', 
      description: 'Pitchbacks on your posted pitches',
      icon: MessageCircle, 
      count: receivedPitches.length 
    },
    { 
      id: 'sent', 
      label: 'Sent', 
      description: 'Your pitchbacks to others',
      icon: Send, 
      count: sentPitches.length 
    },
    { 
      id: 'matched', 
      label: 'Matched', 
      description: 'Mutually accepted connections',
      icon: CheckCircle, 
      count: acceptedMatches.length 
    }
  ], [receivedPitches.length, sentPitches.length, acceptedMatches.length]);

  const handleAcceptPitch = (pitchId) => {
    console.log('Accepting pitch:', pitchId);
  };

  const handleRejectPitch = (pitchId) => {
    console.log('Rejecting pitch:', pitchId);
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
      {sentPitches.length === 0 ? (
        <div className="text-center py-20 bg-gradient-to-br from-gray-50 to-white rounded-3xl border-2 border-dashed border-gray-300">
          <div className="max-w-md mx-auto">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Send className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">No Pitchbacks Sent Yet</h3>
            <p className="text-gray-600 mb-2">Browse the Pitch Market and send pitchbacks to startup ideas that interest you.</p>
            <p className="text-sm text-gray-500 mb-8">💡 Tip: Send thoughtful, personalized pitchbacks to increase your acceptance rate</p>
            <button
              onClick={() => window.location.href = '/home'}
              className="px-6 py-3 bg-black text-white rounded-xl font-semibold hover:bg-gray-800 transition-all inline-flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              Browse Pitch Market
            </button>
          </div>
        </div>
      ) : (
        sentPitches.map((pitch) => (
          <div key={pitch.id} className={`bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 ${
            pitch.status === 'pending' ? 'border-2 border-gray-200' : 
            pitch.status === 'accepted' ? 'border-2 border-gray-300' : 
            pitch.status === 'rejected' ? 'border-2 border-red-200' : 
            'border border-gray-200'
          }`}>
            {/* Status Banner */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-gray-500" />
                <span className="text-sm text-gray-600">Sent {pitch.sentAt}</span>
              </div>
              <div className="flex items-center gap-2">
                {pitch.status === 'pending' && (
                  <span className="px-3 py-1.5 text-xs font-bold rounded-full bg-gray-100 text-gray-700 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    Awaiting Response
                  </span>
                )}
                {pitch.status === 'accepted' && (
                  <span className="px-3 py-1.5 text-xs font-bold rounded-full bg-gray-800 text-white flex items-center gap-1">
                    <CheckCircle className="w-3 h-3" />
                    Accepted - View in Matched
                  </span>
                )}
                {pitch.status === 'rejected' && (
                  <span className="px-3 py-1.5 text-xs font-bold rounded-full bg-red-100 text-red-700 flex items-center gap-1">
                    <X className="w-3 h-3" />
                    Not Accepted
                  </span>
                )}
                <span className="px-3 py-1.5 bg-gray-100 text-gray-700 text-xs font-bold rounded-full">{pitch.compatibility}% match</span>
              </div>
            </div>

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

  const renderReceivedPitches = () => {
    if (receivedPitches.length === 0) {
      return (
        <div className="text-center py-20 bg-gradient-to-br from-gray-50 to-white rounded-3xl border-2 border-dashed border-gray-300">
          <div className="max-w-md mx-auto">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <MessageCircle className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">No Pitchbacks Received Yet</h3>
            <p className="text-gray-600 mb-2">Post a pitch in the Pitch Market to start receiving pitchbacks from potential co-founders.</p>
            <p className="text-sm text-gray-500 mb-8">💡 Tip: Well-crafted pitches with clear requirements get more responses</p>
            <button
              onClick={() => window.location.href = '/home'}
              className="px-6 py-3 bg-black text-white rounded-xl font-semibold hover:bg-gray-800 transition-all inline-flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Create a Pitch
            </button>
          </div>
        </div>
      );
    }

    // Group pitchbacks by pitch
    const groupedByPitch = receivedPitches.reduce((acc, pitchback) => {
      const pitchTitle = pitchback.yourPitch?.title || 'Untitled Pitch';
      if (!acc[pitchTitle]) {
        acc[pitchTitle] = {
          pitch: pitchback.yourPitch,
          pitchbacks: []
        };
      }
      acc[pitchTitle].pitchbacks.push(pitchback);
      return acc;
    }, {});

    return (
    <div className="space-y-8">
      {Object.entries(groupedByPitch).map(([pitchTitle, { pitch, pitchbacks }]) => (
        <div key={pitchTitle} className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-3xl p-6 border-2 border-gray-200">
          {/* Pitch Header - Compact */}
          <div className="mb-6 pb-4 border-b-2 border-gray-200">
            <div className="flex items-center justify-between gap-4 mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-gray-700 to-gray-900 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Target className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">{pitchTitle}</h3>
                  <p className="text-xs text-gray-600">{pitchbacks.length} candidate{pitchbacks.length !== 1 ? 's' : ''} • {pitch?.stage || 'Early Stage'}</p>
                </div>
              </div>
              {pitch?.industry && (
                <span className="px-3 py-1.5 bg-white/80 backdrop-blur text-gray-800 rounded-full text-xs font-semibold">
                  {pitch.industry}
                </span>
              )}
            </div>
            
            {/* What You're Looking For - At Pitch Level */}
            <div className="bg-white rounded-xl p-4 border-2 border-gray-200">
              <p className="text-sm font-bold text-gray-700 uppercase mb-3 flex items-center gap-2">
                <Users className="w-4 h-4" />
                You're Looking For
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                {pitch?.lookingFor && pitch.lookingFor.length > 0 && (
                  <div>
                    <p className="text-gray-500 font-semibold mb-2 text-xs">ROLE</p>
                    <div className="flex flex-wrap gap-1.5">
                      {pitch.lookingFor.map((role, idx) => (
                        <span key={idx} className="px-2.5 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">
                          {role}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                {pitch?.equityOffer && (
                  <div>
                    <p className="text-gray-500 font-semibold mb-2 text-xs">EQUITY OFFER</p>
                    <p className="text-gray-900 font-bold text-sm">{pitch.equityOffer}</p>
                  </div>
                )}
                {pitch?.timeline && (
                  <div>
                    <p className="text-gray-500 font-semibold mb-2 text-xs">TIMELINE</p>
                    <p className="text-gray-900 font-medium text-sm">{pitch.timeline}</p>
                  </div>
                )}
                {pitch?.funding && (
                  <div>
                    <p className="text-gray-500 font-semibold mb-2 text-xs">FUNDING</p>
                    <p className="text-gray-900 font-medium text-sm">{pitch.funding}</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Grid Layout for Easy Comparison */}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
            {pitchbacks.map((pitchback, idx) => (
              <div key={pitchback.id} className={`bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border-2 ${
                pitchback.status === 'pending' ? 'border-gray-300' : 
                pitchback.status === 'accepted' ? 'border-gray-400' : 
                pitchback.status === 'rejected' ? 'border-red-300 opacity-60' : 
                'border-gray-200'
              }`}>
                {/* Card Header with Match Score */}
                <div className={`p-4 ${
                  pitchback.compatibility >= 90 ? 'bg-gradient-to-r from-gray-800 to-gray-900' :
                  pitchback.compatibility >= 80 ? 'bg-gradient-to-r from-gray-700 to-gray-800' :
                  'bg-gradient-to-r from-gray-600 to-gray-700'
                } text-white`}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-white/20 backdrop-blur rounded-full flex items-center justify-center font-bold">
                        #{idx + 1}
                      </div>
                      <span className="font-bold text-lg">{pitchback.compatibility}% Match</span>
                    </div>
                    {pitchback.status === 'pending' && (
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"></div>
                    )}
                  </div>
                  <p className="text-white/90 text-xs">{pitchback.receivedAt || 'Just now'}</p>
                </div>

                {/* Founder Profile */}
                <div className="p-5">
                  <div className="flex items-start gap-3 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-gray-200 to-gray-300 rounded-full flex items-center justify-center flex-shrink-0">
                      <User className="w-6 h-6 text-gray-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-gray-900 text-base truncate">{pitchback.author || 'Anonymous'}</h4>
                      <p className="text-sm text-gray-600 font-medium">{pitchback.authorDetails?.experience || 'Experienced Founder'}</p>
                    </div>
                  </div>

                  {/* Key Info - Quick Scan */}
                  <div className="space-y-3 mb-4">
                    {pitchback.authorDetails?.skills && (
                      <div>
                        <p className="text-xs text-gray-500 font-semibold mb-1.5">THEIR SKILLS</p>
                        <div className="flex flex-wrap gap-1.5">
                          {pitchback.authorDetails.skills.slice(0, 3).map((skill, idx) => (
                            <span key={idx} className="px-2.5 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-semibold">
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {pitchback.authorDetails?.availability && (
                      <div className="flex items-center gap-2 text-sm">
                        <Clock className="w-4 h-4 text-gray-600" />
                        <span className="text-gray-700 font-medium">{pitchback.authorDetails.availability}</span>
                      </div>
                    )}

                    {pitchback.authorDetails?.previousStartups && pitchback.authorDetails.previousStartups.length > 0 && (
                      <div className="flex items-center gap-2 text-sm">
                        <Rocket className="w-4 h-4 text-gray-600" />
                        <span className="text-gray-700 font-medium">{pitchback.authorDetails.previousStartups.length} previous startup{pitchback.authorDetails.previousStartups.length !== 1 ? 's' : ''}</span>
                      </div>
                    )}
                  </div>

                  {/* Pitchback Message - Full Text */}
                  <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-4 mb-4 border border-gray-200">
                    <div className="flex items-center gap-2 mb-2">
                      <MessageCircle className="w-4 h-4 text-gray-700" />
                      <p className="text-xs font-bold text-gray-800 uppercase">Pitchback</p>
                    </div>
                    <p className="text-sm text-gray-800 leading-relaxed">
                      {pitchback.message || 'Interested in collaborating on your project!'}
                    </p>
                  </div>

                  {/* Action Buttons */}
                  {pitchback.status === 'pending' ? (
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleAcceptPitch(pitchback.id)}
                        className="flex-1 py-2.5 bg-gradient-to-r from-gray-800 to-gray-900 text-white rounded-xl font-bold hover:from-gray-700 hover:to-gray-800 transition-all duration-300 flex items-center justify-center gap-2 shadow-lg"
                      >
                        <CheckCircle className="w-4 h-4" />
                        Accept
                      </button>
                      <button
                        onClick={() => handleRejectPitch(pitchback.id)}
                        className="flex-1 py-2.5 bg-gray-200 text-gray-700 rounded-xl font-bold hover:bg-gray-300 transition-all duration-300 flex items-center justify-center gap-2"
                      >
                        <X className="w-4 h-4" />
                        Pass
                      </button>
                    </div>
                  ) : pitchback.status === 'accepted' ? (
                    <button className="w-full py-2.5 bg-gradient-to-r from-gray-600 to-gray-700 text-white rounded-xl font-bold hover:from-gray-500 hover:to-gray-600 transition-all duration-300 flex items-center justify-center gap-2 shadow-lg">
                      <Rocket className="w-4 h-4" />
                      View Match
                    </button>
                  ) : (
                    <div className="text-center py-2 text-sm text-gray-500 font-medium">
                      Declined
                    </div>
                  )}

                  {/* View Full Profile Link */}
                  {pitchback.status === 'pending' && (
                    <button 
                      onClick={() => {
                        setSelectedProfile(pitchback.authorDetails);
                        setShowProfileModal(true);
                      }}
                      className="w-full mt-2 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-xl font-bold text-sm transition-all duration-300 flex items-center justify-center gap-2 border border-gray-300"
                    >
                      <User className="w-4 h-4" />
                      View Full Profile
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
  };

  const renderAcceptedMatches = () => {
    if (acceptedMatches.length === 0) {
      return (
        <div className="text-center py-20 bg-gradient-to-br from-gray-50 to-white rounded-3xl border-2 border-dashed border-gray-300">
          <div className="max-w-md mx-auto">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">No Matches Yet</h3>
            <p className="text-gray-600 mb-4">You'll see matches here when:</p>
            <div className="bg-white rounded-xl p-4 mb-8 text-left border border-gray-200">
              <div className="space-y-3 text-sm text-gray-700">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-black text-white rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold">1</div>
                  <p>You post a pitch on the marketplace</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-black text-white rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold">2</div>
                  <p>Someone sends you a pitchback (appears in <strong>Received</strong>)</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-black text-white rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold">3</div>
                  <p>You accept their pitchback</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-gray-800 text-white rounded-full flex items-center justify-center flex-shrink-0">✓</div>
                  <p><strong>Match created!</strong> Start building together</p>
                </div>
              </div>
            </div>
            <button 
              onClick={() => setActiveTab('received')}
              className="px-6 py-3 bg-black text-white rounded-xl font-semibold hover:bg-gray-800 transition-all inline-flex items-center gap-2"
            >
              View Received Pitchbacks
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      );
    }

    // Group matches by pitch
    const groupedByPitch = acceptedMatches.reduce((acc, match) => {
      const pitchTitle = match.yourPitch?.title || match.title || 'Untitled Pitch';
      if (!acc[pitchTitle]) {
        acc[pitchTitle] = {
          pitch: match.yourPitch || match,
          matches: []
        };
      }
      acc[pitchTitle].matches.push(match);
      return acc;
    }, {});

    return (
      <div className="space-y-8">
        {Object.entries(groupedByPitch).map(([pitchTitle, { pitch, matches }]) => (
          <div key={pitchTitle} className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-3xl p-6 border-2 border-gray-200">
            {/* Pitch Header */}
            <div className="mb-6 pb-6 border-b-2 border-gray-200">
              <div className="flex items-start justify-between gap-4 mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gray-800 rounded-xl flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-1">{pitchTitle}</h3>
                    <p className="text-sm text-gray-600">{matches.length} match{matches.length !== 1 ? 'es' : ''} for this pitch</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                  {pitch?.stage && (
                    <span className="px-3 py-1.5 bg-black text-white rounded-full text-xs font-semibold">
                      {pitch.stage}
                    </span>
                  )}
                  {pitch?.industry && (
                    <span className="px-3 py-1.5 bg-gray-200 text-gray-800 rounded-full text-xs font-semibold">
                      {pitch.industry}
                    </span>
                  )}
                </div>
              </div>
              <p className="text-gray-700 text-sm leading-relaxed">{pitch?.description}</p>
            </div>

            {/* Matches for this pitch */}
            <div className="space-y-4">
              {matches.map((match, idx) => {
                const matchedPitch = match.yourPitch || match;
                const cofounder = match.authorDetails || {};

                return (
            <div key={match.id} className="bg-white rounded-3xl border-2 border-gray-300 overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300">
              {/* Header with Match Celebration */}
              <div className="bg-gradient-to-r from-gray-800 to-gray-900 p-6 text-white">
                <div className="flex items-center justify-between gap-4 flex-wrap">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-white/20 backdrop-blur rounded-full flex items-center justify-center flex-shrink-0 font-bold text-lg">
                      {idx + 1}
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold mb-1">It's a Match! 🎉</h3>
                      <p className="text-white/90 text-sm">Matched on <strong>{match.acceptedAt || 'recently'}</strong></p>
                    </div>
                  </div>
                  <span className="px-4 py-2 bg-white/20 backdrop-blur text-white rounded-full text-sm font-bold">
                    {match.compatibility || '90'}% match
                  </span>
                </div>
              </div>

              <div className="p-6">
                {/* Pitchback Message */}
                <div className="mb-6 bg-gray-50 rounded-2xl p-5 border border-gray-200">
                  <div className="flex items-center gap-2 mb-3">
                    <MessageCircle className="w-5 h-5 text-gray-800" />
                    <h4 className="text-lg font-bold text-gray-900">Their Response</h4>
                  </div>
                  <div className="bg-white rounded-xl p-4 border border-gray-200">
                    <p className="text-gray-700 text-sm leading-relaxed italic">
                      "{match.theirPitchback?.message || match.authorDetails?.about || 'Interested in collaborating on your pitch!'}"
                    </p>
                    <p className="text-gray-500 text-xs mt-3">
                      Sent {match.theirPitchback?.sentAt || match.acceptedAt || 'recently'}
                    </p>
                  </div>
                </div>

                {/* Co-founder Card */}
                <div className="mb-6">
                  <h4 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <Users className="w-5 h-5 text-gray-800" />
                    About Founder
                  </h4>
                  <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-6 border-2 border-gray-200">
                    <div className="flex items-start gap-4 mb-6">
                      <div className="w-20 h-20 rounded-full overflow-hidden bg-gray-200 flex-shrink-0 ring-4 ring-gray-400">
                        {cofounder.avatar ? (
                          <img 
                            src={cofounder.avatar} 
                            alt={cofounder.name} 
                            className="w-full h-full object-cover" 
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-gray-800">
                            <User className="w-10 h-10 text-white" />
                          </div>
                        )}
                      </div>
                      <div className="flex-1">
                        <h5 className="font-bold text-gray-900 text-2xl mb-1">{cofounder.name || 'Anonymous'}</h5>
                        <p className="text-gray-700 font-semibold text-base mb-3">{cofounder.role || 'Co-founder'}</p>
                      </div>
                    </div>

                    {/* Two Column Layout for Details */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Left Column */}
                      <div className="space-y-5">
                        {/* Experience */}
                        {cofounder.experience && (
                          <div>
                            <p className="text-xs uppercase tracking-wider text-gray-600 font-bold mb-2">Experience</p>
                            <p className="text-gray-900 text-sm font-medium">{cofounder.experience}</p>
                          </div>
                        )}

                        {/* Availability */}
                        {cofounder.availability && (
                          <div>
                            <p className="text-xs uppercase tracking-wider text-gray-600 font-bold mb-2">Availability</p>
                            <p className="text-gray-900 text-sm font-medium">{cofounder.availability}</p>
                          </div>
                        )}

                        {/* Location */}
                        {cofounder.location && (
                          <div>
                            <p className="text-xs uppercase tracking-wider text-gray-600 font-bold mb-2">Location</p>
                            <div className="flex items-center gap-2">
                              <MapPin className="w-4 h-4 text-gray-600" />
                              <span className="text-gray-900 text-sm font-medium">{cofounder.location}</span>
                            </div>
                          </div>
                        )}

                        {/* Skills */}
                        {cofounder.skills && cofounder.skills.length > 0 && (
                          <div>
                            <p className="text-xs uppercase tracking-wider text-gray-600 font-bold mb-3">Skills</p>
                            <div className="flex flex-wrap gap-2">
                              {cofounder.skills.map((skill, idx) => (
                                <span key={idx} className="px-3 py-1.5 bg-white text-gray-800 rounded-full text-sm font-medium border border-gray-200">
                                  {skill}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Right Column */}
                      <div className="space-y-5">
                        {/* Previous Startups */}
                        {cofounder.previousStartups && cofounder.previousStartups.length > 0 && (
                          <div>
                            <p className="text-xs uppercase tracking-wider text-gray-600 font-bold mb-3">Previous Startups</p>
                            <div className="flex flex-wrap gap-2">
                              {cofounder.previousStartups.map((startup, idx) => (
                                <span key={idx} className="px-3 py-1.5 bg-white text-gray-700 rounded-full text-sm font-medium border border-gray-200">
                                  {startup}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Achievements */}
                        {cofounder.achievements && cofounder.achievements.length > 0 && (
                          <div>
                            <p className="text-xs uppercase tracking-wider text-gray-600 font-bold mb-3">Achievements</p>
                            <div className="space-y-2">
                              {cofounder.achievements.map((achievement, idx) => (
                                <div key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                                  <Award className="w-4 h-4 text-gray-700 flex-shrink-0 mt-0.5" />
                                  <span className="font-medium">{achievement}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Education */}
                        {cofounder.education && (
                          <div>
                            <p className="text-xs uppercase tracking-wider text-gray-600 font-bold mb-2">Education</p>
                            <p className="text-gray-900 text-sm font-medium">{cofounder.education}</p>
                          </div>
                        )}

                        {/* Industries of Interest */}
                        {cofounder.industries && cofounder.industries.length > 0 && (
                          <div>
                            <p className="text-xs uppercase tracking-wider text-gray-600 font-bold mb-3">Industries of Interest</p>
                            <div className="flex flex-wrap gap-2">
                              {cofounder.industries.map((industry, idx) => (
                                <span key={idx} className="px-3 py-1.5 bg-white text-gray-700 rounded-full text-sm font-medium border border-gray-200">
                                  {industry}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* About Section - Full Width at Bottom */}
                    {cofounder.about && (
                      <div className="mt-6 pt-6 border-t border-gray-200">
                        <p className="text-xs uppercase tracking-wider text-gray-600 font-bold mb-2">About</p>
                        <p className="text-gray-700 text-sm leading-relaxed">{cofounder.about}</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
                  <button 
                    onClick={() => navigate(`/messages?matchId=${match.matchId || match.id}`)}
                    className="p-4 bg-black text-white rounded-xl hover:bg-gray-800 transition-all flex items-center justify-center gap-2 font-semibold"
                  >
                    <MessageCircle className="w-5 h-5" />
                    Start Chat
                  </button>
                  <button 
                    onClick={() => {
                      setCalendlyPrefill({
                        name: cofounder.name || '',
                        email: cofounder.email || ''
                      });
                      setShowCalendly(true);
                    }}
                    className="p-4 bg-gray-100 text-gray-900 rounded-xl hover:bg-gray-200 transition-all flex items-center justify-center gap-2 font-semibold"
                  >
                    <Calendar className="w-5 h-5" />
                    Schedule Call
                  </button>
                  <button 
                    onClick={() => navigate('/sprinting')}
                    className="p-4 bg-gray-700 text-white rounded-xl hover:bg-gray-800 transition-all flex items-center justify-center gap-2 font-semibold"
                  >
                    <Rocket className="w-5 h-5" />
                    Create Workspace
                  </button>
                </div>

                {/* Next Steps */}
                <div className="bg-gray-50 rounded-2xl p-5 border border-gray-200">
                  <h4 className="text-base font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <Lightbulb className="w-5 h-5 text-gray-700" />
                    What Happens After You Create Workspace
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 bg-gray-800 text-white rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold mt-0.5">1</div>
                      <p className="text-gray-700">Access your shared project board and task management</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 bg-gray-800 text-white rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold mt-0.5">2</div>
                      <p className="text-gray-700">Plan sprints and set milestones for your startup</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 bg-gray-800 text-white rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold mt-0.5">3</div>
                      <p className="text-gray-700">Track progress, assign tasks, and collaborate in real-time</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 bg-gray-800 text-white rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold mt-0.5">4</div>
                      <p className="text-gray-700">Build your MVP together with integrated tools and resources</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    );
  };

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

  if (showProfileModal && selectedProfile) {
    return (
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="sticky top-0 bg-gradient-to-r from-gray-800 to-gray-900 p-6 text-white rounded-t-3xl">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold">Founder Profile</h2>
              <button 
                onClick={() => {
                  setShowProfileModal(false);
                  setSelectedProfile(null);
                }}
                className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center">
                <User className="w-10 h-10 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold">{selectedProfile.name || 'Anonymous'}</h3>
                <p className="text-white/90">{selectedProfile.role || 'Founder'}</p>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 space-y-6">
            {/* Experience */}
            {selectedProfile.experience && (
              <div>
                <h4 className="text-xs uppercase tracking-wider text-gray-600 font-bold mb-3">Experience</h4>
                <p className="text-gray-900 font-semibold text-lg">{selectedProfile.experience}</p>
              </div>
            )}

            {/* About */}
            {selectedProfile.about && (
              <div>
                <h4 className="text-xs uppercase tracking-wider text-gray-600 font-bold mb-3">About</h4>
                <p className="text-gray-700 leading-relaxed">{selectedProfile.about}</p>
              </div>
            )}

            {/* Availability & Location */}
            <div className="grid md:grid-cols-2 gap-4">
              {selectedProfile.availability && (
                <div>
                  <h4 className="text-xs uppercase tracking-wider text-gray-600 font-bold mb-3">Availability</h4>
                  <div className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-gray-700" />
                    <p className="text-gray-900 font-semibold">{selectedProfile.availability}</p>
                  </div>
                </div>
              )}
              {selectedProfile.location && (
                <div>
                  <h4 className="text-xs uppercase tracking-wider text-gray-600 font-bold mb-3">Location</h4>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-gray-700" />
                    <p className="text-gray-900 font-semibold">{selectedProfile.location}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Skills */}
            {selectedProfile.skills && selectedProfile.skills.length > 0 && (
              <div>
                <h4 className="text-xs uppercase tracking-wider text-gray-600 font-bold mb-3">Skills</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedProfile.skills.map((skill, idx) => (
                    <span key={idx} className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm font-semibold">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Previous Startups */}
            {selectedProfile.previousStartups && selectedProfile.previousStartups.length > 0 && (
              <div>
                <h4 className="text-xs uppercase tracking-wider text-gray-600 font-bold mb-3">Previous Startups</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedProfile.previousStartups.map((startup, idx) => (
                    <span key={idx} className="px-4 py-2 bg-gray-100 text-gray-800 rounded-full text-sm font-semibold border border-gray-200">
                      {startup}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Achievements */}
            {selectedProfile.achievements && selectedProfile.achievements.length > 0 && (
              <div>
                <h4 className="text-xs uppercase tracking-wider text-gray-600 font-bold mb-3">Achievements</h4>
                <div className="space-y-3">
                  {selectedProfile.achievements.map((achievement, idx) => (
                    <div key={idx} className="flex items-start gap-3 bg-gray-50 p-3 rounded-xl">
                      <Award className="w-5 h-5 text-gray-700 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-800 font-medium">{achievement}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Education */}
            {selectedProfile.education && (
              <div>
                <h4 className="text-xs uppercase tracking-wider text-gray-600 font-bold mb-3">Education</h4>
                <p className="text-gray-900 font-semibold">{selectedProfile.education}</p>
              </div>
            )}

            {/* Industries */}
            {selectedProfile.industries && selectedProfile.industries.length > 0 && (
              <div>
                <h4 className="text-xs uppercase tracking-wider text-gray-600 font-bold mb-3">Industries of Interest</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedProfile.industries.map((industry, idx) => (
                    <span key={idx} className="px-4 py-2 bg-gray-100 text-gray-800 rounded-full text-sm font-semibold border border-gray-200">
                      {industry}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="sticky bottom-0 bg-gray-50 p-6 rounded-b-3xl border-t border-gray-200">
            <p className="text-sm text-gray-600 text-center mb-4">
              💡 Contact details will be shared after you accept their pitchback
            </p>
            <button 
              onClick={() => {
                setShowProfileModal(false);
                setSelectedProfile(null);
              }}
              className="w-full py-3 bg-gradient-to-r from-gray-800 to-gray-900 text-white rounded-xl font-bold hover:from-gray-700 hover:to-gray-800 transition-all duration-300"
            >
              Close Profile
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto p-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Pitchbacks</h1>
          <p className="text-gray-600">Manage pitchbacks you've received and sent. Accepted matches appear in the Matched tab.</p>
        </div>

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

      {/* Calendly Widget Modal */}
      <CalendlyWidget
        isOpen={showCalendly}
        onClose={() => setShowCalendly(false)}
        calendlyUrl="https://calendly.com/your-username/30min" // Replace with your actual Calendly link
        prefill={calendlyPrefill}
      />
    </div>
  );
};

export default MyPitches;
