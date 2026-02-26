# 🚀 Manikant Software Solutions (Software Company Management Portal)

A full-stack role-based Company Management System built with React (Vite) and Node.js (Express). The system supports Admin, Employee, and Client roles with secure authentication, project assignment, internal messaging, and dashboard statistics.

```
Since frontend and backend are hosted on different domains (Netlify & Render), the authentication cookie is treated as a third-party cookie by modern browsers.

🍪 Third-Party Cookie Behavior
--> Some browsers block third-party cookies by default, especially:

- Safari (iOS & macOS)
- Brave (Strict mode)
- Firefox (Strict mode)
- Chrome Incognito mode
Because of this browser security rule:
--> Authentication may not work properly in Incognito mode
--> Login session may not persist in strict privacy browsers

⚠️ This is not a code issue.
It is a browser security policy related to cross-site cookies.
```

---

# 📌 Features

* Full UI Responsive

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

Email: admin@kant.com
Password: Admin@12

## 👨‍💻 Employee

Email: raucky@gmail.com
Password: raucky@12

## 👤 Client

Email: sohan@gmail.com
Password: sohan@12

---

# 📸 Screenshots

<img width="1366" height="596" alt="dashboard" src="https://github.com/user-attachments/assets/02e95337-be76-4805-a20d-2e8e0e9068c7" />
<img width="1366" height="595" alt="profile" src="https://github.com/user-attachments/assets/ea5023d2-d07d-4ded-87e3-b4278c63565d" />
<img width="1344" height="599" alt="projects" src="https://github.com/user-attachments/assets/cf84f5a9-e796-4969-a914-c60faada2817" />
<img width="1366" height="599" alt="chat" src="https://github.com/user-attachments/assets/10635879-dba5-4750-93ee-e7bf63b5f69f" />
<img width="1366" height="630" alt="login" src="https://github.com/user-attachments/assets/da670029-52dc-437e-bf24-8dc5194a3e54" />


etc.
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
