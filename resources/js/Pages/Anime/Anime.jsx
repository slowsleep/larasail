import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import { useEffect, useRef, useState } from 'react';
import FormNewAnime from './FormNewAnime';
import RowAnime from './RowAnime';
import ShowingTableCol from '@/Components/ShowingTableCol';
import ModelTable from '@/Components/ModelTable';
import ModelTableSorting from '@/Components/ModelTableSorting';

export default function Anime({auth, animeList, anime, action}) {
    const [animeItems, setAnimeItems] = useState(animeList);

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
    const tableRef = useRef(null);

    const hideForm = () => {
        document.querySelector("#form-anime").classList.toggle("hidden");
    }

    useEffect(() => {
        if (anime) {
            let newAnimeItems;
            if (action == "create") {
                newAnimeItems = [...animeItems, anime];
            } else if (action == "update") {
                newAnimeItems = animeItems.map((item) => {
                    if (item.id == anime.id) {
                        return {...item, ...anime};
                    }
                    return item;
                });

            }
            setAnimeItems(newAnimeItems);
        }
    }, [anime, action]);

    const updateSortedAnimeItems = (sortedAnime) => {
        setAnimeItems(sortedAnime);
    }

    const handleDestroyAnime = (id) => {
        let newAnimeItems = animeItems.filter(item => item.id != id);
        setAnimeItems(newAnimeItems);
    }

    return (
        <AuthenticatedLayout
        user={auth.user}
        header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Аниме</h2>}
    >
        <Head title="Anime" />
        <div className="py-12">
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg p-6 flex flex-col gap-y-4">

                    <FormNewAnime id="form-anime" data={data} setData={setData} post={post} />

                    <div className="flex-1 p-2 border-2 border-teal-400 bg-teal-400/20 hover:bg-teal-400/40 dark:text-white text-center cursor-pointer" onClick={hideForm}>аниме</div>

                    <ShowingTableCol
                        model="anime"
                        columns={[
                            {label: 'season', column: 1},
                            {label: 'episode', column: 2},
                            {label: 'genre', column: 3},
                            {label: 'publisher', column: 4},
                            {label: 'translator', column: 5},
                            {label: 'comment', column: 6},
                            {label: 'finished', column: 7},
                            {label: 'abandoned', column: 8}
                        ]}
                        tableRef={tableRef}
                    />

                    <ModelTableSorting
                        model="anime"
                        columns={['title', 'status', 'created_at']}
                        updateTableItems={updateSortedAnimeItems}
                    />

                    <div className="overflow-x-auto">
                        <ModelTable
                            model="anime"
                            columns={["title", "season", "episode", "genre", "publisher", "translator", "comment", "finished", "abandoned"]}
                            ref={tableRef}
                        >
                            {animeItems.map((anime) => (
                                <RowAnime key={anime.id} anime={anime} onDelete={handleDestroyAnime} />
                            ))}
                        </ModelTable>
                    </div>
                </div>
            </div>
        </div>
    </AuthenticatedLayout>
    )
}
