import NavLink from '@/Components/NavLink';

export default function ChatList({auth, chats}) {

    return (
        <div className="container mx-auto p-4 h-full overflow-y-auto">
            <div className="flex flex-col h-full">
                <h4 className="text-lg font-bold">Ваши диалоги</h4>
                <ul className="list-none">
                    {chats.map(chat => {
                        const otherUser = chat.users.find(u => u.id !== auth.user.id);
                        return (
                            <li key={chat.id}>
                                <div className="flex mb-2 bg-gray-600 hover:bg-gray-900 p-2 justify-between">
                                    <NavLink
                                        href={`/chats/${otherUser.name}`}
                                        className="text-blue-500 hover:underline"
                                        active={route().current('chats.show', otherUser.name)}
                                    >
                                        {chat.name}
                                    </NavLink>
                                    <a className="text-red-500 hover:underline cursor-pointer" >x</a>
                                </div>
                            </li>
                        );
                    })
                }
                </ul>
                {chats.length > 0 ? null : <p className="text-center mt-auto mb-auto">Нет диалогов</p>}
            </div>
        </div>
    )
}
