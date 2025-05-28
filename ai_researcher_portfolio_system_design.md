# AI Researcher Portfolio System Design

## Implementation approach

For the AI Researcher Portfolio system, we'll implement a complete web application with a clear separation between frontend and backend. The system will support multilingual content management, project showcasing, blog functionality, and an admin interface for content management.

### Key Technologies

#### Frontend
- **React**: For building a responsive, component-based UI
- **Tailwind CSS**: For efficient styling with utility classes
- **React Router**: For client-side routing
- **i18next**: For internationalization support
- **Axios**: For API communication

#### Backend
- **Node.js & Express**: Server-side JavaScript runtime and framework
- **MySQL**: Relational database with robust transaction support
- **Sequelize ORM**: For database interactions and model management
- **JSON Web Tokens (JWT)**: For secure authentication
- **Express-fileupload**: For handling document and image uploads
- **bcrypt**: For secure password hashing

### Architecture Overview

The system follows a standard three-tier architecture:
1. **Presentation Layer**: React-based frontend with responsive design
2. **Application Layer**: Express API for business logic and data processing
3. **Data Layer**: MySQL database with Sequelize ORM

### Key Features

- **Multilingual Support**: Full content translation support with language switching
- **Project Portfolio**: Showcase research projects with images and descriptions
- **Blog/Articles**: Academic article publishing with SEO optimization
- **Expertise Showcase**: Display research specialties and skills
- **Contact Form**: Direct communication channel with visitors
- **Admin Dashboard**: Secure interface for content management
- **Responsive Design**: Mobile-first approach for all device compatibility

## Data structures and interfaces

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
        +validatePassword(password: string): boolean
        +generateToken(): string
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

### Key API Interfaces

#### Authentication Service
```typescript
interface AuthService {
  login(username: string, password: string): Promise<{token: string, user: User}>
  logout(): void
  getCurrentUser(): Promise<User>
  changePassword(oldPassword: string, newPassword: string): Promise<boolean>
  register(username: string, email: string, password: string, role: string): Promise<User>
}
```

#### Profile Service
```typescript
interface ProfileService {
  getProfile(lang?: string): Promise<Profile>
  updateProfile(profileData: Partial<Profile>, translations: Record<string, ProfileTranslation>): Promise<Profile>
  uploadPhoto(file: File): Promise<string>
  uploadCV(file: File): Promise<string>
}
```

#### Projects Service
```typescript
interface ProjectsService {
  getAllProjects(lang?: string, options?: {featured?: boolean, category?: string}): Promise<Project[]>
  getProjectById(id: number, lang?: string): Promise<Project>
  createProject(projectData: Partial<Project>, translations: Record<string, ProjectTranslation>): Promise<Project>
  updateProject(id: number, projectData: Partial<Project>, translations: Record<string, ProjectTranslation>): Promise<Project>
  deleteProject(id: number): Promise<boolean>
  uploadImage(projectId: number, file: File): Promise<ProjectImage>
  deleteImage(projectId: number, imageId: number): Promise<boolean>
  updateImagesOrder(projectId: number, imageOrder: {id: number, display_order: number}[]): Promise<ProjectImage[]>
}
```

#### Articles Service
```typescript
interface ArticlesService {
  getAllArticles(lang?: string, page?: number, limit?: number): Promise<{articles: Article[], pagination: PaginationInfo}>
  getArticleById(id: number, lang?: string): Promise<Article>
  getArticleBySlug(slug: string, lang: string): Promise<Article>
  createArticle(articleData: Partial<Article>, translations: Record<string, ArticleTranslation>, coverImage?: File): Promise<Article>
  updateArticle(id: number, articleData: Partial<Article>, translations: Record<string, ArticleTranslation>, coverImage?: File): Promise<Article>
  deleteArticle(id: number): Promise<boolean>
}
```

#### Expertise Service
```typescript
interface ExpertiseService {
  getAllExpertise(lang?: string): Promise<Expertise[]>
  getExpertiseById(id: number, lang?: string): Promise<Expertise>
  createExpertise(expertiseData: Partial<Expertise>, translations: Record<string, ExpertiseTranslation>): Promise<Expertise>
  updateExpertise(id: number, expertiseData: Partial<Expertise>, translations: Record<string, ExpertiseTranslation>): Promise<Expertise>
  deleteExpertise(id: number): Promise<boolean>
  updateExpertiseOrder(orderData: {id: number, display_order: number}[]): Promise<Expertise[]>
}
```

#### Languages Service
```typescript
interface LanguagesService {
  getAllLanguages(): Promise<Language[]>
  getLanguageById(id: number): Promise<Language>
  createLanguage(code: string, name: string, isDefault?: boolean): Promise<Language>
  updateLanguage(id: number, data: Partial<Language>): Promise<Language>
  deleteLanguage(id: number): Promise<boolean>
  setDefaultLanguage(id: number): Promise<Language>
}
```

#### Contact Service
```typescript
interface ContactService {
  submitContactForm(name: string, email: string, message: string): Promise<Contact>
  getAllMessages(): Promise<Contact[]>
  updateMessageStatus(id: number, status: string): Promise<Contact>
  deleteMessage(id: number): Promise<boolean>
}
```

## Program call flow

### User Authentication Flow

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
```

### Project Management Flow

```mermaid
sequenceDiagram
    participant Client
    participant ProjectsController
    participant Project
    participant ProjectTranslation
    participant ProjectImage
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
```

### Articles Management Flow

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
    Article->>ArticlesController: count()
    Article-->>ArticlesController: total count
    Article-->>ArticlesController: articles
    ArticlesController-->>Client: 200 OK (formatted articles, pagination)
    
    Client->>ArticlesController: GET /api/articles/slug/:slug?lang=en
    ArticlesController->>Language: findOne({where: {code}})
    Language-->>ArticlesController: language
    ArticlesController->>ArticleTranslation: findOne({where: {slug, language_id}, include: [Article]})
    ArticleTranslation-->>ArticlesController: articleTranslation
    ArticlesController-->>Client: 200 OK (formatted article)
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
```

## Anything UNCLEAR

There are a few areas where additional clarification might be needed:

1. **Long-term content archival requirements**: Should old articles/projects be archived rather than deleted?

2. **Performance considerations**: If the portfolio grows large, we might need pagination for all list endpoints and database query optimization.

3. **Analytics integration**: The system doesn't currently have analytics tracking, which might be beneficial for understanding visitor engagement.

4. **Backup strategy**: A clear backup strategy should be defined for both database and uploaded files.

5. **SEO requirements**: Beyond meta tags, any specific SEO requirements (like sitemap generation or structured data) should be clarified.