import React, { useState, useEffect } from 'react';

// Import your images
import image1 from '../../images/gestus1.jpg';
import image2 from '../../images/gestus2.jpg';
import image3 from '../../images/gestus3.jpg';
import image4 from '../../images/gestus4.jpg';
import image5 from '../../images/gestus5.jpg';
import image6 from '../../images/gestus6.jpg';
import image7 from '../../images/gestus7.jpg';

const images = [image1, image2, image3, image4, image5, image6, image7];

const Carousel = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(intervalId); // Clean up the interval on unmount
  }, []);

  return (
<div className="relative w-full max-w-7xl mx-auto">
    <div className="relative w-full h-96 overflow-hidden rounded-lg shadow-lg">
        <img
            src={images[currentImageIndex]}
            alt={`Carousel Image ${currentImageIndex + 1}`}
            className="w-full h-full object-contain transition-opacity duration-500"
        />
        
        {/* Progress bar container */}
        <div className="absolute bottom-0 left-0 right-0 h-2 bg-gray-200 bg-opacity-50">
            {/* Animated progress bar */}
            <div 
                className="h-full bg-teal-600 transition-all duration-500 ease-linear"
                style={{ 
                    width: `${((currentImageIndex + 1) / images.length) * 100}%`,
                    transition: 'width 3s linear'
                }}
            />
        </div>

        {/* Image indicators */}
        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
            {images.map((_, index) => (
                <button
                    key={index}
                    className={`w-2 h-2 rounded-full ${
                        index === currentImageIndex ? 'bg-teal-600' : 'bg-gray-300'
                    } transition-all duration-300`}
                    aria-label={`Go to slide ${index + 1}`}
                />
            ))}
        </div>
    </div>
</div>
  );
};

export default Carousel;