import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Plus,
  Edit3,
  Trash2,
  Eye,
  EyeOff,
  Heart,
  Bookmark,
  MessageCircle,
  Calendar,
  Clock,
  TrendingUp,
  Target,
  DollarSign,
  Users,
  MapPin,
  Building2,
  Briefcase,
  ChevronRight,
  MoreVertical,
  Search,
  Filter,
  RefreshCw,
  Loader2,
  AlertTriangle,
  X,
  Check,
  Globe,
  Lock,
  Rocket,
  Star,
  ExternalLink,
  Copy,
  Share2,
  BarChart3,
  Sparkles
} from 'lucide-react';
import { pitchesAPI } from '../services/api';

const stageLabels = {
  idea: { label: 'Idea', color: 'bg-purple-100 text-purple-700', icon: Sparkles },
  validation: { label: 'Validation', color: 'bg-blue-100 text-blue-700', icon: Target },
  prototype: { label: 'Prototype', color: 'bg-cyan-100 text-cyan-700', icon: Building2 },
  mvp: { label: 'MVP', color: 'bg-green-100 text-green-700', icon: Rocket },
  growth: { label: 'Growth', color: 'bg-orange-100 text-orange-700', icon: TrendingUp },
  scaling: { label: 'Scaling', color: 'bg-red-100 text-red-700', icon: Star }
};

