import _Mode from './_Mode';
import { _BtnIcon, _BtnIconeED } from './_Bouton';
import { NavLink, useLocation } from 'react-router-dom';
import { FaSearch } from "react-icons/fa";


function _NavbarMain() {

    return (
        <div className="h-[10vh] flex items-center justify-between shadow-lg rounded-xl px-5"
            style={{ backgroundColor: 'var(--primary-3)', color: 'var(--text-color)' }}
        >
            <div className='flex items-center gap-2 px-3 py-1 h-26'>
                <img src="/logo.png" className='w-18 h-12 px-3 rounded-full' alt="" />
                {/* <p className='text-xl font-bold' style={{color: 'var(--text-color)'}}>Celto Manager</p> */}
                <img src="/logo.svg" className='w-18 h-12 px-3 rounded-full' alt="" />
            </div>
            <div className="flex">
                <_Mode />
            </div>
        </div>

    )
}

export default _NavbarMain