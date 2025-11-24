# Biggmate Backend - Configuration Guide

## Quick Setup Guide

### 1. Update Django Settings

Add all new apps to `config/settings.py`:

```python
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    
    # Third-party apps
    'rest_framework',
    'rest_framework_simplejwt',
    'django_filters',
    'corsheaders',
    'channels',
    'drf_spectacular',
    
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

# REST Framework Configuration
REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'rest_framework_simplejwt.authentication.JWTAuthentication',
    ],
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.IsAuthenticatedOrReadOnly',
    ],
    'DEFAULT_FILTER_BACKENDS': [
        'django_filters.rest_framework.DjangoFilterBackend',
        'rest_framework.filters.SearchFilter',
        'rest_framework.filters.OrderingFilter',
    ],
    'DEFAULT_PAGINATION_CLASS': 'rest_framework.pagination.PageNumberPagination',
    'PAGE_SIZE': 20,
    'DEFAULT_SCHEMA_CLASS': 'drf_spectacular.openapi.AutoSchema',
}

# CORS Configuration
CORS_ALLOW_CREDENTIALS = True
CORS_ALLOWED_ORIGINS = [
    "http://localhost:5173",
    "http://localhost:3000",
    "http://127.0.0.1:5173",
    "http://127.0.0.1:3000",
]

# Channels Configuration (for WebSocket support)
ASGI_APPLICATION = 'config.asgi.application'
CHANNEL_LAYERS = {
    'default': {
        'BACKEND': 'channels_redis.core.RedisChannelLayer',
        'CONFIG': {
            "hosts": [('127.0.0.1', 6379)],
        },
    },
}

# JWT Configuration
from datetime import timedelta

SIMPLE_JWT = {
    'ACCESS_TOKEN_LIFETIME': timedelta(minutes=60),
    'REFRESH_TOKEN_LIFETIME': timedelta(days=7),
    'ROTATE_REFRESH_TOKENS': True,
    'BLACKLIST_AFTER_ROTATION': True,
}
```

### 2. Update Main URLs Configuration

Update `config/urls.py`:

```python
from django.contrib import admin
from django.urls import path, include
from drf_spectacular.views import SpectacularAPIView, SpectacularSwaggerView

urlpatterns = [
    # Admin
    path('admin/', admin.site.urls),
    
    # API Documentation
    path('api/schema/', SpectacularAPIView.as_view(), name='schema'),
    path('api/docs/', SpectacularSwaggerView.as_view(url_name='schema'), name='swagger-ui'),
    
    # Authentication
    path('api/auth/', include('apps.users.urls')),
    
    # Core Features
    path('api/', include('apps.pitches.urls')),
    path('api/', include('apps.pitchbacks.urls')),
    path('api/', include('apps.matching.urls')),
    
    # Project Management
    path('api/', include('apps.projects.urls')),
    path('api/', include('apps.equity.urls')),
    
    # Skills & Services
    path('api/skills/', include('apps.skills.urls')),
    path('api/marketplace/', include('apps.marketplace.urls')),
    
    # Collaboration
    path('api/messaging/', include('apps.messaging.urls')),
    path('api/events/', include('apps.events.urls')),
    
    # CRM & Tools
    path('api/crm/', include('apps.stakeholders.urls')),
    path('api/sprint/', include('apps.sprint_tools.urls')),
    
    # AI Tools
    path('api/ai/', include('apps.ai_cofounder.urls')),
]
```

### 3. Update ASGI Configuration

Update `config/asgi.py` for WebSocket support:

```python
import os
from django.core.asgi import get_asgi_application
from channels.routing import ProtocolTypeRouter, URLRouter
from channels.auth import AuthMiddlewareStack

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')

django_asgi_app = get_asgi_application()

# Import your WebSocket routing here when ready
# from apps.messaging import routing

application = ProtocolTypeRouter({
    "http": django_asgi_app,
    "websocket": AuthMiddlewareStack(
        URLRouter(
            # Add WebSocket URL patterns here
            []
        )
    ),
})
```

### 4. Environment Variables

Create `.env` file:

```env
# Django
SECRET_KEY=your-secret-key-here
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1

# Database
DATABASE_URL=postgresql://user:password@localhost:5432/biggmate
# Or for SQLite (development):
# DATABASE_URL=sqlite:///db.sqlite3

# CORS
CORS_ALLOWED_ORIGINS=http://localhost:5173,http://localhost:3000

# OpenAI (for AI Co-Founder features)
OPENAI_API_KEY=your-openai-api-key-here

# Redis (for Channels/WebSockets)
REDIS_URL=redis://localhost:6379

# Email Configuration
EMAIL_BACKEND=django.core.mail.backends.smtp.EmailBackend
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USE_TLS=True
EMAIL_HOST_USER=your-email@gmail.com
EMAIL_HOST_PASSWORD=your-app-password

# AWS S3 (Optional - for file storage)
AWS_ACCESS_KEY_ID=your-access-key
AWS_SECRET_ACCESS_KEY=your-secret-key
AWS_STORAGE_BUCKET_NAME=your-bucket-name
AWS_S3_REGION_NAME=us-east-1
```

