const { openDb } = require('../db/database');

const VALID_PRIORITIES = ['Low', 'Medium', 'High'];
const VALID_STATUSES = ['Open', 'In Progress', 'Done'];

function validateCreate(task) {
  const errors = [];
  if (!task.title) errors.push('Title is required');
  if (!task.due_date) errors.push('Due date is required');
  if (task.priority && !VALID_PRIORITIES.includes(task.priority))
    errors.push('Invalid priority');
  if (task.status && !VALID_STATUSES.includes(task.status))
    errors.push('Invalid status');
  return errors;
}

function validateUpdate(task) {
  const errors = [];
  if (task.priority && !VALID_PRIORITIES.includes(task.priority))
    errors.push('Invalid priority');
  if (task.status && !VALID_STATUSES.includes(task.status))
    errors.push('Invalid status');
  return errors;
}

function createTask(task) {
  return new Promise((resolve, reject) => {
    const db = openDb();
    db.run(
      `INSERT INTO tasks (title, description, priority, due_date, status)
       VALUES (?, ?, ?, ?, ?)`,
      [task.title, task.description || '', task.priority || 'Medium', task.due_date, task.status || 'Open'],
      function (err) {
        if (err) reject(err);
        db.get('SELECT * FROM tasks WHERE id = ?', [this.lastID], (e, row) => {
          db.close();
          e ? reject(e) : resolve(row);
        });
      }
    );
  });
}

function getTasks(filters = {}) {
  return new Promise((resolve, reject) => {
    const db = openDb();
    let sql = 'SELECT * FROM tasks';
    const params = [];
    const where = [];

    if (filters.status) {
      where.push('status = ?');
      params.push(filters.status);
    }
    if (filters.priority) {
      where.push('priority = ?');
      params.push(filters.priority);
    }
    if (where.length) sql += ' WHERE ' + where.join(' AND ');
    sql += ' ORDER BY created_at DESC';

    db.all(sql, params, (err, rows) => {
      db.close();
      err ? reject(err) : resolve(rows);
    });
  });
}

function updateTask(id, updates) {
  return new Promise((resolve, reject) => {
    const db = openDb();
    db.get('SELECT * FROM tasks WHERE id = ?', [id], (err, task) => {
      if (err) return reject(err);
      if (!task) {
        db.close();
        return resolve(null);
      }

      const status = updates.status || task.status;
      const priority = updates.priority || task.priority;

      db.run(
        'UPDATE tasks SET status = ?, priority = ? WHERE id = ?',
        [status, priority, id],
        function (err2) {
          if (err2) {
            db.close();
            return reject(err2);
          }
          db.get('SELECT * FROM tasks WHERE id = ?', [id], (err3, updated) => {
            db.close();
            err3 ? reject(err3) : resolve(updated);
          });
        }
      );
    });
  });
}

module.exports = {
  createTask,
  getTasks,
  updateTask,
  validateCreate,
  validateUpdate
};
