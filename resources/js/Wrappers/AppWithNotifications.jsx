import { useState, useEffect, useRef } from 'react';
import { router } from '@inertiajs/react';
import { toast } from 'react-toastify';
import ToastMessageNotification from '@/Components/ToastMessageNotification';

export default function AppWithNotifications({ App, props }) {
    const [user, setUser] = useState(props.initialPage.props.auth.user);
    const channelRef = useRef(null);

    useEffect(() => {
        const updateUser = router.on('navigate', (event) => {
            const newUser = event.detail.page.props.auth.user;
            if (JSON.stringify(newUser) !== JSON.stringify(user)) {
                setUser(newUser);
            }
        });
        
        return () => {
            updateUser();
        };
    }, [user]);

    useEffect(() => {
        const handleNotification = (notification) => {
            if (window.location.pathname !== `/chats/${notification.message.user.name}`) {
                toast(<ToastMessageNotification notification={notification} />, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }
        };

        // Stop listening to the channel if the user is not logged in
        if (!user && channelRef.current) {
            channelRef.current.stopListening('.Illuminate\\Notifications\\Events\\BroadcastNotificationCreated');
            channelRef.current.unsubscribe();
            channelRef.current = null;

            if (window.Echo.connector.pusher) {
                window.Echo.connector.pusher.disconnect();
            }
        }

        // Listening to the channel if the user is logged in
        if (user && (!channelRef.current)) {
            if (!window.Echo.connector.pusher.connected) {
                window.Echo.connector.pusher.connect();
            }

            const channel = window.Echo.private(`App.Models.User.${user.id}`);
            channel.listen('.Illuminate\\Notifications\\Events\\BroadcastNotificationCreated', handleNotification);
            channelRef.current = channel;
        }
    }, [user]);

    return <App {...props} />;
}
