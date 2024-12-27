import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import { useEffect, useRef } from 'react';
import FormNewBook from './FormNewBook';
import RowBook from './RowBook';
import ShowingTableCol from '@/Components/ShowingTableCol';
import ModelTable from '@/Components/ModelTable';

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
    const tableRef = useRef(null);

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

                    <div className="flex-1 p-2 border-2 border-amber-400 bg-amber-400/20 hover:bg-amber-400/40 dark:text-white text-center cursor-pointer" onClick={hideForm}>книги</div>

                    <ShowingTableCol
                        model="books"
                        columns={[
                            {label: 'author', column: 1},
                            {label: 'publisher', column: 2},
                            {label: 'publication_date', column: 3},
                            {label: 'genre', column: 4},
                            {label: 'comment', column: 5},
                            {label: 'finished', column: 6},
                            {label: 'abandoned', column: 7}
                        ]}
                        tableRef={tableRef}
                    />

                    <div className="overflow-x-auto">
                        <ModelTable
                            model="books"
                            columns={["title", "author", "publisher", "publication_date", "genre", "comment", "finished", "abandoned"]}
                            ref={tableRef}
                        >
                            {books.map((book) => (
                                <RowBook key={book.id} book={book} />
                            ))}
                        </ModelTable>
                    </div>
                </div>
            </div>
        </div>
    </AuthenticatedLayout>
    )
}
