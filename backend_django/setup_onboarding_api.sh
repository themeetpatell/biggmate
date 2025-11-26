#!/bin/bash

# Onboarding Options API Setup Script
# This script sets up the database and seeds the onboarding options data

echo "======================================================"
echo "  Onboarding Options API Setup"
echo "======================================================"
echo ""

# Navigate to backend directory
cd backend_django || exit

echo "Step 1: Creating database migrations..."
python manage.py makemigrations
echo "✓ Migrations created"
echo ""

echo "Step 2: Applying migrations to database..."
python manage.py migrate
echo "✓ Migrations applied"
echo ""

echo "Step 3: Seeding onboarding options data..."
python seed_onboarding_data.py
echo "✓ Data seeded"
echo ""

echo "======================================================"
echo "  Setup Complete!"
echo "======================================================"
echo ""
echo "Next steps:"
echo "1. Start the Django server: python manage.py runserver"
echo "2. Test the API: curl http://localhost:8000/api/auth/onboarding/options/"
echo "3. Access admin panel: http://localhost:8000/admin/"
echo ""
echo "For more information, see ONBOARDING_OPTIONS_API.md"
echo ""
