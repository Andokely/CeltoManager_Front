import React, { useEffect, useState, useMemo } from "react";
import api from "../../../api";
import { limiterCaractere } from "../../../fonction";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

const _PersonnelCard = ({ id, matricule, nom, prenoms, lienPhoto, po, presences }) => {

    const isPresent = useMemo(() => {
        return presences.includes(matricule);
    }, [presences, matricule]);

    return (
        <div className="flex justify-between shadow-lg rounded-md overflow-hidden hover:shadow-xl transition-shadow duration-800"
            style={{
                backgroundColor: isPresent ? 'var(--primary-4)' : 'var(--primary-6)',
                color: 'var(--text-color)'
            }}
        >
            <div className="py-[0.4rem] px-3">
                <p className="text-sm">{`${matricule}`}</p>
            </div>
            <div className="flex items-center pr-2 pl-1 rounded-r-lg">
                <p className="font-medium text-sm text-white w-5 h-5 flex items-center justify-center rounded-full"
                    style={{
                        backgroundColor: po ? 'var(--primary-3)' : 'var(--primary-1)',
                        color: 'var(--text-color)'
                    }}>
                    {po ? (
                        <span className="font-medium text-sm">{po}</span>
                    ) : (
                        <span className="font-medium text-sm">-</span>
                    )}
                </p>
            </div>
        </div>
    );
};

export default _PersonnelCard;
