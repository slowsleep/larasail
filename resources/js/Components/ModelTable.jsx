import { useEffect, useState, forwardRef } from 'react'
import { hideTableColumn } from '@/Utils/tableUtils';

/**
 * @param {string} model - model name for localStorage (recommended camelCase)
 * @param {array} columns - array of column names
 */
const ModelTable = forwardRef((props, ref) => {
    const {children, model, className, columns, id} = props;
    const [hiddenColumns, setHiddenColumns] = useState([]);

    useEffect(() => {
        const columnsVisibility = JSON.parse(localStorage.getItem('tableColumnsVisibility'))[model] || [];
        const hiddenCols = columnsVisibility
            .filter(col => col.hidden)
            .map(col => col.column);

        setHiddenColumns(hiddenCols);
    }, []);

    useEffect(() => {
        hiddenColumns.forEach(col => hideTableColumn(ref, col, true));
    }, [hiddenColumns]);

    return (
        <table
            className={"border-collapse border border-slate-500 text-sm sm:text-base w-full " + (className ?? '')}
            ref={ref}
            id={id}
        >
            <thead>
                <tr className="dark:bg-slate-700 bg-slate-200">
                    {columns.map((col, i) => (
                        <th key={i} className={i == 0 ? 'text-start' : ''}>{col}</th>
                    ))}
                </tr>
            </thead>
            <tbody>{children}</tbody>
        </table>
    )
})

export default ModelTable;