const MyCreatedPitches = () => {
  const navigate = useNavigate();
  const [pitches, setPitches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStage, setFilterStage] = useState('');
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingPitch, setEditingPitch] = useState(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);
  const [actionLoading, setActionLoading] = useState(null);
  const [saveLoading, setSaveLoading] = useState(false);

  // Fetch user's pitches
  const fetchPitches = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await pitchesAPI.getMyPitches();
      const data = response.data.results || response.data || [];
      setPitches(data);
    } catch (err) {
      console.error('Error fetching pitches:', err);
      setError('Failed to load your pitches. Please try again.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPitches();
  }, [fetchPitches]);

  // Filter pitches
  const filteredPitches = pitches.filter(pitch => {
    const matchesSearch = !searchQuery || 
      pitch.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pitch.tagline?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStage = !filterStage || pitch.stage === filterStage;
    return matchesSearch && matchesStage;
  });

  // Handle delete
  const handleDelete = async (pitchId) => {
    setActionLoading(pitchId);
    try {
      await pitchesAPI.deletePitch(pitchId);
      setPitches(pitches.filter(p => p.id !== pitchId));
      setDeleteConfirmId(null);
    } catch (err) {
      console.error('Error deleting pitch:', err);
      alert('Failed to delete pitch. Please try again.');
    } finally {
      setActionLoading(null);
    }
  };

  // Handle toggle visibility
  const handleToggleVisibility = async (pitch) => {
    setActionLoading(pitch.id);
    try {
      await pitchesAPI.updatePitch(pitch.id, { is_public: !pitch.is_public });
      setPitches(pitches.map(p => 
        p.id === pitch.id ? { ...p, is_public: !p.is_public } : p
      ));
    } catch (err) {
      console.error('Error updating visibility:', err);
      alert('Failed to update visibility. Please try again.');
    } finally {
      setActionLoading(null);
    }
  };

  // Open edit modal
  const handleEdit = (pitch) => {
    setEditingPitch({
      id: pitch.id,
      title: pitch.title || '',
      tagline: pitch.tagline || '',
      description: pitch.description || '',
      problem: pitch.problem || '',
      solution: pitch.solution || '',
      target_market: pitch.target_market || '',
      competitive_advantage: pitch.competitive_advantage || '',
      business_model: pitch.business_model || '',
      market_size: pitch.market_size || '',
      stage: pitch.stage || 'idea',
      looking_for_role: pitch.looking_for_role || '',
      skills_needed: Array.isArray(pitch.skills_needed) ? pitch.skills_needed.join(', ') : '',
      what_you_bring: pitch.what_you_bring || '',
      location: pitch.location || '',
      timeline: pitch.timeline || '',
      funding_stage: pitch.funding_stage || '',
      funding_needs: pitch.funding_needs || '',
      equity_offer: pitch.equity_offer || '',
      additional_info: pitch.additional_info || '',
      industries: Array.isArray(pitch.industries) ? pitch.industries.join(', ') : '',
      is_public: pitch.is_public !== false
    });
    setShowEditModal(true);
  };

  // Handle save edit
  const handleSaveEdit = async () => {
    if (!editingPitch) return;
    
    setSaveLoading(true);
    try {
      const updateData = {
        ...editingPitch,
        skills_needed: editingPitch.skills_needed 
          ? editingPitch.skills_needed.split(',').map(s => s.trim()).filter(Boolean) 
          : [],
        industries: editingPitch.industries 
          ? editingPitch.industries.split(',').map(s => s.trim()).filter(Boolean) 
          : [],
        funding_needs: editingPitch.funding_needs ? parseFloat(editingPitch.funding_needs) : null
      };
      delete updateData.id;
      
      await pitchesAPI.updatePitch(editingPitch.id, updateData);
      
      // Refresh the list
      await fetchPitches();
      setShowEditModal(false);
      setEditingPitch(null);
    } catch (err) {
      console.error('Error updating pitch:', err);
      const errorMessage = err.response?.data?.detail || 
                          Object.values(err.response?.data || {}).flat().join(', ') ||
                          'Failed to save changes. Please try again.';
      alert(errorMessage);
    } finally {
      setSaveLoading(false);
    }
  };

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getStageInfo = (stage) => {
    return stageLabels[stage] || stageLabels.idea;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">My Pitches</h1>
              <p className="text-gray-600 mt-1">Manage and track your startup pitches</p>
            </div>
            <button
              onClick={() => navigate('/home')}
              className="flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-xl hover:bg-gray-800 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl"
            >
              <Plus className="w-5 h-5" />
              Create New Pitch
            </button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-gray-100 rounded-xl">
                  <Rocket className="w-6 h-6 text-gray-700" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">{pitches.length}</div>
                  <div className="text-sm text-gray-600">Total Pitches</div>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-green-100 rounded-xl">
                  <Globe className="w-6 h-6 text-green-700" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">
                    {pitches.filter(p => p.is_public).length}
                  </div>
                  <div className="text-sm text-gray-600">Public</div>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-blue-100 rounded-xl">
                  <Eye className="w-6 h-6 text-blue-700" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">
                    {pitches.reduce((sum, p) => sum + (p.views_count || 0), 0)}
                  </div>
                  <div className="text-sm text-gray-600">Total Views</div>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-pink-100 rounded-xl">
                  <Heart className="w-6 h-6 text-pink-700" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">
                    {pitches.reduce((sum, p) => sum + (p.likes_count || 0), 0)}
                  </div>
                  <div className="text-sm text-gray-600">Total Likes</div>
                </div>
              </div>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="bg-white rounded-2xl p-4 border border-gray-200 shadow-sm">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search your pitches..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-gray-900 transition-all bg-gray-50 hover:bg-white"
                />
              </div>
              <div className="flex gap-3">
                <select
                  value={filterStage}
                  onChange={(e) => setFilterStage(e.target.value)}
                  className="px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-gray-900 transition-all bg-gray-50 hover:bg-white text-gray-700 font-medium min-w-[150px]"
                >
                  <option value="">All Stages</option>
                  {Object.entries(stageLabels).map(([key, { label }]) => (
                    <option key={key} value={key}>{label}</option>
                  ))}
                </select>
                <button
                  onClick={fetchPitches}
                  className="px-4 py-3 border-2 border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
                  title="Refresh"
                >
                  <RefreshCw className={`w-5 h-5 text-gray-600 ${loading ? 'animate-spin' : ''}`} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Error State */}
        {error && !loading && (
          <div className="bg-red-50 border border-red-200 rounded-2xl p-6 mb-6">
            <div className="flex items-center gap-3">
              <AlertTriangle className="w-6 h-6 text-red-500" />
              <div className="flex-1">
                <h3 className="text-red-800 font-semibold">Error Loading Pitches</h3>
                <p className="text-red-600 text-sm">{error}</p>
              </div>
              <button
                onClick={fetchPitches}
                className="px-4 py-2 bg-red-100 text-red-700 rounded-xl hover:bg-red-200 transition-colors flex items-center gap-2"
              >
                <RefreshCw className="w-4 h-4" />
                Retry
              </button>
            </div>
          </div>
        )}

        {/* Loading State */}
        {loading ? (
          <div className="text-center py-20">
            <Loader2 className="w-12 h-12 text-gray-400 animate-spin mx-auto mb-4" />
            <p className="text-gray-600">Loading your pitches...</p>
          </div>
        ) : !error && filteredPitches.length === 0 ? (
          /* Empty State */
          <div className="bg-white rounded-2xl p-16 border border-gray-200 text-center">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Rocket className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-2">
              {searchQuery || filterStage ? 'No pitches found' : 'No pitches yet'}
            </h3>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              {searchQuery || filterStage 
                ? 'Try adjusting your search or filters'
                : 'Create your first pitch and start connecting with potential co-founders'}
            </p>
            {!searchQuery && !filterStage && (
              <button
                onClick={() => navigate('/home')}
                className="px-8 py-4 bg-gray-900 text-white rounded-xl hover:bg-gray-800 transition-all font-semibold shadow-lg hover:shadow-xl flex items-center gap-2 mx-auto"
              >
                <Plus className="w-5 h-5" />
                Create Your First Pitch
              </button>
            )}
          </div>
        ) : (
          /* Pitches Grid */
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredPitches.map((pitch) => {
              const stageInfo = getStageInfo(pitch.stage);
              const StageIcon = stageInfo.icon;
              
              return (
                <div
                  key={pitch.id}
                  className="bg-white rounded-2xl border-2 border-gray-200 hover:border-gray-300 transition-all duration-200 overflow-hidden group hover:shadow-lg"
                >
                  {/* Card Header */}
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-2">
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${stageInfo.color} flex items-center gap-1`}>
                            <StageIcon className="w-3 h-3" />
                            {stageInfo.label}
                          </span>
                          {pitch.is_public ? (
                            <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700 flex items-center gap-1">
                              <Globe className="w-3 h-3" />
                              Public
                            </span>
                          ) : (
                            <span className="px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600 flex items-center gap-1">
                              <Lock className="w-3 h-3" />
                              Private
                            </span>
                          )}
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-1 truncate">{pitch.title}</h3>
                        <p className="text-gray-600 text-sm line-clamp-2">{pitch.tagline}</p>
                      </div>
                    </div>

                    {/* Stats Row */}
                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                      <div className="flex items-center gap-1">
                        <Eye className="w-4 h-4" />
                        <span>{pitch.views_count || 0}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Heart className="w-4 h-4" />
                        <span>{pitch.likes_count || 0}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Bookmark className="w-4 h-4" />
                        <span>{pitch.saves_count || 0}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MessageCircle className="w-4 h-4" />
                        <span>{pitch.comments_count || 0}</span>
                      </div>
                    </div>

                    {/* Details */}
                    <div className="space-y-2 text-sm">
                      {pitch.industries && pitch.industries.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {pitch.industries.slice(0, 3).map((industry, idx) => (
                            <span key={idx} className="px-2 py-1 bg-gray-100 text-gray-600 rounded-lg text-xs">
                              {industry}
                            </span>
                          ))}
                          {pitch.industries.length > 3 && (
                            <span className="text-gray-400 text-xs">+{pitch.industries.length - 3} more</span>
                          )}
                        </div>
                      )}
                      {pitch.looking_for_role && (
                        <div className="flex items-center gap-2 text-gray-600">
                          <Users className="w-4 h-4 text-gray-400" />
                          <span>Looking for: {pitch.looking_for_role}</span>
                        </div>
                      )}
                      {pitch.location && (
                        <div className="flex items-center gap-2 text-gray-600">
                          <MapPin className="w-4 h-4 text-gray-400" />
                          <span>{pitch.location}</span>
                        </div>
                      )}
                    </div>

                    {/* Date */}
                    <div className="flex items-center gap-2 text-xs text-gray-400 mt-4 pt-4 border-t border-gray-100">
                      <Calendar className="w-4 h-4" />
                      <span>Created {formatDate(pitch.created_at)}</span>
                      {pitch.updated_at && pitch.updated_at !== pitch.created_at && (
                        <>
                          <span>•</span>
                          <span>Updated {formatDate(pitch.updated_at)}</span>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Card Actions */}
                  <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleEdit(pitch)}
                        className="px-4 py-2 text-gray-700 hover:bg-gray-200 rounded-xl transition-colors flex items-center gap-2 font-medium"
                      >
                        <Edit3 className="w-4 h-4" />
                        Edit
                      </button>
                      <button
                        onClick={() => handleToggleVisibility(pitch)}
                        disabled={actionLoading === pitch.id}
                        className="px-4 py-2 text-gray-700 hover:bg-gray-200 rounded-xl transition-colors flex items-center gap-2 font-medium disabled:opacity-50"
                      >
                        {actionLoading === pitch.id ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : pitch.is_public ? (
                          <>
                            <EyeOff className="w-4 h-4" />
                            Hide
                          </>
                        ) : (
                          <>
                            <Eye className="w-4 h-4" />
                            Publish
                          </>
                        )}
                      </button>
                    </div>
                    <div className="flex items-center gap-2">
                      {deleteConfirmId === pitch.id ? (
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-gray-600">Delete?</span>
                          <button
                            onClick={() => handleDelete(pitch.id)}
                            disabled={actionLoading === pitch.id}
                            className="p-2 bg-red-100 text-red-600 hover:bg-red-200 rounded-lg transition-colors"
                          >
                            {actionLoading === pitch.id ? (
                              <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                              <Check className="w-4 h-4" />
                            )}
                          </button>
                          <button
                            onClick={() => setDeleteConfirmId(null)}
                            className="p-2 bg-gray-100 text-gray-600 hover:bg-gray-200 rounded-lg transition-colors"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => setDeleteConfirmId(pitch.id)}
                          className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Edit Modal */}
        {showEditModal && editingPitch && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
              {/* Modal Header */}
              <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between z-10">
                <h2 className="text-2xl font-bold text-gray-900">Edit Pitch</h2>
                <button
                  onClick={() => {
                    setShowEditModal(false);
                    setEditingPitch(null);
                  }}
                  disabled={saveLoading}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50"
                >
                  <X className="w-5 h-5 text-gray-600" />
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-6 space-y-6">
                {/* Basic Info */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                    <Rocket className="w-5 h-5" />
                    Basic Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Startup Name *
                      </label>
                      <input
                        type="text"
                        value={editingPitch.title}
                        onChange={(e) => setEditingPitch({ ...editingPitch, title: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                        placeholder="Your startup name"
                      />
                    </div>
                    <div className="col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Tagline *
                      </label>
                      <input
                        type="text"
                        value={editingPitch.tagline}
                        onChange={(e) => setEditingPitch({ ...editingPitch, tagline: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                        placeholder="One-line description"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Stage
                      </label>
                      <select
                        value={editingPitch.stage}
                        onChange={(e) => setEditingPitch({ ...editingPitch, stage: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent bg-white"
                      >
                        {Object.entries(stageLabels).map(([key, { label }]) => (
                          <option key={key} value={key}>{label}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Industries (comma separated)
                      </label>
                      <input
                        type="text"
                        value={editingPitch.industries}
                        onChange={(e) => setEditingPitch({ ...editingPitch, industries: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                        placeholder="e.g. FinTech, AI, SaaS"
                      />
                    </div>
                  </div>
                </div>

                {/* Problem & Solution */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                    <Target className="w-5 h-5" />
                    Problem & Solution
                  </h3>
                  <div className="grid grid-cols-1 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Problem *
                      </label>
                      <textarea
                        value={editingPitch.problem}
                        onChange={(e) => setEditingPitch({ ...editingPitch, problem: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent resize-none"
                        rows={3}
                        placeholder="What problem are you solving?"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Solution *
                      </label>
                      <textarea
                        value={editingPitch.solution}
                        onChange={(e) => setEditingPitch({ ...editingPitch, solution: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent resize-none"
                        rows={3}
                        placeholder="How does your solution address the problem?"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Full Description
                      </label>
                      <textarea
                        value={editingPitch.description}
                        onChange={(e) => setEditingPitch({ ...editingPitch, description: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent resize-none"
                        rows={4}
                        placeholder="Detailed description of your startup"
                      />
                    </div>
                  </div>
                </div>

                {/* Market Info */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                    <BarChart3 className="w-5 h-5" />
                    Market & Business
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Target Market
                      </label>
                      <textarea
                        value={editingPitch.target_market}
                        onChange={(e) => setEditingPitch({ ...editingPitch, target_market: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent resize-none"
                        rows={2}
                        placeholder="Who is your target audience?"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Competitive Advantage
                      </label>
                      <textarea
                        value={editingPitch.competitive_advantage}
                        onChange={(e) => setEditingPitch({ ...editingPitch, competitive_advantage: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent resize-none"
                        rows={2}
                        placeholder="What makes you different?"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Business Model
                      </label>
                      <textarea
                        value={editingPitch.business_model}
                        onChange={(e) => setEditingPitch({ ...editingPitch, business_model: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent resize-none"
                        rows={2}
                        placeholder="How will you make money?"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Market Size
                      </label>
                      <input
                        type="text"
                        value={editingPitch.market_size}
                        onChange={(e) => setEditingPitch({ ...editingPitch, market_size: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                        placeholder="e.g. $50B TAM"
                      />
                    </div>
                  </div>
                </div>

                {/* Co-founder Requirements */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                    <Users className="w-5 h-5" />
                    Co-founder Requirements
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Looking For Role
                      </label>
                      <input
                        type="text"
                        value={editingPitch.looking_for_role}
                        onChange={(e) => setEditingPitch({ ...editingPitch, looking_for_role: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                        placeholder="e.g. Technical Co-founder, CTO"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Required Skills (comma separated)
                      </label>
                      <input
                        type="text"
                        value={editingPitch.skills_needed}
                        onChange={(e) => setEditingPitch({ ...editingPitch, skills_needed: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                        placeholder="e.g. React, Node.js, Python"
                      />
                    </div>
                    <div className="col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        What You Bring
                      </label>
                      <textarea
                        value={editingPitch.what_you_bring}
                        onChange={(e) => setEditingPitch({ ...editingPitch, what_you_bring: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent resize-none"
                        rows={2}
                        placeholder="What do you bring to the table?"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Equity Offer
                      </label>
                      <input
                        type="text"
                        value={editingPitch.equity_offer}
                        onChange={(e) => setEditingPitch({ ...editingPitch, equity_offer: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                        placeholder="e.g. 10-20% equity"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Location
                      </label>
                      <input
                        type="text"
                        value={editingPitch.location}
                        onChange={(e) => setEditingPitch({ ...editingPitch, location: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                        placeholder="e.g. San Francisco, Remote"
                      />
                    </div>
                  </div>
                </div>

                {/* Funding & Timeline */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                    <DollarSign className="w-5 h-5" />
                    Funding & Timeline
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Funding Stage
                      </label>
                      <input
                        type="text"
                        value={editingPitch.funding_stage}
                        onChange={(e) => setEditingPitch({ ...editingPitch, funding_stage: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                        placeholder="e.g. Pre-seed, Seed"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Funding Needs ($)
                      </label>
                      <input
                        type="number"
                        value={editingPitch.funding_needs}
                        onChange={(e) => setEditingPitch({ ...editingPitch, funding_needs: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                        placeholder="e.g. 500000"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Timeline
                      </label>
                      <input
                        type="text"
                        value={editingPitch.timeline}
                        onChange={(e) => setEditingPitch({ ...editingPitch, timeline: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                        placeholder="e.g. Launch in 3 months"
                      />
                    </div>
                  </div>
                </div>

                {/* Additional Info */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900">Additional Information</h3>
                  <textarea
                    value={editingPitch.additional_info}
                    onChange={(e) => setEditingPitch({ ...editingPitch, additional_info: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent resize-none"
                    rows={3}
                    placeholder="Any other details you'd like to share..."
                  />
                </div>

                {/* Visibility Toggle */}
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <div className="flex items-center gap-3">
                    {editingPitch.is_public ? (
                      <Globe className="w-5 h-5 text-green-600" />
                    ) : (
                      <Lock className="w-5 h-5 text-gray-500" />
                    )}
                    <div>
                      <div className="font-medium text-gray-900">
                        {editingPitch.is_public ? 'Public Pitch' : 'Private Pitch'}
                      </div>
                      <div className="text-sm text-gray-500">
                        {editingPitch.is_public 
                          ? 'Visible to all users on the platform' 
                          : 'Only visible to you'}
                      </div>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setEditingPitch({ ...editingPitch, is_public: !editingPitch.is_public })}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      editingPitch.is_public ? 'bg-green-500' : 'bg-gray-300'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        editingPitch.is_public ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="sticky bottom-0 bg-white border-t border-gray-200 p-6 flex items-center justify-end gap-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowEditModal(false);
                    setEditingPitch(null);
                  }}
                  disabled={saveLoading}
                  className="px-6 py-3 text-gray-700 hover:bg-gray-100 rounded-xl transition-colors font-medium disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveEdit}
                  disabled={saveLoading || !editingPitch.title || !editingPitch.tagline || !editingPitch.problem || !editingPitch.solution}
                  className="px-6 py-3 bg-gray-900 text-white rounded-xl hover:bg-gray-800 transition-colors font-medium flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {saveLoading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Check className="w-5 h-5" />
                      Save Changes
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyCreatedPitches;
