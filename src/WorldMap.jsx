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

    const cloudBaseStyle = {
        position: 'absolute',
        width: '500px',
        height: 'auto',
        zIndex: 1,
        transition: 'transform 0.3s ease-out',
        willChange: 'transform'
    };

    return (
        <div style={{ position: 'relative', width: '100vw', height: '100vh', overflow: 'hidden' }}>
            {/* Main Background */}
            <div
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100vw',
                    height: '100vh',
                    backgroundImage: 'url(/images/map/main.png)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    transform: `translate(${mousePosition.x * 5}px, ${mousePosition.y * 5}px)`,
                    willChange: 'transform'
                }}
            />
            
            {/* Cloud 1 - Top Left */}
            <img 
                src="/images/map/cloud-1.png" 
                alt="Cloud 1" 
                style={{
                    ...cloudBaseStyle,
                    top: '-20px',
                    left: '-20px',
                    transform: `translate(${mousePosition.x * 10}px, ${mousePosition.y * 10}px)`
                }}
            />
            
            {/* Cloud 2 - Top Right */}
            <img 
                src="/images/map/cloud-1.png" 
                alt="Cloud 2" 
                style={{
                    ...cloudBaseStyle,
                    top: '-20px',
                    right: '-20px',
                    transform: `translate(${-mousePosition.x * 15}px, ${mousePosition.y * 15}px) scaleX(-1)`
                }}
            />
            
            {/* Cloud 3 - Bottom Left */}
            <img 
                src="/images/map/cloud-1.png" 
                alt="Cloud 3" 
                style={{
                    ...cloudBaseStyle,
                    bottom: '-20px',
                    left: '-20px',
                    transform: `translate(${mousePosition.x * 20}px, ${-mousePosition.y * 20}px) scaleY(-1)`
                }}
            />
            
            {/* Cloud 4 - Bottom Right */}
            <img 
                src="/images/map/cloud-1.png" 
                alt="Cloud 4" 
                style={{
                    ...cloudBaseStyle,
                    bottom: '-20px',
                    right: '-20px',
                    transform: `translate(${-mousePosition.x * 25}px, ${-mousePosition.y * 25}px) scale(-1)`
                }}
            />
        </div>
    );
}

export default WorldMap;