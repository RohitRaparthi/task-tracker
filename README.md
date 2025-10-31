# 📝 Task Tracker

A simple full-stack **Task Tracker** web application built with  
**React (frontend)** and **Node.js + Express + SQLite3 (backend)**.  
It lets users add, update, and view tasks with priority, status, and due date tracking.

---

## 📁 Project Structure

```
task-tracker/
├── backend/
│ ├── server.js
│ ├── package.json
│ ├── src/
│ │ ├── db/
│ │ │ └── database.js
│ │ ├── routes/
│ │ │ └── tasks.router.js
│ │ └── services/
│ │ ├── task.service.js
│ │ └── insight.service.js
│ └── task_tracker.db
├── frontend/
│ ├── package.json
│ ├── public/
│ │ └── index.html
│ └── src/
│    ├── App.js
│    ├── components/
│    │ ├── TaskForm/
│    │ │   ├─TaskForm.css
│    │ │   └─TaskForm.js
│    │ ├── TaskList/
│    │ │   ├─TaskList.css
│    │ │   └─TaskList.js
│    │ └── InsightsPanel/
│    │     ├─InsightsPanel.css
│    │     └─InsightsPanel.js
│    └── App.css
├── README.md
└── DECLARATION.md
```

---

## ⚙️ Features

✅ Add new tasks with title, description, due date, and priority  
✅ View all tasks in a clean, simple list  
✅ Update task status (Pending → In Progress → Done)  
✅ Change priority instantly  
✅ See insights on task progress (completed vs pending)  
✅ Simple CSS-based UI (no Bootstrap or Tailwind)

---

## 🖥️ Tech Stack

**Frontend:**  
- React.js 

**Backend:**  
- Node.js  
- Express  
- SQLite3 (lightweight local database) 

---

## 🚀 Setup Instructions

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/RohitRaparthi/task-tracker.git
cd task-tracker
```

### 2️⃣ Setup Backend
```bash
cd backend
npm install
```

Run the backend server:

```bash
node server.js
```

By default, it runs on:
👉 http://localhost:5000

### 3️⃣ Setup Frontend

Open a new terminal:
```bash
cd frontend
npm install
npm start
```

Frontend runs on:
👉 http://localhost:3000

### 4️⃣ Database

The SQLite3 database file is automatically created as
backend/task_tracker.db when you first run the backend.

To inspect data:
```bash
sqlite3 backend/task_tracker.db
```

Inside the SQLite shell, you can check tasks:

```bash
SELECT * FROM tasks;
```

---
## 📊 API Endpoints

| Method | Endpoint           | Description          |
|--------|--------------------|----------------------|
| GET    | `/tasks`           | Get all tasks        |
| POST   | `/tasks`           | Add a new task       |
| PATCH  | `/tasks/:id`       | Update a task        |
| GET    | `/tasks/insights`  | Get task insights    |

---

## 🎨 UI Overview

- **TaskForm** → Add new tasks  
- **TaskList** → View, mark as done/in progress, and change priority  
- **InsightsPanel** → See count of total, completed, and pending tasks  

All UI is built using **simple CSS only**, keeping it lightweight and beginner-friendly.

---

## 🧩 Future Improvements

- Add search and filter options  
- Add user authentication  
- Export tasks as CSV or PDF  
- Add dark/light theme toggle  

---

## 👨‍💻 Author

**Rohit Raparthi**  
📧 [rohit.raparthi2003@gmail.com](mailto:rohit.raparthi2003@gmail.com)  
💼 [LinkedIn](https://www.linkedin.com/in/rohit-raparthi/) / [GitHub](https://github.com/RohitRaparthi/)
