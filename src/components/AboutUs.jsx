import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MarketingNavbar from './MarketingNavbar';
import MarketingFooter from './MarketingFooter';
import {
  ArrowRight,
  Users,
  Target,
  Heart,
  TrendingUp,
  Award,
  Lightbulb,
  Rocket,
  Sparkles,
  Zap,
  Shield,
  Crown,
  TrendingDown,
  Brain,
  Globe2,
  CheckCircle,
  BarChart3,
  Linkedin,
  MessageCircle,
  Zap as Lightning,
  Smile,
  Flame,
  Eye
} from 'lucide-react';

const AboutUs = () => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleStartJourney = () => {
    navigate('/auth?mode=signup');
  };

  const handleFindMyCofounder = () => {
    navigate('/auth?mode=signin');
  };

  const values = [
    {
      icon: Lightning,
      title: 'Speed & Energy',
      description: 'We move fast and execute with intensity. Every day matters in the startup world, and we bring relentless energy to everything we build.',
      gradient: 'from-[#5170ff] to-[#4158d4]'
    },
    {
      icon: Smile,
      title: 'Sense of Humor',
      description: 'We don\'t take ourselves too seriously. Building startups is hard—we bring levity, authenticity, and genuine connection to our team and community.',
      gradient: 'from-[#7086ff] to-[#5170ff]'
    },
    {
      icon: Flame,
      title: 'Domination & Leadership',
      description: 'We\'re ambitious and uncompromising about our goals. We lead by example and inspire others to reach for the extraordinary.',
      gradient: 'from-[#5170ff] to-[#7086ff]'
    },
    {
      icon: Sparkles,
      title: 'Innovation',
      description: 'Constantly pushing boundaries and challenging the status quo. We innovate not just in product but in how we think about problems.',
      gradient: 'from-[#4158d4] to-[#5170ff]'
    },
    {
      icon: Eye,
      title: 'User-Obsession',
      description: 'Everything starts and ends with our users. We obsess over their needs, feedback, and success. Their wins are our wins.',
      gradient: 'from-[#5170ff]/90 to-[#7086ff]/90'
    }
  ];

  const team = [
    {
      name: 'Meet Patel',
      role: 'Founder & CEO',
      bio: 'Serial entrepreneur with 8+ years building startups. Focused on creating ventures that solve real problems and scale globally.',
      gradient: 'from-[#5170ff] to-[#4158d4]',
      achievements: ['Business', 'Product', 'Growth'],
      linkedin: 'https://www.linkedin.com/in/themeetpatel/'
    },
    {
      name: 'Dipen Patel',
      role: 'CTO',
      bio: 'Tech visionary and infrastructure specialist with expertise in building scalable systems used by thousands of users.',
      gradient: 'from-[#7086ff] to-[#5170ff]',
      achievements: ['Tech', 'Infrastructure', 'Engineering'],
      linkedin: 'https://www.linkedin.com/in/dipenpatel2410/'
    }
  ];

  const stats = [
    { number: '500+', label: 'Founders on Waitlist', icon: Users, gradient: 'from-[#5170ff] to-[#4158d4]' },
    { number: '2026', label: 'Launching Soon', icon: Rocket, gradient: 'from-[#7086ff] to-[#5170ff]' },
    { number: '6', label: 'Core Features', icon: Sparkles, gradient: 'from-[#5170ff] to-[#5170ff]/60' },
    { number: '24/7', label: 'Platform Access', icon: Zap, gradient: 'from-[#5170ff]/80 to-[#4158d4]' }
  ];

  const whyBuilding = [
    {
      title: 'The Cofounder Problem',
      description: '65% of startups fail due to cofounder conflicts. Finding the right partner is the most critical decision for any entrepreneur.',
      gradient: 'from-[#5170ff] to-[#4158d4]',
      icon: TrendingDown
    },
    {
      title: 'Traditional Methods Fail',
      description: 'Networking events and online forums focus on meeting people, not ensuring compatibility and alignment from day one.',
      gradient: 'from-[#7086ff] to-[#5170ff]',
      icon: Zap
    },
    {
      title: 'AI-Powered Matching',
      description: 'We use advanced algorithms to match entrepreneurs based on skills, vision, work style, and compatibility—not just proximity.',
      gradient: 'from-[#5170ff]/80 to-[#5170ff]/60',
      icon: Brain
    },
    {
      title: 'Complete Toolkit',
      description: 'Beyond matching, we provide everything needed to build together: equity frameworks, project tools, and launch resources.',
      gradient: 'from-[#5170ff] to-[#4158d4]/80',
      icon: Rocket
    }
  ];

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
          <div className="max-w-4xl">
            <div className={`space-y-10 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
              <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/90 backdrop-blur-sm rounded-full shadow-lg border border-[#5170ff]/30">
                <Sparkles className="w-5 h-5 text-[#5170ff]" />
                <span className="text-sm font-bold text-[#5170ff]">Our Story</span>
              </div>
              
              <div className="space-y-6">
                <h1 className="text-6xl sm:text-7xl lg:text-8xl font-black leading-tight">
                  <span className="bg-gradient-to-r from-gray-900 via-slate-800 to-gray-900 bg-clip-text text-transparent">About</span>
                  <span className="block bg-gradient-to-r from-[#5170ff] via-[#5170ff] to-[#7086ff] bg-clip-text text-transparent">Biggmate</span>
                </h1>
                <p className="text-2xl sm:text-3xl text-gray-800 leading-relaxed font-semibold">
                  A small team with a <span className="font-black text-[#5170ff]">big mission:</span><br />
                  connecting entrepreneurs and building successful startups
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <button
                  onClick={handleStartJourney}
                  className="group relative px-10 py-5 bg-gradient-to-r from-[#5170ff] to-[#5170ff] text-white rounded-2xl hover:shadow-2xl hover:scale-105 transition-all font-bold text-lg flex items-center justify-center gap-3 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-[#5170ff] to-[#4158d4] opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <span className="relative">Start Your Journey</span>
                  <ArrowRight className="relative w-6 h-6 group-hover:translate-x-2 transition-transform" />
                </button>
                <button 
                  onClick={handleFindMyCofounder}
                  className="group px-10 py-4 bg-white text-gray-900 rounded-2xl hover:shadow-xl transition-all font-bold text-lg border-2 border-gray-200 hover:border-[#5170ff]/40 flex items-center justify-center"
                >
                  <span>Find My Cofounder</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative py-32 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-5 py-2 bg-[#5170ff]/10 rounded-full mb-8">
                <Lightbulb className="w-5 h-5 text-[#5170ff]" />
                <span className="text-sm font-bold text-[#5170ff]">Genesis</span>
              </div>
              <h2 className="text-5xl sm:text-6xl font-black text-gray-900 mb-8 leading-tight">Our Story</h2>
              <div className="space-y-6 text-xl text-gray-800 leading-relaxed">
                <p className="font-semibold text-gray-900">
                  Biggmate was founded in 2024 by entrepreneurs who <span className="text-[#5170ff] font-bold">experienced firsthand</span> the challenges of finding the right cofounder.
                </p>
                <p className="text-gray-800">
                  After struggling through countless networking events, online forums, and failed partnerships, Meet and Drashty realized there had to be a better way—one that starts with understanding, not just networking.
                </p>
                <p className="text-gray-800">
                  Today, we're a <span className="font-bold text-gray-900">passionate team</span> dedicated to helping entrepreneurs find their perfect match. We're not just building a platform—we're building a community where great startups are born from great partnerships.
                </p>
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-[#7086ff] via-[#5170ff] to-[#5170ff] rounded-[3rem] rotate-3 opacity-20 blur-2xl"></div>
              <div className="relative bg-gradient-to-br from-slate-900 via-gray-900 to-slate-900 rounded-[3rem] p-10 shadow-2xl">
                <div className="grid grid-cols-2 gap-6">
                {stats.map((stat, index) => {
                  const Icon = stat.icon;
                  return (
                      <div key={index} className="bg-white/10 backdrop-blur-sm rounded-3xl p-6 border border-white/20 hover:bg-white/15 transition-all text-center">
                        <div className={`inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br ${stat.gradient} rounded-2xl mb-4 shadow-lg`}>
                        <Icon className="w-7 h-7 text-white" />
                      </div>
                        <div className="text-3xl font-black text-white mb-2">{stat.number}</div>
                        <div className="text-xs font-bold text-white/90 uppercase tracking-wide">{stat.label}</div>
                    </div>
                  );
                })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-32 bg-gray-50" id="mission">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 px-5 py-2 bg-white rounded-full mb-8 shadow-sm border border-[#5170ff]/20">
              <Target className="w-5 h-5 text-[#5170ff]" />
              <span className="text-sm font-bold text-[#5170ff]">Our North Star</span>
            </div>
            <h2 className="text-5xl sm:text-6xl font-black text-gray-900 mb-6">Mission & Vision</h2>
            <p className="text-xl text-gray-800 max-w-3xl mx-auto font-semibold">What drives us and where we're heading</p>
          </div>

          <div className="grid md:grid-cols-2 gap-10">
            <div className="group relative bg-white rounded-[3rem] p-12 shadow-xl hover:shadow-2xl transition-all border border-gray-100 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-[#5170ff] to-[#4158d4] opacity-0 group-hover:opacity-5 transition-opacity"></div>
              <div className="relative">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-[#5170ff] to-[#4158d4] rounded-3xl mb-8 shadow-lg group-hover:scale-110 transition-transform">
                  <Target className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-4xl font-black text-gray-900 mb-6">Our Mission</h3>
                <p className="text-xl text-gray-800 leading-relaxed font-semibold">
                  To <span className="text-[#5170ff] font-bold">empower entrepreneurs</span> by connecting them with the right cofounders, providing comprehensive tools for startup success, and building a thriving community of innovators who transform ideas into reality.
                </p>
              </div>
            </div>

            <div className="group relative bg-white rounded-[3rem] p-12 shadow-xl hover:shadow-2xl transition-all border border-gray-100 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-[#7086ff] to-[#5170ff] opacity-0 group-hover:opacity-5 transition-opacity"></div>
              <div className="relative">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-[#7086ff] to-[#5170ff] rounded-3xl mb-8 shadow-lg group-hover:scale-110 transition-transform">
                  <Lightbulb className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-4xl font-black text-gray-900 mb-6">Our Vision</h3>
                <p className="text-xl text-gray-800 leading-relaxed font-semibold">
                  To become the <span className="text-[#5170ff] font-bold">world's leading platform</span> for cofounder matching and startup building, where every entrepreneur can find their perfect match and every startup has the tools to succeed.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-5 py-2 bg-[#5170ff]/10 rounded-full mb-8">
              <Heart className="w-5 h-5 text-[#5170ff]" />
              <span className="text-sm font-bold text-[#5170ff]">Core Principles</span>
            </div>
            <h2 className="text-5xl sm:text-6xl font-black text-gray-900 mb-6">Our Values</h2>
            <p className="text-xl text-gray-800 max-w-3xl mx-auto font-semibold">Where we come from—the values our founders brought to this mission</p>
          </div>

          <div className="space-y-4">
            {values.map((value, index) => {
              const Icon = value.icon;
              const isEven = index % 2 === 0;
              return (
                <div key={index} className={`flex flex-col md:flex-row items-stretch gap-6 md:gap-8 ${isEven ? '' : 'md:flex-row-reverse'}`}>
                  {/* Icon Section */}
                  <div className="md:w-2/5">
                    <div className="relative group h-48 md:h-56">
                      <div className={`absolute -inset-0.5 bg-gradient-to-br ${value.gradient} rounded-3xl blur opacity-30 group-hover:opacity-100 transition duration-300`}></div>
                      <div className={`relative bg-gradient-to-br ${value.gradient} rounded-3xl h-full flex items-center justify-center shadow-xl group-hover:shadow-2xl transition-all`}>
                        <Icon className="w-20 h-20 md:w-24 md:h-24 text-white opacity-95" />
                      </div>
                    </div>
                  </div>

                  {/* Text Section */}
                  <div className="md:w-3/5 flex flex-col justify-center">
                    <div className="space-y-4">
                      <div className="flex items-center gap-4">
                        <div className={`h-1 w-12 bg-gradient-to-r ${value.gradient} rounded-full`}></div>
                        <h3 className="text-3xl md:text-4xl font-black text-gray-900">{value.title}</h3>
                      </div>
                      <p className="text-gray-700 leading-relaxed text-lg md:text-lg font-medium max-w-lg">{value.description}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom Statement */}
          <div className="mt-20 text-center">
            <div className="inline-block bg-gradient-to-r from-[#5170ff]/10 to-[#5170ff]/5 rounded-2xl p-8 border border-[#5170ff]/20 max-w-2xl">
              <p className="text-gray-800 font-semibold text-lg">These aren't just values on a wall—they're embedded in every decision we make and every feature we build.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-32 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 px-5 py-2 bg-white rounded-full mb-8 shadow-sm border border-[#5170ff]/20">
              <Brain className="w-5 h-5 text-[#5170ff]" />
              <span className="text-sm font-bold text-[#5170ff]">Our Approach</span>
            </div>
            <h2 className="text-5xl sm:text-6xl font-black text-gray-900 mb-6">Why We're Building This</h2>
            <p className="text-xl text-gray-800 max-w-3xl mx-auto font-semibold">The problem we're solving and how we're different</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {whyBuilding.map((item, index) => {
              const Icon = item.icon;
              return (
                <div key={index} className="group relative overflow-hidden">
                  <div className={`absolute -inset-1 bg-gradient-to-br ${item.gradient} rounded-2xl blur opacity-20 group-hover:opacity-60 transition duration-500`}></div>
                  <div className="relative bg-white rounded-2xl overflow-hidden border border-gray-100 group-hover:border-[#5170ff]/30 transition-all hover:shadow-2xl h-full flex flex-col">
                    
                    {/* Icon Header with gradient */}
                    <div className={`bg-gradient-to-br ${item.gradient} p-8 flex items-center justify-center relative overflow-hidden`}>
                      <div className="absolute inset-0 opacity-10">
                        <div className="absolute -right-8 -top-8 w-32 h-32 bg-white rounded-full"></div>
                      </div>
                      <Icon className="w-14 h-14 text-white relative z-10" />
                    </div>

                    {/* Content */}
                    <div className="p-8 flex flex-col flex-grow">
                      <div className="flex items-center gap-3 mb-4">
                        <div className={`inline-flex items-center justify-center w-10 h-10 bg-gradient-to-br ${item.gradient} rounded-xl text-white font-black text-sm flex-shrink-0 shadow-md`}>
                          {index + 1}
                        </div>
                        <h3 className="text-2xl md:text-xl font-black text-gray-900">{item.title}</h3>
                      </div>
                      <p className="text-gray-700 leading-relaxed font-medium text-base flex-grow">{item.description}</p>
                    </div>

                    {/* Bottom accent line */}
                    <div className={`h-1 bg-gradient-to-r ${item.gradient} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`}></div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom CTA */}
          <div className="mt-20 text-center">
            <div className="inline-block bg-gradient-to-r from-[#5170ff]/10 to-[#5170ff]/5 rounded-2xl p-8 border border-[#5170ff]/20 hover:border-[#5170ff]/40 transition-all hover:shadow-lg">
              <p className="text-gray-800 font-semibold mb-6 text-lg">Ready to be part of this mission?</p>
              <button
                onClick={handleStartJourney}
                className="group relative px-10 py-4 bg-gradient-to-r from-[#5170ff] to-[#4158d4] text-white rounded-xl hover:shadow-lg transition-all font-bold flex items-center gap-2 mx-auto hover:scale-105"
              >
                Join the Movement
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 px-5 py-2 bg-[#5170ff]/10 rounded-full mb-8">
              <Crown className="w-5 h-5 text-[#5170ff]" />
              <span className="text-sm font-bold text-[#5170ff]">Leadership</span>
            </div>
            <h2 className="text-5xl sm:text-6xl font-black text-gray-900 mb-6">Meet Our Team</h2>
            <p className="text-xl text-gray-800 max-w-3xl mx-auto font-semibold">The passionate people building the future of cofounder matching</p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            {team.map((member, index) => (
              <div key={index} className="group relative bg-gradient-to-br from-white to-gray-50 rounded-[3rem] p-12 border-2 border-gray-100 hover:border-transparent hover:shadow-2xl transition-all text-center">
                <div className={`absolute inset-0 bg-gradient-to-br ${member.gradient} opacity-0 group-hover:opacity-5 rounded-[3rem] transition-opacity`}></div>
                <div className="relative">
                  <div className={`inline-flex items-center justify-center w-32 h-32 bg-gradient-to-br ${member.gradient} rounded-[2rem] mb-8 shadow-xl group-hover:scale-110 transition-transform`}>
                    <span className="text-white text-5xl font-black">{member.name.charAt(0)}</span>
                  </div>
                  <h3 className="text-3xl font-black text-gray-900 mb-2">{member.name}</h3>
                  <p className={`text-xl font-bold bg-gradient-to-r ${member.gradient} bg-clip-text text-transparent mb-6`}>{member.role}</p>
                  <p className="text-lg text-gray-800 leading-relaxed mb-8 font-medium">{member.bio}</p>
                  <div className="flex flex-wrap gap-2 justify-center mb-8">
                    {member.achievements.map((achievement, idx) => (
                      <div key={idx} className="px-4 py-2 bg-white rounded-full border border-gray-200 text-sm font-bold text-gray-800 shadow-sm">
                        {achievement}
                      </div>
                    ))}
                  </div>
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#0A66C2] to-[#084298] text-white rounded-full font-bold hover:shadow-lg transition-all hover:scale-105"
                  >
                    <Linkedin className="w-5 h-5" />
                    Follow on LinkedIn
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#5170ff]/10 via-[#5170ff]/10 to-[#5170ff]/10"></div>
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#5170ff]/40 rounded-full filter blur-3xl opacity-20 animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#5170ff]/40 rounded-full filter blur-3xl opacity-20 animate-pulse" style={{animationDelay: '1s'}}></div>
        </div>
        
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/90 backdrop-blur-sm rounded-full mb-8 border border-[#5170ff]/30 shadow-lg">
            <Sparkles className="w-5 h-5 text-[#5170ff]" />
            <span className="text-sm font-bold text-[#5170ff]">Join Us</span>
          </div>
          <h2 className="text-5xl sm:text-6xl lg:text-7xl font-black text-gray-900 mb-8 leading-tight">
            Join Our Mission
          </h2>
          <p className="text-2xl text-gray-800 mb-12 max-w-3xl mx-auto font-medium">
            Be part of a community that's changing how startups are built and launched
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button
              onClick={handleStartJourney}
              className="group relative px-12 py-6 bg-gradient-to-r from-[#5170ff] to-[#5170ff] text-white rounded-2xl hover:scale-105 hover:shadow-2xl transition-all font-black text-xl flex items-center justify-center gap-3 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[#5170ff] to-[#4158d4] opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <span className="relative">Start Your Journey</span>
              <ArrowRight className="relative w-6 h-6 group-hover:translate-x-2 transition-transform" />
            </button>
            <button
              onClick={handleFindMyCofounder}
              className="px-12 py-5 bg-white text-gray-900 rounded-2xl hover:shadow-xl transition-all font-bold text-xl border-2 border-gray-200 hover:border-[#5170ff]/40"
            >
              Find My Cofounder
            </button>
          </div>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-5 py-2 bg-[#25D366]/15 rounded-full mb-8 border border-[#25D366]/30">
            <MessageCircle className="w-5 h-5 text-[#25D366]" />
            <span className="text-sm font-bold text-[#1e9b4c]">WhatsApp Community</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-black text-gray-900 mb-4">Join Our Community</h2>
          <p className="text-xl text-gray-800 mb-8 font-semibold max-w-2xl mx-auto">
            Connect with founders in our WhatsApp community. Share progress, swap feedback, and get fast answers from people building alongside you.
          </p>
          <a
            href="https://wa.me/919824341414?text=I%20want%20to%20join%20the%20Biggmate%20founder%20community%20-%20can%20you%20share%20details%3F"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 bg-[#25D366] text-white font-bold rounded-2xl shadow-lg hover:shadow-xl hover:scale-105 transition-transform"
          >
            Join the WhatsApp Community
            <MessageCircle className="w-6 h-6" />
          </a>
          <p className="text-sm text-gray-600 mt-4">We reply with the invite link and next steps. Number: +91 98243 41414</p>
        </div>
      </section>

      <MarketingFooter />
    </div>
  );
};

export default AboutUs;
