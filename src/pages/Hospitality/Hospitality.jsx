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
    Download
} from 'lucide-react';

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

            <div className="pt-32 pb-20 px-4 max-w-7xl mx-auto relative z-10 font-['VT323',_monospace]">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-16"
                >
                    <h1 className={`text-6xl md:text-8xl font-black tracking-tighter mb-4 text-white ${glitchActive ? 'glitch-text' : ''}`}>
                        HOSPITALITY_CENTER
                    </h1>
                    <div className="flex flex-col items-center gap-6">
                        <div className="flex items-center justify-center gap-4 text-cyan-400/80 text-xl tracking-[0.5em] uppercase">
                            <span>Logistics</span>
                            <span className="animate-pulse">●</span>
                            <span>Support</span>
                        </div>
                    </div>
                </motion.div>

                {/* Main Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {sections.map((section, idx) => (
                        <motion.div
                            key={section.id}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className="bg-black/40 backdrop-blur-xl border border-white/10 p-8 relative overflow-hidden group hover:border-white/20 transition-all"
                            style={{
                                clipPath: 'polygon(0 0, calc(100% - 20px) 0, 100% 20px, 100% 100%, 20px 100%, 0 calc(100% - 20px))'
                            }}
                        >
                            {/* Decorative Background */}
                            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                {section.icon}
                            </div>

                            <div className="flex items-center gap-4 mb-8">
                                <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                                    {section.icon}
                                </div>
                                <h2 className="text-3xl font-bold text-white tracking-widest" style={{ color: section.color }}>
                                    {section.title}
                                </h2>
                            </div>

                            <div className="space-y-6">
                                {section.content.map((item, i) => (
                                    <div key={i} className="border-l-2 pl-4 py-1" style={{ borderColor: `${section.color}44` }}>
                                        <div className="flex justify-between items-start mb-1">
                                            <h3 className="text-xl text-white font-bold">{item.name}</h3>
                                            {item.link && (
                                                <a href={item.link} target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:text-white transition-colors">
                                                    <ExternalLink className="w-5 h-5" />
                                                </a>
                                            )}
                                        </div>
                                        <p className="text-gray-400 text-lg leading-tight mb-2">
                                            {item.detail}
                                        </p>
                                        {item.status && (
                                            <span className="text-[10px] px-2 py-0.5 border rounded uppercase tracking-widest text-white/60" style={{ borderColor: `${section.color}44` }}>
                                                {item.status}
                                            </span>
                                        )}
                                    </div>
                                ))}
                            </div>

                            {/* Corner Accent */}
                            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 opacity-30" style={{ borderColor: section.color }} />
                        </motion.div>
                    ))}
                </div>

                {/* Redesigned Contact Section */}
                <div className="mt-32 relative py-20 overflow-hidden">
                    {/* Background Decorations */}
                    <div className="absolute inset-0 pointer-events-none">
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[120px] opacity-30" />
                        <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-purple-500/5 rounded-full blur-[100px] opacity-20" />
                    </div>

                    <div className="max-w-6xl mx-auto px-6 relative z-10">
                        <div className="text-center md:text-left mb-16">
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                            >
                                <span className="text-[10px] pixel-font tracking-widest uppercase mb-4 block text-cyan-400">CONTACT_US</span>
                                <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-white tracking-tighter leading-tight mt-4">
                                    Connect With <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400">Us</span>
                                </h2>
                            </motion.div>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
                            {/* Left Column: Details */}
                            <div className="lg:col-span-8 order-2 lg:order-1">
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    className="space-y-10"
                                >
                                    <div className="space-y-4">
                                        <div className="inline-flex items-center gap-3 px-4 py-2 bg-white/5 border border-white/10 rounded-full">
                                            <div className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse shadow-[0_0_10px_#06b6d4]" />
                                            <span className="text-xs font-mono text-cyan-200 uppercase tracking-widest font-bold">Hospitality Head</span>
                                        </div>
                                        <h3 className="text-4xl sm:text-6xl font-bold text-white tracking-tight">Ayush Shukla</h3>
                                        <p className="text-white/40 font-mono text-sm sm:text-base max-w-lg leading-relaxed">
                                            For inquiries regarding on-campus logistics, accommodation requests, and transportation support for TEKRON 2.0.
                                        </p>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                                        <a href="tel:+917875393239" className="group space-y-2">
                                            <div className="text-[10px] font-mono text-white/30 uppercase tracking-[0.2em]">Live Support</div>
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-cyan-500/50 group-hover:bg-cyan-500/5 transition-all duration-300">
                                                    <Phone className="w-5 h-5 text-cyan-400" />
                                                </div>
                                                <span className="text-xl font-mono text-white group-hover:text-cyan-300 transition-colors">+91 78753 93239</span>
                                            </div>
                                        </a>
                                        <a href="mailto:ayush.shukla@adypu.edu.in" className="group space-y-2">
                                            <div className="text-[10px] font-mono text-white/30 uppercase tracking-[0.2em]">Secure Email</div>
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-purple-500/50 group-hover:bg-purple-500/5 transition-all duration-300">
                                                    <Mail className="w-5 h-5 text-purple-400" />
                                                </div>
                                                <span className="text-lg sm:text-xl font-mono text-white group-hover:text-purple-300 transition-colors break-all">ayush.shukla@adypu.edu.in</span>
                                            </div>
                                        </a>
                                    </div>

                                    <div className="flex flex-col sm:flex-row gap-6 pt-6">
                                        <motion.a
                                            whileHover={{ scale: 1.05, y: -2 }}
                                            whileTap={{ scale: 0.98 }}
                                            href="/transportation.pdf"
                                            download="transportation.pdf"
                                            className="px-10 py-5 bg-white text-black font-bold pixel-font text-xs flex items-center justify-center gap-3 shadow-[8px_8px_0px_#06b6d4] hover:shadow-none transition-all"
                                        >
                                            <Download className="w-4 h-4" /> DOWNLOAD BROCHURE
                                        </motion.a>
                                    </div>
                                </motion.div>
                            </div>

                            {/* Right Column: Image */}
                            <div className="lg:col-span-4 order-1 lg:order-2">
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    className="relative group max-w-sm mx-auto"
                                >
                                    <div className="absolute -inset-3 border border-white/5 rounded-[32px] pointer-events-none" />
                                    <div className="absolute -inset-6 border border-white/5 rounded-[48px] pointer-events-none opacity-50" />

                                    <div className="relative aspect-[4/5] overflow-hidden rounded-[24px] border-2 border-white/10 bg-black/40">
                                        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10" />
                                        <img
                                            src="/images/team/ayush.jpg"
                                            alt="Ayush Shukla"
                                            className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                                            style={{ objectPosition: 'center', transform: 'scale(1.25)' }}
                                        />

                                        {/* HUD Corner Accents */}
                                        <div className="absolute top-4 left-4 w-10 h-10 border-t-2 border-l-2 border-cyan-500/50 rounded-tl-lg z-20" />
                                        <div className="absolute bottom-4 right-4 w-10 h-10 border-b-2 border-r-2 border-purple-500/50 rounded-br-lg z-20" />
                                    </div>

                                    {/* Status Badge */}
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
                </div>
            </div>

            <Footer />

            <style jsx>{`
                .glitch-text {
                    position: relative;
                    text-shadow: 2px 0 #ff00ff, -2px 0 #00ffff;
                }
            `}</style>
        </UnifiedBackground>
    );
};

export default Hospitality;
