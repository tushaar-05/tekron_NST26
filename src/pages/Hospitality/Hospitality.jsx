import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import UnifiedBackground from '../../components/layout/UnifiedBackground';
import MiniNavbar from '../../components/layout/MiniNavbar';
import Footer from '../../components/layout/Footer';
import {
    MapPin,
    Home,
    Coffee,
    ShieldAlert,
    ExternalLink,
    Phone,
    Mail,
    Download,
    Utensils
} from 'lucide-react';

const foodCourtStalls = [
    { name: 'BOM Cafe', logo: '/images/foodcourt/bom_cafe.png' },
    { name: 'Taco Bell', logo: '/images/foodcourt/taco_bell.png' },
    { name: 'House of Ice Cream', logo: '/images/foodcourt/house_of_icecream.png' },
    { name: 'Maanshh Chowrangi', logo: '/images/foodcourt/maanshh_chowrangi.jpg' },
    { name: 'AaniyouU', logo: '/images/foodcourt/aaniyou_u.jpg' }
];

const Hospitality = () => {
    const [glitchActive, setGlitchActive] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setGlitchActive(true);
            setTimeout(() => setGlitchActive(false), 200);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    const sections = [
        {
            id: 'accommodation',
            title: 'ACCOMMODATIONS',
            icon: <Home className="w-8 h-8 text-cyan-400" />,
            color: '#22d3ee',
            bgGradient: 'from-cyan-500/10 to-transparent',
            content: [
                {
                    name: 'Aditya Rooms and PGs',
                    detail: 'Near Porwal Road, Lohegaon, D Y Patil University, Pune, Maharashtra 411047.',
                    status: '800m from ADYPU'
                },
                {
                    name: 'Happy Palace Hotels',
                    detail: 'Lane No. 3, Nimbalkar Nagar, DY Patil Road, Pune, Maharashtra 411047.',
                    status: '1000m from ADYPU'
                },
                {
                    name: 'Master HomeStay',
                    detail: 'Lane No. 9, Nimbalkar Nagar, DY Patil Road, Pune, Maharashtra 411047.',
                    status: '1200m from ADYPU'
                }
            ]
        },
        {
            id: 'travel',
            title: 'TRANSPORTATION ROUTES',
            icon: <MapPin className="w-8 h-8 text-purple-400" />,
            color: '#a855f7',
            bgGradient: 'from-purple-500/10 to-transparent',
            content: [
                {
                    name: 'Pune Junction (PUNE)',
                    detail: 'Distance: ~13km | Est. Time: ~1 hour. Use: Uber, Ola, Rapido.',
                },
                {
                    name: 'Pune Airport (PNQ)',
                    detail: 'Distance: ~6km | Est. Time: ~30 mins. Use: Uber, Ola, Auto, Rapido.',
                },
                {
                    name: 'Sangamwadi Bus Station',
                    detail: 'Distance: ~6km | Est. Time: ~30 mins. Use: Uber, Ola, Auto, Rapido.',
                },
                {
                    name: 'Swargate Bus Station',
                    detail: 'Distance: ~20km | Est. Time: ~1.5 hours. Use: Uber, Ola, Auto, Rapido.',
                }
            ]
        },
        {
            id: 'food',
            title: 'FOOD & DINING',
            icon: <Coffee className="w-8 h-8 text-pink-400" />,
            color: '#ec4899',
            bgGradient: 'from-pink-500/10 to-transparent',
            content: [
                {
                    name: 'Main Cafeteria',
                    detail: 'ADYPU Campus Cafeteria - Meals served 8:00 AM - 9:00 PM.',
                },
                {
                    name: 'TEKRON Food Court',
                    detail: 'Exclusive event food stalls with diverse cuisines.',
                }
            ]
        },
        {
            id: 'guidelines',
            title: 'CAMPUS GUIDELINES',
            icon: <ShieldAlert className="w-8 h-8 text-yellow-400" />,
            color: '#fbbf24',
            bgGradient: 'from-yellow-500/10 to-transparent',
            content: [
                {
                    name: 'ID Requirement',
                    detail: 'Carry TEKRON Digital Pass and College ID at all times.',
                },
                {
                    name: 'Safety & Decorum',
                    detail: 'Follow University safety rules and maintain campus decorum.',
                }
            ]
        }
    ];

    return (
        <UnifiedBackground>
            <MiniNavbar />

            {/* Background Texture Overlay for Tech Feel */}
            <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-0"
                style={{ backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
            </div>

            <div className="pt-32 pb-20 px-4 max-w-7xl mx-auto relative z-10 font-['VT323',_monospace]">

                {/* Header Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-20 relative"
                >
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-cyan-500/20 blur-[100px] rounded-full opacity-20 pointer-events-none"></div>

                    <h1 className={`text-6xl md:text-9xl font-black tracking-tighter mb-6 text-white relative z-10 ${glitchActive ? 'glitch-text' : ''}`} data-text="HOSPITALITY_CENTER">
                        HOSPITALITY_CENTER
                    </h1>

                    <div className="flex flex-col items-center gap-6 relative z-10">
                        <div className="flex items-center justify-center gap-4 text-cyan-400/80 text-xl tracking-[0.5em] uppercase bg-black/40 backdrop-blur-sm border border-cyan-500/30 py-2 px-6 rounded-full inline-flex">
                            <span className="animate-pulse">●</span>
                            <span>Logistics & Support Hub</span>
                            <span className="animate-pulse">●</span>
                        </div>
                    </div>
                </motion.div>

                {/* Main Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-32">
                    {sections.map((section, idx) => (
                        <motion.div
                            key={section.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1, duration: 0.5 }}
                            className="bg-[#0f0f13]/80 backdrop-blur-xl border border-white/5 relative overflow-hidden group hover:border-white/20 transition-all duration-500 rounded-3xl"
                        >
                            {/* Card Header Background Gradient */}
                            <div className={`absolute top-0 left-0 w-full h-32 bg-gradient-to-b ${section.bgGradient} opacity-10 pointer-events-none transition-opacity duration-500 group-hover:opacity-30`} />

                            <div className="p-8 relative z-10">
                                <div className="flex items-center gap-6 mb-8">
                                    <div className="p-4 rounded-2xl bg-black/40 border border-white/10 group-hover:scale-110 transition-transform duration-300 shadow-[0_0_20px_rgba(0,0,0,0.5)] relative overflow-hidden">
                                        <div className="absolute inset-0 opacity-20 bg-current blur-xl" style={{ color: section.color }}></div>
                                        <div className="relative z-10">
                                            {React.cloneElement(section.icon, { className: "w-10 h-10", style: { color: section.color } })}
                                        </div>
                                    </div>
                                    <h2 className="text-4xl font-bold text-white tracking-widest font-['VT323'] uppercase drop-shadow-md">
                                        {section.title}
                                    </h2>
                                </div>

                                <div className="space-y-4">
                                    {section.content.map((item, i) => (
                                        <div
                                            key={i}
                                            className="bg-white/5 border border-white/5 hover:bg-white/10 hover:border-white/20 transition-all duration-300 rounded-xl p-5 relative group/item"
                                        >
                                            <div className="absolute left-0 top-0 bottom-0 w-1 rounded-l-xl transition-all duration-300 group-hover/item:bg-opacity-100 bg-opacity-0" style={{ backgroundColor: section.color }}></div>

                                            <div className="flex justify-between items-start mb-2 pl-2">
                                                <h3 className="text-xl text-white font-bold tracking-wide group-hover/item:text-cyan-200 transition-colors font-['VT323'] leading-relaxed uppercase">{item.name}</h3>
                                                {item.link && (
                                                    <a href={item.link} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-cyan-400 transition-colors">
                                                        <ExternalLink className="w-4 h-4" />
                                                    </a>
                                                )}
                                            </div>
                                            <p className="text-gray-400 text-lg leading-relaxed pl-2 group-hover/item:text-gray-300 transition-colors font-['VT323'] tracking-wide">
                                                {item.detail}
                                            </p>
                                            {item.status && (
                                                <div className="mt-3 pl-2">
                                                    <span className="text-base px-3 py-1.5 border rounded-md uppercase tracking-widest text-white/80 font-bold bg-black/30 font-['VT323']" style={{ borderColor: `${section.color}44`, color: section.color }}>
                                                        {item.status}
                                                    </span>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Tekron Food Court Marquee Section */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-32 relative overflow-hidden"
                >
                    <div className="flex items-center gap-6 mb-12">
                        <h2 className="text-2xl sm:text-4xl font-bold pixel-font text-white whitespace-nowrap">
                            [ TEKRON_FOOD_COURT ]
                        </h2>
                        <div className="h-[1px] flex-1 bg-white/10" />
                    </div>

                    <div className="relative group">
                        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#0a0a0c] to-transparent z-10" />
                        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#0a0a0c] to-transparent z-10" />

                        <div className="marquee-container flex gap-8 py-8 items-center overflow-hidden">
                            <div className="marquee-content flex gap-8 items-center animate-marquee">
                                {[...foodCourtStalls, ...foodCourtStalls].map((stall, idx) => (
                                    <div
                                        key={idx}
                                        className="min-w-[250px] h-40 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 flex items-center justify-center group/stall hover:border-cyan-500/50 transition-all duration-500"
                                    >
                                        <img
                                            src={stall.logo}
                                            alt={stall.name}
                                            className="max-w-full max-h-full object-contain transition-all duration-500 transform group-hover/stall:scale-110"
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Refined Contact Section - Matching Reference */}
                <div className="relative py-20 pb-40">
                    <div className="max-w-7xl mx-auto px-4">
                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="bg-[#120822]/80 backdrop-blur-2xl border border-white/10 rounded-[3rem] p-6 md:p-14 relative overflow-hidden group shadow-2xl"
                        >
                            {/* Ambient Glow */}
                            <div className="absolute top-0 right-0 w-[450px] h-[450px] bg-purple-600/20 blur-[100px] rounded-full pointer-events-none -translate-y-1/2 translate-x-1/2 opacity-50"></div>
                            <div className="absolute bottom-0 left-0 w-[450px] h-[450px] bg-cyan-600/10 blur-[100px] rounded-full pointer-events-none translate-y-1/2 -translate-x-1/2 opacity-50"></div>

                            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-12 md:gap-20 relative z-10">

                                {/* Text Content */}
                                <div className="flex-1 w-full space-y-8">
                                    <div>
                                        <motion.div
                                            initial={{ opacity: 0, x: -20 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 0.2 }}
                                            className="text-cyan-400 text-xs font-bold tracking-widest mb-4 font-mono uppercase pl-1"
                                        >
                                            Contact_Us
                                        </motion.div>
                                        <h2 className={`text-5xl sm:text-6xl md:text-7xl font-black text-white tracking-normal mb-6 font-['VT323'] leading-[0.8] ${glitchActive ? 'glitch-text' : ''}`} data-text="Connect With Us">
                                            Connect With <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400">Us</span>
                                        </h2>

                                        <div className="inline-flex items-center gap-3 px-4 py-2 bg-white/5 border border-white/10 rounded-full mb-6 relative group cursor-default hover:bg-white/10 transition-colors">
                                            <div className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_10px_#22d3ee] animate-pulse"></div>
                                            <span className="text-[10px] font-bold text-cyan-300 uppercase tracking-[0.2em] font-mono">Hospitality Head</span>
                                        </div>

                                        <h3 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white tracking-wide mb-5 font-['VT323'] uppercase">
                                            Ayush Shukla
                                        </h3>

                                        <p className="text-lg text-gray-400 max-w-lg leading-relaxed font-mono pl-1">
                                            For inquiries regarding on-campus logistics, accommodation requests, and transportation support for TEKRON 2.0.
                                        </p>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
                                        <div className="space-y-2 group">
                                            <div className="text-[9px] uppercase text-gray-500 tracking-[0.2em] font-bold font-mono group-hover:text-cyan-400 transition-colors">Live Support</div>
                                            <a href="tel:+917875393239" className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-cyan-400 group-hover:bg-cyan-500 group-hover:text-black group-hover:scale-110 transition-all duration-300">
                                                    <Phone className="w-4 h-4" />
                                                </div>
                                                <span className="text-lg text-white font-mono font-bold tracking-wide group-hover:text-cyan-300 transition-colors">+91 78753 93239</span>
                                            </a>
                                        </div>

                                        <div className="space-y-2 group">
                                            <div className="text-[9px] uppercase text-gray-500 tracking-[0.2em] font-bold font-mono group-hover:text-purple-400 transition-colors">Secure Email</div>
                                            <a href="mailto:ayush.shukla@adypu.edu.in" className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-purple-400 group-hover:bg-purple-500 group-hover:text-black group-hover:scale-110 transition-all duration-300 shrink-0">
                                                    <Mail className="w-4 h-4" />
                                                </div>
                                                <span className="text-sm sm:text-base text-white font-mono font-bold tracking-wide break-words group-hover:text-purple-300 transition-colors">ayush.shukla@adypu.edu.in</span>
                                            </a>
                                        </div>
                                    </div>

                                    <div className="pt-6">
                                        <motion.a
                                            whileHover={{ scale: 1.05, y: -2 }}
                                            whileTap={{ scale: 0.98 }}
                                            href="/transportation.pdf"
                                            download="transportation.pdf"
                                            className="px-10 py-5 bg-white text-black font-bold pixel-font text-[10px] sm:text-xs flex items-center justify-center gap-3 shadow-[8px_8px_0px_#06b6d4] hover:shadow-none transition-all tracking-widest uppercase"
                                        >
                                            <Download className="w-4 h-4" /> DOWNLOAD BROCHURE
                                        </motion.a>
                                    </div>
                                </div>

                                {/* Image Profile - Framed */}
                                <div className="w-full max-w-sm lg:w-[460px] shrink-0 relative lg:pt-8">
                                    <div className="relative aspect-[4/5] w-full group">
                                        {/* Stylized Corners - Now Interactive */}
                                        <div className="absolute -top-2 -left-2 w-8 h-8 border-t-2 border-l-2 border-cyan-500 rounded-tl-2xl z-20 transition-all duration-500 opacity-0 group-hover:opacity-100 group-hover:-top-3 group-hover:-left-3 transform-gpu"></div>
                                        <div className="absolute -bottom-2 -right-2 w-8 h-8 border-b-2 border-r-2 border-purple-500 rounded-br-2xl z-20 transition-all duration-500 opacity-0 group-hover:opacity-100 group-hover:-bottom-3 group-hover:-right-3 transform-gpu"></div>

                                        {/* Image Container */}
                                        <div className="w-full h-full rounded-[1.5rem] overflow-hidden relative shadow-2xl border border-white/5 bg-black transition-all duration-500 group-hover:shadow-[0_0_30px_rgba(34,211,238,0.2)]">
                                            <div className="absolute inset-0 border border-white/10 rounded-[1.5rem] z-20 pointer-events-none"></div>
                                            <img
                                                src="/images/team/ayush.jpg"
                                                alt="Ayush Shukla"
                                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                            />

                                            {/* Gradient Overlay */}
                                            <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-[#120822] via-transparent to-transparent opacity-80"></div>

                                            {/* Status Badge */}
                                            <div className="absolute bottom-5 right-5 z-30 flex items-center gap-3 bg-black/90 backdrop-blur-md px-3 py-2 rounded-lg border border-white/10 max-w-fit shadow-lg group-hover:border-green-500/50 transition-colors">
                                                <div className="flex flex-col items-end">
                                                    <span className="text-[8px] text-gray-500 font-bold uppercase tracking-widest leading-none mb-0.5">Status</span>
                                                    <div className="flex items-center gap-2">
                                                        <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_#22c55e]"></div>
                                                        <span className="text-[10px] font-bold text-white tracking-widest font-mono">AVAILABLE</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>

            </div>

            <Footer />

            <style jsx>{`
                .glitch-text {
                    position: relative;
                }
                .glitch-text::before,
                .glitch-text::after {
                    content: attr(data-text);
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    opacity: 0.8;
                }
                .glitch-text::before {
                    left: 2px;
                    text-shadow: -1px 0 #ff00c1;
                    clip: rect(44px, 450px, 56px, 0);
                    animation: glitch-anim 5s infinite linear alternate-reverse;
                }
                .glitch-text::after {
                    left: -2px;
                    text-shadow: -1px 0 #00fff9;
                    clip: rect(44px, 450px, 56px, 0);
                    animation: glitch-anim 5s infinite linear alternate-reverse;
                }
                @keyframes glitch-anim {
                    0% {
                        clip: rect(51px, 9999px, 83px, 0);
                    }
                    20% {
                        clip: rect(72px, 9999px, 87px, 0);
                    }
                    40% {
                        clip: rect(62px, 9999px, 89px, 0);
                    }
                    60% {
                        clip: rect(3px, 9999px, 47px, 0);
                    }
                    80% {
                        clip: rect(100px, 9999px, 83px, 0);
                    }
                    100% {
                        clip: rect(78px, 9999px, 7px, 0);
                    }
                }

                .animate-marquee {
                    display: flex;
                    width: max-content;
                    animation: marquee 30s linear infinite;
                }

                @keyframes marquee {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }

                .marquee-container:hover .animate-marquee {
                    animation-play-state: paused;
                }
            `}</style>
        </UnifiedBackground>
    );
};

export default Hospitality;
