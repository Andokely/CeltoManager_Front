import React, {useEffect} from 'react';
import { Link } from 'react-router-dom';
import _MainMenu from "../components/_MainMenu";
import _NavbarMain from '../components/_NavBarMain';

function MainMenu() {

    useEffect(() => {
        document.title = "Celto manager | Menu principale";
    }, []);

    return (
        <>
            <div
                className="h-screen w-full flex flex-col overflow-hidden"
                style={{ backgroundColor: 'var(--primary-1)', color: 'var(--text-color)' }}>
                <div className="p-3">
                    <_NavbarMain />
                </div>

                <div className="flex h-full items-center justify-center">
                    <div className="flex flex-col gap-8">
                        <div className="flex w-full gap-7">
                            <Link to="/personnel" className="flex-1">
                                <_MainMenu img={'/image/personnel2.png'} label={'Personnel'} title="Personnel" />
                            </Link>
                            <Link to="/production" className="flex-1">
                                <_MainMenu img={'/image/production.png'} label={'Production'} title="Production" />
                            </Link>
                            <Link to="/affichage" className="flex-1">
                                <_MainMenu img={'/image/affichage.png'} label={'Affichage'} title="Affichage" />
                            </Link>
                        </div>
                        <div className="flex w-full gap-4">
                            <Link to="/personnel" className="flex-1">
                                <_MainMenu img={'/image/capteur.png'} label={'Capteur'} title="Capteur" />
                            </Link>
                            <Link to="/production" className="flex-1">
                                <_MainMenu img={'/image/stock.png'} label={'Stock'} title="Stock" />
                            </Link>
                            <Link to="/utilisateur" className="flex-1">
                                <_MainMenu img={'/image/utilisateur.png'} label={'Utilisateur'} title="Utilisateur" />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>


        </>
    );
}

export default MainMenu;
