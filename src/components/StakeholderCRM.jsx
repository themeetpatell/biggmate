import React, { useState, useEffect } from 'react';
import {
  Users,
  Plus,
  Search,
  Filter,
  Star,
  Mail,
  Phone,
  Building,
  Briefcase,
  Calendar,
  Edit,
  Trash2,
  X,
  Check,
  Linkedin,
  Twitter,
  UserPlus,
  TrendingUp,
  Heart,
  Zap,
  Target,
  Crown,
  Sparkles,
  MoreVertical,
  ExternalLink,
  Tag,
  Clock,
  MessageSquare,
  Activity,
  BarChart3,
  ChevronRight,
  Download,
  Upload
} from 'lucide-react';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const generateDummyData = () => {
  const today = new Date();
  const nextWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
  const nextMonth = new Date(today.getTime() + 30 * 24 * 60 * 60 * 1000);
  const lastWeek = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);

  return [
    {
      id: 1,
      name: 'Sarah Chen',
      type: 'investor',
      email: 'sarah.chen@venturecapital.com',
      phone: '+1 (555) 123-4567',
      company: 'TechVentures Capital',
      title: 'Partner',
      linkedin_url: 'https://linkedin.com/in/sarahchen',
      twitter_handle: '@sarahchenvc',
      notes: 'Very interested in AI/ML startups. Has strong network in Silicon Valley. Follow up about our Series A plans.',
      tags: ['Series A', 'AI/ML', 'Silicon Valley'],
      last_contact_date: lastWeek.toISOString().split('T')[0],
      next_followup_date: nextWeek.toISOString().split('T')[0],
      relationship_strength: 8,
      is_favorite: true
    },
    {
      id: 2,
      name: 'Dr. Michael Rodriguez',
      type: 'advisor',
      email: 'mrodriguez@stanford.edu',
      phone: '+1 (555) 234-5678',
      company: 'Stanford University',
      title: 'Professor of Computer Science',
      linkedin_url: 'https://linkedin.com/in/mrodriguez',
      notes: 'Expert in distributed systems. Can provide technical guidance and introductions to top engineering talent.',
      tags: ['Technical', 'Academic', 'Engineering'],
      last_contact_date: today.toISOString().split('T')[0],
      next_followup_date: nextMonth.toISOString().split('T')[0],
      relationship_strength: 9,
      is_favorite: true
    },
    {
      id: 3,
      name: 'Emma Thompson',
      type: 'mentor',
      email: 'emma@startupmentor.io',
      phone: '+1 (555) 345-6789',
      company: 'Startup Mentor Network',
      title: 'Founder & CEO',
      linkedin_url: 'https://linkedin.com/in/emmathompson',
      twitter_handle: '@emmathompson',
      notes: 'Former founder of successful SaaS company. Great for product strategy and go-to-market advice.',
      tags: ['Product', 'GTM', 'SaaS'],
      last_contact_date: lastWeek.toISOString().split('T')[0],
      next_followup_date: nextWeek.toISOString().split('T')[0],
      relationship_strength: 7,
      is_favorite: false
    },
    {
      id: 4,
      name: 'Alex Kumar',
      type: 'early-adopter',
      email: 'alex@techcorp.com',
      phone: '+1 (555) 456-7890',
      company: 'TechCorp Inc.',
      title: 'CTO',
      linkedin_url: 'https://linkedin.com/in/alexkumar',
      notes: 'Early adopter of our platform. Very engaged and provides valuable feedback. Potential case study candidate.',
      tags: ['Early Adopter', 'Feedback', 'Case Study'],
      last_contact_date: today.toISOString().split('T')[0],
      next_followup_date: nextWeek.toISOString().split('T')[0],
      relationship_strength: 6,
      is_favorite: false
    },
    {
      id: 5,
      name: 'Jessica Park',
      type: 'beta-tester',
      email: 'jessica.park@email.com',
      phone: '+1 (555) 567-8901',
      company: 'Freelance Designer',
      title: 'UX/UI Designer',
      notes: 'Beta testing our new features. Very detailed feedback. Consider for design advisor role.',
      tags: ['Beta Tester', 'Design', 'UX'],
      last_contact_date: lastWeek.toISOString().split('T')[0],
      next_followup_date: nextMonth.toISOString().split('T')[0],
      relationship_strength: 5,
      is_favorite: false
    },
    {
      id: 6,
      name: 'David Kim',
      type: 'supporter',
      email: 'david@startupcommunity.org',
      phone: '+1 (555) 678-9012',
      company: 'Startup Community Hub',
      title: 'Community Manager',
      linkedin_url: 'https://linkedin.com/in/davidkim',
      twitter_handle: '@davidkim',
      notes: 'Active supporter of our startup. Helps with community building and networking events.',
      tags: ['Community', 'Networking', 'Events'],
      last_contact_date: today.toISOString().split('T')[0],
      next_followup_date: nextWeek.toISOString().split('T')[0],
      relationship_strength: 6,
      is_favorite: true
    },
    {
      id: 7,
      name: 'Rachel Green',
      type: 'team-prospect',
      email: 'rachel.green@email.com',
      phone: '+1 (555) 789-0123',
      company: 'Big Tech Corp',
      title: 'Senior Product Manager',
      linkedin_url: 'https://linkedin.com/in/rachelgreen',
      notes: 'Interested in joining as Head of Product. Strong background in B2B SaaS. Schedule interview.',
      tags: ['Recruiting', 'Product', 'B2B'],
      last_contact_date: lastWeek.toISOString().split('T')[0],
      next_followup_date: nextWeek.toISOString().split('T')[0],
      relationship_strength: 7,
      is_favorite: true
    },
    {
      id: 8,
      name: 'James Wilson',
      type: 'investor',
      email: 'james@angelinvestors.com',
      phone: '+1 (555) 890-1234',
      company: 'Angel Investors Network',
      title: 'Angel Investor',
      linkedin_url: 'https://linkedin.com/in/jameswilson',
      notes: 'Angel investor interested in seed round. Has invested in 20+ startups. Good for warm introductions.',
      tags: ['Angel', 'Seed Round', 'Network'],
      last_contact_date: today.toISOString().split('T')[0],
      next_followup_date: nextMonth.toISOString().split('T')[0],
      relationship_strength: 6,
      is_favorite: false
    },
    {
      id: 9,
      name: 'Lisa Anderson',
      type: 'advisor',
      email: 'lisa@legaladvisors.com',
      phone: '+1 (555) 901-2345',
      company: 'Anderson Legal Group',
      title: 'Partner',
      notes: 'Legal advisor specializing in startup law. Can help with incorporation, equity, and fundraising legal matters.',
      tags: ['Legal', 'Compliance', 'Fundraising'],
      last_contact_date: lastWeek.toISOString().split('T')[0],
      next_followup_date: nextWeek.toISOString().split('T')[0],
      relationship_strength: 8,
      is_favorite: false
    }
  ];
};

