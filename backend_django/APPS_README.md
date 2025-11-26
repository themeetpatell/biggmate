# Biggmate Django Backend - Complete Apps Documentation

## Overview
This Django backend provides a comprehensive API for the Biggmate startup collaboration platform with 12 full-featured apps.

## Apps Structure

### 1. **apps/pitches** - Startup Pitch System
**Models:**
- `Pitch`: Complete pitch with problem, solution, market details, team, funding needs, media URLs
- `SavedPitch`: User bookmarks for pitches

**Endpoints:**
- `GET/POST /api/pitches/` - List/create pitches
- `GET /api/pitches/{id}/` - Get pitch details (increments views)
- `GET /api/pitches/my_pitches/` - Current user's pitches
- `POST /api/pitches/{id}/save/` - Save pitch
- `POST /api/pitches/{id}/unsave/` - Unsave pitch
- `GET /api/pitches/saved/` - User's saved pitches

**Features:**
- Full-text search on title, tagline, description
- Filter by stage, author, visibility
- View and save count tracking
- Public/private visibility

---

### 2. **apps/pitchbacks** - PitchBack Response System
**Models:**
- `PitchBack`: Response to pitch with role, equity offer, skills, experience, compatibility score

**Endpoints:**
- `GET/POST /api/pitchbacks/` - List/create pitchbacks
- `GET /api/pitchbacks/sent/` - Sent pitchbacks
- `GET /api/pitchbacks/received/` - Received pitchbacks
- `POST /api/pitchbacks/{id}/accept/` - Accept pitchback (receiver only)
- `POST /api/pitchbacks/{id}/decline/` - Decline pitchback (receiver only)
- `POST /api/pitchbacks/{id}/withdraw/` - Withdraw pitchback (sender only)

**Features:**
- Status tracking (pending, accepted, declined, withdrawn)
- Unique constraint: one pitchback per user per pitch
- Role selection (Co-Founder, CTO, CMO, etc.)
- Equity and time commitment negotiation

---

### 3. **apps/matching** - Cofounder Matching
**Models:**
- `Match`: User matches with compatibility scores
- `Connection`: Connection requests between users
- `CompatibilityScore`: Detailed score breakdowns

**Endpoints:**
- `GET /api/matches/` - List matches
- `GET /api/matches/top_matches/` - Top 10 matches
- `GET/POST /api/connections/` - Connection requests
- `GET /api/connections/sent/` - Sent connection requests
- `GET /api/connections/received/` - Received connection requests
- `GET /api/connections/active/` - Active connections
- `POST /api/connections/{id}/accept/` - Accept connection
- `POST /api/connections/{id}/decline/` - Decline connection
- `POST /api/connections/{id}/block/` - Block user
- `GET /api/compatibility/` - Compatibility scores

**Features:**
- Compatibility scoring system
- Connection status management
- Match reason tracking

---

### 4. **apps/projects** - Project Management
**Models:**
- `Project`: Projects with status, budget, goals
- `TeamMember`: Project team members with roles
- `Task`: Tasks with priorities, assignments, due dates
- `Milestone`: Project milestones with deliverables

**Endpoints:**
- `GET/POST /api/projects/` - List/create projects
- `GET /api/projects/my_projects/` - User's owned projects
- `GET /api/projects/{id}/tasks/` - Project tasks
- `GET /api/projects/{id}/milestones/` - Project milestones
- `GET/POST /api/team-members/` - Team management
- `GET/POST /api/tasks/` - Task management
- `GET /api/tasks/my_tasks/` - Assigned tasks
- `POST /api/tasks/{id}/complete/` - Mark task complete
- `GET/POST /api/milestones/` - Milestone management
- `POST /api/milestones/{id}/complete/` - Mark milestone complete

**Features:**
- Project status tracking
- Task prioritization and assignment
- Milestone tracking
- Team role management
- Time tracking (estimated/actual hours)

---

