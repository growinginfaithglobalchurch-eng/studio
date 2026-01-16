-- Users & Authentication
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    full_name VARCHAR(255),
    photo_url TEXT,
    location VARCHAR(255),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Kingdom ID & Authority
CREATE TABLE kingdom_ids (
    user_id UUID PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
    kingdom_id_number VARCHAR(50) UNIQUE NOT NULL,
    authority_level INT DEFAULT 1 NOT NULL,
    tribe VARCHAR(50) CHECK (tribe IN ('Eagle', 'Lion', 'Marine', 'All')),
    badge VARCHAR(100),
    issued_date TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Daily Spiritual Practices Tracking
CREATE TABLE daily_practices (
    id BIGSERIAL PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    practice_date DATE NOT NULL DEFAULT CURRENT_DATE,
    alignment BOOLEAN DEFAULT false,
    word_intake BOOLEAN DEFAULT false,
    identity_journal BOOLEAN DEFAULT false,
    speech_log BOOLEAN DEFAULT false,
    obedience_check BOOLEAN DEFAULT false,
    warfare_readiness BOOLEAN DEFAULT false,
    review BOOLEAN DEFAULT false,
    UNIQUE(user_id, practice_date)
);

-- Growth Metrics
CREATE TABLE growth_metrics (
    user_id UUID PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
    consistency_score INT DEFAULT 0,
    readiness_level VARCHAR(100),
    authority_eligibility BOOLEAN DEFAULT false,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Content Tables
CREATE TABLE announcements (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    category VARCHAR(100),
    author_id UUID REFERENCES users(id),
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

CREATE TABLE devotionals (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    author VARCHAR(255),
    content_text TEXT,
    content_audio_url TEXT,
    content_video_url TEXT,
    publish_date DATE DEFAULT CURRENT_DATE
);

CREATE TABLE news_feed (
    id SERIAL PRIMARY KEY,
    author_id UUID REFERENCES users(id),
    title VARCHAR(255),
    content TEXT NOT NULL,
    image_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Live Streaming & Media
CREATE TABLE live_rooms (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(255) NOT NULL,
    host_id UUID REFERENCES users(id),
    is_live BOOLEAN DEFAULT false,
    recording_url TEXT,
    started_at TIMESTAMPTZ,
    ended_at TIMESTAMPTZ
);

-- Community & Groups
CREATE TABLE life_groups (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    category VARCHAR(100),
    leader_id UUID REFERENCES users(id),
    image_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE group_members (
    group_id INT REFERENCES life_groups(id) ON DELETE CASCADE,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    role VARCHAR(50) DEFAULT 'member', -- e.g., member, admin
    joined_at TIMESTAMPTZ DEFAULT NOW(),
    PRIMARY KEY(group_id, user_id)
);

CREATE TABLE prayer_requests (
    id SERIAL PRIMARY KEY,
    user_id UUID REFERENCES users(id), -- Can be NULL for anonymous
    is_anonymous BOOLEAN DEFAULT false,
    request TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Departments & Administration
CREATE TABLE departments (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) UNIQUE NOT NULL,
    description TEXT,
    icon_name VARCHAR(50)
);

CREATE TABLE department_members (
    department_id INT REFERENCES departments(id) ON DELETE CASCADE,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    role VARCHAR(50) DEFAULT 'member',
    PRIMARY KEY(department_id, user_id)
);

-- Events & Scheduling
CREATE TABLE events (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    start_time TIMESTAMPTZ NOT NULL,
    end_time TIMESTAMPTZ,
    location VARCHAR(255),
    is_online BOOLEAN DEFAULT false,
    image_url TEXT
);

-- User-specific data
CREATE TABLE certificates (
    id SERIAL PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    issuing_authority VARCHAR(255),
    issue_date DATE NOT NULL,
    description TEXT
);

CREATE TABLE journal_entries (
    id BIGSERIAL PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    entry_type VARCHAR(50) NOT NULL, -- e.g., 'identity', 'reflection', 'declaration'
    content TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Family Hub
CREATE TABLE family_groups (
    id SERIAL PRIMARY KEY,
    father_id UUID REFERENCES users(id),
    mother_id UUID REFERENCES users(id),
    monthly_focus VARCHAR(255),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE family_group_children (
    family_group_id INT REFERENCES family_groups(id) ON DELETE CASCADE,
    child_id UUID REFERENCES users(id) ON DELETE CASCADE,
    PRIMARY KEY(family_group_id, child_id)
);