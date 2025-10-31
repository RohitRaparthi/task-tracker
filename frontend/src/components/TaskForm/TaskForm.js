import React, { Component } from 'react';
import './TaskForm.css'; // uses same shared CSS file

class TaskForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      description: '',
      priority: 'Medium',
      due_date: ''
    };
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { title, description, priority, due_date } = this.state;
    if (!title || !due_date) {
      alert('Title and Due Date are required');
      return;
    }

    fetch('http://localhost:5000/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, description, priority, due_date })
    })
      .then(res => res.json())
      .then(data => {
        if (data.ok) {
          alert('Task added successfully');
          this.setState({
            title: '',
            description: '',
            priority: 'Medium',
            due_date: ''
          });
          this.props.onTaskCreated();
        } else {
          alert('Error: ' + (data.errors || data.error));
        }
      })
      .catch(err => console.error('Error adding task:', err));
  };

  render() {
    return (
      <form className="task-form" onSubmit={this.handleSubmit}>
        <h3>Create New Task</h3>

        <input
          type="text"
          name="title"
          placeholder="Enter task title"
          value={this.state.title}
          onChange={this.handleChange}
          required
        />

        <textarea
          name="description"
          placeholder="Enter task description"
          value={this.state.description}
          onChange={this.handleChange}
        ></textarea>

        <div className="form-row">
          <div className="form-group">
            <label>Priority:</label>
            <select
              name="priority"
              value={this.state.priority}
              onChange={this.handleChange}
            >
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
            </select>
          </div>

          <div className="form-group">
            <label>Due Date:</label>
            <input
              type="date"
              name="due_date"
              value={this.state.due_date}
              onChange={this.handleChange}
            />
          </div>
        </div>

        <button type="submit" className="btn-primary">
          Add Task
        </button>
      </form>
    );
  }
}

export default TaskForm;
