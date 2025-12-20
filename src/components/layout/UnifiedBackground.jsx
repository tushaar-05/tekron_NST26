import { useEffect, useState } from 'react';

const UnifiedBackground = ({ children }) => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [glitchActive, setGlitchActive] = useState(false);

    // Mouse tracking for parallax effect
    useEffect(() => {
        const handleMouseMove = (e) => {
            const centerX = window.innerWidth / 2;
            const centerY = window.innerHeight / 2;
            const offsetX = (e.clientX - centerX) / centerX;
            const offsetY = (e.clientY - centerY) / centerY;
            setMousePosition({ x: offsetX, y: offsetY });
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    // Glitch effect
    useEffect(() => {
        const glitchInterval = setInterval(() => {
            setGlitchActive(true);
            setTimeout(() => setGlitchActive(false), 200);
        }, 5000);
        return () => clearInterval(glitchInterval);
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-b from-[#1a0b2e] via-[#2e1065] to-[#1a0b2e] text-white overflow-x-hidden relative"
            style={{ imageRendering: 'pixelated' }}>

            {/* Pixel Grid Overlay */}
            <div className="tech-grid-pixel fixed inset-0 z-0 opacity-10 pointer-events-none" />

            {/* Scan Line Effect */}
            <div className="scan-line-pixel fixed inset-0 z-1 pointer-events-none" />

            {/* Glitch Overlay */}
            {glitchActive && <div className="glitch-overlay-pixel fixed inset-0 z-2 pointer-events-none" />}

            {/* Floating Pixel Clouds - Parallax Layers */}
            {/* Back Cloud Layer */}
            <div
                className="fixed transition-transform duration-200 ease-out pointer-events-none"
                style={{
                    bottom: '-3%',
                    left: '0%',
                    zIndex: 3,
                    width: '100%',
                    transform: `translate(${mousePosition.x * 5}px, ${mousePosition.y * 5}px)`,
                    willChange: 'transform',
                    opacity: 0.3
                }}
            >
                <img
                    src="/images/backgrounds/5.webp"
                    alt="Pixel cloud layer"
                    className="w-full h-auto pixel-art"
                    loading="lazy"
                />
            </div>

            {/* Middle Cloud Layer */}
            <div
                className="fixed transition-transform duration-300 ease-out pointer-events-none"
                style={{
                    top: '20%',
                    left: '50%',
                    transform: `translate(-50%, -50%) translate(${mousePosition.x * 8}px, ${mousePosition.y * 8}px)`,
                    zIndex: 4,
                    width: '100%',
                    willChange: 'transform',
                    opacity: 0.25
                }}
            >
                <img
                    src="/images/backgrounds/4.webp"
                    alt="Pixel cloud layer"
                    className="w-full h-auto pixel-art"
                    loading="lazy"
                />
            </div>

            {/* Front Cloud Layer */}
            <div
                className="fixed transition-transform duration-300 ease-out pointer-events-none"
                style={{
                    bottom: '10%',
                    left: '0%',
                    zIndex: 5,
                    width: '100%',
                    transform: `translate(${mousePosition.x * 12}px, ${mousePosition.y * 12}px)`,
                    willChange: 'transform',
                    opacity: 0.2
                }}
            >
                <img
                    src="/images/backgrounds/3.webp"
                    alt="Pixel cloud layer"
                    className="w-full h-auto pixel-art"
                    loading="lazy"
                />
            </div>

            {/* Content Container */}
            <div className="relative z-10 w-full">
                {children}
            </div>
        </div>
    );
};

export default UnifiedBackground;
