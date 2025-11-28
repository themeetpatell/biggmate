-- ============================================================
-- Seed Onboarding Options Data for PostgreSQL
-- Run this file: psql -U postgres -d test -f seed_onboarding_data.sql
-- Or via pgAdmin/DBeaver by executing the script
-- ============================================================

-- Start transaction
BEGIN;

-- ============================================================
-- VALUE CATEGORIES
-- ============================================================
INSERT INTO value_categories (name, "order", created_at, updated_at)
VALUES 
    ('Vision & Creation', 1, NOW(), NOW()),
    ('Grit & Growth', 2, NOW(), NOW()),
    ('Heart & Connection', 3, NOW(), NOW())
ON CONFLICT (name) DO UPDATE SET
    "order" = EXCLUDED."order",
    updated_at = NOW();

-- ============================================================
-- VALUES
-- ============================================================

-- Vision & Creation values
INSERT INTO "values" (value_id, name, category_id, "order", created_at, updated_at)
VALUES 
    ('innovation', 'Innovation', (SELECT id FROM value_categories WHERE name = 'Vision & Creation'), 1, NOW(), NOW()),
    ('creativity', 'Creativity', (SELECT id FROM value_categories WHERE name = 'Vision & Creation'), 2, NOW(), NOW()),
    ('impact', 'Impact', (SELECT id FROM value_categories WHERE name = 'Vision & Creation'), 3, NOW(), NOW()),
    ('legacy', 'Legacy', (SELECT id FROM value_categories WHERE name = 'Vision & Creation'), 4, NOW(), NOW()),
    ('leadership', 'Leadership', (SELECT id FROM value_categories WHERE name = 'Vision & Creation'), 5, NOW(), NOW()),
    ('curiosity', 'Curiosity', (SELECT id FROM value_categories WHERE name = 'Vision & Creation'), 6, NOW(), NOW()),
    ('freedom', 'Freedom', (SELECT id FROM value_categories WHERE name = 'Vision & Creation'), 7, NOW(), NOW())
ON CONFLICT (value_id) DO UPDATE SET
    name = EXCLUDED.name,
    category_id = EXCLUDED.category_id,
    "order" = EXCLUDED."order",
    updated_at = NOW();

-- Grit & Growth values
INSERT INTO "values" (value_id, name, category_id, "order", created_at, updated_at)
VALUES 
    ('growth', 'Growth', (SELECT id FROM value_categories WHERE name = 'Grit & Growth'), 1, NOW(), NOW()),
    ('resilience', 'Resilience', (SELECT id FROM value_categories WHERE name = 'Grit & Growth'), 2, NOW(), NOW()),
    ('discipline', 'Discipline', (SELECT id FROM value_categories WHERE name = 'Grit & Growth'), 3, NOW(), NOW()),
    ('courage', 'Courage', (SELECT id FROM value_categories WHERE name = 'Grit & Growth'), 4, NOW(), NOW()),
    ('excellence', 'Excellence', (SELECT id FROM value_categories WHERE name = 'Grit & Growth'), 5, NOW(), NOW()),
    ('ambition', 'Ambition', (SELECT id FROM value_categories WHERE name = 'Grit & Growth'), 6, NOW(), NOW()),
    ('wisdom', 'Wisdom', (SELECT id FROM value_categories WHERE name = 'Grit & Growth'), 7, NOW(), NOW()),
    ('optimism', 'Optimism', (SELECT id FROM value_categories WHERE name = 'Grit & Growth'), 8, NOW(), NOW())
ON CONFLICT (value_id) DO UPDATE SET
    name = EXCLUDED.name,
    category_id = EXCLUDED.category_id,
    "order" = EXCLUDED."order",
    updated_at = NOW();

-- Heart & Connection values
INSERT INTO "values" (value_id, name, category_id, "order", created_at, updated_at)
VALUES 
    ('connection', 'Connection', (SELECT id FROM value_categories WHERE name = 'Heart & Connection'), 1, NOW(), NOW()),
    ('empathy', 'Empathy', (SELECT id FROM value_categories WHERE name = 'Heart & Connection'), 2, NOW(), NOW()),
    ('compassion', 'Compassion', (SELECT id FROM value_categories WHERE name = 'Heart & Connection'), 3, NOW(), NOW()),
    ('authenticity', 'Authenticity', (SELECT id FROM value_categories WHERE name = 'Heart & Connection'), 4, NOW(), NOW()),
    ('passion', 'Passion', (SELECT id FROM value_categories WHERE name = 'Heart & Connection'), 5, NOW(), NOW()),
    ('gratitude', 'Gratitude', (SELECT id FROM value_categories WHERE name = 'Heart & Connection'), 6, NOW(), NOW()),
    ('humility', 'Humility', (SELECT id FROM value_categories WHERE name = 'Heart & Connection'), 7, NOW(), NOW()),
    ('integrity', 'Integrity', (SELECT id FROM value_categories WHERE name = 'Heart & Connection'), 8, NOW(), NOW()),
    ('balance', 'Balance', (SELECT id FROM value_categories WHERE name = 'Heart & Connection'), 9, NOW(), NOW()),
    ('adventure', 'Adventure', (SELECT id FROM value_categories WHERE name = 'Heart & Connection'), 10, NOW(), NOW())
