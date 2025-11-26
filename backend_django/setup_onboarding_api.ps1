# Onboarding Options API Setup Script
# This script sets up the database and seeds the onboarding options data

Write-Host "======================================================" -ForegroundColor Cyan
Write-Host "  Onboarding Options API Setup" -ForegroundColor Cyan
Write-Host "======================================================" -ForegroundColor Cyan
Write-Host ""

# Navigate to backend directory
Set-Location backend_django

Write-Host "Step 1: Creating database migrations..." -ForegroundColor Yellow
python manage.py makemigrations
if ($LASTEXITCODE -eq 0) {
    Write-Host "✓ Migrations created" -ForegroundColor Green
} else {
    Write-Host "✗ Failed to create migrations" -ForegroundColor Red
    exit 1
}
Write-Host ""

Write-Host "Step 2: Applying migrations to database..." -ForegroundColor Yellow
python manage.py migrate
if ($LASTEXITCODE -eq 0) {
    Write-Host "✓ Migrations applied" -ForegroundColor Green
} else {
    Write-Host "✗ Failed to apply migrations" -ForegroundColor Red
    exit 1
}
Write-Host ""

Write-Host "Step 3: Seeding onboarding options data..." -ForegroundColor Yellow
python seed_onboarding_data.py
if ($LASTEXITCODE -eq 0) {
    Write-Host "✓ Data seeded" -ForegroundColor Green
} else {
    Write-Host "✗ Failed to seed data" -ForegroundColor Red
    exit 1
}
Write-Host ""

Write-Host "======================================================" -ForegroundColor Cyan
Write-Host "  Setup Complete!" -ForegroundColor Cyan
Write-Host "======================================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Yellow
Write-Host "1. Start the Django server: python manage.py runserver"
Write-Host "2. Test the API: curl http://localhost:8000/api/auth/onboarding/options/"
Write-Host "3. Access admin panel: http://localhost:8000/admin/"
Write-Host ""
Write-Host "For more information, see ONBOARDING_OPTIONS_API.md" -ForegroundColor Cyan
Write-Host ""
