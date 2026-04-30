# 🏥 MediChain — Smart Patient Health Record System

> **Empowering patients to own, manage, and securely share their complete health history.**

[![Live Demo](https://img.shields.io/badge/🚀_Live_Demo-Render-46E3B7?style=for-the-badge)](https://mern-stack-minipr.onrender.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)

---

## 🌐 Live Demo

### 👉 [https://mern-stack-minipr.onrender.com/](https://mern-stack-minipr.onrender.com/)

> ⚠️ Hosted on Render free tier — the server may take **30–60 seconds to wake up** on first visit. Please be patient!

---

## 📖 About MediChain

MediChain is a full-stack **MERN** web application that solves a critical real-world problem in healthcare — the fragmented and insecure management of patient medical records.

Today, patients carry physical reports, lose prescriptions, and doctors at new hospitals have no access to prior medical history. In emergencies, critical information like blood group and allergies is completely inaccessible.

**MediChain fixes this** by giving patients a secure digital platform to store their complete health history and share it with doctors instantly — without any paperwork.

---

## 🚀 Key Features

### 🗂️ Secure Medical Timeline
Chronological, color-coded health history. Every visit, prescription, diagnosis, and report — stored permanently and beautifully organized.

| Record Type | Color |
|---|---|
| General Checkup | 🔵 Blue |
| Emergency | 🔴 Red |
| Surgery | 🟠 Orange |
| Lab Report | 🟣 Purple |
| Vaccination | 🟢 Green |

### 🔑 Temporary Access Code System
Patients generate a **6-digit access code** that expires in 24 hours. Doctors enter the code to view records in read-only mode — no permanent access granted.

### 📱 QR Code Sharing
Patients can display a **QR code** that doctors scan to instantly access records — no typing required.

### 🚨 Emergency Mode
A **public Emergency Profile** (Blood Group, Allergies, Emergency Contact) accessible via a QR code scan — no login needed. Critical for unconscious or incapacitated patients.

### 🔐 Role-Based Access Control
Dedicated dashboards for **Patients** and **Doctors** with fully protected routes. Each role sees only what they are authorized to access.

### 🛡️ Enterprise-Grade Security
Hardened with industry-standard security practices — far beyond basic requirements.

---

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| React.js | Component-based UI library |
| React Router | Client-side page routing |
| Axios | HTTP API calls |
| Tailwind CSS | Utility-first styling |
| Framer Motion | Animations and transitions |
| Lucide Icons | Icon library |

### Backend
| Technology | Purpose |
|---|---|
| Node.js | JavaScript runtime environment |
| Express.js | REST API framework |
| JSON Web Token (JWT) | Stateless authentication |
| Bcrypt.js | Password hashing |
| Helmet.js | Secure HTTP headers |
| Express Rate Limit | Brute-force protection |

### Database
| Technology | Purpose |
|---|---|
| MongoDB | NoSQL document database |
| Mongoose | ODM for schema modeling |

### Security
| Technology | Purpose |
|---|---|
| SHA-256 (Node crypto) | Record integrity hashing |

---

## 🛡️ Security Features

### 🔒 Password Hashing (Bcrypt)
All passwords are hashed with bcrypt (salt rounds: 10) before storage. Raw passwords are never stored.

### 🎫 JWT Authentication
Stateless session management using JSON Web Tokens. Every protected API request is verified via middleware.

### #️⃣ SHA-256 Record Integrity (Blockchain-lite)
Every medical record is cryptographically hashed using SHA-256 on creation. Any future tampering with the record will produce a mismatched hash — **making data manipulation detectable**. Inspired by blockchain data integrity principles.

### 🪖 Helmet.js
Automatically sets 14 security-related HTTP headers, protecting against XSS, clickjacking, and MIME-type sniffing.

### 🚦 API Rate Limiting
Limits the number of requests per IP address within a time window — protecting against brute-force attacks on authentication endpoints.

### ⏳ Access Code Expiry
All access codes have a hard 24-hour expiry enforced at the database level. Expired codes are automatically rejected.

---

## 📦 Installation & Setup

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (local or MongoDB Atlas)
- npm

### 1. Clone the Repository

```bash
git clone https://github.com/shaibanfarazkhan/Smart-Patient-Health-Record-System.git
cd Smart-Patient-Health-Record-System
```

### 2. Backend Setup

```bash
cd server
npm install
```

Create a `.env` file in the `server` directory:

```env
MONGO_URI=mongodb://localhost:27017/medichain
JWT_SECRET=your_secret_key_here
PORT=5000
```

### 3. Frontend Setup

```bash
cd client
npm install
```

### 4. Run the Application

Open **two terminals** simultaneously:

```bash
# Terminal 1 — Backend
cd server && node index.js
```

```bash
# Terminal 2 — Frontend
cd client && npm start
```

The app will be available at **http://localhost:3000**

---

## 🌍 Deployment

MediChain is deployed on **Render** (full-stack cloud platform):

- **Live URL:** [https://mern-stack-minipr.onrender.com/](https://mern-stack-minipr.onrender.com/)
- **Backend:** Node.js + Express server hosted on Render Web Service
- **Frontend:** React app served via the Express backend in production
- **Database:** MongoDB Atlas (cloud-hosted)

### Environment Variables on Render
```env
MONGO_URI=<your_mongodb_atlas_connection_string>
JWT_SECRET=<your_production_secret_key>
PORT=5000
```

---

## 📁 Project Structure

```
Smart-Patient-Health-Record-System/
├── client/                   # React Frontend
│   ├── src/
│   │   ├── components/       # Reusable UI components
│   │   ├── pages/            # Page components
│   │   │   ├── LandingPage.jsx
│   │   │   ├── AuthPage.jsx
│   │   │   ├── PatientDashboard.jsx
│   │   │   ├── AddRecordPage.jsx
│   │   │   └── DoctorDashboard.jsx
│   │   └── App.js
│   └── package.json
│
└── server/                   # Node.js + Express Backend
    ├── models/
    │   ├── User.js           # User schema (Patient & Doctor)
    │   ├── MedicalRecord.js  # Medical record schema
    │   └── AccessCode.js     # Access code schema
    ├── routes/
    │   ├── auth.js           # Register & Login
    │   ├── records.js        # CRUD for medical records
    │   └── access.js         # Access code generate & verify
    ├── middleware/
    │   └── auth.js           # JWT verification middleware
    ├── index.js              # Express server entry point
    └── package.json
```

---

## 🔗 API Endpoints

| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| POST | `/api/auth/register` | Register Patient or Doctor | ❌ |
| POST | `/api/auth/login` | Login and receive JWT | ❌ |
| GET | `/api/records` | Get all records for patient | ✅ |
| POST | `/api/records` | Add new medical record | ✅ |
| DELETE | `/api/records/:id` | Delete a record | ✅ |
| POST | `/api/access/generate` | Generate 6-digit access code | ✅ |
| POST | `/api/access/verify` | Verify code & fetch records | ✅ |
| GET | `/api/emergency/:patientId` | Get public emergency profile | ❌ |
| PUT | `/api/patient/emergency` | Update emergency profile | ✅ |

---

## 🎓 Academic Context

This project was developed as a **Course Project** for:

> **BIS601 — Full Stack Development**
> Department of Information Science Engineering | Semester 6

**Syllabus Coverage:**

| Module | Topic | Implementation |
|---|---|---|
| Module 1 | JavaScript Basics | Components, route handlers |
| Module 2 | DOM & Events | React virtual DOM, event listeners |
| Module 3 | React & MERN Intro | Functional components, routing |
| Module 4 | React State & Express API | useState, useEffect, REST API |
| Module 5 | MongoDB & Modularization | Mongoose CRUD, modular routes |

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

---

<div align="center">

**Made with ❤️ using the MERN Stack**

[🚀 View Live Demo](https://mern-stack-minipr.onrender.com/)

</div>
