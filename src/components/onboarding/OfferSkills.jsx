import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowRight,
  ArrowLeft,
  Briefcase,
  Star,
  DollarSign,
  Clock,
  MapPin,
  Sparkles,
  Loader2
} from 'lucide-react';
import { authAPI } from '../../services/api';

const OfferSkills = () => {
  const [preferences, setPreferences] = useState({
    availability: '',
    hourlyRate: '',
    workType: [],
    industries: [],
    location: '',
    projectDuration: ''
  });

  // State for API options
  const [options, setOptions] = useState({
    workTypes: [],
    industries: [],
    hourlyRates: [],
    availabilities: [],
    locationPreferences: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  // Fetch options from API on mount
  useEffect(() => {
    const fetchOptions = async () => {
      try {
        setLoading(true);
        const response = await authAPI.getOnboardingOptions();
        const data = response.data;
        
        setOptions({
          workTypes: data.work_types || [],
          industries: data.industries || [],
          hourlyRates: data.hourly_rates || [],
          availabilities: data.availabilities || [],
          locationPreferences: data.location_preferences || []
        });
        setError(null);
      } catch (err) {
        console.error('Failed to fetch options:', err);
        setError('Failed to load options. Using defaults.');
        // Fallback to hardcoded values if API fails
        setOptions({
          workTypes: [
            { id: 1, work_type_id: 'product_development', name: 'Product Development' },
            { id: 2, work_type_id: 'consulting', name: 'Consulting' },
            { id: 3, work_type_id: 'design_work', name: 'Design Work' },
            { id: 4, work_type_id: 'marketing_campaign', name: 'Marketing Campaign' },
            { id: 5, work_type_id: 'technical_architecture', name: 'Technical Architecture' },
            { id: 6, work_type_id: 'mvp_building', name: 'MVP Building' },
            { id: 7, work_type_id: 'growth_strategy', name: 'Growth Strategy' },
            { id: 8, work_type_id: 'fundraising_support', name: 'Fundraising Support' }
          ],
          industries: [
            { id: 1, name: 'Technology' },
            { id: 2, name: 'Healthcare' },
            { id: 3, name: 'Fintech' },
            { id: 4, name: 'E-commerce' },
            { id: 5, name: 'Education' },
            { id: 6, name: 'SaaS' },
            { id: 7, name: 'AI/ML' },
            { id: 8, name: 'Blockchain' },
            { id: 9, name: 'Real Estate' },
            { id: 10, name: 'Food & Beverage' }
          ],
          hourlyRates: [
            { id: 1, rate_id: '25-50', name: '$25-50/hr' },
            { id: 2, rate_id: '50-100', name: '$50-100/hr' },
            { id: 3, rate_id: '100-150', name: '$100-150/hr' },
            { id: 4, rate_id: '150-200', name: '$150-200/hr' },
            { id: 5, rate_id: '200+', name: '$200+/hr' },
            { id: 6, rate_id: 'equity', name: 'Equity only' }
          ],
          availabilities: [
            { id: 1, availability_id: 'full-time', name: 'Full-Time (40+ hrs/week)' },
            { id: 2, availability_id: 'part-time', name: 'Part-Time (20-30 hrs/week)' },
            { id: 3, availability_id: 'flexible', name: 'Flexible (10-20 hrs/week)' },
            { id: 4, availability_id: 'weekends', name: 'Weekends Only' }
          ],
          locationPreferences: [
            { id: 1, location_id: 'remote', name: 'Remote Only' },
            { id: 2, location_id: 'hybrid', name: 'Hybrid' },
            { id: 3, location_id: 'onsite', name: 'On-site' }
          ]
        });
      } finally {
        setLoading(false);
      }
    };

    fetchOptions();
  }, []);

  const handleContinue = async () => {
    try {
      // Save to localStorage
      localStorage.setItem('offerSkillsPreferences', JSON.stringify(preferences));
      
      // Save to backend and mark onboarding as complete
      await authAPI.completeOnboarding({
        offer_skills_data: preferences,
        onboarding_complete: true
      });
      
      // Clear onboarding data from localStorage
      const keysToRemove = ['userRole', 'userStage', 'userMask', 'birthPlace', 'whyHere', 
                            'selectedValues', 'selectedIntent', 'yourIndustries', 'yourSkills', 
                            'yourExperience', 'yourBackground', 'yourSelf', 'hasVoiceNote',
                            'pitchDeckFileName', 'pitchDeckFileSize', 'offerSkillsPreferences'];
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

  const handleWorkTypeToggle = (type) => {
    setPreferences(prev => ({
      ...prev,
      workType: prev.workType.includes(type)
        ? prev.workType.filter(t => t !== type)
        : [...prev.workType, type]
    }));
  };

  const handleIndustryToggle = (industry) => {
    setPreferences(prev => ({
      ...prev,
      industries: prev.industries.includes(industry)
        ? prev.industries.filter(i => i !== industry)
        : [...prev.industries, industry]
    }));
  };

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-gray-400 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading options...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="w-full max-w-5xl">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 bg-gray-50 px-6 py-3 rounded-full mb-6 border border-gray-200">
            <Sparkles className="w-6 h-6 text-gray-700" />
            <span className="text-gray-700 font-medium">Offer Your Skills</span>
          </div>
          <h2 className="text-4xl font-normal text-gray-900 mb-4">Your Service Preferences</h2>
          <p className="text-gray-600 text-xl max-w-3xl mx-auto">Help startups find you for the right projects</p>
          {error && (
            <p className="text-amber-600 text-sm mt-2">{error}</p>
          )}
        </div>

        <div className="bg-white rounded-3xl shadow-sm border border-gray-200 p-8">
          <div className="space-y-8">
            {/* Work Type */}
            <div>
              <label className="block text-gray-900 font-semibold mb-4 flex items-center gap-3">
                <div className="w-8 h-8 bg-gray-50 rounded-xl flex items-center justify-center border border-gray-200">
                  <Briefcase className="w-5 h-5 text-gray-700" />
                </div>
                Type of Work You Offer
              </label>
              <p className="text-gray-600 text-sm mb-4">Select all services you can provide</p>
              <div className="flex flex-wrap gap-3">
                {options.workTypes.map(type => (
                  <button
                    key={type.id || type.work_type_id}
                    onClick={() => handleWorkTypeToggle(type.name)}
                    className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                      preferences.workType.includes(type.name)
                        ? 'bg-gray-900 text-white'
                        : 'bg-white text-gray-700 border border-gray-300 hover:border-gray-400 hover:bg-gray-50'
                    }`}
                  >
                    {type.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Industries */}
            <div>
              <label className="block text-gray-900 font-semibold mb-4 flex items-center gap-3">
                <div className="w-8 h-8 bg-gray-50 rounded-xl flex items-center justify-center border border-gray-200">
                  <Star className="w-5 h-5 text-gray-700" />
                </div>
                Preferred Industries
              </label>
              <p className="text-gray-600 text-sm mb-4">Which industries do you want to work with?</p>
              <div className="flex flex-wrap gap-3">
                {options.industries.map(industry => (
                  <button
                    key={industry.id}
                    onClick={() => handleIndustryToggle(industry.name)}
                    className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                      preferences.industries.includes(industry.name)
                        ? 'bg-gray-900 text-white'
                        : 'bg-white text-gray-700 border border-gray-300 hover:border-gray-400 hover:bg-gray-50'
                    }`}
                  >
                    {industry.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Grid Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div>
                <label className="block text-gray-900 font-semibold mb-3 flex items-center gap-2">
                  <DollarSign className="w-5 h-5 text-gray-700" />
                  Hourly Rate
                </label>
                <select
                  value={preferences.hourlyRate}
                  onChange={(e) => setPreferences(prev => ({...prev, hourlyRate: e.target.value}))}
                  className="w-full p-4 bg-white border border-gray-300 rounded-xl text-gray-900 focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                >
                  <option value="">Select rate</option>
                  {options.hourlyRates.map(rate => (
                    <option key={rate.id || rate.rate_id} value={rate.rate_id}>
                      {rate.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-gray-900 font-semibold mb-3 flex items-center gap-2">
                  <Clock className="w-5 h-5 text-gray-700" />
                  Availability
                </label>
                <select
                  value={preferences.availability}
                  onChange={(e) => setPreferences(prev => ({...prev, availability: e.target.value}))}
                  className="w-full p-4 bg-white border border-gray-300 rounded-xl text-gray-900 focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                >
                  <option value="">Select availability</option>
                  {options.availabilities.map(avail => (
                    <option key={avail.id || avail.availability_id} value={avail.availability_id}>
                      {avail.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-gray-900 font-semibold mb-3 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-gray-700" />
                  Location
                </label>
                <select
                  value={preferences.location}
                  onChange={(e) => setPreferences(prev => ({...prev, location: e.target.value}))}
                  className="w-full p-4 bg-white border border-gray-300 rounded-xl text-gray-900 focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                >
                  <option value="">Select location</option>
                  {options.locationPreferences.map(loc => (
                    <option key={loc.id || loc.location_id} value={loc.location_id}>
                      {loc.name}
                    </option>
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
      </div>
    </div>
  );
};

export default OfferSkills;

