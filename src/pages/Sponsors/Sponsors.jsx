import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import UnifiedBackground from '../../components/layout/UnifiedBackground';
import MiniNavbar from '../../components/layout/MiniNavbar';
import Footer from '../../components/layout/Footer';
import {
    Rocket,
    BarChart3,
    Smartphone,
    Target,
    Globe,
    Monitor,
    Gamepad2,
    Music,
    Mic,
    Headphones,
    Drama,
    Sparkles,
    Mic2,
    TrendingUp,
    Footprints,
    Users,
    Building2,
    Download,
    Phone,
    Mail,
    ChevronRight,
    X,
    Guitar
} from 'lucide-react';

// --- Shared Animations ---
const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.8, ease: [0.21, 0.45, 0.32, 0.9] }
};

// --- Styled Components ---
const PageContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 120px 20px 100px;
  position: relative;
  z-index: 10;
  overflow-x: hidden;
`;

const Section = styled.section`
  margin-bottom: 200px;
  @media (max-width: 768px) {
    margin-bottom: 120px;
  }
`;

const BiometricCard = styled(motion.div)`
  position: relative;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 30px;
  clip-path: polygon(0 0, calc(100% - 20px) 0, 100% 20px, 100% 100%, 20px 100%, 0 calc(100% - 20px));
  transition: all 0.5s ease;

  &:hover {
    border-color: ${props => props.color || '#a855f7'};
    background: rgba(0, 0, 0, 0.6);
    transform: translateY(-5px);
  }
`;

const ValueHub = styled(motion.div)`
  background: rgba(10, 10, 10, 0.5);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 40px;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(168, 85, 247, 0.5), transparent);
  }
`;

const BentoBlock = styled(motion.div)`
  background: rgba(10, 10, 10, 0.6);
  border: 1px solid rgba(168, 85, 247, 0.1);
  border-radius: 24px;
  padding: 24px;
  backdrop-filter: blur(10px);
  transition: all 0.4s ease;
  
  &:hover {
    background: rgba(168, 85, 247, 0.15);
    border-color: rgba(168, 85, 247, 0.3);
  }
`;

const HolographicTierCard = styled(motion.div)`
  position: relative;
  background: rgba(10, 10, 10, 0.5);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 32px;
  padding: 30px;
  overflow: hidden;
  transition: all 0.5s cubic-bezier(0.23, 1, 0.32, 1);
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: radial-gradient(circle at top right, ${props => props.color}15, transparent 70%);
    pointer-events: none;
  }

  &::after {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    width: 60px;
    height: 60px;
    background: linear-gradient(135deg, transparent 50%, ${props => props.color}22 50%);
    border-radius: 0 32px 0 0;
  }

  &:hover {
    transform: translateY(-10px);
    border-color: ${props => props.color}44;
    box-shadow: 0 20px 40px -20px ${props => props.color}33;
    background: rgba(10, 10, 10, 0.8);
    
    .tier-action {
      background: ${props => props.color};
      color: black;
      box-shadow: 0 0 20px ${props => props.color}66;
    }
  }
