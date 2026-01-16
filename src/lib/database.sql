-- This SQL script creates the database schema for the Faith Connect Global application.
-- It is designed for a PostgreSQL database, compatible with Supabase.

-- Drop existing tables to start fresh (optional, for development)
DROP TABLE IF EXISTS
    visitor_participation,
    visitors,
    teaching_materials,
    service_elements,
    live_shows,
    news_items,
    mentorship_classes,
    life_group_members,
    life_groups,
    regional_watch_towers,
    global_prayer_directives,
    family_practices,
    family_group_children,
    family_groups,
    annual_calendar,
    discipleship_classes,
    discipleship_pairs,
    meetings,
    department_members,
    departments,
    courses,
    conferences,
    announcements,
    stories,
    post_reactions,
    posts,
    friendships,
    users CASCADE;

-- ENUM types for structured data
DROP TYPE IF EXISTS user_tribe, citizenship_status, friendship_status, visitor_track, visitor_status, media_type, show_type;
CREATE TYPE user_tribe AS ENUM ('Eagle', 'Lion', 'Marine', 'All');
CREATE TYPE citizenship_status AS ENUM ('Active', 'Suspended', 'Revoked');
CREATE TYPE friendship_status AS ENUM ('pending', 'accepted', 'blocked');
CREATE TYPE visitor_track AS ENUM ('Leadership', 'Warrior', 'Family & Youth');
CREATE TYPE visitor_status AS ENUM ('Active', 'Pending', 'Completed');
CREATE TYPE media_type AS ENUM ('image', 'video');
CREATE TYPE show_type AS ENUM ('podcast', 'radio');

-- Core Users table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash TEXT, -- Store hashed passwords, not plaintext
    location VARCHAR(255),
    avatar_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    
    -- Kingdom ID fields
    kingdom_id_number VARCHAR(50) UNIQUE,
    authority_level INT DEFAULT 1,
    tribe user_tribe DEFAULT 'Eagle',
    badge VARCHAR(100) DEFAULT 'Kingdom Citizen',
    
    -- Status and Metrics
    citizenship_status citizenship_status DEFAULT 'Active',
    authority_title VARCHAR(100) DEFAULT 'Authorized Citizen',
    daily_streak INT DEFAULT 0,
    consistency_score INT DEFAULT 0
);

-- Friendships and Connections
CREATE TABLE friendships (
    user1_id INT REFERENCES users(id) ON DELETE CASCADE,
    user2_id INT REFERENCES users(id) ON DELETE CASCADE,
    status friendship_status DEFAULT 'pending',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    PRIMARY KEY (user1_id, user2_id),
    CONSTRAINT check_different_users CHECK (user1_id <> user2_id)
);

-- Community Feed Posts
CREATE TABLE posts (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    title TEXT,
    content TEXT NOT NULL,
    image_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Reactions to Posts
CREATE TABLE post_reactions (
    post_id INT NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
    user_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    emoji VARCHAR(10) NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    PRIMARY KEY (post_id, user_id, emoji)
);

-- User Stories
CREATE TABLE stories (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    media_url TEXT NOT NULL,
    media_type media_type NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    expires_at TIMESTAMPTZ NOT NULL
);

-- General Announcements
CREATE TABLE announcements (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    category VARCHAR(100),
    created_at DATE DEFAULT CURRENT_DATE
);

-- Conferences
CREATE TABLE conferences (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    dates VARCHAR(255),
    location VARCHAR(255),
    image_url TEXT,
    image_hint VARCHAR(100)
);

-- Courses
CREATE TABLE courses (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    category VARCHAR(100),
    image_url TEXT,
    image_hint VARCHAR(100)
);

-- Departments
CREATE TABLE departments (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) UNIQUE NOT NULL,
    description TEXT,
    icon_name VARCHAR(50)
);

-- Department Membership
CREATE TABLE department_members (
    department_id INT NOT NULL REFERENCES departments(id) ON DELETE CASCADE,
    user_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    PRIMARY KEY (department_id, user_id)
);

