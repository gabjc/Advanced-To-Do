// src/ListView.js
import React from 'react';
import './ListView.css';

const TaskCard = ({ name, date }) => {
  return (
    <div className="task-card">
      <div className="task-name">{name}</div>
      <div className="task-date">{date}</div>
    </div>
  );
};

const ListView = ({ tasks }) => {
  return (
    <div className="list-view">
      {tasks.map((task, index) => (
        <TaskCard key={index} name={task.name} date={task.date} />
      ))}
    </div>
  );
};

export default ListView;
