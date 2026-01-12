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
    return <span>{count.toLocaleString()}</span>;
};

// --- 🎯 1. Hero Section ---
const HeroSection = () => (
    <Section className="min-h-[60vh] flex flex-col items-center justify-center text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <PixelLabel color="#00fff9">INITIATING PARTNERSHIP HUB // 2026</PixelLabel>
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

                                <p className="font-mono text-white/70 leading-relaxed text-sm sm:text-base mb-6">
                                    TEKRON 2026 is an <span className="text-purple-400 font-bold">immersive sandbox</span> for technical excellence.
                                </p>

                                <p className="font-mono text-white/50 leading-relaxed text-xs sm:text-sm">
                                    With a legacy of <span className="text-cyan-400 font-bold">250+ participating colleges</span> and a reach that defines the digital archive of tomorrow,
                                    we offer a unique gateway to the most talented minds in the industry.
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
            title: 'BRAND VISIBILITY',
            desc: 'Dominant placement on banners, stages, and the main ecosystem backdrop with guaranteed prime positioning.',
            icon: <BarChart3 className="w-10 h-10" />,
            color: '#a855f7',
            metric: '95%',
            metricLabel: 'EXPOSURE',
            gradient: 'from-purple-500/20 via-purple-600/10 to-transparent'
        },
        {
            title: 'SOCIAL PROMOTION',
            desc: 'Strategic multi-channel social media blasts and partner feature stories across all platforms.',
            icon: <Smartphone className="w-10 h-10" />,
            color: '#3b82f6',
            metric: '700K+',
            metricLabel: 'REACH',
            gradient: 'from-blue-500/20 via-blue-600/10 to-transparent'
        },
        {
            title: 'TALENT PIPELINE',
            desc: 'Direct recruitment access and lead generation through technical challenges and competitions.',
            icon: <Target className="w-10 h-10" />,
            color: '#ec4899',
            metric: '10K+',
            metricLabel: 'STUDENTS',
            gradient: 'from-pink-500/20 via-pink-600/10 to-transparent'
        },
        {
            title: 'DIGITAL REACH',
            desc: 'Logo integration across the official website, posters, certificates, and all digital assets.',
            icon: <Globe className="w-10 h-10" />,
            color: '#00fff9',
            metric: '1M+',
            metricLabel: 'IMPRESSIONS',
            gradient: 'from-cyan-500/20 via-cyan-600/10 to-transparent'
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
                            Why Partner?
                        </h2>
                        <div className="flex items-center gap-3">
                            <div className="w-2 h-2 rounded-full bg-purple-500 animate-pulse" style={{
                                boxShadow: '0 0 15px #a855f7'
                            }} />
                            <span className="text-[10px] font-mono text-white/30 uppercase tracking-[0.3em]">
                                INTEGRATION_PROTOCOL_ACTIVE
                            </span>
                        </div>
                    </div>
                    <div className="lg:max-w-md">
                        <p className="font-mono text-white/40 text-sm leading-relaxed">
                            Integrating your core identity into the technical archive of tomorrow.
                            <span className="block mt-2 text-white/60">
                                Join the ecosystem that connects <span className="text-purple-400 font-bold">10,000+ students</span> with industry leaders.
                            </span>
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

                                    {/* Metric Display */}
                                    <div className="text-right">
                                        <div
                                            className="text-2xl lg:text-3xl font-bold pixel-font mb-1 transition-all duration-500"
                                            style={{
                                                color: benefit.color,
                                                textShadow: `0 0 20px ${benefit.color}40`
                                            }}
                                        >
                                            {benefit.metric}
                                        </div>
                                        <div className="text-[9px] font-mono text-white/30 uppercase tracking-[0.2em]">
                                            {benefit.metricLabel}
                                        </div>
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
            cost: '₹10,00,000',
            color: '#00fff9',
            features: ['Naming Rights', 'Keynote Spot', 'Stage Logo', 'PR Release'],
            fullDetails: [
                "Exclusive naming rights as “TEKRON 2026 – Powered by [Title Sponsor]” with top-tier logo placement across all marketing materials, website (first fold), registration pages, brochures (250+ colleges, 15,000+ participants), stage assets, banners, and all event merchandise.",
                "Opening keynote opportunity for the sponsor representative with brand recognition during the opening ceremony, closing ceremony, and before every major competition, supported by frequent anchor shoutouts throughout the festival.",
                "Prime-location exhibition booth with expanded space, electricity, and seating, enabling product showcases, demos, lead generation, and high-engagement activities.",
                "Strong digital presence through 3 dedicated Instagram posts, story mentions during festival days, logo placement on every Tekron post, and branding in the official theme video, aftermovie, sponsor AV, and all certificates.",
                "Exclusive sponsor activities including one PR endorsement event with video and reel, one dedicated brand promotion reel, and opportunities for sign-ups, trials, recruitment, and lead capture.",
                "25 VIP passes and 10 complimentary registrations.",
                "Full press and media visibility with recognition as the Title Sponsor in all press releases, media coverage, and external outreach."
            ]
        },
        {
            name: 'CO_SPONSOR',
            cost: '₹5,00,000',
            color: '#fbbf24',
            features: ['Co-branding', 'Secondary Logo', 'Seminar Spot', 'Web Feature'],
            fullDetails: [
                "Co-branding rights as “TEKRON 2026 – In Association with [Co-Sponsor]” with prominent logo placement.",
                "Seminar or Workshop slot (30-45 mins) for direct interaction with students.",
                "Medium-sized exhibition booth in a high-traffic zone.",
                "2 dedicated Instagram posts and logo in the official sponsor grid.",
                "15 VIP passes and 5 complimentary registrations.",
                "Recognition in local press releases and digital media kits."
            ]
        },
        {
            name: 'GOLD_SPONSOR',
            cost: '₹3,00,000',
            color: '#fefefe',
            features: ['Social Blast', 'Standard Booth', 'AV Mention', 'Poster Logo'],
            fullDetails: [
                "Official recognition as a Gold Partner across digital and physical collateral.",
                "Standard exhibition stall for branding and engagement.",
                "1 dedicated social media shoutout and mention in the daily festival recap.",
                "Logo on all event posters and standees.",
                "10 VIP passes and 3 complimentary registrations."
            ]
        },
        {
            name: 'SILVER_SPONSOR',
            cost: '₹1,00,000',
            color: '#94a3b8',
            features: ['Cert. Branding', 'Brochure Logo', 'Web Grid', 'Social Shoutout'],
            fullDetails: [
                "Logo placement on participant certificates (5,000+ copies).",
                "Branding on the official festival website sponsor archive.",
                "Shared social media story announcement.",
                "5 VIP passes.",
                "Inclusion in the official sponsorship brochure distributed to all 250+ colleges."
            ]
        },
        {
            name: 'IN_KIND',
            cost: 'COLLATERALS',
            color: '#22c55e',
            features: ['Beverage/Print', 'Media Rights', 'Mention Logo', 'Web Credit'],
            fullDetails: [
                "Exclusive product placement or service integration (e.g., Food, Beverage, Printing).",
                "Official 'Powered by' status for specific event categories.",
                "Branding on event-specific collaterals.",
                "Digital credits on our partner page and social media mentions.",
                "Collaboration opportunities for prize distribution."
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
        { label: 'PLATFORM_NODES', items: ['Main Stage Backdrop', 'Entry Archways', 'Directional Hoardings', 'Booth/Stall Space'], color: '#ec4899' },
        { label: 'EQUIPMENT_LOADOUT', items: ['Attendee ID Cards', 'Event Lanyards', 'Custom T-Shirts', 'Swag/Goodie Bags'], color: '#a855f7' },
        { label: 'DIGITAL_OVERLAY', items: ['Web Portal Banner', 'Sponsored Reels', 'Social Post Blasts', 'AV Shoutouts'], color: '#00fff9' }
    ];
    return (
        <Section>
            <div className="text-center mb-16">
                <PixelLabel color="#ff00c1">VISIBILITY MATRIX</PixelLabel>
                <h2 className="text-3xl sm:text-5xl font-bold pixel-font text-white">Branding Protocols</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {protocols.map((p, i) => (
                    <BentoBlock
                        key={i}
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 }}
                        className="p-6 md:p-10 border-white/5 bg-black/40 hover:bg-black/60"
                    >
                        <div className="w-12 h-1 mb-8" style={{ background: p.color }} />
                        <PixelLabel color={p.color}>{p.label}</PixelLabel>
                        <ul className="space-y-4 font-mono text-white/50">
                            {p.items.map((item, ii) => (
                                <li key={ii} className="flex gap-4 text-sm group-hover:text-white/80 transition-colors">
                                    <ChevronRight size={14} color={p.color} /> {item}
                                </li>
                            ))}
                        </ul>
                    </BentoBlock>
                ))}
            </div>
        </Section>
    );
};



