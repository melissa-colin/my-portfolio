const path = require('path');
const fs = require('fs').promises;
const { Profile, ProfileTranslation, Language } = require('../models');

/**
 * File upload helper
 * @param {Object} file - File object from express-fileupload
 * @param {string} directory - Directory to save the file
 * @returns {string} - Path to the saved file
 */
async function uploadFile(file, directory) {
  const uploadDir = path.join(__dirname, '..', 'uploads', directory);
  
  // Create directory if it doesn't exist
  try {
    await fs.mkdir(uploadDir, { recursive: true });
  } catch (err) {
    if (err.code !== 'EEXIST') throw err;
  }
  
  const fileName = `${Date.now()}-${file.name}`;
  const filePath = path.join(uploadDir, fileName);
  
  await file.mv(filePath);
  
  return `uploads/${directory}/${fileName}`;
}

/**
 * Get profile information with translations
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
exports.getProfile = async (req, res) => {
  try {
    const { lang } = req.query;
    
    let profile = await Profile.findOne({
      include: [
        {
          model: ProfileTranslation,
          as: 'translations',
          include: [Language]
        }
      ]
    });
    
    // Create default profile if none exists
    if (!profile) {
      profile = await Profile.create({
        photo: 'default-profile.jpg',
        cv_url: ''
      });
      
      // Add default translations
      const languages = await Language.findAll();
      
      for (const language of languages) {
        await ProfileTranslation.create({
          profile_id: profile.id,
          language_id: language.id,
          name: 'Melissa Colin',
          title: 'AI Researcher',
          bio: 'Welcome to my portfolio!',
          location: 'Paris, France'
        });
      }
      
      // Reload profile with translations
      profile = await Profile.findOne({
        include: [
          {
            model: ProfileTranslation,
            as: 'translations',
            include: [Language]
          }
        ]
      });
    }
    
    // Format response
    const response = {
      id: profile.id,
      photo: profile.photo,
      cv_url: profile.cv_url,
      created_at: profile.created_at,
      updated_at: profile.updated_at,
      translations: {}
    };
    
    // Add translations to response
    profile.translations.forEach(translation => {
      response.translations[translation.Language.code] = {
        name: translation.name,
        title: translation.title,
        bio: translation.bio,
        location: translation.location
      };
    });
    
    // If language specified, return only that language's data
    if (lang) {
      const translation = profile.translations.find(
        t => t.Language.code === lang
      );
      
      if (translation) {
        return res.json({
          ...response,
          name: translation.name,
          title: translation.title,
          bio: translation.bio,
          location: translation.location,
          language: lang
        });
      }
    }
    
    // Return all translations
    res.json(response);
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

/**
 * Update profile information
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
exports.updateProfile = async (req, res) => {
  try {
    const { translations } = req.body;
    
    let profile = await Profile.findOne();
    
    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }
    
    // Update translations if provided
    if (translations && typeof translations === 'object') {
      const languages = await Language.findAll();
      
      for (const [langCode, translationData] of Object.entries(translations)) {
        const language = languages.find(lang => lang.code === langCode);
        
        if (language) {
          await ProfileTranslation.update(
            {
              name: translationData.name,
              title: translationData.title,
              bio: translationData.bio,
              location: translationData.location
            },
            {
              where: {
                profile_id: profile.id,
                language_id: language.id
              }
            }
          );
        }
      }
    }
    
    // Get updated profile
    profile = await Profile.findOne({
      include: [
        {
          model: ProfileTranslation,
          as: 'translations',
          include: [Language]
        }
      ]
    });
    
    // Format response
    const response = {
      id: profile.id,
      photo: profile.photo,
      cv_url: profile.cv_url,
      created_at: profile.created_at,
      updated_at: profile.updated_at,
      translations: {}
    };
    
    // Add translations to response
    profile.translations.forEach(translation => {
      response.translations[translation.Language.code] = {
        name: translation.name,
        title: translation.title,
        bio: translation.bio,
        location: translation.location
      };
    });
    
    res.json(response);
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

/**
 * Upload profile photo
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
exports.updateProfilePhoto = async (req, res) => {
  try {
    if (!req.files || !req.files.photo) {
      return res.status(400).json({ message: 'No photo uploaded' });
    }
    
    const profile = await Profile.findOne();
    
    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }
    
    // Upload new photo
    const photoPath = await uploadFile(req.files.photo, 'profile');
    
    // Delete old photo if it exists and isn't default
    if (profile.photo && !profile.photo.includes('default-profile') && profile.photo !== photoPath) {
      try {
        const oldPhotoPath = path.join(__dirname, '..', profile.photo);
        await fs.unlink(oldPhotoPath);
      } catch (err) {
        console.error('Error deleting old photo:', err);
      }
    }
    
    // Update profile photo
    profile.photo = photoPath;
    await profile.save();
    
    res.json({
      message: 'Profile photo updated successfully',
      photo: photoPath
    });
  } catch (error) {
    console.error('Update profile photo error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

/**
 * Upload CV file
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
exports.uploadCV = async (req, res) => {
  try {
    if (!req.files || !req.files.cv) {
      return res.status(400).json({ message: 'No CV file uploaded' });
    }
    
    const profile = await Profile.findOne();
    
    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }
    
    // Upload new CV
    const cvPath = await uploadFile(req.files.cv, 'cv');
    
    // Delete old CV if it exists
    if (profile.cv_url) {
      try {
        const oldCvPath = path.join(__dirname, '..', profile.cv_url);
        await fs.unlink(oldCvPath);
      } catch (err) {
        console.error('Error deleting old CV:', err);
      }
    }
    
    // Update profile CV URL
    profile.cv_url = cvPath;
    await profile.save();
    
    res.json({
      message: 'CV uploaded successfully',
      cv_url: cvPath
    });
  } catch (error) {
    console.error('Upload CV error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
