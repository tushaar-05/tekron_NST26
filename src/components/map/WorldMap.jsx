import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

// Import optimized island images
const homeIsland = '/images/map/islands/home_draft.webp';
const aboutIsland = '/images/map/islands/about.webp';
const compIsland = '/images/map/islands/comp.webp';
const contactIsland = '/images/map/islands/contact.webp';
const eventsIsland = '/images/map/islands/events.webp';
const galleryIsland = '/images/map/islands/gallery.webp';
const sponsorsIsland = '/images/map/islands/sponsors.webp';
const storeIsland = '/images/map/islands/store.webp';

function WorldMap() {
    const navigate = useNavigate();
    // Phases: 'void', 'seed', 'genesis', 'stabilized', 'connected'
    const [phase, setPhase] = useState('void');
    const [narrative, setNarrative] = useState('');

    // --- 3D Physics State ---
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Smooth physics for tilt
    const springConfig = { damping: 25, stiffness: 150 };
    const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [15, -15]), springConfig);
    const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-15, 15]), springConfig);

    // Dynamic Glare Position (moves opposite to rotation)
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
        { id: 'about', image: aboutIsland, label: 'ABOUT', x: 20, y: 30, size: 160, route: '/about' },
        { id: 'comp', image: compIsland, label: 'COMPETITIONS', x: 80, y: 30, size: 180, route: '/competition' },
        // Mid Flank
        { id: 'sponsors', image: sponsorsIsland, label: 'SPONSORS', x: 10, y: 55, size: 140, route: '/sponsors' },
        { id: 'gallery', image: galleryIsland, label: 'GALLERY', x: 90, y: 55, size: 160, route: '/gallery' },
        // Lower Flank
        { id: 'events', image: eventsIsland, label: 'EVENTS', x: 30, y: 80, size: 150, route: '/events' },
        { id: 'store', image: storeIsland, label: 'STORE', x: 70, y: 80, size: 140, route: '/store' }
    ];

    // The Genesis Sequence Controller Combined with Physics
    useEffect(() => {
        const sequence = async () => {
            // Phase 1: Void
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
            await new Promise(r => setTimeout(r, 500)); // Shockwave time

            // Phase 4: Stabilized
            setPhase('stabilized');
            await new Promise(r => setTimeout(r, 1500)); // Drift time
            setNarrative("STABILIZING ORBITS...");
            await new Promise(r => setTimeout(r, 1000));

            // Phase 5: Connected
            setPhase('connected');
            setNarrative("SYSTEM ONLINE. WELCOME TO TEKRON.");
        };

        sequence();
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    // Generate Space Debris (Increased count for denser atmosphere)
    const debris = React.useMemo(() => {
        return Array.from({ length: 100 }).map((_, i) => ({
            id: i,
            x: Math.random() * 100,
            y: Math.random() * 100,
            size: Math.random() * 3 + 1,
            speed: Math.random() * 20 + 10,
            opacity: Math.random() * 0.5 + 0.1
        }));
    }, []);

    return (
        <div className="relative w-screen h-screen overflow-hidden bg-black font-sans selection:bg-purple-500 selection:text-white perspective-[2000px]">

            {/* 1. Deep Space Background (Fixed) */}
            <div
                className="absolute inset-[-10%]"
                style={{
                    backgroundImage: 'url(/images/map/waterFinal.webp)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    filter: 'brightness(0.6) contrast(1.2) hue-rotate(240deg)',
                }}
            >
                <motion.div
                    className="absolute inset-0"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 240, repeat: Infinity, ease: "linear" }}
                    style={{
                        backgroundImage: 'url(/images/map/waterFinal.webp)',
                        backgroundSize: 'cover',
                        opacity: 0.5,
                        mixBlendMode: 'overlay'
                    }}
                />
            </div>

            {/* 2. Independent Floating Debris */}
            <div className="absolute inset-0 pointer-events-none z-0">
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
                            x: [0, d.speed * 3, 0, -d.speed * 2, 0],
                            y: [0, -d.speed * 2, 0, d.speed * 3, 0],
                        }}
                        transition={{
                            duration: 20 + Math.random() * 10,
                            repeat: Infinity,
                            ease: "linear",
                            delay: Math.random() * 5
                        }}
                    />
                ))}
            </div>

            {/* Shockwave Effect (Genesis Phase) */}
            <AnimatePresence>
                {phase === 'genesis' && (
                    <motion.div
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-white rounded-full z-50 box-content"
                        initial={{ width: 0, height: 0, opacity: 1, borderWidth: '50px' }}
                        animate={{ width: '200vw', height: '200vw', opacity: 0, borderWidth: '0px' }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
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
                        transition={{ duration: 2, ease: "easeOut" }}
                    />
                )}
            </AnimatePresence>

            {/* Constellation Lines (Connected Phase) */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <svg className="w-full h-full">
                    <AnimatePresence>
                        {(phase === 'stabilized' || phase === 'connected') && islands.map((island, i) => {
                            if (island.id === 'home') return null;
                            return (
                                <motion.line
                                    key={i}
                                    x1="50%" y1="50%"
                                    x2={`${island.x}%`} y2={`${island.y}%`}
                                    stroke="rgba(255, 255, 255, 0.15)"
                                    strokeWidth="1"
                                    initial={{ pathLength: 0 }}
                                    animate={phase === 'connected' ? { pathLength: 1 } : { pathLength: 0 }}
                                    transition={{ duration: 1.5, ease: "easeInOut", delay: i * 0.1 }}
                                />
                            )
                        })}
                    </AnimatePresence>
                </svg>
            </div>

            {/* 3D Islands Field */}
            <motion.div
                className="relative w-full h-full z-10 p-20 transform-3d"
            >
                {islands.map((island) => {
                    const isHome = island.id === 'home';
                    const isExpanded = ['genesis', 'stabilized', 'connected'].includes(phase);

                    return (
                        <motion.div
                            key={island.id}
                            className="absolute cursor-pointer perspective-[500px]"
                            initial={{ left: '50%', top: '50%', x: '-50%', y: '-50%', scale: 0, opacity: 0 }}
                            animate={{
                                left: isExpanded ? `${island.x}%` : '50%',
                                top: isExpanded ? `${island.y}%` : '50%',
                                scale: phase === 'void' ? 0 : isExpanded ? 1 : (isHome ? 1 : 0),
                                opacity: phase === 'void' ? 0 : 1
                            }}
                            transition={{
                                type: "spring", stiffness: 40, damping: 15,
                                delay: isHome ? 0 : (isExpanded ? Math.random() * 0.2 : 0)
                            }}
                            onClick={() => phase === 'connected' && navigate(island.route)}
                        >
                            {/* Inner 3D Container for Image and Glare */}
                            <motion.div
                                className="relative preserve-3d"
                                animate={phase === 'connected' ? {
                                    y: [0, -15, 0],
                                    rotateZ: [0, 2, 0, -2, 0] // Subtle floating
                                } : {}}
                                transition={phase === 'connected' ? {
                                    duration: 5,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                    delay: isHome ? 0 : Math.random() * 2
                                } : {}}
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
                                        background: `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.8) 0%, transparent 60%)`
                                    }}
                                    whileHover={{ opacity: 0.4 }} // Show glare on hover
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
                                            <span className="text-xs font-bold text-white tracking-[0.2em] bg-black/40 px-3 py-1 rounded-full backdrop-blur-md border border-white/10 shadow-lg">
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
                    <span className="text-cyan-400 font-mono text-sm tracking-widest typewriter drop-shadow-[0_0_5px_rgba(0,255,255,0.5)]">
                        {`> ${narrative}`}
                    </span>
                </motion.div>
            </div>

            <style jsx>{`
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

        </div>
    );
}

export default WorldMap;
