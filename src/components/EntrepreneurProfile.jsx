import React, { useState, useEffect } from 'react';
import { 
  User, Camera, Edit3, Briefcase, MapPin, Phone, Mail, Linkedin, 
  Globe, Twitter, Instagram, Plus, X, Save, GraduationCap, Rocket, 
  Target, Heart, DollarSign, CheckCircle, Calendar, Trash2,
  Pencil, Building2, Award, Star, ChevronRight, Sparkles, Zap,
  TrendingUp, Users, Eye, MessageSquare, ExternalLink
} from 'lucide-react';

const EntrepreneurProfile = () => {
  const [editingSection, setEditingSection] = useState(null);
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
      purpose: '',
      values: []
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
        selectedIntent: localStorage.getItem('selectedIntent') || '',
        offerSkillsPreferences: JSON.parse(localStorage.getItem('offerSkillsPreferences') || '{}')
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
          location: 'San Francisco, CA'
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
          purpose: onboardingData.selectedIntent === 'find-cofounder' ? 'Find A Co-founder' : 
                   onboardingData.selectedIntent === 'offer-skills' ? 'Offer Skills' : 
                   onboardingData.selectedIntent === 'idea-sprint' ? 'Idea Sprint' : 'Find A Co-founder',
          values: uniqueValues.length > 0 ? uniqueValues : ['Vision & Creation', 'Grit & Growth', 'Heart & Connections']
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
      <div className="max-w-6xl mx-auto pb-16 px-4 sm:px-6">
        {/* Hero Section */}
        <div className="relative mb-10">
          {/* Cover Photo */}
          <div className="relative min-h-[340px] bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-3xl overflow-hidden shadow-2xl border border-slate-200/60">
            <img
              src={profile.basic.coverPicture || 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=1200&h=400&fit=crop'}
              alt="Cover"
              className="w-full h-full object-cover opacity-85"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-transparent"></div>
            
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
                className="absolute top-6 right-6 p-3 bg-white/90 hover:bg-white rounded-full shadow-lg transition-all backdrop-blur-sm border border-white/60"
              >
                <Camera className="w-5 h-5 text-gray-700" />
              </button>
            )}

            {/* Profile Picture */}
            <div className="absolute -bottom-20 left-8">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full p-1">
                  <img
                    src={profile.basic.profilePicture || `https://ui-avatars.com/api/?name=${profile.basic.firstName}+${profile.basic.lastName}&size=160&background=000000&color=fff`}
                    alt="Profile"
                    className="w-40 h-40 rounded-full border-4 border-white object-cover bg-white"
                  />
                </div>
                {editingSection === 'profile-pic' && (
                  <div className="absolute inset-0 bg-black/60 rounded-full flex items-center justify-center z-10">
                    <button className="px-4 py-2 bg-white text-gray-900 rounded-lg text-sm font-semibold hover:bg-gray-100">
                      Change photo
                    </button>
                  </div>
                )}
                {!editingSection && (
                  <button
                    onClick={() => setEditingSection('profile-pic')}
                    className="absolute bottom-2 right-2 p-3 bg-white hover:bg-gray-50 rounded-full shadow-xl border-2 border-gray-100 transition-all"
                  >
                    <Camera className="w-4 h-4 text-gray-700" />
                  </button>
                )}
              </div>
            </div>

            {/* Profile Info Overlay */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-[92%] md:w-[80%] max-w-5xl transform">
              <div className="flex flex-col md:flex-row md:items-end items-start justify-between gap-3 bg-white/18 backdrop-blur-xl border border-white/30 rounded-3xl p-5 shadow-2xl">
                <div className="flex-1">
                  <h1 className="text-4xl font-bold text-white mb-2 drop-shadow-lg">
                    {editingSection === 'basic' ? (
                      <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-2">
                        <input
                          type="text"
                          value={profile.basic.firstName}
                          onChange={(e) => setProfile(prev => ({ ...prev, basic: { ...prev.basic, firstName: e.target.value } }))}
                          className="text-4xl font-bold bg-white/25 backdrop-blur-sm border border-white/40 rounded-lg px-3 py-1 text-white placeholder-white/70 focus:outline-none focus:border-white/60 w-auto min-w-[140px] max-w-[240px]"
                          placeholder="First Name"
                        />
                        <input
                          type="text"
                          value={profile.basic.lastName}
                          onChange={(e) => setProfile(prev => ({ ...prev, basic: { ...prev.basic, lastName: e.target.value } }))}
                          className="text-4xl font-bold bg-white/25 backdrop-blur-sm border border-white/40 rounded-lg px-3 py-1 text-white placeholder-white/70 focus:outline-none focus:border-white/60 w-auto min-w-[140px] max-w-[240px]"
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
                      className="mt-2 text-xl text-white/90 bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg px-3 py-1.5 w-full max-w-2xl focus:outline-none focus:border-white/50 placeholder-white/70"
                      placeholder="Add a compelling tagline..."
                    />
                  ) : (
                    <p className="text-xl text-white/90 font-medium mb-3 drop-shadow-md">{profile.basic.tagline || 'Add a compelling tagline'}</p>
                  )}
                  <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-white/85 mt-2">
                    {profile.basic.location && (
                      <span className="flex items-center gap-1.5 text-sm font-medium">
                        <MapPin className="w-4 h-4" />
                        {profile.basic.location}
                      </span>
                    )}
                    {profile.professional.experienceLevel && (
                      <span className="flex items-center gap-1.5 text-sm font-medium">
                        <Award className="w-4 h-4" />
                        {profile.professional.experienceLevel} Level
                      </span>
                    )}
                    {profile.professional.industry && (
                      <span className="flex items-center gap-1.5 text-sm font-medium">
                        <Briefcase className="w-4 h-4" />
                        {profile.professional.industry}
                      </span>
                    )}
                  </div>
                </div>
                <button
                  onClick={() => {
                    if (editingSection === 'basic') {
                      handleSave();
                    } else {
                      setEditingSection('basic');
                    }
                  }}
                  className="px-5 py-2 bg-white text-gray-900 rounded-full text-sm font-semibold transition-all shadow-lg hover:shadow-xl flex items-center gap-2 border border-white/70"
                >
                  {editingSection === 'basic' ? (
                    <>
                      <CheckCircle className="w-4 h-4" />
                      Save
                    </>
                  ) : (
                    <>
                      <Pencil className="w-4 h-4" />
                      Edit Profile
                    </>
                  )}
                </button>
              </div>
            </div>
        </div>
      </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* About Section */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
              <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                      <User className="w-5 h-5 text-blue-600" />
                    </div>
                    <h2 className="text-xl font-bold text-gray-900">About</h2>
                  </div>
                  {editingSection === 'about' ? (
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
                      onClick={() => setEditingSection('about')}
                      className="px-4 py-2 rounded-full border border-gray-200 text-gray-700 text-sm font-semibold hover:bg-gray-100 transition-colors flex items-center gap-2"
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
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none text-gray-900 transition-all"
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
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
              <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
                      <Sparkles className="w-5 h-5 text-purple-600" />
                    </div>
                    <h2 className="text-xl font-bold text-gray-900">Skills & Expertise</h2>
                  </div>
                  {editingSection === 'skills' ? (
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
                      onClick={() => setEditingSection('skills')}
                      className="px-4 py-2 rounded-full border border-gray-200 text-gray-700 text-sm font-semibold hover:bg-gray-100 transition-colors flex items-center gap-2"
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
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm transition-all"
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
                    <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                      <Briefcase className="w-5 h-5 text-green-600" />
                    </div>
                    <h2 className="text-xl font-bold text-gray-900">Experience</h2>
                  </div>
                  {editingSection === 'experience' ? (
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          setEditingSection(null);
                        }}
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
                      onClick={() => {
                        setEditingSection('experience');
                        if (profile.experience.length === 0) {
                          handleAddExperience();
                        }
                      }}
                      className="px-4 py-2 rounded-full border border-gray-200 text-gray-700 text-sm font-semibold hover:bg-gray-100 transition-colors flex items-center gap-2"
                    >
                      <Plus className="w-4 h-4" />
                      Add
                    </button>
                  )}
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
                      className="text-blue-600 hover:text-blue-700 text-sm font-semibold"
                    >
                      Add your first experience
                    </button>
                  </div>
                ) : (
                  <div className="space-y-8">
                    {profile.experience.map((exp, index) => (
                      <div key={exp.id} className={`${index !== profile.experience.length - 1 ? 'pb-8 border-b border-gray-100' : ''}`}>
                        {editingSection === 'experience' ? (
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
                                  className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 transition-all"
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
                                  className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 transition-all"
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
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 transition-all"
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
                                  className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 transition-all"
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
                                    className="flex-1 px-4 py-3 rounded-xl border border-gray-200 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 transition-all disabled:bg-gray-50 disabled:text-gray-500"
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
                                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
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
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 transition-all"
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
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none text-gray-900 transition-all"
                                placeholder="Describe your role, achievements, and responsibilities..."
                              />
                            </div>
                            <button
                              onClick={() => handleRemoveExperience(exp.id)}
                              className="text-sm text-red-600 hover:text-red-700 font-semibold flex items-center gap-2"
                            >
                              <Trash2 className="w-4 h-4" />
                              Remove
                            </button>
                          </div>
                        ) : (
                          <div className="flex gap-4">
                            <div className="flex-shrink-0">
                              <div className="w-14 h-14 bg-gradient-to-br from-green-100 to-green-200 rounded-xl flex items-center justify-center shadow-md">
                                <Building2 className="w-7 h-7 text-green-600" />
                              </div>
                            </div>
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
                          </div>
                        )}
                      </div>
                    ))}
                    {editingSection === 'experience' && (
                      <button
                        onClick={handleAddExperience}
                        className="w-full py-4 border-2 border-dashed border-gray-300 rounded-xl text-gray-600 hover:border-blue-500 hover:text-blue-600 hover:bg-blue-50 transition-all flex items-center justify-center gap-2 font-semibold"
                      >
                        <Plus className="w-5 h-5" />
                        Add another experience
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Education Section */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
              <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center">
                      <GraduationCap className="w-5 h-5 text-orange-600" />
                    </div>
                    <h2 className="text-xl font-bold text-gray-900">Education</h2>
                  </div>
                  {editingSection === 'education' ? (
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
                      onClick={() => {
                        setEditingSection('education');
                        if (profile.education.length === 0) {
                          handleAddEducation();
                        }
                      }}
                      className="px-4 py-2 rounded-full border border-gray-200 text-gray-700 text-sm font-semibold hover:bg-gray-100 transition-colors flex items-center gap-2"
                    >
                      <Plus className="w-4 h-4" />
                      Add
                    </button>
                  )}
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
                      className="text-blue-600 hover:text-blue-700 text-sm font-semibold"
                    >
                      Add your first education
                    </button>
                  </div>
                ) : (
                  <div className="space-y-8">
                    {profile.education.map((edu, index) => (
                      <div key={edu.id} className={`${index !== profile.education.length - 1 ? 'pb-8 border-b border-gray-100' : ''}`}>
                        {editingSection === 'education' ? (
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
                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 transition-all"
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
                                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 transition-all"
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
                                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 transition-all"
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
                                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 transition-all"
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
                                    className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 transition-all disabled:bg-gray-50 disabled:text-gray-500"
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
                                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
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
                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 transition-all"
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
                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none text-gray-900 transition-all"
                                placeholder="e.g. Dean's List, Student Council, Sports Team"
                              />
                            </div>
                            <button
                              onClick={() => handleRemoveEducation(edu.id)}
                              className="text-sm text-red-600 hover:text-red-700 font-semibold flex items-center gap-2"
                            >
                              <Trash2 className="w-4 h-4" />
                              Remove
                            </button>
                          </div>
                        ) : (
                          <div className="flex gap-4">
                            <div className="flex-shrink-0">
                              <div className="w-14 h-14 bg-gradient-to-br from-orange-100 to-orange-200 rounded-xl flex items-center justify-center shadow-md">
                                <GraduationCap className="w-7 h-7 text-orange-600" />
                              </div>
                            </div>
                            <div className="flex-1">
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
                          </div>
                        )}
                      </div>
                    ))}
                    {editingSection === 'education' && (
                      <button
                        onClick={handleAddEducation}
                        className="w-full py-4 border-2 border-dashed border-gray-300 rounded-xl text-gray-600 hover:border-blue-500 hover:text-blue-600 hover:bg-blue-50 transition-all flex items-center justify-center gap-2 font-semibold"
                      >
                        <Plus className="w-5 h-5" />
                        Add another education
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Founder Journey */}
            <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl shadow-lg border border-purple-100 overflow-hidden">
              <div className="p-6 border-b border-purple-200">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-purple-600 rounded-xl flex items-center justify-center">
                    <Rocket className="w-5 h-5 text-white" />
                  </div>
                  <h2 className="text-xl font-bold text-gray-900">Founder Journey</h2>
                </div>
                <button
                  onClick={() => {
                    if (editingSection === 'founder') {
                      handleSave();
                    } else {
                      setEditingSection('founder');
                    }
                  }}
                  className="absolute top-6 right-6 p-2 hover:bg-white/50 rounded-lg transition-colors"
                >
                  {editingSection === 'founder' ? (
                    <span className="text-sm font-semibold text-blue-600">Save</span>
                  ) : (
                    <Pencil className="w-5 h-5 text-gray-600" />
                  )}
                </button>
              </div>
              <div className="p-6 space-y-6">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Target className="w-4 h-4 text-purple-600" />
                    <label className="text-sm font-semibold text-gray-700">My Vision</label>
                  </div>
                  {editingSection === 'founder' ? (
                    <textarea
                      value={profile.founderJourney.vision}
                      onChange={(e) => setProfile(prev => ({ ...prev, founderJourney: { ...prev.founderJourney, vision: e.target.value } }))}
                      rows={3}
                      className="w-full px-4 py-3 border-2 border-purple-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 resize-none text-gray-900 transition-all bg-white"
                      placeholder="Your vision..."
                    />
                  ) : (
                    <p className="text-gray-700 text-sm leading-relaxed">{profile.founderJourney.vision || 'No vision set'}</p>
                  )}
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Zap className="w-4 h-4 text-purple-600" />
                    <label className="text-sm font-semibold text-gray-700">My Purpose</label>
                  </div>
                  {editingSection === 'founder' ? (
                    <input
                      type="text"
                      value={profile.founderJourney.purpose}
                      onChange={(e) => setProfile(prev => ({ ...prev, founderJourney: { ...prev.founderJourney, purpose: e.target.value } }))}
                      className="w-full px-4 py-3 border-2 border-purple-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-gray-900 transition-all bg-white"
                      placeholder="e.g., Find A Co-founder"
                    />
                  ) : (
                    <p className="text-gray-900 font-semibold">{profile.founderJourney.purpose || 'Not specified'}</p>
                  )}
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Heart className="w-4 h-4 text-purple-600" />
                    <label className="text-sm font-semibold text-gray-700">My Values</label>
                  </div>
                  {editingSection === 'founder' ? (
                    <div className="space-y-3">
                      <div className="flex flex-wrap gap-2">
                        {profile.founderJourney.values.map((value, idx) => (
                          <span key={idx} className="inline-flex items-center gap-2 px-3 py-1.5 bg-purple-600 text-white rounded-lg text-xs font-semibold">
                            {value}
                            <button onClick={() => {
                              setProfile(prev => ({
                                ...prev,
                                founderJourney: {
                                  ...prev.founderJourney,
                                  values: prev.founderJourney.values.filter(v => v !== value)
                                }
                              }));
                            }} className="hover:bg-white/20 rounded-full p-0.5">
                              <X className="w-3 h-3" />
                            </button>
                          </span>
                        ))}
                      </div>
                      <input
                        type="text"
                        onKeyPress={(e) => {
                          if (e.key === 'Enter' && e.target.value.trim()) {
                            const value = e.target.value.trim();
                            if (!profile.founderJourney.values.includes(value)) {
                              setProfile(prev => ({
                                ...prev,
                                founderJourney: {
                                  ...prev.founderJourney,
                                  values: [...prev.founderJourney.values, value]
                                }
                              }));
                            }
                            e.target.value = '';
                          }
                        }}
                        placeholder="Type a value and press Enter"
                        className="w-full px-4 py-2.5 border-2 border-purple-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-sm transition-all bg-white"
                      />
                    </div>
                  ) : (
                    <div className="flex flex-wrap gap-2">
                      {profile.founderJourney.values.length > 0 ? (
                        profile.founderJourney.values.map((value, idx) => (
                          <span key={idx} className="px-3 py-1.5 bg-purple-600 text-white rounded-lg text-xs font-semibold">
                            {value}
                          </span>
                        ))
                      ) : (
                        <p className="text-gray-400 text-sm italic">No values added</p>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Marketplace Profile */}
            {profile.marketplace.workAreas.length > 0 || profile.marketplace.services.length > 0 || profile.marketplace.rate ? (
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                      <DollarSign className="w-5 h-5 text-green-600" />
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
                          <span key={idx} className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium">
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
                          <span key={idx} className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium">
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
                    <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                      <Mail className="w-5 h-5 text-blue-600" />
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
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                      <input
                        type="email"
                        value={profile.basic.email}
                        onChange={(e) => setProfile(prev => ({ ...prev, basic: { ...prev.basic, email: e.target.value } }))}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Website</label>
                      <input
                        type="text"
                        value={profile.basic.website}
                        onChange={(e) => setProfile(prev => ({ ...prev, basic: { ...prev.basic, website: e.target.value } }))}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 transition-all"
                        placeholder="yourwebsite.com"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">LinkedIn</label>
                      <input
                        type="text"
                        value={profile.basic.linkedin}
                        onChange={(e) => setProfile(prev => ({ ...prev, basic: { ...prev.basic, linkedin: e.target.value } }))}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 transition-all"
                        placeholder="linkedin.com/in/username"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Twitter</label>
                      <input
                        type="text"
                        value={profile.basic.twitter}
                        onChange={(e) => setProfile(prev => ({ ...prev, basic: { ...prev.basic, twitter: e.target.value } }))}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 transition-all"
                        placeholder="@username"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Instagram</label>
                      <input
                        type="text"
                        value={profile.basic.instagram}
                        onChange={(e) => setProfile(prev => ({ ...prev, basic: { ...prev.basic, instagram: e.target.value } }))}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 transition-all"
                        placeholder="@username"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {profile.basic.phone && (
                      <a href={`tel:${profile.basic.phone}`} className="flex items-center gap-3 text-gray-700 hover:text-blue-600 transition-colors group">
                        <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center group-hover:bg-blue-100 transition-colors">
                          <Phone className="w-5 h-5 text-gray-600 group-hover:text-blue-600" />
                        </div>
                        <span className="font-medium">{profile.basic.phone}</span>
                      </a>
                    )}
                    {profile.basic.email && (
                      <a href={`mailto:${profile.basic.email}`} className="flex items-center gap-3 text-gray-700 hover:text-blue-600 transition-colors group">
                        <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center group-hover:bg-blue-100 transition-colors">
                          <Mail className="w-5 h-5 text-gray-600 group-hover:text-blue-600" />
                        </div>
                        <span className="font-medium">{profile.basic.email}</span>
                      </a>
                    )}
                    {profile.basic.website && (
                      <a href={`https://${profile.basic.website}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-gray-700 hover:text-blue-600 transition-colors group">
                        <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center group-hover:bg-blue-100 transition-colors">
                          <Globe className="w-5 h-5 text-gray-600 group-hover:text-blue-600" />
                        </div>
                        <span className="font-medium">{profile.basic.website}</span>
                        <ExternalLink className="w-4 h-4 text-gray-400" />
                      </a>
                    )}
                    {profile.basic.linkedin && (
                      <a href={`https://${profile.basic.linkedin}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-gray-700 hover:text-blue-600 transition-colors group">
                        <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center group-hover:bg-blue-100 transition-colors">
                          <Linkedin className="w-5 h-5 text-gray-600 group-hover:text-blue-600" />
                        </div>
                        <span className="font-medium">{profile.basic.linkedin}</span>
                        <ExternalLink className="w-4 h-4 text-gray-400" />
                      </a>
                    )}
                    {profile.basic.twitter && (
                      <a href={`https://twitter.com/${profile.basic.twitter.replace('@', '')}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-gray-700 hover:text-blue-600 transition-colors group">
                        <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center group-hover:bg-blue-100 transition-colors">
                          <Twitter className="w-5 h-5 text-gray-600 group-hover:text-blue-600" />
                        </div>
                        <span className="font-medium">{profile.basic.twitter}</span>
                        <ExternalLink className="w-4 h-4 text-gray-400" />
                      </a>
                    )}
                    {profile.basic.instagram && (
                      <a href={`https://instagram.com/${profile.basic.instagram.replace('@', '')}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-gray-700 hover:text-blue-600 transition-colors group">
                        <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center group-hover:bg-blue-100 transition-colors">
                          <Instagram className="w-5 h-5 text-gray-600 group-hover:text-blue-600" />
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
