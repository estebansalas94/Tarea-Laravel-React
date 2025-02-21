<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

class TaskController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $data = Task::all();
        return Inertia::render('Dashboard', ['tasks' => $data]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Tasks/TaskCreate');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            
        ]);

        $task=Task::create([
            'name' => $request->name,
            'description' => $request->description,
            'completed' => false,
        ]);


        return redirect(route('dashboard', absolute: false));
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $data = Task::find($id);
        return Inertia::render('Tasks/TaskEdit', ['tasks' => $data]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $teclado = $request->input('completed');
        $task = Task::findOrFail($id);
        $task->completed = $request->input('completed');
        $task->save();

        return redirect()->route('dashboard')->with('success', 'Tarea actualizada correctamente.');
        //return redirect(route('dashboard', absolute: false));

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
