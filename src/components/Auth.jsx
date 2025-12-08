import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { 
  Eye, 
  EyeOff, 
  Mail, 
  Lock, 
  User, 
  ArrowRight,
  CheckCircle,
  AlertCircle,
  Heart,
  Sparkles,
  Crown,
  Briefcase,
  Phone,
  UserCheck,
  ArrowLeft
} from 'lucide-react';
import { loginUser, registerUser, clearError } from '../store/slices/authSlice.js';

const Auth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { isLoading, error, isAuthenticated } = useSelector((state) => state.auth);
  
  // Get mode from URL parameter (login, register) and map to internal authMode
  const urlMode = searchParams.get('mode');
  const initialMode = urlMode === 'register' ? 'signup' : 'signin';
  const [authMode, setAuthMode] = useState(initialMode); // 'signin', 'signup', 'reset'
  const [showPassword, setShowPassword] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    countryCode: '+1',
    whatsappNumber: '',
    username: '',
    password: '',
    confirmPassword: ''
  });
  const [resetData, setResetData] = useState({
    countryCode: '+1',
    whatsappNumber: '',
    otp: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [resetStep, setResetStep] = useState(1); // 1: What forgot, 2: Enter WhatsApp, 3: Enter OTP, 4: Reset Password/Show Username
  const [forgotType, setForgotType] = useState(''); // 'username' or 'password'

  const countryCodes = [
    { code: '+1', country: 'USA', flag: '🇺🇸' },
    { code: '+1', country: 'Canada', flag: '🇨🇦' },
    { code: '+44', country: 'UK', flag: '🇬🇧' },
    { code: '+91', country: 'India', flag: '🇮🇳' },
    { code: '+61', country: 'Australia', flag: '🇦🇺' },
    { code: '+971', country: 'UAE', flag: '🇦🇪' }
  ];

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Update authMode when URL parameter changes
  useEffect(() => {
    const urlMode = searchParams.get('mode');
    if (urlMode === 'register') {
      setAuthMode('signup');
    } else if (urlMode === 'login') {
      setAuthMode('signin');
    }
  }, [searchParams]);

  // Navigate after successful authentication
  useEffect(() => {
    if (isAuthenticated) {
      // After login, always redirect to the home page
      navigate('/home', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
    
    // Real-time validation feedback
    validateFieldRealTime(name, value);
  };

  const validateFieldRealTime = (name, value) => {
    const newErrors = { ...errors };
    
    switch(name) {
      case 'firstName':
      case 'lastName':
        if (value && !/^[a-zA-Z\s]{2,30}$/.test(value)) {
          newErrors[name] = 'Only letters allowed (2-30 characters)';
        } else {
          delete newErrors[name];
        }
        break;
      case 'email':
        if (value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          newErrors[name] = 'Invalid email format';
        } else {
          delete newErrors[name];
        }
        break;
      case 'username':
        if (value && !/^[a-zA-Z0-9_]{3,20}$/.test(value)) {
          newErrors[name] = 'Username: 3-20 characters, letters, numbers, underscore only';
        } else {
          delete newErrors[name];
        }
        break;
      case 'whatsappNumber':
        if (value && !/^\d{7,15}$/.test(value.replace(/\s/g, ''))) {
          newErrors[name] = 'Enter 7-15 digits only';
        } else {
          delete newErrors[name];
        }
        break;
      case 'password':
        if (value && value.length < 8) {
          newErrors[name] = 'Password must be at least 8 characters';
        } else if (value && !/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(value)) {
          newErrors[name] = 'Include uppercase, lowercase, and number';
        } else {
          delete newErrors[name];
        }
        break;
      case 'confirmPassword':
        if (value && value !== formData.password) {
          newErrors[name] = 'Passwords must match';
        } else {
          delete newErrors[name];
        }
        break;
    }
    
    setErrors(newErrors);
  };

  const validateForm = () => {
    const newErrors = {};

    if (authMode === 'signin') {
      if (!formData.username) {
        newErrors.username = 'Username is required';
      } else if (formData.username.trim().length < 3) {
        newErrors.username = 'Username must be at least 3 characters';
      }
      if (!formData.password) {
        newErrors.password = 'Password is required';
      } else if (formData.password.length < 6) {
        newErrors.password = 'Password must be at least 6 characters';
      }
    } else if (authMode === 'signup') {
      if (!formData.firstName) {
        newErrors.firstName = 'First name is required';
      } else if (!/^[a-zA-Z\s]{2,30}$/.test(formData.firstName)) {
        newErrors.firstName = 'Only letters allowed (2-30 characters)';
      }
      
      if (!formData.lastName) {
        newErrors.lastName = 'Last name is required';
      } else if (!/^[a-zA-Z\s]{2,30}$/.test(formData.lastName)) {
        newErrors.lastName = 'Only letters allowed (2-30 characters)';
      }
      
      if (!formData.email) {
        newErrors.email = 'Email is required';
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        newErrors.email = 'Please enter a valid email address';
      }
      
      if (!formData.whatsappNumber) {
        newErrors.whatsappNumber = 'WhatsApp number is required';
      } else if (!/^\d{7,15}$/.test(formData.whatsappNumber.replace(/\s/g, ''))) {
        newErrors.whatsappNumber = 'Enter 7-15 digits only';
      }
      
      if (!formData.username) {
        newErrors.username = 'Username is required';
      } else if (!/^[a-zA-Z0-9_]{3,20}$/.test(formData.username)) {
        newErrors.username = 'Username: 3-20 characters, letters, numbers, underscore only';
      }
      
      if (!formData.password) {
        newErrors.password = 'Password is required';
      } else if (formData.password.length < 8) {
        newErrors.password = 'Password must be at least 8 characters';
      } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
        newErrors.password = 'Password must include uppercase, lowercase, and number';
      }
      
      if (!formData.confirmPassword) {
        newErrors.confirmPassword = 'Please confirm your password';
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateResetForm = () => {
    const newErrors = {};

    if (resetStep === 1) {
      if (!forgotType) {
        newErrors.forgotType = 'Please select what you forgot';
      }
    } else if (resetStep === 2) {
      if (!resetData.whatsappNumber) {
        newErrors.whatsappNumber = 'WhatsApp number is required';
      } else if (!/^\d{7,15}$/.test(resetData.whatsappNumber.replace(/\s/g, ''))) {
        newErrors.whatsappNumber = 'Enter 7-15 digits only';
      }
    } else if (resetStep === 3) {
      if (!resetData.otp) {
        newErrors.otp = 'OTP is required';
      } else if (!/^\d{6}$/.test(resetData.otp)) {
        newErrors.otp = 'OTP must be exactly 6 digits';
      }
    } else if (resetStep === 4 && forgotType === 'password') {
      if (!resetData.newPassword) {
        newErrors.newPassword = 'New password is required';
      } else if (resetData.newPassword.length < 8) {
        newErrors.newPassword = 'Password must be at least 8 characters';
      } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(resetData.newPassword)) {
        newErrors.newPassword = 'Include uppercase, lowercase, and number';
      }
      if (!resetData.confirmPassword) {
        newErrors.confirmPassword = 'Please confirm your password';
      } else if (resetData.newPassword !== resetData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    dispatch(clearError());
    
    if (authMode === 'signup') {
      dispatch(registerUser(formData));
    } else if (authMode === 'signin') {
      dispatch(loginUser({
        username: formData.username,
        password: formData.password
      }));
    }
  };

  const handleResetSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateResetForm()) {
      return;
    }

    dispatch(clearError());
    
    if (resetStep === 1) {
      // User selected what they forgot, proceed to WhatsApp number
      setResetStep(2);
    } else if (resetStep === 2) {
      // Send OTP to WhatsApp number
      console.log('Sending OTP to:', resetData.countryCode + resetData.whatsappNumber);
      setResetStep(3);
    } else if (resetStep === 3) {
      // Verify OTP
      console.log('Verifying OTP:', resetData.otp);
      setResetStep(4);
    } else if (resetStep === 4) {
      if (forgotType === 'password') {
        // Reset password
        console.log('Resetting password for:', resetData.countryCode + resetData.whatsappNumber);
        // Here you would typically call your reset password API
        setAuthMode('signin');
        setResetStep(1);
        setForgotType('');
        setResetData({ countryCode: '+1', whatsappNumber: '', otp: '', newPassword: '', confirmPassword: '' });
      } else {
        // Show username
        console.log('Showing username for:', resetData.countryCode + resetData.whatsappNumber);
        // Here you would typically call your API to get username
        setAuthMode('signin');
        setResetStep(1);
        setForgotType('');
        setResetData({ countryCode: '+1', whatsappNumber: '', otp: '', newPassword: '', confirmPassword: '' });
      }
    }
  };

  const handleResetInputChange = (e) => {
    const { name, value } = e.target;
    
    // Restrict OTP to numbers only and max 6 digits
    if (name === 'otp') {
      const numericValue = value.replace(/\D/g, '').slice(0, 6);
      setResetData(prev => ({
        ...prev,
        [name]: numericValue
      }));
    } else if (name === 'whatsappNumber') {
      // Allow only numbers for phone
      const numericValue = value.replace(/\D/g, '').slice(0, 15);
      setResetData(prev => ({
        ...prev,
        [name]: numericValue
      }));
    } else {
      setResetData(prev => ({
        ...prev,
        [name]: value
      }));
    }
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const setMode = (mode) => {
    setAuthMode(mode);
    setErrors({});
    dispatch(clearError());
    setResetStep(1);
    setForgotType('');
    setResetData({ countryCode: '+1', whatsappNumber: '', otp: '', newPassword: '', confirmPassword: '' });
    
    // Update URL to reflect the current mode
    const newMode = mode === 'signup' ? 'register' : 'login';
    if (mode !== 'reset') {
      navigate(`/auth?mode=${newMode}`, { replace: true });
    }
  };

  if (isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl flex items-center justify-center mx-auto mb-4 animate-pulse">
            <span className="text-white text-2xl font-bold">B</span>
          </div>
          <p className="text-gray-600 font-medium">Redirecting...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center p-4">
      <div className={`w-full max-w-lg bg-white/10 backdrop-blur-md rounded-3xl border border-white/20 shadow-2xl transition-all duration-1000 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'} flex flex-col max-h-[90vh]`}>
        {/* Header - Fixed at top */}
        <div className="flex-shrink-0 text-center p-8 pb-6">
          <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-md px-6 py-3 rounded-full mb-4 border border-white/20 shadow-xl">
            <Crown className="w-6 h-6 text-yellow-400 animate-pulse" />
            <span className="text-white font-semibold tracking-wide">
              {authMode === 'reset' ? 'Reset Account' : 'Welcome to Biggmate'}
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2 tracking-tight">
            {authMode === 'signup' ? 'Let\'s Find Your Cofounder' : 
             authMode === 'signin' ? 'Welcome Back!' : 
             'Reset Your Account'}
          </h1>
          <p className="text-gray-300 text-sm md:text-base">
            {authMode === 'signup' ? 'Start Your Journey to Building the Next Unicorn' : 
             authMode === 'signin' ? 'Continue Building Your Startup Empire' : 
             'Recover your username or password'}
          </p>
        </div>

        {/* Scrollable Form Content */}
        <div className="flex-1 overflow-y-auto px-8 pb-8 scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent">
          {authMode === 'reset' ? (
            <form onSubmit={handleResetSubmit} className="space-y-6">
              {resetStep === 1 && (
                <>
                  <div>
                    <label className="block text-white font-semibold mb-4">What you forgot?</label>
                    <div className="space-y-3">
                      <button
                        type="button"
                        onClick={() => setForgotType('username')}
                        className={`w-full p-4 text-left rounded-xl border transition-all duration-300 ${
                          forgotType === 'username' 
                            ? 'bg-gray-800/20 border-gray-400 text-white' 
                            : 'bg-white/10 border-white/20 text-gray-300 hover:bg-white/20'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <UserCheck className="w-5 h-5" />
                          <span className="font-semibold">Username</span>
                        </div>
                      </button>
                      <button
                        type="button"
                        onClick={() => setForgotType('password')}
                        className={`w-full p-4 text-left rounded-xl border transition-all duration-300 ${
                          forgotType === 'password' 
                            ? 'bg-gray-800/20 border-gray-400 text-white' 
                            : 'bg-white/10 border-white/20 text-gray-300 hover:bg-white/20'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <Lock className="w-5 h-5" />
                          <span className="font-semibold">Password</span>
                        </div>
                      </button>
                    </div>
                    {errors.forgotType && (
                      <p className="text-red-400 text-sm mt-2 flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" />
                        {errors.forgotType}
                      </p>
                    )}
                  </div>
                </>
              )}

              {resetStep === 2 && (
                <>
                  <div>
                    <label className="block text-white font-semibold mb-2">WhatsApp Number</label>
                    <div className="flex gap-2">
                      <div className="w-32">
                        <select
                          name="countryCode"
                          value={resetData.countryCode}
                          onChange={handleResetInputChange}
                          className="w-full py-3 px-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-all duration-300 appearance-none"
                        >
                          {countryCodes.map((country) => (
                            <option key={country.code} value={country.code} className="bg-gray-800">
                              {country.flag} {country.code}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="flex-1 relative">
                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                          type="tel"
                          name="whatsappNumber"
                          value={resetData.whatsappNumber}
                          onChange={handleResetInputChange}
                          className={`w-full pl-10 pr-4 py-3 bg-white/10 border rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-all duration-300 ${
                            errors.whatsappNumber ? 'border-red-500' : 'border-white/20'
                          }`}
                          placeholder="1234567890"
                        />
                      </div>
                    </div>
                    {errors.whatsappNumber && (
                      <p className="text-red-400 text-sm mt-1 flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" />
                        {errors.whatsappNumber}
                      </p>
                    )}
                  </div>
                </>
              )}

              {resetStep === 3 && (
                <>
                  <div>
                    <label className="block text-white font-semibold mb-2">Enter OTP</label>
                    <div className="relative">
                      <CheckCircle className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="text"
                        name="otp"
                        value={resetData.otp}
                        onChange={handleResetInputChange}
                        className={`w-full pl-10 pr-4 py-3 bg-white/10 border rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-all duration-300 ${
                          errors.otp ? 'border-red-500' : 'border-white/20'
                        }`}
                        placeholder="123456"
                        maxLength="6"
                      />
                    </div>
                    {errors.otp && (
                      <p className="text-red-400 text-sm mt-1 flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" />
                        {errors.otp}
                      </p>
                    )}
                  </div>
                </>
              )}

              {resetStep === 4 && forgotType === 'password' && (
                <>
                  <div>
                    <label className="block text-white font-semibold mb-2">New Password</label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        name="newPassword"
                        value={resetData.newPassword}
                        onChange={handleResetInputChange}
                        className={`w-full pl-10 pr-12 py-3 bg-white/10 border rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-all duration-300 ${
                          errors.newPassword ? 'border-red-500' : 'border-white/20'
                        }`}
                        placeholder="••••••••"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                      >
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                    {errors.newPassword && (
                      <p className="text-red-400 text-sm mt-1 flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" />
                        {errors.newPassword}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-white font-semibold mb-2">Confirm Password</label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="password"
                        name="confirmPassword"
                        value={resetData.confirmPassword}
                        onChange={handleResetInputChange}
                        className={`w-full pl-10 pr-4 py-3 bg-white/10 border rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-all duration-300 ${
                          errors.confirmPassword ? 'border-red-500' : 'border-white/20'
                        }`}
                        placeholder="••••••••"
                      />
                    </div>
                    {errors.confirmPassword && (
                      <p className="text-red-400 text-sm mt-1 flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" />
                        {errors.confirmPassword}
                      </p>
                    )}
                  </div>
                </>
              )}

              {resetStep === 4 && forgotType === 'username' && (
                <>
                  <div className="text-center">
                    <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-6">
                      <CheckCircle className="w-12 h-12 text-green-400 mx-auto mb-4" />
                      <h3 className="text-white font-semibold text-lg mb-2">Username Found!</h3>
                      <p className="text-gray-300 mb-4">Your username is:</p>
                      <div className="bg-white/10 rounded-lg p-3 mb-4 flex items-center justify-between">
                        <span className="text-white font-mono text-lg">johndoe123</span>
                        <button
                          onClick={() => navigator.clipboard.writeText('johndoe123')}
                          className="ml-2 px-3 py-1 bg-gray-800/20 hover:bg-gray-800/30 text-gray-300 hover:text-white rounded-lg text-sm transition-all duration-200"
                        >
                          Copy
                        </button>
                      </div>
                      <p className="text-gray-400 text-sm mb-4">You can now sign in with this username</p>
                      <button
                        onClick={() => setMode('signin')}
                        className="w-full py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 font-bold text-lg shadow-lg hover:shadow-blue-500/50 hover:scale-105 flex items-center justify-center gap-3"
                      >
                        <ArrowLeft className="w-5 h-5" />
                        Back to Login
                      </button>
                    </div>
                  </div>
                </>
              )}

              {error && (
                <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 flex items-center gap-3">
                  <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
                  <p className="text-red-400 text-sm">{error}</p>
                </div>
              )}

              {!(resetStep === 4 && forgotType === 'username') && (
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 font-bold text-lg shadow-lg hover:shadow-blue-500/50 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-3"
                >
                  {isLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      <span>Processing...</span>
                    </>
                  ) : (
                    <>
                      <span>
                        {resetStep === 1 ? 'Continue' : 
                         resetStep === 2 ? 'Send OTP' : 
                         resetStep === 3 ? 'Verify OTP' : 
                         'Reset Password'}
                      </span>
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </button>
              )}
            </form>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {authMode === 'signup' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-white font-semibold mb-2">First Name</label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                          type="text"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          maxLength="30"
                          className={`w-full pl-10 pr-4 py-3 bg-white/10 border rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 ${
                            errors.firstName ? 'border-red-500 shake' : 'border-white/20'
                          }`}
                          placeholder="John"
                        />
                      </div>
                      {errors.firstName && (
                        <p className="text-red-400 text-sm mt-1 flex items-center gap-1">
                          <AlertCircle className="w-4 h-4" />
                          {errors.firstName}
                        </p>
                      )}
                    </div>
                    
                    <div>
                      <label className="block text-white font-semibold mb-2">Last Name</label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                          type="text"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          maxLength="30"
                          className={`w-full pl-10 pr-4 py-3 bg-white/10 border rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 ${
                            errors.lastName ? 'border-red-500 shake' : 'border-white/20'
                          }`}
                          placeholder="Doe"
                        />
                      </div>
                      {errors.lastName && (
                        <p className="text-red-400 text-sm mt-1 flex items-center gap-1">
                          <AlertCircle className="w-4 h-4" />
                          {errors.lastName}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-white font-semibold mb-2">Email</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className={`w-full pl-10 pr-4 py-3 bg-white/10 border rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 ${
                          errors.email ? 'border-red-500 shake' : 'border-white/20'
                        }`}
                        placeholder="john@example.com"
                      />
                    </div>
                    {errors.email && (
                      <p className="text-red-400 text-sm mt-1 flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" />
                        {errors.email}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-white font-semibold mb-2">WhatsApp Number</label>
                    <div className="flex gap-2">
                      <div className="w-32">
                        <select
                          name="countryCode"
                          value={formData.countryCode}
                          onChange={handleInputChange}
                          className="w-full py-3 px-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-all duration-300 appearance-none"
                        >
                          {countryCodes.map((country) => (
                            <option key={country.code} value={country.code} className="bg-gray-800">
                              {country.flag} {country.code}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="flex-1 relative">
                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                          type="tel"
                          name="whatsappNumber"
                          value={formData.whatsappNumber}
                          onChange={(e) => {
                            const value = e.target.value.replace(/\D/g, '').slice(0, 15);
                            handleInputChange({ target: { name: 'whatsappNumber', value } });
                          }}
                          maxLength="15"
                          className={`w-full pl-10 pr-4 py-3 bg-white/10 border rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 ${
                            errors.whatsappNumber ? 'border-red-500 shake' : 'border-white/20'
                          }`}
                          placeholder="1234567890"
                        />
                      </div>
                    </div>
                    {errors.whatsappNumber && (
                      <p className="text-red-400 text-sm mt-1 flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" />
                        {errors.whatsappNumber}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-white font-semibold mb-2">Username</label>
                    <div className="relative">
                      <UserCheck className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleInputChange}
                        maxLength="20"
                        className={`w-full pl-10 pr-4 py-3 bg-white/10 border rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 ${
                          errors.username ? 'border-red-500 shake' : 'border-white/20'
                        }`}
                        placeholder="johndoe"
                      />
                    </div>
                    {errors.username && (
                      <p className="text-red-400 text-sm mt-1 flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" />
                        {errors.username}
                      </p>
                    )}
                  </div>
                  
                </div>
              )}

              {authMode === 'signin' && (
                <div>
                  <label className="block text-white font-semibold mb-2">Username</label>
                  <div className="relative">
                    <UserCheck className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      name="username"
                      value={formData.username}
                      onChange={handleInputChange}
                      maxLength="20"
                      className={`w-full pl-10 pr-4 py-3 bg-white/10 border rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 ${
                        errors.username ? 'border-red-500 shake' : 'border-white/20'
                      }`}
                      placeholder="johndoe"
                    />
                  </div>
                  {errors.username && (
                    <p className="text-red-400 text-sm mt-1 flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" />
                      {errors.username}
                    </p>
                  )}
                </div>
              )}

              <div>
                <label className="block text-white font-semibold mb-2">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                      className={`w-full pl-10 pr-12 py-3 bg-white/10 border rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 ${
                        errors.password ? 'border-red-500 shake' : 'border-white/20'
                      }`}
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-red-400 text-sm mt-1 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.password}
                  </p>
                )}
              </div>

              {authMode === 'signup' && (
                <div>
                  <label className="block text-white font-semibold mb-2">Confirm Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="password"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      className={`w-full pl-10 pr-4 py-3 bg-white/10 border rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 ${
                        errors.confirmPassword ? 'border-red-500 shake' : 'border-white/20'
                      }`}
                      placeholder="••••••••"
                    />
                  </div>
                  {errors.confirmPassword && (
                    <p className="text-red-400 text-sm mt-1 flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" />
                      {errors.confirmPassword}
                    </p>
                  )}
                </div>
              )}

              {error && (
                <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 flex items-center gap-3">
                  <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
                  <p className="text-red-400 text-sm">{error}</p>
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 font-bold text-lg shadow-lg hover:shadow-blue-500/50 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-3"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>Processing...</span>
                  </>
                ) : (
                  <>
                    <span>
                      {authMode === 'signup' ? 'Let\'s Get Started' : 'Let\'s Continue'}
                    </span>
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </form>
          )}

          <div className="mt-6 text-center">
            {authMode !== 'reset' && (
              <>
                <p className="text-gray-300">
                  {authMode === 'signup' ? 'Already have an account?' : "Don't have an account?"}
                  <Link
                    to={authMode === 'signup' ? '/auth?mode=login' : '/auth?mode=register'}
                    className="ml-2 text-white hover:text-gray-200 font-semibold transition-colors underline"
                  >
                    {authMode === 'signup' ? 'Sign in' : 'Sign up'}
                  </Link>
                </p>
                {authMode === 'signin' && (
                  <button
                    onClick={() => setMode('reset')}
                    className="mt-2 text-sm text-gray-400 hover:text-gray-300 transition-colors"
                  >
                    Forgot Username or Password? Reset Here
                  </button>
                )}
              </>
            )}
          </div>

          {/* Features */}
          {authMode !== 'reset' && (
            <div className="mt-6 grid grid-cols-3 gap-4 text-center">
              <div className="bg-white/5 backdrop-blur-md rounded-xl p-4 border border-white/10 hover:bg-white/10 transition-all duration-300">
                <Heart className="w-6 h-6 text-pink-400 mx-auto mb-2" />
                <p className="text-white text-sm font-semibold">AI Matching</p>
              </div>
              <div className="bg-white/5 backdrop-blur-md rounded-xl p-4 border border-white/10 hover:bg-white/10 transition-all duration-300">
                <Sparkles className="w-6 h-6 text-purple-400 mx-auto mb-2" />
                <p className="text-white text-sm font-semibold">Pitch Based</p>
              </div>
              <div className="bg-white/5 backdrop-blur-md rounded-xl p-4 border border-white/10 hover:bg-white/10 transition-all duration-300">
                <Crown className="w-6 h-6 text-yellow-400 mx-auto mb-2" />
                <p className="text-white text-sm font-semibold">Startup Ready</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Auth;