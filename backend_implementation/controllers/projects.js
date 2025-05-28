const { Project, ProjectTranslation, ProjectImage, Language } = require('../models');
const fileUploadService = require('../services/fileUpload');

/**
 * Get all projects
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
exports.getProjects = async (req, res) => {
  try {
    const { lang, featured } = req.query;
    
    // Base query
    const query = {
      include: [
        {
          model: ProjectTranslation,
          as: 'translations',
          include: [Language]
        },
        {
          model: ProjectImage,
          as: 'images',
          attributes: ['id', 'image_path', 'display_order'],
          order: [['display_order', 'ASC']]
        }
      ],
      order: [['featured', 'DESC'], ['created_at', 'DESC']]
    };
    
    // If featured query param exists and is true
    if (featured === 'true') {
      query.where = { featured: true };
    }
    
    const projects = await Project.findAll(query);
    
    // Format response based on whether language is specified
    const formattedProjects = projects.map(project => {
      const formattedProject = {
        id: project.id,
        github_url: project.github_url,
        demo_url: project.demo_url,
        featured: project.featured,
        start_date: project.start_date,
        end_date: project.end_date,
        category: project.category,
        created_at: project.created_at,
        updated_at: project.updated_at,
        images: project.images.map(image => ({
          id: image.id,
          image_path: image.image_path,
          display_order: image.display_order
        })),
        translations: {}
      };
      
      // Add translations to response
      project.translations.forEach(translation => {
        formattedProject.translations[translation.Language.code] = {
          title: translation.title,
          short_description: translation.short_description,
          full_description: translation.full_description,
          technologies: translation.technologies ? JSON.parse(translation.technologies) : []
        };
      });
      
      // If language is specified, include that language's data directly on the object
      if (lang) {
        const translation = project.translations.find(
          t => t.Language.code === lang
        );
        
        if (translation) {
          formattedProject.title = translation.title;
          formattedProject.short_description = translation.short_description;
          formattedProject.full_description = translation.full_description;
          formattedProject.technologies = translation.technologies 
            ? JSON.parse(translation.technologies) 
            : [];
          formattedProject.language = lang;
        }
      }
      
      return formattedProject;
    });
    
    res.json(formattedProjects);
  } catch (error) {
    console.error('Get projects error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

/**
 * Get project by ID
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
exports.getProjectById = async (req, res) => {
  try {
    const { id } = req.params;
    const { lang } = req.query;
    
    const project = await Project.findByPk(id, {
      include: [
        {
          model: ProjectTranslation,
          as: 'translations',
          include: [Language]
        },
        {
          model: ProjectImage,
          as: 'images',
          attributes: ['id', 'image_path', 'display_order'],
          order: [['display_order', 'ASC']]
        }
      ]
    });
    
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    
    // Format response
    const formattedProject = {
      id: project.id,
      github_url: project.github_url,
      demo_url: project.demo_url,
      featured: project.featured,
      start_date: project.start_date,
      end_date: project.end_date,
      category: project.category,
      created_at: project.created_at,
      updated_at: project.updated_at,
      images: project.images.map(image => ({
        id: image.id,
        image_path: image.image_path,
        display_order: image.display_order
      })),
      translations: {}
    };
    
    // Add translations to response
    project.translations.forEach(translation => {
      formattedProject.translations[translation.Language.code] = {
        title: translation.title,
        short_description: translation.short_description,
        full_description: translation.full_description,
        technologies: translation.technologies ? JSON.parse(translation.technologies) : []
      };
    });
    
    // If language is specified, include that language's data directly on the object
    if (lang) {
      const translation = project.translations.find(
        t => t.Language.code === lang
      );
      
      if (translation) {
        formattedProject.title = translation.title;
        formattedProject.short_description = translation.short_description;
        formattedProject.full_description = translation.full_description;
        formattedProject.technologies = translation.technologies 
          ? JSON.parse(translation.technologies) 
          : [];
        formattedProject.language = lang;
      }
    }
    
    res.json(formattedProject);
  } catch (error) {
    console.error('Get project by ID error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

/**
 * Create new project
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
exports.createProject = async (req, res) => {
  try {
    const {
      github_url,
      demo_url,
      featured,
      start_date,
      end_date,
      category,
      translations
    } = req.body;
    
    // Create project
    const project = await Project.create({
      github_url,
      demo_url,
      featured: !!featured,
      start_date,
      end_date,
      category
    });
    
    // Add translations if provided
    if (translations && typeof translations === 'object') {
      const languages = await Language.findAll();
      
      for (const [langCode, translationData] of Object.entries(translations)) {
        const language = languages.find(lang => lang.code === langCode);
        
        if (language) {
          // Convert technologies array to string for storage
          const technologiesString = translationData.technologies 
            ? JSON.stringify(translationData.technologies) 
            : '[]';
          
          await ProjectTranslation.create({
            project_id: project.id,
            language_id: language.id,
            title: translationData.title,
            short_description: translationData.short_description,
            full_description: translationData.full_description,
            technologies: technologiesString
          });
        }
      }
    }
    
    // Get complete project with translations
    const createdProject = await Project.findByPk(project.id, {
      include: [
        {
          model: ProjectTranslation,
          as: 'translations',
          include: [Language]
        }
      ]
    });
    
    // Format response
    const formattedProject = {
      id: createdProject.id,
      github_url: createdProject.github_url,
      demo_url: createdProject.demo_url,
      featured: createdProject.featured,
      start_date: createdProject.start_date,
      end_date: createdProject.end_date,
      category: createdProject.category,
      created_at: createdProject.created_at,
      updated_at: createdProject.updated_at,
      images: [],
      translations: {}
    };
    
    // Add translations to response
    createdProject.translations.forEach(translation => {
      formattedProject.translations[translation.Language.code] = {
        title: translation.title,
        short_description: translation.short_description,
        full_description: translation.full_description,
        technologies: translation.technologies ? JSON.parse(translation.technologies) : []
      };
    });
    
    res.status(201).json(formattedProject);
  } catch (error) {
    console.error('Create project error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

/**
 * Update project
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
exports.updateProject = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      github_url,
      demo_url,
      featured,
      start_date,
      end_date,
      category,
      translations
    } = req.body;
    
    // Find project
    const project = await Project.findByPk(id);
    
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    
    // Update project fields
    if (github_url !== undefined) project.github_url = github_url;
    if (demo_url !== undefined) project.demo_url = demo_url;
    if (featured !== undefined) project.featured = !!featured;
    if (start_date !== undefined) project.start_date = start_date;
    if (end_date !== undefined) project.end_date = end_date;
    if (category !== undefined) project.category = category;
    
    await project.save();
    
    // Update translations if provided
    if (translations && typeof translations === 'object') {
      const languages = await Language.findAll();
      
      for (const [langCode, translationData] of Object.entries(translations)) {
        const language = languages.find(lang => lang.code === langCode);
        
        if (language) {
          // Convert technologies array to string for storage
          const technologiesString = translationData.technologies 
            ? JSON.stringify(translationData.technologies) 
            : '[]';
          
          // Try to find existing translation
          const existingTranslation = await ProjectTranslation.findOne({
            where: {
              project_id: project.id,
              language_id: language.id
            }
          });
          
          if (existingTranslation) {
            // Update existing translation
            existingTranslation.title = translationData.title;
            existingTranslation.short_description = translationData.short_description;
            existingTranslation.full_description = translationData.full_description;
            existingTranslation.technologies = technologiesString;
            await existingTranslation.save();
          } else {
            // Create new translation
            await ProjectTranslation.create({
              project_id: project.id,
              language_id: language.id,
              title: translationData.title,
              short_description: translationData.short_description,
              full_description: translationData.full_description,
              technologies: technologiesString
            });
          }
        }
      }
    }
    
    // Get updated project with translations
    const updatedProject = await Project.findByPk(id, {
      include: [
        {
          model: ProjectTranslation,
          as: 'translations',
          include: [Language]
        },
        {
          model: ProjectImage,
          as: 'images',
          attributes: ['id', 'image_path', 'display_order'],
          order: [['display_order', 'ASC']]
        }
      ]
    });
    
    // Format response
    const formattedProject = {
      id: updatedProject.id,
      github_url: updatedProject.github_url,
      demo_url: updatedProject.demo_url,
      featured: updatedProject.featured,
      start_date: updatedProject.start_date,
      end_date: updatedProject.end_date,
      category: updatedProject.category,
      created_at: updatedProject.created_at,
      updated_at: updatedProject.updated_at,
      images: updatedProject.images.map(image => ({
        id: image.id,
        image_path: image.image_path,
        display_order: image.display_order
      })),
      translations: {}
    };
    
    // Add translations to response
    updatedProject.translations.forEach(translation => {
      formattedProject.translations[translation.Language.code] = {
        title: translation.title,
        short_description: translation.short_description,
        full_description: translation.full_description,
        technologies: translation.technologies ? JSON.parse(translation.technologies) : []
      };
    });
    
    res.json(formattedProject);
  } catch (error) {
    console.error('Update project error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

/**
 * Delete project
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
exports.deleteProject = async (req, res) => {
  try {
    const { id } = req.params;
    
    const project = await Project.findByPk(id, {
      include: [{ model: ProjectImage, as: 'images' }]
    });
    
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    
    // Delete project images from storage
    for (const image of project.images) {
      await fileUploadService.deleteFile(image.image_path);
    }
    
    // Delete project and related data (cascade delete will handle translations and images)
    await project.destroy();
    
    res.json({ message: 'Project deleted successfully' });
  } catch (error) {
    console.error('Delete project error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

/**
 * Upload project image
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
exports.uploadProjectImage = async (req, res) => {
  try {
    const { id } = req.params;
    const { display_order } = req.body;
    
    if (!req.files || !req.files.image) {
      return res.status(400).json({ message: 'No image uploaded' });
    }
    
    const project = await Project.findByPk(id);
    
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    
    // Upload image
    const imagePath = await fileUploadService.uploadFile(req.files.image, 'projects');
    
    // Create project image record
    const projectImage = await ProjectImage.create({
      project_id: project.id,
      image_path: imagePath,
      display_order: display_order || 0
    });
    
    res.status(201).json({
      id: projectImage.id,
      image_path: imagePath,
      display_order: projectImage.display_order
    });
  } catch (error) {
    console.error('Upload project image error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

/**
 * Delete project image
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
exports.deleteProjectImage = async (req, res) => {
  try {
    const { id, imageId } = req.params;
    
    const projectImage = await ProjectImage.findOne({
      where: {
        id: imageId,
        project_id: id
      }
    });
    
    if (!projectImage) {
      return res.status(404).json({ message: 'Project image not found' });
    }
    
    // Delete image file
    await fileUploadService.deleteFile(projectImage.image_path);
    
    // Delete image record
    await projectImage.destroy();
    
    res.json({ message: 'Project image deleted successfully' });
  } catch (error) {
    console.error('Delete project image error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

/**
 * Update project image order
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
exports.updateProjectImageOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const { imageOrder } = req.body;
    
    if (!Array.isArray(imageOrder)) {
      return res.status(400).json({ message: 'Image order must be an array' });
    }
    
    const project = await Project.findByPk(id);
    
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    
    // Update image display order
    for (const item of imageOrder) {
      if (!item.id || item.display_order === undefined) continue;
      
      await ProjectImage.update(
        { display_order: item.display_order },
        { where: { id: item.id, project_id: id } }
      );
    }
    
    // Get updated images
    const updatedImages = await ProjectImage.findAll({
      where: { project_id: id },
      order: [['display_order', 'ASC']]
    });
    
    res.json(updatedImages.map(image => ({
      id: image.id,
      image_path: image.image_path,
      display_order: image.display_order
    })));
  } catch (error) {
    console.error('Update project image order error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
