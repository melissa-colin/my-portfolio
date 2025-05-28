-- Portfolio DB Schema for Melissa Colin's website
-- Database: u436612612_contnt_portfol

-- Drop tables if they exist (in reverse order of dependencies)
DROP TABLE IF EXISTS blog_post_translations;
DROP TABLE IF EXISTS blog_posts;
DROP TABLE IF EXISTS publication_translations;
DROP TABLE IF EXISTS publications;
DROP TABLE IF EXISTS project_images;
DROP TABLE IF EXISTS project_translations;
DROP TABLE IF EXISTS projects;
DROP TABLE IF EXISTS education_translations;
DROP TABLE IF EXISTS education;
DROP TABLE IF EXISTS experience_translations;
DROP TABLE IF EXISTS experiences;
DROP TABLE IF EXISTS skill_translations;
DROP TABLE IF EXISTS skills;
DROP TABLE IF EXISTS profile_translations;
DROP TABLE IF EXISTS profiles;
DROP TABLE IF EXISTS contact_info;
DROP TABLE IF EXISTS settings;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS languages;

-- Languages table
CREATE TABLE languages (
    id INT AUTO_INCREMENT PRIMARY KEY,
    code VARCHAR(5) NOT NULL UNIQUE,
    name VARCHAR(50) NOT NULL,
    is_default BOOLEAN DEFAULT FALSE,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Users table for authentication
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    email VARCHAR(100) NOT NULL,
    role VARCHAR(20) NOT NULL DEFAULT 'admin',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Settings table for general website settings
CREATE TABLE settings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    `key` VARCHAR(50) NOT NULL UNIQUE,
    value TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Contact information
CREATE TABLE contact_info (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(100),
    linkedin VARCHAR(255),
    github VARCHAR(255),
    twitter VARCHAR(255),
    phone VARCHAR(50),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Profile basic information
CREATE TABLE profiles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    photo VARCHAR(255),
    cv_url VARCHAR(255),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Profile translations
CREATE TABLE profile_translations (
    id INT AUTO_INCREMENT PRIMARY KEY,
    profile_id INT NOT NULL,
    language_id INT NOT NULL,
    name VARCHAR(100) NOT NULL,
    title VARCHAR(255) NOT NULL,
    bio TEXT,
    location VARCHAR(100),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (profile_id) REFERENCES profiles(id) ON DELETE CASCADE,
    FOREIGN KEY (language_id) REFERENCES languages(id) ON DELETE CASCADE,
    UNIQUE KEY (profile_id, language_id)
);

-- Skills
CREATE TABLE skills (
    id INT AUTO_INCREMENT PRIMARY KEY,
    category VARCHAR(50),
    proficiency INT,
    logo VARCHAR(255),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Skill translations
CREATE TABLE skill_translations (
    id INT AUTO_INCREMENT PRIMARY KEY,
    skill_id INT NOT NULL,
    language_id INT NOT NULL,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (skill_id) REFERENCES skills(id) ON DELETE CASCADE,
    FOREIGN KEY (language_id) REFERENCES languages(id) ON DELETE CASCADE,
    UNIQUE KEY (skill_id, language_id)
);

-- Work experiences
CREATE TABLE experiences (
    id INT AUTO_INCREMENT PRIMARY KEY,
    company VARCHAR(100) NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE,
    logo VARCHAR(255),
    current BOOLEAN DEFAULT FALSE,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Experience translations
CREATE TABLE experience_translations (
    id INT AUTO_INCREMENT PRIMARY KEY,
    experience_id INT NOT NULL,
    language_id INT NOT NULL,
    position VARCHAR(100) NOT NULL,
    description TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (experience_id) REFERENCES experiences(id) ON DELETE CASCADE,
    FOREIGN KEY (language_id) REFERENCES languages(id) ON DELETE CASCADE,
    UNIQUE KEY (experience_id, language_id)
);

-- Education
CREATE TABLE education (
    id INT AUTO_INCREMENT PRIMARY KEY,
    institution VARCHAR(100) NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE,
    logo VARCHAR(255),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Education translations
CREATE TABLE education_translations (
    id INT AUTO_INCREMENT PRIMARY KEY,
    education_id INT NOT NULL,
    language_id INT NOT NULL,
    degree VARCHAR(100) NOT NULL,
    field VARCHAR(100) NOT NULL,
    description TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (education_id) REFERENCES education(id) ON DELETE CASCADE,
    FOREIGN KEY (language_id) REFERENCES languages(id) ON DELETE CASCADE,
    UNIQUE KEY (education_id, language_id)
);

-- Projects
CREATE TABLE projects (
    id INT AUTO_INCREMENT PRIMARY KEY,
    github_url VARCHAR(255),
    demo_url VARCHAR(255),
    featured BOOLEAN DEFAULT FALSE,
    start_date DATE,
    end_date DATE,
    category VARCHAR(50),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Project translations
CREATE TABLE project_translations (
    id INT AUTO_INCREMENT PRIMARY KEY,
    project_id INT NOT NULL,
    language_id INT NOT NULL,
    title VARCHAR(100) NOT NULL,
    short_description VARCHAR(255) NOT NULL,
    full_description TEXT,
    technologies TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE,
    FOREIGN KEY (language_id) REFERENCES languages(id) ON DELETE CASCADE,
    UNIQUE KEY (project_id, language_id)
);

-- Project images
CREATE TABLE project_images (
    id INT AUTO_INCREMENT PRIMARY KEY,
    project_id INT NOT NULL,
    image_path VARCHAR(255) NOT NULL,
    display_order INT DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE
);

-- Publications
CREATE TABLE publications (
    id INT AUTO_INCREMENT PRIMARY KEY,
    authors TEXT NOT NULL,
    venue VARCHAR(255),
    publication_date DATE,
    pdf_url VARCHAR(255),
    doi VARCHAR(100),
    citations INT DEFAULT 0,
    tags TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Publication translations
CREATE TABLE publication_translations (
    id INT AUTO_INCREMENT PRIMARY KEY,
    publication_id INT NOT NULL,
    language_id INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    abstract TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (publication_id) REFERENCES publications(id) ON DELETE CASCADE,
    FOREIGN KEY (language_id) REFERENCES languages(id) ON DELETE CASCADE,
    UNIQUE KEY (publication_id, language_id)
);

-- Blog posts
CREATE TABLE blog_posts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    author VARCHAR(100),
    publish_date DATE NOT NULL,
    reading_time INT,
    featured_image VARCHAR(255),
    tags TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Blog post translations
CREATE TABLE blog_post_translations (
    id INT AUTO_INCREMENT PRIMARY KEY,
    blog_post_id INT NOT NULL,
    language_id INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    short_description VARCHAR(255),
    content TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (blog_post_id) REFERENCES blog_posts(id) ON DELETE CASCADE,
    FOREIGN KEY (language_id) REFERENCES languages(id) ON DELETE CASCADE,
    UNIQUE KEY (blog_post_id, language_id)
);

-- Insert initial data

-- Default languages (English and French)
INSERT INTO languages (code, name, is_default) VALUES ('en', 'English', TRUE);
INSERT INTO languages (code, name, is_default) VALUES ('fr', 'Français', FALSE);

-- Default admin user (username: admin, password: 123abc)
-- Note: In a real environment, use a secure password hashing function
INSERT INTO users (username, password_hash, email, role)
VALUES ('admin', '$2a$10$JK4qg5Hx0gtgIE7VDxW0gez30ZYgqHXGLG4z/uUUL20m8U0JsVS6i', 'admin@example.com', 'admin');

-- Initial empty profile
INSERT INTO profiles (photo, cv_url) VALUES ('default-profile.jpg', '');

-- Initial contact info
INSERT INTO contact_info (email, linkedin, github, twitter, phone) 
VALUES ('melissa.colin@example.com', 'https://linkedin.com/in/melissacolin', 'https://github.com/melissacolin', 'https://twitter.com/melissacolin', '');
