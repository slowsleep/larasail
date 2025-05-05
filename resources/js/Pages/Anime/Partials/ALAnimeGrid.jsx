export default function ALAnimeGrid({ items }) {

    const increaseAnime = (e, anime) => {
        let currentEpisodeElement = e.currentTarget.parentElement.parentElement.firstChild;
        anime.progress++;
        currentEpisodeElement.textContent = anime.progress + '/' + anime.media.episodes;
        updateProgress(anime.media.id, anime.progress);
    }

    const decreaseAnime = (e, anime) => {
        let currentEpisodeElement = e.currentTarget.parentElement.parentElement.firstChild;
        anime.progress--;
        currentEpisodeElement.textContent = anime.progress + '/' + anime.media.episodes;
        updateProgress(anime.media.id, anime.progress);
    }

    async function updateProgress(animeId, newProgress) {
        const accessToken = localStorage.getItem('ALAccessToken');
        const query = `
            mutation ($mediaId: Int!, $progress: Int!) {
                SaveMediaListEntry(mediaId: $mediaId, progress: $progress) {
                    id
                    progress
                }
            }
        `;

        const variables = {
            mediaId: animeId,
            progress: newProgress
        };

        const response = await fetch("https://graphql.anilist.co", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${accessToken}`
            },
            body: JSON.stringify({ query, variables })
        });

        const data = await response.json();

        if (data.errors) {
            console.error("Error updating progress:", data.errors);
        }
    }


    return (
        <div id="ALItems" className='hidden grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2'>
            {items.map((anime) => (
                <div key={anime.id} className="flex flex-col gap-y-2 dark:bg-zinc-600 dark:hover:bg-zinc-700 bg-zinc-200 hover:bg-zinc-300 p-2 relative w-fit overflow-hidden">
                    <p className="p-1 font-bold bg-white/70 absolute z-10 break-words text-center w-full inset-x-0">{anime.media.title.romaji}</p>
                    <img className='overflow-hidden' src={anime.media.coverImage.large} alt={anime.media.title.romaji} width={"100%"} />
                    <div className='flex justify-between'>
                        <p className='text-lg'>{anime.progress}/{anime.media.episodes}</p>
                        <div className='flex gap-x-2 items-center'>
                            <button
                                className='text-2xl border border-green-600 rounded px-2 bg-green-600/20'
                                onClick={(e) => increaseAnime(e, anime)}
                            >
                                +
                            </button>
                            /
                            <button
                                className='text-2xl border border-red-600 rounded px-2 bg-red-600/20'
                                onClick={(e) => decreaseAnime(e, anime)}
                            >
                                -
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}
