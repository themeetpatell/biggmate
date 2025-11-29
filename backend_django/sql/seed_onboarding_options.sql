-- =====================================================
-- Seed Data for Onboarding Options Tables
-- Run this after migrations to populate the database
-- =====================================================

-- Clear existing data (optional - uncomment if needed)
-- DELETE FROM work_types;
-- DELETE FROM hourly_rates;
-- DELETE FROM startup_stages;
-- DELETE FROM location_preferences;
-- DELETE FROM availabilities;
-- DELETE FROM time_commitments;
-- DELETE FROM work_styles;
-- DELETE FROM cofounder_roles;
-- DELETE FROM experience_levels;
-- DELETE FROM skills;
-- DELETE FROM industries;
-- DELETE FROM intents;
-- DELETE FROM values;
-- DELETE FROM value_categories;

-- =====================================================
-- Work Types
-- =====================================================
INSERT INTO work_types (work_type_id, name, "order", created_at, updated_at) VALUES
('product_development', 'Product Development', 1, NOW(), NOW()),
('consulting', 'Consulting', 2, NOW(), NOW()),
('design_work', 'Design Work', 3, NOW(), NOW()),
('marketing_campaign', 'Marketing Campaign', 4, NOW(), NOW()),
('technical_architecture', 'Technical Architecture', 5, NOW(), NOW()),
('mvp_building', 'MVP Building', 6, NOW(), NOW()),
('growth_strategy', 'Growth Strategy', 7, NOW(), NOW()),
('fundraising_support', 'Fundraising Support', 8, NOW(), NOW()),
('data_analytics', 'Data Analytics', 9, NOW(), NOW()),
('sales_development', 'Sales Development', 10, NOW(), NOW()),
('customer_research', 'Customer Research', 11, NOW(), NOW()),
('legal_compliance', 'Legal & Compliance', 12, NOW(), NOW())
ON CONFLICT (work_type_id) DO UPDATE SET name = EXCLUDED.name, "order" = EXCLUDED."order", updated_at = NOW();

-- =====================================================
-- Hourly Rates
-- =====================================================
INSERT INTO hourly_rates (rate_id, name, min_rate, max_rate, "order", created_at, updated_at) VALUES
('25-50', '$25-50/hr', 25, 50, 1, NOW(), NOW()),
('50-100', '$50-100/hr', 50, 100, 2, NOW(), NOW()),
('100-150', '$100-150/hr', 100, 150, 3, NOW(), NOW()),
('150-200', '$150-200/hr', 150, 200, 4, NOW(), NOW()),
('200+', '$200+/hr', 200, NULL, 5, NOW(), NOW()),
('equity', 'Equity only', NULL, NULL, 6, NOW(), NOW()),
('negotiable', 'Negotiable', NULL, NULL, 7, NOW(), NOW())
ON CONFLICT (rate_id) DO UPDATE SET name = EXCLUDED.name, min_rate = EXCLUDED.min_rate, max_rate = EXCLUDED.max_rate, "order" = EXCLUDED."order", updated_at = NOW();

-- =====================================================
-- Startup Stages
-- =====================================================
INSERT INTO startup_stages (stage_id, name, description, "order", created_at, updated_at) VALUES
('idea', 'Idea Stage', 'Just have an idea, no product yet', 1, NOW(), NOW()),
('validation', 'Validation', 'Testing the idea with potential customers', 2, NOW(), NOW()),
('prototype', 'Prototype', 'Building initial prototype or mockup', 3, NOW(), NOW()),
('mvp', 'MVP', 'Minimum viable product is ready', 4, NOW(), NOW()),
('beta', 'Beta', 'Product is in beta testing', 5, NOW(), NOW()),
('launched', 'Launched', 'Product is live with paying customers', 6, NOW(), NOW()),
('growth', 'Growth Stage', 'Scaling the business', 7, NOW(), NOW()),
('scaling', 'Scaling', 'Rapid expansion phase', 8, NOW(), NOW())
ON CONFLICT (stage_id) DO UPDATE SET name = EXCLUDED.name, description = EXCLUDED.description, "order" = EXCLUDED."order", updated_at = NOW();

