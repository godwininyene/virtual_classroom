import { useEffect } from 'react';
import Checkbox from '@/Components/Checkbox';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';
import bg from '@/Assets/img/hero.webp';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    useEffect(() => {
        return () => {
            reset('password');
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();

        post(route('login'));
    };

    return (
        <GuestLayout>
            <Head title="Log in" />

            {status && <div className="mb-4 font-medium text-sm text-green-600">{status}</div>}

             {/* Left hand content Start */}
             <div className=" hidden md:block bg-cover bg-center"  style={{backgroundImage: `url(${bg})`}}>
                <div className="h-full bg-gradient-to-b from-[#000000ec] via-[#000000b9] to-[#000000b9]  text-primary">
                    <div className='h-full '>
                        <div className='text-center px-10 flex flex-col justify-center items-center h-full'>
                            <Link href='/' className='flex items-center flex-col'>
                            <section className="bg-yellow-400 text-center py-3 px-2 mt-1 rounded-md shadow-md  md:block">
                                <h1 className='text-white text-xl font-semibold'>Virtual Classroom</h1>
                            </section>
                               
                                <span className='text-white text-3xl'>
                                    Kindergarten School
                                </span>
                            </Link>
                            
                            <h1 className='text-white text-3xl font-black pt-5'>
                                We Are Kindergarten & Childhood
                            </h1>
                            <p className='text-gray-200'>
                                The universe is one great Kindergarten for man. Everything
                                that exists has brought with it its own peculiar lesson.
                            </p>
                            
                        </div>
                    </div>
                </div>
            </div>
            {/* Left hand content End */}

             {/* Right Hand Content Start */}
             <div className="relative min-h-full px-4 py-10 flex items-center justify-center bg-[rgb(244,244,244)] dark:bg-slate-950">
                
                <div className="w-full md:max-w-md mx-auto ">
                   

                    <div className='px-4 py-6 md:p-10 bg-white dark:bg-slate-800   rounded-lg shadow-lg'>
                        <h3 className='font-bold text-2xl mb-1 dark:text-white'>Login</h3>
                        <p className='text-sm font-medium leading-[1.6] mb-8 dark:text-white'>Enter your login credentials to continue.</p>
                        {status && <div className="mb-7 font-medium text-sm text-green-600">{status}</div>}

                        <form onSubmit={submit}>
                            <div>
                                <InputLabel htmlFor="email" value="Email" />

                                <TextInput
                                    id="email"
                                    type="email"
                                    name="email"
                                    value={data.email}
                                    className="mt-1 block w-full"
                                    autoComplete="username"
                                    isFocused={true}
                                    onChange={(e) => setData('email', e.target.value)}
                                />

                                <InputError message={errors.email} className="mt-2" />
                            </div>

                            <div className="mt-4">
                                <InputLabel htmlFor="password" value="Password" />

                                <TextInput
                                    id="password"
                                    type="password"
                                    name="password"
                                    value={data.password}
                                    className="mt-1 block w-full"
                                    autoComplete="current-password"
                                    onChange={(e) => setData('password', e.target.value)}
                                />

                                <InputError message={errors.password} className="mt-2" />
                            </div>

                            <div className="block mt-4">
                                <label className="flex items-center">
                                    <Checkbox
                                        name="remember"
                                        checked={data.remember}
                                        onChange={(e) => setData('remember', e.target.checked)}
                                    />
                                    <span className="ms-2 text-sm text-gray-600 dark:text-gray-400">Remember me</span>
                                </label>
                            </div>

                            <div className="flex items-center justify-end mt-4">
                                {/* {canResetPassword && (
                                    <Link
                                        href={route('password.request')}
                                        className="underline text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800"
                                    >
                                        Forgot your password?
                                    </Link>
                                )} */}

                                <PrimaryButton className="ms-4" disabled={processing}>
                                    Log in
                                </PrimaryButton>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
}
