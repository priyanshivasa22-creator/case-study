# CourseHub - Student Course Registration System

A full-stack web application that allows students to register, log in, browse courses, and enroll in them online.

## Tech Stack

- **Frontend**: HTML5, CSS3, Vanilla JavaScript (DOM API, Fetch API)
- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens), bcryptjs
- **Version Control**: Git & GitHub
- **IDE**: VS Code

## Features

- Student Registration & Login with form validation
- JWT-based authentication
- Browse available courses
- Enroll / Unenroll from courses
- Dashboard with enrollment stats
- Responsive, modern dark-mode UI with glassmorphism design
- RESTful API with CRUD operations
- MongoDB data persistence

## Project Structure

```
course-registration/
├── backend/
│   ├── controllers/        # Business logic
│   ├── middleware/          # Auth middleware
│   ├── models/             # Mongoose schemas
│   ├── routes/             # Express routes
│   ├── seed.js             # Database seeder
│   ├── server.js           # Entry point
│   └── .env                # Environment variables
├── frontend/
│   ├── css/styles.css      # Global styles
│   ├── js/
│   │   ├── api.js          # Fetch API wrapper
│   │   └── app.js          # DOM helpers & validation
│   ├── index.html          # Landing page
│   ├── register.html       # Registration page
│   ├── login.html          # Login page
│   ├── dashboard.html      # Student dashboard
│   ├── courses.html        # Course catalog
│   └── enrollments.html    # My Enrollments
├── package.json
├── .gitignore
└── README.md
```

## Setup & Installation

1. **Clone the repository**
   ```bash
   git clone <your-github-url>
   cd course-registration
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment** - Create `backend/.env`:
   ```
   PORT=5000
   MONGO_URI=mongodb://127.0.0.1:27017/course_registration
   JWT_SECRET=your_secret_key
   ```

4. **Start MongoDB** (ensure it's running locally or update URI)

5. **Seed sample courses**
   ```bash
   node backend/seed.js
   ```

6. **Start the server**
   ```bash
   node backend/server.js
   ```

7. **Open the frontend** - Navigate to `frontend/index.html` in your browser, or access via `http://localhost:5000` if static serving is enabled.

## API Endpoints

| Method | Endpoint              | Description              | Auth |
|--------|-----------------------|--------------------------|------|
| POST   | /api/auth/register    | Register a new student   | No   |
| POST   | /api/auth/login       | Login                    | No   |
| GET    | /api/courses          | Get all courses          | No   |
| GET    | /api/courses/:id      | Get single course        | No   |
| POST   | /api/courses          | Create a course          | No   |
| DELETE | /api/courses/:id      | Delete a course          | No   |
| GET    | /api/enrollments      | Get my enrollments       | Yes  |
| POST   | /api/enrollments      | Enroll in a course       | Yes  |
| DELETE | /api/enrollments/:id  | Unenroll from a course   | Yes  |

## License

ISC
