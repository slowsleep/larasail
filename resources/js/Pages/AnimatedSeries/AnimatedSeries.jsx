import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import { useEffect, useRef, useState } from 'react';
import FormNewAnimatedSeries from './FormNewAnimatedSeries';
import RowAnimatedSeries from './RowAnimatedSeries';
import ShowingTableCol from '@/Components/ShowingTableCol';
import ModelTable from '@/Components/ModelTable';
import ModelTableSorting from '@/Components/ModelTableSorting';
import TableControls from '@/Components/Table/TableControls';


export default function AnimatedSeries({auth, animatedSeries, singleAnimatedSeries, action}) {
    const [animatedSeriesItems, setAnimatedSeriesItems] = useState(animatedSeries);

    const { data, setData, post } = useForm({
        title: '',
        season: 1,
        episode: 0,
        genre: '',
        year: '',
        publisher: '',
        comment: '',
        status_id: 1,
    });
    const tableRef = useRef(null);

    const hideForm = () => {
        document.querySelector("#form-animatedSeries").classList.toggle("hidden");
    }

    useEffect(() => {
        if (singleAnimatedSeries) {
            let newAnimatedSeriesItems;
            if (action == "create") {
                newAnimatedSeriesItems = [...animatedSeriesItems, singleAnimatedSeries];
            } else if (action == "update") {
                newAnimatedSeriesItems = animatedSeriesItems.map((item) => {
                    if (item.id == singleAnimatedSeries.id) {
                        return {...item, ...singleAnimatedSeries};
                    }
                    return item;
                });

            }
            setAnimatedSeriesItems(newAnimatedSeriesItems);
        }
    }, [singleAnimatedSeries, action]);

    const updateSortedAnimatedSeriesItems = (sortedAnimatedSeries) => {
        setAnimatedSeriesItems(sortedAnimatedSeries);
    }

    const handleDestroyAnimatedSeries = (id) => {
        let newAnimatedSeriesItems = animatedSeriesItems.filter(item => item.id != id);
        setAnimatedSeriesItems(newAnimatedSeriesItems);
    }

    return (
        <AuthenticatedLayout
        user={auth.user}
        header={<h2 className="font-semibold text-xl text-zinc-800 dark:text-zinc-200 leading-tight">Мультсериалы</h2>}
    >
        <Head title="AnimatedSeries" />
        <div className="py-12">
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div className="bg-white dark:bg-zinc-800 overflow-hidden shadow-sm sm:rounded-lg p-6 flex flex-col gap-y-4">

                    <FormNewAnimatedSeries className="hidden" id="form-animatedSeries" data={data} setData={setData} post={post} />

                    <div
                        className="flex-1 p-2 border-2 rounded-lg border-fuchsia-400 bg-fuchsia-400/20 hover:bg-fuchsia-400/40 dark:text-white text-center cursor-pointer"
                        onClick={hideForm}
                        title="Показать форму добавления"
                    >
                        мультсериалы
                    </div>

                    <TableControls>
                        <ShowingTableCol
                            model="animated_series"
                            columns={[
                                {label: 'season', column: 1},
                                {label: 'episode', column: 2},
                                {label: 'genre', column: 3},
                                {label: 'year', column: 4},
                                {label: 'publisher', column: 5},
                                {label: 'comment', column: 6},
                                {label: 'status_id', column: 7},
                            ]}
                            tableRef={tableRef}
                        />

                        <ModelTableSorting
                            model="animated-series"
                            columns={['title', 'status', 'created_at']}
                            updateTableItems={updateSortedAnimatedSeriesItems}
                        />
                    </TableControls>

                    <div className="overflow-x-auto">
                        <ModelTable
                            model="animated_series"
                            columns={["title", "season", "episode", "genre", "year", "publisher", "comment", "status"]}
                            ref={tableRef}
                        >
                            {animatedSeriesItems.map((animatedSeries) => (
                                <RowAnimatedSeries key={animatedSeries.id} animatedSeries={animatedSeries} onDelete={handleDestroyAnimatedSeries} />
                            ))}
                        </ModelTable>
                    </div>
                </div>
            </div>
        </div>
    </AuthenticatedLayout>
    )
}
