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
                <input
                    type={"text"}
                    name={"name"}
                    placeholder={"Recherche.."}
                    // value={value}
                    // onChange={onChange}
                    className="px-4 py-1 border mr-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-700"
                    style={{ backgroundColor: 'var(--primary-1)', borderColor: 'var(--border-color)' }}
                />
                <div className="mr-7">
                    <_BtnIconeED
                        onClick={() => addCapteur()}
                        width={24}
                        height={24}
                        Icon={FaSearch}
                        className={'text-green-500'}
                        fill={'#2072AF'}
                    />
                </div>
                <_Mode />
            </div>
        </div>

    )
}

export default _Navbar