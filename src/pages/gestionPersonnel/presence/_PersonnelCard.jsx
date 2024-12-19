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
        <div className="w-full h-full shadow-lg rounded-[50px] overflow-hidden flex flex-col" style={{ backgroundColor: 'var(--primary-1)', color: 'var(--text-color)' }}>
            <div className="text-center py-4" style={{ backgroundColor: 'var(--primary-4)' }}>
                <h1 className="text-lg font-bold uppercase">{poste}</h1>
            </div>
            <div className="flex flex-col items-center mt-6" style={{ color: 'var(--text-color)' }}>
                <img
                    src={photo}
                    alt="Profil"
                    className="w-36 h-36 rounded-full border-4 border-white shadow-md"
                />
                <h2 className="text-xl font-semibold mt-4">
                    {prenom} {nom}
                </h2>
                <p className="">
                    <span className="font-bold">Secteur :</span> {secteur}
                </p>
                <p className="">
                    <span className="font-bold">Poste :</span> {poste}
                </p>
                <p className="">
                    <span className="font-bold">Chaine :</span> {chaine}
                </p>
            </div>

            <div className="flex mt-5 justify-center">
                <p className="" style={{ color: 'var(--text-color)' }}>
                    <span className="font-bold text-5xl">{matricule}</span>
                </p>
            </div>
        </div>
    );
};

export default PersonnelCard;
