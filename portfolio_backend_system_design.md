# Portfolio Backend System Design

## Implementation approach

We will implement a bilingual AI researcher portfolio backend system using Node.js, Express, and MySQL. This system will support multiple languages, content management, and secure authentication for the administrator.

### Key Technologies

- **Node.js & Express**: Server-side runtime and framework for building the API
- **MySQL**: Relational database for storing structured portfolio data
- **Sequelize ORM**: Object-Relational Mapping for database interaction
- **JSON Web Tokens (JWT)**: For secure authentication and session management
- **Express-fileupload**: For handling file uploads (images, CV, etc.)
- **Bcrypt**: For password hashing and security
- **CORS**: For secure cross-origin requests from frontend

### Challenging Points & Solutions

1. **Multilingual Content Management**
   - Solution: Implement a translation table structure with language-specific content linked to main entities
   - Language codes will be used as identifiers for efficient content switching

2. **Secure File Management**
   - Solution: Implement a dedicated file upload service with security checks and standardized storage paths
   - Support for different file types (images, documents) with appropriate validation

3. **Authentication & Security**
   - Solution: Implement JWT-based authentication with refresh tokens stored in HTTP-only cookies
   - Role-based access control for administration functions

## Data structures and interfaces

### Core Models

```javascript
// Database configuration
const sequelize = new Sequelize({
  dialect: 'mysql',
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  logging: false
});
```

### Entity Relationships

```mermaid
classDiagram
    class User {
        +id: int
        +username: string
        +email: string
        +password: string
        +role: string
        +created_at: datetime
        +updated_at: datetime
        +validatePassword(password)
        +generateToken()
    }
    
    class Language {
        +id: int
        +code: string
        +name: string
        +is_default: boolean
        +created_at: datetime
        +updated_at: datetime
    }
    
    class Profile {
        +id: int
        +photo: string
        +cv_url: string
        +created_at: datetime
        +updated_at: datetime
    }
    
    class ProfileTranslation {
        +id: int
        +profile_id: int
        +language_id: int
        +name: string
        +title: string
        +bio: text
        +location: string
        +created_at: datetime
        +updated_at: datetime
    }
    
    class Project {
        +id: int
        +github_url: string
        +demo_url: string
        +featured: boolean
        +start_date: date
        +end_date: date
        +category: string
        +created_at: datetime
        +updated_at: datetime
    }
    
    class ProjectTranslation {
        +id: int
        +project_id: int
        +language_id: int
        +title: string
        +short_description: string
        +full_description: text
        +technologies: text
        +created_at: datetime
        +updated_at: datetime
    }
    
    class ProjectImage {
        +id: int
        +project_id: int
        +image_path: string
        +display_order: int
        +created_at: datetime
        +updated_at: datetime
    }
    
    class Article {
        +id: int
        +cover_image: string
        +published_date: date
        +status: string
        +created_at: datetime
        +updated_at: datetime
    }
    
    class ArticleTranslation {
        +id: int
        +article_id: int
        +language_id: int
        +title: string
        +slug: string
        +summary: text
        +content: text
        +meta_description: string
        +meta_keywords: string
        +created_at: datetime
        +updated_at: datetime
    }
    
    class Expertise {
        +id: int
        +icon: string
        +display_order: int
        +created_at: datetime
        +updated_at: datetime
    }
    
    class ExpertiseTranslation {
        +id: int
        +expertise_id: int
        +language_id: int
        +title: string
        +description: text
        +skills: text
        +created_at: datetime
        +updated_at: datetime
    }
    
    class Contact {
        +id: int
        +email: string
        +name: string
        +message: text
        +status: string
        +created_at: datetime
        +updated_at: datetime
    }
    
    Profile "1" -- "*" ProfileTranslation
    ProfileTranslation "*" -- "1" Language
    
    Project "1" -- "*" ProjectTranslation
    Project "1" -- "*" ProjectImage
    ProjectTranslation "*" -- "1" Language
    
    Article "1" -- "*" ArticleTranslation
    ArticleTranslation "*" -- "1" Language
    
    Expertise "1" -- "*" ExpertiseTranslation
    ExpertiseTranslation "*" -- "1" Language
```

