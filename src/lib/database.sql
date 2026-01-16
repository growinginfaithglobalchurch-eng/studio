-- SQL Schema for Faith Connect Global

-- Enable UUID generation
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- -------------------------------------------------------------
-- ENUM Types for structured data
-- -------------------------------------------------------------
CREATE TYPE tribe_type AS ENUM ('Eagle', 'Lion', 'Marine', 'All');
CREATE TYPE authority_status AS ENUM ('Active', 'Pending', 'Inactive');
CREATE TYPE partnership_type AS ENUM ('individual', 'church', 'business');
CREATE TYPE commitment_type AS ENUM ('prayer', 'financial', 'volunteer');

-- -------------------------------------------------------------
-- Users and Profile Information
-- -------------------------------------------------------------
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    auth_id UUID UNIQUE, -- Corresponds to Firebase Auth UID
    email VARCHAR(255) UNIQUE NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    location VARCHAR(255),
    photo_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE kingdom_ids (
    user_id UUID PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
    kingdom_id_number VARCHAR(50) UNIQUE NOT NULL,
    authority_level INT NOT NULL DEFAULT 1,
    tribe tribe_type,
    badge VARCHAR(100),
    issued_date TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE authority (
    user_id UUID PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
    tier INT NOT NULL,
    title VARCHAR(100) NOT NULL,
    unlocked_date TIMESTAMPTZ,
    reviewed_by VARCHAR(255),
    status authority_status DEFAULT 'Inactive'
);

-- -------------------------------------------------------------
-- Community & Connections
-- -------------------------------------------------------------
CREATE TABLE friends (
    user_id_1 UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    user_id_2 UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    status VARCHAR(20) NOT NULL, -- e.g., 'pending', 'accepted'
    created_at TIMESTAMPTZ DEFAULT NOW(),
    PRIMARY KEY (user_id_1, user_id_2)
);

CREATE TABLE life_groups (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    category VARCHAR(100),
    leader_id UUID REFERENCES users(id),
    image_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE life_group_members (
    group_id INT NOT NULL REFERENCES life_groups(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    joined_at TIMESTAMPTZ DEFAULT NOW(),
    PRIMARY KEY (group_id, user_id)
);

CREATE TABLE family_hubs (
    id SERIAL PRIMARY KEY,
    father_id UUID REFERENCES users(id),
    mother_id UUID REFERENCES users(id),
    monthly_focus VARCHAR(255),
    unity_score VARCHAR(50)
);

CREATE TABLE family_hub_children (
    hub_id INT NOT NULL REFERENCES family_hubs(id) ON DELETE CASCADE,
    child_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    PRIMARY KEY (hub_id, child_id)
);


-- -------------------------------------------------------------
-- Content Management (Devotionals, Courses, etc.)
-- -------------------------------------------------------------
CREATE TABLE announcements (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT,
    category VARCHAR(100),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE courses (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    category VARCHAR(100),
    image_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE teachings (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    department_name VARCHAR(255),
    file_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE news_feed (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255),
    content TEXT NOT NULL,
    image_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- -------------------------------------------------------------
-- Events and Programs
-- -------------------------------------------------------------
CREATE TABLE events (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    start_time TIMESTAMPTZ NOT NULL,
    end_time TIMESTAMPTZ,
    location VARCHAR(255),
    is_live BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE conferences (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    dates VARCHAR(255),
    location VARCHAR(255),
    image_url TEXT
);

CREATE TABLE annual_calendar (
    id SERIAL PRIMARY KEY,
    month VARCHAR(20) NOT NULL,
    theme VARCHAR(255) NOT NULL,
    purpose TEXT,
    activities TEXT[]
);

-- -------------------------------------------------------------
-- Prayer & Intercession
-- -------------------------------------------------------------
CREATE TABLE prayer_requests (
    id SERIAL PRIMARY KEY,
    user_id UUID REFERENCES users(id), -- Can be NULL for anonymous
    request TEXT NOT NULL,
    is_anonymous BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE prayer_requests_prayed_for (
    request_id INT NOT NULL REFERENCES prayer_requests(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    prayed_at TIMESTAMPTZ DEFAULT NOW(),
    PRIMARY KEY (request_id, user_id)
);

CREATE TABLE global_prayer_directives (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    scripture VARCHAR(100),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- -------------------------------------------------------------
-- Live Streaming & Media (Podcast, Radio)
-- -------------------------------------------------------------
CREATE TABLE live_rooms (
    id UUID PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    host VARCHAR(255),
    is_live BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ,
    ended_at TIMESTAMPTZ,
    recording_url TEXT,
    offer JSONB,
    answer JSONB
);

CREATE TABLE radio_shows (
    id UUID PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    host VARCHAR(255),
    is_live BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ,
    ended_at TIMESTAMPTZ,
    recording_url TEXT,
    offer JSONB,
    answer JSONB
);

CREATE TABLE automated_playlist (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    url TEXT NOT NULL,
    duration_seconds INT
);

-- -------------------------------------------------------------
-- Administration & Organization
-- -------------------------------------------------------------
CREATE TABLE departments (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) UNIQUE NOT NULL,
    description TEXT,
    icon_name VARCHAR(50)
);

CREATE TABLE department_members (
    department_id INT NOT NULL REFERENCES departments(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    PRIMARY KEY (department_id, user_id)
);

CREATE TABLE meetings (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    department_id INT REFERENCES departments(id),
    meeting_time TIMESTAMPTZ NOT NULL
);

-- -------------------------------------------------------------
-- Partnership
-- -------------------------------------------------------------
CREATE TABLE partnerships (
    id SERIAL PRIMARY KEY,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    organization_name VARCHAR(255),
    country VARCHAR(100),
    partnership_type partnership_type NOT NULL,
    commitment commitment_type NOT NULL,
    message TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_friends_user1 ON friends(user_id_1);
CREATE INDEX idx_friends_user2 ON friends(user_id_2);
CREATE INDEX idx_live_rooms_is_live ON live_rooms(is_live);
CREATE INDEX idx_radio_shows_is_live ON radio_shows(is_live);
