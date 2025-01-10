function NotAccess() {
    return (
        <>
            <div
                className="flex flex-col bg-black items-center justify-center h-screen"
                style={{ backgroundColor: 'var(--primary-1)' }}
            >
                <div
                    className="shadow-lg rounded-lg p-8 max-w-md text-center"
                    style={{ backgroundColor: 'var(--primary-3)', color: 'var(--text-color)' }}
                >
                    <h1 className="text-6xl font-extrabold text-red-600 mb-4">403</h1>
                    <h2 className="text-2xl font-bold mb-2">Accès refusé</h2>
                    <p className="mb-6">
                        Désolé, vous n'avez pas les permissions nécessaires pour accéder à cette
                        page. Veuillez contacter l'administrateur ou retourner à l'accueil.
                    </p>

                    <a
                        href="/"
                        className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-6 rounded transition duration-300 ease-in-out"
                    >
                        Retour à l'accueil
                    </a>
                </div>

                <div className="mt-6">
                    <img
                        src="https://i.imgur.com/Z6XkDBI.png" // Image d'accès refusé
                        alt="Access Denied"
                        className="w-32 h-32"
                    />
                </div>
            </div>
        </>
    );
}

export default NotAccess;