### 5. **apps/skills** - Skills and Services
**Models:**
- `SkillProfile`: User skill profiles with experience levels
- `ServicePackage`: Service offerings with pricing tiers
- `ClientProject`: Service delivery projects

**Endpoints:**
- `GET /api/skills/profiles/` - Browse skill profiles
- `GET/PUT /api/skills/profiles/me/` - Current user's profile
- `GET/POST /api/skills/packages/` - Service packages
- `GET /api/skills/packages/my_packages/` - User's packages
- `GET/POST /api/skills/projects/` - Client projects
- `GET /api/skills/projects/as_client/` - Projects as client
- `GET /api/skills/projects/as_provider/` - Projects as provider
- `POST /api/skills/projects/{id}/complete/` - Mark project complete

**Features:**
- Skills and expertise tracking
- Service package creation
- Hourly rate and availability
- Project status management

---

### 6. **apps/marketplace** - Service Marketplace
**Models:**
- `ServiceProvider`: Provider profiles with ratings
- `ServiceListing`: Service listings with pricing
- `Inquiry`: Service inquiries and quotes

**Endpoints:**
- `GET/POST /api/marketplace/providers/` - Service providers
- `GET/PUT /api/marketplace/providers/me/` - Provider profile
- `GET/POST /api/marketplace/listings/` - Service listings
- `GET /api/marketplace/listings/my_listings/` - User's listings
- `GET/POST /api/marketplace/inquiries/` - Inquiries
- `GET /api/marketplace/inquiries/sent/` - Sent inquiries
- `GET /api/marketplace/inquiries/received/` - Received inquiries
- `POST /api/marketplace/inquiries/{id}/respond/` - Respond to inquiry

**Features:**
- Provider verification system
- Rating and review tracking
- Category-based filtering
- View count tracking
- Pricing types (fixed, hourly, custom)

---

### 7. **apps/events** - Events System
**Models:**
- `Event`: Events with type, category, capacity, pricing
- `EventRegistration`: Event registrations with payment status

**Endpoints:**
- `GET/POST /api/events/` - List/create events
- `GET /api/events/upcoming/` - Upcoming events
- `GET /api/events/my_events/` - Organized events
- `GET /api/events/registered/` - Registered events
- `POST /api/events/{id}/register/` - Register for event
- `POST /api/events/{id}/unregister/` - Unregister from event
- `GET /api/events/{id}/attendees/` - Event attendees
- `GET /api/events/registrations/` - Registration management

**Features:**
- Event types (workshop, webinar, networking, etc.)
- Online/offline events with meeting links
- Capacity management
- Registration and payment tracking
- Speaker and agenda management

---

### 8. **apps/messaging** - Real-time Messaging
**Models:**
- `Conversation`: Conversations (1-on-1 or group)
- `Message`: Messages with read status, attachments

**Endpoints:**
- `GET/POST /api/messaging/conversations/` - Conversations
- `POST /api/messaging/conversations/start_conversation/` - Start new chat
- `GET /api/messaging/conversations/{id}/messages/` - Get messages
- `POST /api/messaging/conversations/{id}/send_message/` - Send message
- `POST /api/messaging/conversations/{id}/mark_as_read/` - Mark as read
- `GET/POST /api/messaging/messages/` - Message management
- `POST /api/messaging/messages/{id}/mark_as_read/` - Mark message read

**Features:**
- 1-on-1 and group conversations
- Unread count tracking
- Message attachments
- Reply/thread support
- Participant management

---

### 9. **apps/equity** - Equity Framework
**Models:**
- `EquityCalculation`: Equity calculations based on contributions
- `VestingSchedule`: Time/milestone-based vesting
- `CapTable`: Capitalization table entries

**Endpoints:**
- `GET/POST /api/equity/calculations/` - Equity calculations
- `GET /api/equity/calculations/my_equity/` - User's equity
- `POST /api/equity/calculations/calculate/` - Calculate equity
- `POST /api/equity/calculations/{id}/approve/` - Approve calculation
- `GET/POST /api/equity/vesting/` - Vesting schedules
- `GET/POST /api/equity/cap-table/` - Cap table management
- `GET /api/equity/cap-table/project_summary/` - Project cap table summary