`;

const PixelLabel = ({ children, color = '#a855f7' }) => (
    <span className="text-[10px] pixel-font tracking-widest uppercase mb-4 block" style={{ color }}>
        {children}
    </span>
);

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

    const formatShorthand = (num) => {
        if (num >= 1000000) {
            const val = num / 1000000;
            return (val % 1 === 0 ? val.toFixed(0) : val.toFixed(1)) + 'M';
        }
        if (num >= 1000) {
            const val = num / 1000;
            return (val % 1 === 0 ? val.toFixed(0) : val.toFixed(1)) + 'k';
        }
        return num.toLocaleString();
    };

    return <span>{formatShorthand(count)}</span>;
};

// --- 🎯 1. Hero Section ---
const HeroSection = () => (
    <Section className="min-h-[60vh] flex flex-col items-center justify-center text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <PixelLabel color="#00fff9">INITIATING PARTNERSHIP HUB // 2.0</PixelLabel>
            <h1 className="text-4xl sm:text-5xl md:text-8xl font-bold pixel-font leading-tight mb-8"
                style={{
                    color: '#fff',
                    textShadow: '0 0 40px rgba(168, 85, 247, 0.4)',
                }}>
                BECOME OUR<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">SPONSOR</span>
            </h1>
            <p className="mt-8 text-sm sm:text-base md:text-xl font-mono text-white/40 max-w-2xl mx-auto px-4">
                &gt; ARCHITECT THE FUTURE OF TECHNOLOGY WITH US. INTEGRATE YOUR BRAND INTO THE TEKRON ECOSYSTEM.
            </p>
            <motion.div className="h-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent mt-12 mx-auto max-w-xl"
                animate={{ opacity: [0.2, 0.8, 0.2] }} transition={{ duration: 3, repeat: Infinity }} />
        </motion.div>
    </Section>
);

// --- 🎯 2. Why Sponsor Us? (Redesigned Holographic Vision) ---
const WhySponsor = () => {
    const stats = [
        { value: '5000+', label: 'ATTENDEES', color: '#a855f7', icon: <Users className="w-6 h-6" /> },
        { value: '30+', label: 'COLLEGES', color: '#00fff9', icon: <Building2 className="w-6 h-6" /> },
        { value: '250+', label: 'LEGACY_REACH', color: '#fbbf24', icon: <Globe className="w-6 h-6" /> }
    ];

    return (
        <Section className="relative overflow-hidden">
            {/* Animated Background Grid */}
            <div className="absolute inset-0 opacity-20">
                <div className="absolute inset-0" style={{
                    backgroundImage: `
                        linear-gradient(rgba(168, 85, 247, 0.1) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(168, 85, 247, 0.1) 1px, transparent 1px)
                    `,
                    backgroundSize: '50px 50px',
                    animation: 'gridPulse 4s ease-in-out infinite'
                }} />
            </div>

            {/* Floating Orbs */}
            <motion.div
                className="absolute top-20 right-20 w-96 h-96 rounded-full blur-[120px] pointer-events-none"
                style={{ background: 'radial-gradient(circle, rgba(168, 85, 247, 0.3), transparent)' }}
                animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.5, 0.3]
                }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
                className="absolute bottom-20 left-20 w-96 h-96 rounded-full blur-[120px] pointer-events-none"
                style={{ background: 'radial-gradient(circle, rgba(0, 255, 249, 0.2), transparent)' }}
                animate={{
                    scale: [1.2, 1, 1.2],
                    opacity: [0.2, 0.4, 0.2]
                }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            />

            <div className="relative z-10 max-w-7xl mx-auto">
                {/* Header Section */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-20"
                >
                    <div className="flex items-center justify-center gap-4 mb-8">
                        <motion.div
                            className="h-[2px] w-16 bg-gradient-to-r from-transparent via-purple-500 to-purple-500"
                            initial={{ width: 0 }}
                            whileInView={{ width: 64 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1 }}
                        />
                        <PixelLabel color="#a855f7">THE VISION</PixelLabel>
                        <motion.div
                            className="h-[2px] w-16 bg-gradient-to-l from-transparent via-purple-500 to-purple-500"
                            initial={{ width: 0 }}
                            whileInView={{ width: 64 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1 }}
                        />
                    </div>

                    <h2 className="text-4xl sm:text-6xl md:text-8xl font-bold pixel-font mb-8 leading-tight">
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400">
                            Crafting
                        </span>
                        <br />
                        <span className="text-white" style={{
                            textShadow: '0 0 40px rgba(168, 85, 247, 0.5), 0 0 80px rgba(168, 85, 247, 0.3)'
                        }}>
                            Legacy.
                        </span>
                    </h2>
                </motion.div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
                    {/* Left: Holographic Card */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="relative"
                    >
                        <div className="relative p-8 md:p-12 bg-gradient-to-br from-black/60 via-purple-900/20 to-black/60 rounded-3xl border border-purple-500/30 backdrop-blur-xl overflow-hidden group">
                            {/* Animated Scan Line */}
                            <motion.div
                                className="absolute inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
                                animate={{ top: ['0%', '100%'] }}
                                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                                style={{ opacity: 0.5 }}
                            />

                            {/* Corner Accents */}
                            <div className="absolute top-0 left-0 w-20 h-20 border-t-2 border-l-2 border-purple-500/50 rounded-tl-3xl" />
                            <div className="absolute bottom-0 right-0 w-20 h-20 border-b-2 border-r-2 border-cyan-500/50 rounded-br-3xl" />

                            <div className="relative z-10">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-3 h-3 rounded-full bg-purple-500 animate-pulse" style={{
                                        boxShadow: '0 0 20px rgba(168, 85, 247, 0.8)'
                                    }} />
                                    <span className="text-[10px] font-mono text-purple-400 uppercase tracking-[0.3em]">SYSTEM_ACTIVE</span>
                                </div>

                                <p className="font-mono text-white/70 leading-relaxed text-xs sm:text-sm mb-6">
                                    Tekron is not just an event—it is a continuously evolving tech ecosystem.
                                    Built on innovation, collaboration, and scale, Tekron has established itself as a platform where ideas meet execution and talent meets opportunity.
                                </p>

                                <p className="font-mono text-white/50 leading-relaxed text-[10px] sm:text-xs mb-6">
                                    With strong year-on-year growth, multi-college participation, and large-scale digital outreach, Tekron has created a legacy that extends far beyond event days. Every edition strengthens its impact—connecting brands with a highly engaged, future-ready audience of engineers, developers, creators, and innovators.
                                </p>

                                <p className="font-mono text-cyan-400/80 leading-relaxed text-[10px] sm:text-xs">
                                    Tekron 2.0 represents the next milestone in this journey—bigger reach, deeper engagement, and smarter brand integration.
                                </p>

                                {/* Data Stream Effect */}
                                <div className="mt-8 pt-6 border-t border-white/10">
                                    <div className="flex items-center gap-2 text-[8px] font-mono text-white/30 uppercase tracking-widest">
                                        <Rocket className="w-3 h-3 text-purple-400" />
                                        RAPID_SCALING // YEAR_ON_YEAR_GROWTH
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Right: Floating Stats Cards */}
                    <div className="relative h-full min-h-[400px] flex items-center justify-center">
                        {stats.map((stat, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, scale: 0.8, y: 50 }}
                                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.2, type: "spring", stiffness: 100 }}
                                whileHover={{ scale: 1.05, rotate: i % 2 === 0 ? 2 : -2 }}
                                className="absolute"
                                style={{
                                    top: i === 0 ? '10%' : i === 1 ? '45%' : '75%',
                                    left: i === 1 ? '50%' : i === 0 ? '10%' : '20%',
                                    transform: 'translateX(-50%)',
                                    zIndex: 3 - i
                                }}
                            >
                                <div
                                    className="relative p-6 sm:p-8 bg-black/80 rounded-2xl border backdrop-blur-xl min-w-[200px] sm:min-w-[240px]"
                                    style={{
                                        borderColor: `${stat.color}40`,
                                        boxShadow: `0 0 30px ${stat.color}20, inset 0 0 30px ${stat.color}05`
                                    }}
                                >
                                    {/* Glow Effect */}
                                    <div
                                        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                                        style={{
                                            background: `radial-gradient(circle at top right, ${stat.color}15, transparent 70%)`
                                        }}
                                    />

                                    <div className="relative z-10">
                                        <div className="flex items-center justify-between mb-4">
                                            <div
                                                className="w-10 h-10 rounded-lg flex items-center justify-center"
                                                style={{
                                                    background: `${stat.color}20`,
                                                    color: stat.color
                                                }}
                                            >
                                                {stat.icon}
                                            </div>
                                            <div
                                                className="w-2 h-2 rounded-full animate-pulse"
                                                style={{
                                                    background: stat.color,
                                                    boxShadow: `0 0 10px ${stat.color}`
                                                }}
                                            />
                                        </div>

                                        <div
                                            className="text-3xl sm:text-4xl font-bold pixel-font mb-2"
                                            style={{
                                                color: stat.color,
                                                textShadow: `0 0 20px ${stat.color}60`
                                            }}
                                        >
                                            {stat.value}
                                        </div>

                                        <div className="text-[8px] sm:text-[10px] font-mono text-white/40 uppercase tracking-[0.2em]">
                                            {stat.label}
                                        </div>
                                    </div>

                                    {/* Animated Border */}
                                    <motion.div
                                        className="absolute inset-0 rounded-2xl"
                                        style={{
                                            background: `linear-gradient(45deg, ${stat.color}00, ${stat.color}40, ${stat.color}00)`,
                                            backgroundSize: '200% 200%'
                                        }}
                                        animate={{
                                            backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
                                        }}
                                        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                                    />
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            <style jsx>{`
                @keyframes gridPulse {
                    0%, 100% { opacity: 0.1; }
                    50% { opacity: 0.3; }
                }
            `}</style>
        </Section>
    );
};

// --- 🏆 3. Sponsorship Benefits (Redesigned with Premium Aesthetics) ---
const Benefits = () => {
    const items = [
        {
            title: 'High-Impact Visibility',
            desc: 'Strategic branding across on-ground venues, digital platforms, merchandise, and media ensures maximum recall before, during, and after the fest.',
            icon: <Sparkles className="w-10 h-10" />,
            color: '#a855f7',
            gradient: 'from-purple-500/20 via-purple-600/10 to-transparent'
        },
        {
            title: 'Targeted Tech Audience',
            desc: 'Direct access to thousands of students from top colleges—developers, innovators, and early adopters who actively engage with technology-driven brands.',
            icon: <Target className="w-10 h-10" />,
            color: '#3b82f6',
            gradient: 'from-blue-500/20 via-blue-600/10 to-transparent'
        },
        {
            title: 'Multi-Channel Integration',
            desc: 'From physical presence and branded assets to social media amplification and web visibility, Tekron delivers seamless cross-platform exposure.',
            icon: <Globe className="w-10 h-10" />,
            color: '#00fff9',
            gradient: 'from-cyan-500/20 via-cyan-600/10 to-transparent'
        },
        {
            title: 'Association with Innovation',
            desc: 'Align your brand with cutting-edge competitions, hackathons, workshops, and live tech experiences that reflect progress, creativity, and problem-solving.',
            icon: <Rocket className="w-10 h-10" />,
            color: '#ec4899',
            gradient: 'from-pink-500/20 via-pink-600/10 to-transparent'
        },
        {
            title: 'Long-Term Brand Equity',
            desc: 'Tekron isn’t a one-time campaign—it’s a growing legacy. Sponsors become part of a story that continues to scale with every edition.',
            icon: <TrendingUp className="w-10 h-10" />,
            color: '#fbbf24',
            gradient: 'from-yellow-500/20 via-yellow-600/10 to-transparent'
        }
    ];

    return (
        <Section className="relative overflow-hidden">
            {/* Animated Background Grid */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
                <div className="absolute inset-0" style={{
                    backgroundImage: `
                        linear-gradient(90deg, rgba(168, 85, 247, 0.3) 1px, transparent 1px),
                        linear-gradient(0deg, rgba(168, 85, 247, 0.3) 1px, transparent 1px)
                    `,
                    backgroundSize: '60px 60px',
                    animation: 'gridFloat 20s linear infinite'
                }} />
            </div>

            {/* Floating Particles */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {[...Array(8)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-1 h-1 rounded-full"
                        style={{
                            background: items[i % 4].color,
                            left: `${(i * 12) + 10}%`,
                            top: `${(i * 15) % 80}%`,
                            boxShadow: `0 0 10px ${items[i % 4].color}`
                        }}
                        animate={{
                            y: [0, -100, 0],
                            opacity: [0, 1, 0]
                        }}
                        transition={{
                            duration: 4 + i,
                            repeat: Infinity,
                            delay: i * 0.5,
                            ease: "easeInOut"
                        }}
                    />
                ))}
            </div>

            {/* Header Section */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="relative z-10 mb-20"
            >
                <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
                    <div className="flex-1">
                        <div className="flex items-center gap-4 mb-6">
                            <motion.div
                                className="w-16 h-[2px] bg-gradient-to-r from-purple-500 to-transparent"
                                initial={{ width: 0 }}
                                whileInView={{ width: 64 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8 }}
                            />
                            <PixelLabel color="#a855f7">STRATEGIC_ADVANTAGE</PixelLabel>
                        </div>
                        <h2 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold pixel-font text-white mb-6 leading-none tracking-tighter">
                            WHY PARTNER WITH TEKRON
                        </h2>
                        <div className="flex items-center gap-3">
                            <div className="w-2 h-2 rounded-full bg-purple-500 animate-pulse" style={{
                                boxShadow: '0 0 15px #a855f7'
                            }} />
                            <span className="text-[10px] font-mono text-white/30 uppercase tracking-[0.3em]">
                                ALIGNMENT_PROTOCOL_ACTIVE
                            </span>
                        </div>
                    </div>
                    <div className="lg:max-w-md">
                        <p className="font-mono text-white/40 text-sm leading-relaxed">
                            Partnering with Tekron means aligning your brand with India’s new-age tech culture and the next generation of decision-makers.
                        </p>
                    </div>
                </div>
            </motion.div>

            {/* Benefits Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 relative z-10">
                {items.map((benefit, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 40, rotateX: 10 }}
                        whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                        viewport={{ once: true }}
                        transition={{
                            delay: i * 0.15,
                            type: "spring",
                            stiffness: 100,
                            damping: 20
                        }}
                        whileHover={{
                            y: -8,
                            scale: 1.02,
                            rotateY: 2,
                            rotateX: -2
                        }}
                        className="group relative"
                        style={{ perspective: '1000px' }}
                    >
                        {/* Main Card Container */}
                        <div className="relative h-full bg-black/40 backdrop-blur-xl rounded-3xl border border-white/10 overflow-hidden transition-all duration-500 group-hover:border-white/20"
                            style={{
                                boxShadow: `0 0 0 1px ${benefit.color}10, 0 20px 60px -10px rgba(0,0,0,0.5)`,
                                transformStyle: 'preserve-3d'
                            }}
                        >
                            {/* Animated Gradient Overlay */}
                            <div className={`absolute inset-0 bg-gradient-to-br ${benefit.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                            {/* Holographic Border Animation */}
                            <motion.div
                                className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                                style={{
                                    background: `linear-gradient(135deg, ${benefit.color}30, transparent 40%, ${benefit.color}20)`,
                                }}
                                animate={{
                                    backgroundPosition: ['0% 0%', '100% 100%'],
                                }}
                                transition={{
                                    duration: 3,
                                    repeat: Infinity,
                                    repeatType: 'reverse'
                                }}
                            />

                            {/* Scanning Line Effect */}
                            <motion.div
                                className="absolute inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-0 group-hover:opacity-100"
                                animate={{
                                    top: ['0%', '100%']
                                }}
                                transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    ease: "linear"
                                }}
                            />

                            {/* Content */}
                            <div className="relative z-10 p-8 lg:p-10 h-full flex flex-col">
                                {/* Header with Icon and Metric */}
                                <div className="flex items-start justify-between mb-8">
                                    {/* Icon Container */}
                                    <div className="relative">
                                        <motion.div
                                            className="relative z-10 p-4 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 group-hover:border-white/20 transition-all duration-500"
                                            style={{
                                                boxShadow: `0 0 0 1px ${benefit.color}20`
                                            }}
                                            whileHover={{ scale: 1.1, rotate: 5 }}
                                        >
                                            <div style={{ color: benefit.color }}>
                                                {benefit.icon}
                                            </div>
                                        </motion.div>
                                        {/* Icon Glow */}
                                        <div
                                            className="absolute inset-0 rounded-2xl blur-xl opacity-0 group-hover:opacity-60 transition-opacity duration-500"
                                            style={{ background: benefit.color }}
                                        />
                                    </div>

                                </div>

                                {/* Title */}
                                <h4 className="text-xl lg:text-2xl font-bold pixel-font text-white mb-4 tracking-tight leading-none group-hover:translate-x-1 transition-transform duration-500">
                                    {benefit.title}
                                </h4>

                                {/* Description */}
                                <p className="text-sm lg:text-base text-white/50 font-mono leading-relaxed mb-8 group-hover:text-white/70 transition-colors duration-500 flex-grow">
                                    {benefit.desc}
                                </p>

                                {/* Bottom Bar with Progress */}
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between">
                                        <span className="text-[8px] font-mono text-white/20 uppercase tracking-[0.3em]">
                                            IMPACT_LEVEL
                                        </span>
                                        <div className="flex gap-1">
                                            {[...Array(5)].map((_, idx) => (
                                                <motion.div
                                                    key={idx}
                                                    className="w-1 h-3 rounded-full"
                                                    style={{
                                                        background: idx < 4 ? benefit.color : 'rgba(255,255,255,0.1)'
                                                    }}
                                                    initial={{ scaleY: 0 }}
                                                    whileInView={{ scaleY: 1 }}
                                                    viewport={{ once: true }}
                                                    transition={{ delay: i * 0.15 + idx * 0.1 }}
                                                />
                                            ))}
                                        </div>
                                    </div>

                                    {/* Progress Bar */}
                                    <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                                        <motion.div
                                            className="h-full rounded-full"
                                            style={{
                                                background: `linear-gradient(90deg, ${benefit.color}, ${benefit.color}80)`,
                                                boxShadow: `0 0 10px ${benefit.color}60`
                                            }}
                                            initial={{ width: 0 }}
                                            whileInView={{ width: '85%' }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 1.5, delay: i * 0.2, ease: "easeOut" }}
                                        />
                                    </div>
                                </div>

                                {/* Corner Accents */}
                                <div
                                    className="absolute top-0 right-0 w-20 h-20 border-t-2 border-r-2 rounded-tr-3xl opacity-0 group-hover:opacity-30 transition-opacity duration-500"
                                    style={{ borderColor: benefit.color }}
                                />
                                <div
                                    className="absolute bottom-0 left-0 w-20 h-20 border-b-2 border-l-2 rounded-bl-3xl opacity-0 group-hover:opacity-30 transition-opacity duration-500"
                                    style={{ borderColor: benefit.color }}
                                />
                            </div>

                            {/* Glow Effect on Hover */}
                            <div
                                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-3xl"
                                style={{
                                    boxShadow: `inset 0 0 60px ${benefit.color}10, 0 0 40px ${benefit.color}15`
                                }}
                            />
                        </div>

                        {/* External Glow */}
                        <div
                            className="absolute inset-0 -z-10 rounded-3xl blur-2xl opacity-0 group-hover:opacity-40 transition-opacity duration-500"
                            style={{ background: benefit.color }}
                        />
                    </motion.div>
                ))}
            </div>

            {/* Bottom Decorative Line */}
            <motion.div
                className="mt-20 flex items-center justify-center gap-4 opacity-20"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 0.2 }}
                viewport={{ once: true }}
            >
                <div className="w-12 h-[1px] bg-gradient-to-r from-transparent to-purple-500" />
                <span className="text-[8px] font-mono tracking-[0.4em] uppercase text-white">
                    PARTNERSHIP_MATRIX_V2.6
                </span>
                <div className="w-12 h-[1px] bg-gradient-to-l from-transparent to-purple-500" />
            </motion.div>

            <style jsx>{`
                @keyframes gridFloat {
                    0% { transform: translateY(0); }
                    100% { transform: translateY(60px); }
                }
            `}</style>
        </Section>
    );
};

