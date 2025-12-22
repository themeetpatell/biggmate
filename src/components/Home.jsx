import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
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
  Repeat2,
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
  Lightbulb,
  Pill,
  MessageSquare,
  MessagesSquare,
  Syringe
} from 'lucide-react';

const Home = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  
  const [pitches, setPitches] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [likedPitches, setLikedPitches] = useState(new Set());
  const [lovedPitches, setLovedPitches] = useState(new Set());
  const [bookmarkedPitches, setBookmarkedPitches] = useState(new Set());
  const [repostedPitches, setRepostedPitches] = useState(new Set());
  const [showCommentModal, setShowCommentModal] = useState(false);
  const [commentPitch, setCommentPitch] = useState(null);
  const [commentText, setCommentText] = useState('');
  const [showPitchModal, setShowPitchModal] = useState(false);
  const [selectedPitch, setSelectedPitch] = useState(null);
  const [pitchMessage, setPitchMessage] = useState('');
  const [showCreatePitch, setShowCreatePitch] = useState(false);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [pitchReminder, setPitchReminder] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedPitchDetails, setSelectedPitchDetails] = useState(null);
  const [showPitchbackModal, setShowPitchbackModal] = useState(false);
  const [selectedPitchback, setSelectedPitchback] = useState(null);
  const [pitchbackMessage, setPitchbackMessage] = useState('');
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [pitchForm, setPitchForm] = useState({
    startupName: '',
    industry: '',
    oneLineDescription: '',
    problem: '',
    solution: '',
    targetMarket: '',
    businessModel: '',
    marketSize: '',
    currentStage: '',
    lookingForRole: '',
    requiredSkills: [],
    whatYouBring: '',
    location: '',
    timeline: '',
    fundingStage: '',
    equityOffer: '',
    additionalInfo: '',
    availabilityPreference: '',
    industryPreferences: '',
    locationPreference: ''
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('recent');
  const [filters, setFilters] = useState({
    industry: '',
    stage: '',
    location: ''
  });

  useEffect(() => {
    const shouldOpen = localStorage.getItem('openCreatePitch') === 'true';
    if (shouldOpen) {
      setShowCreatePitch(true);
      localStorage.removeItem('openCreatePitch');
    }
  }, []);

  useEffect(() => {
    const title = localStorage.getItem('startupTitle');
    const stage = localStorage.getItem('startupStage');
    const oneLiner = localStorage.getItem('startupOneliner');
    if (title || stage || oneLiner) {
      setPitchReminder({
        title: title || 'Your startup',
        stage: stage || '',
        oneLiner: oneLiner || ''
      });
    }
  }, []);

  // Mock pitch data with more comprehensive information
  const generateMockPitches = (pageNum) => {
    const basePitches = [
    {
      id: 1,
        title: "EcoTrack AI",
        shortDescription: "AI-powered carbon footprint tracking for businesses",
        description: "Revolutionary platform that helps companies track and reduce their carbon footprint using advanced AI algorithms. Our solution provides real-time monitoring, predictive analytics, and actionable insights to help businesses achieve their sustainability goals.",
        problem: "Companies struggle to accurately track and reduce their carbon footprint due to fragmented data sources, lack of real-time monitoring, and insufficient actionable insights. The carbon management market is fragmented with no comprehensive solution that provides end-to-end tracking, predictive analytics, and compliance reporting. Businesses face increasing regulatory pressure and stakeholder demands for sustainability transparency, but lack the tools to effectively measure and improve their environmental impact.",
        solution: "EcoTrack AI is a comprehensive carbon footprint management platform that uses advanced AI algorithms to aggregate data from multiple sources (energy, transportation, supply chain, etc.), provide real-time monitoring and predictive analytics, and deliver actionable insights to help businesses reduce emissions. Our solution includes automated compliance reporting, carbon offset recommendations, and sustainability goal tracking. We use machine learning to identify patterns and predict future emissions, enabling proactive carbon reduction strategies.",
        industry: "Sustainability",
        stage: "MVP Stage",
        stageColor: "green",
        lookingFor: ["Technical Co-founder", "UI/UX Designer"],
        locationPreference: "Same city",
        equityOffer: "20-30% equity",
        author: {
          name: "Anonymous",
          role: "Business Co-founder",
          location: "San Francisco, CA",
          avatar: null, // Anonymous - no avatar
          experience: "5+ years in sustainability tech",
          previousStartups: ["GreenTech Solutions", "EcoVentures"],
          skills: ["Business Strategy", "Sustainability", "Operations"],
          // Anonymous profile details
          anonymousProfile: {
            experience: "5+ years in sustainability tech",
            skills: ["Business Strategy", "Sustainability", "Operations"],
            previousStartups: ["GreenTech Solutions", "EcoVentures"],
            education: "MBA from Stanford",
            achievements: ["Led 3 successful product launches", "Raised $2M+ in funding"],
            workStyle: "Data-driven, collaborative",
            availability: "Full-time, flexible hours"
          }
        },
        compatibility: 92,
        tags: ["AI", "Sustainability", "B2B"],
        metrics: {
          views: 245,
          likes: 18,
          pitches: 12,
          comments: 8,
          reposts: 5
        },
        comments: [
          {
            author: "Sarah Johnson",
            text: "This is exactly what the market needs! The carbon tracking space is ripe for disruption. Love the AI-powered analytics approach.",
            timestamp: "2 hours ago"
          },
          {
            author: "Michael Chen",
            text: "Great idea! Have you considered partnering with carbon offset providers? That could be a good revenue stream.",
            timestamp: "1 hour ago"
          },
          {
            author: "Emma Davis",
            text: "Impressive! The predictive analytics feature sounds game-changing. Would love to learn more about your tech stack.",
            timestamp: "45 minutes ago"
          }
        ],
        timeline: "6-12 months to market",
        market: "Carbon management software market ($12B)",
        funding: "Pre-seed, seeking $500K",
        createdAt: "2 hours ago",
        imageUrl: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=400&h=300&fit=crop"
    },
    {
      id: 2,
        title: "HealthConnect",
        shortDescription: "Telemedicine platform connecting patients with specialists",
        description: "Comprehensive telemedicine solution that connects patients with specialized healthcare providers through AI-powered matching. Our platform ensures quality care delivery while reducing wait times and improving patient outcomes.",
        problem: "Patients face significant challenges accessing specialized healthcare: long wait times (often 3-6 months for specialist appointments), geographic barriers preventing access to top specialists, and difficulty finding the right specialist for their specific condition. The current healthcare system is fragmented, with poor coordination between primary care and specialists, leading to delayed diagnoses and suboptimal patient outcomes.",
        solution: "HealthConnect is an AI-powered telemedicine platform that matches patients with specialized healthcare providers based on their medical history, symptoms, and needs. Our platform enables video consultations with specialists, provides seamless care coordination, and reduces wait times from months to days. We use machine learning to match patients with the most appropriate specialists, ensure quality care delivery, and provide comprehensive medical record management. The platform includes features for follow-up care, prescription management, and integration with existing healthcare systems.",
        industry: "Healthcare",
        stage: "Early Stage",
        stageColor: "yellow",
        lookingFor: ["Technical Co-founder", "Product Manager", "Marketing Expert"],
        locationPreference: "Same country",
        equityOffer: "15-25% equity",
        author: {
          name: "Dr. Michael Chen",
          role: "Medical Co-founder",
          location: "Boston, MA",
          avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
          experience: "8+ years in healthcare",
          previousStartups: ["MedTech Innovations"],
          skills: ["Medical Technology", "Healthcare", "AI"],
          // Anonymous profile details
          anonymousProfile: {
            experience: "8+ years in healthcare technology",
            skills: ["Medical Technology", "Healthcare", "AI", "Telemedicine"],
            previousStartups: ["MedTech Innovations"],
            education: "MD from Harvard Medical School",
            achievements: ["Published 15+ research papers", "Led 2 successful medical device launches"],
            workStyle: "Analytical, patient-focused",
            availability: "Full-time, flexible schedule"
          }
        },
        compatibility: 88,
        tags: ["Healthcare", "Telemedicine", "AI"],
        metrics: {
          views: 189,
          likes: 25,
          pitches: 8,
          comments: 5,
          reposts: 3
        },
        comments: [],
        timeline: "9-15 months to market",
        market: "Telemedicine market ($185B)",
        funding: "Seed stage, seeking $1M",
        createdAt: "4 hours ago",
        imageUrl: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=300&fit=crop"
        },
        {
          id: 3,
        title: "EduFlow",
        shortDescription: "Personalized learning platform for K-12 education",
        description: "Adaptive learning platform that personalizes education for each student using machine learning and gamification. Our solution helps teachers create engaging, effective learning experiences while tracking student progress in real-time.",
        problem: "Traditional one-size-fits-all education fails to meet individual student needs, leading to disengagement, learning gaps, and poor academic outcomes. Teachers struggle to personalize instruction for 25-30 students with varying learning styles, paces, and abilities. Students who fall behind often stay behind, while advanced students become bored and disengaged. The education system lacks real-time insights into student progress and adaptive content delivery.",
        solution: "EduFlow is an adaptive learning platform that uses machine learning and gamification to personalize education for each K-12 student. Our platform analyzes individual learning patterns, adapts content difficulty in real-time, and provides engaging gamified experiences that motivate students. Teachers receive real-time insights into student progress, can create customized learning paths, and access AI-generated recommendations for intervention. The platform includes interactive content, progress tracking, and comprehensive analytics to help educators make data-driven instructional decisions.",
        industry: "Education",
        stage: "Idea Stage",
        stageColor: "blue",
        lookingFor: ["Technical Co-founder", "UI/UX Designer", "Content Creator"],
        locationPreference: "Anywhere",
        equityOffer: "Open to discussion",
        author: {
          name: "Emily Rodriguez",
          role: "Education Co-founder",
          location: "Austin, TX",
          avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
          experience: "6+ years in EdTech",
          previousStartups: ["LearnTech", "EduVentures"],
          skills: ["Education Technology", "Curriculum Design", "Learning Analytics"],
          // Anonymous profile details
          anonymousProfile: {
            experience: "6+ years in educational technology",
            skills: ["Education Technology", "Curriculum Design", "Learning Analytics", "Gamification"],
            previousStartups: ["LearnTech", "EduVentures"],
            education: "PhD in Educational Psychology from UT Austin",
            achievements: ["Designed curriculum for 50+ schools", "Won EdTech Innovation Award 2023"],
            workStyle: "Creative, student-centered",
            availability: "Part-time, evenings and weekends"
          }
        },
        compatibility: 85,
        tags: ["Education", "AI", "Gamification"],
        metrics: {
          views: 156,
          likes: 14,
          pitches: 6,
          comments: 3
        },
        timeline: "12-18 months to market",
        market: "EdTech market ($404B)",
        funding: "Pre-seed, seeking $300K",
        createdAt: "6 hours ago",
        imageUrl: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&h=300&fit=crop"
        },
        {
          id: 4,
        title: "FinFlow Pro",
        shortDescription: "AI-powered financial planning for small businesses",
        description: "Comprehensive financial management platform that uses AI to provide personalized financial planning, budgeting, and investment advice for small businesses. Our solution helps entrepreneurs make informed financial decisions.",
        industry: "FinTech",
        stage: "MVP Stage",
        stageColor: "green",
        lookingFor: ["Technical Co-founder", "Financial Advisor", "Marketing Expert"],
        author: {
          name: "David Kim",
          role: "Finance Co-founder",
          location: "Seattle, WA",
          avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
          experience: "7+ years in fintech",
          previousStartups: ["PayTech", "InvestFlow"],
          skills: ["Financial Technology", "AI/ML", "Business Strategy"],
          // Anonymous profile details
          anonymousProfile: {
            experience: "7+ years in financial technology",
            skills: ["Financial Technology", "AI/ML", "Business Strategy", "Investment Analysis"],
            previousStartups: ["PayTech", "InvestFlow"],
            education: "MBA in Finance from Wharton",
            achievements: ["Built 3 successful fintech products", "Raised $5M+ in funding"],
            workStyle: "Analytical, risk-aware",
            availability: "Full-time, flexible hours"
          }
        },
        compatibility: 90,
        tags: ["FinTech", "AI", "SMB"],
        metrics: {
          views: 312,
          likes: 32,
          pitches: 15,
          comments: 12
        },
        timeline: "6-9 months to market",
        market: "SMB fintech market ($8.2B)",
        funding: "Seed stage, seeking $750K",
        createdAt: "8 hours ago",
        imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop"
      },
      {
        id: 5,
        title: "FoodTech Connect",
        shortDescription: "B2B marketplace connecting restaurants with local suppliers",
        description: "Innovative marketplace platform that connects restaurants with local food suppliers, reducing costs and improving supply chain efficiency. Our solution includes inventory management, quality tracking, and automated ordering.",
        industry: "Food & Beverage",
        stage: "Early Stage",
        stageColor: "yellow",
        lookingFor: ["Technical Co-founder", "Operations Manager", "Sales Expert"],
        author: {
          name: "Maria Garcia",
          role: "Operations Co-founder",
          location: "Miami, FL",
          avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face",
          experience: "4+ years in food industry",
          previousStartups: ["FreshSupply"],
          skills: ["Supply Chain", "Operations", "Food Technology"],
          // Anonymous profile details
          anonymousProfile: {
            experience: "4+ years in food industry operations",
            skills: ["Supply Chain", "Operations", "Food Technology", "Logistics"],
            previousStartups: ["FreshSupply"],
            education: "BS in Supply Chain Management from FIU",
            achievements: ["Optimized supply chain for 100+ restaurants", "Reduced food waste by 30%"],
            workStyle: "Detail-oriented, efficiency-focused",
            availability: "Full-time, flexible schedule"
          }
        },
        compatibility: 87,
        tags: ["FoodTech", "B2B", "Marketplace"],
        metrics: {
          views: 198,
          likes: 21,
          pitches: 9,
          comments: 6
        },
        timeline: "9-12 months to market",
        market: "Food tech market ($220B)",
        funding: "Pre-seed, seeking $400K",
        createdAt: "12 hours ago",
        imageUrl: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop"
      },
      {
        id: 6,
        title: "PropTech Solutions",
        shortDescription: "Smart property management platform for real estate",
        description: "Comprehensive property management platform that uses IoT sensors and AI to optimize building operations, reduce energy costs, and improve tenant satisfaction. Our solution provides real-time monitoring and predictive maintenance.",
        industry: "Real Estate",
        stage: "Idea Stage",
        stageColor: "blue",
        lookingFor: ["Technical Co-founder", "Real Estate Expert", "IoT Specialist"],
        author: {
          name: "James Wilson",
          role: "Real Estate Co-founder",
          location: "Chicago, IL",
          avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face",
          experience: "10+ years in real estate",
          previousStartups: ["PropVentures"],
          skills: ["Real Estate", "Property Management", "Technology"],
          // Anonymous profile details
          anonymousProfile: {
            experience: "10+ years in real estate technology",
            skills: ["Real Estate", "Property Management", "Technology", "IoT"],
            previousStartups: ["PropVentures"],
            education: "MBA in Real Estate from Northwestern",
            achievements: ["Managed 500+ properties", "Developed 2 proptech solutions"],
            workStyle: "Strategic, technology-forward",
            availability: "Full-time, flexible hours"
          }
        },
        compatibility: 83,
        tags: ["PropTech", "IoT", "AI"],
        metrics: {
          views: 167,
          likes: 19,
          pitches: 7,
          comments: 4
        },
        timeline: "12-18 months to market",
        market: "PropTech market ($86B)",
        funding: "Pre-seed, seeking $600K",
        createdAt: "1 day ago",
        imageUrl: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400&h=300&fit=crop"
      }
    ];

    // Simulate pagination by duplicating and modifying pitches
    return basePitches.map(pitch => ({
      ...pitch,
      targetMarket: pitch.targetMarket || 'Not specified',
      businessModel: pitch.businessModel || 'Not specified',
      equityOffer: pitch.equityOffer || 'Open to discussion',
      additionalInfo: pitch.additionalInfo || '',
      tags: [],
      author: {
        ...pitch.author,
        summary: pitch.author?.summary || pitch.author?.experience || pitch.author?.role || 'Founder',
        anonymousProfile: {
          ...pitch.author?.anonymousProfile,
          experience: pitch.author?.anonymousProfile?.experience || pitch.author?.experience || 'Not specified',
          availability: pitch.author?.anonymousProfile?.availability || pitch.timeline || 'Flexible',
          workStyle: pitch.author?.anonymousProfile?.workStyle || 'Collaborative',
          education: pitch.author?.anonymousProfile?.education || 'Not specified'
        }
      },
      id: pitch.id + (pageNum - 1) * 6,
      createdAt: `${Math.floor(Math.random() * 24)} hours ago`,
      metrics: {
        ...pitch.metrics,
        views: pitch.metrics.views + Math.floor(Math.random() * 100),
        likes: pitch.metrics.likes + Math.floor(Math.random() * 20),
        pitches: pitch.metrics.pitches + Math.floor(Math.random() * 10)
      }
    }));
  };

  // Load more pitches
  const loadMorePitches = useCallback(() => {
    if (loading || !hasMore) return;
    
    setLoading(true);
    setTimeout(() => {
      const newPitches = generateMockPitches(page);
      setPitches(prev => [...prev, ...newPitches]);
      setPage(prev => prev + 1);
      setLoading(false);
      
      // Simulate end of data after 5 pages
      if (page >= 5) {
        setHasMore(false);
      }
    }, 1000);
  }, [loading, hasMore, page]);

  // Initial load
  useEffect(() => {
    loadMorePitches();
  }, []);

  // Infinite scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - 1000) {
        loadMorePitches();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loadMorePitches]);

  const handleLike = (pitchId) => {
    setLikedPitches(prev => {
      const newLiked = new Set(prev);
      if (newLiked.has(pitchId)) {
        newLiked.delete(pitchId);
        // Decrease like count
        setPitches(prevPitches => 
          prevPitches.map(pitch => 
            pitch.id === pitchId 
              ? { ...pitch, metrics: { ...pitch.metrics, likes: pitch.metrics.likes - 1 } }
              : pitch
          )
        );
      } else {
        newLiked.add(pitchId);
        // Increase like count
        setPitches(prevPitches => 
          prevPitches.map(pitch => 
            pitch.id === pitchId 
              ? { ...pitch, metrics: { ...pitch.metrics, likes: pitch.metrics.likes + 1 } }
              : pitch
          )
        );
      }
      return newLiked;
    });
  };

  const handlePitch = (pitch) => {
    setSelectedPitch(pitch);
    setShowCreatePitch(true);
  };

  const handlePitchback = (pitch) => {
    setSelectedPitchback(pitch);
    setShowDetailsModal(false);
    setShowPitchbackModal(true);
  };

  const handleRepost = (pitchId) => {
    setRepostedPitches(prev => {
      const newReposted = new Set(prev);
      if (newReposted.has(pitchId)) {
        newReposted.delete(pitchId);
        // Decrease repost count
        setPitches(prevPitches => 
          prevPitches.map(pitch => 
            pitch.id === pitchId 
              ? { ...pitch, metrics: { ...pitch.metrics, reposts: (pitch.metrics.reposts || 0) - 1 } }
              : pitch
          )
        );
      } else {
        newReposted.add(pitchId);
        // Increase repost count
        setPitches(prevPitches => 
          prevPitches.map(pitch => 
            pitch.id === pitchId 
              ? { ...pitch, metrics: { ...pitch.metrics, reposts: (pitch.metrics.reposts || 0) + 1 } }
              : pitch
          )
        );
      }
      return newReposted;
    });
  };

  const handleSendPitchback = () => {
    if (selectedPitchback && pitchbackMessage.trim()) {
      const pitchbackData = {
        id: Date.now(),
        pitchId: selectedPitchback.id,
        title: selectedPitchback.title,
        description: selectedPitchback.shortDescription || selectedPitchback.description,
        author: selectedPitchback.author.name,
        status: 'pending',
        sentAt: new Date().toISOString(),
        message: pitchbackMessage,
        response: null,
        compatibility: selectedPitchback.compatibility,
        pitchDetails: {
          id: selectedPitchback.id,
          title: selectedPitchback.title,
          description: selectedPitchback.description,
          industry: selectedPitchback.industry,
          stage: selectedPitchback.stage,
          lookingFor: selectedPitchback.lookingFor,
          author: selectedPitchback.author
        }
      };

      const existingPitches = JSON.parse(localStorage.getItem('sentPitches') || '[]');
      existingPitches.push(pitchbackData);
      localStorage.setItem('sentPitches', JSON.stringify(existingPitches));

      setShowPitchbackModal(false);
      setPitchbackMessage('');
      setSelectedPitchback(null);
    }
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
    const haystack = [
      pitch.title,
      pitch.description,
      pitch.author?.name,
      pitch.industry,
      pitch.targetMarket,
      pitch.businessModel,
      pitch.problem,
      pitch.solution,
      (pitch.lookingFor || []).join(' '),
      (pitch.author?.anonymousProfile?.skills || []).join(' ')
    ]
      .filter(Boolean)
      .join(' ')
      .toLowerCase();

    const matchesSearch = haystack.includes(searchQuery.toLowerCase());
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

  return (
    <>
      {/* Create Pitch Modal */}
      {showCreatePitch && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={() => {
          setShowCreatePitch(false);
          setSelectedPitch(null);
        }}>
          <div className="bg-white rounded-3xl p-8 max-w-4xl w-full mx-auto max-h-[90vh] overflow-y-auto shadow-2xl" onClick={(e) => e.stopPropagation()}>
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

            {/* Startup Overview Section */}
            <div className="bg-gray-50 p-6 rounded-2xl">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Startup Overview</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Startup Name
                  </label>
                  <input
                    type="text"
                    value={pitchForm.startupName}
                    onChange={(e) => setPitchForm({...pitchForm, startupName: e.target.value})}
                    placeholder="e.g., TechFlow AI, EcoTrack, HealthConnect"
                    className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-black focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Industry
                  </label>
                  <select 
                    value={pitchForm.industry}
                    onChange={(e) => setPitchForm({...pitchForm, industry: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-black focus:border-transparent"
                  >
                    <option value="">Select Industry</option>
                    <option value="Technology">Technology</option>
                    <option value="Healthcare">Healthcare</option>
                    <option value="FinTech">FinTech</option>
                    <option value="Education">Education</option>
                    <option value="Sustainability">Sustainability</option>
                    <option value="Food & Beverage">Food & Beverage</option>
                    <option value="Real Estate">Real Estate</option>
                    <option value="E-commerce">E-commerce</option>
                    <option value="SaaS">SaaS</option>
                    <option value="AI/ML">AI/ML</option>
                  </select>
                </div>
              </div>
              
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  One-Line Description
                </label>
                <input
                  type="text"
                  value={pitchForm.oneLineDescription}
                  onChange={(e) => setPitchForm({...pitchForm, oneLineDescription: e.target.value})}
                  placeholder="e.g., AI-powered workflow automation for remote teams"
                  className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-black focus:border-transparent"
                />
              </div>
            </div>

            {/* Problem & Solution Section */}
            <div className="bg-gray-50 p-6 rounded-2xl">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Problem & Solution</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    What problem are you solving? *
                  </label>
                  <textarea
                    value={pitchForm.problem}
                    onChange={(e) => setPitchForm({...pitchForm, problem: e.target.value})}
                    placeholder="Describe the specific problem your startup addresses. Who has this problem? How big is the market? What pain points do they face?"
                    className="w-full h-32 p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-black focus:border-transparent resize-none"
                  />
                  <p className="text-xs text-gray-500 mt-1">Be specific about the problem, target audience, and market size</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Your solution *
                  </label>
                  <textarea
                    value={pitchForm.solution}
                    onChange={(e) => setPitchForm({...pitchForm, solution: e.target.value})}
                    placeholder="How does your product/service solve this problem? What makes it unique or better than existing solutions? What's your competitive advantage?"
                    className="w-full h-32 p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-black focus:border-transparent resize-none"
                  />
                  <p className="text-xs text-gray-500 mt-1">Explain your approach, key features, and what differentiates you</p>
                </div>
              </div>
            </div>

            {/* Market & Business Section */}
            <div className="bg-gray-50 p-6 rounded-2xl">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Market & Business</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Target Market *
                  </label>
                  <input
                    type="text"
                    value={pitchForm.targetMarket}
                    onChange={(e) => setPitchForm({...pitchForm, targetMarket: e.target.value})}
                    placeholder="e.g., Small businesses, Enterprise, Consumers"
                    className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-black focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Business Model *
                  </label>
                  <select 
                    value={pitchForm.businessModel}
                    onChange={(e) => setPitchForm({...pitchForm, businessModel: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-black focus:border-transparent"
                  >
                    <option value="">Select Model</option>
                    <option value="SaaS Subscription">SaaS Subscription</option>
                    <option value="Marketplace">Marketplace</option>
                    <option value="Freemium">Freemium</option>
                    <option value="One-time Purchase">One-time Purchase</option>
                    <option value="Commission-based">Commission-based</option>
                    <option value="Advertising">Advertising</option>
                    <option value="Transaction Fee">Transaction Fee</option>
                    <option value="Licensing">Licensing</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Market Size
                  </label>
                  <select 
                    value={pitchForm.marketSize}
                    onChange={(e) => setPitchForm({...pitchForm, marketSize: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-black focus:border-transparent"
                  >
                    <option value="">Select Size</option>
                    <option value="<$1M">Under $1M</option>
                    <option value="$1M-$10M">$1M - $10M</option>
                    <option value="$10M-$100M">$10M - $100M</option>
                    <option value="$100M-$1B">$100M - $1B</option>
                    <option value=">$1B">Over $1B</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Current Stage *
                  </label>
                  <select 
                    value={pitchForm.currentStage}
                    onChange={(e) => setPitchForm({...pitchForm, currentStage: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-black focus:border-transparent"
                  >
                    <option value="">Select Stage</option>
                    <option value="Idea Stage">Idea Stage</option>
                    <option value="MVP Development">MVP Development</option>
                    <option value="MVP Stage">MVP Stage</option>
                    <option value="Early Traction">Early Traction</option>
                    <option value="Growth Stage">Growth Stage</option>
                    <option value="Scale Stage">Scale Stage</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Funding Stage
                  </label>
                  <select 
                    value={pitchForm.fundingStage}
                    onChange={(e) => setPitchForm({...pitchForm, fundingStage: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-black focus:border-transparent"
                  >
                    <option value="">Select Funding Stage</option>
                    <option value="Bootstrapped">Bootstrapped</option>
                    <option value="Pre-seed">Pre-seed</option>
                    <option value="Seed">Seed</option>
                    <option value="Series A">Series A</option>
                    <option value="Series B+">Series B+</option>
                    <option value="Not seeking funding">Not seeking funding</option>
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
                    What role are you looking for? *
                  </label>
                  <select 
                    value={pitchForm.lookingForRole}
                    onChange={(e) => setPitchForm({...pitchForm, lookingForRole: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-black focus:border-transparent"
                  >
                    <option value="">Select Role</option>
                    <option value="Technical Co-founder">Technical Co-founder</option>
                    <option value="Business Co-founder">Business Co-founder</option>
                    <option value="Marketing Co-founder">Marketing Co-founder</option>
                    <option value="Sales Co-founder">Sales Co-founder</option>
                    <option value="Operations Co-founder">Operations Co-founder</option>
                    <option value="Design Co-founder">Design Co-founder</option>
                    <option value="Product Co-founder">Product Co-founder</option>
                    <option value="Multiple Roles">Multiple Roles</option>
                    <option value="UI/UX Designer">UI/UX Designer</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Required skills & experience *
                  </label>
                  <select
                    onChange={(e) => {
                      const value = e.target.value;
                      if (value && !pitchForm.requiredSkills.includes(value)) {
                        setPitchForm({...pitchForm, requiredSkills: [...pitchForm.requiredSkills, value]});
                      }
                      e.target.value = '';
                    }}
                    className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-black focus:border-transparent mb-3"
                  >
                    <option value="">+ Add Skill</option>
                    {['Technical Development', 'Product Management', 'Marketing', 'Sales', 'Operations', 'Finance', 
                      'Design', 'Business Strategy', 'Fundraising', 'Legal', 'HR', 'Data Analysis', 'AI/ML', 
                      'Blockchain', 'Mobile Development', 'Backend Development', 'Frontend Development', 'DevOps', 
                      'UX/UI Design', 'Growth Hacking', 'Content Marketing', 'SEO/SEM', 'Social Media', 'PR',
                      'Cloud Architecture', 'Cybersecurity', 'Quality Assurance', 'Project Management', 'Agile/Scrum']
                      .filter(sk => !pitchForm.requiredSkills.includes(sk))
                      .map((skill) => (
                        <option key={skill} value={skill}>{skill}</option>
                      ))}
                  </select>
                  {pitchForm.requiredSkills.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {pitchForm.requiredSkills.map((skill) => (
                        <span
                          key={skill}
                          className="inline-flex items-center gap-2 px-3 py-2 bg-gray-900 text-white rounded-lg text-sm font-medium"
                        >
                          {skill}
                          <button
                            onClick={() => setPitchForm({
                              ...pitchForm, 
                              requiredSkills: pitchForm.requiredSkills.filter(s => s !== skill)
                            })}
                            className="hover:bg-white/20 rounded-full p-0.5 transition-colors"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Their Availability *
                    </label>
                    <select 
                      value={pitchForm.availabilityPreference}
                      onChange={(e) => setPitchForm({...pitchForm, availabilityPreference: e.target.value})}
                      className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-black focus:border-transparent"
                    >
                      <option value="">Select Availability</option>
                      <option value="Full-time">Full-time</option>
                      <option value="Part-time">Part-time</option>
                      <option value="Flexible">Flexible</option>
                      <option value="Weekends">Weekends</option>
                      <option value="Not specified">Not specified</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Their Industry *
                    </label>
                    <select 
                      value={pitchForm.industryPreferences}
                      onChange={(e) => setPitchForm({...pitchForm, industryPreferences: e.target.value})}
                      className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-black focus:border-transparent"
                    >
                      <option value="">Select Industry</option>
                      <option value="Technology">Technology</option>
                      <option value="Healthcare">Healthcare</option>
                      <option value="FinTech">FinTech</option>
                      <option value="Education">Education</option>
                      <option value="Sustainability">Sustainability</option>
                      <option value="Food & Beverage">Food & Beverage</option>
                      <option value="Real Estate">Real Estate</option>
                      <option value="E-commerce">E-commerce</option>
                      <option value="SaaS">SaaS</option>
                      <option value="AI/ML">AI/ML</option>
                      <option value="Any">Any</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Their Location *
                  </label>
                  <select
                    value={pitchForm.locationPreference}
                    onChange={(e) => setPitchForm({...pitchForm, locationPreference: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-black focus:border-transparent"
                  >
                    <option value="">Select Location Preference</option>
                    <option value="Same city">Same city</option>
                    <option value="Same state">Same state</option>
                    <option value="Same country">Same country</option>
                    <option value="Anywhere">Anywhere</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Equity Offer *
                  </label>
                  <input
                    type="text"
                    value={pitchForm.equityOffer}
                    onChange={(e) => setPitchForm({...pitchForm, equityOffer: e.target.value})}
                    placeholder="e.g., 20-30% equity, 15% equity + salary, To be discussed"
                    className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-black focus:border-transparent"
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
                    Location *
                  </label>
                  <input
                    type="text"
                    value={pitchForm.location}
                    onChange={(e) => setPitchForm({...pitchForm, location: e.target.value})}
                    placeholder="e.g., San Francisco, CA or Remote"
                    className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-black focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Timeline *
                  </label>
                  <select 
                    value={pitchForm.timeline}
                    onChange={(e) => setPitchForm({...pitchForm, timeline: e.target.value})}
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
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Additional Information (Optional)
                </label>
                <textarea
                  value={pitchForm.additionalInfo}
                  onChange={(e) => setPitchForm({...pitchForm, additionalInfo: e.target.value})}
                  placeholder="Any other relevant information about your startup, team, or what you're looking for..."
                  className="w-full h-24 p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-black focus:border-transparent resize-none"
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 pt-4">
              <button
                onClick={() => {
                  setShowCreatePitch(false);
                  setSelectedPitch(null);
                  setPitchForm({
                    startupName: '',
                    industry: '',
                    oneLineDescription: '',
                    problem: '',
                    solution: '',
                    targetMarket: '',
                    businessModel: '',
                    marketSize: '',
                    currentStage: '',
                    lookingForRole: '',
                    requiredSkills: [],
                    whatYouBring: '',
                    location: '',
                    timeline: '',
                    fundingStage: '',
                    equityOffer: '',
                    additionalInfo: '',
                    availabilityPreference: '',
                    industryPreferences: '',
                    locationPreference: ''
                  });
                }}
                className="flex-1 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  if (pitchForm.startupName && pitchForm.industry && pitchForm.oneLineDescription && 
                      pitchForm.problem && pitchForm.solution && pitchForm.targetMarket && 
                      pitchForm.businessModel && pitchForm.currentStage && pitchForm.lookingForRole &&
                      pitchForm.requiredSkills.length > 0 && pitchForm.location && 
                      pitchForm.timeline && pitchForm.availabilityPreference && pitchForm.industryPreferences &&
                      pitchForm.locationPreference && pitchForm.equityOffer) {
                    const newPitch = {
                      id: Date.now(),
                      title: pitchForm.startupName,
                      shortDescription: pitchForm.oneLineDescription,
                      description: `${pitchForm.problem}\n\n${pitchForm.solution}`,
                      targetMarket: pitchForm.targetMarket,
                      businessModel: pitchForm.businessModel,
                      problem: pitchForm.problem,
                      solution: pitchForm.solution,
                      industry: pitchForm.industry,
                      stage: pitchForm.currentStage,
                      stageColor: 'green',
                      lookingFor: [pitchForm.lookingForRole],
                      requiredSkills: pitchForm.requiredSkills,
                      availabilityPreference: pitchForm.availabilityPreference,
                      industryPreferences: pitchForm.industryPreferences,
                      locationPreference: pitchForm.locationPreference,
                      equityOffer: pitchForm.equityOffer,
                      fundingStage: pitchForm.fundingStage,
                      author: {
                        name: user?.name || 'You',
                        role: 'Founder',
                        summary: `Looking for ${pitchForm.lookingForRole}`,
                        location: pitchForm.location,
                        anonymousProfile: {
                          experience: pitchForm.lookingForRole,
                          skills: pitchForm.requiredSkills,
                          education: 'Not specified',
                          workStyle: 'Collaborative',
                          availability: pitchForm.timeline
                        }
                      },
                      compatibility: 100,
                      metrics: { views: 0, likes: 0, pitches: 0, comments: 0, reposts: 0 },
      comments: [],
                      timeline: pitchForm.timeline,
                      market: pitchForm.marketSize || 'Not specified',
                      funding: pitchForm.fundingStage || 'Not specified',
                      equityOffer: pitchForm.equityOffer || 'Open to discussion',
                      additionalInfo: pitchForm.additionalInfo || '',
                      createdAt: 'just now'
                    };
                    
                    setPitches(prev => [newPitch, ...prev]);
                    setSuccessMessage('Pitch created successfully!');
                    setShowSuccessMessage(true);
                    setTimeout(() => {
                      setShowSuccessMessage(false);
                      setSuccessMessage('');
                    }, 3000);
                    setShowCreatePitch(false);
                    setSelectedPitch(null);
                    setPitchForm({
                      startupName: '',
                      industry: '',
                      oneLineDescription: '',
                      problem: '',
                      solution: '',
                      targetMarket: '',
                      businessModel: '',
                      marketSize: '',
                      currentStage: '',
                      lookingForRole: '',
                      requiredSkills: '',
                      whatYouBring: '',
                      location: '',
                      timeline: '',
                      fundingStage: '',
                      equityOffer: '',
                      additionalInfo: ''
                    });
                  }
                }}
                disabled={!pitchForm.startupName || !pitchForm.industry || !pitchForm.oneLineDescription || 
                         !pitchForm.problem || !pitchForm.solution || !pitchForm.targetMarket || 
                         !pitchForm.businessModel || !pitchForm.currentStage || !pitchForm.lookingForRole ||
                         !pitchForm.requiredSkills || !pitchForm.whatYouBring || !pitchForm.location || 
                         !pitchForm.timeline}
                className="flex-1 py-3 bg-black text-white rounded-xl font-semibold hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
              >
                {selectedPitch ? 'Send Pitch' : 'Post Pitch'}
              </button>
            </div>
          </div>
        </div>
      </div>
      )}

      {/* Simple Pitch Modal */}
      {showPitchModal && selectedPitch && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={() => {
            setShowPitchModal(false);
            setSelectedPitch(null);
            setPitchMessage('');
          }}
        >
          <div
            className="bg-white rounded-3xl p-8 max-w-md w-full mx-auto shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Pitch to {selectedPitch?.author.name}
              </h2>
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

            <div className="flex flex-col sm:flex-row gap-3">
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
      )}

      {/* Pitchback Modal */}
      {showPitchbackModal && selectedPitchback && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={() => {
          setShowPitchbackModal(false);
          setSelectedPitchback(null);
          setPitchbackMessage('');
        }}>
          <div className="bg-white rounded-3xl p-8 max-w-4xl w-full mx-auto max-h-[90vh] overflow-y-auto shadow-2xl" onClick={(e) => e.stopPropagation()}>
            {(() => {
              const author = selectedPitchback.author || {};
              const founderSkills = author.skills || [];
              const cofounderSkills = Array.isArray(selectedPitchback.requiredSkills)
                ? selectedPitchback.requiredSkills
                : (typeof selectedPitchback.requiredSkills === 'string'
                  ? selectedPitchback.requiredSkills.split(',').map(s => s.trim()).filter(Boolean)
                  : (selectedPitchback.cofounderSkills || []));

              return (
                <>
                  <div className="flex items-center justify-between mb-4">
                    <h1 className="text-2xl font-bold text-gray-900">Responding to:</h1>
                    <button
                      onClick={() => {
                        setShowPitchbackModal(false);
                        setSelectedPitchback(null);
                        setPitchbackMessage('');
                      }}
                      className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
                    >
                      <X className="w-6 h-6 text-gray-500" />
                    </button>
                  </div>

                  <div className="space-y-6">
                    <div className="bg-gray-50 p-6 rounded-2xl border border-gray-200">
                      <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-3">About Pitch</h2>
                      <p className="text-2xl font-bold text-gray-900 mb-2">{selectedPitchback.title}</p>
                      <p className="text-gray-700 leading-relaxed mb-4">{selectedPitchback.description || selectedPitchback.shortDescription}</p>
                      <div className="flex items-center gap-3 text-sm text-gray-600 flex-wrap">
                        {selectedPitchback.stage && (
                          <span className="px-3 py-1 bg-black text-white rounded-full text-xs font-semibold">{selectedPitchback.stage}</span>
                        )}
                        {selectedPitchback.industry && (
                          <span className="px-3 py-1 bg-gray-200 text-gray-700 rounded-full text-xs font-semibold">{selectedPitchback.industry}</span>
                        )}
                      </div>
                    </div>

                    <div className="bg-white p-6 rounded-2xl border border-gray-200">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-3">Founder</h3>
                          <div className="flex items-start gap-3">
                            <div className="w-10 h-10 rounded-xl bg-black flex items-center justify-center">
                              <User className="w-5 h-5 text-white" />
                            </div>
                            <div className="space-y-2 text-sm">
                              <p className="font-semibold text-gray-900">{author.role}</p>
                              <p className="text-gray-900">{author.location}</p>
                              {founderSkills.length > 0 && (
                                <div className="flex flex-wrap gap-2 pt-1">
                                  {founderSkills.map((skill, idx) => (
                                    <span key={idx} className="px-3 py-1 rounded-full bg-gray-100 text-gray-800 text-xs font-medium">
                                      {skill}
                                    </span>
                                  ))}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>

                        <div>
                          <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-3">Looking for</h3>
                          <div className="space-y-3 text-sm">
                            {selectedPitchback.lookingFor && selectedPitchback.lookingFor.length > 0 && (
                              <div>
                                <p className="font-semibold text-gray-900 mb-2">Cofounder Role</p>
                                <div className="flex flex-wrap gap-2">
                                  {selectedPitchback.lookingFor.map((role, idx) => (
                                    <span key={idx} className="px-3 py-1 rounded-full bg-gray-900 text-white text-xs font-semibold">
                                      {role}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            )}
                            {cofounderSkills.length > 0 && (
                              <div>
                                <p className="font-semibold text-gray-900 mb-2">Required Skills</p>
                                <div className="flex flex-wrap gap-2">
                                  {cofounderSkills.map((skill, idx) => (
                                    <span key={idx} className="px-3 py-1 rounded-full bg-gray-100 text-gray-800 text-xs font-medium">
                                      {skill}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            )}
                            {selectedPitchback.availabilityPreference && (
                              <div>
                                <p className="font-semibold text-gray-900 mb-1">Availability</p>
                                <p className="text-gray-900">{selectedPitchback.availabilityPreference}</p>
                              </div>
                            )}
                            {selectedPitchback.industryPreferences && (
                              <div>
                                <p className="font-semibold text-gray-900 mb-1">Industry</p>
                                <p className="text-gray-900">{selectedPitchback.industryPreferences}</p>
                              </div>
                            )}
                            {selectedPitchback.locationPreference && (
                              <div>
                                <p className="font-semibold text-gray-900 mb-1">Location</p>
                                <p className="text-gray-900">{selectedPitchback.locationPreference}</p>
                              </div>
                            )}
                            {selectedPitchback.equityOffer && (
                              <div>
                                <p className="font-semibold text-gray-900 mb-1">Equity Offer</p>
                                <p className="text-green-700 font-semibold">{selectedPitchback.equityOffer}</p>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    {selectedPitchback.problem && (
                      <div className="bg-white p-6 rounded-2xl border border-gray-200">
                        <h3 className="text-base font-semibold text-gray-900 mb-3 flex items-center gap-2">
                          <Target className="w-5 h-5 text-black" />
                          Problem Statement
                        </h3>
                        <p className="text-gray-700 leading-relaxed whitespace-pre-line">{selectedPitchback.problem}</p>
                      </div>
                    )}

                    {selectedPitchback.solution && (
                      <div className="bg-white p-6 rounded-2xl border border-gray-200">
                        <h3 className="text-base font-semibold text-gray-900 mb-3 flex items-center gap-2">
                          <Lightbulb className="w-5 h-5 text-black" />
                          Solution Statement
                        </h3>
                        <p className="text-gray-700 leading-relaxed whitespace-pre-line">{selectedPitchback.solution}</p>
                      </div>
                    )}

                    <div className="bg-white p-6 rounded-2xl border border-gray-200">
                      <h2 className="text-lg font-semibold text-gray-900 mb-3">My Pitchback Message</h2>
                      <textarea
                        value={pitchbackMessage}
                        onChange={(e) => {
                          if (e.target.value.length <= 500) {
                            setPitchbackMessage(e.target.value);
                          }
                        }}
                        placeholder="Share why you're the right cofounder for this pitch..."
                        className="w-full h-32 p-4 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-black focus:border-transparent resize-none"
                      />
                      <div className="flex justify-between items-center mt-2">
                        <p className="text-xs text-gray-500">
                          {pitchbackMessage.length}/500 characters
                        </p>
                        {pitchbackMessage.length > 450 && (
                          <p className="text-xs text-orange-600">Approaching character limit</p>
                        )}
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 pt-2">
                      <button
                        onClick={() => {
                          setShowPitchbackModal(false);
                          setSelectedPitchback(null);
                          setPitchbackMessage('');
                        }}
                        className="flex-1 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleSendPitchback}
                        disabled={!pitchbackMessage.trim()}
                        className="flex-1 py-3 bg-black text-white rounded-xl font-semibold hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center gap-2"
                      >
                        <Send className="w-4 h-4" />
                        Send Pitchback
                      </button>
                    </div>
                  </div>
                </>
              );
            })()}
          </div>
        </div>
      )}

      {/* Success Notification */}
      {showSuccessMessage && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-6 py-4 rounded-xl shadow-2xl z-50 flex items-center gap-3 animate-slide-in">
          <CheckCircle className="w-6 h-6" />
          <span className="font-semibold">{successMessage}</span>
        </div>
      )}

      {/* All Modals Above - Main Content Below */}
      {showDetailsModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={() => setShowDetailsModal(false)}>
          <div className="bg-white rounded-3xl max-w-5xl w-full max-h-[90vh] overflow-y-auto shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="sticky top-0 bg-white border-b border-gray-200 px-8 py-4 flex items-center justify-between z-10">
              <h2 className="text-2xl font-bold text-gray-900">Pitch Details</h2>
              <button
                onClick={() => setShowDetailsModal(false)}
                className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
              >
                <X className="w-6 h-6 text-gray-500" />
              </button>
            </div>
            <div className="p-8">

            {selectedPitchDetails && (
              <div className="space-y-6">
                {(() => {
                  const founder = selectedPitchDetails.author || {};
                  const founderProfile = founder.anonymousProfile || {};
                  const aboutMyself = founder.about || founderProfile.experience || 'Not provided';
                  const founderSkills = founderProfile.skills || [];
                  const founderAvailability = founderProfile.availability || selectedPitchDetails.timeline || 'Not specified';
                  const lookingForRoles = (selectedPitchDetails.lookingFor && selectedPitchDetails.lookingFor.length)
                    ? selectedPitchDetails.lookingFor
                    : selectedPitchDetails.lookingForRole ? [selectedPitchDetails.lookingForRole] : [];
                  const lookingSkills = Array.isArray(selectedPitchDetails.requiredSkills)
                    ? selectedPitchDetails.requiredSkills
                    : (typeof selectedPitchDetails.requiredSkills === 'string' 
                      ? selectedPitchDetails.requiredSkills.split(',').map(s => s.trim()).filter(Boolean)
                      : (selectedPitchDetails.cofounderSkills || []));
                  const lookingAvailability = selectedPitchDetails.availabilityPreference || selectedPitchDetails.commitment || 'Not specified';
                  const lookingIndustry = selectedPitchDetails.industryPreferences || selectedPitchDetails.industry || 'Not specified';
                  const lookingLocation = selectedPitchDetails.locationPreference || selectedPitchDetails.location || 'Not specified';

                  return (
                    <>
                      {/* About Startup */}
                      <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100 space-y-4">
                        <div className="flex items-center gap-2">
                          <Rocket className="w-5 h-5 text-gray-800" />
                          <h3 className="text-lg font-semibold text-gray-900">About Startup</h3>
                        </div>
                        <div className="space-y-3">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-2xl font-bold text-gray-900">{selectedPitchDetails.title}</span>
                            {selectedPitchDetails.stage && (
                              <span className="px-2.5 py-1 bg-gray-900 text-white rounded-full text-xs font-semibold">
                                {selectedPitchDetails.stage}
                              </span>
                            )}
                            {selectedPitchDetails.industry && (
                              <span className="px-2.5 py-1 bg-gray-200 text-gray-800 rounded-full text-xs font-semibold">
                                {selectedPitchDetails.industry}
                              </span>
                            )}
                          </div>
                          <p className="text-gray-700 text-sm leading-relaxed">
                            {selectedPitchDetails.shortDescription || selectedPitchDetails.description || 'No summary provided.'}
                          </p>
                        </div>
                      </div>

                      {/* Problem & Solution */}
                      {(selectedPitchDetails.problem || selectedPitchDetails.solution) && (
                        <div className="bg-white rounded-2xl p-6 border border-gray-200 space-y-4">
                          {selectedPitchDetails.problem && (
                            <div>
                              <h4 className="text-base font-semibold text-gray-900 mb-2 flex items-center gap-2">
                                <Target className="w-4 h-4" />
                                Problem
                              </h4>
                              <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-line">
                                {selectedPitchDetails.problem}
                              </p>
                            </div>
                          )}
                          {selectedPitchDetails.solution && (
                            <div>
                              <h4 className="text-base font-semibold text-gray-900 mb-2 flex items-center gap-2">
                                <Rocket className="w-4 h-4" />
                                Solution
                              </h4>
                              <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-line">
                                {selectedPitchDetails.solution}
                              </p>
                            </div>
                          )}
                        </div>
                      )}

                      {/* Market & Business Details */}
                      {(selectedPitchDetails.targetMarket || selectedPitchDetails.businessModel || selectedPitchDetails.marketSize || selectedPitchDetails.timeline) && (
                        <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                          <h3 className="text-lg font-semibold text-gray-900 mb-4">Market & Business Details</h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                            {selectedPitchDetails.targetMarket && (
                              <div>
                                <p className="font-semibold text-gray-900 mb-1">Target Market</p>
                                <p className="text-gray-700">{selectedPitchDetails.targetMarket}</p>
                              </div>
                            )}
                            {selectedPitchDetails.businessModel && (
                              <div>
                                <p className="font-semibold text-gray-900 mb-1">Business Model</p>
                                <p className="text-gray-700">{selectedPitchDetails.businessModel}</p>
                              </div>
                            )}
                            {selectedPitchDetails.marketSize && (
                              <div>
                                <p className="font-semibold text-gray-900 mb-1">Market Size</p>
                                <p className="text-gray-700">{selectedPitchDetails.marketSize}</p>
                              </div>
                            )}
                            {selectedPitchDetails.timeline && (
                              <div>
                                <p className="font-semibold text-gray-900 mb-1">Timeline</p>
                                <p className="text-gray-700">{selectedPitchDetails.timeline}</p>
                              </div>
                            )}
                            {(selectedPitchDetails.fundingStage || selectedPitchDetails.funding) && (
                              <div>
                                <p className="font-semibold text-gray-900 mb-1">Funding Stage</p>
                                <p className="text-gray-700">{selectedPitchDetails.fundingStage || selectedPitchDetails.funding}</p>
                              </div>
                            )}
                          </div>
                        </div>
                      )}

                      {/* About Founder */}
                      <div className="bg-white rounded-2xl p-6 border border-gray-200 space-y-4">
                        <div className="flex items-center gap-2">
                          <User className="w-5 h-5 text-gray-800" />
                          <h3 className="text-lg font-semibold text-gray-900">About Founder</h3>
                        </div>
                        <div className="flex items-start gap-4">
                          <div className="w-16 h-16 bg-gray-900 rounded-2xl overflow-hidden">
                            {founder.avatar ? (
                              <img
                                src={founder.avatar}
                                alt={founder.name || 'Founder avatar'}
                                className="w-full h-full object-cover blur-sm"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center">
                                <User className="w-8 h-8 text-white blur-sm" />
                              </div>
                            )}
                          </div>
                          <div className="flex-1 space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3">
                              <div>
                                <p className="text-xs font-semibold text-gray-500 uppercase mb-1">Role</p>
                                <p className="text-gray-900 font-medium">{founder.role || 'Not specified'}</p>
                              </div>
                              <div>
                                <p className="text-xs font-semibold text-gray-500 uppercase mb-1">Location</p>
                                <p className="text-gray-900 font-medium">{founder.location || 'Not specified'}</p>
                              </div>
                              <div>
                                <p className="text-xs font-semibold text-gray-500 uppercase mb-1">Availability</p>
                                <p className="text-gray-900 font-medium">{founderAvailability}</p>
                              </div>
                              <div>
                                <p className="text-xs font-semibold text-gray-500 uppercase mb-1">Experience</p>
                                <p className="text-gray-900 font-medium">{aboutMyself}</p>
                              </div>
                            </div>
                            <div>
                              <p className="text-xs font-semibold text-gray-500 uppercase mb-2">Skills</p>
                              <div className="flex flex-wrap gap-2">
                                {founderSkills.length ? founderSkills.map((skill, idx) => (
                                  <span key={idx} className="px-3 py-1.5 bg-gray-100 text-gray-800 rounded-lg text-sm font-medium">
                                    {skill}
                                  </span>
                                )) : <span className="text-gray-500">Not provided</span>}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Looking For */}
                      <div className="bg-white rounded-2xl p-6 border border-gray-200 space-y-4">
                        <div className="flex items-center gap-2">
                          <Users className="w-5 h-5 text-gray-800" />
                          <h3 className="text-lg font-semibold text-gray-900">Looking For</h3>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700">
                          <div>
                            <p className="font-semibold text-gray-900 mb-1">Their Role</p>
                            <div className="flex flex-wrap gap-2">
                              {lookingForRoles.length ? lookingForRoles.map((role, idx) => (
                                <span key={idx} className="px-3 py-1 bg-purple-50 text-purple-700 rounded-full">
                                  {role}
                                </span>
                              )) : <span className="text-gray-500">Not specified</span>}
                            </div>
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900 mb-1">Their Skills</p>
                            <div className="flex flex-wrap gap-2">
                              {lookingSkills.length ? lookingSkills.map((skill, idx) => (
                                <span key={idx} className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full">
                                  {skill}
                                </span>
                              )) : <span className="text-gray-500">Not specified</span>}
                            </div>
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900 mb-1">Their Availability</p>
                            <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full inline-block">{lookingAvailability}</span>
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900 mb-1">Their Industry</p>
                            <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full inline-block">{Array.isArray(lookingIndustry) ? lookingIndustry.join(', ') : lookingIndustry}</span>
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900 mb-1">Their Location</p>
                            <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full inline-block">{lookingLocation}</span>
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900 mb-1">Equity Offer</p>
                            <span className="px-3 py-1 bg-green-50 text-green-700 rounded-full inline-block font-medium">{selectedPitchDetails.equityOffer || 'Not specified'}</span>
                          </div>
                        </div>
                      </div>

                      {/* Additional Information */}
                      {selectedPitchDetails.additionalInfo && (
                        <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                          <h3 className="text-lg font-semibold text-gray-900 mb-3">Additional Information</h3>
                          <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-line">
                            {selectedPitchDetails.additionalInfo}
                          </p>
                        </div>
                      )}
                    </>
                  );
                })()}

                {/* Metrics - compact */}
                <div className="bg-gray-50 rounded-xl p-3 border border-gray-100">
                  <div className="flex flex-wrap items-center gap-3 sm:gap-5 text-sm text-gray-600">
                    <div className="inline-flex items-center gap-2 whitespace-nowrap">
                      <Eye className="w-4 h-4 text-gray-500" />
                      <span className="font-semibold text-gray-900">{selectedPitchDetails.metrics.views}</span>
                      <span className="text-gray-600">Views</span>
                    </div>
                    <span className="text-gray-300 hidden sm:inline">•</span>
                    <div className="inline-flex items-center gap-2 whitespace-nowrap">
                      <MessageCircle className="w-4 h-4 text-gray-500" />
                      <span className="font-semibold text-gray-900">{selectedPitchDetails.metrics.pitches || 0}</span>
                      <span className="text-gray-600">Pitchbacks</span>
                    </div>
                    <span className="text-gray-300 hidden sm:inline">•</span>
                    <div className="inline-flex items-center gap-2 whitespace-nowrap">
                      <Clock className="w-4 h-4 text-gray-500" />
                      <span className="text-gray-600">Posted</span>
                      <span className="font-semibold text-gray-900 whitespace-nowrap">{selectedPitchDetails.createdAt}</span>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3 pt-4">
                  <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs">
                    <button
                      onClick={() => handleLike(selectedPitchDetails.id)}
                      className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-full border font-medium transition hover:shadow-sm whitespace-nowrap ${
                        likedPitches.has(selectedPitchDetails.id)
                          ? 'border-orange-200 bg-orange-50 text-orange-700 hover:bg-orange-100'
                          : 'border-orange-100 bg-white text-orange-700 hover:bg-orange-50'
                      }`}
                      title="Spark"
                    >
                      <Sparkles className={`w-4 h-4 ${likedPitches.has(selectedPitchDetails.id) ? 'fill-current' : ''}`} />
                      <span className="font-semibold">Spark</span>
                      <span className="font-bold text-gray-900">{selectedPitchDetails.metrics?.likes || 0}</span>
                    </button>
                    <button
                      onClick={() => {
                        setCommentPitch(selectedPitchDetails);
                        setShowCommentModal(true);
                      }}
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full border border-gray-300 bg-white text-gray-900 transition hover:shadow-sm hover:bg-gray-50 font-medium whitespace-nowrap"
                      title="Opinions"
                    >
                      <MessagesSquare className="w-4 h-4" />
                      <span className="font-semibold">Opinions</span>
                      <span className="font-bold text-gray-900">{selectedPitchDetails.metrics?.comments || 0}</span>
                  </button>
                  </div>
                  <div className="flex flex-col md:flex-row gap-3">
                    <button
                      onClick={() => handlePitchback(selectedPitchDetails)}
                      className="flex-1 py-3 bg-black text-white rounded-xl font-semibold hover:bg-gray-800 transition-all duration-300 flex items-center justify-center gap-2"
                    >
                      <Send className="w-5 h-5" />
                      Pitchback
                    </button>
                    <button
                      onClick={() => setShowDetailsModal(false)}
                      className="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-all duration-300"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            )}
            </div>
          </div>
        </div>
      )}

      {showCommentModal && commentPitch && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl w-full max-w-2xl max-h-[90vh] flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-2xl font-bold text-gray-900">Opinions</h2>
              <button
                onClick={() => {
                  setShowCommentModal(false);
                  setCommentPitch(null);
                  setCommentText('');
                }}
                className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
              >
                <X className="w-6 h-6 text-gray-500" />
              </button>
            </div>
            
            {/* Comments List - Scrollable */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {commentPitch.comments && commentPitch.comments.length > 0 ? (
                commentPitch.comments.map((comment, index) => (
                  <div key={index} className="flex gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-600 to-purple-600 flex items-center justify-center flex-shrink-0">
                      <User className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-sm">{comment.author}</span>
                        <span className="text-xs text-gray-500">{comment.timestamp}</span>
                      </div>
                      <p className="text-sm text-gray-800 mt-1">{comment.text}</p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-12 text-gray-500">
                  <MessagesSquare className="w-16 h-16 mx-auto mb-3 text-gray-400" />
                  <p className="text-lg font-medium">No opinions yet</p>
                  <p className="text-sm">Be the first to share your thoughts!</p>
                </div>
              )}
            </div>

            {/* Comment Input - Fixed at Bottom */}
            <div className="border-t p-6">
              <div className="flex gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-600 to-purple-600 flex items-center justify-center flex-shrink-0">
                  <User className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <textarea
                    value={commentText}
                    onChange={(e) => {
                      if (e.target.value.length <= 500) {
                        setCommentText(e.target.value);
                      }
                    }}
                    placeholder="Add an opinion..."
                    className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-black focus:border-transparent resize-none"
                    rows="2"
                  />
                  <div className="flex items-center justify-between mt-2">
                    <p className="text-xs text-gray-500">{commentText.length}/500</p>
                    <button
                      onClick={() => {
                        if (commentText.trim()) {
                          // Add comment to the pitch
                          setPitches(prevPitches => 
                            prevPitches.map(pitch => {
                              if (pitch.id === commentPitch.id) {
                                const newComment = {
                                  author: user?.name || 'You',
                                  text: commentText.trim(),
                                  timestamp: 'Just now'
                                };
                                const updatedComments = [...(pitch.comments || []), newComment];
                                return {
                                  ...pitch,
                                  comments: updatedComments,
                                  metrics: {
                                    ...pitch.metrics,
                                    comments: updatedComments.length
                                  }
                                };
                              }
                              return pitch;
                            })
                          );
                          setCommentText('');
                        }
                      }}
                      disabled={!commentText.trim()}
                      className="px-6 py-2 bg-black text-white rounded-xl font-semibold hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
                    >
                      Post
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Discover Pitches</h1>
              <p className="text-gray-600">Find your next cofounder or share your idea</p>
            </div>
            <button
              onClick={handleCreatePitch}
              className="w-full sm:w-auto px-5 sm:px-6 py-3 bg-black text-white rounded-xl font-semibold hover:bg-gray-800 transition-all duration-300 flex items-center justify-center gap-2"
            >
              <Plus className="w-5 h-5" />
              Create Pitch
            </button>
          </div>

          {pitchReminder && (
            <div className="mt-4 bg-gray-50 border border-gray-200 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div>
                <p className="text-xs uppercase tracking-wide text-gray-500 font-semibold">Complete your pitch</p>
                <h3 className="text-lg font-semibold text-gray-900">{pitchReminder.title}</h3>
                <p className="text-gray-600 text-sm">
                  {pitchReminder.stage ? `${pitchReminder.stage} • ` : ''}{pitchReminder.oneLiner || 'Add more details to publish your pitch.'}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setPitchReminder(null)}
                  className="px-3 py-2 text-sm text-gray-600 hover:text-gray-900"
                >
                  Dismiss
                </button>
                <button
                  onClick={() => setShowCreatePitch(true)}
                  className="px-4 py-2 bg-black text-white rounded-xl text-sm hover:bg-gray-800 transition-all"
                >
                  Finish pitch
                </button>
              </div>
            </div>
          )}

          {/* Search and Filters */}
          <div className="mt-6 grid grid-cols-5 md:grid-cols-5 lg:grid-cols-4 gap-3">
            <div className="relative col-span-4 lg:col-span-3">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search pitches, founders, or keywords..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-gray-900 focus:border-transparent"
              />
            </div>

            <div className="relative col-span-1 flex justify-end">
              <button
                onClick={() => setFiltersOpen((prev) => !prev)}
                className="w-full px-3 py-3 border border-gray-300 rounded-xl bg-white flex items-center justify-center md:justify-between focus:ring-2 focus:ring-black focus:border-transparent"
              >
                <Filter className="w-5 h-5 text-gray-700" />
                <span className="hidden md:inline text-gray-700 ml-2">Filters</span>
                <ChevronRight className={`hidden md:block w-5 h-5 text-gray-500 transition-transform ${filtersOpen ? 'rotate-90' : ''}`} />
              </button>
              {filtersOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white border border-gray-200 rounded-2xl shadow-xl z-30 p-4 space-y-4">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-semibold text-gray-900">Filters</span>
                    <button
                      onClick={() => setFiltersOpen(false)}
                      className="text-gray-500 hover:text-gray-800"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Industry</label>
                    <select
                      value={filters.industry}
                      onChange={(e) => setFilters({...filters, industry: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-black focus:border-transparent bg-white"
                    >
                      <option value="">All Industries</option>
                      <option value="Sustainability">Sustainability</option>
                      <option value="Fintech">Fintech</option>
                      <option value="HealthTech">HealthTech</option>
                      <option value="EdTech">EdTech</option>
                      <option value="AI/ML">AI/ML</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Stage</label>
                    <select
                      value={filters.stage}
                      onChange={(e) => setFilters({...filters, stage: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-black focus:border-transparent bg-white"
                    >
                      <option value="">All Stages</option>
                      <option value="Idea">Idea Stage</option>
                      <option value="MVP">MVP Stage</option>
                      <option value="Beta">Beta Stage</option>
                      <option value="Launched">Launched</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Sort</label>
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-black focus:border-transparent bg-white"
                    >
                      <option value="recent">Most Recent</option>
                      <option value="popular">Most Popular</option>
                      <option value="match">Best Match</option>
                    </select>
                  </div>
                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={() => {
                        setFilters({ industry: '', stage: '', location: '' });
                        setSortBy('recent');
                      }}
                      className="text-sm text-gray-600 hover:text-gray-900"
                    >
                      Clear
                    </button>
                    <button
                      onClick={() => setFiltersOpen(false)}
                      className="px-4 py-2 bg-black text-white rounded-xl text-sm"
                    >
                      Apply
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

                        </div>
                    </div>
      
      {/* Pitches Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredPitches.map((pitch) => (
            <div key={pitch.id} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden">
              {/* Pitch Header */}
              <div className="p-6 pb-4 border-b border-gray-100">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{pitch.title}</h3>
                    <div className="flex items-center gap-2 mb-3">
                      <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                        pitch.stageColor === 'green' ? 'bg-gray-100 text-gray-700' :
                        pitch.stageColor === 'yellow' ? 'bg-gray-100 text-gray-700' :
                        pitch.stageColor === 'blue' ? 'bg-gray-100 text-gray-700' :
                        'bg-gray-100 text-gray-700'
                      }`}>
                        {pitch.stage}
                      </span>
                      <span className="px-3 py-1 text-xs font-medium bg-gray-50 text-gray-600 rounded-full">
                        {pitch.industry}
                      </span>
                    </div>
                    <p className="text-gray-700 text-sm leading-relaxed">{pitch.shortDescription}</p>
                  </div>
                  <div className="flex items-center gap-2 ml-3">
                    <button
                      onClick={() => {
                        setBookmarkedPitches(prev => {
                          const newBookmarked = new Set(prev);
                          if (newBookmarked.has(pitch.id)) {
                            newBookmarked.delete(pitch.id);
                          } else {
                            newBookmarked.add(pitch.id);
                          }
                          return newBookmarked;
                        });
                      }}
                      className={`p-2 rounded-xl transition-all duration-200 hover:scale-110 ${
                        bookmarkedPitches.has(pitch.id)
                          ? 'bg-yellow-50 text-yellow-600'
                          : 'hover:bg-gray-100 text-gray-500'
                      }`}
                      title="Bookmark"
                    >
                      <Bookmark className={`w-5 h-5 ${bookmarkedPitches.has(pitch.id) ? 'fill-current' : ''}`} />
                    </button>
                    <button 
                      className="p-2 hover:bg-gray-100 rounded-xl transition-all duration-200 hover:scale-110 text-gray-500"
                      title="Share"
                    >
                      <Share2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Anonymous Founder Info */}
              <div className="px-6 py-4 border-b border-gray-100">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 bg-black rounded-xl flex items-center justify-center flex-shrink-0">
                    <User className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-semibold text-gray-900 truncate mr-2 blur-sm select-none">
                        {pitch.author.name}
                      </h4>
                      <span className="text-xs text-gray-600 font-semibold bg-gray-50 px-2 py-1 rounded-full whitespace-nowrap flex-shrink-0">
                        {pitch.compatibility}% match
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">
                      {pitch.author.role} • {pitch.author.location}
                    </p>
                  </div>
                </div>
                
                {/* Key Details - Compact Grid */}
                <div className="grid grid-cols-2 gap-2 text-xs text-gray-600 bg-gray-50 p-3 rounded-xl">
                  <div className="flex items-center gap-2">
                    <Briefcase className="w-3 h-3 text-black flex-shrink-0" />
                    <span className="truncate">{pitch.author.anonymousProfile?.experience}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <GraduationCap className="w-3 h-3 text-black flex-shrink-0" />
                    <span className="truncate">{pitch.author.anonymousProfile?.education}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Zap className="w-3 h-3 text-black flex-shrink-0" />
                    <span className="truncate">{pitch.author.anonymousProfile?.workStyle}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-3 h-3 text-black flex-shrink-0" />
                    <span className="truncate">{pitch.author.anonymousProfile?.availability}</span>
                  </div>
                </div>
              </div>

              {/* Looking For */}
              <div className="px-6 py-4 border-b border-gray-100 space-y-3 bg-gray-50/60">
                <div className="space-y-2">
                  <span className="text-[11px] font-semibold text-gray-500 uppercase tracking-wide">Looking For</span>
                  <div className="flex flex-wrap gap-2">
                    {pitch.lookingFor.map((role, index) => (
                      <span
                        key={index}
                        className="px-3 py-1.5 bg-gradient-to-r from-purple-50 via-white to-purple-50 text-purple-700 text-xs rounded-full font-semibold shadow-[0_1px_2px_rgba(0,0,0,0.04)]"
                      >
                        {role}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-3 text-xs text-gray-700">
                  {pitch.equityOffer && (
                    <div className="inline-flex items-center gap-1.5">
                      <DollarSign className="w-3.5 h-3.5 text-green-600" />
                      <span className="font-semibold text-green-700">{pitch.equityOffer}</span>
                    </div>
                  )}
                  {pitch.locationPreference && (
                    <div className="inline-flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-gray-500" />
                      <span className="font-medium text-gray-900">{pitch.locationPreference}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Metrics */}
              <div className="px-6 py-2 border-y border-gray-100 bg-gray-50">
                <div className="flex items-center gap-2 text-xs text-gray-600">
                  <div className="inline-flex items-center gap-1.5 whitespace-nowrap">
                    <MessageCircle className="w-3.5 h-3.5 text-gray-500" />
                    <span className="font-semibold text-gray-900">{pitch.metrics.pitches || 0}</span>
                    <span className="text-gray-600">Pitchbacks</span>
                  </div>
                  <span className="text-gray-300">•</span>
                  <div className="inline-flex items-center gap-1.5 whitespace-nowrap">
                    <Clock className="w-3.5 h-3.5 text-gray-500" />
                    <span className="text-gray-600">Posted</span>
                    <span className="font-semibold text-gray-900 whitespace-nowrap">{pitch.createdAt}</span>
                  </div>
                </div>
              </div>

              {/* Action Bar */}
              <div className="px-6 py-3 bg-white">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-5">
                    <button
                      onClick={() => handleLike(pitch.id)}
                      className="flex items-center gap-1 hover:opacity-70 transition"
                      title="Spark"
                    >
                      <Sparkles className={`w-6 h-6 ${likedPitches.has(pitch.id) ? 'fill-orange-600 text-orange-600' : 'text-gray-700'}`} />
                      <span className={`text-sm font-semibold ${likedPitches.has(pitch.id) ? 'text-orange-600' : 'text-gray-700'}`}>
                        {pitch.metrics?.likes || (likedPitches.has(pitch.id) ? 1 : 0)}
                      </span>
                    </button>
                    <button
                      onClick={() => {
                        setCommentPitch(pitch);
                        setShowCommentModal(true);
                      }}
                      className="flex items-center gap-1 hover:opacity-70 transition"
                      title="Opinions"
                    >
                      <MessagesSquare className="w-6 h-6 text-gray-700" />
                      <span className="text-sm font-semibold text-gray-700">
                        {pitch.metrics?.comments || 0}
                      </span>
                    </button>
                    <button
                      onClick={() => handleRepost(pitch.id)}
                      className="flex items-center gap-1 hover:opacity-70 transition"
                      title="Repost"
                    >
                      <Repeat2 className={`w-6 h-6 ${repostedPitches.has(pitch.id) ? 'text-green-600' : 'text-gray-700'}`} />
                      <span className={`text-sm font-semibold ${repostedPitches.has(pitch.id) ? 'text-green-600' : 'text-gray-700'}`}>
                        {pitch.metrics?.reposts || (repostedPitches.has(pitch.id) ? 1 : 0)}
                      </span>
                    </button>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => handleViewDetails(pitch)}
                      className="p-2.5 bg-gray-200 hover:bg-gray-300 rounded-full transition-colors"
                      title="View Details"
                    >
                      <Eye className="w-5 h-5 text-gray-800" />
                    </button>
                    <button
                      onClick={() => handlePitchback(pitch)}
                      className="p-2.5 bg-gray-900 hover:bg-gray-800 rounded-full transition-colors"
                      title="Pitchback"
                    >
                      <Send className="w-5 h-5 text-white" />
                    </button>
                  </div>
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
    </>
  );
};

export default Home;
