# Waterlogs

A MERN-stack waterlogging reporting application that allows users to submit, view, and manage reports of waterlogged areas.

## Features:
- User registration and login with JWT authentication
- Submit waterlogging reports with images
- Add area and landmark information
- Classify waterlogging severity as Low, Moderate, or Severe
- Provide pedestrian and vehicle passability information
- View approved and resolved reports publicly
- View and track submitted reports through a personal dashboard
- Admin dashboard for reviewing and approving/rejecting reports
- Rejection reasons for rejected reports
- Image uploads using Cloudinary
- Responsive dark-themed interface


## Tech Stack:
**Frontend:-**
React + Vite, Tailwind CSS, React Router, JavaScript

**Backend:-**
Node.js, Express.js, MongoDB, Mongoose, JWT, bcrypt

**Services:-**
MongoDB Atlas, Cloudinary, Netlify, Render


## How to Use -

**Public Users:**

- Visitors can view the latest approved waterlogging reports without logging in.
- Each public report contains information such as:
  1) Location
  2) Waterlogging severity
  3) Pedestrian passability
  4) Vehicle passability
  5) Description
  6) Submitted date
  7) Images

**Registered Users:**

After creating an account and logging in, users can:

- Submit a waterlogging report.
- Add the affected area and a nearby landmark.
- Upload an image (optional).
- Specify the severity of waterlogging.
- Provide pedestrian and vehicle passability information.
- Track submitted reports from the My Reports dashboard.
- View the status of their reports.
Reports submitted by users are reviewed before becoming publicly visible.

**Admin**

Administrators can access the Admin Dashboard to:

- View pending reports
- Review submitted report information
- Approve reports
- Reject reports
- Provide a rejection reason

Approved reports become available in the public reports section.

## Environment Variables

Create a .env file in the backend directory using the variables shown in backend/.env.example.
The frontend requires a .env file containing:
VITE_BACKEND_URL=

The actual environment variable values are not included in this repository.

Running Locally
1. Clone the repository
git clone <your-github-repository-url>
cd Waterlogs

2. Install frontend dependencies
cd frontend
npm install

3. Install backend dependencies
cd ../backend
npm install

4. Configure environment variables
Create the required .env files using the provided .env.example files.

5. Start the backend
From the backend directory:
npm start

6. Start the frontend

From the frontend directory:
npm run dev

The application can then be accessed through the local development URL provided by Vite.


## Deployment

The frontend is designed to be deployed on Netlify and the backend on Render.
Environment variables must be configured separately in the deployment platforms.

## Project Purpose

Waterlogs was built as a full-stack portfolio project to practice building a real-world application using the MERN stack, including authentication, REST APIs, database operations, image uploads, role-based functionality, and deployment.

## License

This project is intended for portfolio and educational purposes.
