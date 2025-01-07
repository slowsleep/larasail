import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import { useEffect, useRef, useState } from 'react';
import RowMovie from './RowMovie';
import FormNewMovie from './FormNewMovie';
import ShowingTableCol from '@/Components/ShowingTableCol';
import ModelTable from '@/Components/ModelTable';
import ModelTableSorting from '@/Components/ModelTableSorting';

export default function Movies({ auth, movies, movie, action }) {
    const [moviesItems, setMoviesItems] = useState(movies);

    const { data, setData, post } = useForm({
        title: '',
        part: '',
        comment: '',
        finished: false,
        abandoned: false,
    });
    const tableRef = useRef(null);

    const hideForm = () => {
        document.querySelector("#form-movie").classList.toggle("hidden");
    }

    useEffect(() => {
        if (movie) {
            let newMoviesItems;
            if (action == "create") {
                newMoviesItems = [...moviesItems, movie];
            } else if (action == "update") {
                newMoviesItems = moviesItems.map((item) => {
                    if (item.id == movie.id) {
                        return {...item, ...movie};
                    }
                    return item;
                });

            }
            setMoviesItems(newMoviesItems);
        }
    }, [movie, action]);

    const updateSortedMoviesItems = (sortedMovies) => {
        setMoviesItems(sortedMovies);
    }

    const handleDestroyMovie = (id) => {
        let newMoviesItems = moviesItems.filter(item => item.id != id);
        setMoviesItems(newMoviesItems);
    }

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Фильмы</h2>}
        >
            <Head title="Movies" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg p-6 flex flex-col gap-y-4">

                        <FormNewMovie className="hidden" id="form-movie" data={data} setData={setData} post={post} />

                        <div
                            className="flex-1 p-2 border-2 border-cyan-400 bg-cyan-400/20 hover:bg-cyan-400/40 dark:text-white text-center cursor-pointer"
                            onClick={hideForm}
                            title="Показать форму добавления"
                        >
                            фильмы
                        </div>

                        <ShowingTableCol
                            model="movies"
                            columns={[
                                {label: 'part', column: 1},
                                {label: 'comment', column: 2},
                                {label: 'finished', column: 3},
                                {label: 'abandoned', column: 4}
                            ]}
                            tableRef={tableRef}
                        />

                        <ModelTableSorting
                            model="movies"
                            columns={['title', 'status', 'created_at']}
                            updateTableItems={updateSortedMoviesItems}
                        />

                        <div className="overflow-x-auto">
                            <ModelTable
                                model="movies"
                                columns={['title', 'part', 'comment', 'finished', 'abandoned']}
                                ref={tableRef}
                            >
                                {moviesItems.map((movie) => (
                                    <RowMovie key={movie.id} movie={movie} onDelete={handleDestroyMovie} />
                                ))}
                            </ModelTable>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