## API Endpoints

### Authentication

- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `GET /api/auth/user` - Get current user
- `POST /api/auth/change-password` - Change password
- `POST /api/auth/register` - Register new user (admin only)

### Profile Management

- `GET /api/profile` - Get profile information
- `PUT /api/profile` - Update profile information
- `POST /api/profile/photo` - Upload profile photo
- `POST /api/profile/cv` - Upload CV

### Projects Management

- `GET /api/projects` - Get all projects
- `GET /api/projects/:id` - Get project by ID
- `POST /api/projects` - Create new project
- `PUT /api/projects/:id` - Update project
- `DELETE /api/projects/:id` - Delete project
- `POST /api/projects/:id/images` - Upload project image
- `DELETE /api/projects/:id/images/:imageId` - Delete project image
- `PUT /api/projects/:id/images/order` - Update project image order

### Articles Management

- `GET /api/articles` - Get all articles (with pagination)
- `GET /api/articles/:id` - Get article by ID
- `GET /api/articles/slug/:slug` - Get article by slug
- `POST /api/articles` - Create new article
- `PUT /api/articles/:id` - Update article
- `DELETE /api/articles/:id` - Delete article

### Expertise Management

- `GET /api/expertise` - Get all expertise
- `GET /api/expertise/:id` - Get expertise by ID
- `POST /api/expertise` - Create new expertise
- `PUT /api/expertise/:id` - Update expertise
- `DELETE /api/expertise/:id` - Delete expertise
- `PUT /api/expertise/order` - Update expertise display order

### Languages Management

- `GET /api/languages` - Get all languages
- `GET /api/languages/:id` - Get language by ID
- `POST /api/languages` - Create new language
- `PUT /api/languages/:id` - Update language
- `DELETE /api/languages/:id` - Delete language
- `PUT /api/languages/:id/set-default` - Set default language

### Contact Management

- `POST /api/contact` - Create contact message
- `GET /api/contact` - Get all contact messages (admin only)
- `PUT /api/contact/:id` - Update contact message status (admin only)
- `DELETE /api/contact/:id` - Delete contact message (admin only)

## Program call flow

### Authentication Flow

```mermaid
sequenceDiagram
    participant Client
    participant AuthController
    participant User
    participant JWT
    
    Client->>AuthController: POST /api/auth/login (username, password)
    AuthController->>User: findOne({where: {username}})
    User-->>AuthController: user
    alt User not found
        AuthController-->>Client: 401 Unauthorized
    else User found
        AuthController->>User: validatePassword(password)
        alt Invalid password
            AuthController-->>Client: 401 Unauthorized
        else Valid password
            AuthController->>JWT: generateToken(user)
            JWT-->>AuthController: token
            AuthController-->>Client: 200 OK (token, user)
        end
    end
    
    Client->>AuthController: GET /api/auth/user (token)
    AuthController->>JWT: verifyToken(token)
    alt Invalid token
        JWT-->>AuthController: error
        AuthController-->>Client: 401 Unauthorized
    else Valid token
        JWT-->>AuthController: decoded user ID
        AuthController->>User: findByPk(userId)
        User-->>AuthController: user
        AuthController-->>Client: 200 OK (user)
    end
    
    Client->>AuthController: POST /api/auth/logout
    AuthController-->>Client: 200 OK (clear cookies)
```

### Profile Management Flow

