const { sequelize } = require('../config/database');
const { DataTypes } = require('sequelize');

// Define models

// Language model
const Language = sequelize.define('Language', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  code: {
    type: DataTypes.STRING(5),
    allowNull: false,
    unique: true
  },
  name: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  is_default: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
}, {
  tableName: 'languages'
});

// User model for authentication
const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  username: {
    type: DataTypes.STRING(50),
    allowNull: false,
    unique: true
  },
  password_hash: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  email: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  role: {
    type: DataTypes.STRING(20),
    allowNull: false,
    defaultValue: 'admin'
  }
}, {
  tableName: 'users'
});

// Settings model
const Setting = sequelize.define('Setting', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  key: {
    type: DataTypes.STRING(50),
    allowNull: false,
    unique: true
  },
  value: {
    type: DataTypes.TEXT
  }
}, {
  tableName: 'settings'
});

// Contact Info model
const ContactInfo = sequelize.define('ContactInfo', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  email: {
    type: DataTypes.STRING(100)
  },
  linkedin: {
    type: DataTypes.STRING(255)
  },
  github: {
    type: DataTypes.STRING(255)
  },
  twitter: {
    type: DataTypes.STRING(255)
  },
  phone: {
    type: DataTypes.STRING(50)
  }
}, {
  tableName: 'contact_info'
});

// Contact model for storing contact form submissions
const Contact = sequelize.define('Contact', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  email: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  message: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM('unread', 'read', 'replied', 'archived'),
    defaultValue: 'unread'
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  updated_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'contacts',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

// Profile model
const Profile = sequelize.define('Profile', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  photo: {
    type: DataTypes.STRING(255)
  },
  cv_url: {
    type: DataTypes.STRING(255)
  }
}, {
  tableName: 'profiles'
});

// Profile Translation model
const ProfileTranslation = sequelize.define('ProfileTranslation', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  profile_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Profile,
      key: 'id'
    }
  },
  language_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Language,
      key: 'id'
    }
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  title: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  bio: {
    type: DataTypes.TEXT
  },
  location: {
    type: DataTypes.STRING(100)
  }
}, {
  tableName: 'profile_translations',
  indexes: [
    {
      unique: true,
      fields: ['profile_id', 'language_id']
    }
  ]
});

// Skill model
const Skill = sequelize.define('Skill', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  category: {
    type: DataTypes.STRING(50)
  },
  proficiency: {
    type: DataTypes.INTEGER
  },
  logo: {
    type: DataTypes.STRING(255)
  }
}, {
  tableName: 'skills'
});

// Skill Translation model
const SkillTranslation = sequelize.define('SkillTranslation', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  skill_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Skill,
      key: 'id'
    }
  },
  language_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Language,
      key: 'id'
    }
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT
  }
}, {
  tableName: 'skill_translations',
  indexes: [
    {
      unique: true,
      fields: ['skill_id', 'language_id']
    }
  ]
});

// Experience model
const Experience = sequelize.define('Experience', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  company: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  start_date: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  end_date: {
    type: DataTypes.DATEONLY
  },
  logo: {
    type: DataTypes.STRING(255)
  },
  current: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
}, {
  tableName: 'experiences'
});

// Experience Translation model
const ExperienceTranslation = sequelize.define('ExperienceTranslation', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  experience_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Experience,
      key: 'id'
    }
  },
  language_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Language,
      key: 'id'
    }
  },
  position: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT
  }
}, {
  tableName: 'experience_translations',
  indexes: [
    {
      unique: true,
      fields: ['experience_id', 'language_id']
    }
  ]
});

// Education model
const Education = sequelize.define('Education', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  institution: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  start_date: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  end_date: {
    type: DataTypes.DATEONLY
  },
  logo: {
    type: DataTypes.STRING(255)
  }
}, {
  tableName: 'education'
});

// Education Translation model
const EducationTranslation = sequelize.define('EducationTranslation', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  education_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Education,
      key: 'id'
    }
  },
  language_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Language,
      key: 'id'
    }
  },
  degree: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  field: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT
  }
}, {
  tableName: 'education_translations',
  indexes: [
    {
      unique: true,
      fields: ['education_id', 'language_id']
    }
  ]
});

// Project model
const Project = sequelize.define('Project', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  github_url: {
    type: DataTypes.STRING(255)
  },
  demo_url: {
    type: DataTypes.STRING(255)
  },
  featured: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  start_date: {
    type: DataTypes.DATEONLY
  },
  end_date: {
    type: DataTypes.DATEONLY
  },
  category: {
    type: DataTypes.STRING(50)
  }
}, {
  tableName: 'projects'
});

// Project Translation model
const ProjectTranslation = sequelize.define('ProjectTranslation', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  project_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Project,
      key: 'id'
    }
  },
  language_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Language,
      key: 'id'
    }
  },
  title: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  short_description: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  full_description: {
    type: DataTypes.TEXT
  },
  technologies: {
    type: DataTypes.TEXT
  }
}, {
  tableName: 'project_translations',
  indexes: [
    {
      unique: true,
      fields: ['project_id', 'language_id']
    }
  ]
});

