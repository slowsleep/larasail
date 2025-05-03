import AddModelForm from '@/Components/AddModelForm';
import { STATUSES } from '@/constants.js';

export default function FormNewGame({ className, id, data, setData, post }) {
    const submit = (e) => {
        e.preventDefault();
        post(route('games.store'), {
            preserveScroll: true,
            only: ['game', 'action'],
            onSuccess: () => {
                setData({
                    title: '',
                    genre: '',
                    developer: '',
                    publisher: '',
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
            label: "Разработчик",
            type: "text",
            name: "developer",
            value: data.developer,
            maxLength: "255",
            title: "Максимальная длина 255 символов",
            onChange: (e) => setData('developer', e.target.value),
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