### 5. Run Migrations

```bash
# Create migrations for all apps
python manage.py makemigrations pitches pitchbacks matching projects skills marketplace events messaging equity ai_cofounder stakeholders sprint_tools

# Apply migrations
python manage.py migrate
```

### 6. Create Initial Data (Optional)

Create a management command or Django shell script to populate initial data:

```python
# python manage.py shell

from django.contrib.auth import get_user_model
from apps.pitches.models import Pitch

User = get_user_model()

# Create test users
user = User.objects.create_user(
    username='testuser',
    email='test@example.com',
    password='testpass123'
)

# Create test pitch
pitch = Pitch.objects.create(
    author=user,
    title='AI-Powered Startup Platform',
    tagline='Connect entrepreneurs with cofounders and resources',
    description='A comprehensive platform for startup collaboration...',
    problem='Finding the right cofounder is difficult',
    solution='AI-powered matching system',
    stage='mvp',
    is_public=True
)
```

### 7. Start Development Server

```bash
# Regular Django server
python manage.py runserver

# Or with Daphne (for WebSocket support)
daphne -p 8000 config.asgi:application
```

### 8. Access Admin Panel

```bash
# Create superuser
python manage.py createsuperuser

# Access admin at: http://localhost:8000/admin/
```

### 9. API Documentation

Access interactive API docs at:
- Swagger UI: http://localhost:8000/api/docs/
- OpenAPI Schema: http://localhost:8000/api/schema/

## Common Issues & Solutions

### Issue: Import Errors
**Solution:** Make sure all apps have `__init__.py` files and are in the correct directory structure.

### Issue: Migration Conflicts
**Solution:** Delete migration files (except `__init__.py`) and run `makemigrations` again.

### Issue: CORS Errors
**Solution:** Verify `CORS_ALLOWED_ORIGINS` includes your frontend URL.

### Issue: OpenAI Import Error
**Solution:** Install openai package: `pip install openai` or remove the import if not using AI features.

### Issue: Database Connection Error
**Solution:** Verify database credentials in `.env` and that PostgreSQL is running.

## Testing the APIs

### Using cURL:

```bash
# Register user
curl -X POST http://localhost:8000/api/auth/register/ \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","email":"test@example.com","password":"testpass123"}'

# Login
curl -X POST http://localhost:8000/api/auth/login/ \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","password":"testpass123"}'

# Create pitch (use token from login)
curl -X POST http://localhost:8000/api/pitches/ \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -d '{"title":"My Startup","tagline":"Amazing idea","description":"...","problem":"...","solution":"...","stage":"idea"}'
```

### Using Python requests:

```python
import requests

BASE_URL = 'http://localhost:8000/api'

# Login
response = requests.post(f'{BASE_URL}/auth/login/', json={
    'username': 'testuser',
    'password': 'testpass123'
})
token = response.json()['access']

# Get pitches
headers = {'Authorization': f'Bearer {token}'}
response = requests.get(f'{BASE_URL}/pitches/', headers=headers)
pitches = response.json()
print(pitches)
```

## Production Deployment Checklist

- [ ] Set `DEBUG=False`
- [ ] Configure PostgreSQL database
- [ ] Set strong `SECRET_KEY`
- [ ] Configure proper `ALLOWED_HOSTS`
- [ ] Set up SSL/HTTPS
- [ ] Configure static files (WhiteNoise or S3)
- [ ] Set up email backend
- [ ] Configure Redis for Channels
- [ ] Set up Celery for background tasks
- [ ] Configure monitoring (Sentry, etc.)
- [ ] Set up backups
- [ ] Configure CORS for production frontend URL
- [ ] Set rate limiting
- [ ] Configure proper logging

## Next Steps

1. Test all endpoints using the API documentation
2. Create frontend integration
3. Set up WebSocket consumers for real-time messaging
4. Configure Celery for background tasks (email notifications, etc.)
5. Add comprehensive tests
6. Set up CI/CD pipeline

## Support

For issues or questions, refer to:
- Main README: `APPS_README.md`
- Django docs: https://docs.djangoproject.com/
- DRF docs: https://www.django-rest-framework.org/
