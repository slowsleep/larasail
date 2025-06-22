import axios from "axios";
import { useEffect, useState } from "react";

/**
 *
 * @param {string} model - model name as in router
 * @returns
 */
export default function ModelTableSorting({ model, columns, updateTableItems }) {

    const [sortingPrefs, setSortingPrefs] = useState(() => {
        const stored = localStorage.getItem('tableSortingPreferences');
        return stored ? JSON.parse(stored) : {};
    });

    useEffect(() => {
        const modelSort = sortingPrefs[model];
        if (modelSort) {
            axios.get(route(`api.${model}.sort`), {
                params: modelSort
            }).then(res => {
                updateTableItems(res.data.data);
            });
        }
    }, []);

    const handleSort = (sort_by, sort_order) => () => {
        const newPrefs = {
            ...sortingPrefs,
            [model]: { sort_by, sort_order }
        };
        setSortingPrefs(newPrefs);
        localStorage.setItem('tableSortingPreferences', JSON.stringify(newPrefs));

        axios.get(route(`api.${model}.sort`), {
            params: { sort_by, sort_order }
        }).then(res => {
            updateTableItems(res.data.data);
        });
    };

    return (
        <div className="p-2 border border-zinc-600 my-2 overflow-y-auto hidden dark:bg-zinc-700/50 dark:text-white" id="sorting-menu">
            <h3>Сортировка по:</h3>
            <div className="flex flex-row md:justify-center sm:justify-start gap-x-2">
                {columns.map((col, index) => (
                    <div className="p-2 border border-zinc-600 my-2 w-auto" key={index}>
                        <h4 className="text-center">{col}</h4>
                        <div className="flex flex-row justify-center gap-x-2">
                        {col == "status" ?
                            <>
                                <button className="hover:bg-zinc-300 dark:hover:text-black p-1 rounded" onClick={handleSort(col, "planning")}>Планирую</button>
                                <button className="hover:bg-zinc-300 dark:hover:text-black p-1 rounded" onClick={handleSort(col, "in-progress")}>В процессе</button>
                                <button className="hover:bg-zinc-300 dark:hover:text-black p-1 rounded" onClick={handleSort(col, "finished")}>Завершен</button>
                                <button className="hover:bg-zinc-300 dark:hover:text-black p-1 rounded" onClick={handleSort(col, "abandoned")}>Заброшен</button>
                            </>
                                :
                            <>
                                <button className="hover:bg-zinc-300 p-1 rounded" onClick={handleSort(col, "asc")}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 6.75 12 3m0 0 3.75 3.75M12 3v18" />
                                    </svg>
                                </button>
                                <button className="hover:bg-zinc-300 p-1 rounded" onClick={handleSort(col, "desc")}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25 12 21m0 0-3.75-3.75M12 21V3" />
                                    </svg>
                                </button>
                            </>
                        }
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
