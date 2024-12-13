import React, { useState, useEffect, useContext } from 'react';
import { IoMdSettings, IoIosNotifications } from "react-icons/io";
import { _BtnIcon } from './_Bouton';
import { FaMoon } from 'react-icons/fa';
import { MdLightMode } from "react-icons/md";
import { AiOutlineLogout } from "react-icons/ai";
import { useNavigate } from 'react-router-dom';
import _ConfirmationDialog from './_ConfirmationDialog';
import { AuthContext } from '../AuthContext';
import { decodeToken } from '../fonction';
import axios from 'axios';
import config from '../../config.json'

function _Mode() {
    const [dialogOpen, setDialogOpen] = useState(false);
    const [data, setDate] = useState(null)
    const navigate = useNavigate();
    const { logout } = useContext(AuthContext)


    const [isDarkMode, setIsDarkMode] = useState(() => {
        const savedMode = localStorage.getItem('dark-mode');
        return savedMode ? JSON.parse(savedMode) : false;
    });

    useEffect(() => {
        document.documentElement.classList.toggle('dark-mode', isDarkMode);
        localStorage.setItem('dark-mode', JSON.stringify(isDarkMode));

        const getUserById = async (userId) => {
            const token = localStorage.getItem('token')

            if (token) {
                const decoded = decodeToken(token);
                try {
                    const response = await axios.get(`${config.API_HOST}/users/${decoded.userId}`, {
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            'Content-Type': 'application/json',
                        },
                    });
                    setDate(response.data.user);
                } catch (error) {
                    console.error("Erreur lors de la récupération des données utilisateur :", error);
                }

            }
        }

        getUserById()
    }, [isDarkMode]);


    const toggleDarkMode = () => {
        setIsDarkMode(prevMode => !prevMode);
    };

    const handleOpenDialog = () => {
        setDialogOpen(true);
    }
    const handleCloseDialog = () => {
        setDialogOpen(false);
    }

    const handleDecoConfirm = () => {
        logout()
        navigate('/login');
    }

    const navigateProfil = () => {
        navigate('/utilisateur/profil');
    }

    return (
        <div className={`rounded-lg flex items-center animate-slideInRight`}>
            <div className='flex space-x-2'>
                {/* <User /> */}
                <_BtnIcon
                    icon={IoIosNotifications}
                    variant="secondary"
                    size="sm"
                    onClick={() => alert("Notification")}
                    className=''
                />
                <_BtnIcon
                    icon={IoMdSettings}
                    variant="secondary"
                    size="sm"
                    onClick={() => navigateProfil()}
                    className=''
                />
                <_BtnIcon
                    icon={isDarkMode ? MdLightMode : FaMoon}
                    variant="secondary"
                    size="sm"
                    onClick={() => toggleDarkMode()}
                    className=''
                />
                <_BtnIcon
                    icon={AiOutlineLogout}
                    variant="danger"
                    size="sm"
                    onClick={() => handleOpenDialog()}
                    className='mr-5'
                />
            </div>
            <div className='ml-5 flex flex-col justify-center items-center'>
                <img src={`/profil/${data?.photo || 'x.jpeg'}`} className='w-9 h-9 rounded-full border-4 border-blue-[#2072AF]' alt="Profil" />
            </div>


            <_ConfirmationDialog
                open={dialogOpen}
                onClose={handleCloseDialog}
                onConfirm={handleDecoConfirm}
                title="Confirmation"
                message="Êtes-vous sûr de vouloir vous déconnecter ?"
            />
        </div >
    );
}

export default _Mode;
