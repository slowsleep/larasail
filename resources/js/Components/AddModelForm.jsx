export default function AddModelForm({id, listInputs, ...props}) {

    return (
        <form className="w-full flex text-white items-center justify-between" id={id} {...props}>
            {listInputs.map((item) => (
                <div className={"flex flex-1 flex-col " + (item.type == "checkbox" || item.type == "number" ? "items-center" : "")} key={item.name}>
                    <label>{item.label}</label>
                    <input
                        className={(item.type == "checkbox" ? "m-1" : "text-black") + " " + (item.type == "number" ? "w-20" : "") + (item.class ? " " + item.class : "")}
                        {...item}
                    />
                 </div>
            ))}
            <button className="p-4 rounded bg-emerald-600 hover:bg-emerald-800" type="submit">Добавить</button>
        </form>
    )
}


