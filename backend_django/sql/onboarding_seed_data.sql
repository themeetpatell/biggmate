-- SQL Schema and Seed Data for Onboarding Options

-- =====================================================
-- Create Tables
-- =====================================================

-- Value Categories Table
CREATE TABLE IF NOT EXISTS value_categories (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(100) UNIQUE NOT NULL,
    `order` INTEGER DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Values Table
CREATE TABLE IF NOT EXISTS `values` (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    value_id VARCHAR(50) UNIQUE NOT NULL,
    name VARCHAR(100) NOT NULL,
    category_id INTEGER NOT NULL,
    `order` INTEGER DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES value_categories(id) ON DELETE CASCADE
);

-- Intents Table
CREATE TABLE IF NOT EXISTS intents (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    intent_id VARCHAR(50) UNIQUE NOT NULL,
    title VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    icon VARCHAR(50) NOT NULL,
    color VARCHAR(50) NOT NULL,
    `order` INTEGER DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Industries Table
CREATE TABLE IF NOT EXISTS industries (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(100) UNIQUE NOT NULL,
    `order` INTEGER DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Skills Table
CREATE TABLE IF NOT EXISTS skills (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(100) UNIQUE NOT NULL,
    `order` INTEGER DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Experience Levels Table
CREATE TABLE IF NOT EXISTS experience_levels (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    level_id VARCHAR(50) UNIQUE NOT NULL,
    name VARCHAR(100) NOT NULL,
    description VARCHAR(200) NOT NULL,
    `order` INTEGER DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- =====================================================
-- Seed Data
-- =====================================================

-- Value Categories
INSERT INTO value_categories (name, `order`) VALUES
('Vision & Creation', 1),
('Grit & Growth', 2),
('Heart & Connection', 3);

-- Values
INSERT INTO `values` (value_id, name, category_id, `order`) VALUES
-- Vision & Creation
('innovation', 'Innovation', 1, 1),
('creativity', 'Creativity', 1, 2),
('impact', 'Impact', 1, 3),
('legacy', 'Legacy', 1, 4),
('leadership', 'Leadership', 1, 5),
('curiosity', 'Curiosity', 1, 6),
('freedom', 'Freedom', 1, 7),

-- Grit & Growth
('growth', 'Growth', 2, 1),
('resilience', 'Resilience', 2, 2),
('discipline', 'Discipline', 2, 3),
('courage', 'Courage', 2, 4),
('excellence', 'Excellence', 2, 5),
('ambition', 'Ambition', 2, 6),
('wisdom', 'Wisdom', 2, 7),
('optimism', 'Optimism', 2, 8),

-- Heart & Connection
('connection', 'Connection', 3, 1),
('empathy', 'Empathy', 3, 2),
('compassion', 'Compassion', 3, 3),
('authenticity', 'Authenticity', 3, 4),
('passion', 'Passion', 3, 5),
('gratitude', 'Gratitude', 3, 6),
('humility', 'Humility', 3, 7),
('integrity', 'Integrity', 3, 8),
('balance', 'Balance', 3, 9),
('adventure', 'Adventure', 3, 10);

-- Intents
INSERT INTO intents (intent_id, title, description, icon, color, `order`) VALUES
('find-cofounder', 'Find a Cofounder', 'Looking for the right co-founder to build and grow your startup', 'Target', 'from-blue-500 to-cyan-500', 1),
('offer-skills', 'Offer Your Skills', 'Connect with startups that need your expertise and skills', 'Sparkles', 'from-green-500 to-emerald-500', 2),
('idea-sprint', 'Start Idea Sprint', 'Build your idea, validate it, and find the perfect cofounder', 'Zap', 'from-purple-500 to-indigo-500', 3);

-- Industries
INSERT INTO industries (name, `order`) VALUES
('Technology', 1),
('Healthcare', 2),
('Fintech', 3),
('E-commerce', 4),
('Education', 5),
('SaaS', 6),
('AI/ML', 7),
('Blockchain', 8),
('Real Estate', 9),
('Food & Beverage', 10),
('Transportation', 11),
('Energy', 12),
('Entertainment', 13),
('Manufacturing', 14),
('Retail', 15),
('Media', 16),
('Travel', 17),
('Sports', 18),
('Gaming', 19),
('Fashion', 20);

-- Skills
INSERT INTO skills (name, `order`) VALUES
('Technical Development', 1),
('Product Management', 2),
('Marketing', 3),
('Sales', 4),
('Operations', 5),
('Finance', 6),
('Design', 7),
('Business Strategy', 8),
('Fundraising', 9),
('Legal', 10),
('HR', 11),
('Data Analysis', 12),
('AI/ML', 13),
('Blockchain', 14),
('Mobile Development', 15),
('Backend Development', 16),
('Frontend Development', 17),
('DevOps', 18),
('UX/UI Design', 19),
('Growth Hacking', 20),
('Content Marketing', 21),
('SEO/SEM', 22),
('Social Media', 23),
('PR', 24);

-- Experience Levels
INSERT INTO experience_levels (level_id, name, description, `order`) VALUES
('entry', 'Entry Level', '0-2 years', 1),
('mid', 'Mid Level', '3-5 years', 2),
('senior', 'Senior Level', '6-10 years', 3),
('executive', 'Executive', '10+ years', 4);
