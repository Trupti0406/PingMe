# PingMe

PingMe is a real-time chat application built using the **MERN stack** with **Socket.IO** for real-time communication. It allows users to send text messages, images, and PDFs, with additional features like user authentication and activity status.

## Live Demo

[Click here to view the live demo](your_live_demo_link)

## Key Features

- User Authentication and Authorization (Login, Signup)
- Real-time Text Messaging
- Real-time Image Sharing
- Real-time PDF Sharing and Download
- User Online/Offline Status
- Logout Functionality
- Responsive Design
- Automatically fetches a profile picture based on gender selection

## Tech Stack

- **Frontend:** React, Redux, Axios, React Router, Tailwind CSS, Daisy UI
- **Backend:** Node.js, Express.js, MongoDB, JWT for authentication
- **Real-Time Communication:** Socket.IO
- **File Uploads:** Multer
- **State Management:** Redux, Redux Persist and React Context
- **Other Libraries:** react-hot-toast, date-fns

## Environment Setup

1. Clone the repository.
2. Create an `.env` file in the root directory of the backend:
   ```
   PORT=your_port
   MONGO_URI=your_mongo_uri
   JWT_SECRET=your_jwt_secret
   ```
3. Create another `.env` file in the frontend directory:
   ```
   REACT_APP_API_BASE_URL=http://localhost:8080/api
   REACT_APP_SOCKET_URL=http://localhost:8080
   ```

## Installation

1. Install the necessary dependencies for both frontend and backend:

   ```
   cd backend
   npm install
   cd ../frontend
   npm install
   ```

2. Start the backend and frontend servers:
   ```
   cd backend
   npm start
   cd ../frontend
   npm start
   ```

---

**Created by Trupti Yadav**