-- =====================================================
-- Industries (Extended)
-- =====================================================
INSERT INTO industries (name, "order", created_at, updated_at) VALUES
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
('Travel & Hospitality', 11, NOW(), NOW()),
('Media & Entertainment', 12, NOW(), NOW()),
('Logistics & Supply Chain', 13, NOW(), NOW()),
('Clean Energy', 14, NOW(), NOW()),
('Agriculture', 15, NOW(), NOW()),
('Legal Tech', 16, NOW(), NOW()),
('HR Tech', 17, NOW(), NOW()),
('InsurTech', 18, NOW(), NOW()),
('Gaming', 19, NOW(), NOW()),
('Social Impact', 20, NOW(), NOW()),
('IoT', 21, NOW(), NOW()),
('Cybersecurity', 22, NOW(), NOW()),
('Consumer Products', 23, NOW(), NOW()),
('B2B Services', 24, NOW(), NOW()),
('Marketplace', 25, NOW(), NOW())
ON CONFLICT (name) DO UPDATE SET "order" = EXCLUDED."order", updated_at = NOW();

-- =====================================================
-- Availabilities (Extended)
-- =====================================================
INSERT INTO availabilities (availability_id, name, "order", created_at, updated_at) VALUES
('full-time', 'Full-Time (40+ hrs/week)', 1, NOW(), NOW()),
('part-time', 'Part-Time (20-30 hrs/week)', 2, NOW(), NOW()),
('flexible', 'Flexible (10-20 hrs/week)', 3, NOW(), NOW()),
('weekends', 'Weekends Only', 4, NOW(), NOW()),
('evenings', 'Evenings Only', 5, NOW(), NOW()),
('project-based', 'Project-Based', 6, NOW(), NOW())
ON CONFLICT (availability_id) DO UPDATE SET name = EXCLUDED.name, "order" = EXCLUDED."order", updated_at = NOW();

-- =====================================================
-- Location Preferences (Extended)
-- =====================================================
INSERT INTO location_preferences (location_id, name, "order", created_at, updated_at) VALUES
('remote', 'Remote Only', 1, NOW(), NOW()),
('hybrid', 'Hybrid', 2, NOW(), NOW()),
('onsite', 'On-site', 3, NOW(), NOW()),
('flexible', 'Flexible / Any', 4, NOW(), NOW())
ON CONFLICT (location_id) DO UPDATE SET name = EXCLUDED.name, "order" = EXCLUDED."order", updated_at = NOW();

-- =====================================================
-- Time Commitments
-- =====================================================
INSERT INTO time_commitments (commitment_id, name, description, "order", created_at, updated_at) VALUES
('full-time', 'Full-Time', '40+ hours per week', 1, NOW(), NOW()),
('part-time', 'Part-Time', '20-30 hours per week', 2, NOW(), NOW()),
('flexible', 'Flexible', 'Varies based on project needs', 3, NOW(), NOW()),
('weekends-only', 'Weekends Only', 'Available on weekends', 4, NOW(), NOW()),
('evenings-only', 'Evenings Only', 'Available in evenings', 5, NOW(), NOW())
ON CONFLICT (commitment_id) DO UPDATE SET name = EXCLUDED.name, description = EXCLUDED.description, "order" = EXCLUDED."order", updated_at = NOW();

