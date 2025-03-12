import { useForm } from '@inertiajs/react';
import ModelRow from '@/Components/ModelRow';
import { useEffect, useState } from 'react';
import axios from "axios";
import { STATUSES } from '@/constants.js';

export default function RowMovie ({movie, onDelete}) {

    const [titleError, setTitleError] = useState(false);
    const [yearError, setYearError] = useState(false);

    const [isNumberEdit, setIsNumberEdit] = useState(false);
    const [isStatusEdit, setIsStatusEdit] = useState(false);

    const { data, setData, delete: destroy, patch, reset } = useForm({
        id: movie.id,
        title: movie.title,
        year: movie.year,
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
        setYearError(false);
        reset();
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
    }, [data.year, data.status_id]);

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
            value: data.year ? data.year : "",
            type: "number",
            name: "year",
            min: 0,
            onChange: (e) => {
                setData('year', e.target.value);

                if (e.target.value >= 0) {
                    setYearError(false);
                } else {
                    setYearError(true);
                }

                if (e.target.value == 0) {
                    setData('year', null);
                }
            },
            error: yearError,
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
