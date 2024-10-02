import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function Dashboard({ auth }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Dashboard</h2>}
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">You're logged in!</div>
                        <div className="px-6 py-6 flex gap-x-8">
                            <Link href={route('movies.index')} className="flex-1 p-2 border-2 border-cyan-400 bg-cyan-400/20 hover:bg-cyan-400/40 text-white text-center cursor-pointer">
                                <div>
                                    фильмы
                                </div>
                            </Link>
                            <Link className="flex-1 p-2 border-2 border-pink-400 bg-pink-400/20 hover:bg-pink-400/40 text-white text-center cursor-pointer" href={route('series.index')}>
                                <div>
                                    сериалы
                                </div>
                            </Link>
                            <Link className="flex-1 p-2 border-2 border-violet-600 bg-violet-600/20 hover:bg-violet-600/40 text-white text-center cursor-pointer" href={route('games')}>
                                <div>
                                    игры
                                </div>
                            </Link>
                            <Link className="flex-1 p-2 border-2 border-amber-800 bg-amber-800/20 hover:bg-amber-800/40 text-white text-center cursor-pointer" href={route('books')}>
                                <div>
                                    книги
                                </div>
                            </Link>
                            <Link className="flex-1 p-2 border-2 border-emerald-600 bg-emerald-600/20 hover:bg-emerald-600/40 text-white text-center cursor-pointer" href={route('mangas')}>
                                <div>
                                    манга
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
