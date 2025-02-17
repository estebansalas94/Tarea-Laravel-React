import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import RedirectLink from '@/Components/RedirectLink';
import TextArea from '@/Components/TextArea';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';


export default function TaskCreate() {
    // return (
    //     <h1>TASKS</h1>
    // );
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        description: '',
        completed: false,
    });

    const submit = (e) => {
        e.preventDefault();

        
        post(route('tasks.store'))
    };

    return (
        <GuestLayout>
            <Head title="TaskCreate" />

            <form onSubmit={submit}>
                <div>
                    <InputLabel htmlFor="name" value="Name" />

                    <TextInput
                        id="name"
                        name="name"
                        value={data.name}
                        className="mt-1 block w-full"
                        autoComplete="name"
                        isFocused={true}
                        onChange={(e) => setData('name', e.target.value)}
                        required
                    />

                    <InputError message={errors.name} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="description" value="Description" />

                    <TextArea
                        id="description"
                        type="description"
                        name="description"
                        value={data.description}
                        className="mt-1 block w-full"
                        autoComplete="username"
                        onChange={(e) => setData('description', e.target.value)}
                        required
                    />

                    <InputError message={errors.description} className="mt-2" />
                </div>

                <div className="mt-4 flex items-center justify-end">
                    <RedirectLink href="/dashboard">Volver</RedirectLink>

                    <PrimaryButton className="ms-4" disabled={processing}>
                        TaskCreate
                    </PrimaryButton>
                </div>
            </form>
        </GuestLayout>
    );
}
