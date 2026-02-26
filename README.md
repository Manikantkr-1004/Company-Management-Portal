# 🚀 Manikant Software Solutions (Software Company Management Portal)

A full-stack role-based Company Management System built with React (Vite) and Node.js (Express). The system supports Admin, Employee, and Client roles with secure authentication, project assignment, internal messaging, and dashboard statistics.

---

# 📌 Features

## 🔐 Authentication & Authorization

* JWT-based authentication
* CSRF Token for Protection of APIs
* Role-based access control (Admin / Employee / Client)
* Protected routes (Frontend & Backend)

## 👑 Admin Functionalities

* Create & view client companies
* Create & manage employees(Remove too) and clients
* Create & manage services + Approve Service requests
* View all projects
* Assign/Unassign employees to projects
* Dashboard statistics overview
* Chat with Employees and Client (Not Real-Time)
* Edit Own Profile

## 👨‍💻 Employee Functionalities

* View assigned projects
* Update project status
* Chat with assigned clients and admin (Not Real-Time)
* View dashboard stats
* Edit Own Profile

## 👤 Client Functionalities

* View own projects
* View all services and Make service request
* Chat with assigned employees and admin (Not Real-Time)
* View dashboard stats
* Edit Own Profile

---

# 🛠 Tech Stack

## Frontend

* React (Vite)
* React Router DOM
* Axios
* Context API (Auth State)
* Tailwind CSS

## Backend

* Node.js
* Express.js
* MongoDB
* JWT Authentication
* bcrypt.js
* CSRF Token Protection

---

# ⚙️ Setup Instructions

## 1️⃣ Clone Repository

```bash
git clone https://github.com/Manikantkr-1004/Company-Management-Portal.git
cd project-folder
```

---

## 2️⃣ Backend Setup

```bash
cd Backend
npm install
```

### Create `.env` file inside Backend folder:

```
MONGODB_URI=
FRONTEND_URL=http://localhost:5173
ADMIN_EMAIL=
ADMIN_PASSWORD=
SALT_ROUND=
JWT_SECRET=
CSRF_SECRET=
COOKIE_SECRET=
NODE_ENV = development
```

### Run Backend

```bash
npm run dev
```

Server runs on:

```
http://localhost:8080
```

---

## 3️⃣ Frontend Setup

```bash
cd Frontend
npm install
```

### Create `.env` file inside Frontend Folder:

```
VITE_BACKEND_URL = http://localhost:8080
```

### Run Frontend

```bash
npm run dev
```

Frontend runs on:

```
http://localhost:5173
```

---

# 🗄 Database Setup

1. Install MongoDB locally OR use MongoDB Atlas
2. Create a new database
3. Copy connection string
4. Paste inside `.env` file as `MONGODB_URI`

---

# 🧪 Test Login Credentials

## 👑 Admin

Email: 
Password: 

## 👨‍💻 Employee

Email: 
Password: 

## 👤 Client

Email: 
Password: 

---

# 📸 Screenshots




---

# 🚀 Future Improvements (Optional)

* Real-time messaging using Socket.io
* Project file uploads
* Payment Info Management
* Pagination & filtering
* Any extra features

---

# 📌 Conclusion

This project demonstrates full-stack development with authentication, authorization, relational data modeling, role-based UI rendering, and secure API design. It follows clean architecture principles and realistic SaaS application flow.

---

**Developed By:** Manikant Kumar
