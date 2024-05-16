import { useForm } from '@inertiajs/react';
import ModelRow from '@/Components/ModelRow';
import { useState } from 'react';

export default function RowGame({game}) {
    const [titleError, setTitleError] = useState(false);

    const { data, setData, delete: destroy, patch, reset } = useForm({
        id: game.id,
        title: game.title,
        genre: game.genre,
        developer: game.developer,
        publisher: game.publisher,
        comment: game.comment,
        finished: game.finished,
        abandoned: game.abandoned,
    });

    const handleDestroy = () => {
        destroy(route('games.destroy', {id: game.id}), {
            preserveScroll: true,
        });
    }

    const handleSave = () =>  {
        patch(route('games.update', data), {
            preserveScroll: true,
            only: ['game', 'action'],
        });
    }

    const handleCancle = () => {
        setTitleError(false);
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
            value: data.genre,
            type: "text",
            name: "genre",
            maxlength: "255",
            title: "Максимальная длина 255 символов",
            onChange: (e) => setData('genre', e.target.value),
        },
        {
            value: data.developer,
            type: "text",
            name: "developer",
            maxlength: "255",
            title: "Максимальная длина 255 символов",
            onChange: (e) => setData('developer', e.target.value),
        },
        {
            value: data.publisher,
            type: "text",
            name: "publisher",
            maxlength: "255",
            title: "Максимальная длина 255 символов",
            onChange: (e) => setData('publisher', e.target.value),
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
        <ModelRow className="odd:bg-violet-900 even:bg-violet-800" inputs={inputList} data={data} setData={setData} modelItem={game} modelName="игру" onSave={handleSave} onDestroy={handleDestroy} onCancle={handleCancle} />
    )
}
