import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import FormNewSeries from './FormNewSeries';
import RowSeries from './RowSeries';
import FormSearchSeries from './FormSearchSeries';
import { useEffect, useRef, useState } from 'react';
import ShowingTableCol from '@/Components/ModelTable/ShowingTableCol';
import ModelTable from '@/Components/ModelTable/ModelTable';
import ModelTableSorting from '@/Components/ModelTable/ModelTableSorting';
import TableControls from '@/Components/ModelTable/TableControls';

export default function Series({ auth, series, singleSeries, action }) {
    const [seriesItems, setSeriesItems] = useState(series);

    const { data, setData, post } = useForm({
        title: '',
        year: '',
        genre: '',
        season: 1,
        episode: 0,
        comment: '',
        status_id: 1,
    });
    const tableRef = useRef(null);

    const hideForm = () => {
        document.querySelector("#form-series").classList.toggle("hidden");
    }

    useEffect(() => {
        if (singleSeries) {
            let newSeriesItems;
            if (action == "create") {
                newSeriesItems = [...seriesItems, singleSeries];
            } else if (action == "update") {
                newSeriesItems = seriesItems.map((item) => {
                    if (item.id == singleSeries.id) {
                        return {...item, ...singleSeries};
                    }
                    return item;
                });

            }
            setSeriesItems(newSeriesItems);
        }
    }, [singleSeries, action]);

    const updateSortedSeriesItems = (sortedSeries) => {
        setSeriesItems(sortedSeries);
    }

    const updateFoundSeriesItems = (foundSeries) => {
        setSeriesItems(foundSeries);
    }

    const handleDestroySeries = (id) => {
        let newSeriesItems = seriesItems.filter(item => item.id != id);
        setSeriesItems(newSeriesItems);
    }

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-zinc-800 dark:text-zinc-200 leading-tight">Сериалы</h2>}
        >
            <Head title="Series" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-zinc-800 overflow-hidden shadow-sm sm:rounded-lg p-6 flex flex-col gap-y-4">

                        <FormNewSeries className="hidden" id="form-series" data={data} setData={setData} post={post} />

                        <div
                            className="flex-1 p-2 border-2 rounded-lg border-pink-400 bg-pink-400/20 hover:bg-pink-400/40 dark:text-white text-center cursor-pointer"
                            onClick={hideForm}
                            title="Показать форму добавления"
                        >
                            сериалы
                        </div>

                        <TableControls>
                            <ShowingTableCol
                                model="series"
                                columns={[
                                    {label: 'season', column: 1},
                                    {label: 'episode', column: 2},
                                    {label: 'year', column: 3},
                                    {label: 'genre', column: 4},
                                    {label: 'comment', column: 5},
                                    {label: 'status_id', column: 6},
                                ]}
                                tableRef={tableRef}
                            />

                            <ModelTableSorting
                                model="series"
                                columns={['title', 'status', 'created_at']}
                                updateTableItems={updateSortedSeriesItems}
                            />

                            <FormSearchSeries
                                model="series"
                                updateTableItems={updateFoundSeriesItems}
                            />
                        </TableControls>

                        <div className="overflow-x-auto">
                            <ModelTable
                                model="series"
                                columns={["title", "season", "episode", "year", "genre", "comment", "status"]}
                                ref={tableRef}
                            >
                                {seriesItems.map((singleSeries) => (
                                    <RowSeries key={singleSeries.id} singleSeries={singleSeries} onDelete={handleDestroySeries} />
                                ))}
                            </ModelTable>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    )
}
