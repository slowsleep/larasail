import { useForm } from '@inertiajs/react';
import ModelRow from '@/Components/ModelRow';
import { useEffect, useState } from 'react';
import axios from "axios";

export default function RowMovie ({movie}) {

    const [titleError, setTitleError] = useState(false);
    const [partError, setPartError] = useState(false);

    const [isNumberEdit, setIsNumberEdit] = useState(false);

    const { data, setData, delete: destroy, patch, reset } = useForm({
        id: movie.id,
        title: movie.title,
        part: movie.part,
        comment: movie.comment,
        finished: movie.finished,
        abandoned: movie.abandoned,
    });

    const handleDestroy = () => {
        destroy(route('movies.destroy', {id: movie.id}), {
            preserveScroll: true,
        });
    }

    const handleSave = () =>  {
        axios.patch(route('api.movies.update'), data);
    }

    const handleCancle = () => {
        setTitleError(false);
        setPartError(false);
        reset();
    }

    const partIncrement = () => {
        setData('part', Number(data.part) + 1);
        setIsNumberEdit(true);
    }

    const partDecrement = () => {
        if (data.part - 1 > 0) {
            setData('part', Number(data.part) - 1);
            setIsNumberEdit(true);
        } else if (data.part - 1 == 0) {
            setData('part', null);
            setIsNumberEdit(true);
        }
    }

    useEffect(() => {
        if (isNumberEdit) {
            handleSave();
            setIsNumberEdit(false);
        }
    }, [data.part])

    const inputList = [
        {
            value: data.title,
            type: "text",
            name: "title",
            maxLength: "255",
            title: "Максимальная длина 255 символов",
            onChange: (e) => {
                setData('title', e.target.value);
                if ((e.target.value).length > 0) {
                    setTitleError(false);
                } else {
                    setTitleError(true);
                }
            },
            error: titleError,
        },
        {
            value: data.part ? data.part : "",
            type: "number",
            name: "part",
            min: 0,
            onChange: (e) => {
                setData('part', e.target.value);

                if (e.target.value >= 0) {
                    setPartError(false);
                } else {
                    setPartError(true);
                }

                if (e.target.value == 0) {
                    setData('part', null);
                }
            },
            error: partError,
            onIncrement: partIncrement,
            onDecrement: partDecrement,
        },
        {
            value: data.comment ? data.comment : "",
            type: "text",
            name: "comment",
            maxLength: "255",
            title: "Максимальная длина 255 символов",
            onChange: (e) => setData('comment', e.target.value),
        },
        {
            value: data.finished,
            type: "checkbox",
            name: "finished",
            onChange: (e) => setData('finished', e.target.checked),
            disabled: data.abandoned,
        },
        {
            value: data.abandoned,
            type: "checkbox",
            name: "abandoned",
            onChange: (e) => {
                if (e.target.checked) {
                    setData('finished', false)
                    setData('abandoned', e.target.checked)
                } else {
                    setData('abandoned', e.target.checked)
                }
            },
        }

    ]

    return (
        <ModelRow
            className="odd:bg-cyan-900/40 even:bg-cyan-800/40"
            inputs={inputList}
            data={data}
            setData={setData}
            modelItem={movie}
            modelName={{en: "movies", ru: "фильм"}}
            onSave={handleSave}
            onDestroy={handleDestroy}
            onCancle={handleCancle}
        />
    )
}
