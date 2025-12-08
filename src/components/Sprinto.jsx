import React, { useState, useEffect, useCallback } from 'react';
import { 
  Target, CheckCircle, MessageCircle, Video, Plus, 
  Save, Sparkles, Layout, Code, Trash2, FileText,
  Users, Bug, BarChart3, Calendar, Upload, Download,
  Play, Image, Presentation, Edit, Clock, Flag,
  ChevronDown, Rocket, Loader2, RefreshCw
} from 'lucide-react';
import { sprintoAPI, pitchesAPI } from '../services/api';

const Sprinto = () => {
  const [activeTab, setActiveTab] = useState('ideaframing');
  
  // Pitch Selection State
  const [userPitches, setUserPitches] = useState([]);
  const [selectedPitchId, setSelectedPitchId] = useState(null);
  const [selectedPitch, setSelectedPitch] = useState(null);
  const [loadingPitches, setLoadingPitches] = useState(true);
  const [loadingData, setLoadingData] = useState(false);
  const [savingData, setSavingData] = useState(false);
  const [showPitchDropdown, setShowPitchDropdown] = useState(false);
  const [error, setError] = useState(null);
  const [lastSaved, setLastSaved] = useState(null);
  
  // Default empty states
  const defaultIdeaFraming = {
    ideaNarrative: '',
    problemSolution: { problem: '', solution: '', target: '' },
    valuePropositionCanvas: { gains: [], pains: [], gainCreators: [], painRelievers: [] },
    assumptionsLog: []
  };
  
  const defaultIdeaValidation = {
    marketAnalysis: { tam: 0, sam: 0, som: 0 },
    icpProfile: { demographics: '', psychographics: '', behaviors: '', needs: '' },
    competitors: [],
    userSurveys: [],
    validationScore: { overall: 0, problem: 0, solution: 0, market: 0 },
    keyInsights: []
  };
  
  const defaultFeatureMatrix = {
    painPoints: [],
    featurePriorities: [],
    userStories: [],
    mvpFeatureSet: []
  };
  
  const defaultMVPDevelopment = {
    prd: { productOverview: '', targetUsers: '', keyFeatures: '', successMetrics: '' },
    technicalArchitecture: { frontend: '', backend: '', infrastructure: '', thirdParty: '' },
    userFlows: { primary: '', secondary: '' },
    wireframes: [],
    prototype: { url: '', notes: '' },
    sprintPlans: [],
    taskBoard: { todo: [], inProgress: [], review: [], done: [] },
    devMilestones: []
  };
  
  const defaultMVPTesting = {
    testPlan: { scenarios: [] },
    betaUsers: [],
    bugs: [],
    usabilityResults: [],
    performanceMetrics: { loadTime: 0, apiTime: 0, errorRate: 0 }
  };
  
  const defaultFeedbackBoard = {
    feedbackItems: [],
    featureRequests: [],
    iterationRoadmap: []
  };
  
  const defaultDemoKit = {
    demoVideos: [],
    screenshots: [],
    presentations: []
  };
  
  // Idea Framing State
  const [ideaNarrative, setIdeaNarrative] = useState(defaultIdeaFraming.ideaNarrative);
  const [problemSolution, setProblemSolution] = useState(defaultIdeaFraming.problemSolution);
  const [valuePropositionCanvas, setValuePropositionCanvas] = useState(defaultIdeaFraming.valuePropositionCanvas);
  const [assumptionsLog, setAssumptionsLog] = useState(defaultIdeaFraming.assumptionsLog);
  
  // Idea Validation State
  const [marketAnalysis, setMarketAnalysis] = useState(defaultIdeaValidation.marketAnalysis);
  const [icpProfile, setIcpProfile] = useState(defaultIdeaValidation.icpProfile);
  const [competitors, setCompetitors] = useState(defaultIdeaValidation.competitors);
  const [userSurveys, setUserSurveys] = useState(defaultIdeaValidation.userSurveys);
  const [validationScore, setValidationScore] = useState(defaultIdeaValidation.validationScore);
  const [keyInsights, setKeyInsights] = useState(defaultIdeaValidation.keyInsights);
  
  // Feature Matrix State
  const [painPoints, setPainPoints] = useState(defaultFeatureMatrix.painPoints);
  const [featurePriorities, setFeaturePriorities] = useState(defaultFeatureMatrix.featurePriorities);
  const [userStories, setUserStories] = useState(defaultFeatureMatrix.userStories);
  const [mvpFeatureSet, setMvpFeatureSet] = useState(defaultFeatureMatrix.mvpFeatureSet);
  
  // MVP Development State
  const [prd, setPrd] = useState(defaultMVPDevelopment.prd);
  const [technicalArchitecture, setTechnicalArchitecture] = useState(defaultMVPDevelopment.technicalArchitecture);
  const [userFlows, setUserFlows] = useState(defaultMVPDevelopment.userFlows);
  const [wireframes, setWireframes] = useState(defaultMVPDevelopment.wireframes);
  const [prototype, setPrototype] = useState(defaultMVPDevelopment.prototype);
  const [sprintPlans, setSprintPlans] = useState(defaultMVPDevelopment.sprintPlans);
  const [taskBoard, setTaskBoard] = useState(defaultMVPDevelopment.taskBoard);
  const [devMilestones, setDevMilestones] = useState(defaultMVPDevelopment.devMilestones);
  
  // MVP Testing State
  const [testPlan, setTestPlan] = useState(defaultMVPTesting.testPlan);
  const [betaUsers, setBetaUsers] = useState(defaultMVPTesting.betaUsers);
  const [bugs, setBugs] = useState(defaultMVPTesting.bugs);
  const [usabilityResults, setUsabilityResults] = useState(defaultMVPTesting.usabilityResults);
  const [performanceMetrics, setPerformanceMetrics] = useState(defaultMVPTesting.performanceMetrics);
  
  // Feedback Board State
  const [feedbackItems, setFeedbackItems] = useState(defaultFeedbackBoard.feedbackItems);
  const [featureRequests, setFeatureRequests] = useState(defaultFeedbackBoard.featureRequests);
  const [iterationRoadmap, setIterationRoadmap] = useState(defaultFeedbackBoard.iterationRoadmap);
  
  // Demo Kit State
  const [demoVideos, setDemoVideos] = useState(defaultDemoKit.demoVideos);
  const [screenshots, setScreenshots] = useState(defaultDemoKit.screenshots);
  const [presentations, setPresentations] = useState(defaultDemoKit.presentations);

  // Load user's pitches on mount
  useEffect(() => {
    loadUserPitches();
  }, []);

  // Load Sprinto data when pitch is selected
  useEffect(() => {
    if (selectedPitchId) {
      loadSprintoData(selectedPitchId);
    }
  }, [selectedPitchId]);

  const loadUserPitches = async () => {
    try {
      setLoadingPitches(true);
      setError(null);
      const response = await pitchesAPI.getMyPitches();
      const pitches = response.data?.results || response.data || [];
      setUserPitches(pitches);
      
      // Auto-select first pitch if available
      if (pitches.length > 0 && !selectedPitchId) {
        setSelectedPitchId(pitches[0].id);
        setSelectedPitch(pitches[0]);
      }
    } catch (err) {
      console.error('Error loading pitches:', err);
      setError('Failed to load your pitches. Please try again.');
    } finally {
      setLoadingPitches(false);
    }
  };

  const loadSprintoData = async (pitchId) => {
    try {
      setLoadingData(true);
      setError(null);
      
      // Find the selected pitch to get its data
      const pitch = userPitches.find(p => p.id === pitchId) || selectedPitch;
      
      // Try to get existing Sprinto data
      const response = await sprintoAPI.getByPitch(pitchId);
      const data = response.data;
      
      // Populate all state from loaded data, using pitch data as fallback for empty fields
      populateStateFromData(data, pitch);
      setLastSaved(new Date(data.updated_at));
    } catch (err) {
      if (err.response?.status === 404) {
        // No Sprinto data exists, create it with pitch data as initial values
        const pitch = userPitches.find(p => p.id === pitchId) || selectedPitch;
        try {
          const createResponse = await sprintoAPI.createForPitch(pitchId);
          populateStateFromData(createResponse.data, pitch);
          setLastSaved(new Date());
        } catch (createErr) {
          console.error('Error creating Sprinto data:', createErr);
          setError('Failed to initialize Sprinto workspace for this pitch.');
        }
      } else {
        console.error('Error loading Sprinto data:', err);
        setError('Failed to load Sprinto data. Please try again.');
      }
    } finally {
      setLoadingData(false);
    }
  };

  const populateStateFromData = (data, pitch = null) => {
    // Helper to check if value is empty
    const isEmpty = (val) => {
      if (val === null || val === undefined || val === '') return true;
      if (typeof val === 'object' && Object.keys(val).length === 0) return true;
      if (Array.isArray(val) && val.length === 0) return true;
      return false;
    };
    
    // Idea Framing - Use pitch description as narrative if empty
    const ideaNarrativeValue = data.idea_narrative || '';
    setIdeaNarrative(ideaNarrativeValue || (pitch?.description || ''));
    
    // Problem-Solution - Use pitch's problem, solution, and target_market if empty
    const problemSolutionData = data.problem_solution || {};
    setProblemSolution({
      problem: problemSolutionData.problem || (pitch?.problem || ''),
      solution: problemSolutionData.solution || (pitch?.solution || ''),
      target: problemSolutionData.target || (pitch?.target_market || '')
    });
    
    setValuePropositionCanvas(data.value_proposition_canvas || defaultIdeaFraming.valuePropositionCanvas);
    setAssumptionsLog(data.assumptions_log || []);
    
    // Idea Validation - Use pitch's market_size and competitive_advantage
    const marketAnalysisData = data.market_analysis || {};
    // Try to parse market_size if it's a string like "$50B" or "50000000"
    const parseMarketSize = (sizeStr) => {
      if (!sizeStr) return 0;
      // Remove $ and convert B/M/K suffixes
      const cleaned = sizeStr.toString().replace(/[$,]/g, '').toUpperCase();
      if (cleaned.endsWith('B')) return parseFloat(cleaned) * 1000000000;
      if (cleaned.endsWith('M')) return parseFloat(cleaned) * 1000000;
      if (cleaned.endsWith('K')) return parseFloat(cleaned) * 1000;
      return parseFloat(cleaned) || 0;
    };
    
    setMarketAnalysis({
      tam: marketAnalysisData.tam || (pitch?.market_size ? parseMarketSize(pitch.market_size) : 0),
      sam: marketAnalysisData.sam || 0,
      som: marketAnalysisData.som || 0
    });
    
    // ICP Profile - Use pitch's target_market for demographics/needs if empty
    const icpData = data.icp_profile || {};
    setIcpProfile({
      demographics: icpData.demographics || '',
      psychographics: icpData.psychographics || '',
      behaviors: icpData.behaviors || '',
      needs: icpData.needs || (pitch?.target_market || '')
    });
    
    // Competitors - Pre-populate with competitive advantage if empty
    const competitorsList = data.competitors || [];
    if (competitorsList.length === 0 && pitch?.competitive_advantage) {
      // Create a placeholder for the user to expand on their competitive advantage
      setCompetitors([{
        id: Date.now(),
        name: '',
        strengths: '',
        weaknesses: '',
        differentiation: pitch.competitive_advantage
      }]);
    } else {
      setCompetitors(competitorsList);
    }
    
    setUserSurveys(data.user_surveys || []);
    setValidationScore(data.validation_score || defaultIdeaValidation.validationScore);
    setKeyInsights(data.key_insights || []);
    
    // Feature Matrix
    setPainPoints(data.pain_points || []);
    setFeaturePriorities(data.feature_priorities || []);
    setUserStories(data.user_stories || []);
    setMvpFeatureSet(data.mvp_feature_set || []);
    
    // MVP Development - Use pitch data for PRD fields if empty
    const prdData = data.prd || {};
    setPrd({
      productOverview: prdData.productOverview || (pitch ? `${pitch.title || 'Product'}: ${pitch.tagline || pitch.description || ''}` : ''),
      targetUsers: prdData.targetUsers || (pitch?.target_market || ''),
      keyFeatures: prdData.keyFeatures || (pitch?.solution || ''),
      successMetrics: prdData.successMetrics || ''
    });
    
    setTechnicalArchitecture(data.technical_architecture || defaultMVPDevelopment.technicalArchitecture);
    setUserFlows(data.user_flows || defaultMVPDevelopment.userFlows);
    setWireframes(data.wireframes || []);
    
    // Prototype - Use pitch's video/deck URLs if empty
    const prototypeData = data.prototype || {};
    setPrototype({
      url: prototypeData.url || (pitch?.video_url || pitch?.deck_url || ''),
      notes: prototypeData.notes || ''
    });
    
    setSprintPlans(data.sprint_plans || []);
    
    // Ensure taskBoard has all required columns
    const taskBoardData = data.task_board || {};
    setTaskBoard({
      todo: taskBoardData.todo || [],
      inProgress: taskBoardData.inProgress || [],
      review: taskBoardData.review || [],
      done: taskBoardData.done || []
    });
    
    // Dev Milestones - Use pitch timeline if empty
    const milestonesData = data.dev_milestones || [];
    if (milestonesData.length === 0 && pitch?.timeline) {
      setDevMilestones([{
        id: Date.now(),
        milestone: 'Target Launch',
        date: '',
        status: 'planned',
        description: pitch.timeline
      }]);
    } else {
      setDevMilestones(milestonesData);
    }
    
    // MVP Testing
    const testPlanData = data.test_plan || {};
    setTestPlan({
      scenarios: testPlanData.scenarios || []
    });
    setBetaUsers(data.beta_users || []);
    setBugs(data.bugs || []);
    setUsabilityResults(data.usability_results || []);
    setPerformanceMetrics(data.performance_metrics || defaultMVPTesting.performanceMetrics);
    
    // Feedback Board
    setFeedbackItems(data.feedback_items || []);
    setFeatureRequests(data.feature_requests || []);
    setIterationRoadmap(data.iteration_roadmap || []);
    
    // Demo Kit - Use pitch's video/deck URLs if empty
    const demoVideosData = data.demo_videos || [];
    if (demoVideosData.length === 0 && pitch?.video_url) {
      setDemoVideos([{
        id: Date.now(),
        title: `${pitch.title || 'Product'} Demo`,
        url: pitch.video_url,
        description: 'Main pitch video',
        duration: ''
      }]);
    } else {
      setDemoVideos(demoVideosData);
    }
    
    setScreenshots(data.screenshots || []);
    
    // Presentations - Use pitch's deck URL if empty
    const presentationsData = data.presentations || [];
    if (presentationsData.length === 0 && pitch?.deck_url) {
      setPresentations([{
        id: Date.now(),
        title: `${pitch.title || 'Product'} Pitch Deck`,
        url: pitch.deck_url,
        description: 'Main pitch deck',
        type: 'pitch-deck'
      }]);
    } else {
      setPresentations(presentationsData);
    }
  };

  const saveCurrentTab = async () => {
    if (!selectedPitchId) return;
    
    setSavingData(true);
    setError(null);
    
    try {
      let tabData = {};
      
      switch (activeTab) {
        case 'ideaframing':
          tabData = {
            idea_narrative: ideaNarrative,
            problem_solution: problemSolution,
            value_proposition_canvas: valuePropositionCanvas,
            assumptions_log: assumptionsLog
          };
          break;
        case 'ideavalidation':
          tabData = {
            market_analysis: marketAnalysis,
            icp_profile: icpProfile,
            competitors: competitors,
            user_surveys: userSurveys,
            validation_score: validationScore,
            key_insights: keyInsights
          };
          break;
        case 'featurematrix':
          tabData = {
            pain_points: painPoints,
            feature_priorities: featurePriorities,
            user_stories: userStories,
            mvp_feature_set: mvpFeatureSet
          };
          break;
        case 'mvpdevelopment':
          tabData = {
            prd: prd,
            technical_architecture: technicalArchitecture,
            user_flows: userFlows,
            wireframes: wireframes,
            prototype: prototype,
            sprint_plans: sprintPlans,
            task_board: taskBoard,
            dev_milestones: devMilestones
          };
          break;
        case 'mvptesting':
          tabData = {
            test_plan: testPlan,
            beta_users: betaUsers,
            bugs: bugs,
            usability_results: usabilityResults,
            performance_metrics: performanceMetrics
          };
          break;
        case 'feedbackboard':
          tabData = {
            feedback_items: feedbackItems,
            feature_requests: featureRequests,
            iteration_roadmap: iterationRoadmap
          };
          break;
        case 'demokit':
          tabData = {
            demo_videos: demoVideos,
            screenshots: screenshots,
            presentations: presentations
          };
          break;
      }
      
      await sprintoAPI.updateTab(selectedPitchId, activeTab, tabData);
      setLastSaved(new Date());
    } catch (err) {
      console.error('Error saving data:', err);
      setError('Failed to save changes. Please try again.');
    } finally {
      setSavingData(false);
    }
  };

  const handlePitchSelect = (pitch) => {
    setSelectedPitchId(pitch.id);
    setSelectedPitch(pitch);
    setShowPitchDropdown(false);
  };

  const resetToDefaults = () => {
    // Reset all states to defaults
    setIdeaNarrative(defaultIdeaFraming.ideaNarrative);
    setProblemSolution(defaultIdeaFraming.problemSolution);
    setValuePropositionCanvas(defaultIdeaFraming.valuePropositionCanvas);
    setAssumptionsLog(defaultIdeaFraming.assumptionsLog);
    setMarketAnalysis(defaultIdeaValidation.marketAnalysis);
    setIcpProfile(defaultIdeaValidation.icpProfile);
    setCompetitors(defaultIdeaValidation.competitors);
    setUserSurveys(defaultIdeaValidation.userSurveys);
    setValidationScore(defaultIdeaValidation.validationScore);
    setKeyInsights(defaultIdeaValidation.keyInsights);
    setPainPoints(defaultFeatureMatrix.painPoints);
    setFeaturePriorities(defaultFeatureMatrix.featurePriorities);
    setUserStories(defaultFeatureMatrix.userStories);
    setMvpFeatureSet(defaultFeatureMatrix.mvpFeatureSet);
    setPrd(defaultMVPDevelopment.prd);
    setTechnicalArchitecture(defaultMVPDevelopment.technicalArchitecture);
    setUserFlows(defaultMVPDevelopment.userFlows);
    setWireframes(defaultMVPDevelopment.wireframes);
    setPrototype(defaultMVPDevelopment.prototype);
    setSprintPlans(defaultMVPDevelopment.sprintPlans);
    setTaskBoard(defaultMVPDevelopment.taskBoard);
    setDevMilestones(defaultMVPDevelopment.devMilestones);
    setTestPlan(defaultMVPTesting.testPlan);
    setBetaUsers(defaultMVPTesting.betaUsers);
    setBugs(defaultMVPTesting.bugs);
    setUsabilityResults(defaultMVPTesting.usabilityResults);
    setPerformanceMetrics(defaultMVPTesting.performanceMetrics);
    setFeedbackItems(defaultFeedbackBoard.feedbackItems);
    setFeatureRequests(defaultFeedbackBoard.featureRequests);
    setIterationRoadmap(defaultFeedbackBoard.iterationRoadmap);
    setDemoVideos(defaultDemoKit.demoVideos);
    setScreenshots(defaultDemoKit.screenshots);
    setPresentations(defaultDemoKit.presentations);
  };

  const tabs = [
    { id: 'ideaframing', label: 'Idea Framing', icon: Sparkles },
    { id: 'ideavalidation', label: 'Idea Validation', icon: Target },
    { id: 'featurematrix', label: 'Feature Matrix', icon: Layout },
    { id: 'mvpdevelopment', label: 'MVP Development', icon: Code },
    { id: 'mvptesting', label: 'MVP Testing', icon: CheckCircle },
    { id: 'feedbackboard', label: 'Feedback Board', icon: MessageCircle },
    { id: 'demokit', label: 'Demo Kit', icon: Video }
  ];

  // Render Pitch Selector
  const renderPitchSelector = () => (
    <div className="bg-white rounded-2xl p-4 shadow-lg border border-gray-100 mb-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        {/* Pitch Dropdown */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Rocket className="w-5 h-5 text-gray-700" />
            <span className="font-semibold text-gray-700">Pitch:</span>
          </div>
          <div className="relative">
            <button
              onClick={() => setShowPitchDropdown(!showPitchDropdown)}
              disabled={loadingPitches}
              className="flex items-center gap-3 px-4 py-2.5 bg-gray-50 hover:bg-gray-100 rounded-xl border border-gray-200 transition-colors min-w-[200px]"
            >
              {loadingPitches ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span className="text-gray-500">Loading pitches...</span>
                </>
              ) : selectedPitch ? (
                <>
                  <span className="font-semibold text-gray-900 truncate max-w-[200px]">
                    {selectedPitch.title}
                  </span>
                  <span className={`px-2 py-0.5 text-xs rounded-full ${
                    selectedPitch.stage === 'idea' ? 'bg-blue-100 text-blue-700' :
                    selectedPitch.stage === 'validation' ? 'bg-yellow-100 text-yellow-700' :
                    selectedPitch.stage === 'mvp' ? 'bg-green-100 text-green-700' :
                    'bg-gray-100 text-gray-700'
                  }`}>
                    {selectedPitch.stage}
                  </span>
                </>
              ) : (
                <span className="text-gray-500">Select a pitch</span>
              )}
              <ChevronDown className={`w-4 h-4 text-gray-400 ml-auto transition-transform ${showPitchDropdown ? 'rotate-180' : ''}`} />
            </button>
            
            {/* Dropdown Menu */}
            {showPitchDropdown && (
              <div className="absolute top-full left-0 mt-2 w-full min-w-[300px] bg-white rounded-xl shadow-xl border border-gray-200 z-50 max-h-[300px] overflow-y-auto">
                {userPitches.length === 0 ? (
                  <div className="p-4 text-center text-gray-500">
                    <p className="mb-2">No pitches found</p>
                    <a href="/create-pitch" className="text-black hover:underline font-semibold">
                      Create your first pitch →
                    </a>
                  </div>
                ) : (
                  userPitches.map((pitch) => (
                    <button
                      key={pitch.id}
                      onClick={() => handlePitchSelect(pitch)}
                      className={`w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors flex items-center justify-between gap-3 ${
                        selectedPitchId === pitch.id ? 'bg-gray-100' : ''
                      }`}
                    >
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-gray-900 truncate">{pitch.title}</p>
                        <p className="text-sm text-gray-500 truncate">{pitch.tagline || 'No tagline'}</p>
                      </div>
                      <span className={`px-2 py-0.5 text-xs rounded-full flex-shrink-0 ${
                        pitch.stage === 'idea' ? 'bg-blue-100 text-blue-700' :
                        pitch.stage === 'validation' ? 'bg-yellow-100 text-yellow-700' :
                        pitch.stage === 'mvp' ? 'bg-green-100 text-green-700' :
                        'bg-gray-100 text-gray-700'
                      }`}>
                        {pitch.stage}
                      </span>
                    </button>
                  ))
                )}
              </div>
            )}
          </div>
          
          <button
            onClick={loadUserPitches}
            disabled={loadingPitches}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            title="Refresh pitches"
          >
            <RefreshCw className={`w-4 h-4 text-gray-500 ${loadingPitches ? 'animate-spin' : ''}`} />
          </button>
        </div>
        
        {/* Save Button & Status */}
        <div className="flex items-center gap-4">
          {lastSaved && (
            <span className="text-sm text-gray-500">
              Last saved: {lastSaved.toLocaleTimeString()}
            </span>
          )}
          <button
            onClick={saveCurrentTab}
            disabled={!selectedPitchId || savingData}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold transition-all ${
              !selectedPitchId || savingData
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-black text-white hover:bg-gray-800'
            }`}
          >
            {savingData ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                Save Changes
              </>
            )}
          </button>
        </div>
      </div>
      
      {/* Error Message */}
      {error && (
        <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
          {error}
        </div>
      )}
      
      {/* No Pitch Selected Warning */}
      {!loadingPitches && !selectedPitchId && userPitches.length > 0 && (
        <div className="mt-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg text-yellow-700 text-sm">
          Please select a pitch to start working on your Sprinto workspace.
        </div>
      )}
    </div>
  );

  // Loading state for Sprinto data
  const renderLoadingState = () => (
    <div className="flex flex-col items-center justify-center py-20">
      <Loader2 className="w-12 h-12 text-gray-400 animate-spin mb-4" />
      <p className="text-gray-500 font-medium">Loading Sprinto workspace...</p>
    </div>
  );

  // No pitch state
  const renderNoPitchState = () => (
    <div className="bg-white rounded-2xl p-12 shadow-lg border border-gray-100 text-center">
      <Rocket className="w-16 h-16 text-gray-300 mx-auto mb-4" />
      <h2 className="text-2xl font-bold text-gray-900 mb-2">No Pitch Selected</h2>
      <p className="text-gray-600 mb-6 max-w-md mx-auto">
        Select a pitch from the dropdown above to start working on your Sprinto workspace, 
        or create a new pitch if you haven't created one yet.
      </p>
      <a
        href="/create-pitch"
        className="inline-flex items-center gap-2 px-6 py-3 bg-black text-white rounded-xl font-semibold hover:bg-gray-800 transition-colors"
      >
        <Plus className="w-5 h-5" />
        Create New Pitch
      </a>
    </div>
  );

  // Render Idea Framing Tab
  const renderIdeaFraming = () => (
    <div className="space-y-6">
      {/* Pre-populated Data Notice */}
      {selectedPitch && (selectedPitch.problem || selectedPitch.solution || selectedPitch.target_market) && (
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 flex items-start gap-3">
          <FileText className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-blue-800 font-medium">Data pre-populated from your pitch</p>
            <p className="text-blue-600 text-sm mt-1">
              Some fields have been automatically filled with information from your "{selectedPitch.title}" pitch. 
              Feel free to edit and expand on this content.
            </p>
          </div>
        </div>
      )}
      
      {/* Idea Narrative */}
      <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Idea Narrative</h2>
        <p className="text-gray-600 mb-6">Craft your compelling story that explains your idea, vision, and mission.</p>
        <textarea
          value={ideaNarrative}
          onChange={(e) => setIdeaNarrative(e.target.value)}
          className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-black focus:border-transparent resize-none"
          rows="8"
          placeholder="Describe your startup idea, the problem you're solving, your vision for the future, and why this matters..."
        />
        <button className="mt-4 px-6 py-3 bg-black text-white rounded-xl hover:bg-gray-800 transition-colors font-semibold">
          <Save className="w-4 h-4 inline mr-2" />
          Save Narrative
        </button>
      </div>

      {/* Problem-Solution Framework */}
      <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-gray-900">Problem-Solution Framework</h2>
          {selectedPitch?.problem && (
            <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">
              Pre-filled from pitch
            </span>
          )}
        </div>
        <p className="text-gray-600 mb-6">Clearly define the problem you're solving and your proposed solution.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-red-50 rounded-xl p-6 border border-red-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">The Problem</h3>
            <textarea
              value={problemSolution.problem}
              onChange={(e) => setProblemSolution({ ...problemSolution, problem: e.target.value })}
              className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none"
              rows="6"
              placeholder="What problem are you solving? Who experiences this problem? How painful is it?"
            />
          </div>
          <div className="bg-green-50 rounded-xl p-6 border border-green-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">The Solution</h3>
            <textarea
              value={problemSolution.solution}
              onChange={(e) => setProblemSolution({ ...problemSolution, solution: e.target.value })}
              className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
              rows="6"
              placeholder="How does your solution solve this problem? What makes it unique?"
            />
          </div>
        </div>
        <div className="mt-6">
          <label className="block text-sm font-semibold text-gray-900 mb-2">Target Audience</label>
          <input
            type="text"
            value={problemSolution.target}
            onChange={(e) => setProblemSolution({ ...problemSolution, target: e.target.value })}
            className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-black focus:border-transparent"
            placeholder="Who is your target customer?"
          />
        </div>
      </div>

      {/* Value Proposition Canvas */}
      <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Value Proposition Canvas</h2>
        <p className="text-gray-600 mb-6">Map out customer gains, pains, and how your product addresses them.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
              <h3 className="font-semibold text-gray-900 mb-3">Customer Gains</h3>
              <textarea
                value={valuePropositionCanvas.gains?.join('\n') || ''}
                onChange={(e) => setValuePropositionCanvas({ 
                  ...valuePropositionCanvas, 
                  gains: e.target.value.split('\n').filter(g => g.trim()) 
                })}
                className="w-full p-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                rows="4"
                placeholder="What benefits do customers want? What would make their lives better? (one per line)"
              />
            </div>
            <div className="bg-red-50 rounded-xl p-6 border border-red-200">
              <h3 className="font-semibold text-gray-900 mb-3">Customer Pains</h3>
              <textarea
                value={valuePropositionCanvas.pains?.join('\n') || ''}
                onChange={(e) => setValuePropositionCanvas({ 
                  ...valuePropositionCanvas, 
                  pains: e.target.value.split('\n').filter(p => p.trim()) 
                })}
                className="w-full p-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                rows="4"
                placeholder="What frustrates customers? What risks do they fear? (one per line)"
              />
            </div>
          </div>
          <div className="space-y-4">
            <div className="bg-green-50 rounded-xl p-6 border border-green-200">
              <h3 className="font-semibold text-gray-900 mb-3">Gain Creators</h3>
              <textarea
                value={valuePropositionCanvas.gainCreators?.join('\n') || ''}
                onChange={(e) => setValuePropositionCanvas({ 
                  ...valuePropositionCanvas, 
                  gainCreators: e.target.value.split('\n').filter(g => g.trim()) 
                })}
                className="w-full p-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                rows="4"
                placeholder="How does your product create gains for customers? (one per line)"
              />
            </div>
            <div className="bg-purple-50 rounded-xl p-6 border border-purple-200">
              <h3 className="font-semibold text-gray-900 mb-3">Pain Relievers</h3>
              <textarea
                value={valuePropositionCanvas.painRelievers?.join('\n') || ''}
                onChange={(e) => setValuePropositionCanvas({ 
                  ...valuePropositionCanvas, 
                  painRelievers: e.target.value.split('\n').filter(p => p.trim()) 
                })}
                className="w-full p-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                rows="4"
                placeholder="How does your product relieve customer pains? (one per line)"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Assumptions Log */}
      <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Assumptions Log</h2>
            <p className="text-gray-600">Track and validate your key assumptions about the business.</p>
          </div>
          <button
            onClick={() => setAssumptionsLog([...assumptionsLog, { id: Date.now(), assumption: '', validation: 'unvalidated', notes: '' }])}
            className="px-4 py-2 bg-black text-white rounded-xl hover:bg-gray-800 transition-colors text-sm font-semibold flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Add Assumption
          </button>
        </div>
        <div className="space-y-4">
          {assumptionsLog.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <p>No assumptions logged yet. Add your first assumption to get started.</p>
            </div>
          ) : (
            assumptionsLog.map((assumption) => (
              <div key={assumption.id} className="p-6 bg-gray-50 rounded-xl border border-gray-200">
                <div className="flex items-start justify-between mb-4">
                  <input
                    type="text"
                    value={assumption.assumption}
                    onChange={(e) => setAssumptionsLog(assumptionsLog.map(a => a.id === assumption.id ? { ...a, assumption: e.target.value } : a))}
                    className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                    placeholder="Enter assumption..."
                  />
                  <select
                    value={assumption.validation}
                    onChange={(e) => setAssumptionsLog(assumptionsLog.map(a => a.id === assumption.id ? { ...a, validation: e.target.value } : a))}
                    className={`ml-4 px-4 py-3 rounded-lg border focus:ring-2 focus:ring-black focus:border-transparent ${
                      assumption.validation === 'validated' ? 'bg-green-100 border-green-300' :
                      assumption.validation === 'invalidated' ? 'bg-red-100 border-red-300' :
                      'bg-yellow-100 border-yellow-300'
                    }`}
                  >
                    <option value="unvalidated">Unvalidated</option>
                    <option value="validated">Validated</option>
                    <option value="invalidated">Invalidated</option>
                  </select>
                </div>
                <textarea
                  value={assumption.notes}
                  onChange={(e) => setAssumptionsLog(assumptionsLog.map(a => a.id === assumption.id ? { ...a, notes: e.target.value } : a))}
                  className="w-full p-3 border border-gray-300 rounded-lg resize-none"
                  rows="2"
                  placeholder="Validation notes..."
                />
                <button
                  onClick={() => setAssumptionsLog(assumptionsLog.filter(a => a.id !== assumption.id))}
                  className="mt-3 text-red-600 hover:text-red-700 text-sm font-semibold"
                >
                  Remove
                </button>
              </div>
            ))
        )}
      </div>
      </div>
    </div>
  );

  // Render Idea Validation Tab
  const renderIdeaValidation = () => (
    <div className="space-y-6">
      {/* Market Analysis */}
      <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Market Analysis (TAM/SAM/SOM)</h2>
        <p className="text-gray-600 mb-6">Define your Total Addressable Market, Serviceable Available Market, and Serviceable Obtainable Market.</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
            <h3 className="font-semibold text-gray-900 mb-2">TAM (Total Addressable Market)</h3>
            <p className="text-xs text-gray-600 mb-4">The total market demand for your product</p>
                  <input
                    type="number"
              value={marketAnalysis.tam}
              onChange={(e) => setMarketAnalysis({ ...marketAnalysis, tam: e.target.value })}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter TAM value"
            />
            <p className="text-xs text-gray-500 mt-2">e.g., $50B</p>
                </div>
          <div className="bg-green-50 rounded-xl p-6 border border-green-200">
            <h3 className="font-semibold text-gray-900 mb-2">SAM (Serviceable Available Market)</h3>
            <p className="text-xs text-gray-600 mb-4">The portion of TAM you can serve</p>
                  <input
                    type="number"
              value={marketAnalysis.sam}
              onChange={(e) => setMarketAnalysis({ ...marketAnalysis, sam: e.target.value })}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="Enter SAM value"
            />
            <p className="text-xs text-gray-500 mt-2">e.g., $5B</p>
                </div>
          <div className="bg-purple-50 rounded-xl p-6 border border-purple-200">
            <h3 className="font-semibold text-gray-900 mb-2">SOM (Serviceable Obtainable Market)</h3>
            <p className="text-xs text-gray-600 mb-4">The portion of SAM you can realistically capture</p>
                  <input
                    type="number"
              value={marketAnalysis.som}
              onChange={(e) => setMarketAnalysis({ ...marketAnalysis, som: e.target.value })}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="Enter SOM value"
            />
            <p className="text-xs text-gray-500 mt-2">e.g., $50M</p>
            </div>
          </div>
        </div>

      {/* ICP Profiling */}
      <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">ICP Profiling (Ideal Customer Profile)</h2>
        <p className="text-gray-600 mb-6">Define your ideal customer in detail.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">Demographics</label>
            <textarea
              value={icpProfile.demographics}
              onChange={(e) => setIcpProfile({ ...icpProfile, demographics: e.target.value })}
              className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-black focus:border-transparent resize-none"
              rows="4"
              placeholder="Age, location, income, company size, industry..."
                        />
                      </div>
                <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">Psychographics</label>
            <textarea
              value={icpProfile.psychographics}
              onChange={(e) => setIcpProfile({ ...icpProfile, psychographics: e.target.value })}
              className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-black focus:border-transparent resize-none"
              rows="4"
              placeholder="Values, interests, lifestyle, motivations..."
            />
                  </div>
                  <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">Behaviors</label>
                <textarea
              value={icpProfile.behaviors}
              onChange={(e) => setIcpProfile({ ...icpProfile, behaviors: e.target.value })}
              className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-black focus:border-transparent resize-none"
              rows="4"
              placeholder="Buying patterns, usage habits, preferred channels..."
                />
              </div>
              <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">Needs & Pain Points</label>
                <textarea
              value={icpProfile.needs}
              onChange={(e) => setIcpProfile({ ...icpProfile, needs: e.target.value })}
              className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-black focus:border-transparent resize-none"
              rows="4"
              placeholder="What they need, what problems they face..."
                />
              </div>
            </div>
          </div>

      {/* Competitive Analysis */}
      <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Competitive Analysis</h2>
            <p className="text-gray-600">Analyze your competitors and identify your competitive advantages.</p>
              </div>
                      <button
            onClick={() => setCompetitors([...competitors, { id: Date.now(), name: '', strengths: '', weaknesses: '', differentiation: '' }])}
            className="px-4 py-2 bg-black text-white rounded-xl hover:bg-gray-800 transition-colors text-sm font-semibold flex items-center gap-2"
          >
              <Plus className="w-4 h-4" />
            Add Competitor
            </button>
          </div>
          <div className="space-y-4">
          {competitors.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <p>No competitors added yet. Add your first competitor to get started.</p>
                        </div>
          ) : (
            competitors.map((competitor) => (
              <div key={competitor.id} className="p-6 bg-gray-50 rounded-xl border border-gray-200">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">Competitor Name</label>
                <input
                  type="text"
                      value={competitor.name}
                      onChange={(e) => setCompetitors(competitors.map(c => c.id === competitor.id ? { ...c, name: e.target.value } : c))}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                      placeholder="Competitor name"
                />
              </div>
              <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">Strengths</label>
                <textarea
                      value={competitor.strengths}
                      onChange={(e) => setCompetitors(competitors.map(c => c.id === competitor.id ? { ...c, strengths: e.target.value } : c))}
                      className="w-full p-3 border border-gray-300 rounded-lg resize-none"
                      rows="2"
                      placeholder="What they do well..."
                />
              </div>
              <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">Weaknesses</label>
                    <textarea
                      value={competitor.weaknesses}
                      onChange={(e) => setCompetitors(competitors.map(c => c.id === competitor.id ? { ...c, weaknesses: e.target.value } : c))}
                      className="w-full p-3 border border-gray-300 rounded-lg resize-none"
                      rows="2"
                      placeholder="Where they fall short..."
                />
              </div>
              </div>
              <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Your Differentiation</label>
          <textarea
                    value={competitor.differentiation}
                    onChange={(e) => setCompetitors(competitors.map(c => c.id === competitor.id ? { ...c, differentiation: e.target.value } : c))}
                    className="w-full p-3 border border-gray-300 rounded-lg resize-none"
                    rows="2"
                    placeholder="How you're different/better..."
          />
        </div>
                <button
                  onClick={() => setCompetitors(competitors.filter(c => c.id !== competitor.id))}
                  className="mt-3 text-red-600 hover:text-red-700 text-sm font-semibold flex items-center gap-2"
                >
                  <Trash2 className="w-4 h-4" />
                  Remove
          </button>
        </div>
            ))
          )}
      </div>
    </div>

      {/* Validation Score Dashboard */}
      <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Validation Score Dashboard</h2>
        <p className="text-gray-600 mb-6">Track your validation progress across key dimensions.</p>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
            <h3 className="font-semibold text-gray-900 mb-2">Problem Validation</h3>
            <div className="text-3xl font-bold text-blue-700 mb-2">{validationScore.problem}%</div>
            <input
              type="range"
              min="0"
              max="100"
              value={validationScore.problem}
              onChange={(e) => setValidationScore({ ...validationScore, problem: parseInt(e.target.value) })}
              className="w-full"
            />
          </div>
          <div className="bg-green-50 rounded-xl p-6 border border-green-200">
            <h3 className="font-semibold text-gray-900 mb-2">Solution Validation</h3>
            <div className="text-3xl font-bold text-green-700 mb-2">{validationScore.solution}%</div>
            <input
              type="range"
              min="0"
              max="100"
              value={validationScore.solution}
              onChange={(e) => setValidationScore({ ...validationScore, solution: parseInt(e.target.value) })}
              className="w-full"
            />
          </div>
          <div className="bg-purple-50 rounded-xl p-6 border border-purple-200">
            <h3 className="font-semibold text-gray-900 mb-2">Market Validation</h3>
            <div className="text-3xl font-bold text-purple-700 mb-2">{validationScore.market}%</div>
            <input
              type="range"
              min="0"
              max="100"
              value={validationScore.market}
              onChange={(e) => setValidationScore({ ...validationScore, market: parseInt(e.target.value) })}
              className="w-full"
            />
          </div>
          <div className="bg-orange-50 rounded-xl p-6 border border-orange-200">
            <h3 className="font-semibold text-gray-900 mb-2">Overall Score</h3>
            <div className="text-3xl font-bold text-orange-700 mb-2">
              {Math.round((validationScore.problem + validationScore.solution + validationScore.market) / 3)}%
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-orange-500 to-red-500 h-2 rounded-full"
                style={{ width: `${Math.round((validationScore.problem + validationScore.solution + validationScore.market) / 3)}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Render Feature Matrix Tab
  const renderFeatureMatrix = () => (
    <div className="space-y-6">
      {/* Pain Point Mapping */}
    <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Pain Point Mapping</h2>
            <p className="text-gray-600">Identify and prioritize customer pain points.</p>
          </div>
          <button
            onClick={() => setPainPoints([...painPoints, { id: Date.now(), pain: '', severity: 'medium', frequency: 'medium', impact: '' }])}
            className="px-4 py-2 bg-black text-white rounded-xl hover:bg-gray-800 transition-colors text-sm font-semibold flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Add Pain Point
          </button>
        </div>
        <div className="space-y-4">
          {painPoints.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <p>No pain points mapped yet. Add your first pain point to get started.</p>
            </div>
          ) : (
            painPoints.map((pain) => (
              <div key={pain.id} className="p-6 bg-gray-50 rounded-xl border border-gray-200">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-900 mb-2">Pain Point</label>
                    <input
                      type="text"
                      value={pain.pain}
                      onChange={(e) => setPainPoints(painPoints.map(p => p.id === pain.id ? { ...p, pain: e.target.value } : p))}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                      placeholder="Describe the pain point..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">Severity</label>
                    <select
                      value={pain.severity}
                      onChange={(e) => setPainPoints(painPoints.map(p => p.id === pain.id ? { ...p, severity: e.target.value } : p))}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                      <option value="critical">Critical</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">Frequency</label>
                    <select
                      value={pain.frequency}
                      onChange={(e) => setPainPoints(painPoints.map(p => p.id === pain.id ? { ...p, frequency: e.target.value } : p))}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                    >
                      <option value="rare">Rare</option>
                      <option value="occasional">Occasional</option>
                      <option value="frequent">Frequent</option>
                      <option value="constant">Constant</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Impact</label>
                  <textarea
                    value={pain.impact}
                    onChange={(e) => setPainPoints(painPoints.map(p => p.id === pain.id ? { ...p, impact: e.target.value } : p))}
                    className="w-full p-3 border border-gray-300 rounded-lg resize-none"
                    rows="2"
                    placeholder="What's the impact of this pain point?"
                  />
                </div>
                <button
                  onClick={() => setPainPoints(painPoints.filter(p => p.id !== pain.id))}
                  className="mt-3 text-red-600 hover:text-red-700 text-sm font-semibold flex items-center gap-2"
                >
                  <Trash2 className="w-4 h-4" />
                  Remove
                </button>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Feature Prioritization */}
      <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Feature Prioritization</h2>
            <p className="text-gray-600">Prioritize features using impact vs effort matrix.</p>
          </div>
          <button
            onClick={() => setFeaturePriorities([...featurePriorities, { id: Date.now(), feature: '', impact: 5, effort: 5, priority: 'medium' }])}
            className="px-4 py-2 bg-black text-white rounded-xl hover:bg-gray-800 transition-colors text-sm font-semibold flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Add Feature
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="space-y-4">
            {featurePriorities.filter(f => f.impact >= 5 && f.effort <= 5).map((feature) => (
              <div key={feature.id} className="p-4 bg-green-50 rounded-xl border border-green-200">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <input
                      type="text"
                      value={feature.feature}
                      onChange={(e) => setFeaturePriorities(featurePriorities.map(f => f.id === feature.id ? { ...f, feature: e.target.value } : f))}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent font-semibold"
                      placeholder="Feature name..."
                    />
                    <div className="mt-2 flex gap-4 text-xs text-gray-600">
                      <span>Impact: {feature.impact}/10</span>
                      <span>Effort: {feature.effort}/10</span>
                    </div>
                  </div>
                  <button
                    onClick={() => setFeaturePriorities(featurePriorities.filter(f => f.id !== feature.id))}
                    className="ml-2 text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
            <div className="text-center py-4 text-sm text-gray-500 border-2 border-dashed border-gray-300 rounded-xl">
              <p className="font-semibold mb-1">High Impact, Low Effort</p>
              <p className="text-xs">Quick Wins - Do First</p>
            </div>
          </div>
          <div className="space-y-4">
            {featurePriorities.filter(f => f.impact >= 5 && f.effort > 5).map((feature) => (
              <div key={feature.id} className="p-4 bg-blue-50 rounded-xl border border-blue-200">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <input
                      type="text"
                      value={feature.feature}
                      onChange={(e) => setFeaturePriorities(featurePriorities.map(f => f.id === feature.id ? { ...f, feature: e.target.value } : f))}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-semibold"
                      placeholder="Feature name..."
                    />
                    <div className="mt-2 flex gap-4 text-xs text-gray-600">
                      <span>Impact: {feature.impact}/10</span>
                      <span>Effort: {feature.effort}/10</span>
                    </div>
                  </div>
                  <button
                    onClick={() => setFeaturePriorities(featurePriorities.filter(f => f.id !== feature.id))}
                    className="ml-2 text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
            <div className="text-center py-4 text-sm text-gray-500 border-2 border-dashed border-gray-300 rounded-xl">
              <p className="font-semibold mb-1">High Impact, High Effort</p>
              <p className="text-xs">Major Projects - Plan Carefully</p>
            </div>
          </div>
        </div>
        <div className="space-y-4">
          {featurePriorities.filter(f => f.impact < 5).map((feature) => (
            <div key={feature.id} className="p-4 bg-gray-50 rounded-xl border border-gray-200">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <input
                    type="text"
                    value={feature.feature}
                    onChange={(e) => setFeaturePriorities(featurePriorities.map(f => f.id === feature.id ? { ...f, feature: e.target.value } : f))}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                    placeholder="Feature name..."
                  />
                  <div className="mt-2 flex gap-4 text-xs text-gray-600">
                    <span>Impact: {feature.impact}/10</span>
                    <span>Effort: {feature.effort}/10</span>
                    <span className="text-orange-600">Low Priority</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={feature.impact}
                    onChange={(e) => setFeaturePriorities(featurePriorities.map(f => f.id === feature.id ? { ...f, impact: parseInt(e.target.value) } : f))}
                    className="w-20"
                  />
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={feature.effort}
                    onChange={(e) => setFeaturePriorities(featurePriorities.map(f => f.id === feature.id ? { ...f, effort: parseInt(e.target.value) } : f))}
                    className="w-20"
                  />
                  <button
                    onClick={() => setFeaturePriorities(featurePriorities.filter(f => f.id !== feature.id))}
                    className="ml-2 text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* User Story Mapping */}
      <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">User Story Mapping</h2>
            <p className="text-gray-600">Map user stories to features and user journeys.</p>
          </div>
          <button
            onClick={() => setUserStories([...userStories, { id: Date.now(), story: '', persona: '', acceptance: '', status: 'todo' }])}
            className="px-4 py-2 bg-black text-white rounded-xl hover:bg-gray-800 transition-colors text-sm font-semibold flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Add User Story
          </button>
        </div>
        <div className="space-y-4">
          {userStories.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <p>No user stories added yet. Add your first user story to get started.</p>
            </div>
          ) : (
            userStories.map((story) => (
              <div key={story.id} className="p-6 bg-gray-50 rounded-xl border border-gray-200">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">User Story</label>
                    <textarea
                      value={story.story}
                      onChange={(e) => setUserStories(userStories.map(s => s.id === story.id ? { ...s, story: e.target.value } : s))}
                      className="w-full p-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-black focus:border-transparent"
                      rows="3"
                      placeholder="As a [user], I want [feature] so that [benefit]..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">Persona</label>
                    <input
                      type="text"
                      value={story.persona}
                      onChange={(e) => setUserStories(userStories.map(s => s.id === story.id ? { ...s, persona: e.target.value } : s))}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                      placeholder="Target user persona..."
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">Acceptance Criteria</label>
                    <textarea
                      value={story.acceptance}
                      onChange={(e) => setUserStories(userStories.map(s => s.id === story.id ? { ...s, acceptance: e.target.value } : s))}
                      className="w-full p-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-black focus:border-transparent"
                      rows="2"
                      placeholder="Given... When... Then..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">Status</label>
                    <select
                      value={story.status}
                      onChange={(e) => setUserStories(userStories.map(s => s.id === story.id ? { ...s, status: e.target.value } : s))}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                    >
                      <option value="todo">To Do</option>
                      <option value="inprogress">In Progress</option>
                      <option value="done">Done</option>
                    </select>
                  </div>
                </div>
                <button
                  onClick={() => setUserStories(userStories.filter(s => s.id !== story.id))}
                  className="text-red-600 hover:text-red-700 text-sm font-semibold flex items-center gap-2"
                >
                  <Trash2 className="w-4 h-4" />
                  Remove
                </button>
              </div>
            ))
          )}
        </div>
      </div>

      {/* MVP Feature Set */}
      <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">MVP Feature Set</h2>
            <p className="text-gray-600">Define the core features for your MVP.</p>
          </div>
          <button
            onClick={() => setMvpFeatureSet([...mvpFeatureSet, { id: Date.now(), feature: '', description: '', priority: 'must', status: 'planned' }])}
            className="px-4 py-2 bg-black text-white rounded-xl hover:bg-gray-800 transition-colors text-sm font-semibold flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Add Feature
          </button>
        </div>
        <div className="space-y-4">
          {mvpFeatureSet.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <p>No MVP features defined yet. Add your first feature to get started.</p>
            </div>
          ) : (
            mvpFeatureSet.map((feature) => (
              <div key={feature.id} className="p-6 bg-gray-50 rounded-xl border border-gray-200">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-900 mb-2">Feature Name</label>
                    <input
                      type="text"
                      value={feature.feature}
                      onChange={(e) => setMvpFeatureSet(mvpFeatureSet.map(f => f.id === feature.id ? { ...f, feature: e.target.value } : f))}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                      placeholder="Feature name..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">Priority</label>
                    <select
                      value={feature.priority}
                      onChange={(e) => setMvpFeatureSet(mvpFeatureSet.map(f => f.id === feature.id ? { ...f, priority: e.target.value } : f))}
                      className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-black focus:border-transparent ${
                        feature.priority === 'must' ? 'bg-red-50 border-red-300' :
                        feature.priority === 'should' ? 'bg-yellow-50 border-yellow-300' :
                        'bg-green-50 border-green-300'
                      }`}
                    >
                      <option value="must">Must Have</option>
                      <option value="should">Should Have</option>
                      <option value="could">Could Have</option>
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">Description</label>
                    <textarea
                      value={feature.description}
                      onChange={(e) => setMvpFeatureSet(mvpFeatureSet.map(f => f.id === feature.id ? { ...f, description: e.target.value } : f))}
                      className="w-full p-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-black focus:border-transparent"
                      rows="3"
                      placeholder="Feature description..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">Status</label>
                    <select
                      value={feature.status}
                      onChange={(e) => setMvpFeatureSet(mvpFeatureSet.map(f => f.id === feature.id ? { ...f, status: e.target.value } : f))}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                    >
                      <option value="planned">Planned</option>
                      <option value="inprogress">In Progress</option>
                      <option value="completed">Completed</option>
                    </select>
                  </div>
                </div>
                <button
                  onClick={() => setMvpFeatureSet(mvpFeatureSet.filter(f => f.id !== feature.id))}
                  className="text-red-600 hover:text-red-700 text-sm font-semibold flex items-center gap-2"
                >
                  <Trash2 className="w-4 h-4" />
                  Remove
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );

  // Render MVP Development Tab
  const renderMVPDevelopment = () => (
    <div className="space-y-6">
      {/* PRD */}
    <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Product Requirements Document (PRD)</h2>
        <p className="text-gray-600 mb-6">Define your product requirements and specifications.</p>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">Product Overview</label>
            <textarea
              value={prd.productOverview || ''}
              onChange={(e) => setPrd({ ...prd, productOverview: e.target.value })}
              className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-black focus:border-transparent resize-none"
              rows="4"
              placeholder="Describe your product, its purpose, and key objectives..."
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">Target Users</label>
            <textarea
              value={prd.targetUsers || ''}
              onChange={(e) => setPrd({ ...prd, targetUsers: e.target.value })}
              className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-black focus:border-transparent resize-none"
              rows="3"
              placeholder="Who are your target users? What are their needs?"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">Key Features</label>
            <textarea
              value={prd.keyFeatures || ''}
              onChange={(e) => setPrd({ ...prd, keyFeatures: e.target.value })}
              className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-black focus:border-transparent resize-none"
              rows="5"
              placeholder="List the key features and their requirements..."
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">Success Metrics</label>
            <textarea
              value={prd.successMetrics || ''}
              onChange={(e) => setPrd({ ...prd, successMetrics: e.target.value })}
              className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-black focus:border-transparent resize-none"
              rows="3"
              placeholder="How will you measure success? What are the KPIs?"
            />
          </div>
        </div>
      </div>

      {/* Technical Architecture */}
      <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Technical Architecture</h2>
        <p className="text-gray-600 mb-6">Define your technical stack and architecture decisions.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">Frontend Stack</label>
            <textarea
              value={technicalArchitecture.frontend}
              onChange={(e) => setTechnicalArchitecture({ ...technicalArchitecture, frontend: e.target.value })}
              className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-black focus:border-transparent resize-none"
              rows="4"
              placeholder="Frontend technologies, frameworks, libraries..."
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">Backend Stack</label>
            <textarea
              value={technicalArchitecture.backend}
              onChange={(e) => setTechnicalArchitecture({ ...technicalArchitecture, backend: e.target.value })}
              className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-black focus:border-transparent resize-none"
              rows="4"
              placeholder="Backend technologies, databases, APIs..."
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">Infrastructure</label>
            <textarea
              value={technicalArchitecture.infrastructure}
              onChange={(e) => setTechnicalArchitecture({ ...technicalArchitecture, infrastructure: e.target.value })}
              className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-black focus:border-transparent resize-none"
              rows="3"
              placeholder="Hosting, deployment, CI/CD..."
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">Third-Party Services</label>
            <textarea
              value={technicalArchitecture.thirdParty}
              onChange={(e) => setTechnicalArchitecture({ ...technicalArchitecture, thirdParty: e.target.value })}
              className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-black focus:border-transparent resize-none"
              rows="3"
              placeholder="External services, APIs, integrations..."
            />
          </div>
        </div>
      </div>

      {/* Sprint Planning */}
      <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Sprint Planning</h2>
            <p className="text-gray-600">Plan your development sprints and milestones.</p>
          </div>
          <button
            onClick={() => setSprintPlans([...sprintPlans, { id: Date.now(), name: '', duration: 2, goals: '', status: 'planned' }])}
            className="px-4 py-2 bg-black text-white rounded-xl hover:bg-gray-800 transition-colors text-sm font-semibold flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Add Sprint
          </button>
        </div>
        <div className="space-y-4">
          {sprintPlans.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <p>No sprints planned yet. Add your first sprint to get started.</p>
            </div>
          ) : (
            sprintPlans.map((sprint) => (
              <div key={sprint.id} className="p-6 bg-gray-50 rounded-xl border border-gray-200">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">Sprint Name</label>
                    <input
                      type="text"
                      value={sprint.name}
                      onChange={(e) => setSprintPlans(sprintPlans.map(s => s.id === sprint.id ? { ...s, name: e.target.value } : s))}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                      placeholder="Sprint 1, Sprint 2..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">Duration (weeks)</label>
                    <input
                      type="number"
                      min="1"
                      max="4"
                      value={sprint.duration}
                      onChange={(e) => setSprintPlans(sprintPlans.map(s => s.id === sprint.id ? { ...s, duration: parseInt(e.target.value) } : s))}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">Status</label>
                    <select
                      value={sprint.status}
                      onChange={(e) => setSprintPlans(sprintPlans.map(s => s.id === sprint.id ? { ...s, status: e.target.value } : s))}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                    >
                      <option value="planned">Planned</option>
                      <option value="active">Active</option>
                      <option value="completed">Completed</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Sprint Goals</label>
                  <textarea
                    value={sprint.goals}
                    onChange={(e) => setSprintPlans(sprintPlans.map(s => s.id === sprint.id ? { ...s, goals: e.target.value } : s))}
                    className="w-full p-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-black focus:border-transparent"
                    rows="3"
                    placeholder="What are the goals for this sprint?"
                  />
                </div>
                <button
                  onClick={() => setSprintPlans(sprintPlans.filter(s => s.id !== sprint.id))}
                  className="mt-3 text-red-600 hover:text-red-700 text-sm font-semibold flex items-center gap-2"
                >
                  <Trash2 className="w-4 h-4" />
                  Remove
                </button>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Task Board */}
      <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Task Board</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {['todo', 'inProgress', 'review', 'done'].map((column) => (
            <div key={column} className="bg-gray-50 rounded-xl p-4 border border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-4 capitalize">{column === 'inProgress' ? 'In Progress' : column === 'todo' ? 'To Do' : column}</h3>
              <div className="space-y-3 min-h-[200px]">
                {(taskBoard[column] || []).map((task) => (
                  <div key={task.id} className="p-3 bg-white rounded-lg border border-gray-300 shadow-sm">
                    <p className="text-sm font-medium text-gray-900">{task.title}</p>
                    <p className="text-xs text-gray-500 mt-1">{task.assignee || 'Unassigned'}</p>
                  </div>
                ))}
                <button
                  onClick={() => {
                    const newTask = { id: Date.now(), title: 'New Task', assignee: '' };
                    setTaskBoard({ ...taskBoard, [column]: [...(taskBoard[column] || []), newTask] });
                  }}
                  className="w-full p-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Add Task
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* User Flows */}
      <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">User Flows</h2>
        <p className="text-gray-600 mb-6">Document key user journeys and flows.</p>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">Primary User Flow</label>
            <textarea
              value={userFlows.primary}
              onChange={(e) => setUserFlows({ ...userFlows, primary: e.target.value })}
              className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-black focus:border-transparent resize-none"
              rows="6"
              placeholder="Step 1: User lands on homepage...&#10;Step 2: User clicks sign up...&#10;Step 3: User fills form..."
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">Secondary Flows</label>
            <textarea
              value={userFlows.secondary}
              onChange={(e) => setUserFlows({ ...userFlows, secondary: e.target.value })}
              className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-black focus:border-transparent resize-none"
              rows="6"
              placeholder="Other important user journeys..."
            />
          </div>
        </div>
      </div>

      {/* Wireframes */}
      <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Wireframes</h2>
        <p className="text-gray-600 mb-6">Upload or link to your wireframe designs.</p>
        <div className="space-y-4">
          {wireframes.map((wireframe) => (
            <div key={wireframe.id} className="p-4 bg-gray-50 rounded-xl border border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Page Name</label>
                  <input
                    type="text"
                    value={wireframe.page}
                    onChange={(e) => setWireframes(wireframes.map(w => w.id === wireframe.id ? { ...w, page: e.target.value } : w))}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent mb-3"
                    placeholder="Homepage, Dashboard, Settings..."
                  />
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Wireframe URL</label>
                  <input
                    type="url"
                    value={wireframe.url}
                    onChange={(e) => setWireframes(wireframes.map(w => w.id === wireframe.id ? { ...w, url: e.target.value } : w))}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                    placeholder="https://figma.com/file/..."
                  />
                </div>
                <button
                  onClick={() => setWireframes(wireframes.filter(w => w.id !== wireframe.id))}
                  className="ml-4 text-red-600 hover:text-red-700"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
          <button
            onClick={() => setWireframes([...wireframes, { id: Date.now(), page: '', url: '' }])}
            className="w-full p-4 border-2 border-dashed border-gray-300 rounded-xl text-center hover:border-gray-400 transition-colors flex items-center justify-center gap-2 text-gray-600 hover:text-gray-900"
          >
            <Plus className="w-5 h-5" />
            Add Wireframe
          </button>
        </div>
      </div>

      {/* Prototype */}
      <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Prototype</h2>
        <p className="text-gray-600 mb-6">Link to your interactive prototype or design tool.</p>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">Prototype URL</label>
            <input
              type="url"
              value={prototype.url}
              onChange={(e) => setPrototype({ ...prototype, url: e.target.value })}
              className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-black focus:border-transparent"
              placeholder="https://figma.com/..."
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">Notes</label>
            <textarea
              value={prototype.notes}
              onChange={(e) => setPrototype({ ...prototype, notes: e.target.value })}
              className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-black focus:border-transparent resize-none"
              rows="3"
              placeholder="Prototype notes, feedback, iterations..."
            />
          </div>
        </div>
      </div>

      {/* Development Milestones */}
      <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Development Milestones</h2>
            <p className="text-gray-600">Track major development milestones and releases.</p>
          </div>
          <button
            onClick={() => setDevMilestones([...devMilestones, { id: Date.now(), milestone: '', date: '', status: 'upcoming', description: '' }])}
            className="px-4 py-2 bg-black text-white rounded-xl hover:bg-gray-800 transition-colors text-sm font-semibold flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Add Milestone
          </button>
        </div>
        <div className="space-y-4">
          {devMilestones.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <p>No milestones defined yet. Add your first milestone to get started.</p>
            </div>
          ) : (
            devMilestones.map((milestone) => (
              <div key={milestone.id} className="p-6 bg-gray-50 rounded-xl border border-gray-200">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-900 mb-2">Milestone</label>
                    <input
                      type="text"
                      value={milestone.milestone}
                      onChange={(e) => setDevMilestones(devMilestones.map(m => m.id === milestone.id ? { ...m, milestone: e.target.value } : m))}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                      placeholder="e.g., MVP Launch, Beta Release..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">Target Date</label>
                    <input
                      type="date"
                      value={milestone.date}
                      onChange={(e) => setDevMilestones(devMilestones.map(m => m.id === milestone.id ? { ...m, date: e.target.value } : m))}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">Description</label>
                    <textarea
                      value={milestone.description}
                      onChange={(e) => setDevMilestones(devMilestones.map(m => m.id === milestone.id ? { ...m, description: e.target.value } : m))}
                      className="w-full p-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-black focus:border-transparent"
                      rows="3"
                      placeholder="What will be delivered in this milestone?"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">Status</label>
                    <select
                      value={milestone.status}
                      onChange={(e) => setDevMilestones(devMilestones.map(m => m.id === milestone.id ? { ...m, status: e.target.value } : m))}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                    >
                      <option value="upcoming">Upcoming</option>
                      <option value="inprogress">In Progress</option>
                      <option value="completed">Completed</option>
                      <option value="delayed">Delayed</option>
                    </select>
                  </div>
                </div>
                <button
                  onClick={() => setDevMilestones(devMilestones.filter(m => m.id !== milestone.id))}
                  className="text-red-600 hover:text-red-700 text-sm font-semibold flex items-center gap-2"
                >
                  <Trash2 className="w-4 h-4" />
                  Remove
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );

  // Render MVP Testing Tab
  const renderMVPTesting = () => (
    <div className="space-y-6">
      {/* Test Plan */}
    <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Test Plan</h2>
            <p className="text-gray-600">Define test scenarios and test cases.</p>
          </div>
          <button
            onClick={() => setTestPlan({ ...testPlan, scenarios: [...(testPlan.scenarios || []), { id: Date.now(), scenario: '', steps: '', expected: '', status: 'pending' }] })}
            className="px-4 py-2 bg-black text-white rounded-xl hover:bg-gray-800 transition-colors text-sm font-semibold flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Add Test Scenario
          </button>
        </div>
        <div className="space-y-4">
          {(testPlan.scenarios || []).length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <p>No test scenarios defined yet. Add your first test scenario to get started.</p>
            </div>
          ) : (
            (testPlan.scenarios || []).map((scenario) => (
              <div key={scenario.id} className="p-6 bg-gray-50 rounded-xl border border-gray-200">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">Test Scenario</label>
                    <input
                      type="text"
                      value={scenario.scenario}
                      onChange={(e) => setTestPlan({ ...testPlan, scenarios: (testPlan.scenarios || []).map(s => s.id === scenario.id ? { ...s, scenario: e.target.value } : s) })}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                      placeholder="Test scenario name..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">Status</label>
                    <select
                      value={scenario.status}
                      onChange={(e) => setTestPlan({ ...testPlan, scenarios: (testPlan.scenarios || []).map(s => s.id === scenario.id ? { ...s, status: e.target.value } : s) })}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                    >
                      <option value="pending">Pending</option>
                      <option value="inprogress">In Progress</option>
                      <option value="passed">Passed</option>
                      <option value="failed">Failed</option>
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">Test Steps</label>
                    <textarea
                      value={scenario.steps}
                      onChange={(e) => setTestPlan({ ...testPlan, scenarios: (testPlan.scenarios || []).map(s => s.id === scenario.id ? { ...s, steps: e.target.value } : s) })}
                      className="w-full p-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-black focus:border-transparent"
                      rows="3"
                      placeholder="Step 1: ...&#10;Step 2: ..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">Expected Result</label>
                    <textarea
                      value={scenario.expected}
                      onChange={(e) => setTestPlan({ ...testPlan, scenarios: (testPlan.scenarios || []).map(s => s.id === scenario.id ? { ...s, expected: e.target.value } : s) })}
                      className="w-full p-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-black focus:border-transparent"
                      rows="3"
                      placeholder="What should happen?"
                    />
                  </div>
                </div>
                <button
                  onClick={() => setTestPlan({ ...testPlan, scenarios: (testPlan.scenarios || []).filter(s => s.id !== scenario.id) })}
                  className="text-red-600 hover:text-red-700 text-sm font-semibold flex items-center gap-2"
                >
                  <Trash2 className="w-4 h-4" />
                  Remove
                </button>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Beta User Cohort */}
      <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Beta User Cohort</h2>
            <p className="text-gray-600">Manage your beta testing users.</p>
          </div>
          <button
            onClick={() => setBetaUsers([...betaUsers, { id: Date.now(), name: '', email: '', role: 'tester', status: 'invited', feedback: '' }])}
            className="px-4 py-2 bg-black text-white rounded-xl hover:bg-gray-800 transition-colors text-sm font-semibold flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Add Beta User
          </button>
        </div>
        <div className="space-y-4">
          {betaUsers.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <p>No beta users added yet. Add your first beta user to get started.</p>
            </div>
          ) : (
            betaUsers.map((user) => (
              <div key={user.id} className="p-6 bg-gray-50 rounded-xl border border-gray-200">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">Name</label>
                    <input
                      type="text"
                      value={user.name}
                      onChange={(e) => setBetaUsers(betaUsers.map(u => u.id === user.id ? { ...u, name: e.target.value } : u))}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                      placeholder="User name..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">Email</label>
                    <input
                      type="email"
                      value={user.email}
                      onChange={(e) => setBetaUsers(betaUsers.map(u => u.id === user.id ? { ...u, email: e.target.value } : u))}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                      placeholder="user@example.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">Status</label>
                    <select
                      value={user.status}
                      onChange={(e) => setBetaUsers(betaUsers.map(u => u.id === user.id ? { ...u, status: e.target.value } : u))}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                    >
                      <option value="invited">Invited</option>
                      <option value="active">Active</option>
                      <option value="completed">Completed</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Feedback</label>
                  <textarea
                    value={user.feedback}
                    onChange={(e) => setBetaUsers(betaUsers.map(u => u.id === user.id ? { ...u, feedback: e.target.value } : u))}
                    className="w-full p-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-black focus:border-transparent"
                    rows="2"
                    placeholder="User feedback and notes..."
                  />
                </div>
                <button
                  onClick={() => setBetaUsers(betaUsers.filter(u => u.id !== user.id))}
                  className="mt-3 text-red-600 hover:text-red-700 text-sm font-semibold flex items-center gap-2"
                >
                  <Trash2 className="w-4 h-4" />
                  Remove
                </button>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Bug Tracking */}
      <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Bug Tracking</h2>
            <p className="text-gray-600">Track and manage bugs found during testing.</p>
          </div>
          <button
            onClick={() => setBugs([...bugs, { id: Date.now(), title: '', severity: 'medium', status: 'open', description: '', steps: '' }])}
            className="px-4 py-2 bg-black text-white rounded-xl hover:bg-gray-800 transition-colors text-sm font-semibold flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Report Bug
          </button>
        </div>
        <div className="space-y-4">
          {bugs.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <p>No bugs reported yet. Great job!</p>
            </div>
          ) : (
            bugs.map((bug) => (
              <div key={bug.id} className="p-6 bg-gray-50 rounded-xl border border-gray-200">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-900 mb-2">Bug Title</label>
                    <input
                      type="text"
                      value={bug.title}
                      onChange={(e) => setBugs(bugs.map(b => b.id === bug.id ? { ...b, title: e.target.value } : b))}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                      placeholder="Brief description of the bug..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">Severity</label>
                    <select
                      value={bug.severity}
                      onChange={(e) => setBugs(bugs.map(b => b.id === bug.id ? { ...b, severity: e.target.value } : b))}
                      className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-black focus:border-transparent ${
                        bug.severity === 'critical' ? 'bg-red-50 border-red-300' :
                        bug.severity === 'high' ? 'bg-orange-50 border-orange-300' :
                        bug.severity === 'medium' ? 'bg-yellow-50 border-yellow-300' :
                        'bg-blue-50 border-blue-300'
                      }`}
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                      <option value="critical">Critical</option>
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">Steps to Reproduce</label>
                    <textarea
                      value={bug.steps}
                      onChange={(e) => setBugs(bugs.map(b => b.id === bug.id ? { ...b, steps: e.target.value } : b))}
                      className="w-full p-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-black focus:border-transparent"
                      rows="3"
                      placeholder="1. Go to...&#10;2. Click on...&#10;3. See error..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">Description</label>
                    <textarea
                      value={bug.description}
                      onChange={(e) => setBugs(bugs.map(b => b.id === bug.id ? { ...b, description: e.target.value } : b))}
                      className="w-full p-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-black focus:border-transparent"
                      rows="3"
                      placeholder="What happens? What should happen?"
                    />
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">Status</label>
                    <select
                      value={bug.status}
                      onChange={(e) => setBugs(bugs.map(b => b.id === bug.id ? { ...b, status: e.target.value } : b))}
                      className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                    >
                      <option value="open">Open</option>
                      <option value="inprogress">In Progress</option>
                      <option value="fixed">Fixed</option>
                      <option value="closed">Closed</option>
                    </select>
                  </div>
                  <button
                    onClick={() => setBugs(bugs.filter(b => b.id !== bug.id))}
                    className="text-red-600 hover:text-red-700 text-sm font-semibold flex items-center gap-2"
                  >
                    <Trash2 className="w-4 h-4" />
                    Remove
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Usability Testing */}
      <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Usability Testing</h2>
        <p className="text-gray-600 mb-6">Document usability test results and findings.</p>
        <div className="space-y-4">
          {usabilityResults.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <p>No usability tests documented yet. Add your first test result to get started.</p>
            </div>
          ) : (
            usabilityResults.map((result, index) => (
              <div key={result.id || index} className="p-6 bg-gray-50 rounded-xl border border-gray-200">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">Test Task</label>
                    <input
                      type="text"
                      value={result.task || ''}
                      onChange={(e) => setUsabilityResults(usabilityResults.map((r, i) => i === index ? { ...r, task: e.target.value } : r))}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                      placeholder="What task did users perform?"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">Success Rate (%)</label>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={result.rate || ''}
                      onChange={(e) => setUsabilityResults(usabilityResults.map((r, i) => i === index ? { ...r, rate: parseInt(e.target.value) || 0 } : r))}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                      placeholder="0-100%"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-900 mb-2">Findings</label>
                    <textarea
                      value={result.findings || ''}
                      onChange={(e) => setUsabilityResults(usabilityResults.map((r, i) => i === index ? { ...r, findings: e.target.value } : r))}
                      className="w-full p-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-black focus:border-transparent"
                      rows="3"
                      placeholder="What did you learn from this test?"
                    />
                  </div>
                </div>
                <button
                  onClick={() => setUsabilityResults(usabilityResults.filter((_, i) => i !== index))}
                  className="mt-3 text-red-600 hover:text-red-700 text-sm font-semibold flex items-center gap-2"
                >
                  <Trash2 className="w-4 h-4" />
                  Remove
                </button>
              </div>
            ))
          )}
          <button
            onClick={() => setUsabilityResults([...usabilityResults, { id: Date.now(), task: '', rate: 0, findings: '' }])}
            className="w-full p-4 border-2 border-dashed border-gray-300 rounded-xl text-gray-600 hover:text-gray-900 hover:border-gray-400 flex items-center justify-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Add Test Result
          </button>
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Performance Metrics</h2>
        <p className="text-gray-600 mb-6">Track key performance indicators and metrics.</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
            <h3 className="font-semibold text-gray-900 mb-2">Page Load Time</h3>
            <div className="text-3xl font-bold text-blue-700 mb-2">
              {performanceMetrics.loadTime || '0'}ms
            </div>
            <input
              type="number"
              value={performanceMetrics.loadTime || ''}
              onChange={(e) => setPerformanceMetrics({ ...performanceMetrics, loadTime: parseInt(e.target.value) })}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter time in ms"
            />
          </div>
          <div className="bg-green-50 rounded-xl p-6 border border-green-200">
            <h3 className="font-semibold text-gray-900 mb-2">API Response Time</h3>
            <div className="text-3xl font-bold text-green-700 mb-2">
              {performanceMetrics.apiTime || '0'}ms
            </div>
            <input
              type="number"
              value={performanceMetrics.apiTime || ''}
              onChange={(e) => setPerformanceMetrics({ ...performanceMetrics, apiTime: parseInt(e.target.value) })}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="Enter time in ms"
            />
          </div>
          <div className="bg-purple-50 rounded-xl p-6 border border-purple-200">
            <h3 className="font-semibold text-gray-900 mb-2">Error Rate</h3>
            <div className="text-3xl font-bold text-purple-700 mb-2">
              {performanceMetrics.errorRate || '0'}%
            </div>
            <input
              type="number"
              min="0"
              max="100"
              value={performanceMetrics.errorRate || ''}
              onChange={(e) => setPerformanceMetrics({ ...performanceMetrics, errorRate: parseInt(e.target.value) })}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="Enter percentage"
            />
          </div>
        </div>
      </div>
    </div>
  );

  // Render Feedback Board Tab
  const renderFeedbackBoard = () => (
    <div className="space-y-6">
      {/* Feedback Board */}
    <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Feedback Board</h2>
            <p className="text-gray-600">Collect and organize user feedback.</p>
          </div>
          <button
            onClick={() => setFeedbackItems([...feedbackItems, { id: Date.now(), feedback: '', source: '', category: 'general', status: 'new', priority: 'medium' }])}
            className="px-4 py-2 bg-black text-white rounded-xl hover:bg-gray-800 transition-colors text-sm font-semibold flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Add Feedback
          </button>
        </div>
        <div className="space-y-4">
          {feedbackItems.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <p>No feedback collected yet. Add your first feedback item to get started.</p>
            </div>
          ) : (
            feedbackItems.map((item) => (
              <div key={item.id} className="p-6 bg-gray-50 rounded-xl border border-gray-200">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-900 mb-2">Feedback</label>
                    <textarea
                      value={item.feedback}
                      onChange={(e) => setFeedbackItems(feedbackItems.map(f => f.id === item.id ? { ...f, feedback: e.target.value } : f))}
                      className="w-full p-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-black focus:border-transparent"
                      rows="3"
                      placeholder="User feedback..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">Source</label>
                    <input
                      type="text"
                      value={item.source}
                      onChange={(e) => setFeedbackItems(feedbackItems.map(f => f.id === item.id ? { ...f, source: e.target.value } : f))}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                      placeholder="User, email, survey..."
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">Category</label>
                    <select
                      value={item.category}
                      onChange={(e) => setFeedbackItems(feedbackItems.map(f => f.id === item.id ? { ...f, category: e.target.value } : f))}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                    >
                      <option value="general">General</option>
                      <option value="bug">Bug</option>
                      <option value="feature">Feature Request</option>
                      <option value="ui">UI/UX</option>
                      <option value="performance">Performance</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">Status</label>
                    <select
                      value={item.status}
                      onChange={(e) => setFeedbackItems(feedbackItems.map(f => f.id === item.id ? { ...f, status: e.target.value } : f))}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                    >
                      <option value="new">New</option>
                      <option value="reviewing">Reviewing</option>
                      <option value="addressed">Addressed</option>
                      <option value="dismissed">Dismissed</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">Priority</label>
                    <select
                      value={item.priority}
                      onChange={(e) => setFeedbackItems(feedbackItems.map(f => f.id === item.id ? { ...f, priority: e.target.value } : f))}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                    </select>
                  </div>
                </div>
                <button
                  onClick={() => setFeedbackItems(feedbackItems.filter(f => f.id !== item.id))}
                  className="text-red-600 hover:text-red-700 text-sm font-semibold flex items-center gap-2"
                >
                  <Trash2 className="w-4 h-4" />
                  Remove
                </button>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Feature Requests Log */}
      <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Feature Requests Log</h2>
            <p className="text-gray-600">Track and prioritize feature requests from users.</p>
          </div>
          <button
            onClick={() => setFeatureRequests([...featureRequests, { id: Date.now(), request: '', requester: '', votes: 0, status: 'under-review', priority: 'medium' }])}
            className="px-4 py-2 bg-black text-white rounded-xl hover:bg-gray-800 transition-colors text-sm font-semibold flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Add Request
          </button>
        </div>
        <div className="space-y-4">
          {featureRequests.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <p>No feature requests yet. Add your first request to get started.</p>
            </div>
          ) : (
            featureRequests.map((request) => (
              <div key={request.id} className="p-6 bg-gray-50 rounded-xl border border-gray-200">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <textarea
                      value={request.request}
                      onChange={(e) => setFeatureRequests(featureRequests.map(r => r.id === request.id ? { ...r, request: e.target.value } : r))}
                      className="w-full p-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-black focus:border-transparent"
                      rows="2"
                      placeholder="Feature request description..."
                    />
                  </div>
                  <div className="ml-4 flex items-center gap-2">
                    <button
                      onClick={() => setFeatureRequests(featureRequests.map(r => r.id === request.id ? { ...r, votes: r.votes + 1 } : r))}
                      className="px-3 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 flex items-center gap-2"
                    >
                      <span className="font-semibold">{request.votes}</span>
                      <span>↑</span>
                    </button>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">Requester</label>
                    <input
                      type="text"
                      value={request.requester}
                      onChange={(e) => setFeatureRequests(featureRequests.map(r => r.id === request.id ? { ...r, requester: e.target.value } : r))}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                      placeholder="User name or email..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">Status</label>
                    <select
                      value={request.status}
                      onChange={(e) => setFeatureRequests(featureRequests.map(r => r.id === request.id ? { ...r, status: e.target.value } : r))}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                    >
                      <option value="under-review">Under Review</option>
                      <option value="planned">Planned</option>
                      <option value="in-progress">In Progress</option>
                      <option value="completed">Completed</option>
                      <option value="rejected">Rejected</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">Priority</label>
                    <select
                      value={request.priority}
                      onChange={(e) => setFeatureRequests(featureRequests.map(r => r.id === request.id ? { ...r, priority: e.target.value } : r))}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                    </select>
                  </div>
                </div>
                <button
                  onClick={() => setFeatureRequests(featureRequests.filter(r => r.id !== request.id))}
                  className="text-red-600 hover:text-red-700 text-sm font-semibold flex items-center gap-2"
                >
                  <Trash2 className="w-4 h-4" />
                  Remove
                </button>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Iteration Roadmap */}
      <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Iteration Roadmap</h2>
            <p className="text-gray-600">Plan your product iterations and releases.</p>
          </div>
          <button
            onClick={() => setIterationRoadmap([...iterationRoadmap, { id: Date.now(), version: '', features: '', date: '', status: 'planned' }])}
            className="px-4 py-2 bg-black text-white rounded-xl hover:bg-gray-800 transition-colors text-sm font-semibold flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Add Iteration
          </button>
        </div>
        <div className="space-y-4">
          {iterationRoadmap.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <p>No iterations planned yet. Add your first iteration to get started.</p>
            </div>
          ) : (
            iterationRoadmap.map((iteration) => (
              <div key={iteration.id} className="p-6 bg-gray-50 rounded-xl border border-gray-200">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">Version</label>
                    <input
                      type="text"
                      value={iteration.version}
                      onChange={(e) => setIterationRoadmap(iterationRoadmap.map(i => i.id === iteration.id ? { ...i, version: e.target.value } : i))}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                      placeholder="v1.0, v1.1..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">Release Date</label>
                    <input
                      type="date"
                      value={iteration.date}
                      onChange={(e) => setIterationRoadmap(iterationRoadmap.map(i => i.id === iteration.id ? { ...i, date: e.target.value } : i))}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">Status</label>
                    <select
                      value={iteration.status}
                      onChange={(e) => setIterationRoadmap(iterationRoadmap.map(i => i.id === iteration.id ? { ...i, status: e.target.value } : i))}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                    >
                      <option value="planned">Planned</option>
                      <option value="in-progress">In Progress</option>
                      <option value="released">Released</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Features</label>
                  <textarea
                    value={iteration.features}
                    onChange={(e) => setIterationRoadmap(iterationRoadmap.map(i => i.id === iteration.id ? { ...i, features: e.target.value } : i))}
                    className="w-full p-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-black focus:border-transparent"
                    rows="4"
                    placeholder="List the features and improvements in this iteration..."
                  />
                </div>
                <button
                  onClick={() => setIterationRoadmap(iterationRoadmap.filter(i => i.id !== iteration.id))}
                  className="mt-3 text-red-600 hover:text-red-700 text-sm font-semibold flex items-center gap-2"
                >
                  <Trash2 className="w-4 h-4" />
                  Remove
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );

  // Render DemoKit Tab
  const renderDemoKit = () => (
    <div className="space-y-6">
      {/* Demo Videos */}
    <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Demo Videos</h2>
            <p className="text-gray-600">Upload and manage your product demo videos.</p>
          </div>
          <button
            onClick={() => setDemoVideos([...demoVideos, { id: Date.now(), title: '', url: '', description: '', duration: '' }])}
            className="px-4 py-2 bg-black text-white rounded-xl hover:bg-gray-800 transition-colors text-sm font-semibold flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Add Video
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {demoVideos.length === 0 ? (
            <div className="col-span-2 text-center py-12 text-gray-500">
              <Video className="w-16 h-16 mx-auto mb-4 text-gray-400" />
              <p>No demo videos added yet. Add your first video to get started.</p>
            </div>
          ) : (
            demoVideos.map((video) => (
              <div key={video.id} className="p-6 bg-gray-50 rounded-xl border border-gray-200">
                <div className="mb-4">
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Video Title</label>
                  <input
                    type="text"
                    value={video.title}
                    onChange={(e) => setDemoVideos(demoVideos.map(v => v.id === video.id ? { ...v, title: e.target.value } : v))}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                    placeholder="Video title..."
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Video URL</label>
                  <input
                    type="url"
                    value={video.url}
                    onChange={(e) => setDemoVideos(demoVideos.map(v => v.id === video.id ? { ...v, url: e.target.value } : v))}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                    placeholder="https://youtube.com/... or https://vimeo.com/..."
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Description</label>
                  <textarea
                    value={video.description}
                    onChange={(e) => setDemoVideos(demoVideos.map(v => v.id === video.id ? { ...v, description: e.target.value } : v))}
                    className="w-full p-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-black focus:border-transparent"
                    rows="2"
                    placeholder="Video description..."
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">Duration</label>
                    <input
                      type="text"
                      value={video.duration}
                      onChange={(e) => setDemoVideos(demoVideos.map(v => v.id === video.id ? { ...v, duration: e.target.value } : v))}
                      className="w-24 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                      placeholder="0:00"
                    />
                  </div>
                  <button
                    onClick={() => setDemoVideos(demoVideos.filter(v => v.id !== video.id))}
                    className="text-red-600 hover:text-red-700 text-sm font-semibold flex items-center gap-2"
                  >
                    <Trash2 className="w-4 h-4" />
                    Remove
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Screenshots */}
      <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Screenshots</h2>
            <p className="text-gray-600">Showcase your product with screenshots.</p>
          </div>
          <button
            onClick={() => setScreenshots([...screenshots, { id: Date.now(), title: '', url: '', description: '' }])}
            className="px-4 py-2 bg-black text-white rounded-xl hover:bg-gray-800 transition-colors text-sm font-semibold flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Add Screenshot
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {screenshots.length === 0 ? (
            <div className="col-span-3 text-center py-12 text-gray-500">
              <Image className="w-16 h-16 mx-auto mb-4 text-gray-400" />
              <p>No screenshots added yet. Add your first screenshot to get started.</p>
            </div>
          ) : (
            screenshots.map((screenshot) => (
              <div key={screenshot.id} className="p-6 bg-gray-50 rounded-xl border border-gray-200">
                <div className="mb-4 aspect-video bg-gray-200 rounded-lg flex items-center justify-center">
                  {screenshot.url ? (
                    <img src={screenshot.url} alt={screenshot.title} className="w-full h-full object-cover rounded-lg" />
                  ) : (
                    <Upload className="w-12 h-12 text-gray-400" />
                  )}
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Title</label>
                  <input
                    type="text"
                    value={screenshot.title}
                    onChange={(e) => setScreenshots(screenshots.map(s => s.id === screenshot.id ? { ...s, title: e.target.value } : s))}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                    placeholder="Screenshot title..."
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Image URL</label>
                  <input
                    type="url"
                    value={screenshot.url}
                    onChange={(e) => setScreenshots(screenshots.map(s => s.id === screenshot.id ? { ...s, url: e.target.value } : s))}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent text-xs"
                    placeholder="https://..."
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Description</label>
                  <textarea
                    value={screenshot.description}
                    onChange={(e) => setScreenshots(screenshots.map(s => s.id === screenshot.id ? { ...s, description: e.target.value } : s))}
                    className="w-full p-2 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-black focus:border-transparent text-xs"
                    rows="2"
                    placeholder="What does this screenshot show?"
                  />
                </div>
                <button
                  onClick={() => setScreenshots(screenshots.filter(s => s.id !== screenshot.id))}
                  className="w-full text-red-600 hover:text-red-700 text-sm font-semibold flex items-center justify-center gap-2"
                >
                  <Trash2 className="w-4 h-4" />
                  Remove
                </button>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Presentations */}
      <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Presentations</h2>
            <p className="text-gray-600">Store and manage your pitch decks and presentations.</p>
          </div>
          <button
            onClick={() => setPresentations([...presentations, { id: Date.now(), title: '', url: '', description: '', type: 'pitch-deck' }])}
            className="px-4 py-2 bg-black text-white rounded-xl hover:bg-gray-800 transition-colors text-sm font-semibold flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Add Presentation
          </button>
        </div>
        <div className="space-y-4">
          {presentations.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <Presentation className="w-16 h-16 mx-auto mb-4 text-gray-400" />
              <p>No presentations added yet. Add your first presentation to get started.</p>
            </div>
          ) : (
            presentations.map((presentation) => (
              <div key={presentation.id} className="p-6 bg-gray-50 rounded-xl border border-gray-200">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-900 mb-2">Title</label>
                    <input
                      type="text"
                      value={presentation.title}
                      onChange={(e) => setPresentations(presentations.map(p => p.id === presentation.id ? { ...p, title: e.target.value } : p))}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                      placeholder="Presentation title..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">Type</label>
                    <select
                      value={presentation.type}
                      onChange={(e) => setPresentations(presentations.map(p => p.id === presentation.id ? { ...p, type: e.target.value } : p))}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                    >
                      <option value="pitch-deck">Pitch Deck</option>
                      <option value="product-demo">Product Demo</option>
                      <option value="investor-update">Investor Update</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-semibold text-gray-900 mb-2">URL or File Link</label>
                  <input
                    type="url"
                    value={presentation.url}
                    onChange={(e) => setPresentations(presentations.map(p => p.id === presentation.id ? { ...p, url: e.target.value } : p))}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                    placeholder="https://drive.google.com/... or https://..."
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Description</label>
                  <textarea
                    value={presentation.description}
                    onChange={(e) => setPresentations(presentations.map(p => p.id === presentation.id ? { ...p, description: e.target.value } : p))}
                    className="w-full p-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-black focus:border-transparent"
                    rows="2"
                    placeholder="Presentation description and notes..."
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <button className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 flex items-center gap-2 text-sm">
                      <Download className="w-4 h-4" />
                      Download
                    </button>
                    <button className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 flex items-center gap-2 text-sm">
                      <Play className="w-4 h-4" />
                      View
                    </button>
                  </div>
                  <button
                    onClick={() => setPresentations(presentations.filter(p => p.id !== presentation.id))}
                    className="text-red-600 hover:text-red-700 text-sm font-semibold flex items-center gap-2"
                  >
                    <Trash2 className="w-4 h-4" />
                    Remove
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-6">
        {/* Pitch Selector */}
        {renderPitchSelector()}
        
        {/* Tabs */}
        <div className="mb-6">
          <div className="bg-white rounded-2xl p-2 shadow-lg border border-gray-100">
            <div className="flex flex-wrap gap-2">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    disabled={!selectedPitchId}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl font-semibold transition-all duration-300 ${
                      isActive
                        ? 'bg-gray-900 text-white shadow-lg'
                        : !selectedPitchId
                        ? 'text-gray-300 cursor-not-allowed'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Tab Content */}
        {loadingData ? (
          renderLoadingState()
        ) : !selectedPitchId ? (
          renderNoPitchState()
        ) : (
          <>
            {activeTab === 'ideaframing' && renderIdeaFraming()}
            {activeTab === 'ideavalidation' && renderIdeaValidation()}
            {activeTab === 'featurematrix' && renderFeatureMatrix()}
            {activeTab === 'mvpdevelopment' && renderMVPDevelopment()}
            {activeTab === 'mvptesting' && renderMVPTesting()}
            {activeTab === 'feedbackboard' && renderFeedbackBoard()}
            {activeTab === 'demokit' && renderDemoKit()}
          </>
        )}
      </div>
    </div>
  );
};

export default Sprinto;