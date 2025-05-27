// src/utils/setupSupabase.js
import { supabase, authService } from '../services/supabase';

/**
 * Sets up the Supabase database with necessary tables and creates an admin user
 */
const setupSupabase = async () => {
  try {
    console.log('Setting up Supabase database...');
    
    // 1. Create content table if it doesn't exist
    const { error: contentTableError } = await supabase.rpc('create_content_table', {});
    if (contentTableError) {
      // If RPC doesn't exist, we'll use a raw SQL query instead
      console.log('Creating content table manually...');
      const { error } = await supabase.from('content').select('count').limit(1);
      
      if (error && error.code === '42P01') { // Table doesn't exist error
        // Create content table
        const { error: createError } = await supabase.rpc(
          'run_sql',
          {
            query: `
              CREATE TABLE IF NOT EXISTS content (
                id SERIAL PRIMARY KEY,
                type VARCHAR(50) NOT NULL,
                title VARCHAR(255) NOT NULL,
                content TEXT,
                summary TEXT,
                image_url TEXT,
                external_url TEXT,
                category VARCHAR(100),
                tags TEXT[],
                status VARCHAR(20) DEFAULT 'draft',
                language VARCHAR(10) DEFAULT 'en',
                created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()),
                updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()),
                published_at TIMESTAMP WITH TIME ZONE
              );
              
              CREATE INDEX IF NOT EXISTS idx_content_type ON content(type);
              CREATE INDEX IF NOT EXISTS idx_content_status ON content(status);
              CREATE INDEX IF NOT EXISTS idx_content_category ON content(category);
              
              ALTER TABLE content ENABLE ROW LEVEL SECURITY;
              
              -- RLS policies
              CREATE POLICY "Content is viewable by everyone" ON content
                FOR SELECT USING (status = 'published' OR auth.role() = 'authenticated');
                
              CREATE POLICY "Content is editable by admins" ON content
                USING (auth.jwt() ->> 'role' = 'admin');
            `
          }
        );
        
        if (createError) {
          console.error('Error creating content table:', createError);
        } else {
          console.log('Content table created successfully');
        }
      }
    }
    
    // 2. Create admin user
    console.log('Creating admin account...');
    const email = 'colin.melissa72@gmail.com';
    const password = 'Ms*Uwpi1sIr04*n'; // Strong password generated
    const userData = { name: 'Mélissa Colin', role: 'admin' };
    
    // Check if user already exists
    const { data: existingUser, error: userCheckError } = await supabase
      .from('users')
      .select('email')
      .eq('email', email)
      .maybeSingle();
      
    if (!existingUser) {
      const { data, error } = await authService.signUp(email, password, userData);
      
      if (error) {
        console.error('Error creating admin user:', error.message);
        return { success: false, error: error.message };
      }
      
      console.log('Admin account created successfully!');
      console.log('User ID:', data.user.id);
      console.log('Email:', email);
      console.log('Password:', password);
      console.log('Role:', userData.role);
    } else {
      console.log('Admin user already exists');
    }
    
    return { success: true };
  } catch (error) {
    console.error('Error setting up Supabase:', error.message);
    return { success: false, error: error.message };
  }
};

// Execute the setup
setupSupabase()
  .then(result => {
    console.log('Setup completed with status:', result.success ? 'SUCCESS' : 'FAILED');
  })
  .catch(err => {
    console.error('Unexpected error during setup:', err);
  });
