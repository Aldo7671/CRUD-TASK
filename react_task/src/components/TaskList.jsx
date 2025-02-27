import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TaskList = ({ fetchTasks, setSelectedTask }) => {
  const [tasks, setTasks] = useState([]);
  const [statusFilter, setStatusFilter] = useState('');
  const [pagination, setPagination] = useState({});

  const loadTasks = async (page = 1) => {
    try {
      let url = `http://localhost:8000/api/tasks?page=${page}`;
      if (statusFilter) {
        url += `&status=${statusFilter}`;
      }

      const response = await axios.get(url);
      setTasks(response.data.data);
      setPagination({
        currentPage: response.data.current_page,
        lastPage: response.data.last_page,
      });
    } catch (error) {
      console.error('Error al cargar las tareas:', error);
    }
  };

  useEffect(() => {
    loadTasks();
  }, [statusFilter, fetchTasks]);

  const handleFilterChange = (e) => {
    setStatusFilter(e.target.value);
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('¿Deseas eliminar esta tarea?');
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:8000/api/tasks/${id}`);
      fetchTasks();
    } catch (error) {
      console.error('Error al eliminar la tarea:', error);
    }
  };

  const handleUpdate = (task) => {
    setSelectedTask(task);
  };

  return (
    <div>
      <h2>Listado de Tareas</h2>
      <select onChange={handleFilterChange} value={statusFilter}>
        <option value="">Todas</option>
        <option value="pendiente">Pendiente</option>
        <option value="progreso">Progreso</option>
        <option value="completado">Completado</option>
      </select>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <p>Estado: {task.status}</p>
            <p>Fecha de vencimiento: {task.due_date}</p>
            <div class="actions">
              <button class="update" onClick={() => handleUpdate(task)}>Actualizar</button>
              <button onClick={() => handleDelete(task.id)}>Eliminar</button>
            </div>
          </li>
        ))}
      </ul>
      <div classe="pagination">
        <button disabled={pagination.currentPage === 1} onClick={() => loadTasks(pagination.currentPage - 1)}>
          Anterior
        </button>
        <span> Pagina {pagination.currentPage} de {pagination.lastPage} </span>
        <button disabled={pagination.currentPage === pagination.lastPage} onClick={() => loadTasks(pagination.currentPage + 1)}>
          Siguiente
        </button>
      </div>
    </div>
  );
};

export default TaskList;