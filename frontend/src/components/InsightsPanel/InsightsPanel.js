import React, { Component } from 'react';
import './InsightsPanel.css';

class InsightsPanel extends Component {
  render() {
    const { insights } = this.props;

    return (
      <div className="insights">
        <h3>Smart Insights</h3>
        {insights ? (
          <div>
            <p><b>Total Open Tasks:</b> {insights.totalOpen}</p>
            <p><b>Due Soon:</b> {insights.dueSoon}</p>
            <p><b>Priority Breakdown:</b> {JSON.stringify(insights.byPriority)}</p>
            <p style={{ fontStyle: 'italic', color: '#155724' }}>
              {insights.summary}
            </p>
          </div>
        ) : (
          <p>Loading insights...</p>
        )}
      </div>
    );
  }
}

export default InsightsPanel;
