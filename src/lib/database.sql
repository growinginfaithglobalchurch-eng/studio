-- This SQL schema is designed for a PostgreSQL database, like Supabase.

-- Enable UUID generation
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users and Authentication
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    full_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    photo_url TEXT,
    location VARCHAR(255),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    -- Kingdom ID fields
    kingdom_id_number VARCHAR(50) UNIQUE,
    authority_level INT DEFAULT 1,
    tribe VARCHAR(50), -- 'Eagle', 'Lion', 'Marine', 'All'
    badge VARCHAR(100)
);

-- Social Feed Posts
CREATE TABLE posts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(255),
    content TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Stories
CREATE TABLE stories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    media_url TEXT NOT NULL,
    media_type VARCHAR(20) NOT NULL, -- 'image' or 'video'
    created_at TIMESTAMPTZ DEFAULT NOW(),
    expires_at TIMESTAMPTZ DEFAULT NOW() + INTERVAL '24 hours'
);

-- Prayer Requests
CREATE TABLE prayer_requests (
    id SERIAL PRIMARY KEY,
    user_id UUID REFERENCES users(id) ON DELETE SET NULL, -- Allow anonymous
    request TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Content: Devotionals, Courses, Announcements, News
CREATE TABLE devotionals (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    author VARCHAR(255),
    content_text TEXT,
    content_audio_url TEXT,
    content_video_url TEXT,
    published_date DATE DEFAULT NOW(),
    category VARCHAR(100)
);

CREATE TABLE courses (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    category VARCHAR(100),
    image_url TEXT
);

CREATE TABLE announcements (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT,
    category VARCHAR(100),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE news_items (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255),
    content TEXT NOT NULL,
    image_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Events and Conferences
CREATE TABLE events (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    start_date TIMESTAMPTZ,
    end_date TIMESTAMPTZ,
    location VARCHAR(255),
    image_url TEXT,
    is_conference BOOLEAN DEFAULT FALSE
);

-- Community: Groups, Departments
CREATE TABLE life_groups (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    category VARCHAR(100),
    leader_id UUID REFERENCES users(id),
    image_url TEXT
);

CREATE TABLE life_group_members (
    group_id INT REFERENCES life_groups(id) ON DELETE CASCADE,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    role VARCHAR(50) DEFAULT 'member', -- 'member', 'leader'
    PRIMARY KEY (group_id, user_id)
);

CREATE TABLE departments (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) UNIQUE NOT NULL,
    description TEXT,
    icon_name VARCHAR(50)
);

CREATE TABLE department_members (
    department_id INT REFERENCES departments(id) ON DELETE CASCADE,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    PRIMARY KEY (department_id, user_id)
);

-- Mentorship and Discipleship
CREATE TABLE mentorships (
    id SERIAL PRIMARY KEY,
    mentor_id UUID REFERENCES users(id) ON DELETE CASCADE,
    mentee_id UUID REFERENCES users(id) ON DELETE CASCADE,
    start_date DATE DEFAULT NOW(),
    status VARCHAR(50) DEFAULT 'active' -- 'active', 'ended'
);

-- Live Content: Podcasts, Radio Shows
CREATE TABLE live_sessions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    type VARCHAR(50) NOT NULL, -- 'podcast', 'radio'
    title VARCHAR(255) NOT NULL,
    host_name VARCHAR(255),
    is_live BOOLEAN DEFAULT FALSE,
    started_at TIMESTAMPTZ,
    ended_at TIMESTAMPTZ,
    recording_url TEXT
);

-- Family Hub
CREATE TABLE family_hubs (
    id SERIAL PRIMARY KEY,
    monthly_focus VARCHAR(255),
    unity_score VARCHAR(50) -- 'Active', 'Inactive'
);

CREATE TABLE family_hub_members (
    hub_id INT REFERENCES family_hubs(id) ON DELETE CASCADE,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    role VARCHAR(50) NOT NULL, -- 'father', 'mother', 'child'
    PRIMARY KEY (hub_id, user_id)
);

-- Visitor Program
CREATE TABLE visitors (
    id SERIAL PRIMARY KEY,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    track VARCHAR(100), -- 'Leadership', 'Warrior'
    progress INT DEFAULT 0,
    mentor_id UUID REFERENCES users(id) ON DELETE SET NULL,
    status VARCHAR(50) DEFAULT 'Pending', -- 'Pending', 'Active', 'Completed'
    war_room_access BOOLEAN DEFAULT FALSE,
    court_access BOOLEAN DEFAULT FALSE
);

-- Add some indexes for performance
CREATE INDEX idx_posts_user_id ON posts(user_id);
CREATE INDEX idx_prayer_requests_user_id ON prayer_requests(user_id);
CREATE INDEX idx_live_sessions_is_live ON live_sessions(is_live);
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_life_group_members_user_id ON life_group_members(user_id);
CREATE INDEX idx_department_members_user_id ON department_members(user_id);

-- End of schema