**Features:**
- Contribution-based equity calculation
- Cliff and vesting period management
- Milestone-based vesting
- Cap table tracking
- Shareholder type classification

---

### 10. **apps/ai_cofounder** - AI Assistant Tools
**Models:**
- `AISession`: AI conversation sessions
- `AIMessage`: Chat messages
- `AIOutput`: Generated content/ideas

**Endpoints:**
- `GET/POST /api/ai/sessions/` - AI sessions
- `POST /api/ai/sessions/{id}/send_message/` - Chat with AI
- `POST /api/ai/sessions/quick_chat/` - Quick chat
- `GET/POST /api/ai/outputs/` - AI outputs
- `POST /api/ai/outputs/{id}/save_output/` - Save output
- `POST /api/ai/outputs/{id}/rate_output/` - Rate output
- `POST /api/ai/tools/cothink/` - Brainstorming tool
- `POST /api/ai/tools/cowrite/` - Content writing tool
- `POST /api/ai/tools/coplan/` - Strategic planning tool
- `POST /api/ai/tools/coanalyze/` - Data analysis tool
- `POST /api/ai/tools/cocode/` - Coding assistant
- `POST /api/ai/tools/codesign/` - Design assistant

**Features:**
- Multiple AI tools (CoThink, CoWrite, CoPlan, etc.)
- OpenAI integration
- Session management
- Output saving and rating
- Token usage tracking

---

### 11. **apps/stakeholders** - CRM System
**Models:**
- `Stakeholder`: Investors, advisors, partners, customers
- `Interaction`: Communications and meetings
- `Pipeline`: Deal/investment pipeline tracking

**Endpoints:**
- `GET/POST /api/stakeholders/stakeholders/` - Stakeholder management
- `GET /api/stakeholders/stakeholders/by_type/` - Group by type
- `GET /api/stakeholders/stakeholders/{id}/interactions/` - Stakeholder interactions
- `GET/POST /api/stakeholders/interactions/` - Interaction tracking
- `GET /api/stakeholders/interactions/upcoming_followups/` - Follow-ups
- `GET/POST /api/stakeholders/pipeline/` - Pipeline management
- `GET /api/stakeholders/pipeline/summary/` - Pipeline summary
- `POST /api/stakeholders/pipeline/{id}/move_stage/` - Move pipeline stage

**Features:**
- Stakeholder classification (investor, advisor, etc.)
- Interaction history tracking
- Follow-up reminders
- Pipeline stage management
- Deal value and probability tracking
- Investment capacity tracking

---

### 12. **apps/sprint_tools** - Sprint Development Tools
**Models:**
- `IdeaValidation`: Idea validation with SWOT analysis
- `MarketResearch`: Market analysis and competition
- `MVPPlan`: MVP planning with features and timeline
- `RevenueModel`: Revenue model builder

**Endpoints:**
- `GET/POST /api/sprint-tools/idea-validation/` - Idea validation
- `GET/POST /api/sprint-tools/market-research/` - Market research
- `GET/POST /api/sprint-tools/mvp-plans/` - MVP planning
- `GET/POST /api/sprint-tools/revenue-models/` - Revenue models

**Features:**
- SWOT analysis
- Validation scoring
- Competitor analysis
- Customer persona creation
- MVP feature prioritization
- Tech stack planning
- Revenue stream modeling
- Financial projections

---

## Installation & Setup

### 1. Install Dependencies
```bash
cd backend_django
pip install -r requirements.txt
```

