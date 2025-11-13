import AddModelForm from '@/Components/AddModelForm';
import { STATUSES } from '@/constants.js';

export default function FormNewMovie ({ className, id, data, setData, post }) {

    const submit = (e) => {
        e.preventDefault();
        post(route('movies.store'), {
            preserveScroll: true,
            only: ['movie', 'action'],
            onSuccess: () => {
                setData({
                    title: '',
                    year: '',
                    genre: '',
                    comment: '',
                    status_id: 1,
                });
            },
        });
    }

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
            label: "Год",
            type: "number",
            name: "year",
            value: data.year,
            min: 1,
            onChange: (e) => setData('year', e.target.value)
        },
        {
            label: "Жанр",
            type: "text",
            name: "genre",
            value: data.genre,
            maxLength: "255",
            title: "Максимальная длина 255 символов",
            onChange: (e) => setData('genre', e.target.value)
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
