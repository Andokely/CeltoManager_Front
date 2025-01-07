function ErrorPage() {

    return (
        <>
            <div className="flex flex-col bg-black items-center justify-center h-screen"
                style={{ backgroundColor: 'var(--primary-1)' }}
            >

                <div className="shadow-lg rounded-lg p-8 max-w-md text-center"
                    style={{ backgroundColor: 'var(--primary-3)', color: 'var(--text-color)' }}>
                    <h1 className="text-6xl font-extrabold text-blue-600 mb-4">404</h1>
                    <h2 className="text-2xl font-bold mb-2">
                        Page introuvable
                    </h2>
                    <p className="mb-6">
                        Oups ! La page que vous recherchez semble ne pas exister. Vérifiez
                        l'URL ou retournez à l'accueil.
                    </p>


                    <a
                        href="/"
                        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded transition duration-300 ease-in-out"
                    >
                        Retour à l'accueil
                    </a>
                </div>


                <div className="mt-6">
                    <img
                        src="https://i.imgur.com/qIufhof.png"
                        alt="404 Not Found"
                        className="w-32 h-32"
                    />
                </div>
            </div>
        </>
    )
}

export default ErrorPage