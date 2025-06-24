import ModelTableSearch from "@/Components/ModelTable/ModelTableSearch";
import { useForm } from "@inertiajs/react";
import { STATUSES } from '@/constants.js';

export default function FormSearchAnime({ model, updateTableItems }) {
    const { data, setData } = useForm({
        title: '',
        genre: '',
        // year: '',
        publisher: '',
        status_id: '',
    });

    const listInputs = [
        {
            label: "Название",
            type:"text",
            name:"title",
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
        // TODO: Uncomment when year column will be added to the anime table
        // {
        //     label: "Год",
        //     type: "number",
        //     name: "year",
        //     value: data.year,
        //     min: 1,
        //     onChange: (e) => setData('year', e.target.value),
        // },
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
            label: "Статус",
            type: "select",
            name: "status_id",
            options: STATUSES,
            value: data.status_id,
            onChange: (e) => setData('status_id', e.target.value),
        }
    ]

    return <ModelTableSearch model={model} columns={listInputs} data={data} updateTableItems={updateTableItems} />
}
