import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import { useEffect, useRef } from 'react';
import FormNewGame from './FormNewGame';
import RowGame from './RowGame';
import ShowingTableCol from '@/Components/ShowingTableCol';
import ModelTable from '@/Components/ModelTable';

export default function Games({auth, games, game, action}) {
    const { data, setData, post } = useForm({
        title: '',
        genre: '',
        developer: '',
        publisher: '',
        comment: '',
        finished: false,
        abandoned: false,
    });
    const tableRef = useRef(null);

    const hideForm = () => {
        document.querySelector("#form-game").classList.toggle("hidden");
    }

    useEffect(() => {
        if (game) {
            if (action == "create") {
                games.push(game);
            } else if (action == "update") {
                games = games.map((item) => {
                    if (item.id == game.id) {
                        return {...item, ...game};
                    }
                    return item;
                });
            }
        }
    }, [game, action]);

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Игры</h2>}
        >
            <Head title="Games" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg p-6 flex flex-col gap-y-4">

                        <FormNewGame id="form-game" data={data} setData={setData} post={post} />

                        <div className="flex-1 p-2 border-2 border-violet-400 bg-violet-400/20 hover:bg-violet-400/40 text-white text-center cursor-pointer" onClick={hideForm}>игры</div>

                        <ShowingTableCol
                            model="games"
                            columns={[
                                {label: 'genre', column: 1},
                                {label: 'developer', column: 2},
                                {label: 'publisher', column: 3},
                                {label: 'comment', column: 4},
                                {label: 'finished', column: 5},
                                {label: 'abandoned', column: 6}
                            ]}
                            tableRef={tableRef}
                        />

                        <div className="overflow-x-auto">
                            <ModelTable
                                model="games"
                                columns={["title", "genre", "developer", "publisher", "comment", "finished", "abandoned"]}
                                ref={tableRef}
                            >
                                {games.map((game) => (
                                    <RowGame key={game.id} game={game} />
                                ))}
                            </ModelTable>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
