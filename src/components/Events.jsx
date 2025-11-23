import React, { useState, useEffect } from 'react';
import {
  Calendar,
  MapPin,
  Clock,
  Users,
  DollarSign,
  Tag,
  Search,
  Filter,
  Plus,
  Edit,
  Trash2,
  X,
  Check,
  Star,
  Share2,
  ExternalLink,
  ChevronRight,
  ChevronDown,
  Building,
  Globe,
  Mail,
  Phone,
  Linkedin,
  Twitter,
  Image as ImageIcon,
  Video,
  FileText,
  Download,
  Upload,
  Eye,
  EyeOff,
  Bell,
  BellOff
} from 'lucide-react';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const eventTypes = [
  { id: 'pitch', label: 'Pitch Event', icon: '🎤' },
  { id: 'networking', label: 'Networking', icon: '🤝' },
  { id: 'workshop', label: 'Workshop', icon: '📚' },
  { id: 'conference', label: 'Conference', icon: '🎯' },
  { id: 'demo-day', label: 'Demo Day', icon: '🚀' },
  { id: 'meetup', label: 'Meetup', icon: '☕' },
  { id: 'hackathon', label: 'Hackathon', icon: '💻' },
  { id: 'webinar', label: 'Webinar', icon: '💡' }
];

const eventCategories = [
  { id: 'tech', label: 'Technology' },
  { id: 'startup', label: 'Startup' },
  { id: 'fundraising', label: 'Fundraising' },
  { id: 'marketing', label: 'Marketing' },
  { id: 'product', label: 'Product' },
  { id: 'design', label: 'Design' },
  { id: 'business', label: 'Business' }
];

const priceRanges = [
  { id: 'free', label: 'Free' },
  { id: 'paid', label: 'Paid' },
  { id: 'donation', label: 'Donation Based' }
];

const generateDummyEvents = () => {
  const today = new Date();
  const nextWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
  const nextMonth = new Date(today.getTime() + 30 * 24 * 60 * 60 * 1000);

  return [
    {
      id: 1,
      title: 'Startup Pitch Night',
      type: 'pitch',
      category: 'startup',
      description: 'Join us for an evening of startup pitches. Network with founders, investors, and entrepreneurs.',
      date: nextWeek.toISOString().split('T')[0],
      time: '18:00',
      endTime: '21:00',
      location: 'Tech Hub San Francisco',
      address: '123 Market St, San Francisco, CA 94105',
      price: 'paid',
      priceAmount: 25,
      capacity: 100,
      registered: 45,
      image: null,
      tags: ['Pitch', 'Networking', 'Startups'],
      organizer: 'TechVentures',
      organizerEmail: 'events@techventures.com',
      organizerPhone: '+1 (555) 123-4567',
      website: 'https://techventures.com',
      isFeatured: true,
      isPublic: true,
      userId: 1,
      createdAt: today.toISOString()
    },
    {
      id: 2,
      title: 'AI & ML Workshop',
      type: 'workshop',
      category: 'tech',
      description: 'Learn the fundamentals of AI and Machine Learning. Hands-on session with industry experts.',
      date: nextMonth.toISOString().split('T')[0],
      time: '10:00',
      endTime: '16:00',
      location: 'Innovation Center',
      address: '456 Innovation Way, Palo Alto, CA 94301',
      price: 'paid',
      priceAmount: 150,
      capacity: 50,
      registered: 32,
      image: null,
      tags: ['AI', 'ML', 'Workshop'],
      organizer: 'AI Academy',
      organizerEmail: 'workshops@aiacademy.com',
      website: 'https://aiacademy.com',
      isFeatured: false,
      isPublic: true,
      userId: 1,
      createdAt: today.toISOString()
    },
    {
      id: 3,
      title: 'Founder Networking Mixer',
      type: 'networking',
      category: 'startup',
      description: 'Casual networking event for founders and entrepreneurs. Drinks and conversations.',
      date: nextWeek.toISOString().split('T')[0],
      time: '19:00',
      endTime: '22:00',
      location: 'The Foundry',
      address: '789 Startup Blvd, San Francisco, CA 94102',
      price: 'free',
      priceAmount: 0,
      capacity: 80,
      registered: 67,
      image: null,
      tags: ['Networking', 'Founders'],
      organizer: 'Founder Network',
      organizerEmail: 'hello@foundernetwork.com',
      isFeatured: true,
      isPublic: true,
      userId: 1,
      createdAt: today.toISOString()
    },
    {
      id: 4,
      title: 'Demoday',
      type: 'demo-day',
      category: 'startup',
      description: 'Showcase your startup to investors and get feedback from industry leaders.',
      date: new Date('2025-11-30').toISOString().split('T')[0],
      time: '14:00',
      endTime: '18:00',
      location: 'Venture Capital Hub',
      address: '321 VC Street, San Francisco, CA 94103',
      price: 'paid',
      priceAmount: 50,
      capacity: 200,
      registered: 156,
      image: null,
      tags: ['Demo Day', 'Investors'],
      organizer: 'Demo Day Events',
      organizerEmail: 'info@demoday.com',
      isFeatured: false,
      isPublic: true,
      userId: 1,
      createdAt: today.toISOString()
    }
  ];
};

