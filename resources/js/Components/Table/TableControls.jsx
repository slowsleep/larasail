export default function TableControls({ children }) {
    const showColsControl = () => {
        document.querySelector("#cols-control").classList.toggle("hidden");
    }

    const showSortingMenu = () => {
        document.querySelector("#sorting-menu").classList.toggle("hidden");
    }

    return (
        <>
            <div className='flex flex-row gap-x-2'>
                <button
                    className="border rounded-lg border-gray-600 w-fit p-2"
                    onClick={showColsControl}
                    title="Видимость колонок"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                    </svg>
                </button>
                <button
                    className="border rounded-lg border-gray-600 w-fit p-2"
                    onClick={showSortingMenu}
                    title="Сортировка"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 7.5 7.5 3m0 0L12 7.5M7.5 3v13.5m13.5 0L16.5 21m0 0L12 16.5m4.5 4.5V7.5" />
                    </svg>
                </button>
            </div>
            {children}
        </>
    );
}
