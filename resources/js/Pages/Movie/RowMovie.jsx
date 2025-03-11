import { useForm } from '@inertiajs/react';
import ModelRow from '@/Components/ModelRow';
import { useEffect, useState } from 'react';
import axios from "axios";
import { STATUSES } from '@/constants.js';

export default function RowMovie ({movie, onDelete}) {

    const [titleError, setTitleError] = useState(false);
    const [partError, setPartError] = useState(false);

    const [isNumberEdit, setIsNumberEdit] = useState(false);
    const [isStatusEdit, setIsStatusEdit] = useState(false);

    const { data, setData, delete: destroy, patch, reset } = useForm({
        id: movie.id,
        title: movie.title,
        part: movie.part,
        comment: movie.comment,
        status_id: movie.status_id,
    });

    const handleDestroy = () => {
        destroy(route('movies.destroy', {id: movie.id}), {
            preserveScroll: true,
        });
        onDelete(movie.id);
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

    const handleStatusChange = (value) => {
        setData('status_id', Number(value));
        setIsStatusEdit(true);
    }

    useEffect(() => {
        if (isNumberEdit) {
            handleSave();
            setIsNumberEdit(false);
        } else if (isStatusEdit) {
            handleSave();
            setIsStatusEdit(false);
        }
    }, [data.part, data.status_id]);

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
            value: Number(data.status_id),
            type: "select",
            name: "status_id",
            onChange: (e) => handleStatusChange(e.target.value),
            options: STATUSES,
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
