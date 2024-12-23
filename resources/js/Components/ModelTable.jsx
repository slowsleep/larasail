import { useEffect, useState, forwardRef } from 'react'
import { hideTableColumn } from '@/Utils/tableUtils';

/**
 * @param {array} columns - array of column names
 */
const ModelTable = forwardRef((props, ref) => {
    const {children, model, className, columns} = props;
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
            className={"border-separate border-spacing-2 border border-slate-500 w-full " + (className ?? '')}
            ref={ref}
        >
            <thead>
                <tr className="bg-slate-700">
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
