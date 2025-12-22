import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Brain, 
  Home, 
  Sparkles, 
  Send, 
  Calendar, 
  User, 
  Bell, 
  Settings, 
  HelpCircle, 
  LogOut, 
  ChevronDown, 
  ChevronRight,
  Menu, 
  X,
  Plus,
  Heart,
  MessageCircle,
  Zap,
  Crown,
  Star,
  TrendingUp,
  Globe,
  Moon,
  Sun,
  Info,
  Clock,
  CheckCircle,
  Crown as CrownIcon,
  Rocket,
  Target,
  Briefcase,
  Users,
  DollarSign
} from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../store/slices/authSlice';
import { persistor } from '../store';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const userMenuRef = useRef(null);
  const notificationRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  // Sprint user navigation
  const sprintNavItems = [
    { 
      path: '/home', 
      label: 'Sprint Dashboard', 
      icon: Zap, 
      description: 'Track Your Idea Sprint Progress',
      isHighlighted: true
    },
    { 
      path: '/sprinto', 
      label: 'Build MVP', 
      icon: Rocket, 
      description: 'Build Your Product'
    },
    { 
      path: '/my-pitches', 
      label: 'My Idea', 
      icon: Target, 
      description: 'Manage Your Startup Idea'
    },
    { 
      path: '/launch', 
      label: 'Launchpad', 
      icon: CheckCircle, 
      description: 'Launch Your MVP'
    },
    { 
      path: '/ai-cofounder', 
      label: 'AI Co-Founder', 
      icon: Brain, 
      description: 'Your End-to-End AI Partner',
      isHighlighted: true
    }
  ];

  // Default navigation
  const defaultNavItems = [
    { 
      path: '/home', 
      label: 'Home', 
      icon: Home, 
      description: 'Discover Pitches & Find Cofounders',
      isHighlighted: true
    },
    { 
      path: '/my-pitches', 
      label: 'My Pitches', 
      icon: MessageCircle, 
      description: 'Manage Your Pitches'
    }, 
    { 
      path: '/sprinto', 
      label: 'Sprinting', 
      icon: Rocket, 
      description: 'Build Your Startup'
    },
    { 
      path: '/launch', 
      label: 'Launchpad', 
      icon: Target, 
      description: 'Prepare for Launch'
    },
    { 
      path: '/ai-cofounder', 
      label: 'AI Co-Founder', 
      icon: Brain, 
      description: 'Your End-to-End AI Partner',
      isHighlighted: true
    }
  ];

  // Skills user navigation
  const skillsNavItems = [
    { 
      path: '/home', 
      label: 'Skills Dashboard', 
      icon: Sparkles, 
      description: 'Manage Your Services',
      isHighlighted: true
    },
    { 
      path: '/skills/showcase', 
      label: 'Portfolio', 
      icon: Star, 
      description: 'Your Skills Showcase'
    },
    { 
      path: '/skills/projects', 
      label: 'Projects', 
      icon: Briefcase, 
      description: 'Active Projects'
    },
    { 
      path: '/skills/clients', 
      label: 'Clients', 
      icon: Users, 
      description: 'Manage Clients'
    },
    { 
      path: '/ai-cofounder', 
      label: 'AI Co-Founder', 
      icon: Brain, 
      description: 'Your End-to-End AI Partner',
      isHighlighted: true
    }
  ];

  // Select nav items based on user type
  const navItems = defaultNavItems;

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const notifications = [
    {
      id: 1,
      title: 'New Cofounder Match! 🎉',
      message: 'You matched with Alex Chen - Technical Co-founder with AI expertise',
      time: '2 minutes ago',
      type: 'match',
      isRead: false
    },
    {
      id: 2,
      title: 'Pitch-Back Received',
      message: 'Sarah Johnson sent you a pitch-back for your fintech startup',
      time: '1 hour ago',
      type: 'message',
      isRead: false
    },
    {
      id: 3,
      title: 'Pitch Response',
      message: 'Your startup pitch got 5 positive responses!',
      time: '3 hours ago',
      type: 'pitch',
      isRead: true
    },
    {
      id: 4,
      title: 'Project Update',
      message: 'MVP development milestone completed - 75% done',
      time: '4 hours ago',
      type: 'event',
      isRead: true
    },
    {
      id: 5,
      title: 'Profile View',
      message: '3 entrepreneurs viewed your profile today',
      time: '6 hours ago',
      type: 'profile',
      isRead: true
    }
  ];

  const handleLogout = async () => {
    try {
      console.log('Navbar - starting logout');
      await dispatch(logoutUser()).unwrap();
      console.log('Navbar - logout successful, purging persisted state');
      await persistor.purge();
      console.log('Navbar - persisted state purged, redirecting to /');
      navigate('/');
    } catch (error) {
      console.error('Navbar - logout failed:', error);
      // Even if logout fails, purge and redirect to home
      await persistor.purge();
      navigate('/');
    }
  };

  // Close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setIsUserMenuOpen(false);
      }
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <>
      {/* Main Navbar */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? 'bg-white/98 backdrop-blur-xl shadow-[0_1px_3px_rgba(0,0,0,0.08)] border-b border-gray-200/80' 
          : 'bg-white/95 backdrop-blur-lg border-b border-gray-100/60'
      }`}>
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
          {/* Logo */}
            <Link to="/home" className="flex items-center flex-shrink-0 group">
              <img
                src="/BiggMate-logo.png"
                alt="BiggMate"
                className="h-12 w-auto object-contain md:h-14"
              />
            </Link>

          {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-0.5">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`relative px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 group ${
                    isActive 
                      ? 'text-gray-900' 
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <span className="relative z-10">{item.label}</span>
                  {isActive ? (
                    <>
                      <div className="absolute inset-0 bg-gradient-to-br from-gray-100 via-gray-50 to-gray-100 rounded-xl shadow-[inset_0_1px_2px_rgba(0,0,0,0.05)]"></div>
                      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-gradient-to-r from-transparent via-gray-900 to-transparent rounded-full"></div>
                    </>
                  ) : (
                    <div className="absolute inset-0 bg-gray-50/0 rounded-xl group-hover:bg-gray-50/60 transition-all duration-300"></div>
                  )}
                </Link>
              );
            })}
          </div>

          {/* Desktop Actions */}
            <div className="hidden lg:flex items-center gap-2">
            {/* Messages */}
            <Link
              to="/messages"
              className="relative p-2.5 text-gray-600 hover:text-gray-900 hover:bg-gray-100/90 rounded-xl transition-all duration-300 hover:scale-105 group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-gray-900/5 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <MessageCircle className="relative w-5 h-5 transition-all duration-300 group-hover:scale-110" />
            </Link>
            
            {/* Notifications */}
            <div className="relative" ref={notificationRef}>
              <button 
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2.5 text-gray-600 hover:text-gray-900 hover:bg-gray-100/90 rounded-xl transition-all duration-300 hover:scale-105 group"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-gray-900/5 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <Bell className="relative w-5 h-5 transition-all duration-300 group-hover:scale-110 group-hover:rotate-12" />
                {notifications.filter(n => !n.isRead).length > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow-[0_2px_8px_rgba(0,0,0,0.2)] ring-2 ring-white animate-pulse">
                    {notifications.filter(n => !n.isRead).length}
                  </span>
                )}
              </button>
              
              {showNotifications && (
                <div className="absolute right-0 top-full mt-3 w-[420px] bg-white/98 backdrop-blur-2xl rounded-2xl shadow-[0_20px_60px_-12px_rgba(0,0,0,0.25)] border border-gray-200/80 z-50 overflow-hidden">
                  <div className="p-5 border-b border-gray-100/80 bg-gradient-to-br from-gray-50/80 via-white to-gray-50/50">
                    <div className="flex items-center justify-between">
                      <h3 className="font-bold text-gray-900 text-lg tracking-tight">Notifications</h3>
                      <span className="px-3 py-1.5 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white text-xs font-bold rounded-full shadow-[0_2px_8px_rgba(0,0,0,0.15)]">
                        {notifications.filter(n => !n.isRead).length} new
                      </span>
                    </div>
                  </div>
                  <div className="max-h-96 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-transparent">
                    {notifications.map((notification) => (
                      <div key={notification.id} className={`p-4 hover:bg-gradient-to-r hover:from-gray-50/90 hover:via-gray-50/50 hover:to-transparent border-b border-gray-100/60 last:border-b-0 transition-all duration-200 cursor-pointer group ${!notification.isRead ? 'bg-gradient-to-r from-gray-50/40 via-gray-50/20 to-transparent' : ''}`}>
                        <div className="flex items-start gap-3">
                          {!notification.isRead && (
                            <div className="w-2.5 h-2.5 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-full flex-shrink-0 mt-1.5 shadow-sm ring-1 ring-gray-900/20"></div>
                          )}
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-bold text-gray-900 leading-tight group-hover:text-gray-800 transition-colors">{notification.title}</p>
                            <p className="text-sm text-gray-600 mt-1 leading-relaxed">{notification.message}</p>
                            <p className="text-xs text-gray-400 mt-2 flex items-center gap-1.5">
                              <Clock className="w-3 h-3 opacity-60" />
                              {notification.time}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="p-4 border-t border-gray-100/80 bg-gradient-to-br from-gray-50/50 to-transparent">
                    <button className="w-full text-center text-sm font-bold text-gray-700 hover:text-gray-900 transition-colors py-2.5 rounded-xl hover:bg-gray-100/60 transition-all duration-200">
                      View All Notifications
                    </button>
                  </div>
                </div>
              )}
            </div>


            {/* User Menu */}
            <div className="relative" ref={userMenuRef}>
              <button 
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center gap-2.5 p-1.5 pr-3 text-gray-700 hover:bg-gray-100/90 rounded-xl transition-all duration-300 hover:scale-105 group"
              >
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-900/10 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <img
                    src={user?.profilePicture || `https://ui-avatars.com/api/?name=${user?.firstName}+${user?.lastName}&background=000000&color=fff&size=36&rounded=true`}
                    alt={`${user?.firstName} ${user?.lastName}`}
                    className="relative w-9 h-9 rounded-xl object-cover ring-2 ring-gray-200/80 group-hover:ring-gray-300 transition-all shadow-[0_2px_8px_rgba(0,0,0,0.08)]"
                  />
                  <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-gradient-to-br from-green-500 to-green-600 rounded-full border-2 border-white shadow-[0_2px_4px_rgba(0,0,0,0.1)] ring-1 ring-green-500/20"></div>
                </div>
                <ChevronDown className={`w-4 h-4 text-gray-500 transition-all duration-300 ${isUserMenuOpen ? 'rotate-180 text-gray-700' : ''}`} />
              </button>
              
              {isUserMenuOpen && (
                <div className="absolute right-0 top-full mt-3 w-80 bg-white rounded-2xl shadow-[0_20px_60px_-12px_rgba(0,0,0,0.25)] border border-gray-200/60 z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                  {/* User Info Header */}
                  <div className="p-6 border-b border-gray-100 bg-gradient-to-br from-gray-50/50 via-white to-white">
                    <div className="flex items-center gap-4">
                      <div className="relative flex-shrink-0">
                        <div className="absolute inset-0 bg-gradient-to-br from-gray-900/5 to-transparent rounded-2xl"></div>
                        <img
                          src={user?.profilePicture || `https://ui-avatars.com/api/?name=${user?.firstName}+${user?.lastName}&background=000000&color=fff&size=48&rounded=true`}
                          alt={`${user?.firstName} ${user?.lastName}`}
                          className="relative w-14 h-14 rounded-2xl object-cover ring-2 ring-gray-200/60 shadow-[0_4px_12px_rgba(0,0,0,0.1)]"
                        />
                        <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-gradient-to-br from-green-500 to-green-600 rounded-full border-[3px] border-white shadow-[0_2px_8px_rgba(34,197,94,0.3)] ring-1 ring-green-500/30"></div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-bold text-gray-900 text-base truncate leading-tight">
                          {user?.firstName || 'John'} {user?.lastName || 'Doe'}
                        </div>
                        <div className="text-sm text-gray-500 truncate mt-1">@{user?.username || 'johndoe123'}</div>
                        <div className="flex items-center gap-1.5 mt-2">
                          <div className="px-2 py-0.5 bg-gray-100 rounded-md">
                            <span className="text-xs font-semibold text-gray-700">Pro</span>
                          </div>
                          <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                          <span className="text-xs text-gray-500">Online</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Menu Items */}
                  <div className="p-2">
                    <Link 
                      to="/profile" 
                      className="flex items-center gap-4 px-4 py-3.5 text-sm font-semibold text-gray-700 hover:bg-gray-50 rounded-xl transition-all duration-200 group"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      <div className="p-2.5 bg-gray-100 rounded-xl group-hover:bg-gray-200 transition-all duration-200 group-hover:scale-105 shadow-sm">
                        <User className="w-4 h-4 text-gray-700" />
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold text-gray-900">Profile</div>
                        <div className="text-xs text-gray-500 mt-0.5">View and edit your profile</div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Link>
                    
                    <Link 
                      to="/my-pitches" 
                      className="flex items-center gap-4 px-4 py-3.5 text-sm font-semibold text-gray-700 hover:bg-gray-50 rounded-xl transition-all duration-200 group mt-1"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      <div className="p-2.5 bg-gray-100 rounded-xl group-hover:bg-gray-200 transition-all duration-200 group-hover:scale-105 shadow-sm">
                        <Rocket className="w-4 h-4 text-gray-700" />
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold text-gray-900">My Startup</div>
                        <div className="text-xs text-gray-500 mt-0.5">View your matched startup</div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Link>
                    
                    <Link 
                      to="/settings" 
                      className="flex items-center gap-4 px-4 py-3.5 text-sm font-semibold text-gray-700 hover:bg-gray-50 rounded-xl transition-all duration-200 group mt-1"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      <div className="p-2.5 bg-gray-100 rounded-xl group-hover:bg-gray-200 transition-all duration-200 group-hover:scale-105 shadow-sm">
                        <Settings className="w-4 h-4 text-gray-700" />
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold text-gray-900">Settings</div>
                        <div className="text-xs text-gray-500 mt-0.5">Manage your preferences</div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Link>
                    <Link 
                      to="/crm" 
                      className="flex items-center gap-4 px-4 py-3.5 text-sm font-semibold text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-cyan-50 rounded-xl transition-all duration-200 group mt-1"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      <div className="p-2.5 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-xl group-hover:from-blue-200 group-hover:to-cyan-200 transition-all duration-200 group-hover:scale-105 shadow-sm">
                        <Users className="w-4 h-4 text-blue-700" />
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold text-gray-900">Founders' CRM</div>
                        <div className="text-xs text-gray-500 mt-0.5">Track advisors, investors & stakeholders</div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Link>
                    
                    <div className="my-2 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>
                    
                    <button 
                      onClick={handleLogout}
                      className="flex items-center gap-4 px-4 py-3.5 text-sm font-semibold text-red-600 hover:bg-red-50 rounded-xl transition-all duration-200 w-full text-left group"
                    >
                      <div className="p-2.5 bg-red-50 rounded-xl group-hover:bg-red-100 transition-all duration-200 group-hover:scale-105 shadow-sm">
                        <LogOut className="w-4 h-4 text-red-600" />
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold text-red-600">Logout</div>
                        <div className="text-xs text-red-500/70 mt-0.5">Sign out of your account</div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-red-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2.5 text-gray-600 hover:text-gray-900 hover:bg-gray-100/90 rounded-xl transition-all duration-300 hover:scale-105"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden bg-white/98 backdrop-blur-xl border-t border-gray-200/80 shadow-[0_-4px_20px_rgba(0,0,0,0.08)]">
            <div className="px-4 py-4 space-y-1">
              {navItems.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsMenuOpen(false)}
                    className={`block px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 ${
                      isActive 
                        ? 'text-gray-900 bg-gradient-to-r from-gray-100 via-gray-50 to-gray-100 shadow-[inset_0_1px_2px_rgba(0,0,0,0.05)]' 
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50/90'
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
              
              <div className="pt-4 mt-4 border-t border-gray-100">
                <div className="px-4 py-2.5 mb-3">
                  <div className="font-semibold text-gray-900 text-base">
                    {user?.firstName || 'John'} {user?.lastName || 'Doe'}
                  </div>
                  <div className="text-sm text-gray-500 mt-0.5">@{user?.username || 'johndoe123'}</div>
                </div>
                
                <Link 
                  to="/profile" 
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg transition-all duration-200 group"
                >
                  <User className="w-5 h-5 text-gray-600 group-hover:text-gray-900" />
                  <span className="font-medium">Profile</span>
                </Link>
                
                <Link 
                  to="/messages" 
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg transition-all duration-200 group"
                >
                  <MessageCircle className="w-5 h-5 text-gray-600 group-hover:text-gray-900" />
                  <span className="font-medium">Messages</span>
                </Link>
                
                <Link 
                  to="/my-pitches" 
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg transition-all duration-200 group"
                >
                  <Rocket className="w-5 h-5 text-gray-600 group-hover:text-gray-900" />
                  <span className="font-medium">My Startup</span>
                </Link>
                
                <Link 
                  to="/settings" 
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg transition-all duration-200 group"
                >
                  <Settings className="w-5 h-5 text-gray-600 group-hover:text-gray-900" />
                  <span className="font-medium">Settings</span>
                </Link>
                
                <div className="my-3 mx-4 h-px bg-gray-200"></div>
                
                <Link 
                  to="/crm" 
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 text-blue-700 hover:bg-blue-50 rounded-lg transition-all duration-200 group"
                >
                  <Users className="w-5 h-5 text-blue-600 group-hover:text-blue-700" />
                  <span className="font-medium">Founders' CRM</span>
                </Link>
                
                <div className="my-3 mx-4 h-px bg-gray-200"></div>
                
                <button 
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200 text-left group"
                >
                  <LogOut className="w-5 h-5 text-red-500 group-hover:text-red-600" />
                  <span className="font-medium">Logout</span>
                </button>
              </div>
            </div>
          </div>
        )}
    </nav>

    </>
  );
};

export default Navbar;
