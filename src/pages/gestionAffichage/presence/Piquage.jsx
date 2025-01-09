import { useEffect, useState, useMemo } from "react";
import { _BtnIcon } from "../../../components/_Bouton";
import { useNavigate } from "react-router-dom";
import api from "../../../api";
import _Tabs from "../../../components/Tab/_Tabs";
import _PersonnelCard from "./_PersonnelCard";
import { _LoadingComponents } from "../../../components/_Loading";

const Piquage = ({ labelPoste, chaine }) => {
    const navigate = useNavigate();
    const [personnel, setPersonnel] = useState([]);
    const [presence, setPresence] = useState([])
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchPersonnelPoste();
    }, [labelPoste, chaine]); // Déclenche fetch lorsque labelPoste ou chaine change

    const fetchPersonnelPoste = async () => {
        try {
            const dataObject = { poste: labelPoste };
            const response = await api.post(`personnels/poste`, JSON.stringify(dataObject));
            setPersonnel(response.data.personnels);
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
            setPresence(response.data.presences);
        } catch (error) {
            console.error('Error fetching categories:', error);
        } finally {
            setLoading(false);
        }
    };

    const filteredPersonnel = useMemo(() => {
        return personnel.filter(p => p.chaine === chaine);
    }, [personnel, chaine]); 

    return (
        <div className="flex grid grid-cols-6 gap-4 mt-3">
            {loading ? (
                <div className="col-span-6">
                    <_LoadingComponents />
                </div>
            ) : filteredPersonnel.length > 0 ? (
                filteredPersonnel.map((personnel) => (
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
                <div className="col-span-6 items-center justify-center flex">Aucun personnel trouvé pour cette chaîne.</div>
            )}
        </div>
    );
};

export default Piquage;
