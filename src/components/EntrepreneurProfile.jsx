import React, { useState, useEffect } from 'react';
import { 
  User, Camera, Edit3, Briefcase, MapPin, Phone, Mail, Linkedin, 
  Globe, Twitter, Instagram, Plus, X, Save, GraduationCap, Rocket, 
  Target, Heart, DollarSign, CheckCircle, Calendar, Trash2,
  Pencil, Building2, Award, Star, ChevronRight, Sparkles, Zap,
  TrendingUp, Users, Eye, MessageSquare, ExternalLink, ArrowUp, ArrowDown,
  GripVertical
} from 'lucide-react';

const EntrepreneurProfile = () => {
  const [editingSection, setEditingSection] = useState(null);
  const [showSectionModal, setShowSectionModal] = useState(null);
  const [tempEditData, setTempEditData] = useState(null);
  const [profile, setProfile] = useState({
    basic: {
      profilePicture: '',
      coverPicture: '',
      tagline: '',
      firstName: '',
      lastName: '',
      phone: '',
      email: '',
      linkedin: '',
      website: '',
      twitter: '',
      instagram: '',
      location: ''
    },
    professional: {
      myself: '',
      skills: [],
      experienceLevel: '',
      industry: ''
    },
    experience: [],
    education: [],
    founderJourney: {
      vision: '',
      experienceLevel: '',
      drives: []
    },
    marketplace: {
      workAreas: [],
      services: [],
      rate: '',
      availability: '',
      location: '',
      portfolio: [],
      packages: []
    },
    reputation: {
      rating: 0,
      reviews: [],
      followers: 0
    }
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadProfileData();
  }, []);

  const loadProfileData = async () => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const onboardingData = {
        yourSkills: JSON.parse(localStorage.getItem('yourSkills') || '[]'),
        yourIndustries: JSON.parse(localStorage.getItem('yourIndustries') || '[]'),
        yourExperience: localStorage.getItem('yourExperience') || '',
        yourSelf: localStorage.getItem('yourSelf') || '',
        whyHere: localStorage.getItem('whyHere') || '',
        selectedValues: JSON.parse(localStorage.getItem('selectedValues') || '[]'),
        selectedIntent: localStorage.getItem('selectedIntent') || 'find-cofounder',
        offerSkillsPreferences: JSON.parse(localStorage.getItem('offerSkillsPreferences') || '{}'),
        founderRole: localStorage.getItem('founderRole') || '',
        location: localStorage.getItem('location') || ''
      };

      const valueGroups = {
        'innovation': 'Vision & Creation',
        'creativity': 'Vision & Creation',
        'impact': 'Vision & Creation',
        'legacy': 'Vision & Creation',
        'leadership': 'Vision & Creation',
        'curiosity': 'Vision & Creation',
        'freedom': 'Vision & Creation',
        'growth': 'Grit & Growth',
        'resilience': 'Grit & Growth',
        'discipline': 'Grit & Growth',
        'courage': 'Grit & Growth',
        'excellence': 'Grit & Growth',
        'ambition': 'Grit & Growth',
        'wisdom': 'Grit & Growth',
        'optimism': 'Grit & Growth',
        'connection': 'Heart & Connections',
        'empathy': 'Heart & Connections',
        'compassion': 'Heart & Connections',
        'authenticity': 'Heart & Connections',
        'passion': 'Heart & Connections',
        'gratitude': 'Heart & Connections',
        'humility': 'Heart & Connections',
        'integrity': 'Heart & Connections',
        'balance': 'Heart & Connections',
        'adventure': 'Heart & Connections'
      };

      const mappedValues = onboardingData.selectedValues.map(val => valueGroups[val] || val);
      const uniqueValues = [...new Set(mappedValues)];
      
      const profileData = {
        basic: {
          profilePicture: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
          coverPicture: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=1200&h=400&fit=crop',
          tagline: onboardingData.whyHere || 'Building the future of AI-powered startups',
          firstName: 'Alex',
          lastName: 'Chen',
          phone: '+1 (555) 123-4567',
          email: 'alex.chen@example.com',
          linkedin: 'linkedin.com/in/alexchen',
          website: 'alexchen.dev',
          twitter: '@alexchen',
          instagram: '@alexchen',
          location: onboardingData.location || 'San Francisco, CA',
          founderRole: onboardingData.founderRole || 'Technical Founder'
        },
        professional: {
          myself: onboardingData.yourSelf || 'Full-stack developer with 8 years experience building scalable web applications. Passionate about AI and fintech.',
          skills: onboardingData.yourSkills.length > 0 ? onboardingData.yourSkills : ['React', 'Node.js', 'Python', 'AWS', 'Machine Learning', 'Docker'],
          experienceLevel: onboardingData.yourExperience || 'Senior',
          industry: onboardingData.yourIndustries.length > 0 ? onboardingData.yourIndustries[0] : 'Fintech'
        },
        experience: [
          {
            id: 1,
            companyName: 'TechFlow Solutions',
            jobTitle: 'Founder & CTO',
            employmentType: 'Full-time',
            startDate: '2022-01',
            endDate: 'Present',
            location: 'San Francisco, CA',
            description: 'Leading technical development of AI-powered business solutions. Raised $2.5M Series A.'
          },
          {
            id: 2,
            companyName: 'Google',
            jobTitle: 'Senior Software Engineer',
            employmentType: 'Full-time',
            startDate: '2019-06',
            endDate: '2022-01',
            location: 'Mountain View, CA',
            description: 'Developed scalable backend systems for Google Cloud Platform.'
          }
        ],
        education: [
          {
            id: 1,
            schoolName: 'Stanford University',
            degree: 'Master of Science',
            fieldOfStudy: 'Computer Science',
            startDate: '2015-09',
            endDate: '2017-06',
            grade: '3.9/4.0',
            activities: 'Graduate Research Assistant, ACM Member'
          },
          {
            id: 2,
            schoolName: 'UC Berkeley',
            degree: 'Bachelor of Science',
            fieldOfStudy: 'Computer Science',
            startDate: '2011-09',
            endDate: '2015-06',
            grade: '3.8/4.0',
            activities: 'Dean\'s List, Hackathon Winner'
          }
        ],
        founderJourney: {
          vision: onboardingData.whyHere || 'To democratize access to AI technology and empower entrepreneurs to build world-changing startups.',
          experienceLevel: onboardingData.yourExperience || 'Senior',
          drives: onboardingData.selectedValues.length > 0 ? onboardingData.selectedValues : []
        },
        marketplace: {
          workAreas: onboardingData.offerSkillsPreferences?.workType || [],
          services: onboardingData.offerSkillsPreferences?.workType || [],
          rate: onboardingData.offerSkillsPreferences?.hourlyRate || '',
          availability: onboardingData.offerSkillsPreferences?.availability || '',
          location: onboardingData.offerSkillsPreferences?.location || '',
          portfolio: [],
          packages: []
        },
        reputation: {
          rating: 4.8,
          reviews: [],
          followers: 1250
        }
      };
      
      setProfile(profileData);
    } catch (error) {
      console.error('Error loading profile data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = () => {
    setEditingSection(null);
  };

  const openSectionModal = (section) => {
    setTempEditData(JSON.parse(JSON.stringify(profile[section])));
    setShowSectionModal(section);
  };

  const closeSectionModal = () => {
    setShowSectionModal(null);
    setTempEditData(null);
  };

  const saveSectionChanges = () => {
    setProfile(prev => ({
      ...prev,
      [showSectionModal]: tempEditData
    }));
    
    // Update localStorage
    if (showSectionModal === 'founderJourney') {
      localStorage.setItem('whyHere', tempEditData.vision || '');
      localStorage.setItem('yourExperience', tempEditData.experienceLevel || '');
      localStorage.setItem('selectedValues', JSON.stringify(tempEditData.drives || []));
    } else if (showSectionModal === 'professional') {
      localStorage.setItem('yourSelf', tempEditData.myself || '');
      localStorage.setItem('yourSkills', JSON.stringify(tempEditData.skills || []));
      localStorage.setItem('yourExperience', tempEditData.experienceLevel || '');
      localStorage.setItem('yourIndustries', JSON.stringify([tempEditData.industry] || []));
    } else if (showSectionModal === 'basic') {
      localStorage.setItem('location', tempEditData.location || '');
      localStorage.setItem('founderRole', tempEditData.founderRole || '');
    }
    
    closeSectionModal();
  };

  const moveExperience = (index, direction) => {
    const newExp = [...profile.experience];
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    if (newIndex >= 0 && newIndex < newExp.length) {
      [newExp[index], newExp[newIndex]] = [newExp[newIndex], newExp[index]];
      setProfile(prev => ({ ...prev, experience: newExp }));
    }
  };

  const moveEducation = (index, direction) => {
    const newEdu = [...profile.education];
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    if (newIndex >= 0 && newIndex < newEdu.length) {
      [newEdu[index], newEdu[newIndex]] = [newEdu[newIndex], newEdu[index]];
      setProfile(prev => ({ ...prev, education: newEdu }));
    }
  };

  const deleteExperience = (id) => {
    setProfile(prev => ({
      ...prev,
      experience: prev.experience.filter(exp => exp.id !== id)
    }));
  };

  const deleteEducation = (id) => {
    setProfile(prev => ({
      ...prev,
      education: prev.education.filter(edu => edu.id !== id)
    }));
  };

  const handleAddExperience = () => {
    const newExp = {
      id: Date.now(),
      companyName: '',
      jobTitle: '',
      employmentType: 'Full-time',
      startDate: '',
      endDate: '',
      location: '',
      description: ''
    };
    setProfile(prev => ({
      ...prev,
      experience: [...prev.experience, newExp]
    }));
  };

  const handleRemoveExperience = (id) => {
    setProfile(prev => ({
      ...prev,
      experience: prev.experience.filter(exp => exp.id !== id)
    }));
  };

  const handleAddEducation = () => {
    const newEdu = {
      id: Date.now(),
      schoolName: '',
      degree: '',
      fieldOfStudy: '',
      startDate: '',
      endDate: '',
      grade: '',
      activities: ''
    };
    setProfile(prev => ({
      ...prev,
      education: [...prev.education, newEdu]
    }));
  };

  const handleRemoveEducation = (id) => {
    setProfile(prev => ({
      ...prev,
      education: prev.education.filter(edu => edu.id !== id)
    }));
  };

  const formatDate = (dateStr) => {
    if (!dateStr || dateStr === 'Present') return 'Present';
    const [year, month] = dateStr.split('-');
    const date = new Date(year, month - 1);
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };

  const formatDateRange = (start, end) => {
    const startFormatted = formatDate(start);
    const endFormatted = formatDate(end);
    return `${startFormatted} - ${endFormatted}`;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-gray-200 border-t-gray-900 mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Loading your profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      
      {/* Founder Journey Modal */}
      {showSectionModal === 'founderJourney' && tempEditData && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[85vh] overflow-y-auto animate-in slide-in-from-bottom-4 duration-300">
            <div className="sticky top-0 bg-gradient-to-r from-gray-900 to-gray-800 px-6 py-4 flex items-center justify-between z-10 rounded-t-2xl">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center">
                  <Rocket className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-xl font-bold text-white">Edit Founder Journey</h2>
              </div>
              <button onClick={closeSectionModal} className="p-2 hover:bg-white/10 rounded-xl transition-colors">
                <X className="w-5 h-5 text-white" />
              </button>
            </div>
            
            <div className="p-6 space-y-6">
              <div>
                <label className="block text-sm font-bold text-gray-900 mb-2 flex items-center gap-2">
                  <Target className="w-4 h-4" />
                  My Vision
                </label>
                <textarea
                  value={tempEditData.vision}
                  onChange={(e) => setTempEditData(prev => ({ ...prev, vision: e.target.value }))}
                  rows={4}
                  placeholder="What's driving you? What impact do you want to create?"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-gray-900 focus:border-gray-900 resize-none text-gray-900"
                />
              </div>
              
              <div>
                <label className="block text-sm font-bold text-gray-900 mb-2 flex items-center gap-2">
                  <Award className="w-4 h-4" />
                  Experience Level
                </label>
                <select
                  value={tempEditData.experienceLevel}
                  onChange={(e) => setTempEditData(prev => ({ ...prev, experienceLevel: e.target.value }))}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-gray-900 focus:border-gray-900 text-gray-900"
                >
                  <option value="">Select experience level</option>
                  <option value="Entry Level (0-2 years)">Entry Level (0-2 years)</option>
                  <option value="Mid Level (2-5 years)">Mid Level (2-5 years)</option>
                  <option value="Senior Level (5-10 years)">Senior Level (5-10 years)</option>
                  <option value="Expert Level (10+ years)">Expert Level (10+ years)</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-bold text-gray-900 mb-2 flex items-center gap-2">
                  <Zap className="w-4 h-4" />
                  My Drives
                </label>
                <p className="text-xs text-gray-500 mb-3">Add the values and drives that fuel your journey</p>
                <div className="flex flex-wrap gap-2 mb-3">
                  {tempEditData.drives && tempEditData.drives.map((drive, idx) => (
                    <span key={idx} className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-full text-sm font-semibold shadow-md hover:shadow-lg transition-all">
                      {drive}
                      <button 
                        onClick={() => setTempEditData(prev => ({ ...prev, drives: prev.drives.filter((_, i) => i !== idx) }))}
                        className="hover:bg-white/20 rounded-full p-0.5 transition-colors"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </span>
                  ))}
                </div>
                <input
                  type="text"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' && e.target.value.trim()) {
                      const drive = e.target.value.trim();
                      if (!tempEditData.drives.includes(drive)) {
                        setTempEditData(prev => ({ ...prev, drives: [...(prev.drives || []), drive] }));
                      }
                      e.target.value = '';
                    }
                  }}
                  placeholder="Type a drive and press Enter (e.g., innovation, growth, impact)"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-gray-900 focus:border-gray-900 text-sm"
                />
              </div>
            </div>
            
            <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 px-6 py-4 flex items-center justify-end gap-3 rounded-b-2xl">
              <button onClick={closeSectionModal} className="px-5 py-2.5 rounded-xl border-2 border-gray-300 text-gray-700 font-semibold hover:bg-gray-100 transition-all">
                Cancel
              </button>
              <button onClick={saveSectionChanges} className="px-5 py-2.5 rounded-xl bg-gray-900 text-white font-semibold hover:bg-black transition-all flex items-center gap-2 shadow-lg hover:shadow-xl">
                <CheckCircle className="w-4 h-4" />
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Basic Info Modal */}
      {showSectionModal === 'basic' && tempEditData && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[85vh] overflow-y-auto animate-in slide-in-from-bottom-4 duration-300">
            <div className="sticky top-0 bg-gradient-to-r from-gray-900 to-gray-800 px-6 py-4 flex items-center justify-between z-10 rounded-t-2xl">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center">
                  <User className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-xl font-bold text-white">Edit Profile</h2>
              </div>
              <button onClick={closeSectionModal} className="p-2 hover:bg-white/10 rounded-xl transition-colors">
                <X className="w-5 h-5 text-white" />
              </button>
            </div>
            
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-2">First Name</label>
                  <input
                    type="text"
                    value={tempEditData.firstName}
                    onChange={(e) => setTempEditData(prev => ({ ...prev, firstName: e.target.value }))}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-gray-900 focus:border-gray-900"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-2">Last Name</label>
                  <input
                    type="text"
                    value={tempEditData.lastName}
                    onChange={(e) => setTempEditData(prev => ({ ...prev, lastName: e.target.value }))}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-gray-900 focus:border-gray-900"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-900 mb-2">Tagline</label>
                <input
                  type="text"
                  value={tempEditData.tagline}
                  onChange={(e) => setTempEditData(prev => ({ ...prev, tagline: e.target.value }))}
                  placeholder="e.g., Full-stack Developer | AI Enthusiast"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-gray-900 focus:border-gray-900"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-900 mb-2">Location</label>
                <input
                  type="text"
                  value={tempEditData.location}
                  onChange={(e) => setTempEditData(prev => ({ ...prev, location: e.target.value }))}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-gray-900 focus:border-gray-900"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-900 mb-2">Founder Role</label>
                <select
                  value={tempEditData.founderRole}
                  onChange={(e) => setTempEditData(prev => ({ ...prev, founderRole: e.target.value }))}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-gray-900 focus:border-gray-900"
                >
                  <option value="">Select role</option>
                  <option value="Solo Founder">Solo Founder</option>
                  <option value="Technical Founder">Technical Founder</option>
                  <option value="Business/Non-Technical Founder">Business/Non-Technical Founder</option>
                  <option value="Product Founder">Product Founder</option>
                  <option value="Growth/Marketing Founder">Growth/Marketing Founder</option>
                </select>
              </div>
            </div>
            
            <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 px-6 py-4 flex items-center justify-end gap-3 rounded-b-2xl">
              <button onClick={closeSectionModal} className="px-5 py-2.5 rounded-xl border-2 border-gray-300 text-gray-700 font-semibold hover:bg-gray-100 transition-all">
                Cancel
              </button>
              <button onClick={saveSectionChanges} className="px-5 py-2.5 rounded-xl bg-gray-900 text-white font-semibold hover:bg-black transition-all flex items-center gap-2 shadow-lg hover:shadow-xl">
                <CheckCircle className="w-4 h-4" />
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Professional Modal */}
      {showSectionModal === 'professional' && tempEditData && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[85vh] overflow-y-auto animate-in slide-in-from-bottom-4 duration-300">
            <div className="sticky top-0 bg-gradient-to-r from-gray-900 to-gray-800 px-6 py-4 flex items-center justify-between z-10 rounded-t-2xl">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center">
                  <User className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-xl font-bold text-white">Edit About</h2>
              </div>
              <button onClick={closeSectionModal} className="p-2 hover:bg-white/10 rounded-xl transition-colors">
                <X className="w-5 h-5 text-white" />
              </button>
            </div>
            
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-bold text-gray-900 mb-2">About</label>
                <textarea
                  value={tempEditData.myself}
                  onChange={(e) => setTempEditData(prev => ({ ...prev, myself: e.target.value }))}
                  rows={6}
                  placeholder="Tell your story - background, expertise, what makes you unique..."
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-gray-900 focus:border-gray-900 resize-none"
                />
              </div>
            </div>
            
            <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 px-6 py-4 flex items-center justify-end gap-3 rounded-b-2xl">
              <button onClick={closeSectionModal} className="px-5 py-2.5 rounded-xl border-2 border-gray-300 text-gray-700 font-semibold hover:bg-gray-100 transition-all">
                Cancel
              </button>
              <button onClick={saveSectionChanges} className="px-5 py-2.5 rounded-xl bg-gray-900 text-white font-semibold hover:bg-black transition-all flex items-center gap-2 shadow-lg hover:shadow-xl">
                <CheckCircle className="w-4 h-4" />
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-6xl mx-auto pb-16 px-4 sm:px-6">
        {/* Hero Section */}
        <div className="relative mb-8">
          {/* Cover Photo */}
          <div className="relative h-48 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-2xl overflow-hidden shadow-xl border border-slate-200/60">
            <img
              src={profile.basic.coverPicture || 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=1200&h=400&fit=crop'}
              alt="Cover"
              className="w-full h-full object-cover opacity-85"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent"></div>
            
            {editingSection === 'cover' && (
              <div className="absolute inset-0 bg-black/60 flex items-center justify-center z-10">
                <button className="px-6 py-3 bg-white text-gray-900 rounded-xl text-sm font-semibold hover:bg-gray-100 shadow-xl transition-all">
                  Change cover photo
                </button>
              </div>
            )}
            
            {!editingSection && (
              <button
                onClick={() => setEditingSection('cover')}
                className="absolute top-4 right-4 p-2.5 bg-white/90 hover:bg-white rounded-full shadow-lg transition-all backdrop-blur-sm border border-white/60"
              >
                <Camera className="w-4 h-4 text-gray-700" />
              </button>
            )}
          </div>

          {/* Profile Info Card - LinkedIn Style */}
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 -mt-12 relative z-10 mx-4">
            <div className="p-5 md:p-6">
              <div className="flex flex-col md:flex-row gap-5">
                {/* Profile Picture */}
                <div className="relative flex-shrink-0">
                  <div className="relative w-28 h-28 md:w-32 md:h-32">
                    <img
                      src={profile.basic.profilePicture || `https://ui-avatars.com/api/?name=${profile.basic.firstName}+${profile.basic.lastName}&size=160&background=000000&color=fff`}
                      alt="Profile"
                      className="w-full h-full rounded-2xl object-cover border-4 border-white shadow-lg"
                    />
                    {editingSection === 'profile-pic' && (
                      <div className="absolute inset-0 bg-black/60 rounded-2xl flex items-center justify-center z-10">
                        <button className="px-4 py-2 bg-white text-gray-900 rounded-xl text-sm font-semibold hover:bg-gray-100">
                          Change photo
                        </button>
                      </div>
                    )}
                    {!editingSection && (
                      <button
                        onClick={() => setEditingSection('profile-pic')}
                        className="absolute bottom-2 right-2 p-2 bg-white hover:bg-gray-50 rounded-full shadow-lg border border-gray-200 transition-all"
                      >
                        <Camera className="w-4 h-4 text-gray-700" />
                      </button>
                    )}
                  </div>
                </div>

                {/* Profile Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                    <div className="flex-1">
                      <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">
                        {editingSection === 'basic' ? (
                          <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                            <input
                              type="text"
                              value={profile.basic.firstName}
                              onChange={(e) => setProfile(prev => ({ ...prev, basic: { ...prev.basic, firstName: e.target.value } }))}
                              className="text-2xl font-bold bg-gray-50 border-2 border-gray-200 rounded-xl px-3 py-1 text-gray-900 focus:outline-none focus:border-gray-400 w-auto"
                              placeholder="First Name"
                            />
                            <input
                              type="text"
                              value={profile.basic.lastName}
                              onChange={(e) => setProfile(prev => ({ ...prev, basic: { ...prev.basic, lastName: e.target.value } }))}
                              className="text-2xl font-bold bg-gray-50 border-2 border-gray-200 rounded-xl px-3 py-1 text-gray-900 focus:outline-none focus:border-gray-400 w-auto"
                              placeholder="Last Name"
                            />
                          </div>
                        ) : (
                          `${profile.basic.firstName} ${profile.basic.lastName}`
                        )}
                      </h1>
                      {editingSection === 'basic' ? (
                        <input
                          type="text"
                          value={profile.basic.tagline}
                          onChange={(e) => setProfile(prev => ({ ...prev, basic: { ...prev.basic, tagline: e.target.value } }))}
                          className="text-base text-gray-700 bg-gray-50 border-2 border-gray-200 rounded-xl px-3 py-2 w-full focus:outline-none focus:border-gray-400"
                          placeholder="Add a compelling tagline..."
                        />
                      ) : (
                        <p className="text-base text-gray-700 mb-3">{profile.basic.tagline || 'Add a compelling tagline'}</p>
                      )}
                      <div className="flex flex-wrap items-center gap-2 text-gray-600 text-sm">
                        {profile.basic.location && (
                          <span className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-50 rounded-full border border-gray-200">
                            <MapPin className="w-4 h-4 text-gray-500" />
                            <span className="font-medium">{profile.basic.location}</span>
                          </span>
                        )}
                        {profile.basic.founderRole && (
                          <span className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-50 rounded-full border border-gray-200">
                            <User className="w-4 h-4 text-gray-500" />
                            <span className="font-medium">{profile.basic.founderRole}</span>
                          </span>
                        )}
                        {profile.professional.experienceLevel && (
                          <span className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-50 rounded-full border border-gray-200">
                            <Award className="w-4 h-4 text-gray-500" />
                            <span className="font-medium">{profile.professional.experienceLevel}</span>
                          </span>
                        )}
                        {profile.professional.industry && (
                          <span className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-50 rounded-full border border-gray-200">
                            <Briefcase className="w-4 h-4 text-gray-500" />
                            <span className="font-medium">{profile.professional.industry}</span>
                          </span>
                        )}
                      </div>
                    </div>
                    <button
                      onClick={() => openSectionModal('basic')}
                      className="px-6 py-2.5 bg-gray-900 text-white rounded-xl text-sm font-semibold transition-all shadow-sm hover:shadow-md hover:bg-black flex items-center gap-2 self-start whitespace-nowrap"
                    >
                      <Pencil className="w-4 h-4" />
                      Edit Profile
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* About Section */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-900 rounded-xl flex items-center justify-center">
                      <User className="w-5 h-5 text-white" />
                    </div>
                    <h2 className="text-xl font-bold text-gray-900">About</h2>
                  </div>
                  {editingSection === 'about' ? (
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setEditingSection(null)}
                        className="px-4 py-2 rounded-xl border border-gray-200 text-gray-700 text-sm font-semibold hover:bg-gray-50 transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleSave}
                        className="px-4 py-2 rounded-xl bg-gray-900 text-white text-sm font-semibold hover:bg-black transition-colors flex items-center gap-2"
                      >
                        <CheckCircle className="w-4 h-4" />
                        Save
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => openSectionModal('professional')}
                      className="px-4 py-2 rounded-xl bg-gray-50 text-gray-700 text-sm font-semibold hover:bg-gray-100 transition-colors flex items-center gap-2 border border-gray-200"
                    >
                      <Pencil className="w-4 h-4" />
                      Edit
                    </button>
                  )}
                </div>
              </div>
              <div className="p-6">
                {editingSection === 'about' ? (
                  <textarea
                    value={profile.professional.myself}
                    onChange={(e) => setProfile(prev => ({ ...prev, professional: { ...prev.professional, myself: e.target.value } }))}
                    rows={6}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-gray-500 focus:border-gray-500 resize-none text-gray-900 transition-all"
                    placeholder="Tell us about yourself, your background, and what makes you unique..."
                  />
                ) : (
                  <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                    {profile.professional.myself || (
                      <span className="text-gray-400 italic">No description provided. Click edit to add your story.</span>
                    )}
                  </p>
                )}
              </div>
            </div>

            {/* Skills Section */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-900 rounded-xl flex items-center justify-center">
                      <Sparkles className="w-5 h-5 text-white" />
                    </div>
                    <h2 className="text-xl font-bold text-gray-900">Skills & Expertise</h2>
                  </div>
                  {editingSection === 'skills' ? (
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setEditingSection(null)}
                        className="px-4 py-2 rounded-xl border border-gray-200 text-gray-700 text-sm font-semibold hover:bg-gray-50 transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleSave}
                        className="px-4 py-2 rounded-xl bg-gray-900 text-white text-sm font-semibold hover:bg-black transition-colors flex items-center gap-2"
                      >
                        <CheckCircle className="w-4 h-4" />
                        Save
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => setEditingSection('skills')}
                      className="px-4 py-2 rounded-xl bg-gray-50 text-gray-700 text-sm font-semibold hover:bg-gray-100 transition-colors flex items-center gap-2 border border-gray-200"
                    >
                      <Pencil className="w-4 h-4" />
                      Edit
                    </button>
                  )}
                </div>
              </div>
              <div className="p-6">
                {editingSection === 'skills' ? (
                  <div className="space-y-4">
                    <div className="flex flex-wrap gap-2">
                      {profile.professional.skills.map((skill, idx) => (
                        <span key={idx} className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-full text-sm font-semibold shadow-md">
                          {skill}
                          <button 
                            onClick={() => {
                              setProfile(prev => ({
                                ...prev,
                                professional: {
                                  ...prev.professional,
                                  skills: prev.professional.skills.filter(s => s !== skill)
                                }
                              }));
                            }} 
                            className="hover:bg-white/20 rounded-full p-0.5 transition-colors"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </span>
                      ))}
                    </div>
                    <input
                      type="text"
                      onKeyPress={(e) => {
                        if (e.key === 'Enter' && e.target.value.trim()) {
                          const skill = e.target.value.trim();
                          if (!profile.professional.skills.includes(skill)) {
                            setProfile(prev => ({
                              ...prev,
                              professional: {
                                ...prev.professional,
                                skills: [...prev.professional.skills, skill]
                              }
                            }));
                          }
                          e.target.value = '';
                        }
                      }}
                      placeholder="Type a skill and press Enter"
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-gray-500 focus:border-gray-500 text-sm transition-all"
                    />
                  </div>
                ) : (
                  <div className="flex flex-wrap gap-2">
                    {profile.professional.skills.length > 0 ? (
                      profile.professional.skills.map((skill, idx) => (
                        <span key={idx} className="px-4 py-2 bg-gray-900 text-white rounded-full text-sm font-semibold shadow-md">
                          {skill}
                        </span>
                      ))
                    ) : (
                      <p className="text-gray-400 italic">No skills added yet. Click edit to add your skills.</p>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Experience Section */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
              <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center">
                      <Briefcase className="w-5 h-5 text-gray-700" />
                    </div>
                    <h2 className="text-xl font-bold text-gray-900">Experience</h2>
                  </div>
                  <button
                    onClick={handleAddExperience}
                    className="px-4 py-2 rounded-full border border-gray-200 text-gray-700 text-sm font-semibold hover:bg-gray-100 transition-colors flex items-center gap-2"
                  >
                    <Plus className="w-4 h-4" />
                    Add
                  </button>
                </div>
              </div>
              <div className="p-6">
                {profile.experience.length === 0 ? (
                  <div className="text-center py-12">
                    <Briefcase className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500 mb-2 font-medium">No experience added yet</p>
                    <button
                      onClick={() => {
                        setEditingSection('experience');
                        handleAddExperience();
                      }}
                      className="text-gray-700 hover:text-gray-900 text-sm font-semibold"
                    >
                      Add your first experience
                    </button>
                  </div>
                ) : (
                  <div className="space-y-8">
                    {profile.experience.map((exp, index) => (
                      <div key={exp.id} className={`group relative ${index !== profile.experience.length - 1 ? 'pb-8 border-b border-gray-100' : ''}`}>
                        {editingSection === `experience-${exp.id}` ? (
                          <div className="space-y-5 bg-slate-50/70 border border-slate-200 rounded-2xl p-5">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Job Title</label>
                                <input
                                  type="text"
                                  value={exp.jobTitle}
                                  onChange={(e) => {
                                    const updated = profile.experience.map(item => 
                                      item.id === exp.id ? { ...item, jobTitle: e.target.value } : item
                                    );
                                    setProfile(prev => ({ ...prev, experience: updated }));
                                  }}
                                  className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white focus:ring-2 focus:ring-gray-500 focus:border-gray-500 text-gray-900 transition-all"
                                  placeholder="e.g. Software Engineer"
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Company</label>
                                <input
                                  type="text"
                                  value={exp.companyName}
                                  onChange={(e) => {
                                    const updated = profile.experience.map(item => 
                                      item.id === exp.id ? { ...item, companyName: e.target.value } : item
                                    );
                                    setProfile(prev => ({ ...prev, experience: updated }));
                                  }}
                                  className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white focus:ring-2 focus:ring-gray-500 focus:border-gray-500 text-gray-900 transition-all"
                                  placeholder="e.g. Google"
                                />
                              </div>
                            </div>
                            <div>
                              <label className="block text-sm font-semibold text-gray-700 mb-2">Employment Type</label>
                              <select
                                value={exp.employmentType}
                                onChange={(e) => {
                                  const updated = profile.experience.map(item => 
                                    item.id === exp.id ? { ...item, employmentType: e.target.value } : item
                                  );
                                  setProfile(prev => ({ ...prev, experience: updated }));
                                }}
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white focus:ring-2 focus:ring-gray-500 focus:border-gray-500 text-gray-900 transition-all"
                              >
                                <option value="Full-time">Full-time</option>
                                <option value="Part-time">Part-time</option>
                                <option value="Contract">Contract</option>
                                <option value="Freelance">Freelance</option>
                                <option value="Internship">Internship</option>
                              </select>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Start Date</label>
                                <input
                                  type="month"
                                  value={exp.startDate}
                                  onChange={(e) => {
                                    const updated = profile.experience.map(item => 
                                      item.id === exp.id ? { ...item, startDate: e.target.value } : item
                                    );
                                    setProfile(prev => ({ ...prev, experience: updated }));
                                  }}
                                  className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white focus:ring-2 focus:ring-gray-500 focus:border-gray-500 text-gray-900 transition-all"
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">End Date</label>
                                <div className="flex items-center gap-3">
                                  <input
                                    type="month"
                                    value={exp.endDate === 'Present' ? '' : exp.endDate}
                                    onChange={(e) => {
                                      const updated = profile.experience.map(item => 
                                        item.id === exp.id ? { ...item, endDate: e.target.value || 'Present' } : item
                                      );
                                      setProfile(prev => ({ ...prev, experience: updated }));
                                    }}
                                    disabled={exp.endDate === 'Present'}
                                    className="flex-1 px-4 py-3 rounded-xl border border-gray-200 bg-white focus:ring-2 focus:ring-gray-500 focus:border-gray-500 text-gray-900 transition-all disabled:bg-gray-50 disabled:text-gray-500"
                                  />
                                  <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
                                    <input
                                      type="checkbox"
                                      checked={exp.endDate === 'Present'}
                                      onChange={(e) => {
                                        const updated = profile.experience.map(item => 
                                          item.id === exp.id ? { ...item, endDate: e.target.checked ? 'Present' : '' } : item
                                        );
                                        setProfile(prev => ({ ...prev, experience: updated }));
                                      }}
                                      className="w-4 h-4 text-gray-700 border-gray-300 rounded focus:ring-gray-500"
                                    />
                                    Present
                                  </label>
                                </div>
                              </div>
                            </div>
                            <div>
                              <label className="block text-sm font-semibold text-gray-700 mb-2">Location</label>
                              <input
                                type="text"
                                value={exp.location}
                                onChange={(e) => {
                                  const updated = profile.experience.map(item => 
                                    item.id === exp.id ? { ...item, location: e.target.value } : item
                                  );
                                  setProfile(prev => ({ ...prev, experience: updated }));
                                }}
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white focus:ring-2 focus:ring-gray-500 focus:border-gray-500 text-gray-900 transition-all"
                                placeholder="e.g. San Francisco, CA"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
                              <textarea
                                value={exp.description}
                                onChange={(e) => {
                                  const updated = profile.experience.map(item => 
                                    item.id === exp.id ? { ...item, description: e.target.value } : item
                                  );
                                  setProfile(prev => ({ ...prev, experience: updated }));
                                }}
                                rows={4}
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white focus:ring-2 focus:ring-gray-500 focus:border-gray-500 resize-none text-gray-900 transition-all"
                                placeholder="Describe your role, achievements, and responsibilities..."
                              />
                            </div>
                            <div className="flex justify-end gap-2 pt-2">
                              <button
                                onClick={() => deleteExperience(exp.id)}
                                className="px-4 py-2 rounded-xl border border-red-200 text-red-600 text-sm font-semibold hover:bg-red-50 transition-colors"
                              >
                                Delete
                              </button>
                              <button
                                onClick={() => setEditingSection(null)}
                                className="px-4 py-2 rounded-xl bg-gray-900 text-white text-sm font-semibold hover:bg-black transition-colors"
                              >
                                Save
                              </button>
                            </div>
                          </div>
                        ) : (
                          <div className="flex gap-4">
                            <div className="flex-shrink-0">
                              <div className="w-14 h-14 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl flex items-center justify-center shadow-md">
                                <Building2 className="w-7 h-7 text-gray-700" />
                              </div>
                            </div>
                            <div className="flex-1">
                              <div className="flex items-start justify-between">
                                <div className="flex-1">
                                  <h3 className="text-lg font-bold text-gray-900 mb-1">{exp.jobTitle}</h3>
                                  <p className="text-gray-700 font-semibold mb-2">{exp.companyName}</p>
                                  <p className="text-sm text-gray-600 mb-2 flex items-center gap-2">
                                    <Calendar className="w-4 h-4" />
                                    {formatDateRange(exp.startDate, exp.endDate)}
                                    {exp.location && (
                                      <>
                                        <span className="text-gray-400">•</span>
                                        <MapPin className="w-4 h-4" />
                                        {exp.location}
                                      </>
                                    )}
                                  </p>
                                  {exp.description && (
                                    <p className="text-gray-700 text-sm leading-relaxed mt-3">{exp.description}</p>
                                  )}
                                </div>
                                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity ml-4">
                                  {index > 0 && (
                                    <button
                                      onClick={() => moveExperience(index, 'up')}
                                      className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
                                      title="Move up"
                                    >
                                      <ArrowUp className="w-4 h-4 text-gray-600" />
                                    </button>
                                  )}
                                  {index < profile.experience.length - 1 && (
                                    <button
                                      onClick={() => moveExperience(index, 'down')}
                                      className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
                                      title="Move down"
                                    >
                                      <ArrowDown className="w-4 h-4 text-gray-600" />
                                    </button>
                                  )}
                                  <button
                                    onClick={() => setEditingSection(`experience-${exp.id}`)}
                                    className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
                                    title="Edit"
                                  >
                                    <Pencil className="w-4 h-4 text-gray-600" />
                                  </button>
                                  <button
                                    onClick={() => {
                                      if (window.confirm('Are you sure you want to delete this experience?')) {
                                        deleteExperience(exp.id);
                                      }
                                    }}
                                    className="p-1.5 hover:bg-red-50 rounded-lg transition-colors"
                                    title="Delete"
                                  >
                                    <Trash2 className="w-4 h-4 text-red-600" />
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Education Section */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
              <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center">
                      <GraduationCap className="w-5 h-5 text-gray-700" />
                    </div>
                    <h2 className="text-xl font-bold text-gray-900">Education</h2>
                  </div>
                  <button
                    onClick={handleAddEducation}
                    className="px-4 py-2 rounded-full border border-gray-200 text-gray-700 text-sm font-semibold hover:bg-gray-100 transition-colors flex items-center gap-2"
                  >
                    <Plus className="w-4 h-4" />
                    Add
                  </button>
                </div>
              </div>
              <div className="p-6">
                {profile.education.length === 0 ? (
                  <div className="text-center py-12">
                    <GraduationCap className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500 mb-2 font-medium">No education added yet</p>
                    <button
                      onClick={() => {
                        setEditingSection('education');
                        handleAddEducation();
                      }}
                      className="text-gray-700 hover:text-gray-900 text-sm font-semibold"
                    >
                      Add your first education
                    </button>
                  </div>
                ) : (
                  <div className="space-y-8">
                    {profile.education.map((edu, index) => (
                      <div key={edu.id} className={`group relative ${index !== profile.education.length - 1 ? 'pb-8 border-b border-gray-100' : ''}`}>
                        {editingSection === `education-${edu.id}` ? (
                          <div className="space-y-4">
                            <div>
                              <label className="block text-sm font-semibold text-gray-700 mb-2">School/University</label>
                              <input
                                type="text"
                                value={edu.schoolName}
                                onChange={(e) => {
                                  const updated = profile.education.map(item => 
                                    item.id === edu.id ? { ...item, schoolName: e.target.value } : item
                                  );
                                  setProfile(prev => ({ ...prev, education: updated }));
                                }}
                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-gray-500 focus:border-gray-500 text-gray-900 transition-all"
                                placeholder="e.g. Stanford University"
                              />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Degree</label>
                                <input
                                  type="text"
                                  value={edu.degree}
                                  onChange={(e) => {
                                    const updated = profile.education.map(item => 
                                      item.id === edu.id ? { ...item, degree: e.target.value } : item
                                    );
                                    setProfile(prev => ({ ...prev, education: updated }));
                                  }}
                                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-gray-500 focus:border-gray-500 text-gray-900 transition-all"
                                  placeholder="e.g. Bachelor of Science"
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Field of Study</label>
                                <input
                                  type="text"
                                  value={edu.fieldOfStudy}
                                  onChange={(e) => {
                                    const updated = profile.education.map(item => 
                                      item.id === edu.id ? { ...item, fieldOfStudy: e.target.value } : item
                                    );
                                    setProfile(prev => ({ ...prev, education: updated }));
                                  }}
                                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-gray-500 focus:border-gray-500 text-gray-900 transition-all"
                                  placeholder="e.g. Computer Science"
                                />
                              </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Start Date</label>
                                <input
                                  type="month"
                                  value={edu.startDate}
                                  onChange={(e) => {
                                    const updated = profile.education.map(item => 
                                      item.id === edu.id ? { ...item, startDate: e.target.value } : item
                                    );
                                    setProfile(prev => ({ ...prev, education: updated }));
                                  }}
                                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-gray-500 focus:border-gray-500 text-gray-900 transition-all"
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">End Date</label>
                                <div className="flex items-center gap-3">
                                  <input
                                    type="month"
                                    value={edu.endDate === 'Present' ? '' : edu.endDate}
                                    onChange={(e) => {
                                      const updated = profile.education.map(item => 
                                        item.id === edu.id ? { ...item, endDate: e.target.value || 'Present' } : item
                                      );
                                      setProfile(prev => ({ ...prev, education: updated }));
                                    }}
                                    disabled={edu.endDate === 'Present'}
                                    className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-gray-500 focus:border-gray-500 text-gray-900 transition-all disabled:bg-gray-50 disabled:text-gray-500"
                                  />
                                  <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
                                    <input
                                      type="checkbox"
                                      checked={edu.endDate === 'Present'}
                                      onChange={(e) => {
                                        const updated = profile.education.map(item => 
                                          item.id === edu.id ? { ...item, endDate: e.target.checked ? 'Present' : '' } : item
                                        );
                                        setProfile(prev => ({ ...prev, education: updated }));
                                      }}
                                      className="w-4 h-4 text-gray-700 border-gray-300 rounded focus:ring-gray-500"
                                    />
                                    Present
                                  </label>
                                </div>
                              </div>
                            </div>
                            <div>
                              <label className="block text-sm font-semibold text-gray-700 mb-2">Grade/GPA (optional)</label>
                              <input
                                type="text"
                                value={edu.grade}
                                onChange={(e) => {
                                  const updated = profile.education.map(item => 
                                    item.id === edu.id ? { ...item, grade: e.target.value } : item
                                  );
                                  setProfile(prev => ({ ...prev, education: updated }));
                                }}
                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-gray-500 focus:border-gray-500 text-gray-900 transition-all"
                                placeholder="e.g. 3.9/4.0"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-semibold text-gray-700 mb-2">Activities/Achievements</label>
                              <textarea
                                value={edu.activities}
                                onChange={(e) => {
                                  const updated = profile.education.map(item => 
                                    item.id === edu.id ? { ...item, activities: e.target.value } : item
                                  );
                                  setProfile(prev => ({ ...prev, education: updated }));
                                }}
                                rows={3}
                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-gray-500 focus:border-gray-500 resize-none text-gray-900 transition-all"
                                placeholder="e.g. Dean's List, Student Council, Sports Team"
                              />
                            </div>
                            <div className="flex justify-end gap-2 pt-4">
                              <button
                                onClick={() => deleteEducation(edu.id)}
                                className="px-4 py-2 rounded-xl border border-red-200 text-red-600 text-sm font-semibold hover:bg-red-50 transition-colors"
                              >
                                Delete
                              </button>
                              <button
                                onClick={() => setEditingSection(null)}
                                className="px-4 py-2 rounded-xl bg-gray-900 text-white text-sm font-semibold hover:bg-black transition-colors"
                              >
                                Save
                              </button>
                            </div>
                          </div>
                        ) : (
                          <div className="flex gap-4">
                            <div className="flex-shrink-0">
                              <div className="w-14 h-14 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl flex items-center justify-center shadow-md">
                                <GraduationCap className="w-7 h-7 text-gray-700" />
                              </div>
                            </div>
                            <div className="flex-1">
                              <div className="flex items-start justify-between">
                                <div>
                                  <h3 className="text-lg font-bold text-gray-900 mb-1">{edu.schoolName}</h3>
                                  <p className="text-gray-700 font-semibold mb-2">
                                    {edu.degree} {edu.fieldOfStudy && `in ${edu.fieldOfStudy}`}
                                  </p>
                                  <p className="text-sm text-gray-600 mb-2 flex items-center gap-2">
                                    <Calendar className="w-4 h-4" />
                                    {formatDateRange(edu.startDate, edu.endDate)}
                                    {edu.grade && (
                                      <>
                                        <span className="text-gray-400">•</span>
                                        <Award className="w-4 h-4" />
                                        {edu.grade}
                                      </>
                                    )}
                                  </p>
                                  {edu.activities && (
                                    <p className="text-gray-700 text-sm leading-relaxed mt-3">{edu.activities}</p>
                                  )}
                                </div>
                                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                  {index > 0 && (
                                    <button
                                      onClick={() => moveEducation(index, 'up')}
                                      className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
                                      title="Move up"
                                    >
                                      <ArrowUp className="w-4 h-4 text-gray-600" />
                                    </button>
                                  )}
                                  {index < profile.education.length - 1 && (
                                    <button
                                      onClick={() => moveEducation(index, 'down')}
                                      className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
                                      title="Move down"
                                    >
                                      <ArrowDown className="w-4 h-4 text-gray-600" />
                                    </button>
                                  )}
                                  <button
                                    onClick={() => setEditingSection(`education-${edu.id}`)}
                                    className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
                                    title="Edit"
                                  >
                                    <Pencil className="w-4 h-4 text-gray-600" />
                                  </button>
                                  <button
                                    onClick={() => {
                                      if (confirm('Delete this education?')) {
                                        deleteEducation(edu.id);
                                      }
                                    }}
                                    className="p-1.5 hover:bg-red-50 rounded-lg transition-colors"
                                    title="Delete"
                                  >
                                    <Trash2 className="w-4 h-4 text-red-600" />
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Founder Journey */}
            <div className="bg-gradient-to-br from-white to-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
              <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-900 rounded-xl flex items-center justify-center">
                      <Rocket className="w-5 h-5 text-white" />
                    </div>
                    <h2 className="text-xl font-bold text-gray-900">Founder Journey</h2>
                  </div>
                  <button
                    onClick={() => openSectionModal('founderJourney')}
                    className="px-4 py-2 rounded-full border border-gray-200 text-gray-700 text-sm font-semibold hover:bg-gray-100 transition-colors flex items-center gap-2"
                  >
                    <Pencil className="w-4 h-4" />
                    Edit
                  </button>
                </div>
              </div>
              <div className="p-6 space-y-6">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Target className="w-4 h-4 text-gray-700" />
                    <label className="text-sm font-semibold text-gray-700">My Vision</label>
                  </div>
                  <p className="text-gray-700 text-sm leading-relaxed">{profile.founderJourney.vision || 'No vision set'}</p>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Award className="w-4 h-4 text-gray-700" />
                    <label className="text-sm font-semibold text-gray-700">Experience Level</label>
                  </div>
                  <p className="text-gray-900 font-semibold">{profile.founderJourney.experienceLevel || 'Not specified'}</p>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Zap className="w-4 h-4 text-gray-700" />
                    <label className="text-sm font-semibold text-gray-700">My Drives</label>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {profile.founderJourney.drives && profile.founderJourney.drives.length > 0 ? (
                      profile.founderJourney.drives.map((drive, idx) => (
                        <span key={idx} className="px-3 py-1.5 bg-gray-900 text-white rounded-full text-xs font-semibold">
                          {drive}
                        </span>
                      ))
                    ) : (
                      <p className="text-gray-400 text-sm italic">No drives added</p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Marketplace Profile */}
            {profile.marketplace.workAreas.length > 0 || profile.marketplace.services.length > 0 || profile.marketplace.rate ? (
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center">
                      <DollarSign className="w-5 h-5 text-gray-700" />
                    </div>
                    <h2 className="text-xl font-bold text-gray-900">Marketplace Profile</h2>
                  </div>
                </div>
                <div className="p-6 space-y-4">
                  {profile.marketplace.workAreas.length > 0 && (
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Work Areas</label>
                      <div className="flex flex-wrap gap-2">
                        {profile.marketplace.workAreas.map((area, idx) => (
                          <span key={idx} className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">
                            {area}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  {profile.marketplace.services.length > 0 && (
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Services</label>
                      <div className="flex flex-wrap gap-2">
                        {profile.marketplace.services.map((service, idx) => (
                          <span key={idx} className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">
                            {service}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  {profile.marketplace.rate && (
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">Rate</label>
                      <p className="text-gray-900 font-semibold">{profile.marketplace.rate}</p>
                    </div>
                  )}
                  {profile.marketplace.availability && (
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">Availability</label>
                      <p className="text-gray-900 font-semibold">{profile.marketplace.availability}</p>
                    </div>
                  )}
                </div>
              </div>
            ) : null}

            {/* Contact Information */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
              <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center">
                      <Mail className="w-5 h-5 text-gray-700" />
                    </div>
                    <h2 className="text-xl font-bold text-gray-900">Contact</h2>
                  </div>
                  {editingSection === 'contact' ? (
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setEditingSection(null)}
                        className="px-4 py-2 rounded-full border border-gray-200 text-gray-700 text-sm font-semibold hover:bg-gray-100 transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleSave}
                        className="px-4 py-2 rounded-full bg-gray-900 text-white text-sm font-semibold hover:bg-black transition-colors flex items-center gap-2"
                      >
                        <CheckCircle className="w-4 h-4" />
                        Save
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => setEditingSection('contact')}
                      className="px-4 py-2 rounded-full border border-gray-200 text-gray-700 text-sm font-semibold hover:bg-gray-100 transition-colors flex items-center gap-2"
                    >
                      <Pencil className="w-4 h-4" />
                      Edit
                    </button>
                  )}
                </div>
              </div>
              <div className="p-6">
                {editingSection === 'contact' ? (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Phone</label>
                      <input
                        type="tel"
                        value={profile.basic.phone}
                        onChange={(e) => setProfile(prev => ({ ...prev, basic: { ...prev.basic, phone: e.target.value } }))}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-gray-500 focus:border-gray-500 text-gray-900 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                      <input
                        type="email"
                        value={profile.basic.email}
                        onChange={(e) => setProfile(prev => ({ ...prev, basic: { ...prev.basic, email: e.target.value } }))}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-gray-500 focus:border-gray-500 text-gray-900 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Website</label>
                      <input
                        type="text"
                        value={profile.basic.website}
                        onChange={(e) => setProfile(prev => ({ ...prev, basic: { ...prev.basic, website: e.target.value } }))}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-gray-500 focus:border-gray-500 text-gray-900 transition-all"
                        placeholder="yourwebsite.com"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">LinkedIn</label>
                      <input
                        type="text"
                        value={profile.basic.linkedin}
                        onChange={(e) => setProfile(prev => ({ ...prev, basic: { ...prev.basic, linkedin: e.target.value } }))}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-gray-500 focus:border-gray-500 text-gray-900 transition-all"
                        placeholder="linkedin.com/in/username"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Twitter</label>
                      <input
                        type="text"
                        value={profile.basic.twitter}
                        onChange={(e) => setProfile(prev => ({ ...prev, basic: { ...prev.basic, twitter: e.target.value } }))}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-gray-500 focus:border-gray-500 text-gray-900 transition-all"
                        placeholder="@username"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Instagram</label>
                      <input
                        type="text"
                        value={profile.basic.instagram}
                        onChange={(e) => setProfile(prev => ({ ...prev, basic: { ...prev.basic, instagram: e.target.value } }))}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-gray-500 focus:border-gray-500 text-gray-900 transition-all"
                        placeholder="@username"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {profile.basic.phone && (
                      <a href={`tel:${profile.basic.phone}`} className="flex items-center gap-3 text-gray-700 hover:text-gray-700 transition-colors group">
                        <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center group-hover:bg-gray-100 transition-colors">
                          <Phone className="w-5 h-5 text-gray-600 group-hover:text-gray-700" />
                        </div>
                        <span className="font-medium">{profile.basic.phone}</span>
                      </a>
                    )}
                    {profile.basic.email && (
                      <a href={`mailto:${profile.basic.email}`} className="flex items-center gap-3 text-gray-700 hover:text-gray-700 transition-colors group">
                        <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center group-hover:bg-gray-100 transition-colors">
                          <Mail className="w-5 h-5 text-gray-600 group-hover:text-gray-700" />
                        </div>
                        <span className="font-medium">{profile.basic.email}</span>
                      </a>
                    )}
                    {profile.basic.website && (
                      <a href={`https://${profile.basic.website}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-gray-700 hover:text-gray-700 transition-colors group">
                        <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center group-hover:bg-gray-100 transition-colors">
                          <Globe className="w-5 h-5 text-gray-600 group-hover:text-gray-700" />
                        </div>
                        <span className="font-medium">{profile.basic.website}</span>
                        <ExternalLink className="w-4 h-4 text-gray-400" />
                      </a>
                    )}
                    {profile.basic.linkedin && (
                      <a href={`https://${profile.basic.linkedin}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-gray-700 hover:text-gray-700 transition-colors group">
                        <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center group-hover:bg-gray-100 transition-colors">
                          <Linkedin className="w-5 h-5 text-gray-600 group-hover:text-gray-700" />
                        </div>
                        <span className="font-medium">{profile.basic.linkedin}</span>
                        <ExternalLink className="w-4 h-4 text-gray-400" />
                      </a>
                    )}
                    {profile.basic.twitter && (
                      <a href={`https://twitter.com/${profile.basic.twitter.replace('@', '')}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-gray-700 hover:text-gray-700 transition-colors group">
                        <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center group-hover:bg-gray-100 transition-colors">
                          <Twitter className="w-5 h-5 text-gray-600 group-hover:text-gray-700" />
                        </div>
                        <span className="font-medium">{profile.basic.twitter}</span>
                        <ExternalLink className="w-4 h-4 text-gray-400" />
                      </a>
                    )}
                    {profile.basic.instagram && (
                      <a href={`https://instagram.com/${profile.basic.instagram.replace('@', '')}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-gray-700 hover:text-gray-700 transition-colors group">
                        <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center group-hover:bg-gray-100 transition-colors">
                          <Instagram className="w-5 h-5 text-gray-600 group-hover:text-gray-700" />
                        </div>
                        <span className="font-medium">{profile.basic.instagram}</span>
                        <ExternalLink className="w-4 h-4 text-gray-400" />
                      </a>
                    )}
                    {!profile.basic.phone && !profile.basic.email && !profile.basic.website && !profile.basic.linkedin && !profile.basic.twitter && !profile.basic.instagram && (
                      <p className="text-gray-400 text-sm italic text-center py-4">No contact information added</p>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EntrepreneurProfile;
