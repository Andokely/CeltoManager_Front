import { NavLink } from 'react-router-dom';
import React, { useState } from 'react';
import { FaIndustry, FaTools, FaSitemap } from 'react-icons/fa';
import { MdScreenshotMonitor, MdCategory, MdDashboard, MdSupervisedUserCircle, MdOutlineArchitecture, MdProductionQuantityLimits, MdOutlineGroupWork, MdSensors } from "react-icons/md";
import { TbPhotoSensor3 } from "react-icons/tb";
import { GiScissors } from 'react-icons/gi';
import { BsCalendar4Week } from "react-icons/bs";
import { useAuth } from '../../AuthContext';

function _SideBarPers() {
    const [openMenuIndexes, setOpenMenuIndexes] = useState([]);
    const { user } = useAuth()

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

    const menuItems = [
        { label: 'Personnel', to: '/personnel/liste', roles: ["SURVEILLANT"], icon: <MdDashboard className='w-5 h-5' /> },
        { label: 'Présence', to: '/personnel/presence', roles: ["ADMINISTRATEUR"], icon: <MdSupervisedUserCircle className='w-6 h-6' /> },
        { label: 'Absence', to: '/personnel/absence', roles: ["SURVEILLANT"], icon: <BsCalendar4Week className='w-5 h-5' /> },
        { label: 'Importation Excel', to: '/personnel/excelImporter', roles: ["SURVEILLANT"], icon: <MdOutlineArchitecture className='w-6 h-6' /> },
    ];

    return (
        <div className='p-1'>
            <div className='fixed bg-slate-800 h-[calc(100vh-7px)] animate-slideInLeft overflow-y-scroll w-72 rounded-xl transition-transform duration-300 xl:translate-x-0 px-1 py-1 flex flex-col justify-between scrollbar-thin'>
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


                            {
                                menuItems.map((item, index) =>
                                    item.roles.includes(user.role) ? (
                                        <NavLink
                                            to={item.to}
                                            className={({ isActive }) => `flex space-x-5 h-[6vh] rounded-lg text-white px-8 place-items-center  ${isActive ? bgColor : 'hover:bg-slate-700'}`}>
                                            <div className='flex space-x-5'>
                                                <div>
                                                    {item.icon}
                                                </div>
                                                <div>
                                                    {item.label}
                                                </div>
                                            </div>
                                        </NavLink>
                                    ) : (
                                        <NavLink
                                            to="#"
                                            className={`disabled-link flex space-x-5 h-[6vh] rounded-lg text-white px-8 place-items-center`} >
                                            <div className='flex space-x-5'>
                                                <div>
                                                    {item.icon}
                                                </div>
                                                <div>
                                                    {item.label}
                                                </div>
                                            </div>
                                        </NavLink>
                                    ))
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default _SideBarPers

