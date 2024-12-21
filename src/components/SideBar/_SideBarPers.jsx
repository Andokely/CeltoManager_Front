import { NavLink } from 'react-router-dom';
import React, { useState } from 'react';
import { FaIndustry, FaTools, FaSitemap } from 'react-icons/fa';
import { MdScreenshotMonitor, MdCategory, MdDashboard, MdSupervisedUserCircle, MdOutlineArchitecture, MdProductionQuantityLimits, MdOutlineGroupWork, MdSensors } from "react-icons/md";
import { TbPhotoSensor3 } from "react-icons/tb";
import { GiScissors } from 'react-icons/gi';
import { BsCalendar4Week } from "react-icons/bs";

function _SideBarPers() {
    const [openMenuIndexes, setOpenMenuIndexes] = useState([]);

    const bgColor = "bg-green-600"

    const toggleMenu = (index) => {
        setOpenMenuIndexes((prevIndexes) => {
            if (prevIndexes.includes(index)) {
                return prevIndexes.filter((i) => i !== index);
            } else {
                return [...prevIndexes, index];
            }
        });
    };

    return (
        <div className='p-1'>
            <div className='fixed bg-slate-800 h-[calc(100vh-10px)] animate-slideInLeft overflow-y-scroll w-72 rounded-xl transition-transform duration-300 xl:translate-x-0 px-1 py-1 flex flex-col justify-between scrollbar-thin'>
                <div className=''>
                    <div className='bg-slate-800 h-[9vh]  shadow-slate-700 shadow-2xl  flex place-items-center'>
                        <div className='justify-start px-3 py-1 flex h-26'>
                            <img src="/logo.svg" className='py-3 w-18 h-12 bg-white px-3 rounded-full' alt="" srcSet="" />
                        </div>
                        <div>
                            <p className='text-xl text-white font-bold font-pacifico'>Celto Manager</p>
                        </div>
                    </div>
                    <hr className="my-1 border border-slate-700" />
                    <div className="px-1 py-1 mt-2">
                        <div className='rounded-lg py-2 shadow-slate-700 shadow-2xl'>
                            <NavLink
                                to="/personnel/liste"
                                className={({ isActive }) => `flex space-x-5 h-[6vh] rounded-lg text-white px-8 place-items-center  ${isActive ? bgColor : 'hover:bg-slate-700'}`}>
                                <div className='flex space-x-5'>
                                    <div>
                                        <MdDashboard className='w-5 h-5' />
                                    </div>
                                    <div>
                                        Personnel
                                    </div>
                                </div>
                            </NavLink>
                            <NavLink
                                to="/personnel/presence"
                                className={({ isActive }) => `flex space-x-5 h-[6vh] rounded-lg text-white px-8 place-items-center  ${isActive ? bgColor : 'hover:bg-slate-700'}`}>
                                <div className='flex space-x-5'>
                                    <div>
                                        <MdSupervisedUserCircle className='w-6 h-6' />
                                    </div>
                                    <div>
                                        Présence
                                    </div>
                                </div>
                            </NavLink>
                            <NavLink
                                to="/personnel/absence"
                                className={({ isActive }) => `flex space-x-5 h-[6vh] rounded-lg text-white px-8 place-items-center  ${isActive ? bgColor : 'hover:bg-slate-700'}`}>
                                <div className='flex space-x-5'>
                                    <div>
                                        <BsCalendar4Week className='w-5 h-5' />
                                    </div>
                                    <div>
                                        Absence
                                    </div>
                                </div>
                            </NavLink>
                            <NavLink
                                to="/modele"
                                className={({ isActive }) => `flex space-x-5 h-[6vh] rounded-lg text-white px-8 place-items-center  ${isActive ? bgColor : 'hover:bg-slate-700'}`}>
                                <div className='flex space-x-5'>
                                    <div>
                                        <MdOutlineArchitecture className='w-6 h-6' />
                                    </div>
                                    <div>
                                        Modèle
                                    </div>
                                </div>
                            </NavLink>
                            <NavLink
                                to="/of"
                                className={({ isActive }) => `flex space-x-5 h-[6vh] rounded-lg text-white px-8 place-items-center  ${isActive ? bgColor : 'hover:bg-slate-700'}`}>
                                <div className='flex space-x-5'>
                                    <div>
                                        <MdProductionQuantityLimits className='w-6 h-6' />
                                    </div>
                                    <div>
                                        Ordre de fabrication
                                    </div>
                                </div>
                            </NavLink>
                            <NavLink
                                to="/implantation"
                                className={({ isActive }) => `flex space-x-5 h-[6vh] rounded-lg text-white px-8 place-items-center  ${isActive ? bgColor : 'hover:bg-slate-700'}`}>
                                <div className='flex space-x-5'>
                                    <div>
                                        <MdOutlineGroupWork className='w-6 h-6' />
                                    </div>
                                    <div>
                                        Implantation
                                    </div>
                                </div>
                            </NavLink>
                        </div>
                        <div className='mt-2 rounded-lg py-2 shadow-slate-700 shadow-2xl'>
                            <h1 className='uppercase font-bold my-1 ml-5 flex justify-between text-white items-center cursor-pointer' onClick={() => toggleMenu(1)}>
                                opération
                                <span className={`ml-2 transform transition-transform ${openMenuIndexes.includes(1) ? 'rotate-180' : ''}`}>
                                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M480-344 240-584l56-56 184 184 184-184 56 56-240 240Z" /></svg>
                                </span>
                            </h1>
                            {openMenuIndexes.includes(1) && (
                                <>
                                    <NavLink
                                        to="/classification"
                                        className={({ isActive }) => `flex space-x-5 h-[6vh] rounded-lg text-white px-8 place-items-center  ${isActive ? bgColor : 'hover:bg-slate-700'}`}>
                                        <div className='flex space-x-5'>
                                            <div>
                                                <FaSitemap className='w-6 h-6' />
                                            </div>
                                            <div>
                                                Classification
                                            </div>
                                        </div>
                                    </NavLink>
                                    {/* <NavLink
                                        to="/produit"
                                        className={({ isActive }) => `flex space-x-5 h-[6vh] rounded-lg text-white px-8 place-items-center  ${isActive ? bgColor : 'hover:bg-slate-700'}`}>
                                        <div className='flex space-x-5'>
                                            <div>
                                                <FaTools className='w-6 h-6' />
                                            </div>
                                            <div>
                                                Machine
                                            </div>
                                        </div>
                                    </NavLink> */}
                                    <NavLink
                                        to="/categorie"
                                        className={({ isActive }) => `flex space-x-5 h-[6vh] rounded-lg text-white px-8 place-items-center  ${isActive ? bgColor : 'hover:bg-slate-700'}`}>
                                        <div className='flex space-x-5'>
                                            <div>
                                                <MdCategory className='w-6 h-6' />
                                            </div>
                                            <div>
                                                Catégorie
                                            </div>
                                        </div>
                                    </NavLink>
                                    <NavLink
                                        to="/operation"
                                        className={({ isActive }) => `flex space-x-5 h-[6vh] rounded-lg text-white px-8 place-items-center  ${isActive ? bgColor : 'hover:bg-slate-700'}`}>
                                        <div className='flex space-x-5'>
                                            <div>
                                                <GiScissors className='w-6 h-6' />
                                            </div>
                                            <div>
                                                Opération
                                            </div>
                                        </div>
                                    </NavLink>
                                </>
                            )}
                        </div>
                        <div className='mt-2 rounded-lg py-2 shadow-slate-700 shadow-2xl'>
                            <h1 className='uppercase font-bold my-1 ml-5 flex text-white justify-between items-center cursor-pointer' onClick={() => toggleMenu(2)}>
                                Code Qr
                                <span className={`ml-2 transform transition-transform ${openMenuIndexes.includes(2) ? 'rotate-180' : ''}`}>
                                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M480-344 240-584l56-56 184 184 184-184 56 56-240 240Z" /></svg>
                                </span>
                            </h1>
                            {openMenuIndexes.includes(2) && (
                                <>
                                    <NavLink to="/produit" className={({ isActive }) => (isActive ? 'active' : 'bg-red-500')}>
                                        <div className='flex space-x-5 h-[6vh] hover:bg-slate-700 rounded-lg text-white flex px-8 place-items-center'>
                                            <div>
                                                <MdCategory className='w-6 h-6' />
                                            </div>
                                            <div>
                                                Pièce
                                            </div>
                                        </div>
                                    </NavLink>
                                    <NavLink to="/produit" className={({ isActive }) => (isActive ? 'active' : 'bg-red-500')}>
                                        <div className='flex space-x-5 h-[6vh] hover:bg-slate-700 rounded-lg text-white flex px-8 place-items-center'>
                                            <div>
                                                <MdCategory className='w-6 h-6' />
                                            </div>
                                            <div>
                                                Coupe
                                            </div>
                                        </div>
                                    </NavLink>
                                    <NavLink to="/produit" className={({ isActive }) => (isActive ? 'active' : 'bg-red-500')}>
                                        <div className='flex space-x-5 h-[6vh] hover:bg-slate-700 rounded-lg text-white flex px-8 place-items-center'>
                                            <div>
                                                <MdCategory className='w-6 h-6' />
                                            </div>
                                            <div>
                                                Scanner
                                            </div>
                                        </div>
                                    </NavLink>
                                </>
                            )}
                        </div>
                        <div className='mt-2 rounded-lg py-2 shadow-slate-700 shadow-2xl'>
                            <h1 className='uppercase font-bold text-white my-1 ml-5 flex justify-between items-center cursor-pointer' onClick={() => toggleMenu(0)}>
                                Suivie
                                <span className={`ml-2 transform transition-transform ${openMenuIndexes.includes(0) ? 'rotate-180' : ''}`}>
                                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M480-344 240-584l56-56 184 184 184-184 56 56-240 240Z" /></svg>
                                </span>
                            </h1>
                            {openMenuIndexes.includes(0) && (
                                <>
                                    <NavLink to="/produit" className={({ isActive }) => (isActive ? 'active' : 'bg-red-500')}>
                                        <div className='flex space-x-5 h-[6vh] hover:bg-slate-700 rounded-lg text-white flex px-8 place-items-center'>
                                            <div>
                                                <MdCategory className='w-6 h-6' />
                                            </div>
                                            <div>
                                                Récapitulatif général
                                            </div>
                                        </div>
                                    </NavLink>
                                    <NavLink to="/produit" className={({ isActive }) => (isActive ? 'active' : 'bg-red-500')}>
                                        <div className='flex space-x-5 h-[6vh] hover:bg-slate-700 rounded-lg text-white flex px-8 place-items-center'>
                                            <div>
                                                <MdCategory className='w-6 h-6' />
                                            </div>
                                            <div>
                                                Récapitulatif des instructeurs
                                            </div>
                                        </div>
                                    </NavLink>
                                    <NavLink to="/produit" className={({ isActive }) => (isActive ? 'active' : 'bg-red-500')}>
                                        <div className='flex space-x-5 h-[6vh] hover:bg-slate-700 rounded-lg text-white flex px-8 place-items-center'>
                                            <div>
                                                <MdCategory className='w-6 h-6' />
                                            </div>
                                            <div>
                                                Sortie production
                                            </div>
                                        </div>
                                    </NavLink>
                                </>
                            )}
                        </div>
                        <div className='mt-2 rounded-lg py-2 shadow-slate-700 shadow-2xl'>
                            <h1 className='uppercase font-bold text-white my-1 ml-5 flex justify-between items-center cursor-pointer' onClick={() => toggleMenu(3)}>
                                Capteur
                                <span className={`ml-2 transform transition-transform ${openMenuIndexes.includes(3) ? 'rotate-180' : ''}`}>
                                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M480-344 240-584l56-56 184 184 184-184 56 56-240 240Z" /></svg>
                                </span>
                            </h1>
                            {openMenuIndexes.includes(3) && (
                                <>
                                    <NavLink to="/capteur"
                                        className={({ isActive }) => `flex space-x-5 h-[6vh] rounded-lg text-white place-items-center  ${isActive ? bgColor : 'hover:bg-slate-700'}`}>
                                        <div className='flex space-x-5 h-[6vh] hover:bg-slate-700 rounded-lg text-white flex px-8 place-items-center'>
                                            <div>
                                                <MdSensors className='w-6 h-6' />
                                            </div>
                                            <div>
                                                gestion capteur
                                            </div>
                                        </div>
                                    </NavLink>
                                    <NavLink to="/suivieCapteur"
                                        className={({ isActive }) => `flex space-x-5 h-[6vh] rounded-lg text-white place-items-center  ${isActive ? bgColor : 'hover:bg-slate-700'}`}>
                                        <div className='flex space-x-5 h-[6vh] hover:bg-slate-700 rounded-lg text-white flex px-8 place-items-center'>
                                            <div>
                                                <TbPhotoSensor3 className='w-6 h-6' />
                                            </div>
                                            <div>
                                                Suivie
                                            </div>
                                        </div>
                                    </NavLink>
                                </>
                            )}
                        </div>
                    </div>


                </div>

                <div className="">
                    <NavLink to="/affichage">
                        <div className='flex space-x-5 h-[6vh] hover:bg-slate-700 rounded-lg text-white flex px-8 place-items-center'>
                            <div>
                                <MdScreenshotMonitor />
                            </div>
                            <div>
                                Affichage
                            </div>
                        </div>
                    </NavLink>
                </div>
            </div>
        </div>
    )
}

export default _SideBarPers

