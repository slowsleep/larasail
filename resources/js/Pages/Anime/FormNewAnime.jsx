import { useEffect } from 'react';
import AddModelForm from '@/Components/AddModelForm';

export default function FormNewAnime({id, data, setData, post, ...props}) {
    const submit = (e) => {
        e.preventDefault();
        post(route('anime.store'), {
            preserveScroll: true,
            only: ['anime', 'action'],
        });
    }

    useEffect(() => {
        if (data.abandoned) {
            setData('finished', false);
        }
    }, [data.abandoned]);

    const listInputs = [
        {
            label: "Название",
            type:"text",
            name:"title",
            required: true,
            value: data.title,
            maxLength: "255",
            title: "Максимальная длина 255 символов",
            onChange:(e) => setData('title', e.target.value)
        },
        {
            label: "Сезон",
            type: "number",
            name: "season",
            required: true,
            value: data.season,
            min: 1,
            onChange: (e) => setData('season', e.target.value)
        },
        {
            label: "Серия",
            type: "number",
            name: "episode",
            required: true,
            value: data.episode,
            min: 1,
            onChange: (e) => setData('episode', e.target.value)
        },
        {
            label: "Жанр",
            type: "text",
            name: "genre",
            value: data.genre,
            maxLength: "255",
            title: "Максимальная длина 255 символов",
            onChange: (e) => setData('genre', e.target.value),
            className: "w-full"
        },
        {
            label: "Издатель",
            type: "text",
            name: "publisher",
            value: data.publisher,
            maxLength: "255",
            title: "Максимальная длина 255 символов",
            onChange: (e) => setData('publisher', e.target.value),
            className: "w-full"
        },
        {
            label: "Перевод",
            type: "text",
            name: "translator",
            value: data.translator,
            maxLength: "255",
            title: "Максимальная длина 255 символов",
            onChange: (e) => setData('translator', e.target.value),
            className: "w-full"
        },
        {
            label: "Комментарий",
            type: "text",
            name: "comment",
            value: data.comment,
            maxLength: "255",
            title: "Максимальная длина 255 символов",
            onChange: (e) => setData('comment', e.target.value)
        },
        {
            label: "Завершен",
            type: "checkbox",
            name: "finished",
            checked: data.finished,
            onChange: (e) => setData('finished', e.target.checked),
            disabled: data.abandoned
        },
        {
            label: "Заброшен",
            type: "checkbox",
            name: "abandoned",
            checked: data.abandoned,
            onChange: (e) => {
                if (e.target.checked) {
                    setData('finished', false);
                    setData('abandoned', e.target.checked);
                } else {
                    setData('abandoned', e.target.checked)
                }
            }
        }
    ]

    return <AddModelForm id={id} listInputs={listInputs} onSubmit={submit} />
}
