import { useEffect } from 'react';
import AddModelForm from '@/Components/AddModelForm';

export default function FormNewBook({id, data, setData, post, ...props}) {
    const submit = (e) => {
        e.preventDefault();
        post(route('books.store'), {
            preserveScroll: true,
            only: ['book', 'action'],
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
            maxlength: "255",
            title: "Максимальная длина 255 символов",
            onChange:(e) => setData('title', e.target.value)
        },
        {
            label: "Автор",
            type: "text",
            name: "author",
            value: data.author,
            maxlength: "255",
            required: true,
            title: "Максимальная длина 255 символов",
            onChange: (e) => setData('author', e.target.value),
            classname: "w-full"
        },

        {
            label: "Издатель",
            type: "text",
            name: "publisher",
            value: data.publisher,
            maxlength: "255",
            title: "Максимальная длина 255 символов",
            onChange: (e) => setData('publisher', e.target.value),
            classname: "w-full"
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
            maxlength: "255",
            title: "Максимальная длина 255 символов",
            onChange: (e) => setData('genre', e.target.value),
            classname: "w-full"
        },
        {
            label: "Комментарий",
            type: "text",
            name: "comment",
            value: data.comment,
            maxlength: "255",
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
