import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import { useEffect, useRef, useState } from 'react';
import FormNewCartoon from './FormNewCartoon';
import RowCartoon from './RowCartoon';
import ShowingTableCol from '@/Components/ShowingTableCol';
import ModelTable from '@/Components/ModelTable';
import ModelTableSorting from '@/Components/ModelTableSorting';
import TableControls from '@/Components/Table/TableControls';

export default function Cartoons({auth, cartoons, cartoon, action}) {
    const [cartoonsItems, setCartoonsItems] = useState(cartoons);

    const { data, setData, post } = useForm({
        title: '',
        genre: '',
        year: '',
        publisher: '',
        comment: '',
        status_id: 1,
    });
    const tableRef = useRef(null);

    const hideForm = () => {
        document.querySelector("#form-cartoon").classList.toggle("hidden");
    }

    useEffect(() => {
        if (cartoon) {
            let newCartoonsItems;
            if (action == "create") {
                newCartoonsItems = [...cartoonsItems, cartoon];
            } else if (action == "update") {
                newCartoonsItems = cartoonsItems.map((item) => {
                    if (item.id == cartoon.id) {
                        return {...item, ...cartoon};
                    }
                    return item;
                });

            }
            setCartoonsItems(newCartoonsItems);
        }
    }, [cartoon, action]);

    const updateSortedCartoonsItems = (sortedCartoons) => {
        setCartoonsItems(sortedCartoons);
    }

    const handleDestroyCartoon = (id) => {
        let newCartoonsItems = cartoonsItems.filter(item => item.id != id);
        setCartoonsItems(newCartoonsItems);
    }

    return (
        <AuthenticatedLayout
        user={auth.user}
        header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Мультфильмы</h2>}
    >
        <Head title="Cartoons" />
        <div className="py-12">
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg p-6 flex flex-col gap-y-4">

                    <FormNewCartoon className="hidden" id="form-cartoon" data={data} setData={setData} post={post} />

                    <div
                        className="flex-1 p-2 border-2 rounded-lg border-blue-400 bg-blue-400/20 hover:bg-blue-400/40 dark:text-white text-center cursor-pointer"
                        onClick={hideForm}
                        title="Показать форму добавления"
                    >
                        мультфильмы
                    </div>

                    <TableControls>
                        <ShowingTableCol
                            model="cartoons"
                            columns={[
                                {label: 'genre', column: 1},
                                {label: 'year', column: 2},
                                {label: 'publisher', column: 3},
                                {label: 'comment', column: 4},
                                {label: 'status_id', column: 5},
                            ]}
                            tableRef={tableRef}
                        />

                        <ModelTableSorting
                            model="cartoons"
                            columns={['title', 'status', 'created_at']}
                            updateTableItems={updateSortedCartoonsItems}
                        />
                    </TableControls>

                    <div className="overflow-x-auto">
                        <ModelTable
                            model="cartoons"
                            columns={["title", "genre", "year", "publisher", "comment", "status"]}
                            ref={tableRef}
                        >
                            {cartoonsItems.map((cartoon) => (
                                <RowCartoon key={cartoon.id} cartoon={cartoon} onDelete={handleDestroyCartoon} />
                            ))}
                        </ModelTable>
                    </div>
                </div>
            </div>
        </div>
    </AuthenticatedLayout>
    )
}
