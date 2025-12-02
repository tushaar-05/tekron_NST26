import { useState, useEffect } from 'react';

function WorldMap() {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [hoveredHotspot, setHoveredHotspot] = useState(null);

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

    const hotspots = [
        { id: 'home', name: 'Events', route: '/events', position: { top: '15%', left: '28%' }, size: { width: '180px', height: '180px' }, color: '#ff6b9d'},
        { id: 'events', name: 'Home', route: '/', position: { top: '40%', left: '43%' }, size: { width: '200px', height: '200px' }, color: '#ffa500' },
        { id: 'competitions', name: 'Competitions', route: '/competitions', position: { top: '15%', right: '35%' }, size: { width: '180px', height: '180px' }, color: '#00d4ff' },
        { id: 'about', name: 'About Us', route: '/about', position: { top: '41%', left: '7%' }, size: { width: '180px', height: '180px' }, color: '#a855f7' },
        { id: 'speakers', name: 'Speakers', route: '/speakers', position: { top: '41%', right: '16%' }, size: { width: '180px', height: '180px' }, color: '#4ade80' },
        { id: 'schedule', name: 'Schedule', route: '/schedule', position: { bottom: '20%', left: '23%' }, size: { width: '180px', height: '180px' }, color: '#f59e0b' },
        { id: 'workshops', name: 'Workshops', route: '/workshops', position: { bottom: '5%', left: '42%' }, size: { width: '180px', height: '180px' }, color: '#ec4899', rotation: 0, transform: 'skewX(5deg)' },
        { id: 'sponsors', name: 'Sponsors', route: '/sponsors', position: { bottom: '18%', right: '29%' }, size: { width: '180px', height: '180px' }, color: '#06b6d4', rotation: 2 }
    ];

    const handleHotspotClick = (route) => {
        console.log(`Navigating to: ${route}`);
        // Add your routing logic here (e.g., using React Router)
        // navigate(route);
    };

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
                    backgroundImage: 'url(/images/map/main.png)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    transform: `translate(calc(-50% + ${mousePosition.x * 5}px), calc(-50% + ${mousePosition.y * 5}px))`,
                    transition: 'transform 0.1s ease-out',
                    willChange: 'transform'
                }}
            />

            {/* Interactive Hotspots */}
            {hotspots.map((hotspot) => (
                <div
                    key={hotspot.id}
                    onMouseEnter={() => setHoveredHotspot(hotspot.id)}
                    onMouseLeave={() => setHoveredHotspot(null)}
                    onClick={() => handleHotspotClick(hotspot.route)}
                    style={{
                        position: 'absolute',
                        ...hotspot.position,
                        transform: 'translate(-50%, -50%)',
                        zIndex: 20,
                        cursor: 'pointer',
                        transition: 'all 0.3s ease'
                    }}
                >
                    {/* Invisible Clickable Area with Glow Effect */}
                    <div
                        style={{
                            width: hotspot.size.width,
                            height: hotspot.size.height,
                            position: 'relative',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            transition: 'all 0.4s ease'
                        }}
                    >
                        {/* Glow Effect - Only visible on hover - More Subtle */}
                        {hoveredHotspot === hotspot.id && (
                            <div
                                style={{
                                    position: 'absolute',
                                    top: '44%',
                                    left: '50%',
                                    transform: 'translate(-50%, -50%)',
                                    width: '100%',
                                    height: '100%',
                                    borderRadius: '20%',
                                    background: `radial-gradient(ellipse, ${hotspot.color}25 0%, ${hotspot.color}15 35%, ${hotspot.color}08 60%, transparent 75%)`,
                                    boxShadow: `
                                        0 0 30px ${hotspot.color}66,
                                        0 0 50px ${hotspot.color}44,
                                        inset 0 0 25px ${hotspot.color}20
                                    `,
                                    animation: 'glowPulse 2.5s ease-in-out infinite',
                                    pointerEvents: 'none',
                                    imageRendering: 'pixelated'
                                }}
                            />
                        )}
                    </div>

                    {/* Always Visible Label with Rotation */}
                    <div
                        style={{
                            position: 'absolute',
                            top: '100%',
                            left: '50%',
                            transform: `rotate(30deg)`,
                            marginTop: '10px',
                            background: hoveredHotspot === hotspot.id
                                ? `rgba(26, 11, 46, 0.95)`
                                : 'rgba(26, 11, 46, 0.85)',
                            border: `2px solid ${hotspot.color}`,
                            borderRadius: '6px',
                            padding: hoveredHotspot === hotspot.id ? '10px 18px' : '8px 16px',
                            whiteSpace: 'nowrap',
                            boxShadow: hoveredHotspot === hotspot.id
                                ? `0 0 25px ${hotspot.color}cc, inset 0 0 15px ${hotspot.color}30`
                                : `0 0 15px ${hotspot.color}66, inset 0 0 8px ${hotspot.color}20`,
                            transition: 'all 0.3s ease',
                            imageRendering: 'pixelated',
                            pointerEvents: 'none'
                        }}
                    >
                        <p
                            className="pixel-font"
                            style={{
                                margin: 0,
                                fontSize: hoveredHotspot === hotspot.id ? '16px' : '14px',
                                color: hotspot.color,
                                textShadow: hoveredHotspot === hotspot.id
                                    ? `0 0 15px ${hotspot.color}, 0 0 25px ${hotspot.color}aa, 2px 2px 0px rgba(0,0,0,0.7)`
                                    : `0 0 10px ${hotspot.color}aa, 2px 2px 0px rgba(0,0,0,0.5)`,
                                letterSpacing: '0.12em',
                                fontWeight: 'bold',
                                transition: 'all 0.3s ease'
                            }}
                        >
                            {hotspot.name.toUpperCase()}
                        </p>
                    </div>
                </div>
            ))}

            {/* Cloud 1 - Top Left */}
            <img
                src="/images/map/cloud-1.png"
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
                src="/images/map/cloud-1.png"
                alt="Cloud 2"
                style={{
                    ...getParallaxStyle(15, -15),
                    top: '-20px',
                    right: '-20px',
                    transform: getParallaxStyle(15, -15).transform + ' scaleX(-1)',
                    pointerEvents: 'none'
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
                    transform: getParallaxStyle(-15, 15).transform + ' scaleY(-1)',
                    pointerEvents: 'none'
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
                    transform: getParallaxStyle(15, 15).transform + ' scale(-1)',
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
        </div>
    );
}

export default WorldMap;