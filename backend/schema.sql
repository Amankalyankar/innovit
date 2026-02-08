-- GRAM-SABHA schema for Neon PostgreSQL
-- Run in Neon SQL Editor or: psql $DATABASE_URL -f schema.sql

-- Villages
CREATE TABLE IF NOT EXISTS villages (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    name_hindi VARCHAR(255),
    district VARCHAR(255),
    state VARCHAR(255),
    pincode VARCHAR(20),
    population INT,
    households INT,
    sarpanch_name VARCHAR(255),
    panchayat_code VARCHAR(50),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Users (mobile + pin for login)
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    external_id VARCHAR(50) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    name_hindi VARCHAR(255),
    role VARCHAR(50) NOT NULL,
    role_name VARCHAR(100),
    mobile VARCHAR(20) UNIQUE NOT NULL,
    pin VARCHAR(20) NOT NULL,
    village_id INT REFERENCES villages(id),
    ward VARCHAR(50),
    avatar VARCHAR(10),
    redirect_url VARCHAR(255),
    department VARCHAR(255),
    level VARCHAR(100),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Issues / complaints
CREATE TABLE IF NOT EXISTS issues (
    id SERIAL PRIMARY KEY,
    external_id VARCHAR(50) UNIQUE NOT NULL,
    title VARCHAR(500) NOT NULL,
    title_hindi VARCHAR(500),
    description TEXT,
    category VARCHAR(100),
    category_name VARCHAR(100),
    status VARCHAR(50) DEFAULT 'submitted',
    status_name VARCHAR(100),
    priority VARCHAR(50),
    department VARCHAR(255),
    village_id INT REFERENCES villages(id),
    reported_by_id INT REFERENCES users(id),
    reported_by_name VARCHAR(255),
    reported_date DATE,
    votes INT DEFAULT 0,
    location VARCHAR(500),
    progress INT,
    contractor VARCHAR(255),
    estimated_cost INT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Track which user voted for which issue (one vote per user per issue)
CREATE TABLE IF NOT EXISTS issue_votes (
    id SERIAL PRIMARY KEY,
    issue_id INT NOT NULL REFERENCES issues(id) ON DELETE CASCADE,
    user_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(issue_id, user_id)
);

-- Budget summary per village (optional; can be view or table)
CREATE TABLE IF NOT EXISTS budget_summary (
    id SERIAL PRIMARY KEY,
    village_id INT UNIQUE REFERENCES villages(id),
    total_received BIGINT DEFAULT 0,
    total_spent BIGINT DEFAULT 0,
    pending_approval BIGINT DEFAULT 0,
    available BIGINT DEFAULT 0,
    fiscal_year VARCHAR(20),
    last_updated TIMESTAMPTZ DEFAULT NOW()
);

-- Projects (linked to budget/work)
CREATE TABLE IF NOT EXISTS projects (
    id SERIAL PRIMARY KEY,
    external_id VARCHAR(50) UNIQUE,
    village_id INT REFERENCES villages(id),
    name VARCHAR(500) NOT NULL,
    sanctioned BIGINT,
    released BIGINT,
    spent BIGINT,
    progress INT DEFAULT 0,
    status VARCHAR(50),
    contractor VARCHAR(255),
    start_date DATE,
    deadline DATE,
    completed_date DATE,
    verifications_photos BOOLEAN DEFAULT FALSE,
    verifications_gps BOOLEAN DEFAULT FALSE,
    verifications_community BOOLEAN DEFAULT FALSE,
    verifications_audit BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Activity / transaction log
CREATE TABLE IF NOT EXISTS activities (
    id SERIAL PRIMARY KEY,
    external_id VARCHAR(50),
    village_id INT REFERENCES villages(id),
    type VARCHAR(50),
    title VARCHAR(500),
    description TEXT,
    reference VARCHAR(500),
    icon VARCHAR(50),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_issues_village ON issues(village_id);
CREATE INDEX IF NOT EXISTS idx_issues_status ON issues(status);
CREATE INDEX IF NOT EXISTS idx_issue_votes_issue ON issue_votes(issue_id);
CREATE INDEX IF NOT EXISTS idx_issue_votes_user ON issue_votes(user_id);
CREATE INDEX IF NOT EXISTS idx_users_mobile ON users(mobile);
