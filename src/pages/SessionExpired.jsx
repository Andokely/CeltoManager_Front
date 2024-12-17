import React from "react";

const SessionExpired = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen"
            style={{ backgroundColor: 'var(--primary-1)' }}
        >
            <div className="shadow-lg rounded-lg p-8 max-w-md text-center"
                style={{ backgroundColor: 'var(--primary-3)', color: 'var(--text-color)' }}
            >
                <h1 className="text-3xl font-bold text-red-600 mb-4">
                    Session expirée
                </h1>
                <p className="text-gray-600 mb-6">
                    Votre session a expiré en raison d'une inactivité ou d'un jeton invalide. Veuillez vous reconnecter pour continuer
                </p>

                <a
                    href="/login"
                    className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-6 rounded transition duration-300 ease-in-out"
                >
                    Retour à la connexion
                </a>
            </div>

            <div className="mt-6">
                <img
                    src="https://i.imgur.com/oCkEbrA.png"
                    alt="Session Expired"
                    className="w-24 h-24"
                />
            </div>
        </div>
    );
};

export default SessionExpired;
