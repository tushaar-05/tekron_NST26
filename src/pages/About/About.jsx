import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import UnifiedBackground from '../../components/layout/UnifiedBackground';
import MiniNavbar from '../../components/layout/MiniNavbar';
import Footer from '../../components/layout/Footer';
import { competitions, events } from '../../data/eventsData';



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
                    <div
                        className="relative w-full h-full transition-all duration-700 overflow-hidden"
                        style={{ clipPath: 'polygon(20% 0%, 80% 0%, 100% 20%, 100% 80%, 80% 100%, 20% 100%, 0% 80%, 0% 20%)' }}
                    >
                        <img
                            src={member.image}
                            alt={member.name}
                            className="w-full h-full object-cover transition-transform duration-700"
                            style={{
                                objectPosition: member.objectPosition || 'center',
                                transform: `scale(${member.scale || 1.1})`
                            }}
                        />
                    </div>
                </div>

                {/* Operative Data */}
                <div className="space-y-4">
                    <div className="text-center">
                        <h3 className="text-base sm:text-lg md:text-xl font-bold text-white tracking-widest pixel-font mb-1 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-white/60 transition-all duration-300 px-2 min-h-[3rem] flex items-center justify-center text-center leading-tight">
                            {member.name}
                        </h3>
                        <p className="text-[8px] sm:text-[9px] md:text-[10px] font-mono tracking-[0.2em] sm:tracking-[0.3em] uppercase opacity-50" style={{ color: accentColor }}>
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

