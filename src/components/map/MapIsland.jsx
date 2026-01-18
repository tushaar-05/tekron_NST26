import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const MapIsland = ({
    src,
    alt,
    size,
    isHome,
    phase,
    onLoad,
    style = {},
    className = ""
}) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [error, setError] = useState(false);

    const handleLoad = () => {
        setIsLoaded(true);
        if (onLoad) onLoad();
    };

    return (
        <div
            className={`relative ${className}`}
            style={{ width: size, height: 'auto', ...style }}
        >
            {/* Placeholder / Blur Effect */}
            <AnimatePresence>
                {!isLoaded && !error && (
                    <motion.div
                        initial={{ opacity: 0.5 }}
                        animate={{ opacity: 0.5 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-white/10 rounded-full blur-xl"
                        style={{ width: size, height: size }}
                    />
                )}
            </AnimatePresence>

            {/* Main Image */}
            <motion.img
                src={src}
                alt={alt}
                onLoad={handleLoad}
                onError={() => setError(true)}
                loading={isHome ? "eager" : "lazy"} // Prioritize home island
                decoding="async" // Decode images asynchronously
                fetchpriority={isHome ? "high" : "low"} // Browser hint for priority
                className={`pixel-art drop-shadow-[0_20px_40px_rgba(0,0,0,0.6)] ${isHome ? 'brightness-125' : ''}`}
                style={{
                    width: size,
                    display: 'block',
                    opacity: isLoaded ? 1 : 0,
                    transition: 'opacity 0.3s ease-out',
                    willChange: 'transform, opacity',
                    imageRendering: 'crisp-edges', // Better for pixel art
                    transform: 'translateZ(0)', // Force GPU acceleration
                }}
            />
        </div>
    );
};

export default MapIsland;
