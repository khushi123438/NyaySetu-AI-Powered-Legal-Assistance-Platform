# ⚖️ NyaySetu: AI-Powered Legal Assistance Platform

NyaySetu is an AI-powered legal assistance platform that connects users with legal professionals and provides intelligent legal support through modern AI technologies. The platform simplifies access to legal services by enabling users to find advocates, resolve legal queries, analyze documents, generate legal documents, and stay updated with legal news.

Built with the MERN stack and integrated with Ollama AI, NyaySetu provides a secure, scalable, and user-friendly platform with role-based access control for users and advocates.

---

## 🚀 Key Features

### 👥 Role-Based Access Control (RBAC)
- Separate dashboards for Users and Advocates
- Secure role-based authorization
- Different functionalities based on user roles

### 🔐 Secure Authentication System
- User and Advocate registration/login
- JWT-based authentication
- Password encryption using bcrypt hashing
- Protected routes and secure access management

### ⚖️ Advocate Discovery Platform
- Users can search and explore advocates
- Find suitable legal professionals based on requirements
- Connect with advocates for legal consultation

### 🤖 AI Legal Assistant (Ollama)
- AI-powered chatbot for resolving legal queries
- Provides instant legal information and guidance
- Uses Ollama AI models for intelligent responses

### 📄 AI Legal Document Analysis
- Upload legal documents for AI analysis
- Extracts important information from complex legal documents
- Helps users understand legal content easily

### 📝 AI Legal Document Generator
- Generates legal documents using AI
- Helps create structured legal drafts
- Provides downloadable PDF documents

### 📰 Legal News Updates
- Provides latest legal news and updates
- Keeps users informed about important legal developments

### 📊 User & Advocate Dashboards
- Personalized dashboards for different roles
- Manage profiles and legal activities efficiently

---

## 🛠️ Tech Stack

### Frontend
- React.js
- Tailwind CSS
- JavaScript
- Axios
- Vite

### Backend
- Node.js
- Express.js
- MongoDB
- JWT Authentication
- bcrypt.js
- Multer

### Artificial Intelligence
- Ollama
- Qwen AI Model
- AI-based document processing

### Tools & Platforms
- Git & GitHub
- Postman
- VS Code

---

## 📂 Project Structure

```text
NyaySetu/
│
├── backend/
│ ├── controllers/
│ ├── models/
│ ├── routes/
│ ├── middlewares/
│ ├── utils/
│ ├── server.js
│
├── frontend/
│ ├── src/
│ ├── components/
│ ├── pages/
│ └── package.json
│
└── README.md
```

---

## ⚙️ Installation & Setup

### Clone Repository

```bash
git clone https://github.com/your-username/NyaySetu.git
cd NyaySetu
```

Backend Setup
```
cd backend
npm install
```

Create .env file:
```
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret_key
OLLAMA_URL=http://localhost:11434
MODEL=qwen2.5:3b
NEWS_API_KEY=your_api_key
```

Run backend:
```
npm start
Frontend Setup
cd frontend
npm install
npm run dev

```

## 👩‍💻 Author

Khushi Pandey

⭐ If you find this project useful, consider giving it a star!
