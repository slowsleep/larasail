export default function ALAnimeGrid({ items }) {
    return (
        <div id="ALItems" className='hidden grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2'>
            {items.map((anime) => (
                <div key={anime.id} className="flex flex-col gap-y-2 dark:bg-gray-600 dark:hover:bg-gray-700 bg-gray-200 hover:bg-gray-300 p-2 relative w-fit overflow-hidden">
                    <p className="p-1 font-bold bg-white/70 absolute z-10 break-words text-center w-full inset-x-0">{anime.media.title.romaji}</p>
                    <img className='overflow-hidden' src={anime.media.coverImage.large} alt={anime.media.title.romaji} width={"100%"} />
                    <div className='flex justify-between'>
                        <p className='text-lg'>{anime.progress}/{anime.media.episodes}</p>
                        <div className='flex gap-x-2 items-center'>
                            <button className='text-2xl border border-green-600 rounded px-2 bg-green-600/20' disabled>+</button>
                            /
                            <button className='text-2xl border border-red-600 rounded px-2 bg-red-600/20' disabled>-</button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}