// Project Image model
const ProjectImage = sequelize.define('ProjectImage', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  project_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Project,
      key: 'id'
    }
  },
  image_path: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  display_order: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  }
}, {
  tableName: 'project_images'
});

// Publication model
const Publication = sequelize.define('Publication', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  authors: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  venue: {
    type: DataTypes.STRING(255)
  },
  publication_date: {
    type: DataTypes.DATEONLY
  },
  pdf_url: {
    type: DataTypes.STRING(255)
  },
  doi: {
    type: DataTypes.STRING(100)
  },
  citations: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  tags: {
    type: DataTypes.TEXT
  }
}, {
  tableName: 'publications'
});

// Publication Translation model
const PublicationTranslation = sequelize.define('PublicationTranslation', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  publication_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Publication,
      key: 'id'
    }
  },
  language_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Language,
      key: 'id'
    }
  },
  title: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  abstract: {
    type: DataTypes.TEXT
  }
}, {
  tableName: 'publication_translations',
  indexes: [
    {
      unique: true,
      fields: ['publication_id', 'language_id']
    }
  ]
});

// Blog Post model
const BlogPost = sequelize.define('BlogPost', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  author: {
    type: DataTypes.STRING(100)
  },
  publish_date: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  reading_time: {
    type: DataTypes.INTEGER
  },
  featured_image: {
    type: DataTypes.STRING(255)
  },
  tags: {
    type: DataTypes.TEXT
  }
}, {
  tableName: 'blog_posts'
});

// Blog Post Translation model
const BlogPostTranslation = sequelize.define('BlogPostTranslation', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  blog_post_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: BlogPost,
      key: 'id'
    }
  },
  language_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Language,
      key: 'id'
    }
  },
  title: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  short_description: {
    type: DataTypes.STRING(255)
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false
  }
}, {
  tableName: 'blog_post_translations',
  indexes: [
    {
      unique: true,
      fields: ['blog_post_id', 'language_id']
    }
  ]
});

// Define relationships

// Profile - ProfileTranslation
Profile.hasMany(ProfileTranslation, { foreignKey: 'profile_id', as: 'translations' });
ProfileTranslation.belongsTo(Profile, { foreignKey: 'profile_id' });
ProfileTranslation.belongsTo(Language, { foreignKey: 'language_id' });

// Skill - SkillTranslation
Skill.hasMany(SkillTranslation, { foreignKey: 'skill_id', as: 'translations' });
SkillTranslation.belongsTo(Skill, { foreignKey: 'skill_id' });
SkillTranslation.belongsTo(Language, { foreignKey: 'language_id' });

// Experience - ExperienceTranslation
Experience.hasMany(ExperienceTranslation, { foreignKey: 'experience_id', as: 'translations' });
ExperienceTranslation.belongsTo(Experience, { foreignKey: 'experience_id' });
ExperienceTranslation.belongsTo(Language, { foreignKey: 'language_id' });

// Education - EducationTranslation
Education.hasMany(EducationTranslation, { foreignKey: 'education_id', as: 'translations' });
EducationTranslation.belongsTo(Education, { foreignKey: 'education_id' });
EducationTranslation.belongsTo(Language, { foreignKey: 'language_id' });

// Project - ProjectTranslation
Project.hasMany(ProjectTranslation, { foreignKey: 'project_id', as: 'translations' });
ProjectTranslation.belongsTo(Project, { foreignKey: 'project_id' });
ProjectTranslation.belongsTo(Language, { foreignKey: 'language_id' });

// Project - ProjectImage
Project.hasMany(ProjectImage, { foreignKey: 'project_id', as: 'images' });
ProjectImage.belongsTo(Project, { foreignKey: 'project_id' });

// Publication - PublicationTranslation
Publication.hasMany(PublicationTranslation, { foreignKey: 'publication_id', as: 'translations' });
PublicationTranslation.belongsTo(Publication, { foreignKey: 'publication_id' });
PublicationTranslation.belongsTo(Language, { foreignKey: 'language_id' });

// BlogPost - BlogPostTranslation
BlogPost.hasMany(BlogPostTranslation, { foreignKey: 'blog_post_id', as: 'translations' });
BlogPostTranslation.belongsTo(BlogPost, { foreignKey: 'blog_post_id' });
BlogPostTranslation.belongsTo(Language, { foreignKey: 'language_id' });

module.exports = {
  Language,
  User,
  Setting,
  ContactInfo,
  Contact,
  Profile,
  ProfileTranslation,
  Skill,
  SkillTranslation,
  Experience,
  ExperienceTranslation,
  Education,
  EducationTranslation,
  Project,
  ProjectTranslation,
  ProjectImage,
  Publication,
  PublicationTranslation,
  BlogPost,
  BlogPostTranslation
};
