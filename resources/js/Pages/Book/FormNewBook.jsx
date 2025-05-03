import AddModelForm from '@/Components/AddModelForm';
import { STATUSES } from '@/constants.js';

export default function FormNewBook({ className, id, data, setData, post }) {
    const submit = (e) => {
        e.preventDefault();
        post(route('books.store'), {
            preserveScroll: true,
            only: ['book', 'action'],
            onSuccess: () => {
                setData({
                    title: '',
                    author: '',
                    publisher: '',
                    publication_date: '',
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
            label: "Автор",
            type: "text",
            name: "author",
            value: data.author,
            maxLength: "255",
            required: true,
            title: "Максимальная длина 255 символов",
            onChange: (e) => setData('author', e.target.value),
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
            label: "Дата публикации",
            type: "date",
            name: "publication_date",
            value: data.publication_date,
            onChange: (e) => setData('publication_date', e.target.value),
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
