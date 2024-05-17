import { useForm } from '@inertiajs/react';
import ModelRow from '@/Components/ModelRow';
import { useState } from 'react';

export default function RowManga({ manga }) {
    const [titleError, setTitleError] = useState(false);
    const [volumeError, setVolumeError] = useState(false);
    const [chapterError, setChapterError] = useState(false);

    const { data, setData, delete: destroy, patch, reset } = useForm({
        id: manga.id,
        title: manga.title,
        genre: manga.genre,
        creators: manga.creators,
        volume: manga.volume,
        chapter: manga.chapter,
        comment: manga.comment,
        finished: manga.finished,
        abandoned: manga.abandoned,
    });

    const handleDestroy = () => {
        destroy(route('mangas.destroy', {id: manga.id}), {
            preserveScroll: true,
        });
    }

    const handleSave = () =>  {
        patch(route('mangas.update', data), {
            preserveScroll: true,
            only: ['manga', 'action'],
        });
    }

    const handleCancle = () => {
        setTitleError(false);
        setVolumeError(false);
        setChapterError(false);
        reset();
    }

    const inputList = [
        {
            value: data.title,
            type: "text",
            name: "title",
            maxlength: "255",
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
            value: data.volume,
            type: "number",
            name: "volume",
            min: 1,
            title: "Минимальное значение 1",
            onChange: (e) => {
                setData('volume', e.target.value);
                if (e.target.value > 0) {
                    setVolumeError(false);
                } else {
                    setVolumeError(true);
                }
            },
            error: volumeError,
        },
        {
            value: data.chapter,
            type: "number",
            name: "chapter",
            min: 1,
            title: "Минимальное значение 1",
            onChange: (e) => {
                setData('chapter', e.target.value);
                if (e.target.value > 0) {
                    setChapterError(false);
                } else {
                    setChapterError(true);
                }
            },
            error: chapterError,
        },
        {
            value: data.genre,
            type: "text",
            name: "genre",
            maxlength: "255",
            title: "Максимальная длина 255 символов",
            onChange: (e) => setData('genre', e.target.value),
        },
        {
            value: data.creators,
            type: "text",
            name: "creators",
            maxlength: "255",
            title: "Максимальная длина 255 символов",
            onChange: (e) => setData('creators', e.target.value),
        },
        {
            value: data.comment ? data.comment : "",
            type: "text",
            name: "comment",
            maxlength: "255",
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
        <ModelRow className="odd:bg-emerald-900 even:bg-emerald-800" inputs={inputList} data={data} setData={setData} modelItem={manga} modelName="мангу" onSave={handleSave} onDestroy={handleDestroy} onCancle={handleCancle} />
    )
}
