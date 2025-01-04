import axios from "axios";

/**
 *
 * @param {string} model - model name as in router
 * @returns
 */
export default function ModelTableSorting({ model, columns, updateTableItems }) {
    const showSortingMenu = () => {
        document.querySelector("#sorting-menu").classList.toggle("hidden");
    }

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
        <>
            <button className="border rounded border-gray-600 w-fit p-2" onClick={showSortingMenu}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 7.5 7.5 3m0 0L12 7.5M7.5 3v13.5m13.5 0L16.5 21m0 0L12 16.5m4.5 4.5V7.5" />
                </svg>
            </button>

            <div className="p-2 border border-gray-600 my-2 overflow-y-auto hidden" id="sorting-menu">
                <h3>Сортировка по:</h3>
                <div className="flex flex-row justify-between">
                    {columns.map((col, index) => (
                        <div className="p-2 border border-gray-600 my-2 w-full" key={index}>
                            <h4 className="text-center">{col}</h4>
                            <div className="flex flex-row justify-center gap-x-2">
                            {col == "status" ?
                                <>
                                    <button className="hover:bg-gray-300 p-1 rounded" onClick={handleInProgress(col)}>В процессе</button>
                                    <button className="hover:bg-gray-300 p-1 rounded" onClick={handleFinished(col)}>Завершен</button>
                                    <button className="hover:bg-gray-300 p-1 rounded" onClick={handleAbandoned(col)}>Заброшен</button>
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
        </>
    );
}
