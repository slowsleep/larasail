import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import { useEffect } from 'react';
import FormNewAnime from './FormNewAnime';
import RowAnime from './RowAnime';

export default function Anime({auth, animeList, anime, action}) {
    const { data, setData, post } = useForm({
        title: '',
        season: '',
        episode: '',
        genre: '',
        publisher: '',
        translator: '',
        comment: '',
        finished: false,
        abandoned: false,
    });

    const hideForm = () => {
        document.querySelector("#form-anime").classList.toggle("hidden");
    }

    useEffect(() => {
        if (anime) {
            if (action == "create") {
                animeList.push(anime);
            } else if (action == "update") {
                animeList = animeList.map((item) => {
                    if (item.id == anime.id) {
                        return {...item, ...anime};
                    }
                    return item;
                });
            }
        }
    }, [anime, action]);

    return (
        <AuthenticatedLayout
        user={auth.user}
        header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Книги</h2>}
    >
        <Head title="Anime" />
        <div className="py-12">
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg p-6 flex flex-col gap-y-4">

                    <FormNewAnime id="form-anime" data={data} setData={setData} post={post} />

                    <div className="flex-1 p-2 border-2 border-teal-400 bg-teal-400/20 hover:bg-teal-400/40 text-white text-center cursor-pointer" onClick={hideForm}>аниме</div>

                    <table className="border-separate border-spacing-2 border border-slate-500 w-full">
                        <thead>
                            <tr className="bg-slate-700">
                                <th className="text-start">Название</th>
                                <th>Сезон</th>
                                <th>Серия</th>
                                <th>Жанр</th>
                                <th>Издатель</th>
                                <th>Перевод</th>
                                <th>Комментарий</th>
                                <th>Завершен</th>
                                <th>Заброшен</th>
                            </tr>
                        </thead>
                        <tbody>
                            {animeList.map((anime) => (
                                <RowAnime key={anime.id} anime={anime} />
                            ))}
                        </tbody>
                    </table>

                </div>
            </div>
        </div>
    </AuthenticatedLayout>
    )
}
