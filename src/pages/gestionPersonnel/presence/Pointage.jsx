import { useState, useEffect, useRef } from "react";
import _Heure from "./_Heure";
import PersonnelCard from "./_PersonnelCard";
import { getCurrentTime } from "../../../fonction";
import api from "../../../api";
import { addNotify, errorNotify, checkNotify } from "../../../components/Notification/ToastUtil";
import _TabGroup from "../../../components/Tab/_TabGroup";
import { _BtnIcon } from "../../../components/_Bouton";
import { MdDeleteSweep } from "react-icons/md";


const Pointage = ({ initialTypePointage }) => {
    const [personnel, setPersonnel] = useState(null);
    const [typePointage, setTypePointage] = useState(initialTypePointage || null);
    const initialFormState = {
        matricule: '',
    };
    const [formDatas, setFormDatas] = useState(initialFormState);
    const [loading, setLoading] = useState(true);
    const [presences, setPresences] = useState([]);
    const [presenceTemp, setPresenceTemp] = useState([]);

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
    }, [presenceTemp]);

    useEffect(() => {
        if (listRef.current) {
            listRef.current.scrollTop = listRef.current.scrollHeight;
        }
    }, [presenceTemp]);

    const handleSubmit = async () => {
        try {
            if (!['Entrée matin', 'Entrée après-midi', 'Sortie après-midi'].includes(typePointage)) {
                throw new Error("Type de pointage invalide. Veuillez vérifier votre sélection.");
            }

            const dynamicField = typePointage.includes("Entrée") ? "entree" : "sortie";
            const updatedFormDatas = { ...formDatas, [dynamicField]: getCurrentTime() };

            const endpoint = typePointage.includes("Entrée") ? "/presences" : "/presences/sortie";
            const response = await api.post(endpoint, JSON.stringify(updatedFormDatas));

            setPersonnel(response.data.matricule);
            setNombre(prev => prev + 1);
            checkNotify({ message: response.data.matricule });

            setPresenceTemp((prevPresences) => [
                ...prevPresences,
                {
                    personnel: response.data.matricule,
                    time: getCurrentTime()
                }
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

    const viderListe = () => {
        setPresenceTemp([])
        setPersonnel(null)
        addNotify({ message: "La liste a été vidée avec succès" });

    }

    return (
        <>
            <div className="h-[54vh] w-full flex">
                <div className="grid grid-cols-9"
                    style={{ backgroundColor: 'var(--primary-3)', color: 'var(--text-color)' }}>
                    <div className="w-full rounded-t-lg col-span-2">
                        <div className="flex rounded-b-lg justify-between items-center px-4 py-1">
                            <p className="font-semibold">Liste des matricules</p>
                            <_BtnIcon
                                icon={MdDeleteSweep}
                                variant="danger"
                                size="sm"
                                onClick={() => viderListe()}
                                className='w-5 h-5'
                            />
                        </div>
                        <hr className="border mb-2" style={{ borderColor: 'var(--border-color)' }} />
                        <div className="px-1 overflow-y-auto h-[46vh]" style={{ backgroundColor: 'var(--primary-3)', color: 'var(--text-color)' }} ref={listRef}>
                            <ul className="">
                                {presenceTemp.length === 0 ? (
                                    <div className="flex items-center justify-center mt-2 italic">......</div>
                                ) : (
                                    presenceTemp.map((presence, index) => (
                                        <>
                                            <li
                                                key={index}
                                                className="flex items-center rounded-lg px-5 transition-colors"
                                                style={{
                                                    color: "var(--text-color)",
                                                }}
                                            >
                                                <div className="flex items-center" style={{ color: 'var(--text-color)' }}>
                                                    <span className="text-sm px-1 rounded-full" style={{ backgroundColor: 'var(--primary-4)' }}>{index + 1}</span>
                                                    <span className="text-sm ml-4">{presence.time}</span>
                                                    <span className="text-sm ml-4">{presence.personnel}</span>
                                                </div>
                                            </li>
                                            <hr className="my-1 border" />
                                        </>
                                    ))
                                )}
                            </ul>
                        </div>
                    </div>
                    <div className="h-full px-6 flex items-center col-span-5"
                        style={{
                            backgroundColor: 'var(--primary-5)',
                            color: 'var(--text-color)',
                        }}
                    >
                        <PersonnelCard
                            photo={`/profil/${personnel ? `${personnel}.jpg` : 'x.jpeg'}`}
                            matricule={personnel || '-----'}
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
