import { useForm } from '@inertiajs/react';
import ModelRow from '@/Components/ModelRow';
import { useState } from 'react';

export default function RowBook({book}) {
    const [titleError, setTitleError] = useState(false);
    const [authorError, setAuthorError] = useState(false);


    const { data, setData, delete: destroy, patch, reset } = useForm({
        id: book.id,
        title: book.title,
        author: book.author,
        publisher: book.publisher,
        publication_date: book.publication_date,
        genre: book.genre,
        comment: book.comment,
        finished: book.finished,
        abandoned: book.abandoned,
    });

    const handleDestroy = () => {
        destroy(route('books.destroy', {id: book.id}), {
            preserveScroll: true,
        });
    }

    const handleSave = () =>  {
        patch(route('books.update', data), {
            preserveScroll: true,
            only: ['book', 'action'],
        });
    }

    const handleCancle = () => {
        setTitleError(false);
        setAuthorError(false);
        reset();
    }

    const inputList = [
        {
            value: data.title,
            type: "text",
            name: "title",
            maxLength: "255",
            title: "Максимальная длина 255 символов",
            required: true,
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
            value: data.author,
            type: "text",
            name: "author",
            maxLength: "255",
            title: "Максимальная длина 255 символов",
            required: true,
            onChange: (e) => {
                setData('author', e.target.value);
                if ((e.target.value).length > 0) {
                    setAuthorError(false);
                } else {
                    setAuthorError(true);
                }
            },
            error: authorError,
        },
        {
            value: data.publisher,
            type: "text",
            name: "publisher",
            maxLength: "255",
            title: "Максимальная длина 255 символов",
            onChange: (e) => setData('publisher', e.target.value),
        },
        {
            value: data.publication_date,
            type: "date",
            name: "publication_date",
            onChange: (e) => setData('publication_date', e.target.value),
        },
        {
            value: data.genre,
            type: "text",
            name: "genre",
            maxLength: "255",
            title: "Максимальная длина 255 символов",
            onChange: (e) => setData('genre', e.target.value),
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
        <ModelRow
            className="odd:bg-amber-900 even:bg-amber-800"
            inputs={inputList}
            data={data}
            setData={setData}
            modelItem={book}
            modelName={{en: "books", ru: "книгу"}}
            onSave={handleSave}
            onDestroy={handleDestroy}
            onCancle={handleCancle}
        />
    )
}
