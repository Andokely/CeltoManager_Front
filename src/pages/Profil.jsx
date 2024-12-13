import React, { useEffect, useRef, useState } from "react";
import { decodeToken } from "../fonction";
import axios from "axios";
import config from '../../config.json'
import { _TextInput } from "../components/_Input";
import { _BtnIcon, _BtnText } from "../components/_Bouton";
import { FaCheck } from 'react-icons/fa';
import { _LoadingComponents } from "../components/_Loading";
import { GrSecure } from "react-icons/gr";
import { IoMdImage } from "react-icons/io";
import { MdEdit } from "react-icons/md";
import Modal from 'react-modal';
Modal.setAppElement('#root');
import _UploadImage from "../components/_UploadImage";




const Profil = () => {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true)
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [newImageName, setNewImageName] = useState(null);
    const uploadImageRef = useRef(null);

    const handleImageChange = (imageName) => {
        setNewImageName(imageName);
    };

    const handleSave = () => {
        if (uploadImageRef.current) {
            uploadImageRef.current.handleEditImage();
        }
        closeModal()
        fetchUserData()
    };


    useEffect(() => {
        fetchUserData();
    }, []);

    const fetchUserData = async () => {
        const token = localStorage.getItem("token");

        if (token) {
            try {
                const decoded = decodeToken(token);
                await getUserById(decoded.userId)

            } catch (error) {
                console.error("Erreur lors du décodage du token ou de la récupération des données :", error);
            } finally {
                setLoading(false);
            }
        } else {
            console.warn("Aucun token trouvé dans le localStorage");
            setLoading(false);
        }
    };

    const getUserById = async (userId) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`${config.API_HOST}/users/${userId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });
            setUserData(response.data.user);
            (response.data.user);
        } catch (error) {
            console.error("Erreur lors de la récupération des données utilisateur :", error);
        }
    }

    const openModal = () => setModalIsOpen(true);
    const closeModal = () => {
        setModalIsOpen(false);
    }

    return (
        <>
            {loading ? (
                <_LoadingComponents />
            ) : (
                < div className="flex justify-center p-5 rounded-lg">
                    <div className="w-[70%]">
                        <div className="relative">
                            <img
                                src="/image/couverture.jpg"
                                alt="Photo de couverture"
                                className="w-full rounded-lg h-72 object-cover"
                            />
                            <div className="absolute bottom-0 right-4 -mb-12">
                                <img
                                    src={`/profil/${userData?.photo || "x.jpeg"}`}
                                    alt="photo"
                                    className="w-32 h-32 rounded-full border-4 border-white shadow-md"
                                />
                            </div>
                        </div>
                        <div className="mt-15 text-start p-5 rounded-lg"
                            style={{ color: 'var(--text-color)', backgroundColor: 'var(--primary-3)' }}
                        >
                            <div className="grid grid-cols-2 gap-5">
                                <_TextInput
                                    type="text"
                                    name="Nom"
                                    placeholder="Nom et prénoms ..."
                                    value={userData.nom}
                                    labelLabel="Nom et prénoms"
                                    disabled={true}
                                />
                                <_TextInput
                                    type="text"
                                    name="Nom"
                                    placeholder="Pseudo ..."
                                    value={userData.pseudo}
                                    labelLabel="Pseudo"
                                    disabled={true}
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-5">
                                <_TextInput
                                    type="text"
                                    name="Email"
                                    placeholder="Email ..."
                                    value={userData.email}
                                    labelLabel="Email"
                                    disabled={true}
                                />
                                <_TextInput
                                    type="text"
                                    name="Rôle"
                                    placeholder="Rôle ..."
                                    value={userData.role}
                                    labelLabel="Rôle"
                                    disabled={true}
                                />
                            </div>
                        </div>
                    </div>


                    <_BtnIcon
                        icon={MdEdit}
                        variant="success"
                        size="md"
                        // onClick={() => openModal()}
                        className='fixed bottom-[40px] right-8'
                    />
                    <_BtnIcon
                        icon={GrSecure}
                        variant="danger"
                        size="md"
                        // onClick={() => openModal()}
                        className='fixed bottom-[100px] right-8'
                    />
                    <_BtnIcon
                        icon={IoMdImage}
                        variant="primary"
                        size="md"
                        onClick={() => openModal()}
                        className='fixed bottom-[160px] right-8'
                    />
                </div >
            )
            }
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="Image Modal"
                className="fixed inset-0  flex items-center animate-slideInUp justify-center bg-black bg-opacity-60"
                overlayClassName="fixed z-50 inset-0 bg-black bg-opacity-80"
            >
                <div className="modal-content rounded-lg shadow-lg px-5 py-2 max-w-lg w-full md:w-2/3 lg:w-2/3 relative" style={{ backgroundColor: 'var(--primary-3)', color: 'var(--text-color)' }}>
                    <div className="flex justify-between">
                        <h2 className="text-xl mt-2 font-semibold">{'Modifier la photo de profil'}</h2>
                        <button onClick={closeModal} className="close-button text-gray-500 hover:text-gray-800 text-2xl">&times;</button>
                    </div>
                    <hr className='py-2' />
                    <div className=''>
                        <_UploadImage ref={uploadImageRef} onImageChange={handleImageChange} oldImage={`/profil/${userData?.photo || "x.jpeg"}`} userId={userData?.id} />
                    </div>
                    <div className="mt-4 flex justify-end">
                        <_BtnText
                            text="Enregistrer"
                            onClick={handleSave}
                            variant="primary"
                            icon={FaCheck}
                            iconPosition="left"
                        />
                    </div>
                </div>
            </Modal>

        </>
    );
};

export default Profil;
