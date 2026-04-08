import React, { useState, useEffect } from 'react';

// Importa la galería para que Vite procese y emita rutas correctas en build.
const galleryModules = import.meta.glob('../../images/galeria/*.jpeg', {
    eager: true,
    import: 'default',
}) as Record<string, string>;

const galleryImages = Object.entries(galleryModules)
    .sort(([pathA], [pathB]) => {
        const fileA = pathA.split('/').pop() ?? '';
        const fileB = pathB.split('/').pop() ?? '';
        const numA = Number(fileA.replace('.jpeg', ''));
        const numB = Number(fileB.replace('.jpeg', ''));
        return numA - numB;
    })
    .map(([, url]) => url);

const Carousel = () => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % galleryImages.length);
        }, 2500); // Cambiar imagen cada 3 segundos

        return () => clearInterval(intervalId); // Limpiar el intervalo al desmontar
    }, []);

    return (
        <div className="relative w-full max-w-7xl mx-auto">
            <div className="relative w-full h-96 overflow-hidden rounded-lg shadow-lg">
                <img
                    src={galleryImages[currentImageIndex]}
                    alt={`Imagen de galería ${currentImageIndex + 1}`}
                    className="w-full h-full object-contain transition-opacity duration-500"
                />
                
                {/* Progress bar container */}
                <div className="absolute bottom-0 left-0 right-0 h-2 bg-gray-200 bg-opacity-50">
                    {/* Animated progress bar */}
                    <div 
                        className="h-full bg-teal-600 transition-all duration-500 ease-linear"
                        style={{ 
                            width: `${((currentImageIndex + 1) / galleryImages.length) * 100}%`,
                            transition: 'width 3s linear'
                        }}
                    />
                </div>

                {/* Image indicators */}
                <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
                    {galleryImages.map((_, index) => (
                        <button
                            key={index}
                            className={`w-2 h-2 rounded-full ${
                                index === currentImageIndex ? 'bg-teal-600' : 'bg-gray-300'
                            } transition-all duration-300`}
                            aria-label={`Ir a la diapositiva ${index + 1}`}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Carousel;
