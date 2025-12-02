import { useState, useEffect } from 'react';

function WorldMap() {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

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

    const getParallaxStyle = (xFactor, yFactor) => ({
        position: 'absolute',
        width: '500px',
        height: 'auto',
        zIndex: 1,
        transform: `translate(${mousePosition.x * xFactor}px, ${mousePosition.y * yFactor}px)`,
        transition: 'transform 0.1s ease-out'
    });

    return (
        <div style={{ position: 'relative', width: '100vw', height: '100vh' }}>
            {/* Main Background with subtle parallax */}
            <div
                style={{
                    position: 'fixed',
                    top: '50%',
                    left: '50%',
                    width: '105%',
                    height: '105%',
                    backgroundImage: 'url(/images/map/main.png)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    transform: `translate(calc(-50% + ${mousePosition.x * 5}px), calc(-50% + ${mousePosition.y * 5}px))`,
                    transition: 'transform 0.1s ease-out',
                    willChange: 'transform'
                }}
            />
            
            {/* Cloud 1 - Top Left */}
            <img 
                src="/images/map/cloud-1.png" 
                alt="Cloud 1" 
                style={{
                    ...getParallaxStyle(-15, -15),
                    top: '-20px',
                    left: '-20px',
                    transform: getParallaxStyle(-15, -15).transform + ' scale(1)'
                }}
            />
            
            {/* Cloud 2 - Top Right */}
            <img 
                src="/images/map/cloud-1.png" 
                alt="Cloud 2" 
                style={{
                    ...getParallaxStyle(15, -15),
                    top: '-20px',
                    right: '-20px',
                    transform: getParallaxStyle(15, -15).transform + ' scaleX(-1)'
                }}
            />
            
            {/* Cloud 3 - Bottom Left */}
            <img 
                src="/images/map/cloud-1.png" 
                alt="Cloud 3" 
                style={{
                    ...getParallaxStyle(-15, 15),
                    bottom: '-20px',
                    left: '-20px',
                    transform: getParallaxStyle(-15, 15).transform + ' scaleY(-1)'
                }}
            />
            
            {/* Cloud 4 - Bottom Right */}
            <img 
                src="/images/map/cloud-1.png" 
                alt="Cloud 4" 
                style={{
                    ...getParallaxStyle(15, 15),
                    bottom: '-20px',
                    right: '-20px',
                    transform: getParallaxStyle(15, 15).transform + ' scale(-1)'
                }}
            />
        </div>
    );
}

export default WorldMap;