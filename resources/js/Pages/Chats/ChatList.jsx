import NavLink from '@/Components/NavLink';
import { router } from '@inertiajs/react';

export default function ChatList({auth, chats}) {

    function deleteChat(e) {
        e.preventDefault();
        router.delete(`/chats/${e.target.chat_id.value}`);
    }

    return (
        <div className="container mx-auto p-2 h-full overflow-y-auto">
            <div className="flex flex-col h-full">
                <h4 className="text-lg font-bold">Ваши диалоги</h4>
                <ul className="list-none">
                    {chats.map(chat => {
                        const otherUser = chat.users.find(u => u.id !== auth.user.id);
                        return (
                            <li key={chat.id}>
                                <div className="flex mb-2 bg-zinc-600 hover:bg-zinc-900 p-2 justify-between rounded-lg">
                                    <NavLink
                                        href={`/chats/${otherUser.name}`}
                                        className="text-blue-500 hover:underline"
                                        active={route().current('chats.show', otherUser.name)}
                                    >
                                        {chat.name}
                                    </NavLink>
                                    <form onSubmit={deleteChat}>
                                        <input type="hidden" name="chat_id" value={chat.id}/>
                                        <button type="submit" className="text-red-500 hover:underline cursor-pointer" >x</button>
                                    </form>
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
