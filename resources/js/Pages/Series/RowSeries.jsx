import ModelRow from "@/Components/ModelRow";
import { useForm } from "@inertiajs/react";
import { useEffect, useState } from "react";
import axios from "axios";
import { STATUSES } from '@/constants.js';
import "../../../css/border-anim.css";

export default function RowSeries({singleSeries, onDelete}) {

    const [titleError, setTitleError] = useState(false);
    const [seasonError, setSeasonError] = useState(false);
    const [episodeError, setEpisodeError] = useState(false);

    const [isNumberEdit, setIsNumberEdit] = useState(false);
    const [isStatusEdit, setIsStatusEdit] = useState(false);

    const [errorClass, setErrorClass] = useState("");
    const [successClass, setSuccessClass] = useState("");

    const { data, setData, delete: destroy, patch, reset } = useForm({
        id: singleSeries.id,
        title: singleSeries.title,
        season: singleSeries.season,
        episode: singleSeries.episode,
        comment: singleSeries.comment,
        status_id: singleSeries.status_id,
    });

    const [oldData, setOldData] = useState(data);

    const handleDestroy = () => {
        destroy(route('series.destroy', {id: singleSeries.id}), {
            preserveScroll: true,
        });
        onDelete(singleSeries.id);
    }

    const handleSave = () =>  {
        axios.patch(route('api.series.update'), data)
        .then((response) => {
            if (response.status == 200) {
                setOldData(data);
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
        setSeasonError(false);
        setEpisodeError(false);
        reset();
    }

    const seasonIncrement = () => {
        setData('season', Number(data.season) + 1);
        setIsNumberEdit(true);
    }

    const seasonDecrement = () => {
        if (data.season - 1 > 0) {
            setData('season', Number(data.season) - 1);
            setIsNumberEdit(true);
        }
    }

    const episodeIncrement = () => {
        setData('episode', Number(data.episode) + 1);
        setIsNumberEdit(true);
    }

    const episodeDecrement = () => {
        if (data.episode - 1 >= 0) {
            setData('episode', Number(data.episode) - 1);
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
    }, [data.season, data.episode, data.status_id]);

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
            value: data.season,
            type: "number",
            name: "season",
            onChange: (e) => {
                setData('season', e.target.value);
                if (e.target.value > 0) {
                    setSeasonError(false);
                } else {
                    setSeasonError(true);
                }
            },
            min: 1,
            error: seasonError,
            onIncrement: seasonIncrement,
            onDecrement: seasonDecrement,
        },
        {
            value: data.episode,
            type: "number",
            name: "episode",
            onChange: (e) => {
                setData('episode', e.target.value);
                if (e.target.value >= 0) {
                    setEpisodeError(false);
                } else {
                    setEpisodeError(true);
                }
            },
            min: 0,
            error: episodeError,
            onIncrement: episodeIncrement,
            onDecrement: episodeDecrement,
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
            className={"odd:bg-pink-950/40 even:bg-pink-800/40" + (errorClass ? " " + errorClass : "") + (successClass ? " " + successClass : "")}
            inputs={inputList}
            data={data}
            setData={setData}
            modelItem={singleSeries}
            modelName={{en: "series", ru: "сериал"}}
            onSave={handleSave}
            onDestroy={handleDestroy}
            onCancle={handleCancle}
        />
    )
}
