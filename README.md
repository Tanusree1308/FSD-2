# QPaper Hub – Online Question Paper Portal

QPaper Hub is a full-stack web application that allows students to browse, search, preview, download, and save previous question papers. Administrators can manage question papers and monitor users through an admin dashboard.

## Features

### Student
- Register and log in to an account.
- Browse and search question papers.
- Filter papers by department, semester, year, subject, and exam type.
- Preview PDF question papers in the browser.
- Download question papers.
- Save papers for later revision.
- View profile details.

### Administrator
- Log in to the admin dashboard.
- Upload question papers in PDF format.
- Edit paper details and replace PDFs.
- Delete question papers.
- View uploaded papers and user information.
- View dashboard statistics.

## Tech Stack

**Frontend**
- React
- Vite
- JavaScript
- CSS

**Backend**
- Node.js
- Express.js
- REST API
- JWT authentication
- Helmet and CORS

**Database and Storage**
- SQLite
- Local file storage for uploaded PDFs

## Project Structure

```text
qpaper-hub/
├── backend/
│   ├── src/
│   │   ├── routes/
│   │   ├── middleware/
│   │   ├── db/
│   │   └── server.js
│   ├── data/
│   ├── uploads/
│   ├── .env
│   └── package.json
├── frontend/
│   ├── src/
│   ├── public/
│   ├── .env
│   └── package.json
├── .gitignore
└── README.md
```

## Prerequisites

- Node.js and npm
- Git
- A modern web browser

## Installation and Setup

### 1. Clone the repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
cd qpaper-hub
```

Replace `YOUR_GITHUB_REPOSITORY_URL` with your actual repository URL.

### 2. Configure the backend

```bash
cd backend
npm install
```

Create a `.env` file in the `backend` folder. Configure the required environment variables based on `.env.example`.

At minimum, set a secure `JWT_SECRET` value. Keep this secret private.

### 3. Start the backend

From the `backend` folder, run:

```bash
npm run dev
```

The backend should run at:

`http://localhost:8000`

Health check:

`http://localhost:8000/api/health`

### 4. Start the frontend

Open a second terminal:

```bash
cd ~/Downloads/qpaper-hub/frontend
npm install
npm run dev
```

Open the frontend URL shown in the terminal, usually:

`http://localhost:5173`

## Local Demo Credentials

**Administrator**
- Email: `admin@qpaperhub.local`
- Password: `Admin@12345`

**Student**
- Email: `student1@qpaperhub.local`
- Password: `Student@123`

These are intended only for local demonstration if the corresponding accounts exist in your database. Change demo passwords before using the application in a shared or production environment.

## API Overview

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/api/health` | Check backend status |
| POST | `/api/auth/login` | Authenticate a user |
| POST | `/api/auth/register` | Register a user |
| GET | `/api/papers` | Browse question papers |
| GET | `/api/papers/:id` | Retrieve paper details |
| GET | `/api/papers/:id/preview` | Preview a PDF |
| GET | `/api/papers/:id/download` | Download a PDF |
| POST | `/api/admin/papers` | Upload a question paper |

Some endpoints require authentication or administrator permissions.

## Security

- Passwords should be stored as secure hashes.
- Protected routes use authentication and role-based authorization.
- Uploaded files are subject to file type and size validation.
- Environment variables and secrets must not be committed to Git.
- Demo credentials should not be used for production.

## Future Enhancements

- Email verification and password recovery.
- Improved PDF preview experience.
- Advanced search and filtering.
- Deployment to a public hosting platform.
- Additional analytics and reporting.

## Author

Developed as a full-stack web development project.

## License

This project is intended for educational and demonstration purposes.
