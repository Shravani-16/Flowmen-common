# Flowmen Backend API

This repository contains the refactored and rebuilt backend for the Flowmen application, designed to be clean, modern, secure, and scalable. It uses Node.js with Express and Mongoose, ready for deployment on platforms like Render, Railway, AWS, or Docker.

## Table of Contents
- [Features](#features)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
  - [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
  - [Authentication](#authentication)
  - [Soil Monitoring](#soil-monitoring)
  - [User Management](#user-management)
  - [OEE/PLC Data](#oeeplc-data)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

## Features
- **Soil Monitoring API**: Provides endpoints for managing soil data (moisture, temperature, pH, nitrogen, phosphorus, potassium).
- **User Authentication (JWT)**: Secure user registration, login, logout, and token refresh using JSON Web Tokens.
- **User Management**: Endpoints for managing user accounts, including roles and details.
- **OEE/PLC Data**: An isolated service module for handling Overall Equipment Effectiveness (OEE) and PLC data, integrating with external APIs like Golain.
- **Clean Architecture**: Separation of concerns with dedicated routes, controllers, services, and models.
- **Global Error Handling**: Centralized error management for consistent API responses.
- **Security**: Implemented with Helmet for various HTTP header protections and CORS.
- **Logging**: Comprehensive logging with Winston and Morgan for application, error, and request monitoring.
- **Docker Support**: Containerization with an optimized Dockerfile for easy deployment.

## Project Structure
```
src/
 ├── app.js
 ├── server.js
 ├── config/
 │    ├── env.js
 │    ├── db.js
 │    └── logger.js
 ├── routes/
 │    ├── auth.routes.js
 │    ├── soil.routes.js
 │    ├── user.routes.js
 │    └── oee.routes.js
 ├── controllers/
 │    ├── auth.controller.js
 │    ├── soil.controller.js
 │    ├── user.controller.js
 │    └── oee.controller.js
 ├── services/
 │    ├── soil.service.js
 │    ├── oee.service.js
 │    └── golain.service.js
 ├── models/
 │    ├── User.model.js
 │    ├── SoilData.model.js
 │    ├── Member.model.js
 │    └── FinalData.model.js
 ├── utils/
 │    ├── ApiError.js
 │    ├── ApiResponse.js
 │    ├── asyncHandler.js
 │    ├── constants.js
 │    └── sendResponse.js
 └── middlewares/
      ├── verifyJWT.js
      ├── error.middleware.js
      └── validateRequest.js

.env.example
Dockerfile
package.json
README.md
```

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (local or cloud-hosted)
- npm or yarn

### Installation
1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd Flowmen-common/BackEnd
   ```
2. Install dependencies:
   ```bash
   npm install
   ```

### Environment Variables
Create a `.env` file in the `BackEnd` directory based on `.env.example` and fill in the values:

```ini
PORT=8080
MONGODB_URI=your_mongodb_connection_string
CORS_ORIGIN=*

GOLAIN_API_KEY=YOUR_GOLAIN_API_KEY
GOLAIN_ORG_ID=YOUR_GOLAIN_ORG_ID

ACCESS_TOKEN_SECRET=your_access_token_secret
REFRESH_TOKEN_SECRET=your_refresh_token_secret
ACCESS_TOKEN_EXPIRY=7d
REFRESH_TOKEN_EXPIRY=30d
```

**Note**: For `CORS_ORIGIN` in production, replace `*` with your frontend application's URL (e.g., `https://your-frontend.com`).

### Running the Application

**Development Mode (with Nodemon)**:
```bash
npm run dev
```

**Production Mode**:
```bash
npm start
```

## API Endpoints

All API endpoints are prefixed with `/api/v1`.

### Authentication
- `POST /api/v1/auth/register` - Register a new user.
- `POST /api/v1/auth/login` - Log in a user and get tokens.
- `POST /api/v1/auth/logout` - Log out the current user (requires authentication).
- `POST /api/v1/auth/refresh-token` - Refresh access token using refresh token.
- `POST /api/v1/auth/change-password` - Change current user's password (requires authentication).
- `GET /api/v1/auth/current-user` - Get details of the current logged-in user (requires authentication).
- `PATCH /api/v1/auth/update-account` - Update current user's details (requires authentication).

### Soil Monitoring
- `GET /api/v1/soil/data?deviceId=<ID>` - Get soil data for a specific device (requires authentication).
- `POST /api/v1/soil/data` - Create new soil data entry (requires authentication).
  - Request Body: `{ deviceId, moisture, temperature, pH, nitrogen, phosphorus, potassium }`
- `GET /api/v1/soil/ideals` - Get ideal soil condition ranges (requires authentication).

### User Management
- `GET /api/v1/users` - Get all users (requires authentication, typically admin-only).
- `GET /api/v1/users/:id` - Get user by ID (requires authentication).
- `PATCH /api/v1/users/:id` - Update user role (requires authentication).
- `DELETE /api/v1/users/:id` - Delete user (requires authentication).

### OEE/PLC Data
- `GET /api/v1/oee/data?deviceId=<ID>&startDate=<DATE>&endDate=<DATE>` - Get OEE data for a device within a date range (requires authentication).
- `POST /api/v1/oee/data` - Create new OEE data entry (requires authentication).
  - Request Body: `{ deviceId, oee, availability, performance, quality }`
- `GET /api/v1/oee/summary?deviceId=<ID>&startDate=<DATE>&endDate=<DATE>` - Get OEE summary for a device within a date range (requires authentication).

## Deployment

The application can be deployed using Docker. A `Dockerfile` is provided in the root directory.

To build the Docker image:
```bash
docker build -t flowmen-backend .
```

To run the Docker container:
```bash
docker run -p 8080:8080 flowmen-backend
```

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License
ISC