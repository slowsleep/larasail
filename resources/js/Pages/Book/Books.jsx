import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import { useEffect } from 'react';
import FormNewBook from './FormNewBook';
import RowBook from './RowBook';
export default function Books({auth, books, book, action}) {
    const { data, setData, post } = useForm({
        title: '',
        author: '',
        publisher: '',
        publication_date: '',
        genre: '',
        comment: '',
        finished: false,
        abandoned: false,
    });

    const hideForm = () => {
        document.querySelector("#form-book").classList.toggle("hidden");
    }

    useEffect(() => {
        if (book) {
            if (action == "create") {
                books.push(book);
            } else if (action == "update") {
                books = books.map((item) => {
                    if (item.id == book.id) {
                        return {...item, ...book};
                    }
                    return item;
                });
            }
        }
    }, [book, action]);

    return (
        <AuthenticatedLayout
        user={auth.user}
        header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Книги</h2>}
    >
        <Head title="Books" />
        <div className="py-12">
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg p-6 flex flex-col gap-y-4">

                    <FormNewBook id="form-book" data={data} setData={setData} post={post} />

                    <div className="flex-1 p-2 border-2 border-amber-400 bg-amber-400/20 hover:bg-amber-400/40 text-white text-center cursor-pointer" onClick={hideForm}>книги</div>

                    <div className="overflow-x-auto">
                        <table className="border-separate border-spacing-2 border border-slate-500 w-full">
                            <thead>
                                <tr className="bg-slate-700">
                                    <th className="text-start">Название</th>
                                    <th>Автор</th>
                                    <th>Издатель</th>
                                    <th>Дата публикации</th>
                                    <th>Жанр</th>
                                    <th>Комментарий</th>
                                    <th>Завершен</th>
                                    <th>Заброшен</th>
                                </tr>
                            </thead>
                            <tbody>
                                {books.map((book) => (
                                    <RowBook key={book.id} book={book} />
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </AuthenticatedLayout>
    )
}
