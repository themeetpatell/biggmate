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
  Lightbulb,
  Pill,
  MessageSquare
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
  const [showCommentModal, setShowCommentModal] = useState(false);
  const [commentPitch, setCommentPitch] = useState(null);
  const [commentText, setCommentText] = useState('');
  const [showPitchModal, setShowPitchModal] = useState(false);
  const [selectedPitch, setSelectedPitch] = useState(null);
  const [pitchMessage, setPitchMessage] = useState('');
  const [showCreatePitch, setShowCreatePitch] = useState(false);
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
    requiredSkills: '',
    whatYouBring: '',
    location: '',
    timeline: '',
    fundingStage: '',
    equityOffer: '',
    additionalInfo: ''
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('recent');
  const [filters, setFilters] = useState({
    industry: '',
    stage: '',
    location: ''
  });

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
          comments: 8
        },
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
          comments: 5
        },
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
      problem: apiPitch.problem || '',
      solution: apiPitch.solution || '',
      targetMarket: apiPitch.target_market || '',
      businessModel: apiPitch.business_model || '',
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
        summary: 'Founder',
        anonymousProfile: {
          experience: '',
          skills: apiPitch.skills_needed || [],
          previousStartups: [],
          education: '',
          achievements: [],
          workStyle: '',
          availability: apiPitch.timeline || 'Flexible'
        }
      },
      compatibility: Math.floor(Math.random() * 20) + 80,
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
      createdAt: apiPitch.created_at ? new Date(apiPitch.created_at).toLocaleDateString() : 'Recently',
      imageUrl: null
    };
  };

  // Load pitches from API
  const loadMorePitches = useCallback(async () => {
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
        setBookmarkedPitches(prev => new Set([...prev, ...newSavedIds]));
        
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

  // Load user's liked and saved pitches
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
      setBookmarkedPitches(savedIds);
    } catch (error) {
      console.log('Could not load user interactions:', error);
    }
  };

  // Initial load
  const initialLoadDone = React.useRef(false);
  useEffect(() => {
    if (!initialLoadDone.current) {
      initialLoadDone.current = true;
      loadMorePitches();
      loadUserInteractions();
    }
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

  const handleLike = async (pitchId) => {
    const isCurrentlyLiked = likedPitches.has(pitchId);
    
    // Optimistic update
    setLikedPitches(prev => {
      const newLiked = new Set(prev);
      if (isCurrentlyLiked) {
        newLiked.delete(pitchId);
      } else {
        newLiked.add(pitchId);
      }
      return newLiked;
    });
    
    // Update like count optimistically
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
    
    try {
      if (isCurrentlyLiked) {
        await pitchesAPI.unlikePitch(pitchId);
      } else {
        await pitchesAPI.likePitch(pitchId);
      }
    } catch (error) {
      console.error('Error toggling like:', error);
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

  const handleBookmark = async (pitchId) => {
    const isCurrentlyBookmarked = bookmarkedPitches.has(pitchId);
    
    // Optimistic update
    setBookmarkedPitches(prev => {
      const newBookmarked = new Set(prev);
      if (isCurrentlyBookmarked) {
        newBookmarked.delete(pitchId);
      } else {
        newBookmarked.add(pitchId);
      }
      return newBookmarked;
    });
    
    try {
      if (isCurrentlyBookmarked) {
        await pitchesAPI.unsavePitch(pitchId);
      } else {
        await pitchesAPI.savePitch(pitchId);
      }
    } catch (error) {
      console.error('Error toggling bookmark:', error);
      // Revert on error
      setBookmarkedPitches(prev => {
        const newBookmarked = new Set(prev);
        if (isCurrentlyBookmarked) {
          newBookmarked.add(pitchId);
        } else {
          newBookmarked.delete(pitchId);
        }
        return newBookmarked;
      });
    }
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

  const [isSubmittingPitch, setIsSubmittingPitch] = useState(false);

  const handleSubmitPitch = async () => {
    if (!pitchForm.startupName || !pitchForm.industry || !pitchForm.oneLineDescription || 
        !pitchForm.problem || !pitchForm.solution || !pitchForm.targetMarket || 
        !pitchForm.businessModel || !pitchForm.currentStage || !pitchForm.lookingForRole ||
        !pitchForm.requiredSkills || !pitchForm.whatYouBring || !pitchForm.location || 
        !pitchForm.timeline) {
      return;
    }
    
    setIsSubmittingPitch(true);
    
    try {
      // Transform form data to match API expectations
      const pitchData = {
        title: pitchForm.startupName,
        tagline: pitchForm.oneLineDescription,
        description: `${pitchForm.problem}\n\n${pitchForm.solution}`,
        problem: pitchForm.problem,
        solution: pitchForm.solution,
        target_audience: pitchForm.targetMarket,
        business_model: pitchForm.businessModel,
        market_size: pitchForm.marketSize || '',
        stage: pitchForm.currentStage,
        industry: pitchForm.industry,
        location: pitchForm.location,
        timeline: pitchForm.timeline,
        funding_stage: pitchForm.fundingStage || '',
        equity_offer: pitchForm.equityOffer || '',
        looking_for_role: pitchForm.lookingForRole,
        required_skills: pitchForm.requiredSkills,
        what_you_bring: pitchForm.whatYouBring,
        additional_info: pitchForm.additionalInfo || '',
        reply_to_pitch: selectedPitch?.id || null
      };
      
      const response = await pitchesAPI.createPitch(pitchData);
      
      // Transform the response and add to local state
      const transformedPitch = transformPitchData(response.data);
      setPitches(prev => [transformedPitch, ...prev]);
      
      setSuccessMessage('Pitch created successfully!');
      setShowSuccessMessage(true);
      setTimeout(() => {
        setShowSuccessMessage(false);
        setSuccessMessage('');
      }, 3000);
      
      // Reset form and close modal
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
    } catch (error) {
      console.error('Error creating pitch:', error);
      setSuccessMessage('Failed to create pitch. Please try again.');
      setShowSuccessMessage(true);
      setTimeout(() => {
        setShowSuccessMessage(false);
        setSuccessMessage('');
      }, 3000);
    } finally {
      setIsSubmittingPitch(false);
    }
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
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Required skills & experience *
                  </label>
                  <input
                    type="text"
                    value={pitchForm.requiredSkills}
                    onChange={(e) => setPitchForm({...pitchForm, requiredSkills: e.target.value})}
                    placeholder="e.g., React, Node.js, 5+ years startup experience, B2B sales"
                    className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-black focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    What you bring to the table *
                  </label>
                  <textarea
                    value={pitchForm.whatYouBring}
                    onChange={(e) => setPitchForm({...pitchForm, whatYouBring: e.target.value})}
                    placeholder="Describe your background, skills, and what you'll contribute to the partnership..."
                    className="w-full h-24 p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-black focus:border-transparent resize-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Equity Offer (Optional)
                  </label>
                  <input
                    type="text"
                    value={pitchForm.equityOffer}
                    onChange={(e) => setPitchForm({...pitchForm, equityOffer: e.target.value})}
                    placeholder="e.g., 20-30% equity"
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
                    requiredSkills: '',
                    whatYouBring: '',
                    location: '',
                    timeline: '',
                    fundingStage: '',
                    equityOffer: '',
                    additionalInfo: ''
                  });
                }}
                className="flex-1 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmitPitch}
                disabled={isSubmittingPitch || !pitchForm.startupName || !pitchForm.industry || !pitchForm.oneLineDescription || 
                         !pitchForm.problem || !pitchForm.solution || !pitchForm.targetMarket || 
                         !pitchForm.businessModel || !pitchForm.currentStage || !pitchForm.lookingForRole ||
                         !pitchForm.requiredSkills || !pitchForm.whatYouBring || !pitchForm.location || 
                         !pitchForm.timeline}
                className="flex-1 py-3 bg-black text-white rounded-xl font-semibold hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
              >
                {isSubmittingPitch ? 'Posting...' : (selectedPitch ? 'Send Pitch' : 'Post Pitch')}
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
      )}

      {/* Pitchback Modal */}
      {showPitchbackModal && selectedPitchback && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={() => {
          setShowPitchbackModal(false);
          setSelectedPitchback(null);
          setPitchbackMessage('');
        }}>
          <div className="bg-white rounded-3xl p-8 max-w-3xl w-full mx-auto max-h-[90vh] overflow-y-auto shadow-2xl" onClick={(e) => e.stopPropagation()}>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Pitch to Anonymous</h1>
              <p className="text-gray-600 mt-1">Respond to their pitch: "{selectedPitchback.title}"</p>
            </div>
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
            <div className="bg-gray-50 p-6 rounded-2xl border-l-4 border-black">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Responding to:</h2>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-black rounded-xl flex items-center justify-center flex-shrink-0">
                  <User className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-2 text-xl">{selectedPitchback.title}</h3>
                  <p className="text-gray-600 text-sm mb-3">{selectedPitchback.description || selectedPitchback.shortDescription}</p>
                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                    <span>{selectedPitchback.author.role} • {selectedPitchback.author.location}</span>
                    <span className="px-2 py-1 bg-gray-200 text-gray-700 rounded-full text-xs">
                      {selectedPitchback.stage}
                    </span>
                  </div>
                  {selectedPitchback.lookingFor && selectedPitchback.lookingFor.length > 0 && (
                    <div className="mb-4">
                      <p className="text-xs font-medium text-gray-700 mb-2">Looking for:</p>
                      <div className="flex flex-wrap gap-2">
                        {selectedPitchback.lookingFor.map((role, index) => (
                          <span key={index} className="px-2 py-1 bg-gray-200 text-gray-700 text-xs rounded-full">
                            {role}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {selectedPitchback.problem && (
              <div className="bg-white p-6 rounded-2xl border-2 border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <Target className="w-5 h-5 text-black" />
                  Problem Statement
                </h3>
                <p className="text-gray-700 leading-relaxed whitespace-pre-line">{selectedPitchback.problem}</p>
              </div>
            )}

            {selectedPitchback.solution && (
              <div className="bg-white p-6 rounded-2xl border-2 border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <Lightbulb className="w-5 h-5 text-black" />
                  Solution Statement
                </h3>
                <p className="text-gray-700 leading-relaxed whitespace-pre-line">{selectedPitchback.solution}</p>
              </div>
            )}

            <div className="bg-white p-6 rounded-2xl border-2 border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Your Pitchback Message</h2>
              <p className="text-sm text-gray-600 mb-4">
                Write a message explaining why you're interested in this pitch and what you can bring to the partnership.
              </p>
              <textarea
                value={pitchbackMessage}
                onChange={(e) => {
                  if (e.target.value.length <= 500) {
                    setPitchbackMessage(e.target.value);
                  }
                }}
                placeholder="Hi! I'm interested in your pitch. I have experience in [your expertise] and I think we could work well together because [your reasons]. I'm looking forward to discussing this opportunity further..."
                className="w-full h-40 p-4 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-black focus:border-transparent resize-none"
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

            <div className="flex gap-4 pt-2">
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
                {/* Pitch Header */}
                <div className="border-b border-gray-200 pb-6">
                  <div className="flex items-start gap-6 mb-4">
                    <div className="w-24 h-24 bg-gray-900 rounded-2xl flex items-center justify-center flex-shrink-0">
                      {selectedPitchDetails.imageUrl ? (
                        <img
                          src={selectedPitchDetails.imageUrl}
                          alt={selectedPitchDetails.title}
                          className="w-full h-full object-cover rounded-2xl"
                        />
                      ) : (
                        <Rocket className="w-12 h-12 text-white" />
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-3xl font-bold text-gray-900 mb-2">{selectedPitchDetails.title}</h3>
                      <p className="text-gray-600 text-lg mb-4 leading-relaxed">{selectedPitchDetails.shortDescription}</p>
                      <div className="flex items-center gap-3 flex-wrap">
                        <span className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">{selectedPitchDetails.industry}</span>
                        <span className={`px-3 py-1.5 rounded-full text-xs font-semibold ${
                          selectedPitchDetails.stageColor === 'green' ? 'bg-gray-100 text-gray-700' :
                          selectedPitchDetails.stageColor === 'yellow' ? 'bg-gray-100 text-gray-700' :
                          selectedPitchDetails.stageColor === 'blue' ? 'bg-gray-100 text-gray-700' :
                          'bg-gray-100 text-gray-700'
                        }`}>
                          {selectedPitchDetails.stage}
                        </span>
                        <span className="px-3 py-1.5 bg-black text-white rounded-full text-sm font-semibold">{selectedPitchDetails.compatibility}% match</span>
                      </div>
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

                {/* Problem & Solution */}
                {(selectedPitchDetails.problem || selectedPitchDetails.solution) && (
                  <div className="space-y-4">
                    {selectedPitchDetails.problem && (
                      <div className="bg-red-50 border-l-4 border-red-500 rounded-r-xl p-5">
                        <h4 className="text-lg font-bold text-gray-900 mb-2 flex items-center gap-2">
                          <Target className="w-5 h-5 text-red-600" />
                          Problem
                        </h4>
                        <p className="text-gray-700 leading-relaxed">{selectedPitchDetails.problem}</p>
                      </div>
                    )}
                    {selectedPitchDetails.solution && (
                      <div className="bg-green-50 border-l-4 border-green-500 rounded-r-xl p-5">
                        <h4 className="text-lg font-bold text-gray-900 mb-2 flex items-center gap-2">
                          <Lightbulb className="w-5 h-5 text-green-600" />
                          Solution
                        </h4>
                        <p className="text-gray-700 leading-relaxed">{selectedPitchDetails.solution}</p>
                      </div>
                    )}
                  </div>
                )}

                {/* Market & Funding Info */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-5 border border-blue-200">
                    <div className="flex items-center gap-2 mb-2">
                      <Clock className="w-5 h-5 text-blue-600" />
                      <h5 className="font-semibold text-gray-900">Timeline</h5>
                    </div>
                    <p className="text-sm text-gray-700 font-medium">{selectedPitchDetails.timeline}</p>
                  </div>
                  <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-5 border border-purple-200">
                    <div className="flex items-center gap-2 mb-2">
                      <TrendingUp className="w-5 h-5 text-purple-600" />
                      <h5 className="font-semibold text-gray-900">Market Size</h5>
                    </div>
                    <p className="text-sm text-gray-700 font-medium">{selectedPitchDetails.market}</p>
                  </div>
                  <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-5 border border-green-200">
                    <div className="flex items-center gap-2 mb-2">
                      <DollarSign className="w-5 h-5 text-green-600" />
                      <h5 className="font-semibold text-gray-900">Funding Stage</h5>
                    </div>
                    <p className="text-sm text-gray-700 font-medium">{selectedPitchDetails.funding}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div className="bg-white border border-gray-200 rounded-xl p-5">
                    <div className="flex items-center gap-2 mb-2">
                      <Globe className="w-5 h-5 text-gray-800" />
                      <h5 className="font-semibold text-gray-900">Target Market</h5>
                    </div>
                    <p className="text-sm text-gray-700">{selectedPitchDetails.targetMarket || 'Not specified'}</p>
                  </div>
                  <div className="bg-white border border-gray-200 rounded-xl p-5">
                    <div className="flex items-center gap-2 mb-2">
                      <Briefcase className="w-5 h-5 text-gray-800" />
                      <h5 className="font-semibold text-gray-900">Business Model</h5>
                    </div>
                    <p className="text-sm text-gray-700">{selectedPitchDetails.businessModel || 'Not specified'}</p>
                  </div>
                </div>
                    
                {/* Collaboration Details */}
                <div className="mt-6 p-5 bg-gray-50 border border-gray-200 rounded-xl space-y-4">
                  <h4 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                    <Users className="w-5 h-5" />
                    Looking For
                  </h4>

                  <div className="flex flex-wrap gap-2">
                    {selectedPitchDetails.lookingFor.map((role, index) => (
                      <span key={index} className="px-4 py-2 bg-purple-50 text-purple-700 rounded-full font-medium text-sm">
                        {role}
                      </span>
                    ))}
                  </div>

                  {(selectedPitchDetails.requiredSkills || selectedPitchDetails.author?.anonymousProfile?.skills?.length) && (
                    <div className="space-y-2">
                      <p className="font-semibold text-gray-900 text-sm">Required skills & experience</p>
                      <div className="flex flex-wrap gap-2">
                        {(selectedPitchDetails.requiredSkills
                          ? selectedPitchDetails.requiredSkills.split(',').map(s => s.trim()).filter(Boolean)
                          : selectedPitchDetails.author?.anonymousProfile?.skills || []
                        ).map((skill, idx) => (
                          <span key={idx} className="px-3 py-1.5 bg-white border border-gray-200 text-gray-700 rounded-full text-sm">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {(selectedPitchDetails.author?.summary || selectedPitchDetails.author?.anonymousProfile?.experience || selectedPitchDetails.author?.role) && (
                    <div className="p-3 rounded-xl bg-white border border-gray-200 text-sm text-gray-700">
                      <span className="font-semibold text-gray-900">What they bring:</span>{' '}
                      {selectedPitchDetails.author?.summary || selectedPitchDetails.author?.anonymousProfile?.experience || selectedPitchDetails.author?.role}
                    </div>
                  )}

                  {selectedPitchDetails.equityOffer && (
                    <div className="p-3 rounded-xl bg-white border border-gray-200 text-sm text-gray-700">
                      <span className="font-semibold text-gray-900">Equity Offer:</span> {selectedPitchDetails.equityOffer}
                    </div>
                  )}
                </div>

                {selectedPitchDetails.additionalInfo && (
                  <div className="bg-gray-50 rounded-2xl p-5 border border-gray-100">
                    <h4 className="text-lg font-bold text-gray-900 mb-2">Additional Information</h4>
                    <p className="text-sm text-gray-700 leading-relaxed">{selectedPitchDetails.additionalInfo}</p>
                  </div>
                )}

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
                  <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
                    <button
                      onClick={() => {
                        setLovedPitches(prev => {
                          const newLoved = new Set(prev);
                          if (newLoved.has(selectedPitchDetails.id)) {
                            newLoved.delete(selectedPitchDetails.id);
                          } else {
                            newLoved.add(selectedPitchDetails.id);
                          }
                          return newLoved;
                        });
                      }}
                      className={`inline-flex items-center gap-2.5 px-3.5 py-2 rounded-full border text-sm font-medium transition hover:shadow-sm whitespace-nowrap ${
                        lovedPitches.has(selectedPitchDetails.id)
                          ? 'border-red-200 bg-red-50 text-red-700 hover:bg-red-100'
                          : 'border-gray-200 bg-white text-gray-700 hover:bg-gray-50'
                      }`}
                      title="Painkiller"
                    >
                      <Pill className={`w-4 h-4 ${lovedPitches.has(selectedPitchDetails.id) ? 'fill-current' : ''}`} />
                      <span className="text-gray-700">Painkiller</span>
                      <span className="font-semibold text-gray-900">{selectedPitchDetails.metrics?.medicine || 0}</span>
                    </button>
                    <button
                      onClick={() => handleLike(selectedPitchDetails.id)}
                      className={`inline-flex items-center gap-2.5 px-3.5 py-2 rounded-full border text-sm font-medium transition hover:shadow-sm whitespace-nowrap ${
                        likedPitches.has(selectedPitchDetails.id)
                          ? 'border-blue-200 bg-blue-50 text-blue-700 hover:bg-blue-100'
                          : 'border-gray-200 bg-white text-gray-700 hover:bg-gray-50'
                      }`}
                      title="Vitamin"
                    >
                      <Heart className={`w-4 h-4 ${likedPitches.has(selectedPitchDetails.id) ? 'fill-current' : ''}`} />
                      <span className="text-gray-700">Vitamin</span>
                      <span className="font-semibold text-gray-900">{selectedPitchDetails.metrics?.likes || 0}</span>
                    </button>
                    <button
                      onClick={() => {
                        setCommentPitch(selectedPitchDetails);
                        setShowCommentModal(true);
                      }}
                      className="inline-flex items-center gap-2.5 px-3.5 py-2 rounded-full border border-gray-200 bg-white text-gray-700 transition hover:shadow-sm hover:bg-gray-50 text-sm font-medium whitespace-nowrap"
                      title="Comments"
                    >
                      <MessageSquare className="w-4 h-4" />
                      <span className="text-gray-700">Comments</span>
                      <span className="font-semibold text-gray-900">{selectedPitchDetails.metrics?.comments || 0}</span>
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
          <div className="bg-white rounded-3xl p-8 max-w-md w-full mx-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Add Comment</h2>
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
            
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Your Comment
              </label>
              <textarea
                value={commentText}
                onChange={(e) => {
                  if (e.target.value.length <= 500) {
                    setCommentText(e.target.value);
                  }
                }}
                placeholder="Share your thoughts or feedback about this pitch..."
                className="w-full h-32 p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-black focus:border-transparent resize-none"
              />
              <p className="text-xs text-gray-500 mt-2">{commentText.length}/500 characters</p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => {
                  setShowCommentModal(false);
                  setCommentPitch(null);
                  setCommentText('');
                }}
                className="flex-1 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  if (commentText.trim()) {
                    console.log('Comment submitted:', commentText);
                    setShowCommentModal(false);
                    setCommentPitch(null);
                    setCommentText('');
                  }
                }}
                disabled={!commentText.trim()}
                className="flex-1 py-3 bg-black text-white rounded-xl font-semibold hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
              >
                Submit Comment
              </button>
            </div>
          </div>
        </div>
      )}

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
                      onClick={() => handleBookmark(pitch.id)}
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
                
                {/* Skills */}
                <div className="mt-3">
                  <div className="flex flex-wrap gap-1">
                    {(pitch.author.anonymousProfile?.skills || []).slice(0, 4).map((skill, index) => (
                      <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full font-medium">
                        {skill}
                      </span>
                    ))}
                    {(pitch.author.anonymousProfile?.skills || []).length > 4 && (
                      <span className="px-2 py-1 bg-gray-200 text-gray-600 text-xs rounded-full font-medium">
                        +{(pitch.author.anonymousProfile?.skills || []).length - 4}
                      </span>
                    )}
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
              </div>

              {/* Metrics */}
              <div className="px-6 py-2 border-y border-gray-100 bg-gray-50">
                <div className="flex flex-wrap items-center gap-3 sm:gap-5 text-xs sm:text-sm text-gray-600">
                  <div className="inline-flex items-center gap-2 whitespace-nowrap">
                    <Eye className="w-3.5 h-3.5 text-gray-500" />
                    <span className="font-semibold text-gray-900 text-sm">{pitch.metrics.views}</span>
                    <span className="text-gray-600 text-[11px] sm:text-sm">Views</span>
                  </div>
                  <span className="text-gray-300 hidden sm:inline">•</span>
                  <div className="inline-flex items-center gap-2 whitespace-nowrap">
                    <MessageCircle className="w-3.5 h-3.5 text-gray-500" />
                    <span className="font-semibold text-gray-900 text-sm">{pitch.metrics.pitches || 0}</span>
                    <span className="text-gray-600 text-[11px] sm:text-sm">Pitchbacks</span>
                  </div>
                  <span className="text-gray-300 hidden sm:inline">•</span>
                  <div className="inline-flex items-center gap-2 whitespace-nowrap">
                    <Clock className="w-3.5 h-3.5 text-gray-500" />
                    <span className="text-gray-600 text-[11px] sm:text-sm">Posted</span>
                    <span className="font-semibold text-gray-900 text-sm whitespace-nowrap">{pitch.createdAt}</span>
                  </div>
                </div>
              </div>

              {/* Action Bar */}
              <div className="px-6 py-3 border-b border-gray-100 bg-white">
                <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 text-xs sm:text-sm text-gray-700 mb-3">
                  <button
                    onClick={() => {
                      setLovedPitches(prev => {
                        const newLoved = new Set(prev);
                        if (newLoved.has(pitch.id)) {
                          newLoved.delete(pitch.id);
                        } else {
                          newLoved.add(pitch.id);
                        }
                        return newLoved;
                      });
                    }}
                    className={`inline-flex items-center gap-2.5 px-3.5 py-2 rounded-full border text-sm font-medium transition hover:shadow-sm whitespace-nowrap ${
                      lovedPitches.has(pitch.id)
                        ? 'border-red-200 bg-red-50 text-red-700 hover:bg-red-100'
                        : 'border-gray-200 bg-white text-gray-700 hover:bg-gray-50'
                    }`}
                    title="Painkiller"
                  >
                    <Pill className={`w-4 h-4 ${lovedPitches.has(pitch.id) ? 'fill-current' : ''}`} />
                    <span className="text-gray-700">Painkiller</span>
                    <span className="font-semibold text-gray-900">{pitch.metrics?.medicine || (lovedPitches.has(pitch.id) ? 1 : 0)}</span>
                  </button>
                  <button
                    onClick={() => handleLike(pitch.id)}
                    className={`inline-flex items-center gap-2.5 px-3.5 py-2 rounded-full border text-sm font-medium transition hover:shadow-sm whitespace-nowrap ${
                      likedPitches.has(pitch.id)
                        ? 'border-blue-200 bg-blue-50 text-blue-700 hover:bg-blue-100'
                        : 'border-gray-200 bg-white text-gray-700 hover:bg-gray-50'
                    }`}
                    title="Vitamin"
                  >
                    <Heart className={`w-4 h-4 ${likedPitches.has(pitch.id) ? 'fill-current' : ''}`} />
                    <span className="text-gray-700">Vitamin</span>
                    <span className="font-semibold text-gray-900">{pitch.metrics?.likes || (likedPitches.has(pitch.id) ? 1 : 0)}</span>
                  </button>
                  <button
                    onClick={() => {
                      setCommentPitch(pitch);
                      setShowCommentModal(true);
                    }}
                    className="inline-flex items-center gap-2.5 px-3.5 py-2 rounded-full border border-gray-200 bg-white text-gray-700 transition hover:shadow-sm hover:bg-gray-50 text-sm font-medium whitespace-nowrap"
                    title="Comments"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span className="text-gray-700">Comments</span>
                    <span className="font-semibold text-gray-900">{pitch.metrics?.comments || 0}</span>
                  </button>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => handleViewDetails(pitch)}
                    className="flex-1 py-3 px-4 bg-gray-100 text-gray-800 rounded-xl font-semibold hover:bg-gray-200 transition-all duration-200 flex items-center justify-center gap-2"
                  >
                    <Eye className="w-4 h-4" />
                    View Details
                  </button>
                  <button
                    onClick={() => handlePitchback(pitch)}
                    className="flex-1 py-3 px-4 bg-black text-white rounded-xl font-semibold hover:bg-gray-900 transition-all duration-200 flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    Pitchback
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
    </>
  );
};

export default Home;