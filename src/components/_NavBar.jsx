import _Mode from './_Mode';
import { _BtnIcon, _BtnIconeED } from './_Bouton';
import { FaSearch, FaHome } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';


function _Navbar() {
    const navigate = useNavigate();


    const navigateHome = () => {
        navigate('/');
    }

    return (
        <div className="h-[10vh] flex items-center justify-between shadow-lg rounded-xl px-5"
            style={{ backgroundColor: 'var(--primary-3)', color: 'var(--text-color)' }}
        >
            <div className="text-black flex flex-col animate-slideInLeft" style={{ color: 'var(--text-color)' }}>
                <div>
                    <_BtnIcon
                        icon={FaHome}
                        variant="secondary"
                        size="sm"
                        onClick={() => navigateHome()}
                        className=''
                    />
                </div>
            </div>

            <div className="flex">
                <_Mode />
            </div>
        </div>

    )
}

export default _Navbar