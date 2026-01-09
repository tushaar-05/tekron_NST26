
import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import UnifiedBackground from '../../components/layout/UnifiedBackground';
import MiniNavbar from '../../components/layout/MiniNavbar';

function Contact() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });



    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const [status, setStatus] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('sending');

        try {
            const response = await fetch("https://formspree.io/f/xpqzlorj", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                setStatus('success');
                setFormData({ name: '', email: '', subject: '', message: '' });
                alert('Thank you! Your message has been sent successfully.');
            } else {
                setStatus('error');
                alert('Oops! There was a problem sending your message. Please try again.');
            }
        } catch (error) {
            setStatus('error');
            alert('Error: Could not send message. Please check your internet connection.');
        }

        setStatus('');
    };

    const coordinators = [
        { role: 'Tech. Head', name: 'Ved Bhadani', phone: '+91 95467 85861', email: 'ved.bhadani@adypu.edu.in', image: '/images/team/ved.jpg', id: 'OP-01' },
        { role: 'Hospitality Head', name: 'Ayush Shukla', phone: '+91 78753 93239', email: 'ayush.shukla@adypu.edu.in', image: '/images/team/ayush.jpg', id: 'OP-02' },
        { role: 'Sponsorship Head', name: 'Harshit Jain', phone: '+91 74278 87050', email: 'harshit.jain@adypu.edu.in', image: '/images/committee/harshit_jain.jpg', id: 'OP-03' },
        { role: 'Marketing Head', name: 'Vamshi Krishna Pendyala', phone: '+91 91215 07280', email: 'vamshikrishna.pendyala@adypu.edu.in', image: '/images/committee/Vamshi.jpg', id: 'OP-04' },
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { type: "spring", stiffness: 50 }
        }
    };

    return (
        <UnifiedBackground>
            <div className="text-white min-h-screen pt-24 pb-12 px-4 md:px-8 overflow-hidden relative font-['VT323',_monospace]">

                {/* Back Button */}
                <MiniNavbar />

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="max-w-7xl mx-auto space-y-24 relative z-10"
                >

                    {/* Hero Header */}
                    <motion.div variants={itemVariants} className="text-center space-y-2 relative">
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-32 bg-purple-500/5 blur-[100px] pointer-events-none" />
                        <h1 className="text-7xl md:text-9xl font-black tracking-tighter glitch-text-pixel text-white drop-shadow-[0_0_10px_rgba(168,85,247,0.5)]" data-text="CONTACT_US">
                            CONTACT_US
                        </h1>
                        <div className="flex items-center justify-center gap-4 text-cyan-400/80 text-xl tracking-[0.5em] uppercase">
                            <span>System</span>
                            <span className="animate-pulse">●</span>
                            <span>Listening</span>
                        </div>
                    </motion.div>

                    {/* 1. NEW Communication Console (Unified Dashboard) */}
                    <motion.div
                        variants={itemVariants}
                        className="relative w-full bg-black/40 border border-white/10 backdrop-blur-xl overflow-hidden"
                        style={{ clipPath: "polygon(20px 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%, 0 20px)" }}
                    >
                        {/* Status Bar */}
                        <div className="flex items-center justify-between px-6 py-3 bg-black/80 border-b border-cyan-500/20 text-xs font-mono tracking-widest relative">
                            {/* Bg Scanline */}
                            <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_0%,rgba(6,182,212,0.05)_50%,transparent_100%)] w-full animate-shimmer pointer-events-none" />

                            <div className="flex items-center gap-6 relative z-10">
                                <span className="text-cyan-400 font-bold flex items-center gap-2">
                                    <span className="text-cyan-600 opacity-50">///</span>
                                    COMMS_CONSOLE_V3
                                </span>
                                <span className="flex items-center gap-2 text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                                    <span className="relative flex h-2 w-2">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                                    </span>
                                    SYSTEM_ONLINE
                                </span>
                            </div>

                            <div className="flex items-center gap-4 relative z-10 text-[10px] text-cyan-600/60 hidden md:flex">
                                <span>ENCRYPTION: AES-256</span>
                                <span>|</span>
                                <span>LATENCY: <span className="text-cyan-400">12ms</span></span>
                            </div>

                            <div className="flex gap-1 relative z-10">
                                {[...Array(8)].map((_, i) => (
                                    <div
                                        key={i}
                                        className={`w-1 h-4 transition-all duration-300 ${i < 6 ? 'bg-cyan-500 shadow-[0_0_5px_rgba(6,182,212,0.5)]' : 'bg-cyan-900/30'}`}
                                    />
                                ))}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2">
                            {/* Email Sector */}
                            <div className="p-8 border-b md:border-b-0 md:border-r border-white/10 relative group">
                                <div className="absolute top-0 left-0 w-full h-full bg-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                                <div className="flex items-start justify-between mb-8">
                                    <div>
                                        <h3 className="text-2xl text-white font-bold tracking-tight mb-1">PRIMARY_UPLINK</h3>
                                        <p className="text-indigo-400 text-xs font-mono">ENCRYPTED_CHANNEL</p>
                                    </div>
                                    <div className="p-3 bg-indigo-500/10 border border-indigo-500/30 rounded-lg group-hover:bg-indigo-500/20 transition-colors">
                                        <svg className="w-6 h-6 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                </div>

                                <div className="bg-black/40 border border-white/10 p-4 relative overflow-hidden hover:border-indigo-500/50 transition-colors group/input">
                                    <div className="flex items-center gap-3">
                                        <span className="text-indigo-500 font-mono text-lg animate-pulse">{`>`}</span>
                                        <a href="mailto:tekronfest@newtonschool.co" className="text-white/80 font-mono text-lg hover:text-white transition-colors truncate">
                                            tekronfest@newtonschool.co
                                        </a>
                                    </div>
                                    {/* Copy Feedback/Icon could go here */}
                                </div>
                                <div className="mt-4 flex gap-4 text-[10px] text-white/30 font-mono">
                                    <span>LATENCY: 12ms</span>
                                    <span>PACKET_LOSS: 0%</span>
                                </div>
                            </div>

                            {/* Helpline Sector */}
                            <div className="p-8 relative group">
                                <div className="absolute top-0 right-0 w-full h-full bg-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                                <div className="flex items-start justify-between mb-8">
                                    <div>
                                        <h3 className="text-2xl text-white font-bold tracking-tight mb-1">EMERGENCY_FREQ</h3>
                                        <p className="text-pink-400 text-xs font-mono">PRIORITY_LINES_OPEN</p>
                                    </div>
                                    <div className="p-3 bg-pink-500/10 border border-pink-500/30 rounded-lg group-hover:bg-pink-500/20 transition-colors">
                                        <svg className="w-6 h-6 text-pink-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                        </svg>
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <div className="flex items-center justify-between p-3 bg-white/5 border border-white/5 hover:border-pink-500/30 hover:bg-pink-500/10 transition-all cursor-pointer group/line">
                                        <div className="flex items-center gap-3">
                                            <div className="w-1.5 h-1.5 bg-pink-500/30 group-hover/line:bg-pink-400 rounded-full transition-colors" />
                                            <span className="text-white/60 group-hover/line:text-white font-mono text-sm transition-colors">NIHAL_C</span>
                                        </div>
                                        <a href="tel:+916282500918" className="text-white font-mono tracking-wider hover:text-pink-300 transition-colors">+91 62825 00918</a>
                                    </div>
                                    <div className="flex items-center justify-between p-3 bg-white/5 border border-white/5 hover:border-pink-500/30 hover:bg-pink-500/10 transition-all cursor-pointer group/line">
                                        <div className="flex items-center gap-3">
                                            <div className="w-1.5 h-1.5 bg-pink-500/30 group-hover/line:bg-pink-400 rounded-full transition-colors" />
                                            <span className="text-white/60 group-hover/line:text-white font-mono text-sm transition-colors">AYUSH_S</span>
                                        </div>
                                        <a href="tel:+917875393239" className="text-white font-mono tracking-wider hover:text-pink-300 transition-colors">+91 78753 93239</a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Decorative Scanner */}
                        <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent opacity-50 scanner-bar" />
                    </motion.div>

                    {/* 2. Personnel Manifest (Team) */}
                    <motion.div variants={itemVariants} className="space-y-12">
                        <div className="flex items-end gap-4 border-b border-white/10 pb-4">
                            <h2 className="text-6xl text-white tracking-[0.2em] uppercase">
                                <span className="text-purple-400 mr-2">/</span>Core_Personnel
                            </h2>
                            <span className="text-white/30 text-lg mb-1">directory_v2.4</span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {coordinators.map((member, index) => (
                                <motion.div
                                    key={index}
                                    whileHover={{ y: -5 }}
                                    className="bg-black/40 border border-white/10 hover:border-purple-500/50 transition-all group overflow-hidden relative"
                                >
                                    {/* ID Tag */}
                                    <div className="absolute top-2 right-2 text-[10px] text-white/30 font-mono border border-white/10 px-1">
                                        {member.id}
                                    </div>

                                    <div className="aspect-square w-full bg-slate-900 relative overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-500">
                                        <div className="absolute inset-0 bg-[linear-gradient(transparent_2px,rgba(0,0,0,0.5)_3px)] bg-[size:100%_4px] pointer-events-none z-10 opacity-30" />
                                        {member.image ? (
                                            <img
                                                src={member.image}
                                                alt={member.name}
                                                className="w-full h-full object-cover"
                                                loading="lazy"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-4xl text-white/10">N/A</div>
                                        )}
                                        {/* Overlay readout */}
                                        <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/90 to-transparent p-4 pt-12 z-20">
                                            <p className="text-purple-400 text-xs uppercase tracking-widest mb-1">{member.role}</p>
                                            <h3 className="text-xl text-white leading-tight uppercase">{member.name}</h3>
                                        </div>
                                    </div>

                                    <div className="p-4 space-y-3 bg-white/5 border-t border-white/10 text-base">
                                        <div className="flex items-center gap-3 text-gray-400 group-hover:text-purple-300 transition-colors">
                                            <span className="text-xl">📞</span> <a href={`tel:${member.phone}`} className="tracking-wider">{member.phone}</a>
                                        </div>
                                        <div className="flex items-center gap-3 text-gray-400 group-hover:text-purple-300 transition-colors truncate">
                                            <span className="text-xl">✉️</span> <a href={`mailto:${member.email}`} title={member.email} className="tracking-wider">{member.email}</a>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* 3. Venue & Form Section (Combined) */}
                    <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">

                        {/* Venue / Map Terminal */}
                        <div className="flex flex-col gap-6">
                            <div className="bg-white/5 border border-white/10 p-8 relative overflow-hidden group">
                                <div className="absolute top-0 right-0 w-24 h-24 bg-purple-500/10 blur-2xl rounded-full" />
                                <h3 className="text-2xl text-purple-300 uppercase tracking-widest mb-4">Target_Location</h3>
                                <p className="text-4xl text-white mb-2">Ajeenkya DY Patil University</p>
                                <p className="text-xl text-gray-400">Charholi Budruk, via Lohegaon, Pune - 412105</p>
                                <div className="mt-6 flex gap-4 text-sm font-mono text-gray-500">
                                    <div className="flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10">
                                        <span className="w-1.5 h-1.5 bg-green-500 rounded-full" /> SECTOR_04
                                    </div>
                                    <div className="flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10">
                                        <span className="w-1.5 h-1.5 bg-yellow-500 rounded-full" /> NST_BLDG
                                    </div>
                                </div>
                            </div>

                            {/* Actual Map Container */}
                            <div className="flex-1 min-h-[400px] border-2 border-white/10 bg-black/50 relative overflow-hidden shadow-[0_0_30px_rgba(0,0,0,0.5)]">
                                {/* Corner Markers */}
                                <div className="absolute top-0 left-0 w-4 h-4 border-l-2 border-t-2 border-purple-500 z-20" />
                                <div className="absolute top-0 right-0 w-4 h-4 border-r-2 border-t-2 border-purple-500 z-20" />
                                <div className="absolute bottom-0 left-0 w-4 h-4 border-l-2 border-b-2 border-purple-500 z-20" />
                                <div className="absolute bottom-0 right-0 w-4 h-4 border-r-2 border-b-2 border-purple-500 z-20" />

                                <motion.iframe
                                    key="map"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 1 }}
                                    src="https://maps.google.com/maps?width=100%25&height=600&hl=en&q=Ajeenkya%20DY%20Patil%20University,%20Charholi%20Budruk,%20Pune&t=&z=15&ie=UTF8&iwloc=B&output=embed"
                                    width="100%"
                                    height="100%"
                                    style={{ border: 0 }}
                                    allowFullScreen=""
                                    loading="lazy"
                                    title="Map"
                                    className="w-full h-full grayscale-[0.5] invert-[0.9] contrast-[1.2] opacity-80"
                                />
                            </div>
                        </div>

                        {/* Terminal Form */}
                        <div className="bg-slate-900 border-2 border-cyan-500/30 p-1 shadow-[0_0_50px_rgba(6,182,212,0.15)] backdrop-blur-xl relative overflow-visible">
                            {/* Decorative Corners for high visibility */}
                            <div className="absolute -top-1 -left-1 w-4 h-4 border-t-2 border-l-2 border-cyan-400 z-20" />
                            <div className="absolute -top-1 -right-1 w-4 h-4 border-t-2 border-r-2 border-cyan-400 z-20" />
                            <div className="absolute -bottom-1 -left-1 w-4 h-4 border-b-2 border-l-2 border-cyan-400 z-20" />
                            <div className="absolute -bottom-1 -right-1 w-4 h-4 border-b-2 border-r-2 border-cyan-400 z-20" />

                            <div className="h-full bg-black/40 border border-white/10 p-8 md:p-12 relative overflow-hidden">
                                {/* Terminal Header */}
                                <div className="flex items-center justify-between mb-8 border-b border-white/10 pb-4">
                                    <div className="flex gap-2">
                                        <div className="w-3 h-3 rounded-full bg-red-500" />
                                        <div className="w-3 h-3 rounded-full bg-yellow-500" />
                                        <div className="w-3 h-3 rounded-full bg-green-500" />
                                    </div>
                                    <div className="text-cyan-400/60 text-xs font-mono tracking-widest">/ROOT/MAIL_CLIENT_V2</div>
                                </div>

                                <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
                                    <div className="group">
                                        <label htmlFor="name" className="block text-cyan-400 text-sm font-bold tracking-widest mb-3 uppercase">{`> input_name:`}</label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            className="w-full bg-white/5 border border-white/10 focus:border-cyan-400 px-4 py-3 text-white text-lg focus:outline-none transition-all placeholder-white/20 font-mono focus:bg-cyan-500/10 focus:shadow-[0_0_20px_rgba(6,182,212,0.2)]"
                                            placeholder="ENTER NAME..."
                                            required
                                        />
                                    </div>
                                    <div className="group">
                                        <label htmlFor="email" className="block text-cyan-400 text-sm font-bold tracking-widest mb-3 uppercase">{`> input_email:`}</label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            className="w-full bg-white/5 border border-white/10 focus:border-cyan-400 px-4 py-3 text-white text-lg focus:outline-none transition-all placeholder-white/20 font-mono focus:bg-cyan-500/10 focus:shadow-[0_0_20px_rgba(6,182,212,0.2)]"
                                            placeholder="ENTER EMAIL..."
                                            required
                                        />
                                    </div>
                                    <div className="group">
                                        <label htmlFor="message" className="block text-cyan-400 text-sm font-bold tracking-widest mb-3 uppercase">{`> input_message:`}</label>
                                        <textarea
                                            id="message"
                                            name="message"
                                            rows="5"
                                            value={formData.message}
                                            onChange={handleChange}
                                            className="w-full bg-white/5 border border-white/10 focus:border-cyan-400 px-4 py-3 text-white text-lg focus:outline-none transition-all placeholder-white/20 font-mono resize-none focus:bg-cyan-500/10 focus:shadow-[0_0_20px_rgba(6,182,212,0.2)]"
                                            placeholder="ENTER MESSAGE..."
                                            required
                                        ></textarea>
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={status === 'sending'}
                                        className={`w-full py-4 mt-6 bg-cyan-600 hover:bg-cyan-500 text-black font-bold uppercase tracking-[0.2em] transition-all relative overflow-hidden shadow-[0_0_20px_rgba(6,182,212,0.4)] hover:shadow-[0_0_40px_rgba(6,182,212,0.6)] ${status === 'sending' ? 'cursor-wait opacity-80' : ''}`}
                                    >
                                        <span className="relative z-10 flex items-center justify-center gap-4">
                                            {status === 'sending' ? 'TRANSMITTING...' : 'EXECUTE_SEND_PROTOCOL'} {status !== 'sending' && <span>→</span>}
                                        </span>
                                    </button>
                                </form>
                            </div>
                        </div>
                    </motion.div>

                    {/* Social Footer */}
                    <div className="border-t border-white/10 pt-12 pb-6 text-center">
                        <h2 className="text-3xl text-white mb-8 tracking-[0.2em] uppercase opacity-80">Connect_Network</h2>
                        <div className="flex justify-center gap-6 mb-8">
                            <a href="https://www.instagram.com/tekron.nst/" className="w-16 h-16 border border-white/20 flex items-center justify-center hover:bg-white/10 hover:border-purple-500 hover:text-purple-400 transition-all">
                                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" /></svg>
                            </a>
                            <a href="https://www.youtube.com/@Tekron_NST" className="w-16 h-16 border border-white/20 flex items-center justify-center hover:bg-white/10 hover:border-red-500 hover:text-red-400 transition-all">
                                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" /></svg>
                            </a>
                        </div>
                        <p className="text-white/20 text-sm font-mono">{`//`} SYSTEM_VERSION_2.0.26</p>
                    </div>

                </motion.div>
            </div>

            <style jsx>{`
                .glitch-text-pixel {
                    position: relative;
                }
                .glitch-text-pixel::before,
                .glitch-text-pixel::after {
                    content: attr(data-text);
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                }
                .glitch-text-pixel::before {
                    left: 2px;
                    text-shadow: -1px 0 #00ffff;
                    clip: rect(44px, 450px, 56px, 0);
                    animation: glitch-anim 5s infinite linear alternate-reverse;
                }
                .glitch-text-pixel::after {
                    left: -2px;
                    text-shadow: -1px 0 #ff00ff;
                    clip: rect(44px, 450px, 56px, 0);
                    animation: glitch-anim2 5s infinite linear alternate-reverse;
                }
                @keyframes glitch-anim {
                    0% { clip: rect(12px, 9999px, 86px, 0); }
                    5% { clip: rect(72px, 9999px, 8px, 0); }
                    10% { clip: rect(6px, 9999px, 60px, 0); }
                    15% { clip: rect(89px, 9999px, 12px, 0); }
                    20% { clip: rect(32px, 9999px, 92px, 0); }
                    100% { clip: rect(45px, 9999px, 50px, 0); }
                }
                @keyframes glitch-anim2 {
                    0% { clip: rect(56px, 9999px, 99px, 0); }
                    5% { clip: rect(12px, 9999px, 16px, 0); }
                    10% { clip: rect(87px, 9999px, 3px, 0); }
                    15% { clip: rect(2px, 9999px, 92px, 0); }
                    20% { clip: rect(21px, 9999px, 2px, 0); }
                    100% { clip: rect(12px, 9999px, 8px, 0); }
                }
            `}</style>
        </UnifiedBackground>
    );
}

export default Contact;
