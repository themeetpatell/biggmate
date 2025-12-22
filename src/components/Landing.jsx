import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowRight, 
  Users, 
  Rocket,
  Star,
  Quote,
  Sparkles,
  Target,
  Brain,
  CheckCircle,
  TrendingUp,
  Shield,
  BarChart3,
  Zap,
  Globe2,
  Gem,
  Crown,
  Lightbulb,
  MessageCircle,
  Lock,
  Award
} from 'lucide-react';
import MarketingNavbar from './MarketingNavbar';
import MarketingFooter from './MarketingFooter';

const Landing = () => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleStartJourney = () => {
    navigate('/auth?mode=signup');
  };

  const handleFindCofounder = () => {
    navigate('/auth?mode=signin');
  };

  const handleLearnMore = () => {
    const crisisSection = document.querySelector('#crisis');
    if (crisisSection) {
      crisisSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-white overflow-hidden">
      <MarketingNavbar />
      
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#5170ff]/10 via-[#5170ff]/10 to-[#5170ff]/10"></div>
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#5170ff]/40 rounded-full filter blur-3xl opacity-20 animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#5170ff]/40 rounded-full filter blur-3xl opacity-20 animate-pulse" style={{animationDelay: '1s'}}></div>
        </div>
        
        <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className={`space-y-10 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
              <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/90 backdrop-blur-sm rounded-full shadow-lg border border-[#5170ff]/30">
                <div className="flex -space-x-2">
                  <div className="w-6 h-6 bg-gradient-to-br from-[#5170ff]/100 to-[#5170ff]/100 rounded-full border-2 border-white"></div>
                  <div className="w-6 h-6 bg-gradient-to-br from-[#5170ff]/100 to-[#5170ff]/100 rounded-full border-2 border-white"></div>
                  <div className="w-6 h-6 bg-gradient-to-br from-[#5170ff]/100 to-[#5170ff] rounded-full border-2 border-white"></div>
                </div>
                <span className="text-sm font-bold bg-gradient-to-r from-[#5170ff] to-[#5170ff] bg-clip-text text-transparent">500+ Founders on Waitlist</span>
              </div>
              
              <div className="space-y-6">
                <h1 className="text-6xl sm:text-7xl lg:text-8xl font-black leading-none">
                  <span className="bg-gradient-to-r from-gray-900 via-slate-800 to-gray-900 bg-clip-text text-transparent">Find Your</span>
                  <span className="block bg-gradient-to-r from-[#5170ff] via-[#5170ff] to-[#5170ff] bg-clip-text text-transparent">Perfect Match</span>
                </h1>
                <p className="text-2xl sm:text-3xl text-gray-800 leading-relaxed font-semibold">
                  Connect with visionary cofounders.<br />
                  <span className="text-[#5170ff] font-black">Build the next unicorn.</span>
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={handleStartJourney}
                  className="group relative px-10 py-5 bg-gradient-to-r from-[#5170ff] to-[#5170ff] text-white rounded-2xl hover:shadow-2xl hover:scale-105 transition-all font-bold text-lg flex items-center justify-center gap-3 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-[#5170ff] to-[#4158d4] opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <span className="relative">Start Your Journey</span>
                  <ArrowRight className="relative w-6 h-6 group-hover:translate-x-2 transition-transform" />
                </button>
                <button 
                  onClick={handleFindCofounder}
                  className="group px-10 py-4 bg-white text-gray-900 rounded-2xl hover:shadow-xl transition-all font-bold text-lg border-2 border-gray-200 hover:border-[#5170ff]/40 flex items-center justify-center"
                >
                  <span>Find My Cofounder</span>
                </button>
              </div>
            </div>

            <div className={`relative transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-[#7086ff] via-[#7086ff] to-[#7086ff] rounded-[3rem] rotate-3 opacity-20 blur-2xl"></div>
                <div className="relative bg-gradient-to-br from-slate-900 via-gray-900 to-slate-900 rounded-[3rem] p-8 shadow-2xl border border-[#5170ff]/10">
                  <div className="space-y-6">
                    <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-6 border border-[#5170ff]/20 hover:bg-white/15 transition-all">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-14 h-14 bg-gradient-to-br from-[#7086ff] to-[#7086ff] rounded-2xl flex items-center justify-center">
                          <Users className="w-7 h-7 text-white" />
                        </div>
                      <div className="flex-1">
                          <div className="h-4 bg-white/30 rounded-full w-3/4 mb-2"></div>
                          <div className="h-3 bg-white/20 rounded-full w-1/2"></div>
                      </div>
                    </div>
                    <div className="space-y-3">
                        <div className="h-3 bg-white/20 rounded-full"></div>
                        <div className="h-3 bg-white/20 rounded-full w-5/6"></div>
                        <div className="h-3 bg-white/20 rounded-full w-4/6"></div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                      {[Brain, Target, Rocket, BarChart3].map((Icon, i) => (
                        <div key={i} className="bg-white/10 backdrop-blur-xl rounded-2xl p-5 border border-white/20 hover:bg-white/15 transition-all">
                          <div className="w-10 h-10 bg-gradient-to-br from-white/20 to-white/10 rounded-xl flex items-center justify-center mb-3">
                            <Icon className="w-5 h-5 text-white/90" />
                          </div>
                          <div className="h-2 bg-white/30 rounded-full w-2/3"></div>
                    </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative py-32 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-5 py-2 bg-violet-50 rounded-full mb-8">
              <Globe2 className="w-5 h-5 text-[#5170ff]" />
              <span className="text-sm font-bold text-[#5170ff]">Building in Public</span>
            </div>
            <h2 className="text-5xl sm:text-6xl font-black text-gray-900 mb-6">Join the Waitlist Movement</h2>
            <p className="text-xl text-gray-800 font-semibold max-w-3xl mx-auto">Solo founders and aspiring entrepreneurs are already lining up for launch</p>
          </div>

          <div className="grid md:grid-cols-4 gap-6 mb-12">
            <div className="text-center p-8 bg-gradient-to-br from-[#5170ff]/10 to-[#5170ff]/10 rounded-2xl border border-[#5170ff]/20">
              <div className="text-5xl font-black bg-gradient-to-br from-[#5170ff] to-[#5170ff] bg-clip-text text-transparent mb-2">500+</div>
              <div className="text-sm font-bold text-gray-700 uppercase tracking-wide mb-4">Waitlist Members</div>
              <div className="flex items-center justify-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-xs font-semibold text-green-700">Growing Daily</span>
              </div>
            </div>
            
            <div className="text-center p-8 bg-gradient-to-br from-[#5170ff]/10 to-[#5170ff]/10 rounded-2xl border border-[#5170ff]/20">
              <div className="text-5xl font-black bg-gradient-to-br from-[#5170ff] to-[#5170ff] bg-clip-text text-transparent mb-2">24</div>
              <div className="text-sm font-bold text-gray-700 uppercase tracking-wide mb-4">Countries</div>
              <div className="flex items-center justify-center gap-2">
                <Globe2 className="w-4 h-4 text-[#5170ff]" />
                <span className="text-xs font-semibold text-[#4158d4]">Global Reach</span>
              </div>
            </div>
            
            <div className="text-center p-8 bg-gradient-to-br from-[#5170ff]/10 to-[#5170ff]/10 rounded-2xl border border-[#5170ff]/20">
              <div className="text-5xl font-black bg-gradient-to-br from-[#5170ff] to-[#5170ff] bg-clip-text text-transparent mb-2">85%</div>
              <div className="text-sm font-bold text-gray-700 uppercase tracking-wide mb-4">Solo Founders</div>
              <div className="flex items-center justify-center gap-2">
                <Users className="w-4 h-4 text-[#5170ff]" />
                <span className="text-xs font-semibold text-[#4158d4]">Target Market</span>
              </div>
            </div>
            
            <div className="text-center p-8 bg-gradient-to-br from-[#5170ff]/10 to-[#5170ff]/10 rounded-2xl border border-[#5170ff]/20">
              <div className="text-5xl font-black bg-gradient-to-br from-[#5170ff] to-[#5170ff] bg-clip-text text-transparent mb-2">Q1</div>
              <div className="text-sm font-bold text-gray-700 uppercase tracking-wide mb-4">2026 Launch</div>
              <div className="flex items-center justify-center gap-2">
                <Rocket className="w-4 h-4 text-[#5170ff]" />
                <span className="text-xs font-semibold text-[#4158d4]">Coming Soon</span>
              </div>
            </div>
          </div>

          <div className="relative bg-gradient-to-br from-slate-900 via-gray-900 to-slate-900 rounded-3xl p-12 overflow-hidden">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 right-0 w-96 h-96 bg-[#5170ff] rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#5170ff] rounded-full blur-3xl"></div>
            </div>
            <div className="relative">
              <div className="text-center mb-10">
                <div className="inline-flex items-center gap-2 px-5 py-2 bg-white/10 backdrop-blur-sm rounded-full mb-6">
                  <Sparkles className="w-5 h-5 text-[#5170ff]/90" />
                  <span className="text-sm font-bold text-white">Why Founders Are Excited</span>
                </div>
                <h3 className="text-4xl font-black text-white mb-4">The Waitlist Is Buzzing</h3>
                <p className="text-xl text-gray-300 font-medium">Here's what early adopters are anticipating most</p>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#5170ff]/100 to-[#5170ff]/100 rounded-xl flex items-center justify-center mb-4">
                    <Target className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="text-lg font-bold text-white mb-2">No More Random Networking</h4>
                  <p className="text-gray-300 text-sm leading-relaxed">"Finally, a way to skip endless coffee chats and find people who actually match my vision and skill gaps."</p>
                  <div className="mt-4 flex items-center gap-2">
                    <div className="flex -space-x-2">
                      <div className="w-6 h-6 bg-[#5170ff] rounded-full border-2 border-slate-900"></div>
                      <div className="w-6 h-6 bg-[#5170ff] rounded-full border-2 border-slate-900"></div>
                      <div className="w-6 h-6 bg-[#5170ff] rounded-full border-2 border-slate-900"></div>
                    </div>
                    <span className="text-xs font-semibold text-[#5170ff]/90">200+ agree</span>
                  </div>
                </div>

                <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#5170ff]/100 to-[#5170ff]/100 rounded-xl flex items-center justify-center mb-4">
                    <Brain className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="text-lg font-bold text-white mb-2">Pitch-First Approach</h4>
                  <p className="text-gray-300 text-sm leading-relaxed">"Love that I can showcase my idea upfront. No more wondering if there's mutual interest before investing time."</p>
                  <div className="mt-4 flex items-center gap-2">
                    <div className="flex -space-x-2">
                      <div className="w-6 h-6 bg-[#5170ff] rounded-full border-2 border-slate-900"></div>
                      <div className="w-6 h-6 bg-[#5170ff] rounded-full border-2 border-slate-900"></div>
                      <div className="w-6 h-6 bg-[#5170ff] rounded-full border-2 border-slate-900"></div>
                    </div>
                    <span className="text-xs font-semibold text-purple-300">180+ agree</span>
                  </div>
                </div>

                <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#5170ff]/100 to-[#5170ff] rounded-xl flex items-center justify-center mb-4">
                    <Shield className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="text-lg font-bold text-white mb-2">Serious Founders Only</h4>
                  <p className="text-gray-300 text-sm leading-relaxed">"Tired of platforms full of idea tourists. Biggmate's vetting process means I'm connecting with committed builders."</p>
                  <div className="mt-4 flex items-center gap-2">
                    <div className="flex -space-x-2">
                      <div className="w-6 h-6 bg-[#5170ff] rounded-full border-2 border-slate-900"></div>
                      <div className="w-6 h-6 bg-[#5170ff] rounded-full border-2 border-slate-900"></div>
                      <div className="w-6 h-6 bg-[#5170ff] rounded-full border-2 border-slate-900"></div>
                    </div>
                    <span className="text-xs font-semibold text-indigo-300">150+ agree</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="crisis" className="py-32 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-5 py-2 bg-[#5170ff]/10 rounded-full mb-8">
              <TrendingUp className="w-5 h-5 text-[#5170ff]" />
              <span className="text-sm font-bold text-[#5170ff]">Market Opportunity</span>
            </div>
            <h2 className="text-5xl sm:text-6xl font-black text-gray-900 mb-6">The Cofounder Crisis</h2>
            <p className="text-xl text-gray-800 font-semibold">A billion-dollar problem waiting to be solved</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 mb-12">
            <div className="relative bg-white rounded-3xl p-10 shadow-lg border border-gray-100 hover:shadow-2xl transition-all">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#5170ff]/10 rounded-full blur-3xl"></div>
              <div className="relative">
                <div className="w-16 h-16 bg-gradient-to-br from-[#5170ff] to-[#4158d4] rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                  <Globe2 className="w-8 h-8 text-white" />
                </div>
                <div className="text-5xl font-black text-gray-900 mb-3">$8B</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Market Size (TAM)</h3>
                <p className="text-gray-700 leading-relaxed">Global startup ecosystem with 150M+ aspiring entrepreneurs looking for cofounders annually.</p>
              </div>
            </div>

            <div className="relative bg-white rounded-3xl p-10 shadow-lg border border-gray-100 hover:shadow-2xl transition-all">
              <div className="absolute top-0 left-0 w-32 h-32 bg-[#5170ff]/10 rounded-full blur-3xl"></div>
              <div className="relative">
                <div className="w-16 h-16 bg-gradient-to-br from-[#5170ff] to-[#4158d4] rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                  <TrendingUp className="w-8 h-8 text-white" />
                </div>
                <div className="text-5xl font-black text-gray-900 mb-3">65%</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Failure Rate</h3>
                <p className="text-gray-700 leading-relaxed">Of startups fail due to cofounder conflicts—the #1 preventable cause of startup death.</p>
              </div>
            </div>

            <div className="relative bg-white rounded-3xl p-10 shadow-lg border border-gray-100 hover:shadow-2xl transition-all">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#5170ff]/10 rounded-full blur-3xl"></div>
              <div className="relative">
                <div className="w-16 h-16 bg-gradient-to-br from-[#5170ff] to-[#4158d4] rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                  <Rocket className="w-8 h-8 text-white" />
                </div>
                <div className="text-5xl font-black text-gray-900 mb-3">47%</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Solo Founders</h3>
                <p className="text-gray-700 leading-relaxed">Nearly half of founders start alone, actively seeking the right cofounder to scale.</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-[#5170ff] to-[#4158d4] rounded-3xl p-12 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
            <div className="relative">
              <div className="text-center mb-10">
                <h3 className="text-4xl font-black text-white mb-4">Why This Works</h3>
                <p className="text-xl text-white/90 font-medium">The perfect storm of market conditions</p>
              </div>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Target className="w-10 h-10 text-white" />
                  </div>
                  <h4 className="text-lg font-bold text-white mb-2">Validated Problem</h4>
                  <p className="text-white/80 text-sm">500+ founders signed up before launch—proof of real demand and pain point validation.</p>
                </div>
                <div className="text-center">
                  <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Brain className="w-10 h-10 text-white" />
                  </div>
                  <h4 className="text-lg font-bold text-white mb-2">AI Advantage</h4>
                  <p className="text-white/80 text-sm">First to combine AI matching with pitch-first approach and integrated CRM—unique moat.</p>
                </div>
                <div className="text-center">
                  <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Shield className="w-10 h-10 text-white" />
                  </div>
                  <h4 className="text-lg font-bold text-white mb-2">Network Effects</h4>
                  <p className="text-white/80 text-sm">More founders = better matches. Platform value grows exponentially with each user.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-32 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-5 py-2 bg-violet-50 rounded-full mb-8">
            <Sparkles className="w-5 h-5 text-[#5170ff]" />
            <span className="text-sm font-bold text-[#5170ff]">The Problem</span>
          </div>
          <h2 className="text-5xl sm:text-6xl font-black text-gray-900 mb-8 leading-tight">
            Finding the Right Cofounder<br />
            <span className="bg-gradient-to-r from-[#5170ff] to-[#5170ff] bg-clip-text text-transparent">Shouldn't Be This Hard</span>
          </h2>
          <p className="text-2xl text-gray-800 leading-relaxed max-w-4xl mx-auto font-semibold">
            65% of startups fail because of cofounder conflicts. We're building an intelligent platform that ensures alignment from day one.
          </p>
        </div>
      </section>

      <section id="features" className="relative py-32 bg-gradient-to-br from-[#5170ff]/10 via-[#5170ff]/10 to-[#5170ff]/10 overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-indigo-100/50 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-1/3 h-full bg-gradient-to-r from-purple-100/50 to-transparent"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-5 py-2 bg-white/80 backdrop-blur-sm rounded-full mb-8 shadow-sm border border-[#5170ff]/30">
              <Sparkles className="w-5 h-5 text-[#5170ff]" />
              <span className="text-sm font-bold text-[#5170ff]">What We're Building</span>
            </div>
            <h2 className="text-5xl sm:text-6xl lg:text-7xl font-black text-gray-900 mb-6 leading-tight">
              The Complete<br/>
              <span className="bg-gradient-to-r from-[#5170ff] via-[#5170ff] to-[#5170ff] bg-clip-text text-transparent">Cofounder Platform</span>
            </h2>
            <p className="text-xl text-gray-800 max-w-3xl mx-auto font-semibold">Five powerful tools designed to help founders find their perfect match and build together</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-6 mb-6">
            <div className="lg:col-span-2 group relative bg-gradient-to-br from-[#5170ff] to-[#4158d4] rounded-3xl p-10 overflow-hidden hover:scale-[1.02] transition-all duration-500">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
              <div className="relative">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                    <Lightbulb className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-3xl font-black text-white">Pitch Home</h3>
                    <p className="text-indigo-100 font-medium">Your startup discovery hub</p>
                  </div>
                </div>
                <p className="text-xl text-indigo-50 leading-relaxed mb-6 font-medium">Browse community pitches, filter by industry and role, and find ideas that excite you. The central marketplace where founders showcase their vision.</p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-bold text-white">Smart Filters</span>
                  <span className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-bold text-white">Live Feed</span>
                  <span className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-bold text-white">Save Favorites</span>
                </div>
              </div>
            </div>

            <div className="group relative bg-gradient-to-br from-[#5170ff] to-[#5170ff] rounded-3xl p-10 overflow-hidden hover:scale-[1.02] transition-all duration-500">
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full blur-3xl"></div>
              <div className="relative h-full flex flex-col">
                <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-6">
                  <MessageCircle className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-3xl font-black text-white mb-4">My Pitches</h3>
                <p className="text-purple-50 leading-relaxed font-medium flex-grow">Create and manage your startup pitches. Track responses, update status, and control visibility.</p>
                <div className="mt-6 flex gap-2">
                  <TrendingUp className="w-5 h-5 text-purple-200" />
                  <span className="text-sm font-bold text-purple-100">Track Engagement</span>
                </div>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            <div className="group relative bg-gradient-to-br from-[#5170ff] to-[#5170ff] rounded-3xl p-10 overflow-hidden hover:scale-[1.02] transition-all duration-500">
              <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full blur-3xl"></div>
              <div className="relative h-full flex flex-col">
                <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-6">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-3xl font-black text-white mb-4">Cofounder Finder</h3>
                <p className="text-violet-50 leading-relaxed font-medium flex-grow">AI-powered matching to find cofounders with complementary skills and aligned vision.</p>
                <div className="mt-6 flex gap-2">
                  <Target className="w-5 h-5 text-violet-200" />
                  <span className="text-sm font-bold text-violet-100">Smart Matching</span>
                </div>
              </div>
            </div>

            <div className="group relative bg-gradient-to-br from-[#4158d4] to-[#4158d4] rounded-3xl p-10 overflow-hidden hover:scale-[1.02] transition-all duration-500">
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full blur-3xl"></div>
              <div className="relative h-full flex flex-col">
                <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-6">
                  <BarChart3 className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-3xl font-black text-white mb-4">Founder CRM</h3>
                <p className="text-indigo-50 leading-relaxed font-medium flex-grow">Lightweight relationship manager to track conversations and commitments.</p>
                <div className="mt-6 flex gap-2">
                  <CheckCircle className="w-5 h-5 text-indigo-200" />
                  <span className="text-sm font-bold text-indigo-100">Stay Organized</span>
                </div>
              </div>
            </div>

            <div className="group relative bg-gradient-to-br from-[#4158d4] to-[#3545b8] rounded-3xl p-10 overflow-hidden hover:scale-[1.02] transition-all duration-500">
              <div className="absolute top-0 left-0 w-48 h-48 bg-white/10 rounded-full blur-3xl"></div>
              <div className="relative h-full flex flex-col">
                <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-6">
                  <Brain className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-3xl font-black text-white mb-4">AI Co-Founders</h3>
                <p className="text-purple-50 leading-relaxed font-medium flex-grow">Get intelligent assistance for pitch refinement and messaging.</p>
                <div className="mt-6 flex gap-2">
                  <Sparkles className="w-5 h-5 text-purple-200" />
                  <span className="text-sm font-bold text-purple-100">AI-Powered</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-5 py-2 bg-violet-50 rounded-full mb-8">
            <Zap className="w-5 h-5 text-[#5170ff]" />
            <span className="text-sm font-bold text-[#5170ff]">Simple Process</span>
          </div>
            <h2 className="text-5xl sm:text-6xl font-black text-gray-900 mb-6">How It Works</h2>
            <p className="text-xl text-gray-800 font-semibold">Four simple steps to find your perfect cofounder</p>
          </div>

          <div className="grid md:grid-cols-4 gap-8 relative">
            <div className="hidden md:block absolute top-16 left-0 right-0 h-1 bg-gradient-to-r from-[#5170ff]/30 via-[#5170ff]/30 to-[#5170ff]/30"></div>
            {[
              { step: '01', title: 'Create Profile', desc: 'Share your skills, experience, and startup vision', icon: Users, color: 'from-[#5170ff] to-[#5170ff]' },
              { step: '02', title: 'Post Your Pitch', desc: 'Describe your idea and what you need', icon: Target, color: 'from-[#5170ff] to-[#5170ff]' },
              { step: '03', title: 'Get Matched', desc: 'AI finds compatible cofounders for you', icon: Brain, color: 'from-[#5170ff] to-[#4158d4]' },
              { step: '04', title: 'Connect & Decide', desc: 'Review pitch‑backs, align, and move forward', icon: MessageCircle, color: 'from-[#4158d4] to-[#4158d4]' }
            ].map((item, index) => {
              const Icon = item.icon;
              return (
              <div key={index} className="relative">
                <div className="text-center">
                    <div className={`relative inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br ${item.color} rounded-3xl text-white shadow-2xl mb-8 hover:scale-110 transition-transform`}>
                      <Icon className="w-10 h-10" />
                      <div className="absolute -top-3 -right-3 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg">
                        <span className="text-sm font-black text-gray-900">{item.step}</span>
                </div>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">{item.title}</h3>
                    <p className="text-gray-800 leading-relaxed font-medium">{item.desc}</p>
                  </div>
              </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-[#5170ff]/20 via-transparent to-[#5170ff]/10"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjEiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-20"></div>
        
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-5 py-2 bg-white/20 backdrop-blur-sm rounded-full mb-8 border border-white/30">
            <Brain className="w-5 h-5 text-white" />
            <span className="text-sm font-bold text-white">Start Matching Today</span>
          </div>
          <h2 className="text-5xl sm:text-6xl lg:text-7xl font-black text-white mb-8 leading-tight">
            Ready to Find Your<br />Perfect Cofounder?
          </h2>
          <p className="text-2xl text-white mb-12 max-w-3xl mx-auto font-semibold">
            Join 500+ founders on the waitlist finding aligned partners faster
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button
              onClick={handleStartJourney}
              className="group px-12 py-6 bg-white text-gray-900 rounded-2xl hover:scale-105 hover:shadow-2xl transition-all font-black text-xl flex items-center justify-center gap-3"
            >
              <span>Start Your Journey</span>
              <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
            </button>
            <button
              onClick={handleFindCofounder}
              className="px-12 py-5 bg-white/10 backdrop-blur-sm text-white rounded-2xl hover:bg-white/20 transition-all font-bold text-xl border-2 border-white/30 hover:border-white/50"
            >
              Find My Cofounder
            </button>
          </div>
          <div className="mt-12 flex items-center justify-center gap-8 text-white/80">
            <div className="flex items-center gap-2">
              <Lock className="w-5 h-5" />
              <span className="text-sm font-semibold">Secure Platform</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              <span className="text-sm font-semibold">Verified Users</span>
            </div>
            <div className="flex items-center gap-2">
              <MessageCircle className="w-5 h-5" />
              <span className="text-sm font-semibold">24/7 Support</span>
            </div>
          </div>
        </div>
      </section>

      <MarketingFooter />
    </div>
  );
};

export default Landing;
