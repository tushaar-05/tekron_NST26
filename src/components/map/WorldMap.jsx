import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';

// Import optimized island images
const homeIsland = '/images/map/islands/home_pixel.png';
const aboutIsland = '/images/map/islands/about_pixel.webp';
const compIsland = '/images/map/islands/comp_pixel.png';
const contactIsland = '/images/map/islands/contact_pixel.png';
const eventsIsland = '/images/map/islands/events_pixel.png';
const galleryIsland = '/images/map/islands/gallery_pixel.png';
const sponsorsIsland = '/images/map/islands/sponsors_pixel.png';
const storeIsland = '/images/map/islands/store_pixel.png';
import WorldLoading from './WorldLoading';

function WorldMap() {
    const navigate = useNavigate();
    const location = useLocation();
    // Phases: 'loading', 'void', 'seed', 'genesis', 'stabilized', 'connected'
    // Phases: 'loading', 'void', 'seed', 'genesis', 'stabilized', 'connected'
    const [phase, setPhase] = useState(() => {
        // Global Flag Check: If user has EVER finished intro this session, skip it.
        const introComplete = sessionStorage.getItem('tekron_intro_complete') === 'true';
        return introComplete ? 'void' : 'loading';
    });
    const [narrative, setNarrative] = useState('');

    // --- 3D Physics State ---
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Smooth physics for tilt - Heavy/Premium feel
    const springConfig = { damping: 30, stiffness: 100 };
    const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]), springConfig);
    const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]), springConfig);

    // Parallax Background
    const bgX = useSpring(useTransform(mouseX, [-0.5, 0.5], [-20, 20]), springConfig);
    const bgY = useSpring(useTransform(mouseY, [-0.5, 0.5], [-20, 20]), springConfig);

    // Dynamic Glare Position
    const glareX = useSpring(useTransform(mouseX, [-0.5, 0.5], [0, 100]), springConfig);
    const glareY = useSpring(useTransform(mouseY, [-0.5, 0.5], [0, 100]), springConfig);

    const handleMouseMove = (e) => {
        // Normalize coordinates -0.5 to 0.5
        const x = (e.clientX / window.innerWidth) - 0.5;
        const y = (e.clientY / window.innerHeight) - 0.5;
        mouseX.set(x);
        mouseY.set(y);
    };

    const islands = [
        { id: 'home', image: homeIsland, label: 'HOME', x: 50, y: 50, size: 280, route: '/' },
        // Top
        { id: 'contact', image: contactIsland, label: 'CONTACT', x: 50, y: 15, size: 130, route: '/contact' },
        // Upper Flank
        { id: 'events', image: eventsIsland, label: 'EVENTS', x: 20, y: 30, size: 150, route: '/events' },
        { id: 'comp', image: compIsland, label: 'COMPETITIONS', x: 80, y: 30, size: 180, route: '/competition' },
        // Mid Flank
        { id: 'sponsors', image: sponsorsIsland, label: 'SPONSORS', x: 10, y: 55, size: 140, route: '/sponsors' },
        { id: 'gallery', image: galleryIsland, label: 'GALLERY', x: 90, y: 55, size: 160, route: '/gallery' },
        // Lower Flank
        { id: 'about', image: aboutIsland, label: 'ABOUT', x: 30, y: 80, size: 160, route: '/about' },
        { id: 'store', image: storeIsland, label: 'STORE', x: 70, y: 80, size: 140, route: '/store' }
    ];

    // The Genesis Sequence Controller Combined with Physics
    useEffect(() => {
        const sequence = async () => {
            // Check if animation has already played this session
            const hasPlayedAnimation = sessionStorage.getItem('tekron_genesis_played');

            if (hasPlayedAnimation) {
                // Skip animation, go directly to connected state
                setPhase('connected');
                setNarrative("SYSTEM ONLINE. WELCOME TO TEKRON.");
                return;
            }

            // Phase 1: Void
            // We only reach here if phase is 'void', effectively starting the chain.
            setNarrative("SCANNING SECTOR...");
            await new Promise(r => setTimeout(r, 1000));
            setNarrative("ANOMALY DETECTED.");
            await new Promise(r => setTimeout(r, 1000));

            // Phase 2: Seed
            setPhase('seed');
            setNarrative("ENERGY SPIKE DETECTED.");
            await new Promise(r => setTimeout(r, 1500));
            setNarrative("CRITICAL MASS IMMINENT.");
            await new Promise(r => setTimeout(r, 1000));

            // Phase 3: Genesis (BANG)
            setPhase('genesis');
            setNarrative("EXPANSION INITIATED.");
            await new Promise(r => setTimeout(r, 500));

            // Phase 4: Stabilized
            setPhase('stabilized');
            await new Promise(r => setTimeout(r, 1500));
            setNarrative("STABILIZING ORBITS...");
            await new Promise(r => setTimeout(r, 1000));

            // Phase 5: Connected
            setPhase('connected');
            setNarrative("SYSTEM ONLINE. WELCOME TO TEKRON.");

            // Mark animation as played for this session
            sessionStorage.setItem('tekron_genesis_played', 'true');
        };

        // ONLY trigger the sequence if we are in the 'void' phase.
        // This prevents the effect from re-running when we setPhase('seed'), 'genesis', etc.
        if (phase === 'void') {
            sequence();
        } else if (phase === 'connected') {
            // Ensure narrative is correct if we jumped straight to connected (though handled inside logic too)
            if (sessionStorage.getItem('tekron_genesis_played')) {
                setNarrative("SYSTEM ONLINE. WELCOME TO TEKRON.");
            }
        }
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [phase]);

    const handleLoadingComplete = () => {
        setPhase('void');
    };

    // Generate Space Debris (Refined for continuous circular motion)
    const debris = React.useMemo(() => {
        return Array.from({ length: 108 }).map((_, i) => ({
            id: i,
            x: Math.random() * 100,
            y: Math.random() * 100,
            size: Math.random() * 3 + 1,
            speed: Math.random() * 35 + 22, // Slower (increased duration)
            opacity: Math.random() * 0.5 + 0.4,
            width: Math.random() * 100 + 50, // Orbit width
            height: Math.random() * 80 + 40, // Orbit height
        }));
    }, []);

    if (phase === 'loading') {
        return <WorldLoading onLoadingComplete={handleLoadingComplete} />;
    }

    return (
        <div className="relative w-screen h-screen overflow-hidden bg-black font-['VT323',_monospace] selection:bg-purple-500 selection:text-white perspective-[2000px]">

            {/* 1. Deep Space Background (Fixed + Parallax) - Z-INDEX 0 */}
            <motion.div
                className="absolute inset-[-15%] z-0"
                style={{
                    x: bgX,
                    y: bgY,
                    backgroundImage: 'url(/images/map/waterFinal.webp)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    filter: 'brightness(0.5) contrast(1.1) hue-rotate(240deg)', // Darker, cleaner
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
                        mixBlendMode: 'overlay'
                    }}
                />
            </motion.div>

            {/* 2. Independent Floating Debris - Z-INDEX 10 */}
            <div className="absolute inset-0 pointer-events-none z-10">
                {debris.map((d, i) => (
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
                        // Continuous Elliptical Orbit
                        animate={{
                            x: [0, d.width, 0, -d.width, 0],
                            y: [0, d.height / 2, 0, -d.height / 2, 0],
                        }}
                        transition={{
                            duration: d.speed,
                            repeat: Infinity,
                            ease: "linear", // Continuous non-stop motion
                            times: [0, 0.25, 0.5, 0.75, 1], // Perfect quadrature pacing
                            delay: Math.random() * -20 // Negative delay to start mid-orbit (no initial sync)
                        }}
                    />
                ))}
            </div>

            {/* Shockwave Effect (Genesis Phase) - ENHANCED */}
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

            {/* Constellation Lines (Connected Phase) - SMALL DEBRIS BRIDGES */}
            <div className="absolute inset-0 z-10 pointer-events-none">
                <AnimatePresence>
                    {(phase === 'stabilized' || phase === 'connected') && islands.map((island) => {
                        if (island.id === 'home') return null;

                        const startX = 50;
                        const startY = 50;
                        const endX = island.x;
                        const endY = island.y;
                        const particleCount = 12; // Moderate density

                        // Generate particles for a flowing stream
                        return Array.from({ length: 8 }).map((_, k) => {
                            // Staggered delay for continuous flow
                            const delay = k * 0.5;
                            const duration = 4;

                            return (
                                <motion.div
                                    key={`${island.id}-stream-${k}`}
                                    className="absolute bg-white rounded-full"
                                    initial={{
                                        left: '50%',
                                        top: '50%',
                                        opacity: 0,
                                        scale: 0.5
                                    }}
                                    animate={{
                                        left: `${island.x}%`,
                                        top: `${island.y}%`,
                                        opacity: [0, 0.4, 0], // Low intensity fade in/out
                                        scale: [0.5, 1, 0.5]
                                    }}
                                    transition={{
                                        duration: duration,
                                        repeat: Infinity,
                                        delay: delay,
                                        ease: "linear"
                                    }}
                                    style={{
                                        width: '3px', // Increased size
                                        height: '3px',
                                        boxShadow: 'none' // No glow
                                    }}
                                />
                            );
                        });
                    })}
                </AnimatePresence>
            </div>

            {/* 3D Islands Field */}
            <motion.div
                className="relative w-full h-full z-10 transform-3d"
            >
                {islands.map((island) => {
                    const isHome = island.id === 'home';
                    const isExpanded = ['genesis', 'stabilized', 'connected'].includes(phase);

                    return (
                        <motion.div
                            key={island.id}
                            className="absolute cursor-pointer perspective-[500px]"
                            initial={{ left: '50%', top: '50%', x: '-50%', y: '-50%', scale: 0, opacity: 0, filter: 'blur(20px)' }}
                            animate={{
                                left: isExpanded ? `${island.x}%` : '50%',
                                top: isExpanded ? `${island.y}%` : '50%',
                                scale: phase === 'void' ? 0 : isExpanded ? 1 : (isHome ? 1 : 0),
                                opacity: phase === 'void' ? 0 : 1,
                                filter: (isHome && phase === 'seed') ? 'blur(0px)' : (phase === 'void' ? 'blur(20px)' : 'blur(0px)'),
                                // SHAKE (Pre-Blast) or FLOAT (Post-Blast)
                                x: (isHome && phase === 'seed')
                                    ? ['-50%', '-52%', '-48%', '-51%', '-49%', '-50%']
                                    : '-50%',
                                y: (isHome && phase === 'seed')
                                    ? ['-50%', '-49%', '-51%', '-48%', '-52%', '-50%'] // Shake
                                    : (phase === 'stabilized' || phase === 'connected')
                                        ? ['-50%', '-58%', '-50%'] // Heavy Float (Visible)
                                        : '-50%',
                            }}
                            transition={{
                                // Default Spring for Layout
                                default: { type: "spring", stiffness: 40, damping: 15 },
                                // Specific Shake/Float Transition
                                x: (isHome && phase === 'seed') ? { duration: 0.08, repeat: Infinity, ease: "linear" } : { type: "spring", stiffness: 40, damping: 15 },
                                y: (isHome && phase === 'seed')
                                    ? { duration: 0.08, repeat: Infinity, ease: "linear" }
                                    : (phase === 'stabilized' || phase === 'connected')
                                        ? { duration: 6, repeat: Infinity, ease: "easeInOut", delay: Math.random() * 2 } // Slower, Heavier
                                        : { type: "spring", stiffness: 40, damping: 15 },
                                delay: isHome ? 0 : (isExpanded ? Math.random() * 0.2 : 0)
                            }}
                            style={{
                                zIndex: isHome ? 50 : 20, // Robust z-index
                                transformStyle: 'preserve-3d'
                            }}
                            onClick={() => phase === 'connected' && navigate(island.route)}
                        >
                            {/* Green Nebula Vortex (Home Emergence only) */}
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
                                    {/* Secondary Glow */}
                                    <motion.div
                                        animate={{
                                            scale: [1, 1.3, 1],
                                            opacity: [0.2, 0.4, 0.2],
                                        }}
                                        transition={{
                                            duration: 4,
                                            repeat: Infinity,
                                            ease: "easeInOut"
                                        }}
                                        style={{
                                            position: 'absolute',
                                            top: '50%',
                                            left: '50%',
                                            transform: 'translate(-50%, -50%)',
                                            width: isHome ? island.size * 2 : 0,
                                            height: isHome ? island.size * 2 : 0,
                                            background: 'radial-gradient(circle, rgba(0, 255, 200, 0.2) 0%, transparent 60%)',
                                            filter: 'blur(50px)',
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
                                <img
                                    src={island.image}
                                    alt={island.label}
                                    className={`pixel-art drop-shadow-[0_20px_40px_rgba(0,0,0,0.6)] ${isHome ? 'brightness-125' : ''}`}
                                    style={{ width: island.size }}
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
            <div className="absolute bottom-12 left-0 w-full text-center z-50 pointer-events-none">
                <motion.div
                    key={narrative} // Re-animate on text change
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="inline-block bg-black/80 px-6 py-2 rounded-full border border-white/20 backdrop-blur-md shadow-[0_0_20px_rgba(0,0,0,0.5)]"
                >
                    <span className="text-cyan-400 text-xl tracking-widest typewriter drop-shadow-[0_0_5px_rgba(0,255,255,0.5)]" style={{ fontFamily: "'VT323', monospace" }}>
                        {`> ${narrative}`}
                    </span>
                </motion.div>
            </div>

            <style>{`
                .typewriter {
                    overflow: hidden;
                    white-space: nowrap;
                    border-right: 2px solid cyan;
                    animation: typing 3.5s steps(40, end), blink-caret .75s step-end infinite;
                }
                @keyframes blink-caret {
                    from, to { border-color: transparent }
                    50% { border-color: cyan; }
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
