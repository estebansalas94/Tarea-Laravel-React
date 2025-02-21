import PrimaryButton from '@/Components/PrimaryButton';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';

const TaskEdit = ({ tasks }) => {
    const tasksArray = Array.isArray(tasks) ? tasks : [tasks];

    const { data, setData, put, processing, errors } = useForm({
        tasks: tasksArray.map(task => ({
            id: task.id,
            name: task.name,
            description: task.description,
            completed: task.completed,
        })),
    });

    const handleUpdate = (taskId) => {
        const updatedTask = data.tasks.find(task => task.id === taskId);

        put(route('tasks.update', taskId), {
            name: updatedTask.name,
            description: updatedTask.description,
            completed: updatedTask.completed,
        });
    };

    const updateTaskStatus = (taskId, completed) => {
        setData('tasks', data.tasks.map(task => 
            task.id === taskId ? { ...task, completed } : task
        ));
    };

    return (
        <AuthenticatedLayout>
            <Head title="TaskEdit" />

            <form onSubmit={(e) => e.preventDefault()}>
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead>
                        <tr>
                            <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase dark:text-gray-400">
                                ID
                            </th>
                            <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase dark:text-gray-400">
                                Nombre
                            </th>
                            <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase dark:text-gray-400">
                                Descripción
                            </th>
                            <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase dark:text-gray-400">
                                Estado
                            </th>
                            <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase dark:text-gray-400">
                                Acción
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                        {data.tasks.map((task) => (
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
                                <td className="px-6 py-4 text-sm text-gray-900 dark:text-gray-100">
                                    <select
                                        name="completed"
                                        id="completed"
                                        value={task.completed ? '1' : '0'}
                                        className="rounded border-gray-300 dark:bg-gray-700 dark:text-gray-100"
                                        onChange={(e) => updateTaskStatus(task.id, e.target.value === '1')}
                                    >
                                        <option value="0">Pendiente</option>
                                        <option value="1">Completado</option>
                                    </select>
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-900 dark:text-gray-100">
                                    <PrimaryButton
                                        type="button"
                                        onClick={() => handleUpdate(task.id)}
                                        className="text-indigo-600 hover:text-indigo-900"
                                    >
                                        Guardar
                                    </PrimaryButton>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </form>
        </AuthenticatedLayout>
    );
};

export default TaskEdit;