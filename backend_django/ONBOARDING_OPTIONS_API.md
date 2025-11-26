# Onboarding Options API

This document describes the onboarding options API that provides dynamic data for the user onboarding flow.

## Overview

The onboarding options API provides all the necessary data for the onboarding forms including:
- **Value Categories & Values**: User core values grouped by categories
- **Intents**: User intentions (Find Cofounder, Offer Skills, Idea Sprint)
- **Industries**: Available industry options
- **Skills**: Available skill options
- **Experience Levels**: Experience level options with descriptions

## Database Setup

### 1. Create Django Migrations

```bash
cd backend_django
python manage.py makemigrations
python manage.py migrate
```

### 2. Seed the Database

#### For SQLite (Development):
```bash
python seed_onboarding_data.py
```

#### For MySQL (Production):
```bash
mysql -u your_username -p your_database < sql/onboarding_seed_data_mysql.sql
```

#### Manual SQL Execution:
You can also manually execute the SQL files:
- SQLite: `sql/onboarding_seed_data.sql`
- MySQL: `sql/onboarding_seed_data_mysql.sql`

## API Endpoint

### Get Onboarding Options

**Endpoint:** `GET /api/auth/onboarding/options/`

**Authentication:** Not required (public endpoint)

**Response:**

```json
{
  "value_groups": [
    {
      "id": 1,
      "name": "Vision & Creation",
      "values": [
        {
          "id": 1,
          "value_id": "innovation",
          "name": "Innovation"
        },
        {
          "id": 2,
          "value_id": "creativity",
          "name": "Creativity"
        }
      ]
    },
    {
      "id": 2,
      "name": "Grit & Growth",
      "values": [...]
    },
    {
      "id": 3,
      "name": "Heart & Connection",
      "values": [...]
    }
  ],
  "intents": [
    {
      "id": 1,
      "intent_id": "find-cofounder",
      "title": "Find a Cofounder",
      "description": "Looking for the right co-founder to build and grow your startup",
      "icon": "Target",
      "color": "from-blue-500 to-cyan-500"
    },
    {
      "id": 2,
      "intent_id": "offer-skills",
      "title": "Offer Your Skills",
      "description": "Connect with startups that need your expertise and skills",
      "icon": "Sparkles",
      "color": "from-green-500 to-emerald-500"
    },
    {
      "id": 3,
      "intent_id": "idea-sprint",
      "title": "Start Idea Sprint",
      "description": "Build your idea, validate it, and find the perfect cofounder",
      "icon": "Zap",
      "color": "from-purple-500 to-indigo-500"
    }
  ],
  "industries": [
    {"id": 1, "name": "Technology"},
    {"id": 2, "name": "Healthcare"},
    {"id": 3, "name": "Fintech"},
    ...
  ],
  "skills": [
    {"id": 1, "name": "Technical Development"},
    {"id": 2, "name": "Product Management"},
    {"id": 3, "name": "Marketing"},
    ...
  ],
  "experience_levels": [
    {
      "id": 1,
      "level_id": "entry",
      "name": "Entry Level",
      "description": "0-2 years"
    },
    {
      "id": 2,
      "level_id": "mid",
      "name": "Mid Level",
      "description": "3-5 years"
    },
    {
      "id": 3,
      "level_id": "senior",
      "name": "Senior Level",
      "description": "6-10 years"
    },
    {
      "id": 4,
      "level_id": "executive",
      "name": "Executive",
      "description": "10+ years"
    }
  ]
}
```

## Frontend Integration

The frontend automatically fetches onboarding options from the API when the QuickSetup component mounts.

### Example Usage in React:

```javascript
import { authAPI } from '../../services/api';

// Fetch onboarding options
const response = await authAPI.getOnboardingOptions();
const data = response.data;

// Use the data in your component
const valueGroups = data.value_groups;
const intents = data.intents;
const industries = data.industries;
const skills = data.skills;
const experienceLevels = data.experience_levels;
```

## Data Models

### ValueCategory
- `id`: Integer (Primary Key)
- `name`: String (100 chars)
- `order`: Integer
- `created_at`: DateTime
- `updated_at`: DateTime

### Value
- `id`: Integer (Primary Key)
- `value_id`: String (50 chars, unique)
- `name`: String (100 chars)
- `category_id`: Foreign Key to ValueCategory
- `order`: Integer
- `created_at`: DateTime
- `updated_at`: DateTime

### Intent
- `id`: Integer (Primary Key)
- `intent_id`: String (50 chars, unique)
- `title`: String (100 chars)
- `description`: Text
- `icon`: String (50 chars)
- `color`: String (50 chars)
- `order`: Integer
- `created_at`: DateTime
- `updated_at`: DateTime

### Industry
- `id`: Integer (Primary Key)
- `name`: String (100 chars, unique)
- `order`: Integer
- `created_at`: DateTime
- `updated_at`: DateTime

### Skill
- `id`: Integer (Primary Key)
- `name`: String (100 chars, unique)
- `order`: Integer
- `created_at`: DateTime
- `updated_at`: DateTime

### ExperienceLevel
- `id`: Integer (Primary Key)
- `level_id`: String (50 chars, unique)
- `name`: String (100 chars)
- `description`: String (200 chars)
- `order`: Integer
- `created_at`: DateTime
- `updated_at`: DateTime

## Admin Panel

All models are registered in the Django admin panel. You can manage the data at:
`http://localhost:8000/admin/`

### Admin Features:
- View, add, edit, and delete all onboarding options
- Reorder items using the `order` field
- Search and filter capabilities
- Bulk actions support

## Benefits

### Dynamic Data Management
- Easy to add/remove/modify options without code changes
- Data managed through Django admin panel
- Consistent data across all environments

### Scalability
- Supports multiple languages (future enhancement)
- Can add custom fields per option
- Supports A/B testing with different option sets

### Performance
- Single API call fetches all options
- Frontend caching support
- Fallback to default data if API fails

## Testing

### Test the API:
```bash
curl http://localhost:8000/api/auth/onboarding/options/
```

### Test from Frontend:
1. Start the backend: `cd backend_django && python manage.py runserver`
2. Start the frontend: `npm run dev`
3. Navigate to the onboarding page
4. Data should load from the API automatically

## Troubleshooting

### Issue: API returns empty arrays
**Solution:** Run the seed script to populate the database

### Issue: Foreign key constraint errors
**Solution:** Ensure migrations are run before seeding data

### Issue: 404 on API endpoint
**Solution:** Check that the URL is correctly configured in the frontend API service

### Issue: CORS errors
**Solution:** Ensure CORS is properly configured in Django settings

## Future Enhancements

- [ ] Multi-language support
- [ ] User-specific option recommendations
- [ ] Option analytics and tracking
- [ ] Custom option creation by admins
- [ ] Option versioning for A/B testing
