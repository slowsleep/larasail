import { useEffect, useState } from 'react'
import { hideTableColumn } from '@/Utils/tableUtils';

/**
 * @param {array} columns - array of objects with column name (label) and column number, for example [{label: "title", column: 0}]
 */
export default function ShowingTableCol({model, columns, tableRef}) {
    const [tableCols, setTableCols] = useState(JSON.parse(localStorage.getItem('tableColumnsVisibility')) ?? {});

    useEffect(() => {
        if (!tableCols.hasOwnProperty(model)) {
            const newTableCols = {
                ...tableCols,
                [model]: columns.map(col => ({ ...col, hidden: false }))
            };
            setTableCols(newTableCols);
            localStorage.setItem('tableColumnsVisibility', JSON.stringify(newTableCols));
        }
    }, [tableCols]);

    const hideColumn = (e) => {
        const column = e.target.dataset.column;
        hideTableColumn(tableRef, column);
        let modelTable = tableCols[model] ?? columns.map(col => ({...col, hidden: false}));
        modelTable = modelTable.map((col) => {
            if (col.column == column) {
                return {...col, hidden: !col.hidden};
            }
            return col;
        });
        tableCols[model] = modelTable;
        localStorage.setItem('tableColumnsVisibility', JSON.stringify(tableCols));
    }

    const showColsControl = () => {
        document.querySelector("#cols-control").classList.toggle("hidden");
    }

    return (
        <>
            <button className="border rounded border-gray-600 w-fit p-2" onClick={showColsControl}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                </svg>
            </button>

            <div className="p-2 border border-gray-600 my-2 overflow-y-auto hidden" id="cols-control">
                <h3>Показ колонок</h3>
                <div className="flex flex-row gap-x-4">
                    {tableCols[model] ? tableCols[model].map((item) => (
                        <div className="flex flex-col items-center" key={item.column}>
                            <label>{item.label}</label>
                            <input
                                type="checkbox"
                                data-column={item.column}
                                defaultChecked={!item.hidden}
                                onChange={hideColumn}
                            ></input>
                        </div>
                    ))
                    :
                        'wait...'
                    }
                </div>
            </div>
        </>
    )
}
