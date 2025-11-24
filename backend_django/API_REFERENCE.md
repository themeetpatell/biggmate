# 🌟 Complete API Endpoint Reference

Quick reference guide for all API endpoints in the Biggmate backend.

## Base URL
```
http://localhost:8000/api
```

## Authentication Header
```
Authorization: Bearer <access_token>
```

---

## 🔐 Authentication (`/api/auth/`)

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/auth/register/` | ❌ | Register new user |
| POST | `/auth/login/` | ❌ | User login |
| POST | `/auth/logout/` | ✅ | User logout |
| POST | `/auth/token/refresh/` | ❌ | Refresh JWT token |
| GET | `/auth/me/` | ✅ | Get current user |
| PUT | `/auth/me/` | ✅ | Update current user |
| POST | `/auth/password-reset/request/` | ❌ | Request password reset OTP |
| POST | `/auth/password-reset/verify/` | ❌ | Verify OTP and reset password |
| POST | `/auth/username-recovery/request/` | ❌ | Request username recovery |
| POST | `/auth/username-recovery/verify/` | ❌ | Verify OTP and get username |

---

## 👤 Profiles (`/api/profiles/`)

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/profiles/me/` | ✅ | Get own profile |
| PUT | `/profiles/me/` | ✅ | Update own profile |
| PATCH | `/profiles/me/` | ✅ | Partially update profile |
| GET | `/profiles/list/` | ❌ | List all public profiles |
| GET | `/profiles/<username>/` | ❌ | Get public profile by username |
| GET | `/profiles/me/portfolio/` | ✅ | List portfolio items |
| POST | `/profiles/me/portfolio/` | ✅ | Create portfolio item |
| GET | `/profiles/me/portfolio/<id>/` | ✅ | Get portfolio item |
| PUT | `/profiles/me/portfolio/<id>/` | ✅ | Update portfolio item |
| DELETE | `/profiles/me/portfolio/<id>/` | ✅ | Delete portfolio item |
| GET | `/profiles/me/testimonials/` | ✅ | List testimonials |
| POST | `/profiles/me/testimonials/` | ✅ | Create testimonial |
| GET | `/profiles/me/testimonials/<id>/` | ✅ | Get testimonial |
| PUT | `/profiles/me/testimonials/<id>/` | ✅ | Update testimonial |
| DELETE | `/profiles/me/testimonials/<id>/` | ✅ | Delete testimonial |

---

## 🎤 Pitches (`/api/pitches/`)

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/pitches/` | ❌ | List all public pitches |
| POST | `/pitches/` | ✅ | Create new pitch |
| GET | `/pitches/<id>/` | ❌ | Get pitch details |
| PUT | `/pitches/<id>/` | ✅ | Update pitch (owner only) |
| PATCH | `/pitches/<id>/` | ✅ | Partially update pitch |
| DELETE | `/pitches/<id>/` | ✅ | Delete pitch (owner only) |
| GET | `/pitches/my/` | ✅ | Get user's own pitches |
| POST | `/pitches/<id>/save/` | ✅ | Save/bookmark pitch |
| DELETE | `/pitches/<id>/unsave/` | ✅ | Remove from saved |
| GET | `/pitches/saved/` | ✅ | Get saved pitches |

**Query Parameters:**
- `industry` - Filter by industry
- `stage` - Filter by stage (idea, mvp, early, growth)
- `search` - Search in title/description
- `ordering` - Sort by field (views_count, created_at, etc.)

---

## 💬 PitchBacks (`/api/pitchbacks/`)

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/pitchbacks/` | ✅ | List all user's pitchbacks |
| POST | `/pitchbacks/` | ✅ | Send new pitchback |
| GET | `/pitchbacks/<id>/` | ✅ | Get pitchback details |
| GET | `/pitchbacks/received/` | ✅ | Get received pitchbacks |
| GET | `/pitchbacks/sent/` | ✅ | Get sent pitchbacks |
| POST | `/pitchbacks/<id>/accept/` | ✅ | Accept pitchback |
| POST | `/pitchbacks/<id>/decline/` | ✅ | Decline pitchback |

**Query Parameters:**
- `status` - Filter by status (pending, accepted, declined)
- `pitch` - Filter by pitch ID

---

