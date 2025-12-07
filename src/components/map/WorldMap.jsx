import React, { useState, useEffect } from 'react';

// Import all island images
import homeIsland from '../../assets/images/map/islands/home.png';
import aboutIsland from '../../assets/images/map/islands/about.png';
import compIsland from '../../assets/images/map/islands/comp.png';
import contactIsland from '../../assets/images/map/islands/contact.png';
import eventsIsland from '../../assets/images/map/islands/events.png';
import galleryIsland from '../../assets/images/map/islands/gallery.png';
import sponsorsIsland from '../../assets/images/map/islands/sponsors.png';
import storeIsland from '../../assets/images/map/islands/store.png';

function WorldMap() {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [dimensions, setDimensions] = useState({
        baseSize: window.innerWidth < 768 ? 200 : 300,
        homeSize: window.innerWidth < 768 ? 300 : 400,
        distance: window.innerWidth < 768 ? 250 : 400
    });
    
    // Island data with positions in a circular layout
    const islands = [
        { 
            id: 'home', 
            image: homeIsland, 
            size: dimensions.homeSize, 
            x: '50%', 
            y: '50%', 
            zIndex: 10 
        },
        { id: 'about', image: aboutIsland, size: dimensions.baseSize, angle: 0, distance: dimensions.distance },
        { id: 'comp', image: compIsland, size: dimensions.baseSize, angle: 45, distance: dimensions.distance },
        { id: 'events', image: eventsIsland, size: dimensions.baseSize, angle: 90, distance: dimensions.distance },
        { id: 'gallery', image: galleryIsland, size: dimensions.baseSize, angle: 135, distance: dimensions.distance },
        { id: 'contact', image: contactIsland, size: dimensions.baseSize, angle: 180, distance: dimensions.distance },
        { id: 'store', image: storeIsland, size: dimensions.baseSize, angle: 225, distance: dimensions.distance },
        { id: 'sponsors', image: sponsorsIsland, size: dimensions.baseSize, angle: 315, distance: dimensions.distance }
    ];
    
    // Handle window resize for responsive design
    useEffect(() => {
        const handleResize = () => {
            const isMobile = window.innerWidth < 768;
            const isTablet = window.innerWidth < 1024;
            
            if (isMobile) {
                // Compact layout for mobile
                setDimensions({
                    baseSize: 130,    // Smaller islands
                    homeSize: 160,    // Slightly larger home island
                    distance: 180     // Closer to center
                });
            } else if (isTablet) {
                // Medium size for tablets
                setDimensions({
                    baseSize: 200,
                    homeSize: 300,
                    distance: 300
                });
            } else {
                // Full size for desktops
                setDimensions({
                    baseSize: 300,
                    homeSize: 400,
                    distance: 400
                });
            }
        };

        // Set initial sizes and handle resize immediately
        handleResize();
        window.dispatchEvent(new Event('resize'));

        // Add event listener
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Update mouse position
    useEffect(() => {
        const handleMouseMove = (e) => {
            const x = (e.clientX / window.innerWidth) * 30;
            const y = (e.clientY / window.innerHeight) * 30;
            setMousePosition({ x, y });
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    // Single parallax transformation for all elements
    const parallaxTransform = `translate(${mousePosition.x * 0.3}px, ${mousePosition.y * 0.3}px)`;

    const isMobile = window.innerWidth < 768;
    const cloudBaseStyle = {
        position: 'absolute',
        width: isMobile ? '190px' : '300px',
        height: isMobile ? '150px' : '300px',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        opacity: isMobile ? 0.6 : 0.8,  // Slightly more transparent on mobile
        zIndex: 1,
        willChange: 'transform',
        transition: 'all 0.3s ease',
        pointerEvents: 'none'  // Prevent clouds from blocking clicks
    };

    // Calculate position for circular layout
    const getIslandPosition = (island) => {
        if (isMobile) {
            // Custom positions for mobile layout
            const positions = {
                store: { x: '50%', y: '13%' },
                home: { x: '50%', y: '40%' },
                events: { x: '28%', y: '68%' },
                comp: { x: '65%', y: '70%' },
                gallery: { x: '15%', y: '25%' },
                contact: { x: '15%', y: '48%' },
                sponsors: { x: '80%', y: '30%' },
                about: { x: '85%', y: '55%' }
            };

            const pos = positions[island.id] || { x: '50%', y: '50%' };
            return {
                position: 'absolute',
                top: `calc(${pos.y} - ${island.size / 2}px)`,
                left: `calc(${pos.x} - ${island.size / 2}px)`,
                zIndex: island.id === 'home' ? 10 : 5
            };
        }

        if (island.x && island.y) {
            return {
                position: 'absolute',
                top: `calc(${island.y} - ${island.size / 2}px - 50px)`,
                left: `calc(${island.x} - ${island.size / 2}px)`,
                zIndex: island.zIndex || 5
            };
        }
        
        const centerX = window.innerWidth / 2;
        const centerY = (window.innerHeight / 2) - 50;
        const radian = (island.angle * Math.PI) / 180;
        const x = centerX + Math.cos(radian) * island.distance;
        const y = centerY + Math.sin(radian) * island.distance;
        
        return {
            position: 'absolute',
            top: `${y - island.size / 2}px`,
            left: `${x - island.size / 2}px`,
            zIndex: 5
        };
    };

    return (
        <div style={{
            position: 'relative',
            width: '100vw',
            height: isMobile ? '100vh' : '100vh', // Full height for better mobile layout
            overflow: 'hidden',
            backgroundColor: '#1a365d', // Fallback background color
            touchAction: 'none' // Better touch handling
        }}>
            {/* Water Background */}
            <div
                style={{
                    position: 'fixed',
                    top: "-10px",
                    left: "-10px",
                    width: '110%',
                    height: '110%',
                    backgroundImage: 'url(/src/assets/images/map/waterFinal.png)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    transform: parallaxTransform,
                    willChange: 'transform',
                    transition: 'transform 0.1s linear'
                }}
            />

            {/* Cloud in top-left corner */}
            <div style={{
                ...cloudBaseStyle,
                backgroundImage: 'url(/src/assets/images/map/cloud-1.png)',
                top: '-20px',
                left: '-20px',
                transform: parallaxTransform
            }} />

            {/* Cloud in top-right corner */}
            <div style={{
                ...cloudBaseStyle,
                backgroundImage: 'url(/src/assets/images/map/clouds-2.png)',
                top: '-20px',
                right: '-20px',
                transform: parallaxTransform
            }} />

            {/* Cloud in bottom-left corner */}
            <div style={{
                ...cloudBaseStyle,
                backgroundImage: 'url(/src/assets/images/map/clouds-3.png)',
                bottom: isMobile ? '0' : '-20px',
                left: isMobile ? '0' : '-20px',
                width: isMobile ? '150px' : cloudBaseStyle.width,
                height: isMobile ? '150px' : cloudBaseStyle.height,
                transform: parallaxTransform
            }} />

            {/* Cloud in bottom-right corner */}
            <div style={{
                ...cloudBaseStyle,
                backgroundImage: 'url(/src/assets/images/map/clouds-4.png)',
                bottom: isMobile ? '0' : '-20px',
                right: isMobile ? '0' : '-20px',
                width: isMobile ? '150px' : cloudBaseStyle.width,
                height: isMobile ? '150px' : cloudBaseStyle.height,
                transform: parallaxTransform
            }} />

            {/* Islands */}
            {islands.map((island) => {
                const position = getIslandPosition(island);
                const islandName = island.id.charAt(0).toUpperCase() + island.id.slice(1);
                
                return (
                    <div 
                        key={`${island.id}-${isMobile ? 'mobile' : 'desktop'}`}
                        style={{
                            position: 'absolute',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            ...position,
                            zIndex: position.zIndex,
                            width: 'auto',
                            height: 'auto',
                            
                            cursor: 'pointer',
                            transition: 'font-size 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                            willChange: 'transform, z-index'
                        }}
                        onMouseEnter={(e) => {
                            if (!isMobile) {
                                e.currentTarget.querySelector('h3').style.fontSize = '1.5rem';
                                e.currentTarget.style.zIndex = 20;
                            }
                        }}
                        onMouseLeave={(e) => {
                            if (!isMobile) {
                                e.currentTarget.querySelector('h3').style.fontSize = '0.95rem';
                                e.currentTarget.style.zIndex = position.zIndex;
                            }
                        }}
                        onTouchStart={(e) => {
                            if (isMobile) {
                                e.currentTarget.querySelector('h3').style.fontSize = '0.95rem';
                                e.currentTarget.style.zIndex = 20;
                            }
                        }}
                        onTouchEnd={(e) => {
                            if (isMobile) {
                                e.currentTarget.querySelector('h3').style.fontSize = '0.85rem';
                                e.currentTarget.style.zIndex = position.zIndex;
                            }
                        }}
                        onClick={() => {
                            // Navigate to the respective route based on island id
                            const routes = {
                                home: '/',
                                about: '/about',
                                events: '/events',
                                comp: '/competition',
                                gallery: '/gallery',
                                contact: '/contact',
                                sponsors: '/sponsors',
                                store: '/store'
                            };
                            
                            const route = routes[island.id] || '/';
                            window.location.href = route;
                        }}
                    >
                        <div style={{
                            height: '30px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: '100%',
                            marginBottom: '4px', // Reduced from 10px to 4px
                            transform: parallaxTransform,
                            willChange: 'transform',
                            transition: 'transform 0.1s linear',
                            pointerEvents: 'none'
                        }}>
                            <h3 style={{
                                color: '#d8c6f2',
                                textShadow: '2px 2px 4px rgba(0, 0, 0, 0.7)',
                                fontSize: window.innerWidth < 768 ? '0.85rem' : '1.2rem',
                                fontWeight: 'bold',
                                textTransform: 'capitalize',
                                textAlign: 'center',
                                pointerEvents: 'none',
                                userSelect: 'none',
                                transition: 'all 0.3s ease-in-out',
                                margin: 0,
                                padding: '0 10px'
                            }}>
                                {islandName}
                            </h3>
                        </div>
                        <div
                            style={{
                                width: `${island.size}px`,
                                height: `${island.size}px`,
                                backgroundImage: `url(${island.image})`,
                                backgroundSize: 'contain',
                                backgroundRepeat: 'no-repeat',
                                backgroundPosition: 'center',
                                pointerEvents: 'none',
                                transition: 'transform 0.1s linear',
                                willChange: 'transform',
                                transform: `scale(1) ${parallaxTransform}`.trim()
                            }}
                        />
                    </div>
                );
            })}
        </div>
    );
}

export default WorldMap;
