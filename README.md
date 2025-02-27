ADMINISTRACION DE TAREAAS

Esta es una aplicación de gestión de tareas desarrollada con React para el frontend y Laravel para el backend.

- 'crud_task/': Codigo del backend (Laravel).
- 'react_task/': Codigo del frontend (React).

Características principales

- Crear tareas: Agrega nuevas tareas con título, descripción, estado y fecha límite.
- Editar tareas: Modifica los detalles de una tarea existente.
- Eliminar tareas: Elimina tareas que ya no necesites.
- Filtrar tareas: Filtra las tareas por estado (pendiente, en progreso, completado).
- Paginacion: Navega entre las tareas usando la paginacion.

Instalacion Backend:

1.- Clonar el repositorio:
  https://github.com/Aldo7671/CRUD-TASK.git
  cd CRUD-TASK/crud_task

2.- Insttalar dependencias:
  composer install

3.- Configuracion archivo .env:
  DB_CONNECTION=mysql
  DB_HOST=127.0.0.1
  DB_PORT=3306
  DB_DATABASE=crud_task
  DB_USERNAME=root
  DB_PASSWORD=

4.- Ejecutar migraciones:
  php artisan migrate

5.- Iniciar Servidor:
  php artisan serve

El backend estará disponible en http://localhost:8000

Instalacion Frontend:

1.- Ir a la carpeta del frontend:
  cd ../react_task

2.- Instala las dependencias:
  npm install

3.- Inicia el servidor:
  npm run dev

El frontend estará disponible en http://localhost:5173
