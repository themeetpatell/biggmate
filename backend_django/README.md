# Biggmate Django Backend

Complete Django REST API backend for the Biggmate cofounder matching platform.

## Features Implemented

### 1. **Authentication System** (`apps.users`)
- User registration with WhatsApp verification
- JWT-based login/logout
- Password reset via WhatsApp OTP
- Username recovery via WhatsApp OTP
- Global location tracking
- Premium tier system

### 2. **Profile Management** (`apps.profiles`)
- Entrepreneur profiles with skills, experience, industries
- Portfolio items
- Testimonials
- Public/private profiles
- Profile views tracking

### 3. **Pitch System** (`apps.pitches`)
- Create startup pitches
- Video/audio recording upload
- Pitch deck upload
- Browse pitches by industry, stage, etc.
- Save/bookmark pitches

### 4. **PitchBack System** (`apps.pitchbacks`)
- Respond to pitches with cofounder offers
- Equity proposals
- Time commitment specifications
- Accept/decline pitchbacks

### 5. **Cofounder Matching** (`apps.matching`)
- AI-powered compatibility scoring
- Advanced filtering (skills, industries, location, etc.)
- Match recommendations
- Connection requests

### 6. **Project Management** (`apps.projects`)
- Project boards
- Task management
- Team collaboration
- MVP tracking
- Sprint planning

### 7. **Skills Marketplace** (`apps.marketplace` & `apps.skills`)
- Service provider profiles
- Service packages
- Project tracking
- Client management
- Availability calendar

### 8. **Events System** (`apps.events`)
- Create/browse startup events
- Event registration
- Event categories (pitch events, networking, workshops, etc.)
- Event search and filters

### 9. **Messaging System** (`apps.messaging`)
- Real-time chat using WebSockets
- Direct messages between users
- Group conversations
- Message history

### 10. **Equity Framework** (`apps.equity`)
- Equity split calculator
- Vesting schedules
- Cap table management

### 11. **AI Co-Founder** (`apps.ai_cofounder`)
- CoThink - Idea brainstorming
- CoWrite - Content generation
- CoDesign - Design assistance
- CoPlan - Strategic planning
- CoScript - Pitch script writing
- CoCoach - Mentorship
- CoSolve - Problem solving

### 12. **Stakeholder CRM** (`apps.stakeholders`)
- Manage investors, advisors, mentors
- Track interactions
- Pipeline management

### 13. **Sprint Tools** (`apps.sprint_tools`)
- Idea validation
- Market research
- MVP builder
- Validation engine
- Pitch deck builder

## Tech Stack

- **Framework**: Django 5.0 + Django REST Framework
- **Database**: PostgreSQL
- **Authentication**: JWT (Simple JWT)
- **Real-time**: Django Channels + Redis
- **Task Queue**: Celery + Redis
- **AI Integration**: OpenAI API, Anthropic Claude API
- **File Storage**: AWS S3 (configurable)
- **SMS/WhatsApp**: Twilio
- **API Documentation**: drf-spectacular (Swagger/OpenAPI)

## Project Structure

```
backend_django/
├── config/                  # Django settings
│   ├── settings.py
│   ├── urls.py
│   ├── wsgi.py
│   ├── asgi.py
│   └── celery.py
├── apps/
│   ├── users/              # Authentication & user management
│   ├── profiles/           # User profiles
│   ├── pitches/            # Startup pitches
│   ├── pitchbacks/         # Pitch responses
│   ├── matching/           # Cofounder matching
│   ├── projects/           # Project management
│   ├── skills/             # Skills management
│   ├── marketplace/        # Service marketplace
│   ├── events/             # Events system
│   ├── messaging/          # Real-time messaging
│   ├── equity/             # Equity framework
│   ├── ai_cofounder/       # AI assistance
│   ├── stakeholders/       # Stakeholder CRM
│   └── sprint_tools/       # Sprint tools
├── requirements.txt
├── manage.py
└── .env.example
```

## Setup Instructions

### 1. Prerequisites
- Python 3.11+
- PostgreSQL 14+
- Redis 6+

### 2. Installation

```powershell
# Create virtual environment
python -m venv venv
.\venv\Scripts\Activate

# Install dependencies
pip install -r requirements.txt

# Copy environment file
cp .env.example .env
# Edit .env with your settings

# Create database
createdb biggmate

# Run migrations
python manage.py makemigrations
python manage.py migrate

# Create superuser
python manage.py createsuperuser

# Run development server
python manage.py runserver
```

### 3. Start Redis (for Celery & Channels)

```powershell
# Install Redis on Windows using WSL or download Windows port
redis-server
```

### 4. Start Celery Worker

```powershell
celery -A config worker -l info
```

### 5. Start Celery Beat (for scheduled tasks)

```powershell
celery -A config beat -l info
```

## API Endpoints

### Authentication
- `POST /api/auth/register/` - Register new user
- `POST /api/auth/login/` - User login
- `POST /api/auth/logout/` - User logout
- `POST /api/auth/token/refresh/` - Refresh JWT token
- `GET /api/auth/me/` - Get current user
- `PUT /api/auth/me/` - Update current user
- `POST /api/auth/password-reset/request/` - Request password reset OTP
- `POST /api/auth/password-reset/verify/` - Verify OTP and reset password
- `POST /api/auth/username-recovery/request/` - Request username recovery
- `POST /api/auth/username-recovery/verify/` - Verify OTP and get username

