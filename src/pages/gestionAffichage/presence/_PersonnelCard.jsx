import React, { useEffect, useState } from "react";
import api from "../../../api";
import { limiterCaractere } from "../../../fonction";

const _PersonnelCard = ({ id, matricule, nom, prenoms, lienPhoto, po }) => {

    const [presences, setPrsences] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchPresence();
    }, []);

    const fetchPresence = async () => {
        try {
            const response = await api.get(`/presences`);
            setPrsences(response.data.presences);
        } catch (error) {
            console.error('Error fetching categories:', error);
        } finally {
            setLoading(false);
        }
    };

    const isPresent = presences.some(p => p.personnel.matricule === matricule);

    return (
        <div className="flex justify-between shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            style={{
                backgroundColor: isPresent ? 'var(--primary-4)' : 'var(--primary-6)',
                color: 'var(--text-color)'
            }}
        >
            <img
                className="w-12 h-full object-cover"
                src={`/profil/${lienPhoto ? lienPhoto : "x.jpeg"}`}
                alt={`${nom} ${prenoms}`}
            />
            <div className="py-2 px-3">
                <h2 className="font-semibold">{`${matricule}`}</h2>
                <p className="">
                    <span className="text-sm">{`${limiterCaractere(prenoms, 9)}`}</span>
                </p>
            </div>
            {po && (
                <div className="flex items-center pr-2 pl-1 rounded-r-lg">
                    <p className="font-medium text-white w-6 h-6 flex items-center justify-center rounded-full"
                        style={{
                            backgroundColor: 'var(--primary-3)',
                            color: 'var(--text-color)'
                        }}>
                        <span className="font-medium">{po}</span>
                    </p>
                </div>
            )}
        </div>
    );
};

export default _PersonnelCard;
