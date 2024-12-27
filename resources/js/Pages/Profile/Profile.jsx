import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import TableActivity from '@/Components/TableActivity';

export default function Profile({ auth, user = false}) {

    const [csrfToken, setCsrfToken] = useState('');

    const [activity, setActivity] = useState([]);

    const {data, setData} = useForm({
        followed_id: user ? user.id : null,
        status: 'none',
    });

    useEffect(() => {
        if (user) {
            setData('followed_id', user.id);
            updateStatus();
        }
        const token = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
        setCsrfToken(token);
        getActivity();
    }, []);

    function getActivity() {
        const fetchData = async () => {
            try {
                const response = await fetch('/profile/' + user.name + '/activity?' + new URLSearchParams({
                    user_id: user.id,
                }));

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const result = await response.json();
                setActivity(result.activity);
            } catch (error) {
                console.error('Error /profile getActivity:', error);
            }
        };
        fetchData();
    }

    const follow = (e) => {
        e.preventDefault();
         const fetchData = async () => {
            try {
                const response = await fetch(route('buddies.follow'), {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        "X-CSRF-Token": csrfToken
                    },
                    body: JSON.stringify({followed_id: data.followed_id}),
                })

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                updateStatus();
            } catch (error) {
                console.error('Error /profile follow:', error);
            }
        };
        fetchData();
    }

    const unfollow = (e) => {
        e.preventDefault();
        const fetchData = async () => {
            try {
                const response = await fetch(route('buddies.unfollow'), {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        "X-CSRF-Token": csrfToken
                    },
                    body: JSON.stringify({followed_id: data.followed_id}),
                })
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                updateStatus();
            } catch (error) {
                console.error('Error /profile unfollow:', error);
            }
        };
        fetchData();
    }

    async function updateStatus () {
        try {
            const response = await fetch('/buddies/check?' + new URLSearchParams({
                follower_id: auth.user.id,
                followed_id: data.followed_id,
            }))

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const result = await response.json();
            setData('status', result.status);
        } catch (error) {
            console.error('Error /profile updateStatus:', error);
        }
    };

  return (
    <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">{user && user.name ? user.name : "--не найдено--"}</h2>}
        >
            <Head title="User's profile" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <div className="flex p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg dark:text-white justify-between" >
                        {user ?
                            <>
                                <div className="overflow-hidden content-center w-4/12" style={{width: "200px", height: "200px"}}>
                                    <img src={ user.avatar ? '/storage/avatars/1/' + user.avatar : '/assets/img/default.png'} alt='user avatar' />
                                </div>
                                <div className='w-9/12 relative flex flex-col justify-between'>
                                    <div>
                                        <p>name: {user.name}</p>
                                        <p>bio: ???</p>
                                    </div>
                                {auth.user.id !== user.id ?
                                    <div className='flex flex-col sm:flex-row justify-between items-end'>
                                        <div className="flex py-2">
                                            <Link href={route('chats.show', user.name)}><button className="p-2 rounded bg-emerald-600 hover:bg-emerald-700">В диалог</button></Link>
                                        </div>
                                        <div className="flex py-2">
                                            <p className="self-center mr-3">
                                                {data.status === "friends" ?
                                                    "Вы друзья"
                                                : data.status === "none" ?
                                                    "Вы не подписаны"
                                                : data.status === "following" ?
                                                    "Вы подписаны"
                                                : data.status === "followed" ?
                                                    "На вас подписаны"
                                                : null
                                                }
                                            </p>

                                            {data.status === 'none' || data.status === 'followed' ?
                                                <button className="p-2 rounded bg-cyan-600 hover:bg-cyan-700" onClick={follow}>подписаться</button>
                                            : data.status === 'following' || data.status === 'friends' ?
                                                <button className="p-2 rounded bg-red-600 hover:bg-red-700" onClick={unfollow}>отписаться</button>
                                            : null
                                            }
                                        </div>
                                    </div>
                                : null}
                                </div>
                            </>
                            :
                            <p>такой пользователь не найден</p>
                        }
                    </div>

                    {user ?
                        <div className="flex flex-col p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg dark:text-white">
                            <h1 className="mb-2 text-xl">Activity</h1>
                            <TableActivity activity={activity} />
                        </div>
                    : null}
                </div>
            </div>
    </AuthenticatedLayout>
  )
}
