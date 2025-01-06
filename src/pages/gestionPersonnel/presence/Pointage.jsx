import { useState, useEffect } from "react"
import _Heure from "./_Heure"
import PersonnelCard from "./_PersonnelCard"
import { getCurrentTime } from "../../../fonction"
import api from "../../../api"
import { addNotify, errorNotify } from "../../../components/Notification/ToastUtil"
import _TabGroup from "../../../components/Tab/_TabGroup"
import { lireTexte } from "../../../fonction"

const Pointage = ({ initialTypePointage }) => {
    const [personnel, setPersonnel] = useState([])
    const [typePointage, setTypePointage] = useState(initialTypePointage || null);
    const initialFormState = {
        matricule: '',
    }
    const [formDatas, setFormDatas] = useState(initialFormState);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormDatas({
            ...formDatas,
            [name]: value,
        });
    };

    useEffect(() => {
        setTypePointage(initialTypePointage || null);
        setFormDatas(initialFormState);
    }, [initialTypePointage]);

    const handleSubmit = async () => {
        try {
            if (
                typePointage !== "Entrée matin" &&
                typePointage !== "Entrée après-midi" &&
                typePointage !== "Sortie après-midi"
            ) {
                throw new Error("Type de pointage invalide. Veuillez vérifier votre sélection.");
            }

            const dynamicField = typePointage.includes("Entrée") ? "entree" : "sortie";

            const updatedFormDatas = {
                ...formDatas,
                [dynamicField]: getCurrentTime(),
            };

            const endpoint =
                typePointage === "Entrée matin" || typePointage === "Entrée après-midi"
                    ? "/presences"
                    : "/presences/sortie";

            const response = await api.post(endpoint, JSON.stringify(updatedFormDatas));

            const personnel = await api.get(`/personnels/${response.data.presence.personnelId}`);
            setPersonnel(personnel.data);

            lireTexte(personnel.data.matricule, 1, 1, 1);
            addNotify({ message: personnel.data.matricule });

            setFormDatas(initialFormState);
        } catch (error) {
            const errorMessage =
                error.response?.data?.message ||
                error.message ||
                "Une erreur est survenue";
            lireTexte("Erreur");
            errorNotify({ message: errorMessage });
        }
    };


    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            handleSubmit();
        }
    };

    return (
        <>
            <div className="h-[55vh] w-full flex flex-col overflow-hidden relative">
                <div className="absolute grid grid-cols-7 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-[50px] shadow-lg h-[340px] w-[850px]"
                    style={{ backgroundColor: 'var(--primary-3)', color: 'var(--text-color)' }}>
                    <div className='h-full col-span-3 flex flex-col justify-center space-y-12 items-center'>
                        < _Heure />
                        <div className='w-4/5 max-w-md'>
                            <div className=''>
                                <div className='flex flex-col'>
                                    {/* <label htmlFor="username" className='text-gray-400 mb-1'>Matricule : </label> */}
                                    <input
                                        id="pseudo"
                                        name='matricule'
                                        type="text"
                                        placeholder='Matricule...'
                                        value={formDatas.matricule}
                                        onKeyPress={handleKeyPress}
                                        onChange={handleChange}
                                        className='border-2 border-gray-300 rounded-lg px-4 py-2 bg-transparent focus:shadow-blue-900 focus:ring-0 focus:outline-none h-10 shadow-sm' />
                                </div>
                            </div>
                            <div className='mt-6 text-center'>
                                <button
                                    onClick={handleSubmit}
                                    className='bg-[#2A3DEA] hover:bg-blue-900 text-white px-9 py-2 rounded-xl w-full'>
                                    Valider
                                </button>
                            </div>
                        </div>
                    </div>
                    <div
                        className="h-full w-full p-5 flex items-center justify-center col-span-4 rounded-r-[50px]"
                        style={{
                            backgroundColor: 'var(--primary-3)',
                            color: 'var(--text-color)',
                        }}
                    >
                        <PersonnelCard
                            photo={`/profil/${personnel.lienPhoto || 'x.jpeg'}`}
                            nom={personnel.nom || '--'}
                            prenom={personnel.prenoms || '--'}
                            poste={personnel.poste || '--'}
                            matricule={personnel.matricule || '--'}
                            chaine={personnel.chaine || '--'}
                            secteur={personnel.secteur || '--'}
                        />
                        {/* <PersonnelCard
                            photo={`/profil/${personnel.lienPhoto || 'x.jpeg'}`}
                            nom={personnel.nom || 'RATOVONANAHARY'}
                            prenom={personnel.prenoms || 'ANDONIANA MICKAEL'}
                            poste={personnel.poste || 'MACHINISTE'}
                            matricule={personnel.matricule || 'F2452'}
                            chaine={personnel.chaine || '5'}
                            secteur={personnel.secteur || 'BUREAU'}
                        /> */}
                    </div>
                </div>
            </div>
        </>
    )

}

export default Pointage