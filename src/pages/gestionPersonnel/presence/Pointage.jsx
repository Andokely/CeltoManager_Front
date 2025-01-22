import { useState, useEffect, useRef } from "react";
import _Heure from "./_Heure";
import PersonnelCard from "./_PersonnelCard";
import { getCurrentTime } from "../../../fonction";
import api from "../../../api";
import { addNotify, errorNotify, checkNotify } from "../../../components/Notification/ToastUtil";
import _TabGroup from "../../../components/Tab/_TabGroup";
import { lireTexte } from "../../../fonction";
import { limiterCaractere } from "../../../fonction";

const Pointage = ({ initialTypePointage }) => {
    const [personnel, setPersonnel] = useState([]);
    const [typePointage, setTypePointage] = useState(initialTypePointage || null);
    const initialFormState = {
        matricule: '',
    };
    const [formDatas, setFormDatas] = useState(initialFormState);
    const [loading, setLoading] = useState(true);
    const [presences, setPresences] = useState([]);

    const listRef = useRef(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormDatas({
            ...formDatas,
            [name]: value,
        });
    };

    const [nombre, setNombre] = useState(0)
    const [effectif, setEffectif] = useState(0)

    useEffect(() => {
        setTypePointage(initialTypePointage || null);
        setFormDatas(initialFormState);
    }, [initialTypePointage]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [presenceResponse, personnelResponse] = await Promise.all([
                    api.get('/presences'),
                    api.get('/personnels'),
                ]);
                setPresences(presenceResponse.data.presences);
                setNombre(presenceResponse.data.presences.length);
                setEffectif(personnelResponse.data.personnels.length);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);


    const scrollToBottom = () => {
        if (listRef.current) {
            listRef.current.scrollTop = listRef.current.scrollHeight;
        }
    };

    useEffect(() => {
        scrollToBottom();
    }, [presences]);

    useEffect(() => {
        if (listRef.current) {
            listRef.current.scrollTop = listRef.current.scrollHeight;
        }
    }, [presences]);

    const handleSubmit = async () => {
        try {
            if (!['Entrée matin', 'Entrée après-midi', 'Sortie après-midi'].includes(typePointage)) {
                throw new Error("Type de pointage invalide. Veuillez vérifier votre sélection.");
            }

            const dynamicField = typePointage.includes("Entrée") ? "entree" : "sortie";
            const updatedFormDatas = { ...formDatas, [dynamicField]: getCurrentTime() };

            const endpoint = typePointage.includes("Entrée") ? "/presences" : "/presences/sortie";
            const response = await api.post(endpoint, JSON.stringify(updatedFormDatas));
            const personnelResponse = await api.get(`/personnels/${response.data.presence.personnelId}`);

            setPersonnel(personnelResponse.data);
            setNombre(prev => prev + 1);  // Utilisation de la mise à jour fonctionnelle
            checkNotify({ message: personnelResponse.data.matricule });

            setPresences((prevPresences) => [
                ...prevPresences,
                { personnel: personnelResponse.data }
            ]);
            setFormDatas(initialFormState);
        } catch (error) {
            const errorMessage = error.response?.data?.message || error.message || "Une erreur est survenue";
            errorNotify({ message: errorMessage });
            setFormDatas(initialFormState);
        }
    };


    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            handleSubmit();
        }
    };

    return (
        <>
            <div className="h-[54vh] w-full flex">
                <div className="grid grid-cols-9 rounded-lg"
                    style={{ backgroundColor: 'var(--primary-3)', color: 'var(--text-color)' }}>
                    <div className="px-1 overflow-y-auto col-span-2" style={{ backgroundColor: 'var(--primary-3)', color: 'var(--text-color)' }} ref={listRef}>
                        <ul className="">
                            {presences.map((presence, index) => (
                                <>
                                    <li
                                        key={index}
                                        className="flex items-center rounded-lg px-5 transition-colors"
                                        style={{
                                            color: "var(--text-color)",
                                        }}
                                    >
                                        <div className="flex items-center" style={{ color: 'var(--text-color)' }}>
                                            <span className="text-[7px] px-1 rounded-full" style={{ backgroundColor: 'var(--primary-4)' }}>{index + 1}</span>
                                            <span className="font-semibold text-sm ml-3">{presence.personnel.matricule}</span>
                                            <span className="text-[12px] ml-3">{limiterCaractere((presence.personnel.prenoms).split(" ")[0], 10)}</span>
                                        </div>
                                    </li>
                                    <hr className="my-1" />
                                </>
                            ))}
                        </ul>
                    </div>
                    <div className="h-full px-6 flex items-center col-span-5"
                        style={{
                            backgroundColor: 'var(--primary-5)',
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
                    </div>
                    <div className='h-full w-full px-2 col-span-2 flex flex-col justify-center space-y-1'>
                        < _Heure nombre={nombre} effectif={effectif} />
                        <div className=''>
                            <div className=''>
                                <div className='flex flex-col'>
                                    <input
                                        id="pseudo"
                                        name='matricule'
                                        type="text"
                                        placeholder='Matricule...'
                                        value={formDatas.matricule}
                                        onKeyPress={handleKeyPress}
                                        onChange={handleChange}
                                        autoComplete="off"
                                        className='border-2 border-gray-300 rounded-lg px-4 py-2 bg-transparent focus:shadow-blue-900 focus:ring-0 focus:outline-none h-10 shadow-sm' />
                                </div>
                            </div>
                            <div className='mt-2 text-center'>
                                <button
                                    onClick={handleSubmit}
                                    className='bg-[#2A3DEA] hover:bg-blue-900 text-white px-9 py-2 rounded-xl w-full'>
                                    Valider
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Pointage;
