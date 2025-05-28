# AI Researcher Portfolio Backend

This is the backend implementation for an AI Researcher Portfolio website. It provides RESTful APIs for managing multilingual content including projects, articles, expertise, profile information, and contact form submissions.

## Features

- **Multilingual Support**: APIs for managing content in multiple languages
- **User Authentication**: JWT-based secure authentication
- **Content Management**: APIs for projects, articles, expertise, and more
- **File Upload**: Support for image and document uploads
- **Contact Form**: Form submission handling and admin interface

## Prerequisites

- Node.js (v14+)
- MySQL (v5.7+)
- npm or yarn package manager

## Installation

1. Clone the repository or download the code
2. Navigate to the server directory:
   ```
   cd react_template/server
   ```
3. Install dependencies:
   ```
   npm install
   ```
   or
   ```
   yarn install
   ```
4. Create a `.env` file in the root directory with the following variables:
   ```
   DB_HOST=your_mysql_host
   DB_USER=your_mysql_user
   DB_PASSWORD=your_mysql_password
   DB_NAME=your_database_name
   JWT_SECRET=your_secret_key_for_jwt
   PORT=3000
   FRONTEND_URL=http://localhost:5173 (in development)
   ```

## Database Setup

1. Create a MySQL database with the name specified in your `.env` file
2. Run the migrations script to set up the database schema:
   ```
   npm run migrate
   ```
   or manually import the SQL schema:
   ```
   mysql -u your_user -p your_database_name < portfolio_db_schema.sql
   ```

## Running the Server

### Development Mode

```
npm run dev
```

This starts the server with nodemon for automatic reloading during development.

### Production Mode

```
npm start
```

## API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `GET /api/auth/user` - Get current user
- `POST /api/auth/logout` - User logout

### Profile
- `GET /api/profile` - Get researcher profile
- `PUT /api/profile` - Update profile
- `POST /api/profile/photo` - Upload profile photo
- `POST /api/profile/cv` - Upload CV

### Projects
- `GET /api/projects` - Get all projects
- `GET /api/projects/:id` - Get project by ID
- `POST /api/projects` - Create new project
- `PUT /api/projects/:id` - Update project
- `DELETE /api/projects/:id` - Delete project
- `POST /api/projects/:id/images` - Upload project image
- `DELETE /api/projects/:id/images/:imageId` - Delete project image

### Articles
- `GET /api/articles` - Get all articles
- `GET /api/articles/:id` - Get article by ID
- `GET /api/articles/slug/:slug` - Get article by slug
- `POST /api/articles` - Create new article
- `PUT /api/articles/:id` - Update article
- `DELETE /api/articles/:id` - Delete article

### Expertise
- `GET /api/expertise` - Get all expertise items
- `GET /api/expertise/:id` - Get expertise by ID
- `POST /api/expertise` - Create new expertise
- `PUT /api/expertise/:id` - Update expertise
- `DELETE /api/expertise/:id` - Delete expertise
- `PUT /api/expertise/order` - Update expertise display order

### Languages
- `GET /api/languages` - Get all languages
- `POST /api/languages` - Add new language
- `PUT /api/languages/:id` - Update language
- `DELETE /api/languages/:id` - Delete language
- `PUT /api/languages/:id/default` - Set default language

### Contact
- `POST /api/contact` - Submit contact form
- `GET /api/contact` - Get all contact submissions (admin)
- `GET /api/contact/:id` - Get contact by ID (admin)
- `PUT /api/contact/:id/status` - Update contact status (admin)
- `DELETE /api/contact/:id` - Delete contact (admin)

## Deployment

### Hosting Options

1. **Same server as frontend**:
   - Build the React frontend
   - Configure the Node.js server to serve the static files
   - Set up a process manager (PM2, systemd)

2. **Separate hosting**:
   - Deploy the backend on a service like Heroku, Railway.app, or a VPS
   - Configure CORS to allow requests from your frontend domain
   - Set environment variables for the production environment

### Example PM2 Configuration

Create a file named `ecosystem.config.js`:

```js
module.exports = {
  apps: [{
    name: "portfolio-backend",
    script: "server.js",
    env: {
      NODE_ENV: "production",
      DB_HOST: "your_production_db_host",
      DB_USER: "your_production_db_user",
      DB_PASSWORD: "your_production_db_password",
      DB_NAME: "your_production_db_name",
      JWT_SECRET: "your_production_jwt_secret",
      PORT: 3000,
      FRONTEND_URL: "https://your-frontend-domain.com"
    }
  }]
};
```

Then start the server with:
```
pm2 start ecosystem.config.js
```

## Security Considerations

- Use HTTPS in production
- Set appropriate CORS headers
- Validate and sanitize all user inputs
- Implement rate limiting for public endpoints
- Keep dependencies updated

## License

This project is proprietary and confidential. Unauthorized copying or distribution is prohibited.
