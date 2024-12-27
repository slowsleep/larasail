import { Link, Head } from '@inertiajs/react';

export default function Welcome({ auth, laravelVersion, phpVersion }) {
    return (
        <>
            <Head title="Welcome" />
            <div className="relative sm:flex sm:justify-center sm:items-center min-h-screen bg-dots-darker bg-center bg-gray-100 dark:bg-dots-lighter dark:bg-gray-900 selection:bg-red-500 selection:text-white ">
                <div className="flex flex-row justify-between">
                    <div className="sm:fixed sm:top-0 sm:left-0 text-start p-6">
                        <h1 className="text-xl font-semibold dark:text-gray-400">WatchWizard</h1>
                    </div>
                    <div className="sm:fixed sm:top-0 sm:right-0 p-6 text-end">
                        {auth.user ? (
                            <Link
                                href={route('dashboard')}
                                className="font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500"
                            >
                                Dashboard
                            </Link>
                        ) : (
                            <>
                                <Link
                                    href={route('login')}
                                    className="font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500"
                                >
                                    Log in
                                </Link>

                                <Link
                                    href={route('register')}
                                    className="ms-4 font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500"
                                >
                                    Register
                                </Link>
                            </>
                        )}
                    </div>
                </div>

                <div className="max-w-7xl mx-auto p-6 lg:p-8">
                    <div className="flex justify-center">
                        <img src="assets/img/watch-wizard.png" className="w-1/2 border-2 border-violet-400  rounded-lg shadow-violet-400/40 shadow-2xl" />
                    </div>
                    <div className="mt-8 dark:bg-gray-800/60 bg-gray-50 overflow-hidden shadow-sm sm:rounded-lg">

                        <p className="m-4 text-md dark:text-gray-400">WatchWizard - сайт помощник для ослеживания контента, который вы прошли, проходите или будете проходить, будь то сериалы, фильмы, игры, аниме, манга или книги.</p>
                        <p className="m-4 text-md dark:text-gray-400">В профиле есть таблица активности, отслеживающая вашу активность на сайте.</p>
                        <p className="m-4 text-md dark:text-gray-400">Добавлена возможность общения с другими пользователями и система подписок друг на друга.</p>
                        <p className="m-4 text-lg text-green-400">Входите с систему и сделайте свою жизнь проще, без отслеживания просмотренных фильмов в заметках или избранных сообщениях в социальных сетях.</p>
                        <div className="flex justify-center">
                            <img src="assets/img/dev.gif" />
                        </div>
                    </div>

                    <div className="flex justify-center mt-16 px-6 sm:items-center sm:justify-between">
                        <div className="text-center text-sm sm:text-start">&nbsp;</div>
                        <div className="text-center text-sm text-gray-500 dark:text-gray-400 sm:text-end sm:ms-0">
                            Laravel v{laravelVersion} (PHP v{phpVersion})
                        </div>
                    </div>
                </div>
            </div>

            <style>{`
                .bg-dots-darker {
                    background-image: url("data:image/svg+xml,%3Csvg width='30' height='30' viewBox='0 0 30 30' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1.22676 0C1.91374 0 2.45351 0.539773 2.45351 1.22676C2.45351 1.91374 1.91374 2.45351 1.22676 2.45351C0.539773 2.45351 0 1.91374 0 1.22676C0 0.539773 0.539773 0 1.22676 0Z' fill='rgba(0,0,0,0.07)'/%3E%3C/svg%3E");
                }
                @media (prefers-color-scheme: dark) {
                    .dark\\:bg-dots-lighter {
                        background-image: url("data:image/svg+xml,%3Csvg width='30' height='30' viewBox='0 0 30 30' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1.22676 0C1.91374 0 2.45351 0.539773 2.45351 1.22676C2.45351 1.91374 1.91374 2.45351 1.22676 2.45351C0.539773 2.45351 0 1.91374 0 1.22676C0 0.539773 0.539773 0 1.22676 0Z' fill='rgba(255,255,255,0.07)'/%3E%3C/svg%3E");
                    }
                }
            `}</style>
        </>
    );
}
