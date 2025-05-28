const { Contact } = require('../models');

/**
 * Submit a new contact message
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
exports.submitMessage = async (req, res) => {
  try {
    const { name, email, message } = req.body;
    
    // Validate inputs
    if (!name || !email || !message) {
      return res.status(400).json({ message: 'Name, email, and message are required' });
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: 'Invalid email format' });
    }
    
    // Create new contact message
    const contactMessage = await Contact.create({
      name,
      email,
      message,
      status: 'unread'
    });
    
    res.status(201).json({
      message: 'Contact message submitted successfully',
      contact: contactMessage
    });
  } catch (error) {
    console.error('Submit contact message error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

/**
 * Get all contact messages (admin only)
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
exports.getAllMessages = async (req, res) => {
  try {
    // Get pagination parameters
    const { page, limit, status } = req.query;
    const pageNumber = parseInt(page) || 1;
    const itemsPerPage = parseInt(limit) || 10;
    const offset = (pageNumber - 1) * itemsPerPage;
    
    // Base query
    const query = {};
    
    // Filter by status if provided
    if (status && ['unread', 'read', 'replied', 'archived'].includes(status)) {
      query.status = status;
    }
    
    // Get total count
    const total = await Contact.count({ where: query });
    
    // Get messages with pagination
    const messages = await Contact.findAll({
      where: query,
      order: [['created_at', 'DESC']],
      limit: itemsPerPage,
      offset: offset
    });
    
    res.json({
      messages,
      pagination: {
        total,
        page: pageNumber,
        limit: itemsPerPage,
        pages: Math.ceil(total / itemsPerPage)
      }
    });
  } catch (error) {
    console.error('Get all messages error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

/**
 * Get message by ID (admin only)
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
exports.getMessageById = async (req, res) => {
  try {
    const { id } = req.params;
    
    const message = await Contact.findByPk(id);
    
    if (!message) {
      return res.status(404).json({ message: 'Contact message not found' });
    }
    
    res.json(message);
  } catch (error) {
    console.error('Get message by ID error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

/**
 * Update message status (admin only)
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
exports.updateMessageStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    
    // Validate status
    if (!status || !['unread', 'read', 'replied', 'archived'].includes(status)) {
      return res.status(400).json({ 
        message: 'Invalid status. Must be one of: unread, read, replied, archived' 
      });
    }
    
    const message = await Contact.findByPk(id);
    
    if (!message) {
      return res.status(404).json({ message: 'Contact message not found' });
    }
    
    // Update status
    message.status = status;
    await message.save();
    
    res.json(message);
  } catch (error) {
    console.error('Update message status error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

/**
 * Delete message (admin only)
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
exports.deleteMessage = async (req, res) => {
  try {
    const { id } = req.params;
    
    const message = await Contact.findByPk(id);
    
    if (!message) {
      return res.status(404).json({ message: 'Contact message not found' });
    }
    
    await message.destroy();
    
    res.json({ message: 'Contact message deleted successfully' });
  } catch (error) {
    console.error('Delete message error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
