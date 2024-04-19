import { useEffect, useState } from 'react';
import { useForm } from '@inertiajs/react';

export default function RowMovie ({movie}) {
    const { data, setData, delete: destroy, patch, reset } = useForm({
        id: movie.id,
        title: movie.title,
        part: movie.part,
        comment: movie.comment,
        finished: movie.finished,
        abandoned: movie.abandoned,
    });
    const [idEdit, setIdEdit] = useState(false);

    useEffect(() => {
        if (data.abandoned) {
            setData('finished', false);
        }
    }, [data.abandoned]);

    const handleDestroy = () => {
        if (confirm(`Вы уверены, что хотите удалить фильм "${movie.title}"?`)) {
            destroy(route('movies.destroy', {id: movie.id}), {
                preserveScroll: true,
            });
        }
    }

    const handleSave = () =>  {
        setIdEdit(false);
        patch(route('movies.update', data), {
            preserveScroll: true,
            only: ['movie', 'action'],
        });
    }

  return (
    <tr className={"odd:bg-cyan-900 even:bg-cyan-800 " + (data.abandoned ? "brightness-50 grayscale" : "")}>
        <td className="p-2 text-white">
            {!idEdit ?
                <p>{data.title}</p>
                :
                <input className="bg-transparent" type="text" name="title" value={data.title} onChange={(e) => setData('title', e.target.value)} />
            }
        </td>
        <td className="p-2 text-white text-center">
            {!idEdit ?
                <p>{data.part}</p>
                :
                <input className="bg-transparent" type="number" name="part" value={data.part ? data.part : ""} onChange={(e) => setData('part', e.target.value)} />
            }
        </td>
        <td className="p-2 text-white text-center">
            {!idEdit ?
                <p>{data.comment}</p>
                :
                <input className="bg-transparent" type="text" name="comment" value={data.comment ? data.comment : ""} onChange={(e) => setData('comment', e.target.value)} />
            }
        </td>
        <td className="p-2 text-white text-center">
            {!idEdit ?
                <input className="bg-transparent " type="checkbox" checked={data.finished} disabled />
                :
                <input className="bg-transparent" type="checkbox" name="finished" checked={data.finished} onChange={(e) => setData('finished', e.target.checked)} disabled={data.abandoned} />
            }
        </td>
        <td className="p-2 text-white text-center">
            {!idEdit ?
                <input className="bg-transparent" type="checkbox" checked={data.abandoned} disabled />
                :
                <input
                    className="bg-transparent"
                    type="checkbox"
                    name="abandoned"
                    checked={data.abandoned}
                    onChange={(e) => {
                        if (e.target.checked) {
                            setData('finished', false)
                            setData('abandoned', e.target.checked)
                        } else {
                            setData('abandoned', e.target.checked)
                        }
                    }}
                />
            }
        </td>
        <td className="p-2 flex justify-around">
            {!idEdit ?
                <>
                    <button className="hover:brightness-50" onClick={() => {setIdEdit(true)}}><img src="assets/img/blue-pen.svg" alt="edit" title="edit" /></button>
                    <button className="hover:brightness-50" onClick={() => {handleDestroy(movie.id)}}><img src="assets/img/red-trash.svg" alt="delete" title="delete" /></button>
                </>
            :
                <>
                    <button className="hover:brightness-50" onClick={() => {handleSave()}}><img src="assets/img/save.svg" alt="save" title="save" /></button>
                    <button className="hover:brightness-50" onClick={() => {setIdEdit(false); reset()}}><img src="assets/img/cancel.svg" alt="cancel" title="cancel" /></button>
                </>
            }
        </td>
    </tr>
  )
}
