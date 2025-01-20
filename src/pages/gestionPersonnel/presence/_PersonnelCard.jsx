import React from "react";

const PersonnelCard = ({
    photo,
    nom,
    prenom,
    poste,
    matricule,
    chaine,
    secteur
}) => {
    return (
        <div className="w-full h-auto rounded-[20px] shadow-lg overflow-hidden flex flex-col" style={{ backgroundColor: 'var(--primary-3)', color: 'var(--text-color)' }}>
            <div className="text-center py-3" style={{ backgroundColor: 'var(--primary-4)' }}>
                <h1 className="text-3xl font-bold uppercase">{matricule}</h1>
            </div>
            <div className="grid grid-cols-3 flex items-center justify-center px-4 py-5">
                <div className="flex items-center">
                    <img
                        src={photo}
                        alt="Profil"
                        className="w-62 h-60 max-h-[200px] rounded-lg border-white shadow-md"
                    />
                </div>

                <div
                    className="col-span-2 flex flex-col px-4 items-center justify-center"
                    style={{ color: 'var(--text-color)', height: '100%' }}
                >
                    <h2 className="text-2xl font-semibold mt-4 text-center">
                        {prenom} {nom}
                    </h2>
                    <hr className="my-2 w-[80%]" style={{ backgroundColor: 'var(--border-color)' }} />
                    <p className="text-center">
                        <span className="font-bold">Secteur :</span>
                        <span className="ml-2">{secteur}</span>
                    </p>
                    <p className="text-center">
                        <span className="font-bold">Poste :</span>
                        <span className="ml-2">{poste}</span>
                    </p>
                    {
                        chaine === "--" ? ("") : (
                            <p className="text-center">
                                <span className="font-bold">Chaine :</span>
                                <span className="ml-2">{chaine}</span>
                            </p>
                        )
                    }
                </div>

            </div>
        </div>
    );
};

export default PersonnelCard;
