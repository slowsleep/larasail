import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';
import UpdateAvatar from './Partials/UpdateAvatar';
import { Head } from '@inertiajs/react';
import LoginAniList from '@/Pages/Profile/Partials/LoginAniList';
import LogoutAniList from '@/Pages/Profile/Partials/LogoutAniList';
import { useState } from 'react';

export default function Edit({ auth, mustVerifyEmail, status }) {
    const [ALAccessToken, setALAccessToken] = useState(localStorage.getItem('ALAccessToken') || null);

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Profile settings</h2>}
        >
            <Head title="Profile" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <div className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg text-white" >
                        <UpdateAvatar />
                    </div>
                    <div className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg">
                        <UpdateProfileInformationForm
                            mustVerifyEmail={mustVerifyEmail}
                            status={status}
                            className="max-w-xl"
                        />
                    </div>

                    <div className="p-4 sm:p-8 dark:text-white bg-white dark:bg-gray-800 shadow sm:rounded-lg">
                        <h2 className='text-2xl mb-4'>Synchronize with AniList</h2>
                        <LoginAniList accessToken={ALAccessToken} setAccessToken={setALAccessToken} />
                        <LogoutAniList accessToken={ALAccessToken} setAccessToken={setALAccessToken}  />
                    </div>

                    <div className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg">
                        <UpdatePasswordForm className="max-w-xl" />
                    </div>

                    <div className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg">
                        <DeleteUserForm className="max-w-xl" />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
