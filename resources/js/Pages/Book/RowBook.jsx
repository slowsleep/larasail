import { useForm } from '@inertiajs/react';
import ModelRow from '@/Components/ModelRow';
import { useState, useEffect } from 'react';
import axios from "axios";
import { STATUSES } from "@/constants.js";

export default function RowBook({book, onDelete}) {
    const [titleError, setTitleError] = useState(false);
    const [authorError, setAuthorError] = useState(false);

    const [isStatusEdit, setIsStatusEdit] = useState(false);

    const { data, setData, delete: destroy, patch, reset } = useForm({
        id: book.id,
        title: book.title,
        author: book.author,
        publisher: book.publisher,
        publication_date: book.publication_date,
        genre: book.genre,
        comment: book.comment,
        status_id: book.status_id,
    });

    const handleDestroy = () => {
        destroy(route('books.destroy', {id: book.id}), {
            preserveScroll: true,
        });
        onDelete(book.id);
    }

    const handleSave = () =>  {
        axios.patch(route('api.books.update'), data);
    }

    const handleCancle = () => {
        setTitleError(false);
        setAuthorError(false);
        reset();
    }

    const handleStatusChange = (value) => {
        setData('status_id', Number(value));
        setIsStatusEdit(true);
    }

    useEffect(() => {
        if (isStatusEdit) {
            handleSave();
            setIsStatusEdit(false);
        }
    }, [data.status_id]);

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
            value: Number(data.status_id),
            type: "select",
            name: "status_id",
            onChange: (e) => handleStatusChange(e.target.value),
            options: STATUSES,
        }

    ]

    return (
        <ModelRow
            className="odd:bg-amber-900/40 even:bg-amber-800/40"
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
