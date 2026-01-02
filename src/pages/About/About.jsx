import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import UnifiedBackground from '../../components/layout/UnifiedBackground';



// Animated Counter Component
const AnimatedCounter = ({ target }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        let startTime;
        const duration = 2000;

        const animate = (currentTime) => {
            if (!startTime) startTime = currentTime;
            const progress = Math.min((currentTime - startTime) / duration, 1);
            setCount(Math.floor(progress * target));
            if (progress < 1) requestAnimationFrame(animate);
        };

        requestAnimationFrame(animate);
    }, [target]);

    return <span>{count}</span>;
};

// Radar Chart Component for Stats
const RadarChart = ({ stats, color }) => {
    const points = stats.map((stat, i) => {
        const angle = (Math.PI * 2 * i) / stats.length - Math.PI / 2;
        const x = 50 + (stat.value / 100) * 40 * Math.cos(angle);
        const y = 50 + (stat.value / 100) * 40 * Math.sin(angle);
        return `${x},${y}`;
    }).join(' ');

    const labels = ['TECH', 'MGMT', 'CRTV', 'COMM', 'OPS'];

    return (
        <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible">
            {/* Background Polygons */}
            {[0.2, 0.4, 0.6, 0.8, 1].map((r) => (
                <polygon
                    key={r}
                    points={stats.map((_, i) => {
                        const angle = (Math.PI * 2 * i) / stats.length - Math.PI / 2;
                        return `${50 + r * 40 * Math.cos(angle)},${50 + r * 40 * Math.sin(angle)}`;
                    }).join(' ')}
                    className="fill-none stroke-white/10 stroke-[0.5]"
                />
            ))}
            {/* Stat Lines */}
            {stats.map((_, i) => {
                const angle = (Math.PI * 2 * i) / stats.length - Math.PI / 2;
                return (
                    <line
                        key={i}
                        x1="50" y1="50"
                        x2={50 + 40 * Math.cos(angle)}
                        y2={50 + 40 * Math.sin(angle)}
                        className="stroke-white/10 stroke-[0.5]"
                    />
                );
            })}
            {/* Hover Stat Area */}
            <motion.polygon
                initial={{ points: '50,50 50,50 50,50 50,50 50,50' }}
                animate={{ points }}
                transition={{ type: 'spring', stiffness: 50, damping: 15 }}
                fill={color}
                fillOpacity="0.3"
                stroke={color}
                strokeWidth="1"
            />
            {/* Labels */}
            {labels.map((label, i) => {
                const angle = (Math.PI * 2 * i) / stats.length - Math.PI / 2;
                const x = 50 + 52 * Math.cos(angle);
                const y = 50 + 52 * Math.sin(angle);
                return (
                    <text
                        key={label}
                        x={x} y={y}
                        textAnchor="middle"
                        className="text-[5px] pixel-font fill-white/40"
                    >
                        {label}
                    </text>
                );
            })}
        </svg>
    );
};

