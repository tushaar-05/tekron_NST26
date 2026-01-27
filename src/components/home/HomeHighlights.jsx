import React from 'react';
import { motion } from 'framer-motion';
import { artists, influencers, sponsors, techPanelists } from '../../data/highlightsData';

// --- Shared Components ---
const SectionHeader = ({ title, subtitle }) => (
    <div className="flex flex-col items-center mb-10 text-center">
        <h2 className="text-3xl md:text-5xl font-bold pixel-font text-white mb-2 tracking-wider"
            style={{ textShadow: '0 0 15px rgba(168, 85, 247, 0.5)' }}>
            [{title}]
        </h2>
        <div className="flex items-center gap-4">
            <div className="h-[2px] w-8 bg-cyan-500/50"></div>
            <p className="text-cyan-400 font-mono text-[10px] md:text-xs tracking-[0.2em] uppercase">{subtitle}</p>
            <div className="h-[2px] w-8 bg-cyan-500/50"></div>
        </div>
    </div>
);

// --- 1. Infinite Marquee Component (Moving) ---
const Marquee = ({ children, direction = "left", speed = 20 }) => {
    return (
        <div className="relative flex overflow-hidden w-full group">
            {/* Gradient Masks */}
            <div className="absolute top-0 left-0 w-20 h-full bg-gradient-to-r from-[#0f0a1e] to-transparent z-10 pointer-events-none"></div>
            <div className="absolute top-0 right-0 w-20 h-full bg-gradient-to-l from-[#0f0a1e] to-transparent z-10 pointer-events-none"></div>

            <motion.div
                className="flex gap-8 md:gap-12 shrink-0 py-4"
                animate={{
                    x: direction === "left" ? ["0%", "-50%"] : ["-50%", "0%"]
                }}
                transition={{
                    duration: speed,
                    ease: "linear",
                    repeat: Infinity
                }}
            >
                {children}
                {children} {/* Duplicate for seamless loop */}
            </motion.div>
        </div>
    );
};

// --- 2. Floating Card Component (Bobbing) ---
const FloatingCard = ({ children, delay = 0 }) => (
    <motion.div
        animate={{
            y: [0, -15, 0],
            rotate: [0, 1, -1, 0]
        }}
        transition={{
            duration: 6,
            ease: "easeInOut",
            repeat: Infinity,
            delay: delay
        }}
        className="relative"
    >
        {children}
    </motion.div>
);

const HomeHighlights = () => {
    return (
        <div className="relative z-20 bg-[#0f0a1e] overflow-hidden">
            {/* Gradient Separator */}
            <div className="h-40 bg-gradient-to-b from-transparent to-[#0f0a1e] relative z-20 -mt-40 pointer-events-none"></div>

            <div className="max-w-[1920px] mx-auto py-10 space-y-24">

                {/* 1. ARTISTS MARQUEE (Moving Left) */}
                <section>
                    <SectionHeader title="HEADLINERS" subtitle="LIVE_AUDIO_VISUAL_FEED" />
                    <Marquee speed={25}>
                        {artists.map((artist, idx) => (
                            <div key={idx} className="relative w-64 md:w-80 h-80 md:h-96 shrink-0 group rounded-2xl overflow-hidden border border-white/10 mx-4">
                                <img src={artist.image} alt={artist.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80"></div>
                                <div className="absolute bottom-4 left-4">
                                    <h3 className="text-2xl font-bold text-white pixel-font mb-1">{artist.name}</h3>
                                    <p className="text-cyan-400 font-mono text-xs tracking-widest uppercase">{artist.role}</p>
                                </div>
                                <div className="absolute top-0 right-0 p-2">
                                    <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse shadow-[0_0_10px_#ef4444]"></div>
                                </div>
                            </div>
                        ))}
                    </Marquee>
                </section>

                {/* 2. TECH PANEL & INFLUENCERS (Floating Grid) */}
                <section className="px-4">
                    <SectionHeader title="VISIONARIES" subtitle="TECH_PANEL_&_CREATORS" />
                    <div className="flex flex-wrap justify-center gap-8 md:gap-12 max-w-7xl mx-auto">
                        {[...techPanelists, ...influencers].map((person, idx) => (
                            <FloatingCard key={idx} delay={idx * 0.5}>
                                <div className="w-56 h-72 rounded-xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-sm group hover:border-purple-500/50 transition-colors">
                                    <div className="h-48 w-full overflow-hidden">
                                        <img src={person.image} alt={person.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                                    </div>
                                    <div className="p-4 text-center">
                                        <h4 className="text-white font-bold pixel-font text-lg leading-none mb-2">{person.name}</h4>
                                        <p className="text-purple-300 text-[10px] uppercase font-mono tracking-wider line-clamp-2">{person.role}</p>
                                    </div>
                                </div>
                            </FloatingCard>
                        ))}
                    </div>
                </section>

                {/* 3. SPONSORS MARQUEE (Moving Right) */}
                <section className="pb-20">
                    <SectionHeader title="PARTNERS" subtitle="SYSTEM_POWERED_BY" />
                    <Marquee direction="right" speed={30}>
                        {sponsors.map((sponsor, idx) => (
                            <div
                                key={idx}
                                className="w-40 md:w-52 h-24 bg-white/5 rounded-xl flex items-center justify-center p-6 mx-4 border border-white/5 backdrop-blur-sm hover:bg-white/10 hover:border-cyan-500/30 transition-all duration-300"
                            >
                                <img src={sponsor.image} alt={sponsor.name} className="max-w-full max-h-full object-contain grayscale hover:grayscale-0 transition-all duration-500" />
                            </div>
                        ))}
                    </Marquee>
                </section>

            </div>

            {/* Bottom Fade */}
            <div className="h-32 bg-gradient-to-t from-[#0f0a1e] to-transparent pointer-events-none"></div>
        </div>
    );
};

export default HomeHighlights;
