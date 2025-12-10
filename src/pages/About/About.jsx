import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

// Starfield Component - 50 twinkling stars
const Starfield = () => {
    const stars = Array.from({ length: 50 }, (_, i) => ({
        id: i,
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        delay: `${Math.random() * 3}s`,
        duration: `${2 + Math.random() * 2}s`
    }));

    return (
        <div className="fixed inset-0 pointer-events-none z-0">
            {stars.map((star) => (
                <div
                    key={star.id}
                    className="absolute bg-white rounded-full w-[2px] h-[2px]"
                    style={{
                        top: star.top,
                        left: star.left,
                        animation: `twinkle ${star.duration} ease-in-out infinite`,
                        animationDelay: star.delay
                    }}
                />
            ))}
        </div>
    );
};

function About() {
    const navigate = useNavigate();
    const [displayedText, setDisplayedText] = useState('');
    const [currentLineIndex, setCurrentLineIndex] = useState(0);
    const [showCursor, setShowCursor] = useState(true);

    const terminalLines = [
        'SYSTEM_STATUS: ONLINE',
        '> LOADING ARCHIVES...',
        'Welcome, Traveler. You have breached the firewall of TEKRON 2026.',
        'We are the convergence point where logic meets magic.',
        'The server is open. The quest begins now.'
    ];

    useEffect(() => {
        document.title = 'About TEKRON | TEKRON 2026';

        // Enable scrolling on About page (override global overflow:hidden from body)
        document.body.style.overflow = 'auto';

        // Cleanup: restore original overflow when leaving the page
        return () => {
            document.body.style.overflow = 'hidden';
        };
    }, []);

    // Typewriter effect
    useEffect(() => {
        if (currentLineIndex >= terminalLines.length) return;

        const currentLine = terminalLines[currentLineIndex];
        const totalText = terminalLines.slice(0, currentLineIndex).join('\n') +
            (currentLineIndex > 0 ? '\n' : '') +
            displayedText.split('\n')[currentLineIndex] || '';

        if (!displayedText.split('\n')[currentLineIndex] ||
            displayedText.split('\n')[currentLineIndex].length < currentLine.length) {
            const timer = setTimeout(() => {
                const currentLineText = displayedText.split('\n')[currentLineIndex] || '';
                const newLines = [...displayedText.split('\n')];
                newLines[currentLineIndex] = currentLine.slice(0, currentLineText.length + 1);
                setDisplayedText(newLines.join('\n'));
            }, 50);
            return () => clearTimeout(timer);
        } else if (currentLineIndex < terminalLines.length - 1) {
            const timer = setTimeout(() => {
                setCurrentLineIndex(prev => prev + 1);
            }, 500);
            return () => clearTimeout(timer);
        }
    }, [displayedText, currentLineIndex]);

    // Blinking cursor
    useEffect(() => {
        const cursorTimer = setInterval(() => {
            setShowCursor(prev => !prev);
        }, 530);
        return () => clearInterval(cursorTimer);
    }, []);

    const artifactsData = [
        {
            title: 'INNOVATION',
            subtitle: 'ELIXIR OF INNOVATION',
            description: 'Volatile ideas. Where raw creativity is brewed into reality.',
            glowColor: 'cyan',
            bgGradient: 'from-cyan-500/10 to-cyan-900/10',
            borderColor: 'border-cyan-500/30',
            hoverGlow: 'hover:shadow-[0_0_30px_rgba(6,182,212,0.6)]'
        },
        {
            title: 'COMPETITION',
            subtitle: 'BLADE OF THE CODER',
            description: 'Forged for battle. 24-hour Hackathons and coding arenas.',
            glowColor: 'red',
            bgGradient: 'from-red-500/10 to-red-900/10',
            borderColor: 'border-red-500/30',
            hoverGlow: 'hover:shadow-[0_0_30px_rgba(239,68,68,0.6)]'
        },
        {
            title: 'EVENTS',
            subtitle: 'RETRO CONSOLE',
            description: 'Esports tournaments and gaming lounges. High scores recorded.',
            glowColor: 'purple',
            bgGradient: 'from-purple-500/10 to-purple-900/10',
            borderColor: 'border-purple-500/30',
            hoverGlow: 'hover:shadow-[0_0_30px_rgba(168,85,247,0.6)]'
        },
        {
            title: 'WORKSHOPS',
            subtitle: 'LEGACY DATA',
            description: 'Knowledge transfer from industry veterans.',
            glowColor: 'green',
            bgGradient: 'from-green-500/10 to-green-900/10',
            borderColor: 'border-green-500/30',
            hoverGlow: 'hover:shadow-[0_0_30px_rgba(16,185,129,0.6)]'
        }
    ];

    const guildMembers = [
        {
            initials: 'GM',
            name: 'Alex Rivera',
            role: 'Guild Master',
            color: 'bg-purple-600'
        },
        {
            initials: 'TL',
            name: 'Jordan Chen',
            role: 'Tech Lead',
            color: 'bg-cyan-600'
        },
        {
            initials: 'DL',
            name: 'Sam Taylor',
            role: 'Design Lead',
            color: 'bg-pink-600'
        },
        {
            initials: 'EH',
            name: 'Morgan Blake',
            role: 'Event Head',
            color: 'bg-violet-600'
        },
        {
            initials: 'LO',
            name: 'Casey Park',
            role: 'Logistics',
            color: 'bg-indigo-600'
        },
        {
            initials: 'FN',
            name: 'Riley Wong',
            role: 'Finance',
            color: 'bg-purple-500'
        },
        {
            initials: 'PR',
            name: 'Avery Singh',
            role: 'Public Relations',
            color: 'bg-pink-500'
        },
        {
            initials: 'MK',
            name: 'Quinn Davis',
            role: 'Marketing',
            color: 'bg-cyan-500'
        },
        {
            initials: 'SP',
            name: 'Drew Martinez',
            role: 'Sponsorships',
            color: 'bg-violet-500'
        },
        {
            initials: 'CM',
            name: 'Rowan Lee',
            role: 'Community',
            color: 'bg-indigo-500'
        }
    ];

    const sponsorSlots = Array.from({ length: 10 }, (_, i) => ({
        id: i + 1,
        label: `LOGO_SLOT_${String(i + 1).padStart(2, '0')}`
    }));

    return (
        <div className="min-h-screen bg-gradient-to-b from-[#1a0b2e] via-[#2e1065] to-[#1a0b2e] text-white overflow-x-hidden relative">
            {/* Digital Starfield Background */}
            <Starfield />

            {/* Back to Map Button */}
            <motion.button
                onClick={() => navigate('/map')}
                className="fixed top-6 left-6 z-50 px-6 py-3 bg-gradient-to-r from-purple-600/20 to-purple-800/30 backdrop-blur-md border-2 border-purple-500/40 text-white font-bold uppercase tracking-wider pixel-font text-xs hover:border-purple-400/80 hover:shadow-[0_0_20px_rgba(168,85,247,0.4)] transition-all duration-300"
                whileHover={{ scale: 1.05, x: -5 }}
                whileTap={{ scale: 0.95 }}
            >
                ← Back to Map
            </motion.button>

            {/* HERO SECTION - Title + Terminal */}
            <section className="min-h-[90vh] flex flex-col items-center justify-center px-4 mt-16 gap-16 relative">
                {/* MAIN PAGE HEADER - Maximized Size */}
                <motion.h1
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="text-6xl md:text-8xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-purple-400 pixel-font z-10"
                    style={{
                        textShadow: '0 0 40px rgba(168, 85, 247, 0.5), 6px 6px 0px rgba(0, 0, 0, 0.6)'
                    }}
                >
                    ABOUT TEKRON
                </motion.h1>

                {/* TERMINAL BOX with Pulsing Glow - Fixed Height */}
                <div className="relative w-full max-w-3xl">
                    {/* Pulsing Core Glow */}
                    <div className="absolute -inset-4 bg-purple-600 opacity-20 blur-3xl rounded-full animate-pulse -z-10"></div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="w-full min-h-[350px] bg-black/40 backdrop-blur-lg border border-purple-400/30 p-8 md:p-12 shadow-[0_0_50px_rgba(168,85,247,0.3)] relative z-10"
                    >
                        <div className="mb-6 flex items-center justify-between border-b border-purple-500/20 pb-4">
                            <div className="flex gap-2">
                                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                            </div>
                            <span className="text-purple-300 text-xs font-mono">TEKRON_TERMINAL_v2026</span>
                        </div>

                        <div className="font-mono text-sm md:text-base text-green-400 whitespace-pre-wrap">
                            {displayedText.split('\n').map((line, index) => (
                                <div key={index} className="mb-2">
                                    {line}
                                    {index === currentLineIndex && showCursor && (
                                        <span className="inline-block w-2 h-4 bg-green-400 ml-1 animate-pulse"></span>
                                    )}
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* SECTION 2: VISION & MISSION */}
            <section className="px-4 py-16 max-w-6xl mx-auto relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-8"
                >
                    {/* Vision Card */}
                    <motion.div
                        whileHover={{ scale: 1.02 }}
                        className="bg-[#1e1432]/80 backdrop-blur-md border border-purple-500/30 p-8 shadow-lg hover:shadow-purple-500/50 transition-all duration-300"
                    >
                        <h2 className="text-3xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 pixel-font text-sm md:text-lg glitch-title">
                            THE VISION
                        </h2>
                        <p className="text-gray-300 leading-relaxed text-sm md:text-base font-mono">
                            To render a future where technology isn't just a tool, but a playground.
                            We envision a sandbox where students compile, debug, and deploy ideas to change the world.
                        </p>
                    </motion.div>

                    {/* Mission Card */}
                    <motion.div
                        whileHover={{ scale: 1.02 }}
                        className="bg-[#1e1432]/80 backdrop-blur-md border border-purple-500/30 p-8 shadow-lg hover:shadow-purple-500/50 transition-all duration-300"
                    >
                        <h2 className="text-3xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 pixel-font text-sm md:text-lg glitch-title">
                            THE MISSION
                        </h2>
                        <p className="text-gray-300 leading-relaxed text-sm md:text-base font-mono">
                            To equip the next generation with the ultimate inventory: Skills, Network, and Opportunity.
                            Fostering a guild of collaborators ready to patch the bugs of tomorrow.
                        </p>
                    </motion.div>
                </motion.div>
            </section>

            {/* SECTION 3: SYSTEM FEATURES */}
            <section className="px-4 py-16 max-w-7xl mx-auto relative z-10">
                <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-4xl md:text-5xl font-bold text-center mb-12 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-cyan-400 pixel-font text-lg md:text-2xl glitch-title"
                >
                    SYSTEM FEATURES
                </motion.h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {artifactsData.map((artifact, index) => (
                        <motion.div
                            key={artifact.title}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: index * 0.1 }}
                            whileHover={{ scale: 1.1 }}
                            className={`bg-gradient-to-br ${artifact.bgGradient} backdrop-blur-sm border-2 ${artifact.borderColor} p-6 ${artifact.hoverGlow} transition-all duration-200 cursor-pointer`}
                        >
                            <h3 className={`pixel-font text-xs mb-2 ${artifact.glowColor === 'cyan' ? 'text-cyan-400' :
                                artifact.glowColor === 'red' ? 'text-red-400' :
                                    artifact.glowColor === 'purple' ? 'text-purple-400' :
                                        'text-green-400'
                                }`}>
                                {artifact.title}
                            </h3>
                            <h4 className="font-bold text-sm mb-3 text-white font-mono">
                                {artifact.subtitle}
                            </h4>
                            <p className="text-gray-400 text-xs font-mono leading-relaxed">
                                {artifact.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* SECTION 4: THE GUILD */}
            <section className="px-4 py-16 max-w-7xl mx-auto relative z-10">
                <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-4xl md:text-5xl font-bold text-center mb-12 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-violet-400 pixel-font text-lg md:text-2xl glitch-title"
                >
                    THE GUILD
                </motion.h2>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                    {guildMembers.map((member, index) => (
                        <motion.div
                            key={member.name}
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.08 }}
                            whileHover={{ scale: 1.05, y: -5 }}
                            className="bg-[#1e1432]/70 backdrop-blur-md border-2 border-purple-600/40 overflow-hidden shadow-lg hover:shadow-purple-500/40 transition-all duration-300"
                            style={{ imageRendering: 'pixelated' }}
                        >
                            {/* Trading Card Image Area - Currently placeholder with initials */}
                            <div className={`w-full aspect-[4/5] ${member.color} flex items-center justify-center border-b-2 border-purple-600/40 bg-gradient-to-br from-purple-900/50 to-black/80`}>
                                <span className="text-white font-bold text-4xl md:text-5xl pixel-font opacity-50">
                                    {member.initials}
                                </span>
                            </div>

                            {/* Card Info */}
                            <div className="p-4 text-center">
                                <h3 className="text-white font-bold mb-1 text-sm font-mono">
                                    {member.name}
                                </h3>
                                <p className="text-purple-300 text-xs pixel-font">
                                    {member.role}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* SECTION 5: OUR ALLIES */}
            <section className="px-4 py-16 max-w-7xl mx-auto relative z-10">
                <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-4xl md:text-5xl font-bold text-center mb-12 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-400 pixel-font text-lg md:text-2xl glitch-title"
                >
                    OUR ALLIES
                </motion.h2>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                    {sponsorSlots.map((slot, index) => (
                        <motion.div
                            key={slot.id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.05 }}
                            whileHover={{ scale: 1.05, borderColor: 'rgba(168, 85, 247, 0.8)' }}
                            className="aspect-square bg-black/30 backdrop-blur-sm border-2 border-dashed border-purple-500/30 flex items-center justify-center hover:shadow-[0_0_20px_rgba(168,85,247,0.4)] transition-all duration-300"
                        >
                            <span className="text-purple-500/50 text-xs pixel-font text-center px-2">
                                {slot.label}
                            </span>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* SECTION 6: FOOTER CTA */}
            <section className="px-4 py-20 max-w-4xl mx-auto text-center relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <motion.button
                        whileHover={{
                            scale: 1.05,
                            boxShadow: '0 0 40px rgba(236, 72, 153, 0.6), 0 0 60px rgba(6, 182, 212, 0.4)'
                        }}
                        whileTap={{ scale: 0.95 }}
                        className="px-12 py-6 bg-transparent border-4 border-purple-500 text-purple-300 font-bold text-lg md:text-xl pixel-font hover:bg-purple-500/10 hover:border-pink-500 hover:text-pink-300 transition-all duration-300 shadow-[0_0_30px_rgba(168,85,247,0.5)] hover:shadow-[0_0_50px_rgba(236,72,153,0.7)]"
                        style={{
                            imageRendering: 'pixelated',
                            animation: 'glitch 3s infinite'
                        }}
                    >
                        [ PRESS START TO REGISTER ]
                    </motion.button>

                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                        className="mt-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400 font-mono text-sm md:text-base"
                    >
                        The lobby is filling up. Secure your spawn point.
                    </motion.p>
                </motion.div>
            </section>

            {/* Spacer */}
            <div className="h-20"></div>

            <style>{`
                /* Twinkle Animation for Stars */
                @keyframes twinkle {
                    0%, 100% { opacity: 0.2; }
                    50% { opacity: 1; }
                }

                /* Glitch Title Effect - CRT Flicker */
                .glitch-title {
                    position: relative;
                    animation: crt-flicker 3s infinite;
                }

                @keyframes crt-flicker {
                    0%, 94%, 100% {
                        text-shadow: 
                            0 0 10px rgba(168, 85, 247, 0.8),
                            0 0 20px rgba(168, 85, 247, 0.5),
                            2px 2px 0px rgba(236, 72, 153, 0.3);
                    }
                    95% {
                        text-shadow: 
                            2px 0 10px rgba(168, 85, 247, 1),
                            -2px 0 20px rgba(236, 72, 153, 1),
                            0 0 30px rgba(6, 182, 212, 0.5);
                        transform: translate(2px, 0);
                    }
                    96% {
                        text-shadow: 
                            -2px 0 10px rgba(236, 72, 153, 1),
                            2px 0 20px rgba(168, 85, 247, 1),
                            0 0 30px rgba(6, 182, 212, 0.5);
                        transform: translate(-2px, 0);
                    }
                    97% {
                        text-shadow: 
                            0 0 10px rgba(168, 85, 247, 0.8),
                            0 0 20px rgba(168, 85, 247, 0.5),
                            2px 2px 0px rgba(236, 72, 153, 0.3);
                        transform: translate(0, 0);
                    }
                }

                /* Button Glitch Animation */
                @keyframes glitch {
                    0%, 90%, 100% {
                        transform: translate(0, 0);
                        filter: hue-rotate(0deg);
                    }
                    92% {
                        transform: translate(-2px, 2px);
                        filter: hue-rotate(90deg);
                    }
                    94% {
                        transform: translate(2px, -2px);
                        filter: hue-rotate(180deg);
                    }
                    96% {
                        transform: translate(-2px, -2px);
                        filter: hue-rotate(270deg);
                    }
                    98% {
                        transform: translate(2px, 2px);
                        filter: hue-rotate(360deg);
                    }
                }
            `}</style>
        </div>
    );
}

export default About;
