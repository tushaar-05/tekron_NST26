import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { artists, influencers, sponsors, techPanelists } from '../../data/highlightsData';

// --- SPATIAL GLASS COMPONENTS ---

const GlassPill = ({ children, className = "", onClick }) => (
    <div
        onClick={onClick}
        className={`flex items-center gap-3 px-4 py-3 bg-black/40 backdrop-blur-md border border-white/10 rounded-full shadow-lg pointer-events-auto hover:bg-black/60 transition-colors duration-300 cursor-pointer active:scale-95 ${className}`}
    >
        {children}
    </div>
);

// --- MARQUEE UTILS ---
const SeamlessMarquee = ({ children, speed = 40 }) => (
    <div className="overflow-hidden flex gap-4 mask-linear-fade w-full pointer-events-none">
        <motion.div
            className="flex gap-5 shrink-0 items-center"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: speed, ease: "linear", repeat: Infinity }}
        >
            {children}
            {children}
        </motion.div>
    </div>
);

// --- REUSABLE PILL SECTION ---
const CornerPill = ({ title, color, children, widthClass = "w-56 md:w-80", onClick }) => (
    <GlassPill className="!px-3 !py-3 gap-0 hover:scale-105 transition-transform origin-center" onClick={onClick}>
        {/* Label */}
        <div className="flex items-center gap-2 px-3 py-1.5 bg-white/5 rounded-full border border-white/5 mr-3 shrink-0">
            <div className={`w-2 h-2 rounded-full animate-pulse shadow-[0_0_8px_rgba(255,255,255,0.5)] ${color}`} />
            <span className="text-[11px] text-white/60 font-bold tracking-widest uppercase">{title}</span>
        </div>

        {/* Marquee Content */}
        <div className={`${widthClass} overflow-hidden h-10 flex items-center relative mask-fade-sides`}>
            {children}
        </div>
    </GlassPill>
);

const Chip = ({ image, name, role }) => (
    <div className="flex items-center gap-3 shrink-0 group cursor-pointer pr-4">
        <div className="w-8 h-8 rounded-full p-[1px] bg-gradient-to-tr from-white/20 to-white/5 relative overflow-hidden">
            <img src={image} alt="" className="w-full h-full rounded-full object-cover" />
        </div>
        <div className="flex flex-col">
            <span className="text-xs font-bold text-white/90 group-hover:text-cyan-400 transition-colors whitespace-nowrap">{name}</span>
            {role && <span className="text-[10px] text-white/40 uppercase tracking-wider hidden sm:block">{role}</span>}
        </div>
    </div>
);

const MapHighlights = () => {
    const navigate = useNavigate();

    const handleNavigate = (hash) => {
        navigate(`/about${hash}`);
    };

    return (
        <div className="w-full h-full relative font-sans pointer-events-none">

            {/* 1. TOP LEFT: PARTNERS (Sponsors) */}
            <div className="absolute top-20 left-4 md:top-8 md:left-8 z-40">
                <CornerPill
                    title="PARTNERS"
                    color="bg-blue-400"
                    widthClass="w-48 md:w-72"
                    onClick={() => handleNavigate('#partners')}
                >
                    <SeamlessMarquee speed={40}>
                        {sponsors.map((sponsor, idx) => (
                            <img
                                key={idx}
                                src={sponsor.image}
                                alt={sponsor.name}
                                className="h-6 w-auto object-contain mx-3"
                            />
                        ))}
                    </SeamlessMarquee>
                </CornerPill>
            </div>

            {/* 2. TOP RIGHT: TECH PANEL */}
            <div className="absolute top-20 right-4 md:top-8 md:right-8 z-40 flex justify-end">
                <CornerPill
                    title="TECH_PANEL"
                    color="bg-cyan-400"
                    widthClass="w-40 md:w-64"
                    onClick={() => handleNavigate('#tech-panel')}
                >
                    <SeamlessMarquee speed={35}>
                        {techPanelists.map((person, idx) => (
                            <Chip key={idx} image={person.image} name={person.name} role={person.role} />
                        ))}
                    </SeamlessMarquee>
                </CornerPill>
            </div>

            {/* 3. BOTTOM LEFT: INFLUENCERS (Special Guests) */}
            <div className="absolute bottom-24 left-4 md:bottom-10 md:left-8 z-40">
                <CornerPill
                    title="INFLUENCERS"
                    color="bg-purple-400"
                    widthClass="w-40 md:w-64"
                    onClick={() => handleNavigate('#influencers')}
                >
                    <SeamlessMarquee speed={30}>
                        {influencers.map((person, idx) => (
                            <Chip key={idx} image={person.image} name={person.name} role={person.role || "Creator"} />
                        ))}
                    </SeamlessMarquee>
                </CornerPill>
            </div>

            {/* 4. BOTTOM RIGHT: ARTISTS (Headliners) */}
            <div className="absolute bottom-24 right-4 md:bottom-10 md:right-8 z-40 flex justify-end">
                <CornerPill
                    title="ARTISTS"
                    color="bg-green-400"
                    widthClass="w-48 md:w-72"
                    onClick={() => handleNavigate('#artists')}
                >
                    <SeamlessMarquee speed={25}>
                        {artists.map((person, idx) => (
                            <Chip key={idx} image={person.image} name={person.name} role={person.role} />
                        ))}
                    </SeamlessMarquee>
                </CornerPill>
            </div>

            <style>{`
                .mask-fade-sides {
                    mask-image: linear-gradient(to right, transparent, black 15%, black 85%, transparent);
                }
            `}</style>

        </div>
    );
};

export default MapHighlights;
