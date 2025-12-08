import React, { useState } from 'react';
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
  X
} from 'lucide-react';

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
    commitment: ''
  });

  const navigate = useNavigate();

  const handleContinue = () => {
    localStorage.setItem('cofounderPreferences', JSON.stringify(cofounderPreferences));
    localStorage.setItem('pitchText', pitchText);
    localStorage.setItem('pitchFormat', pitchFormat);
    navigate('/home');
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

  const handleIndustrySelect = (e) => {
    const value = e.target.value;
    if (value && !cofounderPreferences.industry.includes(value)) {
      setCofounderPreferences(prev => ({
        ...prev,
        industry: [...prev.industry, value]
      }));
    }
    e.target.value = '';
  };

  const handleSkillSelect = (e) => {
    const value = e.target.value;
    if (value && !cofounderPreferences.skills.includes(value)) {
      setCofounderPreferences(prev => ({
        ...prev,
        skills: [...prev.skills, value]
      }));
    }
    e.target.value = '';
  };

  const skillsOptions = [
    'Technical Development', 'Product Management', 'Marketing', 'Sales', 
    'Operations', 'Finance', 'Design', 'Business Strategy', 'Fundraising',
    'Legal', 'HR', 'Data Analysis', 'AI/ML', 'Blockchain', 'Mobile Development'
  ];

  const industryOptions = [
    'Technology', 'Healthcare', 'Fintech', 'E-commerce', 'Education',
    'Real Estate', 'Food & Beverage', 'Transportation', 'Energy', 'Entertainment',
    'Manufacturing', 'Retail', 'Travel', 'Sports', 'Gaming'
  ];

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
                  <option value="technical">Technical Co-founder</option>
                  <option value="business">Business Co-founder</option>
                  <option value="marketing">Marketing Co-founder</option>
                  <option value="operations">Operations Co-founder</option>
                  <option value="finance">Finance Co-founder</option>
                  <option value="design">Design Co-founder</option>
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
                  <option value="entry">Entry Level (0-2 years)</option>
                  <option value="mid">Mid Level (3-5 years)</option>
              <option value="senior">Senior Level (6-10 years)</option>
              <option value="executive">Executive Level (10+ years)</option>
            </select>
          </div>

        </div>

            {/* Industry & Skills - Two Columns */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
                <label className="block text-gray-900 font-semibold mb-4 flex items-center gap-3">
                  <div className="w-8 h-8 bg-gray-200 rounded-xl flex items-center justify-center">
                    <Briefcase className="w-5 h-5 text-gray-700" />
                  </div>
                  Industry Focus
                </label>
                <p className="text-gray-600 text-sm mb-4">Choose the industries your cofounder should have experience in</p>
                <select
                  onChange={handleIndustrySelect}
                  className="w-full mb-4 p-4 bg-white border border-gray-300 rounded-xl text-gray-900 focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all"
                >
                  <option value="">Select industries</option>
                  {industryOptions
                    .filter(industry => !cofounderPreferences.industry.includes(industry))
                    .map(industry => (
                      <option key={industry} value={industry}>{industry}</option>
                  ))}
                </select>
                {cofounderPreferences.industry.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {cofounderPreferences.industry.map(industry => (
                      <span
                        key={industry}
                        className="inline-flex items-center gap-2 px-3 py-2 bg-gray-900 text-white rounded-xl text-sm font-medium"
                      >
                        {industry}
                        <button
                          onClick={() => handleIndustryToggle(industry)}
                          className="hover:bg-white/20 rounded-full p-0.5 transition-colors"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
                <label className="block text-gray-900 font-semibold mb-4 flex items-center gap-3">
                  <div className="w-8 h-8 bg-gray-200 rounded-xl flex items-center justify-center">
                    <Star className="w-5 h-5 text-gray-700" />
                  </div>
                  Required Skills
                </label>
                <p className="text-gray-600 text-sm mb-4">Select the skills your ideal cofounder should have</p>
                <select
                  onChange={handleSkillSelect}
                  className="w-full mb-4 p-4 bg-white border border-gray-300 rounded-xl text-gray-900 focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all"
                >
                  <option value="">Select skills</option>
                  {skillsOptions
                    .filter(skill => !cofounderPreferences.skills.includes(skill))
                    .map(skill => (
                      <option key={skill} value={skill}>{skill}</option>
                  ))}
                </select>
                {cofounderPreferences.skills.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {cofounderPreferences.skills.map(skill => (
                      <span
                        key={skill}
                        className="inline-flex items-center gap-2 px-3 py-2 bg-gray-900 text-white rounded-xl text-sm font-medium"
                      >
                        {skill}
                        <button
                          onClick={() => handleSkillToggle(skill)}
                          className="hover:bg-white/20 rounded-full p-0.5 transition-colors"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Preferences Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                  <option value="remote-first">Remote-first</option>
                  <option value="hybrid">Hybrid</option>
                  <option value="office-based">Office-based</option>
                  <option value="flexible">Flexible hours</option>
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
                  <option value="full-time">Full-Time (40+ hrs/week)</option>
                  <option value="part-time">Part-Time (20-30 hrs/week)</option>
                  <option value="flexible">Flexible (10-20 hrs/week)</option>
                  <option value="weekends">Weekends Only</option>
                  <option value="evenings">Evenings Only</option>
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
                  <option value="same-city">Same City</option>
                  <option value="same-country">Same Country</option>
                  <option value="remote">Remote OK</option>
                  <option value="anywhere">Anywhere</option>
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
