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
  Brain
} from 'lucide-react';

const AboutUs = () => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleGetStarted = () => {
    navigate('/auth');
  };

  const values = [
    {
      icon: Target,
      title: 'Mission-Driven',
      description: 'We believe every great startup starts with the right cofounder. Our mission is to connect entrepreneurs and help them build successful ventures.',
      gradient: 'from-amber-500 to-orange-500'
    },
    {
      icon: Heart,
      title: 'Entrepreneur-First',
      description: 'Everything we build is designed with entrepreneurs in mind. We understand the challenges and provide solutions that actually work.',
      gradient: 'from-orange-500 to-amber-600'
    },
    {
      icon: TrendingUp,
      title: 'Innovation',
      description: 'We continuously innovate to provide the best tools and features for startup founders at every stage of their journey.',
      gradient: 'from-yellow-500 to-amber-500'
    },
    {
      icon: Users,
      title: 'Community',
      description: 'Building a strong community of verified entrepreneurs who support and learn from each other.',
      gradient: 'from-amber-600 to-orange-600'
    }
  ];

  const team = [
    {
      name: 'Meet Patel',
      role: 'Founder & CEO',
      bio: 'Serial entrepreneur with 8+ years building startups. Previously founded two successful companies.',
      gradient: 'from-amber-500 to-orange-500',
      achievements: ['8+ Years Experience', '2 Exits', 'Forbes 30 Under 30']
    },
    {
      name: 'Drashty Soni',
      role: 'CTO',
      bio: 'Product and Tech strategist with experience launching products used by thousands of users.',
      gradient: 'from-orange-500 to-amber-600',
      achievements: ['10K+ Users', 'Tech Innovator', 'Product Expert']
    }
  ];

  const stats = [
    { number: '500+', label: 'Founders on Waitlist', icon: Users, gradient: 'from-amber-500 to-orange-500' },
    { number: '2026', label: 'Launching Soon', icon: Rocket, gradient: 'from-orange-500 to-amber-600' },
    { number: '6', label: 'Core Features', icon: Sparkles, gradient: 'from-yellow-500 to-amber-500' },
    { number: '24/7', label: 'Platform Access', icon: Zap, gradient: 'from-amber-600 to-orange-600' }
  ];

  const whyBuilding = [
    {
      title: 'The Cofounder Problem',
      description: '65% of startups fail due to cofounder conflicts. Finding the right partner is the most critical decision for any entrepreneur.',
      gradient: 'from-amber-500 to-orange-500',
      icon: TrendingDown
    },
    {
      title: 'Traditional Methods Fail',
      description: 'Networking events and online forums focus on meeting people, not ensuring compatibility and alignment from day one.',
      gradient: 'from-orange-500 to-amber-600',
      icon: Zap
    },
    {
      title: 'AI-Powered Matching',
      description: 'We use advanced algorithms to match entrepreneurs based on skills, vision, work style, and compatibility—not just proximity.',
      gradient: 'from-yellow-500 to-amber-500',
      icon: Brain
    },
    {
      title: 'Complete Toolkit',
      description: 'Beyond matching, we provide everything needed to build together: equity frameworks, project tools, and launch resources.',
      gradient: 'from-amber-600 to-orange-600',
      icon: Rocket
    }
  ];

  return (
    <div className="min-h-screen bg-white overflow-hidden">
      <MarketingNavbar />
      
      <section className="relative pt-40 pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-500 via-orange-500 to-yellow-500"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjEiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-20"></div>
        <div className="absolute top-20 left-10 w-72 h-72 bg-white/10 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-white/10 rounded-full filter blur-3xl"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`max-w-4xl transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="inline-flex items-center gap-2 px-5 py-2 bg-white/20 backdrop-blur-sm rounded-full mb-8 border border-white/30">
              <Sparkles className="w-5 h-5 text-white" />
              <span className="text-sm font-bold text-white">Our Story</span>
            </div>
            <h1 className="text-6xl sm:text-7xl lg:text-8xl font-black text-white mb-8 leading-none">
              About Biggmate
            </h1>
            <p className="text-2xl sm:text-3xl text-white/90 leading-relaxed font-medium">
              A small team with a <span className="font-black text-white">big mission:</span><br />connecting entrepreneurs and building successful startups
            </p>
          </div>
        </div>
      </section>

      <section className="py-32 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-5 py-2 bg-amber-50 rounded-full mb-8">
                <Lightbulb className="w-5 h-5 text-amber-600" />
                <span className="text-sm font-bold text-amber-600">Genesis</span>
              </div>
              <h2 className="text-5xl sm:text-6xl font-black text-gray-900 mb-8 leading-tight">Our Story</h2>
              <div className="space-y-6 text-xl text-gray-800 leading-relaxed">
                <p className="font-semibold text-gray-900">
                  Biggmate was founded in 2024 by entrepreneurs who <span className="text-amber-600 font-bold">experienced firsthand</span> the challenges of finding the right cofounder.
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
              <div className="absolute inset-0 bg-gradient-to-br from-amber-400 via-orange-400 to-yellow-400 rounded-[3rem] rotate-3 opacity-20 blur-2xl"></div>
              <div className="relative bg-gradient-to-br from-slate-900 via-gray-900 to-slate-900 rounded-[3rem] p-10 shadow-2xl">
                <div className="grid grid-cols-2 gap-6">
                {stats.map((stat, index) => {
                  const Icon = stat.icon;
                  return (
                      <div key={index} className="bg-white/10 backdrop-blur-sm rounded-3xl p-6 border border-white/20 hover:bg-white/15 transition-all text-center">
                        <div className={`inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br ${stat.gradient} rounded-2xl mb-4 shadow-lg`}>
                        <Icon className="w-7 h-7 text-white" />
                      </div>
                        <div className="text-5xl font-black text-white mb-2">{stat.number}</div>
                        <div className="text-sm font-bold text-white/90 uppercase tracking-wide">{stat.label}</div>
                    </div>
                  );
                })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-32 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 px-5 py-2 bg-white rounded-full mb-8 shadow-sm border border-amber-200">
              <Target className="w-5 h-5 text-amber-600" />
              <span className="text-sm font-bold text-amber-600">Our North Star</span>
            </div>
            <h2 className="text-5xl sm:text-6xl font-black text-gray-900 mb-6">Mission & Vision</h2>
            <p className="text-xl text-gray-800 max-w-3xl mx-auto font-semibold">What drives us and where we're heading</p>
          </div>

          <div className="grid md:grid-cols-2 gap-10">
            <div className="group relative bg-white rounded-[3rem] p-12 shadow-xl hover:shadow-2xl transition-all border border-gray-100 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-cyan-500 opacity-0 group-hover:opacity-5 transition-opacity"></div>
              <div className="relative">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-3xl mb-8 shadow-lg group-hover:scale-110 transition-transform">
                  <Target className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-4xl font-black text-gray-900 mb-6">Our Mission</h3>
                <p className="text-xl text-gray-800 leading-relaxed font-semibold">
                  To <span className="text-amber-600 font-bold">empower entrepreneurs</span> by connecting them with the right cofounders, providing comprehensive tools for startup success, and building a thriving community of innovators who transform ideas into reality.
                </p>
              </div>
            </div>

            <div className="group relative bg-white rounded-[3rem] p-12 shadow-xl hover:shadow-2xl transition-all border border-gray-100 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-pink-500 opacity-0 group-hover:opacity-5 transition-opacity"></div>
              <div className="relative">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-3xl mb-8 shadow-lg group-hover:scale-110 transition-transform">
                  <Lightbulb className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-4xl font-black text-gray-900 mb-6">Our Vision</h3>
                <p className="text-xl text-gray-800 leading-relaxed font-semibold">
                  To become the <span className="text-orange-600 font-bold">world's leading platform</span> for cofounder matching and startup building, where every entrepreneur can find their perfect match and every startup has the tools to succeed.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 px-5 py-2 bg-amber-50 rounded-full mb-8">
              <Heart className="w-5 h-5 text-amber-600" />
              <span className="text-sm font-bold text-amber-600">Core Principles</span>
            </div>
            <h2 className="text-5xl sm:text-6xl font-black text-gray-900 mb-6">Our Values</h2>
            <p className="text-xl text-gray-800 max-w-3xl mx-auto font-semibold">The principles that guide everything we do</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <div key={index} className="group relative bg-gradient-to-br from-gray-50 to-white rounded-3xl p-10 border-2 border-gray-100 hover:border-transparent hover:shadow-2xl transition-all">
                  <div className={`absolute inset-0 bg-gradient-to-br ${value.gradient} opacity-0 group-hover:opacity-5 rounded-3xl transition-opacity`}></div>
                  <div className="relative">
                    <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br ${value.gradient} rounded-2xl mb-6 shadow-lg group-hover:scale-110 transition-transform`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-3xl font-black text-gray-900 mb-4">{value.title}</h3>
                    <p className="text-lg text-gray-800 leading-relaxed font-medium">{value.description}</p>
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
            <div className="inline-flex items-center gap-2 px-5 py-2 bg-white rounded-full mb-8 shadow-sm">
              <Lightbulb className="w-5 h-5 text-orange-600" />
              <span className="text-sm font-bold text-orange-600">Our Approach</span>
            </div>
            <h2 className="text-5xl sm:text-6xl font-black text-gray-900 mb-6">Why We're Building This</h2>
            <p className="text-xl text-gray-800 max-w-3xl mx-auto font-semibold">The problem we're solving and how we're different</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {whyBuilding.map((item, index) => {
              const Icon = item.icon;
              return (
                <div key={index} className="group relative">
                  <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-10 rounded-3xl transition-opacity`}></div>
                  <div className="relative bg-white rounded-3xl p-8 border-2 border-gray-100 hover:border-transparent hover:shadow-2xl transition-all h-full">
                    <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br ${item.gradient} rounded-2xl mb-6 shadow-lg group-hover:scale-110 transition-transform`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-black text-gray-900 mb-4">{item.title}</h3>
                    <p className="text-gray-800 leading-relaxed font-medium">{item.description}</p>
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
              <Crown className="w-5 h-5 text-amber-600" />
              <span className="text-sm font-bold text-amber-600">Leadership</span>
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
                  <div className="flex flex-wrap gap-2 justify-center">
                    {member.achievements.map((achievement, idx) => (
                      <div key={idx} className="px-4 py-2 bg-white rounded-full border border-gray-200 text-sm font-bold text-gray-800 shadow-sm">
                        {achievement}
                      </div>
                    ))}
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
            <Sparkles className="w-5 h-5 text-white" />
            <span className="text-sm font-bold text-white">Join Us</span>
          </div>
          <h2 className="text-5xl sm:text-6xl lg:text-7xl font-black text-white mb-8 leading-tight">
            Join Our Mission
          </h2>
          <p className="text-2xl text-white/90 mb-12 max-w-3xl mx-auto font-medium">
            Be part of a community that's changing how startups are built and launched
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button
              onClick={handleGetStarted}
              className="group px-12 py-6 bg-white text-gray-900 rounded-2xl hover:scale-105 hover:shadow-2xl transition-all font-black text-xl flex items-center justify-center gap-3"
            >
              <span>Get Started</span>
              <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
            </button>
            <button
              onClick={() => navigate('/product')}
              className="px-12 py-6 bg-white/10 backdrop-blur-sm text-white rounded-2xl hover:bg-white/20 transition-all font-bold text-xl border-2 border-white/30 hover:border-white/50"
            >
              Explore Platform
            </button>
          </div>
        </div>
      </section>

      <MarketingFooter />
    </div>
  );
};

export default AboutUs;
