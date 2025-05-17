import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage } from '@inertiajs/react';
import ChatWindow from './ChatWindow';
import ChatList from './ChatList';
import { useEffect, useState, useRef } from 'react';

export default function Chats({ auth, chats, chat }) {

    const { error } = usePage().props;

    const [isHiddenListChat, setIsHiddenListChat] = useState(false);

    const chatListRef = useRef(null);
    const chatWindowRef = useRef(null);

    const handleSwitchChatList = (e) => {
        e.preventDefault();
        let chatList = chatListRef.current;
        let chatWindow = chatWindowRef.current;

        if (window.innerWidth < 640) {
            chatList.classList.toggle('hidden');
            chatWindow.classList.toggle('hidden');
            chatList.classList.toggle('w-full');
        } else {
            chatList.classList.toggle('w-1/3');
            chatList.classList.toggle('hidden');
        }

        setIsHiddenListChat(!isHiddenListChat);
    }

    useEffect(() => {
        const handleResize = () => {
            if (chatListRef.current) {
              if (window.innerWidth < 640) {
                if (!chatListRef.current.classList.contains('hidden')) chatListRef.current.classList.add('hidden');
                setIsHiddenListChat(true);
              } else {
                if (chatListRef.current.classList.contains('hidden')) chatListRef.current.classList.remove('hidden');
                setIsHiddenListChat(false);
              }
            }
          };
        handleResize();

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);


    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-zinc-800 dark:text-zinc-200 leading-tight">Messages</h2>}
        >
            <Head title="Messages" />
            <div className="h-screen flex flex-col py-12">
                <div className="flex-grow flex flex-col h-full">
                    <div className="max-w-7xl mx-auto w-full px-4 h-full flex flex-col">
                        <div className="bg-white dark:bg-zinc-800 overflow-hidden shadow-sm rounded-lg p-4 flex flex-col gap-y-4 h-full">
                            {error ? (
                                <div className="border border-red-600 p-1">
                                    <p className="text-red-500 text-sm">{error}</p>
                                </div>
                            ) : null}
                            <div className="flex flex-row justify-between">
                                <button
                                    className="p-2 rounded-lg bg-zinc-600/50 hover:bg-zinc-900/50"
                                    onClick={handleSwitchChatList}
                                >
                                    {isHiddenListChat ? 'Show' : 'Hide'} list
                                </button>
                            </div>
                            <div className="flex flex-row gap-x-4 flex-grow min-h-0">
                                <div className="flex flex-col w-1/3 bg-zinc-400 p-2 rounded-lg overflow-y-auto" ref={chatListRef}>
                                    <ChatList chats={chats} auth={auth}/>
                                </div>
                                <div className="flex flex-col w-full bg-zinc-400 p-2 h-full min-h-0" ref={chatWindowRef}>
                                    {chat ?
                                        <ChatWindow chat={chat} auth={auth} />
                                        : <p className="text-center mt-auto mb-auto">Чат не выбран</p>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    )
}