## 🤝 Matching (`/api/matching/`)

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/matching/discover/` | ✅ | Discover potential cofounders |
| POST | `/matching/connect/` | ✅ | Send connection request |
| GET | `/matching/connections/` | ✅ | List all connections |
| GET | `/matching/connections/<id>/` | ✅ | Get connection details |
| POST | `/matching/connections/<id>/accept/` | ✅ | Accept connection request |
| POST | `/matching/connections/<id>/decline/` | ✅ | Decline connection request |
| GET | `/matching/compatibility/<user_id>/` | ✅ | Calculate compatibility score |

**Discover Query Parameters:**
- `industries` - Filter by industries
- `skills` - Filter by skills
- `archetype` - Filter by archetype
- `availability` - Filter by availability
- `min_compatibility` - Minimum compatibility score

---

## 📊 Projects (`/api/projects/`)

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/projects/` | ✅ | List user's projects |
| POST | `/projects/` | ✅ | Create new project |
| GET | `/projects/<id>/` | ✅ | Get project details |
| PUT | `/projects/<id>/` | ✅ | Update project |
| DELETE | `/projects/<id>/` | ✅ | Delete project |
| GET | `/projects/<id>/tasks/` | ✅ | List project tasks |
| POST | `/projects/<id>/tasks/` | ✅ | Create task |
| PUT | `/projects/<id>/tasks/<task_id>/` | ✅ | Update task |
| DELETE | `/projects/<id>/tasks/<task_id>/` | ✅ | Delete task |
| GET | `/projects/<id>/milestones/` | ✅ | List milestones |
| POST | `/projects/<id>/milestones/` | ✅ | Create milestone |
| GET | `/projects/<id>/team/` | ✅ | List team members |
| POST | `/projects/<id>/team/` | ✅ | Add team member |

---

## 💼 Skills (`/api/skills/`)

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/skills/profile/` | ✅ | Get skills profile |
| PUT | `/skills/profile/` | ✅ | Update skills profile |
| GET | `/skills/packages/` | ✅ | List service packages |
| POST | `/skills/packages/` | ✅ | Create service package |
| GET | `/skills/packages/<id>/` | ✅ | Get package details |
| PUT | `/skills/packages/<id>/` | ✅ | Update package |
| DELETE | `/skills/packages/<id>/` | ✅ | Delete package |
| GET | `/skills/projects/` | ✅ | List client projects |
| POST | `/skills/projects/` | ✅ | Create client project |

---

## 🛒 Marketplace (`/api/marketplace/`)

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/marketplace/providers/` | ❌ | List service providers |
| GET | `/marketplace/providers/<id>/` | ❌ | Get provider details |
| GET | `/marketplace/packages/` | ❌ | List all packages |
| POST | `/marketplace/inquiries/` | ✅ | Send inquiry to provider |
| GET | `/marketplace/inquiries/` | ✅ | Get user's inquiries |

**Query Parameters:**
- `category` - Filter by category
- `min_rating` - Minimum rating
- `max_price` - Maximum price
- `search` - Search providers

---

## 📅 Events (`/api/events/`)

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/events/` | ❌ | List all events |
| POST | `/events/` | ✅ | Create new event |
| GET | `/events/<id>/` | ❌ | Get event details |
| PUT | `/events/<id>/` | ✅ | Update event (organizer only) |
| DELETE | `/events/<id>/` | ✅ | Delete event (organizer only) |
| POST | `/events/<id>/register/` | ✅ | Register for event |
| DELETE | `/events/<id>/unregister/` | ✅ | Unregister from event |
| GET | `/events/my/` | ✅ | Get user's events |
| GET | `/events/registered/` | ✅ | Get registered events |

**Query Parameters:**
- `type` - Filter by event type
- `category` - Filter by category
- `price` - Filter by price (free, paid)
- `date_from` - Events from date
- `date_to` - Events until date

---

## 💬 Messages (`/api/messages/`)

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/messages/conversations/` | ✅ | List conversations |
| POST | `/messages/conversations/` | ✅ | Create conversation |
| GET | `/messages/conversations/<id>/` | ✅ | Get conversation messages |
| POST | `/messages/conversations/<id>/send/` | ✅ | Send message |
| POST | `/messages/conversations/<id>/read/` | ✅ | Mark as read |
| DELETE | `/messages/conversations/<id>/` | ✅ | Delete conversation |

**WebSocket:**
```
ws://localhost:8000/ws/chat/<conversation_id>/?token=<jwt_token>
```

---

## 💰 Equity (`/api/equity/`)

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/equity/calculate/` | ✅ | Calculate equity split |
| GET | `/equity/calculations/` | ✅ | List calculations |
| GET | `/equity/calculations/<id>/` | ✅ | Get calculation details |
| POST | `/equity/vesting/` | ✅ | Create vesting schedule |
| GET | `/equity/vesting/` | ✅ | List vesting schedules |
| GET | `/equity/captable/` | ✅ | Get cap table |

---

## 🤖 AI Co-Founder (`/api/ai/`)

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/ai/cothink/` | ✅ | AI brainstorming |
| POST | `/ai/cowrite/` | ✅ | AI content generation |
| POST | `/ai/codesign/` | ✅ | AI design assistance |
| POST | `/ai/coplan/` | ✅ | AI strategic planning |
| POST | `/ai/coscript/` | ✅ | AI pitch script writing |
| POST | `/ai/cocoach/` | ✅ | AI mentorship |
| POST | `/ai/cosolve/` | ✅ | AI problem solving |

