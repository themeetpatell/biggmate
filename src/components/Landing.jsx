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
  PlayCircle,
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

  const handleFindCofounder = () => {
    navigate('/auth');
  };

  const handleLearnMore = () => {
    navigate('/product');
  };

  return (
    <div className="min-h-screen bg-white overflow-hidden">
      <MarketingNavbar />
      
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50"></div>
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-300 rounded-full filter blur-3xl opacity-20 animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-yellow-300 rounded-full filter blur-3xl opacity-20 animate-pulse" style={{animationDelay: '1s'}}></div>
        </div>
        
        <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className={`space-y-10 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
              <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/90 backdrop-blur-sm rounded-full shadow-lg border border-amber-200">
                <div className="flex -space-x-2">
                  <div className="w-6 h-6 bg-gradient-to-br from-amber-500 to-yellow-500 rounded-full border-2 border-white"></div>
                  <div className="w-6 h-6 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-full border-2 border-white"></div>
                  <div className="w-6 h-6 bg-gradient-to-br from-orange-500 to-amber-600 rounded-full border-2 border-white"></div>
                </div>
                <span className="text-sm font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">500+ Founders on Waitlist</span>
              </div>
              
              <div className="space-y-6">
                <h1 className="text-6xl sm:text-7xl lg:text-8xl font-black leading-none">
                  <span className="bg-gradient-to-r from-gray-900 via-slate-800 to-gray-900 bg-clip-text text-transparent">Find Your</span>
                  <span className="block bg-gradient-to-r from-amber-600 via-orange-600 to-yellow-600 bg-clip-text text-transparent">Perfect Match</span>
                </h1>
                <p className="text-2xl sm:text-3xl text-gray-800 leading-relaxed font-semibold">
                  Connect with visionary cofounders.<br />
                  <span className="text-amber-600 font-black">Build the next unicorn.</span>
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={handleFindCofounder}
                  className="group relative px-10 py-5 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-2xl hover:shadow-2xl hover:scale-105 transition-all font-bold text-lg flex items-center justify-center gap-3 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-amber-600 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <span className="relative">Start Your Journey</span>
                  <ArrowRight className="relative w-6 h-6 group-hover:translate-x-2 transition-transform" />
                </button>
                <button 
                  onClick={handleLearnMore}
                  className="group px-10 py-5 bg-white text-gray-900 rounded-2xl hover:shadow-xl transition-all font-bold text-lg border-2 border-gray-200 hover:border-amber-300 flex items-center justify-center gap-3"
                >
                  <PlayCircle className="w-6 h-6 group-hover:scale-110 transition-transform text-amber-600" />
                  <span>Watch Demo</span>
                </button>
              </div>

              <div className="grid grid-cols-3 gap-6 pt-8">
                <div className="text-center">
                  <div className="text-4xl font-black bg-gradient-to-br from-amber-600 to-orange-600 bg-clip-text text-transparent">500+</div>
                  <div className="text-sm font-semibold text-gray-600 mt-1">On Waitlist</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-black bg-gradient-to-br from-orange-600 to-amber-700 bg-clip-text text-transparent">6</div>
                  <div className="text-sm font-semibold text-gray-600 mt-1">Core Features</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-black bg-gradient-to-br from-yellow-600 to-amber-600 bg-clip-text text-transparent">2026</div>
                  <div className="text-sm font-semibold text-gray-600 mt-1">Launching</div>
                </div>
              </div>
            </div>

            <div className={`relative transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-amber-400 via-orange-400 to-yellow-400 rounded-[3rem] rotate-3 opacity-20 blur-2xl"></div>
                <div className="relative bg-gradient-to-br from-slate-900 via-gray-900 to-slate-900 rounded-[3rem] p-8 shadow-2xl border border-amber-500/10">
                  <div className="space-y-6">
                    <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-6 border border-amber-500/20 hover:bg-white/15 transition-all">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-14 h-14 bg-gradient-to-br from-amber-400 to-orange-400 rounded-2xl flex items-center justify-center">
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

      <section className="relative py-20 bg-white border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">Join Our Growing Community</p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-16">
            <div className="text-center">
              <div className="text-4xl font-black bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent mb-2">500+</div>
              <div className="text-sm font-bold text-gray-600 uppercase tracking-wide">Founders Waiting</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-black bg-gradient-to-r from-orange-600 to-amber-700 bg-clip-text text-transparent mb-2">2026</div>
              <div className="text-sm font-bold text-gray-600 uppercase tracking-wide">Launch Year</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-black bg-gradient-to-r from-yellow-600 to-amber-600 bg-clip-text text-transparent mb-2">100%</div>
              <div className="text-sm font-bold text-gray-600 uppercase tracking-wide">Free to Join</div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-32 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-5 py-2 bg-amber-50 rounded-full mb-8">
            <Sparkles className="w-5 h-5 text-amber-600" />
            <span className="text-sm font-bold text-amber-600">The Problem</span>
          </div>
          <h2 className="text-5xl sm:text-6xl font-black text-gray-900 mb-8 leading-tight">
            Finding the Right Cofounder<br />
            <span className="bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">Shouldn't Be This Hard</span>
          </h2>
          <p className="text-2xl text-gray-800 leading-relaxed max-w-4xl mx-auto font-semibold">
            65% of startups fail because of cofounder conflicts. We're building an intelligent platform that ensures alignment from day one.
          </p>
        </div>
      </section>

      <section className="py-32 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-5 py-2 bg-white rounded-full mb-8 shadow-sm border border-amber-200">
            <Gem className="w-5 h-5 text-amber-600" />
            <span className="text-sm font-bold text-amber-600">Platform Features</span>
          </div>
            <h2 className="text-5xl sm:text-6xl font-black text-gray-900 mb-6">Everything You Need</h2>
            <p className="text-xl text-gray-800 max-w-3xl mx-auto font-semibold">Powerful tools designed to help you find the perfect cofounder and build a successful startup together</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Brain,
                title: 'AI-Powered Matching',
                description: 'Advanced algorithms analyze skills, experience, and vision to find your perfect cofounder match.',
                gradient: 'from-amber-500 to-orange-500'
              },
              {
                icon: Target,
                title: 'Pitch-First System',
                description: 'Share your vision through structured pitches. Get specific role proposals from interested cofounders.',
                gradient: 'from-orange-500 to-amber-600'
              },
              {
                icon: Rocket,
                title: 'Complete Toolkit',
                description: 'From idea validation to launch - comprehensive tools for every stage of your startup journey.',
                gradient: 'from-yellow-500 to-amber-500'
              },
              {
                icon: Shield,
                title: 'Equity Framework',
                description: 'Professional templates, calculators, and guidance for equity splits and cofounder agreements.',
                gradient: 'from-amber-600 to-orange-600'
              },
              {
                icon: BarChart3,
                title: 'Sprint Dashboard',
                description: 'Track milestones, manage tasks, and monitor progress with integrated project management.',
                gradient: 'from-orange-600 to-red-500'
              },
              {
                icon: TrendingUp,
                title: 'Launch Prep',
                description: 'Investor readiness resources and go-to-market planning to ensure a successful launch.',
                gradient: 'from-amber-500 to-yellow-600'
              }
            ].map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="group relative bg-white rounded-3xl p-8 hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-transparent">
                  <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-10 rounded-3xl transition-opacity from-amber-400 to-orange-400"></div>
                  <div className={`relative w-16 h-16 bg-gradient-to-br ${feature.gradient} rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                  <p className="text-gray-800 leading-relaxed font-medium">{feature.description}</p>
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
            <Zap className="w-5 h-5 text-amber-600" />
            <span className="text-sm font-bold text-amber-600">Simple Process</span>
          </div>
            <h2 className="text-5xl sm:text-6xl font-black text-gray-900 mb-6">How It Works</h2>
            <p className="text-xl text-gray-800 font-semibold">Four simple steps to find your perfect cofounder</p>
          </div>

          <div className="grid md:grid-cols-4 gap-8 relative">
            <div className="hidden md:block absolute top-16 left-0 right-0 h-1 bg-gradient-to-r from-amber-200 via-orange-200 to-yellow-200"></div>
            {[
              { step: '01', title: 'Create Profile', desc: 'Share your skills, experience, and startup vision', icon: Users, color: 'from-amber-500 to-orange-500' },
              { step: '02', title: 'Post Your Pitch', desc: 'Describe your idea and what you need', icon: Target, color: 'from-orange-500 to-amber-600' },
              { step: '03', title: 'Get Matched', desc: 'AI finds compatible cofounders for you', icon: Brain, color: 'from-yellow-500 to-amber-500' },
              { step: '04', title: 'Build Together', desc: 'Connect and start building your startup', icon: Rocket, color: 'from-amber-600 to-orange-600' }
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

      <section className="py-32 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 px-5 py-2 bg-amber-50 rounded-full mb-8">
              <Crown className="w-5 h-5 text-amber-600" />
              <span className="text-sm font-bold text-amber-600">Success Stories</span>
            </div>
            <h2 className="text-5xl sm:text-6xl font-black text-gray-900 mb-6">What Founders Are Saying</h2>
            <p className="text-xl text-gray-800 font-semibold">Join 500+ founders excited about our launch</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: 'Sarah Chen',
                role: 'Solo Founder',
                quote: 'Can\'t wait to use Biggmate! The pitch-first approach is exactly what I need. Finally, a platform built for serious entrepreneurs looking for real alignment.',
                result: 'On Waitlist',
                achievement: 'Early Adopter',
                rating: 5,
                gradient: 'from-amber-500 to-orange-500'
              },
              {
                name: 'Michael Rodriguez',
                role: 'Aspiring Entrepreneur',
                quote: 'The AI matching concept is brilliant. Instead of endless networking, I can find someone with complementary skills who shares my vision. Exactly what founders need.',
                result: 'Excited to Launch',
                achievement: 'Waitlist Member',
                rating: 5,
                gradient: 'from-orange-500 to-amber-600'
              },
              {
                name: 'Emma Thompson',
                role: 'Tech Founder',
                quote: 'This is a game changer for solo founders. The comprehensive toolkit approach—matching, equity framework, and project management—is exactly what\'s been missing.',
                result: 'Ready to Build',
                achievement: 'Community Member',
                rating: 5,
                gradient: 'from-yellow-500 to-amber-500'
              }
            ].map((testimonial, index) => (
              <div key={index} className="group relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all border border-gray-100">
                <div className={`absolute inset-0 bg-gradient-to-br ${testimonial.gradient} opacity-0 group-hover:opacity-5 rounded-3xl transition-opacity`}></div>
                <div className="relative">
                <div className="flex items-center gap-1 mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <Quote className="w-10 h-10 text-gray-200 mb-4" />
                <p className="text-gray-800 mb-8 leading-relaxed text-lg font-semibold">"{testimonial.quote}"</p>
                <div className="flex items-center gap-4 mb-6">
                    <div className={`w-14 h-14 bg-gradient-to-br ${testimonial.gradient} rounded-2xl flex items-center justify-center shadow-lg`}>
                      <span className="text-white text-xl font-black">{testimonial.name.charAt(0)}</span>
                  </div>
                  <div>
                      <div className="font-bold text-gray-900 text-lg">{testimonial.name}</div>
                      <div className="text-sm text-gray-500 font-medium">{testimonial.role}</div>
                    </div>
                  </div>
                  <div className="flex gap-2 pt-6 border-t border-gray-100">
                    <div className="flex-1 px-3 py-2 bg-green-50 rounded-xl">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-amber-600" />
                        <span className="text-xs font-bold text-amber-900">{testimonial.result}</span>
                      </div>
                    </div>
                    <div className="flex-1 px-3 py-2 bg-orange-50 rounded-xl">
                      <div className="flex items-center gap-2">
                        <Award className="w-4 h-4 text-orange-600" />
                        <span className="text-xs font-bold text-orange-900">{testimonial.achievement}</span>
                  </div>
                </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-500 via-orange-500 to-yellow-500"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjEiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-20"></div>
        
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-5 py-2 bg-white/20 backdrop-blur-sm rounded-full mb-8 border border-white/30">
            <Rocket className="w-5 h-5 text-white" />
            <span className="text-sm font-bold text-white">Start Building Today</span>
          </div>
          <h2 className="text-5xl sm:text-6xl lg:text-7xl font-black text-white mb-8 leading-tight">
            Ready to Find Your<br />Perfect Cofounder?
          </h2>
          <p className="text-2xl text-white mb-12 max-w-3xl mx-auto font-semibold">
            Join 500+ founders on the waitlist building the next generation of successful startups
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button
              onClick={handleFindCofounder}
              className="group px-12 py-6 bg-white text-gray-900 rounded-2xl hover:scale-105 hover:shadow-2xl transition-all font-black text-xl flex items-center justify-center gap-3"
            >
              <span>Start Your Journey</span>
              <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
            </button>
            <button
              onClick={handleLearnMore}
              className="px-12 py-6 bg-white/10 backdrop-blur-sm text-white rounded-2xl hover:bg-white/20 transition-all font-bold text-xl border-2 border-white/30 hover:border-white/50"
            >
              Explore Platform
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
