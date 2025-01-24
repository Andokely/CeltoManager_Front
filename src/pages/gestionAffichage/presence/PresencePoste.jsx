import { useEffect, useState } from "react";
import { _BtnIcon } from "../../../components/_Bouton";
import { useNavigate } from "react-router-dom";
import api from "../../../api";
import _Tabs from "../../../components/Tab/_Tabs";
import _PersonnelCard from "./_PersonnelCard";
import { io } from "socket.io-client";
import config from "../../../../config.json";

const PresencePoste = ({ labelPoste }) => {
    const navigate = useNavigate();
    const [personnel, setPersonnel] = useState([]);
    const [loading, setLoading] = useState(true);
    const [presence, setPresence] = useState([]);

    useEffect(() => {
        fetchPersonnelPoste();
    }, [labelPoste]);

    const fetchPersonnelPoste = async () => {
        try {
            const dataObject = { poste: labelPoste };
            const response = await api.post(`personnels/poste`, JSON.stringify(dataObject));
            setPersonnel(response.data);
        } catch (error) {
            console.error("Error fetching personnel:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPresence();
    }, []);

    const fetchPresence = async () => {
        try {
            const response = await api.get(`/presences`);
            setPresence(response.data.presences.map(p => p.personnel.matricule)); 
        } catch (error) {
            console.error('Error fetching categories:', error);
        } finally {
            setLoading(false);
        }
    };

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

    return (
        <>
            <div className="p-3 flex gap-8 rounded-lg" style={{ backgroundColor: 'var(--primary-5)' }}>
                <div className="flex items-center">
                    <span className="h-6 w-6 rounded-lg" style={{ backgroundColor: 'var(--primary-4)' }}></span>
                    <span className="ml-3" style={{ color: 'var(--text-color)' }}>Présent</span>
                </div>
                <div className="flex items-center">
                    <span className="h-6 w-6 rounded-lg" style={{ backgroundColor: 'var(--primary-6)' }}></span>
                    <span className="ml-3" style={{ color: 'var(--text-color)' }}>Absent</span>
                </div>
            </div>

            <div className="flex grid grid-cols-8 gap-4 mt-3">
                {personnel.personnels && personnel.personnels.length > 0 ? (
                    personnel.personnels.map((personnel) => (
                        <_PersonnelCard
                            key={personnel.id}
                            matricule={personnel.matricule}
                            nom={personnel.nom}
                            prenoms={personnel.prenoms}
                            lienPhoto={personnel.lienPhoto}
                            po={personnel.po}
                            presences={presence}
                        />
                    ))
                ) : (
                    <div className="col-span-8 flex justify-center mt-3">
                        <p>Aucun personnel trouvé.</p>
                    </div>
                )}
            </div>
        </>
    );
};

export default PresencePoste;
