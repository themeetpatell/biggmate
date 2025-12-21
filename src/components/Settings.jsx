import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { 
  User, 
  Bell, 
  Lock, 
  Eye, 
  Globe, 
  CreditCard, 
  Shield, 
  Mail, 
  Phone, 
  MapPin, 
  Link as LinkIcon, 
  Github, 
  Twitter, 
  Linkedin, 
  Save, 
  Camera, 
  Check, 
  X,
  ChevronRight,
  Moon,
  Sun,
  Smartphone,
  Monitor,
  Volume2,
  MessageCircle,
  Heart,
  TrendingUp,
  Calendar,
  Download,
  Trash2,
  AlertCircle,
  HelpCircle,
  ExternalLink,
  UserCheck
} from 'lucide-react';

const Settings = () => {
  const { user } = useSelector((state) => state.auth);
  const [activeTab, setActiveTab] = useState('account');
  const [isSaving, setIsSaving] = useState(false);
  const [savedMessage, setSavedMessage] = useState('');

  // Profile Settings State
  const [profileData, setProfileData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    phone: '',
    bio: '',
    location: '',
    website: '',
    twitter: '',
    linkedin: '',
    github: ''
  });

  // Notification Settings State
  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    pushNotifications: true,
    smsNotifications: false,
    matchAlerts: true,
    messageAlerts: true,
    pitchResponses: true,
    weeklyDigest: true,
    productUpdates: false,
    marketingEmails: false
  });

  // Privacy Settings State
  const [privacy, setPrivacy] = useState({
    profileVisibility: 'public',
    showEmail: false,
    showPhone: false,
    showLocation: true,
    allowMessages: true,
    allowPitches: true
  });

  // Appearance Settings State
  const [appearance, setAppearance] = useState({
    theme: 'light',
    fontSize: 'medium',
    language: 'en'
  });

  const handleSave = async (section) => {
    setIsSaving(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setSavedMessage(`${section} settings saved successfully!`);
    setIsSaving(false);
    setTimeout(() => setSavedMessage(''), 3000);
  };

  const tabs = [
    { id: 'account', label: 'Account & Login', icon: Lock },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'privacy', label: 'Privacy & Security', icon: Shield },
    { id: 'appearance', label: 'Appearance', icon: Monitor },
    { id: 'billing', label: 'Billing', icon: CreditCard }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Settings</h1>
          <p className="text-gray-600">Manage your account settings and preferences</p>
        </div>

        {/* Success Message */}
        {savedMessage && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl flex items-center gap-3 animate-in fade-in slide-in-from-top-2">
            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
              <Check className="w-5 h-5 text-white" />
            </div>
            <p className="text-sm font-semibold text-green-800">{savedMessage}</p>
          </div>
        )}

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar */}
          <div className="lg:w-64 flex-shrink-0">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-3">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                      isActive
                        ? 'bg-gray-900 text-white shadow-md'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-gray-500 group-hover:text-gray-700'}`} />
                    <span className="font-semibold text-sm">{tab.label}</span>
                    {isActive && <ChevronRight className="w-4 h-4 ml-auto" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Content Area */}
          <div className="flex-1">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 lg:p-8">
              
              {/* Account & Login Settings */}
              {activeTab === 'account' && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Account & Login Settings</h2>
                  
                  {/* Login Credentials */}
                  <div className="mb-8 pb-6 border-b border-gray-200">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Login Credentials</h3>
                    
                    <div className="space-y-4">
                      {/* Change Username */}
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Username</label>
                        <div className="flex gap-3">
                          <div className="relative flex-1">
                            <UserCheck className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                              type="text"
                              value={user?.username || 'johndoe123'}
                              disabled
                              className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl bg-gray-50 text-gray-500 cursor-not-allowed"
                            />
                          </div>
                          <button className="px-6 py-3 bg-gray-100 text-gray-900 rounded-xl font-semibold hover:bg-gray-200 transition-all flex items-center gap-2">
                            <User className="w-5 h-5" />
                            Change
                          </button>
                        </div>
                        <p className="text-xs text-gray-500 mt-2">Your username is how others find you on BiggMate</p>
                      </div>

                      {/* Change Email */}
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
                        <div className="flex gap-3">
                          <div className="relative flex-1">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                              type="email"
                              value={user?.email || 'john.doe@example.com'}
                              disabled
                              className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl bg-gray-50 text-gray-500 cursor-not-allowed"
                            />
                          </div>
                          <button className="px-6 py-3 bg-gray-100 text-gray-900 rounded-xl font-semibold hover:bg-gray-200 transition-all flex items-center gap-2">
                            <Mail className="w-5 h-5" />
                            Change
                          </button>
                        </div>
                        <p className="text-xs text-gray-500 mt-2">We'll send a verification email to your new address</p>
                      </div>

                      {/* Change Password */}
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
                        <div className="flex gap-3">
                          <div className="relative flex-1">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                              type="password"
                              value="••••••••••"
                              disabled
                              className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl bg-gray-50 text-gray-500 cursor-not-allowed"
                            />
                          </div>
                          <button className="px-6 py-3 bg-gray-900 text-white rounded-xl font-semibold hover:bg-gray-800 transition-all flex items-center gap-2">
                            <Lock className="w-5 h-5" />
                            Change
                          </button>
                        </div>
                        <p className="text-xs text-gray-500 mt-2">Last changed: 3 months ago</p>
                      </div>
                    </div>
                  </div>

                  {/* Phone Number */}
                  <div className="mb-8 pb-6 border-b border-gray-200">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Phone Number</h3>
                    <div className="flex gap-3">
                      <div className="relative flex-1">
                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="tel"
                          value="+1 (555) 000-0000"
                          disabled
                          className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl bg-gray-50 text-gray-500 cursor-not-allowed"
                        />
                      </div>
                      <button className="px-6 py-3 bg-gray-100 text-gray-900 rounded-xl font-semibold hover:bg-gray-200 transition-all flex items-center gap-2">
                        <Phone className="w-5 h-5" />
                        Update
                      </button>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">Used for account recovery and two-factor authentication</p>
                  </div>

                  {/* Two-Factor Authentication */}
                  <div className="mb-8 pb-6 border-b border-gray-200">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Two-Factor Authentication</h3>
                    <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-4">
                      <div className="flex gap-3">
                        <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                        <div className="text-sm">
                          <p className="font-bold text-gray-900 mb-1">Enhance your account security</p>
                          <p className="text-gray-700">Two-factor authentication adds an extra layer of security to your account</p>
                        </div>
                      </div>
                    </div>
                    <button className="px-6 py-3 bg-gray-900 text-white rounded-xl font-semibold hover:bg-gray-800 transition-all flex items-center gap-2">
                      <Shield className="w-5 h-5" />
                      Enable 2FA
                    </button>
                  </div>

                  {/* Active Sessions */}
                  <div className="mb-8 pb-6 border-b border-gray-200">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Active Sessions</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-4 bg-green-50 border border-green-200 rounded-xl">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                            <Monitor className="w-5 h-5 text-green-600" />
                          </div>
                          <div>
                            <div className="font-semibold text-gray-900">Current Session</div>
                            <div className="text-sm text-gray-600">macOS • Chrome • San Francisco, CA</div>
                            <div className="text-xs text-gray-500 mt-1">Last active: Now</div>
                          </div>
                        </div>
                        <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">Active</span>
                      </div>
                    </div>
                    <button className="mt-4 px-6 py-3 text-red-600 font-semibold hover:bg-red-50 rounded-xl transition-all">
                      Sign out all other sessions
                    </button>
                  </div>

                  {/* Export Data */}
                  <div className="mb-8 pb-6 border-b border-gray-200">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">Export Your Data</h3>
                    <p className="text-sm text-gray-500 mb-4">Download a copy of your data including profile, messages, and activity</p>
                    <button className="px-6 py-3 bg-gray-100 text-gray-900 rounded-xl font-semibold hover:bg-gray-200 transition-all flex items-center gap-2">
                      <Download className="w-5 h-5" />
                      Request Data Export
                    </button>
                  </div>

                  {/* Delete Account */}
                  <div>
                    <h3 className="text-lg font-bold text-red-600 mb-2">Delete Account</h3>
                    <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-4">
                      <div className="flex gap-3">
                        <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                        <div className="text-sm">
                          <p className="font-bold text-gray-900 mb-1">This action cannot be undone</p>
                          <p className="text-gray-700">Deleting your account will permanently remove all your data, including your profile, messages, and connections.</p>
                        </div>
                      </div>
                    </div>
                    <button className="px-6 py-3 bg-red-600 text-white rounded-xl font-semibold hover:bg-red-700 transition-all flex items-center gap-2">
                      <Trash2 className="w-5 h-5" />
                      Delete My Account
                    </button>
                  </div>
                </div>
              )}

              {/* Notifications Settings */}
              {activeTab === 'notifications' && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Notification Settings</h2>
                  
                  <div className="space-y-6">
                    {/* Email Notifications */}
                    <div className="pb-6 border-b border-gray-200">
                      <h3 className="text-lg font-bold text-gray-900 mb-4">Email Notifications</h3>
                      <div className="space-y-4">
                        <label className="flex items-center justify-between cursor-pointer group">
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-gray-100 rounded-lg group-hover:bg-gray-200 transition-colors">
                              <Mail className="w-5 h-5 text-gray-700" />
                            </div>
                            <div>
                              <div className="font-semibold text-gray-900">Email Notifications</div>
                              <div className="text-sm text-gray-500">Receive notifications via email</div>
                            </div>
                          </div>
                          <div className="relative">
                            <input
                              type="checkbox"
                              checked={notifications.emailNotifications}
                              onChange={(e) => setNotifications({ ...notifications, emailNotifications: e.target.checked })}
                              className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-gray-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gray-900"></div>
                          </div>
                        </label>

                        <label className="flex items-center justify-between cursor-pointer group">
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-gray-100 rounded-lg group-hover:bg-gray-200 transition-colors">
                              <Heart className="w-5 h-5 text-gray-700" />
                            </div>
                            <div>
                              <div className="font-semibold text-gray-900">Match Alerts</div>
                              <div className="text-sm text-gray-500">Get notified when you match with someone</div>
                            </div>
                          </div>
                          <div className="relative">
                            <input
                              type="checkbox"
                              checked={notifications.matchAlerts}
                              onChange={(e) => setNotifications({ ...notifications, matchAlerts: e.target.checked })}
                              className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-gray-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gray-900"></div>
                          </div>
                        </label>

                        <label className="flex items-center justify-between cursor-pointer group">
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-gray-100 rounded-lg group-hover:bg-gray-200 transition-colors">
                              <MessageCircle className="w-5 h-5 text-gray-700" />
                            </div>
                            <div>
                              <div className="font-semibold text-gray-900">Message Alerts</div>
                              <div className="text-sm text-gray-500">Get notified about new messages</div>
                            </div>
                          </div>
                          <div className="relative">
                            <input
                              type="checkbox"
                              checked={notifications.messageAlerts}
                              onChange={(e) => setNotifications({ ...notifications, messageAlerts: e.target.checked })}
                              className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-gray-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gray-900"></div>
                          </div>
                        </label>

                        <label className="flex items-center justify-between cursor-pointer group">
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-gray-100 rounded-lg group-hover:bg-gray-200 transition-colors">
                              <TrendingUp className="w-5 h-5 text-gray-700" />
                            </div>
                            <div>
                              <div className="font-semibold text-gray-900">Pitch Responses</div>
                              <div className="text-sm text-gray-500">Receive updates on your pitches</div>
                            </div>
                          </div>
                          <div className="relative">
                            <input
                              type="checkbox"
                              checked={notifications.pitchResponses}
                              onChange={(e) => setNotifications({ ...notifications, pitchResponses: e.target.checked })}
                              className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-gray-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gray-900"></div>
                          </div>
                        </label>
                      </div>
                    </div>

                    {/* Push Notifications */}
                    <div className="pb-6 border-b border-gray-200">
                      <h3 className="text-lg font-bold text-gray-900 mb-4">Push Notifications</h3>
                      <label className="flex items-center justify-between cursor-pointer group">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-gray-100 rounded-lg group-hover:bg-gray-200 transition-colors">
                            <Smartphone className="w-5 h-5 text-gray-700" />
                          </div>
                          <div>
                            <div className="font-semibold text-gray-900">Push Notifications</div>
                            <div className="text-sm text-gray-500">Receive push notifications on your device</div>
                          </div>
                        </div>
                        <div className="relative">
                          <input
                            type="checkbox"
                            checked={notifications.pushNotifications}
                            onChange={(e) => setNotifications({ ...notifications, pushNotifications: e.target.checked })}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-gray-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gray-900"></div>
                        </div>
                      </label>
                    </div>

                    {/* Marketing */}
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 mb-4">Marketing & Updates</h3>
                      <div className="space-y-4">
                        <label className="flex items-center justify-between cursor-pointer group">
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-gray-100 rounded-lg group-hover:bg-gray-200 transition-colors">
                              <Calendar className="w-5 h-5 text-gray-700" />
                            </div>
                            <div>
                              <div className="font-semibold text-gray-900">Weekly Digest</div>
                              <div className="text-sm text-gray-500">Get a weekly summary of your activity</div>
                            </div>
                          </div>
                          <div className="relative">
                            <input
                              type="checkbox"
                              checked={notifications.weeklyDigest}
                              onChange={(e) => setNotifications({ ...notifications, weeklyDigest: e.target.checked })}
                              className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-gray-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gray-900"></div>
                          </div>
                        </label>

                        <label className="flex items-center justify-between cursor-pointer group">
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-gray-100 rounded-lg group-hover:bg-gray-200 transition-colors">
                              <Bell className="w-5 h-5 text-gray-700" />
                            </div>
                            <div>
                              <div className="font-semibold text-gray-900">Product Updates</div>
                              <div className="text-sm text-gray-500">News about new features and improvements</div>
                            </div>
                          </div>
                          <div className="relative">
                            <input
                              type="checkbox"
                              checked={notifications.productUpdates}
                              onChange={(e) => setNotifications({ ...notifications, productUpdates: e.target.checked })}
                              className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-gray-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gray-900"></div>
                          </div>
                        </label>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => handleSave('Notification')}
                    disabled={isSaving}
                    className="w-full md:w-auto px-8 py-3 bg-gray-900 text-white rounded-xl font-semibold hover:bg-gray-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-8"
                  >
                    {isSaving ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="w-5 h-5" />
                        Save Preferences
                      </>
                    )}
                  </button>
                </div>
              )}

              {/* Privacy & Security */}
              {activeTab === 'privacy' && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Privacy & Security</h2>
                  
                  <div className="space-y-6">
                    {/* Profile Visibility */}
                    <div className="pb-6 border-b border-gray-200">
                      <h3 className="text-lg font-bold text-gray-900 mb-4">Profile Visibility</h3>
                      <div className="space-y-3">
                        <label className="flex items-center gap-3 cursor-pointer">
                          <input
                            type="radio"
                            name="visibility"
                            checked={privacy.profileVisibility === 'public'}
                            onChange={() => setPrivacy({ ...privacy, profileVisibility: 'public' })}
                            className="w-5 h-5 text-gray-900 focus:ring-gray-900"
                          />
                          <div>
                            <div className="font-semibold text-gray-900">Public</div>
                            <div className="text-sm text-gray-500">Anyone can see your profile</div>
                          </div>
                        </label>
                        <label className="flex items-center gap-3 cursor-pointer">
                          <input
                            type="radio"
                            name="visibility"
                            checked={privacy.profileVisibility === 'connections'}
                            onChange={() => setPrivacy({ ...privacy, profileVisibility: 'connections' })}
                            className="w-5 h-5 text-gray-900 focus:ring-gray-900"
                          />
                          <div>
                            <div className="font-semibold text-gray-900">Connections Only</div>
                            <div className="text-sm text-gray-500">Only your connections can see your full profile</div>
                          </div>
                        </label>
                        <label className="flex items-center gap-3 cursor-pointer">
                          <input
                            type="radio"
                            name="visibility"
                            checked={privacy.profileVisibility === 'private'}
                            onChange={() => setPrivacy({ ...privacy, profileVisibility: 'private' })}
                            className="w-5 h-5 text-gray-900 focus:ring-gray-900"
                          />
                          <div>
                            <div className="font-semibold text-gray-900">Private</div>
                            <div className="text-sm text-gray-500">Your profile is hidden from search</div>
                          </div>
                        </label>
                      </div>
                    </div>

                    {/* Contact Information */}
                    <div className="pb-6 border-b border-gray-200">
                      <h3 className="text-lg font-bold text-gray-900 mb-4">Contact Information</h3>
                      <div className="space-y-4">
                        <label className="flex items-center justify-between cursor-pointer group">
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-gray-100 rounded-lg group-hover:bg-gray-200 transition-colors">
                              <Mail className="w-5 h-5 text-gray-700" />
                            </div>
                            <div>
                              <div className="font-semibold text-gray-900">Show Email</div>
                              <div className="text-sm text-gray-500">Display email on your profile</div>
                            </div>
                          </div>
                          <div className="relative">
                            <input
                              type="checkbox"
                              checked={privacy.showEmail}
                              onChange={(e) => setPrivacy({ ...privacy, showEmail: e.target.checked })}
                              className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-gray-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gray-900"></div>
                          </div>
                        </label>

                        <label className="flex items-center justify-between cursor-pointer group">
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-gray-100 rounded-lg group-hover:bg-gray-200 transition-colors">
                              <Phone className="w-5 h-5 text-gray-700" />
                            </div>
                            <div>
                              <div className="font-semibold text-gray-900">Show Phone</div>
                              <div className="text-sm text-gray-500">Display phone number on your profile</div>
                            </div>
                          </div>
                          <div className="relative">
                            <input
                              type="checkbox"
                              checked={privacy.showPhone}
                              onChange={(e) => setPrivacy({ ...privacy, showPhone: e.target.checked })}
                              className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-gray-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gray-900"></div>
                          </div>
                        </label>

                        <label className="flex items-center justify-between cursor-pointer group">
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-gray-100 rounded-lg group-hover:bg-gray-200 transition-colors">
                              <MapPin className="w-5 h-5 text-gray-700" />
                            </div>
                            <div>
                              <div className="font-semibold text-gray-900">Show Location</div>
                              <div className="text-sm text-gray-500">Display your location on profile</div>
                            </div>
                          </div>
                          <div className="relative">
                            <input
                              type="checkbox"
                              checked={privacy.showLocation}
                              onChange={(e) => setPrivacy({ ...privacy, showLocation: e.target.checked })}
                              className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-gray-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gray-900"></div>
                          </div>
                        </label>
                      </div>
                    </div>

                    {/* Interactions */}
                    <div className="pb-6 border-b border-gray-200">
                      <h3 className="text-lg font-bold text-gray-900 mb-4">Interactions</h3>
                      <div className="space-y-4">
                        <label className="flex items-center justify-between cursor-pointer group">
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-gray-100 rounded-lg group-hover:bg-gray-200 transition-colors">
                              <MessageCircle className="w-5 h-5 text-gray-700" />
                            </div>
                            <div>
                              <div className="font-semibold text-gray-900">Allow Messages</div>
                              <div className="text-sm text-gray-500">Let others send you messages</div>
                            </div>
                          </div>
                          <div className="relative">
                            <input
                              type="checkbox"
                              checked={privacy.allowMessages}
                              onChange={(e) => setPrivacy({ ...privacy, allowMessages: e.target.checked })}
                              className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-gray-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gray-900"></div>
                          </div>
                        </label>

                        <label className="flex items-center justify-between cursor-pointer group">
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-gray-100 rounded-lg group-hover:bg-gray-200 transition-colors">
                              <TrendingUp className="w-5 h-5 text-gray-700" />
                            </div>
                            <div>
                              <div className="font-semibold text-gray-900">Allow Pitches</div>
                              <div className="text-sm text-gray-500">Let others send you pitches</div>
                            </div>
                          </div>
                          <div className="relative">
                            <input
                              type="checkbox"
                              checked={privacy.allowPitches}
                              onChange={(e) => setPrivacy({ ...privacy, allowPitches: e.target.checked })}
                              className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-gray-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gray-900"></div>
                          </div>
                        </label>
                      </div>
                    </div>

                    {/* Password */}
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 mb-4">Password & Authentication</h3>
                      <button className="w-full md:w-auto px-6 py-3 bg-gray-100 text-gray-900 rounded-xl font-semibold hover:bg-gray-200 transition-all flex items-center justify-center gap-2">
                        <Lock className="w-5 h-5" />
                        Change Password
                      </button>
                    </div>
                  </div>

                  <button
                    onClick={() => handleSave('Privacy')}
                    disabled={isSaving}
                    className="w-full md:w-auto px-8 py-3 bg-gray-900 text-white rounded-xl font-semibold hover:bg-gray-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-8"
                  >
                    {isSaving ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="w-5 h-5" />
                        Save Settings
                      </>
                    )}
                  </button>
                </div>
              )}

              {/* Appearance */}
              {activeTab === 'appearance' && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Appearance</h2>
                  
                  <div className="space-y-6">
                    <div className="pb-6 border-b border-gray-200">
                      <h3 className="text-lg font-bold text-gray-900 mb-4">Theme</h3>
                      <div className="grid grid-cols-3 gap-4">
                        <button
                          onClick={() => setAppearance({ ...appearance, theme: 'light' })}
                          className={`p-4 border-2 rounded-xl transition-all ${
                            appearance.theme === 'light'
                              ? 'border-gray-900 bg-gray-50'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <Sun className="w-6 h-6 mx-auto mb-2 text-gray-900" />
                          <div className="font-semibold text-sm">Light</div>
                        </button>
                        <button
                          onClick={() => setAppearance({ ...appearance, theme: 'dark' })}
                          className={`p-4 border-2 rounded-xl transition-all ${
                            appearance.theme === 'dark'
                              ? 'border-gray-900 bg-gray-50'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <Moon className="w-6 h-6 mx-auto mb-2 text-gray-900" />
                          <div className="font-semibold text-sm">Dark</div>
                        </button>
                        <button
                          onClick={() => setAppearance({ ...appearance, theme: 'system' })}
                          className={`p-4 border-2 rounded-xl transition-all ${
                            appearance.theme === 'system'
                              ? 'border-gray-900 bg-gray-50'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <Monitor className="w-6 h-6 mx-auto mb-2 text-gray-900" />
                          <div className="font-semibold text-sm">System</div>
                        </button>
                      </div>
                    </div>

                    <div className="pb-6 border-b border-gray-200">
                      <h3 className="text-lg font-bold text-gray-900 mb-4">Font Size</h3>
                      <div className="space-y-3">
                        {['small', 'medium', 'large'].map((size) => (
                          <label key={size} className="flex items-center gap-3 cursor-pointer">
                            <input
                              type="radio"
                              name="fontSize"
                              checked={appearance.fontSize === size}
                              onChange={() => setAppearance({ ...appearance, fontSize: size })}
                              className="w-5 h-5 text-gray-900 focus:ring-gray-900"
                            />
                            <div className="font-semibold text-gray-900 capitalize">{size}</div>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-bold text-gray-900 mb-4">Language</h3>
                      <select
                        value={appearance.language}
                        onChange={(e) => setAppearance({ ...appearance, language: e.target.value })}
                        className="w-full md:w-64 px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-gray-900 focus:border-gray-900"
                      >
                        <option value="en">English</option>
                        <option value="es">Español</option>
                        <option value="fr">Français</option>
                        <option value="de">Deutsch</option>
                        <option value="zh">中文</option>
                      </select>
                    </div>
                  </div>

                  <button
                    onClick={() => handleSave('Appearance')}
                    disabled={isSaving}
                    className="w-full md:w-auto px-8 py-3 bg-gray-900 text-white rounded-xl font-semibold hover:bg-gray-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-8"
                  >
                    {isSaving ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="w-5 h-5" />
                        Save Preferences
                      </>
                    )}
                  </button>
                </div>
              )}

              {/* Billing */}
              {activeTab === 'billing' && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Billing & Subscription</h2>
                  
                  {/* Current Plan */}
                  <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-2xl p-6 text-white mb-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-bold">Pro Plan</h3>
                      <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm font-semibold">Active</span>
                    </div>
                    <p className="text-gray-300 mb-4">Unlimited matches, advanced features, priority support</p>
                    <div className="flex items-baseline gap-2">
                      <span className="text-4xl font-bold">$29</span>
                      <span className="text-gray-300">/month</span>
                    </div>
                  </div>

                  {/* Payment Method */}
                  <div className="mb-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Payment Method</h3>
                    <div className="border border-gray-200 rounded-xl p-4 flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-8 bg-gray-900 rounded flex items-center justify-center">
                          <CreditCard className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900">Visa ending in 4242</div>
                          <div className="text-sm text-gray-500">Expires 12/2025</div>
                        </div>
                      </div>
                      <button className="px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
                        Update
                      </button>
                    </div>
                  </div>

                  {/* Billing History */}
                  <div className="mb-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Billing History</h3>
                    <div className="space-y-3">
                      {[
                        { date: 'Dec 1, 2024', amount: '$29.00', status: 'Paid' },
                        { date: 'Nov 1, 2024', amount: '$29.00', status: 'Paid' },
                        { date: 'Oct 1, 2024', amount: '$29.00', status: 'Paid' }
                      ].map((invoice, idx) => (
                        <div key={idx} className="border border-gray-200 rounded-xl p-4 flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className="text-sm">
                              <div className="font-semibold text-gray-900">{invoice.date}</div>
                              <div className="text-gray-500">Pro Plan</div>
                            </div>
                          </div>
                          <div className="flex items-center gap-4">
                            <div className="font-semibold text-gray-900">{invoice.amount}</div>
                            <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
                              {invoice.status}
                            </span>
                            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                              <Download className="w-4 h-4 text-gray-600" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <button className="px-6 py-3 text-red-600 font-semibold hover:bg-red-50 rounded-xl transition-all">
                    Cancel Subscription
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
