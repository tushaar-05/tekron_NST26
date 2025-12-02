import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './WorldMap.css';

const ISLANDS = [
    {
        id: 'home',
        label: 'HOME',
        position: { top: '50%', left: '50%', transform: 'translate(-50%, -50%)' },
        size: { width: '150px', height: '150px' },
        path: '/'
    },
    {
        id: 'about',
        label: 'ABOUT TEKRON',
        position: { top: '15%', right: '25%' },
        size: { width: '120px', height: '100px' },
        path: '/about'
    },
    {
        id: 'events',
        label: 'EVENTS',
        position: { top: '30%', right: '10%' },
        size: { width: '110px', height: '90px' },
        path: '/events'
    },
    {
        id: 'competition',
        label: 'COMPETITION',
        position: { bottom: '25%', right: '8%' },
        size: { width: '130px', height: '100px' },
        path: '/competition'
    },
    {
        id: 'store',
        label: 'STORE',
        position: { bottom: '15%', left: '50%', transform: 'translateX(-50%)' },
        size: { width: '100px', height: '90px' },
        path: '/store'
    },
    {
        id: 'contact',
        label: 'CONTACT',
        position: { bottom: '25%', left: '10%' },
        size: { width: '110px', height: '90px' },
        path: '/contact'
    },
    {
        id: 'sponsors',
        label: 'SPONSORS',
        position: { top: '30%', left: '10%' },
        size: { width: '120px', height: '90px' },
        path: '/sponsors'
    },
    {
        id: 'gallery',
        label: 'GALLERY',
        position: { top: '15%', left: '25%' },
        size: { width: '110px', height: '90px' },
        path: '/gallery'
    }
];

function WorldMap() {
    const navigate = useNavigate();
    const [hoveredIsland, setHoveredIsland] = useState(null);
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

    const handleIslandClick = (path) => {
        navigate(path);
    };

    const cloudBaseStyle = {
        position: 'absolute',
        width: '500px',
        height: 'auto',
        zIndex: 1,
        transition: 'transform 0.3s ease-out',
        willChange: 'transform'
    };

    return (
        <div style={{ 
            position: 'relative',
            width: '100%',
            height: '100vh',
            overflow: 'hidden'
        }}>
            {/* Main Background */}
            <div
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100vw',
                    height: '100vh',
                    backgroundImage: 'url(/images/map/main.png)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    transform: `translate(${mousePosition.x * 5}px, ${mousePosition.y * 5}px)`,
                    willChange: 'transform',
                    zIndex: 1
                }}
            />
            
            {/* Interactive Islands */}
            {ISLANDS.map((island) => (
                <div
                    key={island.id}
                    className={`island ${hoveredIsland === island.id ? 'hovered' : ''}`}
                    style={{
                        position: 'absolute',
                        ...island.position,
                        ...island.size,
                        zIndex: 10,
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        textAlign: 'center',
                        opacity: hoveredIsland === island.id ? 1 : 0.7,
                        transform: hoveredIsland === island.id ? 'scale(1.05)' : 'scale(1)'
                    }}
                    onMouseEnter={() => setHoveredIsland(island.id)}
                    onMouseLeave={() => setHoveredIsland(null)}
                    onClick={() => handleIslandClick(island.path)}
                >
                    <span 
                        className="island-label"
                        style={{
                            fontFamily: '"Press Start 2P", cursive',
                            color: '#fff',
                            textShadow: '2px 2px 0 #000',
                            fontSize: island.id === 'home' ? '14px' : '10px',
                            padding: '5px 10px',
                            backgroundColor: 'rgba(0, 0, 0, 0.7)',
                            borderRadius: '5px',
                            pointerEvents: 'none',
                            opacity: hoveredIsland === island.id ? 1 : 0,
                            transition: 'opacity 0.3s ease',
                            textAlign: 'center',
                            lineHeight: '1.2',
                            whiteSpace: 'nowrap'
                        }}
                    >
                        {island.label}
                    </span>
                </div>
            ))}
            
            {/* Clouds */}
            <img 
                src="/images/map/cloud-1.png" 
                alt="Cloud 1" 
                style={{
                    ...cloudBaseStyle,
                    top: '-20px',
                    left: '-20px',
                    transform: `translate(${mousePosition.x * 10}px, ${mousePosition.y * 10}px)`,
                    zIndex: 5
                }}
            />
            
            <img 
                src="/images/map/cloud-1.png" 
                alt="Cloud 2" 
                style={{
                    ...cloudBaseStyle,
                    top: '-20px',
                    right: '-20px',
                    transform: `translate(${-mousePosition.x * 15}px, ${mousePosition.y * 15}px) scaleX(-1)`,
                    zIndex: 5
                }}
            />
            
            <img 
                src="/images/map/cloud-1.png" 
                alt="Cloud 3" 
                style={{
                    ...cloudBaseStyle,
                    bottom: '-20px',
                    left: '-20px',
                    transform: `translate(${mousePosition.x * 20}px, ${-mousePosition.y * 20}px) scaleY(-1)`,
                    zIndex: 5
                }}
            />
            
            <img 
                src="/images/map/cloud-1.png" 
                alt="Cloud 4" 
                style={{
                    ...cloudBaseStyle,
                    bottom: '-20px',
                    right: '-20px',
                    transform: `translate(${-mousePosition.x * 25}px, ${-mousePosition.y * 25}px) scale(-1)`,
                    zIndex: 5
                }}
            />
        </div>
    );
}

export default WorldMap;