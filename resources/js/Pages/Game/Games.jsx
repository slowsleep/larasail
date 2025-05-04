import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import { useEffect, useRef, useState } from 'react';
import FormNewGame from './FormNewGame';
import RowGame from './RowGame';
import ShowingTableCol from '@/Components/ShowingTableCol';
import ModelTable from '@/Components/ModelTable';
import ModelTableSorting from '@/Components/ModelTableSorting';
import TableControls from '@/Components/Table/TableControls';

export default function Games({auth, games, game, action}) {
    const [gamesItems, setGamesItems] = useState(games);

    const { data, setData, post } = useForm({
        title: '',
        genre: '',
        developer: '',
        publisher: '',
        comment: '',
        'status_id': 1,
    });
    const tableRef = useRef(null);

    const hideForm = () => {
        document.querySelector("#form-game").classList.toggle("hidden");
    }

    useEffect(() => {
        if (game) {
            let newGamesItems;
            if (action == "create") {
                newGamesItems = [...gamesItems, game];
            } else if (action == "update") {
                newGamesItems = gamesItems.map((item) => {
                    if (item.id == game.id) {
                        return {...item, ...game};
                    }
                    return item;
                });

            }
            setGamesItems(newGamesItems);
        }
    }, [game, action]);

    const updateSortedGamesItems = (sortedGames) => {
        setGamesItems(sortedGames);
    }

    const handleDestroyGame = (id) => {
        let newGamesItems = gamesItems.filter(item => item.id != id);
        setGamesItems(newGamesItems);
    }

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Игры</h2>}
        >
            <Head title="Games" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg p-6 flex flex-col gap-y-4">

                        <FormNewGame className="hidden" id="form-game" data={data} setData={setData} post={post} />

                        <div
                            className="flex-1 p-2 border-2 rounded-lg border-violet-400 bg-violet-400/20 hover:bg-violet-400/40 dark:text-white text-center cursor-pointer"
                            onClick={hideForm}
                            title="Показать форму добавления"
                        >
                            игры
                        </div>

                        <TableControls>
                            <ShowingTableCol
                                model="games"
                                columns={[
                                    {label: 'genre', column: 1},
                                    {label: 'developer', column: 2},
                                    {label: 'publisher', column: 3},
                                    {label: 'comment', column: 4},
                                    {label: 'status_id', column: 5},
                                ]}
                                tableRef={tableRef}
                            />

                            <ModelTableSorting
                                model="games"
                                columns={['title', 'status', 'created_at']}
                                updateTableItems={updateSortedGamesItems}
                            />
                        </TableControls>

                        <div className="overflow-x-auto">
                            <ModelTable
                                model="games"
                                columns={["title", "genre", "developer", "publisher", "comment", "status"]}
                                ref={tableRef}
                            >
                                {gamesItems.map((game) => (
                                    <RowGame key={game.id} game={game} onDelete={handleDestroyGame} />
                                ))}
                            </ModelTable>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