-- =====================================================
-- Work Styles
-- =====================================================
INSERT INTO work_styles (style_id, name, "order", created_at, updated_at) VALUES
('collaborative', 'Collaborative', 1, NOW(), NOW()),
('independent', 'Independent', 2, NOW(), NOW()),
('structured', 'Structured', 3, NOW(), NOW()),
('flexible', 'Flexible', 4, NOW(), NOW()),
('fast-paced', 'Fast-Paced', 5, NOW(), NOW()),
('methodical', 'Methodical', 6, NOW(), NOW())
ON CONFLICT (style_id) DO UPDATE SET name = EXCLUDED.name, "order" = EXCLUDED."order", updated_at = NOW();

-- =====================================================
-- Cofounder Roles
-- =====================================================
INSERT INTO cofounder_roles (role_id, name, "order", created_at, updated_at) VALUES
('technical', 'Technical Co-founder', 1, NOW(), NOW()),
('business', 'Business Co-founder', 2, NOW(), NOW()),
('product', 'Product Co-founder', 3, NOW(), NOW()),
('design', 'Design Co-founder', 4, NOW(), NOW()),
('marketing', 'Marketing Co-founder', 5, NOW(), NOW()),
('sales', 'Sales Co-founder', 6, NOW(), NOW()),
('operations', 'Operations Co-founder', 7, NOW(), NOW()),
('finance', 'Finance Co-founder', 8, NOW(), NOW())
ON CONFLICT (role_id) DO UPDATE SET name = EXCLUDED.name, "order" = EXCLUDED."order", updated_at = NOW();

-- =====================================================
-- Experience Levels
-- =====================================================
INSERT INTO experience_levels (level_id, name, description, "order", created_at, updated_at) VALUES
('student', 'Student', 'Currently in school or recently graduated', 1, NOW(), NOW()),
('entry', 'Entry Level', '0-2 years of experience', 2, NOW(), NOW()),
('intermediate', 'Intermediate', '3-5 years of experience', 3, NOW(), NOW()),
('senior', 'Senior', '5-10 years of experience', 4, NOW(), NOW()),
('expert', 'Expert', '10+ years of experience', 5, NOW(), NOW()),
('serial-entrepreneur', 'Serial Entrepreneur', 'Founded multiple startups', 6, NOW(), NOW())
ON CONFLICT (level_id) DO UPDATE SET name = EXCLUDED.name, description = EXCLUDED.description, "order" = EXCLUDED."order", updated_at = NOW();

-- =====================================================
-- Skills (Extended)
-- =====================================================
INSERT INTO skills (name, "order", created_at, updated_at) VALUES
-- Technical Skills
('JavaScript', 1, NOW(), NOW()),
('Python', 2, NOW(), NOW()),
('React', 3, NOW(), NOW()),
('Node.js', 4, NOW(), NOW()),
('TypeScript', 5, NOW(), NOW()),
('Java', 6, NOW(), NOW()),
('Go', 7, NOW(), NOW()),
('Rust', 8, NOW(), NOW()),
('Swift', 9, NOW(), NOW()),
('Kotlin', 10, NOW(), NOW()),
('Flutter', 11, NOW(), NOW()),
('React Native', 12, NOW(), NOW()),
('AWS', 13, NOW(), NOW()),
('Azure', 14, NOW(), NOW()),
('GCP', 15, NOW(), NOW()),
('Docker', 16, NOW(), NOW()),
('Kubernetes', 17, NOW(), NOW()),
('Machine Learning', 18, NOW(), NOW()),
('Data Science', 19, NOW(), NOW()),
('DevOps', 20, NOW(), NOW()),
('Cybersecurity', 21, NOW(), NOW()),
('Blockchain Development', 22, NOW(), NOW()),
-- Business Skills
('Business Development', 30, NOW(), NOW()),
('Sales', 31, NOW(), NOW()),
('Marketing', 32, NOW(), NOW()),
('Growth Hacking', 33, NOW(), NOW()),
('SEO/SEM', 34, NOW(), NOW()),
('Content Marketing', 35, NOW(), NOW()),
('Social Media Marketing', 36, NOW(), NOW()),
('Email Marketing', 37, NOW(), NOW()),
('Partnership Development', 38, NOW(), NOW()),
('Fundraising', 39, NOW(), NOW()),
('Investor Relations', 40, NOW(), NOW()),
('Financial Modeling', 41, NOW(), NOW()),
('Accounting', 42, NOW(), NOW()),
('Legal', 43, NOW(), NOW()),
-- Design Skills
('UI Design', 50, NOW(), NOW()),
('UX Design', 51, NOW(), NOW()),
('Product Design', 52, NOW(), NOW()),
('Graphic Design', 53, NOW(), NOW()),
('Brand Design', 54, NOW(), NOW()),
('Motion Design', 55, NOW(), NOW()),
('3D Design', 56, NOW(), NOW()),
('Figma', 57, NOW(), NOW()),
('Adobe Creative Suite', 58, NOW(), NOW()),
-- Product Skills
('Product Management', 60, NOW(), NOW()),
('Project Management', 61, NOW(), NOW()),
('Agile/Scrum', 62, NOW(), NOW()),
('User Research', 63, NOW(), NOW()),
('Data Analytics', 64, NOW(), NOW()),
('A/B Testing', 65, NOW(), NOW()),
-- Soft Skills
('Leadership', 70, NOW(), NOW()),
('Communication', 71, NOW(), NOW()),
('Negotiation', 72, NOW(), NOW()),
('Public Speaking', 73, NOW(), NOW()),
('Team Building', 74, NOW(), NOW()),
('Strategic Planning', 75, NOW(), NOW())
ON CONFLICT (name) DO UPDATE SET "order" = EXCLUDED."order", updated_at = NOW();

