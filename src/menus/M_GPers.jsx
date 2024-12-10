import React from 'react';
import { Routes, Route } from 'react-router-dom';
import _SideBarPers from '../components/SideBar/_SideBarPers';
import _NavBar from '../components/_NavBar';
import Personnel from '../pages/gestionPersonnel/personnel/Personnel';

function M_GPers() {
    return (
        <div className="App flex" style={{ backgroundColor: 'var(--primary-1)' }}>
            <div className='w-[calc(22rem+20px)] z-30 '>
                <_SideBarPers />
            </div>
            <div className="content w-full min-h-[calc(100vh-4px)] flex flex-col" style={{ backgroundColor: 'var(--primary-1)', color: 'var(--white)' }}>
                <div className='px-5 py-3 w-full z-30 sticky top-0 backdrop-blur-xl'>
                    <_NavBar />
                </div>
                <div className='mt-[0vh]'>
                    <Routes>
                        <Route path="liste" element={<Personnel/>} />
                    </Routes>
                </div>
            </div>
        </div>
    );
}

export default M_GPers;
