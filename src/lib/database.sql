
-- Enable UUID generation
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- User Management
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    full_name VARCHAR(255),
    photo_url TEXT,
    location VARCHAR(255),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE kingdom_ids (
    user_id UUID PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
    kingdom_id_number VARCHAR(50) UNIQUE NOT NULL,
    authority_level INT NOT NULL DEFAULT 1,
    tribe VARCHAR(50) CHECK (tribe IN ('Eagle', 'Lion', 'Marine', 'All')),
    badge VARCHAR(100),
    issued_date DATE DEFAULT NOW()
);

-- Content Management
CREATE TABLE devotionals (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    author VARCHAR(255),
    category VARCHAR(100),
    content_text TEXT,
    content_audio_url TEXT,
    content_video_url TEXT,
    image_url TEXT,
    published_date DATE DEFAULT NOW()
);

CREATE TABLE courses (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    category VARCHAR(100),
    image_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE announcements (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT,
    category VARCHAR(100),
    date DATE DEFAULT NOW()
);

CREATE TABLE news_feed (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255),
    content TEXT NOT NULL,
    image_url TEXT,
    timestamp TIMESTAMPTZ DEFAULT NOW()
);

-- Community & Interaction
CREATE TABLE groups (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    category VARCHAR(100),
    image_url TEXT,
    created_by UUID REFERENCES users(id),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE group_members (
    group_id INT REFERENCES groups(id) ON DELETE CASCADE,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    role VARCHAR(50) DEFAULT 'member', -- 'member', 'admin', 'leader'
    joined_at TIMESTAMPTZ DEFAULT NOW(),
    PRIMARY KEY (group_id, user_id)
);

CREATE TABLE prayer_requests (
    id SERIAL PRIMARY KEY,
    user_id UUID REFERENCES users(id), -- Can be NULL for anonymous requests
    user_name VARCHAR(255), -- For anonymous requests
    request TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE prayer_responses (
    request_id INT REFERENCES prayer_requests(id) ON DELETE CASCADE,
    user_id UUID REFERENCES users(id),
    prayed_at TIMESTAMPTZ DEFAULT NOW(),
    PRIMARY KEY (request_id, user_id)
);

CREATE TABLE friendships (
    user_id_1 UUID REFERENCES users(id) ON DELETE CASCADE,
    user_id_2 UUID REFERENCES users(id) ON DELETE CASCADE,
    status VARCHAR(50) CHECK (status IN ('pending', 'accepted', 'blocked')),
    requested_at TIMESTAMPTZ DEFAULT NOW(),
    accepted_at TIMESTAMPTZ,
    PRIMARY KEY (user_id_1, user_id_2)
);

-- Live Content (Podcast/Radio)
CREATE TABLE live_shows (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    type VARCHAR(50) NOT NULL, -- 'podcast', 'radio'
    title VARCHAR(255) NOT NULL,
    host VARCHAR(255),
    is_live BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    ended_at TIMESTAMPTZ,
    recording_url TEXT
);

-- Events & Programs
CREATE TABLE events (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    start_date TIMESTAMPTZ NOT NULL,
    end_date TIMESTAMPTZ,
    location VARCHAR(255),
    image_url TEXT,
    is_conference BOOLEAN DEFAULT FALSE
);

CREATE TABLE event_registrations (
    event_id INT REFERENCES events(id) ON DELETE CASCADE,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    registered_at TIMESTAMPTZ DEFAULT NOW(),
    PRIMARY KEY (event_id, user_id)
);

-- Admin & Departments
CREATE TABLE departments (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) UNIQUE NOT NULL,
    description TEXT,
    icon VARCHAR(100)
);

CREATE TABLE department_members (
    department_id INT REFERENCES departments(id) ON DELETE CASCADE,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    role VARCHAR(50) DEFAULT 'member', -- 'member', 'leader'
    PRIMARY KEY (department_id, user_id)
);

-- Family Hub
CREATE TABLE family_groups (
    id SERIAL PRIMARY KEY,
    monthly_focus VARCHAR(255),
    unity_score VARCHAR(50),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE family_group_members (
    family_group_id INT REFERENCES family_groups(id) ON DELETE CASCADE,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    role VARCHAR(50) NOT NULL, -- 'father', 'mother', 'child'
    PRIMARY KEY (family_group_id, user_id)
);

-- Add a trigger to update 'updated_at' timestamps
CREATE OR REPLACE FUNCTION trigger_set_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_timestamp
BEFORE UPDATE ON users
FOR EACH ROW
EXECUTE PROCEDURE trigger_set_timestamp();
