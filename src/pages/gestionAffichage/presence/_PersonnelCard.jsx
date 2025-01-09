import React, { useEffect, useState, useMemo } from "react";
import api from "../../../api";
import { limiterCaractere } from "../../../fonction";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

const _PersonnelCard = ({ id, matricule, nom, prenoms, lienPhoto, po, presences }) => {

    const isPresent = useMemo(() => {
        return presences.some(p => p.personnel.matricule === matricule);
    }, [presences, matricule]);

    return (
        <div className="flex justify-between shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            style={{
                backgroundColor: isPresent ? 'var(--primary-4)' : 'var(--primary-6)',
                color: 'var(--text-color)'
            }}
        >
            <LazyLoadImage
                className="w-20 max-h-16 object-cover"
                src={`/profil/${lienPhoto ? lienPhoto : "x.jpeg"}`}
                alt="Profil"
                effect="blur"
                loading="lazy"
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
