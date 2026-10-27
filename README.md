# Examly – Online Exam & Quiz Portal

Examly is a web-based online examination and quiz portal designed to provide a convenient platform for conducting and attempting online tests. The project aims to simplify digital assessments through an organized interface for students and administrators.

## Live Demo

**Website:** https://online-exam-quiz-frontend.onrender.com

## Features

- User login interface
- Online exams and quizzes
- Student interface for accessing assessments
- Administrative interface for examination management
- Responsive web interface
- Backend API integration
- Deployment on Render

*Features depend on the functionality implemented in the current version of the application.*

## Tech Stack

- **Frontend:** React.js, Vite (assumed; verify against the project)
- **Backend:** Node.js and Express.js (assumed; verify against the project)
- **Database:** Configure according to the database used by the project
- **Version Control:** Git and GitHub
- **Deployment:** Render

## Prerequisites

Install the following before running the project locally:

- Node.js and npm
- Git
- Visual Studio Code or another code editor
- A web browser

Check that Node.js and npm are installed:

```bash
node -v
npm -v
```

## Getting Started

Follow these steps to download and run Examly on your computer.

### 1. Clone the Repository

Open a terminal and run:

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
```

Navigate into the cloned project:

```bash
cd YOUR_PROJECT_FOLDER
```

Replace `YOUR_GITHUB_REPOSITORY_URL` with your actual GitHub repository URL and `YOUR_PROJECT_FOLDER` with the repository's directory name.

### 2. Install Dependencies

If your repository contains separate `frontend` and `backend` folders, install their dependencies separately.

**Frontend:**

```bash
cd frontend
npm install
```

**Backend:**

Open a second terminal from the project root:

```bash
cd backend
npm install
```

If the project uses a different directory structure, run `npm install` in the directory containing the relevant `package.json`.

### 3. Configure Environment Variables

Check whether the project includes an `.env.example` file or environment variable instructions.

If required, create an `.env` file in the appropriate directory and configure the necessary values, such as:

- Backend port
- Database connection settings
- Frontend API base URL
- Authentication secrets

Use the variable names expected by your code. Do not commit real passwords, API keys, database credentials, or authentication secrets to GitHub.

### 4. Start the Backend

In the backend terminal, run:

```bash
npm run dev
```

If the project does not define a `dev` script, check `backend/package.json` for the correct start command.

The backend should start on its configured local port. Check the terminal output for the actual URL.

### 5. Start the Frontend

Open another terminal and run:

```bash
cd frontend
npm run dev
```

Vite typically displays a local development URL such as:

```text
http://localhost:5173
```

Open the URL shown in your terminal to access the application.

### 6. Access Examly

Once the frontend and backend are running:

1. Open the local frontend URL in your browser.
2. Use the login page to access the application.
3. Ensure the frontend API URL points to your running backend.
4. Use valid credentials available in your configured database.

**Note:** Login credentials and registration options depend on the authentication system implemented in the project. No default credentials are provided here because they have not been verified.

## Project Structure

The following is an example structure. Update it to match the actual files in your repository.

```text
Examly/
├── frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── vite.config.js
├── backend/
│   ├── src/
│   ├── package.json
│   └── .env.example
├── .gitignore
└── README.md
```

## Deployment

Examly's frontend is available on Render:

https://online-exam-quiz-frontend.onrender.com

To deploy the complete application, configure the frontend and backend services, environment variables, API URL, and database according to the deployment requirements of the project.

For a separate backend deployment, make sure the frontend sends API requests to the deployed backend URL instead of `localhost`.

## Troubleshooting

**Frontend does not start**
- Check that Node.js and npm are installed.
- Run `npm install` in the frontend directory.
- Check the terminal for missing dependencies or script errors.

**Backend does not start**
- Run `npm install` in the backend directory.
- Check the scripts in `package.json`.
- Verify the required environment variables and database configuration.

**Login does not work**
- Confirm that the backend is running.
- Verify the frontend API URL.
- Check the browser's developer console and the backend logs.
- Confirm that the supplied account exists in the configured database.

**Application works locally but not after deployment**
- Verify the Render service configuration.
- Check the deployed backend URL and environment variables.
- Review the deployment logs for errors.

## Future Enhancements

- User self-registration
- Timed examinations
- Automatic evaluation and score calculation
- Examination history and performance reports
- Question bank management
- Enhanced role-based access control

## Author

Developed as a web development project.

---

**Examly – Making Online Assessments Simple.**
