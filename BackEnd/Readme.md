# Node.js SLTP_PIMMC microservice Developer's Readme

This repository contains a Node.js server built using Express.js framework along with packages like nodemon and dotenv. It includes folders for calculations, routes, and models.

## Installation

To set up the project, follow these steps.

1. Download the project folder from github and unzip it and open in vs code.

2. Install all necessary dependencies using npm:

```terminal
npm install express nodemon bcrypt jsonwebtoken
```

## Development Environment Setup

To start coding and running the server, follow these steps:

1. Make sure you have Visual Studio Code installed. If not, download and install it from [here](https://code.visualstudio.com/).

2. Open the project folder in Visual Studio Code:

3. Configure environment variables:
   - Create a `.env` file in the root directory.
   - Add necessary environment variables like database connection strings, API keys, etc., port and etc to this file.

## Starting the Server
  
To start the server in development mode, run:

```terminal
npm run start
```

This command utilizes nodemon to automatically restart the server whenever changes are made to the code.

## Project Structure

The project structure is as follows:

- **calculations**: Contains all calculation-related functionalities necessary for the frontend display.
- **routes**: Includes route definitions for handling different API endpoints.
- **models**: Contains data models for user authentication and other data manipulations.
   *eg.*: models.user contain field related to user authentication.

---

Feel free to reach out if you have any questions or need further assistance!