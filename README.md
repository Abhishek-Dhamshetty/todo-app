# Todo App

A full-stack Todo application where users can add, update, delete, and reorder tasks using drag-and-drop functionality. The app is built with React for the frontend, Node.js and Express for the backend, and MongoDB for data storage.

## Features

### Frontend
- **Task Management**: Users can add new tasks, mark them as completed, and delete tasks.
- **Drag-and-Drop Reordering**: Allows users to reorder tasks using React DnD.
- **Real-Time Updates**: Displays task submission time and duration to completion.
- **Responsive UI**: Designed with Tailwind CSS for a clean and modern interface.

### Backend
- **CRUD Operations**: Allows users to create, read, update, and delete tasks.
- **Task Timestamping**: Stores creation and completion timestamps.
- **Efficient Data Storage**: MongoDB is used to store tasks persistently.

## Technologies Used

### Frontend
- React.js
- React DnD (for drag-and-drop functionality)
- Framer Motion (for animations)
- Tailwind CSS (for styling)
- Axios (for API requests)

### Backend
- Node.js
- Express.js
- MongoDB (with Mongoose for schema management)

## Setup Instructions

### Prerequisites
- Install **Node.js** and **MongoDB** on your machine.
- Ensure MongoDB is running locally or set up a MongoDB Atlas database.

### Steps to Run Locally

#### 1. Clone the repository:
```sh
git clone https://github.com/Abhishek-Dhamshetty/todo-app.git
cd todo-app
```

#### 2. Install dependencies for both frontend and backend:
```sh
npm install
```

#### 3. Set up the backend:
- Create a `.env` file in the root directory and configure MongoDB settings:
```sh
MONGO_URI=mongodb://localhost:27017/todoapp
PORT=9000
```
- Start the backend server:
```sh
npm run server
```

#### 4. Start the frontend:
```sh
npm start
```

#### 5. Open the application in your browser:
```sh
http://localhost:3000
```

## API Endpoints

### Tasks
| Method | Endpoint        | Description            |
|--------|----------------|------------------------|
| GET    | `/tasks`       | Fetch all tasks       |
| POST   | `/tasks`       | Add a new task        |
| PUT    | `/tasks/:id`   | Update a task         |
| DELETE | `/tasks/:id`   | Delete a task         |

## Deployment
- **Frontend**: Can be deployed on Vercel or Netlify.
- **Backend**: Can be deployed on Render or Railway.
- **Database**: MongoDB Atlas (Free Tier) can be used for cloud storage.

## Future Enhancements
- Add user authentication to store personal task lists.
- Implement due dates and reminders for tasks.
- Enhance UI with additional animations and themes.

---
🚀 Happy Coding!