const PartnerLogo = ({ brand, idx }) => {
    const [isHovered, setIsHovered] = useState(false);
    const brandColor = brand.color || '#a855f7';

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            className="h-48 sm:h-60 relative group"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Holographic Background Layer */}
            <div
                className="absolute inset-0 rounded-3xl transition-all duration-500 overflow-hidden"
                style={{
                    background: 'linear-gradient(135deg, rgba(30, 20, 56, 0.8), rgba(45, 27, 78, 0.6))',
                    backdropFilter: 'blur(20px)',
                    boxShadow: isHovered
                        ? `0 20px 40px ${brandColor}4d, 0 0 60px ${brandColor}33`
                        : '0 4px 6px rgba(0, 0, 0, 0.1)'
                }}
            >
                {/* Holographic Border */}
                <div
                    className="absolute inset-0 rounded-3xl transition-opacity duration-400"
                    style={{
                        padding: '2px',
                        background: `linear-gradient(135deg, ${brandColor}, #7c3aed, #6366f1)`,
                        WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                        WebkitMaskComposite: 'xor',
                        maskComposite: 'exclude',
                        opacity: isHovered ? 1 : 0
                    }}
                />

                {/* Radial Glow */}
                <div
                    className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%] transition-opacity duration-400 pointer-events-none"
                    style={{
                        background: `radial-gradient(circle, ${brandColor}1a 0%, transparent 70%)`,
                        opacity: isHovered ? 1 : 0
                    }}
                />

                {/* Content Container */}
                <div className="relative w-full h-full flex items-center justify-center p-8 overflow-hidden">
                    {/* Grid Pattern Background */}
                    <div
                        className="absolute inset-0 opacity-20"
                        style={{
                            backgroundImage: `
                                repeating-linear-gradient(0deg, ${brandColor}1a 0px, transparent 1px, transparent 2px, ${brandColor}1a 3px),
                                repeating-linear-gradient(90deg, ${brandColor}1a 0px, transparent 1px, transparent 2px, ${brandColor}1a 3px)
                            `
                        }}
                    />

                    <div className="relative z-10 w-full h-full flex items-center justify-center">
                        <img
                            src={brand.image}
                            alt={brand.name}
                            className="max-w-full max-h-full object-contain transition-all duration-500"
                            style={{
                                filter: isHovered ? `drop-shadow(0 0 20px ${brandColor}80)` : 'none',
                                transform: isHovered ? 'scale(1.1)' : 'scale(1)'
                            }}
                        />
                    </div>
                </div>
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
                    <div className="relative w-64 h-80 md:w-80 md:h-96 overflow-hidden"
                        style={{ clipPath: 'polygon(15% 0, 100% 0, 100% 85%, 85% 100%, 0 100%, 0 15%)' }}>
                        <motion.img
                            key={member.id}
                            initial={{ scale: 1.1, filter: 'grayscale(1) brightness(0.5)' }}
                            animate={{ scale: 1, filter: 'grayscale(0) brightness(1.2)' }}
                            src={member.image}
                            className="w-full h-full object-cover"
                            style={{ objectPosition: member.objectPosition || 'center' }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                    </div>
                </div>

                {/* Right Column: Bio + Data */}
                <div className="flex-1 space-y-8 relative z-10 w-full">
                    <div>
                        <motion.div
                            initial={{ x: -20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            className="flex flex-wrap items-center gap-2 sm:gap-3 md:gap-4 mb-4"
                        >
                            <span className="text-[9px] sm:text-[10px] md:text-[12px] pixel-font px-2 sm:px-3 py-1 border-2"
                                style={{ color, borderColor: `${color}44`, background: `${color}11` }}>
                                {member.id <= 4 ? 'LEGENDARY UNIT' : 'CORE MEMBER'}
                            </span>
                            <span className="text-white/20 text-[9px] sm:text-[10px] md:text-[12px] pixel-font">ID_042{member.id}</span>
                        </motion.div>

                        <motion.h3
                            key={member.name}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white pixel-font tracking-tighter mb-2"
                        >
                            {member.name}
                        </motion.h3>
                        <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl uppercase tracking-[0.2em] sm:tracking-[0.3em] md:tracking-[0.4em] font-mono" style={{ color }}>
                            &lt; {member.role} /&gt;
                        </p>
                    </div>

                    {/* Data Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                        <div className="space-y-6">
                            <div className="space-y-3">
                                <span className="text-[10px] sm:text-[11px] md:text-[12px] pixel-font text-white/40">MEMBER_LORE:</span>
                                <p className="text-xs sm:text-sm md:text-base font-mono text-white/80 leading-relaxed italic border-l-2 pl-3 sm:pl-4" style={{ borderColor: `${color}44` }}>
                                    "The cornerstone of TEKRON's architecture, specialized in {member.role.toLowerCase()} operations. High affinity for system optimization and strategic deployment."
                                </p>
                            </div>
                            <div className="flex gap-2 sm:gap-3 md:gap-4">
                                <div className="bg-white/5 p-2 sm:p-3 md:p-4 flex-1 border-l-2" style={{ borderColor: color }}>
                                    <div className="text-[8px] sm:text-[9px] md:text-[10px] pixel-font text-white/40 mb-1">XP_GAIN</div>
                                    <div className="text-white font-mono text-sm sm:text-base md:text-lg">MAXIMIZED</div>
                                </div>
                                <div className="bg-white/5 p-2 sm:p-3 md:p-4 flex-1 border-l-2" style={{ borderColor: color }}>
                                    <div className="text-[8px] sm:text-[9px] md:text-[10px] pixel-font text-white/40 mb-1">BATTLE_EFF</div>
                                    <div className="text-white font-mono text-sm sm:text-base md:text-lg">100%</div>
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
    const location = useLocation();

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

    // Scroll to section on load if hash is present
    useEffect(() => {
        if (location.hash) {
            const id = location.hash.replace('#', '');
            const element = document.getElementById(id);
            if (element) {
                setTimeout(() => {
                    element.scrollIntoView({ behavior: 'smooth' });
                }, 100);
            }
        }
    }, [location]);

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
            name: 'Vamshi Pendyala',
            role: 'Marketing Head',
            image: '/images/committee/Vamshi.jpg',
            color: '#fbbf24',
            stats: [
                { name: 'TECH', value: 50 },
                { name: 'MGMT', value: 85 },
                { name: 'CRTV', value: 95 },
                { name: 'COMM', value: 90 },
                { name: 'OPS', value: 75 }
            ]
        },
        {
            id: 2,
            name: 'Ved Bhadani',
            role: 'Tech Head',
            image: '/images/committee/ved_bhadani.jpg',
            color: '#22d3ee', // Cyan
            stats: [
                { name: 'TECH', value: 95 },
                { name: 'MGMT', value: 80 },
                { name: 'CRTV', value: 75 },
                { name: 'COMM', value: 70 },
                { name: 'OPS', value: 65 }
            ],
            scale: 1.5
        },
        {
            id: 3,
            name: 'Vansh Agarwal',
            role: 'Registration and Competitions Head',
            image: '/images/committee/vansh_agarwal.jpg',
            color: '#3b82f6', // Blue
            stats: [
                { name: 'TECH', value: 40 },
                { name: 'MGMT', value: 90 },
                { name: 'CRTV', value: 65 },
                { name: 'COMM', value: 85 },
                { name: 'OPS', value: 98 }
            ]
        },
        {
            id: 4,
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
            id: 5,
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
            id: 6,
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
            id: 7,
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
            id: 8,
            name: 'Harshit Jain',
            role: 'Sponsorship Head',
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
            id: 9,
            name: 'Aditya Chopra',
            role: 'Cultural Head',
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
        {
            id: 10,
            name: 'Nilesh Nand Lal',
            role: 'Marketing Team',
            image: '/images/committee/nilesh.jpg',
            color: '#10b981', // Emerald
            stats: [
                { name: 'TECH', value: 45 },
                { name: 'MGMT', value: 85 },
                { name: 'CRTV', value: 92 },
                { name: 'COMM', value: 95 },
                { name: 'OPS', value: 80 }
            ]
        },
        {
            id: 11,
            name: 'Priyabrata Singh',
            role: 'Design Team',
            image: '/images/committee/priyabrata_singh.jpg',
            color: '#facc15', // Yellow
            stats: [
                { name: 'TECH', value: 35 },
                { name: 'MGMT', value: 75 },
                { name: 'CRTV', value: 98 },
                { name: 'COMM', value: 80 },
                { name: 'OPS', value: 70 }
            ]

        },
        {
            id: 12,
            name: 'Jay Patil',
            role: 'Design Team',
            image: '/images/committee/jay_patil.jpg',
            objectPosition: 'top',
            color: '#fb7185', // Rose
            stats: [
                { name: 'TECH', value: 30 },
                { name: 'MGMT', value: 70 },
                { name: 'CRTV', value: 95 },
                { name: 'COMM', value: 85 },
                { name: 'OPS', value: 75 }
            ]
        },
        {
            id: 13,
            name: 'Premansh',
            role: 'Operations Team',
            image: '/images/committee/premansh.jpg',
            objectPosition: 'top',
            color: '#ef4444', // Red (matching his suit)
            stats: [
                { name: 'TECH', value: 45 },
                { name: 'MGMT', value: 85 },
                { name: 'CRTV', value: 60 },
                { name: 'COMM', value: 90 },
                { name: 'OPS', value: 95 }
            ]
        },
        {
            id: 14,
            name: 'Yashpreet',
            role: 'Operations Team',
            image: '/images/committee/yashpreet.jpg',
            color: '#3b82f6', // Blue
            stats: [
                { name: 'TECH', value: 40 },
                { name: 'MGMT', value: 80 },
                { name: 'CRTV', value: 70 },
                { name: 'COMM', value: 85 },
                { name: 'OPS', value: 92 }
            ]
        },
        {
            id: 15,
            name: 'Raman Thakur',
            role: 'Competitions Team',
            image: '/images/committee/raman_thakur.jpg',
            color: '#22d3ee', // Cyan
            stats: [
                { name: 'TECH', value: 35 },
                { name: 'MGMT', value: 80 },
                { name: 'CRTV', value: 65 },
                { name: 'COMM', value: 85 },
                { name: 'OPS', value: 90 }
            ]
        },
    ];

    const selectedMember = coreCommittee.find(m => m.id === selectedId) || coreCommittee[0];

    /*
    const organizingCommittee = [
        {
            id: 1,
            name: 'Tushar Singh',
            role: 'Tech Team',
            image: '/images/volunteer/Tushar.png',
        },
        {
            id: 2,
            name: 'Madhav Agarwal',
            role: 'Marketing Team',
            image: '/images/volunteer/Madhav.JPG',
        },
        ...Array.from({ length: 29 }, (_, i) => ({
            id: i + 2,
            name: `Volunteer ${i + 2}`,
            role: 'Organizer',
            image: `https://api.dicebear.com/7.x/avataaars/svg?seed=Org${i + 1}`, // Placeholder for others
        }))
    ];
    */

    const stats = {
        events: 20,
        participants: 5000,
        projects: 25,
        hours: 10000
    };

    const artists = [
        { name: 'Anuj Rehan', role: 'Singer', image: '/images/artists/anuj_rehan.jpg', color: '#3b82f6' },
        { name: 'Shreya Baruah', role: 'Singer', image: '/images/artists/shreya_baruah.jpg', color: '#ec4899' },
        { name: 'DJ Vishvek', role: 'DJ', image: '/images/artists/dj_vishvek.jpg', color: '#a855f7' }
    ];

    const influencers = [
        { name: 'Rohit Nagar', role: 'Content Creator', image: '/images/influencers/rohit_nagar.jpg', color: '#3b82f6' },
        { name: 'Iqlipse Nova', role: 'Singer / Content Creator', image: '/images/influencers/iqlipse_nova.jpg', color: '#10b981' },
        { name: 'Eknoor Singh', role: 'Content Creator', image: '/images/influencers/eknoor_singh.jpg', color: '#f59e0b' },
        { name: 'Bhagyashree Limaye', role: 'Content Creator/Actor', image: '/images/influencers/bhagyashree_limaye.jpg', color: '#a855f7', collaboration: 'Under25', collaborationLogo: '/images/brands/under25.png' },
        { name: 'Arjun Pandey', role: 'Content Creator', image: '/images/influencers/arjun_pandey.jpg', color: '#f97316', collaboration: 'Under25', collaborationLogo: '/images/brands/under25.png' }
    ];

    const sponsors = [
        { name: 'Pizza Hut', image: '/images/brands/pizza_hut.png', color: '#ff0000' },
        { name: 'Monster Energy', image: '/images/brands/monster_energy.png', color: '#00ff00' },
        { name: 'Interview Buddy', image: '/images/brands/interview_buddy.png', color: '#7c3aed' },
        { name: 'Wet n Joy', image: '/images/brands/wet_n_joy.png', color: '#00ffff' },
        { name: 'Ajex eSports', image: '/images/brands/ajex_esports.png', color: '#a855f7' },
        { name: 'AFDC', image: '/images/brands/afdc.jpg', color: '#d8c6f2' },
        { name: 'Jiny Entertainments', image: '/images/brands/jiny_entertainments_v2.png', color: '#10b981' },
        { name: 'The Paradise India', image: '/images/brands/the_paradise_india.png', color: '#ffffff' }
    ];

    const techPanelists = [
        {
            name: 'Dharmik Bapodara',
            role: 'Co-Founder – Youth Energy',
            description: 'Ex-Team Captain – AXLR8R Formula Racing. Leader in youth-driven communities and high-performance engineering teams.',
            image: '/images/panelists/dharmik_bapodara.jpg',
            color: '#22d3ee',
            linkedin: 'https://www.linkedin.com/in/dharmikbapodara/'
        },
        {
            name: 'Samyak Jain',
            role: 'Co-Founder – ZEKO AI | CEO – MyWays.ai',
            description: 'AI entrepreneur driving innovation at the intersection of technology and real-world problem solving.',
            image: '/images/panelists/samyak_jain.jpg',
            color: '#a855f7',
            linkedin: 'https://www.linkedin.com/in/jain-samyak/'
        }
    ];

    return (
        <UnifiedBackground>
            {/* Mini Navbar */}
            <MiniNavbar />

            {/* HERO SECTION - Title + Terminal + Stats */}
            <section className="min-h-screen flex flex-col items-center justify-center px-4 relative z-10 mt-[-60px]">


                {/* MAIN PAGE HEADER */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="relative text-center mb-12"
                >
                    <h1
                        className={`text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold text-center pixel-font ${glitchActive ? 'glitch-text-pixel' : ''}`}
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
                            <div className="text-[10px] sm:text-xs text-purple-400 mb-1 pixel-font tracking-widest group-hover:text-cyan-400 transition-colors">PLAYERS</div>
                            <div className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-white pixel-font" style={{ textShadow: '0 0 10px rgba(255,255,255,0.5)' }}>
                                <AnimatedCounter target={stats.participants} />
                                <span className="text-purple-500">+</span>
                            </div>
                        </div>

                        {/* Stat 2: Events */}
                        <div className="text-center group cursor-default">
                            <div className="text-[10px] sm:text-xs text-purple-400 mb-1 pixel-font tracking-widest group-hover:text-pink-400 transition-colors">QUESTS</div>
                            <div className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-white pixel-font" style={{ textShadow: '0 0 10px rgba(255,255,255,0.5)' }}>
                                <AnimatedCounter target={stats.events} />
                                <span className="text-purple-500">+</span>
                            </div>
                        </div>

                        {/* Stat 3: Events */}
                        <div className="text-center group cursor-default">
                            <div className="text-[10px] sm:text-xs text-purple-400 mb-1 pixel-font tracking-widest group-hover:text-green-400 transition-colors">EVENTS</div>
                            <div className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-white pixel-font" style={{ textShadow: '0 0 10px rgba(255,255,255,0.5)' }}>
                                <AnimatedCounter target={stats.projects} />
                                <span className="text-purple-500">+</span>
                            </div>
                        </div>

                        {/* Stat 4: Prize Pool */}
                        <div className="text-center group cursor-default">
                            <div className="text-[10px] sm:text-xs text-purple-400 mb-1 pixel-font tracking-widest group-hover:text-yellow-400 transition-colors">BOUNTY</div>
                            <div className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-yellow-400 pixel-font" style={{ textShadow: '0 0 15px rgba(250, 204, 21, 0.5)' }}>
                                ₹4L
                                <span className="text-purple-500">+</span>
                            </div>
                        </div>
                    </div>
                </motion.div>

                <div className="absolute bottom-10 animate-bounce text-purple-500 text-xs sm:text-sm md:text-base">
                    Scroll to Start
                </div>
            </section>

            {/* SECTION 2: VISION & MISSION - Enhanced Modern Cards */}
            <section className="px-4 py-20 max-w-7xl mx-auto relative z-10 w-full">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-stretch">

                    {/* Vision Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        whileHover={{ y: -10, scale: 1.02 }}
                        className="relative group"
                    >
                        {/* Animated Gradient Background */}
                        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 via-blue-500/10 to-purple-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500 opacity-50 group-hover:opacity-100"></div>

                        {/* Main Card */}
                        <div className="relative bg-gradient-to-br from-cyan-950/40 via-black/60 to-blue-950/40 backdrop-blur-xl border-2 border-cyan-500/30 rounded-2xl p-8 md:p-10 overflow-hidden h-full group-hover:border-cyan-400/50 transition-all duration-500">

                            {/* Floating Particles */}
                            <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"></div>
                            <div className="absolute bottom-0 left-0 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-700"></div>

                            {/* Animated Corner Accents */}
                            <div className="absolute top-0 left-0 w-20 h-20 border-t-4 border-l-4 border-cyan-400/40 rounded-tl-2xl group-hover:w-24 group-hover:h-24 transition-all duration-500"></div>
                            <div className="absolute bottom-0 right-0 w-20 h-20 border-b-4 border-r-4 border-cyan-400/40 rounded-br-2xl group-hover:w-24 group-hover:h-24 transition-all duration-500"></div>

                            {/* Header Badge */}
                            <div className="relative flex items-center gap-3 mb-6">
                                <div className="px-4 py-1.5 bg-cyan-500/20 border border-cyan-400/40 rounded-full backdrop-blur-sm">
                                    <span className="text-cyan-300 text-xs pixel-font tracking-wider">VISION.SYS</span>
                                </div>
                                <div className="flex gap-1.5">
                                    <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></div>
                                    <div className="w-2 h-2 rounded-full bg-cyan-400/50 animate-pulse delay-150"></div>
                                    <div className="w-2 h-2 rounded-full bg-cyan-400/30 animate-pulse delay-300"></div>
                                </div>
                            </div>

                            {/* Icon & Title */}
                            <div className="relative flex items-start gap-6 mb-8">
                                <motion.div
                                    whileHover={{ rotate: 360, scale: 1.1 }}
                                    transition={{ duration: 0.6 }}
                                    className="text-6xl md:text-7xl filter drop-shadow-[0_0_20px_rgba(6,182,212,0.6)]"
                                >
                                    🎯
                                </motion.div>
                                <div className="flex-1">
                                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-blue-300 to-cyan-400 pixel-font mb-3 leading-tight">
                                        THE VISION
                                    </h2>
                                    <div className="h-1 w-32 bg-gradient-to-r from-cyan-400 via-blue-400 to-transparent rounded-full"></div>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="relative space-y-4">
                                <div className="flex items-center gap-2 mb-3">
                                    <div className="w-1 h-1 bg-cyan-400 rounded-full animate-pulse"></div>
                                    <p className="text-cyan-300/60 font-mono text-xs tracking-wider">INITIALIZING...</p>
                                </div>
                                <p className="text-cyan-50/90 text-xs md:text-sm leading-relaxed font-light">
                                    To create a future where technology is not just <span className="text-cyan-300 font-semibold">learned</span>, but <span className="text-cyan-300 font-semibold">experienced</span>.
                                    Tekron envisions a <span className="text-cyan-400 font-bold bg-cyan-400/10 px-2 py-0.5 rounded">playground of innovation</span> where curiosity fuels creation, students experiment fearlessly, and ideas evolve into real-world solutions that shape tomorrow.
                                </p>

                                {/* Progress Bar Effect */}
                                <div className="mt-6 space-y-2">
                                    <div className="flex justify-between text-xs text-cyan-400/60 font-mono">
                                        <span>PROGRESS</span>
                                        <span>∞%</span>
                                    </div>
                                    <div className="h-1.5 bg-cyan-950/50 rounded-full overflow-hidden">
                                        <motion.div
                                            className="h-full bg-gradient-to-r from-cyan-500 via-blue-500 to-cyan-400"
                                            initial={{ width: "0%" }}
                                            whileInView={{ width: "100%" }}
                                            transition={{ duration: 2, ease: "easeOut" }}
                                        ></motion.div>
                                    </div>
                                </div>
                            </div>

                            {/* Hover Glow Effect */}
                            <div className="absolute inset-0 bg-gradient-to-t from-cyan-500/0 via-cyan-500/5 to-cyan-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"></div>
                        </div>
                    </motion.div>

                    {/* Mission Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        whileHover={{ y: -10, scale: 1.02 }}
                        className="relative group"
                    >
                        {/* Animated Gradient Background */}
                        <div className="absolute inset-0 bg-gradient-to-br from-pink-500/20 via-purple-500/10 to-fuchsia-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500 opacity-50 group-hover:opacity-100"></div>

                        {/* Main Card */}
                        <div className="relative bg-gradient-to-br from-pink-950/40 via-black/60 to-purple-950/40 backdrop-blur-xl border-2 border-pink-500/30 rounded-2xl p-8 md:p-10 overflow-hidden h-full group-hover:border-pink-400/50 transition-all duration-500">

                            {/* Floating Particles */}
                            <div className="absolute top-0 left-0 w-32 h-32 bg-pink-500/10 rounded-full blur-3xl animate-pulse"></div>
                            <div className="absolute bottom-0 right-0 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-700"></div>

                            {/* Animated Corner Accents */}
                            <div className="absolute top-0 right-0 w-20 h-20 border-t-4 border-r-4 border-pink-400/40 rounded-tr-2xl group-hover:w-24 group-hover:h-24 transition-all duration-500"></div>
                            <div className="absolute bottom-0 left-0 w-20 h-20 border-b-4 border-l-4 border-pink-400/40 rounded-bl-2xl group-hover:w-24 group-hover:h-24 transition-all duration-500"></div>

                            {/* Header Badge */}
                            <div className="relative flex items-center gap-3 mb-6">
                                <div className="px-4 py-1.5 bg-pink-500/20 border border-pink-400/40 rounded-full backdrop-blur-sm">
                                    <span className="text-pink-300 text-xs pixel-font tracking-wider">MISSION.EXE</span>
                                </div>
                                <div className="flex gap-1.5">
                                    <div className="w-2 h-2 rounded-full bg-pink-400 animate-pulse"></div>
                                    <div className="w-2 h-2 rounded-full bg-pink-400/50 animate-pulse delay-150"></div>
                                    <div className="w-2 h-2 rounded-full bg-pink-400/30 animate-pulse delay-300"></div>
                                </div>
                            </div>

                            {/* Icon & Title */}
                            <div className="relative flex items-start gap-6 mb-8">
                                <motion.div
                                    whileHover={{ rotate: 360, scale: 1.1 }}
                                    transition={{ duration: 0.6 }}
                                    className="text-6xl md:text-7xl filter drop-shadow-[0_0_20px_rgba(236,72,153,0.6)]"
                                >
                                    🚀
                                </motion.div>
                                <div className="flex-1">
                                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-purple-300 to-pink-400 pixel-font mb-3 leading-tight">
                                        THE MISSION
                                    </h2>
                                    <div className="h-1 w-32 bg-gradient-to-r from-pink-400 via-purple-400 to-transparent rounded-full"></div>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="relative space-y-4">
                                <div className="flex items-center gap-2 mb-3">
                                    <div className="w-1 h-1 bg-pink-400 rounded-full animate-pulse"></div>
                                    <p className="text-pink-300/60 font-mono text-xs tracking-wider">EXECUTING...</p>
                                </div>
                                <p className="text-pink-50/90 text-xs md:text-sm leading-relaxed font-light">
                                    To empower the next generation of innovators by providing the <span className="text-pink-300 font-semibold">skills, network, and opportunities</span> needed to thrive in a tech-driven world.
                                    Through competitions, workshops, and collaborative challenges, Tekron aims to build a <span className="text-pink-400 font-bold bg-pink-400/10 px-2 py-0.5 rounded">community</span> that codes boldly, thinks critically, and debugs the problems of the future—together.
                                </p>

                                {/* Progress Bar Effect */}
                                <div className="mt-6 space-y-2">
                                    <div className="flex justify-between text-xs text-pink-400/60 font-mono">
                                        <span>STATUS</span>
                                        <span>ACTIVE</span>
                                    </div>
                                    <div className="h-1.5 bg-pink-950/50 rounded-full overflow-hidden">
                                        <motion.div
                                            className="h-full bg-gradient-to-r from-pink-500 via-purple-500 to-pink-400"
                                            initial={{ width: "0%" }}
                                            whileInView={{ width: "100%" }}
                                            transition={{ duration: 2, ease: "easeOut" }}
                                        ></motion.div>
                                    </div>
                                </div>
                            </div>

                            {/* Hover Glow Effect */}
                            <div className="absolute inset-0 bg-gradient-to-t from-pink-500/0 via-pink-500/5 to-pink-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"></div>
                        </div>
                    </motion.div>

                </div>
            </section>




            {/* TEKRON 2.0 MAIN HEADER SECTION */}
            <section className="px-4 pt-32 pb-10 max-w-7xl mx-auto relative z-10 overflow-hidden">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-96 bg-purple-600/5 blur-[150px] pointer-events-none" />

                <div className="flex flex-col items-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="flex items-center gap-4 mb-6"
                    >
                        <div className="h-[2px] w-12 bg-purple-500/50" />
                        <span className="text-purple-400 pixel-font text-[10px] sm:text-xs tracking-[0.4em]">VERSION_2.0_DATA_STREAM</span>
                        <div className="h-[2px] w-12 bg-purple-500/50" />
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black text-center pixel-font text-white leading-none"
                        style={{ textShadow: '0 0 60px rgba(168,85,247,0.4)' }}
                    >
                        TEKRON <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400" style={{ filter: 'drop-shadow(0 0 15px rgba(168,85,247,0.5))' }}>2.0</span>
                    </motion.h2>

                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="mt-8 flex flex-wrap justify-center gap-4 text-purple-200/40 font-mono text-[10px] sm:text-xs tracking-[0.2em]"
                    >
                        <span>ARTISTS</span>
                        <span className="text-purple-500">◈</span>
                        <span>INFLUENCERS</span>
                        <span className="text-purple-500">◈</span>
                        <span>PARTNERS</span>
                    </motion.div>

                    <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: '100%' }}
                        className="h-[1px] max-w-md bg-gradient-to-r from-transparent via-purple-500/30 to-transparent mt-10"
                    />
                </div>
            </section>

            {/* SECTION 4.1: ARTIST LINEUP */}
            <section id="artists" className="px-4 py-20 max-w-7xl mx-auto relative z-10">
                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 pixel-font"
                        style={{ color: '#fff', textShadow: '0 0 20px rgba(168,85,247,0.4)' }}
                    >
                        [ HEADLINER_ARTISTS ]
                    </motion.h2>
                    <p className="text-purple-300 pixel-font text-[10px] sm:text-xs tracking-widest">&gt; SOUND_AND_VISION_SYSTEM_INITIALIZED.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {artists.map((artist, idx) => (
                        <motion.div
                            key={idx}
                            whileHover={{ y: -10 }}
                            className="relative group bg-black/40 border border-white/5 p-4 overflow-hidden"
                            style={{ clipPath: 'polygon(15px 0, 100% 0, 100% calc(100% - 15px), calc(100% - 15px) 100%, 0 100%, 0 15px)' }}
                        >
                            <div className="aspect-[3/4] relative overflow-hidden mb-4">
                                <img src={artist.image} alt={artist.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
                                <div className="absolute bottom-4 left-4">
                                    <span className="text-[8px] pixel-font px-2 py-1 bg-white/10 backdrop-blur-md border border-white/20 text-white">LIVE_PFRM</span>
                                </div>
                            </div>
                            <h3 className="text-xl font-bold text-white pixel-font mb-1">{artist.name}</h3>
                            <p className="text-xs text-white/40 font-mono tracking-widest uppercase" style={{ color: artist.color }}>{artist.role}</p>
                            <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 transition-all group-hover:w-12 group-hover:h-12" style={{ borderColor: artist.color }} />
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* SECTION 4.0.5: TECH PANELISTS */}
            <section id="tech-panel" className="px-4 py-20 max-w-7xl mx-auto relative z-10">
                <div className="flex items-center gap-6 mb-16 px-4">
                    <div className="h-[2px] w-12 bg-cyan-500/50" />
                    <h2 className="text-2xl sm:text-4xl font-bold pixel-font text-white whitespace-nowrap">
                        [ TECH_PANELISTS ]
                    </h2>
                    <div className="h-[2px] flex-1 bg-gradient-to-r from-cyan-500/50 to-transparent" />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                    {techPanelists.map((panelist, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: idx * 0.2 }}
                            className="group relative"
                        >
                            {/* Outer Glow */}
                            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/20 to-purple-600/20 rounded-[2rem] blur-xl opacity-0 group-hover:opacity-100 transition duration-700" />

                            <div className="relative bg-black/40 backdrop-blur-2xl border border-white/10 rounded-[2rem] p-6 sm:p-8 flex flex-col sm:flex-row items-center sm:items-start gap-8 overflow-hidden h-full">
                                {/* PHOTO ON LEFT */}
                                <div className="relative shrink-0 group/img">
                                    <div className="w-32 h-32 sm:w-44 sm:h-44 rounded-2xl overflow-hidden border border-white/10 group-hover/img:border-cyan-500/50 transition-all duration-500 shadow-2xl">
                                        <img
                                            src={panelist.image}
                                            alt={panelist.name}
                                            className="w-full h-full object-cover transition-transform duration-1000 group-hover/img:scale-110"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover/img:opacity-20 transition-opacity" />
                                    </div>

                                    {/* Corner Decals */}
                                    <div className="absolute -top-1 -left-1 w-3 h-3 border-t border-l border-cyan-400 group-hover/img:w-6 group-hover/img:h-6 transition-all duration-500" />
                                    <div className="absolute -bottom-1 -right-1 w-3 h-3 border-b border-r border-purple-400 group-hover/img:w-6 group-hover/img:h-6 transition-all duration-500" />
                                </div>

                                {/* DETAILS ON RIGHT */}
                                <div className="flex flex-col flex-1 text-center sm:text-left h-full">
                                    <div className="mb-4">
                                        <div className="flex items-center justify-center sm:justify-start gap-2 mb-2">
                                            <span className="text-[9px] font-mono text-cyan-400 bg-cyan-400/10 px-2 py-0.5 rounded border border-cyan-400/20 tracking-widest uppercase">
                                                GUEST_OPERATIVE
                                            </span>
                                        </div>
                                        <h3 className="text-xl sm:text-2xl font-bold text-white pixel-font mb-1 group-hover:text-cyan-400 transition-colors uppercase leading-none">
                                            {panelist.name}
                                        </h3>
                                        <p className="text-[10px] sm:text-xs font-mono text-purple-300 font-bold uppercase tracking-tight">
                                            {panelist.role}
                                        </p>
                                    </div>

                                    <p className="text-xs sm:text-[13px] text-white/50 leading-relaxed font-mono mb-6 italic">
                                        "{panelist.description}"
                                    </p>

                                    {/* LINKEDIN BUTTON */}
                                    <div className="mt-auto pt-4 border-t border-white/5 w-full flex justify-center sm:justify-start">
                                        <motion.a
                                            href={panelist.linkedin}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            whileHover={{ x: 5, scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            className="px-5 py-2.5 rounded-lg bg-white/5 hover:bg-cyan-500/20 border border-white/10 hover:border-cyan-500/40 text-cyan-400 transition-all duration-300 flex items-center gap-3 group/btn"
                                        >
                                            <span className="text-[10px] font-bold pixel-font tracking-tighter uppercase whitespace-nowrap">
                                                [ LINKEDIN_PROTOCOL ]
                                            </span>
                                            <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse group-hover/btn:shadow-[0_0_10px_#22d3ee]" />
                                        </motion.a>
                                    </div>
                                </div>

                                {/* Index Watermark */}
                                <div className="absolute top-0 right-0 p-4 opacity-[0.03] pointer-events-none group-hover:opacity-[0.08] transition-opacity">
                                    <span className="text-8xl font-bold pixel-font">0{idx + 1}</span>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* SECTION 4.2: INFLUENCER HUB */}
            <section id="influencers" className="px-4 py-24 bg-gradient-to-b from-transparent via-purple-500/5 to-transparent relative z-10">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col items-center mb-16">
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-3xl sm:text-4xl md:text-5xl font-bold pixel-font text-white mb-4"
                        >
                            [ FEATURED_INFLUENCERS ]
                        </motion.h2>
                        <div className="flex items-center gap-4">
                            <div className="h-[2px] w-12 bg-cyan-500/30" />
                            <span className="text-purple-300 font-mono text-[10px] tracking-widest uppercase">THE_ELITE_COMM_NETWORK</span>
                            <div className="h-[2px] w-12 bg-cyan-500/30" />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                        {influencers.map((person, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.15, type: "spring", stiffness: 100 }}
                                className="group relative w-full h-[430px]"
                            >
                                {/* Glowing Border Layer */}
                                <div className="absolute -inset-0.5 bg-gradient-to-b from-cyan-500/50 to-purple-600/50 rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-500" />

                                {/* Main Card Body */}
                                <div className="relative h-full w-full bg-black/60 backdrop-blur-xl border border-white/10 rounded-2xl p-4 overflow-hidden flex flex-col">
                                    {/* Profile Image Container */}
                                    <div className="relative h-[330px] w-full rounded-xl overflow-hidden mb-5">
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-10" />
                                        <img
                                            src={person.image}
                                            alt={person.name}
                                            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-125"
                                            style={person.name === 'Eknoor Singh' ? { objectPosition: 'center 20%' } : {}}
                                        />

                                        {/* Collaboration Logo */}
                                        {person.collaboration && person.collaborationLogo && (
                                            <div className="absolute bottom-4 right-4 z-20 bg-white/90 backdrop-blur-sm p-2 rounded-lg shadow-lg">
                                                <img src={person.collaborationLogo} alt={person.collaboration} className="w-10 h-10 object-contain" />
                                            </div>
                                        )}
                                    </div>

                                    {/* Info readout */}
                                    <div className="pb-4 flex flex-col items-center justify-center text-center">
                                        <h3 className="text-white font-bold text-lg pixel-font group-hover:text-cyan-400 transition-colors uppercase leading-none mb-3">{person.name}</h3>
                                        <div className="h-[1px] w-12 bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent mb-2" />
                                        <p className="text-[10px] font-mono text-purple-300/60 uppercase tracking-[0.2em]">{person.role}</p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* SECTION 4.0: COMPETITIONS & EVENTS MARQUEE */}
            <section className="py-20 relative z-10 overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 mb-12">
                    <div className="flex items-center gap-6">
                        <div className="h-[1px] flex-1 bg-white/10" />
                        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold pixel-font text-white/80 tracking-widest whitespace-nowrap">
                            [ FEATURED_COMPETITIONS_&_EVENTS ]
                        </h2>
                        <div className="h-[1px] w-20 bg-white/10" />
                    </div>
                </div>

                {/* Infinite Scroll Container with constrained width and edge masking */}
                <div className="max-w-7xl mx-auto relative group">
                    {/* Perspective gradient masks for edges */}
                    <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#020202] to-transparent z-20 pointer-events-none" />
                    <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#020202] to-transparent z-20 pointer-events-none" />

                    <div className="overflow-hidden">
                        <motion.div
                            key="marquee-v2026-final-fixed"
                            animate={{ x: ["0%", "-50%"] }}
                            transition={{
                                duration: 27,

                                repeat: Infinity,
                                ease: "linear",
                                repeatType: "loop"
                            }}
                            className="flex whitespace-nowrap py-4 w-fit"
                        >
                            {(() => {
                                const allData = [...competitions, ...events];
                                const targetTitles = [
                                    'CodeWars', 'Hackron', 'Throttle X', 'Robo Kick', 'Drone Havoc',
                                    'BGMI', 'Dil Jale', 'Sector of Silence', 'Battle of Bands', 'Last Goal Standing'
                                ];

                                const activeItems = targetTitles.map(title =>
                                    allData.find(item => item.title.toLowerCase().trim() === title.toLowerCase().trim())
                                ).filter(Boolean);

                                // Render the set twice for a seamless loop
                                return [...activeItems, ...activeItems].map((item, idx) => (
                                    <button
                                        key={`marquee-render-${idx}`}
                                        onClick={() => {
                                            const route = item.category === 'Competition' ? '/competition' : '/events';
                                            navigate(route, { state: { autoOpenId: item.id } });
                                        }}
                                        className="flex flex-col items-center gap-6 flex-shrink-0 mr-12 group/poster cursor-pointer outline-none focus:outline-none"
                                    >
                                        <div className="relative w-64 sm:w-80 h-[400px] sm:h-[480px] rounded-2xl overflow-hidden border border-white/5 transition-all duration-500 hover:border-purple-500/40 hover:shadow-[0_0_50px_rgba(168,85,247,0.2)]">
                                            <img
                                                src={item.image}
                                                alt={item.title}
                                                className="w-full h-full object-cover object-top transition-transform duration-700 group-hover/poster:scale-105"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                        </div>
                                        <h3 className="text-white font-bold text-[10px] sm:text-xs pixel-font opacity-30 group-hover/poster:opacity-100 transition-opacity uppercase tracking-[0.3em]">
                                            {item.title}
                                        </h3>
                                    </button>
                                ));
                            })()}
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* SECTION 4.3: OUR PARTNERS (SPONSORS) */}
            <section id="partners" className="px-4 py-24 max-w-7xl mx-auto relative z-10 overflow-hidden">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-64 bg-purple-600/5 blur-[120px] -z-10" />

                <div className="flex items-center gap-6 mb-16">
                    <h2 className="text-2xl sm:text-4xl font-bold pixel-font text-white whitespace-nowrap">
                        [ OUR_PARTNERS ]
                    </h2>
                    <div className="h-[1px] flex-1 bg-white/10" />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
                    {sponsors.map((brand, idx) => (
                        <PartnerLogo key={idx} brand={brand} idx={idx} />
                    ))}
                </div>
            </section>

            {/* SECTION 4: CORE COMMITTEE - Grid + Holographic Modal */}
            <section className="px-4 py-16 max-w-7xl mx-auto relative z-10">
                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 pixel-font"
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
                        className="text-purple-300 pixel-font text-[10px] sm:text-xs md:text-sm"
                    >
                        &gt; THE_ARCHITECTS_OF_THE_REALM.
                    </motion.p>
                </div>

                {/* Grid View */}
                <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-8 justify-center">
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


            {/* 
            // SECTION 5: ORGANIZING COMMITTEE - 30 Members
            <section className="px-4 py-16 max-w-7xl mx-auto relative z-10">
                <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-4 pixel-font"
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
                    className="text-center text-purple-300 pixel-font text-[10px] sm:text-xs md:text-sm mb-12 max-w-2xl mx-auto"
                >
                    &gt; THE_FORCE_BEHIND_THE_REALM.
                </motion.p>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
                    {organizingCommittee.map((member, index) => (
                        <motion.div
                            key={member.id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.02 }}
                            whileHover={{ scale: 1.05 }}
                            className="bg-black/30 backdrop-blur-sm border border-purple-500/20 p-4 sm:p-6 md:p-8 flex flex-col items-center text-center hover:bg-purple-900/10 transition-colors min-h-[250px] sm:min-h-[280px] md:min-h-[300px] justify-center"
                        >
                            <div className="w-32 h-32 sm:w-36 sm:h-36 md:w-40 md:h-40 mb-4 sm:mb-5 md:mb-6 rounded-full overflow-hidden border-2 border-purple-500/30 shadow-[0_0_20px_rgba(168,85,247,0.2)]">
                                <img src={member.image} alt={member.name} className="w-full h-full object-cover transition-all" />
                            </div>
                            <h3 className="text-white font-bold text-sm sm:text-base md:text-lg mb-2 px-2">{member.name}</h3>
                            <p className="text-purple-400 text-[10px] sm:text-xs font-mono tracking-wider sm:tracking-widest px-2">{member.role}</p>
                        </motion.div>
                    ))}
                </div>
            </section>
            */}



            {/* Spacer */}
            <div className="h-20"></div>

            <Footer />

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
