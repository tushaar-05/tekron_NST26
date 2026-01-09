import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import UnifiedBackground from '../../components/layout/UnifiedBackground';
import MiniNavbar from '../../components/layout/MiniNavbar';

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
`;

const Section = styled.section`
  margin-bottom: 200px;
  @media (max-width: 768px) {
    margin-bottom: 120px;
  }
`;

const BiometricCard = styled(motion.div)`
  position: relative;
  background: rgba(0, 0, 0, 0.4);
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
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(15px);
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
  background: rgba(168, 85, 247, 0.05);
  border: 1px solid rgba(168, 85, 247, 0.1);
  border-radius: 24px;
  padding: 24px;
  transition: all 0.4s ease;
  
  &:hover {
    background: rgba(168, 85, 247, 0.1);
    border-color: rgba(168, 85, 247, 0.3);
  }
`;

const HolographicTierCard = styled(motion.div)`
  position: relative;
  background: rgba(10, 10, 10, 0.6);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 32px;
  padding: 40px;
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
    width: 80px;
    height: 80px;
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
            <h1 className="text-6xl md:text-9xl font-bold pixel-font leading-tight mb-8"
                style={{
                    color: '#fff',
                    textShadow: '0 0 40px rgba(168, 85, 247, 0.4)',
                }}>
                BECOME OUR<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">SPONSOR</span>
            </h1>
            <p className="mt-8 text-xl md:text-2xl font-mono text-white/40 max-w-2xl mx-auto">
                &gt; ARCHITECT THE FUTURE OF TECHNOLOGY WITH US. INTEGRATE YOUR BRAND INTO THE TEKRON ECOSYSTEM.
            </p>
            <motion.div className="h-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent mt-12 mx-auto max-w-xl"
                animate={{ opacity: [0.2, 0.8, 0.2] }} transition={{ duration: 3, repeat: Infinity }} />
        </motion.div>
    </Section>
);

