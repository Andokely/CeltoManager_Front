import { useContext, useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom';
import { errorNotify } from '../components/Notification/ToastUtil';
import _Carousel from '../components/_carousel';
import { _LoadingFull } from '../components/_Loading';
import config from '../../config.json'
import axios from 'axios';
import { AuthContext } from '../AuthContext';
import { _LoadingLogin } from '../components/_Loading';

function Login() {
    const { login } = useContext(AuthContext)
    const [showPassword, setShowPassword] = useState(false);
    const location = useLocation();
    const [isLoading, setIsLoading] = useState(false);
    const initialFormState = {
        pseudo: '',
        motDePasse: '',
    }
    const [formDatas, setFormDatas] = useState(initialFormState);

    useEffect(() => {
        document.title = "Celto manager | Login";
    }, []);


    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormDatas({
            ...formDatas,
            [name]: value,
        });
    }

    const handleSubmit = async (e = null) => {
        if (e) e.preventDefault();

        try {
            const dataObject = formDatas;
            const response = await axios.post(`${config.API_HOST}/users/login`, JSON.stringify(dataObject), {
                headers: {
                    'Content-Type': 'application/json',
                },
            })

            setIsLoading(true);
            setTimeout(() => {
                navigate('/');
                login(response.data.token)
                setIsLoading(false);
            }, 3000);


        } catch (error) {
            errorNotify({ message: error.response.data.message });
        }

    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            handleSubmit();
        }
    };
    return (
        <>
            <div className="h-screen w-full flex flex-col overflow-hidden relative">
                <div className="flex-1 bg-[#2A3DEA]"></div>
                <div className="flex-1 bg-[#C2D2FC]"></div>

                <div className="absolute grid grid-cols-7 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-[50px] shadow-lg h-[500px] w-[1000px]">
                    <div className='h-full col-span-4 flex flex-col justify-center items-center'>
                        <div className='w-4/5 max-w-md'>
                            <div className='text-center mb-6'>
                                <p className='text-2xl font-bold'>Login</p>
                            </div>
                            <div className='space-y-4'>
                                <div className='flex flex-col'>
                                    <label htmlFor="username" className='text-gray-400 mb-1'>Pseudo : </label>
                                    <input
                                        id="pseudo"
                                        name='pseudo'
                                        type="text"
                                        placeholder='Pseudo...'
                                        value={formDatas.pseudo}
                                        onChange={handleChange}
                                        className='border-2 border-gray-300 rounded-lg px-4 py-2 bg-transparent focus:shadow-blue-900 focus:ring-0 focus:outline-none h-10 shadow-sm' />
                                </div>
                                <div className='flex flex-col'>
                                    <label htmlFor="password" className='text-gray-400 mb-1'>Mot de passe :</label>
                                    <div className='relative'>
                                        <input
                                            id="password"
                                            name='motDePasse'
                                            type={showPassword ? 'text' : 'password'}
                                            value={formDatas.motDePasse}
                                            onChange={handleChange}
                                            onKeyDown={handleKeyPress}
                                            placeholder='Mot de passe...'
                                            className='border-2 border-gray-300 rounded-lg px-4 py-2 bg-transparent focus:shadow-blue-900 focus:ring-0 focus:outline-none h-10 pr-10 shadow-sm w-full'
                                        />
                                        <button
                                            type="button"
                                            onClick={togglePasswordVisibility}
                                            className='absolute inset-y-0 right-0 flex items-center px-3'
                                        >
                                            {showPassword ? (
                                                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="m644-428-58-58q9-47-27-88t-93-32l-58-58q17-8 34.5-12t37.5-4q75 0 127.5 52.5T660-500q0 20-4 37.5T644-428Zm128 126-58-56q38-29 67.5-63.5T832-500q-50-101-143.5-160.5T480-720q-29 0-57 4t-55 12l-62-62q41-17 84-25.5t90-8.5q151 0 269 83.5T920-500q-23 59-60.5 109.5T772-302Zm20 246L624-222q-35 11-70.5 16.5T480-200q-151 0-269-83.5T40-500q21-53 53-98.5t73-81.5L56-792l56-56 736 736-56 56ZM222-624q-29 26-53 57t-41 67q50 101 143.5 160.5T480-280q20 0 39-2.5t39-5.5l-36-38q-11 3-21 4.5t-21 1.5q-75 0-127.5-52.5T300-500q0-11 1.5-21t4.5-21l-84-82Zm319 93Zm-151 75Z" /></svg>
                                            ) : (
                                                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M480-320q75 0 127.5-52.5T660-500q0-75-52.5-127.5T480-680q-75 0-127.5 52.5T300-500q0 75 52.5 127.5T480-320Zm0-72q-45 0-76.5-31.5T372-500q0-45 31.5-76.5T480-608q45 0 76.5 31.5T588-500q0 45-31.5 76.5T480-392Zm0 192q-146 0-266-81.5T40-500q54-137 174-218.5T480-800q146 0 266 81.5T920-500q-54 137-174 218.5T480-200Zm0-300Zm0 220q113 0 207.5-59.5T832-500q-50-101-144.5-160.5T480-720q-113 0-207.5 59.5T128-500q50 101 144.5 160.5T480-280Z" /></svg>
                                            )}
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className='mt-6 text-center'>
                                <button
                                    onClick={handleSubmit}
                                    className='bg-[#2A3DEA] hover:bg-blue-900 text-white px-9 py-2 rounded-xl w-full'>
                                    S'authentifier
                                </button>
                            </div>
                            <div className='mt-4 text-center'>
                                <p className='text-sm'>
                                    Mot de passe oublié ?
                                    <a href="#" className='text-blue-500 ml-1'>Cliquez ici pour le réinitialiser.</a>
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className='h-full col-span-3 bg-[#EDF0F5] rounded-r-[50px]'>
                        <_Carousel />
                    </div>
                </div>
            </div>
            {isLoading && (
                <_LoadingLogin image={"/gif/celtoManager3.gif"} />
                // <_LoadingFull />
            )}
        </>
    );
}

export default Login;