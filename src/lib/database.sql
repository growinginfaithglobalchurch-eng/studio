-- Users Table: Stores user profile and authentication information.
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    auth_id UUID UNIQUE, -- To link with Supabase Auth
    full_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(50),
    photo_url TEXT,
    location VARCHAR(255),
    date_joined TIMESTAMPTZ DEFAULT NOW(),
    
    -- Kingdom ID
    kingdom_id_number VARCHAR(255) UNIQUE,
    authority_level INT DEFAULT 1,
    tribe VARCHAR(50),
    badge VARCHAR(100),
    
    -- Authority
    authority_tier INT,
    authority_title VARCHAR(100),
    authority_status VARCHAR(50),
    
    -- Growth Metrics
    consistency_score INT,
    readiness_level VARCHAR(100),
    authority_eligibility BOOLEAN,

    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Daily Practices Table: Tracks user's daily spiritual disciplines.
CREATE TABLE daily_practices (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id) ON DELETE CASCADE,
    practice_date DATE NOT NULL,
    alignment BOOLEAN DEFAULT FALSE,
    word_intake BOOLEAN DEFAULT FALSE,
    identity BOOLEAN DEFAULT FALSE,
    speech BOOLEAN DEFAULT FALSE,
    obedience BOOLEAN DEFAULT FALSE,
    warfare_readiness BOOLEAN DEFAULT FALSE,
    review BOOLEAN DEFAULT FALSE,
    UNIQUE(user_id, practice_date)
);

-- Friends/Connections Table
CREATE TABLE friends (
    user_id_1 INT REFERENCES users(id) ON DELETE CASCADE,
    user_id_2 INT REFERENCES users(id) ON DELETE CASCADE,
    status VARCHAR(50) NOT NULL, -- e.g., 'pending', 'accepted'
    created_at TIMESTAMPTZ DEFAULT NOW(),
    PRIMARY KEY (user_id_1, user_id_2)
);

-- Departments Table
CREATE TABLE departments (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) UNIQUE NOT NULL,
    description TEXT,
    icon_name VARCHAR(100) -- e.g., 'Music', 'Handshake'
);

-- User Departments Junction Table
CREATE TABLE user_departments (
    user_id INT REFERENCES users(id) ON DELETE CASCADE,
    department_id INT REFERENCES departments(id) ON DELETE CASCADE,
    PRIMARY KEY (user_id, department_id)
);

-- Announcements Table
CREATE TABLE announcements (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT,
    category VARCHAR(100),
    author_id INT REFERENCES users(id),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Devotionals Table
CREATE TABLE devotionals (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    author VARCHAR(255),
    category VARCHAR(100),
    image_url TEXT,
    image_hint VARCHAR(100),
    content_text TEXT,
    content_audio_url TEXT,
    content_video_url TEXT,
    published_date DATE DEFAULT CURRENT_DATE
);

-- Prayer Requests Table
CREATE TABLE prayer_requests (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id), -- Nullable for anonymous requests
    user_name VARCHAR(255), -- For anonymous display name
    request TEXT NOT NULL,
    prayed_count INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Life Groups Table
CREATE TABLE life_groups (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    category VARCHAR(100),
    leader_id INT REFERENCES users(id),
    image_url TEXT,
    image_hint VARCHAR(100)
);

-- User Life Groups Junction Table
CREATE TABLE user_life_groups (
    user_id INT REFERENCES users(id) ON DELETE CASCADE,
    group_id INT REFERENCES life_groups(id) ON DELETE CASCADE,
    role VARCHAR(50) DEFAULT 'member', -- e.g., 'member', 'leader'
    PRIMARY KEY (user_id, group_id)
);

-- Events Table (for conferences, workshops, etc.)
CREATE TABLE events (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    event_type VARCHAR(50), -- e.g., 'Conference', 'Workshop', 'Meeting'
    start_date TIMESTAMPTZ,
    end_date TIMESTAMPTZ,
    location VARCHAR(255),
    image_url TEXT,
    image_hint VARCHAR(100),
    is_live BOOLEAN DEFAULT FALSE
);

-- User Events Registration Table
CREATE TABLE event_registrations (
    user_id INT REFERENCES users(id) ON DELETE CASCADE,
    event_id INT REFERENCES events(id) ON DELETE CASCADE,
    registered_at TIMESTAMPTZ DEFAULT NOW(),
    PRIMARY KEY (user_id, event_id)
);

-- Courses Table
CREATE TABLE courses (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    category VARCHAR(100),
    image_url TEXT,
    image_hint VARCHAR(100)
);

-- Mentorship Table
CREATE TABLE mentorships (
    id SERIAL PRIMARY KEY,
    mentor_id INT REFERENCES users(id) ON DELETE CASCADE,
    mentee_id INT REFERENCES users(id) ON DELETE CASCADE,
    start_date DATE,
    status VARCHAR(50) DEFAULT 'active' -- e.g., 'active', 'completed', 'ended'
);

-- Live Shows Table (for Radio & Podcast/TV)
CREATE TABLE live_shows (
    id UUID PRIMARY KEY,
    show_type VARCHAR(50) NOT NULL, -- 'radio', 'podcast', 'tv'
    title VARCHAR(255) NOT NULL,
    host VARCHAR(255),
    is_live BOOLEAN DEFAULT FALSE,
    offer JSONB,
    answer JSONB,
    recording_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    ended_at TIMESTAMPTZ
);

-- Radio Playlist Tracks
CREATE TABLE radio_playlist_tracks (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    artist VARCHAR(255),
    url TEXT NOT NULL,
    duration_seconds INT,
    play_order INT
);

-- Certificates Table
CREATE TABLE certificates (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    issuing_authority VARCHAR(255),
    issue_date DATE NOT NULL,
    description TEXT
);

-- Family Groups Table
CREATE TABLE family_groups (
    id SERIAL PRIMARY KEY,
    father_id INT REFERENCES users(id),
    mother_id INT REFERENCES users(id),
    monthly_focus VARCHAR(255),
    unity_score VARCHAR(50)
);

-- Family Group Children Junction Table
CREATE TABLE family_group_children (
    family_group_id INT REFERENCES family_groups(id) ON DELETE CASCADE,
    child_id INT REFERENCES users(id) ON DELETE CASCADE,
    PRIMARY KEY (family_group_id, child_id)
);

-- News Feed Table
CREATE TABLE news_feed (
    id SERIAL PRIMARY KEY,
    author_id INT REFERENCES users(id),
    title VARCHAR(255),
    content TEXT NOT NULL,
    image_url TEXT,
    image_hint VARCHAR(100),
    created_at TIMESTAMPTZ DEFAULT NOW()
);