// --- 🎯 2. Why Sponsor Us? (Bento Hub Design) ---
const WhySponsor = () => (
    <Section>
        <ValueHub
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="p-8 md:p-16"
        >
            <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/10 blur-[100px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-cyan-500/10 blur-[100px] pointer-events-none" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch relative z-10">
                {/* Left Content */}
                <div className="lg:col-span-7 flex flex-col justify-center">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-[2px] bg-purple-500" />
                        <PixelLabel color="#a855f7" className="mb-0">THE VISION</PixelLabel>
                    </div>
                    <h2 className="text-5xl md:text-7xl font-bold pixel-font text-white mb-8 leading-tight">
                        Crafting<br />Legacy.
                    </h2>
                    <p className="font-mono text-white/50 leading-relaxed text-lg max-w-xl">
                        TEKRON 2026 is an immersive sandbox for technical excellence.
                        With a legacy of 250+ participating colleges and a reach that defines the digital archive of tomorrow,
                        we offer a unique gateway to the most talented minds in the industry.
                    </p>
                </div>

                {/* Right Bento Section */}
                <div className="lg:col-span-5 grid grid-cols-1 gap-6">
                    <BentoBlock>
                        <PixelLabel color="#00fff9">AUDIENCE_DEMOGRAPHICS</PixelLabel>
                        <p className="text-white/60 font-mono text-sm mb-0">
                            A concentrated hub of students, developers, and tech-disruptors hungry for the next leap in innovation.
                        </p>
                    </BentoBlock>

                    <div className="grid grid-cols-2 gap-6">
                        <BentoBlock className="flex flex-col justify-center items-center text-center">
                            <div className="text-4xl font-bold pixel-font text-white mb-2">5000+</div>
                            <div className="text-[10px] font-mono text-white/30 uppercase tracking-widest">ATTENDEES</div>
                        </BentoBlock>
                        <BentoBlock className="flex flex-col justify-center items-center text-center">
                            <div className="text-4xl font-bold pixel-font text-white mb-2">30+</div>
                            <div className="text-[10px] font-mono text-white/30 uppercase tracking-widest">COLLEGES</div>
                        </BentoBlock>
                    </div>

                    <BentoBlock className="bg-white/[0.02] border-white/5">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center text-xl">🚀</div>
                            <div>
                                <h4 className="text-white text-sm font-bold pixel-font">RAPID_SCALING</h4>
                                <p className="text-xs text-white/30 font-mono mb-0">Year-on-year growth in digital presence.</p>
                            </div>
                        </div>
                    </BentoBlock>
                </div>
            </div>

            <div className="mt-16 pt-8 border-t border-white/5 flex flex-wrap gap-8 justify-between items-center opacity-30">
                <div className="text-[10px] font-mono uppercase tracking-[0.4em]">SYSTEM_READY // 2026.01</div>
                <div className="flex gap-4">
                    <div className="w-2 h-2 rounded-full bg-purple-500" />
                    <div className="w-2 h-2 rounded-full bg-purple-500/50" />
                    <div className="w-2 h-2 rounded-full bg-purple-500/20" />
                </div>
            </div>
        </ValueHub>
    </Section>
);

// --- 🏆 3. Sponsorship Benefits (Redesigned) ---
const Benefits = () => {
    const items = [
        { title: 'BRAND VISIBILITY', desc: 'Dominant placement on banners, stages, and the main ecosystem backdrop.', icon: '📊' },
        { title: 'SOCIAL PROMOTION', desc: 'Strategic multi-channel social media blasts and partner feature stories.', icon: '📱' },
        { title: 'TALENT PIPELINE', desc: 'Direct recruitment access and lead generation through technical challenges.', icon: '🎯' },
        { title: 'DIGITAL REACH', desc: 'Logo integration across the official website, posters, and digital assets.', icon: '🌐' }
    ];
    return (
        <Section>
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-16 gap-6">
                <div>
                    <PixelLabel color="#a855f7">STRATEGIC ADVANTAGE</PixelLabel>
                    <h2 className="text-5xl md:text-6xl font-bold pixel-font text-white">Why Partner?</h2>
                </div>
                <div className="font-mono text-white/30 text-sm max-w-xs md:text-right">
                    Integrating your core identity into the technical archive of tomorrow.
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {items.map((benefit, i) => (
                    <BentoBlock
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 }}
                        className="p-10 border-white/5 hover:bg-white/[0.03]"
                    >
                        <div className="text-4xl mb-8 opacity-80 group-hover:scale-110 transition-transform">{benefit.icon}</div>
                        <h4 className="text-lg font-bold pixel-font text-white mb-4 tracking-tighter">{benefit.title}</h4>
                        <p className="text-sm text-white/40 font-mono leading-relaxed">{benefit.desc}</p>
                    </BentoBlock>
                ))}
            </div>
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
                    <h2 className="text-5xl md:text-6xl font-bold pixel-font text-white">Select Your Tier</h2>
                </div>
                <div className="font-mono text-white/30 text-sm max-w-xs md:text-right">
                    Available loadouts for full ecosystem integration. Click any card to view detailed protocols.
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
                {tiers.map((tier, i) => (
                    <HolographicTierCard
                        key={i}
                        color={tier.color}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 }}
                        className="flex flex-col h-full cursor-pointer group"
                        onClick={() => setSelectedTier(tier)}
                    >
                        <div className="flex justify-between items-start mb-10">
                            <div className="flex flex-col">
                                <span className="text-[10px] font-mono text-white/20 uppercase tracking-[0.3em] mb-1">ID // 0{i + 1}</span>
                                <div className="w-8 h-[1px]" style={{ background: tier.color }} />
                            </div>
                            <div className="text-right">
                                <div className="text-[10px] font-mono text-white/30 uppercase mb-1">ALLOCATION</div>
                                <div className="text-sm font-bold font-mono tracking-wider" style={{ color: tier.color }}>{tier.cost}</div>
                            </div>
                        </div>

                        <h3 className="text-2xl font-bold pixel-font text-white mb-8 tracking-tighter leading-none transition-transform duration-500 group-hover:translate-x-1">
                            {tier.name.split('_').join(' ')}
                        </h3>

                        <ul className="space-y-4 mb-12 flex-grow">
                            {tier.features.map((f, fi) => (
                                <li key={fi} className="text-[10px] font-mono text-white/40 flex items-center gap-3">
                                    <div className="w-1 h-1 rounded-full shrink-0" style={{ background: tier.color }} />
                                    <span className="opacity-80 group-hover:opacity-100">{f}</span>
                                </li>
                            ))}
                        </ul>

                        <div className="mt-auto pt-6 border-t border-white/5 font-mono text-[8px] text-white/20 tracking-[0.2em] group-hover:text-white/60 transition-colors">
                            &gt; CLICK_FOR_FULL_LOADOUT
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
                            <div className="relative p-10 md:p-14 border-b border-white/10 flex justify-between items-start bg-gradient-to-b from-white/[0.03] to-transparent">
                                <div className="flex-1">
                                    <div className="flex items-center gap-4 mb-4">
                                        <div className="w-16 h-[2px] rounded-full" style={{
                                            background: `linear-gradient(90deg, ${selectedTier.color}, transparent)`
                                        }} />
                                        <span className="text-[9px] font-mono tracking-[0.6em] text-white/30 uppercase">TIER_SPECIFICATION</span>
                                    </div>
                                    <h2 className="text-5xl md:text-6xl font-bold pixel-font text-white mb-3 leading-none tracking-tight">
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
                                    className="md:hidden w-12 h-12 flex items-center justify-center rounded-2xl bg-white/5 hover:bg-white/10 text-white border border-white/10 transition-all ml-4"
                                >✕</button>
                            </div>

                            {/* Modal Content */}
                            <div className="flex-1 overflow-y-auto p-10 md:p-14 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
                                <div className="grid grid-cols-1 lg:grid-cols-12 gap-14">
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
                                                <div className="flex justify-between items-center text-[10px]">
                                                    <span className="text-white/40 uppercase tracking-wider">Visibility</span>
                                                    <span className="font-bold tracking-widest" style={{ color: selectedTier.color }}>HIGH_PRIORITY</span>
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
                                            className="w-full py-7 bg-white text-black font-bold pixel-font text-sm hover:scale-[1.02] transition-all shadow-[10px_10px_0px_rgba(0,0,0,0.6)] active:translate-x-2 active:translate-y-2 active:shadow-none rounded-xl relative overflow-hidden group"
                                        >
                                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700" />
                                            INITIATE_PARTNERSHIP
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
                                className="absolute top-14 right-14 text-white/20 hover:text-white transition-all hidden md:flex items-center gap-3 group"
                            >
                                <span className="pixel-font text-[10px] tracking-[0.3em] opacity-0 group-hover:opacity-100 transition-opacity">ESC</span>
                                <div className="w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center transition-all">
                                    ✕
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
                <h2 className="text-5xl font-bold pixel-font text-white">Branding Protocols</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {protocols.map((p, i) => (
                    <BentoBlock
                        key={i}
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 }}
                        className="p-10 border-white/5 bg-white/[0.02] hover:bg-white/[0.04]"
                    >
                        <div className="w-12 h-1 mb-8" style={{ background: p.color }} />
                        <PixelLabel color={p.color}>{p.label}</PixelLabel>
                        <ul className="space-y-4 font-mono text-white/50">
                            {p.items.map((item, ii) => (
                                <li key={ii} className="flex gap-4 text-sm group-hover:text-white/80 transition-colors">
                                    <span style={{ color: p.color }}>▶</span> {item}
                                </li>
                            ))}
                        </ul>
                    </BentoBlock>
                ))}
            </div>
        </Section>
    );
};

