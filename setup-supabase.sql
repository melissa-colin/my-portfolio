-- setup-supabase.sql
-- SQL script to create the content table for Melissa Colin's portfolio

-- Create content table if it doesn't exist
CREATE TABLE IF NOT EXISTS content (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  type VARCHAR NOT NULL,
  language VARCHAR NOT NULL DEFAULT 'en',
  content JSONB NOT NULL DEFAULT '{}'::jsonb,
  status VARCHAR NOT NULL DEFAULT 'draft',
  category VARCHAR,
  tags TEXT[],
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create indexes for common queries
CREATE INDEX IF NOT EXISTS content_type_idx ON content (type);
CREATE INDEX IF NOT EXISTS content_language_idx ON content (language);
CREATE INDEX IF NOT EXISTS content_status_idx ON content (status);
CREATE INDEX IF NOT EXISTS content_created_at_idx ON content (created_at);

-- Add some initial demo content
INSERT INTO content (type, language, content, status, created_at, updated_at)
VALUES 
  ('home', 'en', '{"hero_title": "Dr. Mélissa Colin", "hero_subtitle": "AI Researcher & Data Scientist", "about_title": "About Me", "about_text": "I am an AI researcher specializing in machine learning algorithms and their applications in healthcare and natural language processing."}', 'published', now(), now()),
  ('research', 'en', '{"title": "Research Areas", "intro": "My research focuses on advancing machine learning techniques for complex real-world problems.", "areas": {"nlp": "Natural Language Processing", "healthcare": "Healthcare AI", "vision": "Computer Vision"}}', 'published', now(), now()),
  ('publications', 'en', '{"title": "Recent Publications", "intro": "Selected academic publications and research papers."}', 'published', now(), now()),
  ('contact', 'en', '{"email": "colin.melissa72@gmail.com", "title": "Get in Touch", "message": "Feel free to contact me with research opportunities or collaboration ideas."}', 'published', now(), now())
ON CONFLICT (id) DO NOTHING;

-- Grant permissions for public access
ALTER TABLE content ENABLE ROW LEVEL SECURITY;

-- Create policies
-- 1. Admin users can do anything
CREATE POLICY "Admins have full access" ON content
  USING (auth.jwt() ->> 'role' = 'admin')
  WITH CHECK (auth.jwt() ->> 'role' = 'admin');

-- 2. Allow anyone to read published content
CREATE POLICY "Published content is viewable by everyone" ON content
  FOR SELECT
  USING (status = 'published');