const getDummyStats = (stakeholders) => {
  const favorites = stakeholders.filter(s => s.is_favorite).length;
  const upcomingFollowups = stakeholders.filter(s => {
    if (!s.next_followup_date) return false;
    const followupDate = new Date(s.next_followup_date);
    const today = new Date();
    const nextWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
    return followupDate >= today && followupDate <= nextWeek;
  }).length;

  const byType = {};
  stakeholders.forEach(s => {
    byType[s.type] = (byType[s.type] || 0) + 1;
  });

  return {
    total: stakeholders.length,
    favorites,
    upcomingFollowups,
    byType
  };
};

const stakeholderTypes = [
  { id: 'advisor', label: 'Advisor', icon: Crown, color: 'bg-gray-100 text-gray-700', accent: 'bg-gray-900' },
  { id: 'investor', label: 'Investor', icon: TrendingUp, color: 'bg-gray-100 text-gray-700', accent: 'bg-gray-800' },
  { id: 'mentor', label: 'Mentor', icon: Heart, color: 'bg-gray-100 text-gray-700', accent: 'bg-gray-700' },
  { id: 'early-adopter', label: 'Early Adopter', icon: Zap, color: 'bg-gray-100 text-gray-700', accent: 'bg-gray-900' },
  { id: 'beta-tester', label: 'Beta Tester', icon: Target, color: 'bg-gray-100 text-gray-700', accent: 'bg-gray-800' },
  { id: 'supporter', label: 'Supporter', icon: Sparkles, color: 'bg-gray-100 text-gray-700', accent: 'bg-gray-700' },
  { id: 'team-prospect', label: 'Team Prospect', icon: UserPlus, color: 'bg-gray-100 text-gray-700', accent: 'bg-gray-900' }
];

