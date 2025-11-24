#!/usr/bin/env python
"""
Quick setup script for Biggmate Django backend
Run this after installing requirements to set up the database and create initial data
"""

import os
import sys
import django

# Setup Django environment
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
django.setup()

from django.core.management import call_command
from django.contrib.auth import get_user_model

User = get_user_model()


def create_migrations():
    """Create migrations for all apps"""
    print("Creating migrations...")
    apps = [
        'pitches', 'pitchbacks', 'matching', 'projects', 'skills',
        'marketplace', 'events', 'messaging', 'equity', 'ai_cofounder',
        'stakeholders', 'sprint_tools'
    ]
    
    for app in apps:
        try:
            call_command('makemigrations', app)
            print(f"✓ Created migrations for {app}")
        except Exception as e:
            print(f"✗ Error creating migrations for {app}: {e}")


def run_migrations():
    """Run all migrations"""
    print("\nRunning migrations...")
    try:
        call_command('migrate')
        print("✓ All migrations applied successfully")
    except Exception as e:
        print(f"✗ Error running migrations: {e}")
        return False
    return True


def create_superuser():
    """Create a superuser if none exists"""
    print("\nChecking for superuser...")
    if User.objects.filter(is_superuser=True).exists():
        print("✓ Superuser already exists")
        return
    
    print("No superuser found. Creating one...")
    try:
        username = input("Enter superuser username (default: admin): ") or "admin"
        email = input("Enter superuser email (default: admin@biggmate.com): ") or "admin@biggmate.com"
        password = input("Enter superuser password (default: admin123): ") or "admin123"
        
        User.objects.create_superuser(
            username=username,
            email=email,
            password=password
        )
        print(f"✓ Superuser '{username}' created successfully")
    except Exception as e:
        print(f"✗ Error creating superuser: {e}")


def create_test_data():
    """Create some test data"""
    print("\nCreate test data?")
    choice = input("Enter 'yes' to create test data (default: no): ").lower()
    
    if choice != 'yes':
        print("Skipping test data creation")
        return
    
    try:
        from apps.pitches.models import Pitch
        from apps.projects.models import Project
        
        # Create test user
        test_user, created = User.objects.get_or_create(
            username='testuser',
            defaults={
                'email': 'test@example.com',
                'first_name': 'Test',
                'last_name': 'User'
            }
        )
        if created:
            test_user.set_password('testpass123')
            test_user.save()
            print("✓ Created test user: testuser / testpass123")
        
        # Create test pitch
        if not Pitch.objects.filter(author=test_user).exists():
            pitch = Pitch.objects.create(
                author=test_user,
                title='AI-Powered Collaboration Platform',
                tagline='Connect entrepreneurs and build together',
                description='A comprehensive platform for startup collaboration with AI assistance',
                problem='Finding the right cofounder and resources is challenging',
                solution='AI-powered matching and comprehensive collaboration tools',
                target_market='Entrepreneurs, startups, and small businesses',
                business_model='Freemium with premium features',
                stage='mvp',
                is_public=True,
                skills_needed=['Python', 'React', 'Product Management'],
                industries=['Technology', 'SaaS']
            )
            print(f"✓ Created test pitch: {pitch.title}")
        
        # Create test project
        if not Project.objects.filter(owner=test_user).exists():
            project = Project.objects.create(
                owner=test_user,
                name='Biggmate Platform',
                description='Building the ultimate startup collaboration platform',
                status='active',
                goals=['Launch MVP', 'Get 1000 users', 'Raise seed funding']
            )
            print(f"✓ Created test project: {project.name}")
        
        print("✓ Test data created successfully")
        
    except Exception as e:
        print(f"✗ Error creating test data: {e}")


def main():
    """Main setup function"""
    print("=" * 60)
    print("Biggmate Django Backend Setup")
    print("=" * 60)
    
    # Create and run migrations
    create_migrations()
    
    if not run_migrations():
        print("\n✗ Setup failed. Please fix migration errors and try again.")
        sys.exit(1)
    
    # Create superuser
    create_superuser()
    
    # Create test data
    create_test_data()
    
    print("\n" + "=" * 60)
    print("Setup completed successfully!")
    print("=" * 60)
    print("\nNext steps:")
    print("1. Start the development server:")
    print("   python manage.py runserver")
    print("\n2. Access the admin panel:")
    print("   http://localhost:8000/admin/")
    print("\n3. View API documentation:")
    print("   http://localhost:8000/api/docs/")
    print("\n4. Test the APIs using the Swagger UI or your frontend")
    print("=" * 60)


if __name__ == '__main__':
    main()