// --- 🎤 6. Event-Wise Sponsorship ---
const EventWiseSponsorship = () => {
    const tracks = [
        { name: 'HACKATHON', icon: '💻', desc: 'Own the hardware/software arena. Deeply engage with builders.' },
        { name: 'ESPORTS', icon: '🎮', desc: 'Sponsor the BGMI or CodeWars league. Connect with Gen-Z gamers.' },
        { name: 'CULTURAL', icon: '🎸', desc: 'Partner with Battle of Bands or Cultural Night for high-energy exposure.' }
    ];
    return (
        <Section>
            <div className="mb-12">
                <PixelLabel color="#ec4899">TARGETED DEPLOYMENT</PixelLabel>
                <h2 className="text-5xl font-bold pixel-font">Event Synergy</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {tracks.map((track, i) => (
                    <div key={i} className="p-8 bg-black/40 border border-white/5 rounded-3xl backdrop-blur-md group hover:border-pink-500/30 transition-all">
                        <div className="text-5xl mb-6">{track.icon}</div>
                        <h4 className="text-2xl font-bold pixel-font text-white mb-4">{track.name}</h4>
                        <p className="font-mono text-white/30 text-sm leading-relaxed">{track.desc}</p>
                    </div>
                ))}
            </div>
        </Section>
    );
};

