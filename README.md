# Online Exam & Quiz Portal

A full-stack starter project using React + Vite + Tailwind CSS, Express, MongoDB/Mongoose, JWT, and bcrypt.

## Requirements
- Node.js 20+ (LTS recommended) and npm
- MongoDB Community Server running locally OR a MongoDB Atlas connection string

## Setup
1. Open this folder in VS Code.
2. Install root and app dependencies:
   ```bash
   npm install
   npm run install:all
   ```
3. Configure `backend/.env` (copy `.env.example` to `.env`) and set `MONGODB_URI` and a long random `JWT_SECRET`.
4. Start MongoDB locally if using `mongodb://127.0.0.1:27017/online_exam_portal`.
5. Seed a demo admin account:
   ```bash
   cd backend
   npm run seed
   ```
   Demo admin: `admin@example.com` / `Admin123!` (change this immediately; do not use demo credentials in deployment).
6. From project root, run both apps:
   ```bash
   npm run dev
   ```
7. Open http://localhost:5173

Backend API: http://localhost:5000/api
Health check: http://localhost:5000/api/health

## Available API routes
- POST `/api/auth/register`
- POST `/api/auth/login`
- GET `/api/auth/me` (JWT required)
- GET `/api/exams` (published exams for students; admins see all)
- GET `/api/exams/:id` (answers are never returned)
- POST `/api/exams` (admin)
- PATCH `/api/exams/:id/publish` (admin)
- POST `/api/attempts/:examId/submit` (JWT required; server calculates score)
- GET `/api/attempts/mine` (JWT required)

## Notes
- The UI is a working starter, not a proctoring system. It does not include webcam monitoring or plagiarism detection.
- Do not expose answer keys in student API responses. This project strips them from exam reads and scores submissions on the server.
- For deployment, set environment variables in the hosting provider and use MongoDB Atlas. Configure CORS for your deployed frontend origin.


## Computer Science subject bank

The seed script adds published starter quizzes for 18 Computer Science subjects: C, C++, Java, Python, Data Structures & Algorithms, DBMS & SQL, Operating Systems, Computer Networks, Software Engineering, Computer Organization, Theory of Computation, Compiler Design, Web Development, Artificial Intelligence & Machine Learning, Cybersecurity, Cloud Computing, Data Science, and Computer Science Mathematics. Each starter quiz has three sample multiple-choice questions. Run `cd backend && npm run seed` after configuring `backend/.env` to add them to MongoDB. The Explore Exams page includes subject filters, and administrators can select a subject when creating a new exam.