// New Card Component for Core Committee
const CoreMemberCard = ({ member, index }) => {
    const accentColor = member.color;
    const uid = `TK-00${member.id}`;

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.05 }}
            whileHover={{ y: -8 }}
            className="group relative"
        >
            {/* Holographic Card Base */}
            <div
                className="relative bg-black/40 backdrop-blur-xl border border-white/10 p-5 overflow-hidden transition-all duration-500 group-hover:border-white/20"
                style={{
                    clipPath: 'polygon(0 0, calc(100% - 20px) 0, 100% 20px, 100% 100%, 20px 100%, 0 calc(100% - 20px))'
                }}
            >
                {/* Animated Hex Background */}
                <div className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity">
                    <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[length:20px_20px]" />
                </div>

                {/* Corner Accents */}
                <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 opacity-30 group-hover:opacity-60 transition-opacity" style={{ borderColor: accentColor }} />
                <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 opacity-30 group-hover:opacity-60 transition-opacity" style={{ borderColor: accentColor }} />

                {/* ID Header */}
                <div className="flex justify-between items-start mb-6">
                    <div className="space-y-1">
                        <div className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: accentColor }} />
                            <span className="text-[10px] pixel-font text-white/40 tracking-widest">OPERATIVE ID</span>
                        </div>
                        <h4 className="text-white font-mono text-xs opacity-60 tracking-tighter">{uid}</h4>
                    </div>
                </div>

                {/* Scanning Portrait */}
                <div className="relative mx-auto mb-6 w-40 h-40">
                    <div className="absolute inset-x-[-10px] inset-y-[-10px] border border-dashed border-white/5 group-hover:border-white/20 rounded-full animate-spin-slow transition-colors" />

                    <div
                        className="relative w-full h-full transition-all duration-700 overflow-hidden"
                        style={{ clipPath: 'polygon(20% 0%, 80% 0%, 100% 20%, 100% 80%, 80% 100%, 20% 100%, 0% 80%, 0% 20%)' }}
                    >
                        <img
                            src={member.image}
                            alt={member.name}
                            className="w-full h-full object-cover scale-110 transition-transform duration-700"
                        />
                    </div>

                    {/* Biometric Corners */}
                    <div className="absolute -top-2 -left-2 w-4 h-4 border-t border-l border-white/20" />
                    <div className="absolute -bottom-2 -right-2 w-4 h-4 border-b border-r border-white/20" />
                </div>

                {/* Operative Data */}
                <div className="space-y-4">
                    <div className="text-center">
                        <h3 className="text-xl font-bold text-white tracking-widest pixel-font mb-1 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-white/60 transition-all duration-300">
                            {member.name.split(' ').map((word, i) => (
                                <React.Fragment key={i}>
                                    {word}
                                    {i === 0 && <br />}
                                </React.Fragment>
                            ))}
                        </h3>
                        <p className="text-[10px] font-mono tracking-[0.3em] uppercase opacity-50" style={{ color: accentColor }}>
                            {member.role}
                        </p>
                    </div>
                </div>

                {/* Holographic Glow */}
                <div
                    className="absolute -inset-2 opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-tr from-transparent via-white/5 to-transparent blur-xl pointer-events-none"
                    style={{ background: `radial-gradient(circle at 50% 120%, ${accentColor}20, transparent)` }}
                />
            </div>
        </motion.div>
    );
};

