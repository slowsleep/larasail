import { useState, useEffect } from "react";

export default function BuddyItem({auth, buddy}) {

    const [relationships, setRelationships] = useState('');

    const [csrfToken, setCsrfToken] = useState('');

    useEffect(() => {
      const token = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
      setCsrfToken(token);
    }, []);

    const follow = (followed_id) => {
         const fetchData = async () => {
            try {
                const response = await fetch(route('buddies.follow'), {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        "X-CSRF-Token": csrfToken
                    },
                    body: JSON.stringify({followed_id: followed_id}),
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const result = await response.json();
                updateStatus(followed_id);
                setRelationships(result.status);
            } catch (error) {
                console.error('Error /buddies follow:', error);
            }
        };
        fetchData();
    }

    const unfollow = (followed_id) => {
        const fetchData = async () => {
            try {
                const response = await fetch(route('profile.unfollow'), {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        "X-CSRF-Token": csrfToken
                    },
                    body: JSON.stringify({followed_id: followed_id}),
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const result = await response.json();
                updateStatus(followed_id);
                setRelationships(result.status);
            } catch (error) {
                console.error('Error /buddies unfollow:', error);
            }
        };
        fetchData();
    }

    useEffect(() => {
        updateStatus(buddy.id);
    }, [buddy]);

    async function updateStatus (followed_id) {
        try {
            const response = await fetch('/buddies/check?' + new URLSearchParams({
                follower_id: auth.user.id,
                followed_id: followed_id,
            }))

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const result = await response.json();
            setRelationships(result.status);

            return result.status;
        } catch (error) {
            console.error('Error /buddies updateStatus:', error);

            return false;
        }
    };

  return (
    <div className="flex justify-between border-b border-gray-200">
        <p><a href={route('profile.show', buddy.name)} className="text-white hover:pointer">{buddy.name}</a></p>
        <div>
            {relationships === "followed" || relationships === "none" ?
                <button className="p-1 rounded bg-cyan-600 hover:bg-cyan-800" onClick={() => follow(buddy.id)}>подписаться</button>
            : relationships === "friends" || relationships === "following" ?
                <button className="p-1 rounded bg-red-600 hover:bg-red-800" onClick={() => unfollow(buddy.id)}>отписаться</button>
            : null
            }
        </div>
    </div>
  )
}
