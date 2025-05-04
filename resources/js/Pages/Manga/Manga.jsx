import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import { useEffect, useRef, useState } from 'react';
import FormNewManga from './FormNewManga';
import RowManga from './RowManga';
import ShowingTableCol from '@/Components/ShowingTableCol';
import ModelTable from '@/Components/ModelTable';
import ModelTableSorting from '@/Components/ModelTableSorting';
import TableControls from '@/Components/Table/TableControls';

export default function Manga({auth, mangas, manga, action}) {
    const [mangasItems, setMangasItems] = useState(mangas);

    const { data, setData, post } = useForm({
        title: '',
        volume: 1,
        chapter: 0,
        genre: '',
        creators: '',
        comment: '',
        status_id: 1,
    });
    const tableRef = useRef(null);

    const hideForm = () => {
        document.querySelector("#form-manga").classList.toggle("hidden");
    }

    useEffect(() => {
        if (manga) {
            let newMangasItems;
            if (action == "create") {
                newMangasItems = [...mangasItems, manga];
            } else if (action == "update") {
                newMangasItems = mangasItems.map((item) => {
                    if (item.id == manga.id) {
                        return {...item, ...manga};
                    }
                    return item;
                });

            }
            setMangasItems(newMangasItems);
        }
    }, [manga, action]);

    const updateSortedMangasItems = (sortedMangas) => {
        setMangasItems(sortedMangas);
    }

    const handleDestroyManga = (id) => {
        let newMangasItems = mangasItems.filter(item => item.id != id);
        setMangasItems(newMangasItems);
    }

  return (
    <AuthenticatedLayout
        user={auth.user}
        header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Манга</h2>}
    >
        <Head title="Manga" />
        <div className="py-12">
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg p-6 flex flex-col gap-y-4">

                    <FormNewManga className="hidden" id="form-manga" data={data} setData={setData} post={post} />

                    <div
                        className="flex-1 p-2 border-2 border-emerald-400 bg-emerald-400/20 hover:bg-emerald-400/40 dark:text-white text-center cursor-pointer"
                        onClick={hideForm}
                        title="Показать форму добавления"
                    >
                        манга
                    </div>

                    <TableControls>
                        <ShowingTableCol
                            model="manga"
                            columns={[
                                {label: 'volume', column: 1},
                                {label: 'chapter', column: 2},
                                {label: 'genre', column: 3},
                                {label: 'creators', column: 4},
                                {label: 'comment', column: 5},
                                {label: 'status_id', column: 6},
                            ]}
                            tableRef={tableRef}
                        />

                        <ModelTableSorting
                            model="mangas"
                            columns={['title', 'status', 'created_at']}
                            updateTableItems={updateSortedMangasItems}
                        />
                    </TableControls>

                    <div className="overflow-x-auto">
                        <ModelTable
                            model="manga"
                            columns={["title", "volume", "chapter", "genre", "creators", "comment", "status"]}
                            ref={tableRef}
                        >
                            {mangasItems.map((manga) => (
                                <RowManga key={manga.id} manga={manga} onDelete={handleDestroyManga} />
                            ))}
                        </ModelTable>
                    </div>
                </div>
            </div>
        </div>
    </AuthenticatedLayout>
  )
}
