# 🚀 Team Task Management System

A full-stack **Role-Based Task Management System** built using:

- React.js
- Node.js
- Express.js
- PostgreSQL (Neon DB)
- JWT Authentication
- Tailwind CSS

This application allows Admins to manage projects, tasks, and team members while Members can view and update assigned tasks.

---

# 🌟 Features

## 🔐 Authentication
- User Registration
- Secure Login using JWT
- Admin Login & User Login
- Protected Routes

---

## 👨‍💼 Admin Features
- Create Projects
- Delete Projects
- Create Tasks
- Assign Tasks to Members
- View Registered Members
- Manage Tasks
- Role-Based Access

---

## 👨‍💻 Member Features
- Login as User
- View Assigned Tasks
- Update Task Status
- View Projects

---

## 📊 Dashboard
- Total Tasks
- Tasks by Status
- Overdue Tasks
- Tasks per User

---

# 🛠️ Tech Stack

## Frontend
- React.js
- React Router DOM
- Axios
- Tailwind CSS

## Backend
- Node.js
- Express.js
- JWT Authentication
- bcryptjs

## Database
- PostgreSQL
- Neon Database

## Deployment
- Railway (Backend)
- Vercel / Netlify (Frontend)

---

# 📂 Folder Structure

```bash
Task-Management-System/
│
├── client/
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   ├── pages/
│   │   └── App.jsx
│
├── server/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── routes/
│   │   └── server.js
│
└── README.md
```

---

# ⚙️ Environment Variables

## Backend `.env`

```env
PORT=5000

DATABASE_URL=your_postgresql_database_url

JWT_SECRET=your_jwt_secret
```

---

# 🚀 Installation & Setup

## 1️⃣ Clone Repository

```bash
git clone https://github.com/your-username/task-management-system.git
```

---

## 2️⃣ Backend Setup

```bash
cd server

npm install
```

Create `.env` file and add environment variables.

Run backend:

```bash
npm run dev
```

---

## 3️⃣ Frontend Setup

```bash
cd client

npm install
```

Run frontend:

```bash
npm run dev
```

---

# 🗄️ Database Tables

## Users

| Column | Type |
|--------|------|
| id | SERIAL |
| name | VARCHAR |
| email | VARCHAR |
| password | VARCHAR |
| role | VARCHAR |

---

## Projects

| Column | Type |
|--------|------|
| id | SERIAL |
| title | VARCHAR |
| description | TEXT |

---

## Tasks

| Column | Type |
|--------|------|
| id | SERIAL |
| title | VARCHAR |
| description | TEXT |
| priority | VARCHAR |
| status | VARCHAR |
| due_date | DATE |
| project_id | INTEGER |
| assigned_to | INTEGER |

---

# 🔐 Role-Based Access Control

## Admin
- Full access
- Can manage projects and tasks
- Can assign tasks
- Can view all members

## Member
- Limited access
- Can only view/update assigned tasks

---

# 🌐 Deployment

## Backend
Deploy on:
- Railway

## Frontend
Deploy on:
- Vercel
- Netlify

---

# 📸 Screenshots

_Add screenshots of your dashboard, projects page, tasks page, and login page here._

---

# 📌 Future Improvements
- File Uploads
- Notifications
- Real-time Updates
- Team Chat
- Activity Logs
- Drag & Drop Kanban Board

---

# 👨‍💻 Author

## Nikhil Shrivastava

- GitHub: https://github.com/your-github
- LinkedIn: https://linkedin.com/in/your-linkedin

---

# ⭐ If you like this project

Give this repository a ⭐ on GitHub!
