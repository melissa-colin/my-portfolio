const { Language } = require('../models');

/**
 * Get all languages
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
exports.getLanguages = async (req, res) => {
  try {
    const languages = await Language.findAll();
    res.json(languages);
  } catch (error) {
    console.error('Get languages error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

/**
 * Get language by ID
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
exports.getLanguageById = async (req, res) => {
  try {
    const language = await Language.findByPk(req.params.id);
    
    if (!language) {
      return res.status(404).json({ message: 'Language not found' });
    }
    
    res.json(language);
  } catch (error) {
    console.error('Get language by ID error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

/**
 * Create new language
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
exports.createLanguage = async (req, res) => {
  try {
    const { code, name, is_default } = req.body;
    
    if (!code || !name) {
      return res.status(400).json({ message: 'Language code and name are required' });
    }
    
    // Check if language code already exists
    const existingLanguage = await Language.findOne({ where: { code } });
    if (existingLanguage) {
      return res.status(400).json({ message: 'Language code already exists' });
    }
    
    // If this language is set as default, unset other defaults
    if (is_default) {
      await Language.update({ is_default: false }, { where: { is_default: true } });
    }
    
    const language = await Language.create({
      code,
      name,
      is_default: !!is_default
    });
    
    res.status(201).json(language);
  } catch (error) {
    console.error('Create language error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

/**
 * Update language
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
exports.updateLanguage = async (req, res) => {
  try {
    const { name, is_default } = req.body;
    
    const language = await Language.findByPk(req.params.id);
    
    if (!language) {
      return res.status(404).json({ message: 'Language not found' });
    }
    
    // If this language is set as default, unset other defaults
    if (is_default) {
      await Language.update({ is_default: false }, { where: { is_default: true } });
    }
    
    // Update language
    language.name = name || language.name;
    language.is_default = is_default !== undefined ? is_default : language.is_default;
    
    await language.save();
    
    res.json(language);
  } catch (error) {
    console.error('Update language error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

/**
 * Delete language
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
exports.deleteLanguage = async (req, res) => {
  try {
    const language = await Language.findByPk(req.params.id);
    
    if (!language) {
      return res.status(404).json({ message: 'Language not found' });
    }
    
    // Don't allow deletion of default language
    if (language.is_default) {
      return res.status(400).json({ message: 'Cannot delete default language' });
    }
    
    // Check if there are at least 2 languages before deletion
    const languageCount = await Language.count();
    if (languageCount <= 1) {
      return res.status(400).json({ message: 'Cannot delete the only language' });
    }
    
    await language.destroy();
    
    res.json({ message: 'Language deleted successfully' });
  } catch (error) {
    console.error('Delete language error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

/**
 * Set default language
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
exports.setDefaultLanguage = async (req, res) => {
  try {
    const language = await Language.findByPk(req.params.id);
    
    if (!language) {
      return res.status(404).json({ message: 'Language not found' });
    }
    
    // Unset current default language
    await Language.update({ is_default: false }, { where: { is_default: true } });
    
    // Set new default language
    language.is_default = true;
    await language.save();
    
    res.json(language);
  } catch (error) {
    console.error('Set default language error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
