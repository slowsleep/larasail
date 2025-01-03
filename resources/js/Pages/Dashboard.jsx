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
                        <div className="px-6 py-6 flex gap-x-8 overflow-x-auto">
                            <Link className="flex-1 p-2 border-2 border-teal-600 bg-teal-600/20 hover:bg-teal-600/40 dark:text-white text-center cursor-pointer" href={route('anime.index')}>
                                <div>
                                    аниме
                                </div>
                            </Link>
                            <Link className="flex-1 p-2 border-2 border-pink-400 bg-pink-400/20 hover:bg-pink-400/40 dark:text-white text-center cursor-pointer" href={route('series.index')}>
                                <div>
                                    сериалы
                                </div>
                            </Link>
                            <Link href={route('movies.index')} className="flex-1 p-2 border-2 border-cyan-400 bg-cyan-400/20 hover:bg-cyan-400/40 dark:text-white text-center cursor-pointer">
                                <div>
                                    фильмы
                                </div>
                            </Link>
                            <Link className="flex-1 p-2 border-2 border-emerald-600 bg-emerald-600/20 hover:bg-emerald-600/40 dark:text-white text-center cursor-pointer" href={route('mangas.index')}>
                                <div>
                                    манга
                                </div>
                            </Link>
                            <Link className="flex-1 p-2 border-2 border-amber-800 bg-amber-800/20 hover:bg-amber-800/40 dark:text-white text-center cursor-pointer" href={route('books.index')}>
                                <div>
                                    книги
                                </div>
                            </Link>
                            <Link className="flex-1 p-2 border-2 border-violet-600 bg-violet-600/20 hover:bg-violet-600/40 dark:text-white text-center cursor-pointer" href={route('games.index')}>
                                <div>
                                    игры
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
