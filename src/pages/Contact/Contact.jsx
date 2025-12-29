
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import UnifiedBackground from '../../components/layout/UnifiedBackground';

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
        { role: 'Tech. Head', name: 'Ved Bhadani', phone: '+91 95467 85861', email: 'ved.bhadani@adypu.edu.in' },
        { role: 'Marketing Head', name: 'Vamshi Krishna Pendyala', phone: '+91 91215 07280', email: 'vamshikrishna.pendyala@adypu.edu.in' },
        { role: 'Sponsorship Head', name: 'Harshit Jain', phone: '+91 74278 87050', email: 'harshit.jain@adypu.edu.in' },
        { role: 'Hospitality Head', name: 'Ayush Shukla', phone: '+91 78753 93239', email: 'ayush.shukla@adypu.edu.in' },
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15
            }
        }
    };

    const itemVariants = {
        hidden: { y: 30, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { type: "spring", stiffness: 50 }
        }
    };

    return (
        <UnifiedBackground>
            <div className="text-white min-h-screen pt-24 pb-12 px-4 md:px-8 overflow-hidden relative">

                {/* Floating Decorative Elements */}
                <div className="absolute top-20 left-10 w-64 h-64 bg-purple-600/20 rounded-full blur-[100px] pointer-events-none" />
                <div className="absolute bottom-40 right-10 w-80 h-80 bg-pink-600/10 rounded-full blur-[100px] pointer-events-none" />

                {/* Back Button */}
                <motion.button
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    onClick={() => navigate('/map')}
                    className="fixed top-8 left-8 z-50 px-6 py-2 bg-black/40 border border-purple-500/30 backdrop-blur-md rounded-full text-white hover:bg-purple-900/40 hover:scale-105 hover:border-purple-400/50 transition-all duration-300 flex items-center gap-2 group"
                >
                    <span className="group-hover:-translate-x-1 transition-transform">←</span> Back to Map
                </motion.button>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="max-w-6xl mx-auto space-y-20 relative z-10"
                >

                    {/* Header */}
                    <motion.div variants={itemVariants} className="text-center space-y-4">
                        <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-pink-300 to-purple-300 drop-shadow-[0_0_15px_rgba(168,85,247,0.5)]">
                            CONTACT US
                        </h1>
                        <p className="text-xl md:text-2xl text-purple-200/80 max-w-2xl mx-auto minecraft-font">
                            We're here to help!
                        </p>
                    </motion.div>

                    {/* 1. Official Contact Info (Moved to Top) */}
                    <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <motion.div
                            whileHover={{ scale: 1.02 }}
                            className="bg-gradient-to-br from-indigo-900/40 to-blue-900/20 border border-indigo-500/30 p-10 rounded-3xl backdrop-blur-xl"
                        >
                            <h3 className="text-3xl font-bold text-white mb-8 flex items-center gap-4 minecraft-font">
                                <span className="p-3 bg-indigo-500/20 rounded-xl">📧</span> Official Emails
                            </h3>
                            <div className="space-y-6 minecraft-font">
                                <div className="group px-4">
                                    <p className="text-indigo-300 text-sm font-bold uppercase tracking-wider mb-1">Official Email</p>
                                    <a href="mailto:tekronfest@newtonschool.co" className="text-white text-2xl group-hover:text-indigo-400 transition-colors block">
                                        tekronfest@newtonschool.co
                                    </a>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div
                            whileHover={{ scale: 1.02 }}
                            className="bg-gradient-to-br from-purple-900/40 to-pink-900/20 border border-purple-500/30 p-10 rounded-3xl backdrop-blur-xl"
                        >
                            <h3 className="text-3xl font-bold text-white mb-8 flex items-center gap-4 minecraft-font">
                                <span className="p-3 bg-purple-500/20 rounded-xl">📞</span> Helplines
                            </h3>
                            <div className="space-y-6 minecraft-font">
                                <div>
                                    <p className="text-purple-300 text-sm font-bold uppercase tracking-wider mb-1">General Inquiry</p>
                                    <p className="text-white text-2xl">Nihal - +91 62825 00918</p>
                                </div>
                                <div className="pt-4 border-t border-purple-500/20 mt-2">
                                    <div className="flex items-center gap-3 mb-3">
                                        <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                                        <p className="text-white/80 text-lg">Mon–Sat | 10:00 AM – 6:00 PM</p>
                                    </div>
                                    <p className="text-lg text-gray-400">
                                        For event specific details, please visit the <Link to="/competition" className="text-purple-400 hover:text-pink-400 underline transition-colors">Competition</Link> or <Link to="/events" className="text-purple-400 hover:text-pink-400 underline transition-colors">Events</Link> page.
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* 2. Key Coordinators */}
                    <motion.div variants={itemVariants} className="space-y-10">
                        <div className="flex items-center justify-center gap-4">
                            <div className="h-[1px] w-20 bg-gradient-to-r from-transparent to-purple-500"></div>
                            <h2 className="text-4xl font-bold text-white uppercase tracking-widest minecraft-font">Core Team</h2>
                            <div className="h-[1px] w-20 bg-gradient-to-l from-transparent to-purple-500"></div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 minecraft-font">
                            {coordinators.map((member, index) => (
                                <motion.div
                                    key={index}
                                    whileHover={{ y: -10, backgroundColor: "rgba(255,255,255,0.08)" }}
                                    className="bg-white/5 border border-white/10 p-8 rounded-2xl transition-all duration-300 backdrop-blur-md group"
                                >
                                    <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center mb-4 text-2xl group-hover:scale-110 transition-transform">
                                        👤
                                    </div>
                                    <p className="text-purple-400 font-bold text-sm mb-3 uppercase tracking-widest border-b border-purple-500/30 pb-2 inline-block">{member.role}</p>
                                    <h3 className="text-3xl font-bold text-white mb-4 leading-tight">{member.name}</h3>
                                    <div className="space-y-3 text-gray-300 text-lg">
                                        <a href={`tel:${member.phone}`} className="flex items-center gap-3 hover:text-purple-300 transition-colors">
                                            <span className="w-8 h-8 rounded-full bg-black/20 flex items-center justify-center">📞</span> {member.phone}
                                        </a>
                                        <a href={`mailto:${member.email}`} className="flex items-center gap-3 hover:text-purple-300 transition-colors">
                                            <span className="w-8 h-8 rounded-full bg-black/20 flex items-center justify-center">✉️</span> {member.email}
                                        </a>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* 3. Venue Details (Professional Design) */}
                    <motion.div variants={itemVariants} className="bg-gradient-to-r from-white/10 to-white/5 border border-white/10 p-8 md:p-12 rounded-3xl backdrop-blur-xl shadow-2xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-purple-500/20 rounded-full blur-3xl pointer-events-none"></div>
                        <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-40 h-40 bg-pink-500/20 rounded-full blur-3xl pointer-events-none"></div>

                        <div className="flex flex-col md:flex-row items-center justify-between gap-10 relative z-10 minecraft-font">
                            <div className="text-center md:text-left space-y-4 md:w-1/2">
                                <div>
                                    <h2 className="text-lg font-bold text-pink-400 tracking-[0.2em] uppercase mb-2">Event Venue</h2>
                                    <h3 className="text-4xl md:text-5xl font-bold text-white leading-tight">Ajeenkya DY Patil University</h3>
                                </div>
                                <div className="h-1 w-20 bg-gradient-to-r from-purple-500 to-transparent mx-auto md:mx-0 rounded-full"></div>
                                <p className="text-gray-300 text-2xl leading-relaxed max-w-md">
                                    Join us at our state-of-the-art campus for an unforgettable experience of technology and innovation.
                                </p>
                            </div>

                            <div className="bg-black/20 p-8 rounded-2xl border border-white/5 md:w-1/2 w-full space-y-6">
                                <div className="flex items-start gap-4">
                                    <div className="p-3 bg-purple-500/20 rounded-lg text-purple-300 mt-1">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-1">Building</p>
                                        <p className="text-white font-medium text-2xl">School of MCA Building, NST 4th Floor</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="p-3 bg-pink-500/20 rounded-lg text-pink-300 mt-1">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-1">Address</p>
                                        <p className="text-gray-200 text-2xl">Charholi Budruk, via Lohegaon, Pune - 412105</p>
                                        <p className="text-xl text-gray-400 mt-1">Landmark: DY Patil Knowledge City</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* 4. Map & Contact Form (Side-by-Side) */}
                    <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">

                        {/* Left: Map */}
                        <div className="h-[600px] lg:h-auto min-h-[500px] rounded-3xl overflow-hidden border border-white/10 shadow-2xl relative group">
                            <div className="absolute inset-0 border-4 border-white/5 rounded-3xl pointer-events-none z-10 group-hover:border-purple-500/30 transition-colors duration-500"></div>
                            <iframe
                                src="https://maps.google.com/maps?width=100%25&height=600&hl=en&q=Ajeenkya%20DY%20Patil%20University,%20Charholi%20Budruk,%20Pune&t=&z=15&ie=UTF8&iwloc=B&output=embed"
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen=""
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                title="Ajeenkya DY Patil University Map"
                                className="group-hover:opacity-100 transition-all duration-700 invert-0"
                            ></iframe>
                        </div>

                        {/* Right: Contact Form */}
                        <div className="bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 shadow-[0_0_50px_rgba(139,92,246,0.15)] relative overflow-hidden group hover:border-white/20 transition-all duration-500 flex flex-col justify-center minecraft-font">
                            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                            <h2 className="text-4xl font-bold text-center text-white mb-8 flex items-center justify-center gap-3">
                                <span className="text-4xl">✉️</span> Send Message
                            </h2>
                            <form onSubmit={handleSubmit} className="space-y-5 relative z-10">
                                <div className="space-y-2">
                                    <label htmlFor="name" className="text-sm font-bold text-purple-300 uppercase ml-1 tracking-wider">Your Name</label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="w-full px-5 py-3 bg-black/40 border border-purple-500/20 rounded-xl focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-500/20 transition-all text-white text-xl placeholder-gray-500/50 backdrop-blur-sm"
                                        placeholder="John Doe"
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="email" className="text-sm font-bold text-purple-300 uppercase ml-1 tracking-wider">Email Address</label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="w-full px-5 py-3 bg-black/40 border border-purple-500/20 rounded-xl focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-500/20 transition-all text-white text-xl placeholder-gray-500/50 backdrop-blur-sm"
                                        placeholder="john@example.com"
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="subject" className="text-sm font-bold text-purple-300 uppercase ml-1 tracking-wider">Subject</label>
                                    <input
                                        type="text"
                                        id="subject"
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        className="w-full px-5 py-3 bg-black/40 border border-purple-500/20 rounded-xl focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-500/20 transition-all text-white text-xl placeholder-gray-500/50 backdrop-blur-sm"
                                        placeholder="Query about events..."
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="message" className="text-sm font-bold text-purple-300 uppercase ml-1 tracking-wider">Message</label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        rows="4"
                                        value={formData.message}
                                        onChange={handleChange}
                                        className="w-full px-5 py-3 bg-black/40 border border-purple-500/20 rounded-xl focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-500/20 transition-all text-white text-xl placeholder-gray-500/50 backdrop-blur-sm resize-none"
                                        placeholder="Type your message here..."
                                        required
                                    ></textarea>
                                </div>
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    type="submit"
                                    disabled={status === 'sending'}
                                    className={`w-full py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold text-2xl rounded-xl shadow-lg transition-all duration-300 ${status === 'sending' ? 'opacity-80 cursor-wait' : ''}`}
                                >
                                    {status === 'sending' ? (
                                        <span className="flex items-center justify-center gap-2">
                                            Sending...
                                        </span>
                                    ) : 'Send Message'}
                                </motion.button>
                            </form>
                        </div>
                    </motion.div>

                    {/* 5. Social Media Links */}
                    <motion.div variants={itemVariants} className="pt-16 pb-8 text-center space-y-10 relative minecraft-font">
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-purple-500/50 to-transparent"></div>

                        <h2 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-200 to-white">Connect With Us</h2>
                        <div className="flex justify-center gap-6 flex-wrap">
                            <SocialLink href="#" label="Instagram" icon={
                                <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" /></svg>
                            } />
                            <SocialLink href="#" label="LinkedIn" icon={
                                <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24"><path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" /></svg>
                            } />
                            <SocialLink href="#" label="Twitter" icon={
                                <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
                            } />
                            <SocialLink href="#" label="YouTube" icon={
                                <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" /></svg>
                            } />
                            {/* Add more social links if needed */}
                        </div>
                        <p className="text-purple-400/50 text-sm mt-8">© 2026 Tekron. All rights reserved.</p>
                    </motion.div>
                </motion.div>
            </div>
        </UnifiedBackground>
    );
}

function SocialLink({ href, label, icon }) {
    return (
        <motion.a
            whileHover={{ y: -5, scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            href={href}
            className="p-4 bg-white/5 border border-white/10 rounded-2xl text-white hover:bg-gradient-to-br hover:from-purple-600 hover:to-pink-600 hover:border-transparent hover:shadow-[0_0_20px_rgba(168,85,247,0.5)] transition-all duration-300 group relative overflow-hidden"
            aria-label={label}
        >
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 pointer-events-none"></div>
            <div className="relative z-10 text-gray-300 group-hover:text-white transition-colors">
                {icon}
            </div>
        </motion.a>
    );
}

export default Contact;