```mermaid
sequenceDiagram
    participant Client
    participant ProfileController
    participant Profile
    participant ProfileTranslation
    participant Language
    participant FileUploadService
    
    Client->>ProfileController: GET /api/profile?lang=en
    ProfileController->>Profile: findOne(include: [ProfileTranslation])
    Profile->>ProfileTranslation: getTranslations()
    ProfileTranslation->>Language: getLanguage()
    Language-->>ProfileTranslation: language
    ProfileTranslation-->>Profile: translations
    Profile-->>ProfileController: profile with translations
    ProfileController-->>Client: 200 OK (formatted profile)
    
    Client->>ProfileController: PUT /api/profile (translations)
    ProfileController->>Profile: findOne()
    Profile-->>ProfileController: profile
    loop For each translation
        ProfileController->>Language: findOne({where: {code}})
        Language-->>ProfileController: language
        ProfileController->>ProfileTranslation: update(translation data)
        ProfileTranslation-->>ProfileController: updated translation
    end
    ProfileController->>Profile: findOne(include: [ProfileTranslation])
    Profile-->>ProfileController: updated profile
    ProfileController-->>Client: 200 OK (formatted profile)
    
    Client->>ProfileController: POST /api/profile/photo (photo)
    ProfileController->>Profile: findOne()
    Profile-->>ProfileController: profile
    ProfileController->>FileUploadService: uploadFile(photo, 'profile')
    FileUploadService-->>ProfileController: photoPath
    alt old photo exists
        ProfileController->>FileUploadService: deleteFile(oldPhoto)
    end
    ProfileController->>Profile: update({photo: photoPath})
    Profile-->>ProfileController: updated profile
    ProfileController-->>Client: 200 OK (photo)
```

### Project Management Flow

```mermaid
sequenceDiagram
    participant Client
    participant ProjectsController
    participant Project
    participant ProjectTranslation
    participant ProjectImage
    participant Language
    participant FileUploadService
    
    Client->>ProjectsController: GET /api/projects?lang=en
    ProjectsController->>Project: findAll(include: [ProjectTranslation, ProjectImage])
    Project-->>ProjectsController: projects
    ProjectsController-->>Client: 200 OK (formatted projects)
    
    Client->>ProjectsController: POST /api/projects (project data)
    ProjectsController->>Project: create(project data)
    Project-->>ProjectsController: new project
    loop For each translation
        ProjectsController->>Language: findOne({where: {code}})
        Language-->>ProjectsController: language
        ProjectsController->>ProjectTranslation: create(translation data)
        ProjectTranslation-->>ProjectsController: created translation
    end
    ProjectsController->>Project: findByPk(id, include: [ProjectTranslation])
    Project-->>ProjectsController: created project
    ProjectsController-->>Client: 201 Created (formatted project)
    
    Client->>ProjectsController: POST /api/projects/:id/images (image)
    ProjectsController->>Project: findByPk(id)
    Project-->>ProjectsController: project
    ProjectsController->>FileUploadService: uploadFile(image, 'projects')
    FileUploadService-->>ProjectsController: imagePath
    ProjectsController->>ProjectImage: create({project_id, image_path})
    ProjectImage-->>ProjectsController: created image
    ProjectsController-->>Client: 201 Created (image)
```

### Article Management Flow

```mermaid
sequenceDiagram
    participant Client
    participant ArticlesController
    participant Article
    participant ArticleTranslation
    participant Language
    participant FileUploadService
    
    Client->>ArticlesController: GET /api/articles?lang=en&page=1&limit=10
    ArticlesController->>Article: findAll(include: [ArticleTranslation])
    Article-->>ArticlesController: articles
    ArticlesController-->>Client: 200 OK (formatted articles)
    
    Client->>ArticlesController: GET /api/articles/slug/:slug?lang=en
    ArticlesController->>Language: findOne({where: {code}})
    Language-->>ArticlesController: language
    ArticlesController->>ArticleTranslation: findOne({where: {slug, language_id}, include: [Article]})
    ArticleTranslation-->>ArticlesController: articleTranslation
    ArticlesController-->>Client: 200 OK (formatted article)
    
    Client->>ArticlesController: POST /api/articles (article data, cover_image)
    ArticlesController->>FileUploadService: uploadFile(cover_image, 'articles')
    FileUploadService-->>ArticlesController: coverImagePath
    ArticlesController->>Article: create({cover_image: coverImagePath})
    Article-->>ArticlesController: new article
    loop For each translation
        ArticlesController->>Language: findOne({where: {code}})
        Language-->>ArticlesController: language
        ArticlesController->>ArticleTranslation: create(translation data)
        ArticleTranslation-->>ArticlesController: created translation
    end
    ArticlesController-->>Client: 201 Created (formatted article)
```