const Events = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [filterPrice, setFilterPrice] = useState('');
  const [filterStatus, setFilterStatus] = useState('upcoming');
  const [viewMode, setViewMode] = useState('all');
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    fetchEvents();
  }, [filterType, filterCategory, filterPrice, filterStatus, searchQuery]);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const params = new URLSearchParams();
      if (filterType) params.append('type', filterType);
      if (filterCategory) params.append('category', filterCategory);
      if (filterPrice) params.append('price', filterPrice);
      if (filterStatus) params.append('status', filterStatus);
      if (searchQuery) params.append('search', searchQuery);

      const response = await fetch(`${API_BASE_URL}/events?${params}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setEvents(data.events || []);
      } else {
        let dummyData = generateDummyEvents();
        if (filterType) dummyData = dummyData.filter(e => e.type === filterType);
        if (filterCategory) dummyData = dummyData.filter(e => e.category === filterCategory);
        if (filterPrice) dummyData = dummyData.filter(e => e.price === filterPrice);
        if (searchQuery) {
          const query = searchQuery.toLowerCase();
          dummyData = dummyData.filter(e => 
            e.title.toLowerCase().includes(query) ||
            e.description?.toLowerCase().includes(query) ||
            e.tags?.some(tag => tag.toLowerCase().includes(query))
          );
        }
        setEvents(dummyData);
      }
    } catch (error) {
      console.error('Error fetching events:', error);
      setEvents(generateDummyEvents());
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this event?')) return;

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE_URL}/events/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        fetchEvents();
      } else {
        setEvents(events.filter(e => e.id !== id));
      }
    } catch (error) {
      console.error('Error deleting event:', error);
      setEvents(events.filter(e => e.id !== id));
    }
  };

  const handleRegister = async (eventId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE_URL}/events/${eventId}/register`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        fetchEvents();
      }
    } catch (error) {
      console.error('Error registering for event:', error);
    }
  };

  const getFeaturedEvents = () => events.filter(e => e.isFeatured);
  const getMyEvents = () => events.filter(e => e.userId === 1);
  const getAllEvents = () => events;

  const displayedEvents = viewMode === 'featured' 
    ? getFeaturedEvents() 
    : viewMode === 'my' 
    ? getMyEvents() 
    : getAllEvents();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-6">
        <div className="flex items-center justify-end mb-6">
          <button
            onClick={() => {
              setEditingEvent(null);
              setShowForm(true);
            }}
            className="flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-xl hover:bg-gray-800 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl"
          >
            <Plus className="w-5 h-5" />
            Add Your Event
          </button>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm mb-6">
          <div className="space-y-4">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none z-10" />
              <input
                type="text"
                placeholder="Search events by name, description, or tags..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-gray-900 transition-all bg-gray-50 hover:bg-white"
              />
            </div>
            <div className="flex flex-wrap gap-3">
              <div className="relative flex-1 min-w-[140px]">
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="appearance-none w-full px-4 py-3 pr-10 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-gray-900 transition-all bg-gray-50 hover:bg-white text-gray-700 font-medium cursor-pointer"
                >
                  <option value="">All Types</option>
                  {eventTypes.map(type => (
                    <option key={type.id} value={type.id}>{type.label}</option>
                  ))}
                </select>
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                  <ChevronDown className="w-5 h-5 text-gray-400" />
                </div>
              </div>
              <div className="relative flex-1 min-w-[140px]">
                <select
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                  className="appearance-none w-full px-4 py-3 pr-10 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-gray-900 transition-all bg-gray-50 hover:bg-white text-gray-700 font-medium cursor-pointer"
                >
                  <option value="">All Categories</option>
                  {eventCategories.map(cat => (
                    <option key={cat.id} value={cat.id}>{cat.label}</option>
                  ))}
                </select>
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                  <ChevronDown className="w-5 h-5 text-gray-400" />
                </div>
              </div>
              <div className="relative flex-1 min-w-[140px]">
                <select
                  value={filterPrice}
                  onChange={(e) => setFilterPrice(e.target.value)}
                  className="appearance-none w-full px-4 py-3 pr-10 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-gray-900 transition-all bg-gray-50 hover:bg-white text-gray-700 font-medium cursor-pointer"
                >
                  <option value="">All Prices</option>
                  {priceRanges.map(price => (
                    <option key={price.id} value={price.id}>{price.label}</option>
                  ))}
                </select>
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                  <ChevronDown className="w-5 h-5 text-gray-400" />
                </div>
              </div>
              <div className="relative flex-1 min-w-[140px]">
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="appearance-none w-full px-4 py-3 pr-10 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-gray-900 transition-all bg-gray-50 hover:bg-white text-gray-700 font-medium cursor-pointer"
                >
                  <option value="upcoming">Upcoming</option>
                  <option value="past">Past</option>
                  <option value="all">All</option>
                </select>
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                  <ChevronDown className="w-5 h-5 text-gray-400" />
                </div>
              </div>
              {(filterType || filterCategory || filterPrice || filterStatus !== 'upcoming' || searchQuery) && (
                <button
                  onClick={() => {
                    setFilterType('');
                    setFilterCategory('');
                    setFilterPrice('');
                    setFilterStatus('upcoming');
                    setSearchQuery('');
                  }}
                  className="px-4 py-3 border-2 border-gray-200 rounded-xl hover:bg-gray-50 transition-all text-gray-700 font-medium whitespace-nowrap"
                >
                  Clear Filters
                </button>
              )}
            </div>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading events...</p>
          </div>
        ) : (
          <div className="space-y-8">
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-gray-900">Featured Events</h2>
                <span className="text-gray-500">{getFeaturedEvents().length} events</span>
              </div>
              {getFeaturedEvents().length === 0 ? (
                <div className="bg-white rounded-2xl p-12 border border-gray-200 text-center">
                  <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-600">No featured events</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {getFeaturedEvents().map(event => (
                    <EventCard
                      key={event.id}
                      event={event}
                      onSelect={setSelectedEvent}
                      onEdit={() => {
                        setEditingEvent(event);
                        setShowForm(true);
                      }}
                      onDelete={handleDelete}
                      onRegister={handleRegister}
                    />
                  ))}
                </div>
              )}
            </div>

            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-gray-900">All Nearby Events</h2>
                <span className="text-gray-500">{getAllEvents().length} events found</span>
              </div>
              {getAllEvents().length === 0 ? (
                <div className="bg-white rounded-2xl p-12 border border-gray-200 text-center">
                  <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-600">No events found</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {getAllEvents().map(event => (
                    <EventCard
                      key={event.id}
                      event={event}
                      onSelect={setSelectedEvent}
                      onEdit={() => {
                        setEditingEvent(event);
                        setShowForm(true);
                      }}
                      onDelete={handleDelete}
                      onRegister={handleRegister}
                    />
                  ))}
                </div>
              )}
            </div>

            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-gray-900">Your Events</h2>
                <span className="text-gray-500">{getMyEvents().length} events</span>
              </div>
              {getMyEvents().length === 0 ? (
                <div className="bg-white rounded-2xl p-12 border border-gray-200 text-center">
                  <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-600 mb-4">You haven't created any events yet</p>
                  <button
                    onClick={() => {
                      setEditingEvent(null);
                      setShowForm(true);
                    }}
                    className="px-6 py-3 bg-gray-900 text-white rounded-xl hover:bg-gray-800 transition-all font-semibold"
                  >
                    Create Your First Event
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {getMyEvents().map(event => (
                    <EventCard
                      key={event.id}
                      event={event}
                      onSelect={setSelectedEvent}
                      onEdit={() => {
                        setEditingEvent(event);
                        setShowForm(true);
                      }}
                      onDelete={handleDelete}
                      onRegister={handleRegister}
                      isOwner={true}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {selectedEvent && (
          <EventDetailModal
            event={selectedEvent}
            onClose={() => setSelectedEvent(null)}
            onRegister={handleRegister}
          />
        )}

        {showForm && (
          <EventForm
            event={editingEvent}
            onClose={() => {
              setShowForm(false);
              setEditingEvent(null);
            }}
            onSave={() => {
              setShowForm(false);
              setEditingEvent(null);
              fetchEvents();
            }}
          />
        )}
      </div>
    </div>
  );
};

const EventCard = ({ event, onSelect, onEdit, onDelete, onRegister, isOwner = false }) => {
  const typeInfo = eventTypes.find(t => t.id === event.type) || eventTypes[0];
  const categoryInfo = eventCategories.find(c => c.id === event.category) || eventCategories[0];
  const eventDate = new Date(event.date);
  const isPast = eventDate < new Date();

  return (
    <div
      className="bg-white rounded-2xl border-2 border-gray-200 hover:border-gray-300 hover:shadow-xl transition-all duration-200 cursor-pointer overflow-hidden"
      onClick={() => onSelect(event)}
    >
      {event.isFeatured && (
        <div className="bg-gray-900 text-white px-4 py-2 text-xs font-semibold flex items-center gap-2">
          <Star className="w-4 h-4 fill-white" />
          Featured Event
        </div>
      )}
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center text-2xl">
              {typeInfo.icon}
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-gray-900 text-lg break-words">{event.title}</h3>
              <div className="flex items-center gap-2 mt-1">
                <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-lg text-xs font-medium">
                  {typeInfo.label}
                </span>
                <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-lg text-xs font-medium">
                  {categoryInfo.label}
                </span>
              </div>
            </div>
          </div>
          {isOwner && (
            <div className="flex gap-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onEdit();
                }}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <Edit className="w-4 h-4 text-gray-600" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(event.id);
                }}
                className="p-2 hover:bg-red-50 rounded-lg transition-colors"
              >
                <Trash2 className="w-4 h-4 text-red-600" />
              </button>
            </div>
          )}
        </div>

        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Calendar className="w-4 h-4 text-gray-400" />
            <span>{eventDate.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Clock className="w-4 h-4 text-gray-400" />
            <span>{event.time} - {event.endTime}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <MapPin className="w-4 h-4 text-gray-400" />
            <span className="break-words">{event.location}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Users className="w-4 h-4 text-gray-400" />
            <span>{event.registered || 0} / {event.capacity} registered</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <DollarSign className="w-4 h-4 text-gray-400" />
            <span>
              {event.price === 'free' ? 'Free' : event.price === 'paid' ? `$${event.priceAmount}` : 'Donation Based'}
            </span>
          </div>
        </div>

        {event.description && (
          <p className="text-sm text-gray-600 mb-4 line-clamp-2 break-words">{event.description}</p>
        )}

        {event.tags && event.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {event.tags.map((tag, index) => (
              <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 rounded-lg text-xs font-medium">
                {tag}
              </span>
            ))}
          </div>
        )}

        <div className="flex items-center gap-2 pt-4 border-t border-gray-100">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onRegister(event.id);
            }}
            disabled={isPast || (event.registered >= event.capacity)}
            className="flex-1 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isPast ? 'Past Event' : event.registered >= event.capacity ? 'Full' : 'Register'}
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onSelect(event);
            }}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium"
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