// --- ✨ 7a. Star Power (Artists & Influencers) ---
const StarPower = () => {
    const artists = [
        { name: 'SHREYA JAIN', role: 'Singer / Performer', icon: '🎤' },
        { name: 'DJ SUITUP', role: 'Electronic Artist', icon: '🎧' },
        { name: 'KULLU BAAZI', role: 'Standup Comedy', icon: '🎭' },
        { name: 'DJ NAAIRO', role: 'Music Producer', icon: '🎹' }
    ];
    const influencers = [
        { name: 'YASH GARG', role: 'Tech Influencer', icon: '📱' },
        { name: 'DRISHTI SHARMA', role: 'Content Creator', icon: '✨' },
        { name: 'BHARAT CHANDAK', role: 'Keynote Speaker', icon: '🎙️' },
        { name: 'ARSH GOYAL', role: 'Career Mentor', icon: '🚀' },
        { name: 'AKASH MAJUMDER', role: 'Finance Catalyst', icon: '💹' }
    ];

    return (
        <Section>
            <div className="text-center mb-16">
                <PixelLabel color="#fbbf24">STAR_POWER_ARCHIVE</PixelLabel>
                <h2 className="text-5xl md:text-6xl font-bold pixel-font text-white mb-4">Past Lineup</h2>
                <p className="font-mono text-white/30 uppercase tracking-[0.2em]">Artists & Influencers who ignited the stage.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto">
                {/* Artists */}
                <div>
                    <h4 className="text-xl font-bold pixel-font text-white/60 mb-8 flex items-center gap-4">
                        <div className="w-8 h-[2px] bg-yellow-500" /> ARTISTS_ARCHIVE
                    </h4>
                    <div className="grid grid-cols-2 gap-4">
                        {artists.map((a, i) => (
                            <BentoBlock key={i} className="p-6 border-white/5 bg-white/[0.02]">
                                <div className="text-2xl mb-3">{a.icon}</div>
                                <div className="text-xs font-bold pixel-font text-white mb-1">{a.name}</div>
                                <div className="text-[8px] font-mono text-white/20 uppercase tracking-widest">{a.role}</div>
                            </BentoBlock>
                        ))}
                    </div>
                </div>

                {/* Influencers */}
                <div>
                    <h4 className="text-xl font-bold pixel-font text-white/60 mb-8 flex items-center gap-4">
                        <div className="w-8 h-[2px] bg-purple-500" /> INFLUENCER_NODE
                    </h4>
                    <div className="grid grid-cols-2 gap-4">
                        {influencers.map((inf, i) => (
                            <BentoBlock key={i} className="p-6 border-white/5 bg-white/[0.02]">
                                <div className="text-2xl mb-3">{inf.icon}</div>
                                <div className="text-xs font-bold pixel-font text-white mb-1">{inf.name}</div>
                                <div className="text-[8px] font-mono text-white/20 uppercase tracking-widest">{inf.role}</div>
                            </BentoBlock>
                        ))}
                    </div>
                </div>
            </div>
        </Section>
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
                <h2 className="text-5xl md:text-7xl font-bold pixel-font text-white mb-4 tracking-tighter">Tekron 1.0 Protocol</h2>
                <div className="flex items-center justify-center gap-4 opacity-20">
                    <div className="w-12 h-[1px] bg-white" />
                    <span className="text-[10px] font-mono tracking-widest uppercase">Global Archive Access</span>
                    <div className="w-12 h-[1px] bg-white" />
                </div>
            </div>

            <ValueHub className="overflow-hidden border-white/5 bg-white/[0.01] p-0">
                <div className="grid grid-cols-1 lg:grid-cols-5 divide-y lg:divide-y-0 lg:divide-x divide-white/5">
                    {sectors.map((sector, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="p-10 flex flex-col items-center group relative hover:bg-white/[0.02] transition-all"
                        >
                            {/* Sector Header */}
                            <div className="w-full flex justify-between items-center mb-12">
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
                <div className="bg-white/[0.02] p-4 border-t border-white/5 flex justify-between items-center px-10">
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
        { label: '1.0_OUTREACH', value: 700000, suffix: '+', icon: '🌐', color: '#3b82f6' },
        { label: '1.0_ONLINE_ATTENDEES', value: 10000, suffix: '+', icon: '💻', color: '#10b981' },
        { label: '1.0_FOOTFALL', value: 5000, suffix: '+', icon: '👟', color: '#fbbf24' }
    ];
    const targetStats = [
        { label: '2026_EXPECTED_FOOTFALL', value: 10000, suffix: '+', icon: '👥', color: '#a855f7' },
        { label: 'COLLEGES_NODES', value: 50, suffix: '+', icon: '🏫', color: '#00fff9' },
        { label: 'TOTAL_IMPRESSIONS', value: 1000000, suffix: '+', icon: '📈', color: '#ec4899' }
    ];

    return (
        <Section>
            <div className="bg-white/[0.02] border border-white/5 rounded-[40px] p-12 md:p-20">
                <div className="text-center mb-16">
                    <PixelLabel color="#a855f7">METRIC_VAULT</PixelLabel>
                    <h2 className="text-5xl md:text-6xl font-bold pixel-font text-white">Impact Archive</h2>
                </div>

                <div className="space-y-20">
                    {/* Tekron 1.0 Historical Stats */}
                    <div>
                        <div className="flex items-center gap-4 mb-10">
                            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                            <span className="text-[10px] font-mono text-white/40 uppercase tracking-[0.4em]">v.1.0_HISTORICAL_DATA</span>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {historicalStats.map((stat, i) => (
                                <BentoBlock key={i} className="p-8 border-white/5 bg-white/[0.01]">
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
                            <span className="text-[10px] font-mono text-white/40 uppercase tracking-[0.4em]">v.2.6_PROJECTED_TARGETS</span>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {targetStats.map((stat, i) => (
                                <BentoBlock key={i} className="p-8 border-white/5 bg-white/[0.01]">
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
        <Section className="mb-0">
            <div className="text-center mb-24">
                <h2 className="text-7xl md:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400">CONNECT.</h2>
                <div className="flex flex-col md:flex-row justify-center gap-6 mt-12">
                    <button className="px-12 py-6 bg-white text-black font-bold pixel-font text-sm hover:scale-105 transition-all shadow-[8px_8px_0px_#7c3aed]">
                        📥 DOWNLOAD BROCHURE (PDF)
                    </button>
                    <button className="px-12 py-6 bg-black/40 border-2 border-purple-500 text-white font-bold pixel-font text-sm hover:bg-purple-500/20 transition-all">
                        INITIATE UPLINK (QUICK)
                    </button>
                </div>
            </div>

            <div className="max-w-4xl mx-auto">
                <BiometricCard className="p-12 border-purple-500/30">
                    <div className="flex flex-col md:flex-row items-center gap-12">
                        <div className="w-48 h-56 relative shrink-0" style={{ clipPath: 'polygon(15% 0, 100% 0, 100% 85%, 85% 100%, 0 100%, 0 15%)' }}>
                            <img src={coordinator.image} alt={coordinator.name} className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        </div>
                        <div className="flex-1 text-center md:text-left">
                            <PixelLabel color="#a855f7">{coordinator.role}</PixelLabel>
                            <h3 className="text-4xl font-bold pixel-font text-white mb-6 tracking-tighter">{coordinator.name}</h3>
                            <div className="space-y-4 font-mono text-lg text-white/60">
                                <a href={`tel:${coordinator.phone}`} className="block hover:text-white transition-colors">📞 {coordinator.phone}</a>
                                <a href={`mailto:${coordinator.email}`} className="block hover:text-white transition-colors">✉️ {coordinator.email}</a>
                            </div>
                        </div>
                    </div>
                    <div className="mt-12 pt-8 border-t border-white/5 text-center font-mono text-[10px] text-white/20 tracking-[0.5em] uppercase">
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
                <EventWiseSponsorship />
                <StarPower />
                <HeritagePartners />
                <ReachStats />
                <ContactBrochure />

                <div className="mt-40 pt-10 border-t border-white/5 opacity-20 font-mono text-[9px] uppercase tracking-[0.5em] text-center">
                    Sponsorship Protocol v.2.6.0 // Built for the Bold // © 2026 TEKRON
                </div>
            </PageContent>

            <div className="fixed inset-0 pointer-events-none z-[100] opacity-[0.03]" style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
            }} />
        </UnifiedBackground>
    );
};

export default Sponsors;
