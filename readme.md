# Task Manager API

A simple, secure RESTful API for managing tasks, built with **Node.js** and **Express.js**. This API provides user authentication via JWT and supports operations like creating, updating, deleting, and retrieving tasks. Designed with best practices for clean and maintainable code.

---

## 🚀 Features

- **User Authentication**
  - Register new users.
  - Login to receive a JWT token for secure access.
  
- **Task Management**
  - CRUD operations for tasks.
  - Mark tasks as complete.

- **Security**
  - Protected endpoints using JWT authentication.

- **Validation**
  - Input validation for critical routes.

- **Error Handling**
  - Comprehensive error responses with meaningful HTTP status codes.

---

## 🛠️ Technology Stack

- **Backend Framework**: Express.js
- **Authentication**: JSON Web Tokens (JWT)
- **Testing**: Mocha, Chai, Supertest
- **Data Storage**: In-memory (for simplicity)

---

## 📦 Installation and Setup

### Prerequisites

- **Node.js** and **npm** installed on your machine.

### Steps to Run the API

1. Clone this repository:

   ```bash
   git clone https://github.com/your-repo/task-manager-api.git
   cd task-manager-api
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory and add the following:

   ```bash
   env
   JWT_SECRET=your-secret-key
   PORT=3000
   ```

4. Start the server:

   ```bash
   npm start
   ```

   The server will run on `http://localhost:3000`.

5. To run tests:

   ```bash
   npm test
   ```

---

## 📚 API Documentation

### Authentication Endpoints

| Method | Endpoint         | Description              | Authorization |
|--------|------------------|--------------------------|---------------|
| `POST` | `/auth/register` | Register a new user      | No            |
| `POST` | `/auth/login`    | Login to get a JWT token | No            |

### Task Endpoints

| Method | Endpoint               | Description                        | Authorization |
|--------|------------------------|------------------------------------|---------------|
| `GET`  | `/tasks`               | Retrieve all tasks                 | Yes           |
| `GET`  | `/tasks/:id`           | Retrieve a specific task by ID     | Yes           |
| `POST` | `/tasks`               | Create a new task                  | Yes           |
| `PUT`  | `/tasks/:id`           | Update an existing task            | Yes           |
| `DELETE` | `/tasks/:id`         | Delete a task                      | Yes           |
| `PATCH` | `/tasks/:id/complete` | Mark a task as complete            | Yes           |

---

## 📬 Postman Collection

### 1. **Register a User**

- **Endpoint:** `/auth/register`
- **Method:** `POST`
- **Request Body:**

  ```json
  {
    "username": "testuser",
    "password": "testpassword"
  }
  ```

- **Response:**

  ```json
  {
    "message": "User registered successfully"
  }
  ```

### 2. **Login**

- **Endpoint:** `/auth/login`
- **Method:** `POST`
- **Request Body:**

  ```json
  {
    "username": "testuser",
    "password": "testpassword"
  }
  ```

- **Response:**

  ```json
  {
    "token": "your-jwt-token"
  }
  ```

### 3. **Get All Tasks**

- **Endpoint:** `/tasks`
- **Method:** `GET`
- **Headers:**

  ```http
  Authorization: Bearer <your-jwt-token>
  ```

- **Response:**

  ```json
  []
  ```

### 4. **Create a Task**

- **Endpoint:** `/tasks`
- **Method:** `POST`
- **Headers:**

  ```http
  Authorization: Bearer <your-jwt-token>
  ```

- **Request Body:**

  ```json
  {
    "title": "Sample Task",
    "description": "This is a test task",
    "due_date": "2024-11-20"
  }
  ```

- **Response:**

  ```json
  {
    "message": "Task created successfully"
  }
  ```

### 5. **Mark Task as Complete**

- **Endpoint:** `/tasks/:id/complete`
- **Method:** `PATCH`
- **Headers:**

  ```http
  Authorization: Bearer <your-jwt-token>
  ```

- **Response:**

  ```json
  {
    "message": "Task marked as complete"
  }
  ```

---

## 🔧 Testing

This API includes automated tests for authentication and task management. To run the tests:

```bash
npm test
```

---

## ⚡ Future Enhancements

- Integration with a database (e.g., MongoDB or PostgreSQL).
- Role-based access control (RBAC).
- Pagination for retrieving tasks.

---

## 🤝 Contributing

Feel free to fork this project, submit issues, or create pull requests. Contributions are welcome! 😊

---
