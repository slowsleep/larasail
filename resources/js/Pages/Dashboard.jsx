import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function Dashboard({ auth }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-zinc-800 dark:text-zinc-200 leading-tight">Dashboard</h2>}
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-zinc-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="px-6 md:px-16 lg:px-24 py-6 grid grid-cols-2 gap-4">
                            <Link className="p-2 border-2 rounded-lg border-teal-600 bg-teal-600/20 hover:bg-teal-600/40 dark:text-white text-center cursor-pointer" href={route('anime.index')}>
                                аниме
                            </Link>
                            <Link className="p-2 border-2 rounded-lg border-emerald-600 bg-emerald-600/20 hover:bg-emerald-600/40 dark:text-white text-center cursor-pointer" href={route('mangas.index')}>
                                манга
                            </Link>
                            <Link className="p-2 border-2 rounded-lg border-cyan-400 bg-cyan-400/20 hover:bg-cyan-400/40 dark:text-white text-center cursor-pointer" href={route('movies.index')} >
                                фильмы
                            </Link>
                            <Link className="p-2 border-2 rounded-lg border-pink-400 bg-pink-400/20 hover:bg-pink-400/40 dark:text-white text-center cursor-pointer" href={route('series.index')}>
                                сериалы
                            </Link>
                            <Link className="p-2 border-2 rounded-lg border-blue-600 bg-blue-600/20 hover:bg-blue-600/40 dark:text-white text-center cursor-pointer" href={route('cartoons.index')}>
                                мультфильмы
                            </Link>
                            <Link className="p-2 border-2 rounded-lg border-fuchsia-600 bg-fuchsia-600/20 hover:bg-fuchsia-600/40 dark:text-white text-center cursor-pointer" href={route('animated-series.index')}>
                                мультсериалы
                            </Link>
                            <Link className="p-2 border-2 rounded-lg border-amber-800 bg-amber-800/20 hover:bg-amber-800/40 dark:text-white text-center cursor-pointer" href={route('books.index')}>
                                книги
                            </Link>
                            <Link className="p-2 border-2 rounded-lg border-violet-600 bg-violet-600/20 hover:bg-violet-600/40 dark:text-white text-center cursor-pointer" href={route('games.index')}>
                                игры
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
