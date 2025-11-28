import React, { useState, useEffect } from 'react';
import { 
  Rocket, Target, CheckCircle, Clock, AlertCircle, 
  BarChart3, TrendingUp, Award, Star, Zap, Users,
  Calendar, FileText, MessageSquare, Video, Plus, MapPin,
  Edit3, Download, Share2, Shield, ShieldCheck,
  AlertTriangle, X, Copy, DollarSign, ExternalLink, Gift, Link, ThumbsUp, Globe, Upload
} from 'lucide-react';

const LaunchPreparation = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [launches, setLaunches] = useState([]);
  const [selectedLaunch, setSelectedLaunch] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [newLaunch, setNewLaunch] = useState({
    name: '',
    description: '',
    launchDate: '',
    targetAudience: '',
    channels: [],
    metrics: []
  });
  
  // Countdown timer state
  const [countdown, setCountdown] = useState({ days: 45, hours: 12, minutes: 34, seconds: 56 });
  
  // Launch Tracker state
  const [tasks, setTasks] = useState([
    {
      id: 1,
      task: 'Finalize landing page design',
      category: 'Product',
      assignee: 'Alex Chen',
      dueDate: '2024-03-15',
      status: 'in-progress',
      dependencies: ['Design system complete'],
      blockers: [],
      progress: 75
    },
    {
      id: 2,
      task: 'Set up analytics tracking',
      category: 'GTM',
      assignee: 'Sarah Martinez',
      dueDate: '2024-03-18',
      status: 'pending',
      dependencies: ['Landing page live'],
      blockers: ['Waiting on dev team'],
      progress: 30
    },
    {
      id: 3,
      task: 'Complete legal documentation',
      category: 'Legal',
      assignee: 'Legal Team',
      dueDate: '2024-03-20',
      status: 'in-progress',
      dependencies: ['Incorporation complete'],
      blockers: [],
      progress: 60
    },
    {
      id: 4,
      task: 'Press kit preparation',
      category: 'GTM',
      assignee: 'Sarah Martinez',
      dueDate: '2024-03-22',
      status: 'pending',
      dependencies: ['Founder bios', 'Product screenshots'],
      blockers: [],
      progress: 40
    }
  ]);
  
  // Success Metrics state
  const [metrics, setMetrics] = useState({
    waitlistSignups: { current: 1247, target: 2000 },
    websiteVisitors: { current: 8542, target: 15000 },
    conversionRate: { current: 12.5, target: 15.0 },
    socialEngagement: { current: 3821, target: 5000 }
  });
  
  // Launch Story state
  const [launchStory, setLaunchStory] = useState('TechFlow AI is revolutionizing remote work with AI-powered workflow automation. Founded by Alex Chen (ex-Google) and Sarah Martinez (ex-McKinsey), we\'re on a mission to help distributed teams work smarter, not harder. After 6 months of development and beta testing with 1,250+ users, we\'re launching our MVP this May. Join us in building the future of work.');
  const [isEditingStory, setIsEditingStory] = useState(false);
  
  // Modal states
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [newTask, setNewTask] = useState({
    task: '',
    category: 'Product',
    assignee: '',
    dueDate: '',
    dependencies: '',
    blockers: '',
    progress: 0
  });

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'product', label: 'Product Readiness', icon: Target },
    { id: 'dataroom', label: 'Data Room', icon: Shield },
    { id: 'gtm', label: 'GTM', icon: TrendingUp },
    { id: 'pitching', label: 'Pitching', icon: Rocket },
    { id: 'perks', label: 'Perks & Powerups', icon: Gift },
    { id: 'visa', label: 'Visa to StartupOS', icon: Award }
  ];

  const gtmChannels = [
    {
      id: 'social-media',
      name: 'Social Media',
      description: 'Facebook, Instagram, Twitter, LinkedIn marketing',
      cost: 'Medium',
      reach: 'High',
      conversion: 'Medium'
    },
    {
      id: 'content-marketing',
      name: 'Content Marketing',
      description: 'Blog posts, SEO, thought leadership',
      cost: 'Low',
      reach: 'Medium',
      conversion: 'High'
    },
    {
      id: 'paid-advertising',
      name: 'Paid Advertising',
      description: 'Google Ads, Facebook Ads, display advertising',
      cost: 'High',
      reach: 'High',
      conversion: 'Medium'
    },
    {
      id: 'pr',
      name: 'Public Relations',
      description: 'Press releases, media outreach, influencer partnerships',
      cost: 'Medium',
      reach: 'Medium',
      conversion: 'High'
    },
    {
      id: 'partnerships',
      name: 'Partnerships',
      description: 'Strategic partnerships and collaborations',
      cost: 'Low',
      reach: 'Medium',
      conversion: 'High'
    },
    {
      id: 'events',
      name: 'Events & Conferences',
      description: 'Trade shows, conferences, networking events',
      cost: 'High',
      reach: 'Low',
      conversion: 'High'
    }
  ];

  const investorReadiness = [
    {
      id: 'pitch-deck',
      name: 'Pitch Deck',
      description: '10-15 slide presentation covering key points',
      status: 'completed',
      priority: 'high'
    },
    {
      id: 'financial-model',
      name: 'Financial Model',
      description: '3-5 year financial projections and assumptions',
      status: 'in_progress',
      priority: 'high'
    },
    {
      id: 'business-plan',
      name: 'Business Plan',
      description: 'Comprehensive business strategy document',
      status: 'pending',
      priority: 'medium'
    },
    {
      id: 'market-analysis',
      name: 'Market Analysis',
      description: 'TAM, SAM, SOM and competitive landscape',
      status: 'completed',
      priority: 'high'
    },
    {
      id: 'team-bios',
      name: 'Team Bios',
      description: 'Founder and key team member backgrounds',
      status: 'completed',
      priority: 'medium'
    },
    {
      id: 'demo',
      name: 'Product Demo',
      description: 'Working prototype or MVP demonstration',
      status: 'in_progress',
      priority: 'high'
    }
  ];

  useEffect(() => {
    loadLaunches();
  }, []);

  // Countdown timer effect
  useEffect(() => {
    const launchDate = new Date('2024-05-01T00:00:00');
    
    const updateCountdown = () => {
      const now = new Date();
      const diff = launchDate - now;
      
      if (diff > 0) {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        
        setCountdown({ days, hours, minutes, seconds });
      } else {
        setCountdown({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };
    
    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    
    return () => clearInterval(interval);
  }, []);

  // Task management handlers
  const handleAddTask = () => {
    setEditingTask(null);
    setNewTask({
      task: '',
      category: 'Product',
      assignee: '',
      dueDate: '',
      dependencies: '',
      blockers: '',
      progress: 0
    });
    setShowTaskModal(true);
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
    setNewTask({
      task: task.task,
      category: task.category,
      assignee: task.assignee,
      dueDate: task.dueDate,
      dependencies: task.dependencies.join(', '),
      blockers: task.blockers.join(', '),
      progress: task.progress
    });
    setShowTaskModal(true);
  };

  const handleSaveTask = () => {
    if (editingTask) {
      setTasks(tasks.map(t => 
        t.id === editingTask.id 
          ? {
              ...t,
              task: newTask.task,
              category: newTask.category,
              assignee: newTask.assignee,
              dueDate: newTask.dueDate,
              dependencies: newTask.dependencies ? newTask.dependencies.split(',').map(d => d.trim()) : [],
              blockers: newTask.blockers ? newTask.blockers.split(',').map(b => b.trim()) : [],
              progress: newTask.progress
            }
          : t
      ));
    } else {
      const task = {
        id: Date.now(),
        task: newTask.task,
        category: newTask.category,
        assignee: newTask.assignee,
        dueDate: newTask.dueDate,
        status: 'pending',
        dependencies: newTask.dependencies ? newTask.dependencies.split(',').map(d => d.trim()) : [],
        blockers: newTask.blockers ? newTask.blockers.split(',').map(b => b.trim()) : [],
        progress: newTask.progress
      };
      setTasks([...tasks, task]);
    }
    setShowTaskModal(false);
    setEditingTask(null);
  };

  const handleCompleteTask = (taskId) => {
    setTasks(tasks.map(t => 
      t.id === taskId 
        ? { ...t, status: 'completed', progress: 100 }
        : t
    ));
  };

  const handleDeleteTask = (taskId) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      setTasks(tasks.filter(t => t.id !== taskId));
    }
  };

  // Calculate overall readiness
  const calculateReadiness = () => {
    const taskProgress = tasks.length > 0 
      ? tasks.reduce((sum, t) => sum + t.progress, 0) / tasks.length 
      : 0;
    
    const productReadiness = 75;
    const legalReadiness = 50;
    const gtmReadiness = 80;
    const eventsReadiness = 65;
    
    const overall = Math.round(
      (taskProgress * 0.3 + productReadiness * 0.25 + legalReadiness * 0.2 + gtmReadiness * 0.15 + eventsReadiness * 0.1)
    );
    
    return {
      overall: Math.min(overall, 100),
      product: productReadiness,
      legal: legalReadiness,
      gtm: gtmReadiness,
      events: eventsReadiness
    };
  };

  const readiness = calculateReadiness();

  const loadLaunches = async () => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockLaunches = [
        {
          id: 1,
          name: 'EcoTrack AI Launch',
          description: 'AI-powered carbon footprint tracking platform launch',
          launchDate: '2024-03-31',
          status: 'preparation',
          targetAudience: 'Sustainability-focused businesses',
          channels: ['social-media', 'content-marketing', 'pr'],
          metrics: [
            { name: 'User Signups', target: 1000, current: 150 },
            { name: 'Revenue', target: 5000, current: 1200 },
            { name: 'Media Mentions', target: 50, current: 12 }
          ],
          checklist: [
            { id: 1, task: 'Finalize product features', completed: true },
            { id: 2, task: 'Complete beta testing', completed: true },
            { id: 3, task: 'Prepare marketing materials', completed: false },
            { id: 4, task: 'Set up analytics tracking', completed: true },
            { id: 5, task: 'Create press kit', completed: false },
            { id: 6, task: 'Schedule launch event', completed: false }
          ],
          team: [
            { id: 1, name: 'Alex Chen', role: 'CTO', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face' },
            { id: 2, name: 'Sarah Martinez', role: 'CEO', avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face' },
            { id: 3, name: 'David Kim', role: 'CMO', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face' }
          ],
          createdAt: '2024-01-01',
          updatedAt: '2024-01-20'
        }
      ];
      
      setLaunches(mockLaunches);
    } catch (error) {
      console.error('Error loading launches:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const createLaunch = () => {
    const launch = {
      ...newLaunch,
      id: Date.now(),
      status: 'planning',
      metrics: [],
      checklist: [],
      team: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    setLaunches(prev => [...prev, launch]);
    setShowCreateModal(false);
    setNewLaunch({
      name: '',
      description: '',
      launchDate: '',
      targetAudience: '',
      channels: [],
      metrics: []
    });
  };

  const getDaysUntilLaunch = (launchDate) => {
    const today = new Date();
    const launch = new Date(launchDate);
    const diffTime = launch - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const renderOverviewTab = () => (
    <div className="space-y-6">
      {/* Startup Passport */}
      <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Startup Passport</h2>
        <p className="text-gray-600 mb-6">Dynamic identity card — logo, tagline, domain, HQ, vision line, founder bios. Feeds every other tool.</p>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Vision & Mission</h3>
              <p className="text-gray-600 mb-4">AI-powered workflow automation for remote teams</p>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Industry:</span>
                  <span className="font-medium">SaaS / Productivity</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Founded:</span>
                  <span className="font-medium">2024</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Location:</span>
                  <span className="font-medium">San Francisco, CA</span>
                </div>
                </div>
              </div>
            </div>

          <div className="space-y-6">
            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Founder Bios</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                    <Users className="w-5 h-5 text-gray-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Alex Chen</p>
                    <p className="text-sm text-gray-600">CEO & Technical Lead</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                    <Users className="w-5 h-5 text-gray-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Sarah Martinez</p>
                    <p className="text-sm text-gray-600">COO & Business Lead</p>
                  </div>
                </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

      {/* Launch Meter */}
      <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Launch Meter</h2>
        <p className="text-gray-600 mb-6">AI-scored readiness index (0–100%) combining progress across Product, Legal, GTM, and Events.</p>
        
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xl font-semibold text-gray-900">Overall Readiness</h3>
            <span className="text-3xl font-bold text-gray-900">{readiness.overall}%</span>
                </div>
          <div className="w-full bg-gray-200 rounded-full h-4">
            <div 
              className={`h-4 rounded-full transition-all ${
                readiness.overall >= 80 ? 'bg-gradient-to-r from-green-500 to-emerald-500' :
                readiness.overall >= 60 ? 'bg-gradient-to-r from-yellow-500 to-green-500' :
                'bg-gradient-to-r from-orange-500 to-yellow-500'
              }`}
              style={{ width: `${readiness.overall}%` }}
            ></div>
                </div>
                </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-gray-50 rounded-xl p-4">
            <h4 className="text-sm font-semibold text-gray-600 mb-2">Product</h4>
            <div className="text-2xl font-bold text-gray-900">{readiness.product}%</div>
                </div>
          <div className="bg-gray-50 rounded-xl p-4">
            <h4 className="text-sm font-semibold text-gray-600 mb-2">Legal</h4>
            <div className="text-2xl font-bold text-gray-900">{readiness.legal}%</div>
                </div>
          <div className="bg-gray-50 rounded-xl p-4">
            <h4 className="text-sm font-semibold text-gray-600 mb-2">GTM</h4>
            <div className="text-2xl font-bold text-gray-900">{readiness.gtm}%</div>
              </div>
          <div className="bg-gray-50 rounded-xl p-4">
            <h4 className="text-sm font-semibold text-gray-600 mb-2">Events</h4>
            <div className="text-2xl font-bold text-gray-900">{readiness.events}%</div>
            </div>
              </div>
            </div>

      {/* Countdown Timer */}
      <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-8 shadow-lg border border-purple-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Countdown Timer</h2>
        <p className="text-gray-600 mb-6">Personalized "T-minus" clock — linked to public launch date. Sends automated reminders.</p>
        
        <div className="grid grid-cols-4 gap-4 text-center">
          <div className="bg-white rounded-xl p-4">
            <div className="text-3xl font-bold text-gray-900">{countdown.days}</div>
            <div className="text-sm text-gray-600">Days</div>
                </div>
          <div className="bg-white rounded-xl p-4">
            <div className="text-3xl font-bold text-gray-900">{countdown.hours}</div>
            <div className="text-sm text-gray-600">Hours</div>
                </div>
          <div className="bg-white rounded-xl p-4">
            <div className="text-3xl font-bold text-gray-900">{countdown.minutes}</div>
            <div className="text-sm text-gray-600">Minutes</div>
              </div>
          <div className="bg-white rounded-xl p-4">
            <div className="text-3xl font-bold text-gray-900">{countdown.seconds}</div>
            <div className="text-sm text-gray-600">Seconds</div>
            </div>
          </div>
        </div>

      {/* Mission Timeline */}
      <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Mission Timeline</h2>
        <p className="text-gray-600 mb-6">Vertical milestones (Idea → MVP → Legal → Beta → Launch → First Customer). Auto-updates as tasks complete.</p>
        
        <div className="relative">
          <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200"></div>
          
          {[
            { stage: 'Idea', status: 'completed', date: 'Jan 2024' },
            { stage: 'MVP', status: 'completed', date: 'Feb 2024' },
            { stage: 'Legal', status: 'in-progress', date: 'Mar 2024' },
            { stage: 'Beta', status: 'pending', date: 'Apr 2024' },
            { stage: 'Launch', status: 'pending', date: 'May 2024' },
            { stage: 'First Customer', status: 'pending', date: 'Jun 2024' }
          ].map((milestone, index) => (
            <div key={index} className="relative flex items-center gap-4 mb-6">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center z-10 ${
                milestone.status === 'completed' ? 'bg-green-500' :
                milestone.status === 'in-progress' ? 'bg-yellow-500' :
                'bg-gray-300'
              }`}>
                {milestone.status === 'completed' && <CheckCircle className="w-5 h-5 text-white" />}
              </div>
              <div className="flex-1 bg-gray-50 rounded-xl p-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-gray-900">{milestone.stage}</h3>
                  <span className="text-sm text-gray-600">{milestone.date}</span>
              </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Team Pulse */}
      <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Team Pulse</h2>
        <p className="text-gray-600 mb-6">Smart mood board — energy levels, focus streaks, accountability heatmap. (Human + AI check-ins.)</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200">
            <h3 className="font-semibold text-gray-900 mb-2">Energy Level</h3>
            <div className="text-3xl font-bold text-green-600">High</div>
            <p className="text-sm text-gray-600 mt-2">Team morale is strong</p>
          </div>
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
            <h3 className="font-semibold text-gray-900 mb-2">Focus Streak</h3>
            <div className="text-3xl font-bold text-blue-600">12 days</div>
            <p className="text-sm text-gray-600 mt-2">Consistent progress</p>
          </div>
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-200">
            <h3 className="font-semibold text-gray-900 mb-2">Accountability</h3>
            <div className="text-3xl font-bold text-purple-600">95%</div>
            <p className="text-sm text-gray-600 mt-2">Tasks completed on time</p>
        </div>
      </div>
    </div>

      {/* Launch Story */}
      <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Launch Story</h2>
        <p className="text-gray-600 mb-6">Press-ready 100-word story auto-generated from Passport & MVP data. Editable by founders.</p>

            <div className="bg-gray-50 rounded-xl p-6">
          {isEditingStory ? (
            <textarea
              value={launchStory}
              onChange={(e) => setLaunchStory(e.target.value)}
              className="w-full p-4 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-black focus:border-transparent mb-4"
              rows="5"
            />
          ) : (
            <p className="text-gray-700 leading-relaxed mb-4">{launchStory}</p>
          )}
          <button 
            onClick={() => setIsEditingStory(!isEditingStory)}
            className="px-4 py-2 bg-black text-white rounded-xl hover:bg-gray-800 transition-colors text-sm font-semibold"
          >
            {isEditingStory ? 'Save Story' : 'Edit Story'}
          </button>
        </div>
      </div>

      {/* Launch Tracker */}
      <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Launch Tracker</h2>
            <p className="text-gray-600">Detailed tracking of tasks, dependencies, and blockers across all launch activities.</p>
          </div>
          <button 
            onClick={handleAddTask}
            className="px-4 py-2 bg-black text-white rounded-xl hover:bg-gray-800 transition-colors text-sm font-semibold flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Add Task
          </button>
        </div>

        <div className="space-y-4">
          {tasks.map((item) => (
            <div key={item.id} className="p-6 bg-gray-50 rounded-xl border border-gray-200 hover:shadow-md transition-all">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-semibold text-gray-900">{item.task}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      item.status === 'completed' ? 'bg-green-100 text-green-700' :
                      item.status === 'in-progress' ? 'bg-blue-100 text-blue-700' :
                      'bg-yellow-100 text-yellow-700'
                    }`}>
                      {item.status}
                    </span>
                    <span className="px-2 py-1 bg-gray-200 text-gray-700 rounded-full text-xs font-semibold">
                      {item.category}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      {item.assignee}
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      Due: {item.dueDate}
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
                    <div 
                      className="bg-gradient-to-r from-blue-500 to-green-500 h-2 rounded-full transition-all"
                      style={{ width: `${item.progress}%` }}
                    ></div>
                  </div>
                  {item.dependencies.length > 0 && (
                    <div className="mb-2">
                      <span className="text-xs font-semibold text-gray-600">Dependencies: </span>
                      <span className="text-xs text-gray-700">{item.dependencies.join(', ')}</span>
                    </div>
                  )}
                  {item.blockers.length > 0 && (
                    <div className="flex items-center gap-2 text-red-600">
                      <AlertTriangle className="w-4 h-4" />
                      <span className="text-xs font-semibold">Blockers: {item.blockers.join(', ')}</span>
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-2 ml-4">
                  <button 
                    onClick={() => handleEditTask(item)}
                    className="p-2 hover:bg-white rounded-lg transition-colors"
                    title="Edit task"
                  >
                    <Edit3 className="w-4 h-4 text-gray-600" />
                  </button>
                  <button 
                    onClick={() => handleCompleteTask(item.id)}
                    className="p-2 hover:bg-white rounded-lg transition-colors"
                    title="Mark as complete"
                  >
                    <CheckCircle className="w-4 h-4 text-gray-600" />
                  </button>
                  <button 
                    onClick={() => handleDeleteTask(item.id)}
                    className="p-2 hover:bg-white rounded-lg transition-colors"
                    title="Delete task"
                  >
                    <X className="w-4 h-4 text-red-600" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Success Metrics Dashboard */}
      <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Success Metrics Dashboard</h2>
        <p className="text-gray-600 mb-6">KPIs and goals for launch day and beyond. Track progress against targets.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[
            {
              key: 'waitlistSignups',
              metric: 'Waitlist Signups',
              current: metrics.waitlistSignups.current,
              target: metrics.waitlistSignups.target,
              period: 'Pre-Launch',
              trend: '+23%',
              color: 'blue'
            },
            {
              key: 'websiteVisitors',
              metric: 'Website Visitors',
              current: metrics.websiteVisitors.current,
              target: metrics.websiteVisitors.target,
              period: 'Launch Week',
              trend: '+45%',
              color: 'green'
            },
            {
              key: 'conversionRate',
              metric: 'Conversion Rate',
              current: metrics.conversionRate.current,
              target: metrics.conversionRate.target,
              period: 'Launch Week',
              trend: '+2.1%',
              color: 'purple'
            },
            {
              key: 'socialEngagement',
              metric: 'Social Engagement',
              current: metrics.socialEngagement.current,
              target: metrics.socialEngagement.target,
              period: 'Launch Week',
              trend: '+67%',
              color: 'orange'
            }
          ].map((metric, index) => {
            const percentage = (metric.current / metric.target) * 100;
            const colorClasses = {
              blue: 'from-blue-500 to-blue-600',
              green: 'from-green-500 to-green-600',
              purple: 'from-purple-500 to-purple-600',
              orange: 'from-orange-500 to-orange-600'
            };
            
            return (
              <div key={index} className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-6 border border-gray-200">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-semibold text-gray-600">{metric.metric}</h3>
                  <span className="text-xs font-semibold text-green-600">{metric.trend}</span>
                </div>
                <div className="mb-2">
                  <div className="text-2xl font-bold text-gray-900">{metric.current.toLocaleString()}</div>
                  <div className="text-xs text-gray-500">Target: {metric.target.toLocaleString()}</div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                  <div 
                    className={`bg-gradient-to-r ${colorClasses[metric.color]} h-2 rounded-full transition-all`}
                    style={{ width: `${Math.min(percentage, 100)}%` }}
                  ></div>
                </div>
                <div className="text-xs text-gray-500">{metric.period}</div>
              </div>
            );
          })}
        </div>

        <div className="bg-gray-50 rounded-xl p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Launch Goals Timeline</h3>
          <div className="space-y-4">
            {[
              {
                phase: 'Pre-Launch (T-30 to T-0)',
                goals: [
                  { metric: 'Waitlist signups', target: '2,000', current: '1,247', status: 'on-track' },
                  { metric: 'Beta users', target: '500', current: '1,250', status: 'exceeded' },
                  { metric: 'Press mentions', target: '5', current: '3', status: 'on-track' }
                ]
              },
              {
                phase: 'Launch Day (T-0)',
                goals: [
                  { metric: 'Product Hunt rank', target: 'Top 5', current: 'TBD', status: 'pending' },
                  { metric: 'New signups', target: '500', current: 'TBD', status: 'pending' },
                  { metric: 'Social shares', target: '1,000', current: 'TBD', status: 'pending' }
                ]
              },
              {
                phase: 'Post-Launch (T+1 to T+30)',
                goals: [
                  { metric: 'Active users', target: '5,000', current: 'TBD', status: 'pending' },
                  { metric: 'Paid conversions', target: '500', current: 'TBD', status: 'pending' },
                  { metric: 'NPS score', target: '50+', current: 'TBD', status: 'pending' }
                ]
              }
            ].map((phase, index) => (
              <div key={index} className="bg-white rounded-lg p-4 border border-gray-200">
                <h4 className="font-semibold text-gray-900 mb-3">{phase.phase}</h4>
                <div className="space-y-2">
                  {phase.goals.map((goal, gIndex) => (
                    <div key={gIndex} className="flex items-center justify-between text-sm">
                      <span className="text-gray-700">{goal.metric}</span>
                      <div className="flex items-center gap-3">
                        <span className="text-gray-600">
                          {goal.current} / {goal.target}
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          goal.status === 'exceeded' ? 'bg-green-100 text-green-700' :
                          goal.status === 'on-track' ? 'bg-blue-100 text-blue-700' :
                          'bg-gray-100 text-gray-600'
                        }`}>
                          {goal.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderProductTab = () => (
    <div className="space-y-6">
      {/* MVP Tracker */}
      <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">MVP Tracker</h2>
            <p className="text-gray-600 mt-2">Visual progress from prototype → beta → public. Auto-sync with GitHub / Notion / ClickUp.</p>
          </div>
              <div className="flex items-center gap-3">
            <button className="px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-semibold">
              Sync GitHub
            </button>
            <button className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors text-sm font-semibold">
              + Add Milestone
            </button>
                </div>
        </div>

        {/* Overall Progress */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200 mb-6">
          <div className="flex items-center justify-between mb-4">
                <div>
              <h3 className="text-lg font-semibold text-gray-900">Overall MVP Progress</h3>
              <p className="text-sm text-gray-600 mt-1">58% Complete • 12 of 21 tasks done</p>
                </div>
            <div className="text-3xl font-bold text-blue-600">58%</div>
              </div>
          <div className="w-full bg-gray-200 rounded-full h-4">
            <div className="bg-gradient-to-r from-blue-500 to-indigo-600 h-4 rounded-full transition-all duration-500" style={{ width: '58%' }}></div>
            </div>
        </div>

        {/* Milestone Stages */}
        <div className="space-y-6">
          {/* Prototype Stage */}
          <div className="bg-green-50 rounded-xl p-6 border border-green-200">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Prototype</h3>
                  <p className="text-sm text-gray-600">Core concept validation</p>
                </div>
              </div>
              <span className="px-3 py-1 bg-green-600 text-white rounded-full text-sm font-semibold">✓ Completed</span>
            </div>
            <div className="w-full bg-green-200 rounded-full h-3 mb-4">
              <div className="bg-green-600 h-3 rounded-full" style={{ width: '100%' }}></div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {[
                { task: 'Wireframes', status: 'done' },
                { task: 'User Flow', status: 'done' },
                { task: 'Basic UI', status: 'done' },
                { task: 'Core Features', status: 'done' }
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-2 text-sm">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span className="text-gray-700">{item.task}</span>
                </div>
              ))}
          </div>
        </div>

          {/* Beta Stage */}
          <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                  <Clock className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Beta</h3>
                  <p className="text-sm text-gray-600">Testing with early users</p>
                </div>
              </div>
              <span className="px-3 py-1 bg-blue-600 text-white rounded-full text-sm font-semibold">In Progress</span>
            </div>
            <div className="w-full bg-blue-200 rounded-full h-3 mb-4">
              <div className="bg-blue-600 h-3 rounded-full transition-all duration-500" style={{ width: '75%' }}></div>
            </div>
            <div className="grid grid-cols-2 gap-3 mb-4">
              {[
                { task: 'User Authentication', status: 'done' },
                { task: 'Payment Integration', status: 'done' },
                { task: 'Analytics Setup', status: 'done' },
                { task: 'Email Notifications', status: 'in-progress' },
                { task: 'Mobile Responsive', status: 'in-progress' },
                { task: 'Bug Fixes', status: 'pending' }
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-2 text-sm">
                  {item.status === 'done' ? (
                    <CheckCircle className="w-4 h-4 text-green-600" />
                  ) : item.status === 'in-progress' ? (
                    <Clock className="w-4 h-4 text-blue-600" />
                  ) : (
                    <div className="w-4 h-4 border-2 border-gray-300 rounded-full" />
                  )}
                  <span className={item.status === 'done' ? 'text-gray-700 line-through' : 'text-gray-700'}>
                    {item.task}
                  </span>
                </div>
              ))}
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Users className="w-4 h-4" />
              <span>47 beta testers providing feedback</span>
            </div>
          </div>

          {/* Public Launch Stage */}
          <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-300 rounded-lg flex items-center justify-center">
                  <Rocket className="w-6 h-6 text-gray-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Public Launch</h3>
                  <p className="text-sm text-gray-600">Full production release</p>
                </div>
              </div>
              <span className="px-3 py-1 bg-gray-200 text-gray-700 rounded-full text-sm font-semibold">Pending</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
              <div className="bg-gray-400 h-3 rounded-full" style={{ width: '0%' }}></div>
            </div>
            <div className="grid grid-cols-2 gap-3 mb-4">
              {[
                { task: 'Security Audit', status: 'pending' },
                { task: 'Performance Testing', status: 'pending' },
                { task: 'Documentation', status: 'pending' },
                { task: 'Marketing Materials', status: 'pending' },
                { task: 'Support System', status: 'pending' },
                { task: 'Launch Plan', status: 'pending' }
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-2 text-sm">
                  <div className="w-4 h-4 border-2 border-gray-300 rounded-full" />
                  <span className="text-gray-500">{item.task}</span>
                </div>
              ))}
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Calendar className="w-4 h-4" />
              <span>Target: March 2024</span>
            </div>
          </div>
        </div>

        {/* Integration Status */}
        <div className="mt-6 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border border-purple-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center">
                <Link className="w-5 h-5 text-white" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">Auto-Sync Enabled</h4>
                <p className="text-sm text-gray-600">Connected to GitHub, Notion, ClickUp</p>
              </div>
            </div>
            <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm font-semibold">
              Manage Integrations
          </button>
          </div>
        </div>
      </div>

      {/* Feature Matrix */}
      <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Feature Matrix</h2>
            <p className="text-gray-600 mt-2">Kanban board — Core, Nice-to-Have, Deferred — tied to readiness scoring.</p>
          </div>
          <button className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors text-sm font-semibold">
            + Add Feature
          </button>
        </div>

        {/* Readiness Score */}
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-1">Launch Readiness Score</h3>
              <p className="text-sm text-gray-600">Based on core features completion</p>
            </div>
            <div className="text-right">
              <div className="text-4xl font-bold text-green-600">85%</div>
              <p className="text-sm text-gray-600 mt-1">Ready to launch</p>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Core Features */}
          <div className="bg-green-50 rounded-xl p-6 border border-green-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Core</h3>
              <span className="px-3 py-1 bg-green-600 text-white rounded-full text-xs font-semibold">6 features</span>
            </div>
            <p className="text-sm text-gray-600 mb-4">Must-have for launch</p>
            <div className="space-y-3">
              {[
                { name: 'User Authentication', status: 'done', priority: 'critical' },
                { name: 'Dashboard', status: 'done', priority: 'critical' },
                { name: 'Payment Integration', status: 'done', priority: 'critical' },
                { name: 'User Profile', status: 'in-progress', priority: 'high' },
                { name: 'Search Functionality', status: 'in-progress', priority: 'high' },
                { name: 'Notifications', status: 'pending', priority: 'medium' }
              ].map((feature, index) => (
                <div key={index} className="bg-white p-4 rounded-lg border border-green-200 hover:shadow-md transition-all cursor-pointer">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-semibold text-gray-900 text-sm">{feature.name}</h4>
                    {feature.status === 'done' ? (
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                    ) : feature.status === 'in-progress' ? (
                      <Clock className="w-5 h-5 text-blue-600 flex-shrink-0" />
                    ) : (
                      <div className="w-5 h-5 border-2 border-gray-300 rounded-full flex-shrink-0" />
                    )}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className={`px-2 py-1 rounded text-xs font-semibold ${
                      feature.priority === 'critical' ? 'bg-red-100 text-red-700' :
                      feature.priority === 'high' ? 'bg-orange-100 text-orange-700' :
                      'bg-yellow-100 text-yellow-700'
                    }`}>
                      {feature.priority}
                    </span>
                    <span className={`text-xs font-semibold ${
                      feature.status === 'done' ? 'text-green-600' :
                      feature.status === 'in-progress' ? 'text-blue-600' :
                      'text-gray-500'
                    }`}>
                      {feature.status === 'done' ? '✓ Done' :
                       feature.status === 'in-progress' ? 'In Progress' :
                       'To Do'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Nice-to-Have Features */}
          <div className="bg-yellow-50 rounded-xl p-6 border border-yellow-200">
              <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Nice-to-Have</h3>
              <span className="px-3 py-1 bg-yellow-600 text-white rounded-full text-xs font-semibold">5 features</span>
              </div>
            <p className="text-sm text-gray-600 mb-4">Enhance user experience</p>
            <div className="space-y-3">
              {[
                { name: 'Social Login', status: 'in-progress', priority: 'medium' },
                { name: 'Dark Mode', status: 'pending', priority: 'low' },
                { name: 'Mobile App', status: 'pending', priority: 'medium' },
                { name: 'Export Data', status: 'pending', priority: 'low' },
                { name: 'Advanced Filters', status: 'pending', priority: 'medium' }
              ].map((feature, index) => (
                <div key={index} className="bg-white p-4 rounded-lg border border-yellow-200 hover:shadow-md transition-all cursor-pointer">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-semibold text-gray-900 text-sm">{feature.name}</h4>
                    {feature.status === 'done' ? (
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                    ) : feature.status === 'in-progress' ? (
                      <Clock className="w-5 h-5 text-blue-600 flex-shrink-0" />
                    ) : (
                      <div className="w-5 h-5 border-2 border-gray-300 rounded-full flex-shrink-0" />
                    )}
              </div>
                  <div className="flex items-center justify-between">
                    <span className={`px-2 py-1 rounded text-xs font-semibold ${
                      feature.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-gray-100 text-gray-700'
                    }`}>
                      {feature.priority}
                    </span>
                    <span className={`text-xs font-semibold ${
                      feature.status === 'done' ? 'text-green-600' :
                      feature.status === 'in-progress' ? 'text-blue-600' :
                      'text-gray-500'
                    }`}>
                      {feature.status === 'done' ? '✓ Done' :
                       feature.status === 'in-progress' ? 'In Progress' :
                       'To Do'}
                    </span>
                  </div>
            </div>
          ))}
        </div>
      </div>

          {/* Deferred Features */}
          <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Deferred</h3>
              <span className="px-3 py-1 bg-gray-600 text-white rounded-full text-xs font-semibold">4 features</span>
          </div>
            <p className="text-sm text-gray-600 mb-4">Post-launch roadmap</p>
            <div className="space-y-3">
              {[
                { name: 'API Access', status: 'pending', priority: 'low', version: 'v2.0' },
                { name: 'White Label', status: 'pending', priority: 'low', version: 'v2.0' },
                { name: 'Enterprise SSO', status: 'pending', priority: 'low', version: 'v2.5' },
                { name: 'Advanced Analytics', status: 'pending', priority: 'low', version: 'v2.0' }
              ].map((feature, index) => (
                <div key={index} className="bg-white p-4 rounded-lg border border-gray-200 hover:shadow-md transition-all cursor-pointer opacity-75">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-semibold text-gray-700 text-sm">{feature.name}</h4>
                    <div className="w-5 h-5 border-2 border-gray-300 rounded-full flex-shrink-0" />
          </div>
                  <div className="flex items-center justify-between">
                    <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs font-semibold">
                      {feature.version}
                    </span>
                    <span className="text-xs font-semibold text-gray-400">
                      Planned
                    </span>
        </div>
      </div>
              ))}
    </div>
          </div>
        </div>

        {/* Feature Stats */}
        <div className="mt-6 grid grid-cols-4 gap-4">
          <div className="bg-gray-50 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-gray-900">15</div>
            <div className="text-xs text-gray-600 mt-1">Total Features</div>
          </div>
          <div className="bg-green-50 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-green-600">4</div>
            <div className="text-xs text-gray-600 mt-1">Completed</div>
          </div>
          <div className="bg-blue-50 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">4</div>
            <div className="text-xs text-gray-600 mt-1">In Progress</div>
          </div>
          <div className="bg-gray-50 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-gray-600">7</div>
            <div className="text-xs text-gray-600 mt-1">Pending</div>
          </div>
        </div>
      </div>

      {/* User Feedback Tracker Board */}
      <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">User Feedback Tracker Board</h2>
            <p className="text-gray-600 mt-2">Collect, organize, and prioritize user feedback across all channels.</p>
          </div>
          <button className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors text-sm font-semibold">
            + Add Feedback
          </button>
        </div>

        {/* Feedback Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-200">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-semibold text-gray-900">Total Feedback</h3>
              <MessageSquare className="w-5 h-5 text-blue-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900">127</div>
            <p className="text-xs text-gray-600 mt-1">+23 this week</p>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-4 border border-green-200">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-semibold text-gray-900">Implemented</h3>
              <CheckCircle className="w-5 h-5 text-green-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900">45</div>
            <p className="text-xs text-gray-600 mt-1">35% completion</p>
          </div>

          <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl p-4 border border-yellow-200">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-semibold text-gray-900">In Progress</h3>
              <Clock className="w-5 h-5 text-yellow-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900">28</div>
            <p className="text-xs text-gray-600 mt-1">Being worked on</p>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-4 border border-purple-200">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-semibold text-gray-900">Backlog</h3>
              <AlertCircle className="w-5 h-5 text-purple-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900">54</div>
            <p className="text-xs text-gray-600 mt-1">Pending review</p>
          </div>
        </div>

        {/* Feedback Kanban Board */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* New Column */}
          <div className="bg-gray-50 rounded-xl p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900">New</h3>
              <span className="px-2 py-1 bg-gray-200 text-gray-700 rounded-full text-xs font-semibold">54</span>
            </div>
            <div className="space-y-3">
              {[
                { 
                  title: 'Add dark mode toggle', 
                  user: 'Sarah M.', 
                  votes: 23, 
                  priority: 'high',
                  category: 'Feature',
                  date: '2 hours ago'
                },
                { 
                  title: 'Export data to CSV', 
                  user: 'Mike T.', 
                  votes: 18, 
                  priority: 'medium',
                  category: 'Feature',
                  date: '5 hours ago'
                },
                { 
                  title: 'Mobile app version', 
                  user: 'Emma R.', 
                  votes: 45, 
                  priority: 'high',
                  category: 'Feature',
                  date: '1 day ago'
                }
              ].map((feedback, index) => (
                <div key={index} className="bg-white rounded-lg p-3 border border-gray-200 hover:shadow-md transition-all cursor-pointer">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-semibold text-gray-900 text-sm">{feedback.title}</h4>
                    <span className={`px-2 py-0.5 rounded text-xs font-semibold ${
                      feedback.priority === 'high' ? 'bg-red-100 text-red-700' :
                      feedback.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-gray-100 text-gray-700'
                    }`}>
                      {feedback.priority}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs text-gray-600">{feedback.user}</span>
                    <span className="text-xs text-gray-400">•</span>
                    <span className="text-xs text-gray-500">{feedback.date}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-semibold">
                      {feedback.category}
                    </span>
                    <div className="flex items-center gap-1 text-xs text-gray-600">
                      <ThumbsUp className="w-3 h-3" />
                      {feedback.votes}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* In Progress Column */}
          <div className="bg-yellow-50 rounded-xl p-4 border border-yellow-200">
              <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900">In Progress</h3>
              <span className="px-2 py-1 bg-yellow-200 text-yellow-700 rounded-full text-xs font-semibold">28</span>
              </div>
            <div className="space-y-3">
              {[
                { 
                  title: 'Improve search speed', 
                  user: 'Alex K.', 
                  votes: 34, 
                  priority: 'high',
                  category: 'Bug',
                  assignee: 'Dev Team',
                  date: '3 days ago'
                },
                { 
                  title: 'Add keyboard shortcuts', 
                  user: 'Lisa P.', 
                  votes: 12, 
                  priority: 'medium',
                  category: 'Feature',
                  assignee: 'Frontend',
                  date: '1 week ago'
                }
              ].map((feedback, index) => (
                <div key={index} className="bg-white rounded-lg p-3 border border-yellow-300 hover:shadow-md transition-all cursor-pointer">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-semibold text-gray-900 text-sm">{feedback.title}</h4>
                    <span className={`px-2 py-0.5 rounded text-xs font-semibold ${
                      feedback.priority === 'high' ? 'bg-red-100 text-red-700' :
                      feedback.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-gray-100 text-gray-700'
                    }`}>
                      {feedback.priority}
                    </span>
              </div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs text-gray-600">{feedback.user}</span>
                    <span className="text-xs text-gray-400">•</span>
                    <span className="text-xs text-gray-500">{feedback.date}</span>
                  </div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-semibold">
                      {feedback.category}
                    </span>
                    <div className="flex items-center gap-1 text-xs text-gray-600">
                      <ThumbsUp className="w-3 h-3" />
                      {feedback.votes}
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-gray-600">
                    <Users className="w-3 h-3" />
                    {feedback.assignee}
                  </div>
            </div>
          ))}
        </div>
      </div>

          {/* Under Review Column */}
          <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900">Under Review</h3>
              <span className="px-2 py-1 bg-blue-200 text-blue-700 rounded-full text-xs font-semibold">15</span>
          </div>
            <div className="space-y-3">
              {[
                { 
                  title: 'Bulk actions support', 
                  user: 'Tom H.', 
                  votes: 28, 
                  priority: 'medium',
                  category: 'Feature',
                  date: '2 weeks ago'
                },
                { 
                  title: 'Email notifications', 
                  user: 'Nina S.', 
                  votes: 19, 
                  priority: 'low',
                  category: 'Feature',
                  date: '3 weeks ago'
                }
              ].map((feedback, index) => (
                <div key={index} className="bg-white rounded-lg p-3 border border-blue-300 hover:shadow-md transition-all cursor-pointer">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-semibold text-gray-900 text-sm">{feedback.title}</h4>
                    <span className={`px-2 py-0.5 rounded text-xs font-semibold ${
                      feedback.priority === 'high' ? 'bg-red-100 text-red-700' :
                      feedback.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-gray-100 text-gray-700'
                    }`}>
                      {feedback.priority}
                    </span>
          </div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs text-gray-600">{feedback.user}</span>
                    <span className="text-xs text-gray-400">•</span>
                    <span className="text-xs text-gray-500">{feedback.date}</span>
        </div>
                  <div className="flex items-center justify-between">
                    <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-semibold">
                      {feedback.category}
                    </span>
                    <div className="flex items-center gap-1 text-xs text-gray-600">
                      <ThumbsUp className="w-3 h-3" />
                      {feedback.votes}
      </div>
    </div>
                </div>
              ))}
            </div>
          </div>

          {/* Implemented Column */}
          <div className="bg-green-50 rounded-xl p-4 border border-green-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900">Implemented</h3>
              <span className="px-2 py-1 bg-green-200 text-green-700 rounded-full text-xs font-semibold">45</span>
            </div>
            <div className="space-y-3">
              {[
                { 
                  title: 'Two-factor authentication', 
                  user: 'David L.', 
                  votes: 56, 
                  priority: 'high',
                  category: 'Security',
                  completed: '1 week ago'
                },
                { 
                  title: 'Profile customization', 
                  user: 'Rachel B.', 
                  votes: 31, 
                  priority: 'medium',
                  category: 'Feature',
                  completed: '2 weeks ago'
                }
              ].map((feedback, index) => (
                <div key={index} className="bg-white rounded-lg p-3 border border-green-300 hover:shadow-md transition-all cursor-pointer">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-semibold text-gray-900 text-sm line-through opacity-75">{feedback.title}</h4>
                    <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs text-gray-600">{feedback.user}</span>
                    <span className="text-xs text-gray-400">•</span>
                    <span className="text-xs text-green-600">✓ {feedback.completed}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-semibold">
                      {feedback.category}
                    </span>
                    <div className="flex items-center gap-1 text-xs text-gray-600">
                      <ThumbsUp className="w-3 h-3" />
                      {feedback.votes}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-6 flex items-center justify-between p-4 bg-gray-50 rounded-xl">
          <div className="flex items-center gap-4">
            <button className="px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-semibold">
              Filter by Priority
            </button>
            <button className="px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-semibold">
              Filter by Category
            </button>
            <button className="px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-semibold">
              Sort by Votes
            </button>
          </div>
          <button className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors text-sm font-semibold">
            Export Report
          </button>
        </div>
      </div>

      {/* AI Product Coach */}
      <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-8 shadow-lg border border-purple-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">AI Product Coach</h2>
        <p className="text-gray-600 mb-6">Suggests next build milestone, copy tips, or design refinements. (Powered by BiggMate AI.)</p>

          <div className="space-y-4">
          <div className="bg-white rounded-xl p-4">
                <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                <Zap className="w-5 h-5 text-white" />
          </div>
          <div>
                <h4 className="font-semibold text-gray-900 mb-1">Recommendation</h4>
                <p className="text-sm text-gray-700">Consider adding email verification before public launch to improve security.</p>
                </div>
                </div>
              </div>
          <div className="bg-white rounded-xl p-4">
                <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                <Zap className="w-5 h-5 text-white" />
            </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">Design Tip</h4>
                <p className="text-sm text-gray-700">Your onboarding flow could be simplified - reduce from 5 steps to 3.</p>
          </div>
            </div>
                </div>
          </div>
        </div>

      {/* Demo Kit */}
      <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Demo Kit</h2>
        <p className="text-gray-600 mb-6">Store screenshots, explainer video, and demo link for sharing.</p>
        
          <div className="space-y-4">
          <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center">
              <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Upload Demo Materials</h3>
            <p className="text-gray-600 mb-4">Screenshots, videos, or demo links</p>
              <button className="px-6 py-3 bg-black text-white rounded-xl hover:bg-gray-800 transition-colors font-semibold">
              Choose Files
              </button>
            </div>
              </div>
            </div>
          </div>
  );

  const renderDataRoomTab = () => (
    <div className="space-y-6">
      {/* Incorporation Tracker */}
      <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Incorporation Tracker</h2>
        <p className="text-gray-600 mb-6">Choose country → jurisdiction → document upload → Finanshels connects automatically.</p>

          <div className="space-y-4">
            <div className="bg-gray-50 rounded-xl p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Country</label>
                <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent">
                  <option>United States</option>
                  <option>United Kingdom</option>
                  <option>Singapore</option>
                  <option>India</option>
                  <option>UAE</option>
                </select>
          </div>
          <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Jurisdiction</label>
                <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent">
                  <option>Delaware</option>
                  <option>California</option>
                  <option>New York</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Status</label>
                <span className="inline-flex px-3 py-2 bg-yellow-100 text-yellow-700 rounded-lg text-sm font-semibold">In Progress</span>
          </div>
        </div>

            <div className="border-t border-gray-200 pt-6">
              <h3 className="font-semibold text-gray-900 mb-4">Required Documents</h3>
              <div className="space-y-3">
                {[
                  { name: 'Certificate of Incorporation', status: 'uploaded', date: '2024-02-15' },
                  { name: 'Articles of Association', status: 'uploaded', date: '2024-02-15' },
                  { name: 'EIN Letter', status: 'pending', date: null },
                  { name: 'Registered Agent Agreement', status: 'pending', date: null }
                ].map((doc, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200">
                    <div className="flex items-center gap-3">
                      <FileText className="w-5 h-5 text-gray-600" />
                      <div>
                        <p className="font-medium text-gray-900 text-sm">{doc.name}</p>
                        {doc.date && <p className="text-xs text-gray-500">Uploaded {doc.date}</p>}
                </div>
                </div>
                    {doc.status === 'uploaded' ? (
                      <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">✓ Uploaded</span>
                    ) : (
                      <button className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors text-xs font-semibold">
                        Upload
              </button>
                    )}
                </div>
                ))}
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                    <Link className="w-5 h-5 text-white" />
            </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Finanshels Integration</h4>
                    <p className="text-sm text-gray-600">Auto-sync incorporation documents</p>
                  </div>
                </div>
                <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-semibold">
                  Connect
              </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Founder Pack */}
      <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Founder Pack</h2>
        <p className="text-gray-600 mb-6">Auto-generate ESOP, equity split, IP transfer, NDAs with Smart Templates.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { name: 'ESOP Agreement', status: 'ready', description: 'Employee stock option plan template', icon: '📊' },
            { name: 'Equity Split', status: 'ready', description: 'Founder equity distribution', icon: '🎯' },
            { name: 'IP Transfer', status: 'pending', description: 'Intellectual property assignment', icon: '⚖️' },
            { name: 'NDA Templates', status: 'ready', description: 'Non-disclosure agreements', icon: '🔒' }
          ].map((doc, index) => (
            <div key={index} className="p-6 bg-gradient-to-br from-gray-50 to-white rounded-xl border border-gray-200 hover:shadow-lg transition-all">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-start gap-3">
                  <div className="text-3xl">{doc.icon}</div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{doc.name}</h3>
                    <p className="text-xs text-gray-600 mt-1">{doc.description}</p>
                </div>
                </div>
                {doc.status === 'ready' && (
                  <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">Ready</span>
                )}
              </div>
              <button className={`w-full mt-4 px-4 py-2 rounded-lg transition-colors text-sm font-semibold ${
                doc.status === 'ready' 
                  ? 'bg-black text-white hover:bg-gray-800' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}>
                {doc.status === 'ready' ? 'Download Template' : 'Generate Document'}
              </button>
            </div>
          ))}
              </div>
            </div>

      {/* Contract Vault */}
      <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Contract Vault</h2>
            <p className="text-gray-600 mt-2">Store, sign, and version every agreement (linked to ZeroHuman for AI audits).</p>
          </div>
          <button className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors text-sm font-semibold">
            + Upload Contract
              </button>
        </div>

              <div className="space-y-3">
          {[
            { name: 'Founder Agreement', date: '2024-01-15', status: 'signed', version: 'v2.0', signers: 3 },
            { name: 'Service Agreement', date: '2024-02-10', status: 'pending', version: 'v1.0', signers: 2 },
            { name: 'Privacy Policy', date: '2024-02-20', status: 'signed', version: 'v1.1', signers: 1 },
            { name: 'Terms of Service', date: '2024-02-22', status: 'signed', version: 'v1.0', signers: 1 }
          ].map((contract, index) => (
            <div key={index} className="p-4 bg-gray-50 rounded-xl hover:shadow-md transition-all">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 flex-1">
                  <FileText className="w-5 h-5 text-gray-600" />
                  <div>
                    <h4 className="font-semibold text-gray-900">{contract.name}</h4>
                    <div className="flex items-center gap-3 mt-1">
                      <p className="text-xs text-gray-600">{contract.date}</p>
                      <span className="text-xs text-gray-500">• {contract.version}</span>
                      <span className="text-xs text-gray-500">• {contract.signers} signer{contract.signers > 1 ? 's' : ''}</span>
                </div>
                </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    contract.status === 'signed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                  }`}>
                    {contract.status === 'signed' ? '✓ Signed' : '⏳ Pending'}
                  </span>
                  <button className="p-2 hover:bg-white rounded-lg transition-colors">
                    <Download className="w-4 h-4 text-gray-600" />
              </button>
            </div>
          </div>
        </div>
          ))}
      </div>

        <div className="mt-6 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border border-purple-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
          </div>
          <div>
                <h4 className="font-semibold text-gray-900">ZeroHuman AI Audit</h4>
                <p className="text-sm text-gray-600">Automated contract analysis and risk detection</p>
            </div>
                </div>
            <button className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm font-semibold">
              Audit Contracts
            </button>
          </div>
          </div>
        </div>

      {/* Brand & IP Hub */}
      <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Brand & IP Hub</h2>
        <p className="text-gray-600 mb-6">Track trademark filings, domain ownership, and brand kit approval.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-gray-900">Trademark</h3>
              <span className="text-2xl">™</span>
          </div>
            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Status:</span>
                <span className="font-semibold text-blue-700">Filed</span>
          </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Class:</span>
                <span className="font-semibold text-gray-900">42 (Software)</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Filing Date:</span>
                <span className="font-semibold text-gray-900">Feb 1, 2024</span>
              </div>
            </div>
            <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-semibold">
              View Details
              </button>
            </div>

          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-gray-900">Domain</h3>
              <span className="text-2xl">🌐</span>
                </div>
            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Primary:</span>
                <span className="font-semibold text-gray-900">techflow.ai</span>
                </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Status:</span>
                <span className="font-semibold text-green-700">Owned</span>
                </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Expires:</span>
                <span className="font-semibold text-gray-900">Dec 2025</span>
              </div>
            </div>
            <button className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-semibold">
              Manage Domain
            </button>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-200">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-gray-900">Brand Kit</h3>
              <span className="text-2xl">🎨</span>
            </div>
            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Status:</span>
                <span className="font-semibold text-green-700">Approved</span>
            </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Assets:</span>
                <span className="font-semibold text-gray-900">24 files</span>
          </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Updated:</span>
                <span className="font-semibold text-gray-900">Mar 1, 2024</span>
              </div>
            </div>
            <button className="w-full px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm font-semibold">
              Download Kit
            </button>
        </div>
      </div>

        <div className="bg-gray-50 rounded-xl p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Additional Domains</h3>
          <div className="space-y-2">
            {[
              { domain: 'techflow.com', status: 'Owned', autoRenew: true },
              { domain: 'techflow.io', status: 'Owned', autoRenew: true },
              { domain: 'techflow.app', status: 'Available', autoRenew: false }
            ].map((item, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-white rounded-lg">
                <div className="flex items-center gap-3">
                  <Globe className="w-4 h-4 text-gray-600" />
                  <span className="font-medium text-gray-900 text-sm">{item.domain}</span>
                  {item.autoRenew && <span className="text-xs text-green-600">Auto-renew ✓</span>}
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                  item.status === 'Owned' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
                }`}>
                  {item.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Finance Setup */}
      <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Finance Setup</h2>
        <p className="text-gray-600 mb-6">Connect to Finanshels for bank account, bookkeeping, tax ID.</p>
        
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200 mb-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-white" />
          </div>
          <div>
                <h3 className="text-lg font-semibold text-gray-900">Finanshels Integration</h3>
                <p className="text-sm text-gray-600">Streamline your financial setup</p>
          </div>
            </div>
            <button className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-semibold">
              Connect Now
            </button>
        </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="bg-white rounded-lg p-4 text-center">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <div className="text-sm font-semibold text-gray-900">Bank Account</div>
              <div className="text-xs text-gray-600 mt-1">Connected</div>
            </div>
            <div className="bg-white rounded-lg p-4 text-center">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <div className="text-sm font-semibold text-gray-900">Bookkeeping</div>
              <div className="text-xs text-gray-600 mt-1">Active</div>
            </div>
            <div className="bg-white rounded-lg p-4 text-center">
              <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <Clock className="w-6 h-6 text-gray-400" />
              </div>
              <div className="text-sm font-semibold text-gray-900">Tax ID</div>
              <div className="text-xs text-gray-600 mt-1">Pending</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-50 rounded-xl p-6">
            <h3 className="font-semibold text-gray-900 mb-4">Financial Accounts</h3>
              <div className="space-y-3">
              {[
                { name: 'Business Checking', bank: 'Mercury', balance: '$45,230', status: 'active' },
                { name: 'Savings Account', bank: 'Mercury', balance: '$100,000', status: 'active' }
              ].map((account, index) => (
                <div key={index} className="p-3 bg-white rounded-lg">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-medium text-gray-900 text-sm">{account.name}</span>
                    <span className="text-sm font-bold text-gray-900">{account.balance}</span>
                </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-600">{account.bank}</span>
                    <span className="text-xs text-green-600 font-semibold">● Active</span>
                </div>
                </div>
              ))}
            </div>
          </div>

            <div className="bg-gray-50 rounded-xl p-6">
            <h3 className="font-semibold text-gray-900 mb-4">Tax Information</h3>
              <div className="space-y-3">
              <div className="p-3 bg-white rounded-lg">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-gray-600">EIN</span>
                  <span className="text-sm font-semibold text-gray-900">XX-XXXXXXX</span>
                </div>
                </div>
              <div className="p-3 bg-white rounded-lg">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-gray-600">Tax Year</span>
                  <span className="text-sm font-semibold text-gray-900">2024</span>
                </div>
              </div>
              <div className="p-3 bg-white rounded-lg">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-gray-600">Filing Status</span>
                  <span className="text-sm font-semibold text-yellow-700">Setup Required</span>
                </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      {/* Legal Documents */}
      <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Legal Documents</h2>
            <p className="text-gray-600">Contracts, terms of service, privacy policy, and other legal agreements.</p>
          </div>
          <button className="px-4 py-2 bg-black text-white rounded-xl hover:bg-gray-800 transition-colors text-sm font-semibold flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Upload Document
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            {
              category: 'Terms of Service',
              documents: [
                { name: 'Terms of Service v1.0', date: '2024-02-20', status: 'active', size: '245 KB' },
                { name: 'Terms of Service v0.9', date: '2024-02-15', status: 'archived', size: '238 KB' }
              ]
            },
            {
              category: 'Privacy Policy',
              documents: [
                { name: 'Privacy Policy v1.1', date: '2024-02-22', status: 'active', size: '189 KB' },
                { name: 'Privacy Policy v1.0', date: '2024-02-10', status: 'archived', size: '185 KB' }
              ]
            },
            {
              category: 'User Agreements',
              documents: [
                { name: 'Beta User Agreement', date: '2024-01-15', status: 'active', size: '156 KB' },
                { name: 'NDA Template', date: '2024-01-10', status: 'active', size: '98 KB' }
              ]
            },
            {
              category: 'Other Legal',
              documents: [
                { name: 'Data Processing Agreement', date: '2024-02-25', status: 'draft', size: '312 KB' },
                { name: 'Cookie Policy', date: '2024-02-18', status: 'active', size: '124 KB' }
              ]
            }
          ].map((category, index) => (
            <div key={index} className="bg-gray-50 rounded-xl p-6">
              <h3 className="font-semibold text-gray-900 mb-4">{category.category}</h3>
              <div className="space-y-3">
                {category.documents.map((doc, dIndex) => (
                  <div key={dIndex} className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200">
                    <div className="flex items-center gap-3 flex-1">
                      <FileText className="w-5 h-5 text-gray-600" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">{doc.name}</p>
                        <p className="text-xs text-gray-500">{doc.date} • {doc.size}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-1 rounded text-xs font-semibold ${
                        doc.status === 'active' ? 'bg-green-100 text-green-700' :
                        doc.status === 'draft' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-gray-100 text-gray-600'
                      }`}>
                        {doc.status}
                      </span>
                      <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                        <Download className="w-4 h-4 text-gray-600" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Compliance Tracker */}
      <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Compliance Tracker</h2>
        <p className="text-gray-600 mb-6">Regulatory requirements and deadlines across all jurisdictions.</p>
        
        <div className="space-y-6">
          {[
            {
              region: 'United States',
              requirements: [
                { name: 'State Business License', deadline: '2024-04-01', status: 'pending', priority: 'high' },
                { name: 'Sales Tax Registration', deadline: '2024-05-15', status: 'pending', priority: 'medium' },
                { name: 'Data Privacy Compliance (CCPA)', deadline: '2024-06-01', status: 'in-progress', priority: 'high' }
              ],
              progress: 33
            },
            {
              region: 'European Union',
              requirements: [
                { name: 'GDPR Compliance', deadline: '2024-04-15', status: 'in-progress', priority: 'high' },
                { name: 'VAT Registration', deadline: '2024-05-30', status: 'pending', priority: 'medium' }
              ],
              progress: 50
            },
            {
              region: 'India',
              requirements: [
                { name: 'GST Registration', deadline: '2024-03-20', status: 'completed', priority: 'high' },
                { name: 'PAN Card', deadline: '2024-03-15', status: 'completed', priority: 'high' },
                { name: 'MSME Registration', deadline: '2024-04-01', status: 'pending', priority: 'low' }
              ],
              progress: 67
            }
          ].map((region, index) => (
            <div key={index} className="bg-gray-50 rounded-xl p-6 border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">{region.region}</h3>
                <div className="flex items-center gap-3">
                  <div className="w-32 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-blue-500 to-green-500 h-2 rounded-full transition-all"
                      style={{ width: `${region.progress}%` }}
                    ></div>
        </div>
                  <span className="text-sm font-semibold text-gray-900">{region.progress}%</span>
          </div>
              </div>
              <div className="space-y-3">
                {region.requirements.map((req, rIndex) => (
                  <div key={rIndex} className="flex items-center justify-between p-3 bg-white rounded-lg">
                    <div className="flex items-center gap-3 flex-1">
                      <div className={`w-3 h-3 rounded-full ${
                        req.status === 'completed' ? 'bg-green-500' :
                        req.status === 'in-progress' ? 'bg-blue-500' :
                        'bg-gray-300'
                      }`}></div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium text-gray-900">{req.name}</span>
                          <span className={`px-2 py-0.5 rounded text-xs font-semibold ${
                            req.priority === 'high' ? 'bg-red-100 text-red-700' :
                            req.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                            'bg-gray-100 text-gray-600'
                          }`}>
                            {req.priority}
                          </span>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">Deadline: {req.deadline}</p>
                      </div>
                    </div>
                    <span className={`px-2 py-1 rounded text-xs font-semibold ${
                      req.status === 'completed' ? 'bg-green-100 text-green-700' :
                      req.status === 'in-progress' ? 'bg-blue-100 text-blue-700' :
                      'bg-gray-100 text-gray-600'
                    }`}>
                      {req.status}
                    </span>
        </div>
                ))}
                </div>
                </div>
                  ))}
                </div>
      </div>

      {/* Due Diligence Checklist */}
      <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Due Diligence Checklist</h2>
        <p className="text-gray-600 mb-6">Investor-ready documentation status and completion tracking.</p>
        
        <div className="space-y-6">
          {[
            {
              category: 'Corporate Documents',
              items: [
                { name: 'Certificate of Incorporation', status: 'complete', verified: true },
                { name: 'Bylaws/Articles of Association', status: 'complete', verified: true },
                { name: 'Board Resolutions', status: 'complete', verified: true },
                { name: 'Stock Ledger', status: 'in-progress', verified: false }
              ]
            },
            {
              category: 'Financial Documents',
              items: [
                { name: 'Financial Statements', status: 'complete', verified: true },
                { name: 'Tax Returns', status: 'pending', verified: false },
                { name: 'Bank Statements', status: 'complete', verified: true },
                { name: 'Cap Table', status: 'complete', verified: true }
              ]
            },
            {
              category: 'Legal & Compliance',
              items: [
                { name: 'Material Contracts', status: 'complete', verified: true },
                { name: 'IP Documentation', status: 'in-progress', verified: false },
                { name: 'Employment Agreements', status: 'complete', verified: true },
                { name: 'Regulatory Filings', status: 'in-progress', verified: false }
              ]
            },
            {
              category: 'Business Documents',
              items: [
                { name: 'Business Plan', status: 'complete', verified: true },
                { name: 'Market Research', status: 'complete', verified: true },
                { name: 'Customer Contracts', status: 'in-progress', verified: false },
                { name: 'Partnership Agreements', status: 'pending', verified: false }
              ]
            }
          ].map((category, index) => {
            const completed = category.items.filter(item => item.status === 'complete').length;
            const total = category.items.length;
            const percentage = (completed / total) * 100;
            
            return (
              <div key={index} className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">{category.category}</h3>
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-gray-600">{completed}/{total} complete</span>
                    <div className="w-24 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full transition-all"
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  {category.items.map((item, iIndex) => (
                    <div key={iIndex} className="flex items-center justify-between p-3 bg-white rounded-lg">
                      <div className="flex items-center gap-3">
                        {item.status === 'complete' ? (
                          <CheckCircle className="w-5 h-5 text-green-600" />
                        ) : item.status === 'in-progress' ? (
                          <Clock className="w-5 h-5 text-blue-600" />
                        ) : (
                          <div className="w-5 h-5 border-2 border-gray-300 rounded-full" />
                        )}
                        <span className="text-sm text-gray-900">{item.name}</span>
                        {item.verified && (
                          <ShieldCheck className="w-4 h-4 text-green-600" />
                        )}
                      </div>
                      <span className={`px-2 py-1 rounded text-xs font-semibold ${
                        item.status === 'complete' ? 'bg-green-100 text-green-700' :
                        item.status === 'in-progress' ? 'bg-blue-100 text-blue-700' :
                        'bg-gray-100 text-gray-600'
                      }`}>
                        {item.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-6 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-semibold text-gray-900">Overall Readiness</h4>
              <p className="text-sm text-gray-600">68% of due diligence documents are complete</p>
            </div>
            <button className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-semibold">
              Generate Report
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderGTMTab = () => (
    <div className="space-y-6">
      {/* Launch Narrative Builder */}
      <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Launch Narrative Builder</h2>
        <p className="text-gray-600 mb-6">Craft your story: Problem → Promise → Proof → Personality. (Guided prompts.)</p>

      <div className="space-y-6">
          <div className="bg-gradient-to-r from-red-50 to-orange-50 rounded-xl p-6 border border-red-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-red-500 rounded-lg flex items-center justify-center text-white font-bold">1</div>
              <h3 className="text-lg font-bold text-gray-900">Problem</h3>
            </div>
            <textarea 
              className="w-full p-4 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
              rows="3"
              placeholder="What problem are you solving? Make it relatable and urgent..."
              defaultValue="Remote teams waste 30% of their time on manual workflows and context switching between tools."
            />
          </div>

          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center text-white font-bold">2</div>
              <h3 className="text-lg font-bold text-gray-900">Promise</h3>
                </div>
            <textarea 
              className="w-full p-4 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              rows="3"
              placeholder="What's your solution? What transformation do you promise..."
              defaultValue="TechFlow AI automates repetitive tasks and unifies your workflow, saving teams 10+ hours per week."
            />
              </div>
              
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center text-white font-bold">3</div>
              <h3 className="text-lg font-bold text-gray-900">Proof</h3>
            </div>
            <textarea 
              className="w-full p-4 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              rows="3"
              placeholder="Show traction, testimonials, or data that validates your promise..."
              defaultValue="1,250+ teams using TechFlow. Average 40% productivity increase. 4.8/5 rating from beta users."
            />
          </div>

          <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center text-white font-bold">4</div>
              <h3 className="text-lg font-bold text-gray-900">Personality</h3>
            </div>
            <textarea 
              className="w-full p-4 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              rows="3"
              placeholder="What makes you unique? Your mission, values, or founder story..."
              defaultValue="Built by ex-Google engineers who experienced remote work chaos firsthand. We're on a mission to make distributed work actually work."
            />
          </div>
        </div>

        <div className="mt-6 flex gap-3">
          <button className="flex-1 px-6 py-3 bg-black text-white rounded-xl hover:bg-gray-800 transition-colors font-semibold">
            Generate Full Story
                </button>
          <button className="px-6 py-3 bg-white border-2 border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-semibold">
            AI Suggestions
                </button>
              </div>
            </div>

      {/* Distribution Planning */}
      <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Distribution Planning</h2>
        <p className="text-gray-600 mb-6">Strategic distribution plan across channels with timeline and resource allocation.</p>
        
        <div className="space-y-6">
          {/* Distribution Channels */}
          <div className="bg-gray-50 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Primary Distribution Channels</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                {
                  channel: 'Product Hunt',
                  priority: 'High',
                  timeline: 'Week 1',
                  effort: 'High',
                  reach: '50K+',
                  status: 'planned'
                },
                {
                  channel: 'LinkedIn Organic',
                  priority: 'High',
                  timeline: 'Ongoing',
                  effort: 'Medium',
                  reach: '10K+',
                  status: 'active'
                },
                {
                  channel: 'Twitter/X',
                  priority: 'Medium',
                  timeline: 'Ongoing',
                  effort: 'Medium',
                  reach: '25K+',
                  status: 'active'
                },
                {
                  channel: 'Reddit Communities',
                  priority: 'Medium',
                  timeline: 'Week 2-3',
                  effort: 'Low',
                  reach: '15K+',
                  status: 'planned'
                },
                {
                  channel: 'Email Outreach',
                  priority: 'High',
                  timeline: 'Week 1-4',
                  effort: 'High',
                  reach: '5K+',
                  status: 'active'
                },
                {
                  channel: 'Content Marketing',
                  priority: 'Medium',
                  timeline: 'Ongoing',
                  effort: 'High',
                  reach: '20K+',
                  status: 'planned'
                }
              ].map((item, index) => (
                <div key={index} className="p-4 bg-white rounded-lg border border-gray-200">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-semibold text-gray-900">{item.channel}</h4>
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      item.priority === 'High' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {item.priority}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs mb-3">
                    <div>
                      <span className="text-gray-500">Timeline:</span>
                      <span className="ml-1 font-semibold text-gray-900">{item.timeline}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Effort:</span>
                      <span className="ml-1 font-semibold text-gray-900">{item.effort}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Est. Reach:</span>
                      <span className="ml-1 font-semibold text-gray-900">{item.reach}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Status:</span>
                      <span className={`ml-1 font-semibold ${
                        item.status === 'active' ? 'text-green-600' : 'text-blue-600'
                      }`}>
                        {item.status === 'active' ? '● Active' : '○ Planned'}
                      </span>
                    </div>
                  </div>
                  <button className="w-full px-3 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors text-xs font-semibold">
                    Edit Plan
                  </button>
                </div>
              ))}
            </div>
              </div>
              
          {/* Distribution Timeline */}
          <div className="bg-gray-50 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Distribution Timeline</h3>
            <div className="space-y-4">
              {[
                {
                  phase: 'Pre-Launch (Week -2 to 0)',
                  activities: ['Build waitlist', 'Teaser content', 'Influencer outreach', 'Community engagement'],
                  goal: '500 waitlist signups'
                },
                {
                  phase: 'Launch Week (Week 1)',
                  activities: ['Product Hunt launch', 'Email blast', 'Social media blitz', 'Press outreach'],
                  goal: '1,000 users, 100 signups'
                },
                {
                  phase: 'Growth Phase (Week 2-4)',
                  activities: ['Content marketing', 'Community building', 'Partnership outreach', 'Paid ads testing'],
                  goal: '5,000 users, 500 signups'
                },
                {
                  phase: 'Scale Phase (Month 2+)',
                  activities: ['SEO optimization', 'Referral program', 'Paid acquisition', 'Strategic partnerships'],
                  goal: '20,000 users, 2,000 signups'
                }
              ].map((phase, index) => (
                <div key={index} className="p-4 bg-white rounded-lg border border-gray-200">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="font-semibold text-gray-900">{phase.phase}</h4>
                      <p className="text-sm text-gray-600 mt-1">Goal: {phase.goal}</p>
                    </div>
                    <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold">
                      Phase {index + 1}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {phase.activities.map((activity, idx) => (
                      <span key={idx} className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                        {activity}
                    </span>
                    ))}
                  </div>
                </div>
                  ))}
                </div>
              </div>
              
          {/* Resource Allocation */}
          <div className="bg-gray-50 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Resource Allocation</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-white rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-3">Budget Distribution</h4>
                <div className="space-y-2">
                  {[
                    { category: 'Paid Ads', percentage: 40, amount: '$4,000' },
                    { category: 'Content', percentage: 30, amount: '$3,000' },
                    { category: 'Tools', percentage: 20, amount: '$2,000' },
                    { category: 'Events', percentage: 10, amount: '$1,000' }
                  ].map((item, index) => (
                    <div key={index}>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-600">{item.category}</span>
                        <span className="font-semibold text-gray-900">{item.amount}</span>
                      </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                          className="bg-blue-600 h-2 rounded-full" 
                          style={{ width: `${item.percentage}%` }}
                  ></div>
                </div>
              </div>
                  ))}
            </div>
              </div>

              <div className="p-4 bg-white rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-3">Team Allocation</h4>
                <div className="space-y-3">
                  {[
                    { role: 'Marketing Lead', hours: '40h/week' },
                    { role: 'Content Creator', hours: '30h/week' },
                    { role: 'Community Manager', hours: '20h/week' },
                    { role: 'Designer', hours: '15h/week' }
                  ].map((item, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="text-sm text-gray-700">{item.role}</span>
                      <span className="text-xs font-semibold text-gray-900 bg-gray-100 px-2 py-1 rounded">
                        {item.hours}
                      </span>
          </div>
        ))}
      </div>
    </div>

              <div className="p-4 bg-white rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-3">Key Metrics</h4>
                <div className="space-y-3">
                  {[
                    { metric: 'Target Users', value: '10,000' },
                    { metric: 'Conversion Rate', value: '5%' },
                    { metric: 'CAC Target', value: '$25' },
                    { metric: 'Viral Coefficient', value: '1.2x' }
                  ].map((item, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="text-sm text-gray-700">{item.metric}</span>
                      <span className="text-sm font-bold text-gray-900">{item.value}</span>
          </div>
                  ))}
                </div>
              </div>
          </div>
        </div>

          {/* Distribution Playbook */}
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Distribution Playbook</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                {
                  title: 'Product Hunt Strategy',
                  steps: ['Schedule for Tuesday-Thursday', 'Prepare maker comment', 'Rally supporters', 'Respond to all comments'],
                  icon: '🚀'
                },
                {
                  title: 'LinkedIn Playbook',
                  steps: ['Founder personal story', 'Behind-the-scenes content', 'Tag relevant people', 'Engage with comments'],
                  icon: '💼'
                },
                {
                  title: 'Community Strategy',
                  steps: ['Identify target communities', 'Provide value first', 'Share learnings', 'Build relationships'],
                  icon: '👥'
                },
                {
                  title: 'Email Campaign',
                  steps: ['Segment audience', 'Personalize messaging', 'A/B test subject lines', 'Track engagement'],
                  icon: '📧'
                }
              ].map((playbook, index) => (
                <div key={index} className="p-4 bg-white rounded-lg">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-2xl">{playbook.icon}</span>
                    <h4 className="font-semibold text-gray-900">{playbook.title}</h4>
                  </div>
                  <ul className="space-y-2">
                    {playbook.steps.map((step, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                        <CheckCircle className="w-4 h-4 text-purple-600 flex-shrink-0 mt-0.5" />
                        {step}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Launch Timeline */}
      <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Launch Timeline</h2>
        <p className="text-gray-600 mb-6">Detailed pre-launch, launch day, and post-launch schedule with milestones and deliverables.</p>
        
        <div className="space-y-6">
          {[
            {
              phase: 'Pre-Launch (T-30 to T-1)',
              duration: '30 days',
              status: 'in-progress',
              milestones: [
                { task: 'Finalize product features', date: 'T-30', owner: 'Product Team', status: 'completed' },
                { task: 'Complete legal documentation', date: 'T-25', owner: 'Legal Team', status: 'completed' },
                { task: 'Build landing page', date: 'T-20', owner: 'Marketing', status: 'completed' },
                { task: 'Start waitlist campaign', date: 'T-15', owner: 'Marketing', status: 'in-progress' },
                { task: 'Press kit preparation', date: 'T-10', owner: 'Marketing', status: 'pending' },
                { task: 'Influencer outreach', date: 'T-7', owner: 'Marketing', status: 'pending' },
                { task: 'Final testing & QA', date: 'T-3', owner: 'Product Team', status: 'pending' }
              ]
            },
            {
              phase: 'Launch Day (T-0)',
              duration: '1 day',
              status: 'pending',
              milestones: [
                { task: 'Product Hunt launch (9 AM)', date: 'T-0', owner: 'Founders', status: 'pending' },
                { task: 'Email blast to waitlist', date: 'T-0', owner: 'Marketing', status: 'pending' },
                { task: 'Social media announcement', date: 'T-0', owner: 'Marketing', status: 'pending' },
                { task: 'Press release distribution', date: 'T-0', owner: 'Marketing', status: 'pending' },
                { task: 'Monitor metrics & respond', date: 'T-0', owner: 'All', status: 'pending' }
              ]
            },
            {
              phase: 'Post-Launch (T+1 to T+30)',
              duration: '30 days',
              status: 'pending',
              milestones: [
                { task: 'Follow-up with signups', date: 'T+1', owner: 'Sales', status: 'pending' },
                { task: 'Content marketing push', date: 'T+3', owner: 'Marketing', status: 'pending' },
                { task: 'User feedback collection', date: 'T+7', owner: 'Product Team', status: 'pending' },
                { task: 'Iterate based on feedback', date: 'T+14', owner: 'Product Team', status: 'pending' },
                { task: 'Scale marketing channels', date: 'T+21', owner: 'Marketing', status: 'pending' },
                { task: 'First month review', date: 'T+30', owner: 'All', status: 'pending' }
              ]
            }
          ].map((phase, index) => (
            <div key={index} className="bg-gray-50 rounded-xl p-6 border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-bold text-gray-900">{phase.phase}</h3>
                  <p className="text-sm text-gray-600 mt-1">Duration: {phase.duration}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  phase.status === 'completed' ? 'bg-green-100 text-green-700' :
                  phase.status === 'in-progress' ? 'bg-blue-100 text-blue-700' :
                  'bg-gray-100 text-gray-600'
                }`}>
                  {phase.status}
                </span>
              </div>
              <div className="space-y-3">
                {phase.milestones.map((milestone, mIndex) => (
                  <div key={mIndex} className="flex items-center gap-4 p-3 bg-white rounded-lg">
                    <div className={`w-3 h-3 rounded-full ${
                      milestone.status === 'completed' ? 'bg-green-500' :
                      milestone.status === 'in-progress' ? 'bg-blue-500' :
                      'bg-gray-300'
                    }`}></div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-semibold text-gray-900">{milestone.task}</span>
                        <span className="text-xs text-gray-500">({milestone.date})</span>
                      </div>
                      <p className="text-xs text-gray-600 mt-1">Owner: {milestone.owner}</p>
                    </div>
                    <span className={`px-2 py-1 rounded text-xs font-semibold ${
                      milestone.status === 'completed' ? 'bg-green-100 text-green-700' :
                      milestone.status === 'in-progress' ? 'bg-blue-100 text-blue-700' :
                      'bg-gray-100 text-gray-600'
                    }`}>
                      {milestone.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Landing Page */}
      <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Landing Page</h2>
            <p className="text-gray-600">Conversion-optimized page with A/B testing plan and performance tracking.</p>
          </div>
          <button className="px-4 py-2 bg-black text-white rounded-xl hover:bg-gray-800 transition-colors text-sm font-semibold flex items-center gap-2">
            <ExternalLink className="w-4 h-4" />
            View Live Page
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-gray-50 rounded-xl p-6">
            <h3 className="font-semibold text-gray-900 mb-4">Current Performance</h3>
            <div className="space-y-4">
              {[
                { metric: 'Conversion Rate', value: '12.4%', target: '15%', trend: '+2.1%' },
                { metric: 'Bounce Rate', value: '42%', target: '<40%', trend: '-3%' },
                { metric: 'Avg. Time on Page', value: '2:34', target: '3:00', trend: '+15s' },
                { metric: 'Mobile Conversion', value: '8.7%', target: '10%', trend: '+1.2%' }
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-white rounded-lg">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{item.metric}</p>
                    <p className="text-xs text-gray-500">Target: {item.target}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-gray-900">{item.value}</p>
                    <p className="text-xs text-green-600 font-semibold">{item.trend}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gray-50 rounded-xl p-6">
            <h3 className="font-semibold text-gray-900 mb-4">A/B Tests</h3>
            <div className="space-y-3">
              {[
                { name: 'Headline Variation', status: 'running', variantA: '12.1%', variantB: '12.4%', winner: 'B' },
                { name: 'CTA Button Color', status: 'completed', variantA: '11.8%', variantB: '12.4%', winner: 'B' },
                { name: 'Social Proof Placement', status: 'planned', variantA: 'TBD', variantB: 'TBD', winner: null }
              ].map((test, index) => (
                <div key={index} className="p-3 bg-white rounded-lg border border-gray-200">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-semibold text-gray-900">{test.name}</span>
                    <span className={`px-2 py-1 rounded text-xs font-semibold ${
                      test.status === 'running' ? 'bg-blue-100 text-blue-700' :
                      test.status === 'completed' ? 'bg-green-100 text-green-700' :
                      'bg-gray-100 text-gray-600'
                    }`}>
                      {test.status}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <span className="text-gray-500">Variant A:</span>
                      <span className="ml-1 font-semibold text-gray-900">{test.variantA}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Variant B:</span>
                      <span className="ml-1 font-semibold text-gray-900">{test.variantB}</span>
                      {test.winner && <span className="ml-1 text-green-600">✓ Winner</span>}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-4 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors text-sm font-semibold">
              Create New Test
            </button>
          </div>
        </div>
      </div>

      {/* Content Calendar */}
      <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Content Calendar</h2>
            <p className="text-gray-600">Scheduled posts, emails, and announcements across all channels.</p>
          </div>
          <button className="px-4 py-2 bg-black text-white rounded-xl hover:bg-gray-800 transition-colors text-sm font-semibold flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Schedule Post
          </button>
        </div>

        <div className="mb-6">
          <div className="flex items-center gap-2 mb-4">
            {['All', 'Twitter', 'LinkedIn', 'Email', 'Blog'].map((filter) => (
              <button key={filter} className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
                filter === 'All' 
                  ? 'bg-black text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}>
                {filter}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          {[
            {
              date: '2024-03-15',
              time: '9:00 AM',
              channel: 'Twitter',
              type: 'Post',
              content: '🚀 Excited to announce our launch! Join 1,500+ teams using TechFlow AI...',
              status: 'scheduled',
              engagement: null
            },
            {
              date: '2024-03-15',
              time: '10:00 AM',
              channel: 'Email',
              type: 'Newsletter',
              content: 'Launch Day Special: Welcome to TechFlow AI',
              status: 'scheduled',
              engagement: null
            },
            {
              date: '2024-03-14',
              time: '2:00 PM',
              channel: 'LinkedIn',
              type: 'Post',
              content: 'Behind the scenes: How we built TechFlow in 6 months...',
              status: 'published',
              engagement: '1.2K likes, 89 comments'
            },
            {
              date: '2024-03-13',
              time: '11:00 AM',
              channel: 'Blog',
              type: 'Article',
              content: '10 Ways AI Can Transform Remote Team Productivity',
              status: 'published',
              engagement: '3.5K views'
            }
          ].map((item, index) => (
            <div key={index} className="p-4 bg-gray-50 rounded-xl border border-gray-200 hover:shadow-md transition-all">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-sm font-semibold text-gray-900">{item.date}</span>
                    <span className="text-sm text-gray-600">{item.time}</span>
                    <span className={`px-2 py-1 rounded text-xs font-semibold ${
                      item.channel === 'Twitter' ? 'bg-blue-100 text-blue-700' :
                      item.channel === 'LinkedIn' ? 'bg-indigo-100 text-indigo-700' :
                      item.channel === 'Email' ? 'bg-purple-100 text-purple-700' :
                      'bg-gray-100 text-gray-700'
                    }`}>
                      {item.channel}
                    </span>
                    <span className="px-2 py-1 bg-gray-200 text-gray-700 rounded text-xs font-semibold">
                      {item.type}
                    </span>
                    <span className={`px-2 py-1 rounded text-xs font-semibold ${
                      item.status === 'published' ? 'bg-green-100 text-green-700' :
                      'bg-yellow-100 text-yellow-700'
                    }`}>
                      {item.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-700 mb-2">{item.content}</p>
                  {item.engagement && (
                    <p className="text-xs text-gray-600">📊 {item.engagement}</p>
                  )}
                </div>
                <div className="flex items-center gap-2 ml-4">
                  <button className="p-2 hover:bg-white rounded-lg transition-colors">
                    <Edit3 className="w-4 h-4 text-gray-600" />
                  </button>
                  {item.status === 'scheduled' && (
                    <button className="p-2 hover:bg-white rounded-lg transition-colors">
                      <X className="w-4 h-4 text-gray-600" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Influencer & Partner Outreach */}
      <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Influencer & Partner Outreach</h2>
            <p className="text-gray-600">Contact list and collaboration tracker for influencers and strategic partners.</p>
          </div>
          <button className="px-4 py-2 bg-black text-white rounded-xl hover:bg-gray-800 transition-colors text-sm font-semibold flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Add Contact
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-900">Influencers</h3>
            {[
              {
                name: 'Sarah Chen',
                role: 'Tech YouTuber',
                followers: '250K',
                status: 'contacted',
                response: 'Interested',
                nextStep: 'Send product access'
              },
              {
                name: 'Mike Johnson',
                role: 'LinkedIn Creator',
                followers: '180K',
                status: 'pending',
                response: null,
                nextStep: 'Initial outreach'
              },
              {
                name: 'Emma Davis',
                role: 'Podcast Host',
                followers: '95K',
                status: 'contacted',
                response: 'Scheduled',
                nextStep: 'Interview on 3/20'
              }
            ].map((contact, index) => (
              <div key={index} className="p-4 bg-gray-50 rounded-xl border border-gray-200">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h4 className="font-semibold text-gray-900">{contact.name}</h4>
                    <p className="text-sm text-gray-600">{contact.role} • {contact.followers} followers</p>
                  </div>
                  <span className={`px-2 py-1 rounded text-xs font-semibold ${
                    contact.status === 'contacted' ? 'bg-blue-100 text-blue-700' :
                    'bg-yellow-100 text-yellow-700'
                  }`}>
                    {contact.status}
                  </span>
                </div>
                {contact.response && (
                  <p className="text-xs text-gray-600 mb-1">Response: <span className="font-semibold text-green-600">{contact.response}</span></p>
                )}
                <p className="text-xs text-gray-600">Next: {contact.nextStep}</p>
              </div>
            ))}
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-gray-900">Partners</h3>
            {[
              {
                name: 'TechCrunch',
                type: 'Media Partner',
                status: 'confirmed',
                collaboration: 'Launch coverage',
                nextStep: 'Send press kit'
              },
              {
                name: 'Product Hunt',
                type: 'Platform',
                status: 'confirmed',
                collaboration: 'Launch feature',
                nextStep: 'Submit on 3/15'
              },
              {
                name: 'Startup Grind',
                type: 'Community',
                status: 'pending',
                collaboration: 'Event partnership',
                nextStep: 'Follow up'
              }
            ].map((partner, index) => (
              <div key={index} className="p-4 bg-gray-50 rounded-xl border border-gray-200">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h4 className="font-semibold text-gray-900">{partner.name}</h4>
                    <p className="text-sm text-gray-600">{partner.type}</p>
                  </div>
                  <span className={`px-2 py-1 rounded text-xs font-semibold ${
                    partner.status === 'confirmed' ? 'bg-green-100 text-green-700' :
                    'bg-yellow-100 text-yellow-700'
                  }`}>
                    {partner.status}
                  </span>
                </div>
                <p className="text-xs text-gray-600 mb-1">Collaboration: {partner.collaboration}</p>
                <p className="text-xs text-gray-600">Next: {partner.nextStep}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Press Kit */}
      <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Press Kit</h2>
            <p className="text-gray-600">Media assets, company backgrounder, and founder bios for press outreach.</p>
          </div>
          <button className="px-4 py-2 bg-black text-white rounded-xl hover:bg-gray-800 transition-colors text-sm font-semibold flex items-center gap-2">
            <Download className="w-4 h-4" />
            Download Kit
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-gray-50 rounded-xl p-6">
            <h3 className="font-semibold text-gray-900 mb-4">Media Assets</h3>
            <div className="space-y-3">
              {[
                { name: 'Company Logo (High Res)', format: 'PNG, SVG', size: '2.4 MB' },
                { name: 'Product Screenshots', format: 'PNG', size: '8.7 MB' },
                { name: 'Founder Headshots', format: 'JPG', size: '5.2 MB' },
                { name: 'Brand Guidelines PDF', format: 'PDF', size: '12.1 MB' }
              ].map((asset, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-white rounded-lg">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{asset.name}</p>
                    <p className="text-xs text-gray-500">{asset.format} • {asset.size}</p>
                  </div>
                  <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                    <Download className="w-4 h-4 text-gray-600" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gray-50 rounded-xl p-6">
            <h3 className="font-semibold text-gray-900 mb-4">Company Backgrounder</h3>
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-semibold text-gray-900 mb-2">About TechFlow AI</h4>
                <p className="text-sm text-gray-700 leading-relaxed">
                  TechFlow AI is an AI-powered workflow automation platform designed for remote teams. Founded in 2024 by ex-Google engineers, we help distributed teams save 10+ hours per week by automating repetitive tasks and unifying workflows.
                </p>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-gray-900 mb-2">Key Facts</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• Founded: January 2024</li>
                  <li>• Location: San Francisco, CA</li>
                  <li>• Beta Users: 1,250+ teams</li>
                  <li>• Funding: Bootstrapped</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 rounded-xl p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Founder Bios</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              {
                name: 'Alex Chen',
                role: 'CEO & Co-Founder',
                bio: 'Former Google engineer with 8 years of experience building scalable AI systems. Led development of Google Workspace automation tools.',
                email: 'alex@techflow.ai',
                linkedin: 'linkedin.com/in/alexchen'
              },
              {
                name: 'Sarah Martinez',
                role: 'COO & Co-Founder',
                bio: 'Ex-McKinsey consultant with 6 years in strategy and operations. Led 3 successful product launches and raised $15M in previous ventures.',
                email: 'sarah@techflow.ai',
                linkedin: 'linkedin.com/in/sarahmartinez'
              }
            ].map((founder, index) => (
              <div key={index} className="p-4 bg-white rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-1">{founder.name}</h4>
                <p className="text-sm text-gray-600 mb-2">{founder.role}</p>
                <p className="text-sm text-gray-700 mb-3 leading-relaxed">{founder.bio}</p>
                <div className="text-xs text-gray-600">
                  <p>{founder.email}</p>
                  <p>{founder.linkedin}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Waitlist Metrics */}
      <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Waitlist Metrics</h2>
        <p className="text-gray-600 mb-6">Track waitlist signups, conversion rates, and engagement data.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold text-gray-900">Total Signups</h3>
              <Users className="w-5 h-5 text-blue-600" />
          </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">1,523</div>
            <div className="text-sm text-gray-600">+89 this week</div>
            <div className="mt-3 text-xs text-green-600 font-semibold">↑ 18% growth</div>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold text-gray-900">Today</h3>
              <TrendingUp className="w-5 h-5 text-green-600" />
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">47</div>
            <div className="text-sm text-gray-600">Last 24 hours</div>
            <div className="mt-3 text-xs text-green-600 font-semibold">↑ 23% vs yesterday</div>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-200">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold text-gray-900">Conversion</h3>
              <Target className="w-5 h-5 text-purple-600" />
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">12.4%</div>
            <div className="text-sm text-gray-600">Visitor to signup</div>
            <div className="mt-3 text-xs text-green-600 font-semibold">↑ 2.1% improvement</div>
          </div>

          <div className="bg-gradient-to-br from-orange-50 to-yellow-50 rounded-xl p-6 border border-orange-200">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold text-gray-900">Avg. Daily</h3>
              <Calendar className="w-5 h-5 text-orange-600" />
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">52</div>
            <div className="text-sm text-gray-600">Last 30 days</div>
            <div className="mt-3 text-xs text-green-600 font-semibold">Steady growth</div>
          </div>
        </div>

        <div className="bg-gray-50 rounded-xl p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Recent Signups</h3>
          <div className="space-y-3">
            {[
              { email: 'sarah@startup.com', source: 'Product Hunt', time: '2 min ago', verified: true },
              { email: 'mike@company.io', source: 'Twitter', time: '15 min ago', verified: true },
              { email: 'alex@tech.ai', source: 'Direct', time: '1 hour ago', verified: false },
              { email: 'emma@venture.com', source: 'LinkedIn', time: '2 hours ago', verified: true }
            ].map((signup, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-white rounded-lg">
                <div className="flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full ${signup.verified ? 'bg-green-500' : 'bg-yellow-500'}`}></div>
          <div>
                    <p className="text-sm font-medium text-gray-900">{signup.email}</p>
                    <p className="text-xs text-gray-500">via {signup.source}</p>
                  </div>
                </div>
                <span className="text-xs text-gray-500">{signup.time}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-semibold text-gray-900">Auto-synced from Launch Page</h4>
              <p className="text-sm text-gray-600">Waitlist form submissions are tracked automatically</p>
            </div>
            <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-semibold">
              View All Signups
            </button>
          </div>
        </div>
      </div>

      {/* Creative Vault */}
      <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Creative Vault</h2>
        <p className="text-gray-600 mb-6">Centralize logos, brand colors, media assets — export brand kit instantly.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-gray-50 rounded-xl p-6">
            <h3 className="font-semibold text-gray-900 mb-4">Brand Assets</h3>
            <div className="space-y-3">
              {[
                { name: 'Logo (PNG)', size: '2.4 MB', type: 'logo' },
                { name: 'Logo (SVG)', size: '156 KB', type: 'logo' },
                { name: 'Brand Guidelines', size: '5.1 MB', type: 'document' },
                { name: 'Social Media Kit', size: '12.3 MB', type: 'images' }
              ].map((asset, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-white rounded-lg">
                  <div className="flex items-center gap-3">
                    <FileText className="w-5 h-5 text-gray-600" />
                    <div>
                      <p className="font-medium text-gray-900 text-sm">{asset.name}</p>
                      <p className="text-xs text-gray-500">{asset.size}</p>
                    </div>
                  </div>
                  <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                    <Download className="w-4 h-4 text-gray-600" />
                    </button>
                </div>
              ))}
            </div>
            <button className="w-full mt-4 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors text-sm font-semibold">
              Upload Assets
            </button>
          </div>

            <div className="bg-gray-50 rounded-xl p-6">
            <h3 className="font-semibold text-gray-900 mb-4">Brand Colors</h3>
            <div className="space-y-3">
              {[
                { name: 'Primary', color: '#000000', usage: 'Buttons, headers' },
                { name: 'Secondary', color: '#6366F1', usage: 'Accents, links' },
                { name: 'Background', color: '#F9FAFB', usage: 'Page background' },
                { name: 'Text', color: '#111827', usage: 'Body text' }
              ].map((color, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-white rounded-lg">
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-10 h-10 rounded-lg border border-gray-200"
                      style={{ backgroundColor: color.color }}
                    ></div>
                    <div>
                      <p className="font-medium text-gray-900 text-sm">{color.name}</p>
                      <p className="text-xs text-gray-500">{color.color} • {color.usage}</p>
                </div>
                </div>
                  <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                    <Copy className="w-4 h-4 text-gray-600" />
                  </button>
                </div>
              ))}
                </div>
              </div>
            </div>

        <button className="w-full px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl hover:shadow-lg transition-all font-semibold">
          Export Complete Brand Kit
              </button>
            </div>
          </div>
  );

  const renderPitchingTab = () => (
    <div className="space-y-6">
      {/* Pitch Library */}
      <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Pitch Library</h2>
        <p className="text-gray-600 mb-6">Store your Deck, One-Pager, Demo Video. Add notes per investor or event.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-gray-400 transition-colors cursor-pointer">
            <FileText className="w-12 h-12 text-gray-400 mx-auto mb-3" />
            <h3 className="font-semibold text-gray-900 mb-2">Pitch Deck</h3>
            <p className="text-sm text-gray-600 mb-4">Upload your presentation</p>
            <button className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors text-sm font-semibold">
              Upload Deck
            </button>
          </div>
          
          <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-gray-400 transition-colors cursor-pointer">
            <FileText className="w-12 h-12 text-gray-400 mx-auto mb-3" />
            <h3 className="font-semibold text-gray-900 mb-2">One-Pager</h3>
            <p className="text-sm text-gray-600 mb-4">Executive summary</p>
            <button className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors text-sm font-semibold">
              Upload One-Pager
            </button>
          </div>
          
          <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-gray-400 transition-colors cursor-pointer">
            <Video className="w-12 h-12 text-gray-400 mx-auto mb-3" />
            <h3 className="font-semibold text-gray-900 mb-2">Demo Video</h3>
            <p className="text-sm text-gray-600 mb-4">Product demonstration</p>
            <button className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors text-sm font-semibold">
              Upload Video
            </button>
          </div>
        </div>

          <div className="bg-gray-50 rounded-xl p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Recent Materials</h3>
            <div className="space-y-3">
            {[
              { name: 'TechFlow_Deck_v3.pdf', type: 'Deck', date: '2024-02-20', notes: 'Updated for Series A' },
              { name: 'One_Pager_Final.pdf', type: 'One-Pager', date: '2024-02-18', notes: 'Investor version' },
              { name: 'Demo_Video_2min.mp4', type: 'Video', date: '2024-02-15', notes: 'Product showcase' }
            ].map((file, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-white rounded-lg">
                <div className="flex items-center gap-3 flex-1">
                  <FileText className="w-5 h-5 text-gray-600" />
                  <div>
                    <h4 className="font-semibold text-gray-900">{file.name}</h4>
                    <p className="text-xs text-gray-600">{file.type} • {file.date}</p>
                    <p className="text-xs text-gray-500 mt-1">Notes: {file.notes}</p>
              </div>
              </div>
                <div className="flex items-center gap-2">
                  <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                    <Download className="w-4 h-4 text-gray-600" />
                  </button>
                  <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                    <Share2 className="w-4 h-4 text-gray-600" />
                  </button>
              </div>
              </div>
            ))}
              </div>
            </div>
          </div>

      {/* Pitch Trainer */}
      <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-8 shadow-lg border border-purple-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Pitch Trainer</h2>
        <p className="text-gray-600 mb-6">AI critique tool — feedback on tone, clarity, investor appeal.</p>
        
        <div className="bg-white rounded-xl p-6 mb-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-purple-600 rounded-xl flex items-center justify-center">
              <MessageSquare className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">AI Analysis Ready</h3>
              <p className="text-sm text-gray-600">Upload your pitch for instant feedback</p>
            </div>
          </div>
          <button className="w-full px-6 py-3 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-colors font-semibold">
            Analyze My Pitch
          </button>
        </div>

            <div className="space-y-4">
          <div className="bg-white rounded-xl p-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <CheckCircle className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">Tone</h4>
                <p className="text-sm text-gray-700">Confident and professional. Good energy level.</p>
                </div>
                </div>
              </div>
          <div className="bg-white rounded-xl p-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <AlertCircle className="w-5 h-5 text-yellow-600" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">Clarity</h4>
                <p className="text-sm text-gray-700">Consider simplifying technical jargon for broader appeal.</p>
            </div>
          </div>
              </div>
          <div className="bg-white rounded-xl p-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <CheckCircle className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">Investor Appeal</h4>
                <p className="text-sm text-gray-700">Strong market opportunity and traction metrics.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Events Calendar */}
      <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Events Calendar</h2>
        <p className="text-gray-600 mb-6">Discover and apply to accelerators, demo days, or hackathons. Sync with StartupOS.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            {
              name: 'TechCrunch Disrupt Demo Day',
              type: 'Demo Day',
              date: 'Mar 15, 2024',
              location: 'San Francisco, CA',
              deadline: '5 days left',
              status: 'open'
            },
            {
              name: 'Startup Grind Pitch Competition',
              type: 'Pitch Event',
              date: 'Apr 10, 2024',
              location: 'Virtual',
              deadline: '20 days left',
              status: 'open'
            },
            {
              name: 'AI Hackathon 2024',
              type: 'Hackathon',
              date: 'Apr 25, 2024',
              location: 'New York, NY',
              deadline: '35 days left',
              status: 'open'
            },
            {
              name: 'Y Combinator Demo Day',
              type: 'Demo Day',
              date: 'May 5, 2024',
              location: 'Mountain View, CA',
              deadline: 'Closed',
              status: 'closed'
            }
          ].map((event, index) => (
            <div key={index} className={`p-6 rounded-xl border-2 ${
              event.status === 'open' ? 'bg-white border-gray-200 hover:border-black' : 'bg-gray-50 border-gray-200'
            } transition-all`}>
              <div className="flex items-start justify-between mb-3">
                <h3 className="font-bold text-gray-900">{event.name}</h3>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  event.status === 'open' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
                }`}>
                  {event.status === 'open' ? 'Open' : 'Closed'}
                </span>
          </div>
              <div className="space-y-2 text-sm text-gray-600 mb-4">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  {event.date}
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  {event.location}
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  {event.deadline}
                </div>
              </div>
              <button 
                className={`w-full px-4 py-2 rounded-lg font-semibold text-sm transition-colors ${
                  event.status === 'open' 
                    ? 'bg-black text-white hover:bg-gray-800' 
                    : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                }`}
                disabled={event.status === 'closed'}
              >
                {event.status === 'open' ? 'Apply Now' : 'Applications Closed'}
              </button>
            </div>
          ))}
          </div>
        </div>

      {/* Application Tracker */}
      <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Application Tracker</h2>
        <p className="text-gray-600 mb-6">Keep tabs on YC, Sequoia Spark, Hub71, Plug & Play, etc.</p>
        
        <div className="space-y-4">
          {[
            {
              program: 'Y Combinator',
              batch: 'W24',
              status: 'Interview Scheduled',
              date: 'Mar 20, 2024',
              stage: 'interview',
              notes: 'Prepare 10-min pitch + Q&A'
            },
            {
              program: 'Sequoia Spark',
              batch: 'Spring 2024',
              status: 'Application Submitted',
              date: 'Feb 15, 2024',
              stage: 'submitted',
              notes: 'Waiting for response'
            },
            {
              program: 'Hub71',
              batch: 'Q2 2024',
              status: 'Under Review',
              date: 'Feb 28, 2024',
              stage: 'review',
              notes: 'Financial docs requested'
            },
            {
              program: 'Plug and Play',
              batch: 'Batch 15',
              status: 'Accepted',
              date: 'Jan 10, 2024',
              stage: 'accepted',
              notes: 'Onboarding starts Apr 1'
            }
          ].map((app, index) => (
            <div key={index} className="p-6 bg-gray-50 rounded-xl hover:shadow-md transition-all">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="text-lg font-bold text-gray-900">{app.program}</h3>
                  <p className="text-sm text-gray-600">{app.batch}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  app.stage === 'accepted' ? 'bg-green-100 text-green-700' :
                  app.stage === 'interview' ? 'bg-blue-100 text-blue-700' :
                  app.stage === 'review' ? 'bg-yellow-100 text-yellow-700' :
                  'bg-gray-100 text-gray-700'
                }`}>
                  {app.status}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-4 mb-3">
                <div>
                  <p className="text-xs text-gray-500">Submitted</p>
                  <p className="text-sm font-semibold text-gray-900">{app.date}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Notes</p>
                  <p className="text-sm text-gray-700">{app.notes}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button className="px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-semibold">
                  View Details
                </button>
                <button className="px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-semibold">
                  Add Note
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pitch Tracker */}
      <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Pitch Tracker</h2>
            <p className="text-gray-600">Application status, feedback log, and follow-up tracking for all pitch events.</p>
          </div>
          <button className="px-4 py-2 bg-black text-white rounded-xl hover:bg-gray-800 transition-colors text-sm font-semibold flex items-center gap-2">
            <Plus className="w-4 h-4" />
            New Application
          </button>
        </div>

        <div className="space-y-4">
          {[
            {
              event: 'TechCrunch Disrupt Demo Day',
              date: '2024-03-15',
              status: 'submitted',
              stage: 'review',
              feedback: 'Strong product-market fit, interested in traction metrics',
              nextStep: 'Follow up in 1 week',
              materials: ['Pitch Deck v3', 'One-Pager', 'Demo Video']
            },
            {
              event: 'Y Combinator W24',
              date: '2024-02-20',
              status: 'interview',
              stage: 'interview',
              feedback: 'Interview scheduled for March 20th. Prepare for technical deep dive.',
              nextStep: 'Prepare Q&A responses',
              materials: ['Pitch Deck v2', 'Financial Model']
            },
            {
              event: 'Startup Grind Pitch Competition',
              date: '2024-04-10',
              status: 'applied',
              stage: 'pending',
              feedback: null,
              nextStep: 'Wait for confirmation',
              materials: ['Pitch Deck v3', 'One-Pager']
            }
          ].map((pitch, index) => (
            <div key={index} className="p-6 bg-gray-50 rounded-xl border border-gray-200 hover:shadow-md transition-all">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-bold text-gray-900">{pitch.event}</h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      pitch.stage === 'accepted' ? 'bg-green-100 text-green-700' :
                      pitch.stage === 'interview' ? 'bg-blue-100 text-blue-700' :
                      pitch.stage === 'review' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-gray-100 text-gray-600'
                    }`}>
                      {pitch.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">Event Date: {pitch.date}</p>
                  {pitch.feedback && (
                    <div className="bg-white rounded-lg p-3 mb-3 border border-gray-200">
                      <p className="text-xs font-semibold text-gray-600 mb-1">Feedback:</p>
                      <p className="text-sm text-gray-700">{pitch.feedback}</p>
                    </div>
                  )}
                  <div className="flex items-center gap-4 text-sm">
                    <div>
                      <span className="text-gray-600">Next Step: </span>
                      <span className="font-semibold text-gray-900">{pitch.nextStep}</span>
                    </div>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {pitch.materials.map((material, mIndex) => (
                      <span key={mIndex} className="px-2 py-1 bg-white text-gray-700 rounded text-xs font-semibold border border-gray-200">
                        {material}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex items-center gap-2 ml-4">
                  <button className="p-2 hover:bg-white rounded-lg transition-colors">
                    <Edit3 className="w-4 h-4 text-gray-600" />
                  </button>
                  <button className="p-2 hover:bg-white rounded-lg transition-colors">
                    <MessageSquare className="w-4 h-4 text-gray-600" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Startup Profile */}
      <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Startup Profile</h2>
            <p className="text-gray-600">Public-facing company profile for investors and partners.</p>
          </div>
          <button className="px-4 py-2 bg-black text-white rounded-xl hover:bg-gray-800 transition-colors text-sm font-semibold flex items-center gap-2">
            <Edit3 className="w-4 h-4" />
            Edit Profile
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-gray-50 rounded-xl p-6">
            <h3 className="font-semibold text-gray-900 mb-4">Company Information</h3>
            <div className="space-y-3">
              {[
                { label: 'Company Name', value: 'TechFlow AI' },
                { label: 'Founded', value: 'January 2024' },
                { label: 'Location', value: 'San Francisco, CA' },
                { label: 'Industry', value: 'SaaS / Productivity' },
                { label: 'Stage', value: 'Pre-Seed' },
                { label: 'Website', value: 'techflow.ai' }
              ].map((item, index) => (
                <div key={index} className="flex justify-between p-2 bg-white rounded-lg">
                  <span className="text-sm text-gray-600">{item.label}</span>
                  <span className="text-sm font-semibold text-gray-900">{item.value}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gray-50 rounded-xl p-6">
            <h3 className="font-semibold text-gray-900 mb-4">Key Metrics</h3>
            <div className="space-y-3">
              {[
                { label: 'Beta Users', value: '1,250+' },
                { label: 'Waitlist', value: '1,523' },
                { label: 'Revenue (MRR)', value: '$0 (Pre-revenue)' },
                { label: 'Team Size', value: '8' },
                { label: 'Funding Raised', value: 'Bootstrapped' },
                { label: 'NPS Score', value: '52' }
              ].map((item, index) => (
                <div key={index} className="flex justify-between p-2 bg-white rounded-lg">
                  <span className="text-sm text-gray-600">{item.label}</span>
                  <span className="text-sm font-semibold text-gray-900">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-gray-50 rounded-xl p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Company Description</h3>
          <p className="text-sm text-gray-700 leading-relaxed">
            TechFlow AI is revolutionizing remote work with AI-powered workflow automation. We help distributed teams save 10+ hours per week by automating repetitive tasks and unifying workflows. Founded by ex-Google engineers, we're on a mission to make distributed work actually work.
          </p>
        </div>
      </div>

      {/* Investor CRM */}
      <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Investor CRM</h2>
            <p className="text-gray-600">Investor contacts, meeting notes, and next steps tracking.</p>
          </div>
          <button className="px-4 py-2 bg-black text-white rounded-xl hover:bg-gray-800 transition-colors text-sm font-semibold flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Add Investor
          </button>
        </div>

        <div className="space-y-4">
          {[
            {
              name: 'John Smith',
              firm: 'Sequoia Capital',
              role: 'Partner',
              stage: 'Series A',
              status: 'warm',
              lastContact: '2024-03-10',
              nextStep: 'Send updated deck',
              notes: 'Interested in AI/ML space. Requested traction metrics.',
              meetings: 2
            },
            {
              name: 'Sarah Johnson',
              firm: 'Andreessen Horowitz',
              role: 'Principal',
              stage: 'Seed',
              status: 'cold',
              lastContact: '2024-02-15',
              nextStep: 'Initial outreach',
              notes: 'Focuses on B2B SaaS. Good fit for our space.',
              meetings: 0
            },
            {
              name: 'Mike Chen',
              firm: 'First Round Capital',
              role: 'Partner',
              stage: 'Pre-Seed',
              status: 'hot',
              lastContact: '2024-03-12',
              nextStep: 'Schedule follow-up call',
              notes: 'Very interested. Asked for customer references.',
              meetings: 3
            }
          ].map((investor, index) => (
            <div key={index} className="p-6 bg-gray-50 rounded-xl border border-gray-200 hover:shadow-md transition-all">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-bold text-gray-900">{investor.name}</h3>
                    <span className={`px-2 py-1 rounded text-xs font-semibold ${
                      investor.status === 'hot' ? 'bg-red-100 text-red-700' :
                      investor.status === 'warm' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-gray-100 text-gray-600'
                    }`}>
                      {investor.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-1">{investor.role} at {investor.firm}</p>
                  <p className="text-xs text-gray-500 mb-3">Stage: {investor.stage} • {investor.meetings} meetings</p>
                  <div className="bg-white rounded-lg p-3 mb-3 border border-gray-200">
                    <p className="text-xs font-semibold text-gray-600 mb-1">Notes:</p>
                    <p className="text-sm text-gray-700">{investor.notes}</p>
                  </div>
                  <div className="flex items-center gap-4 text-sm">
                    <div>
                      <span className="text-gray-600">Last Contact: </span>
                      <span className="font-semibold text-gray-900">{investor.lastContact}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Next Step: </span>
                      <span className="font-semibold text-gray-900">{investor.nextStep}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 ml-4">
                  <button className="p-2 hover:bg-white rounded-lg transition-colors">
                    <MessageSquare className="w-4 h-4 text-gray-600" />
                  </button>
                  <button className="p-2 hover:bg-white rounded-lg transition-colors">
                    <Calendar className="w-4 h-4 text-gray-600" />
                  </button>
                  <button className="p-2 hover:bg-white rounded-lg transition-colors">
                    <Edit3 className="w-4 h-4 text-gray-600" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Q&A Repository */}
      <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Q&A Repository</h2>
            <p className="text-gray-600">Common questions and refined answers for investor meetings and pitch events.</p>
          </div>
          <button className="px-4 py-2 bg-black text-white rounded-xl hover:bg-gray-800 transition-colors text-sm font-semibold flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Add Q&A
          </button>
        </div>

        <div className="space-y-4">
          {[
            {
              question: 'What problem are you solving?',
              answer: 'Remote teams waste 30% of their time on manual workflows and context switching between tools. TechFlow AI automates repetitive tasks and unifies workflows, saving teams 10+ hours per week.',
              category: 'Problem/Solution',
              usage: 12,
              lastUpdated: '2024-03-10'
            },
            {
              question: 'What is your traction?',
              answer: 'We have 1,250+ beta users with an average 40% productivity increase. Our waitlist has grown to 1,523 signups in 3 months. NPS score of 52 indicates strong product-market fit.',
              category: 'Traction',
              usage: 8,
              lastUpdated: '2024-03-12'
            },
            {
              question: 'How do you differentiate from competitors?',
              answer: 'Unlike generic automation tools, TechFlow AI is purpose-built for remote teams with deep integrations and AI that learns team patterns. Our focus on distributed work and founder experience (ex-Google) sets us apart.',
              category: 'Competition',
              usage: 6,
              lastUpdated: '2024-03-08'
            },
            {
              question: 'What is your business model?',
              answer: 'SaaS subscription model with tiered pricing: Starter ($29/user/month), Pro ($49/user/month), and Enterprise (custom). Target 70% gross margins with strong unit economics.',
              category: 'Business Model',
              usage: 10,
              lastUpdated: '2024-03-11'
            },
            {
              question: 'What is your go-to-market strategy?',
              answer: 'Product-led growth with freemium model, content marketing, and community building. Focus on remote-first companies and distributed teams. Partnerships with remote work tools.',
              category: 'GTM',
              usage: 7,
              lastUpdated: '2024-03-09'
            }
          ].map((qa, index) => (
            <div key={index} className="p-6 bg-gray-50 rounded-xl border border-gray-200 hover:shadow-md transition-all">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-semibold">
                      {qa.category}
                    </span>
                    <span className="text-xs text-gray-500">Used {qa.usage} times</span>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">{qa.question}</h3>
                  <p className="text-sm text-gray-700 leading-relaxed mb-2">{qa.answer}</p>
                  <p className="text-xs text-gray-500">Last updated: {qa.lastUpdated}</p>
                </div>
                <div className="flex items-center gap-2 ml-4">
                  <button className="p-2 hover:bg-white rounded-lg transition-colors">
                    <Edit3 className="w-4 h-4 text-gray-600" />
                  </button>
                  <button className="p-2 hover:bg-white rounded-lg transition-colors">
                    <Copy className="w-4 h-4 text-gray-600" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Showcase Page */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 shadow-lg border border-blue-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Showcase Page</h2>
        <p className="text-gray-600 mb-6">Public launch microsite (auto-built) for community + investor visibility.</p>
        
        <div className="bg-white rounded-xl p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-semibold text-gray-900">Your Public Launch Page</h3>
              <p className="text-sm text-gray-600">biggmate.com/showcase/techflow-ai</p>
            </div>
            <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold">Live</span>
          </div>
          
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold text-gray-900">1,247</div>
              <div className="text-xs text-gray-600">Page Views</div>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold text-gray-900">89</div>
              <div className="text-xs text-gray-600">Investor Clicks</div>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold text-gray-900">23</div>
              <div className="text-xs text-gray-600">Shares</div>
            </div>
          </div>

          <div className="flex gap-3">
            <button className="flex-1 px-6 py-3 bg-black text-white rounded-xl hover:bg-gray-800 transition-colors font-semibold">
              View Live Page
            </button>
            <button className="px-6 py-3 bg-white border-2 border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-semibold">
              Edit Page
            </button>
            <button className="px-6 py-3 bg-white border-2 border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-semibold">
              <Share2 className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6">
          <h4 className="font-semibold text-gray-900 mb-4">What's Included</h4>
          <div className="grid grid-cols-2 gap-3">
            {[
              'Company Overview',
              'Founder Bios',
              'Product Demo',
              'Traction Metrics',
              'Team Photos',
              'Contact Form',
              'Social Links',
              'Press Kit Download'
            ].map((item, index) => (
              <div key={index} className="flex items-center gap-2 text-sm text-gray-700">
                <CheckCircle className="w-4 h-4 text-green-600" />
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderPerksTab = () => (
    <div className="space-y-6">
      {/* Perks & Licenses */}
      <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Perks & Powerups</h2>
        <p className="text-gray-600 mb-6">Angel Access, StartupOS, ZeroHuman, Credits Store, Startup Passport, Progress Meter, and Graduation Status.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            {
              name: 'Angel Access',
              description: 'Connect with verified angel investors',
              status: 'active',
              icon: '👼'
            },
            {
              name: 'StartupOS',
              description: 'Graduate to full platform access',
              status: 'locked',
              icon: '🚀'
            },
            {
              name: 'ZeroHuman',
              description: 'AI-powered legal document analysis',
              status: 'active',
              icon: '🤖'
            },
            {
              name: 'Credits Store',
              description: '$10,000 in startup credits',
              status: 'active',
              icon: '💳'
            }
          ].map((perk, index) => (
            <div key={index} className="p-6 bg-gradient-to-br from-gray-50 to-white rounded-xl border border-gray-200 hover:shadow-lg transition-all">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="text-4xl">{perk.icon}</div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{perk.name}</h3>
                    <p className="text-sm text-gray-600">{perk.description}</p>
              </div>
              </div>
                {perk.status === 'active' ? (
                  <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">Active</span>
                ) : (
                  <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-semibold">Locked</span>
                )}
              </div>
              <button className={`w-full px-4 py-2 rounded-lg font-semibold text-sm transition-colors ${
                perk.status === 'active' 
                  ? 'bg-black text-white hover:bg-gray-800' 
                  : 'bg-gray-200 text-gray-500 cursor-not-allowed'
              }`}>
                {perk.status === 'active' ? 'Access Now' : 'Unlock'}
              </button>
              </div>
          ))}
            </div>
      </div>
    </div>
  );

  const renderVisaTab = () => (
    <div className="space-y-6">
      {/* Visa to StartupOS */}
      <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-8 shadow-lg border border-indigo-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Visa to StartupOS</h2>
        <p className="text-gray-600 mb-6">Graduate from BiggMate to StartupOS platform with your Boarding Pass and Founder Visa.</p>

        <div className="bg-white rounded-xl p-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Graduation Requirements</h3>
          <div className="space-y-3">
            {[
              { requirement: 'Complete MVP', status: 'done' },
              { requirement: 'Launch publicly', status: 'done' },
              { requirement: '100+ users', status: 'in-progress' },
              { requirement: 'First revenue', status: 'pending' }
            ].map((item, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-gray-900">{item.requirement}</span>
                {item.status === 'done' ? (
                  <CheckCircle className="w-5 h-5 text-green-600" />
                ) : item.status === 'in-progress' ? (
                  <Clock className="w-5 h-5 text-blue-600" />
                ) : (
                  <div className="w-5 h-5 border-2 border-gray-300 rounded-full" />
                )}
          </div>
        ))}
          </div>
        </div>

        <button className="w-full px-6 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl hover:shadow-lg transition-all font-bold text-lg">
          Apply for StartupOS Visa
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-6">
        {/* Tabs */}
        <div className="mb-6">
          <div className="bg-white rounded-2xl p-2 shadow-lg border border-gray-100">
            <div className="flex flex-wrap gap-2 overflow-x-auto">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl font-semibold transition-all duration-300 cursor-pointer ${
                      isActive
                        ? 'bg-gray-900 text-white shadow-lg'
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
        {activeTab === 'overview' && renderOverviewTab()}
        {activeTab === 'product' && renderProductTab()}
        {activeTab === 'dataroom' && renderDataRoomTab()}
        {activeTab === 'gtm' && renderGTMTab()}
        {activeTab === 'pitching' && renderPitchingTab()}
        {activeTab === 'perks' && renderPerksTab()}
        {activeTab === 'visa' && renderVisaTab()}
      </div>

      {/* Task Modal */}
      {showTaskModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                {editingTask ? 'Edit Task' : 'Add New Task'}
              </h2>
              <button
                onClick={() => {
                  setShowTaskModal(false);
                  setEditingTask(null);
                }}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Task Name *
                </label>
                <input
                  type="text"
                  value={newTask.task}
                  onChange={(e) => setNewTask({ ...newTask, task: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                  placeholder="Enter task name"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Category *
                  </label>
                  <select
                    value={newTask.category}
                    onChange={(e) => setNewTask({ ...newTask, category: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                  >
                    <option value="Product">Product</option>
                    <option value="GTM">GTM</option>
                    <option value="Legal">Legal</option>
                    <option value="Marketing">Marketing</option>
                    <option value="Operations">Operations</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Assignee
                  </label>
                  <input
                    type="text"
                    value={newTask.assignee}
                    onChange={(e) => setNewTask({ ...newTask, assignee: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                    placeholder="Enter assignee name"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Due Date
                </label>
                <input
                  type="date"
                  value={newTask.dueDate}
                  onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Dependencies (comma-separated)
                </label>
                <input
                  type="text"
                  value={newTask.dependencies}
                  onChange={(e) => setNewTask({ ...newTask, dependencies: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                  placeholder="e.g., Design system complete, Landing page live"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Blockers (comma-separated)
                </label>
                <input
                  type="text"
                  value={newTask.blockers}
                  onChange={(e) => setNewTask({ ...newTask, blockers: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                  placeholder="e.g., Waiting on dev team"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Progress ({newTask.progress}%)
                </label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={newTask.progress}
                  onChange={(e) => setNewTask({ ...newTask, progress: parseInt(e.target.value) })}
                  className="w-full"
                />
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => {
                  setShowTaskModal(false);
                  setEditingTask(null);
                }}
                className="flex-1 px-6 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveTask}
                disabled={!newTask.task.trim()}
                className="flex-1 px-6 py-3 bg-black text-white rounded-xl hover:bg-gray-800 transition-colors font-semibold disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                {editingTask ? 'Update Task' : 'Add Task'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LaunchPreparation;
