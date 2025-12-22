import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MarketingNavbar from './MarketingNavbar';
import MarketingFooter from './MarketingFooter';
import {
  ArrowRight,
  CheckCircle,
  Zap,
  Users,
  Target,
  TrendingUp,
  Shield,
  Rocket,
  Sparkles,
  BarChart3,
  Award,
  Brain,
  FileText,
  Calendar,
  MessageSquare,
  Code,
  Lightbulb,
  Briefcase,
  PieChart,
  Lock,
  Globe2,
  Gem,
  Crown,
  Star,
  Flame,
  Box,
  Layers,
  Settings
} from 'lucide-react';

const ProductLanding = () => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const [activeFeature, setActiveFeature] = useState(0);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleGetStarted = () => {
    navigate('/auth');
  };

  const coreFeatures = [
    {
      icon: Lightbulb,
      title: 'Pitch Home',
      description: 'Discover, filter, and engage with community pitches from founders looking for aligned partners.',
      features: [
        'Smart discovery & filters',
        'Role-based browsing',
        'Save & follow pitches',
        'Signal interest quickly',
        'Shareable pitch profiles'
      ],
      gradient: 'from-indigo-600 via-violet-600 to-purple-600'
    },
    {
      icon: MessageSquare,
      title: 'My Pitches',
      description: 'Create, edit, and manage your pitches with responses, status tracking, and analytics.',
      features: [
        'Structured pitch templates',
        'Pitch-back responses',
        'Status & response tracking',
        'Metrics & insights',
        'Version history'
      ],
      gradient: 'from-purple-600 via-violet-600 to-indigo-600'
    },
    {
      icon: Users,
      title: 'Cofounder Finder',
      description: 'Find aligned cofounders through targeted matching, role proposals, and deep alignment signals.',
      features: [
        'Compatibility scoring',
        'Vision alignment checks',
        'Complementary skill matching',
        'Role proposals & fit',
        'Shortlist & outreach'
      ],
      gradient: 'from-violet-600 via-indigo-600 to-purple-600'
    },
    {
      icon: BarChart3,
      title: 'Founder CRM',
      description: 'Track conversations, commitments, and relationship progress with a lightweight CRM built for founders.',
      features: [
        'Conversation timelines',
        'Commitment tracking',
        'Relationship status',
        'Notes & follow-ups',
        'Pipeline views'
      ],
      gradient: 'from-indigo-600 via-purple-600 to-violet-600'
    },
    {
      icon: Brain,
      title: 'AI Co‑Founders',
      description: 'Get AI assistance for pitch refinement, role fit, outreach messaging, and cofounder evaluation.',
      features: [
        'Pitch refinement',
        'Role fit analysis',
        'Outreach drafts',
        'Conversation summaries',
        'Next‑best action tips'
      ],
      gradient: 'from-purple-700 via-violet-700 to-indigo-700'
    }
  ];

  const additionalFeatures = [
    {
      icon: MessageSquare,
      title: 'In-Platform Messaging',
      description: 'Secure, real-time communication to discuss ideas and collaborate.',
      gradient: 'from-amber-500 to-orange-500'
    },
    {
      icon: FileText,
      title: 'Document Collaboration',
      description: 'Share and collaborate on pitch decks and business plans in real-time.',
      gradient: 'from-orange-500 to-amber-600'
    },
    {
      icon: Calendar,
      title: 'Meeting Scheduler',
      description: 'Schedule and manage meetings with potential cofounders seamlessly.',
      gradient: 'from-yellow-500 to-amber-500'
    },
    {
      icon: Users,
      title: 'Verified Network',
      description: 'Connect with verified entrepreneurs who completed background checks.',
      gradient: 'from-amber-600 to-orange-600'
    },
    {
      icon: Code,
      title: 'Skills Showcase',
      description: 'Showcase your technical skills, portfolio, and past projects.',
      gradient: 'from-orange-600 to-red-500'
    },
    {
      icon: Briefcase,
      title: 'Business Marketplace',
      description: 'Offer your business expertise as services while networking.',
      gradient: 'from-yellow-600 to-amber-600'
    },
    {
      icon: PieChart,
      title: 'Analytics & Insights',
      description: 'Track profile views, pitch responses, and matching success.',
      gradient: 'from-amber-500 to-yellow-600'
    },
    {
      icon: Settings,
      title: 'Customizable Profile',
      description: 'Create a comprehensive profile highlighting your unique strengths.',
      gradient: 'from-orange-500 to-amber-700'
    },
    {
      icon: Lock,
      title: 'Privacy Controls',
      description: 'Advanced privacy settings to control who sees your information.',
      gradient: 'from-amber-600 to-orange-700'
    },
    {
      icon: Globe2,
      title: 'Global Network',
      description: 'Connect with entrepreneurs from around the world.',
      gradient: 'from-yellow-500 to-orange-500'
    },
    {
      icon: Award,
      title: 'Achievement System',
      description: 'Earn badges and recognition for platform milestones.',
      gradient: 'from-amber-400 to-orange-500'
    },
    {
      icon: Lightbulb,
      title: 'Idea Vault',
      description: 'Securely store and manage multiple startup ideas.',
      gradient: 'from-orange-400 to-amber-500'
    }
  ];

  const processSteps = [
    {
      step: '01',
      title: 'Create Profile',
      description: 'Share your skills, experience, and startup vision.',
      icon: Users,
      gradient: 'from-indigo-600 to-violet-600'
    },
    {
      step: '02',
      title: 'Post Your Pitch',
      description: 'Describe your idea and the roles you need.',
      icon: Target,
      gradient: 'from-violet-600 to-indigo-600'
    },
    {
      step: '03',
      title: 'Get Matched',
      description: 'AI finds aligned cofounders based on fit.',
      icon: Brain,
      gradient: 'from-purple-600 to-violet-700'
    },
    {
      step: '04',
      title: 'Connect & Decide',
      description: 'Review pitch‑backs, align, and move forward.',
      icon: MessageSquare,
      gradient: 'from-indigo-700 to-purple-700'
    }
  ];

  return (
    <div className="min-h-screen bg-white overflow-hidden">
      <MarketingNavbar />
      
      <section className="relative pt-40 pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-700 via-violet-700 to-purple-700"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjEiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-20"></div>
        <div className="absolute top-20 left-10 w-96 h-96 bg-white/10 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-white/10 rounded-full filter blur-3xl"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-5 py-2.5 rounded-full mb-8 border border-white/30">
              <Gem className="w-5 h-5 text-white" />
              <span className="text-sm font-bold text-white">Core Platform</span>
            </div>
            
            <h1 className="text-6xl sm:text-7xl lg:text-8xl font-black mb-8 leading-none text-white">
              Everything You Need to<br />
              <span className="bg-gradient-to-r from-indigo-200 via-violet-200 to-purple-200 bg-clip-text text-transparent">Find Your Cofounder</span>
            </h1>
            
            <p className="text-2xl sm:text-3xl text-white mb-12 max-w-4xl mx-auto font-semibold leading-relaxed">
              A focused platform to find aligned cofounders, manage pitches, and track relationships — streamlined for what you need now.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <button
                onClick={handleGetStarted}
                className="group px-12 py-6 bg-white text-gray-900 rounded-2xl hover:scale-105 hover:shadow-2xl transition-all font-black text-xl flex items-center justify-center gap-3"
              >
                <span>Get Started</span>
                <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
              </button>
              <button
                onClick={() => navigate('/')}
                className="px-12 py-6 bg-white/10 backdrop-blur-sm text-white rounded-2xl hover:bg-white/20 transition-all font-bold text-xl border-2 border-white/30 hover:border-white/50"
              >
                Back to Home
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 px-5 py-2 bg-amber-50 rounded-full mb-8">
              <Flame className="w-5 h-5 text-violet-600" />
              <span className="text-sm font-bold text-violet-600">Core Features</span>
      </div>
            <h2 className="text-5xl sm:text-6xl font-black text-gray-900 mb-6">Powerful Platform Capabilities</h2>
            <p className="text-xl text-gray-800 max-w-3xl mx-auto font-semibold">
              Advanced tools and features to support your entire startup journey from ideation to launch
          </p>
        </div>

          <div className="space-y-32">
            {coreFeatures.map((feature, index) => {
            const Icon = feature.icon;
              const isEven = index % 2 === 0;
            return (
              <div
                key={index}
                  className={`grid lg:grid-cols-2 gap-16 items-center ${!isEven ? 'lg:grid-flow-dense' : ''}`}
                >
                  <div className={!isEven ? 'lg:col-start-2' : ''}>
                    <div className={`inline-flex w-20 h-20 bg-gradient-to-br ${feature.gradient} rounded-3xl items-center justify-center mb-8 shadow-2xl`}>
                      <Icon className="w-10 h-10 text-white" />
                    </div>
                    <h3 className="text-4xl sm:text-5xl font-black text-gray-900 mb-6">{feature.title}</h3>
                    <p className="text-xl text-gray-800 mb-8 leading-relaxed font-semibold">{feature.description}</p>
                    <div className="grid md:grid-cols-2 gap-4">
                      {feature.features.map((item, idx) => (
                        <div key={idx} className="flex items-start gap-3">
                          <div className={`flex-shrink-0 w-6 h-6 rounded-lg bg-gradient-to-br ${feature.gradient} flex items-center justify-center mt-0.5`}>
                            <CheckCircle className="w-4 h-4 text-white" />
                          </div>
                          <span className="text-gray-800 font-semibold">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className={`relative ${!isEven ? 'lg:col-start-1 lg:row-start-1' : ''}`}>
                    <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} rounded-[3rem] rotate-6 opacity-20 blur-2xl`}></div>
                    <div className={`relative bg-gradient-to-br ${feature.gradient} rounded-[3rem] p-16 shadow-2xl`}>
                      <div className="text-center">
                        <Icon className="w-32 h-32 text-white/20 mx-auto mb-6" />
                        <div className="text-white/10 text-8xl font-black">0{index + 1}</div>
                </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      </section>

      <section className="py-32 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 px-5 py-2 bg-white rounded-full mb-8 shadow-sm border border-violet-200">
              <Box className="w-5 h-5 text-violet-600" />
              <span className="text-sm font-bold text-violet-600">Additional Tools</span>
            </div>
            <h2 className="text-5xl sm:text-6xl font-black text-gray-900 mb-6">Even More Features</h2>
            <p className="text-xl text-gray-800 max-w-3xl mx-auto font-semibold">
              Comprehensive tools to enhance your cofounder matching and startup building experience
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {additionalFeatures.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="group relative bg-white rounded-3xl p-8 border-2 border-gray-100 hover:border-transparent hover:shadow-2xl transition-all"
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 rounded-3xl transition-opacity`}></div>
                  <div className="relative">
                    <div className={`w-14 h-14 bg-gradient-to-br ${feature.gradient} rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform`}>
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="text-lg font-black text-gray-900 mb-3">{feature.title}</h3>
                    <p className="text-gray-800 text-sm leading-relaxed font-medium">{feature.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 px-5 py-2 bg-amber-50 rounded-full mb-8">
              <Zap className="w-5 h-5 text-violet-600" />
              <span className="text-sm font-bold text-violet-600">Simple Process</span>
      </div>
            <h2 className="text-5xl sm:text-6xl font-black text-gray-900 mb-6">How It Works</h2>
            <p className="text-xl text-gray-800 max-w-3xl mx-auto font-semibold">
              Five simple steps to find your perfect cofounder and start building your dream startup
          </p>
        </div>

          <div className="grid md:grid-cols-5 gap-8 relative">
            <div className="hidden md:block absolute top-20 left-0 right-0 h-1 bg-gradient-to-r from-indigo-200 via-violet-200 to-purple-200"></div>
            {processSteps.map((step, index) => {
            const Icon = step.icon;
            return (
                <div key={index} className="relative">
                  <div className="relative mb-8">
                    <div className={`w-24 h-24 bg-gradient-to-br ${step.gradient} rounded-3xl flex items-center justify-center mx-auto shadow-2xl hover:scale-110 transition-transform`}>
                      <Icon className="w-12 h-12 text-white" />
                  </div>
                    <div className="absolute -top-3 -right-3 w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-xl border-4 border-gray-50">
                      <span className="text-sm font-black text-gray-900">{step.step}</span>
                  </div>
                  </div>
                  <h3 className="text-xl font-black text-gray-900 mb-4 text-center">{step.title}</h3>
                  <p className="text-gray-800 leading-relaxed text-center font-medium">{step.description}</p>
              </div>
            );
          })}
        </div>
      </div>
      </section>

      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-gray-900 to-slate-900"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjEiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-10"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-[4rem] p-16 border border-white/20 shadow-2xl">
            <div className="text-center">
              <div className="inline-flex items-center gap-2 px-5 py-2 bg-white/20 backdrop-blur-sm rounded-full mb-8 border border-white/30">
                <Brain className="w-5 h-5 text-white" />
                <span className="text-sm font-bold text-white">Start Matching</span>
              </div>
              <h2 className="text-5xl sm:text-6xl lg:text-7xl font-black text-white mb-8 leading-tight">
                Ready to Find Your Cofounder?
              </h2>
              <p className="text-2xl text-white mb-12 max-w-3xl mx-auto font-semibold">
                Join 500+ founders on the waitlist finding aligned partners faster
              </p>
              <button
                onClick={handleGetStarted}
                className="group px-12 py-6 bg-white text-gray-900 rounded-2xl hover:scale-105 hover:shadow-2xl transition-all font-black text-xl flex items-center justify-center gap-3 mx-auto"
              >
                <span>Get Started Now</span>
                <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
              </button>
              
              <div className="mt-16 grid md:grid-cols-4 gap-8">
                    {[
                      { icon: Users, label: '500+ On Waitlist', gradient: 'from-indigo-600 to-violet-600' },
                      { icon: Rocket, label: 'Launching 2026', gradient: 'from-violet-600 to-indigo-600' },
                      { icon: Award, label: '5 Core Features', gradient: 'from-purple-600 to-violet-700' },
                      { icon: Star, label: '24/7 Access', gradient: 'from-indigo-700 to-purple-700' }
                    ].map((stat, index) => {
                  const Icon = stat.icon;
                  return (
                    <div key={index} className="text-center">
                      <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br ${stat.gradient} rounded-2xl mb-4 shadow-xl`}>
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                      <div className="text-white font-bold text-lg">{stat.label}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      <MarketingFooter />
    </div>
  );
};

export default ProductLanding;
