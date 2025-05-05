import { useEffect, useState } from 'react'
import { hideTableColumn } from '@/Utils/tableUtils';

/**
 * @param {string} model - model name for localStorage (like in DB)
 * @param {array} columns - array of objects with column name (like in DB) and column number in table, for example [{label: "title", column: 0}]
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

    return (
        <div className="p-2 border border-gray-600 my-2 overflow-y-auto hidden dark:bg-gray-700/50 dark:text-white" id="cols-control">
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
    )
}
