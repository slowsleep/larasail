import { useEffect } from 'react';

export default function FormNewMovie ({id, data, setData, post, ...props}) {

    const submit = (e) => {
        e.preventDefault();
        post(route('movies.store'), {
            preserveScroll: true,
            only: ['movie', 'action'],
        });
    }

    useEffect(() => {
        if (data.abandoned) {
            setData('finished', false);
        }
    }, [data.abandoned]);

    return (
        <form className="w-full flex text-white items-center" id={id} onSubmit={submit} {...props}>
            <div className="flex-1">
                <label>Название</label>
                <input className="text-black" type="text" name="title" required value={data.title} onChange={(e) => setData('title', e.target.value)} />
            </div>
            <div className="flex-1">
                <label>Часть</label>
                <input className="text-black" type="number" name="part" value={data.part} onChange={(e) => setData('part', Number(e.target.value))} />
            </div>
            <div className="flex-1">
                <label>Комментарий</label>
                <input className="text-black" type="text" name="comment" value={data.comment} onChange={(e) => setData('comment', e.target.value)} />
            </div>
            <div className="flex-1">
                <label>Завершен</label>
                <input className="m-1" type="checkbox" name="finished" checked={data.finished} onChange={(e) => setData('finished', e.target.checked)} disabled={data.abandoned} />
            </div>
            <div className="flex-1">
                <label>Заброшен</label>
                <input
                    className="m-1"
                    type="checkbox"
                    name="abandoned"
                    checked={data.abandoned}
                    onChange={(e) => {
                        if (e.target.checked) {
                            setData('finished', false);
                            setData('abandoned', e.target.checked);
                        } else {
                            setData('abandoned', e.target.checked)}
                        }
                    }
                />
            </div>
            <button className="p-4 rounded bg-emerald-600 hover:bg-emerald-800" type="submit">Добавить</button>
        </form>
    )
}
