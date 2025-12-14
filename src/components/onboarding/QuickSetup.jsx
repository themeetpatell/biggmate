import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowRight, 
  ArrowLeft, 
  CheckCircle, 
  Mic,
  Play,
  Pause,
  X,
} from 'lucide-react';

const QuickSetup = () => {
  const [startupTitle, setStartupTitle] = useState('');
  const [startupStage, setStartupStage] = useState('');
  const [startupOneliner, setStartupOneliner] = useState('');
  const [selectedValues, setSelectedValues] = useState([]);
  const [selectedIntent, setSelectedIntent] = useState('find-cofounder');
  const [isRecording, setIsRecording] = useState(false);
  const [hasVoiceNote, setHasVoiceNote] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [yourIndustries, setYourIndustries] = useState([]);
  const [yourSkills, setYourSkills] = useState([]);
  const [yourExperience, setYourExperience] = useState('');
  const [founderRole, setFounderRole] = useState('');
  const [location, setLocation] = useState('');
  const [yourSelf, setYourSelf] = useState('');
  const navigate = useNavigate();

  // Set default role values if not already set
  React.useEffect(() => {
    if (!localStorage.getItem('userRole')) {
      localStorage.setItem('userRole', 'founder');
    }
    if (!localStorage.getItem('userStage')) {
      localStorage.setItem('userStage', 'idea-stage');
    }
    if (!localStorage.getItem('userMask')) {
      localStorage.setItem('userMask', 'rocket');
    }
  }, []);

  const valueGroups = [
    {
      category: 'Cultural Drives',
      values: [
        { id: 'community', name: 'Community-First' },
        { id: 'diversity', name: 'Diversity & Inclusion' },
        { id: 'craft', name: 'Craftsmanship' },
        { id: 'ethics', name: 'Ethical Impact' },
        { id: 'global', name: 'Global Mindset' },
        { id: 'sustainability', name: 'Sustainability' },
        { id: 'ownership', name: 'Extreme Ownership' },
        { id: 'velocity', name: 'Bias for Action' },
        { id: 'focus', name: 'Customer Obsession' },
        { id: 'candor', name: 'Radical Candor' }
      ]
    },
    {
      category: 'Technical Drives',
      values: [
        { id: 'innovation', name: 'Innovation' },
        { id: 'problem-solving', name: 'Problem Solving' },
        { id: 'data', name: 'Data-Driven' },
        { id: 'automation', name: 'Automation' },
        { id: 'scalability', name: 'Scalability' },
        { id: 'experimentation', name: 'Experimentation' },
        { id: 'security', name: 'Security Minded' },
        { id: 'reliability', name: 'Reliability' },
        { id: 'performance', name: 'Performance' },
        { id: 'ai-native', name: 'AI-Native' }
      ]
    },
    {
      category: 'Personal Drives',
      values: [
        { id: 'autonomy', name: 'Autonomy' },
        { id: 'learning', name: 'Continuous Learning' },
        { id: 'leadership', name: 'Leadership' },
        { id: 'resilience', name: 'Resilience' },
        { id: 'balance', name: 'Life Balance' },
        { id: 'curiosity', name: 'Curiosity' },
        { id: 'grit', name: 'Grit' },
        { id: 'optimism', name: 'Optimism' },
        { id: 'ownership-mindset', name: 'Owner Mindset' },
        { id: 'adaptability', name: 'Adaptability' }
      ]
    }
  ];

  // Single-intent flow retained for compatibility; intent is preset elsewhere
  const intents = [];

  const founderRoles = [
    'Solo Founder',
    'Technical Founder',
    'Business/Non-Technical Founder',
    'Product Founder',
    'Growth/Marketing Founder',
    'Operations/Finance Founder',
    'Domain Expert',
    'Student Founder',
    'Repeat Founder',
    'Operator-turning-Founder'
  ];

  const locationOptions = [
    'Bengaluru, India',
    'Mumbai, India',
    'Delhi NCR, India',
    'Hyderabad, India',
    'Chennai, India',
    'Kolkata, India',
    'Pune, India',
    'Ahmedabad, India',
    'Gurugram, India',
    'Noida, India',
    'Chandigarh, India',
    'Jaipur, India',
    'Indore, India',
    'Surat, India',
    'Nagpur, India',
    'Kochi, India',
    'Coimbatore, India',
    'Lucknow, India',
    'Bhopal, India',
    'Vadodara, India',
    'Visakhapatnam, India',
    'Patna, India',
    'Bhubaneswar, India',
    'Thiruvananthapuram, India',
    'Mysuru, India',
    'Kanpur, India',
    'Nashik, India',
    'Vijayawada, India',
    'Rajkot, India',
    'Madurai, India',
    'Tiruchirappalli, India',
    'Agra, India',
    'Dehradun, India',
    'Jodhpur, India',
    'Aurangabad, India',
    'Meerut, India',
    'Guwahati, India',
    'Jamshedpur, India',
    'Ranchi, India',
    'Ludhiana, India',
    'Goa, India',
    'Dubai, UAE',
    'Abu Dhabi, UAE',
    'Sharjah, UAE',
    'Ajman, UAE',
    'Ras Al Khaimah, UAE',
    'Fujairah, UAE',
    'Al Ain, UAE'
  ];

  const handleValueToggle = (valueId) => {
    setIsAnimating(true);
    if (selectedValues.includes(valueId)) {
      setSelectedValues(selectedValues.filter(id => id !== valueId));
    } else if (selectedValues.length < 6) {
      setSelectedValues([...selectedValues, valueId]);
    }
    setTimeout(() => setIsAnimating(false), 200);
  };

  const handleIntentSelect = (intentId) => {
    setIsAnimating(true);
    setSelectedIntent(intentId);
    setTimeout(() => setIsAnimating(false), 200);
  };

  const handleVoiceRecord = () => {
    setIsRecording(!isRecording);
    if (!isRecording) {
      // Simulate recording
      setTimeout(() => {
        setIsRecording(false);
        setHasVoiceNote(true);
      }, 3000);
    }
  };

  const handleYourIndustryToggle = (industry) => {
    setYourIndustries(prev =>
      prev.includes(industry) ? prev.filter(i => i !== industry) : [...prev, industry]
    );
  };

  const handleYourSkillToggle = (skill) => {
    setYourSkills(prev =>
      prev.includes(skill) ? prev.filter(s => s !== skill) : [...prev, skill]
    );
  };

  const handleIndustrySelect = (e) => {
    const value = e.target.value;
    if (value && !yourIndustries.includes(value)) {
      setYourIndustries(prev => [...prev, value]);
    }
    e.target.value = '';
  };

  const handleSkillSelect = (e) => {
    const value = e.target.value;
    if (value && !yourSkills.includes(value)) {
      setYourSkills(prev => [...prev, value]);
    }
    e.target.value = '';
  };

  const removeIndustry = (industry) => {
    setYourIndustries(prev => prev.filter(i => i !== industry));
  };

  const removeSkill = (skill) => {
    setYourSkills(prev => prev.filter(s => s !== skill));
  };

  const handleContinue = () => {
    const requiresVision = true;

    if (requiresVision && (!startupTitle.trim() || !startupStage || !startupOneliner.trim())) {
      alert('Please add your title, stage, and one-liner');
      return;
    }
    if (yourIndustries.length === 0) {
      alert('Please add at least one industry');
      return;
    }
    if (!yourSelf.trim()) {
      alert('Please describe yourself');
      return;
    }
    if (yourSkills.length === 0) {
      alert('Please add at least one skill');
      return;
    }
    if (!yourExperience) {
      alert('Please select your experience level');
      return;
    }
    if (!founderRole) {
      alert('Please select your founder role');
      return;
    }
    if (!location) {
      alert('Please select your location');
      return;
    }
    if (selectedValues.length === 0) {
      alert('Please select at least one value that drives you');
      return;
    }
    localStorage.setItem('startupTitle', startupTitle);
    localStorage.setItem('startupStage', startupStage);
    localStorage.setItem('startupOneliner', startupOneliner);
    localStorage.setItem('whyHere', startupOneliner);
    localStorage.setItem('openCreatePitch', 'true');
    localStorage.setItem('selectedValues', JSON.stringify(selectedValues));
    localStorage.setItem('selectedIntent', selectedIntent);
    localStorage.setItem('yourIndustries', JSON.stringify(yourIndustries));
    localStorage.setItem('yourSkills', JSON.stringify(yourSkills));
    localStorage.setItem('yourExperience', yourExperience);
    localStorage.setItem('founderRole', founderRole);
    localStorage.setItem('location', location);
    localStorage.setItem('yourSelf', yourSelf);
    if (hasVoiceNote) {
      localStorage.setItem('hasVoiceNote', 'true');
    }
    
    navigate('/home');
  };

  const handleBack = () => {
    navigate('/home');
  };

  const requiresVision = true;
  const isComplete = 
    (!requiresVision || (startupTitle.trim() && startupStage && startupOneliner.trim())) &&
    yourIndustries.length > 0 &&
    yourSelf.trim() &&
    yourSkills.length > 0 &&
    yourExperience &&
    founderRole &&
    location &&
    selectedValues.length >= 6;
  const ctaLabel = 'Post my startup idea';

  return (
    <>
      <style jsx>{`
        @keyframes bubbleFloat {
          0% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(-10px) scale(1.05); }
          100% { transform: translateY(0px) scale(1); }
        }
        
        @keyframes bubbleGlow {
          0% { box-shadow: 0 0 5px rgba(255, 255, 255, 0.2); }
          50% { box-shadow: 0 0 20px rgba(255, 255, 255, 0.4); }
          100% { box-shadow: 0 0 5px rgba(255, 255, 255, 0.2); }
        }
        
        .bubble-glow {
          animation: bubbleGlow 3s ease-in-out infinite;
        }
      `}</style>
      <div className="min-h-screen bg-white flex justify-center px-4 py-8 sm:py-12">
        <div className="w-full max-w-4xl space-y-10 sm:space-y-12">
          {/* Header */}
          <div className="text-center space-y-3">
            <span className="inline-flex px-3 py-1 text-xs sm:text-sm font-semibold text-gray-600 uppercase tracking-wide rounded-full border border-gray-200">Profile Basics</span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-normal text-gray-900">Who Are You?</h1>
          </div>

          {/* About Myself */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <p className="text-xs sm:text-sm font-semibold text-gray-500 uppercase tracking-wide">1. About Myself</p>
                <h2 className="text-xl sm:text-2xl font-normal text-gray-900">My Industry, Skills & Experience</h2>
              </div>
              <span className="text-sm text-gray-500">Essentials for matching</span>
            </div>
            <p className="text-gray-600 text-sm sm:text-base">Keep it tight: industry, skills, experience.</p>

            <div className="space-y-8">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">About Myself</h3>
                  <textarea
                    value={yourSelf}
                    onChange={(e) => setYourSelf(e.target.value)}
                    placeholder="Tell cofounders about your professional journey, previous companies, achievements, or relevant experience..."
                    className="w-full h-32 p-4 bg-white border border-gray-300 rounded-2xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent resize-none"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Your Skills */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">My Skills</h3>
                    <p className="text-gray-600 text-sm mb-4">What are you great at? Select all that apply.</p>
                    
                    <select
                      onChange={handleSkillSelect}
                      className="w-full p-4 bg-white border border-gray-300 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent mb-4"
                    >
                      <option value="">+ Add Skill</option>
                      {['Technical Development', 'Product Management', 'Marketing', 'Sales', 'Operations', 'Finance', 
                        'Design', 'Business Strategy', 'Fundraising', 'Legal', 'HR', 'Data Analysis', 'AI/ML', 
                        'Blockchain', 'Mobile Development', 'Backend Development', 'Frontend Development', 'DevOps', 
                        'UX/UI Design', 'Growth Hacking', 'Content Marketing', 'SEO/SEM', 'Social Media', 'PR']
                        .filter(sk => !yourSkills.includes(sk))
                        .map((skill) => (
                          <option key={skill} value={skill}>{skill}</option>
                        ))}
                    </select>

                    {yourSkills.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {yourSkills.map((skill) => (
                          <span
                            key={skill}
                            className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-xl text-sm font-medium"
                          >
                            {skill}
                            <button
                              onClick={() => removeSkill(skill)}
                              className="hover:bg-white/20 rounded-full p-0.5 transition-colors"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                {/* Your Experience Level */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">My Experience Level</h3>
                  <p className="text-gray-600 text-sm mb-4">Years of professional experience.</p>
                  <select
                    value={yourExperience}
                    onChange={(e) => setYourExperience(e.target.value)}
                    className="w-full p-4 bg-white border border-gray-300 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                  >
                    <option value="">Select experience level</option>
                    <option value="entry">Entry Level (0-2 years)</option>
                    <option value="mid">Mid Level (3-5 years)</option>
                    <option value="senior">Senior Level (6-10 years)</option>
                    <option value="executive">Executive (10+ years)</option>
                  </select>
                </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* My Industry */}
                  <div>
                    <div className="mb-4">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">My Industry</h3>
                      <p className="text-gray-600 text-sm">Industries you're having expertise in.</p>
                    </div>
                  
                  <select
                    onChange={handleIndustrySelect}
                    className="w-full p-4 bg-white border border-gray-300 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent mb-4"
                  >
                    <option value="">+ Add Industry</option>
                    {['Technology', 'Healthcare', 'Fintech', 'E-commerce', 'Education', 'SaaS', 'AI/ML', 'Blockchain', 
                      'Real Estate', 'Food & Beverage', 'Transportation', 'Energy', 'Entertainment', 'Manufacturing', 
                      'Retail', 'Media', 'Travel', 'Sports', 'Gaming', 'Fashion']
                      .filter(ind => !yourIndustries.includes(ind))
                      .map((industry) => (
                        <option key={industry} value={industry}>{industry}</option>
                      ))}
                  </select>

                  {yourIndustries.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-6">
                      {yourIndustries.map((industry) => (
                        <span
                          key={industry}
                          className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-xl text-sm font-medium"
                        >
                          {industry}
                          <button
                            onClick={() => removeIndustry(industry)}
                            className="hover:bg-white/20 rounded-full p-0.5 transition-colors"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </span>
                      ))}
                    </div>
                  )}
                  </div>

                  {/* Founder Role */}
                  <div>
                    <div className="mb-4">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">My Founder Role</h3>
                      <p className="text-gray-600 text-sm">How you primarily contribute as a founder.</p>
                    </div>
                    <select
                      value={founderRole}
                      onChange={(e) => setFounderRole(e.target.value)}
                      className="w-full p-4 bg-white border border-gray-300 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                    >
                      <option value="">Select founder role</option>
                      {founderRoles.map((role) => (
                        <option key={role} value={role}>{role}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Location */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">My Location</h3>
                  <p className="text-gray-600 text-sm mb-4">Tier 1 & 2 cities across India and UAE.</p>
                  <select
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full p-4 bg-white border border-gray-300 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                  >
                    <option value="">Select your city</option>
                    {locationOptions.map((city) => (
                      <option key={city} value={city}>{city}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* My Drives */}
          <div className="space-y-6 sm:space-y-8">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                <div>
                  <p className="text-xs sm:text-sm font-semibold text-gray-500 uppercase tracking-wide">2. My Drives</p>
                  <h2 className="text-xl sm:text-2xl font-normal text-gray-900">What keeps you moving?</h2>
                </div>
              <span className={`text-sm font-medium ${selectedValues.length >= 1 ? 'text-gray-900' : 'text-gray-400'}`}>
                {selectedValues.length}/6 selected
              </span>
              </div>
              <p className="text-gray-600 mb-8 text-sm sm:text-base">Choose 1-6 cultural, technical, or personal drives.</p>
            
            <div className="space-y-6">
              {valueGroups.map((group) => (
                <div key={group.category}>
                  <h3 className="text-sm font-medium text-gray-500 mb-3 uppercase tracking-wide">{group.category}</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                    {group.values.map((value) => {
                      const isSelected = selectedValues.includes(value.id);
                      const rank = selectedValues.indexOf(value.id) + 1;
                      const isDisabled = !isSelected && selectedValues.length >= 6;
                      
                      return (
                        <button
                          key={value.id}
                          onClick={() => handleValueToggle(value.id)}
                          disabled={isDisabled}
                        className={`relative px-3 py-2 rounded-xl border-2 transition-all duration-200 hover:scale-102 disabled:opacity-30 disabled:cursor-not-allowed ${
                          isSelected
                            ? 'bg-gray-900 border-gray-900 shadow-md'
                            : 'bg-white border-gray-300 hover:border-gray-400 hover:bg-gray-50'
                        }`}
                      >
                        <div className="flex flex-col items-center justify-center">
                          <h3 className={`font-medium text-xs text-center ${isSelected ? 'text-white' : 'text-gray-900'}`}>
                            {value.name}
                          </h3>
                          {isSelected && (
                            <div className="absolute -top-2 -right-2 w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-md border border-gray-200">
                                <span className="text-gray-900 font-bold text-xs">{rank}</span>
                              </div>
                            )}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

          {/* Share My Vision (conditional) */}
          {requiresVision && (
            <div className="space-y-6 sm:space-y-8">
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
                  <div>
                    <p className="text-xs sm:text-sm font-semibold text-gray-500 uppercase tracking-wide">3. Share My Vision</p>
                    <h2 className="text-xl sm:text-2xl font-normal text-gray-900">What are you building?</h2>
                  </div>
                  <span className="text-sm text-gray-500">Show the big idea</span>
                </div>
                <p className="text-gray-600 text-sm sm:text-base mb-6">Add a quick overview so cofounders know what you’re creating.</p>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-800 mb-1">Startup title</label>
                    <input
                      type="text"
                      value={startupTitle}
                      onChange={(e) => setStartupTitle(e.target.value)}
                      placeholder="e.g., Stellar Labs"
                      className="w-full p-4 bg-white border border-gray-300 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-800 mb-1">Startup stage</label>
                    <select
                      value={startupStage}
                      onChange={(e) => setStartupStage(e.target.value)}
                      className="w-full p-4 bg-white border border-gray-300 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                    >
                      <option value="">Select stage</option>
                      <option value="idea">Idea</option>
                      <option value="mvp">MVP</option>
                      <option value="beta">Beta/Early Users</option>
                      <option value="launched">Launched</option>
                      <option value="scaling">Scaling</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-800 mb-1">One-liner</label>
                    <input
                      type="text"
                      value={startupOneliner}
                      onChange={(e) => setStartupOneliner(e.target.value)}
                      placeholder="In one sentence, what are you building?"
                      className="w-full p-4 bg-white border border-gray-300 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-4 flex-wrap pt-4">
                  <button
                    onClick={handleVoiceRecord}
                    className={`px-6 py-3 rounded-xl font-medium transition-all duration-200 flex items-center gap-2 border shadow-sm ${
                      isRecording
                        ? 'bg-red-50 text-red-700 border-red-700 hover:bg-red-100'
                        : hasVoiceNote
                        ? 'bg-green-50 text-green-700 border-green-700'
                        : 'bg-white text-gray-800 border-gray-300 hover:border-gray-400 hover:bg-gray-50'
                    }`}
                  >
                    {isRecording ? (
                      <>
                        <Pause className="w-5 h-5" />
                        Recording...
                      </>
                    ) : hasVoiceNote ? (
                      <>
                        <CheckCircle className="w-5 h-5" />
                        Voice Note Added
                      </>
                    ) : (
                      <>
                        <Mic className="w-5 h-5" />
                        Record Your Pitch (60s)
                      </>
                    )}
                  </button>
                  
                  {hasVoiceNote && (
                    <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
                      <Play className="w-5 h-5" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6">
            <button
              onClick={handleBack}
              className="w-full sm:w-auto px-6 py-3 bg-white border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-all duration-200 flex items-center justify-center gap-2"
            >
              <ArrowLeft className="w-5 h-5" />
              Back
            </button>

            {isComplete && (
              <button
                onClick={handleContinue}
                className="w-full sm:w-auto px-8 sm:px-12 py-4 bg-gray-900 text-white rounded-2xl hover:bg-black transition-all duration-200 font-medium text-lg shadow-md hover:shadow-lg flex items-center justify-center gap-3"
              >
                <span>{ctaLabel} →</span>
                <ArrowRight className="w-6 h-6" />
              </button>
            )}
          </div>

      </div>
      </div>
    </>
  );
};

export default QuickSetup;
