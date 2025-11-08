# 🌍 BookIt – Experiences & Slots

**BookIt** is a full-stack web application that allows users to **explore travel experiences**, **check available slots**, and **book them seamlessly**.  
It’s designed to demonstrate **end-to-end full-stack development** skills with a clean UI, secure backend, and real-world workflows.

---

## 🚀 Features

- 🧭 **Browse Experiences:** View a wide range of travel and adventure experiences  
- ⏰ **Slot Booking:** Choose from available time slots for each experience  
- 👤 **User Authentication:** Secure signup/login with JWT  
- 💳 **Booking Management:** View and manage your bookings easily  
- 🎨 **Modern UI:** Built with Next.js and Tailwind CSS for a smooth user experience  
- 🧩 **API Integration:** Full CRUD operations via REST APIs  
- ☁️ **Backend Integration:** Node.js + Express + MongoDB

---

## 🛠️ Tech Stack

| Layer | Technologies |
|-------|---------------|
| **Frontend** | Next.js 15, TypeScript, Tailwind CSS |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB, Mongoose |
| **State Management** | Redux Toolkit |
| **Authentication** | JWT (JSON Web Token) |
| **Version Control** | Git & GitHub |

---
## 🧩 **Folder Structure**

```bash
BookIt/
│
├── backend/                          # 🧠 Backend logic and server-side code
│   ├── controllers/                  # Handles core business logic for each route
│   ├── models/                       # Mongoose schemas defining data structure
│   ├── routes/                       # Express route definitions and endpoints
│   ├── middlewares/                  # Authentication, error handling, etc.
│   ├── utils/                        # Helper utilities and configurations
│   ├── config/                       # Database connection and environment setup
│   ├── .env                          # Environment variables (excluded from Git)
│   ├── package.json                  # Backend dependencies and scripts
│   └── index.js                      # Main server entry point
│
├── frontend/                         # 🎨 Frontend user interface (Next.js)
│   ├── app/
│   │   ├── layout.tsx                # Root layout shared across pages
│   │   ├── page.tsx                  # Home page
│   │   ├── experiences/
│   │   │   └── [id]/page.tsx         # Dynamic route for experience details
│   ├── components/                   # Reusable UI components (Navbar, Cards, etc.)
│   ├── redux/                        # State management setup using Redux Toolkit
│   ├── styles/                       # Global and component-specific styles
│   ├── public/                       # Static assets (images, icons)
│   ├── package.json                  # Frontend dependencies and scripts
│   ├── tailwind.config.js            # Tailwind CSS configuration
│   └── next.config.js                # Next.js project configuration
│
├── .gitignore                        # Git ignore file
├── README.md                         # Project documentation
└── package.json                      # Root project info (if monorepo)
Navigate to the project folder

cd BookIt


Install dependencies

# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install


Set up environment variables
Create a .env file inside the backend folder and add:

MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret_key
PORT=5000


Run the application

# Run backend
cd backend
npm run dev

# Run frontend
cd ../frontend
npm run dev
