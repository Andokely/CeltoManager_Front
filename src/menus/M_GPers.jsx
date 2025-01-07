import React, { useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import _SideBarPers from '../components/SideBar/_SideBarPers';
import _NavBar from '../components/_NavBar';
import Personnel from '../pages/gestionPersonnel/personnel/Personnel';
import Pointage from '../pages/gestionPersonnel/presence/Pointage';
import Presence from '../pages/gestionPersonnel/presence/Presence';
import Absence from '../pages/gestionPersonnel/absence/Absence';
import ExcelImporter from '../pages/gestionPersonnel/personnel/ExcelImporter';
import TypePointage from '../pages/gestionPersonnel/presence/TypePointage';
import { _LoadingGestionGif } from '../components/_Loading';

function M_GPers() {
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        document.title = "Celto manager | Personnel";
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
                    <div className='w-[calc(22rem+20px)] z-30'>
                        <_SideBarPers />
                    </div>
                    <div className="content w-full min-h-[calc(100vh)] flex flex-col" style={{ backgroundColor: 'var(--primary-1)', color: 'var(--white)' }}>
                        <div className='px-5 py-3 w-full z-30 sticky top-0 backdrop-blur-xl'>
                            <_NavBar />
                        </div>
                        <div className='mt-[0vh]'>
                            <Routes>
                                <Route path="/" element={<Navigate to="liste" replace />} />
                                <Route path="liste" element={<Personnel />} />
                                <Route path="pointage" element={<TypePointage />} />
                                <Route path="presence" element={<Presence />} />
                                <Route path="absence" element={<Absence />} />
                                <Route path="excelImporter" element={<ExcelImporter />} />
                            </Routes>
                        </div>
                    </div>
                </div>
            ) : (
                <_LoadingGestionGif image={"/gif/personnel.gif"} />
            )}
        </>
    );
}

export default M_GPers;