ON CONFLICT (value_id) DO UPDATE SET
    name = EXCLUDED.name,
    category_id = EXCLUDED.category_id,
    "order" = EXCLUDED."order",
    updated_at = NOW();

-- ============================================================
-- INTENTS
-- ============================================================
INSERT INTO intents (intent_id, title, description, icon, color, "order", created_at, updated_at)
VALUES 
    ('find-cofounder', 'Find a Cofounder', 'Looking for the right co-founder to build and grow your startup', 'Target', 'from-blue-500 to-cyan-500', 1, NOW(), NOW()),
    ('offer-skills', 'Offer Your Skills', 'Connect with startups that need your expertise and skills', 'Sparkles', 'from-green-500 to-emerald-500', 2, NOW(), NOW()),
    ('idea-sprint', 'Start Idea Sprint', 'Build your idea, validate it, and find the perfect cofounder', 'Zap', 'from-purple-500 to-indigo-500', 3, NOW(), NOW())
ON CONFLICT (intent_id) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    icon = EXCLUDED.icon,
    color = EXCLUDED.color,
    "order" = EXCLUDED."order",
    updated_at = NOW();

-- ============================================================
-- INDUSTRIES
-- ============================================================
INSERT INTO industries (name, "order", created_at, updated_at)
VALUES 
    ('Technology', 1, NOW(), NOW()),
    ('Healthcare', 2, NOW(), NOW()),
    ('Fintech', 3, NOW(), NOW()),
    ('E-commerce', 4, NOW(), NOW()),
    ('Education', 5, NOW(), NOW()),
    ('SaaS', 6, NOW(), NOW()),
    ('AI/ML', 7, NOW(), NOW()),
    ('Blockchain', 8, NOW(), NOW()),
    ('Real Estate', 9, NOW(), NOW()),
    ('Food & Beverage', 10, NOW(), NOW()),
    ('Transportation', 11, NOW(), NOW()),
    ('Energy', 12, NOW(), NOW()),
    ('Entertainment', 13, NOW(), NOW()),
    ('Manufacturing', 14, NOW(), NOW()),
    ('Retail', 15, NOW(), NOW()),
    ('Media', 16, NOW(), NOW()),
    ('Travel', 17, NOW(), NOW()),
    ('Sports', 18, NOW(), NOW()),
    ('Gaming', 19, NOW(), NOW()),
    ('Fashion', 20, NOW(), NOW())
ON CONFLICT (name) DO UPDATE SET
    "order" = EXCLUDED."order",
    updated_at = NOW();

-- ============================================================
-- SKILLS
-- ============================================================
INSERT INTO skills (name, "order", created_at, updated_at)
VALUES 
    ('Technical Development', 1, NOW(), NOW()),
    ('Product Management', 2, NOW(), NOW()),
    ('Marketing', 3, NOW(), NOW()),
    ('Sales', 4, NOW(), NOW()),
    ('Operations', 5, NOW(), NOW()),
    ('Finance', 6, NOW(), NOW()),
    ('Design', 7, NOW(), NOW()),
    ('Business Strategy', 8, NOW(), NOW()),
    ('Fundraising', 9, NOW(), NOW()),
    ('Legal', 10, NOW(), NOW()),
    ('HR', 11, NOW(), NOW()),
    ('Data Analysis', 12, NOW(), NOW()),
    ('AI/ML', 13, NOW(), NOW()),
    ('Blockchain', 14, NOW(), NOW()),
    ('Mobile Development', 15, NOW(), NOW()),
    ('Backend Development', 16, NOW(), NOW()),
    ('Frontend Development', 17, NOW(), NOW()),
    ('DevOps', 18, NOW(), NOW()),
    ('UX/UI Design', 19, NOW(), NOW()),
    ('Growth Hacking', 20, NOW(), NOW()),
    ('Content Marketing', 21, NOW(), NOW()),
    ('SEO/SEM', 22, NOW(), NOW()),
    ('Social Media', 23, NOW(), NOW()),
    ('PR', 24, NOW(), NOW())
ON CONFLICT (name) DO UPDATE SET
    "order" = EXCLUDED."order",
    updated_at = NOW();

-- ============================================================
-- EXPERIENCE LEVELS
-- ============================================================
INSERT INTO experience_levels (level_id, name, description, "order", created_at, updated_at)
VALUES 
    ('entry', 'Entry Level', '0-2 years', 1, NOW(), NOW()),
    ('mid', 'Mid Level', '3-5 years', 2, NOW(), NOW()),
    ('senior', 'Senior Level', '6-10 years', 3, NOW(), NOW()),
    ('executive', 'Executive', '10+ years', 4, NOW(), NOW())
