import axios from "axios";

/**
 *
 * @param {string} model - model name as in router
 * @returns
 */
export default function ModelTableSorting({ model, columns, updateTableItems }) {
    const handleAsc = (col) => () => {
        axios.get(route('api.' + model + '.sort'), {
            params: {
                sort_by: col,
                sort_order: "asc"
            }
        }).then(response => {
            updateTableItems(response.data.data);
        });
    }

    const handleDesc = (col) => () => {
        axios.get(route('api.' + model + '.sort'), {
            params: {
                sort_by: col,
                sort_order: "desc"
            }
        }).then(response => {
            updateTableItems(response.data.data);
        });
    }

    const handlePlanning = (col) => () => {
        axios.get(route('api.' + model + '.sort'), {
            params: {
                sort_by: col,
                sort_order: "planning"
            }
        }).then(response => {
            updateTableItems(response.data.data);
        });
    }

    const handleInProgress = (col) => () => {
        axios.get(route('api.' + model + '.sort'), {
            params: {
                sort_by: col,
                sort_order: "in-progress"
            }
        }).then(response => {
            updateTableItems(response.data.data);
        });
    }

    const handleFinished = (col) => () => {
        axios.get(route('api.' + model + '.sort'), {
            params: {
                sort_by: col,
                sort_order: "finished"
            }
        }).then(response => {
            updateTableItems(response.data.data);
        });
    }

    const handleAbandoned = (col) => () => {
        axios.get(route('api.' + model + '.sort'), {
            params: {
                sort_by: col,
                sort_order: "abandoned"
            }
        }).then(response => {
            updateTableItems(response.data.data);
        });
    }

    return (
        <div className="p-2 border border-gray-600 my-2 overflow-y-auto hidden dark:bg-gray-700/50 dark:text-white" id="sorting-menu">
            <h3>Сортировка по:</h3>
            <div className="flex flex-row justify-center gap-x-2">
                {columns.map((col, index) => (
                    <div className="p-2 border border-gray-600 my-2 w-auto" key={index}>
                        <h4 className="text-center">{col}</h4>
                        <div className="flex flex-row justify-center gap-x-2">
                        {col == "status" ?
                            <>
                                <button className="hover:bg-gray-300 dark:hover:text-black p-1 rounded" onClick={handlePlanning(col)}>Планирую</button>
                                <button className="hover:bg-gray-300 dark:hover:text-black p-1 rounded" onClick={handleInProgress(col)}>В процессе</button>
                                <button className="hover:bg-gray-300 dark:hover:text-black p-1 rounded" onClick={handleFinished(col)}>Завершен</button>
                                <button className="hover:bg-gray-300 dark:hover:text-black p-1 rounded" onClick={handleAbandoned(col)}>Заброшен</button>
                            </>
                                :
                            <>
                                <button className="hover:bg-gray-300 p-1 rounded" onClick={handleAsc(col)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 6.75 12 3m0 0 3.75 3.75M12 3v18" />
                                    </svg>
                                </button>
                                <button className="hover:bg-gray-300 p-1 rounded" onClick={handleDesc(col)}>
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