**Request Body Example:**
```json
{
  "message": "Your query here",
  "context": "Optional context"
}
```

---

## 📈 Stakeholders (`/api/stakeholders/`)

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/stakeholders/` | ✅ | List stakeholders |
| POST | `/stakeholders/` | ✅ | Create stakeholder |
| GET | `/stakeholders/<id>/` | ✅ | Get stakeholder details |
| PUT | `/stakeholders/<id>/` | ✅ | Update stakeholder |
| DELETE | `/stakeholders/<id>/` | ✅ | Delete stakeholder |
| POST | `/stakeholders/<id>/interactions/` | ✅ | Log interaction |
| GET | `/stakeholders/<id>/interactions/` | ✅ | List interactions |
| GET | `/stakeholders/pipeline/` | ✅ | View pipeline |

---

## 🚀 Sprint Tools (`/api/sprint/`)

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/sprint/idea-validation/` | ✅ | Validate startup idea |
| POST | `/sprint/market-research/` | ✅ | Generate market research |
| POST | `/sprint/mvp-plan/` | ✅ | Create MVP plan |
| GET | `/sprint/ideas/` | ✅ | List user's ideas |
| GET | `/sprint/ideas/<id>/` | ✅ | Get idea details |
| GET | `/sprint/validations/` | ✅ | List validations |
| GET | `/sprint/research/` | ✅ | List research reports |

---

## 📖 API Documentation

- **Swagger UI**: http://localhost:8000/api/docs/
- **OpenAPI Schema**: http://localhost:8000/api/schema/
- **Admin Panel**: http://localhost:8000/admin/

---

## 📝 Common Response Formats

### Success Response
```json
{
  "id": 1,
  "field": "value",
  "created_at": "2024-01-20T10:30:00Z"
}
```

### List Response
```json
{
  "count": 100,
  "next": "http://localhost:8000/api/endpoint/?page=2",
  "previous": null,
  "results": [...]
}
```

### Error Response
```json
{
  "error": "Error message",
  "detail": "Detailed error description"
}
```

### Validation Error
```json
{
  "field_name": ["Error message for this field"],
  "another_field": ["Another error"]
}
```

---

## 🔑 Authentication Flow

### 1. Register
```bash
POST /api/auth/register/
{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "secure123",
  "confirm_password": "secure123",
  "first_name": "John",
  "last_name": "Doe",
  "whatsapp_number": "1234567890",
  "country_code": "+1"
}
```

### 2. Login
```bash
POST /api/auth/login/
{
  "username": "john_doe",
  "password": "secure123"
}

Response:
{
  "user": {...},
  "accessToken": "eyJ0eXAiOiJKV1QiLCJhbGc...",
  "refreshToken": "eyJ0eXAiOiJKV1QiLCJhbGc..."
}
```

### 3. Use Access Token
```bash
GET /api/profiles/me/
Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGc...
```

### 4. Refresh Token
```bash
POST /api/auth/token/refresh/
{
  "refresh": "eyJ0eXAiOiJKV1QiLCJhbGc..."
}

Response:
{
  "access": "eyJ0eXAiOiJKV1QiLCJhbGc...",
  "refresh": "eyJ0eXAiOiJKV1QiLCJhbGc..."
}
```

---

## 🎯 Pagination

All list endpoints support pagination:

**Query Parameters:**
- `page` - Page number (default: 1)
- `page_size` - Items per page (default: 20, max: 100)

**Example:**
```
GET /api/pitches/?page=2&page_size=10
```

---

## 🔍 Filtering & Search

**Common Query Parameters:**
- `search` - Text search across relevant fields
- `ordering` - Sort by field (prefix with `-` for descending)
- Custom filters per endpoint (see specific sections above)

**Example:**
```
GET /api/pitches/?search=AI&stage=mvp&ordering=-created_at
```

---

## 📊 HTTP Status Codes

- `200 OK` - Success
- `201 Created` - Resource created
- `204 No Content` - Success with no response body
- `400 Bad Request` - Validation error
- `401 Unauthorized` - Authentication required
- `403 Forbidden` - Permission denied
- `404 Not Found` - Resource not found
- `500 Internal Server Error` - Server error

---

## 💡 Tips

1. **Always include Authorization header** for protected endpoints
2. **Use pagination** for large lists
3. **Filter and search** to reduce payload size
4. **Check response status codes** for error handling
5. **Use refresh tokens** before access token expires
6. **Handle rate limits** appropriately
7. **Cache responses** when appropriate

---

**For detailed request/response schemas, visit: http://localhost:8000/api/docs/**
