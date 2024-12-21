import { useState } from "react"
import _Heure from "./_Heure"
import PersonnelCard from "./_PersonnelCard"
import { getCurrentTime } from "../../../fonction"
import api from "../../../api"
import { addNotify, errorNotify } from "../../../components/Notification/ToastUtil"

const Pointage = () => {
    const [personnel, setPersonnel] = useState([])
    const initialFormState = {
        matricule: '',
        entree: '',
    }
    const [formDatas, setFormDatas] = useState(initialFormState);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormDatas({
            ...formDatas,
            [name]: value,
        });
    };

    const handleSubmit = async () => {

        const updatedFormDatas = {
            ...formDatas,
            entree: getCurrentTime()
        };

        setFormDatas(updatedFormDatas);

        try {
            const dataObject = updatedFormDatas;
            const response = await api.post(`/presences`, JSON.stringify(dataObject))
            const personnel = await api.get(`/personnels/${response.data.presence.personnelId}`)
            setPersonnel(personnel.data)
            addNotify({ message: personnel.data.matricule })
            setFormDatas(initialFormState)
        } catch (error) {
            errorNotify({ message: error.response.data.message })
        }

    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            handleSubmit();
        }
    };



    return (
        <>
            <div className="h-[80vh] w-full flex flex-col overflow-hidden relative">
                <div className="absolute grid grid-cols-7 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-[50px] shadow-lg h-[500px] w-[1000px]"
                    style={{ backgroundColor: 'var(--primary-3)', color: 'var(--text-color)' }}>
                    <div className='h-full col-span-3 flex flex-col justify-center space-y-12 items-center'>
                        < _Heure />
                        <div className='w-4/5 max-w-md'>
                            <div className='text-center mb-6'>
                                <p className='text-2xl font-bold'>Entree</p>
                            </div>
                            <div className='space-y-4'>
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
                    </div>
                </div>
            </div>
        </>
    )

}

export default Pointage