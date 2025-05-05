import { useEffect } from "react";

export default function LoginAniList({ accessToken, setAccessToken }) {
    const anilClientID = import.meta.env.VITE_ANILIST_CLIENT_ID;

    useEffect(() => {
        if (!accessToken) {
            const urlParams = new URLSearchParams(window.location.hash.substring(1));
            const accessToken = urlParams.get('access_token');

            if (accessToken) {
                localStorage.setItem('ALAccessToken', accessToken);
                setAccessToken(accessToken);
                getAndSetALUserID(accessToken);
                window.history.replaceState({}, document.title, window.location.pathname);
            }
        }
    }, [accessToken]);

    function getAndSetALUserID(accessToken) {
        var query = `
        {
            Viewer {
                id
                name
            }
        }
        `;

        const url = 'https://graphql.anilist.co',
            options = {
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer ' + accessToken,
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify({
                    query: query
                })
        };

        fetch(url, options).then(handleResponse, handleError);

        function handleResponse(response) {
            if (response.ok) {
                response.json().then(data => {
                    let userID = data.data.Viewer.id;
                    localStorage.setItem('ALUserID', userID);
                });
            }
        }

        function handleError(error) {
            console.log(error);
        }
    }

    return (
        <div>
            {accessToken ? (
                <p>Вы синхронизировались с AniList</p>
            ) : (
                <a
                    className="p-2 rounded-lg bg-emerald-600 hover:bg-emerald-800 w-full lg:w-auto"
                    href={`https://anilist.co/api/v2/oauth/authorize?client_id=${anilClientID}&response_type=token`}
                >
                    Login with AniList
                </a>
            )}
        </div>
    );
}
