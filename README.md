# MediChain — Smart Patient Health Record System

MediChain is a full-stack MERN medical record management system with a focus on security, data integrity, and emergency accessibility. It empowers patients to own their health data and share it securely with doctors using temporary access codes and QR codes.

## 🚀 Key Features
- **Secure Medical Timeline**: Chronological, color-coded health history.
- **Blockchain-lite Integrity**: SHA-256 hashing for every record to ensure data has not been tampered with.
- **QR Code Sharing**: Instant scan-and-view sharing for doctors.
- **Emergency Mode**: A public vital profile (Blood group, Allergies) accessible via an Emergency QR.
- **Role-based Access**: Dedicated dashboards for Patients and Doctors.
- **Security**: Hardened with Helmet.js and API Rate Limiting.

## 🛠️ Tech Stack
- **Frontend**: React.js, Tailwind CSS, Lucide Icons, Framer Motion
- **Backend**: Node.js, Express.js, JWT, Bcrypt
- **Database**: MongoDB (Mongoose)

## 📦 Installation & Setup

### 1. Clone the repository
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
JWT_SECRET=your_secret_key
PORT=5000
```

### 3. Frontend Setup
```bash
cd client
npm install
```

### 4. Running the Application
Open two terminals:
- **Terminal 1 (Backend)**: `cd server && node index.js`
- **Terminal 2 (Frontend)**: `cd client && npm start`

## 🛡️ Security Features
- **Password Hashing**: Bcrypt with salt rounds.
- **JWT Authentication**: Secure stateless sessions.
- **Record Hashing**: SHA-256 integrity checks.
- **Helmet**: Secure HTTP headers.
- **Rate Limiting**: Protection against brute-force attacks.

## 📄 License
This project is licensed under the MIT License.
