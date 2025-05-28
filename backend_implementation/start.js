#!/usr/bin/env node

/**
 * AI Researcher Portfolio Backend Startup Script
 * This script handles environment setup, database checks, and server startup
 */

require('dotenv').config();
const chalk = require('chalk');
const { sequelize } = require('./config/database');
const fs = require('fs');
const path = require('path');

// Create necessary directories if they don't exist
const ensureDirectoriesExist = () => {
  console.log(chalk.blue('🔍 Checking required directories...'));
  
  const directories = [
    path.join(__dirname, 'uploads'),
    path.join(__dirname, 'uploads/profile'),
    path.join(__dirname, 'uploads/projects'),
    path.join(__dirname, 'uploads/articles'),
    path.join(__dirname, 'logs')
  ];
  
  directories.forEach(dir => {
    if (!fs.existsSync(dir)) {
      console.log(chalk.yellow(`Creating directory: ${dir}`));
      fs.mkdirSync(dir, { recursive: true });
    }
  });
  
  console.log(chalk.green('✅ Directory check complete'));
};

// Verify environment variables are set
const checkEnvironmentVariables = () => {
  console.log(chalk.blue('🔍 Checking environment variables...'));
  
  const requiredVars = [
    'DB_HOST', 
    'DB_USER', 
    'DB_PASSWORD', 
    'DB_NAME',
    'JWT_SECRET'
  ];
  
  const missingVars = requiredVars.filter(varName => !process.env[varName]);
  
  if (missingVars.length > 0) {
    console.error(chalk.red('❌ Missing required environment variables:'));
    missingVars.forEach(varName => {
      console.error(chalk.red(`   - ${varName}`));
    });
    console.error(chalk.yellow('Please set these variables in your .env file'));
    process.exit(1);
  }
  
  console.log(chalk.green('✅ Environment check complete'));
};

// Check database connection
const checkDatabaseConnection = async () => {
  console.log(chalk.blue('🔍 Testing database connection...'));
  
  try {
    await sequelize.authenticate();
    console.log(chalk.green('✅ Database connection successful'));
    
    if (process.env.NODE_ENV !== 'production') {
      console.log(chalk.blue('🔍 Synchronizing database models in development mode...'));
      await sequelize.sync({ alter: true });
      console.log(chalk.green('✅ Database models synchronized'));
    }
    
    return true;
  } catch (error) {
    console.error(chalk.red('❌ Database connection failed:'));
    console.error(chalk.red(error.message));
    
    console.log(chalk.yellow('\nTroubleshooting tips:'));
    console.log(chalk.yellow('1. Verify database credentials in .env file'));
    console.log(chalk.yellow(`2. Confirm MySQL is running at ${process.env.DB_HOST}`));
    console.log(chalk.yellow(`3. Check if database '${process.env.DB_NAME}' exists`));
    console.log(chalk.yellow('4. Ensure user has proper permissions'));
    
    return false;
  }
};

// Create admin user if none exists
const ensureAdminUser = async () => {
  try {
    console.log(chalk.blue('🔍 Checking for admin user...'));
    
    const { User } = require('./models');
    const bcrypt = require('bcryptjs');
    
    const adminCount = await User.count();
    
    if (adminCount === 0) {
      console.log(chalk.yellow('No admin users found. Creating default admin user...'));
      
      const defaultPassword = 'admin123'; // Should be changed immediately
      const hashedPassword = await bcrypt.hash(defaultPassword, 10);
      
      await User.create({
        username: 'admin',
        password_hash: hashedPassword,
        email: 'admin@example.com',
        role: 'admin'
      });
      
      console.log(chalk.green('✅ Default admin user created'));
      console.log(chalk.yellow('⚠️ IMPORTANT: Log in with username "admin" and password "admin123" then change the password immediately!'));
    } else {
      console.log(chalk.green('✅ Admin user exists'));
    }
  } catch (error) {
    console.error(chalk.red('❌ Error checking/creating admin user:'));
    console.error(chalk.red(error.message));
  }
};

// Create default language if none exists
const ensureDefaultLanguage = async () => {
  try {
    console.log(chalk.blue('🔍 Checking for default language...'));
    
    const { Language } = require('./models');
    
    const languageCount = await Language.count();
    
    if (languageCount === 0) {
      console.log(chalk.yellow('No languages found. Creating default languages...'));
      
      await Language.bulkCreate([
        { code: 'en', name: 'English', is_default: true },
        { code: 'fr', name: 'Français', is_default: false }
      ]);
      
      console.log(chalk.green('✅ Default languages created (English, Français)'));
    } else {
      console.log(chalk.green('✅ Languages exist'));
    }
  } catch (error) {
    console.error(chalk.red('❌ Error checking/creating default languages:'));
    console.error(chalk.red(error.message));
  }
};

// Main startup function
async function startServer() {
  console.log(chalk.magenta('\n========================================='));
  console.log(chalk.magenta(' AI RESEARCHER PORTFOLIO - BACKEND SERVER'));
  console.log(chalk.magenta('=========================================\n'));
  
  // Run checks and setup
  ensureDirectoriesExist();
  checkEnvironmentVariables();
  
  const dbConnected = await checkDatabaseConnection();
  
  if (dbConnected) {
    // Ensure initial data exists
    await ensureAdminUser();
    await ensureDefaultLanguage();
    
    // Start the actual server
    console.log(chalk.blue('\n🚀 Starting server...'));
    require('./server');
  } else {
    console.error(chalk.red('\n❌ Server startup aborted due to database connection issues'));
    process.exit(1);
  }
}

// Start the server
startServer().catch(error => {
  console.error(chalk.red('\n❌ Fatal error during server startup:'));
  console.error(chalk.red(error));
  process.exit(1);
});
