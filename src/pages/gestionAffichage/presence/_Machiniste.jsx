import { useEffect, useState, useMemo } from "react";
import { io } from "socket.io-client";
import api from "../../../api";
import _PersonnelCard from "./_PersonnelCard";
import { _LoadingComponents } from "../../../components/_Loading";
import config from "../../../../config.json"

const _Machiniste = ({ labelPoste, chaine }) => {
    const [personnel, setPersonnel] = useState([]);
    const [presence, setPresence] = useState([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const [personnelResponse, presenceResponse] = await Promise.all([
                    api.post("personnels/poste", JSON.stringify({ poste: labelPoste })),
                    api.get("/presences"),
                ]);
        
                const initialPresence = presenceResponse.data.presences.map(p => p.personnel.matricule);
        
                setPersonnel(personnelResponse.data.personnels || []);
                setPresence(initialPresence);
            } catch (error) {
                console.error("Erreur lors de la récupération des données:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [labelPoste]);

    useEffect(() => {
        const socket = io(config.SOCKET);
    
        socket.on("updateMatricule", (matricule) => {
    
            setPresence((prevPresence) => {
                if (!prevPresence.includes(matricule)) {
                    return [...prevPresence, matricule];
                }
                return prevPresence;
            });
        });
    
        return () => {
            socket.disconnect();
        };
    }, []);
    
    


    const filteredPersonnel = useMemo(
        () => personnel.filter((p) => p.chaine === chaine),
        [personnel, chaine]
    );

    if (loading) {
        return (
            <div className="flex justify-center items-center w-full">
                <_LoadingComponents />
            </div>
        );
    }

    return (
        <div className="flex flex-col w-full gap-2">
            {filteredPersonnel.length > 0 ? (
                filteredPersonnel.map((person) => (
                    <_PersonnelCard
                        key={person.id}
                        matricule={person.matricule}
                        nom={person.nom}
                        prenoms={person.prenoms}
                        lienPhoto={person.lienPhoto}
                        po={person.po}
                        presences={presence}
                    />
                ))
            ) : (
                <div className="flex justify-center items-center w-full">
                    Aucun personnel trouvé pour cette chaîne.
                </div>
            )}
        </div>
    );
};

export default _Machiniste;
