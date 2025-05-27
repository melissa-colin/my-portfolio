// server/models/Content.js
const mongoose = require('mongoose');

// Content Schema - for all types of content (blogs, projects, publications, etc)
const ContentSchema = new mongoose.Schema({
  // Basic Fields
  type: {
    type: String, 
    required: true,
    enum: ['project', 'research', 'publication', 'blog', 'skill', 'about', 'home']
  },
  language: {
    type: String,
    required: true,
    enum: ['en', 'fr'],
    default: 'en'
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  image: {
    type: String,
    default: '' // URL or path to image
  },
  
  // For rich content like blog posts
  content: {
    type: mongoose.Schema.Types.Mixed,
    default: {}
  },
  
  // For projects, skills
  technologies: {
    type: [String],
    default: []
  },
  
  // For projects, publications, research
  links: {
    type: Map,
    of: String,
    default: {}
  },
  
  // For publications
  date: {
    type: Date
  },
  
  // Common classifications
  category: {
    type: String,
    default: ''
  },
  tags: {
    type: [String],
    default: []
  },
  
  // Status and visibility
  status: {
    type: String,
    enum: ['draft', 'published'],
    default: 'published'
  },
  
  // Relations
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  
  // Timestamps
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update the updatedAt field on save
ContentSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Content', ContentSchema);