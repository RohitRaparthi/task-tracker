import React, { Component } from 'react';
import TaskForm from './components/TaskForm/TaskForm';
import TaskList from './components/TaskList/TaskList';
import InsightsPanel from './components/InsightsPanel/InsightsPanel';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      insights: null,
      filters: { status: '', priority: '' }
    };
  }

  componentDidMount() {
    this.fetchTasks();
    this.fetchInsights();
  }

  backendUrl = 'https://task-tracker-caxa.onrender.com/tasks';

  fetchTasks = () => {
    const { status, priority } = this.state.filters;
    let url = this.backendUrl;
    const params = [];
    if (status) params.push(`status=${status}`);
    if (priority) params.push(`priority=${priority}`);
    if (params.length > 0) url += '?' + params.join('&');

    fetch(url)
      .then(res => res.json())
      .then(data => {
        if (data.ok) this.setState({ tasks: data.tasks });
      })
      .catch(err => console.error('Error fetching tasks:', err));
  };

  fetchInsights = () => {
    fetch(`${this.backendUrl}/insights`)
      .then(res => res.json())
      .then(data => {
        if (data.ok) this.setState({ insights: data.insights });
      })
      .catch(err => console.error('Error fetching insights:', err));
  };

  handleTaskCreated = () => {
    this.fetchTasks();
    this.fetchInsights();
  };

  handleFilterChange = (e) => {
    const { name, value } = e.target;
    this.setState(
      { filters: { ...this.state.filters, [name]: value } },
      this.fetchTasks
    );
  };

  handleUpdateTask = (id, update) => {
    fetch(`${this.backendUrl}/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(update)
    })
      .then(res => res.json())
      .then(data => {
        if (data.ok) {
          this.fetchTasks();
          this.fetchInsights();
        }
      })
      .catch(err => console.error('Error updating task:', err));
  };

  render() {
    const { tasks, insights, filters } = this.state;

    return (
      <div className="container">
        <h1>Task Tracker with Smart Insights</h1>

        <TaskForm onTaskCreated={this.handleTaskCreated} />

        <div className="filters">
          <div className="filter-item">
            <label>Status: </label>
            <select name="status" value={filters.status} onChange={this.handleFilterChange}>
              <option value="">All</option>
              <option value="Open">Open</option>
              <option value="In Progress">In Progress</option>
              <option value="Done">Done</option>
            </select>
          </div>

          <div className="filter-item">
            <label>Priority: </label>
            <select name="priority" value={filters.priority} onChange={this.handleFilterChange}>
              <option value="">All</option>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>
        </div>

        <TaskList tasks={tasks} onUpdateTask={this.handleUpdateTask} />
        <InsightsPanel insights={insights} />
      </div>
    );
  }
}

export default App;
