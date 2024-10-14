import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage } from '@inertiajs/react';
import ChatWindow from './ChatWindow';
import ChatList from './ChatList';
import { useEffect } from 'react';

export default function Chats({ auth, chats, chat }) {

    const { error } = usePage().props;

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Messages</h2>}
        >
            <Head title="Messages" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 h-screen">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg p-6 flex flex-col gap-y-4 h-full">
                        {error ? (
                            <div className="border-1 border-red-600 p-1">
                                <p className="text-red text-sm">{error}</p>
                            </div>
                        ) : null}
                        <div className="flex flex-row gap-x-4 h-full">
                            <div className="flex flex-col w-1/3 bg-gray-400 p-2">
                                <ChatList chats={chats} auth={auth}/>
                            </div>
                            <div className="flex flex-col w-full bg-gray-400 p-2">
                                {chat ?
                                    <ChatWindow chat={chat} auth={auth} />
                                    : <p className="text-center mt-auto mb-auto">Чат не выбран</p>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    )
}
