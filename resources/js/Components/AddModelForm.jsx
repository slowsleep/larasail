export default function AddModelForm({className = '', id, listInputs, ...props}) {

    return (
        <form className={"w-full flex flex-col lg:flex-row dark:text-white items-center justify-between" + (className ? " " + className : "")} id={id} {...props}>
            {listInputs.map((item) => {
                let { className, ...filteredItem } = item;
                return (
                <div className={"flex flex-1 lg:flex-col flex-row items-center justify-between float-left w-full " + (item.type == "checkbox" || item.type == "number" ? "items-center" : "")} key={item.name}>
                    <label>{item.label}</label>
                    {item.type == "select" ?
                        <select
                            {...filteredItem}
                            className={
                                "bg-transparent " +
                                (item.color ? " " + item.color : "") +
                                (className ? " " + className : "")
                            }
                        >
                            {Object.keys(item.options).map((key) => (
                                <option key={key} value={key}>
                                    {item.options[key]}
                                </option>
                            ))}
                        </select>
                    :
                        <input
                            className={(item.type == "checkbox" ? "m-1" : "text-black") + " " + (item.type == "number" ? "w-20" : item.type == "text" ? "w-full" : "") + (className ? " " + className : "")}
                            {...filteredItem}
                        />
                    }
                    </div>
                )
            })}
            <button className="p-4 rounded bg-emerald-600 hover:bg-emerald-800 w-full lg:w-auto" type="submit">Добавить</button>
        </form>
    )
}


