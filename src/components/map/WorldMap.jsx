import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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

    // The Genesis Sequence Controller
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
    }, []);

    return (
        <div className="relative w-screen h-screen overflow-hidden bg-black font-sans selection:bg-purple-500 selection:text-white">

            {/* Background Layer */}
            <motion.div
                className="absolute inset-[-10%]"
                animate={phase === 'seed' ? { scale: [1, 1.02, 1], x: [-5, 5, -5, 5, 0] } : {}}
                transition={{ duration: 0.2, repeat: phase === 'seed' ? Infinity : 0 }}
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
                    transition={{ duration: 200, repeat: Infinity, ease: "linear" }}
                    style={{
                        backgroundImage: 'url(/images/map/waterFinal.webp)',
                        backgroundSize: 'cover',
                        opacity: 0.5,
                        mixBlendMode: 'overlay'
                    }}
                />
            </motion.div>

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
                                    stroke="rgba(255, 255, 255, 0.2)"
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

            {/* Islands */}
            <div className="relative w-full h-full z-10 perspective-1000">
                {islands.map((island) => {
                    const isHome = island.id === 'home';
                    // Position Logic based on Phase
                    // Void/Seed: Center
                    // Genesis/Stabilized/Connected: Final Position
                    const isExpanded = ['genesis', 'stabilized', 'connected'].includes(phase);

                    return (
                        <motion.div
                            key={island.id}
                            className="absolute cursor-pointer"
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
                            whileHover={phase === 'connected' ? { scale: 1.1, zIndex: 50 } : {}}
                            onClick={() => phase === 'connected' && navigate(island.route)}
                        >
                            <motion.img
                                src={island.image}
                                alt={island.label}
                                className={`pixel-art drop-shadow-[0_0_30px_rgba(255,255,255,0.3)] ${isHome ? 'brightness-125' : ''}`}
                                style={{ width: island.size }}
                                animate={
                                    phase === 'seed' && isHome ? {
                                        scale: [1, 1.1, 0.9, 1.2, 1],
                                        filter: ["brightness(1)", "brightness(2)", "brightness(1)"]
                                    } : phase === 'connected' ? {
                                        y: [0, -12, 0],
                                        rotate: [0, 2, 0, -2, 0]
                                    } : {}
                                }
                                transition={
                                    phase === 'seed' ? { duration: 0.2, repeat: Infinity }
                                        : phase === 'connected' ? {
                                            duration: 4,
                                            repeat: Infinity,
                                            ease: "easeInOut",
                                            delay: isHome ? 0 : Math.random() * 2
                                        } : {}
                                }
                            />

                            {/* Labels (Only when connected) */}
                            <AnimatePresence>
                                {phase === 'connected' && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.5 }}
                                        className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap"
                                    >
                                        <span className="text-xs font-bold text-white tracking-[0.2em] bg-black/50 px-2 py-1 rounded backdrop-blur-md border border-white/20">
                                            {island.label}
                                        </span>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    );
                })}
            </div>

            {/* Narrative HUD */}
            <div className="absolute bottom-12 left-0 w-full text-center z-50 pointer-events-none">
                <motion.div
                    key={narrative} // Re-animate on text change
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="inline-block bg-black/80 px-6 py-2 rounded-full border border-white/20 backdrop-blur-md"
                >
                    <span className="text-cyan-400 font-mono text-sm tracking-widest typewriter">
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
            `}</style>

        </div>
    );
}

export default WorldMap;
