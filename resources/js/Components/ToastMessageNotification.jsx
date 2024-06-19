import { Link } from '@inertiajs/react';

export default function ToastMessageNotification({notification}) {
    return (
        <div>
            <Link href={route('chats.show', notification.message.user.name)}>
                <p><b>{notification.message.user.name}</b></p>
                <p>{notification.message.content}</p>
            </Link>
        </div>
    )
}
