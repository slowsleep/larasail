import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Profile({ auth, user = false }) {

  return (
    <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">{user && user.name ? user.name : "--не найдено--"}</h2>}
        >
            <Head title="User's profile" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <div className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg text-white" >

                        {user  ?

                            <>
                                <p>{user.name}</p>
                                <div className="overflow-hidden content-center" style={{width: "200px", height: "200px"}}>
                                    <img className='w-full' src={ user.avatar ? '/storage/avatars/1/' + user.avatar : '/assets/img/default.png'} alt='user avatar' />
                                </div>
                            </>
                            :
                            <p>такой пользователь не найден</p>

                        }
                    </div>
                </div>
            </div>
    </AuthenticatedLayout>
  )
}
