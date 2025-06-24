export default function ModelTableSearch({ model, columns, data, updateTableItems }) {

    const handleSearch = () =>  {
        axios.get(route(`api.${model}.search`), {params: data})
        .then((response) => {
            if (response.status == 200) {
                // обновляем данные в таблице
                updateTableItems(response.data.data);
            }
        })
        .catch(() => {
            console.error("Ошибка при поиске данных");
        });;
    }

    return (
        <div className="flex items-center hidden" id="search">
            { columns.map((col, index) => {
                if (col.type === 'select') {
                    const {options, ...filteredItem} = col;
                    return (
                        <select
                            key={index}
                            className={`border rounded-lg border-zinc-600 p-2 ${col.className || ''}`}
                            name={col.name}
                            value={col.value}
                            onChange={(e) => col.onChange(e)}
                        >
                            <option value="">{col.label}</option>
                            {Object.keys(options).map((key) => (
                                <option key={key} value={key}>
                                    {col.options[key]}
                                </option>
                            ))}
                        </select>
                    );
                } else {
                    return (
                        <input
                            key={index}
                            type={col.type}
                            maxLength={col.maxLength}
                            placeholder={col.label}
                            className={`border rounded-lg border-zinc-600 p-2 ${col.className || ''}`}
                            name={col.name}
                            value={col.value}
                            onChange={(e) => col.onChange(e)}
                        />
                    );
                }
            }) }
            <button
                className="ml-2 border rounded-lg border-zinc-600 p-2 bg-blue-500 text-white hover:bg-blue-600"
                onClick={handleSearch}
            >
                Найти
            </button>
        </div>
    );
}