### 2. Configure Settings
Add all apps to `config/settings.py`:
```python
INSTALLED_APPS = [
    # ... Django defaults
    'rest_framework',
    'django_filters',
    'corsheaders',
    
    # Biggmate apps
    'apps.users',
    'apps.profiles',
    'apps.pitches',
    'apps.pitchbacks',
    'apps.matching',
    'apps.projects',
    'apps.skills',
    'apps.marketplace',
    'apps.events',
    'apps.messaging',
    'apps.equity',
    'apps.ai_cofounder',
    'apps.stakeholders',
    'apps.sprint_tools',
]
```

### 3. Update URLs
In `config/urls.py`:
```python
urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/auth/', include('apps.users.urls')),
    path('api/', include('apps.pitches.urls')),
    path('api/', include('apps.pitchbacks.urls')),
    path('api/', include('apps.matching.urls')),
    path('api/', include('apps.projects.urls')),
    path('api/', include('apps.skills.urls')),
    path('api/', include('apps.marketplace.urls')),
    path('api/', include('apps.events.urls')),
    path('api/', include('apps.messaging.urls')),
    path('api/', include('apps.equity.urls')),
    path('api/ai/', include('apps.ai_cofounder.urls')),
    path('api/', include('apps.stakeholders.urls')),
    path('api/sprint-tools/', include('apps.sprint_tools.urls')),
]
```

### 4. Run Migrations
```bash
python manage.py makemigrations
python manage.py migrate
```

### 5. Create Superuser
```bash
python manage.py createsuperuser
```

### 6. Run Server
```bash
python manage.py runserver
```

---

## Environment Variables

Create a `.env` file:
```env
SECRET_KEY=your-secret-key
DEBUG=True
DATABASE_URL=postgresql://user:password@localhost:5432/biggmate
ALLOWED_HOSTS=localhost,127.0.0.1

# OpenAI for AI Co-Founder
OPENAI_API_KEY=your-openai-api-key

# Email
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_HOST_USER=your-email
EMAIL_HOST_PASSWORD=your-password

# CORS
CORS_ALLOWED_ORIGINS=http://localhost:5173,http://localhost:8000
```

---

## Key Features

### Authentication & Permissions
- All endpoints require authentication (except public pitch listings)
- Users can only access/modify their own data
- Project owners have additional permissions
- Role-based access for team members

### Filtering & Search
- DjangoFilterBackend for field filtering
- SearchFilter for full-text search
- OrderingFilter for custom sorting
- Pagination support on all list endpoints

### Data Validation
- Comprehensive serializer validation
- Custom validators for business logic
- Unique constraints enforced at DB level
- Foreign key integrity checks

### Best Practices
- Proper use of select_related/prefetch_related
- Database indexes on frequently queried fields
- JSONField for flexible data structures
- Timestamps on all models
- Soft deletes where appropriate

---

## API Documentation

### Response Format
```json
{
  "count": 100,
  "next": "http://api.example.com/items/?page=2",
  "previous": null,
  "results": [...]
}
```

### Error Format
```json
{
  "error": "Error message",
  "details": {...}
}
```

### Authentication
Include JWT token in header:
```
Authorization: Bearer <token>
```

---

## Testing

Run tests:
```bash
python manage.py test apps
```

Run specific app tests:
```bash
python manage.py test apps.pitches
```

---

## Admin Interface

Access Django admin at: `http://localhost:8000/admin/`

All models are registered with:
- List displays with key fields
- Search functionality
- Filters for common fields
- Inline editing where appropriate
- Read-only fields for timestamps

---

## Production Deployment

1. Set `DEBUG=False`
2. Configure proper database (PostgreSQL recommended)
3. Set up static files with WhiteNoise or CDN
4. Configure CORS for frontend domain
5. Set up SSL/HTTPS
6. Configure email backend
7. Set up Celery for async tasks (optional)
8. Configure Redis for caching (optional)

---

## Support & Documentation

For more information, see:
- Django REST Framework: https://www.django-rest-framework.org/
- Django: https://docs.djangoproject.com/
- Biggmate Frontend: See `src/` directory

---

## License

Proprietary - Biggmate Platform
