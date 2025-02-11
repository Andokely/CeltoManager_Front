import React, { useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import _NavBar from '../components/_NavBar';
import _SideBarUser from '../components/SideBar/_SideBarUser';
import Utilisateur from '../pages/gestionUtilisateur/Utilisateur';
import Role from '../pages/gestionUtilisateur/Role';
import Poste from '../pages/gestionUtilisateur/Poste';
import Chaine from '../pages/gestionUtilisateur/Chaine';
import Secteur from '../pages/gestionUtilisateur/Secteur';
import Profil from '../pages/Profil';
import { _LoadingLogin } from '../components/_Loading';

function M_GUser() {
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        document.title = "Celto manager | Utilisateur";
    }, []);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(true);
        }, 1000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <>
            {loading ? (
                <div className="App flex" style={{ backgroundColor: 'var(--primary-1)' }}>
                    <div className='w-[calc(22rem+20px)] z-30 '>
                        <_SideBarUser />
                    </div>
                    <div className="content w-full min-h-[calc(100vh-4px)] flex flex-col" style={{ backgroundColor: 'var(--primary-1)', color: 'var(--white)' }}>
                        <div className='px-5 py-3 w-full z-30 sticky top-0 backdrop-blur-xl'>
                            <_NavBar />
                        </div>
                        <div className='mt-[0vh]'>
                            <Routes>
                                <Route path="/" element={<Navigate to="utilisateur" replace />} />
                                <Route path="utilisateur" element={<Utilisateur />} />
                                <Route path="role" element={<Role />} />
                                <Route path="poste" element={<Poste />} />
                                <Route path="chaine" element={<Chaine />} />
                                <Route path="secteur" element={<Secteur />} />
                                <Route path="profil" element={<Profil />} />
                            </Routes>
                        </div>
                    </div>
                </div>
            ) : (
                <_LoadingLogin image={"/gif/utilisateur.gif"} />
            )}
        </>
    );
}

export default M_GUser;
