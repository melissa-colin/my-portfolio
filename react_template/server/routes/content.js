// server/routes/content.js
const express = require('express');
const mongoose = require('mongoose');
const { protect, authorize } = require('../middleware/auth');
const Content = require('../models/Content');

const router = express.Router();

// @route   GET api/content
// @desc    Get all content, with optional filtering
// @access  Public
router.get('/', async (req, res, next) => {
  try {
    let query = {};
    
    // Build query from request parameters
    const { type, language, category, status, tag } = req.query;
    
    if (type) query.type = type;
    if (language) query.language = language;
    if (category) query.category = category;
    if (status) query.status = status;
    if (tag) query.tags = tag;
    
    // For pagination
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const startIndex = (page - 1) * limit;
    
    // Execute query
    const content = await Content.find(query)
      .sort({ createdAt: -1 })
      .populate('author', 'name email')
      .skip(startIndex)
      .limit(limit);
    
    // Get total count for pagination
    const total = await Content.countDocuments(query);
    
    res.json({
      success: true,
      count: content.length,
      total,
      pagination: {
        current: page,
        totalPages: Math.ceil(total / limit)
      },
      data: content
    });
  } catch (error) {
    next(error);
  }
});

// @route   GET api/content/:id
// @desc    Get content by ID
// @access  Public
router.get('/:id', async (req, res, next) => {
  try {
    const content = await Content.findById(req.params.id)
      .populate('author', 'name email');
    
    if (!content) {
      return res.status(404).json({
        success: false,
        message: 'Content not found'
      });
    }
    
    res.json({
      success: true,
      data: content
    });
  } catch (error) {
    if (error.kind === 'ObjectId') {
      return res.status(404).json({
        success: false,
        message: 'Content not found'
      });
    }
    next(error);
  }
});

// @route   POST api/content
// @desc    Create new content
// @access  Private (Admin, Editor)
router.post('/', protect, authorize('admin', 'editor'), async (req, res, next) => {
  try {
    // Create content with author ID
    const content = new Content({
      ...req.body,
      author: req.user.id
    });
    
    await content.save();
    
    res.status(201).json({
      success: true,
      data: content
    });
  } catch (error) {
    next(error);
  }
});

// @route   PUT api/content/:id
// @desc    Update content
// @access  Private (Admin, Editor)
router.put('/:id', protect, authorize('admin', 'editor'), async (req, res, next) => {
  try {
    let content = await Content.findById(req.params.id);
    
    if (!content) {
      return res.status(404).json({
        success: false,
        message: 'Content not found'
      });
    }
    
    // Check if user is the author or admin
    if (content.author && content.author.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this content'
      });
    }
    
    // Update content
    content = await Content.findByIdAndUpdate(
      req.params.id,
      { ...req.body, updatedAt: Date.now() },
      { new: true, runValidators: true }
    );
    
    res.json({
      success: true,
      data: content
    });
  } catch (error) {
    next(error);
  }
});

// @route   DELETE api/content/:id
// @desc    Delete content
// @access  Private (Admin, Editor)
router.delete('/:id', protect, authorize('admin', 'editor'), async (req, res, next) => {
  try {
    const content = await Content.findById(req.params.id);
    
    if (!content) {
      return res.status(404).json({
        success: false,
        message: 'Content not found'
      });
    }
    
    // Check if user is the author or admin
    if (content.author && content.author.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this content'
      });
    }
    
    await content.remove();
    
    res.json({
      success: true,
      data: {}
    });
  } catch (error) {
    next(error);
  }
});

// @route   GET api/content/types
// @desc    Get all content types
// @access  Public
router.get('/types', async (req, res, next) => {
  try {
    const types = await Content.distinct('type');
    
    res.json({
      success: true,
      data: types
    });
  } catch (error) {
    next(error);
  }
});

// @route   GET api/content/categories
// @desc    Get all content categories
// @access  Public
router.get('/categories', async (req, res, next) => {
  try {
    const categories = await Content.distinct('category');
    
    res.json({
      success: true,
      data: categories
    });
  } catch (error) {
    next(error);
  }
});

// @route   GET api/content/tags
// @desc    Get all content tags
// @access  Public
router.get('/tags', async (req, res, next) => {
  try {
    const tags = await Content.distinct('tags');
    
    res.json({
      success: true,
      data: tags
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;