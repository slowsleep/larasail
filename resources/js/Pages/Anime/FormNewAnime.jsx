import AddModelForm from '@/Components/AddModelForm';
import { STATUSES } from '@/constants.js';

export default function FormNewAnime({ className, id, data, setData, post }) {
    const submit = (e) => {
        e.preventDefault();
        post(route('anime.store'), {
            preserveScroll: true,
            only: ['anime', 'action'],
            onSuccess: () => {
                setData({
                    title: '',
                    season: 1,
                    episode: 0,
                    genre: '',
                    publisher: '',
                    translator: '',
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
            min: 0,
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
