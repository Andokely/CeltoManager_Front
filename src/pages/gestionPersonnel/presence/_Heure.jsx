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
        <div className="flex flex-col w-[60%] py-5 rounded-lg items-center justify-center"
            style={{ backgroundColor: 'var(--primary-1)', color: 'var(--text-color)' }}>
            <div className="text-center">
                <p className="text-xl font-bold">{formattedDate}</p>
                <p className="text-3xl font-mono mt-2">{formattedTime}</p>
            </div>
        </div>
    );
};

export default _Heure;
