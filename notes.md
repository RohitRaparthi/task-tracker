# 🧱 Task Tracker — Design Notes

This document explains the **design choices**, **database schema**, and **logic flow** used in the Task Tracker project.  
It also includes **ideas for future enhancements** and rationale behind the current implementation.

---

## 🗃️ Database Design (SQLite3)

**Table: `tasks`**

| Column         | Type     | Description                             |
|----------------|----------|-----------------------------------------|
| `id`           | INTEGER  | Unique task identifier                  |
| `title`        | TEXT     | Task title (required)                   |
| `description`  | TEXT     | Task details or notes                   |
| `priority`     | TEXT     | Can be `Low`, `Medium`, or `High`       |
| `status`       | TEXT     | Can be `Open`, `In Progress`, or `Done` |
| `due_date`     | TEXT     | Date in `YYYY-MM-DD` format             |
| `created_at`   | TEXT     | Timestamp of when the task was created  |

### 💡 Design Rationale:
- **SQLite3** is used for simplicity — it’s file-based and requires no separate database server.
- Each task stores its **priority, status, and due date** for flexibility in filtering and analytics.
- The schema is minimal but extensible — new fields like `assigned_to` or `category` can be added easily.

---

## ⚙️ Backend Logic (Node.js + Express)

- **Server Framework:** Express.js (simple, minimal REST API setup)
- **Database Layer:** sqlite3 library for direct SQL queries
- **Data Flow:**
  1. **POST /tasks** → Adds a new task  
  2. **GET /tasks** → Fetches all tasks (with optional `status` and `priority` filters)
  3. **PATCH /tasks/:id** → Updates task fields (e.g., marking “Done” or changing “Priority”)
  4. **GET /tasks/insights** → Aggregates task data to generate quick summaries

### 🧠 Insights Logic:
The backend calculates:
- **Total Open Tasks**
- **Tasks due soon** (within the next 3 days)
- **Breakdown by Priority**
- **Short Summary Message**

These are returned in a single object from `/tasks/insights` for efficient front-end rendering.

---

## 🖥️ Frontend Logic (React Class Components)

**Why Class Components?**
- Used intentionally to practice lifecycle methods (`componentDidMount`) and avoid React Hooks.
- Keeps compatibility with older React patterns.

### Components Overview:
|     Component      | Responsibility                                                                       |
|--------------------|--------------------------------------------------------------------------------------|
| `App.js`           | Main controller — fetches tasks, updates state, and passes props to child components |
| `TaskForm.js`      | Handles task creation (form submission, input validation)                            |
| `TaskList.js`      | Displays tasks with buttons for updating status or priority                          |
| `InsightsPanel.js` | Shows dynamic summaries and statistics                                               |

### State Management:
- `tasks`: Stores all fetched task data  
- `insights`: Stores summary analytics  
- `filters`: Controls dropdown-based filtering for task list  

The `App` component re-fetches tasks and insights whenever updates or filters occur.

---

## 🎨 UI Design Decisions

- **Pure CSS only** — no external frameworks (Bootstrap, Tailwind, etc.)
- Focused on **clean layout, white background, subtle borders, and color-coded priority indicators**
- Buttons styled for clarity (e.g., Done → green, In Progress → orange)

### Task Priority Colors:
| Priority | Color  |       Meaning        |
|----------|--------|----------------------|
|   High   |  Red   | Urgent action needed |
|  Medium  | Yellow | Moderate importance  |
|   Low    | Green  | Less critical        |

---

## 🚀 Potential Improvements

### 🔧 Technical Enhancements
- Use a **database ORM** like Sequelize for cleaner SQL handling  
- Introduce **error middleware** for centralized error responses  
- Add **pagination and search API endpoints**

### 🧩 Frontend Enhancements
- Implement **context API or Redux** for state sharing  
- Add **inline task editing** without reloading  
- Include **progress charts** (e.g., completion percentage)

### 🔐 Future Features
- **User Authentication** (JWT)
- **Dark Mode Toggle**
- **Export Tasks as CSV/PDF**
- **Deadline Reminders / Notifications**

---

## 🧠 Summary

This Task Tracker balances **simplicity, functionality, and scalability**.  
It’s designed as a clean, educational example of how a React + Node.js + SQLite stack can form a complete CRUD application — easily extendable into a full-fledged productivity tool.

---

**Author:** Rohit Raparthi  
📧 [rohit.raparthi2003@gmail.com](mailto:rohit.raparthi2003@gmail.com)  
💼 [LinkedIn](https://www.linkedin.com/in/rohit-raparthi/) / [GitHub](https://github.com/RohitRaparthi/)
