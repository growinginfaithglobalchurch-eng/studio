-- This file contains the SQL schema for the Faith Connect Global application.
-- It is designed for a PostgreSQL database, compatible with Supabase.

-- Users Table: Stores user profile information.
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    location VARCHAR(255),
    avatar_url TEXT,
    avatar_hint VARCHAR(255),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Friendships Table: Manages connections between users.
CREATE TABLE friendships (
    user_id_1 INT REFERENCES users(id),
    user_id_2 INT REFERENCES users(id),
    status VARCHAR(50) CHECK (status IN ('pending', 'accepted')),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    PRIMARY KEY (user_id_1, user_id_2)
);

-- Departments Table: Stores church departments.
CREATE TABLE departments (
    name VARCHAR(255) PRIMARY KEY,
    description TEXT,
    icon VARCHAR(50)
);

-- Department Members Table: Links users to departments.
CREATE TABLE department_members (
    user_id INT REFERENCES users(id),
    department_name VARCHAR(255) REFERENCES departments(name),
    PRIMARY KEY (user_id, department_name)
);

-- Devotionals Table: Stores daily devotional content.
CREATE TABLE devotionals (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    author VARCHAR(255),
    publish_date DATE NOT NULL,
    category VARCHAR(100),
    image_url TEXT,
    image_hint VARCHAR(255),
    content_text TEXT,
    audio_url TEXT,
    video_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Prayer Requests Table: For the community prayer wall.
CREATE TABLE prayer_requests (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id), -- Nullable for anonymous posts
    user_name VARCHAR(255), -- Storing name for anonymous cases
    request TEXT NOT NULL,
    prayed_count INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Live Sessions & Replays Table
CREATE TABLE live_sessions (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    speaker VARCHAR(255),
    is_live BOOLEAN DEFAULT FALSE,
    video_url TEXT,
    image_url TEXT,
    image_hint VARCHAR(255),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Life Groups Table: For small community groups.
CREATE TABLE life_groups (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    category VARCHAR(100),
    leader_id INT REFERENCES users(id),
    image_url TEXT,
    image_hint VARCHAR(255),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Life Group Members Table: Links users to life groups.
CREATE TABLE life_group_members (
    group_id INT REFERENCES life_groups(id),
    user_id INT REFERENCES users(id),
    PRIMARY KEY (group_id, user_id)
);

-- Events & Conferences Table
CREATE TABLE events (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    start_date TIMESTAMPTZ,
    end_date TIMESTAMPTZ,
    dates_text VARCHAR(255), -- For flexible date strings like "October 10-12, 2024"
    location VARCHAR(255),
    image_url TEXT,
    image_hint VARCHAR(255),
    type VARCHAR(50) CHECK (type IN ('conference', 'event', 'meeting')),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Event Registrations Table
CREATE TABLE event_registrations (
    event_id INT REFERENCES events(id),
    user_id INT REFERENCES users(id),
    PRIMARY KEY (event_id, user_id)
);

-- Courses Table
CREATE TABLE courses (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    category VARCHAR(100),
    image_url TEXT,
    image_hint VARCHAR(255),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Discipleship Relationships (Personal) Table
CREATE TABLE discipleship_relationships (
    id SERIAL PRIMARY KEY,
    disciple_id INT REFERENCES users(id),
    discipler_id INT REFERENCES users(id),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Announcements Table
CREATE TABLE announcements (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT,
    category VARCHAR(100),
    publish_date DATE NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Family Hubs Table
CREATE TABLE family_hubs (
    id SERIAL PRIMARY KEY,
    father_id INT REFERENCES users(id),
    mother_id INT REFERENCES users(id),
    monthly_focus VARCHAR(255),
    unity_score VARCHAR(50),
    prayer_moments BOOLEAN DEFAULT FALSE,
    scripture_discussion BOOLEAN DEFAULT FALSE,
    blessing_declarations BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Family Hub Children Table
CREATE TABLE family_hub_children (
    family_hub_id INT REFERENCES family_hubs(id),
    child_id INT REFERENCES users(id),
    PRIMARY KEY (family_hub_id, child_id)
);

-- News Feed Table
CREATE TABLE news_feed (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255),
    content TEXT NOT NULL,
    image_url TEXT,
    image_hint VARCHAR(255),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Service Flow Elements Table
CREATE TABLE service_flow_elements (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    details TEXT, -- To store the multi-line component details
    display_order INT
);

-- Podcast / Radio Show Recordings Table
CREATE TABLE recordings (
    id SERIAL PRIMARY KEY,
    show_id_firestore VARCHAR(255) UNIQUE, -- The ID from Firestore
    type VARCHAR(50) CHECK (type IN ('podcast', 'radio')),
    title VARCHAR(255) NOT NULL,
    host VARCHAR(255),
    description TEXT,
    recording_url TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Stories Table
CREATE TABLE stories (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id),
    media_url TEXT NOT NULL,
    media_type VARCHAR(50) CHECK (media_type IN ('image', 'video')),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Certificates Table
CREATE TABLE certificates (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    issuing_authority VARCHAR(255),
    description TEXT
);

-- User Certificates (Join Table)
CREATE TABLE user_certificates (
    user_id INT REFERENCES users(id),
    certificate_id INT REFERENCES certificates(id),
    issue_date DATE NOT NULL,
    PRIMARY KEY (user_id, certificate_id)
);
