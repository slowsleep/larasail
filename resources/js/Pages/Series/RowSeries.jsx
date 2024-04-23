import ModelRow from "@/Components/ModelRow";
import { useForm } from "@inertiajs/react";

export default function RowSeries({singleSeries}) {
    const { data, setData, delete: destroy, patch, reset } = useForm({
        id: singleSeries.id,
        title: singleSeries.title,
        season: singleSeries.season,
        episode: singleSeries.episode,
        comment: singleSeries.comment,
        finished: singleSeries.finished,
        abandoned: singleSeries.abandoned,
    });

    const handleDestroy = () => {
        destroy(route('series.destroy', {id: singleSeries.id}), {
            preserveScroll: true,
        });
    }

    const handleSave = () =>  {
        patch(route('series.update', data), {
            preserveScroll: true,
            only: ['singleSeries', 'action'],
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
            value: data.season,
            type: "number",
            name: "season",
            onChange: (e) => setData('season', e.target.value),
        },
        {
            value: data.episode,
            type: "number",
            name: "episode",
            onChange: (e) => setData('episode', e.target.value),
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
        <ModelRow className="odd:bg-pink-950 even:bg-pink-800" inputs={inputList} data={data} setData={setData} modelItem={singleSeries} modelName="сериал" onSave={handleSave} onDestroy={handleDestroy} reset={reset} />
    )
}