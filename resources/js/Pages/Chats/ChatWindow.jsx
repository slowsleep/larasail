import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function ChatWindow({ auth, chat }) {

    const [messages, setMessages] = useState(chat.messages);
    const [message, setMessage] = useState('');

    useEffect(() => {
        const channel = window.Echo.private(`chat.${chat.id}`);
        channel.listen('MessageSent', (e) => {
            setMessages([...messages, e.message]);
        });

        return () => {
            channel.stopListening('MessageSent');
        };
    }, [messages]);

    // Message scrolling to the newest message
    useEffect(() => {
        let messages = document.querySelector('.messages');
        let timer;
        let isPaused = false;

        window.addEventListener('wheel', function(){
            isPaused = true;
            clearTimeout(timer);
            timer = window.setTimeout(function(){
                isPaused = false;
            }, 1000);
        })

        window.setInterval(function(){
            if(!isPaused && messages) {
                messages.scrollTop = messages.scrollHeight;
            }
        }, 500);
    })

    const handleSendMessage = (e) => {
        e.preventDefault();

        axios.post(route('messages.store'), {
            chat_id: chat.id,
            message: message,
        }).then(response => {
            setMessages([...messages, response.data.message]);
            setMessage('');
        });
    };

    const keyDownFunction = (event) => {
        if (event.keyCode === 13 && !event.shiftKey) {
            event.preventDefault();
            handleSendMessage(event);
        }
    };

    const formatDate = (date) => {
        const d = new Date(date);
        return `${d.getDate()}.${d.getMonth() + 1}.${d.getFullYear()}`;
    };

    const formatTime = (date) => {
        const d = new Date(date);
        return `${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`;
    };

    return (
        <div className="container mx-auto p-4 h-full">
            <div className="flex flex-col p-4 bg-gray-100 rounded w-full h-full overflow-y-auto">
                <h4 className="text-lg font-bold text-center underline">chat name: {chat.name}</h4>
                <div className="messages mb-4 flex flex-col overflow-y-auto">
                    {messages.map(msg => (
                        <div key={msg.id} className={"mb-2 p-1 bg-gray-200 p-1 rounded px-2 " + (msg.user.id === auth.user.id ? 'ml-auto' : 'mr-auto')}>
                            <p className={msg.user.id === auth.user.id ? 'text-right' : ''}><strong>{msg.user.name}</strong></p>
                            <p>{msg.content}</p>
                            <p className="text-sm text-end text-gray-500" title={formatDate(msg.created_at)}>{formatTime(msg.created_at)}</p>
                        </div>
                    ))}
                </div>
                <form onSubmit={handleSendMessage} className="flex flex-row gap-x-2">
                    <div className="w-full">
                        <textarea
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            name="message"
                            className="w-full p-2 border rounded"
                            rows="1"
                            placeholder="Введите сообщение"
                            onKeyDown={keyDownFunction}
                            spellcheck="true"
                            maxLength={4096}
                            required
                        />
                    </div>
                    <button type="submit" className="bg-blue-500 text-white px-4 rounded">
                        Отправить
                    </button>
                </form>
            </div>
        </div>
    );
};
