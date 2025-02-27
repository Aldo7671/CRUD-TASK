<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\Request;

class TaskController extends Controller
{
    // Funcion para obtener tareas con paginación y filtro por estado
    public function index(Request $request)
    {
        $query = Task::query();

        if ($request->has('status') && $request->status != '') {
            $query->where('status', $request->status);
        }

        $tasks = $query->paginate(10);

        return response()->json($tasks);
    }

    // Funcion para crear una tarea
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'status' => 'required|in:pendiente,progreso,completado',
            'due_date' => 'required|date',
        ]);

        $task = Task::create($request->all());

        return response()->json($task, 201);
    }

    // Funcion para obtener una tarea por du ID
    public function show($id)
    {
        $task = Task::findOrFail($id);
        return response()->json($task);
    }

    // Funcion para actualizar una tarea
    public function update(Request $request, $id)
    {
        $request->validate([
            'title' => 'sometimes|string|max:255',
            'description' => 'nullable|string',
            'status' => 'sometimes|in:pendiente,progreso,completado',
            'due_date' => 'sometimes|date',
        ]);

        $task = Task::findOrFail($id);
        $task->update($request->all());

        return response()->json($task);
    }

    // Funcion para eliminar una tarea
    public function destroy($id)
    {
        Task::destroy($id);
        return response()->noContent();
    }
}
