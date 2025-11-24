"""
Test script to verify Biggmate backend is working correctly
Run this after setup to ensure everything is configured properly
"""
import os
import sys
import django

# Setup Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
django.setup()

from django.contrib.auth import get_user_model
from apps.profiles.models import Profile
from apps.pitches.models import Pitch
from django.db import connection

User = get_user_model()

def print_status(test_name, success, message=""):
    status = "✓" if success else "✗"
    color = "\033[92m" if success else "\033[91m"
    reset = "\033[0m"
    print(f"{color}{status}{reset} {test_name}: {message}")

def test_database_connection():
    """Test if database connection works"""
    try:
        connection.ensure_connection()
        print_status("Database Connection", True, "Connected successfully")
        return True
    except Exception as e:
        print_status("Database Connection", False, str(e))
        return False

def test_models():
    """Test if models are properly migrated"""
    try:
        # Check if tables exist
        User.objects.count()
        Profile.objects.count()
        Pitch.objects.count()
        print_status("Models/Migrations", True, "All models accessible")
        return True
    except Exception as e:
        print_status("Models/Migrations", False, str(e))
        return False

def test_user_creation():
    """Test if we can create users"""
    try:
        # Try to create a test user (don't save)
        user = User(
            username='test_user',
            email='test@example.com',
            first_name='Test',
            last_name='User'
        )
        # Just validate, don't save
        user.full_clean()
        print_status("User Model", True, "User creation works")
        return True
    except Exception as e:
        print_status("User Model", False, str(e))
        return False

def test_environment():
    """Test environment configuration"""
    from django.conf import settings
    
    issues = []
    
    if settings.DEBUG:
        issues.append("DEBUG is True (OK for development)")
    
    if settings.SECRET_KEY == 'django-insecure-replace-this-in-production':
        issues.append("SECRET_KEY is default (change for production)")
    
    if not settings.DATABASES['default']['NAME']:
        issues.append("Database name not configured")
    
    success = len([i for i in issues if 'not configured' in i]) == 0
    message = "; ".join(issues) if issues else "Configuration looks good"
    print_status("Environment Config", success, message)
    return success

def test_admin_exists():
    """Test if superuser exists"""
    try:
        admin_exists = User.objects.filter(is_superuser=True).exists()
        if admin_exists:
            print_status("Admin User", True, "Superuser exists")
        else:
            print_status("Admin User", False, "No superuser found - run 'python manage.py createsuperuser'")
        return True
    except Exception as e:
        print_status("Admin User", False, str(e))
        return False

def main():
    print("\n" + "=" * 60)
    print("  Biggmate Backend Health Check")
    print("=" * 60 + "\n")
    
    tests = [
        test_database_connection,
        test_models,
        test_user_creation,
        test_environment,
        test_admin_exists,
    ]
    
    results = []
    for test in tests:
        try:
            result = test()
            results.append(result)
        except Exception as e:
            print(f"✗ {test.__name__}: Unexpected error - {str(e)}")
            results.append(False)
        print()
    
    # Summary
    print("=" * 60)
    total = len(results)
    passed = sum(results)
    failed = total - passed
    
    print(f"\nTests Run: {total}")
    print(f"✓ Passed: {passed}")
    print(f"✗ Failed: {failed}")
    
    if passed == total:
        print("\n🎉 All tests passed! Backend is ready to use.")
        print("\nNext steps:")
        print("1. Start the development server: python manage.py runserver")
        print("2. Visit admin panel: http://localhost:8000/admin/")
        print("3. Check API docs: http://localhost:8000/api/docs/")
    else:
        print("\n⚠ Some tests failed. Please check the errors above.")
        print("Common fixes:")
        print("- Run migrations: python manage.py migrate")
        print("- Create superuser: python manage.py createsuperuser")
        print("- Check .env file configuration")
    
    print("\n" + "=" * 60 + "\n")

if __name__ == "__main__":
    main()
