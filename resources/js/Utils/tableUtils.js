export const hideTableColumn = (tableRef, column, onlyHead=false) => {
    const table = tableRef.current;
    const thead = table.querySelector('thead');
    const tr = thead.querySelector('tr');
    const th = tr.querySelectorAll('th');

    th.forEach((th, i) => {
        if (i == column) {
            th.classList.toggle('hidden');
        }
    });

    if (!onlyHead) {
        const tbody = table.querySelector('tbody');
        const rows = tbody.querySelectorAll('tr');

        rows.forEach(row => {
            const cells = row.querySelectorAll('td');
            
            cells.forEach((cell, i) => {
                if (i == column) {
                    cell.classList.toggle('hidden');
                }
            });
        });
    }
}
