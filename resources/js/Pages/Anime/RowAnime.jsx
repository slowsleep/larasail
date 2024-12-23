import ModelRow from "@/Components/ModelRow";
import { useForm } from "@inertiajs/react";
import { useState } from "react";

export default function RowAnime({anime}) {

    const [titleError, setTitleError] = useState(false);
    const [seasonError, setSeasonError] = useState(false);
    const [episodeError, setEpisodeError] = useState(false);

    const { data, setData, delete: destroy, patch, reset } = useForm({
        id: anime.id,
        title: anime.title,
        season: anime.season,
        episode: anime.episode,
        genre: anime.genre,
        publisher: anime.publisher,
        translator: anime.translator,
        comment: anime.comment,
        finished: anime.finished,
        abandoned: anime.abandoned,
    });

    const handleDestroy = () => {
        destroy(route('anime.destroy', {id: anime.id}), {
            preserveScroll: true,
        });
    }

    const handleSave = () =>  {
        patch(route('anime.update', data), {
            preserveScroll: true,
            only: ['anime', 'action'],
        });
    }

    const handleCancle = () => {
        setTitleError(false);
        setSeasonError(false);
        setEpisodeError(false);
        reset();
    }

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
        },
        {
            value: data.episode,
            type: "number",
            name: "episode",
            onChange: (e) => {
                setData('episode', e.target.value);
                if (e.target.value > 0) {
                    setEpisodeError(false);
                } else {
                    setEpisodeError(true);
                }
            },
            min: 1,
            error: episodeError,
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
            value: data.publisher ? data.publisher : "",
            type: "text",
            name: "publisher",
            maxLength: "255",
            title: "Максимальная длина 255 символов",
            onChange: (e) => setData('publisher', e.target.value),
        },
        {
            value: data.translator ? data.translator : "",
            type: "text",
            name: "translator",
            maxLength: "255",
            title: "Максимальная длина 255 символов",
            onChange: (e) => setData('translator', e.target.value),
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
            disabled: data.abandoned
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
            }
        }

    ]

    return (
        <ModelRow
            className="odd:bg-teal-950 even:bg-teal-800"
            inputs={inputList}
            data={data}
            setData={setData}
            modelItem={anime}
            modelName={{ru: "аниме", en: "anime"}}
            onSave={handleSave}
            onDestroy={handleDestroy}
            onCancle={handleCancle}
        />
    )
}
