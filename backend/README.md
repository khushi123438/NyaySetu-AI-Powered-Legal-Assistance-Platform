# ⚖️ NyaySetu – Backend API

This repository contains the backend implementation of NyaySetu, a digital legal assistance platform that connects users and advocates through role-based dashboards and secure authentication.

The backend is responsible for authentication, role-based access control, document management, dashboard APIs, and chatbot integration.

---

## 🚀 Backend Responsibilities

- User & Advocate Authentication (Signup/Login)
- JWT-based Authorization
- Role-Based Access Control (User / Advocate)
- Dashboard APIs
- Document Upload & Management
- NyayMitra Chatbot API
- Secure Database Integration

---

## 🛠 Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT (Authentication)
- bcrypt (Password Hashing)

---

## 🔐 Authentication & Authorization

- Separate roles: `User` and `Advocate`
- JWT token generation on login
- Middleware for protected routes
- Role verification middleware for dashboard access

---

## 📂 Project Structure

server/
│
├── models/ # MongoDB Schemas (User, Advocate, Documents)
├── routes/ # API Routes
├── controllers/ # Business Logic
├── middleware/ # Authentication & Role Middleware
├── chatbot/ # NyayMitra Chatbot Logic
├── config/ # Database Configuration
└── server.js # Entry Point

---

## 🔌 API Endpoints

### 🔐 Authentication

| Method | Endpoint | Description |
|--------|----------|------------|
| POST   | /api/auth/register | Register user/advocate |
| POST   | /api/auth/login | Login and receive JWT |

---

### 👤 User Routes

| Method | Endpoint | Description |
|--------|----------|------------|
| GET    | /api/user/dashboard | Fetch user dashboard data |
| POST   | /api/documents/upload | Upload legal documents |

---

### 👨‍⚖️ Advocate Routes

| Method | Endpoint | Description |
|--------|----------|------------|
| GET    | /api/advocate/dashboard | Fetch advocate dashboard data |
| PUT    | /api/case/update | Update case status |

---

### 🤖 Chatbot Route

| Method | Endpoint | Description |
|--------|----------|------------|
| POST   | /api/chat | NyayMitra chatbot interaction |

---

## ⚙️ Setup Instructions

1. Clone the repository : 
https://github.com/khushi123438/NyaySetu-Backend.git

2. Install dependencies :
npm install

3. Create `.env` file : 
 PORT=5000 
 MONGO_URI=your_mongodb_connection_string
 JWT_SECRET=your_secret_key

4. Run the server :
npm start

---

## 🔒 Security Measures

- Password hashing using bcrypt
- JWT-based session management
- Protected routes with middleware
- Role-based access restriction
- Environment variable configuration

---

## 🎯 Contribution in Group Project

Backend development including:

- Database schema design
- API architecture
- Authentication system
- Role-based middleware implementation
- Chatbot backend integration
- Secure document handling

---

## 👩‍💻 Backend Developer

Khushi Pandey  
B.Tech CSE | Backend Developer (MERN Stack)


