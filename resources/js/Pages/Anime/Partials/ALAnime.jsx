import { useState } from 'react';

export default function ALAnime({ setALAnimeItems }) {
    const [ALAccessToken, setALAccessToken] = useState(localStorage.getItem('ALAccessToken') || null);
    const [isPress , setIsPress] = useState(false);

    const loadAnimeFromAL = () => {
        setIsPress(!isPress);
        let userID = localStorage.getItem('ALUserID');
        let query = `
        query ($type: MediaType!, $userId: Int!) {
            MediaListCollection(type: $type, userId: $userId, status: CURRENT) {
                lists {
                name
                entries {
                    id
                    progress
                    media {
                        id
                        episodes
                        title {
                            romaji
                            english
                            native
                        }
                        coverImage {
                            large
                        }
                    }
                }
                }
            }
        }
        `;

        const url = 'https://graphql.anilist.co',
        options = {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + ALAccessToken,
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({
                query: query,
                variables: {
                    type: "ANIME",
                    userId: userID
                }
            })
        };

        fetch(url, options).then(handleResponseGetList, handleError);

        function handleResponseGetList(response) {
            if (response.ok) {
                response.json().then(data => {
                    setALAnimeItems(data.data.MediaListCollection.lists[0].entries);
                    document.querySelector("#animeTable").classList.toggle("hidden");
                    document.querySelector("#ALItems").classList.toggle("hidden");
                });
            } else {
                alert("Error: " + response.status + " " + response.statusText);
            }
        }

        function handleError(error) {
            console.log(error);
        }
    }

    const hideAnilistAnime = () => {
        setIsPress(!isPress);
        document.querySelector("#animeTable").classList.toggle("hidden");
        document.querySelector("#ALItems").classList.toggle("hidden");
    }

    return (
        <>
            {ALAccessToken ? (
                <div>
                    {!isPress ? (
                        <button
                            className='p-2 border-1 border-teal-400 bg-teal-400/60 hover:bg-teal-400/80 dark:text-white'
                            onClick={loadAnimeFromAL}
                        >
                            show anilist anime
                        </button>
                    ) : (
                        <button
                            className='p-2 border-1 border-teal-400 bg-teal-400/60 hover:bg-teal-400/80 dark:text-white'
                            onClick={hideAnilistAnime}
                        >
                            hide anilist anime
                        </button>
                    )}
                </div>
            ) : ''}
        </>
    )
}
