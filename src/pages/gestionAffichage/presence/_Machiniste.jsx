import { useEffect, useState, useMemo } from "react";
import api from "../../../api";
import _PersonnelCard from "./_PersonnelCard";
import { _LoadingComponents } from "../../../components/_Loading";

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
                setPersonnel(personnelResponse.data.personnels || []);
                setPresence(presenceResponse.data.presences || []);
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [labelPoste]);

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