// --- ✨ 7a. Star Power (Artists & Influencers) - Redesigned Bento Grid ---
const StarPower = () => {
    const artists = [
        { name: 'SHREYA JAIN', role: 'Singer / Performer', image: '/images/artists/shreya_jain.jpg', color: '#fbbf24', gridArea: 'artist1' },
        { name: 'DJ SUITUP', role: 'Electronic Artist', image: '/images/artists/dj_suitup.jpg', color: '#00fff9', gridArea: 'artist2' },
        { name: 'KULLU BAAZI', role: 'Standup Comedy', image: '/images/artists/kullu_baazi.jpg', color: '#a855f7', gridArea: 'artist3' },
        { name: 'DJ NAAIRO', role: 'Music Producer', image: '/images/artists/dj_naairo.jpg', color: '#ec4899', gridArea: 'artist4' }
    ];
    const influencers = [
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

    return (
        <>
            {/* Artists Section - Asymmetric Bento Grid */}
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

                {/* Asymmetric Bento Grid for Artists */}
                <div
                    className="grid gap-6"
                    style={{
                        gridTemplateColumns: 'repeat(6, 1fr)',
                        gridTemplateRows: 'repeat(4, 200px)',
                        gridTemplateAreas: `
                            "artist1 artist1 artist1 artist2 artist2 artist2"
                            "artist1 artist1 artist1 artist2 artist2 artist2"
                            "artist3 artist3 artist3 artist4 artist4 artist4"
                            "artist3 artist3 artist3 artist4 artist4 artist4"
                        `
                    }}
                >
                    {artists.map((artist, i) => (
                        <PersonCard key={i} person={artist} index={i} type="artist" />
                    ))}
                </div>

                {/* Mobile/Tablet Responsive Grid */}
                <style jsx>{`
                    @media (max-width: 1024px) {
                        .grid[style*="gridTemplateAreas"] {
                            grid-template-columns: repeat(4, 1fr) !important;
                            grid-template-rows: repeat(4, 180px) !important;
                            grid-template-areas: 
                                "artist1 artist1 artist2 artist2"
                                "artist1 artist1 artist2 artist2"
                                "artist3 artist3 artist4 artist4"
                                "artist3 artist3 artist4 artist4" !important;
                        }
                    }
                    @media (max-width: 640px) {
                        .grid[style*="gridTemplateAreas"] {
                            grid-template-columns: 1fr !important;
                            grid-template-rows: repeat(4, 280px) !important;
                            grid-template-areas: 
                                "artist1"
                                "artist2"
                                "artist3"
                                "artist4" !important;
                        }
                    }
                `}</style>
            </Section>

            {/* Influencers Section - Asymmetric Bento Grid */}
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
                    {influencers.map((influencer, i) => (
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
        </>
    );
};

// --- 🤝 7b. Heritage Partners (Tekron 1.0 Archive - Redesigned) ---
const HeritagePartners = () => {
    const sectors = [
        {
            id: 'SEC_01',
            label: 'PRODUCTION',
            partners: [
                { name: 'Jiny Entertainments', logo: 'https://jiny.co/images/logo-white.png' }
            ],
            color: '#22c55e'
        },
        {
            id: 'SEC_02',
            label: 'HACKATHON',
            partners: [
                { name: 'Blinkit', logo: 'https://upload.wikimedia.org/wikipedia/commons/6/6f/Blinkit_logo.svg' }
            ],
            color: '#eab308'
        },
        {
            id: 'SEC_03',
            label: 'OUTREACH',
            partners: [
                { name: 'AIESEC', logo: 'https://aiesec.org/assets/images/AIESEC-logo-white.svg' },
                { name: 'unstop', logo: 'https://d8it4huxumps7.cloudfront.net/uploads/images/unstop/unstop-logo.svg' }
            ],
            color: '#3b82f6'
        },
        {
            id: 'SEC_04',
            label: 'VENUE',
            partners: [
                { name: 'Club Charholi', logo: 'https://clubcharholi.com/images/logo-white.png' }
            ],
            color: '#a855f7'
        },
        {
            id: 'SEC_05',
            label: 'CATERING',
            partners: [
                { name: 'HITCHKI', logo: 'https://hitchki.co/images/logo.png' },
                { name: 'Pizza Hut', logo: 'https://upload.wikimedia.org/wikipedia/sco/thumb/d/d2/Pizza_Hut_logo.svg/2193px-Pizza_Hut_logo.svg.png' }
            ],
            color: '#ef4444'
        }
    ];

    return (
        <Section>
            <div className="text-center mb-16">
                <PixelLabel color="#00fff9">HERITAGE_PARTNERS</PixelLabel>
                <h2 className="text-3xl sm:text-5xl md:text-7xl font-bold pixel-font text-white mb-4 tracking-tighter">Tekron 1.0 Protocol</h2>
                <div className="flex items-center justify-center gap-4 opacity-20">
                    <div className="w-12 h-[1px] bg-white" />
                    <span className="text-[8px] sm:text-[10px] font-mono tracking-widest uppercase">Global Archive Access</span>
                    <div className="w-12 h-[1px] bg-white" />
                </div>
            </div>

            <ValueHub className="overflow-hidden border-white/5 bg-black/40 p-0">
                <div className="grid grid-cols-1 lg:grid-cols-5 divide-y lg:divide-y-0 lg:divide-x divide-white/5">
                    {sectors.map((sector, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="p-6 md:p-10 flex flex-col items-center group relative hover:bg-white/[0.02] transition-all"
                        >
                            {/* Sector Header */}
                            <div className="w-full flex justify-between items-center mb-8 md:mb-12">
                                <span className="text-[8px] font-mono opacity-20 group-hover:opacity-100 transition-opacity" style={{ color: sector.color }}>{sector.id}</span>
                                <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: sector.color, boxShadow: `0 0 10px ${sector.color}` }} />
                            </div>

                            <div className="text-[10px] font-mono text-white/30 mb-8 uppercase tracking-[0.3em] text-center font-bold">
                                {sector.label}
                            </div>

                            <div className="flex flex-col gap-8 items-center justify-center flex-grow w-full">
                                {sector.partners.map((p, pi) => (
                                    <div key={pi} className="flex flex-col items-center gap-3 w-full group/logo">
                                        <div className="h-12 w-full flex items-center justify-center px-4">
                                            <img
                                                src={p.logo}
                                                alt={p.name}
                                                className="max-h-full max-w-full object-contain grayscale opacity-60 group-hover/logo:grayscale-0 group-hover/logo:opacity-100 transition-all duration-500"
                                                onError={(e) => {
                                                    e.target.style.display = 'none';
                                                    e.target.nextSibling.style.display = 'block';
                                                }}
                                            />
                                            <div className="hidden text-[10px] font-bold pixel-font text-white/40 uppercase text-center">{p.name}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Bottom Accent */}
                            <div className="mt-12 w-8 h-[1px] opacity-10 group-hover:opacity-100 transition-all duration-700 group-hover:w-full" style={{ background: sector.color }} />
                        </motion.div>
                    ))}
                </div>

                {/* Footer Sync */}
                <div className="bg-white/[0.02] p-4 border-t border-white/5 flex justify-between items-center px-6 md:px-10">
                    <div className="text-[8px] font-mono text-white/20 uppercase tracking-widest">
                        // ALLIED_ECOSYSTEM_STATUS: STABLE // DATALINK_ESTABLISHED
                    </div>
                    <div className="flex gap-2">
                        <div className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                        <div className="w-1.5 h-1.5 bg-green-500/50 rounded-full" />
                        <div className="w-1.5 h-1.5 bg-green-500/20 rounded-full" />
                    </div>
                </div>
            </ValueHub>
        </Section>
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
        { label: '2026_EXPECTED_FOOTFALL', value: 10000, suffix: '+', icon: <Users className="w-8 h-8 text-purple-500" />, color: '#a855f7' },
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
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {historicalStats.map((stat, i) => (
                                <BentoBlock key={i} className="p-8 border-white/5 bg-black/40">
                                    <div className="text-3xl mb-4">{stat.icon}</div>
                                    <div className="text-3xl font-bold pixel-font mb-2" style={{ color: stat.color }}>
                                        <AnimatedCounter target={stat.value} />{stat.suffix}
                                    </div>
                                    <div className="text-[9px] font-mono text-white/30 uppercase tracking-[0.3em]">{stat.label}</div>
                                </BentoBlock>
                            ))}
                        </div>
                    </div>

                    {/* Tekron 2026 Projected Stats */}
                    <div>
                        <div className="flex items-center gap-4 mb-10">
                            <div className="w-2 h-2 rounded-full bg-blue-500" />
                            <span className="text-[8px] sm:text-[10px] font-mono text-white/40 uppercase tracking-[0.4em]">v.2.6_PROJECTED_TARGETS</span>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {targetStats.map((stat, i) => (
                                <BentoBlock key={i} className="p-8 border-white/5 bg-black/40">
                                    <div className="text-3xl mb-4">{stat.icon}</div>
                                    <div className="text-3xl font-bold pixel-font mb-2" style={{ color: stat.color }}>
                                        <AnimatedCounter target={stat.value} />{stat.suffix}
                                    </div>
                                    <div className="text-[9px] font-mono text-white/30 uppercase tracking-[0.3em]">{stat.label}</div>
                                </BentoBlock>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </Section>
    );
};

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
        <Section id="uplink" className="mb-0">
            <div className="text-center mb-24">
                <h2 className="text-5xl sm:text-7xl md:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400">CONNECT.</h2>
                <div className="flex flex-col md:flex-row justify-center gap-6 mt-12 px-6">
                    <button className="px-6 py-4 sm:px-12 sm:py-6 bg-white text-black font-bold pixel-font text-xs sm:text-sm hover:scale-105 transition-all shadow-[8px_8px_0px_#7c3aed] flex items-center gap-2">
                        <Download className="w-4 h-4" /> DOWNLOAD BROCHURE (PDF)
                    </button>
                    <button className="px-6 py-4 sm:px-12 sm:py-6 bg-black/40 border-2 border-purple-500 text-white font-bold pixel-font text-xs sm:text-sm hover:bg-purple-500/20 transition-all">
                        INITIATE UPLINK (QUICK)
                    </button>
                </div>
            </div>

            <div className="max-w-4xl mx-auto">
                <BiometricCard className="p-8 md:p-12 border-purple-500/30">
                    <div className="flex flex-col md:flex-row items-center gap-12">
                        <div className="w-48 h-56 relative shrink-0" style={{ clipPath: 'polygon(15% 0, 100% 0, 100% 85%, 85% 100%, 0 100%, 0 15%)' }}>
                            <img src={coordinator.image} alt={coordinator.name} className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        </div>
                        <div className="flex-1 text-center md:text-left">
                            <PixelLabel color="#a855f7">{coordinator.role}</PixelLabel>
                            <h3 className="text-2xl sm:text-4xl font-bold pixel-font text-white mb-6 tracking-tighter">{coordinator.name}</h3>
                            <div className="space-y-4 font-mono text-sm sm:text-lg text-white/60">
                                <a href={`tel:${coordinator.phone}`} className="hover:text-white transition-colors flex items-center gap-3">
                                    <Phone className="w-4 h-4" /> {coordinator.phone}
                                </a>
                                <a href={`mailto:${coordinator.email}`} className="hover:text-white transition-colors flex items-center gap-3">
                                    <Mail className="w-4 h-4" /> {coordinator.email}
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="mt-12 pt-8 border-t border-white/5 text-center font-mono text-[8px] sm:text-[10px] text-white/20 tracking-[0.5em] uppercase">
                        &gt; SECURE_CONNECTION_ESTABLISHED // 200 OK
                    </div>
                </BiometricCard>
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
                <VisibilityMatrix />

                <StarPower />
                <HeritagePartners />
                <ReachStats />
                <ContactBrochure />
                <Footer />
            </PageContent>

            <div className="fixed inset-0 pointer-events-none z-[100] opacity-[0.03]" style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
            }} />
        </UnifiedBackground>
    );
};

export default Sponsors;
