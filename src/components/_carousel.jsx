import React, { useState, useEffect } from "react";

const _Carousel = () => {
    const slides = [
        {
            id: 1,
            image: "/image/login1.png",
            title: "Première présentation"
        },
        {
            id: 2,
            image: "/image/login5.png",
            title: "Deuxième présentation"
        },
        {
            id: 3,
            image: "/image/login4.png",
            title: "Troisième présentation"
        }
    ];

    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);

    const nextSlide = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === slides.length - 1 ? 0 : prevIndex + 1
        );
    };

    useEffect(() => {
        let intervalId;

        if (isAutoPlaying) {
            intervalId = setInterval(() => {
                nextSlide();
            }, 3000);
        }

        return () => clearInterval(intervalId);
    }, [isAutoPlaying, currentIndex]);

    return (
        <div
            className="relative w-full max-w-4xl mx-auto mt-10 overflow-hidden rounded-lg group"
            onMouseEnter={() => setIsAutoPlaying(false)}
            onMouseLeave={() => setIsAutoPlaying(true)}
        >
            {/* Conteneur des slides */}
            <div
                className="flex transition-transform duration-700 ease-in-out"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
                {slides.map((slide) => (
                    <div
                        key={slide.id}
                        className="w-full flex-shrink-0"
                    >
                        <img
                            src={slide.image}
                            alt={slide.title}
                            className="w-full h-[300px] object-cover rounded-lg"
                        />
                    </div>
                ))}
            </div>
            

            <div className="text-center py-4">
                <div className="font-pacifico font-custom text-2xl">
                    Celto Manager
                </div>
                <div className="font-playwrite">
                    Style et qualité, tissés pour vous
                </div>
            </div>

            <div className="flex justify-center space-x-2 pb-4">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        className={`
                    h-1 w-7 rounded-full transition-all duration-300
                    ${currentIndex === index
                                ? "bg-[#2A3DEA] w-7"
                                : "bg-gray-300 hover:bg-gray-400"}
                `}
                    />
                ))}
            </div>
        </div>
    );
};

export default _Carousel;