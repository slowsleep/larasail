import { useEffect, useState } from 'react'

export default function ModelRow({className, inputs, data, setData, modelItem, modelName, onSave, onDestroy, reset, ...props}) {
    const [idEdit, setIdEdit] = useState(false);

    useEffect(() => {
        if (data.abandoned) {
            setData('finished', false);
        }
    }, [data.abandoned]);

    const handleDestroy = () => {
        if (confirm(`Вы уверены, что хотите удалить ${modelName} "${modelItem.title}"?`)) {
            onDestroy();
        }
    }

    const handleSave = () =>  {
        setIdEdit(false);
        onSave();
    }

    return (
        <tr className={className + " " + (data.abandoned ? "brightness-50 grayscale" : "")} {...props}>
            {inputs.map((item) => {
                if (item.type == "checkbox") {
                    return <td className="p-2 text-white text-center" key={item.name}>
                        {!idEdit ?
                            <input className="bg-transparent " type="checkbox" checked={item.value} disabled />
                            :
                            <input className="bg-transparent" type="checkbox" name={item.name} checked={item.value} onChange={item.onChange} disabled={item.disabled} />
                        }
                    </td>
                } else {
                    return <td className="p-2 text-white" key={item.name}>
                        {!idEdit ?
                            <p>{item.value}</p>
                            :
                            <input className={"bg-transparent " + (item.type == "number" ? "w-20" : "")} type={item.type} name={item.name} value={item.value} onChange={item.onChange} {...item} />
                        }
                    </td>
                }
            })}
            <td className="p-2 flex justify-around">
                {!idEdit ?
                    <>
                        <button className="hover:brightness-50" onClick={() => {setIdEdit(true)}}><img src="assets/img/blue-pen.svg" alt="edit" title="edit" /></button>
                        <button className="hover:brightness-50" onClick={() => {handleDestroy(modelItem.id)}}><img src="assets/img/red-trash.svg" alt="delete" title="delete" /></button>
                    </>
                :
                    <>
                        <button className="hover:brightness-50" onClick={() => {handleSave()}}><img src="assets/img/save.svg" alt="save" title="save" /></button>
                        <button className="hover:brightness-50" onClick={() => {setIdEdit(false); reset()}}><img src="assets/img/cancel.svg" alt="cancel" title="cancel" /></button>
                    </>
                }
            </td>
        </tr>
    )
}
