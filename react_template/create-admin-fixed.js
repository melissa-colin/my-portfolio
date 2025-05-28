// create-admin-fixed.js
const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

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
    
    // Now create the content table using SQL
    console.log('Setting up database tables...');
    
    try {
      // Read the SQL setup file
      const sqlFilePath = path.join(__dirname, 'setup-supabase.sql');
      const sqlScript = fs.readFileSync(sqlFilePath, 'utf8');
      
      console.log('Executing SQL setup script...');
      
      // Execute SQL commands one by one (Supabase doesn't support executing large scripts at once)
      const sqlCommands = sqlScript.split(';').filter(cmd => cmd.trim().length > 0);
      
      for (let i = 0; i < sqlCommands.length; i++) {
        const command = sqlCommands[i].trim() + ';';
        console.log(`Executing command ${i+1}/${sqlCommands.length}...`);
        
        const { error: sqlError } = await supabase.rpc('exec_sql', { sql: command });
        
        if (sqlError) {
          console.error(`Error executing SQL command ${i+1}:`, sqlError.message);
          console.log('Command was:', command);
        }
      }
      
      console.log('Database setup completed successfully!');
    } catch (sqlError) {
      console.error('Error setting up database tables:', sqlError.message);
      console.log('Please set up the database tables manually using the setup-supabase.sql file.');
    }
    
  } catch (error) {
    console.error('Unexpected error:', error);
  } finally {
    process.exit(0);
  }
}

// Execute the admin creation
createAdminUser();