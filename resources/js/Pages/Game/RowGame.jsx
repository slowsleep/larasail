import { useForm } from '@inertiajs/react';
import ModelRow from '@/Components/ModelRow';
import { useState, useEffect } from 'react';
import axios from "axios";
import { STATUSES } from "@/constants.js";
import "../../../css/border-anim.css";

export default function RowGame({game, onDelete}) {
    const [titleError, setTitleError] = useState(false);

    const [isStatusEdit, setIsStatusEdit] = useState(false);

    const [errorClass, setErrorClass] = useState("");
    const [successClass, setSuccessClass] = useState("");

    const { data, setData, delete: destroy, patch, reset } = useForm({
        id: game.id,
        title: game.title,
        genre: game.genre,
        developer: game.developer,
        publisher: game.publisher,
        comment: game.comment,
        status_id: game.status_id,
    });

    const [oldData, setOldData] = useState(data);

    const handleDestroy = () => {
        destroy(route('games.destroy', {id: game.id}), {
            preserveScroll: true,
        });
        onDelete(game.id);
    }

    const handleSave = () =>  {
        axios.patch(route('api.games.update'), data)
        .then((response) => {
            if (response.status == 200) {
                setSuccessClass("border-snake-anim");
                setTimeout(() => {
                    setSuccessClass("");
                }, 2000);
            }
        })
        .catch(() => {
            setData(oldData);
            setErrorClass("border-pulse-anim");
            setTimeout(() => {
                setErrorClass("");
            }, 2000);
        });;
    }

    const handleCancle = () => {
        setTitleError(false);
        reset();
    }

    const handleStatusChange = (value) => {
        setData('status_id', Number(value));
        setIsStatusEdit(true);
    }

    useEffect(() => {
        if (isStatusEdit) {
            handleSave();
            setIsStatusEdit(false);
        }
    }, [data.status_id]);

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
            value: data.genre ? data.genre : "",
            type: "text",
            name: "genre",
            maxLength: "255",
            title: "Максимальная длина 255 символов",
            onChange: (e) => setData('genre', e.target.value),
        },
        {
            value: data.developer ? data.developer : "",
            type: "text",
            name: "developer",
            maxLength: "255",
            title: "Максимальная длина 255 символов",
            onChange: (e) => setData('developer', e.target.value),
        },
        {
            value: data.publisher ? data.publisher : "",
            type: "text",
            name: "publisher",
            maxLength: "255",
            title: "Максимальная длина 255 символов",
            onChange: (e) => setData('publisher', e.target.value),
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
            className={"odd:bg-violet-900/40 even:bg-violet-800/40" + (errorClass ? " " + errorClass : "") + (successClass ? " " + successClass : "")}
            inputs={inputList}
            data={data}
            setData={setData}
            modelItem={game}
            modelName={{en: "games", ru: "игру"}}
            onSave={handleSave}
            onDestroy={handleDestroy}
            onCancle={handleCancle}
        />
    )
}
