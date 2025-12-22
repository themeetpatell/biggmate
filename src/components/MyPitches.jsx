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
  const [showModifyModal, setShowModifyModal] = useState(false);
  const [modifyingPitch, setModifyingPitch] = useState(null);
  const [modifiedMessage, setModifiedMessage] = useState('');

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
        fundingStage: "Pre-seed",
        equityOffer: "10-15% for technical cofounder",
        lookingFor: ["Technical Co-founder", "UI/UX Designer"],
        requiredSkills: ["AI/ML", "React", "Python", "System Architecture"],
        locationPreference: "Same city",
        availabilityPreference: "Full-time",
        industryPreferences: ["Sustainability", "Climate Tech"],
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
        fundingStage: "Seed",
        equityOffer: "8-12% for technical cofounder",
        lookingFor: ["Technical Co-founder", "Healthcare Expert"],
        requiredSkills: ["Healthcare Tech", "HIPAA Compliance", "Node.js", "Security"],
        locationPreference: "Same country",
        availabilityPreference: "Full-time",
        industryPreferences: ["Healthcare", "Medical Tech"],
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
        fundingStage: "Pre-seed",
        equityOffer: "10-15% for technical cofounder",
        lookingFor: ["Technical Co-founder", "UI/UX Designer"],
        requiredSkills: ["AI/ML", "React", "Python", "System Architecture"],
        locationPreference: "Same city",
        availabilityPreference: "Full-time",
        industryPreferences: ["Sustainability", "Climate Tech"]
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
        fundingStage: "Pre-seed",
        equityOffer: "10-15% for technical cofounder",
        lookingFor: ["Technical Co-founder", "UI/UX Designer"],
        requiredSkills: ["AI/ML", "React", "Python", "System Architecture"],
        locationPreference: "Same city",
        availabilityPreference: "Full-time",
        industryPreferences: ["Sustainability", "Climate Tech"]
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
        fundingStage: "Pre-seed",
        equityOffer: "10-15% for technical cofounder",
        lookingFor: ["Technical Co-founder", "UI/UX Designer"],
        requiredSkills: ["AI/ML", "React", "Python", "System Architecture"],
        locationPreference: "Same city",
        availabilityPreference: "Full-time",
        industryPreferences: ["Sustainability", "Climate Tech"]
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
        fundingStage: "Seed",
        equityOffer: "15-25% equity",
        lookingFor: ["Technical Co-founder", "Healthcare Expert"],
        requiredSkills: ["Healthcare Tech", "HIPAA Compliance", "Node.js", "Security"],
        locationPreference: "Same country",
        availabilityPreference: "Full-time",
        industryPreferences: ["Healthcare", "Medical Tech"]
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
        fundingStage: "Series A",
        equityOffer: "Open to discussion",
        lookingFor: ["Technical Co-founder", "Education Expert"],
        requiredSkills: ["AI/ML", "EdTech", "React Native", "Scalability"],
        locationPreference: "Anywhere",
        availabilityPreference: "Part-time",
        industryPreferences: ["Education", "EdTech"]
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

  const tabs = useMemo(() => {
    const pendingSent = sentPitches.filter(p => p.status === 'pending' || !p.status);
    const rejectedPitches = sentPitches.filter(p => p.status === 'rejected');
    
    return [
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
        count: pendingSent.length 
      },
      { 
        id: 'matched', 
        label: 'Matched', 
        description: 'Mutually accepted connections',
        icon: CheckCircle, 
        count: acceptedMatches.length 
      },
      { 
        id: 'rejected', 
        label: 'Rejected', 
        description: 'Pitchbacks that were not accepted',
        icon: XCircle, 
        count: rejectedPitches.length 
      }
    ];
  }, [receivedPitches.length, sentPitches.length, acceptedMatches.length]);

  const handleAcceptPitch = (pitchId) => {
    console.log('Accepting pitch:', pitchId);
  };

  const handleRejectPitch = (pitchId) => {
    console.log('Rejecting pitch:', pitchId);
  };

  const handleModifyPitchback = (pitch) => {
    setModifyingPitch(pitch);
    setModifiedMessage(pitch.myPitchback?.message || '');
    setShowModifyModal(true);
  };

  const handleSaveModifiedPitchback = () => {
    if (!modifyingPitch) return;
    
    // Update the pitch with the modified message
    const updatedPitches = sentPitches.map(p => 
      p.id === modifyingPitch.id 
        ? { ...p, myPitchback: { ...p.myPitchback, message: modifiedMessage } }
        : p
    );
    
    setSentPitches(updatedPitches);
    
    // Save to localStorage if needed
    localStorage.setItem('sentPitches', JSON.stringify(updatedPitches));
    
    // Close modal
    setShowModifyModal(false);
    setModifyingPitch(null);
    setModifiedMessage('');
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

  const renderSentPitches = () => {
    const pendingPitches = sentPitches.filter(p => p.status === 'pending' || !p.status);
    
    return (
      <div className="space-y-4 px-2 md:px-4 py-4">
        {pendingPitches.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-2xl border border-gray-200">
          <div className="max-w-md mx-auto px-4">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Send className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">No Pitchbacks Sent Yet</h3>
            <p className="text-gray-600 text-sm mb-6">Browse the Pitch Market and send pitchbacks to startup ideas that interest you.</p>
            <button
              onClick={() => window.location.href = '/home'}
              className="px-6 py-3 bg-black text-white rounded-xl font-medium hover:bg-gray-800 transition-all inline-flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              Browse Pitch Market
            </button>
          </div>
        </div>
      ) : (
        pendingPitches.map((pitch) => (
          <div key={pitch.id} className="bg-white rounded-2xl border border-gray-200">
            {/* Header with Status */}
            <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-3 text-[11px] md:text-sm text-gray-600">
                <div className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 md:w-4 md:h-4" />
                  <span className="whitespace-nowrap">Sent {pitch.sentAt}</span>
                </div>
                {pitch.status === 'pending' && (
                  <span className="px-2.5 py-1 text-[10px] md:text-xs font-medium rounded-full bg-gray-100 text-gray-700 whitespace-nowrap">
                    Awaiting Response
                  </span>
                )}
                {pitch.status === 'accepted' && (
                  <span className="px-2.5 py-1 text-[10px] md:text-xs font-medium rounded-full bg-green-100 text-green-700 whitespace-nowrap">
                    Accepted
                  </span>
                )}
                {pitch.status === 'rejected' && (
                  <span className="px-2.5 py-1 text-[10px] md:text-xs font-medium rounded-full bg-red-100 text-red-700 whitespace-nowrap">
                    Not Accepted
                  </span>
                )}
                <span className="px-2.5 py-1 bg-gray-100 text-gray-900 text-[10px] md:text-xs font-semibold rounded-full whitespace-nowrap">
                  {pitch.compatibility}% match
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="p-4">
              <div className="flex items-center gap-2.5 mb-3">
                <div className="w-9 h-9 bg-gray-900 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Target className="w-5 h-5 text-white" />
                </div>
                <h4 className="text-base font-bold text-gray-900">
                  About {pitch.anonymousPitch?.title || 'Startup'}
                </h4>
              </div>

              <div className="bg-gray-50 p-3 rounded-xl border border-gray-200 mb-3">
                <div className="flex items-center gap-1.5 flex-wrap mb-1.5">
                  <span className="text-xs font-semibold text-gray-900">About Startup</span>
                  {pitch.anonymousPitch?.stage && (
                    <span className="px-2 py-0.5 bg-gray-900 text-white rounded-full text-[10px] font-medium">
                      {pitch.anonymousPitch.stage}
                    </span>
                  )}
                  {pitch.anonymousPitch?.industry && (
                    <span className="px-2 py-0.5 bg-gray-200 text-gray-700 rounded-full text-[10px] font-medium">
                      {pitch.anonymousPitch.industry}
                    </span>
                  )}
                </div>
                <p className="text-gray-700 text-xs leading-relaxed">{pitch.anonymousPitch?.description}</p>
              </div>

              {/* Pitchback Message */}
              <div className="bg-gray-50 p-3 rounded-xl border border-gray-200">
                <h5 className="text-xs font-semibold text-gray-900 mb-1.5 flex items-center gap-1.5">
                  <MessageCircle className="w-3.5 h-3.5" />
                  My Pitchback
                </h5>
                <p className="text-gray-700 text-xs leading-relaxed">{pitch.myPitchback?.message || 'No message provided'}</p>
              </div>

              {pitch.response && (
                <div className="mt-3 bg-green-50 p-3 rounded-xl border border-green-200">
                  <h5 className="text-xs font-semibold text-green-900 mb-1.5 flex items-center gap-1.5">
                    <CheckCircle className="w-3.5 h-3.5" />
                    Response
                  </h5>
                  <p className="text-green-800 text-xs leading-relaxed">{pitch.response}</p>
                </div>
              )}

              {/* Action Buttons - Only show if not rejected */}
              {pitch.status !== 'rejected' && (
                <div className="flex items-center justify-between mt-3">
                  <div className="flex flex-wrap gap-2">
                    <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors text-xs font-medium flex items-center gap-1.5">
                      <X className="w-3.5 h-3.5" />
                      Withdraw
                    </button>
                    <button 
                      onClick={() => handleModifyPitchback(pitch)}
                      className="px-4 py-2 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors text-xs font-medium flex items-center gap-1.5"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                      Modify
                    </button>
                    <button className="px-4 py-2 bg-gray-900 text-white rounded-xl hover:bg-black transition-colors text-xs font-medium flex items-center gap-1.5">
                      <Rocket className="w-3.5 h-3.5" />
                      Boost
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))
      )}
    </div>
    );
  };

  const renderRejectedPitches = () => {
    const rejectedPitches = sentPitches.filter(p => p.status === 'rejected');
    
    return (
      <div className="space-y-4 px-2 md:px-4 py-4">
        {rejectedPitches.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl border border-gray-200">
            <div className="max-w-md mx-auto px-4">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <XCircle className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">No Rejected Pitchbacks</h3>
              <p className="text-gray-600 text-sm mb-6">Pitchbacks that were not accepted will appear here.</p>
            </div>
          </div>
        ) : (
          rejectedPitches.map((pitch) => (
            <div key={pitch.id} className="bg-white rounded-2xl border border-gray-200">
              {/* Header with Status */}
              <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between flex-wrap gap-2">
                <div className="flex items-center gap-3 text-[11px] md:text-sm text-gray-600">
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 md:w-4 md:h-4" />
                    <span className="whitespace-nowrap">Sent {pitch.sentAt}</span>
                  </div>
                  <span className="px-2.5 py-1 text-[10px] md:text-xs font-medium rounded-full bg-red-100 text-red-700 whitespace-nowrap">
                    Not Accepted
                  </span>
                  <span className="px-2.5 py-1 bg-gray-100 text-gray-900 text-[10px] md:text-xs font-semibold rounded-full whitespace-nowrap">
                    {pitch.compatibility}% match
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-4">
                <div className="flex items-center gap-2.5 mb-3">
                  <div className="w-9 h-9 bg-gray-900 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Target className="w-5 h-5 text-white" />
                  </div>
                  <h4 className="text-base font-bold text-gray-900">
                    About {pitch.anonymousPitch?.title || 'Startup'}
                  </h4>
                </div>

                <div className="bg-gray-50 p-3 rounded-xl border border-gray-200 mb-3">
                  <div className="flex items-center gap-1.5 flex-wrap mb-1.5">
                    <span className="text-xs font-semibold text-gray-900">About Startup</span>
                    {pitch.anonymousPitch?.stage && (
                      <span className="px-2 py-0.5 bg-gray-900 text-white rounded-full text-[10px] font-medium">
                        {pitch.anonymousPitch.stage}
                      </span>
                    )}
                    {pitch.anonymousPitch?.industry && (
                      <span className="px-2 py-0.5 bg-gray-200 text-gray-700 rounded-full text-[10px] font-medium">
                        {pitch.anonymousPitch.industry}
                      </span>
                    )}
                  </div>
                  <p className="text-gray-700 text-xs leading-relaxed">{pitch.anonymousPitch?.description}</p>
                </div>

                {/* Pitchback Message */}
                <div className="bg-gray-50 p-3 rounded-xl border border-gray-200">
                  <h5 className="text-xs font-semibold text-gray-900 mb-1.5 flex items-center gap-1.5">
                    <MessageCircle className="w-3.5 h-3.5" />
                    My Pitchback
                  </h5>
                  <p className="text-gray-700 text-xs leading-relaxed">{pitch.myPitchback?.message || 'No message provided'}</p>
                </div>

                {pitch.response && (
                  <div className="mt-3 bg-red-50 p-3 rounded-xl border border-red-200">
                    <h5 className="text-xs font-semibold text-red-900 mb-1.5 flex items-center gap-1.5">
                      <XCircle className="w-3.5 h-3.5" />
                      Response
                    </h5>
                    <p className="text-red-800 text-xs leading-relaxed">{pitch.response}</p>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    );
  };

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
    <div className="space-y-4 px-2 md:px-4 py-4">
      {Object.entries(groupedByPitch).map(([pitchTitle, { pitch, pitchbacks }]) => (
        <div key={pitchTitle} className="bg-white rounded-2xl border border-gray-200">
          {/* Pitch Header - Compact */}
          <div className="px-4 py-3 border-b border-gray-100">
            <div className="flex items-center justify-between gap-3 mb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 bg-gray-900 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Target className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h3 className="text-base md:text-lg font-bold text-gray-900">{pitchTitle}</h3>
                  <p className="text-[11px] text-gray-500">{pitchbacks.length} candidate{pitchbacks.length !== 1 ? 's' : ''} • {pitch?.stage || 'Early Stage'}</p>
                </div>
              </div>
              {pitch?.industry && (
                <span className="px-2.5 py-1 bg-gray-100 text-gray-700 rounded-full text-[11px] font-medium">
                  {pitch.industry}
                </span>
              )}
            </div>
            
            {/* What You're Looking For - At Pitch Level */}
            <div className="bg-gray-50 rounded-xl p-3 border border-gray-200">
              <p className="text-[10px] md:text-xs font-semibold text-gray-600 uppercase mb-2 flex items-center gap-1.5">
                <Users className="w-3 h-3" />
                You're Looking For
              </p>
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-2 md:gap-4 text-xs md:text-sm">
                {pitch?.lookingFor && pitch.lookingFor.length > 0 && (
                  <div>
                    <p className="text-gray-500 font-semibold mb-1 md:mb-2 text-[10px] md:text-xs">ROLE</p>
                    <div className="flex flex-wrap gap-1">
                      {pitch.lookingFor.map((role, idx) => (
                        <span key={idx} className="px-2 py-0.5 md:px-2.5 md:py-1 bg-purple-50 text-purple-700 rounded-full text-[10px] md:text-xs font-medium">
                          {role}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                {pitch?.requiredSkills && pitch.requiredSkills.length > 0 && (
                  <div>
                    <p className="text-gray-500 font-semibold mb-1 md:mb-2 text-[10px] md:text-xs">REQUIRED SKILLS</p>
                    <div className="flex flex-wrap gap-1">
                      {pitch.requiredSkills.map((skill, idx) => (
                        <span key={idx} className="px-2 py-0.5 md:px-2.5 md:py-1 bg-blue-50 text-blue-700 rounded-full text-[10px] md:text-xs font-medium">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                {pitch?.locationPreference && (
                  <div>
                    <p className="text-gray-500 font-semibold mb-1 md:mb-2 text-[10px] md:text-xs">LOCATION</p>
                    <p className="text-gray-900 font-medium text-[11px] md:text-sm flex items-center gap-1">
                      <MapPin className="w-3 h-3 md:w-3.5 md:h-3.5 text-gray-500" />
                      {pitch.locationPreference}
                    </p>
                  </div>
                )}
                {pitch?.availabilityPreference && (
                  <div>
                    <p className="text-gray-500 font-semibold mb-1 md:mb-2 text-[10px] md:text-xs">AVAILABILITY</p>
                    <p className="text-gray-900 font-medium text-[11px] md:text-sm flex items-center gap-1">
                      <Clock className="w-3 h-3 md:w-3.5 md:h-3.5 text-gray-500" />
                      {pitch.availabilityPreference}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Horizontal Scroll Layout for Mobile (Dating App Style) */}
          <div className="flex lg:grid lg:grid-cols-2 xl:grid-cols-3 gap-3 overflow-x-auto lg:overflow-x-visible snap-x snap-mandatory scrollbar-hide px-4 py-3">
            {pitchbacks.map((pitchback, idx) => (
              <div key={pitchback.id} className={`flex-shrink-0 w-[85vw] sm:w-[400px] lg:w-auto bg-white rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 border snap-center ${
                pitchback.status === 'pending' ? 'border-gray-200' : 
                pitchback.status === 'accepted' ? 'border-gray-300' : 
                pitchback.status === 'rejected' ? 'border-red-200 opacity-60' : 
                'border-gray-200'
              }`}>
                {/* Card Header - Compact Design */}
                <div className="bg-gray-900 px-4 py-2.5 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center text-[10px] font-bold text-white">
                      {idx + 1}
                    </div>
                    <span className="font-bold text-sm text-white">{pitchback.compatibility}% match</span>
                    {pitchback.status === 'pending' && (
                      <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></div>
                    )}
                  </div>
                  <span className="text-white/70 text-[10px] font-medium">{pitchback.receivedAt || 'Just now'}</span>
                </div>

                {/* Founder Profile */}
                <div className="p-4">
                  <div className="flex items-start gap-2.5 mb-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-gray-200 to-gray-300 rounded-full flex items-center justify-center flex-shrink-0">
                      <User className="w-5 h-5 text-gray-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-gray-900 text-sm truncate">{pitchback.author || 'Anonymous'}</h4>
                      <p className="text-xs text-gray-600">{pitchback.authorDetails?.experience || 'Experienced Founder'}</p>
                    </div>
                  </div>

                  {/* Key Info - Compact Grid */}
                  <div className="grid grid-cols-2 gap-2 mb-3">
                    {/* Skills */}
                    {pitchback.authorDetails?.skills && pitchback.authorDetails.skills.length > 0 && (
                      <div className="col-span-2">
                        <p className="text-[10px] text-gray-500 font-semibold mb-1 uppercase">Skills</p>
                        <div className="flex flex-wrap gap-1">
                          {pitchback.authorDetails.skills.slice(0, 3).map((skill, idx) => (
                            <span key={idx} className="px-2 py-0.5 bg-gray-100 text-gray-700 rounded-full text-[10px] font-medium">
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Role */}
                    {pitchback.authorDetails?.role && (
                      <div>
                        <p className="text-[10px] text-gray-500 font-semibold mb-0.5 uppercase">Role</p>
                        <p className="text-xs text-gray-700 font-medium">{pitchback.authorDetails.role}</p>
                      </div>
                    )}

                    {/* Location */}
                    {pitchback.authorDetails?.location && (
                      <div>
                        <p className="text-[10px] text-gray-500 font-semibold mb-0.5 uppercase">Location</p>
                        <div className="flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-gray-500" />
                          <span className="text-xs text-gray-700">{pitchback.authorDetails.location}</span>
                        </div>
                      </div>
                    )}

                    {/* Availability */}
                    {pitchback.authorDetails?.availability && (
                      <div>
                        <p className="text-[10px] text-gray-500 font-semibold mb-0.5 uppercase">Availability</p>
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3 text-gray-500" />
                          <span className="text-xs text-gray-700">{pitchback.authorDetails.availability}</span>
                        </div>
                      </div>
                    )}

                    {/* Previous Startups */}
                    {pitchback.authorDetails?.previousStartups && pitchback.authorDetails.previousStartups.length > 0 && (
                      <div>
                        <p className="text-[10px] text-gray-500 font-semibold mb-0.5 uppercase">Experience</p>
                        <div className="flex items-center gap-1">
                          <Rocket className="w-3 h-3 text-gray-500" />
                          <span className="text-xs text-gray-700">{pitchback.authorDetails.previousStartups.length} startup{pitchback.authorDetails.previousStartups.length !== 1 ? 's' : ''}</span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Pitchback Message - Compact */}
                  <div className="bg-gray-50 rounded-lg p-3 mb-3 border border-gray-200">
                    <div className="flex items-center gap-1.5 mb-1.5">
                      <MessageCircle className="w-3.5 h-3.5 text-gray-600" />
                      <p className="text-[10px] font-semibold text-gray-600 uppercase">Pitchback</p>
                    </div>
                    <p className="text-xs text-gray-800 leading-relaxed">
                      {pitchback.message || 'Interested in collaborating on your project!'}
                    </p>
                  </div>

                  {/* Action Buttons */}
                  {pitchback.status === 'pending' ? (
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleRejectPitch(pitchback.id)}
                        className="flex-1 py-2.5 bg-gray-200 text-gray-700 rounded-xl font-bold hover:bg-gray-300 transition-all duration-300 flex items-center justify-center gap-2"
                      >
                        <X className="w-4 h-4" />
                        Pass
                      </button>
                      <button
                        onClick={() => handleAcceptPitch(pitchback.id)}
                        className="flex-1 py-2.5 bg-gradient-to-r from-gray-800 to-gray-900 text-white rounded-xl font-bold hover:from-gray-700 hover:to-gray-800 transition-all duration-300 flex items-center justify-center gap-2 shadow-lg"
                      >
                        <CheckCircle className="w-4 h-4" />
                        Accept
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
                      className="w-full mt-2 py-1.5 text-gray-500 hover:text-gray-700 text-xs font-medium transition-colors flex items-center justify-center gap-1"
                    >
                      <User className="w-3.5 h-3.5" />
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
        <div className="text-center py-20 px-4 bg-white rounded-2xl border border-gray-200 mx-2 md:mx-4 my-4">
          <div className="max-w-md mx-auto">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">No Matches Yet</h3>
            <p className="text-gray-600 text-sm mb-6">You'll see matches here when you accept pitchbacks from the Received tab.</p>
            <button 
              onClick={() => setActiveTab('received')}
              className="px-6 py-3 bg-black text-white rounded-xl font-medium hover:bg-gray-800 transition-all inline-flex items-center gap-2"
            >
              View Received Pitchbacks
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      );
    }

    return (
      <div className="space-y-4 px-2 md:px-4 py-4">
        {acceptedMatches.map((match, idx) => {
          const cofounder = match.authorDetails || {};
          const yourPitch = match.yourPitch || {};
          
          return (
            <div key={match.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              {/* Match Header */}
              <div className="bg-gradient-to-r from-gray-800 to-gray-900 px-4 py-2.5 text-white">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center text-xs font-bold">
                      {idx + 1}
                    </div>
                    <span className="text-sm font-bold">It's a Match! 🎉</span>
                    <span className="text-[10px] text-white/70">Matched on {match.acceptedAt || '2 days ago'}</span>
                  </div>
                  <div className="px-2.5 py-1 bg-white/10 rounded-full">
                    <span className="text-xs font-semibold">{match.compatibility || '92'}% match</span>
                  </div>
                </div>
              </div>

              {/* Your Pitch Info */}
              <div className="px-4 pt-4 pb-3 bg-gray-50 border-b border-gray-200">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-black flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="text-sm font-bold text-gray-900">{yourPitch.title || 'Your Pitch'}</h4>
                      <span className="px-2 py-0.5 bg-black text-white rounded text-[10px] font-semibold">
                        {yourPitch.stage || 'MVP Stage'}
                      </span>
                      {yourPitch.industry && (
                        <span className="px-2 py-0.5 bg-gray-200 text-gray-700 rounded text-[10px] font-medium">
                          {yourPitch.industry}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-gray-600 leading-relaxed mb-2">
                      {yourPitch.description || 'Revolutionary platform that helps companies track and reduce their carbon footprint using advanced AI algorithms.'}
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-4">
                {/* Their Response */}
                {(match.theirPitchback?.message || match.message) && (
                  <div className="mb-4">
                    <div className="flex items-center gap-1.5 mb-2">
                      <MessageCircle className="w-3.5 h-3.5 text-gray-600" />
                      <h5 className="text-xs font-bold text-gray-900">Their Response</h5>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                      <p className="text-xs text-gray-700 italic leading-relaxed">
                        "{match.theirPitchback?.message || match.message}"
                      </p>
                      <p className="text-[10px] text-gray-500 mt-1.5">
                        Sent {match.theirPitchback?.sentAt || '3 days ago'}
                      </p>
                    </div>
                  </div>
                )}

                {/* About Founder */}
                <div className="mb-4">
                  <div className="flex items-center gap-1.5 mb-3">
                    <User className="w-3.5 h-3.5 text-gray-600" />
                    <h5 className="text-xs font-bold text-gray-900">About Founder</h5>
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                    {/* Founder Header */}
                    <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-200">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center flex-shrink-0">
                          <span className="text-lg font-bold text-gray-700">
                            {(cofounder.name || 'S')[0]}
                          </span>
                        </div>
                        <div>
                          <h5 className="text-sm font-bold text-gray-900">{cofounder.name || 'Sarah Martinez'}</h5>
                          <p className="text-xs text-gray-600">{cofounder.tagline || 'Building the future of tech'}</p>
                        </div>
                      </div>
                      {/* Social Icons */}
                      <div className="flex items-center gap-1.5">
                        <a 
                          href={cofounder.linkedin || 'https://linkedin.com'} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="w-7 h-7 rounded-xl bg-white border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors"
                        >
                          <Linkedin className="w-3.5 h-3.5 text-gray-700" />
                        </a>
                        <a 
                          href={cofounder.twitter || 'https://twitter.com'} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="w-7 h-7 rounded-xl bg-white border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors"
                        >
                          <Twitter className="w-3.5 h-3.5 text-gray-700" />
                        </a>
                        <a 
                          href={cofounder.github || 'https://github.com'} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="w-7 h-7 rounded-xl bg-white border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors"
                        >
                          <Github className="w-3.5 h-3.5 text-gray-700" />
                        </a>
                        <a 
                          href={cofounder.instagram || 'https://instagram.com'} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="w-7 h-7 rounded-xl bg-white border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors"
                        >
                          <Instagram className="w-3.5 h-3.5 text-gray-700" />
                        </a>
                      </div>
                    </div>

                    {/* Two Column Layout */}
                    <div className="grid grid-cols-2 gap-4">
                      {/* Left Column */}
                      <div className="space-y-3">
                        <div>
                          <p className="text-[10px] text-gray-500 font-semibold mb-1.5 uppercase">Experience</p>
                          <p className="text-xs text-gray-700">{cofounder.latestDesignation || 'Product Lead @ GreenTech Solutions'}</p>
                        </div>
                        <div>
                          <p className="text-[10px] text-gray-500 font-semibold mb-1.5 uppercase">Founder Role</p>
                          <p className="text-xs text-gray-700">{cofounder.founderRole || 'Technical Co-founder'}</p>
                        </div>
                        <div>
                          <p className="text-[10px] text-gray-500 font-semibold mb-1.5 uppercase">Availability</p>
                          <p className="text-xs text-gray-700">{cofounder.availability || 'Full-time, flexible hours'}</p>
                        </div>
                        <div>
                          <p className="text-[10px] text-gray-500 font-semibold mb-1.5 uppercase">Location</p>
                          <p className="text-xs text-gray-700 flex items-center gap-1">
                            <MapPin className="w-3 h-3 text-gray-500" />
                            {cofounder.location || 'Boston, MA'}
                          </p>
                        </div>
                        <div>
                          <p className="text-[10px] text-gray-500 font-semibold mb-1.5 uppercase">Skills</p>
                          <div className="flex flex-wrap gap-1">
                            {(cofounder.skills || ['Product Management', 'Sustainability', 'AI/ML']).slice(0, 3).map((skill, i) => (
                              <span key={i} className="px-2 py-0.5 bg-white border border-gray-300 text-gray-700 rounded text-[10px] font-medium">
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Right Column */}
                      <div className="space-y-3">
                        <div>
                          <p className="text-[10px] text-gray-500 font-semibold mb-1.5 uppercase">Previous Startups</p>
                          {(cofounder.previousStartups || ['GreenTech Solutions', 'EcoVentures']).map((startup, i) => (
                            <p key={i} className="text-xs text-gray-700 mb-1">• {startup}</p>
                          ))}
                        </div>
                        <div>
                          <p className="text-[10px] text-gray-500 font-semibold mb-1.5 uppercase">Achievements</p>
                          {(cofounder.achievements || [
                            'Led 3 successful product launches',
                            'Raised $2M+ in funding'
                          ]).map((achievement, i) => (
                            <p key={i} className="text-xs text-gray-700 mb-1 flex items-start gap-1">
                              <Award className="w-3 h-3 text-gray-500 mt-0.5 flex-shrink-0" />
                              <span>{achievement}</span>
                            </p>
                          ))}
                        </div>
                        <div>
                          <p className="text-[10px] text-gray-500 font-semibold mb-1.5 uppercase">Education</p>
                          <p className="text-xs text-gray-700">{cofounder.education || 'MIT - Computer Science & Environmental Engineering'}</p>
                        </div>
                        <div>
                          <p className="text-[10px] text-gray-500 font-semibold mb-1.5 uppercase">Industries of Interest</p>
                          <div className="flex flex-wrap gap-1">
                            {(cofounder.industries || ['Sustainability', 'Climate Tech', 'AI']).slice(0, 3).map((industry, i) => (
                              <span key={i} className="px-2 py-0.5 bg-white border border-gray-300 text-gray-700 rounded text-[10px] font-medium">
                                {industry}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* About Section */}
                    {cofounder.about && (
                      <div className="mt-3 pt-3 border-t border-gray-200">
                        <p className="text-[10px] text-gray-500 font-semibold mb-1.5 uppercase">About</p>
                        <p className="text-xs text-gray-700 leading-relaxed">
                          {cofounder.about}
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="grid grid-cols-3 gap-2 mb-3">
                  <button
                    onClick={() => navigate(`/messages?matchId=${match.matchId || match.id}`)}
                    className="py-2.5 bg-black text-white rounded-xl text-xs font-semibold hover:bg-gray-800 transition-colors flex items-center justify-center gap-1.5"
                  >
                    <MessageCircle className="w-4 h-4" />
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
                    className="py-2.5 bg-white text-gray-900 border border-gray-300 rounded-xl text-xs font-semibold hover:bg-gray-50 transition-colors flex items-center justify-center gap-1.5"
                  >
                    <Calendar className="w-4 h-4" />
                    Schedule Call
                  </button>
                  <button
                    onClick={() => navigate('/sprinting')}
                    className="py-2.5 bg-gradient-to-r from-gray-800 to-gray-900 text-white rounded-xl text-xs font-semibold hover:from-gray-700 hover:to-gray-800 transition-colors flex items-center justify-center gap-1.5"
                  >
                    <Rocket className="w-4 h-4" />
                    Create Workspace
                  </button>
                </div>

                {/* What Happens After */}
                <div className="mt-3 pt-3 border-t border-gray-200">
                  <div className="flex items-center gap-1.5 mb-2">
                    <Lightbulb className="w-3.5 h-3.5 text-gray-600" />
                    <h6 className="text-xs font-bold text-gray-900">What Happens After You Create Workspace</h6>
                  </div>
                  <div className="space-y-1.5">
                    {[
                      'Access your shared project board and task management',
                      'Plan sprints and set milestones for your startup',
                      'Build your MVP together with integrated tools and resources',
                      'Track progress, assign tasks, and collaborate in real-time'
                    ].map((item, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <div className="w-4 h-4 rounded-full bg-gray-800 text-white flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-[9px] font-bold">{i + 1}</span>
                        </div>
                        <p className="text-xs text-gray-600 leading-relaxed">{item}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
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
        <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[85vh] overflow-y-auto">
          {/* Header */}
          <div className="sticky top-0 bg-gray-900 px-5 py-4 text-white rounded-t-2xl flex items-center justify-between">
            <h2 className="text-lg font-bold">Founder Profile</h2>
            <button 
              onClick={() => {
                setShowProfileModal(false);
                setSelectedProfile(null);
              }}
              className="w-8 h-8 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-all"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Profile Header */}
          <div className="px-5 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-xl font-bold text-gray-700">
                    {(selectedProfile.name || 'A')[0]}
                  </span>
                </div>
                <div>
                  <h3 className="text-base font-bold text-gray-900">{selectedProfile.name || 'Anonymous'}</h3>
                  <p className="text-sm text-gray-600">{selectedProfile.tagline || 'Building the future of tech'}</p>
                </div>
              </div>
              {/* Social Icons */}
              <div className="flex items-center gap-1.5">
                <a 
                  href={selectedProfile.linkedin || 'https://linkedin.com'} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-7 h-7 rounded-xl bg-gray-100 border border-gray-300 flex items-center justify-center hover:bg-gray-200 transition-colors"
                >
                  <Linkedin className="w-3.5 h-3.5 text-gray-700" />
                </a>
                <a 
                  href={selectedProfile.twitter || 'https://twitter.com'} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-7 h-7 rounded-xl bg-gray-100 border border-gray-300 flex items-center justify-center hover:bg-gray-200 transition-colors"
                >
                  <Twitter className="w-3.5 h-3.5 text-gray-700" />
                </a>
                <a 
                  href={selectedProfile.github || 'https://github.com'} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-7 h-7 rounded-xl bg-gray-100 border border-gray-300 flex items-center justify-center hover:bg-gray-200 transition-colors"
                >
                  <Github className="w-3.5 h-3.5 text-gray-700" />
                </a>
                <a 
                  href={selectedProfile.instagram || 'https://instagram.com'} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-7 h-7 rounded-xl bg-gray-100 border border-gray-300 flex items-center justify-center hover:bg-gray-200 transition-colors"
                >
                  <Instagram className="w-3.5 h-3.5 text-gray-700" />
                </a>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="px-5 py-4">
            {/* Two Column Layout */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Left Column */}
              <div className="space-y-4">
                {/* Experience */}
                <div>
                  <h4 className="text-[10px] uppercase tracking-wider text-gray-500 font-semibold mb-2">Experience</h4>
                  <p className="text-gray-900 text-sm">{selectedProfile.latestDesignation || 'Product Lead @ GreenTech Solutions'}</p>
                </div>

                {/* Founder Role */}
                <div>
                  <h4 className="text-[10px] uppercase tracking-wider text-gray-500 font-semibold mb-2">Founder Role</h4>
                  <p className="text-gray-900 text-sm">{selectedProfile.founderRole || 'Technical Co-founder'}</p>
                </div>

                {/* Availability */}
                <div>
                  <h4 className="text-[10px] uppercase tracking-wider text-gray-500 font-semibold mb-2">Availability</h4>
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-gray-500" />
                    <p className="text-gray-900 text-sm">{selectedProfile.availability || 'Full-time, flexible hours'}</p>
                  </div>
                </div>

                {/* Location */}
                <div>
                  <h4 className="text-[10px] uppercase tracking-wider text-gray-500 font-semibold mb-2">Location</h4>
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-gray-500" />
                    <p className="text-gray-900 text-sm">{selectedProfile.location || 'Boston, MA'}</p>
                  </div>
                </div>

                {/* Skills */}
                <div>
                  <h4 className="text-[10px] uppercase tracking-wider text-gray-500 font-semibold mb-2">Skills</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {(selectedProfile.skills || ['Product Management', 'Sustainability', 'AI/ML']).map((skill, idx) => (
                      <span key={idx} className="px-2.5 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium border border-gray-200">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-4">
                {/* Previous Startups */}
                <div>
                  <h4 className="text-[10px] uppercase tracking-wider text-gray-500 font-semibold mb-2">Previous Startups</h4>
                  {(selectedProfile.previousStartups || ['GreenTech Solutions', 'EcoVentures']).map((startup, idx) => (
                    <p key={idx} className="text-gray-900 text-sm mb-1.5">• {startup}</p>
                  ))}
                </div>

                {/* Achievements */}
                <div>
                  <h4 className="text-[10px] uppercase tracking-wider text-gray-500 font-semibold mb-2">Achievements</h4>
                  {(selectedProfile.achievements || [
                    'Led 3 successful product launches',
                    'Raised $2M+ in funding'
                  ]).map((achievement, idx) => (
                    <div key={idx} className="flex items-start gap-2 mb-1.5">
                      <Award className="w-3.5 h-3.5 text-gray-500 mt-0.5 flex-shrink-0" />
                      <p className="text-gray-900 text-sm">{achievement}</p>
                    </div>
                  ))}
                </div>

                {/* Education */}
                <div>
                  <h4 className="text-[10px] uppercase tracking-wider text-gray-500 font-semibold mb-2">Education</h4>
                  <p className="text-gray-900 text-sm">{selectedProfile.education || 'MIT - Computer Science & Environmental Engineering'}</p>
                </div>

                {/* Industries of Interest */}
                <div>
                  <h4 className="text-[10px] uppercase tracking-wider text-gray-500 font-semibold mb-2">Industries of Interest</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {(selectedProfile.industries || ['Sustainability', 'Climate Tech', 'AI']).map((industry, idx) => (
                      <span key={idx} className="px-2.5 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium border border-gray-200">
                        {industry}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* About Section - Full Width */}
            {selectedProfile.about && (
              <div className="mt-6 pt-4 border-t border-gray-200">
                <h4 className="text-[10px] uppercase tracking-wider text-gray-500 font-semibold mb-2">About</h4>
                <p className="text-gray-700 text-sm leading-relaxed">
                  {selectedProfile.about || "I'm really impressed with your EcoTrack AI idea! I have 7+ years in sustainability tech and think our platforms could complement each other perfectly. I'd love to discuss how we could collaborate or potentially merge our visions."}
                </p>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="sticky bottom-0 bg-gray-50 px-5 py-4 rounded-b-2xl border-t border-gray-200">
            <p className="text-xs text-gray-600 text-center mb-3 flex items-center justify-center gap-1.5">
              <span>💡</span>
              <span>Contact details will be shared after you accept their pitchback</span>
            </p>
            <button 
              onClick={() => {
                setShowProfileModal(false);
                setSelectedProfile(null);
              }}
              className="w-full py-2.5 bg-gray-900 text-white rounded-xl text-sm font-semibold hover:bg-gray-800 transition-colors"
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
      <div className="max-w-6xl mx-auto">
        {/* Tabs - Clean Instagram style */}
        <div className="bg-white sticky top-0 z-10 border-b border-gray-200">
          <div className="flex overflow-x-auto scrollbar-hide">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-shrink-0 flex items-center justify-center gap-2 py-4 px-6 transition-all duration-200 border-b-2 ${
                    activeTab === tab.id
                      ? 'border-gray-900'
                      : 'border-transparent'
                  }`}
                >
                  <Icon className={`w-5 h-5 ${activeTab === tab.id ? 'text-gray-900' : 'text-gray-400'}`} />
                  <span className={`text-sm md:text-base font-medium whitespace-nowrap ${activeTab === tab.id ? 'text-gray-900' : 'text-gray-500'}`}>
                    {tab.label}
                  </span>
                  <span className={`text-sm font-semibold ${activeTab === tab.id ? 'text-gray-900' : 'text-gray-400'}`}>
                    {tab.count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab Content - Scrollable */}
        <div className="overflow-y-auto">
          {activeTab === 'received' && renderReceivedPitches()}
          {activeTab === 'sent' && renderSentPitches()}
          {activeTab === 'matched' && renderAcceptedMatches()}
          {activeTab === 'rejected' && renderRejectedPitches()}
        </div>
      </div>

      {/* Calendly Widget Modal */}
      <CalendlyWidget
        isOpen={showCalendly}
        onClose={() => setShowCalendly(false)}
        calendlyUrl="https://calendly.com/your-username/30min" // Replace with your actual Calendly link
        prefill={calendlyPrefill}
      />

      {/* Modify Pitchback Modal */}
      {showModifyModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900">Modify Your Pitchback</h2>
              <button
                onClick={() => {
                  setShowModifyModal(false);
                  setModifyingPitch(null);
                  setModifiedMessage('');
                }}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            {/* Show what they're pitching to */}
            {modifyingPitch?.anonymousPitch && (
              <div className="mb-4 p-3 bg-gray-50 rounded-xl border border-gray-200">
                <h3 className="text-xs font-semibold text-gray-600 mb-2">Pitching to:</h3>
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 bg-gray-900 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Target className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-gray-900">{modifyingPitch.anonymousPitch.title}</h4>
                    <p className="text-xs text-gray-600">{modifyingPitch.anonymousPitch.industry} • {modifyingPitch.anonymousPitch.stage}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Message Editor */}
            <div className="mb-4">
              <label className="block text-xs font-semibold text-gray-900 mb-2">
                Your Pitchback Message
              </label>
              <textarea
                value={modifiedMessage}
                onChange={(e) => setModifiedMessage(e.target.value)}
                placeholder="Tell them why you're interested and what you bring to the table..."
                className="w-full h-48 p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-black focus:border-transparent resize-none text-sm text-gray-900"
                maxLength={1000}
              />
              <div className="flex items-center justify-between mt-2">
                <p className="text-xs text-gray-500">
                  {modifiedMessage.length}/1000 characters
                </p>
                <p className="text-xs text-gray-500">
                  Be specific about your skills and interest
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2">
              <button
                onClick={() => {
                  setShowModifyModal(false);
                  setModifyingPitch(null);
                  setModifiedMessage('');
                }}
                className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-xl text-sm font-medium hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveModifiedPitchback}
                disabled={!modifiedMessage.trim() || modifiedMessage === modifyingPitch?.myPitchback?.message}
                className="flex-1 px-4 py-2 bg-black text-white rounded-xl text-sm font-medium hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyPitches;
