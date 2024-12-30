import { useEffect, useState } from "react";
import { _BtnIcon } from "../../../components/_Bouton";
import { useNavigate } from "react-router-dom";
import api from "../../../api";
import _Tabs from "../../../components/Tab/_Tabs";
import _PersonnelCard from "./_PersonnelCard";
import { _LoadingComponents } from "../../../components/_Loading";

const Piquage = ({ labelSecteur, chaine }) => {
    const navigate = useNavigate();
    const [personnel, setPersonnel] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchPersonnelSecteur();
    }, [labelSecteur, chaine]); // Déclenche fetch lorsque labelSecteur ou chaine change

    const fetchPersonnelSecteur = async () => {
        try {
            const dataObject = { secteur: labelSecteur };
            const response = await api.post(`personnels/secteur`, JSON.stringify(dataObject));
            setPersonnel(response.data.personnels);
            console.log(response.data.personnels);
        } catch (error) {
            console.error("Error fetching personnel:", error);
        } finally {
            setLoading(false);
        }
    };

    const filteredPersonnel = personnel.filter(p => p.chaine === chaine);

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
                    />
                ))
            ) : (
                <div className="col-span-6 items-center justify-center flex">Aucun personnel trouvé pour cette chaîne.</div>
            )}
        </div>
    );
};

export default Piquage;