const HolographicDisplay = ({ member, color, onClose }) => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center px-4 py-8 bg-black/90 backdrop-blur-2xl"
        >
            <motion.div
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                className="max-w-6xl w-full flex flex-col lg:flex-row items-center gap-12 bg-black/60 border border-white/10 p-10 relative overflow-hidden"
                style={{
                    clipPath: 'polygon(0 40px, 40px 0, 100% 0, 100% calc(100% - 40px), calc(100% - 40px) 100%, 0 100%)'
                }}
            >
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-6 right-8 text-white/40 hover:text-white transition-colors z-20 pixel-font text-xl"
                >
                    [X]
                </button>

                {/* Selection Background Glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] opacity-20 blur-[120px] pointer-events-none transition-colors duration-700"
                    style={{ background: `radial-gradient(circle, ${color} 0%, transparent 70%)` }}
                />

                {/* Left Column: Portrait */}
                <div className="relative z-10 shrink-0">
                    {/* Rotating Rings */}
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-x-[-25%] inset-y-[-25%] border-2 border-dashed rounded-full pointer-events-none opacity-20"
                        style={{ borderColor: color }}
                    />

                    <div className="relative w-64 h-80 md:w-80 md:h-96 overflow-hidden"
                        style={{ clipPath: 'polygon(15% 0, 100% 0, 100% 85%, 85% 100%, 0 100%, 0 15%)' }}>
                        <motion.img
                            key={member.id}
                            initial={{ scale: 1.1, filter: 'grayscale(1) brightness(0.5)' }}
                            animate={{ scale: 1, filter: 'grayscale(0) brightness(1.2)' }}
                            src={member.image}
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                        {/* Scanlines Overlay */}
                        <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.2)_50%)] bg-[length:100%_4px] pointer-events-none opacity-20" />
                    </div>
                </div>

                {/* Right Column: Bio + Data */}
                <div className="flex-1 space-y-8 relative z-10 w-full">
                    <div>
                        <motion.div
                            initial={{ x: -20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            className="flex items-center gap-4 mb-4"
                        >
                            <span className="text-[12px] pixel-font px-3 py-1 border-2"
                                style={{ color, borderColor: `${color}44`, background: `${color}11` }}>
                                {member.id <= 4 ? 'LEGENDARY UNIT' : 'CORE MEMBER'}
                            </span>
                            <span className="text-white/20 text-[12px] pixel-font">ID_042{member.id}</span>
                        </motion.div>

                        <motion.h3
                            key={member.name}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-5xl md:text-7xl font-bold text-white pixel-font tracking-tighter mb-2"
                        >
                            {member.name}
                        </motion.h3>
                        <p className="text-xl md:text-2xl uppercase tracking-[0.4em] font-mono" style={{ color }}>
                            &lt; {member.role} /&gt;
                        </p>
                    </div>

                    {/* Data Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                        <div className="space-y-6">
                            <div className="space-y-3">
                                <span className="text-[12px] pixel-font text-white/40">MEMBER_LORE:</span>
                                <p className="text-md font-mono text-white/80 leading-relaxed italic border-l-2 pl-4" style={{ borderColor: `${color}44` }}>
                                    "The cornerstone of TEKRON's architecture, specialized in {member.role.toLowerCase()} operations. High affinity for system optimization and strategic deployment."
                                </p>
                            </div>
                            <div className="flex gap-4">
                                <div className="bg-white/5 p-4 flex-1 border-l-2" style={{ borderColor: color }}>
                                    <div className="text-[10px] pixel-font text-white/40 mb-1">XP_GAIN</div>
                                    <div className="text-white font-mono text-lg">MAXIMIZED</div>
                                </div>
                                <div className="bg-white/5 p-4 flex-1 border-l-2" style={{ borderColor: color }}>
                                    <div className="text-[10px] pixel-font text-white/40 mb-1">BATTLE_EFF</div>
                                    <div className="text-white font-mono text-lg">100%</div>
                                </div>
                            </div>
                        </div>

                        {/* Radar Chart Container */}
                        <div className="w-full aspect-square max-w-[280px] mx-auto lg:ml-auto">
                            <RadarChart stats={member.stats} color={color} />
                        </div>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
};

function About() {
    const navigate = useNavigate();

    const [showCursor, setShowCursor] = useState(true);
    const [glitchActive, setGlitchActive] = useState(false);
    const [selectedId, setSelectedId] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

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

    const coreCommittee = [
        {
            id: 1,
            name: 'Ved Bhadani',
            role: 'Tech Team',
            image: '/images/committee/ved_bhadani.jpg',
            color: '#22d3ee', // Cyan
            stats: [
                { name: 'TECH', value: 95 },
                { name: 'MGMT', value: 80 },
                { name: 'CRTV', value: 75 },
                { name: 'COMM', value: 70 },
                { name: 'OPS', value: 65 }
            ]
        },
        {
            id: 2,
            name: 'Nihal C',
            role: 'Sponsorship Team',
            image: '/images/committee/nihal_c.jpg',
            color: '#f472b6', // Pink
            stats: [
                { name: 'TECH', value: 60 },
                { name: 'MGMT', value: 95 },
                { name: 'CRTV', value: 70 },
                { name: 'COMM', value: 90 },
                { name: 'OPS', value: 85 }
            ]
        },
        {
            id: 3,
            name: 'Rithwik Kuchana',
            role: 'Marketing Team',
            image: '/images/committee/rithwik_kuchna.jpg',
            color: '#fbbf24', // Amber
            stats: [
                { name: 'TECH', value: 50 },
                { name: 'MGMT', value: 85 },
                { name: 'CRTV', value: 95 },
                { name: 'COMM', value: 90 },
                { name: 'OPS', value: 75 }
            ]
        },
        {
            id: 4,
            name: 'Sarthak Ghoderao',
            role: 'Comms Team',
            image: '/images/committee/sarthak_ghoderao.jpg',
            color: '#a855f7', // Purple
            stats: [
                { name: 'TECH', value: 45 },
                { name: 'MGMT', value: 75 },
                { name: 'CRTV', value: 85 },
                { name: 'COMM', value: 98 },
                { name: 'OPS', value: 80 }
            ]
        },
        {
            id: 5,
            name: 'Ayush Shukla',
            role: 'Hospitality Team',
            image: '/images/team/ayush.jpg',
            color: '#ef4444', // Red
            stats: [
                { name: 'TECH', value: 55 },
                { name: 'MGMT', value: 95 },
                { name: 'CRTV', value: 65 },
                { name: 'COMM', value: 95 },
                { name: 'OPS', value: 90 }
            ]
        },
        {
            id: 6,
            name: 'Harshit Jain',
            role: 'Sponsorship Team',
            image: '/images/committee/harshit_jain.jpg',
            color: '#f97316', // Orange
            stats: [
                { name: 'TECH', value: 40 },
                { name: 'MGMT', value: 98 },
                { name: 'CRTV', value: 75 },
                { name: 'COMM', value: 95 },
                { name: 'OPS', value: 88 }
            ]
        },
        {
            id: 7,
            name: 'Aditya Chopra',
            role: 'Cultural Team',
            image: '/images/committee/aditya_chopra.jpg',
            color: '#6366f1', // Indigo
            stats: [
                { name: 'TECH', value: 30 },
                { name: 'MGMT', value: 85 },
                { name: 'CRTV', value: 98 },
                { name: 'COMM', value: 92 },
                { name: 'OPS', value: 80 }
            ]
        },
        ...Array.from({ length: 7 }, (_, i) => ({
            id: i + 8,
            name: `Member Name ${i + 8}`,
            role: 'Core Member',
            image: `https://api.dicebear.com/7.x/avataaars/svg?seed=Core${i + 7}`, // Placeholder
            color: '#9333ea', // General Purple
            stats: [
                { name: 'TECH', value: 70 },
                { name: 'MGMT', value: 70 },
                { name: 'CRTV', value: 70 },
                { name: 'COMM', value: 70 },
                { name: 'OPS', value: 70 }
            ]
        }))
    ];

    const selectedMember = coreCommittee.find(m => m.id === selectedId) || coreCommittee[0];

    const organizingCommittee = Array.from({ length: 30 }, (_, i) => ({
        id: i + 1,
        name: `Volunteer ${i + 1}`,
        role: 'Organizer',
        image: `https://api.dicebear.com/7.x/avataaars/svg?seed=Org${i}`, // Placeholder
    }));

    const stats = {
        events: 20,
        participants: 1500,
        projects: 25,
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
                            <div className="text-lg md:text-2xl font-bold text-white pixel-font" style={{ textShadow: '0 0 10px rgba(255,255,255,0.5)' }}>
                                <AnimatedCounter target={stats.participants} />
                                <span className="text-purple-500">+</span>
                            </div>
                        </div>

                        {/* Stat 2: Events */}
                        <div className="text-center group cursor-default">
                            <div className="text-xs text-purple-400 mb-1 pixel-font tracking-widest group-hover:text-pink-400 transition-colors">QUESTS</div>
                            <div className="text-lg md:text-2xl font-bold text-white pixel-font" style={{ textShadow: '0 0 10px rgba(255,255,255,0.5)' }}>
                                <AnimatedCounter target={stats.events} />
                                <span className="text-purple-500">+</span>
                            </div>
                        </div>

                        {/* Stat 3: Events */}
                        <div className="text-center group cursor-default">
                            <div className="text-xs text-purple-400 mb-1 pixel-font tracking-widest group-hover:text-green-400 transition-colors">EVENTS</div>
                            <div className="text-lg md:text-2xl font-bold text-white pixel-font" style={{ textShadow: '0 0 10px rgba(255,255,255,0.5)' }}>
                                <AnimatedCounter target={stats.projects} />
                                <span className="text-purple-500">+</span>
                            </div>
                        </div>

                        {/* Stat 4: Prize Pool */}
                        <div className="text-center group cursor-default">
                            <div className="text-xs text-purple-400 mb-1 pixel-font tracking-widest group-hover:text-yellow-400 transition-colors">BOUNTY</div>
                            <div className="text-lg md:text-2xl font-bold text-yellow-400 pixel-font" style={{ textShadow: '0 0 15px rgba(250, 204, 21, 0.5)' }}>
                                8L
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



            {/* SECTION 4: CORE COMMITTEE - Grid + Holographic Modal */}
            <section className="px-4 py-16 max-w-7xl mx-auto relative z-10">
                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-5xl font-bold mb-4 pixel-font text-base md:text-xl"
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
                        className="text-purple-300 pixel-font text-xs"
                    >
                        &gt; SELECT_OPERATIVE_TO_VIEW_SPECIFICATIONS.
                    </motion.p>
                </div>

                {/* Grid View */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 justify-center">
                    {coreCommittee.map((member, index) => (
                        <CoreMemberCard
                            key={member.id}
                            member={member}
                            index={index}
                            onClick={() => {
                                setSelectedId(member.id);
                                setIsModalOpen(true);
                            }}
                        />
                    ))}
                </div>

                {/* Detailed Modal View */}
                <AnimatePresence>
                    {isModalOpen && selectedMember && (
                        <HolographicDisplay
                            member={selectedMember}
                            color={selectedMember.color}
                            onClose={() => setIsModalOpen(false)}
                        />
                    )}
                </AnimatePresence>
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
                            <h3 className="text-white font-bold text-xs mb-0.5">
                                {member.name.split(' ').map((word, i) => (
                                    <React.Fragment key={i}>
                                        {word}
                                        {i === 0 && <br />}
                                    </React.Fragment>
                                ))}
                            </h3>
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
