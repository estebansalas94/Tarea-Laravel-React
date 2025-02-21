import PrimaryButton from '@/Components/PrimaryButton';
import RedirectLink from '@/Components/RedirectLink';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { useState } from 'react';

export default function Dashboard({tasks}) {
    const [currentPage, setCurrentPage] = useState(1);
    const tasksPerPage = 5;
    const [searchTerm, setSearchTerm] = useState("");

    const filteredTasks = tasks.filter((task) =>
        task.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const totalPages = Math.ceil(filteredTasks.length / tasksPerPage);
    const indexOfLastTask = currentPage * tasksPerPage;
    const indexOfFirstTask = indexOfLastTask - tasksPerPage;
    const currentTasks = filteredTasks.slice(indexOfFirstTask, indexOfLastTask);

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Tasks
                </h2>
            }
        >
            <Head title="Task" />

            <div className="py-2">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                        <RedirectLink href='tasks/create'>Crear tarea</RedirectLink>
                </div>
            </div>
            
            <div className="py-4">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Buscar tareas..."
                        className="px-4 py-2 border rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-600 dark:bg-gray-700 dark:text-gray-100"
                        />
                    </div>
                </div>
            </div>


            <div className="py-4">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                        <h2 className="mb-4 text-lg font-bold">Mis Tareas</h2>
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                <thead>
                                    <tr>
                                        <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase dark:text-gray-400">
                                            ID
                                        </th>
                                        <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase dark:text-gray-400">
                                            Nombre de Tarea
                                        </th>
                                        <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase dark:text-gray-400">
                                            Descripcion de la Tarea
                                        </th>
                                        <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase dark:text-gray-400">
                                            Estado de la Tarea
                                        </th>
                                        <th className='px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase dark:text-gray-400'>
                                            ACCIÓN
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                    {currentTasks.map((task) => (
                                        <tr key={task.id}>
                                            <td className="px-6 py-4 text-sm text-gray-900 dark:text-gray-100">
                                                {task.id}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-900 dark:text-gray-100">
                                                {task.name}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-900 dark:text-gray-100">
                                                {task.description}
                                            </td>
                                            <td className='px-6 py-4 text-sm text-gray-900 dark:text-gray-100'>
                                                {task.completed ? (
                                                    <span className="px-2 py-1 text-xs font-semibold text-green-800 bg-green-200 rounded-full dark:text-green-100 dark:bg-green-500">
                                                        Completada
                                                    </span>
                                                ) : (
                                                    <span className="px-2 py-1 text-xs font-semibold text-red-800 bg-red-200 rounded-full dark:text-red-100 dark:bg-red-500">
                                                        Pendiente
                                                    </span>
                                                )}
                                            </td>
                                            <td className='px-6 py-4 text-sm text-gray-900 dark:text-gray-100'>
                                                <RedirectLink href={`tasks/${task.id}/edit`} className={task.completed ? "pointer-events-none opacity-50" : ""}>Editar</RedirectLink>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <p className="text-center">{filteredTasks.length === 0 ? "No se encontraron tareas" : ""}</p>
                            <div className="flex justify-center mt-4">
                                <button
                                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                                    disabled={currentPage === 1}
                                    className="px-4 py-2 mx-1 text-sm font-medium text-white bg-gray-600 rounded-lg disabled:opacity-50"
                                >
                                    Anterior
                                </button>
                                <span className="px-4 py-2 text-sm text-gray-900 dark:text-gray-100">
                                    Página {currentPage} de {totalPages}
                                </span>
                                <button
                                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                                    disabled={currentPage === totalPages}
                                    className="px-4 py-2 mx-1 text-sm font-medium text-white bg-gray-600 rounded-lg disabled:opacity-50"
                                >
                                    Siguiente
                                </button>
                            </div>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
