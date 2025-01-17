import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import _MainMenu from "../components/_MainMenu";
import _NavbarMain from '../components/_NavBarMain';
import { useAuth } from '../AuthContext';
import { errorNotify } from '../components/Notification/ToastUtil';

function MainMenu() {
    const { user } = useAuth();
    const [role, setRole] = useState(null);
    
    useEffect(() => {
        document.title = "Celto manager | Menu principale";
        if (user) {
            setRole(user.role);
        }
    }, [user]);
    const links1 = [
        {
            to: "/personnel",
            label: "Personnel",
            img: "/image/personnel2.png",
            roles: ["ADMINISTRATEUR", "SURVEILLANT"]
        },
        {
            to: "/production",
            label: "Production",
            img: "/image/production.png",
            roles: ["ADMINISTRATEUR"]
        },
        {
            to: "/affichage",
            label: "Affichage",
            img: "/image/affichage.png",
            roles: ["ADMINISTRATEUR"]
        }
    ];

    const links2 = [
        {
            to: "/capteur",
            label: "Capteur",
            img: "/image/capteur.png",
            roles: ["ADMINISTRATEUR"]
        },
        {
            to: "/production",
            label: "Stock",
            img: "/image/production.png",
            roles: ["ADMINISTRATEUR"]
        },
        {
            to: "/utilisateur",
            label: "Utilisateur",
            img: "/image/utilisateur.png",
            roles: ["ADMINISTRATEUR"]
        }
    ];

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
                            {
                                links1.map((link, index) =>
                                    link.roles.includes(role) ? (
                                        <Link key={index} to={link.to} className="flex-1">
                                            <_MainMenu img={link.img} label={link.label} title={link.label} />
                                        </Link>
                                    ) : (
                                        <div key={index + "1"} className="flex-1 disabled-link">
                                            <_MainMenu img={link.img} label={link.label} title={link.label} />
                                        </div>
                                    ))
                            }
                        </div>
                        <div className="flex w-full gap-4">
                            {
                                links2.map((link, index) =>
                                    link.roles.includes(role) ? (
                                        <Link key={index} to={link.to} className="flex-1">
                                            <_MainMenu img={link.img} label={link.label} title={link.label} />
                                        </Link>
                                    ) : (
                                        <div key={index + "2"} className="flex-1 disabled-link">
                                            <_MainMenu img={link.img} label={link.label} title={link.label} />
                                        </div>
                                    ))
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default MainMenu;
