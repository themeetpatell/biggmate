import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowRight, 
  ArrowLeft, 
  Mic, 
  Play, 
  Pause, 
  RotateCcw,
  Type,
  CheckCircle,
  Star,
  Zap,
  Target,
  Rocket,
  Briefcase,
  MapPin,
  Users,
  TrendingUp,
  DollarSign,
  Clock,
  Calendar
} from 'lucide-react';
import { authAPI } from '../../services/api';

const AnonymousProfileFixed = () => {
  const [pitchText, setPitchText] = useState('');
  const [pitchFormat, setPitchFormat] = useState('text');
  const [isRecording, setIsRecording] = useState(false);
  const [hasVoiceNote, setHasVoiceNote] = useState(false);
  const [cofounderPreferences, setCofounderPreferences] = useState({
    role: '',
    skills: [],
    experience: '',
    location: '',
    industry: [],
    workStyle: '',
    availability: '',
    commitment: ''
  });

  // State for options from backend
  const [skillsOptions, setSkillsOptions] = useState([]);
  const [industryOptions, setIndustryOptions] = useState([]);
  const [experienceLevels, setExperienceLevels] = useState([]);
  const [cofounderRoles, setCofounderRoles] = useState([]);
  const [workStyles, setWorkStyles] = useState([]);
  const [timeCommitments, setTimeCommitments] = useState([]);
  const [availabilities, setAvailabilities] = useState([]);
  const [locationPreferences, setLocationPreferences] = useState([]);
  const [isLoadingOptions, setIsLoadingOptions] = useState(true);

  const navigate = useNavigate();

  // Fetch onboarding options from backend
  useEffect(() => {
    const fetchOnboardingOptions = async () => {
      try {
        setIsLoadingOptions(true);
        const response = await authAPI.getOnboardingOptions();
        const data = response.data;
        
        // Transform and set all options
        setSkillsOptions(data.skills?.map(skill => skill.name) || []);
        setIndustryOptions(data.industries?.map(ind => ind.name) || []);
        setExperienceLevels(data.experience_levels?.map(level => ({
          value: level.level_id,
          label: level.description ? `${level.name} (${level.description})` : level.name
        })) || []);
        setCofounderRoles(data.cofounder_roles?.map(role => ({
          value: role.role_id,
          label: role.name
        })) || []);
        setWorkStyles(data.work_styles?.map(style => ({
          value: style.style_id,
          label: style.name
        })) || []);
        setTimeCommitments(data.time_commitments?.map(commitment => ({
          value: commitment.commitment_id,
          label: commitment.description ? `${commitment.name} (${commitment.description})` : commitment.name
        })) || []);
        setAvailabilities(data.availabilities?.map(avail => ({
          value: avail.availability_id,
          label: avail.name
        })) || []);
        setLocationPreferences(data.location_preferences?.map(loc => ({
          value: loc.location_id,
          label: loc.name
        })) || []);
      } catch (error) {
        console.error('Failed to fetch onboarding options:', error);
        // Fall back to default data if API fails
        setSkillsOptions(defaultSkillsOptions);
        setIndustryOptions(defaultIndustryOptions);
        setExperienceLevels(defaultExperienceLevels);
        setCofounderRoles(defaultCofounderRoles);
        setWorkStyles(defaultWorkStyles);
        setTimeCommitments(defaultTimeCommitments);
        setAvailabilities(defaultAvailabilities);
        setLocationPreferences(defaultLocationPreferences);
      } finally {
        setIsLoadingOptions(false);
      }
    };

    fetchOnboardingOptions();
  }, []);

  // Default fallback data
  const defaultSkillsOptions = [
    'Technical Development', 'Product Management', 'Marketing', 'Sales', 
    'Operations', 'Finance', 'Design', 'Business Strategy', 'Fundraising',
    'Legal', 'HR', 'Data Analysis', 'AI/ML', 'Blockchain', 'Mobile Development'
  ];

  const defaultIndustryOptions = [
    'Technology', 'Healthcare', 'Fintech', 'E-commerce', 'Education',
    'Real Estate', 'Food & Beverage', 'Transportation', 'Energy', 'Entertainment',
    'Manufacturing', 'Retail', 'Travel', 'Sports', 'Gaming'
  ];

  const defaultExperienceLevels = [
    { value: 'entry', label: 'Entry Level (0-2 years)' },
    { value: 'mid', label: 'Mid Level (3-5 years)' },
    { value: 'senior', label: 'Senior Level (6-10 years)' },
    { value: 'executive', label: 'Executive (10+ years)' }
  ];

  const defaultCofounderRoles = [
    { value: 'technical', label: 'Technical Co-founder' },
    { value: 'business', label: 'Business Co-founder' },
    { value: 'marketing', label: 'Marketing Co-founder' },
    { value: 'operations', label: 'Operations Co-founder' },
    { value: 'finance', label: 'Finance Co-founder' },
    { value: 'design', label: 'Design Co-founder' }
  ];

  const defaultWorkStyles = [
    { value: 'remote-first', label: 'Remote-first' },
    { value: 'hybrid', label: 'Hybrid' },
    { value: 'office-based', label: 'Office-based' },
    { value: 'flexible', label: 'Flexible hours' }
  ];

  const defaultTimeCommitments = [
    { value: 'full-time', label: 'Full-Time (40+ hrs/week)' },
    { value: 'part-time', label: 'Part-Time (20-30 hrs/week)' },
    { value: 'flexible', label: 'Flexible (10-20 hrs/week)' },
    { value: 'weekends', label: 'Weekends Only' },
    { value: 'evenings', label: 'Evenings Only' }
  ];

  const defaultAvailabilities = [
    { value: 'immediately', label: 'Immediately' },
    { value: '1-month', label: 'Within 1 month' },
    { value: '3-months', label: 'Within 3 months' },
    { value: '6-months', label: 'Within 6 months' }
  ];

  const defaultLocationPreferences = [
    { value: 'same-city', label: 'Same City' },
    { value: 'same-country', label: 'Same Country' },
    { value: 'remote', label: 'Remote OK' },
    { value: 'anywhere', label: 'Anywhere' }
  ];

  const handleContinue = async () => {
    try {
      // Save to localStorage
      localStorage.setItem('cofounderPreferences', JSON.stringify(cofounderPreferences));
      localStorage.setItem('pitchText', pitchText);
      localStorage.setItem('pitchFormat', pitchFormat);
      
      // Save to backend and mark onboarding as complete
      await authAPI.completeOnboarding({
        pitch_text: pitchText,
        pitch_format: pitchFormat,
        cofounder_preferences: cofounderPreferences,
        onboarding_complete: true
      });
      
      // Clear onboarding data from localStorage
      const keysToRemove = ['userRole', 'userStage', 'userMask', 'birthPlace', 'whyHere', 
                            'selectedValues', 'selectedIntent', 'yourIndustries', 'yourSkills', 
                            'yourExperience', 'yourBackground', 'yourSelf', 'hasVoiceNote',
                            'pitchDeckFileName', 'pitchDeckFileSize', 'cofounderPreferences',
                            'pitchText', 'pitchFormat'];
      keysToRemove.forEach(key => localStorage.removeItem(key));
      
      navigate('/home');
    } catch (error) {
      console.error('Failed to complete onboarding:', error);
      // Still navigate even if save fails
      navigate('/home');
    }
  };

  const handleBack = () => {
    navigate('/onboarding/mission');
  };

  const handleSkillToggle = (skill) => {
    setCofounderPreferences(prev => ({
      ...prev,
      skills: prev.skills.includes(skill) 
        ? prev.skills.filter(s => s !== skill)
        : [...prev.skills, skill]
    }));
  };

  const handleIndustryToggle = (industry) => {
    setCofounderPreferences(prev => ({
      ...prev,
      industry: prev.industry.includes(industry) 
        ? prev.industry.filter(i => i !== industry)
        : [...prev.industry, industry]
    }));
  };

  if (isLoadingOptions) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-gray-900 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading options...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="w-full max-w-6xl">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 bg-gray-50 px-6 py-3 rounded-full mb-6 border border-gray-200">
            <Target className="w-6 h-6 text-gray-700" />
            <span className="text-gray-700 font-medium">Find Your Cofounder</span>
          </div>
          <h2 className="text-4xl font-normal text-gray-900 mb-4">What Cofounder Are You Looking For?</h2>
          <p className="text-gray-600 text-xl max-w-3xl mx-auto">Help us find the perfect cofounder match for your startup</p>
        </div>

        <div className="bg-white rounded-3xl shadow-sm border border-gray-200 p-8">
          <div className="space-y-8">
            {/* Top Section - Role and Skills */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
                <label className="block text-gray-900 font-semibold mb-4 flex items-center gap-3">
                  <div className="w-8 h-8 bg-gray-200 rounded-xl flex items-center justify-center">
                    <Users className="w-5 h-5 text-gray-700" />
                  </div>
                  Preferred Cofounder Role
                </label>
                <select
                  value={cofounderPreferences.role}
                  onChange={(e) => setCofounderPreferences(prev => ({...prev, role: e.target.value}))}
                  className="w-full p-4 bg-white border border-gray-300 rounded-xl text-gray-900 focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all"
                >
                  <option value="">Select role</option>
                  {cofounderRoles.map(role => (
                    <option key={role.value} value={role.value}>{role.label}</option>
                  ))}
                </select>
              </div>

              <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
                <label className="block text-gray-900 font-semibold mb-4 flex items-center gap-3">
                  <div className="w-8 h-8 bg-gray-200 rounded-xl flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-gray-700" />
                  </div>
                  Experience Level
                </label>
                <select
                  value={cofounderPreferences.experience}
                  onChange={(e) => setCofounderPreferences(prev => ({...prev, experience: e.target.value}))}
                  className="w-full p-4 bg-white border border-gray-300 rounded-xl text-gray-900 focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all"
                >
                  <option value="">Select experience level</option>
                  {experienceLevels.map(level => (
                    <option key={level.value} value={level.value}>{level.label}</option>
                  ))}
                </select>
              </div>

            </div>

            {/* Industry Focus - Full Width */}
            <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
              <label className="block text-gray-900 font-semibold mb-4 flex items-center gap-3">
                <div className="w-8 h-8 bg-gray-200 rounded-xl flex items-center justify-center">
                  <Briefcase className="w-5 h-5 text-gray-700" />
                </div>
                Industry Focus
              </label>
              <p className="text-gray-600 text-sm mb-4">Choose the industries your cofounder should have experience in</p>
              <div className="flex flex-wrap gap-3">
                {industryOptions.map(industry => (
                  <button
                    key={industry}
                    onClick={() => handleIndustryToggle(industry)}
                    className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                      cofounderPreferences.industry.includes(industry)
                        ? 'bg-gray-900 text-white'
                        : 'bg-white text-gray-700 border border-gray-300 hover:border-gray-400 hover:bg-gray-50'
                    }`}
                  >
                    {industry}
                  </button>
                ))}
              </div>
            </div>

            {/* Required Skills - Full Width */}
            <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
              <label className="block text-gray-900 font-semibold mb-4 flex items-center gap-3">
                <div className="w-8 h-8 bg-gray-200 rounded-xl flex items-center justify-center">
                  <Star className="w-5 h-5 text-gray-700" />
                </div>
                Required Skills
              </label>
              <p className="text-gray-600 text-sm mb-4">Select the skills your ideal cofounder should have</p>
              <div className="flex flex-wrap gap-3">
                {skillsOptions.map(skill => (
                  <button
                    key={skill}
                    onClick={() => handleSkillToggle(skill)}
                    className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                      cofounderPreferences.skills.includes(skill)
                        ? 'bg-gray-900 text-white'
                        : 'bg-white text-gray-700 border border-gray-300 hover:border-gray-400 hover:bg-gray-50'
                    }`}
                  >
                    {skill}
                  </button>
                ))}
              </div>
            </div>

            {/* Preferences Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
                <label className="block text-gray-900 font-semibold mb-4 flex items-center gap-3">
                  <div className="w-8 h-8 bg-gray-200 rounded-xl flex items-center justify-center">
                    <Clock className="w-5 h-5 text-gray-700" />
                  </div>
                  Work Style
                </label>
                <select
                  value={cofounderPreferences.workStyle}
                  onChange={(e) => setCofounderPreferences(prev => ({...prev, workStyle: e.target.value}))}
                  className="w-full p-4 bg-white border border-gray-300 rounded-xl text-gray-900 focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all"
                >
                  <option value="">Select work style</option>
                  {workStyles.map(style => (
                    <option key={style.value} value={style.value}>{style.label}</option>
                  ))}
                </select>
              </div>

              <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
                <label className="block text-gray-900 font-semibold mb-4 flex items-center gap-3">
                  <div className="w-8 h-8 bg-gray-200 rounded-xl flex items-center justify-center">
                    <Clock className="w-5 h-5 text-gray-700" />
                  </div>
                  Time Commitment
                </label>
                <select
                  value={cofounderPreferences.commitment}
                  onChange={(e) => setCofounderPreferences(prev => ({...prev, commitment: e.target.value}))}
                  className="w-full p-4 bg-white border border-gray-300 rounded-xl text-gray-900 focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all"
                >
                  <option value="">Select commitment</option>
                  {timeCommitments.map(commitment => (
                    <option key={commitment.value} value={commitment.value}>{commitment.label}</option>
                  ))}
                </select>
              </div>

              <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
                <label className="block text-gray-900 font-semibold mb-4 flex items-center gap-3">
                  <div className="w-8 h-8 bg-gray-200 rounded-xl flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-gray-700" />
                  </div>
                  Availability
                </label>
                <select
                  value={cofounderPreferences.availability}
                  onChange={(e) => setCofounderPreferences(prev => ({...prev, availability: e.target.value}))}
                  className="w-full p-4 bg-white border border-gray-300 rounded-xl text-gray-900 focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all"
                >
                  <option value="">Select availability</option>
                  {availabilities.map(avail => (
                    <option key={avail.value} value={avail.value}>{avail.label}</option>
                  ))}
                </select>
              </div>

              <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
                <label className="block text-gray-900 font-semibold mb-4 flex items-center gap-3">
                  <div className="w-8 h-8 bg-gray-200 rounded-xl flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-gray-700" />
                  </div>
                  Location
                </label>
                <select
                  value={cofounderPreferences.location}
                  onChange={(e) => setCofounderPreferences(prev => ({...prev, location: e.target.value}))}
                  className="w-full p-4 bg-white border border-gray-300 rounded-xl text-gray-900 focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all"
                >
                  <option value="">Select location</option>
                  {locationPreferences.map(loc => (
                    <option key={loc.value} value={loc.value}>{loc.label}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between mt-8 pt-8 border-t border-gray-200">
            <button
              onClick={handleBack}
              className="px-6 py-3 bg-white border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-all flex items-center gap-2"
            >
              <ArrowLeft className="w-5 h-5" />
              Back
            </button>
            <button
              onClick={handleContinue}
              className="px-10 py-4 bg-gray-900 text-white rounded-xl hover:bg-black transition-all font-semibold shadow-md hover:shadow-lg flex items-center gap-3"
            >
              <span>Complete Setup →</span>
              <ArrowRight className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="mt-12 flex justify-center">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
            <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
            <div className="w-3 h-3 bg-gray-900 rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnonymousProfileFixed;