const EventDetailModal = ({ event, onClose, onRegister }) => {
  const typeInfo = eventTypes.find(t => t.id === event.type) || eventTypes[0];
  const categoryInfo = eventCategories.find(c => c.id === event.category) || eventCategories[0];
  const eventDate = new Date(event.date);
  const isPast = eventDate < new Date();

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between z-10">
          <h2 className="text-2xl font-bold text-gray-900">{event.title}</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-16 h-16 bg-gray-100 rounded-xl flex items-center justify-center text-3xl">
              {typeInfo.icon}
            </div>
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium">
                  {typeInfo.label}
                </span>
                <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium">
                  {categoryInfo.label}
                </span>
              </div>
              {event.isFeatured && (
                <div className="flex items-center gap-1 text-sm text-gray-600">
                  <Star className="w-4 h-4 fill-gray-600 text-gray-600" />
                  <span>Featured Event</span>
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-xs font-semibold text-gray-500 uppercase mb-1">Date</div>
              <div className="flex items-center gap-2 text-gray-900">
                <Calendar className="w-4 h-4 text-gray-400" />
                {eventDate.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
              </div>
            </div>
            <div>
              <div className="text-xs font-semibold text-gray-500 uppercase mb-1">Time</div>
              <div className="flex items-center gap-2 text-gray-900">
                <Clock className="w-4 h-4 text-gray-400" />
                {event.time} - {event.endTime}
              </div>
            </div>
            <div>
              <div className="text-xs font-semibold text-gray-500 uppercase mb-1">Location</div>
              <div className="flex items-center gap-2 text-gray-900">
                <MapPin className="w-4 h-4 text-gray-400" />
                {event.location}
              </div>
            </div>
            <div>
              <div className="text-xs font-semibold text-gray-500 uppercase mb-1">Price</div>
              <div className="flex items-center gap-2 text-gray-900">
                <DollarSign className="w-4 h-4 text-gray-400" />
                {event.price === 'free' ? 'Free' : event.price === 'paid' ? `$${event.priceAmount}` : 'Donation Based'}
              </div>
            </div>
            <div>
              <div className="text-xs font-semibold text-gray-500 uppercase mb-1">Capacity</div>
              <div className="flex items-center gap-2 text-gray-900">
                <Users className="w-4 h-4 text-gray-400" />
                {event.registered || 0} / {event.capacity} registered
              </div>
            </div>
          </div>

          {event.description && (
            <div>
              <div className="text-xs font-semibold text-gray-500 uppercase mb-2">Description</div>
              <p className="text-gray-700 leading-relaxed">{event.description}</p>
            </div>
          )}

          {event.address && (
            <div>
              <div className="text-xs font-semibold text-gray-500 uppercase mb-1">Address</div>
              <p className="text-gray-700">{event.address}</p>
            </div>
          )}

          {event.tags && event.tags.length > 0 && (
            <div>
              <div className="text-xs font-semibold text-gray-500 uppercase mb-2">Tags</div>
              <div className="flex flex-wrap gap-2">
                {event.tags.map((tag, index) => (
                  <span key={index} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div>
            <div className="text-xs font-semibold text-gray-500 uppercase mb-2">Organizer</div>
            <div className="space-y-2">
              <div className="font-semibold text-gray-900">{event.organizer}</div>
              {event.organizerEmail && (
                <div className="flex items-center gap-2 text-gray-600">
                  <Mail className="w-4 h-4" />
                  {event.organizerEmail}
                </div>
              )}
              {event.organizerPhone && (
                <div className="flex items-center gap-2 text-gray-600">
                  <Phone className="w-4 h-4" />
                  {event.organizerPhone}
                </div>
              )}
              {event.website && (
                <a
                  href={event.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
                >
                  <Globe className="w-4 h-4" />
                  {event.website}
                  <ExternalLink className="w-3 h-3" />
                </a>
              )}
            </div>
          </div>

          <div className="flex items-center gap-4 pt-4 border-t border-gray-200">
            <button
              onClick={() => onRegister(event.id)}
              disabled={isPast || (event.registered >= event.capacity)}
              className="flex-1 px-6 py-3 bg-gray-900 text-white rounded-xl hover:bg-gray-800 transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isPast ? 'Past Event' : event.registered >= event.capacity ? 'Event Full' : 'Register Now'}
            </button>
            <button
              onClick={onClose}
              className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-semibold"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const EventForm = ({ event, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    title: '',
    type: 'pitch',
    category: 'startup',
    description: '',
    date: '',
    time: '',
    endTime: '',
    location: '',
    address: '',
    price: 'free',
    priceAmount: 0,
    capacity: 100,
    tags: [],
    organizer: '',
    organizerEmail: '',
    organizerPhone: '',
    website: '',
    isFeatured: false,
    isPublic: true
  });

  const [tagInput, setTagInput] = useState('');

  useEffect(() => {
    if (event) {
      setFormData({
        title: event.title || '',
        type: event.type || 'pitch',
        category: event.category || 'startup',
        description: event.description || '',
        date: event.date || '',
        time: event.time || '',
        endTime: event.endTime || '',
        location: event.location || '',
        address: event.address || '',
        price: event.price || 'free',
        priceAmount: event.priceAmount || 0,
        capacity: event.capacity || 100,
        tags: Array.isArray(event.tags) ? event.tags : [],
        organizer: event.organizer || '',
        organizerEmail: event.organizerEmail || '',
        organizerPhone: event.organizerPhone || '',
        website: event.website || '',
        isFeatured: event.isFeatured || false,
        isPublic: event.isPublic !== undefined ? event.isPublic : true
      });
    }
  }, [event]);

  const handleAddTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData({ ...formData, tags: [...formData.tags, tagInput.trim()] });
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setFormData({ ...formData, tags: formData.tags.filter(tag => tag !== tagToRemove) });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const url = event
        ? `${API_BASE_URL}/events/${event.id}`
        : `${API_BASE_URL}/events`;
      
      const method = event ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        onSave();
      } else {
        const error = await response.json();
        alert(error.error || 'Failed to save event');
      }
    } catch (error) {
      console.error('Error saving event:', error);
      alert('Failed to save event');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between z-10">
          <h2 className="text-2xl font-bold text-gray-900">
            {event ? 'Edit Event' : 'Create New Event'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Event Title *
            </label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-gray-900 transition-all"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Event Type *
              </label>
              <select
                required
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-gray-900 transition-all bg-white"
              >
                {eventTypes.map(type => (
                  <option key={type.id} value={type.id}>{type.label}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Category *
              </label>
              <select
                required
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-gray-900 transition-all bg-white"
              >
                {eventCategories.map(cat => (
                  <option key={cat.id} value={cat.id}>{cat.label}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Description *
            </label>
            <textarea
              required
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows="4"
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-gray-900 transition-all resize-none"
            />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Date *
              </label>
              <input
                type="date"
                required
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-gray-900 transition-all text-gray-900 font-semibold text-base"
                style={{ colorScheme: 'light' }}
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Start Time *
              </label>
              <input
                type="time"
                required
                value={formData.time}
                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-gray-900 transition-all text-gray-900 font-semibold text-base"
                style={{ colorScheme: 'light' }}
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                End Time *
              </label>
              <input
                type="time"
                required
                value={formData.endTime}
                onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-gray-900 transition-all text-gray-900 font-semibold text-base"
                style={{ colorScheme: 'light' }}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Location *
              </label>
              <input
                type="text"
                required
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-gray-900 transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Address
              </label>
              <input
                type="text"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-gray-900 transition-all"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Price Type *
              </label>
              <select
                required
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-gray-900 transition-all bg-white"
              >
                {priceRanges.map(price => (
                  <option key={price.id} value={price.id}>{price.label}</option>
                ))}
              </select>
            </div>
            {formData.price === 'paid' && (
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Price Amount *
                </label>
                <input
                  type="number"
                  required
                  min="0"
                  value={formData.priceAmount}
                  onChange={(e) => setFormData({ ...formData, priceAmount: parseFloat(e.target.value) })}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-gray-900 transition-all"
                />
              </div>
            )}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Capacity *
              </label>
              <input
                type="number"
                required
                min="1"
                value={formData.capacity}
                onChange={(e) => setFormData({ ...formData, capacity: parseInt(e.target.value) })}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-gray-900 transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Tags
            </label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddTag();
                  }
                }}
                placeholder="Add a tag and press Enter"
                className="flex-1 px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-gray-900 transition-all"
              />
              <button
                type="button"
                onClick={handleAddTag}
                className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
              >
                Add
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium flex items-center gap-2"
                >
                  {tag}
                  <button
                    type="button"
                    onClick={() => handleRemoveTag(tag)}
                    className="hover:text-red-600 transition-colors"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Organizer Name *
            </label>
            <input
              type="text"
              required
              value={formData.organizer}
              onChange={(e) => setFormData({ ...formData, organizer: e.target.value })}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-gray-900 transition-all"
            />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Organizer Email
              </label>
              <input
                type="email"
                value={formData.organizerEmail}
                onChange={(e) => setFormData({ ...formData, organizerEmail: e.target.value })}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-gray-900 transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Organizer Phone
              </label>
              <input
                type="tel"
                value={formData.organizerPhone}
                onChange={(e) => setFormData({ ...formData, organizerPhone: e.target.value })}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-gray-900 transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Website
              </label>
              <input
                type="url"
                value={formData.website}
                onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-gray-900 transition-all"
              />
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="featured"
                checked={formData.isFeatured}
                onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                className="w-5 h-5 rounded border-gray-300 text-gray-900 focus:ring-gray-900"
              />
              <label htmlFor="featured" className="text-sm font-semibold text-gray-700">
                Mark as Featured
              </label>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="public"
                checked={formData.isPublic}
                onChange={(e) => setFormData({ ...formData, isPublic: e.target.checked })}
                className="w-5 h-5 rounded border-gray-300 text-gray-900 focus:ring-gray-900"
              />
              <label htmlFor="public" className="text-sm font-semibold text-gray-700">
                Public Event
              </label>
            </div>
          </div>

          <div className="flex items-center gap-4 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-6 py-3 bg-gray-900 text-white rounded-xl hover:bg-gray-800 transition-colors font-semibold shadow-lg hover:shadow-xl"
            >
              {event ? 'Update' : 'Create'} Event
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Events;

