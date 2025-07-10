# 🧩 ScriptGuru TaskBoard — Team Collaboration Tool

A lightweight **Trello/Asana-style** task board to help teams manage boards, tasks, and assignments.

Built as a **Full-Stack Web App** using:

- 🔷 **Frontend**: React.js + React Beautiful DnD  
- 🔶 **Backend**: Node.js, Express.js, MongoDB (Mongoose)
- 🎯 Designed to demonstrate: clean REST API, drag-and-drop UI, state management, and basic filtering/search.

---

## 📸 Screenshots

| Sidebar + Boards List | Task Columns + Drag & Drop |
|----------------------|-----------------------------|
| ![Sidebar](./screenshots/sidebar.png) | ![Board View](./screenshots/board-view.png) |

---

## 🧠 Features

### 🗂 Boards
- Create new boards (e.g. "Frontend", "Marketing")
- View all boards in the sidebar

### ✅ Tasks within Boards
- Each task includes:
  - `Title` (required)
  - `Description`
  - `Status`: To Do, In Progress, Done
  - `Priority`: Low, Medium, High
  - `Assigned To`
  - `Due Date`

### 🧾 Task Management
- Create, Edit, Delete tasks
- Drag-and-drop tasks between columns
- Filter by priority
- Search by title
- All tasks grouped by `Status` inside a board

---

## 🛠 Tech Stack

| Layer        | Technology                            |
|--------------|----------------------------------------|
| Frontend     | React.js, Axios, React Beautiful DnD   |
| Backend      | Node.js, Express.js, Mongoose          |
| Database     | MongoDB (Atlas)                        |
| Dev Tools    | Nodemon, Dotenv                        |
| Deployment   | Vercel (frontend), Render (backend)    |

---

## 🚀 Setup Instructions

### 📦 Backend (Express + MongoDB)

1. Go to backend folder

```bash
cd backend


Install dependencies....

npm install

Add .env file..
PORT=5000
MONGO_URI=your_mongodb_connection_string

Start backend server..
npm run dev
Server runs at: http://localhost:5000


Frontend (React.js)
Go to frontend folder

cd frontend
Install dependencies
npm install
Update axiosConfig.js if backend URL is remote

Start frontend..
npm startApp runs at: http://localhost:3000

Folder Structure
bash
Copy
Edit
scriptguru/
├── backend/
│   ├── models/
│   ├── routes/
│   ├── .env
│   └── app.js
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── App.js
│   │   └── axiosConfig.js
│   └── package.json
└── README.md

API Endpoints
Boards
GET /boards — List all boards

POST /boards — Create new board

GET /boards/:id/tasks — Get tasks of a board

POST /boards/:id/tasks — Add task to a board

Tasks
PUT /tasks/:id — Update task

DELETE /tasks/:id — Delete task

All API built using Mongoose with validations.



 Author
Ashfaq Ahmad

GitHub: [@Ahmad9540](https://github.com/Ahmad9540)

LinkedIn: [Ashfaq Ahmad](https://www.linkedin.com/in/ashfaq-ahmad-366345250/)

License
This project is open-source and available under the MIT License.





