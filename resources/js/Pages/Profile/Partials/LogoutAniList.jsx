export default function LogoutAniList({ accessToken, setAccessToken }) {
    const logoutAniList = () => {
        localStorage.removeItem('ALAccessToken');
        localStorage.removeItem('ALUserID');
        setAccessToken(null);
    }

    return (
        <>
            {accessToken ? (
                <button className="p-4 rounded bg-red-600/50 hover:bg-red-800/50 w-full lg:w-auto" onClick={logoutAniList}>Убрать синхронизацию</button>
            ) : ''}
        </>
    )
}
