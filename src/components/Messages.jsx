import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { 
  Send, 
  Search, 
  MoreVertical, 
  Phone, 
  Video, 
  Paperclip, 
  Smile, 
  ArrowLeft,
  Check,
  CheckCheck,
  Clock,
  User,
  Circle,
  Image,
  File,
  Mic,
  X,
  Reply,
  Forward,
  Star,
  Copy,
  Trash2,
  Pin,
  Edit2,
  Heart,
  ThumbsUp,
  Zap,
  Info,
  Shield,
  MessageSquare,
  Loader2,
  ChevronDown,
  Plus
} from 'lucide-react';

const Messages = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const messagesEndRef = useRef(null);
  const textareaRef = useRef(null);
  const fileInputRef = useRef(null);
  
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [messageText, setMessageText] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [replyingTo, setReplyingTo] = useState(null);
  const [hoveredMessage, setHoveredMessage] = useState(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [showMessageMenu, setShowMessageMenu] = useState(null);

  // Mock conversations data
  const conversations = [
    {
      id: 1,
      name: 'Dr. Michael Chen',
      role: 'Medical Co-founder & Product Lead',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
      lastMessage: "I'm really impressed with your HealthConnect idea!",
      timestamp: '2 min ago',
      unread: 2,
      online: true,
      matchId: 2
    },
    {
      id: 2,
      name: 'Sarah Martinez',
      role: 'Technical Co-founder',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face',
      lastMessage: "Let's schedule a call to discuss the partnership",
      timestamp: '1 hour ago',
      unread: 0,
      online: true,
      matchId: 1
    },
    {
      id: 3,
      name: 'Anonymous',
      role: '5+ years in AI/ML development',
      avatar: null,
      lastMessage: "Your pitch looks interesting. Tell me more about the tech stack",
      timestamp: '3 hours ago',
      unread: 1,
      online: false,
      matchId: 3
    }
  ];

  // Mock messages data with reactions, replies, and more
  const messagesData = {
    1: [
      {
        id: 1,
        senderId: 1,
        text: "I'm really impressed with your HealthConnect idea! I have 10+ years in healthcare technology and think our platforms could complement each other perfectly.",
        timestamp: '10:30 AM',
        status: 'read',
        reactions: [{ emoji: '👍', count: 1, userReacted: false }],
        isStarred: false,
        isPinned: false
      },
      {
        id: 2,
        senderId: 'me',
        text: "Thank you! I'd love to hear more about your experience. What specific areas of healthcare tech have you worked in?",
        timestamp: '10:32 AM',
        status: 'read',
        reactions: [],
        isStarred: false,
        isPinned: false
      },
      {
        id: 3,
        senderId: 1,
        text: "I've built telemedicine platforms at two previous startups - MedTech Innovations and CareConnect. Both had successful exits. I'm particularly strong in clinical operations and product strategy.",
        timestamp: '10:35 AM',
        status: 'read',
        reactions: [{ emoji: '🔥', count: 1, userReacted: true }],
        isStarred: true,
        isPinned: false
      },
      {
        id: 4,
        senderId: 'me',
        text: "That's exactly the expertise we need! How do you feel about the AI-powered matching component?",
        timestamp: '10:38 AM',
        status: 'delivered',
        reactions: [],
        isStarred: false,
        isPinned: false,
        replyTo: { id: 3, text: "I've built telemedicine platforms at two previous startups..." }
      },
      {
        id: 5,
        senderId: 1,
        text: "I love it! I actually published research on medical AI at Stanford. The matching algorithm could be a real differentiator.",
        timestamp: '10:40 AM',
        status: 'delivered',
        reactions: [{ emoji: '❤️', count: 1, userReacted: false }],
        isStarred: false,
        isPinned: false
      }
    ],
    2: [
      {
        id: 1,
        senderId: 2,
        text: "Hi! I love your EcoTrack AI concept. I have 7+ years in sustainability tech.",
        timestamp: '9:15 AM',
        status: 'read',
        reactions: [],
        isStarred: false,
        isPinned: false
      },
      {
        id: 2,
        senderId: 'me',
        text: "Thanks Sarah! Your background in sustainability is impressive. What made you interested in this project?",
        timestamp: '9:20 AM',
        status: 'read',
        reactions: [],
        isStarred: false,
        isPinned: false
      },
      {
        id: 3,
        senderId: 2,
        text: "I think carbon tracking is the future. Companies need better tools to meet their climate goals. Let's schedule a call to discuss the partnership",
        timestamp: '9:25 AM',
        status: 'read',
        reactions: [],
        isStarred: false,
        isPinned: false
      }
    ],
    3: [
      {
        id: 1,
        senderId: 3,
        text: "Your pitch looks interesting. Tell me more about the tech stack",
        timestamp: 'Yesterday',
        status: 'read',
        reactions: [],
        isStarred: false,
        isPinned: false
      }
    ]
  };

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
    }
  }, [messageText]);

  // Simulate typing indicator
  useEffect(() => {
    if (selectedConversation && Math.random() > 0.7) {
      const timer = setTimeout(() => {
        setIsTyping(true);
        setTimeout(() => setIsTyping(false), 3000);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [selectedConversation]);

  const quickReactions = ['❤️', '👍', '😊', '🔥', '🎉', '👏'];

  const handleReaction = (messageId, emoji) => {
    console.log('Adding reaction:', emoji, 'to message:', messageId);
    // TODO: Implement actual reaction logic
  };

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files);
    setSelectedFiles(files);
  };

  const handlePaste = (e) => {
    const items = e.clipboardData?.items;
    if (items) {
      for (let i = 0; i < items.length; i++) {
        if (items[i].type.indexOf('image') !== -1) {
          const blob = items[i].getAsFile();
          setSelectedFiles(prev => [...prev, blob]);
        }
      }
    }
  };

  useEffect(() => {
    // Check if there's a matchId in URL params to auto-open a conversation
    const matchId = searchParams.get('matchId');
    if (matchId) {
      const conversation = conversations.find(c => c.matchId === parseInt(matchId));
      if (conversation) {
        setSelectedConversation(conversation);
      }
    }
  }, [searchParams]);

  useEffect(() => {
    // Scroll to bottom when messages change
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [selectedConversation]);

  const handleSendMessage = () => {
    if (!messageText.trim() && selectedFiles.length === 0) return;
    
    // TODO: Implement actual message sending with optimistic UI
    setMessageText('');
    setSelectedFiles([]);
    setReplyingTo(null);
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey && !e.ctrlKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const filteredConversations = conversations.filter(conv => 
    conv.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    conv.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const MessageStatus = ({ status }) => {
    if (status === 'read') return <CheckCheck className="w-3.5 h-3.5 text-blue-500" />;
    if (status === 'delivered') return <CheckCheck className="w-3.5 h-3.5 text-gray-400" />;
    if (status === 'sent') return <Check className="w-3.5 h-3.5 text-gray-400" />;
    return <Clock className="w-3.5 h-3.5 text-gray-400" />;
  };

  const MessageBubble = ({ message, isOwn, isGrouped }) => (
    <div
      className={`group flex gap-2 ${isOwn ? 'flex-row-reverse' : 'flex-row'} relative`}
      onMouseEnter={() => setHoveredMessage(message.id)}
      onMouseLeave={() => setHoveredMessage(null)}
    >
      {/* Avatar for received messages */}
      {!isOwn && !isGrouped && (
        <div className="flex-shrink-0 mt-auto w-8">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
            {selectedConversation.avatar ? (
              <img src={selectedConversation.avatar} alt="" className="w-full h-full rounded-full object-cover" />
            ) : (
              <User className="w-4 h-4 text-gray-600" />
            )}
          </div>
        </div>
      )}
      {!isOwn && isGrouped && <div className="flex-shrink-0 w-8" />}

      <div className={`flex flex-col ${isOwn ? 'items-end' : 'items-start'} max-w-[70%] min-w-[120px]`}>
        {/* Reply reference */}
        {message.replyTo && (
          <div className={`mb-1 px-3 py-1.5 rounded-xl text-xs border ${
            isOwn 
              ? 'bg-gray-800/10 border-gray-800/20' 
              : 'bg-white/70 border-gray-200'
          }`}>
            <p className={`font-semibold mb-0.5 text-xs ${isOwn ? 'text-gray-700' : 'text-gray-600'}`}>
              Replying to
            </p>
            <p className={`truncate text-xs ${isOwn ? 'text-gray-600' : 'text-gray-500'}`}>
              {message.replyTo.text}
            </p>
          </div>
        )}

        {/* Message bubble */}
        <div className="relative group/bubble w-full">
          <div
            className={`px-4 py-2.5 shadow-sm transition-all duration-200 ${
              isOwn
                ? 'bg-gray-900 text-white rounded-2xl rounded-br-md hover:shadow-md'
                : 'bg-white text-gray-900 border border-gray-200 rounded-2xl rounded-bl-md hover:shadow-md hover:border-gray-300'
            }`}
          >
            <p className={`text-[15px] leading-relaxed whitespace-pre-wrap break-words ${
              isOwn ? 'text-white' : 'text-gray-900'
            }`}>{message.text}</p>
            
            {/* Reactions */}
            {message.reactions && message.reactions.length > 0 && (
              <div className="flex gap-1 mt-2 flex-wrap">
                {message.reactions.map((reaction, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleReaction(message.id, reaction.emoji)}
                    className={`px-2 py-0.5 rounded-full text-xs flex items-center gap-1 transition-all ${
                      reaction.userReacted
                        ? 'bg-blue-100 border border-blue-300 scale-105'
                        : isOwn
                        ? 'bg-gray-800 border border-gray-700 hover:bg-gray-700'
                        : 'bg-gray-100 border border-gray-200 hover:bg-gray-200'
                    }`}
                  >
                    <span>{reaction.emoji}</span>
                    {reaction.count > 1 && (
                      <span className={`font-medium ${reaction.userReacted ? 'text-blue-700' : isOwn ? 'text-white' : 'text-gray-600'}`}>
                        {reaction.count}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Quick reaction picker on hover */}
          {hoveredMessage === message.id && (
            <div className={`absolute ${isOwn ? 'left-0' : 'right-0'} -top-10 flex gap-1 bg-white rounded-full shadow-xl border border-gray-200 px-2 py-1.5 opacity-0 group-hover/bubble:opacity-100 transition-all z-20 scale-90 group-hover/bubble:scale-100`}>
              {quickReactions.map((emoji) => (
                <button
                  key={emoji}
                  onClick={() => handleReaction(message.id, emoji)}
                  className="hover:scale-125 transition-transform text-lg p-1 rounded-full hover:bg-gray-100"
                >
                  {emoji}
                </button>
              ))}
              <div className="w-px bg-gray-200 mx-1"></div>
              <button
                onClick={() => setReplyingTo(message)}
                className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
                title="Reply"
              >
                <Reply className="w-4 h-4 text-gray-600" />
              </button>
              <button
                onClick={() => setShowMessageMenu(message.id)}
                className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
                title="More"
              >
                <MoreVertical className="w-4 h-4 text-gray-600" />
              </button>
            </div>
          )}
        </div>

        {/* Message metadata */}
        <div className={`flex items-center gap-1.5 mt-0.5 px-2 ${isOwn ? 'flex-row-reverse' : 'flex-row'}`}>
          <span className="text-[11px] text-gray-500 font-medium">{message.timestamp}</span>
          {message.isStarred && <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />}
          {isOwn && <MessageStatus status={message.status} />}
        </div>
      </div>
    </div>
  );

  const TypingIndicator = () => (
    <div className="flex gap-2 mb-4">
      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center flex-shrink-0">
        {selectedConversation.avatar ? (
          <img src={selectedConversation.avatar} alt="" className="w-full h-full rounded-full object-cover" />
        ) : (
          <User className="w-4 h-4 text-gray-600" />
        )}
      </div>
      <div className="bg-white border border-gray-200 rounded-2xl rounded-bl-md px-4 py-3 shadow-sm">
        <div className="flex gap-1">
          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200" style={{ height: 'calc(100vh - 140px)' }}>
          <div className="flex h-full">
            {/* Sidebar - Conversations List */}
            <div className={`${selectedConversation ? 'hidden md:flex' : 'flex'} flex-col w-full md:w-96 border-r border-gray-200`}>
              {/* Sidebar Header */}
              <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white">
                <div className="flex items-center justify-between mb-4">
                  <h1 className="text-2xl font-bold text-gray-900">Messages</h1>
                  <button
                    onClick={() => navigate('/my-pitches')}
                    className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
                  >
                    <MoreVertical className="w-5 h-5 text-gray-600" />
                  </button>
                </div>
                
                {/* Search */}
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search conversations..."
                    className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-gray-900 focus:border-gray-900 text-gray-900"
                  />
                </div>
              </div>

              {/* Conversations List */}
              <div className="flex-1 overflow-y-auto">
                {filteredConversations.map((conversation) => (
                  <button
                    key={conversation.id}
                    onClick={() => setSelectedConversation(conversation)}
                    className={`w-full p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors text-left ${
                      selectedConversation?.id === conversation.id ? 'bg-gray-100' : ''
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      {/* Avatar */}
                      <div className="relative flex-shrink-0">
                        {conversation.avatar ? (
                          <img
                            src={conversation.avatar}
                            alt={conversation.name}
                            className="w-12 h-12 rounded-full object-cover ring-2 ring-gray-200"
                          />
                        ) : (
                          <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center ring-2 ring-gray-300">
                            <User className="w-6 h-6 text-gray-600" />
                          </div>
                        )}
                        {conversation.online && (
                          <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                        )}
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-1">
                          <h3 className="font-bold text-gray-900 truncate">{conversation.name}</h3>
                          <span className="text-xs text-gray-500 flex-shrink-0 ml-2">{conversation.timestamp}</span>
                        </div>
                        <p className="text-sm text-gray-600 mb-1 truncate">{conversation.role}</p>
                        <div className="flex items-center justify-between">
                          <p className="text-sm text-gray-500 truncate flex-1">{conversation.lastMessage}</p>
                          {conversation.unread > 0 && (
                            <span className="ml-2 px-2 py-0.5 bg-gray-900 text-white rounded-full text-xs font-bold flex-shrink-0">
                              {conversation.unread}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Chat Area */}
            {selectedConversation ? (
              <div className="flex flex-col flex-1">
                {/* Chat Header */}
                <div className="p-4 border-b border-gray-200 bg-white">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => setSelectedConversation(null)}
                        className="md:hidden p-2 hover:bg-gray-100 rounded-xl transition-colors"
                      >
                        <ArrowLeft className="w-5 h-5 text-gray-600" />
                      </button>
                      
                      <div className="relative">
                        {selectedConversation.avatar ? (
                          <img
                            src={selectedConversation.avatar}
                            alt={selectedConversation.name}
                            className="w-10 h-10 rounded-full object-cover ring-2 ring-gray-200"
                          />
                        ) : (
                          <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center ring-2 ring-gray-300">
                            <User className="w-5 h-5 text-gray-600" />
                          </div>
                        )}
                        {selectedConversation.online && (
                          <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                        )}
                      </div>
                      
                      <div>
                        <h2 className="font-bold text-gray-900">{selectedConversation.name}</h2>
                        <p className="text-xs text-gray-600">{selectedConversation.online ? 'Online' : 'Offline'}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button className="p-2 hover:bg-gray-100 rounded-xl transition-colors">
                        <Phone className="w-5 h-5 text-gray-600" />
                      </button>
                      <button className="p-2 hover:bg-gray-100 rounded-xl transition-colors">
                        <Video className="w-5 h-5 text-gray-600" />
                      </button>
                      <button className="p-2 hover:bg-gray-100 rounded-xl transition-colors">
                        <MoreVertical className="w-5 h-5 text-gray-600" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Messages Area */}
                <div className="flex-1 overflow-y-auto p-6 bg-gradient-to-b from-gray-50 to-gray-100/50">
                  {/* Date separator */}
                  <div className="flex items-center justify-center my-6">
                    <div className="px-4 py-1.5 bg-white rounded-full shadow-sm border border-gray-200">
                      <span className="text-xs font-semibold text-gray-600">Today</span>
                    </div>
                  </div>

                  <div className="space-y-0.5">
                    {messagesData[selectedConversation.id]?.map((message, index) => {
                      const prevMessage = messagesData[selectedConversation.id]?.[index - 1];
                      const isGrouped = prevMessage && prevMessage.senderId === message.senderId;
                      
                      return (
                        <div key={message.id}>
                          {!isGrouped && <div className="h-4"></div>}
                          <MessageBubble
                            message={message}
                            isOwn={message.senderId === 'me'}
                            isGrouped={isGrouped}
                          />
                        </div>
                      );
                    })}
                    {isTyping && <TypingIndicator />}
                    <div ref={messagesEndRef} />
                  </div>
                </div>

                {/* Message Input Area */}
                <div className="border-t border-gray-200 bg-white">
                  {/* Reply preview */}
                  {replyingTo && (
                    <div className="px-6 pt-3 pb-2 border-b border-gray-100">
                      <div className="flex items-center justify-between bg-gray-50 rounded-xl p-3 border-l-4 border-gray-900">
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-semibold text-gray-600 mb-1">Replying to</p>
                          <p className="text-sm text-gray-700 truncate">{replyingTo.text}</p>
                        </div>
                        <button
                          onClick={() => setReplyingTo(null)}
                          className="p-1.5 hover:bg-gray-200 rounded-lg transition-colors ml-2"
                        >
                          <X className="w-4 h-4 text-gray-600" />
                        </button>
                      </div>
                    </div>
                  )}

                  {/* File previews */}
                  {selectedFiles.length > 0 && (
                    <div className="px-6 pt-3 pb-2 border-b border-gray-100">
                      <div className="flex gap-2 flex-wrap">
                        {selectedFiles.map((file, idx) => (
                          <div key={idx} className="relative bg-gray-100 rounded-xl p-2 flex items-center gap-2">
                            <File className="w-4 h-4 text-gray-600" />
                            <span className="text-sm text-gray-700 truncate max-w-[200px]">{file.name}</span>
                            <button
                              onClick={() => setSelectedFiles(selectedFiles.filter((_, i) => i !== idx))}
                              className="p-1 hover:bg-gray-200 rounded-full transition-colors"
                            >
                              <X className="w-3 h-3 text-gray-600" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="p-4">
                    <div className="flex items-end gap-3">
                      {/* Action buttons */}
                      <div className="flex gap-1">
                        <button
                          onClick={() => fileInputRef.current?.click()}
                          className="p-2.5 hover:bg-gray-100 rounded-xl transition-colors flex-shrink-0"
                          title="Attach file"
                        >
                          <Paperclip className="w-5 h-5 text-gray-600" />
                        </button>
                        <input
                          ref={fileInputRef}
                          type="file"
                          multiple
                          onChange={handleFileSelect}
                          className="hidden"
                        />
                        <button
                          className="p-2.5 hover:bg-gray-100 rounded-xl transition-colors flex-shrink-0"
                          title="Attach image"
                        >
                          <Image className="w-5 h-5 text-gray-600" />
                        </button>
                      </div>
                      
                      {/* Message input */}
                      <div className="flex-1 relative bg-gray-50 rounded-2xl border border-gray-200 focus-within:border-gray-900 focus-within:ring-2 focus-within:ring-gray-900/10 transition-all">
                        <textarea
                          ref={textareaRef}
                          value={messageText}
                          onChange={(e) => setMessageText(e.target.value)}
                          onKeyPress={handleKeyPress}
                          onPaste={handlePaste}
                          placeholder="Type a message..."
                          rows={1}
                          className="w-full px-4 py-3 pr-24 bg-transparent border-none focus:outline-none resize-none text-gray-900 placeholder-gray-500"
                          style={{ minHeight: '48px', maxHeight: '120px' }}
                        />
                        <div className="absolute right-2 bottom-2 flex items-center gap-1">
                          <button
                            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                            className="p-1.5 hover:bg-gray-200 rounded-lg transition-colors"
                          >
                            <Smile className="w-5 h-5 text-gray-600" />
                          </button>
                          {messageText && (
                            <button
                              onClick={handleSendMessage}
                              disabled={!messageText.trim() && selectedFiles.length === 0}
                              className="p-1.5 bg-gray-900 text-white rounded-lg hover:bg-black transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              <Send className="w-5 h-5" />
                            </button>
                          )}
                        </div>
                      </div>

                      {/* Voice message */}
                      {!messageText && (
                        <button
                          onMouseDown={() => setIsRecording(true)}
                          onMouseUp={() => setIsRecording(false)}
                          onMouseLeave={() => setIsRecording(false)}
                          className={`p-3 rounded-xl transition-all flex-shrink-0 ${
                            isRecording
                              ? 'bg-red-500 text-white scale-110'
                              : 'bg-gray-900 text-white hover:bg-black'
                          }`}
                          title="Hold to record voice message"
                        >
                          <Mic className="w-5 h-5" />
                        </button>
                      )}
                    </div>
                    <p className="text-xs text-gray-500 mt-2 pl-2">
                      Press Enter to send • Shift+Enter for new line
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="hidden md:flex flex-1 items-center justify-center bg-gray-50">
                <div className="text-center">
                  <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Send className="w-10 h-10 text-gray-400" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Select a conversation</h3>
                  <p className="text-gray-600">Choose a conversation from the list to start messaging</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Messages;
