import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import { useEffect } from 'react';
import FormNewGame from './FormNewGame';
import RowGame from './RowGame';

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

                        <table className="border-separate border-spacing-2 border border-slate-500 w-full">
                            <thead>
                                <tr className="bg-slate-700">
                                    <th className="text-start">Название</th>
                                    <th>Жанр</th>
                                    <th>Разработчик</th>
                                    <th>Издатель</th>
                                    <th>Комментарий</th>
                                    <th>Завершен</th>
                                    <th>Заброшен</th>
                                </tr>
                            </thead>
                            <tbody>
                                {games.map((game) => (
                                    <RowGame key={game.id} game={game} />
                                ))}
                            </tbody>
                        </table>

                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
