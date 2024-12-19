import React, { useState, useEffect } from "react";

const _Heure = () => {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const interval = setInterval(() => {
            setTime(new Date());
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const formattedTime = time.toLocaleTimeString();

    const formattedDate = time.toLocaleDateString("fr-FR", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
    });

    return (
        <div className="flex flex-col w-[90%] py-5 rounded-[50px] items-center justify-center"
            style={{ backgroundColor: 'var(--primary-1)', color: 'var(--text-color)' }}>
            <div className="text-center">
                <p className="text-2xl font-bold">{formattedDate}</p>
                <p className="text-6xl font-mono mt-4">{formattedTime}</p>
            </div>
        </div>
    );
};

export default _Heure;
