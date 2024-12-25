import { useEffect, useState } from 'react'

/**
 * @param {object} modelName ru - в единственном числе, винительном падеже; en - как в БД
 */
export default function ModelRow({className, inputs, data, setData, modelItem, modelName, onSave, onDestroy, onCancle, ...props}) {
    const [isEdit, setIsEdit] = useState(false);
    const [isFormError, setIsFormError] = useState(false);
    const [tableCols, setTableCols] = useState(JSON.parse(localStorage.getItem('tableColumnsVisibility')) ?? {});
    const [modelTableCols, setModelTableCols] = useState(tableCols[modelName.en] ?? []);

    useEffect(() => {
        let newModelTableCols = JSON.parse(localStorage.getItem('tableColumnsVisibility'))[modelName.en] ?? [];
        setModelTableCols(newModelTableCols);
    }, [isEdit]);

    useEffect(() => {
        if (data.abandoned) {
            setData('finished', false);
        }
    }, [data.abandoned]);

    useEffect(() => {
        let hasError = inputs.some(item => item.error);
        setIsFormError(hasError);
    }, [inputs])

    const handleDestroy = () => {
        if (confirm(`Вы уверены, что хотите удалить ${modelName.ru} "${modelItem.title}"?`)) {
            onDestroy();
        }
    }

    const handleSave = () =>  {
        if (isFormError) return;
        setIsEdit(false);
        onSave();
    }

    const handleCancel = () => {
        setIsEdit(false);
        onCancle();
    }

    const handleEdit = () => {
        setIsEdit(true);
    }
    
    return (
        <tr className={className + " " + (data.abandoned ? "brightness-50 grayscale" : "")
            + (data.finished ? " -hue-rotate-30" : "")
            }
            {...props}
        >
            {inputs.map((item) => {
                const { error, onIncrement, onDecrement, ...filteredItem } = item;
                let isHidden = false;

                if (modelTableCols && modelTableCols.length > 0) {
                    let columnData = modelTableCols.filter(col => col.label == item.name) ?? [];
                    isHidden = columnData[0]?.hidden;
                }

                if (item.type == "checkbox") {
                    return <td className={"p-2 text-white text-center" + (item.className ? " " + item.className : "") + (isHidden ? " hidden" : "")} key={item.name}>
                        {!isEdit ?
                            <input className="bg-transparent" type="checkbox" checked={item.value} disabled />
                            :
                            <input className="bg-transparent" type="checkbox" name={item.name} checked={item.value} onChange={item.onChange} disabled={item.disabled} />
                        }
                    </td>
                } else if (item.type == "number" && item.value > 0) {
                    return <td
                        className={
                            "text-white" +
                            (!isEdit ? " p-2" : "") +
                            (item.className ? " " + item.className : "") +
                            (isHidden ? " hidden" : "")
                        }
                        key={item.name}
                    >
                        {!isEdit ?
                            <div className="flex flex-row">
                                <p className="w-full break-words">
                                    {item.value}
                                </p>
                                {!data.finished && !data.abandoned ?
                                    <div className="flex flex-row">
                                        <button
                                            className="text-green-500 hover:scale-150"
                                            onClick={onIncrement}
                                            >
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                            </svg>
                                        </button>
                                        /
                                        <button
                                            className="text-red-500 hover:scale-150"
                                            onClick={onDecrement}
                                            >
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
                                            </svg>
                                        </button>
                                    </div>
                                : ""}
                            </div>
                            :
                            <input
                                {...filteredItem}
                                className={
                                    "bg-transparent w-full" +
                                    (error && isFormError
                                        ? " border-red-500"
                                        : "")
                                }
                            />
                        }
                    </td>
                } else {
                    return <td
                        className={
                            "text-white" +
                            (!isEdit ? " p-2" : "") +
                            (item.className ? " " + item.className : "") +
                            (isHidden ? " hidden" : "")
                        }
                        key={item.name}
                    >
                        {!isEdit ?
                            <p className="w-full break-words">
                                {item.value}
                            </p>
                            :
                            <input
                                {...filteredItem}
                                className={
                                    "bg-transparent w-full" +
                                    (error && isFormError
                                        ? " border-red-500"
                                        : "")
                                }
                            />
                        }
                    </td>
                }
            })}
            <td className="p-2 flex justify-around">
                {!isEdit ?
                    <>
                        <button className="hover:brightness-50 w-10 flex justify-center" onClick={handleEdit}>
                            <img src="/assets/img/blue-pen.svg" alt="edit" title="edit" />
                        </button>
                        <button className="hover:brightness-50 w-10 flex justify-center" onClick={() => {handleDestroy(modelItem.id)}}>
                            <img src="/assets/img/red-trash.svg" alt="delete" title="delete" />
                        </button>
                    </>
                :
                    <>
                        <button className="hover:brightness-50 w-10 flex justify-center" onClick={() => {handleSave()}}>
                            <img src="/assets/img/save.svg" alt="save" title="save" />
                        </button>
                        <button className="hover:brightness-50 w-10 flex justify-center" onClick={() => {handleCancel()}}>
                            <img src="/assets/img/cancel.svg" alt="cancel" title="cancel" />
                        </button>
                    </>
                }
            </td>
        </tr>
    )
}