### Profiles
- `GET /api/profiles/me/` - Get own profile
- `PUT /api/profiles/me/` - Update own profile
- `GET /api/profiles/list/` - List all public profiles
- `GET /api/profiles/<username>/` - Get public profile by username
- `GET /api/profiles/me/portfolio/` - List portfolio items
- `POST /api/profiles/me/portfolio/` - Create portfolio item
- `GET /api/profiles/me/testimonials/` - List testimonials

### Pitches
- `GET /api/pitches/` - List all pitches
- `POST /api/pitches/` - Create new pitch
- `GET /api/pitches/<id>/` - Get pitch details
- `PUT /api/pitches/<id>/` - Update pitch
- `DELETE /api/pitches/<id>/` - Delete pitch
- `GET /api/pitches/my/` - Get user's pitches
- `POST /api/pitches/<id>/save/` - Save/bookmark pitch

### PitchBacks
- `GET /api/pitchbacks/` - List all pitchbacks
- `POST /api/pitchbacks/` - Send new pitchback
- `GET /api/pitchbacks/received/` - Get received pitchbacks
- `GET /api/pitchbacks/sent/` - Get sent pitchbacks
- `POST /api/pitchbacks/<id>/accept/` - Accept pitchback
- `POST /api/pitchbacks/<id>/decline/` - Decline pitchback

### Matching
- `GET /api/matching/discover/` - Discover potential cofounders
- `POST /api/matching/connect/` - Send connection request
- `GET /api/matching/connections/` - List connections
- `GET /api/matching/compatibility/<user_id>/` - Calculate compatibility score

### Projects
- `GET /api/projects/` - List user's projects
- `POST /api/projects/` - Create new project
- `GET /api/projects/<id>/` - Get project details
- `GET /api/projects/<id>/tasks/` - List project tasks
- `POST /api/projects/<id>/tasks/` - Create task

### Marketplace
- `GET /api/marketplace/providers/` - List service providers
- `GET /api/marketplace/providers/<id>/` - Get provider details
- `GET /api/marketplace/packages/` - List service packages
- `POST /api/marketplace/inquiries/` - Send inquiry to provider

### Events
- `GET /api/events/` - List events
- `POST /api/events/` - Create event
- `GET /api/events/<id>/` - Get event details
- `POST /api/events/<id>/register/` - Register for event
- `GET /api/events/my/` - Get user's events

### Messages
- `GET /api/messages/conversations/` - List conversations
- `GET /api/messages/conversations/<id>/` - Get conversation messages
- `POST /api/messages/conversations/<id>/send/` - Send message
- WebSocket: `ws://localhost:8000/ws/chat/<conversation_id>/` - Real-time chat

### AI Co-Founder
- `POST /api/ai/cothink/` - AI brainstorming
- `POST /api/ai/cowrite/` - AI content generation
- `POST /api/ai/codesign/` - AI design assistance
- `POST /api/ai/coplan/` - AI planning
- `POST /api/ai/coscript/` - AI pitch script
- `POST /api/ai/cocoach/` - AI mentorship
- `POST /api/ai/cosolve/` - AI problem solving

### Sprint Tools
- `POST /api/sprint/idea-validation/` - Validate idea
- `POST /api/sprint/market-research/` - Generate market research
- `POST /api/sprint/mvp-plan/` - Create MVP plan
- `GET /api/sprint/ideas/` - List user's ideas

## API Documentation

Once the server is running, visit:
- **Swagger UI**: http://localhost:8000/api/docs/
- **OpenAPI Schema**: http://localhost:8000/api/schema/

## Environment Variables

See `.env.example` for all configuration options.

Key variables:
- `DATABASE_URL` - PostgreSQL connection string
- `REDIS_URL` - Redis connection string
- `SECRET_KEY` - Django secret key
- `JWT_SECRET_KEY` - JWT signing key
- `OPENAI_API_KEY` - OpenAI API key for AI features
- `TWILIO_ACCOUNT_SID` - Twilio account SID
- `TWILIO_AUTH_TOKEN` - Twilio auth token
- `AWS_ACCESS_KEY_ID` - AWS S3 credentials (optional)

## Testing

```powershell
# Run tests
python manage.py test

# Run with coverage
pytest --cov=apps
```

## Deployment

### Production Checklist
1. Set `DEBUG=False` in .env
2. Configure proper `ALLOWED_HOSTS`
3. Set up PostgreSQL database
4. Configure Redis for production
5. Set up AWS S3 for media files
6. Configure email backend
7. Set up Sentry for error tracking
8. Use gunicorn as WSGI server
9. Set up nginx as reverse proxy
10. Enable HTTPS with Let's Encrypt

### Deploy with Docker

```powershell
# Build image
docker build -t biggmate-backend .

# Run container
docker-compose up -d
```

## Contributing

1. Create feature branch
2. Make changes
3. Run tests
4. Submit pull request

## License

Proprietary - All rights reserved

## Support

For issues or questions, contact: support@biggmate.com
