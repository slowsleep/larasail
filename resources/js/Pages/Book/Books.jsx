import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import { useEffect, useRef, useState } from 'react';
import FormNewBook from './FormNewBook';
import RowBook from './RowBook';
import ShowingTableCol from '@/Components/ShowingTableCol';
import ModelTable from '@/Components/ModelTable';
import ModelTableSorting from '@/Components/ModelTableSorting';

export default function Books({auth, books, book, action}) {
    const [booksItems, setBooksItems] = useState(books);

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
            let newBooksItems;
            if (action == "create") {
                newBooksItems = [...booksItems, book];
            } else if (action == "update") {
                newBooksItems = booksItems.map((item) => {
                    if (item.id == book.id) {
                        return {...item, ...book};
                    }
                    return item;
                });

            }
            setBooksItems(newBooksItems);
        }
    }, [book, action]);

    const updateSortedBooksItems = (sortedBooks) => {
        setBooksItems(sortedBooks);
    }

    const handleDestroyBook = (id) => {
        let newBooksItems = booksItems.filter(item => item.id != id);
        setBooksItems(newBooksItems);
    }

    return (
        <AuthenticatedLayout
        user={auth.user}
        header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Книги</h2>}
    >
        <Head title="Books" />
        <div className="py-12">
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg p-6 flex flex-col gap-y-4">

                    <FormNewBook className="hidden" id="form-book" data={data} setData={setData} post={post} />

                    <div
                        className="flex-1 p-2 border-2 border-amber-400 bg-amber-400/20 hover:bg-amber-400/40 dark:text-white text-center cursor-pointer"
                        onClick={hideForm}
                        title="Показать форму добавления"
                    >
                        книги
                    </div>

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

                    <ModelTableSorting
                        model="books"
                        columns={['title', 'status', 'created_at']}
                        updateTableItems={updateSortedBooksItems}
                    />

                    <div className="overflow-x-auto">
                        <ModelTable
                            model="books"
                            columns={["title", "author", "publisher", "publication_date", "genre", "comment", "finished", "abandoned"]}
                            ref={tableRef}
                        >
                            {booksItems.map((book) => (
                                <RowBook key={book.id} book={book} onDelete={handleDestroyBook} />
                            ))}
                        </ModelTable>
                    </div>
                </div>
            </div>
        </div>
    </AuthenticatedLayout>
    )
}
