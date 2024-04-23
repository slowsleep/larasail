import { useForm } from '@inertiajs/react';
import ModelRow from '@/Components/ModelRow';

export default function RowMovie ({movie}) {
    const { data, setData, delete: destroy, patch, reset } = useForm({
        id: movie.id,
        title: movie.title,
        part: movie.part,
        comment: movie.comment,
        finished: movie.finished,
        abandoned: movie.abandoned,
    });

    const handleDestroy = () => {
        destroy(route('movies.destroy', {id: movie.id}), {
            preserveScroll: true,
        });
    }

    const handleSave = () =>  {
        patch(route('movies.update', data), {
            preserveScroll: true,
            only: ['movie', 'action'],
        });
    }

    const inputList = [
        {
            value: data.title,
            type: "text",
            name: "title",
            onChange: (e) => setData('title', e.target.value),
        },
        {
            value: data.part,
            type: "number",
            name: "part",
            onChange: (e) => setData('part', e.target.value),
        },
        {
            value: data.comment ? data.comment : "",
            type: "text",
            name: "comment",
            onChange: (e) => setData('comment', e.target.value),
        },
        {
            value: data.finished,
            type: "checkbox",
            name: "finished",
            onChange: (e) => setData('finished', e.target.checked),
            disabled: data.abandoned
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
            }
        }

    ]

    return (
        <ModelRow className="odd:bg-cyan-900 even:bg-cyan-800" inputs={inputList} data={data} setData={setData} modelItem={movie} modelName="фильм" onSave={handleSave} onDestroy={handleDestroy} reset={reset} />
    )
}