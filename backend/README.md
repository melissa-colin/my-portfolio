# Backend Project Documentation

## Overview
This backend project is built using Node.js and Express. It provides an API for handling contact form submissions, saving the data to a MySQL database, and sending email notifications.

## Project Structure
```
backend
├── src
│   ├── controllers
│   │   └── contactController.js  # Handles contact form submissions
│   ├── routes
│   │   └── contactRoutes.js       # Defines routes for contact form
│   ├── db.js                      # Database connection setup
│   └── server.js                  # Entry point for the backend application
├── package.json                    # Backend project dependencies and scripts
└── README.md                       # Documentation for the backend project
```

## Installation
1. Clone the repository:
   ```
   git clone <repository-url>
   cd my-portfolio/backend
   ```

2. Install dependencies:
   ```
   npm install
   ```

## Running the Application
To start the backend server, run:
```
npm start
```
The server will be running on `http://localhost:5000` (or the port specified in your environment).

## API Endpoints
### POST /api/contact
- **Description**: Submits a contact form.
- **Request Body**:
  - `name`: String (required)
  - `email`: String (required)
  - `subject`: String (required)
  - `message`: String (required)

- **Response**:
  - `200 OK`: Message sent successfully.
  - `400 Bad Request`: Validation error.
  - `500 Internal Server Error`: Error processing the request.

## Database Configuration
Ensure to configure your database connection in `src/db.js` with the correct credentials.

## Deployment
Follow the instructions in the root `deploy.sh` script to deploy both the frontend and backend applications.

## License
This project is licensed under the MIT License.