### Language Management Flow

```mermaid
sequenceDiagram
    participant Client
    participant LanguageController
    participant Language
    
    Client->>LanguageController: GET /api/languages
    LanguageController->>Language: findAll()
    Language-->>LanguageController: languages
    LanguageController-->>Client: 200 OK (languages)
    
    Client->>LanguageController: POST /api/languages (code, name, is_default)
    alt is_default is true
        LanguageController->>Language: update({is_default: false}, {where: {is_default: true}})
    end
    LanguageController->>Language: create({code, name, is_default})
    Language-->>LanguageController: created language
    LanguageController-->>Client: 201 Created (language)
    
    Client->>LanguageController: PUT /api/languages/:id/set-default
    LanguageController->>Language: findByPk(id)
    Language-->>LanguageController: language
    LanguageController->>Language: update({is_default: false}, {where: {is_default: true}})
    LanguageController->>Language: update({is_default: true}, {where: {id}})
    Language-->>LanguageController: updated language
    LanguageController-->>Client: 200 OK (language)
```

### Expertise Management Flow

```mermaid
sequenceDiagram
    participant Client
    participant ExpertiseController
    participant Expertise
    participant ExpertiseTranslation
    participant Language
    
    Client->>ExpertiseController: GET /api/expertise?lang=en
    ExpertiseController->>Expertise: findAll(include: [ExpertiseTranslation])
    Expertise-->>ExpertiseController: expertise list
    ExpertiseController-->>Client: 200 OK (formatted expertise)
    
    Client->>ExpertiseController: POST /api/expertise (expertise data)
    ExpertiseController->>Expertise: create({icon, display_order})
    Expertise-->>ExpertiseController: created expertise
    loop For each translation
        ExpertiseController->>Language: findOne({where: {code}})
        Language-->>ExpertiseController: language
        ExpertiseController->>ExpertiseTranslation: create(translation data)
        ExpertiseTranslation-->>ExpertiseController: created translation
    end
    ExpertiseController-->>Client: 201 Created (formatted expertise)
    
    Client->>ExpertiseController: PUT /api/expertise/order (orderData)
    loop For each item
        ExpertiseController->>Expertise: update({display_order}, {where: {id}})
    end
    ExpertiseController->>Expertise: findAll(order: [['display_order', 'ASC']])
    Expertise-->>ExpertiseController: ordered expertise
    ExpertiseController-->>Client: 200 OK (ordered expertise)
```

## Security Considerations

1. **Authentication**
   - JWT tokens with appropriate expiration
   - HTTP-only cookies for refresh tokens
   - Password hashing with bcrypt

2. **Input Validation**
   - Validation of all user inputs
   - Sanitization of data before database operations

3. **File Uploads**
   - File type verification
   - Size limitations
   - Secure storage paths

4. **CORS Configuration**
   - Proper CORS settings to restrict unauthorized origins

5. **Error Handling**
   - Consistent error responses
   - Logging without exposing sensitive information

## Deployment Considerations

1. **Environment Variables**
   - Database credentials
   - JWT secret
   - CORS origins
   - Upload paths

2. **Database Migrations**
   - Initial schema creation
   - Seed data for initial setup

3. **File Storage**
   - Properly configured file permissions
   - Regular backups of uploaded files

## Anything UNCLEAR

1. **Backup Strategy**: The system should include a backup strategy for both database and uploaded files, but specific requirements for backup frequency and retention are not defined.

2. **Rate Limiting**: Implementation of rate limiting for API endpoints to prevent abuse is recommended but not explicitly defined in requirements.

3. **Analytics**: If usage analytics are required for the admin dashboard, we would need to implement appropriate tracking mechanisms.

4. **Multi-admin Support**: The current design allows for multiple admin users, but the requirements don't specify if there should be different admin roles or permissions.

5. **SEO Optimization**: While meta tags are included for articles, additional SEO features may be needed depending on specific requirements.