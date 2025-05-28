const { Expertise, ExpertiseTranslation, Language } = require('../models');

/**
 * Get all expertise categories
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
exports.getAllExpertise = async (req, res) => {
  try {
    const { lang } = req.query;
    
    const expertiseList = await Expertise.findAll({
      include: [
        {
          model: ExpertiseTranslation,
          as: 'translations',
          include: [Language]
        }
      ],
      order: [['display_order', 'ASC']]
    });
    
    // Format response based on whether language is specified
    const formattedExpertise = expertiseList.map(expertise => {
      const formattedItem = {
        id: expertise.id,
        icon: expertise.icon,
        display_order: expertise.display_order,
        created_at: expertise.created_at,
        updated_at: expertise.updated_at,
        translations: {}
      };
      
      // Add translations to response
      expertise.translations.forEach(translation => {
        formattedItem.translations[translation.Language.code] = {
          title: translation.title,
          description: translation.description,
          skills: translation.skills ? JSON.parse(translation.skills) : []
        };
      });
      
      // If language is specified, include that language's data directly on the object
      if (lang) {
        const translation = expertise.translations.find(
          t => t.Language.code === lang
        );
        
        if (translation) {
          formattedItem.title = translation.title;
          formattedItem.description = translation.description;
          formattedItem.skills = translation.skills ? JSON.parse(translation.skills) : [];
          formattedItem.language = lang;
        }
      }
      
      return formattedItem;
    });
    
    res.json(formattedExpertise);
  } catch (error) {
    console.error('Get all expertise error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

/**
 * Get expertise by ID
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
exports.getExpertiseById = async (req, res) => {
  try {
    const { id } = req.params;
    const { lang } = req.query;
    
    const expertise = await Expertise.findByPk(id, {
      include: [
        {
          model: ExpertiseTranslation,
          as: 'translations',
          include: [Language]
        }
      ]
    });
    
    if (!expertise) {
      return res.status(404).json({ message: 'Expertise not found' });
    }
    
    // Format response
    const formattedExpertise = {
      id: expertise.id,
      icon: expertise.icon,
      display_order: expertise.display_order,
      created_at: expertise.created_at,
      updated_at: expertise.updated_at,
      translations: {}
    };
    
    // Add translations to response
    expertise.translations.forEach(translation => {
      formattedExpertise.translations[translation.Language.code] = {
        title: translation.title,
        description: translation.description,
        skills: translation.skills ? JSON.parse(translation.skills) : []
      };
    });
    
    // If language is specified, include that language's data directly on the object
    if (lang) {
      const translation = expertise.translations.find(
        t => t.Language.code === lang
      );
      
      if (translation) {
        formattedExpertise.title = translation.title;
        formattedExpertise.description = translation.description;
        formattedExpertise.skills = translation.skills ? JSON.parse(translation.skills) : [];
        formattedExpertise.language = lang;
      }
    }
    
    res.json(formattedExpertise);
  } catch (error) {
    console.error('Get expertise by ID error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

/**
 * Create new expertise
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
exports.createExpertise = async (req, res) => {
  try {
    const { icon, display_order, translations } = req.body;
    
    // Get the current max display order if not provided
    let orderToUse = display_order;
    if (orderToUse === undefined) {
      const maxOrder = await Expertise.max('display_order') || 0;
      orderToUse = maxOrder + 1;
    }
    
    // Create expertise
    const expertise = await Expertise.create({
      icon,
      display_order: orderToUse
    });
    
    // Add translations if provided
    if (translations && typeof translations === 'object') {
      const languages = await Language.findAll();
      
      for (const [langCode, translationData] of Object.entries(translations)) {
        const language = languages.find(lang => lang.code === langCode);
        
        if (language) {
          // Convert skills array to string for storage
          const skillsString = translationData.skills 
            ? JSON.stringify(translationData.skills) 
            : '[]';
          
          await ExpertiseTranslation.create({
            expertise_id: expertise.id,
            language_id: language.id,
            title: translationData.title,
            description: translationData.description || '',
            skills: skillsString
          });
        }
      }
    }
    
    // Get complete expertise with translations
    const createdExpertise = await Expertise.findByPk(expertise.id, {
      include: [
        {
          model: ExpertiseTranslation,
          as: 'translations',
          include: [Language]
        }
      ]
    });
    
    // Format response
    const formattedExpertise = {
      id: createdExpertise.id,
      icon: createdExpertise.icon,
      display_order: createdExpertise.display_order,
      created_at: createdExpertise.created_at,
      updated_at: createdExpertise.updated_at,
      translations: {}
    };
    
    // Add translations to response
    createdExpertise.translations.forEach(translation => {
      formattedExpertise.translations[translation.Language.code] = {
        title: translation.title,
        description: translation.description,
        skills: translation.skills ? JSON.parse(translation.skills) : []
      };
    });
    
    res.status(201).json(formattedExpertise);
  } catch (error) {
    console.error('Create expertise error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

/**
 * Update expertise
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
exports.updateExpertise = async (req, res) => {
  try {
    const { id } = req.params;
    const { icon, display_order, translations } = req.body;
    
    const expertise = await Expertise.findByPk(id);
    
    if (!expertise) {
      return res.status(404).json({ message: 'Expertise not found' });
    }
    
    // Update expertise fields
    if (icon !== undefined) expertise.icon = icon;
    if (display_order !== undefined) expertise.display_order = display_order;
    
    await expertise.save();
    
    // Update translations if provided
    if (translations && typeof translations === 'object') {
      const languages = await Language.findAll();
      
      for (const [langCode, translationData] of Object.entries(translations)) {
        const language = languages.find(lang => lang.code === langCode);
        
        if (language) {
          // Convert skills array to string for storage
          const skillsString = translationData.skills 
            ? JSON.stringify(translationData.skills) 
            : '[]';
          
          // Try to find existing translation
          const existingTranslation = await ExpertiseTranslation.findOne({
            where: {
              expertise_id: expertise.id,
              language_id: language.id
            }
          });
          
          if (existingTranslation) {
            // Update existing translation
            if (translationData.title !== undefined) {
              existingTranslation.title = translationData.title;
            }
            if (translationData.description !== undefined) {
              existingTranslation.description = translationData.description;
            }
            if (translationData.skills !== undefined) {
              existingTranslation.skills = skillsString;
            }
            await existingTranslation.save();
          } else {
            // Create new translation
            await ExpertiseTranslation.create({
              expertise_id: expertise.id,
              language_id: language.id,
              title: translationData.title,
              description: translationData.description || '',
              skills: skillsString
            });
          }
        }
      }
    }
    
    // Get updated expertise with translations
    const updatedExpertise = await Expertise.findByPk(id, {
      include: [
        {
          model: ExpertiseTranslation,
          as: 'translations',
          include: [Language]
        }
      ]
    });
    
    // Format response
    const formattedExpertise = {
      id: updatedExpertise.id,
      icon: updatedExpertise.icon,
      display_order: updatedExpertise.display_order,
      created_at: updatedExpertise.created_at,
      updated_at: updatedExpertise.updated_at,
      translations: {}
    };
    
    // Add translations to response
    updatedExpertise.translations.forEach(translation => {
      formattedExpertise.translations[translation.Language.code] = {
        title: translation.title,
        description: translation.description,
        skills: translation.skills ? JSON.parse(translation.skills) : []
      };
    });
    
    res.json(formattedExpertise);
  } catch (error) {
    console.error('Update expertise error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

/**
 * Delete expertise
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
exports.deleteExpertise = async (req, res) => {
  try {
    const { id } = req.params;
    
    const expertise = await Expertise.findByPk(id);
    
    if (!expertise) {
      return res.status(404).json({ message: 'Expertise not found' });
    }
    
    // Delete expertise (cascade delete will handle translations)
    await expertise.destroy();
    
    res.json({ message: 'Expertise deleted successfully' });
  } catch (error) {
    console.error('Delete expertise error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

/**
 * Update expertise display order
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
exports.updateExpertiseOrder = async (req, res) => {
  try {
    const { orderData } = req.body;
    
    if (!Array.isArray(orderData)) {
      return res.status(400).json({ message: 'Invalid order data format' });
    }
    
    // Update order for each expertise
    for (const item of orderData) {
      if (!item.id || item.display_order === undefined) continue;
      
      await Expertise.update(
        { display_order: item.display_order },
        { where: { id: item.id } }
      );
    }
    
    // Get updated expertise list
    const updatedExpertise = await Expertise.findAll({
      order: [['display_order', 'ASC']]
    });
    
    res.json(updatedExpertise);
  } catch (error) {
    console.error('Update expertise order error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