-- =====================================================
-- Value Categories
-- =====================================================
INSERT INTO value_categories (name, "order", created_at, updated_at) VALUES
('Work & Achievement', 1, NOW(), NOW()),
('Relationships & Community', 2, NOW(), NOW()),
('Innovation & Growth', 3, NOW(), NOW()),
('Balance & Well-being', 4, NOW(), NOW())
ON CONFLICT (name) DO UPDATE SET "order" = EXCLUDED."order", updated_at = NOW();

-- =====================================================
-- Values
-- =====================================================
-- Note: First get the category IDs after inserting categories

-- Work & Achievement Values
INSERT INTO "values" (value_id, name, category_id, "order", created_at, updated_at)
SELECT 'ambition', 'Ambition', id, 1, NOW(), NOW() FROM value_categories WHERE name = 'Work & Achievement'
ON CONFLICT (value_id) DO UPDATE SET name = EXCLUDED.name, "order" = EXCLUDED."order", updated_at = NOW();

INSERT INTO "values" (value_id, name, category_id, "order", created_at, updated_at)
SELECT 'excellence', 'Excellence', id, 2, NOW(), NOW() FROM value_categories WHERE name = 'Work & Achievement'
ON CONFLICT (value_id) DO UPDATE SET name = EXCLUDED.name, "order" = EXCLUDED."order", updated_at = NOW();

INSERT INTO "values" (value_id, name, category_id, "order", created_at, updated_at)
SELECT 'hard_work', 'Hard Work', id, 3, NOW(), NOW() FROM value_categories WHERE name = 'Work & Achievement'
ON CONFLICT (value_id) DO UPDATE SET name = EXCLUDED.name, "order" = EXCLUDED."order", updated_at = NOW();

INSERT INTO "values" (value_id, name, category_id, "order", created_at, updated_at)
SELECT 'persistence', 'Persistence', id, 4, NOW(), NOW() FROM value_categories WHERE name = 'Work & Achievement'
ON CONFLICT (value_id) DO UPDATE SET name = EXCLUDED.name, "order" = EXCLUDED."order", updated_at = NOW();

