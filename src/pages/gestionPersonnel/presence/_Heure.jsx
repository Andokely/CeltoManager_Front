import React, { useState, useEffect } from "react";
import { MdDateRange } from "react-icons/md";
import { ImListNumbered } from "react-icons/im";
import { TbClockHour10Filled, TbClockHour2 } from "react-icons/tb";
import { FaUsers } from "react-icons/fa6";

const _Heure = ({ nombre, effectif }) => {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const interval = setInterval(() => {
            setTime(new Date());
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const formattedTime = time.toLocaleTimeString();

    const formattedDate = time.toLocaleDateString("fr-FR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
    });

    return (
        <div className="flex flex-col w-[80%] py-5 rounded-xl items-center justify-center"
            style={{ color: 'var(--text-color)' }}>
            <div className="text-center">
                <div className="flex items-center gap-5">
                    <MdDateRange />
                    <p className="text-xl font-bold">{formattedDate}</p>
                </div>
                <hr className="my-1" />
                <div className="flex items-center gap-5">
                    <TbClockHour2 />
                    <p className="text-xl font-bold">{formattedTime}</p>
                </div>
                <hr className="my-1" />
                <div className="flex items-center gap-5">
                    <FaUsers />
                    <p className="text-xl font-bold text-blue-500">{effectif}</p>
                </div>
                <hr className="my-1" />
                <div className="flex items-center gap-5">
                    <ImListNumbered />
                    <p className="text-3xl font-bold text-red-500">{nombre}</p>
                </div>
            </div>
        </div>
    );
};

export default _Heure;
