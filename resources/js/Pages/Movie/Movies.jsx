import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import { useEffect } from 'react';
import RowMovie from './RowMovie';
import FormNewMovie from './FormNewMovie';

export default function Movies({ auth, movies, movie, action }) {
    const { data, setData, post } = useForm({
        title: '',
        part: '',
        comment: '',
        finished: false,
        abandoned: false,
    });

    const hideForm = () => {
        document.querySelector("#form-movie").classList.toggle("hidden");
    }

    useEffect(() => {
        if (movie) {
            if (action == "create") {
                movies.push(movie);
            } else if (action == "update") {
                movies = movies.map((item) => {
                    if (item.id == movie.id) {
                        return {...item, ...movie};
                    }
                    return item;
                });
            }
        }
    }, [movie, action]);

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Фильмы</h2>}
        >
            <Head title="Movies" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg p-6 flex flex-col gap-y-4">

                        <FormNewMovie id="form-movie" data={data} setData={setData} post={post} />

                        <div className="flex-1 p-2 border-2 border-cyan-400 bg-cyan-400/20 hover:bg-cyan-400/40 text-white text-center cursor-pointer" onClick={hideForm}>фильмы</div>

                        <table className="border-separate border-spacing-2 border border-slate-500">
                            <thead>
                                <tr className="bg-slate-700">
                                    <th className="text-start">Название</th>
                                    <th>Часть</th>
                                    <th>Комментарий</th>
                                    <th>Завершен</th>
                                    <th>Заброшен</th>
                                </tr>
                            </thead>
                            <tbody>
                                {movies.map((movie) => (
                                    <RowMovie key={movie.id} movie={movie} />
                                ))}
                            </tbody>
                        </table>

                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
