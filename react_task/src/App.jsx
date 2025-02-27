import React, { useState } from 'react';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import './styles.css';

const App = () => {
  const [selectedTask, setSelectedTask] = useState(null);

  const fetchTasks = () => {
    setSelectedTask(null);
  };

  return (
    <div class="container">
      <h1>Administrador de Tareas</h1>
      <TaskForm task={selectedTask} fetchTasks={fetchTasks} />
      <TaskList fetchTasks={fetchTasks} setSelectedTask={setSelectedTask} />
    </div>
  );
};

export default App;