INSERT INTO "values" (value_id, name, category_id, "order", created_at, updated_at)
SELECT 'results_oriented', 'Results-Oriented', id, 5, NOW(), NOW() FROM value_categories WHERE name = 'Work & Achievement'
ON CONFLICT (value_id) DO UPDATE SET name = EXCLUDED.name, "order" = EXCLUDED."order", updated_at = NOW();

-- Relationships & Community Values
INSERT INTO "values" (value_id, name, category_id, "order", created_at, updated_at)
SELECT 'collaboration', 'Collaboration', id, 1, NOW(), NOW() FROM value_categories WHERE name = 'Relationships & Community'
ON CONFLICT (value_id) DO UPDATE SET name = EXCLUDED.name, "order" = EXCLUDED."order", updated_at = NOW();

INSERT INTO "values" (value_id, name, category_id, "order", created_at, updated_at)
SELECT 'trust', 'Trust', id, 2, NOW(), NOW() FROM value_categories WHERE name = 'Relationships & Community'
ON CONFLICT (value_id) DO UPDATE SET name = EXCLUDED.name, "order" = EXCLUDED."order", updated_at = NOW();

INSERT INTO "values" (value_id, name, category_id, "order", created_at, updated_at)
SELECT 'respect', 'Respect', id, 3, NOW(), NOW() FROM value_categories WHERE name = 'Relationships & Community'
ON CONFLICT (value_id) DO UPDATE SET name = EXCLUDED.name, "order" = EXCLUDED."order", updated_at = NOW();

INSERT INTO "values" (value_id, name, category_id, "order", created_at, updated_at)
SELECT 'empathy', 'Empathy', id, 4, NOW(), NOW() FROM value_categories WHERE name = 'Relationships & Community'
ON CONFLICT (value_id) DO UPDATE SET name = EXCLUDED.name, "order" = EXCLUDED."order", updated_at = NOW();

INSERT INTO "values" (value_id, name, category_id, "order", created_at, updated_at)
SELECT 'diversity', 'Diversity & Inclusion', id, 5, NOW(), NOW() FROM value_categories WHERE name = 'Relationships & Community'
ON CONFLICT (value_id) DO UPDATE SET name = EXCLUDED.name, "order" = EXCLUDED."order", updated_at = NOW();

-- Innovation & Growth Values
INSERT INTO "values" (value_id, name, category_id, "order", created_at, updated_at)
SELECT 'innovation', 'Innovation', id, 1, NOW(), NOW() FROM value_categories WHERE name = 'Innovation & Growth'
ON CONFLICT (value_id) DO UPDATE SET name = EXCLUDED.name, "order" = EXCLUDED."order", updated_at = NOW();

INSERT INTO "values" (value_id, name, category_id, "order", created_at, updated_at)
SELECT 'creativity', 'Creativity', id, 2, NOW(), NOW() FROM value_categories WHERE name = 'Innovation & Growth'
ON CONFLICT (value_id) DO UPDATE SET name = EXCLUDED.name, "order" = EXCLUDED."order", updated_at = NOW();

INSERT INTO "values" (value_id, name, category_id, "order", created_at, updated_at)
SELECT 'continuous_learning', 'Continuous Learning', id, 3, NOW(), NOW() FROM value_categories WHERE name = 'Innovation & Growth'
ON CONFLICT (value_id) DO UPDATE SET name = EXCLUDED.name, "order" = EXCLUDED."order", updated_at = NOW();

INSERT INTO "values" (value_id, name, category_id, "order", created_at, updated_at)
SELECT 'adaptability', 'Adaptability', id, 4, NOW(), NOW() FROM value_categories WHERE name = 'Innovation & Growth'
ON CONFLICT (value_id) DO UPDATE SET name = EXCLUDED.name, "order" = EXCLUDED."order", updated_at = NOW();

INSERT INTO "values" (value_id, name, category_id, "order", created_at, updated_at)
SELECT 'risk_taking', 'Risk Taking', id, 5, NOW(), NOW() FROM value_categories WHERE name = 'Innovation & Growth'
ON CONFLICT (value_id) DO UPDATE SET name = EXCLUDED.name, "order" = EXCLUDED."order", updated_at = NOW();

