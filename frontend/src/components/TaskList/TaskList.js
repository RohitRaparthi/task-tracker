import React from 'react';
import bootstrap from 'bootstrap'
import './TaskList.css';

const TaskList = ({ tasks, onUpdateTask }) => {
  return (
    <div className="task-list">
      <h3>Task List</h3>

      {tasks.length === 0 && <p>No tasks found.</p>}

      {tasks.map(task => (
        <div
          key={task.id}
          className="task-card"
          style={{
            borderLeft: `5px solid ${
              task.priority === 'High'
                ? '#dc3545'
                : task.priority === 'Medium'
                ? '#ffc107'
                : '#28a745'
            }`
          }}
        >
          <h4>{task.title}</h4>
          <p>{task.description}</p>
          <p>
            <b>Priority:</b> {task.priority} | <b>Status:</b> {task.status} |{' '}
            <b>Due:</b> {task.due_date}
          </p>

          <div className="task-buttons">
            {/* Show buttons conditionally */}
            {task.status === 'Open' && (
              <button
                onClick={() => onUpdateTask(task.id, { status: 'In Progress' })}
                className="btn-secondary"
              >
                Mark In Progress
              </button>
            )}

            {task.status === 'In Progress' && (
              <button
                onClick={() => onUpdateTask(task.id, { status: 'Done' })}
                className="btn-success"
              >
                Mark Done
              </button>
            )}

            {task.status === 'Done' && (
              <button
                onClick={() => onUpdateTask(task.id, { status: 'In Progress' })}
                className="btn-warning"
              >
                Mark In Progress
              </button>
            )}

            {/* Priority update always available */}
            {(task.priority === 'Medium' || task.priority === 'High') && (
            <button
              onClick={() => onUpdateTask(task.id, { priority: 'Low' })}
              className="btn-low"
            >
              Make Low Priority
            </button>
            )}
            {(task.priority === 'Low' || task.priority === 'High') && (
            <button
              onClick={() => onUpdateTask(task.id, { priority: 'Medium' })}
              className="btn-medium"
            >
              Make Medium Priority
            </button>
            )}
            {(task.priority === 'Medium' || task.priority === 'Low') && (
            <button
              onClick={() => onUpdateTask(task.id, { priority: 'High' })}
              className="btn-high"
            >
              Make High Priority
            </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default TaskList;