const StakeholderCRM = () => {
  const [stakeholders, setStakeholders] = useState([]);
  const [stats, setStats] = useState({ total: 0, favorites: 0, upcomingFollowups: 0, byType: {} });
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingStakeholder, setEditingStakeholder] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('');
  const [filterFavorite, setFilterFavorite] = useState(false);
  const [viewMode, setViewMode] = useState('grid');
  const [selectedStakeholder, setSelectedStakeholder] = useState(null);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    fetchStakeholders();
    fetchStats();
  }, [filterType, filterFavorite, searchQuery]);

  const fetchStakeholders = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const params = new URLSearchParams();
      if (filterType) params.append('type', filterType);
      if (filterFavorite) params.append('favorite', 'true');
      if (searchQuery) params.append('search', searchQuery);

      const response = await fetch(`${API_BASE_URL}/stakeholders?${params}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setStakeholders(data.stakeholders || []);
      } else {
        // Use dummy data if API fails or no token
        let dummyData = generateDummyData();
        
        // Apply filters to dummy data
        if (filterType) {
          dummyData = dummyData.filter(s => s.type === filterType);
        }
        if (filterFavorite) {
          dummyData = dummyData.filter(s => s.is_favorite);
        }
        if (searchQuery) {
          const query = searchQuery.toLowerCase();
          dummyData = dummyData.filter(s => 
            s.name.toLowerCase().includes(query) ||
            s.company?.toLowerCase().includes(query) ||
            s.email?.toLowerCase().includes(query)
          );
        }
        
        setStakeholders(dummyData);
      }
    } catch (error) {
      console.error('Error fetching stakeholders:', error);
      // Use dummy data on error
      let dummyData = generateDummyData();
      
      // Apply filters to dummy data
      if (filterType) {
        dummyData = dummyData.filter(s => s.type === filterType);
      }
      if (filterFavorite) {
        dummyData = dummyData.filter(s => s.is_favorite);
      }
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        dummyData = dummyData.filter(s => 
          s.name.toLowerCase().includes(query) ||
          s.company?.toLowerCase().includes(query) ||
          s.email?.toLowerCase().includes(query)
        );
      }
      
      setStakeholders(dummyData);
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE_URL}/stakeholders/stats/summary`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setStats(data);
      } else {
        // Use dummy stats if API fails
        const dummyData = generateDummyData();
        setStats(getDummyStats(dummyData));
      }
    } catch (error) {
      console.error('Error fetching stats:', error);
      // Use dummy stats on error
      const dummyData = generateDummyData();
      setStats(getDummyStats(dummyData));
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this stakeholder?')) return;

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE_URL}/stakeholders/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        fetchStakeholders();
        fetchStats();
        if (selectedStakeholder?.id === id) {
          setSelectedStakeholder(null);
        }
      }
    } catch (error) {
      console.error('Error deleting stakeholder:', error);
    }
  };

  const handleToggleFavorite = async (stakeholder) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE_URL}/stakeholders/${stakeholder.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          is_favorite: !stakeholder.is_favorite
        })
      });

      if (response.ok) {
        fetchStakeholders();
        fetchStats();
      }
    } catch (error) {
      console.error('Error updating favorite:', error);
    }
  };

  const getTypeInfo = (type) => {
    return stakeholderTypes.find(t => t.id === type) || stakeholderTypes[0];
  };

  const getUpcomingFollowups = () => {
    const today = new Date();
    return stakeholders.filter(s => {
      if (!s.next_followup_date) return false;
      const followupDate = new Date(s.next_followup_date);
      return followupDate >= today && followupDate <= new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-6">
        <div className="mb-8">
          <div className="flex items-center justify-end mb-4">
            <button
              onClick={() => {
                setEditingStakeholder(null);
                setShowForm(true);
              }}
              className="flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-xl hover:bg-gray-800 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl"
            >
              <Plus className="w-5 h-5" />
              Add Stakeholder
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-2">
                <div className="p-3 bg-gray-100 rounded-xl">
                  <Users className="w-6 h-6 text-gray-700" />
                </div>
                <Activity className="w-5 h-5 text-gray-400" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">{stats.total}</div>
              <div className="text-sm text-gray-600">Total Stakeholders</div>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-2">
                <div className="p-3 bg-gray-100 rounded-xl">
                  <Star className="w-6 h-6 text-gray-700" />
                </div>
                <Activity className="w-5 h-5 text-gray-400" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">{stats.favorites}</div>
              <div className="text-sm text-gray-600">Favorites</div>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-2">
                <div className="p-3 bg-gray-100 rounded-xl">
                  <Calendar className="w-6 h-6 text-gray-700" />
                </div>
                <Activity className="w-5 h-5 text-gray-400" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">{stats.upcomingFollowups}</div>
              <div className="text-sm text-gray-600">Upcoming Follow-ups</div>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-2">
                <div className="p-3 bg-gray-100 rounded-xl">
                  <BarChart3 className="w-6 h-6 text-gray-700" />
                </div>
                <Activity className="w-5 h-5 text-gray-400" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">
                {Object.keys(stats.byType || {}).length}
              </div>
              <div className="text-sm text-gray-600">Active Types</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm mb-6">
          <div className="flex flex-col md:flex-row gap-4 items-stretch">
            <div className="flex-1 relative min-w-0">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none z-10" />
              <input
                type="text"
                placeholder="Search by name, company, email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-gray-900 transition-all bg-gray-50 hover:bg-white"
              />
            </div>
            <div className="flex gap-3 flex-shrink-0">
              <div className="relative">
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="appearance-none px-4 py-3 pr-10 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-gray-900 transition-all bg-gray-50 hover:bg-white text-gray-700 font-medium cursor-pointer min-w-[140px]"
                >
                  <option value="">All Types</option>
                  {stakeholderTypes.map(type => (
                    <option key={type.id} value={type.id}>{type.label}</option>
                  ))}
                </select>
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
              <button
                onClick={() => setFilterFavorite(!filterFavorite)}
                className={`px-5 py-3 rounded-xl border-2 transition-all flex items-center gap-2 font-medium whitespace-nowrap ${
                  filterFavorite
                    ? 'bg-gray-900 text-white border-gray-900 shadow-md'
                    : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-gray-300'
                }`}
              >
                <Star className={`w-5 h-5 ${filterFavorite ? 'fill-white text-white' : 'text-gray-500'}`} />
                <span className="hidden sm:inline">Favorites</span>
              </button>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`px-4 py-3 rounded-xl border-2 transition-all flex items-center justify-center ${
                  showFilters
                    ? 'bg-gray-900 text-white border-gray-900'
                    : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50 hover:border-gray-300'
                }`}
                title="More filters"
              >
                <Filter className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading stakeholders...</p>
          </div>
        ) : stakeholders.length === 0 ? (
          <div className="bg-white rounded-2xl p-16 border border-gray-200 text-center">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Users className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-2">No stakeholders yet</h3>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Start building your network by adding advisors, investors, mentors, and other key stakeholders
            </p>
            <button
              onClick={() => {
                setEditingStakeholder(null);
                setShowForm(true);
              }}
              className="px-8 py-4 bg-gray-900 text-white rounded-xl hover:bg-gray-800 transition-all font-semibold shadow-lg hover:shadow-xl flex items-center gap-2 mx-auto"
            >
              <Plus className="w-5 h-5" />
              Add Your First Stakeholder
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className={selectedStakeholder ? 'lg:col-span-2' : 'lg:col-span-3'}>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {stakeholders.map((stakeholder) => {
                  const typeInfo = getTypeInfo(stakeholder.type);
                  const TypeIcon = typeInfo.icon;
                  const isUpcoming = stakeholder.next_followup_date && 
                    new Date(stakeholder.next_followup_date) <= new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
                  
                  return (
                    <div
                      key={stakeholder.id}
                      className={`bg-white rounded-2xl border-2 transition-all duration-200 cursor-pointer hover:shadow-xl ${
                        selectedStakeholder?.id === stakeholder.id
                          ? 'border-gray-900 shadow-lg'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      onClick={() => setSelectedStakeholder(stakeholder)}
                    >
                      <div className="p-6 min-h-[280px] flex flex-col">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center gap-3 flex-1 min-w-0">
                            <div className={`w-14 h-14 rounded-xl ${typeInfo.color} flex items-center justify-center flex-shrink-0`}>
                              <TypeIcon className="w-7 h-7" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h3 className="font-bold text-gray-900 text-lg break-words">{stakeholder.name}</h3>
                              <p className="text-sm text-gray-500">{typeInfo.label}</p>
                            </div>
                          </div>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleToggleFavorite(stakeholder);
                            }}
                            className="p-2 hover:bg-gray-100 rounded-lg transition-colors flex-shrink-0 ml-2"
                          >
                            <Star
                              className={`w-5 h-5 transition-all ${
                                stakeholder.is_favorite ? 'fill-gray-900 text-gray-900' : 'text-gray-300'
                              }`}
                            />
                          </button>
                        </div>

                        <div className="space-y-2 mb-4">
                          {stakeholder.company && (
                            <div className="flex items-start gap-2 text-sm text-gray-600">
                              <Building className="w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5" />
                              <span className="break-words">{stakeholder.company}</span>
                            </div>
                          )}
                          {stakeholder.title && (
                            <div className="flex items-start gap-2 text-sm text-gray-600">
                              <Briefcase className="w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5" />
                              <span className="break-words">{stakeholder.title}</span>
                            </div>
                          )}
                          {stakeholder.email && (
                            <div className="flex items-start gap-2 text-sm text-gray-600">
                              <Mail className="w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5" />
                              <span className="break-all">{stakeholder.email}</span>
                            </div>
                          )}
                          {stakeholder.phone && (
                            <div className="flex items-start gap-2 text-sm text-gray-600">
                              <Phone className="w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5" />
                              <span className="break-words">{stakeholder.phone}</span>
                            </div>
                          )}
                          {stakeholder.next_followup_date && (
                            <div className={`flex items-center gap-2 text-sm ${
                              isUpcoming ? 'text-gray-900 font-semibold' : 'text-gray-600'
                            }`}>
                              <Calendar className={`w-4 h-4 flex-shrink-0 ${isUpcoming ? 'text-gray-900' : 'text-gray-400'}`} />
                              <span>Follow-up: {new Date(stakeholder.next_followup_date).toLocaleDateString()}</span>
                            </div>
                          )}
                        </div>

                        {stakeholder.notes && (
                          <p className="text-sm text-gray-600 mb-4 line-clamp-3 break-words flex-1">{stakeholder.notes}</p>
                        )}

                        <div className="flex items-center gap-2 pt-4 border-t border-gray-100 mt-auto">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setEditingStakeholder(stakeholder);
                              setShowForm(true);
                            }}
                            className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium flex items-center justify-center gap-2"
                          >
                            <Edit className="w-4 h-4" />
                            Edit
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDelete(stakeholder.id);
                            }}
                            className="px-4 py-2 bg-red-50 text-red-700 rounded-lg hover:bg-red-100 transition-colors text-sm font-medium"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {selectedStakeholder && (
              <div className="lg:col-span-1">
                <StakeholderDetail
                  stakeholder={selectedStakeholder}
                  onClose={() => setSelectedStakeholder(null)}
                  onEdit={() => {
                    setEditingStakeholder(selectedStakeholder);
                    setShowForm(true);
                  }}
                  onDelete={() => handleDelete(selectedStakeholder.id)}
                  onToggleFavorite={() => handleToggleFavorite(selectedStakeholder)}
                />
              </div>
            )}
          </div>
        )}

        {showForm && (
          <StakeholderForm
            stakeholder={editingStakeholder}
            onClose={() => {
              setShowForm(false);
              setEditingStakeholder(null);
            }}
            onSave={() => {
              setShowForm(false);
              setEditingStakeholder(null);
              fetchStakeholders();
              fetchStats();
            }}
          />
        )}
      </div>
    </div>
  );
};

const StakeholderDetail = ({ stakeholder, onClose, onEdit, onDelete, onToggleFavorite }) => {
  const typeInfo = stakeholderTypes.find(t => t.id === stakeholder.type) || stakeholderTypes[0];
  const TypeIcon = typeInfo.icon;

  return (
    <div className="bg-white rounded-2xl border-2 border-gray-200 shadow-xl sticky top-6">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className={`w-12 h-12 rounded-xl ${typeInfo.color} flex items-center justify-center`}>
              <TypeIcon className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900 text-lg">{stakeholder.name}</h3>
              <p className="text-sm text-gray-500">{typeInfo.label}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onToggleFavorite}
            className={`px-4 py-2 rounded-lg transition-colors text-sm font-medium flex items-center gap-2 ${
              stakeholder.is_favorite
                ? 'bg-gray-900 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <Star className={`w-4 h-4 ${stakeholder.is_favorite ? 'fill-white' : ''}`} />
            {stakeholder.is_favorite ? 'Favorited' : 'Favorite'}
          </button>
          <button
            onClick={onEdit}
            className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium"
          >
            Edit
          </button>
          <button
            onClick={onDelete}
            className="px-4 py-2 bg-red-50 text-red-700 rounded-lg hover:bg-red-100 transition-colors text-sm font-medium"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {stakeholder.company && (
          <div>
            <div className="text-xs font-semibold text-gray-500 uppercase mb-1">Company</div>
            <div className="flex items-center gap-2 text-gray-900">
              <Building className="w-4 h-4 text-gray-400" />
              {stakeholder.company}
            </div>
          </div>
        )}

        {stakeholder.title && (
          <div>
            <div className="text-xs font-semibold text-gray-500 uppercase mb-1">Title</div>
            <div className="flex items-center gap-2 text-gray-900">
              <Briefcase className="w-4 h-4 text-gray-400" />
              {stakeholder.title}
            </div>
          </div>
        )}

        {stakeholder.email && (
          <div>
            <div className="text-xs font-semibold text-gray-500 uppercase mb-1">Email</div>
            <a
              href={`mailto:${stakeholder.email}`}
              className="flex items-center gap-2 text-gray-900 hover:text-gray-700 transition-colors"
            >
              <Mail className="w-4 h-4 text-gray-400" />
              {stakeholder.email}
            </a>
          </div>
        )}

        {stakeholder.phone && (
          <div>
            <div className="text-xs font-semibold text-gray-500 uppercase mb-1">Phone</div>
            <a
              href={`tel:${stakeholder.phone}`}
              className="flex items-center gap-2 text-gray-900 hover:text-gray-700 transition-colors"
            >
              <Phone className="w-4 h-4 text-gray-400" />
              {stakeholder.phone}
            </a>
          </div>
        )}

        {(stakeholder.linkedin_url || stakeholder.twitter_handle) && (
          <div>
            <div className="text-xs font-semibold text-gray-500 uppercase mb-2">Social</div>
            <div className="flex gap-2">
              {stakeholder.linkedin_url && (
                <a
                  href={stakeholder.linkedin_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-3 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors text-sm"
                >
                  <Linkedin className="w-4 h-4 text-gray-700" />
                  LinkedIn
                </a>
              )}
              {stakeholder.twitter_handle && (
                <a
                  href={`https://twitter.com/${stakeholder.twitter_handle.replace('@', '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-3 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors text-sm"
                >
                  <Twitter className="w-4 h-4 text-gray-700" />
                  Twitter
                </a>
              )}
            </div>
          </div>
        )}

        {stakeholder.last_contact_date && (
          <div>
            <div className="text-xs font-semibold text-gray-500 uppercase mb-1">Last Contact</div>
            <div className="flex items-center gap-2 text-gray-900">
              <Clock className="w-4 h-4 text-gray-400" />
              {new Date(stakeholder.last_contact_date).toLocaleDateString()}
            </div>
          </div>
        )}

        {stakeholder.next_followup_date && (
          <div>
            <div className="text-xs font-semibold text-gray-500 uppercase mb-1">Next Follow-up</div>
            <div className="flex items-center gap-2 text-gray-900 font-semibold">
              <Calendar className="w-4 h-4 text-gray-400" />
              {new Date(stakeholder.next_followup_date).toLocaleDateString()}
            </div>
          </div>
        )}

        {stakeholder.relationship_strength && (
          <div>
            <div className="text-xs font-semibold text-gray-500 uppercase mb-2">Relationship Strength</div>
            <div className="flex items-center gap-2">
              <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gray-900 rounded-full transition-all"
                  style={{ width: `${(stakeholder.relationship_strength / 10) * 100}%` }}
                />
              </div>
              <span className="text-sm font-semibold text-gray-900">{stakeholder.relationship_strength}/10</span>
            </div>
          </div>
        )}

        {stakeholder.notes && (
          <div>
            <div className="text-xs font-semibold text-gray-500 uppercase mb-2">Notes</div>
            <p className="text-sm text-gray-700 leading-relaxed">{stakeholder.notes}</p>
          </div>
        )}

        {stakeholder.tags && stakeholder.tags.length > 0 && (
          <div>
            <div className="text-xs font-semibold text-gray-500 uppercase mb-2">Tags</div>
            <div className="flex flex-wrap gap-2">
              {stakeholder.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const StakeholderForm = ({ stakeholder, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    title: '',
    linkedin_url: '',
    twitter_handle: '',
    type: 'advisor',
    notes: '',
    tags: [],
    last_contact_date: '',
    next_followup_date: '',
    relationship_strength: 5,
    is_favorite: false
  });

  const [tagInput, setTagInput] = useState('');

  useEffect(() => {
    if (stakeholder) {
      setFormData({
        name: stakeholder.name || '',
        email: stakeholder.email || '',
        phone: stakeholder.phone || '',
        company: stakeholder.company || '',
        title: stakeholder.title || '',
        linkedin_url: stakeholder.linkedin_url || '',
        twitter_handle: stakeholder.twitter_handle || '',
        type: stakeholder.type || 'advisor',
        notes: stakeholder.notes || '',
        tags: Array.isArray(stakeholder.tags) ? stakeholder.tags : [],
        last_contact_date: stakeholder.last_contact_date || '',
        next_followup_date: stakeholder.next_followup_date || '',
        relationship_strength: stakeholder.relationship_strength || 5,
        is_favorite: stakeholder.is_favorite || false
      });
    }
  }, [stakeholder]);

  const handleAddTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData({ ...formData, tags: [...formData.tags, tagInput.trim()] });
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setFormData({ ...formData, tags: formData.tags.filter(tag => tag !== tagToRemove) });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const url = stakeholder
        ? `${API_BASE_URL}/stakeholders/${stakeholder.id}`
        : `${API_BASE_URL}/stakeholders`;
      
      const method = stakeholder ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        onSave();
      } else {
        const error = await response.json();
        alert(error.error || 'Failed to save stakeholder');
      }
    } catch (error) {
      console.error('Error saving stakeholder:', error);
      alert('Failed to save stakeholder');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between z-10">
          <h2 className="text-2xl font-bold text-gray-900">
            {stakeholder ? 'Edit Stakeholder' : 'Add New Stakeholder'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Name *
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Type *
              </label>
              <select
                required
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all bg-white"
              >
                {stakeholderTypes.map(type => (
                  <option key={type.id} value={type.id}>{type.label}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Relationship Strength: {formData.relationship_strength}/10
              </label>
              <input
                type="range"
                min="1"
                max="10"
                value={formData.relationship_strength}
                onChange={(e) => setFormData({ ...formData, relationship_strength: parseInt(e.target.value) })}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Phone
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Company
              </label>
              <input
                type="text"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Title
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                LinkedIn URL
              </label>
              <input
                type="url"
                value={formData.linkedin_url}
                onChange={(e) => setFormData({ ...formData, linkedin_url: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Twitter Handle
              </label>
              <input
                type="text"
                value={formData.twitter_handle}
                onChange={(e) => setFormData({ ...formData, twitter_handle: e.target.value })}
                placeholder="@username"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Last Contact Date
              </label>
              <input
                type="date"
                value={formData.last_contact_date}
                onChange={(e) => setFormData({ ...formData, last_contact_date: e.target.value })}
                className="w-full px-4 py-3 bg-white border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-gray-900 transition-all text-gray-900 font-semibold text-base"
                style={{ colorScheme: 'light' }}
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Next Follow-up Date
              </label>
              <input
                type="date"
                value={formData.next_followup_date}
                onChange={(e) => setFormData({ ...formData, next_followup_date: e.target.value })}
                className="w-full px-4 py-3 bg-white border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-gray-900 transition-all text-gray-900 font-semibold text-base"
                style={{ colorScheme: 'light' }}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Tags
            </label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddTag();
                  }
                }}
                placeholder="Add a tag and press Enter"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all"
              />
              <button
                type="button"
                onClick={handleAddTag}
                className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
              >
                Add
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium flex items-center gap-2"
                >
                  {tag}
                  <button
                    type="button"
                    onClick={() => handleRemoveTag(tag)}
                    className="hover:text-red-600 transition-colors"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Notes
            </label>
            <textarea
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              rows="4"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all resize-none"
            />
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="favorite"
              checked={formData.is_favorite}
              onChange={(e) => setFormData({ ...formData, is_favorite: e.target.checked })}
              className="w-5 h-5 rounded border-gray-300 text-gray-900 focus:ring-gray-900"
            />
            <label htmlFor="favorite" className="text-sm font-semibold text-gray-700">
              Mark as favorite
            </label>
          </div>

          <div className="flex items-center gap-4 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-6 py-3 bg-gray-900 text-white rounded-xl hover:bg-gray-800 transition-colors font-semibold shadow-lg hover:shadow-xl"
            >
              {stakeholder ? 'Update' : 'Create'} Stakeholder
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StakeholderCRM;
