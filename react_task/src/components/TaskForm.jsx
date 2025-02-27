import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TaskForm = ({ task, fetchTasks }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'pendiente',
    due_date: '',
  });

  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title,
        description: task.description,
        status: task.status,
        due_date: task.due_date,
      });
    } else {
      setFormData({
        title: '',
        description: '',
        status: 'pendiente',
        due_date: '',
      });
    }
  }, [task]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (task) {
        await axios.put(`http://localhost:8000/api/tasks/${task.id}`, formData);
      } else {
        await axios.post('http://localhost:8000/api/tasks', formData);
      }
      fetchTasks();
    } catch (error) {
      console.error('Error al guardar la tarea:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Titulo" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} />
      <textarea placeholder="Descripcion" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} />
      <select value={formData.status} onChange={(e) => setFormData({ ...formData, status: e.target.value })} >
        <option value="pendiente">Pendiente</option>
        <option value="progreso">Progreso</option>
        <option value="completado">Completado</option>
      </select>
      <input type="date" value={formData.due_date} onChange={(e) => setFormData({ ...formData, due_date: e.target.value })} />
      <button type="submit">{task ? 'Actualizar' : 'Crear'}</button>
    </form>
  );
};

export default TaskForm;