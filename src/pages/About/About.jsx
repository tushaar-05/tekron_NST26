import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import UnifiedBackground from '../../components/layout/UnifiedBackground';



// Animated Counter Component
const AnimatedCounter = ({ target }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        let startTime;
        const duration = 2000; // 2 seconds animation

        const animate = (currentTime) => {
            if (!startTime) startTime = currentTime;
            const progress = Math.min((currentTime - startTime) / duration, 1);

            setCount(Math.floor(progress * target));

            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };

        requestAnimationFrame(animate);
    }, [target]);

    return <span>{count.toLocaleString()}</span>;
};

function About() {
    const navigate = useNavigate();

    const [showCursor, setShowCursor] = useState(true);
    const [glitchActive, setGlitchActive] = useState(false);




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
            subtitle: 'ELIXIR OF IDEAS',
            description: 'Brew volatile ideas into reality. Craft the future.',
            glowColor: 'cyan',
            icon: '⚗️',
            rarity: 'LEGENDARY'
        },
        {
            title: 'COMPETITION',
            subtitle: 'BLADE OF CODE',
            description: 'Forged in 24hr battles. Sharpen your skills.',
            glowColor: 'red',
            icon: '⚔️',
            rarity: 'EPIC'
        },
        {
            title: 'EVENTS',
            subtitle: 'RETRO CONSOLE',
            description: 'Esports arena. High scores recorded forever.',
            glowColor: 'purple',
            icon: '🎮',
            rarity: 'RARE'
        },
        {
            title: 'WORKSHOPS',
            subtitle: 'LEGACY SCROLL',
            description: 'Ancient knowledge from industry veterans.',
            glowColor: 'green',
            icon: '📜',
            rarity: 'UNCOMMON'
        }
    ];

    const coreCommittee = Array.from({ length: 13 }, (_, i) => ({
        id: i + 1,
        name: `Member Name ${i + 1}`,
        role: 'Core Member',
        image: `https://api.dicebear.com/7.x/avataaars/svg?seed=Core${i}`, // Placeholder
        color: 'bg-purple-600'
    }));

    const organizingCommittee = Array.from({ length: 30 }, (_, i) => ({
        id: i + 1,
        name: `Volunteer ${i + 1}`,
        role: 'Organizer',
        image: `https://api.dicebear.com/7.x/avataaars/svg?seed=Org${i}`, // Placeholder
    }));

    const stats = {
        events: 50,
        participants: 500,
        projects: 100,
        hours: 10000
    };

    return (
        <UnifiedBackground>
            {/* Back to Map Button - Pixel Style */}
            <motion.button
                onClick={() => navigate('/map')}
                className="fixed top-6 left-6 z-50 px-6 py-3 pixel-font text-xs pixel-button"
                style={{
                    background: '#7c3aed',
                    fontSize: '10px',
                    imageRendering: 'pixelated'
                }}
                whileHover={{ scale: 1.05, x: -5 }}
                whileTap={{ scale: 0.95 }}
            >
                ← BACK
            </motion.button>

            {/* HERO SECTION - Title + Terminal + Stats */}
            <section className="min-h-screen flex flex-col items-center justify-center px-4 relative z-10 pt-20">


                {/* MAIN PAGE HEADER */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="relative text-center mb-12"
                >
                    <h1
                        className={`text-6xl md:text-9xl font-bold text-center pixel-font ${glitchActive ? 'glitch-text-pixel' : ''}`}
                        style={{
                            color: '#d8c6f2',
                            letterSpacing: '0.1em',
                            textShadow: '6px 6px 0px rgba(0, 0, 0, 0.6), 0 0 40px rgba(216, 198, 242, 0.4), 0 0 60px rgba(124, 58, 237, 0.3)',
                            imageRendering: 'pixelated',
                            lineHeight: '1.1'
                        }}
                    >
                        ABOUT<br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-b from-purple-400 to-purple-800" style={{ textShadow: 'none', filter: 'drop-shadow(0 0 20px rgba(168,85,247,0.5))' }}>
                            TEKRON
                        </span>
                    </h1>

                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: "100%" }}
                        transition={{ delay: 1, duration: 1 }}
                        className="h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent mt-4 mx-auto"
                    />
                </motion.div>

                {/* HUD STATS BAR - Unified High Fidelity Display */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    className="w-full max-w-5xl"
                >
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 p-4 bg-black/40 backdrop-blur-md border-y-2 border-purple-500/30">
                        {/* Stat 1: Participants */}
                        <div className="text-center group cursor-default">
                            <div className="text-xs text-purple-400 mb-1 pixel-font tracking-widest group-hover:text-cyan-400 transition-colors">PLAYERS</div>
                            <div className="text-2xl md:text-4xl font-bold text-white pixel-font" style={{ textShadow: '0 0 10px rgba(255,255,255,0.5)' }}>
                                <AnimatedCounter target={stats.participants} />
                                <span className="text-purple-500">+</span>
                            </div>
                        </div>

                        {/* Stat 2: Events */}
                        <div className="text-center group cursor-default">
                            <div className="text-xs text-purple-400 mb-1 pixel-font tracking-widest group-hover:text-pink-400 transition-colors">QUESTS</div>
                            <div className="text-2xl md:text-4xl font-bold text-white pixel-font" style={{ textShadow: '0 0 10px rgba(255,255,255,0.5)' }}>
                                <AnimatedCounter target={stats.events} />
                                <span className="text-purple-500">+</span>
                            </div>
                        </div>

                        {/* Stat 3: Projects */}
                        <div className="text-center group cursor-default">
                            <div className="text-xs text-purple-400 mb-1 pixel-font tracking-widest group-hover:text-green-400 transition-colors">LOOT</div>
                            <div className="text-2xl md:text-4xl font-bold text-white pixel-font" style={{ textShadow: '0 0 10px rgba(255,255,255,0.5)' }}>
                                <AnimatedCounter target={stats.projects} />
                                <span className="text-purple-500">+</span>
                            </div>
                        </div>

                        {/* Stat 4: Prize Pool */}
                        <div className="text-center group cursor-default">
                            <div className="text-xs text-purple-400 mb-1 pixel-font tracking-widest group-hover:text-yellow-400 transition-colors">BOUNTY</div>
                            <div className="text-2xl md:text-4xl font-bold text-yellow-400 pixel-font" style={{ textShadow: '0 0 15px rgba(250, 204, 21, 0.5)' }}>
                                ₹10L
                                <span className="text-purple-500">+</span>
                            </div>
                        </div>
                    </div>
                </motion.div>

                <div className="absolute bottom-10 animate-bounce text-purple-500">
                    Scroll to Start
                </div>
            </section>

            {/* SECTION 2: VISION & MISSION - Holographic Data Terminals */}
            <section className="px-4 py-20 max-w-7xl mx-auto relative z-10 w-full">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

                    {/* Vision Terminal */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="relative group"
                    >
                        {/* Connecting Lines */}
                        <div className="absolute -left-4 top-1/2 w-4 h-[2px] bg-cyan-500/50 hidden md:block"></div>

                        <div className="bg-black/80 border border-cyan-500/30 p-1 relative overflow-hidden"
                            style={{
                                boxShadow: '0 0 20px rgba(6, 182, 212, 0.15)',
                                clipPath: 'polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)'
                            }}>

                            {/* Terminal Header */}
                            <div className="bg-cyan-900/20 px-4 py-2 flex justify-between items-center border-b border-cyan-500/20">
                                <span className="text-cyan-400 text-[10px] pixel-font">TERMINAL_01 // VISION.LOG</span>
                                <div className="flex gap-2">
                                    <div className="w-2 h-2 rounded-full bg-cyan-500/50 animate-pulse"></div>
                                    <div className="w-2 h-2 rounded-full bg-cyan-500/20"></div>
                                </div>
                            </div>

                            {/* Terminal Content */}
                            <div className="p-8 relative">
                                {/* Scanline background */}
                                <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(6,182,212,0.05)_50%)] bg-[length:100%_4px] pointer-events-none"></div>

                                <div className="flex items-start gap-6 mb-6">
                                    <div className="text-5xl border border-cyan-500/30 p-4 bg-cyan-900/10">🎯</div>
                                    <div>
                                        <h2 className="text-2xl md:text-3xl font-bold text-white pixel-font mb-2">
                                            THE VISION
                                        </h2>
                                        <div className="h-0.5 w-24 bg-cyan-500/50 mb-4"></div>
                                    </div>
                                </div>

                                <div className="font-mono text-cyan-100/80 leading-relaxed text-sm md:text-base space-y-4">
                                    <p>&gt; RENDERING_FUTURE_STATE...</p>
                                    <p>
                                        To render a future where technology isn't just a tool, but a playground.
                                        We envision a sandbox where students <span className="text-cyan-400 font-bold">compile, debug, and deploy</span> ideas to change the world.
                                    </p>
                                    <p className="text-cyan-500/50 text-xs mt-4">_END_OF_FILE</p>
                                </div>
                            </div>

                            {/* Interactive Hover Glow */}
                            <div className="absolute inset-0 bg-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
                        </div>
                    </motion.div>

                    {/* Mission Terminal */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="relative group"
                    >
                        {/* Connecting Lines */}
                        <div className="absolute -right-4 top-1/2 w-4 h-[2px] bg-pink-500/50 hidden md:block"></div>

                        <div className="bg-black/80 border border-pink-500/30 p-1 relative overflow-hidden"
                            style={{
                                boxShadow: '0 0 20px rgba(236, 72, 153, 0.15)',
                                clipPath: 'polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))'
                            }}>

                            {/* Terminal Header */}
                            <div className="bg-pink-900/20 px-4 py-2 flex justify-between items-center border-b border-pink-500/20">
                                <span className="text-pink-400 text-[10px] pixel-font">TERMINAL_02 // MISSION.EXE</span>
                                <div className="flex gap-2">
                                    <div className="w-2 h-2 rounded-full bg-pink-500/50 animate-pulse"></div>
                                    <div className="w-2 h-2 rounded-full bg-pink-500/20"></div>
                                </div>
                            </div>

                            {/* Terminal Content */}
                            <div className="p-8 relative">
                                {/* Scanline background */}
                                <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(236,72,153,0.05)_50%)] bg-[length:100%_4px] pointer-events-none"></div>

                                <div className="flex items-start gap-6 mb-6">
                                    <div className="text-5xl border border-pink-500/30 p-4 bg-pink-900/10">🚀</div>
                                    <div>
                                        <h2 className="text-2xl md:text-3xl font-bold text-white pixel-font mb-2">
                                            THE MISSION
                                        </h2>
                                        <div className="h-0.5 w-24 bg-pink-500/50 mb-4"></div>
                                    </div>
                                </div>

                                <div className="font-mono text-pink-100/80 leading-relaxed text-sm md:text-base space-y-4">
                                    <p>&gt; EXECUTING_PROTOCOL...</p>
                                    <p>
                                        To equip the next generation with the ultimate inventory: <span className="text-pink-400 font-bold">Skills, Network, and Opportunity.</span>
                                        Fostering a guild of collaborators ready to patch the bugs of tomorrow.
                                    </p>
                                    <p className="text-pink-500/50 text-xs mt-4">_TASK_COMPLETE</p>
                                </div>
                            </div>

                            {/* Interactive Hover Glow */}
                            <div className="absolute inset-0 bg-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
                        </div>
                    </motion.div>

                </div>
            </section>



            {/* SECTION 4: CORE COMMITTEE - 13 Members */}
            <section className="px-4 py-16 max-w-7xl mx-auto relative z-10">
                <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-4xl md:text-5xl font-bold text-center mb-4 pixel-font text-base md:text-xl"
                    style={{
                        color: '#d8c6f2',
                        textShadow: '4px 4px 0px rgba(0, 0, 0, 0.6), 0 0 30px rgba(216, 198, 242, 0.4)',
                        imageRendering: 'pixelated'
                    }}
                >
                    [ CORE COMMITTEE ]
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="text-center text-purple-300 pixel-font text-xs mb-12 max-w-2xl mx-auto"
                >
                    &gt; THE_ARCHITECTS_OF_TEKRON.
                </motion.p>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-center">
                    {coreCommittee.map((member, index) => (
                        <motion.div
                            key={member.id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.05 }}
                            whileHover={{ scale: 1.05, y: -5 }}
                            className="bg-black/40 backdrop-blur-sm border border-purple-500/30 p-4 flex flex-col items-center text-center group"
                            style={{
                                boxShadow: '0 0 15px rgba(168, 85, 247, 0.1)',
                                imageRendering: 'pixelated'
                            }}
                        >
                            <div className="w-24 h-24 mb-4 rounded-full overflow-hidden border-2 border-purple-500/50 group-hover:border-purple-400 transition-colors">
                                <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                            </div>
                            <h3 className="text-white font-bold pixel-font text-sm mb-1">{member.name}</h3>
                            <p className="text-purple-400 text-xs font-mono">{member.role}</p>
                        </motion.div>
                    ))}
                </div>
            </section>


            {/* SECTION 5: ORGANIZING COMMITTEE - 30 Members */}
            <section className="px-4 py-16 max-w-7xl mx-auto relative z-10">
                <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-4xl md:text-5xl font-bold text-center mb-4 pixel-font text-base md:text-xl"
                    style={{
                        color: '#d8c6f2',
                        textShadow: '4px 4px 0px rgba(0, 0, 0, 0.6), 0 0 30px rgba(216, 198, 242, 0.4)',
                        imageRendering: 'pixelated'
                    }}
                >
                    [ ORGANIZING COMMITTEE ]
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="text-center text-purple-300 pixel-font text-xs mb-12 max-w-2xl mx-auto"
                >
                    &gt; THE_FORCE_BEHIND_THE_REALM.
                </motion.p>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {organizingCommittee.map((member, index) => (
                        <motion.div
                            key={member.id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.02 }}
                            whileHover={{ scale: 1.05 }}
                            className="bg-black/30 backdrop-blur-sm border border-purple-500/20 p-3 flex flex-col items-center text-center hover:bg-purple-900/10 transition-colors"
                        >
                            <div className="w-16 h-16 mb-2 rounded-full overflow-hidden border border-purple-500/30">
                                <img src={member.image} alt={member.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all" />
                            </div>
                            <h3 className="text-white font-bold text-xs mb-0.5">{member.name}</h3>
                            <p className="text-purple-400 text-[10px] font-mono">{member.role}</p>
                        </motion.div>
                    ))}
                </div>
            </section>



            {/* Spacer */}
            <div className="h-20"></div>

            <style>{`
                /* Twinkle Animation for Pixel Stars */
                @keyframes twinkle {
                    0%, 100% { opacity: 0.3; }
                    50% { opacity: 1; }
                }
            `}</style>
        </UnifiedBackground>
    );
}

export default About;
