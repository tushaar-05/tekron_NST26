import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import MapIsland from './MapIsland';
import WorldLoading from './WorldLoading';

// Import optimized island images
const homeIsland = '/images/map/islands/home_pixel.png';
const aboutIsland = '/images/map/islands/about_pixel.webp';
const compIsland = '/images/map/islands/comp_pixel.png';
const contactIsland = '/images/map/islands/contact_pixel.png';
const eventsIsland = '/images/map/islands/events_pixel.png';
const galleryIsland = '/images/map/islands/gallery_pixel.png';
const sponsorsIsland = '/images/map/islands/sponsors_pixel.png';

function WorldMap() {
    const navigate = useNavigate();
    const location = useLocation();

    // Mobile Detection
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Phases: 'loading', 'void', 'seed', 'genesis', 'stabilized', 'connected'
    const [phase, setPhase] = useState(() => {
        const introComplete = sessionStorage.getItem('tekron_intro_complete') === 'true';
        return introComplete ? 'void' : 'loading';
    });

    const [narrative, setNarrative] = useState('');
    const [visibleIslands, setVisibleIslands] = useState(['home']); // Start with only Home visible

    // --- 3D Physics State ---
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Smooth physics for tilt
    const springConfig = { damping: 30, stiffness: 100 };
    const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]), springConfig);
    const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]), springConfig);

    // Parallax Background
    const bgX = useSpring(useTransform(mouseX, [-0.5, 0.5], [-20, 20]), springConfig);
    const bgY = useSpring(useTransform(mouseY, [-0.5, 0.5], [-20, 20]), springConfig);

    // Dynamic Glare Position
    const glareX = useSpring(useTransform(mouseX, [-0.5, 0.5], [0, 100]), springConfig);
    const glareY = useSpring(useTransform(mouseY, [-0.5, 0.5], [0, 100]), springConfig);

    // Cloud Parallax (Variable Speeds for Depth)
    const cloud1X = useSpring(useTransform(mouseX, [-0.5, 0.5], [-40, 40]), springConfig);
    const cloud1Y = useSpring(useTransform(mouseY, [-0.5, 0.5], [-20, 20]), springConfig);

    const cloud2X = useSpring(useTransform(mouseX, [-0.5, 0.5], [30, -30]), springConfig); // Inverse movement
    const cloud2Y = useSpring(useTransform(mouseY, [-0.5, 0.5], [15, -15]), springConfig);

    const cloud3X = useSpring(useTransform(mouseX, [-0.5, 0.5], [-60, 60]), springConfig); // Faster (foreground)
    const cloud3Y = useSpring(useTransform(mouseY, [-0.5, 0.5], [-30, 30]), springConfig);

    const cloud4X = useSpring(useTransform(mouseX, [-0.5, 0.5], [50, -50]), springConfig);
    const cloud4Y = useSpring(useTransform(mouseY, [-0.5, 0.5], [25, -25]), springConfig);

    const handleMouseMove = (e) => {
        // Normalize coordinates -0.5 to 0.5
        const x = (e.clientX / window.innerWidth) - 0.5;
        const y = (e.clientY / window.innerHeight) - 0.5;
        mouseX.set(x);
        mouseY.set(y);
    };

    const islandsConfig = [
        {
            id: 'home',
            image: homeIsland,
            label: 'HOME',
            route: '/',
            desktop: { x: 50, y: 50, size: 280 },
            mobile: { x: 50, y: 46, size: 190 }
        },
        {
            id: 'contact',
            image: contactIsland,
            label: 'CONTACT',
            route: '/contact',
            desktop: { x: 50, y: 15, size: 200 },
            mobile: { x: 45, y: 9, size: 100 }
        },
        {
            id: 'comp',
            image: compIsland,
            label: 'COMPETITIONS',
            route: '/competition',
            desktop: { x: 75, y: 25, size: 220 },
            mobile: { x: 60, y: 25, size: 120 }
        },
        {
            id: 'gallery',
            image: galleryIsland,
            label: 'GALLERY',
            route: '/gallery',
            desktop: { x: 75, y: 65, size: 220 },
            mobile: { x: 69, y: 65, size: 120 }
        },
        {
            id: 'about',
            image: aboutIsland,
            label: 'ABOUT',
            route: '/about',
            desktop: { x: 50, y: 85, size: 200 },
            mobile: { x: 50, y: 80, size: 120 }
        },
        {
            id: 'sponsors',
            image: sponsorsIsland,
            label: 'SPONSORS',
            route: '/sponsors',
            desktop: { x: 25, y: 65, size: 220 },
            mobile: { x: 17, y: 60, size: 100 }
        },
        {
            id: 'events',
            image: eventsIsland,
            label: 'EVENTS',
            route: '/events',
            desktop: { x: 25, y: 25, size: 220 },
            mobile: { x: 20, y: 25, size: 110 }
        }
    ];

    const islands = islandsConfig.map(config => ({
        id: config.id,
        image: config.image,
        label: config.label,
        route: config.route,
        x: isMobile ? config.mobile.x : config.desktop.x,
        y: isMobile ? config.mobile.y : config.desktop.y,
        size: isMobile ? config.mobile.size : config.desktop.size
    }));

    // Progressive Island Loading
    useEffect(() => {
        // Once we hit phases where islands should appear, stagger their visibility
        if (['stabilized', 'connected'].includes(phase)) {
            const allIds = islands.map(i => i.id);
            const remaining = allIds.filter(id => id !== 'home');

            // Stagger reveal of other islands
            remaining.forEach((id, index) => {
                setTimeout(() => {
                    setVisibleIslands(prev => [...new Set([...prev, id])]);
                }, 500 + (index * 200));
            });
        }
    }, [phase]);

    // The Genesis Sequence Controller Combined with Physics
    useEffect(() => {
        const sequence = async () => {
            const hasPlayedAnimation = sessionStorage.getItem('tekron_genesis_played');

            if (hasPlayedAnimation) {
                setPhase('connected');
                setNarrative("WELCOME TO TEKRON.");
                // Immediately show all islands if returning
                setVisibleIslands(islands.map(i => i.id));
                return;
            }

            if (phase === 'void') {
                setNarrative("SCANNING SECTOR...");
                await new Promise(r => setTimeout(r, 1000));
                setNarrative("ANOMALY DETECTED.");
                await new Promise(r => setTimeout(r, 1000));

                setPhase('seed');
                setNarrative("ENERGY SPIKE DETECTED.");
                await new Promise(r => setTimeout(r, 1500));
                setNarrative("CRITICAL MASS IMMINENT.");
                await new Promise(r => setTimeout(r, 1000));

                setPhase('genesis');
                setNarrative("EXPANSION INITIATED.");
                await new Promise(r => setTimeout(r, 500));

                setPhase('stabilized');
                await new Promise(r => setTimeout(r, 1500));
                setNarrative("STABILIZING ORBITS...");
                await new Promise(r => setTimeout(r, 1000));

                setPhase('connected');
                setNarrative("SYSTEM ONLINE. WELCOME TO TEKRON.");
                sessionStorage.setItem('tekron_genesis_played', 'true');
            }
        };

        sequence();

        // DEFERRED LISTENER: Only start tracking mouse after heavy lifting
        if (['stabilized', 'connected'].includes(phase)) {
            window.addEventListener('mousemove', handleMouseMove);
        }

        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [phase]);

    const handleLoadingComplete = () => {
        setPhase('void');
    };

    // Generate Space Debris (Refined for continuous circular motion)
    const debris = React.useMemo(() => {
        return Array.from({ length: 60 }).map((_, i) => ({ // Reduced count from 108 to 60 for perf
            id: i,
            x: Math.random() * 100,
            y: Math.random() * 100,
            size: Math.random() * 3 + 1,
            speed: Math.random() * 35 + 22,
            opacity: Math.random() * 0.5 + 0.4,
            width: Math.random() * 100 + 50,
            height: Math.random() * 80 + 40,
        }));
    }, []);

    // OPTIMIZATION: Only preload Home island and background primarily
    const initialAssets = [homeIsland, '/images/map/waterFinal.webp'];

    if (phase === 'loading') {
        return <WorldLoading onLoadingComplete={handleLoadingComplete} assets={initialAssets} />;
    }

    return (
        <div className="relative w-screen h-screen overflow-hidden bg-black font-['VT323',_monospace] selection:bg-purple-500 selection:text-white perspective-[2000px]">

            {/* 1. Deep Space Background (Fixed + Parallax) */}
            <motion.div
                className="absolute inset-[-15%] z-0"
                style={{
                    x: bgX,
                    y: bgY,
                    backgroundImage: 'url(/images/map/waterFinal.webp)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    filter: 'brightness(0.65) contrast(1.1)',
                    willChange: 'transform' // GPU Hint
                }}
            >
                <motion.div
                    className="absolute inset-0"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 300, repeat: Infinity, ease: "linear" }}
                    style={{
                        backgroundImage: 'url(/images/map/waterFinal.webp)',
                        backgroundSize: 'cover',
                        opacity: 0.3,
                        mixBlendMode: 'overlay',
                        willChange: 'transform' // GPU Hint
                    }}
                />
            </motion.div>

            {/* 2. Independent Floating Debris - Z-INDEX 10 */}
            <div className="absolute inset-0 pointer-events-none z-10">
                {debris.map((d) => (
                    <motion.div
                        key={d.id}
                        className="absolute rounded-full bg-white"
                        style={{
                            left: `${d.x}%`,
                            top: `${d.y}%`,
                            width: d.size,
                            height: d.size,
                            opacity: d.opacity,
                        }}
                        animate={{
                            x: [0, d.width, 0, -d.width, 0],
                            y: [0, d.height / 2, 0, -d.height / 2, 0],
                        }}
                        transition={{
                            duration: d.speed,
                            repeat: Infinity,
                            ease: "linear",
                            times: [0, 0.25, 0.5, 0.75, 1],
                            delay: Math.random() * -20
                        }}
                    />
                ))}
            </div>

            {/* 3. Corner Clouds - Atmospheric Depth */}
            <div className="absolute inset-0 pointer-events-none z-20 overflow-hidden">
                {/* Top Left - Cloud 1 */}
                <motion.img
                    src="/images/map/cloud-1.png"
                    alt=""
                    className="absolute top-[-20px] sm:-top-20 left-[-20px] sm:-left-20 w-[200px] sm:w-[400px] mix-blend-screen param-cloud"
                    style={{ x: cloud1X, y: cloud1Y }}
                />
                {/* Top Right - Cloud 2 */}
                <motion.img
                    src="/images/map/clouds-2.png"
                    alt=""
                    className="absolute top-[-20px] sm:-top-32 right-[-20px] sm:-right-10 w-[250px] sm:w-[500px] mix-blend-screen param-cloud"
                    style={{ x: cloud2X, y: cloud2Y }}
                />
                {/* Bottom Left - Cloud 3 */}
                <motion.img
                    src="/images/map/clouds-3.png"
                    alt=""
                    className="absolute bottom-[-20px] sm:-bottom-20 left-[-20px] sm:-left-10 w-[225px] sm:w-[450px] mix-blend-screen param-cloud"
                    style={{ x: cloud3X, y: cloud3Y }}
                />
                {/* Bottom Right - Cloud 4 */}
                <motion.img
                    src="/images/map/clouds-4.png"
                    alt=""
                    className="absolute bottom-[-20px] sm:-bottom-32 right-[-20px] sm:-right-20 w-[275px] sm:w-[550px] mix-blend-screen param-cloud"
                    style={{ x: cloud4X, y: cloud4Y }}
                />
            </div>

            {/* Shockwave Effect (Genesis Phase) */}
            <AnimatePresence>
                {phase === 'genesis' && (
                    <motion.div
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-cyan-200 rounded-full z-50 box-content"
                        initial={{ width: 0, height: 0, opacity: 1, borderWidth: '200px' }}
                        animate={{ width: '250vw', height: '250vw', opacity: 0, borderWidth: '0px' }}
                        transition={{ duration: 2.5, ease: "circOut" }}
                    />
                )}
            </AnimatePresence>

            {/* White Flash Effect */}
            <AnimatePresence>
                {phase === 'genesis' && (
                    <motion.div
                        className="absolute inset-0 bg-white z-[100] pointer-events-none"
                        initial={{ opacity: 1 }}
                        animate={{ opacity: 0 }}
                        transition={{ duration: 3, ease: "easeOut" }}
                    />
                )}
            </AnimatePresence>

            {/* Constellation Lines */}
            <div className="absolute inset-0 z-10 pointer-events-none">
                <AnimatePresence>
                    {(phase === 'stabilized' || phase === 'connected') && islands.map((island) => {
                        if (island.id === 'home' || !visibleIslands.includes(island.id)) return null;

                        return Array.from({ length: 8 }).map((_, k) => (
                            <motion.div
                                key={`${island.id}-stream-${k}`}
                                className="absolute bg-white rounded-full"
                                initial={{ left: '50%', top: '50%', opacity: 0, scale: 0.5 }}
                                animate={{
                                    left: `${island.x}%`,
                                    top: `${island.y}%`,
                                    opacity: [0, 0.4, 0],
                                    scale: [0.5, 1, 0.5]
                                }}
                                transition={{
                                    duration: 4,
                                    repeat: Infinity,
                                    delay: k * 0.5,
                                    ease: "linear"
                                }}
                                style={{
                                    width: '3px',
                                    height: '3px',
                                    boxShadow: 'none'
                                }}
                            />
                        ));
                    })}
                </AnimatePresence>
            </div>

            {/* 3D Islands Field */}
            <motion.div className="relative w-full h-full z-10 transform-3d">
                {islands.map((island) => {
                    const isHome = island.id === 'home';
                    const isExpanded = ['genesis', 'stabilized', 'connected'].includes(phase);
                    const isVisible = visibleIslands.includes(island.id);

                    if (!isVisible && !isHome) return null;

                    return (
                        <motion.div
                            key={island.id}
                            className="absolute cursor-pointer perspective-[500px]"
                            initial={{ left: '50%', top: '50%', x: '-50%', y: '-50%', scale: 0, opacity: 0, filter: 'blur(20px)' }}
                            animate={{
                                left: isExpanded ? `${island.x}%` : '50%',
                                top: isExpanded ? `${island.y}%` : '50%',
                                scale: phase === 'void' ? 0 : isExpanded ? 1 : (isHome ? 1 : 0),
                                opacity: phase === 'void' ? 0 : 0.9,
                                filter: (isHome && phase === 'seed') ? 'blur(0px)' : (phase === 'void' ? 'blur(20px)' : 'blur(0px)'),
                                x: (isHome && phase === 'seed')
                                    ? ['-50%', '-52%', '-48%', '-51%', '-49%', '-50%']
                                    : '-50%',
                                y: (isHome && phase === 'seed')
                                    ? ['-50%', '-49%', '-51%', '-48%', '-52%', '-50%']
                                    : (phase === 'stabilized' || phase === 'connected')
                                        ? ['-50%', '-58%', '-50%']
                                        : '-50%',
                            }}
                            whileHover={{ opacity: 1, scale: 1.05 }}
                            transition={{
                                default: { type: "spring", stiffness: 40, damping: 15 },
                                x: (isHome && phase === 'seed') ? { duration: 0.08, repeat: Infinity, ease: "linear" } : { type: "spring", stiffness: 40, damping: 15 },
                                y: (isHome && phase === 'seed')
                                    ? { duration: 0.08, repeat: Infinity, ease: "linear" }
                                    : (phase === 'stabilized' || phase === 'connected')
                                        ? { duration: 6, repeat: Infinity, ease: "easeInOut", delay: Math.random() * 2 }
                                        : { type: "spring", stiffness: 40, damping: 15 },
                                delay: isHome ? 0 : (isExpanded ? Math.random() * 0.2 : 0)
                            }}
                            style={{
                                zIndex: isHome ? 50 : 20,
                                transformStyle: 'preserve-3d'
                            }}
                            onClick={() => phase === 'connected' && navigate(island.route)}
                        >
                            {/* Green Nebula Vortex (Home only) */}
                            {isHome && (phase === 'seed' || phase === 'genesis' || phase === 'stabilized' || phase === 'connected') && (
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-[-1]">
                                    <motion.div
                                        initial={{ scale: 0, opacity: 0, rotate: 0 }}
                                        animate={{
                                            scale: phase === 'seed' ? [0.5, 1.5, 1.2] : [1, 1.1, 1],
                                            opacity: phase === 'seed' ? [0, 1, 0.8] : [0.4, 0.6, 0.4],
                                            rotate: 360
                                        }}
                                        transition={{
                                            duration: phase === 'seed' ? 2 : 10,
                                            repeat: phase === 'seed' ? 0 : Infinity,
                                            ease: phase === 'seed' ? "easeOut" : "linear"
                                        }}
                                        style={{
                                            width: isHome ? island.size * 1.5 : 0,
                                            height: isHome ? island.size * 1.5 : 0,
                                            background: 'radial-gradient(circle, rgba(0, 255, 170, 0.5) 0%, rgba(0, 150, 255, 0.2) 40%, transparent 70%)',
                                            filter: 'blur(35px) brightness(1.2)',
                                            borderRadius: '50%',
                                        }}
                                    />
                                </div>
                            )}

                            {/* Inner 3D Container for Image and Glare - WITH TILT */}
                            <motion.div
                                className="relative preserve-3d"
                                style={{
                                    rotateX: rotateX,
                                    rotateY: rotateY,
                                }}
                                initial={{ rotateX: 0, rotateY: 0 }}
                            >
                                <MapIsland
                                    src={island.image}
                                    alt={island.label}
                                    size={island.size}
                                    isHome={isHome}
                                    phase={phase}
                                />

                                {/* Dynamic Glare Overlay */}
                                <motion.div
                                    className="absolute inset-0 rounded-full opacity-0 pointer-events-none mix-blend-overlay"
                                    style={{
                                        background: `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.7) 0%, transparent 50%)`,
                                    }}
                                    whileHover={{ opacity: 0.3 }}
                                />
                            </motion.div>

                            {/* 3D Label */}
                            <AnimatePresence>
                                {phase === 'connected' && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10, rotateX: 90 }}
                                        animate={{ opacity: 1, y: 0, rotateX: 0 }}
                                        transition={{ delay: 0.5, type: 'spring' }}
                                        className="absolute -bottom-10 left-1/2 -translate-x-1/2 whitespace-nowrap"
                                        style={{ transformStyle: 'preserve-3d', transform: 'translateZ(20px)' }}
                                    >
                                        <div className="flex flex-col items-center gap-1">
                                            <div className="w-1 h-8 bg-gradient-to-b from-white/50 to-transparent" />
                                            <span className="text-lg font-bold text-white tracking-[0.2em] bg-black/40 px-3 py-1 rounded-full backdrop-blur-md border border-white/10 shadow-lg" style={{ fontFamily: "'VT323', monospace" }}>
                                                {island.label}
                                            </span>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    );
                })}
            </motion.div>

            {/* Narrative HUD */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 md:left-auto md:translate-x-0 md:bottom-12 md:right-12 z-50 pointer-events-none w-max max-w-[90vw]">
                <motion.div
                    key={narrative} // Re-animate on text change
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="inline-block bg-black/80 px-4 py-1.5 md:px-6 md:py-2 rounded-full border border-white/20 backdrop-blur-md shadow-[0_0_20px_rgba(0,0,0,0.5)]"
                >
                    <span className="text-purple-400 text-base md:text-xl tracking-widest typewriter drop-shadow-[0_0_5px_rgba(168,85,247,0.5)]" style={{ fontFamily: "'VT323', monospace" }}>
                        {`> ${narrative}`}
                    </span>
                </motion.div>
            </div>

            <style>{`
                .typewriter {
                    overflow: hidden;
                    white-space: nowrap;
                    border-right: 2px solid #a855f7;
                    animation: typing 3.5s steps(40, end), blink-caret .75s step-end infinite;
                }
                @keyframes blink-caret {
                    from, to { border-color: transparent }
                    50% { border-color: #a855f7; }
                }
                .transform-3d {
                    transform-style: preserve-3d;
                }
                .preserve-3d {
                    transform-style: preserve-3d;
                }
            `}</style>
        </div >
    );
}

export default WorldMap;
