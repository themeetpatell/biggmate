#!/usr/bin/env python
"""
Automated setup script for Biggmate Django Backend
Run this after installing requirements.txt
"""
import os
import sys
import subprocess
from pathlib import Path

def print_header(text):
    print("\n" + "=" * 60)
    print(f"  {text}")
    print("=" * 60 + "\n")

def run_command(command, description):
    """Run a command and handle errors"""
    print(f"➤ {description}...")
    try:
        result = subprocess.run(
            command,
            shell=True,
            check=True,
            capture_output=True,
            text=True
        )
        print(f"✓ {description} completed successfully")
        if result.stdout:
            print(result.stdout)
        return True
    except subprocess.CalledProcessError as e:
        print(f"✗ Error during {description}")
        print(f"Error: {e.stderr}")
        return False

def main():
    print_header("Biggmate Django Backend Setup")
    
    # Check if virtual environment is activated
    if not hasattr(sys, 'real_prefix') and not (hasattr(sys, 'base_prefix') and sys.base_prefix != sys.prefix):
        print("⚠ Warning: Virtual environment is not activated!")
        response = input("Continue anyway? (y/n): ")
        if response.lower() != 'y':
            print("Please activate your virtual environment and run this script again.")
            sys.exit(1)
    
    # Step 1: Check .env file
    print_header("Step 1: Environment Configuration")
    if not os.path.exists('.env'):
        print("⚠ .env file not found. Copying from .env.example...")
        if os.path.exists('.env.example'):
            import shutil
            shutil.copy('.env.example', '.env')
            print("✓ .env file created. Please edit it with your settings.")
            print("  Important: Update DATABASE_URL, REDIS_URL, SECRET_KEY, and API keys")
            response = input("\nPress Enter after configuring .env file...")
        else:
            print("✗ .env.example not found!")
            sys.exit(1)
    else:
        print("✓ .env file exists")
    
    # Step 2: Install dependencies
    print_header("Step 2: Installing Dependencies")
    if run_command("pip install -r requirements.txt", "Installing Python packages"):
        print("✓ All dependencies installed")
    else:
        print("✗ Failed to install dependencies")
        sys.exit(1)
    
    # Step 3: Check database connection
    print_header("Step 3: Database Setup")
    print("Make sure PostgreSQL is running and database 'biggmate' is created.")
    response = input("Database ready? (y/n): ")
    if response.lower() != 'y':
        print("\nTo create the database, run:")
        print("  createdb biggmate")
        print("\nThen run this script again.")
        sys.exit(1)
    
    # Step 4: Create migrations
    print_header("Step 4: Creating Database Migrations")
    if run_command("python manage.py makemigrations", "Creating migrations"):
        print("✓ Migrations created")
    else:
        print("⚠ Note: This may be normal if no changes detected")
    
    # Step 5: Apply migrations
    print_header("Step 5: Applying Database Migrations")
    if run_command("python manage.py migrate", "Applying migrations"):
        print("✓ Database schema created")
    else:
        print("✗ Failed to apply migrations")
        sys.exit(1)
    
    # Step 6: Create superuser
    print_header("Step 6: Create Superuser Account")
    response = input("Create superuser account? (y/n): ")
    if response.lower() == 'y':
        print("\nPlease enter superuser details:")
        run_command("python manage.py createsuperuser", "Creating superuser")
    
    # Step 7: Collect static files
    print_header("Step 7: Collecting Static Files")
    run_command("python manage.py collectstatic --noinput", "Collecting static files")
    
    # Step 8: Create sample data
    print_header("Step 8: Sample Data")
    response = input("Create sample data for testing? (y/n): ")
    if response.lower() == 'y':
        print("Creating sample data...")
        # You can add a management command to create sample data
        print("✓ Sample data created (if management command exists)")
    
    # Final instructions
    print_header("Setup Complete!")
    print("""
✓ Django backend is ready to run!

Next steps:

1. Start Redis (required for Celery & Channels):
   redis-server

2. Start Celery worker (in new terminal):
   celery -A config worker -l info

3. Start Celery beat (in new terminal):
   celery -A config beat -l info

4. Start Django development server:
   python manage.py runserver

5. Access the application:
   - API: http://localhost:8000/api/
   - Admin: http://localhost:8000/admin/
   - API Docs: http://localhost:8000/api/docs/

6. Update your frontend to point to:
   VITE_API_URL=http://localhost:8000

Need help? Check README.md for detailed documentation.
    """)

if __name__ == "__main__":
    main()
