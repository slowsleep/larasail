import { useEffect } from 'react';
import AddModelForm from '@/Components/AddModelForm';
import { STATUSES } from '@/constants.js';

export default function FormNewManga({ className, id, data, setData, post }) {
    const submit = (e) => {
        e.preventDefault();
        post(route('mangas.store'), {
            preserveScroll: true,
            only: ['manga', 'action'],
            onSuccess: () => {
                setData({
                    title: '',
                    volume: 1,
                    chapter: 0,
                    genre: '',
                    creators: '',
                    comment: '',
                    status_id: 1,
                });
            },
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
            label: "Том",
            type: "number",
            name: "volume",
            value: data.volume,
            min: 1,
            required: true,
            title: "Минимальное значение 1",
            onChange: (e) => setData('volume', e.target.value),
            className: "lg:w-full"
        },
        {
            label: "Глава",
            type: "number",
            name: "chapter",
            value: data.chapter,
            min: 0,
            required: true,
            title: "Минимальное значение 0",
            onChange: (e) => setData('chapter', e.target.value),
            className: "lg:w-full"
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
            label: "Создатели",
            type: "text",
            name: "creators",
            value: data.creators,
            maxLength: "255",
            title: "Максимальная длина 255 символов",
            onChange: (e) => setData('creators', e.target.value),
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
            label: "Статус",
            type: "select",
            name: "status_id",
            options: STATUSES,
            value: data.status_id,
            onChange: (e) => setData('status_id', e.target.value),
        }
    ]

    return <AddModelForm className={className} id={id} listInputs={listInputs} onSubmit={submit} />
}
