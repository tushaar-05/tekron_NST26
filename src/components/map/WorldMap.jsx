import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function WorldMap() {
    const navigate = useNavigate();
    
    const islands = [
        { 
            id: 1, 
            name: 'Home', 
            top: '370px', 
            left: '750px', 
            width: '17%', 
            height: '20%', 
            route: '/Home',
            skewX: '54deg',
            skewY: '-35deg'
        },
        { 
            id: 2, 
            name: 'Store', 
            top: '160px', 
            left: '500px', 
            width: '14%', 
            height: '16%', 
            route: '/store',
            skewX: '50deg',
            skewY: '-32deg'
        },
        { 
            id: 3, 
            name: 'Gallery', 
            top: '330px', 
            left: '290px', 
            width: '14%', 
            height: '19%', 
            route: '/allery',
            skewX: '50deg',
            skewY: '-32deg'
        },{ 
            id: 4, 
            name: 'About', 
            top: '640px', 
            left: '250px', 
            width: '12%', 
            height: '17%', 
            route: '/about',
            skewX: '50deg',
            skewY: '-32deg'
        },
        { 
            id: 5, 
            name: 'Competition', 
            top: '580px', 
            left: '600px', 
            width: '13%', 
            height: '19%', 
            route: '/competition',
            skewX: '56deg',
            skewY: '-28deg'
        },
        { 
            id: 6, 
            name: 'Events', 
            top: '370px', 
            left: '1280px', 
            width: '15%', 
            height: '16%', 
            route: '/events',
            skewX: '60deg',
            skewY: '-32deg'
        },
        { 
            id: 7, 
            name: 'Contact', 
            top: '630px', 
            left: '1070px', 
            width: '13%', 
            height: '13%', 
            route: '/contact',
            skewX: '60deg',
            skewY: '-32deg'
        },
        { 
            id: 8, 
            name: 'Sponsors', 
            top: '170px', 
            left: '1050px', 
            width: '13%', 
            height: '13%', 
            route: '/sponsors',
            skewX: '60deg',
            skewY: '-32deg'
        }
    ];
    
    const handleIslandClick = (route) => {
        navigate(route);
    };
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
        <div style={{ position: 'relative', width: '100vw', height: '100vh', overflow: 'hidden' }}>
            {/* Main Background with subtle parallax */}
            <div
                style={{
                    position: 'fixed',
                    top: '50%',
                    left: '50%',
                    width: '105%',
                    height: '105%',
                    backgroundImage: 'url(/src/assets/images/map/FinalMapNolabel.png)',
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
                src="/src/assets/images/map/cloud-1.png"
                alt="Cloud 1"
                style={{
                    ...getParallaxStyle(-15, -15),
                    top: '-20px',
                    left: '-20px',
                    transform: getParallaxStyle(-15, -15).transform + ' scale(1)',
                    pointerEvents: 'none'
                }}
            />

            {/* Cloud 2 - Top Right */}
            <img
                src="/src/assets/images/map/clouds-2.png"
                alt="Cloud 2"
                style={{
                    ...getParallaxStyle(15, -15),
                    top: '-20px',
                    right: '-20px',
                    // transform: getParallaxStyle(15, -15).transform + ' scaleX(-1)',
                    pointerEvents: 'none'
                }}
            />

            {/* Cloud 3 - Bottom Left */}
            <img
                src="/src/assets/images/map/clouds-3.png"
                alt="Cloud 3"
                style={{
                    ...getParallaxStyle(-15, 15),
                    bottom: '-20px',
                    left: '-5px',
                    // transform: getParallaxStyle(-15, 15).transform + ' scaleY(-1)',
                    pointerEvents: 'none'
                }}
            />

            {/* Cloud 4 - Bottom Right */}
            <img
                src="/src/assets/images/map/clouds-4.png"
                alt="Cloud 4"
                style={{
                    ...getParallaxStyle(15, 15),
                    bottom: '-20px',
                    right: '-20px',
                    // transform: getParallaxStyle(15, 15).transform + ' scale(-1)',
                    pointerEvents: 'none'
                }}
            />

            {/* CSS Animations */}
            <style>{`
                @keyframes glowPulse {
                    0%, 100% {
                        opacity: 0.9;
                        transform: translate(-50%, -50%) scale(1);
                    }
                    50% {
                        opacity: 0.6;
                        transform: translate(-50%, -50%) scale(1.04);
                    }
                }

                @keyframes fadeIn {
                    from {
                        opacity: 0;
                        transform: translateX(-50%) translateY(-10px);
                    }
                    to {
                        opacity: 1;
                        transform: translateX(-50%) translateY(0);
                    }
                }
            `}</style>
            
            {/* Invisible Island Buttons */}
            {islands.map((island) => (
                <button
                    key={island.id}
                    onClick={() => handleIslandClick(island.route)}
                    style={{
                        position: 'absolute',
                        top: island.top,
                        left: island.left,
                        width: island.width,
                        height: island.height,
                        opacity: 0,
                        backgroundColor: `hsl(${island.id * 90}, 70%, 60%)`,
                        cursor: 'pointer',
                        border: '2px solid transparent',
                        borderRadius: '40px',
                        padding: 0,
                        zIndex: 10,
                        transform: `translate(${mousePosition.x * 2}px, ${mousePosition.y * 2}px) skew(${island.skewX}, ${island.skewY})`,
                        transition: 'all 0.2s ease-out',
                        boxSizing: 'border-box',
                        ':hover': {
                            borderColor: 'rgba(255, 255, 255, 0.7)',
                            boxShadow: '0 0 10px rgba(255, 255, 255, 0.3)'
                        }
                    }}
                    aria-label={`Go to ${island.name}`}
                />
            ))}
        </div>
    );
}

export default WorldMap;