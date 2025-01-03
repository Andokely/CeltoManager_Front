import { useEffect, useState } from "react";
import { _BtnIcon } from "../../../components/_Bouton";
import { useNavigate } from "react-router-dom";
import api from "../../../api";
import _Tabs from "../../../components/Tab/_Tabs";
import _PersonnelCard from "./_PersonnelCard";

const PresenceSecteur = ({ labelSecteur }) => {
    const navigate = useNavigate();
    const [personnel, setPersonnel] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchPersonnelSecteur();
    }, [labelSecteur]);

    const fetchPersonnelSecteur = async () => {
        try {
            const dataObject = { secteur: labelSecteur }
            const response = await api.post(`personnels/secteur`, JSON.stringify(dataObject));
            setPersonnel(response.data);
        } catch (error) {
            console.error("Error fetching personnel:", error);
        } finally {
            setLoading(false);
        }
    };

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

export default PresenceSecteur;
