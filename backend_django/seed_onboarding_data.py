"""
Script to seed onboarding options data into SQLite database
Run this from the backend_django directory: python seed_onboarding_data.py
"""
import os
import sys
import django

# Add the project directory to the Python path
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

# Set up Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
django.setup()

from apps.users.models_onboarding import (
    ValueCategory, Value, Intent, Industry, Skill, ExperienceLevel,
    CofounderRole, WorkStyle, TimeCommitment, Availability, LocationPreference
)


def seed_value_categories():
    """Seed value categories"""
    categories = [
        {'name': 'Vision & Creation', 'order': 1},
        {'name': 'Grit & Growth', 'order': 2},
        {'name': 'Heart & Connection', 'order': 3},
    ]
    
    for cat_data in categories:
        category, created = ValueCategory.objects.get_or_create(
            name=cat_data['name'],
            defaults={'order': cat_data['order']}
        )
        if created:
            print(f"✓ Created value category: {category.name}")
        else:
            print(f"  Value category already exists: {category.name}")


def seed_values():
    """Seed values"""
    values_data = [
        # Vision & Creation
        ('innovation', 'Innovation', 'Vision & Creation', 1),
        ('creativity', 'Creativity', 'Vision & Creation', 2),
        ('impact', 'Impact', 'Vision & Creation', 3),
        ('legacy', 'Legacy', 'Vision & Creation', 4),
        ('leadership', 'Leadership', 'Vision & Creation', 5),
        ('curiosity', 'Curiosity', 'Vision & Creation', 6),
        ('freedom', 'Freedom', 'Vision & Creation', 7),
        
        # Grit & Growth
        ('growth', 'Growth', 'Grit & Growth', 1),
        ('resilience', 'Resilience', 'Grit & Growth', 2),
        ('discipline', 'Discipline', 'Grit & Growth', 3),
        ('courage', 'Courage', 'Grit & Growth', 4),
        ('excellence', 'Excellence', 'Grit & Growth', 5),
        ('ambition', 'Ambition', 'Grit & Growth', 6),
        ('wisdom', 'Wisdom', 'Grit & Growth', 7),
        ('optimism', 'Optimism', 'Grit & Growth', 8),
        
        # Heart & Connection
        ('connection', 'Connection', 'Heart & Connection', 1),
        ('empathy', 'Empathy', 'Heart & Connection', 2),
        ('compassion', 'Compassion', 'Heart & Connection', 3),
        ('authenticity', 'Authenticity', 'Heart & Connection', 4),
        ('passion', 'Passion', 'Heart & Connection', 5),
        ('gratitude', 'Gratitude', 'Heart & Connection', 6),
        ('humility', 'Humility', 'Heart & Connection', 7),
        ('integrity', 'Integrity', 'Heart & Connection', 8),
        ('balance', 'Balance', 'Heart & Connection', 9),
        ('adventure', 'Adventure', 'Heart & Connection', 10),
    ]
    
    for value_id, name, category_name, order in values_data:
        try:
            category = ValueCategory.objects.get(name=category_name)
            value, created = Value.objects.get_or_create(
                value_id=value_id,
                defaults={
                    'name': name,
                    'category': category,
                    'order': order
                }
            )
            if created:
                print(f"✓ Created value: {value.name}")
            else:
                print(f"  Value already exists: {value.name}")
        except ValueCategory.DoesNotExist:
            print(f"✗ Category not found: {category_name}")


def seed_intents():
    """Seed user intents"""
    intents = [
        {
            'intent_id': 'find-cofounder',
            'title': 'Find a Cofounder',
            'description': 'Looking for the right co-founder to build and grow your startup',
            'icon': 'Target',
            'color': 'from-blue-500 to-cyan-500',
            'order': 1
        },
        {
            'intent_id': 'offer-skills',
            'title': 'Offer Your Skills',
            'description': 'Connect with startups that need your expertise and skills',
            'icon': 'Sparkles',
            'color': 'from-green-500 to-emerald-500',
            'order': 2
        },
        {
            'intent_id': 'idea-sprint',
            'title': 'Start Idea Sprint',
            'description': 'Build your idea, validate it, and find the perfect cofounder',
            'icon': 'Zap',
            'color': 'from-purple-500 to-indigo-500',
            'order': 3
        },
    ]
    
    for intent_data in intents:
        intent, created = Intent.objects.get_or_create(
            intent_id=intent_data['intent_id'],
            defaults={
                'title': intent_data['title'],
                'description': intent_data['description'],
                'icon': intent_data['icon'],
                'color': intent_data['color'],
                'order': intent_data['order']
            }
        )
        if created:
            print(f"✓ Created intent: {intent.title}")
        else:
            print(f"  Intent already exists: {intent.title}")


