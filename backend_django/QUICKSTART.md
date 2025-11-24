# Quick Start Guide - Biggmate Django Backend

## Prerequisites

Make sure you have the following installed:
- Python 3.11+
- PostgreSQL 14+
- Redis 6+

## Step-by-Step Setup

### 1. Create Virtual Environment

```powershell
# Navigate to backend directory
cd e:\business\Startup\biggmate\backend_django

# Create virtual environment
python -m venv venv

# Activate virtual environment
.\venv\Scripts\Activate
```

### 2. Install Dependencies

```powershell
pip install -r requirements.txt
```

### 3. Configure Environment

```powershell
# Copy environment file
cp .env.example .env

# Edit .env with your settings
notepad .env
```

Important settings to update in `.env`:
```
DATABASE_URL=postgresql://postgres:password@localhost:5432/biggmate
SECRET_KEY=your-secret-key-change-this
JWT_SECRET_KEY=your-jwt-secret-key
OPENAI_API_KEY=your-openai-api-key  # For AI features
ANTHROPIC_API_KEY=your-anthropic-key  # Optional
```

### 4. Create Database

```powershell
# Using psql
psql -U postgres
CREATE DATABASE biggmate;
\q

# Or using pgAdmin
# Create a new database named "biggmate"
```

### 5. Run Migrations

```powershell
python manage.py makemigrations
python manage.py migrate
```

### 6. Create Superuser

```powershell
python manage.py createsuperuser
```

Follow the prompts to create an admin account.

### 7. Start Redis

```powershell
# On Windows with WSL
wsl redis-server

# Or if you have Redis installed natively
redis-server
```

### 8. Start Development Server

```powershell
python manage.py runserver
```

The API will be available at: http://localhost:8000

### 9. Start Celery Worker (Optional, for async tasks)

Open a new terminal:

```powershell
cd e:\business\Startup\biggmate\backend_django
.\venv\Scripts\Activate
celery -A config worker -l info
```

### 10. Start Celery Beat (Optional, for scheduled tasks)

Open another new terminal:

```powershell
cd e:\business\Startup\biggmate\backend_django
.\venv\Scripts\Activate
celery -A config beat -l info
```

## Verify Installation

1. **Admin Panel**: http://localhost:8000/admin/
   - Login with superuser credentials

2. **API Documentation**: http://localhost:8000/api/docs/
   - Interactive Swagger UI

3. **API Schema**: http://localhost:8000/api/schema/
   - OpenAPI schema

4. **Test API**: 
   ```powershell
   curl http://localhost:8000/api/auth/me/
   ```

## Configure Frontend

Update your frontend `.env` file:

```
VITE_API_URL=http://localhost:8000
```

## Common Issues & Solutions

### Issue: Database connection error
**Solution**: Make sure PostgreSQL is running and database exists
```powershell
# Check PostgreSQL status
pg_isready

# Check if database exists
psql -U postgres -l | findstr biggmate
```

### Issue: Redis connection error
**Solution**: Make sure Redis is running
```powershell
redis-cli ping
# Should return: PONG
```

### Issue: Import errors
**Solution**: Make sure virtual environment is activated
```powershell
.\venv\Scripts\Activate
pip install -r requirements.txt
```

### Issue: Static files not loading
**Solution**: Collect static files
```powershell
python manage.py collectstatic --noinput
```

## Development Workflow

1. Make changes to code
2. Create migrations if models changed:
   ```powershell
   python manage.py makemigrations
   python manage.py migrate
   ```
3. Test your changes
4. Commit to git

## Testing

Run tests:
```powershell
python manage.py test
```

Run with coverage:
```powershell
pytest --cov=apps
```

## Deployment

See README.md for production deployment instructions.

## Need Help?

- Check README.md for detailed documentation
- Visit admin panel for data management
- Check API docs for endpoint details
- Review logs: `python manage.py runserver` output

## Next Steps

1. ✅ Backend is running
2. ✅ Configure frontend to use backend API
3. ✅ Test authentication flow
4. ✅ Create test data via admin panel
5. ✅ Start building features!

Enjoy building with Biggmate! 🚀
