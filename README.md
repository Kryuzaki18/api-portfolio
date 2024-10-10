
# API Portfolio

Welcome to the **API Portfolio** repository! This project is a collection of API examples built using Node.js, Express, MongoDB (with Mongoose), and various third-party services to showcase API development skills.

## Table of Contents

- [Project Description](#project-description)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
- [API Documentation](#api-documentation)
- [Error Handling and Logging](#error-handling-and-logging)
- [Environment Variables](#environment-variables)
- [Contributing](#contributing)
- [License](#license)

## Project Description

This portfolio is designed to demonstrate how to develop RESTful APIs with proper structure, authentication, error handling, logging, and integration with external services like MongoDB Atlas. It can serve as a reference for Node.js developers to build scalable and well-organized back-end applications.

## Features

- **User Authentication**: JWT-based user authentication and authorization.
- **CRUD Operations**: Implemented with Mongoose for MongoDB.
- **Input Validation**: Using libraries like `Joi` for request validation.
- **Error Handling**: Centralized error handling to ensure consistent API responses.
- **Logging**: Winston logging for tracking errors and events.
- **Security**: Implemented security best practices (Helmet, CORS, rate-limiting).
- **Environment-Based Configurations**: Custom settings for development and production environments.

## Technologies Used

- **Node.js**: JavaScript runtime for building the API.
- **Express**: Web framework for routing and handling requests.
- **MongoDB Atlas**: Cloud-hosted NoSQL database.
- **Mongoose**: ODM (Object Data Modeling) library for MongoDB.
- **JWT (JSON Web Tokens)**: For authentication and authorization.
- **Winston**: Logging library.
- **Joi**: Schema description and validation library.
- **dotenv**: For environment variable management.

## Getting Started

To get a local copy up and running, follow these steps:

### Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/)
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- [Git](https://git-scm.com/)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Kryuzaki18/api-portfolio.git
   cd api-portfolio
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up your environment variables:
   - Create a `.env` file in the root of the project and add your MongoDB connection string and JWT secret:

     ```bash
     MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/<dbname>?retryWrites=true&w=majority
     JWT_SECRET=your_jwt_secret
     PORT=3000
     ```

4. Start the server:
   ```bash
   npm start
   ```

5. The API should now be running on `http://localhost:3000`.

## API Documentation

### Endpoints

1. **User Authentication**:
   - **POST** `/api/users/register`: Register a new user.
   - **POST** `/api/users/login`: Authenticate and get a JWT token.

2. **CRUD Operations**:
   - **GET** `/api/resources`: Get all resources.
   - **POST** `/api/resources`: Create a new resource.
   - **GET** `/api/resources/:id`: Get a resource by ID.
   - **PUT** `/api/resources/:id`: Update a resource by ID.
   - **DELETE** `/api/resources/:id`: Delete a resource by ID.

### Example Request

```bash
curl -X POST http://localhost:3000/api/users/login -H "Content-Type: application/json" -d '{"email": "test@example.com", "password": "password123"}'
```

## Error Handling and Logging

This project uses **Winston** for logging and has a centralized error handler for catching exceptions across the API. All errors are returned in a consistent format to the client.

Example of an error response:

```json
{
  "error": {
    "message": "Resource not found",
    "status": 404
  }
}
```

## Environment Variables

The application uses environment variables to configure sensitive settings. Here's what you'll need:

- `MONGO_URI`: MongoDB Atlas connection string.
- `JWT_SECRET`: Secret key for signing JWTs.
- `PORT`: The port where the server will run.

These variables should be stored in a `.env` file in your project's root directory (this file is excluded from version control in `.gitignore`).

## Contributing

Contributions are welcome! Please open an issue or submit a pull request with your improvements or bug fixes.

### Steps to Contribute:

1. Fork the repository.
2. Create a feature branch (`git checkout -b feature/your-feature`).
3. Commit your changes (`git commit -m 'Add new feature'`).
4. Push to the branch (`git push origin feature/your-feature`).
5. Open a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for more details.