-- Departmental Meetings
CREATE TABLE meetings (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    department_id INT REFERENCES departments(id) ON DELETE CASCADE,
    meeting_time TIMESTAMPTZ NOT NULL
);

-- Discipleship (Personal)
CREATE TABLE discipleship_pairs (
    id SERIAL PRIMARY KEY,
    discipler_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    disciple_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    UNIQUE(discipler_id, disciple_id)
);

-- Discipleship (General Classes)
CREATE TABLE discipleship_classes (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT
);

-- Annual Calendar (Ministry Events)
CREATE TABLE annual_calendar (
    id SERIAL PRIMARY KEY,
    month VARCHAR(20) UNIQUE NOT NULL,
    theme VARCHAR(255) NOT NULL,
    purpose TEXT,
    activities TEXT[]
);

-- Family Hub
CREATE TABLE family_groups (
    id SERIAL PRIMARY KEY,
    father_id INT REFERENCES users(id),
    mother_id INT REFERENCES users(id),
    monthly_focus TEXT,
    unity_score VARCHAR(50)
);

CREATE TABLE family_group_children (
    family_group_id INT NOT NULL REFERENCES family_groups(id) ON DELETE CASCADE,
    child_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    PRIMARY KEY (family_group_id, child_id)
);

CREATE TABLE family_practices (
    family_group_id INT PRIMARY KEY REFERENCES family_groups(id) ON DELETE CASCADE,
    prayer_moments BOOLEAN DEFAULT false,
    scripture_discussion BOOLEAN DEFAULT false,
    blessing_declarations BOOLEAN DEFAULT false
);

-- Global Prayer Hub
CREATE TABLE global_prayer_directives (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    scripture_reference VARCHAR(100)
);

CREATE TABLE regional_watch_towers (
    id SERIAL PRIMARY KEY,
    region VARCHAR(100) UNIQUE NOT NULL,
    focus TEXT,
    leader_name VARCHAR(255)
);

-- Life Groups (Small Groups)
CREATE TABLE life_groups (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    category VARCHAR(100),
    leader_id INT REFERENCES users(id),
    image_url TEXT,
    image_hint VARCHAR(100)
);

CREATE TABLE life_group_members (
    group_id INT NOT NULL REFERENCES life_groups(id) ON DELETE CASCADE,
    user_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    PRIMARY KEY (group_id, user_id)
);

-- Mentorship
CREATE TABLE mentorship_classes (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    mentor_id INT NOT NULL REFERENCES users(id)
);

-- Global News
CREATE TABLE news_items (
    id SERIAL PRIMARY KEY,
    title TEXT,
    content TEXT NOT NULL,
    image_url TEXT,
    image_hint VARCHAR(100),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Live Shows (Podcasts and Radio)
CREATE TABLE live_shows (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    type show_type NOT NULL,
    title VARCHAR(255) NOT NULL,
    host VARCHAR(255),
    is_live BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    ended_at TIMESTAMPTZ,
    recording_url TEXT
);

-- Service Programming
CREATE TABLE service_elements (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    details TEXT -- For storing the formatted string with components
);

-- Teaching Materials
CREATE TABLE teaching_materials (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    department_id INT REFERENCES departments(id),
    file_url TEXT
);

-- Visitor Program
CREATE TABLE visitors (
    id SERIAL PRIMARY KEY,
    user_id INT UNIQUE NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    track visitor_track,
    progress INT DEFAULT 0,
    mentor_id INT REFERENCES users(id),
    status visitor_status DEFAULT 'Pending',
    war_room_access BOOLEAN DEFAULT false,
    court_access BOOLEAN DEFAULT false
);

CREATE TABLE visitor_participation (
    id SERIAL PRIMARY KEY,
    visitor_id INT NOT NULL REFERENCES visitors(id) ON DELETE CASCADE,
    activity_type VARCHAR(50) NOT NULL, -- 'completed' or 'violation'
    description TEXT NOT NULL,
    recorded_at TIMESTAMPTZ DEFAULT NOW()
);