// --- 💎 4. Sponsorship Tiers (Redesigned & Interactive) ---
const TierSection = () => {
    const [selectedTier, setSelectedTier] = useState(null);

    const tiers = [
        {
            name: 'TITLE_SPONSOR',
            cost: '₹5,00,000 INR',
            color: '#00fff9',
            features: ['Naming Rights', 'Top Logo Placement', 'Stage Logo', 'PR Activity'],
            fullDetails: [
                'Naming rights as "TEKRON 2.0 - Powered by [Title Sponsor]".',
                'Top logo placement in the official brochure shared across 250+ colleges and 15,000+ participants, with a clickable hyperlink redirecting to your website.',
                'Brand presence across the official TEKRON 2.0 website (homepage + sponsor section), and visibility on all TEKRON 2.0 creatives, posts, and announcements, with stage acknowledgment during inauguration and closing ceremonies.',
                'Three Instagram feed posts, daily story mentions throughout the festival, and one exclusive promotional reel from the official TEKRON page featuring your brand/product (if provided).',
                'Logo featured across all TEKRON 2.0 social media posts, official theme video, aftermovie, and certificates.',
                'YouTube brand feature on the Newton School of Technology – ADYPU official channel (11K+ subscribers).',
                'Logo exposure on the main stage backdrop, 5-8 high-visibility standees, venue banners, and official TEKRON merchandise worn by Core Committee (CC) and Organising Committee (OC) members.',
                'Prime stall space at the event venue for direct brand engagement.',
                'Dedicated PR activity and brand endorsement reel during the event.',
                '25 complimentary all-access passes with priority access to the Inauguration and Closing Ceremonies, including an opportunity for a brief on-stage brand interaction.'
            ]
        },
        {
            name: 'CO_POWERED_BY_SPONSOR',
            cost: '₹1,00,000 INR',
            color: '#fbbf24',
            features: ['Co-branding', 'Logo Mention', 'Social Posts', 'YouTube Feature'],
            fullDetails: [
                'Naming rights as "Co-Powered By" for TEKRON 2.0.',
                'Logo mention in the official brochure shared across 250+ colleges and 15,000+ participants, with a clickable hyperlink redirecting to your website.',
                'Brand presence across official TEKRON 2.0 website (sponsor section) with redirect link, and acknowledgment before and after major events.',
                'Two Instagram feed posts, daily story mentions during the festival days, and one promotional reel from the official TEKRON page featuring your brand/product (if provided).',
                'Logo appearance across select TEKRON 2.0 social media posts, official theme video, and aftermovie.',
                'YouTube brand feature on the Newton School of Technology – ADYPU official channel (11K+ subscribers).',
                'Logo exposure on main banner standees (3-5), banners across multiple event venues, and official TEKRON merchandise worn by Core Committee (CC) and Organising Committee (OC) members.',
                '15 complimentary passes with invitation to the Inauguration and Closing Ceremonies, including an opportunity for a brief brand interaction.'
            ]
        },
        {
            name: 'ASSOCIATE_PARTNER',
            cost: '₹50,000 INR',
            color: '#a855f7',
            features: ['Partner Recognition', 'Logo Mention', 'Social Story', 'Banner Exposure'],
            fullDetails: [
                'Naming rights as "Associate Partner" for TEKRON 2.0.',
                'Logo mention in the official brochure, shared across 250+ colleges and 15,000+ participants.',
                'Logo appearance on the official TEKRON 2.0 website sponsor section with redirect link.',
                'One Instagram post on the official festival page featuring your logo and product/service images (if provided).',
                'Story mentions from the official festival page during the festival days.',
                'Logo featured in the official aftermovie of TEKRON 2.0.',
                'YouTube brand mention on the Newton School of Technology – ADYPU official channel.',
                'Logo exposure on the main banner standees placed across event venues (2-3).',
                '10 complimentary passes for our event.'
            ]
        },
        {
            name: 'CONCERT_SPONSOR',
            cost: 'Custom Package',
            color: '#ec4899',
            features: ['Live Experience Partner', 'Concert Branding', 'Stage Logo', 'Social Promotion'],
            fullDetails: [
                'Recognition as "Live Experience Partner" for TEKRON 2.0.',
                'Logo mention in the official brochure shared across 250+ colleges and 15,000+ participants, and logo appearance on the official TEKRON 2.0 website (sponsor section) with redirect link.',
                'Brand visibility across concert-specific creatives, promotions, and announcements, including two Instagram feed posts, concert-day story mentions, and one promotional reel from the official TEKRON page.',
                'Logo featured on the concert stage backdrop, LED screens (if applicable), and venue banners, with stage acknowledgment and brand mention by the host/anchor during the concert.',
                'Logo inclusion in the official concert aftermovie / TEKRON aftermovie, along with a YouTube brand mention in the concert recap or highlight video on the Newton School of Technology – ADYPU official channel.',
                '20 complimentary passes including VIP / front-zone access (as applicable), with invitation to the event.'
            ]
        },
        {
            name: 'BARTER_IN_KIND_PARTNER',
            cost: 'COLLATERALS',
            color: '#22c55e',
            features: ['Partner Recognition', 'Logo Mention', 'Social Posts', 'Event Acknowledgment'],
            fullDetails: [
                'Recognition as "Barter / In-Kind Partner" for TEKRON 2.0.',
                'Logo mention in the official brochure shared across 250+ colleges and 15,000+ participants.',
                'Logo appearance on the official TEKRON 2.0 website (sponsor section) with redirect link.',
                'One Instagram feed post on the official festival page featuring your brand/logo.',
                'Logo appearance on select TEKRON 2.0 social media posts and inclusion in the official aftermovie.',
                'Logo exposure on shared banner standees or designated partner branding areas at the venue (as applicable).',
                'Acknowledgment during relevant event sessions or announcements.',
                'Limited complimentary passes for the event (quantity as mutually agreed).'
            ]
        }
    ];

    return (
        <Section>
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
                <div>
                    <PixelLabel color="#00fff9">PARTNERSHIP_RESOURCES</PixelLabel>
                    <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold pixel-font text-white">Select Your Tier</h2>
                </div>
                <div className="font-mono text-white/30 text-sm max-w-xs md:text-right">
                    Available loadouts for full ecosystem integration. Click any card to view detailed protocols.
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
                {tiers.map((tier, i) => (
                    <HolographicTierCard
                        key={i}
                        color={tier.color}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 }}
                        className="flex flex-col h-full w-full cursor-pointer group"
                        onClick={() => setSelectedTier(tier)}
                    >
                        <div className="flex justify-between items-center mb-6">
                            <div className="flex flex-col">
                                <span className="text-xs font-mono text-white/20 uppercase tracking-[0.3em] mb-1">ID // 0{i + 1}</span>
                                <div className="w-8 h-[1px]" style={{ background: tier.color }} />
                            </div>
                            <div className="text-right">
                                <div className="text-xs font-mono text-white/30 uppercase mb-1">ALLOCATION</div>
                                <div className="text-sm sm:text-base font-bold font-mono tracking-wider" style={{ color: tier.color }}>{tier.cost}</div>
                            </div>
                        </div>

                        <h3 className="text-2xl sm:text-3xl font-bold pixel-font text-white mb-4 tracking-tighter leading-none transition-transform duration-500 group-hover:translate-x-1">
                            {tier.name.split('_').join(' ')}
                        </h3>

                        <ul className="space-y-4 mb-8 flex-grow">
                            {tier.features.map((f, fi) => (
                                <li key={fi} className="text-sm font-mono text-white/40 flex items-start gap-3">
                                    <div className="w-1.5 h-1.5 rounded-full shrink-0 mt-1.5" style={{ background: tier.color }} />
                                    <span className="opacity-80 group-hover:opacity-100 leading-snug">{f}</span>
                                </li>
                            ))}
                        </ul>

                        <div
                            className="mt-auto py-3 px-4 rounded-xl font-mono text-xs tracking-[0.15em] font-bold transition-all duration-300 group-hover:tracking-[0.25em] group-hover:scale-105 flex items-center justify-center gap-2"
                            style={{
                                color: tier.color,
                                background: `${tier.color}15`,
                                border: `1px solid ${tier.color}30`,
                                boxShadow: `0 0 15px ${tier.color}10`
                            }}
                        >
                            CLICK_FOR_FULL_LOADOUT <ChevronRight size={14} />
                        </div>
                    </HolographicTierCard>
                ))}
            </div>

            <AnimatePresence>
                {selectedTier && (
                    <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 md:p-10">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedTier(null)}
                            className="absolute inset-0 bg-black/90 backdrop-blur-xl"
                        />

                        <motion.div
                            initial={{ scale: 0.95, opacity: 0, y: 30 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.95, opacity: 0, y: 30 }}
                            transition={{ type: "spring", damping: 25, stiffness: 300 }}
                            className="relative w-full max-w-5xl max-h-[92vh] overflow-hidden bg-black/60 border border-white/10 rounded-[2.5rem] backdrop-blur-3xl flex flex-col"
                            style={{
                                boxShadow: `0 0 80px ${selectedTier.color}20, inset 0 0 60px ${selectedTier.color}05`,
                                background: `radial-gradient(circle at top right, ${selectedTier.color}08, transparent 50%), rgba(0,0,0,0.6)`
                            }}
                        >
                            {/* Animated Border Glow */}
                            <div className="absolute inset-0 rounded-[2.5rem] pointer-events-none" style={{
                                background: `linear-gradient(135deg, ${selectedTier.color}15, transparent 40%, ${selectedTier.color}10)`,
                                opacity: 0.3
                            }} />

                            {/* Modal Header */}
                            <div className="relative p-6 md:p-14 border-b border-white/10 flex justify-between items-start bg-gradient-to-b from-white/[0.03] to-transparent">
                                <div className="flex-1">
                                    <div className="flex items-center gap-4 mb-4">
                                        <div className="w-16 h-[2px] rounded-full" style={{
                                            background: `linear-gradient(90deg, ${selectedTier.color}, transparent)`
                                        }} />
                                        <span className="text-[8px] sm:text-[9px] font-mono tracking-[0.6em] text-white/30 uppercase">TIER_SPECIFICATION</span>
                                    </div>
                                    <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold pixel-font text-white mb-3 leading-none tracking-tight">
                                        {selectedTier.name.split('_').join(' ')}
                                    </h2>
                                    <div className="flex items-center gap-3 mt-6">
                                        <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: selectedTier.color, boxShadow: `0 0 10px ${selectedTier.color}` }} />
                                        <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest">ACTIVE_PROTOCOL</span>
                                    </div>
                                </div>
                                <div className="text-right hidden md:block ml-8">
                                    <div className="text-[9px] font-mono text-white/20 mb-3 uppercase tracking-[0.3em]">ESTIMATED_ALLOCATION</div>
                                    <div className="text-4xl font-bold font-mono mb-2" style={{
                                        color: selectedTier.color,
                                        textShadow: `0 0 20px ${selectedTier.color}40`
                                    }}>{selectedTier.cost}</div>
                                    <div className="w-full h-[1px] mt-3" style={{ background: `linear-gradient(90deg, transparent, ${selectedTier.color}40, transparent)` }} />
                                </div>
                                <button
                                    onClick={() => setSelectedTier(null)}
                                    className="md:hidden w-12 h-12 flex items-center justify-center rounded-2xl bg-white/20 hover:bg-white/30 text-white border border-white/20 transition-all ml-4"
                                ><X className="w-6 h-6" /></button>
                            </div>

                            {/* Modal Content */}
                            <div className="flex-1 overflow-y-auto p-6 md:p-14 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
                                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-14">
                                    <div className="lg:col-span-8">
                                        <div className="flex items-center gap-4 mb-12">
                                            <div className="w-2 h-2 rounded-full" style={{ background: selectedTier.color }} />
                                            <h4 className="text-[10px] font-bold text-white/30 tracking-[0.5em] uppercase">
                                                CORE_LOADOUT_PROTOCOLS
                                            </h4>
                                            <div className="flex-1 h-[1px] bg-gradient-to-r from-white/10 to-transparent" />
                                        </div>
                                        <div className="space-y-8">
                                            {selectedTier.fullDetails.map((detail, idx) => (
                                                <motion.div
                                                    key={idx}
                                                    initial={{ opacity: 0, x: -20 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    transition={{ delay: idx * 0.08, type: "spring", stiffness: 100 }}
                                                    className="relative pl-8 group"
                                                >
                                                    <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-gradient-to-b from-white/10 via-white/5 to-transparent" />
                                                    <div className="absolute left-[-4px] top-2 w-[10px] h-[10px] rounded-sm border border-white/20 rotate-45 transition-all group-hover:border-white/40" style={{
                                                        background: `linear-gradient(135deg, ${selectedTier.color}20, transparent)`
                                                    }} />
                                                    <p className="text-white/60 text-sm md:text-base leading-relaxed font-mono group-hover:text-white/80 transition-colors">
                                                        {detail}
                                                    </p>
                                                </motion.div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="lg:col-span-4 space-y-6">
                                        <div className="p-8 bg-white/[0.02] rounded-3xl border border-white/10 backdrop-blur-sm" style={{
                                            boxShadow: `inset 0 0 40px ${selectedTier.color}05`
                                        }}>
                                            <div className="text-[9px] text-white/20 mb-8 font-bold tracking-[0.3em] uppercase flex items-center gap-3">
                                                <div className="w-1.5 h-1.5 rounded-full" style={{ background: selectedTier.color }} />
                                                SYNERGY_CHECK
                                            </div>
                                            <div className="space-y-6">
                                                <div className="flex flex-col items-start text-[10px] gap-2 w-full">
                                                    <span className="text-white/40 uppercase tracking-wider">Visibility</span>
                                                    <span className="font-bold tracking-wide break-all text-left" style={{ color: selectedTier.color }}>HIGH_PRIORITY</span>
                                                </div>
                                                <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                                                    <motion.div
                                                        initial={{ width: 0 }}
                                                        animate={{ width: '100%' }}
                                                        transition={{ duration: 1.2, ease: "easeOut" }}
                                                        className="h-full rounded-full"
                                                        style={{
                                                            background: `linear-gradient(90deg, ${selectedTier.color}, ${selectedTier.color}80)`,
                                                            boxShadow: `0 0 10px ${selectedTier.color}60`
                                                        }}
                                                    />
                                                </div>
                                                <div className="grid grid-cols-3 gap-3 pt-4">
                                                    {['REACH', 'IMPACT', 'ROI'].map((metric, i) => (
                                                        <div key={i} className="text-center p-3 bg-white/[0.02] rounded-xl border border-white/5">
                                                            <div className="text-xs font-bold pixel-font mb-1" style={{ color: selectedTier.color }}>
                                                                {95 - i * 5}%
                                                            </div>
                                                            <div className="text-[7px] text-white/30 uppercase tracking-wider">{metric}</div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>

                                        <button
                                            onClick={() => {
                                                setSelectedTier(null);
                                                document.getElementById('uplink')?.scrollIntoView({ behavior: 'smooth' });
                                            }}
                                            className="w-full py-5 sm:py-7 bg-white text-black font-bold pixel-font text-[10px] sm:text-sm hover:scale-[1.02] transition-all shadow-[10px_10px_0px_rgba(0,0,0,0.6)] active:translate-x-2 active:translate-y-2 active:shadow-none rounded-xl relative overflow-hidden group"
                                        >
                                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700" />
                                            <span className="break-all whitespace-normal text-center w-full px-2 block">INITIATE <br />PARTNERSHIP</span>
                                        </button>

                                        <p className="text-[8px] text-center text-white/15 uppercase tracking-[0.25em] leading-loose font-mono px-4">
                                            Final terms subject to memorandum of understanding. // TEKRON_2.6
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Modal Close (Desktop) */}
                            <button
                                onClick={() => setSelectedTier(null)}
                                className="absolute top-6 right-6 z-50 text-white/80 hover:text-white transition-all hidden md:flex items-center gap-3 group"
                            >
                                <span className="pixel-font text-[10px] tracking-[0.3em] opacity-0 group-hover:opacity-100 transition-opacity">ESC</span>
                                <div className="w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center transition-all">
                                    <X className="w-5 h-5" />
                                </div>
                            </button>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </Section>
    );
};

// --- 📢 5. Branding Visibility Matrix (Redesigned) ---
const VisibilityMatrix = () => {
    const protocols = [
        {
            label: 'PHYSICAL_PRESENCE',
            items: ['Main Stage Backdrop', 'Entry Archways', 'Directional Hoardings', 'Booth/Stall Space'],
            color: '#ec4899',
            icon: <Monitor className="w-6 h-6" />,
            description: 'On-ground visibility across all venue touchpoints'
        },
        {
            label: 'BRANDED_ASSETS',
            items: ['Attendee ID Cards', 'Event Lanyards', 'Custom T-Shirts', 'Swag/Goodie Bags'],
            color: '#a855f7',
            icon: <Sparkles className="w-6 h-6" />,
            description: 'Direct brand integration with participant materials'
        },
        {
            label: 'DIGITAL_ECOSYSTEM',
            items: ['Web Portal Banner', 'Sponsored Reels', 'Social Post Blasts', 'AV Shoutouts'],
            color: '#00fff9',
            icon: <Globe className="w-6 h-6" />,
            description: 'Multi-channel digital amplification strategy'
        }
    ];

    return (
        <Section className="relative overflow-hidden">
            {/* Subtle Background Grid */}
            <div className="absolute inset-0 opacity-[0.02] pointer-events-none">
                <div className="absolute inset-0" style={{
                    backgroundImage: `
                        linear-gradient(90deg, rgba(168, 85, 247, 0.3) 1px, transparent 1px),
                        linear-gradient(0deg, rgba(168, 85, 247, 0.3) 1px, transparent 1px)
                    `,
                    backgroundSize: '80px 80px'
                }} />
            </div>

            {/* Header Section */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="relative z-10 mb-20"
            >
                <div className="flex flex-col items-center text-center">
                    {/* Top Accent Line */}
                    <div className="flex items-center gap-4 mb-6">
                        <motion.div
                            className="h-[2px] w-16 bg-gradient-to-r from-transparent via-pink-500 to-pink-500"
                            initial={{ width: 0 }}
                            whileInView={{ width: 64 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                        />
                        <PixelLabel color="#ff00c1">VISIBILITY MATRIX</PixelLabel>
                        <motion.div
                            className="h-[2px] w-16 bg-gradient-to-l from-transparent via-pink-500 to-pink-500"
                            initial={{ width: 0 }}
                            whileInView={{ width: 64 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                        />
                    </div>

                    {/* Main Title */}
                    <h2 className="text-4xl sm:text-6xl md:text-7xl font-bold pixel-font text-white mb-6 leading-none">
                        Branding Protocols
                    </h2>

                    {/* Subtitle */}
                    <p className="font-mono text-white/40 text-sm max-w-2xl leading-relaxed">
                        Strategic touchpoints designed to maximize brand exposure across physical, material, and digital channels.
                    </p>

                    {/* Status Indicator */}
                    <div className="flex items-center gap-3 mt-6">
                        <div className="w-2 h-2 rounded-full bg-pink-500 animate-pulse" style={{
                            boxShadow: '0 0 15px #ec4899'
                        }} />
                        <span className="text-[10px] font-mono text-white/30 uppercase tracking-[0.3em]">
                            INTEGRATION_CHANNELS_ACTIVE
                        </span>
                    </div>
                </div>
            </motion.div>

            {/* Protocol Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 relative z-10">
                {protocols.map((protocol, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{
                            delay: i * 0.15,
                            type: "spring",
                            stiffness: 100,
                            damping: 20
                        }}
                        whileHover={{ y: -8, scale: 1.02 }}
                        className="group relative"
                    >
                        {/* Main Card */}
                        <div className="relative h-full bg-black/40 backdrop-blur-xl rounded-3xl border border-white/10 overflow-hidden transition-all duration-500 group-hover:border-white/20"
                            style={{
                                boxShadow: `0 0 0 1px ${protocol.color}10, 0 20px 60px -10px rgba(0,0,0,0.5)`
                            }}
                        >
                            {/* Gradient Overlay on Hover */}
                            <div
                                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                                style={{
                                    background: `linear-gradient(135deg, ${protocol.color}15, transparent 60%)`
                                }}
                            />

                            {/* Scanning Line Effect */}
                            <motion.div
                                className="absolute inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 group-hover:opacity-100"
                                animate={{
                                    top: ['0%', '100%']
                                }}
                                transition={{
                                    duration: 2.5,
                                    repeat: Infinity,
                                    ease: "linear"
                                }}
                            />

                            {/* Content */}
                            <div className="relative z-10 p-8 lg:p-10 h-full flex flex-col">
                                {/* Icon and Color Bar */}
                                <div className="flex items-start justify-between mb-6">
                                    {/* Icon Container */}
                                    <motion.div
                                        className="relative p-4 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 group-hover:border-white/20 transition-all duration-500"
                                        style={{
                                            boxShadow: `0 0 0 1px ${protocol.color}20`
                                        }}
                                        whileHover={{ scale: 1.1, rotate: 5 }}
                                    >
                                        <div style={{ color: protocol.color }}>
                                            {protocol.icon}
                                        </div>
                                        {/* Icon Glow */}
                                        <div
                                            className="absolute inset-0 rounded-2xl blur-xl opacity-0 group-hover:opacity-60 transition-opacity duration-500"
                                            style={{ background: protocol.color }}
                                        />
                                    </motion.div>

                                    {/* Vertical Color Bar */}
                                    <div className="w-1 h-16 rounded-full" style={{ background: protocol.color }} />
                                </div>

                                {/* Label */}
                                <div className="mb-4">
                                    <PixelLabel color={protocol.color}>{protocol.label}</PixelLabel>
                                </div>

                                {/* Description */}
                                <p className="text-xs font-mono text-white/40 mb-6 leading-relaxed group-hover:text-white/60 transition-colors duration-500">
                                    {protocol.description}
                                </p>

                                {/* Items List */}
                                <ul className="space-y-3 font-mono text-sm flex-grow">
                                    {protocol.items.map((item, ii) => (
                                        <motion.li
                                            key={ii}
                                            className="flex items-start gap-3 text-white/50 group-hover:text-white/70 transition-colors duration-300"
                                            initial={{ opacity: 0, x: -10 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: i * 0.15 + ii * 0.05 }}
                                        >
                                            <ChevronRight
                                                size={16}
                                                color={protocol.color}
                                                className="mt-0.5 flex-shrink-0"
                                            />
                                            <span className="leading-relaxed">{item}</span>
                                        </motion.li>
                                    ))}
                                </ul>

                                {/* Bottom Accent */}
                                <div className="mt-8 pt-6 border-t border-white/5">
                                    <div className="flex items-center justify-between">
                                        <span className="text-[8px] font-mono text-white/20 uppercase tracking-[0.3em]">
                                            CHANNEL_{String(i + 1).padStart(2, '0')}
                                        </span>
                                        <div className="flex gap-1">
                                            {[...Array(4)].map((_, idx) => (
                                                <motion.div
                                                    key={idx}
                                                    className="w-1 h-2 rounded-full"
                                                    style={{
                                                        background: protocol.color,
                                                        opacity: 0.3 + (idx * 0.2)
                                                    }}
                                                    initial={{ scaleY: 0 }}
                                                    whileInView={{ scaleY: 1 }}
                                                    viewport={{ once: true }}
                                                    transition={{ delay: i * 0.15 + idx * 0.05 }}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* Corner Accents */}
                                <div
                                    className="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 rounded-tr-3xl opacity-0 group-hover:opacity-30 transition-opacity duration-500"
                                    style={{ borderColor: protocol.color }}
                                />
                                <div
                                    className="absolute bottom-0 left-0 w-16 h-16 border-b-2 border-l-2 rounded-bl-3xl opacity-0 group-hover:opacity-30 transition-opacity duration-500"
                                    style={{ borderColor: protocol.color }}
                                />
                            </div>

                            {/* Glow Effect on Hover */}
                            <div
                                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-3xl"
                                style={{
                                    boxShadow: `inset 0 0 60px ${protocol.color}10, 0 0 40px ${protocol.color}15`
                                }}
                            />
                        </div>

                        {/* External Glow */}
                        <div
                            className="absolute inset-0 -z-10 rounded-3xl blur-2xl opacity-0 group-hover:opacity-30 transition-opacity duration-500"
                            style={{ background: protocol.color }}
                        />
                    </motion.div>
                ))}
            </div>

            {/* Bottom Decorative Line */}
            <motion.div
                className="mt-20 flex items-center justify-center gap-4 opacity-20"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 0.2 }}
                viewport={{ once: true }}
            >
                <div className="w-12 h-[1px] bg-gradient-to-r from-transparent to-pink-500" />
                <span className="text-[8px] font-mono tracking-[0.4em] uppercase text-white">
                    VISIBILITY_PROTOCOL_V3.0
                </span>
                <div className="w-12 h-[1px] bg-gradient-to-l from-transparent to-pink-500" />
            </motion.div>
        </Section>
    );
};



// --- 👤 Shared Data & Components ---
const artistsData = [
    { name: 'SHREYA JAIN', role: 'Singer / Performer', image: '/images/artists/shreya_jain.jpg', color: '#fbbf24', gridArea: 'artist1' },
    { name: 'DJ SUITUP', role: 'DJ', image: '/images/artists/dj_suitup.jpg', color: '#06b6d4', gridArea: 'artist2' },
    { name: 'KULLU BAAZI', role: 'Standup Comedy', image: '/images/artists/kullu_baazi.jpg', color: '#a855f7', gridArea: 'artist3' },
    { name: 'DJ NAAIRO', role: 'DJ', image: '/images/artists/dj_naairo.jpg', color: '#ec4899', gridArea: 'artist4' },
];

const influencersData = [
    { name: 'DRISHTI SHARMA', role: 'Content Creator', image: '/images/influencers/drishti_sharma.jpg', color: '#fbbf24', gridArea: 'inf1' },
    { name: 'YASH GARG', role: 'Tech Influencer', image: '/images/influencers/yash_garg.jpg', color: '#3b82f6', gridArea: 'inf2' },
    { name: 'ARSH GOYAL', role: 'Career Mentor', image: '/images/influencers/arsh_goyal.jpg', color: '#ef4444', gridArea: 'inf3' },
    { name: 'BHARAT CHANDAK', role: 'Keynote Speaker', image: '/images/influencers/bharat_chandak.jpg', color: '#f97316', gridArea: 'inf4' },
    { name: 'AKASH MAJUMDER', role: 'Finance Catalyst', image: '/images/influencers/akash_majumder.jpg', color: '#22c55e', gridArea: 'inf5' }
];

const PersonCard = ({ person, index, type }) => (
    <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.1 }}
        whileHover={{ y: -10, scale: 1.02 }}
        className="group relative h-full"
        style={{ gridArea: person.gridArea }}
    >
        <div className="relative overflow-hidden rounded-3xl bg-black/60 border border-white/10 backdrop-blur-sm hover:border-white/20 transition-all duration-500 h-full">
            {/* Image Container */}
            <div className="relative overflow-hidden h-full">
                <div
                    className="absolute inset-0 z-10"
                    style={{
                        background: `linear-gradient(135deg, ${person.color}15, transparent 60%, ${person.color}08)`
                    }}
                />
                <img
                    src={person.image}
                    alt={person.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                    }}
                />
                {/* Fallback gradient when image fails */}
                <div
                    className="hidden absolute inset-0 items-center justify-center"
                    style={{
                        background: `linear-gradient(135deg, ${person.color}40, ${person.color}10)`
                    }}
                >
                    {type === 'artist' ?
                        <Music className="w-20 h-20 text-white/20" /> :
                        <Sparkles className="w-20 h-20 text-white/20" />
                    }
                </div>

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-90 z-10" />

                {/* Holographic Scan Line */}
                <motion.div
                    className="absolute inset-x-0 h-[3px] bg-gradient-to-r from-transparent via-white/60 to-transparent z-20"
                    animate={{ top: ['0%', '100%'] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "linear", delay: index * 0.5 }}
                    style={{ opacity: 0.4 }}
                />

                {/* Corner Accents */}
                <div
                    className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 rounded-tl-3xl z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{ borderColor: person.color }}
                />
                <div
                    className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 rounded-br-3xl z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{ borderColor: person.color }}
                />
            </div>

            {/* Content Overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-6 z-30">
                {/* ID Badge */}
                <div className="flex items-center gap-2 mb-3">
                    <div
                        className="w-2.5 h-2.5 rounded-full animate-pulse"
                        style={{
                            background: person.color,
                            boxShadow: `0 0 15px ${person.color}`
                        }}
                    />
                    <span className="text-[9px] font-mono text-white/50 uppercase tracking-[0.2em]">
                        {type === 'artist' ? 'ARTIST' : 'SPEAKER'}_ID // 0{index + 1}
                    </span>
                </div>

                {/* Name */}
                <h3
                    className="font-bold pixel-font mb-2 tracking-tight leading-none text-xl sm:text-2xl lg:text-3xl"
                    style={{
                        color: person.color,
                        textShadow: `0 0 20px ${person.color}60`
                    }}
                >
                    {person.name}
                </h3>

                {/* Role */}
                <p className="text-[11px] font-mono text-white/40 uppercase tracking-wider mb-4">
                    {person.role}
                </p>

                {/* Status Bar */}
                <div className="flex items-center gap-2 pt-3 border-t border-white/10">
                    <div className="flex-1 h-1 bg-white/10 rounded-full overflow-hidden">
                        <motion.div
                            className="h-full rounded-full"
                            style={{ background: person.color }}
                            initial={{ width: 0 }}
                            whileInView={{ width: '100%' }}
                            viewport={{ once: true }}
                            transition={{ duration: 1.5, delay: index * 0.2 }}
                        />
                    </div>
                    <span
                        className="text-[8px] font-mono uppercase tracking-wider"
                        style={{ color: person.color }}
                    >
                        VERIFIED
                    </span>
                </div>
            </div>

            {/* Hover Glow Effect */}
            <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-3xl z-20"
                style={{
                    boxShadow: `inset 0 0 80px ${person.color}15, 0 0 40px ${person.color}20`
                }}
            />
        </div>
    </motion.div>
);


// --- ✨ 7a. Past Artists - Redesigned to Match About Page ---
const PastArtists = () => {
    return (
        <Section className="pb-8">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-16"
            >
                <div className="flex items-center gap-4 mb-8">
                    <motion.div
                        className="h-[2px] w-12 bg-gradient-to-r from-transparent to-yellow-500"
                        initial={{ width: 0 }}
                        whileInView={{ width: 48 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    />
                    <PixelLabel color="#fbbf24">ARTISTS_ARCHIVE</PixelLabel>
                    <motion.div
                        className="h-[2px] flex-1 bg-gradient-to-r from-yellow-500 to-transparent"
                        initial={{ width: 0 }}
                        whileInView={{ width: '100%' }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    />
                </div>
                <h2 className="text-3xl sm:text-5xl md:text-7xl font-bold pixel-font text-white mb-4 leading-tight">
                    Past Artists
                </h2>
                <p className="font-mono text-white/40 text-sm sm:text-base max-w-2xl">
                    Legendary performers who brought energy and entertainment to TEKRON 1.0
                </p>
            </motion.div>

            {/* Grid Layout matching About Page - 4 in a line */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
                {artistsData.map((artist, idx) => (
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
        </Section>
    );
};

// --- ✨ 7c. Past Influencers ---
const PastInfluencers = () => {
    return (
        <Section className="pt-8">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-16"
            >
                <div className="flex items-center gap-4 mb-8">
                    <motion.div
                        className="h-[2px] w-12 bg-gradient-to-r from-transparent to-purple-500"
                        initial={{ width: 0 }}
                        whileInView={{ width: 48 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    />
                    <PixelLabel color="#a855f7">INFLUENCER_NODE</PixelLabel>
                    <motion.div
                        className="h-[2px] flex-1 bg-gradient-to-r from-purple-500 to-transparent"
                        initial={{ width: 0 }}
                        whileInView={{ width: '100%' }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    />
                </div>
                <h2 className="text-3xl sm:text-5xl md:text-7xl font-bold pixel-font text-white mb-4 leading-tight">
                    Past Influencers
                </h2>
                <p className="font-mono text-white/40 text-sm sm:text-base max-w-2xl">
                    Industry leaders and thought pioneers who shared their insights at TEKRON 1.0
                </p>
            </motion.div>

            {/* Asymmetric Bento Grid for Influencers */}
            <div
                className="grid gap-6"
                style={{
                    gridTemplateColumns: 'repeat(10, 1fr)',
                    gridTemplateRows: 'repeat(4, 200px)',
                    gridTemplateAreas: `
                        "inf1 inf1 inf1 inf1 inf2 inf2 inf2 inf3 inf3 inf3"
                        "inf1 inf1 inf1 inf1 inf2 inf2 inf2 inf3 inf3 inf3"
                        "inf4 inf4 inf4 inf4 inf4 inf5 inf5 inf5 inf5 inf5"
                        "inf4 inf4 inf4 inf4 inf4 inf5 inf5 inf5 inf5 inf5"
                    `
                }}
            >
                {influencersData.map((influencer, i) => (
                    <PersonCard key={i} person={influencer} index={i} type="influencer" />
                ))}
            </div>

            {/* Mobile/Tablet Responsive Grid for Influencers */}
            <style jsx>{`
                @media (max-width: 1024px) {
                    .grid[style*="inf1"] {
                        grid-template-columns: repeat(6, 1fr) !important;
                        grid-template-rows: repeat(5, 180px) !important;
                        grid-template-areas: 
                            "inf1 inf1 inf1 inf2 inf2 inf2"
                            "inf1 inf1 inf1 inf3 inf3 inf3"
                            "inf4 inf4 inf4 inf5 inf5 inf5"
                            "inf4 inf4 inf4 inf5 inf5 inf5"
                            ". . . . . ." !important;
                    }
                }
                @media (max-width: 640px) {
                    .grid[style*="inf1"] {
                        grid-template-columns: 1fr !important;
                        grid-template-rows: repeat(5, 280px) !important;
                        grid-template-areas: 
                            "inf1"
                            "inf2"
                            "inf3"
                            "inf4"
                            "inf5" !important;
                    }
                }
            `}</style>
        </Section>
    );
};


// --- 🛰️ 7. Partner Card (Event Style) ---
const PartnerCard = ({ name, logo, category, color }) => {
    const [isHovered, setIsHovered] = useState(false);

    const particles = Array.from({ length: 8 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        particleColor: color || '#a855f7'
    }));

    const getCategoryGradient = (cat) => {
        if (cat === 'PRODUCTION') return 'from-purple-500 to-purple-700';
        if (cat === 'HACKATHON') return 'from-indigo-500 to-indigo-700';
        if (cat === 'OUTREACH') return 'from-blue-500 to-blue-700';
        if (cat === 'VENUE') return 'from-cyan-500 to-cyan-700';
        if (cat === 'CATERING') return 'from-pink-500 to-pink-700';
        return 'from-violet-500 to-violet-800';
    };

    return (
        <div
            className="relative overflow-hidden rounded-3xl transition-all duration-500 ease-out h-48 sm:h-60"
            style={{
                background: 'linear-gradient(135deg, rgba(30, 20, 56, 0.8), rgba(45, 27, 78, 0.6))',
                backdropFilter: 'blur(20px)',
                boxShadow: isHovered
                    ? `0 20px 40px ${color}4d, 0 0 60px ${color}33`
                    : '0 4px 6px rgba(0, 0, 0, 0.1)'
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div
                className="absolute inset-0 rounded-3xl transition-opacity duration-400"
                style={{
                    padding: '2px',
                    background: `linear-gradient(135deg, ${color}, #7c3aed, #6366f1)`,
                    WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                    WebkitMaskComposite: 'xor',
                    maskComposite: 'exclude',
                    opacity: isHovered ? 1 : 0
                }}
            />

            <div
                className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%] transition-opacity duration-400 pointer-events-none"
                style={{
                    background: `radial-gradient(circle, ${color}1a 0%, transparent 70%)`,
                    opacity: isHovered ? 1 : 0
                }}
            />

            <div className="relative w-full h-full flex items-center justify-center overflow-hidden p-8"
                style={{
                    background: 'linear-gradient(135deg, #1e1438 0%, #2d1b4e 50%, #1a0b2e 100%)'
                }}>
                <div className="absolute inset-0 opacity-30"
                    style={{
                        backgroundImage: `
              repeating-linear-gradient(0deg, ${color}1a 0px, transparent 1px, transparent 2px, ${color}1a 3px),
              repeating-linear-gradient(90deg, ${color}1a 0px, transparent 1px, transparent 2px, ${color}1a 3px)
            `
                    }}
                />

                <div className="relative z-10 w-full h-full flex items-center justify-center">
                    <img
                        src={logo}
                        alt={name}
                        className="max-w-full max-h-full object-contain transition-all duration-500"
                        style={{
                            filter: isHovered ? `drop-shadow(0 0 20px ${color}80)` : 'none',
                            transform: isHovered ? 'scale(1.1)' : 'scale(1)'
                        }}
                    />
                </div>
            </div>

            {isHovered && (
                <div className="absolute inset-0 pointer-events-none">
                    {particles.map((particle, index) => (
                        <div
                            key={particle.id}
                            className="absolute w-1 h-1 rounded-full"
                            style={{
                                left: `${particle.x}%`,
                                top: `${particle.y}%`,
                                background: particle.particleColor,
                                boxShadow: `0 0 10px ${particle.particleColor}`,
                                animation: `float-p-${index} 2s ease-in-out infinite`,
                                animationDelay: `${index * 0.2}s`
                            }}
                        />
                    ))}
                </div>
            )}

            <style>{`
        ${particles.map((_, i) => `
          @keyframes float-p-${i} {
            0%, 100% { transform: translateY(0); opacity: 0; }
            50% { transform: translateY(-20px); opacity: 1; }
          }
        `).join('')}
      `}</style>
        </div>
    );
};

// --- 👤 Shared Partner Data ---
const partnersData = [
    { name: 'Jiny Entertainments', logo: '/images/brands/jiny_entertainments.png', category: 'PRODUCTION', color: '#22c55e', id: 'PRD_01' },
    { name: 'Blinkit', logo: '/images/brands/blinkit.png', category: 'HACKATHON', color: '#eab308', id: 'HCK_01' },
    { name: 'AIESEC', logo: '/images/brands/aiesec.png', category: 'OUTREACH', color: '#3b82f6', id: 'OUT_01' },
    { name: 'unstop', logo: '/images/brands/unstop.png', category: 'OUTREACH', color: '#3b82f6', id: 'OUT_02' },
    { name: 'Club Charholi', logo: '/images/brands/club_charholi.png', category: 'VENUE', color: '#a855f7', id: 'VEN_01' },
    { name: 'HITCHKI', logo: '/images/brands/hitchki_v1.png', category: 'CATERING', color: '#ef4444', id: 'CAT_01' },
    { name: 'Pizza Hut', logo: '/images/brands/pizza_hut.png', category: 'CATERING', color: '#ef4444', id: 'CAT_02' }
];

// --- 🤝 7d. Heritage Partners Header (Tekron 1.0 Protocol) ---
const HeritageHeader = () => {
    return (
        <Section className="relative z-10 mb-20">
            <div className="text-center">
                <PixelLabel color="#00fff9">HERITAGE_PARTNERS</PixelLabel>
                <h2 className="text-4xl sm:text-6xl md:text-8xl font-bold pixel-font text-white mb-6 tracking-tighter">
                    Tekron 1.0 <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-cyan-400 to-blue-400">Protocol</span>
                </h2>
                <div className="flex items-center justify-center gap-4 opacity-40 mb-8">
                    <div className="w-16 h-[1px] bg-gradient-to-r from-transparent to-white" />
                    <span className="text-[10px] font-mono tracking-[0.3em] uppercase">Archive_Access_Granted</span>
                    <div className="w-16 h-[1px] bg-gradient-to-l from-transparent to-white" />
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="max-w-4xl mx-auto px-6 py-8 relative group"
                >
                    {/* Decorative Corner Brackets */}
                    <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-cyan-500/30 group-hover:border-cyan-500/60 transition-colors" />
                    <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-cyan-500/30 group-hover:border-cyan-500/60 transition-colors" />
                    <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-cyan-500/30 group-hover:border-cyan-500/60 transition-colors" />
                    <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-cyan-500/30 group-hover:border-cyan-500/60 transition-colors" />

                    <div className="bg-cyan-500/5 backdrop-blur-sm p-6 sm:p-10 border border-white/5 rounded-sm relative overflow-hidden">
                        {/* Background Scanline Pattern */}
                        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{
                            backgroundImage: 'linear-gradient(rgba(0, 255, 249, 0.1) 1px, transparent 1px)',
                            backgroundSize: '100% 4px'
                        }} />

                        <p className="font-mono text-sm sm:text-base leading-relaxed text-white/80 font-bold tracking-wide text-left relative z-10">
                            <span className="text-cyan-400 font-bold mr-2 text-xs sm:text-sm">ROOT@TEKRON:~$</span>
                            <span className="text-cyan-200/90 italic font-semibold">Tekron 1.0</span> marked the inception of India’s new-age tech fest, bringing together innovation, competition, and collaboration on a single platform. The inaugural edition featured high-impact technical events, hackathons, robotics challenges, and live experiences designed to inspire real-world problem solving.
                            <br /><br />
                            With participation from hundreds of colleges and thousands of students, <span className="text-cyan-300">Tekron 1.0</span> achieved strong on-ground engagement and massive digital outreach. Strategic marketing and influencer collaborations amplified its reach, establishing credibility and trust among partners.
                            <br /><br />
                            <span className="text-cyan-300">Tekron 1.0</span> laid the foundation for a scalable tech ecosystem—setting the stage for an even bigger <span className="text-purple-400 font-bold drop-shadow-[0_0_8px_rgba(168,85,247,0.5)]">Tekron 2.0</span>.
                        </p>
                    </div>
                </motion.div>
            </div>
        </Section>
    );
};

// --- 🤝 7e. Past Sponsors (Heritage Partners Cards) ---
const HeritageCards = () => {
    return (
        <Section className="relative z-10">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="max-w-7xl mx-auto px-4 mb-16"
            >
                <div className="flex items-center gap-4 mb-8">
                    <motion.div
                        className="h-[2px] w-12 bg-gradient-to-r from-transparent to-cyan-500"
                        initial={{ width: 0 }}
                        whileInView={{ width: 48 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    />
                    <PixelLabel color="#00fff9">SPONSOR_ARCHIVE</PixelLabel>
                    <motion.div
                        className="h-[2px] flex-1 bg-gradient-to-r from-cyan-500 to-transparent"
                        initial={{ width: 0 }}
                        whileInView={{ width: '100%' }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    />
                </div>
                <h2 className="text-3xl sm:text-5xl md:text-7xl font-bold pixel-font text-white mb-4 leading-tight">
                    Past Sponsors
                </h2>
                <p className="font-mono text-white/40 text-sm sm:text-base max-w-2xl">
                    Iconic brands and partners who supported the visionary inception of the Tekron Protocol.
                </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 max-w-7xl mx-auto px-4">
                {partnersData.map((partner, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 }}
                        className="h-full"
                    >
                        <PartnerCard {...partner} />
                    </motion.div>
                ))}

                {/* Empty Slot Filler / Join Us Card */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.8 }}
                    whileHover={{ y: -5 }}
                    className="relative h-48 sm:h-60 cursor-pointer"
                    onClick={() => document.getElementById('uplink')?.scrollIntoView({ behavior: 'smooth' })}
                >
                    <div className="absolute inset-0 bg-dashed border-2 border-white/10 rounded-3xl flex flex-col items-center justify-center p-6 hover:border-white/30 transition-all duration-300 bg-white/[0.01]">
                        <div className="text-4xl font-thin text-white/20 mb-3 group-hover:text-white/50 group-hover:scale-110 transition-all">+</div>
                        <div className="text-xs font-mono uppercase tracking-widest text-white/30 group-hover:text-white/60">
                            Your_Brand_Here
                        </div>
                    </div>
                </motion.div>
            </div>
        </Section>
    );
};

// --- 🤝 7b. Legacy Component (For backward compatibility) ---
const HeritagePartners = () => {
    return (
        <>
            <HeritageHeader />
            <HeritageCards />
        </>
    );
};

// --- 📊 8. Reach Stats (Historical & Future) ---
const ReachStats = () => {
    const historicalStats = [
        { label: '1.0_OUTREACH', value: 700000, suffix: '+', icon: <Globe className="w-8 h-8 text-blue-500" />, color: '#3b82f6' },
        { label: '1.0_ONLINE_ATTENDEES', value: 10000, suffix: '+', icon: <Monitor className="w-8 h-8 text-green-500" />, color: '#10b981' },
        { label: '1.0_FOOTFALL', value: 5000, suffix: '+', icon: <Footprints className="w-8 h-8 text-yellow-500" />, color: '#fbbf24' }
    ];
    const targetStats = [
        { label: '2.0_EXPECTED_FOOTFALL', value: 10000, suffix: '+', icon: <Users className="w-8 h-8 text-purple-500" />, color: '#a855f7' },
        { label: 'COLLEGES_NODES', value: 50, suffix: '+', icon: <Building2 className="w-8 h-8 text-cyan-500" />, color: '#00fff9' },
        { label: 'TOTAL_IMPRESSIONS', value: 1000000, suffix: '+', icon: <TrendingUp className="w-8 h-8 text-pink-500" />, color: '#ec4899' }
    ];

    return (
        <Section>
            <div className="bg-black/60 border border-white/5 rounded-[40px] p-8 md:p-20 backdrop-blur-md">
                <div className="text-center mb-16">
                    <PixelLabel color="#a855f7">METRIC_VAULT</PixelLabel>
                    <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold pixel-font text-white">Impact Archive</h2>
                </div>

                <div className="space-y-12 md:space-y-20">
                    {/* Tekron 1.0 Historical Stats */}
                    <div>
                        <div className="flex items-center gap-4 mb-10">
                            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                            <span className="text-[8px] sm:text-[10px] font-mono text-white/40 uppercase tracking-[0.4em]">v.1.0_HISTORICAL_DATA</span>
                        </div>
                        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                            {historicalStats.map((stat, i) => (
                                <BentoBlock key={i} className="p-4 md:p-8 border-white/5 bg-black/40">
                                    <div className="text-2xl sm:text-3xl mb-3">{React.cloneElement(stat.icon, { className: 'w-6 h-6 sm:w-8 h-8' })}</div>
                                    <div className="text-xl sm:text-3xl font-bold pixel-font mb-1 truncate" style={{ color: stat.color }}>
                                        <AnimatedCounter target={stat.value} />{stat.suffix}
                                    </div>
                                    <div className="text-[7px] sm:text-[9px] font-mono text-white/30 uppercase tracking-[0.2em]">{stat.label}</div>
                                </BentoBlock>
                            ))}
                        </div>
                    </div>

                    {/* Tekron 2.0 Projected Stats */}
                    <div>
                        <div className="flex items-center gap-4 mb-10">
                            <div className="w-2 h-2 rounded-full bg-blue-500" />
                            <span className="text-[8px] sm:text-[10px] font-mono text-white/40 uppercase tracking-[0.4em]">v.2.0_PROJECTED_TARGETS</span>
                        </div>
                        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                            {targetStats.map((stat, i) => (
                                <BentoBlock key={i} className="p-4 md:p-8 border-white/5 bg-black/40">
                                    <div className="text-2xl sm:text-3xl mb-3">{React.cloneElement(stat.icon, { className: 'w-6 h-6 sm:w-8 h-8' })}</div>
                                    <div className="text-xl sm:text-3xl font-bold pixel-font mb-1 truncate" style={{ color: stat.color }}>
                                        <AnimatedCounter target={stat.value} />{stat.suffix}
                                    </div>
                                    <div className="text-[7px] sm:text-[9px] font-mono text-white/30 uppercase tracking-[0.2em]">{stat.label}</div>
                                </BentoBlock>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </Section>
    );
};

// --- 🤝 5. Tekron 2.0 Sponsors (New Section) ---
const TekronSponsors = () => {
    const partners = [
        { name: 'Pizza Hut', image: '/images/brands/pizza_hut.png', color: '#ff0000', category: 'PARTNER' },
        { name: 'Monster Energy', image: '/images/brands/monster_energy.png', color: '#00ff00', category: 'PARTNER' },
        { name: 'Interview Buddy', image: '/images/brands/interview_buddy.png', color: '#7c3aed', category: 'PARTNER' },
        { name: 'Wet n Joy', image: '/images/brands/wet_n_joy.png', color: '#00ffff', category: 'PARTNER' },
        { name: 'Ajex eSports', image: '/images/brands/ajex_esports.png', color: '#a855f7', category: 'PARTNER' },
        { name: 'AFDC', image: '/images/brands/afdc.jpg', color: '#d8c6f2', category: 'PARTNER' },
        { name: 'Jiny Entertainments', image: '/images/brands/jiny_entertainments_v2.png', color: '#10b981', category: 'PARTNER' },
        { name: 'The Paradise India', image: '/images/brands/the_paradise_india.png', color: '#ffffff', category: 'PARTNER' },
        { name: 'Prera', image: '/images/brands/prera.png', color: '#ffd700', category: 'ASSOCIATE' }
    ];

    const foodCourtStalls = [
        { name: 'BOM Cafe', logo: '/images/foodcourt/bom_cafe.png', color: '#ec4899' },
        { name: 'Taco Bell', logo: '/images/foodcourt/taco_bell.png', color: '#8b5cf6' },
        { name: 'House of Ice Cream', logo: '/images/foodcourt/house_of_icecream.png', color: '#f43f5e' },
        { name: 'Maanshh Chowrangi', logo: '/images/foodcourt/maanshh_chowrangi.jpg', color: '#f59e0b' },
        { name: 'AaniyouU', logo: '/images/foodcourt/aaniyou_u.jpg', color: '#14b8a6' }
    ];

    const prera = { name: 'Prera', logo: '/images/brands/prera.png', color: '#ffd700', category: 'ASSOCIATE' };

    return (
        <Section className="relative z-10">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="max-w-7xl mx-auto px-4 mb-16 text-center"
            >
                <div className="flex items-center justify-center gap-4 mb-8">
                    <div className="h-[2px] w-12 bg-gradient-to-r from-transparent to-cyan-500" />
                    <PixelLabel color="#00fff9">TEKRON_ALLIANCE_NETWORK</PixelLabel>
                    <div className="h-[2px] w-12 bg-gradient-to-l from-transparent to-cyan-500" />
                </div>
                <h2 className="text-4xl sm:text-6xl font-bold pixel-font text-white mb-4">
                    TEKRON 2.0 <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">SPONSORS</span>
                </h2>
            </motion.div>

            {/* Our Partners */}
            <div className="mb-20 max-w-7xl mx-auto px-4">
                <h3 className="text-2xl font-bold font-mono text-white/60 mb-8 pl-4 border-l-4 border-purple-500 uppercase">
                    Our Partners
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {partners.map((partner, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                        >
                            <PartnerCard
                                name={partner.name}
                                logo={partner.image}
                                category={partner.category}
                                color={partner.color}
                            />
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Tekron Food Court */}
            <div className="mb-20 max-w-7xl mx-auto px-4">
                <h3 className="text-2xl font-bold font-mono text-white/60 mb-8 pl-4 border-l-4 border-pink-500 uppercase">
                    Tekron Food Court
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {foodCourtStalls.map((stall, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                        >
                            <PartnerCard
                                name={stall.name}
                                logo={stall.logo}
                                category="FOOD COURT"
                                color={stall.color}
                            />
                        </motion.div>
                    ))}
                </div>
            </div>


            {/* Connector Lines */}
            <div className="absolute left-[3px] top-[10%] bottom-[10%] w-[1px] bg-gradient-to-b from-transparent via-white/10 to-transparent hidden xl:block" />
        </Section>
    );
}

// --- 📩 9. Contact & Brochure ---
const ContactBrochure = () => {
    const coordinator = {
        name: 'Harshit Jain',
        role: 'Sponsorship Head',
        email: 'harshit.jain@adypu.edu.in',
        phone: '+91 74278 87050',
        image: '/images/committee/harshit_jain.jpg'
    };

    return (
        <Section id="uplink" className="mb-0 relative py-32 overflow-hidden">
            {/* Background Decorations */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-500/10 rounded-full blur-[120px] opacity-30" />
                <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-cyan-500/5 rounded-full blur-[100px] opacity-20" />
            </div>

            <div className="max-w-6xl mx-auto px-6 relative z-10">
                <div className="text-center md:text-left mb-16">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <PixelLabel color="#00fff9">CONTACT_US</PixelLabel>
                        <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-white tracking-tighter leading-tight mt-4">
                            Connect With <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400">Us</span>
                        </h2>
                    </motion.div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
                    {/* --- Left Column: Details --- */}
                    <div className="lg:col-span-8 order-2 lg:order-1">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="space-y-10"
                        >
                            <div className="space-y-4">
                                <div className="inline-flex items-center gap-3 px-4 py-2 bg-white/5 border border-white/10 rounded-full">
                                    <div className="w-2 h-2 rounded-full bg-purple-500 animate-pulse shadow-[0_0_10px_#a855f7]" />
                                    <span className="text-xs font-mono text-purple-200 uppercase tracking-widest font-bold">{coordinator.role}</span>
                                </div>
                                <h3 className="text-4xl sm:text-6xl font-bold text-white tracking-tight">{coordinator.name}</h3>
                                <p className="text-white/40 font-mono text-sm sm:text-base max-w-lg leading-relaxed">
                                    For inquiries regarding strategic partnerships, sponsorship tiers, and brand integration at TEKRON 2.0.
                                </p>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                                <a href={`tel:${coordinator.phone}`} className="group space-y-2">
                                    <div className="text-[10px] font-mono text-white/30 uppercase tracking-[0.2em]">Live Support</div>
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-cyan-500/50 group-hover:bg-cyan-500/5 transition-all duration-300">
                                            <Phone className="w-5 h-5 text-cyan-400" />
                                        </div>
                                        <span className="text-xl font-mono text-white group-hover:text-cyan-300 transition-colors">{coordinator.phone}</span>
                                    </div>
                                </a>
                                <a href={`mailto:${coordinator.email}`} className="group space-y-2">
                                    <div className="text-[10px] font-mono text-white/30 uppercase tracking-[0.2em]">Secure Email</div>
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-purple-500/50 group-hover:bg-purple-500/5 transition-all duration-300">
                                            <Mail className="w-5 h-5 text-purple-400" />
                                        </div>
                                        <span className="text-lg sm:text-xl font-mono text-white group-hover:text-purple-300 transition-colors break-all">{coordinator.email}</span>
                                    </div>
                                </a>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-6 pt-6">
                                <motion.a
                                    whileHover={{ scale: 1.05, y: -2 }}
                                    whileTap={{ scale: 0.98 }}
                                    href="/Sponsorship Booklet.pdf"
                                    download="Sponsorship Booklet.pdf"
                                    className="px-10 py-5 bg-white text-black font-bold pixel-font text-xs flex items-center justify-center gap-3 shadow-[8px_8px_0px_#7c3aed] hover:shadow-none transition-all"
                                >
                                    <Download className="w-4 h-4" /> DOWNLOAD BROCHURE
                                </motion.a>
                            </div>
                        </motion.div>
                    </div>

                    {/* --- Right Column: Image --- */}
                    <div className="lg:col-span-4 order-1 lg:order-2">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            className="relative group max-w-sm mx-auto"
                        >
                            {/* Decorative Frame */}
                            <div className="absolute -inset-3 border border-white/5 rounded-[32px] pointer-events-none" />
                            <div className="absolute -inset-6 border border-white/5 rounded-[48px] pointer-events-none opacity-50" />

                            <div className="relative aspect-[4/5] overflow-hidden rounded-[24px] border-2 border-white/10 bg-black/40">
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10" />
                                <img
                                    src={coordinator.image}
                                    alt={coordinator.name}
                                    className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                                />

                                {/* HUD Corner Accents */}
                                <div className="absolute top-4 left-4 w-10 h-10 border-t-2 border-l-2 border-cyan-500/50 rounded-tl-lg z-20" />
                                <div className="absolute bottom-4 right-4 w-10 h-10 border-b-2 border-r-2 border-purple-500/50 rounded-br-lg z-20" />
                            </div>

                            {/* Floating Metadata */}
                            <div className="absolute -bottom-4 -right-4 bg-black/80 backdrop-blur-xl border border-white/10 p-3 rounded-xl z-20 hidden md:block">
                                <div className="text-[8px] font-mono text-white/40 uppercase tracking-widest mb-0.5">Status</div>
                                <div className="flex items-center gap-2">
                                    <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                                    <span className="text-[10px] font-mono text-white font-bold tracking-tighter uppercase">Available</span>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </Section>
    );
};

// --- Main Page ---
const Sponsors = () => {
    const navigate = useNavigate();
    return (
        <UnifiedBackground>
            <MiniNavbar label="EXIT MAP" />

            <PageContent>
                <HeroSection />
                <WhySponsor />
                <Benefits />
                <TierSection />
                <TekronSponsors />
                <VisibilityMatrix />
                <HeritageHeader />
                <ReachStats />
                <PastArtists />
                <PastInfluencers />
                <HeritageCards />
                <ContactBrochure />
            </PageContent>
            <Footer />

            <div className="fixed inset-0 pointer-events-none z-[100] opacity-[0.03]" style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
            }} />
        </UnifiedBackground>
    );
};

export default Sponsors;
