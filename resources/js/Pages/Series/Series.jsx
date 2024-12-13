import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import FormNewSeries from './FormNewSeries';
import RowSeries from './RowSeries';
import { useEffect } from 'react';

export default function Series({ auth, series, singleSeries, action }) {
    const { data, setData, post } = useForm({
        title: '',
        season: '',
        episode: '',
        comment: '',
        finished: false,
        abandoned: false,
    });

    const hideForm = () => {
        document.querySelector("#form-series").classList.toggle("hidden");
    }

    useEffect(() => {
        if (singleSeries) {
            if (action == "create") {
                series.push(singleSeries);
            } else if (action == "update") {
                series = series.map((item) => {
                    if (item.id == singleSeries.id) {
                        return {...item, ...singleSeries};
                    }
                    return item;
                });
            }
        }
    }, [singleSeries, action]);

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Сериалы</h2>}
        >
            <Head title="Series" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg p-6 flex flex-col gap-y-4">

                        <FormNewSeries id="form-series" data={data} setData={setData} post={post} />

                        <div className="flex-1 p-2 border-2 border-pink-400 bg-pink-400/20 hover:bg-pink-400/40 text-white text-center cursor-pointer" onClick={hideForm}>сериалы</div>

                        <div className="overflow-x-auto">
                            <table className="border-separate border-spacing-2 border border-slate-500">
                                <thead>
                                    <tr className="bg-slate-700">
                                        <th className="text-start">Название</th>
                                        <th>Сезон</th>
                                        <th>Серия</th>
                                        <th>Комментарий</th>
                                        <th>Завершен</th>
                                        <th>Заброшен</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {series.map((singleSeries) => (
                                        <RowSeries key={singleSeries.id} singleSeries={singleSeries} />
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    )
}
