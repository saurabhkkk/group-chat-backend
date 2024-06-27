# Group Chat Application

This is a simple group chat application built with Node.js, Express, JWT (JSON Web Token), and MongoDB. It provides web services to facilitate group chat functionality and manage user data.

## Features

- User authentication (login and logout)
- Admin user privileges
- User management (create and edit users)
- Group management (create, delete, search, and add members)
- Messaging within groups
- Like messages

## Prerequisites

Before running the application, ensure that you have the following installed:

- Node.js (version 12 or above)
- MongoDB

## Installation

1. Clone the repository: git clone https://github.com/your-username/group-chat-app.git
2.  Navigate to the project directory: cd group-chat-app
3.  Install the dependencies: npm install
4.  Create a `.env` file in the root directory and add the following line: JWT_SECRET=your_secret_key_here
5.  Start the MongoDB server.
6.  Run the application: npm start
7. The application will be running at `http://localhost:3000`.

## API Endpoints

### Authentication

- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout

### User Management (Admin Only)

- `POST /api/users` - Create a new user
- `PUT /api/users/:userId` - Update a user

### Group Management

- `POST /api/groups` - Create a new group
- `DELETE /api/groups/:groupId` - Delete a group
- `GET /api/groups/search` - Search for groups
- `POST /api/groups/:groupId/members` - Add members to a group

### Messaging

- `POST /api/groups/:groupId/messages` - Send a message in a group
- `POST /api/messages/:messageId/like` - Like a message

## Testing

The application includes a simple end-to-end (e2e) functional test suite to verify the functionality of the APIs. To run the tests:

1. Ensure that the application is running.
2. Run the following command: npm test
   The test results will be displayed in the console.

## Dependencies

The application uses the following dependencies:

- Express: Web framework for Node.js
- Mongoose: MongoDB object modeling for Node.js
- jsonwebtoken: JSON Web Token implementation for Node.js
- bcryptjs: Library for hashing passwords
- dotenv: Loads environment variables from a .env file