def seed_industries():
    """Seed industries"""
    industries = [
        'Technology', 'Healthcare', 'Fintech', 'E-commerce', 'Education',
        'SaaS', 'AI/ML', 'Blockchain', 'Real Estate', 'Food & Beverage',
        'Transportation', 'Energy', 'Entertainment', 'Manufacturing', 'Retail',
        'Media', 'Travel', 'Sports', 'Gaming', 'Fashion'
    ]
    
    for idx, industry_name in enumerate(industries, start=1):
        industry, created = Industry.objects.get_or_create(
            name=industry_name,
            defaults={'order': idx}
        )
        if created:
            print(f"✓ Created industry: {industry.name}")
        else:
            print(f"  Industry already exists: {industry.name}")


def seed_skills():
    """Seed skills"""
    skills = [
        'Technical Development', 'Product Management', 'Marketing', 'Sales',
        'Operations', 'Finance', 'Design', 'Business Strategy', 'Fundraising',
        'Legal', 'HR', 'Data Analysis', 'AI/ML', 'Blockchain',
        'Mobile Development', 'Backend Development', 'Frontend Development',
        'DevOps', 'UX/UI Design', 'Growth Hacking', 'Content Marketing',
        'SEO/SEM', 'Social Media', 'PR'
    ]
    
    for idx, skill_name in enumerate(skills, start=1):
        skill, created = Skill.objects.get_or_create(
            name=skill_name,
            defaults={'order': idx}
        )
        if created:
            print(f"✓ Created skill: {skill.name}")
        else:
            print(f"  Skill already exists: {skill.name}")


def seed_experience_levels():
    """Seed experience levels"""
    levels = [
        {'level_id': 'entry', 'name': 'Entry Level', 'description': '0-2 years', 'order': 1},
        {'level_id': 'mid', 'name': 'Mid Level', 'description': '3-5 years', 'order': 2},
        {'level_id': 'senior', 'name': 'Senior Level', 'description': '6-10 years', 'order': 3},
        {'level_id': 'executive', 'name': 'Executive', 'description': '10+ years', 'order': 4},
    ]
    
    for level_data in levels:
        level, created = ExperienceLevel.objects.get_or_create(
            level_id=level_data['level_id'],
            defaults={
                'name': level_data['name'],
                'description': level_data['description'],
                'order': level_data['order']
            }
        )
        if created:
            print(f"✓ Created experience level: {level.name}")
        else:
            print(f"  Experience level already exists: {level.name}")


def seed_cofounder_roles():
    """Seed cofounder roles"""
    roles = [
        {'role_id': 'technical', 'name': 'Technical Co-founder', 'order': 1},
        {'role_id': 'business', 'name': 'Business Co-founder', 'order': 2},
        {'role_id': 'marketing', 'name': 'Marketing Co-founder', 'order': 3},
        {'role_id': 'operations', 'name': 'Operations Co-founder', 'order': 4},
        {'role_id': 'finance', 'name': 'Finance Co-founder', 'order': 5},
        {'role_id': 'design', 'name': 'Design Co-founder', 'order': 6},
    ]
    
    for role_data in roles:
        role, created = CofounderRole.objects.get_or_create(
            role_id=role_data['role_id'],
            defaults={
                'name': role_data['name'],
                'order': role_data['order']
            }
        )
        if created:
            print(f"✓ Created cofounder role: {role.name}")
        else:
            print(f"  Cofounder role already exists: {role.name}")


