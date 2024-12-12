import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import _NavBar from '../components/_NavBar';
import _SideBarUser from '../components/SideBar/_SideBarUser';
import Utilisateur from '../pages/gestionUtilisateur/Utilisateur';

function M_GUser() {

    useEffect(() => {
        document.title = "Celto manager | Utilisateur";
    }, []);

    return (
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
                        <Route path="utilisateur" element={<Utilisateur />} />
                    </Routes>
                </div>
            </div>
        </div>
    );
}

export default M_GUser;
