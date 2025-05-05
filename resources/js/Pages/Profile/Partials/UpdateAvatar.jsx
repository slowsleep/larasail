import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import { useForm, usePage } from '@inertiajs/react';
import { Transition } from '@headlessui/react';
import SecondaryButton from '@/Components/SecondaryButton';

export default function UpdateAvatar({className = ''}) {
    const user = usePage().props.auth.user;

    const { data, setData, post, delete: destroy, errors, processing, recentlySuccessful, progress } = useForm({
        avatar: user.avatar,
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('avatar.update'), data, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    };

    const destroyAvatar = (e) => {
        e.preventDefault();
        let confirmation = confirm("Вы уверены, что хотите удалить свой аватар?");
        if (confirmation) {
            destroy(route('avatar.destroy'));
        }
    }

  return (
    <section className={className}>
        <header>
            <h2 className="text-lg font-medium text-zinc-900 dark:text-zinc-100">User avatar</h2>
        </header>
        <div className="overflow-hidden content-center" style={{width: "200px", height: "200px"}}>
            <img className='w-full' src={ user.avatar ? '/storage/avatars/1/' + user.avatar : '/assets/img/default.png'} alt='user avatar' />
        </div>
        <form onSubmit={submit} className="mt-6 space-y-6" >

            <div>
                <InputLabel htmlFor="avatar" value="Avatar" />

                <input
                    id="avatar"
                    type="file"
                    className="mt-1 block w-full"
                    name="avatar"
                    onChange={(e) => setData("avatar", e.target.files[0])}
                />

                <InputError className="mt-2" message={errors.avatar} />
                {progress && (
                <progress value={progress.percentage} max="100">
                    {progress.percentage}%
                </progress>
                )}
            </div>

            <div className="flex items-center gap-4">
                    <PrimaryButton disabled={processing}>Save</PrimaryButton>

                    <SecondaryButton onClick={destroyAvatar} disabled={processing}>delete</SecondaryButton>

                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out"
                        leaveTo="opacity-0"
                    >
                        <p className="text-sm text-zinc-600 dark:text-zinc-400">Saved.</p>
                    </Transition>
            </div>

        </form>
    </section>
  )
}
