import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from '@inertiajs/react';
import BuddyItem from "./BuddyItem";

export default function Buddies({auth, buddies}) {

    const {data, setData, get} = useForm({
        search: '',
        findall: false,
    });

    const submit = (e) => {
        e.preventDefault();
        get(route('buddies.search'), {
            preserveScroll: true,
        });
    }

  return (
    <AuthenticatedLayout
        user={auth.user}
        header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Buddies</h2>}
    >
        <Head title="Buddies" />

        <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg p-6 flex flex-col gap-y-4">

                        <form className="flex justify-between" onSubmit={submit}>
                            <input className="w-full" type="text" name="search" placeholder="Search" value={data.search} onChange={(e) => setData('search', e.target.value)} />
                            <div className="w-1/2">
                                <div className="text-center">
                                    <label className="text-white mr-2" htmlFor="findall">Find all</label>
                                    <input type="checkbox" id="findall" name="findall" checked={data.findall} onChange={(e) => setData('findall', e.target.checked)} />
                                </div>
                                <button className="p-4 rounded bg-cyan-600 hover:bg-cyan-800 w-full" type="submit">search</button>
                            </div>
                        </form>
                        <p className="text-white">List of buddies: </p>
                        {buddies.map((buddy) => (
                            <BuddyItem key={buddy.id} auth={auth} buddy={buddy} />
                        ))}
                    </div>
                </div>
        </div>
    </AuthenticatedLayout>
  )
}