-- Balance & Well-being Values
INSERT INTO "values" (value_id, name, category_id, "order", created_at, updated_at)
SELECT 'work_life_balance', 'Work-Life Balance', id, 1, NOW(), NOW() FROM value_categories WHERE name = 'Balance & Well-being'
ON CONFLICT (value_id) DO UPDATE SET name = EXCLUDED.name, "order" = EXCLUDED."order", updated_at = NOW();

INSERT INTO "values" (value_id, name, category_id, "order", created_at, updated_at)
SELECT 'health_wellness', 'Health & Wellness', id, 2, NOW(), NOW() FROM value_categories WHERE name = 'Balance & Well-being'
ON CONFLICT (value_id) DO UPDATE SET name = EXCLUDED.name, "order" = EXCLUDED."order", updated_at = NOW();

INSERT INTO "values" (value_id, name, category_id, "order", created_at, updated_at)
SELECT 'flexibility', 'Flexibility', id, 3, NOW(), NOW() FROM value_categories WHERE name = 'Balance & Well-being'
ON CONFLICT (value_id) DO UPDATE SET name = EXCLUDED.name, "order" = EXCLUDED."order", updated_at = NOW();

INSERT INTO "values" (value_id, name, category_id, "order", created_at, updated_at)
SELECT 'autonomy', 'Autonomy', id, 4, NOW(), NOW() FROM value_categories WHERE name = 'Balance & Well-being'
ON CONFLICT (value_id) DO UPDATE SET name = EXCLUDED.name, "order" = EXCLUDED."order", updated_at = NOW();

INSERT INTO "values" (value_id, name, category_id, "order", created_at, updated_at)
SELECT 'mindfulness', 'Mindfulness', id, 5, NOW(), NOW() FROM value_categories WHERE name = 'Balance & Well-being'
ON CONFLICT (value_id) DO UPDATE SET name = EXCLUDED.name, "order" = EXCLUDED."order", updated_at = NOW();

-- =====================================================
-- Intents
-- =====================================================
INSERT INTO intents (intent_id, title, description, icon, color, "order", created_at, updated_at) VALUES
('find_cofounder', 'Find a Co-founder', 'Looking for a technical or business partner to build something together', 'Users', 'blue', 1, NOW(), NOW()),
('join_startup', 'Join a Startup', 'Looking to join an early-stage startup as a key team member', 'Rocket', 'green', 2, NOW(), NOW()),
('build_network', 'Build Network', 'Connect with other entrepreneurs and expand professional network', 'Network', 'purple', 3, NOW(), NOW()),
('find_mentor', 'Find a Mentor', 'Looking for guidance and mentorship from experienced entrepreneurs', 'GraduationCap', 'orange', 4, NOW(), NOW()),
('be_mentor', 'Be a Mentor', 'Want to mentor and guide aspiring entrepreneurs', 'Heart', 'pink', 5, NOW(), NOW()),
('find_investors', 'Find Investors', 'Looking for funding and investor connections', 'DollarSign', 'emerald', 6, NOW(), NOW()),
('explore_ideas', 'Explore Ideas', 'Want to explore and validate startup ideas', 'Lightbulb', 'yellow', 7, NOW(), NOW()),
('freelance', 'Freelance Work', 'Looking for freelance or contract opportunities', 'Briefcase', 'indigo', 8, NOW(), NOW())
ON CONFLICT (intent_id) DO UPDATE SET 
    title = EXCLUDED.title, 
    description = EXCLUDED.description, 
    icon = EXCLUDED.icon, 
    color = EXCLUDED.color, 
    "order" = EXCLUDED."order", 
    updated_at = NOW();

-- =====================================================
-- Done!
-- =====================================================
SELECT 'Seed data inserted successfully!' as status;
