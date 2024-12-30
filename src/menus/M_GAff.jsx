import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import _SideBarAff from '../components/SideBar/_SideBarAff';
import _NavBar from '../components/_NavBar';
import Presence from '../pages/gestionAffichage/presence/Presence';

function M_GAff() {
    const location = useLocation();

    const isPresencePage = location.pathname === "/affichage/a_presence";


    useEffect(() => {
        document.title = "Celto manager | Affichage";
    }, []);

    return (
        <div className="App flex" style={{ backgroundColor: 'var(--primary-1)' }}>


            {!isPresencePage && (
                <div className='w-[calc(22rem+20px)] z-30 '>
                    <_SideBarAff />
                </div>
            )}
            <div className="content w-full min-h-[calc(100vh-4px)] flex flex-col" style={{ backgroundColor: 'var(--primary-1)', color: 'var(--white)' }}>
                <div className='px-5 py-3 w-full z-30 sticky top-0 backdrop-blur-xl'>
                    <_NavBar />
                </div>
                <div className='mt-[0vh]'>
                    <Routes>
                        <Route path="a_presence" element={<Presence />} />
                    </Routes>
                </div>
            </div>
        </div>
    );
}

export default M_GAff;