ON CONFLICT (level_id) DO UPDATE SET
    name = EXCLUDED.name,
    description = EXCLUDED.description,
    "order" = EXCLUDED."order",
    updated_at = NOW();

-- ============================================================
-- COFOUNDER ROLES
-- ============================================================
INSERT INTO cofounder_roles (role_id, name, "order", created_at, updated_at)
VALUES 
    ('technical', 'Technical Co-founder', 1, NOW(), NOW()),
    ('business', 'Business Co-founder', 2, NOW(), NOW()),
    ('marketing', 'Marketing Co-founder', 3, NOW(), NOW()),
    ('operations', 'Operations Co-founder', 4, NOW(), NOW()),
    ('finance', 'Finance Co-founder', 5, NOW(), NOW()),
    ('design', 'Design Co-founder', 6, NOW(), NOW())
ON CONFLICT (role_id) DO UPDATE SET
    name = EXCLUDED.name,
    "order" = EXCLUDED."order",
    updated_at = NOW();

-- ============================================================
-- WORK STYLES
-- ============================================================
INSERT INTO work_styles (style_id, name, "order", created_at, updated_at)
VALUES 
    ('remote-first', 'Remote-first', 1, NOW(), NOW()),
    ('hybrid', 'Hybrid', 2, NOW(), NOW()),
    ('office-based', 'Office-based', 3, NOW(), NOW()),
    ('flexible', 'Flexible hours', 4, NOW(), NOW())
ON CONFLICT (style_id) DO UPDATE SET
    name = EXCLUDED.name,
    "order" = EXCLUDED."order",
    updated_at = NOW();

-- ============================================================
-- TIME COMMITMENTS
-- ============================================================
INSERT INTO time_commitments (commitment_id, name, description, "order", created_at, updated_at)
VALUES 
    ('full-time', 'Full-Time', '40+ hrs/week', 1, NOW(), NOW()),
    ('part-time', 'Part-Time', '20-30 hrs/week', 2, NOW(), NOW()),
    ('flexible', 'Flexible', '10-20 hrs/week', 3, NOW(), NOW()),
    ('weekends', 'Weekends Only', '', 4, NOW(), NOW()),
    ('evenings', 'Evenings Only', '', 5, NOW(), NOW())
ON CONFLICT (commitment_id) DO UPDATE SET
    name = EXCLUDED.name,
    description = EXCLUDED.description,
    "order" = EXCLUDED."order",
    updated_at = NOW();

-- ============================================================
-- AVAILABILITIES
-- ============================================================
INSERT INTO availabilities (availability_id, name, "order", created_at, updated_at)
VALUES 
    ('immediately', 'Immediately', 1, NOW(), NOW()),
    ('1-month', 'Within 1 month', 2, NOW(), NOW()),
    ('3-months', 'Within 3 months', 3, NOW(), NOW()),
    ('6-months', 'Within 6 months', 4, NOW(), NOW())
ON CONFLICT (availability_id) DO UPDATE SET
    name = EXCLUDED.name,
    "order" = EXCLUDED."order",
    updated_at = NOW();

-- ============================================================
-- LOCATION PREFERENCES
-- ============================================================
INSERT INTO location_preferences (location_id, name, "order", created_at, updated_at)
VALUES 
    ('same-city', 'Same City', 1, NOW(), NOW()),
    ('same-country', 'Same Country', 2, NOW(), NOW()),
    ('remote', 'Remote OK', 3, NOW(), NOW()),
    ('anywhere', 'Anywhere', 4, NOW(), NOW())
ON CONFLICT (location_id) DO UPDATE SET
    name = EXCLUDED.name,
    "order" = EXCLUDED."order",
    updated_at = NOW();

-- Commit transaction
COMMIT;

-- ============================================================
-- Verification queries (optional - uncomment to verify data)
-- ============================================================
-- SELECT 'Value Categories' as table_name, COUNT(*) as count FROM value_categories
-- UNION ALL SELECT 'Values', COUNT(*) FROM "values"
-- UNION ALL SELECT 'Intents', COUNT(*) FROM intents
-- UNION ALL SELECT 'Industries', COUNT(*) FROM industries
-- UNION ALL SELECT 'Skills', COUNT(*) FROM skills
-- UNION ALL SELECT 'Experience Levels', COUNT(*) FROM experience_levels
-- UNION ALL SELECT 'Cofounder Roles', COUNT(*) FROM cofounder_roles
-- UNION ALL SELECT 'Work Styles', COUNT(*) FROM work_styles
-- UNION ALL SELECT 'Time Commitments', COUNT(*) FROM time_commitments
-- UNION ALL SELECT 'Availabilities', COUNT(*) FROM availabilities
-- UNION ALL SELECT 'Location Preferences', COUNT(*) FROM location_preferences;

SELECT '✓ Onboarding data seeded successfully!' as status;