def seed_work_styles():
    """Seed work styles"""
    styles = [
        {'style_id': 'remote-first', 'name': 'Remote-first', 'order': 1},
        {'style_id': 'hybrid', 'name': 'Hybrid', 'order': 2},
        {'style_id': 'office-based', 'name': 'Office-based', 'order': 3},
        {'style_id': 'flexible', 'name': 'Flexible hours', 'order': 4},
    ]
    
    for style_data in styles:
        style, created = WorkStyle.objects.get_or_create(
            style_id=style_data['style_id'],
            defaults={
                'name': style_data['name'],
                'order': style_data['order']
            }
        )
        if created:
            print(f"✓ Created work style: {style.name}")
        else:
            print(f"  Work style already exists: {style.name}")


def seed_time_commitments():
    """Seed time commitments"""
    commitments = [
        {'commitment_id': 'full-time', 'name': 'Full-Time', 'description': '40+ hrs/week', 'order': 1},
        {'commitment_id': 'part-time', 'name': 'Part-Time', 'description': '20-30 hrs/week', 'order': 2},
        {'commitment_id': 'flexible', 'name': 'Flexible', 'description': '10-20 hrs/week', 'order': 3},
        {'commitment_id': 'weekends', 'name': 'Weekends Only', 'description': '', 'order': 4},
        {'commitment_id': 'evenings', 'name': 'Evenings Only', 'description': '', 'order': 5},
    ]
    
    for commitment_data in commitments:
        commitment, created = TimeCommitment.objects.get_or_create(
            commitment_id=commitment_data['commitment_id'],
            defaults={
                'name': commitment_data['name'],
                'description': commitment_data['description'],
                'order': commitment_data['order']
            }
        )
        if created:
            print(f"✓ Created time commitment: {commitment.name}")
        else:
            print(f"  Time commitment already exists: {commitment.name}")


def seed_availabilities():
    """Seed availabilities"""
    availabilities = [
        {'availability_id': 'immediately', 'name': 'Immediately', 'order': 1},
        {'availability_id': '1-month', 'name': 'Within 1 month', 'order': 2},
        {'availability_id': '3-months', 'name': 'Within 3 months', 'order': 3},
        {'availability_id': '6-months', 'name': 'Within 6 months', 'order': 4},
    ]
    
    for avail_data in availabilities:
        availability, created = Availability.objects.get_or_create(
            availability_id=avail_data['availability_id'],
            defaults={
                'name': avail_data['name'],
                'order': avail_data['order']
            }
        )
        if created:
            print(f"✓ Created availability: {availability.name}")
        else:
            print(f"  Availability already exists: {availability.name}")


def seed_location_preferences():
    """Seed location preferences"""
    locations = [
        {'location_id': 'same-city', 'name': 'Same City', 'order': 1},
        {'location_id': 'same-country', 'name': 'Same Country', 'order': 2},
        {'location_id': 'remote', 'name': 'Remote OK', 'order': 3},
        {'location_id': 'anywhere', 'name': 'Anywhere', 'order': 4},
    ]
    
    for loc_data in locations:
        location, created = LocationPreference.objects.get_or_create(
            location_id=loc_data['location_id'],
            defaults={
                'name': loc_data['name'],
                'order': loc_data['order']
            }
        )
        if created:
            print(f"✓ Created location preference: {location.name}")
        else:
            print(f"  Location preference already exists: {location.name}")


def main():
    """Main function to seed all data"""
    print("\n" + "="*60)
    print("Starting to seed onboarding options data...")
    print("="*60 + "\n")
    
    print("Seeding Value Categories...")
    seed_value_categories()
    
    print("\nSeeding Values...")
    seed_values()
    
    print("\nSeeding Intents...")
    seed_intents()
    
    print("\nSeeding Industries...")
    seed_industries()
    
    print("\nSeeding Skills...")
    seed_skills()
    
    print("\nSeeding Experience Levels...")
    seed_experience_levels()
    
    print("\nSeeding Cofounder Roles...")
    seed_cofounder_roles()
    
    print("\nSeeding Work Styles...")
    seed_work_styles()
    
    print("\nSeeding Time Commitments...")
    seed_time_commitments()
    
    print("\nSeeding Availabilities...")
    seed_availabilities()
    
    print("\nSeeding Location Preferences...")
    seed_location_preferences()
    
    print("\n" + "="*60)
    print("✓ Onboarding options data seeded successfully!")
    print("="*60 + "\n")


if __name__ == '__main__':
    main()
