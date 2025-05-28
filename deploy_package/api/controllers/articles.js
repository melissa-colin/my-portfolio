const { Article, ArticleTranslation, Language } = require('../models');
const fileUploadService = require('../services/fileUpload');

/**
 * Get all articles
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
exports.getArticles = async (req, res) => {
  try {
    const { lang, limit, page } = req.query;
    
    // Parse pagination parameters
    const pageNumber = parseInt(page) || 1;
    const itemsPerPage = parseInt(limit) || 10;
    const offset = (pageNumber - 1) * itemsPerPage;
    
    // Base query
    const query = {
      include: [
        {
          model: ArticleTranslation,
          as: 'translations',
          include: [Language]
        }
      ],
      order: [['published_date', 'DESC']],
      limit: itemsPerPage,
      offset: offset
    };
    
    // Get total count for pagination
    const total = await Article.count();
    
    // Get articles with pagination
    const articles = await Article.findAll(query);
    
    // Format response based on whether language is specified
    const formattedArticles = articles.map(article => {
      const formattedArticle = {
        id: article.id,
        cover_image: article.cover_image,
        published_date: article.published_date,
        status: article.status,
        created_at: article.created_at,
        updated_at: article.updated_at,
        translations: {}
      };
      
      // Add translations to response
      article.translations.forEach(translation => {
        formattedArticle.translations[translation.Language.code] = {
          title: translation.title,
          slug: translation.slug,
          summary: translation.summary,
          content: translation.content,
          meta_description: translation.meta_description,
          meta_keywords: translation.meta_keywords
        };
      });
      
      // If language is specified, include that language's data directly on the object
      if (lang) {
        const translation = article.translations.find(
          t => t.Language.code === lang
        );
        
        if (translation) {
          formattedArticle.title = translation.title;
          formattedArticle.slug = translation.slug;
          formattedArticle.summary = translation.summary;
          formattedArticle.content = translation.content;
          formattedArticle.meta_description = translation.meta_description;
          formattedArticle.meta_keywords = translation.meta_keywords;
          formattedArticle.language = lang;
        }
      }
      
      return formattedArticle;
    });
    
    res.json({
      articles: formattedArticles,
      pagination: {
        total,
        page: pageNumber,
        limit: itemsPerPage,
        pages: Math.ceil(total / itemsPerPage)
      }
    });
  } catch (error) {
    console.error('Get articles error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

/**
 * Get article by ID
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
exports.getArticleById = async (req, res) => {
  try {
    const { id } = req.params;
    const { lang } = req.query;
    
    const article = await Article.findByPk(id, {
      include: [
        {
          model: ArticleTranslation,
          as: 'translations',
          include: [Language]
        }
      ]
    });
    
    if (!article) {
      return res.status(404).json({ message: 'Article not found' });
    }
    
    // Format response
    const formattedArticle = {
      id: article.id,
      cover_image: article.cover_image,
      published_date: article.published_date,
      status: article.status,
      created_at: article.created_at,
      updated_at: article.updated_at,
      translations: {}
    };
    
    // Add translations to response
    article.translations.forEach(translation => {
      formattedArticle.translations[translation.Language.code] = {
        title: translation.title,
        slug: translation.slug,
        summary: translation.summary,
        content: translation.content,
        meta_description: translation.meta_description,
        meta_keywords: translation.meta_keywords
      };
    });
    
    // If language is specified, include that language's data directly on the object
    if (lang) {
      const translation = article.translations.find(
        t => t.Language.code === lang
      );
      
      if (translation) {
        formattedArticle.title = translation.title;
        formattedArticle.slug = translation.slug;
        formattedArticle.summary = translation.summary;
        formattedArticle.content = translation.content;
        formattedArticle.meta_description = translation.meta_description;
        formattedArticle.meta_keywords = translation.meta_keywords;
        formattedArticle.language = lang;
      }
    }
    
    res.json(formattedArticle);
  } catch (error) {
    console.error('Get article by ID error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

/**
 * Get article by slug
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
exports.getArticleBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    const { lang } = req.query;
    
    if (!lang) {
      return res.status(400).json({ message: 'Language code is required' });
    }
    
    // Find language ID
    const language = await Language.findOne({ where: { code: lang } });
    
    if (!language) {
      return res.status(404).json({ message: 'Language not found' });
    }
    
    // Find article translation by slug and language
    const articleTranslation = await ArticleTranslation.findOne({
      where: {
        slug,
        language_id: language.id
      },
      include: [
        {
          model: Article,
          as: 'article',
          include: [
            {
              model: ArticleTranslation,
              as: 'translations',
              include: [Language]
            }
          ]
        }
      ]
    });
    
    if (!articleTranslation || !articleTranslation.article) {
      return res.status(404).json({ message: 'Article not found' });
    }
    
    const article = articleTranslation.article;
    
    // Format response
    const formattedArticle = {
      id: article.id,
      title: articleTranslation.title,
      slug: articleTranslation.slug,
      summary: articleTranslation.summary,
      content: articleTranslation.content,
      meta_description: articleTranslation.meta_description,
      meta_keywords: articleTranslation.meta_keywords,
      cover_image: article.cover_image,
      published_date: article.published_date,
      status: article.status,
      created_at: article.created_at,
      updated_at: article.updated_at,
      language: lang,
      translations: {}
    };
    
    // Add translations to response
    article.translations.forEach(translation => {
      formattedArticle.translations[translation.Language.code] = {
        title: translation.title,
        slug: translation.slug,
        summary: translation.summary
      };
    });
    
    res.json(formattedArticle);
  } catch (error) {
    console.error('Get article by slug error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

/**
 * Create new article
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
exports.createArticle = async (req, res) => {
  try {
    const {
      published_date,
      status,
      translations
    } = req.body;
    
    // Handle cover image if uploaded
    let coverImagePath = null;
    if (req.files && req.files.cover_image) {
      coverImagePath = await fileUploadService.uploadFile(req.files.cover_image, 'articles');
    }
    
    // Create article
    const article = await Article.create({
      cover_image: coverImagePath,
      published_date: published_date || new Date(),
      status: status || 'draft'
    });
    
    // Add translations if provided
    if (translations && typeof translations === 'object') {
      const languages = await Language.findAll();
      
      for (const [langCode, translationData] of Object.entries(translations)) {
        const language = languages.find(lang => lang.code === langCode);
        
        if (language) {
          // Create slug from title if not provided
          const slug = translationData.slug || translationData.title
            .toLowerCase()
            .replace(/[^\w\s-]/g, '')
            .replace(/[\s_-]+/g, '-')
            .replace(/^-+|-+$/g, '');
          
          await ArticleTranslation.create({
            article_id: article.id,
            language_id: language.id,
            title: translationData.title,
            slug,
            summary: translationData.summary,
            content: translationData.content,
            meta_description: translationData.meta_description || '',
            meta_keywords: translationData.meta_keywords || ''
          });
        }
      }
    }
    
    // Get complete article with translations
    const createdArticle = await Article.findByPk(article.id, {
      include: [
        {
          model: ArticleTranslation,
          as: 'translations',
          include: [Language]
        }
      ]
    });
    
    // Format response
    const formattedArticle = {
      id: createdArticle.id,
      cover_image: createdArticle.cover_image,
      published_date: createdArticle.published_date,
      status: createdArticle.status,
      created_at: createdArticle.created_at,
      updated_at: createdArticle.updated_at,
      translations: {}
    };
    
    // Add translations to response
    createdArticle.translations.forEach(translation => {
      formattedArticle.translations[translation.Language.code] = {
        title: translation.title,
        slug: translation.slug,
        summary: translation.summary,
        content: translation.content,
        meta_description: translation.meta_description,
        meta_keywords: translation.meta_keywords
      };
    });
    
    res.status(201).json(formattedArticle);
  } catch (error) {
    console.error('Create article error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

/**
 * Update article
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
exports.updateArticle = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      published_date,
      status,
      translations
    } = req.body;
    
    // Find article
    const article = await Article.findByPk(id);
    
    if (!article) {
      return res.status(404).json({ message: 'Article not found' });
    }
    
    // Handle cover image if uploaded
    if (req.files && req.files.cover_image) {
      // Delete old cover image
      if (article.cover_image) {
        await fileUploadService.deleteFile(article.cover_image);
      }
      
      // Upload new cover image
      article.cover_image = await fileUploadService.uploadFile(req.files.cover_image, 'articles');
    }
    
    // Update article fields
    if (published_date !== undefined) article.published_date = published_date;
    if (status !== undefined) article.status = status;
    
    await article.save();
    
    // Update translations if provided
    if (translations && typeof translations === 'object') {
      const languages = await Language.findAll();
      
      for (const [langCode, translationData] of Object.entries(translations)) {
        const language = languages.find(lang => lang.code === langCode);
        
        if (language) {
          // Create slug from title if not provided
          const slug = translationData.slug || translationData.title
            .toLowerCase()
            .replace(/[^\w\s-]/g, '')
            .replace(/[\s_-]+/g, '-')
            .replace(/^-+|-+$/g, '');
          
          // Try to find existing translation
          const existingTranslation = await ArticleTranslation.findOne({
            where: {
              article_id: article.id,
              language_id: language.id
            }
          });
          
          if (existingTranslation) {
            // Update existing translation
            existingTranslation.title = translationData.title || existingTranslation.title;
            existingTranslation.slug = slug || existingTranslation.slug;
            existingTranslation.summary = translationData.summary || existingTranslation.summary;
            existingTranslation.content = translationData.content || existingTranslation.content;
            existingTranslation.meta_description = translationData.meta_description || existingTranslation.meta_description;
            existingTranslation.meta_keywords = translationData.meta_keywords || existingTranslation.meta_keywords;
            await existingTranslation.save();
          } else {
            // Create new translation
            await ArticleTranslation.create({
              article_id: article.id,
              language_id: language.id,
              title: translationData.title,
              slug,
              summary: translationData.summary,
              content: translationData.content,
              meta_description: translationData.meta_description || '',
              meta_keywords: translationData.meta_keywords || ''
            });
          }
        }
      }
    }
    
    // Get updated article with translations
    const updatedArticle = await Article.findByPk(id, {
      include: [
        {
          model: ArticleTranslation,
          as: 'translations',
          include: [Language]
        }
      ]
    });
    
    // Format response
    const formattedArticle = {
      id: updatedArticle.id,
      cover_image: updatedArticle.cover_image,
      published_date: updatedArticle.published_date,
      status: updatedArticle.status,
      created_at: updatedArticle.created_at,
      updated_at: updatedArticle.updated_at,
      translations: {}
    };
    
    // Add translations to response
    updatedArticle.translations.forEach(translation => {
      formattedArticle.translations[translation.Language.code] = {
        title: translation.title,
        slug: translation.slug,
        summary: translation.summary,
        content: translation.content,
        meta_description: translation.meta_description,
        meta_keywords: translation.meta_keywords
      };
    });
    
    res.json(formattedArticle);
  } catch (error) {
    console.error('Update article error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

/**
 * Delete article
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
exports.deleteArticle = async (req, res) => {
  try {
    const { id } = req.params;
    
    const article = await Article.findByPk(id);
    
    if (!article) {
      return res.status(404).json({ message: 'Article not found' });
    }
    
    // Delete article cover image
    if (article.cover_image) {
      await fileUploadService.deleteFile(article.cover_image);
    }
    
    // Delete article and related data (cascade delete will handle translations)
    await article.destroy();
    
    res.json({ message: 'Article deleted successfully' });
  } catch (error) {
    console.error('Delete article error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
