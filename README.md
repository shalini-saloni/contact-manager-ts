# TypeScript Contact Manager API

A production-ready REST API for managing contacts, built with Node.js, Express, TypeScript, and MongoDB. It features strict Object-Oriented Programming (OOP) architecture, JWT authentication, and Zod validation.

## Features

- **OOP Architecture**: Clean separation of Controllers, Services, Repositories, and Routes.
- **Authentication**: Secure Signup/Login using JWT and bcrypt.
- **Validation**: Strict input validation using Zod DTOs.
- **Advanced CRUD**: 
  - Search by name/email
  - Filter by tags
  - Pagination
- **Security**: Helmet headers, typed interfaces.

## Tech Stack

- **Runtime**: Node.js
- **Language**: TypeScript
- **Framework**: Express.js
- **Database**: MongoDB (Mongoose)
- **Validation**: Zod
- **Auth**: JWT & Bcrypt

## Installation

1. **Clone the repo**
   ```bash
   git clone <your-repo-link>
   cd contact-manager-ts

2. **Install dependencies**

    ```Bash
    npm install
    ```

3. ***Configure Environment*** 
Create a .env file in the root directory:
    ```Bash
    PORT=3000
    MONGO_URI=mongodb://127.0.0.1:27017/contact_manager_ts
    JWT_SECRET=YourSuperSecretKey
    ```
3. **Run the server**

    ```Bash
    # Development Mode
    npm run dev

    # Build & Production Start
    npm run build
    npm start
    ```

## 📡 API Endpoints

### Authentication

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/api/auth/register` | Create a new user account |
| `POST` | `/api/auth/login` | Login and receive JWT Token |

### Contacts
*All contact routes require `Authorization: Bearer <token>` header.*

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/api/contacts` | Create a contact |
| `GET` | `/api/contacts` | Get all contacts (supports `?page=1&search=john`) |
| `PUT` | `/api/contacts/:id` | Update a contact |
| `DELETE` | `/api/contacts/:id` | Delete a contact |

## Project Structure

```text
src/
├── controllers/    # Route Logic (Req -> Service -> Res)
├── dtos/           # Data Transfer Object Validations (Zod)
├── middlewares/    # Auth & Error Handling
├── models/         # Mongoose Schemas
├── routes/         # Route Definitions
├── services/       # Business Logic
├── utils/          # Interfaces & Helpers
└── app.ts          # App Class Configuration