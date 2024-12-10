import React from 'react';
import { Routes, Route } from 'react-router-dom';
import _SideBarProd from '../components/SideBar/_SideBarProd';
import _NavBar from '../components/_NavBar';
import Login from '../pages/Login';

function M_GProd() {
    return (
        <div className="dashboard-app flex">
            <div className="w-[calc(22rem+20px)]">
                <_SideBarProd />
            </div>
            <div className="content w-full">
                <_NavBar />
                <Routes>
                    <Route path="/login" element={Login} />
                </Routes>
            </div>
        </div>
    );
}

export default M_GProd;
