import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import { useEffect, useRef } from 'react';
import FormNewManga from './FormNewManga';
import RowManga from './RowManga';
import ShowingTableCol from '@/Components/ShowingTableCol';
import ModelTable from '@/Components/ModelTable';

export default function Manga({auth, mangas, manga, action}) {
    const { data, setData, post } = useForm({
        title: '',
        volume: '',
        chapter: '',
        genre: '',
        creators: '',
        comment: '',
        finished: false,
        abandoned: false,
    });
    const tableRef = useRef(null);

    const hideForm = () => {
        document.querySelector("#form-manga").classList.toggle("hidden");
    }

    useEffect(() => {
        if (manga) {
            if (action == "create") {
                mangas.push(manga);
            } else if (action == "update") {
                mangas = mangas.map((item) => {
                    if (item.id == manga.id) {
                        return {...item, ...manga};
                    }
                    return item;
                });
            }
        }
    }, [manga, action]);

  return (
    <AuthenticatedLayout
        user={auth.user}
        header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Манга</h2>}
    >
        <Head title="Manga" />
        <div className="py-12">
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg p-6 flex flex-col gap-y-4">

                    <FormNewManga id="form-manga" data={data} setData={setData} post={post} />

                    <div className="flex-1 p-2 border-2 border-emerald-400 bg-emerald-400/20 hover:bg-emerald-400/40 text-white text-center cursor-pointer" onClick={hideForm}>манга</div>

                    <ShowingTableCol
                        model="manga"
                        columns={[
                            {label: 'volume', column: 1},
                            {label: 'chapter', column: 2},
                            {label: 'genre', column: 3},
                            {label: 'creators', column: 4},
                            {label: 'comment', column: 5},
                            {label: 'finished', column: 6},
                            {label: 'abandoned', column: 7}
                        ]}
                        tableRef={tableRef}
                    />

                    <div className="overflow-x-auto">
                        <ModelTable
                            model="manga"
                            columns={["title", "volume", "chapter", "genre", "creators", "comment", "finished", "abandoned"]}
                            ref={tableRef}
                        >
                            {mangas.map((manga) => (
                                <RowManga key={manga.id} manga={manga} />
                            ))}
                        </ModelTable>
                    </div>
                </div>
            </div>
        </div>
    </AuthenticatedLayout>
  )
}
