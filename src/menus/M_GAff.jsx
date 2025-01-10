import React, { useEffect, useState } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import _SideBarAff from '../components/SideBar/_SideBarAff';
import _NavBar from '../components/_NavBar';
import Presence from '../pages/gestionAffichage/presence/Presence';
import { _LoadingGestionGif } from '../components/_Loading';
import Chaine from '../pages/gestionAffichage/chaine/Chaine';
import ProtectedRoute from '../ProtectedRoute';
import NotAccess from '../pages/NotAccess';

function M_GAff() {
    const location = useLocation();
    const [loading, setLoading] = useState(false);

    const isPresencePage = location.pathname === "/affichage/a_presence";


    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(true);
        }, 1000);

        return () => clearTimeout(timer);
    }, []);


    useEffect(() => {
        document.title = "Celto manager | Affichage";
    }, []);

    return (
        <>
            {loading ? (
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
                                <Route path="/" element={<Navigate to="chaine" replace />} />
                                <Route path="a_presence" element={<ProtectedRoute requiredRole={["ADMINISTRATEUR", "SURVEILLANT"]}><Presence /></ProtectedRoute>} />
                                <Route path="chaine" element={<Chaine />} />
                                <Route path="no" element={<NotAccess />} />
                            </Routes>
                        </div>
                    </div>
                </div>
            ) : (
                <_LoadingGestionGif image={"/gif/affichage.gif"} />
            )}
        </>
    );
}

export default M_GAff;
