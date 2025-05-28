// create-admin-script.js
import { createClient } from '@supabase/supabase-js';

// Supabase configuration
const supabaseUrl = 'https://alqsqumttplwmxrqndlt.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFscXNxdW10dHBsd214cnFuZGx0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTk0OTMwMTUsImV4cCI6MjAzNTA2OTAxNX0.cqVa1Z86VNzxQWXXs-_ZiQeGqHxDGkgLKfq7MGqd0Z0';

console.log('Supabase URL:', supabaseUrl);
console.log('Initializing Supabase client...');

// Create Supabase client
const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Create admin user function
async function createAdminUser() {
  try {
    console.log('Creating admin account...');
    
    const email = 'colin.melissa72@gmail.com';
    const password = 'Ms*Uwpi1sIr04*n'; // Strong password
    
    console.log('Signing up admin user with email:', email);
    
    // Sign up the admin user
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name: 'Mélissa Colin',
          role: 'admin'
        }
      }
    });
    
    if (error) {
      console.error('Error creating admin user:', error.message);
      return;
    }
    
    console.log('Admin account created successfully!');
    console.log('User ID:', data.user.id);
    console.log('Email:', email);
    console.log('Role: admin');
    console.log('-----------------------------------');
    console.log('Login credentials:');
    console.log('Email:', email);
    console.log('Password:', password);
    
    // Now create the content table if it doesn't exist
    console.log('Setting up content table...');
    const { error: tableError } = await supabase.rpc('create_content_table_if_not_exists');
    
    if (tableError) {
      console.error('Error creating content table:', tableError.message);
    } else {
      console.log('Content table setup successfully!');
    }
    
  } catch (error) {
    console.error('Unexpected error:', error);
  } finally {
    process.exit(0);
  }
}

// Execute the admin creation
createAdminUser();
