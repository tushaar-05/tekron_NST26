import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import WorldMap from './WorldMap';
import WorldLoading from './WorldLoading';

function App() {
    const [showMap, setShowMap] = useState(false);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [loadingKey, setLoadingKey] = useState(0);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [dialogueIndex, setDialogueIndex] = useState(0);
    const [isDialogueOpen, setIsDialogueOpen] = useState(true);
    const [isCharacterHovered, setIsCharacterHovered] = useState(false);
    const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
    const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
    const [glitchActive, setGlitchActive] = useState(false);
    const [displayedText, setDisplayedText] = useState('');
    const [dialogueGlitch, setDialogueGlitch] = useState(false);

    const handleNavigateToMap = () => {
        setLoadingKey(prev => prev + 1);
        setIsTransitioning(true);
    };

    const handleNavigateToHome = () => {
        setLoadingKey(prev => prev + 1);
        setIsTransitioning(true);
    };

    const handleLoadingComplete = () => {
        setIsTransitioning(false);
        setShowMap(!showMap);
    };

    const dialogues = [
        {
            text: "Welcome to TEKRON 2026! Join us for cutting-edge tech talks, AI innovations, and quantum computing breakthroughs."
        },
        {
            text: "Network with industry leaders, attend hands-on workshops, and explore the future of technology. Register now to secure your spot!"
        },
        {
            text: "Use the navigation menu above to explore speakers, schedule, workshops, and more. Each section is packed with tech insights!"
        }
    ];

    const nextDialogue = () => {
        setDialogueIndex((prev) => (prev + 1) % dialogues.length);
    };

    const prevDialogue = () => {
        setDialogueIndex((prev) => (prev - 1 + dialogues.length) % dialogues.length);
    };

    useEffect(() => {
        const handleMouseMove = (e) => {
            const centerX = window.innerWidth / 2;
            const centerY = window.innerHeight / 2;
            const offsetX = (e.clientX - centerX) / centerX;
            const offsetY = (e.clientY - centerY) / centerY;
            setMousePosition({ x: offsetX, y: offsetY });
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    useEffect(() => {
        const glitchInterval = setInterval(() => {
            setGlitchActive(true);
            setTimeout(() => setGlitchActive(false), 200);
        }, 5000);
        return () => clearInterval(glitchInterval);
    }, []);

    useEffect(() => {
        const currentDialogue = dialogues[dialogueIndex].text;
        setDisplayedText('');

        let currentIndex = 0;
        const typeInterval = setInterval(() => {
            if (currentIndex < currentDialogue.length) {
                setDisplayedText(currentDialogue.slice(0, currentIndex + 1));
                currentIndex++;

                if (Math.random() < 0.1) {
                    setDialogueGlitch(true);
                    setTimeout(() => setDialogueGlitch(false), 100);
                }
            } else {
                clearInterval(typeInterval);
            }
        }, 30); // Typing speed: 30ms per character

        return () => clearInterval(typeInterval);
    }, [dialogueIndex]);

    useEffect(() => {
        const targetDate = new Date('2026-01-30T00:00:00').getTime();

        const updateCountdown = () => {
            const now = new Date().getTime();
            const difference = targetDate - now;

            if (difference > 0) {
                const days = Math.floor(difference / (1000 * 60 * 60 * 24));
                const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((difference % (1000 * 60)) / 1000);

                setTimeLeft({ days, hours, minutes, seconds });
            } else {
                setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
            }
        };

        updateCountdown();
        const interval = setInterval(updateCountdown, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <AnimatePresence mode="wait">
            {isTransitioning ? (
                <WorldLoading key={loadingKey} onLoadingComplete={handleLoadingComplete} />
            ) : showMap ? (
                <motion.div
                    key="map"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="relative"
                    style={{
                        background: '#1a0b2e',
                        imageRendering: 'pixelated',
                    }}
                >
                    <WorldMap onNavigateHome={handleNavigateToHome} />
                </motion.div>
            ) : (
                <motion.div
                    key="home"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    style={{
                        background: '#1a0b2e',
                        imageRendering: 'pixelated',
                    }}
                >
                    <div
                        className="relative w-screen h-screen overflow-hidden tech-event-bg"
                        style={{
                            background: 'linear-gradient(180deg, #1a0b2e 0%, #2d1b4e 30%, #1e1438 70%, #0f0a1e 100%)',
                        }}
                    >

                        <div className="tech-grid-pixel absolute inset-0 z-0 opacity-15" />


                        <div className="scan-line-pixel absolute inset-0 z-2 pointer-events-none" />


                        {glitchActive && <div className="glitch-overlay-pixel absolute inset-0 z-3 pointer-events-none" />}


                        <div
                            className="absolute inset-0 z-0 opacity-30"
                            style={{
                                backgroundImage: 'url(/images/bg_img.jpg)',
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                imageRendering: 'pixelated',
                            }}
                        />


                        <div
                            className="absolute transition-transform duration-200 ease-out"
                            style={{
                                bottom: '-3%',
                                left: '0%',
                                zIndex: 5,
                                width: '100%',
                                transform: `translate(${mousePosition.x * 5}px, ${mousePosition.y * 5}px)`,
                                willChange: 'transform',
                            }}
                        >
                            <img
                                src="/images/5.webp"
                                alt="Back teal cloud"
                                className="w-full h-auto pixel-art"
                            />
                        </div>


                        <div
                            className="absolute transition-transform duration-300 ease-out"
                            style={{
                                top: '35%',
                                left: '50%',
                                transform: `translate(-50%, -50%) translate(${mousePosition.x * 8}px, ${mousePosition.y * 8}px)`,
                                zIndex: 10,
                                width: '100%',
                                willChange: 'transform',
                            }}
                        >
                            <img
                                src="/images/4.webp"
                                alt="Middle cloud"
                                className="w-full h-auto pixel-art"
                            />
                        </div>


                        <div
                            className="absolute transition-transform duration-300 ease-out"
                            style={{
                                top: 'calc(50% + 100px)',
                                left: '50%',
                                transform: `translate(-50%, -50%) translate(${mousePosition.x * -12}px, ${mousePosition.y * 12}px)`,
                                zIndex: 12,
                                width: '100%',
                                willChange: 'transform',
                            }}
                        >
                            <img
                                src="/images/3.webp"
                                alt="Cloud below middle"
                                className="w-full h-auto pixel-art"
                            />
                        </div>


                        <div
                            className="absolute transition-transform duration-300 ease-out"
                            style={{
                                bottom: '-2%',
                                opacity: 0.95,
                                left: '0%',
                                zIndex: 15,
                                width: '100%',
                                transform: `translate(${mousePosition.x * 15}px, ${mousePosition.y * 15}px)`,
                                willChange: 'transform',
                            }}
                        >
                            <img
                                src="/images/2.webp"
                                alt="Bottom cloud"
                                className="w-full h-auto pixel-art"
                            />
                        </div>


                        <div
                            className="absolute transition-transform duration-500 ease-out"
                            style={{
                                bottom: '-20%',
                                left: '-2.5%',
                                zIndex: 18,
                                width: '105%',
                                transform: `translate(${mousePosition.x * 18}px, ${mousePosition.y * 18}px)`,
                                willChange: 'transform',
                            }}
                        >
                            <img
                                src="/images/1.webp"
                                alt="Cloud above bottom"
                                className="w-full h-auto pixel-art"
                            />
                        </div>


                        <button
                            className="notch-nav-button absolute top-0 left-1/2 transform -translate-x-1/2 z-40 pixel-art"
                            onClick={handleNavigateToMap}
                        >
                            <div className="notch-nav-content">
                                <span className="notch-text-default pixel-font text-white text-xs">MAP</span>
                                <span className="notch-text-expanded pixel-font text-white text-xs">NAVIGATE</span>
                            </div>
                        </button>


                        <div className="relative z-20 h-full flex flex-col items-center justify-center px-8">

                            <h1
                                className={`pixel-font text-center mb-6 ${glitchActive ? 'glitch-text-pixel' : ''}`}
                                style={{
                                    fontSize: 'clamp(60px, 10vw, 140px)',
                                    color: '#d8c6f2',
                                    letterSpacing: '0.15em',
                                    textShadow:
                                        '6px 6px 0px rgba(0, 0, 0, 0.6), 0 0 40px rgba(216, 198, 242, 0.3), 0 0 60px rgba(124, 58, 237, 0.2)',
                                    lineHeight: '1.1',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                }}
                            >
                                <span className="pixel-tech-glow">TEKRON</span>
                                <span className="text-purple-500 text-[60px]" style={{
                                    textShadow: '6px 6px 0px rgba(0, 0, 0, 0.6), 0 0 30px rgba(168, 85, 247, 0.4)',
                                }}>2026</span>
                            </h1>


                            <div className="tech-tagline mb-4">
                                <p className="pixel-font text-center" style={{
                                    fontSize: 'clamp(10px, 1vw, 16px)',
                                    color: '#c084fc',
                                    letterSpacing: '0.1em',
                                    textShadow: '2px 2px 0px rgba(0, 0, 0, 0.5), 0 0 20px rgba(192, 132, 252, 0.4)',
                                }}>
                                    &gt; NEWTON SCHOOL OF TECHNOLOGY &lt;
                                </p>
                            </div>


                            <div className="countdown-timer mb-8">
                                <div className="countdown-container">
                                    <div className="countdown-item">
                                        <div className="countdown-value pixel-font">{String(timeLeft.days).padStart(2, '0')}</div>
                                        <div className="countdown-label pixel-font">DAYS</div>
                                    </div>
                                    <div className="countdown-separator pixel-font">:</div>
                                    <div className="countdown-item">
                                        <div className="countdown-value pixel-font">{String(timeLeft.hours).padStart(2, '0')}</div>
                                        <div className="countdown-label pixel-font">HRS</div>
                                    </div>
                                    <div className="countdown-separator pixel-font">:</div>
                                    <div className="countdown-item">
                                        <div className="countdown-value pixel-font">{String(timeLeft.minutes).padStart(2, '0')}</div>
                                        <div className="countdown-label pixel-font">MIN</div>
                                    </div>
                                    <div className="countdown-separator pixel-font">:</div>
                                    <div className="countdown-item">
                                        <div className="countdown-value pixel-font">{String(timeLeft.seconds).padStart(2, '0')}</div>
                                        <div className="countdown-label pixel-font">SEC</div>
                                    </div>
                                </div>
                            </div>


                            <div className="max-w-4xl mx-auto mb-10">
                                <p
                                    className="pixel-font text-center leading-relaxed"
                                    style={{
                                        fontSize: 'clamp(7px, 0.75vw, 16px)',
                                        color: '#c8b6e2',
                                        lineHeight: '2',
                                        textShadow: '1px 1px 2px rgba(0, 0, 0, 0.5), 0 0 15px rgba(200, 182, 226, 0.3)',
                                    }}
                                >
                                    Join TEKRON 2026 for an immersive tech experience featuring cutting-edge AI, quantum computing,
                                    cybersecurity, and emerging technologies. Network with industry leaders, attend hands-on workshops,
                                    and explore the innovations shaping tomorrow. Register now to be part of the future.
                                </p>
                            </div>

                            <button className="pixel-button pixel-font px-16 py-5 text-white mb-16 pixel-tech-button"
                                style={{
                                    fontSize: 'clamp(14px, 1.4vw, 22px)',
                                    letterSpacing: '0.15em',
                                }}
                            >
                                REGISTER
                            </button>


                            {isDialogueOpen && (
                                <div className="absolute bottom-[500px] right-[10px] z-50">
                                    <div className="dialogue-bubble px-8 py-6 relative">

                                        <button
                                            onClick={() => setIsDialogueOpen(false)}
                                            className="absolute top-2 right-2 pixel-font"
                                            style={{ fontSize: '12px', cursor: 'pointer', lineHeight: '1', color: '#c084fc' }}
                                            onMouseEnter={(e) => e.target.style.color = '#d8c6f2'}
                                            onMouseLeave={(e) => e.target.style.color = '#c084fc'}
                                        >
                                            ×
                                        </button>

                                        <p className={`pixel-font mb-4 dialogue-text ${dialogueGlitch ? 'dialogue-glitch' : ''}`} style={{
                                            fontSize: '10px',
                                            lineHeight: '1.8',
                                            color: '#d8c6f2',
                                            textShadow: '1px 1px 0px #000000, 0 0 10px rgba(168, 85, 247, 0.3)',
                                            imageRendering: 'pixelated',
                                        }}>
                                            {displayedText}
                                            {displayedText.length < dialogues[dialogueIndex].text.length && (
                                                <span className="typewriter-cursor">|</span>
                                            )}
                                        </p>


                                        <div className="flex justify-center gap-2 mb-4">
                                            {dialogues.map((_, index) => (
                                                <div
                                                    key={index}
                                                    className="dialogue-dot"
                                                    style={{
                                                        width: dialogueIndex === index ? '8px' : '6px',
                                                        height: '6px',
                                                        background: dialogueIndex === index ? '#c084fc' : 'rgba(168, 85, 247, 0.4)',
                                                        borderRadius: '0',
                                                        imageRendering: 'pixelated',
                                                        boxShadow: dialogueIndex === index ? '0 0 8px rgba(192, 132, 252, 0.6)' : 'none',
                                                    }}
                                                />
                                            ))}
                                        </div>


                                        <div className="flex justify-center gap-6">
                                            <button
                                                onClick={prevDialogue}
                                                className="dialogue-arrow pixel-font"
                                                style={{ fontSize: '16px', color: '#c084fc', textShadow: '0 0 10px rgba(168, 85, 247, 0.5)', cursor: 'pointer' }}
                                                onMouseEnter={(e) => e.target.style.color = '#d8c6f2'}
                                                onMouseLeave={(e) => e.target.style.color = '#c084fc'}
                                            >
                                                &lt;
                                            </button>
                                            <button
                                                onClick={nextDialogue}
                                                className="dialogue-arrow pixel-font"
                                                style={{ fontSize: '16px', color: '#c084fc', textShadow: '0 0 10px rgba(168, 85, 247, 0.5)', cursor: 'pointer' }}
                                                onMouseEnter={(e) => e.target.style.color = '#d8c6f2'}
                                                onMouseLeave={(e) => e.target.style.color = '#c084fc'}
                                            >
                                                &gt;
                                            </button>
                                        </div>


                                        <div
                                            className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full"
                                            style={{
                                                width: 0,
                                                height: 0,
                                                borderLeft: '16px solid transparent',
                                                borderRight: '16px solid transparent',
                                                borderTop: '16px solid #a855f7',
                                                filter: 'drop-shadow(0 0 8px rgba(168, 85, 247, 0.4))',
                                                imageRendering: 'pixelated',
                                            }}
                                        />
                                    </div>
                                </div>
                            )}


                            <div
                                className="absolute bottom-0 right-[-80px] z-30"
                                onClick={() => setIsDialogueOpen(!isDialogueOpen)}
                                onMouseMove={(e) => {
                                    const rect = e.currentTarget.getBoundingClientRect();
                                    const mouseX = e.clientX - rect.left;
                                    const centerX = rect.width * 0.2;

                                    if (mouseX > centerX) {
                                        setIsCharacterHovered(true);
                                        setCursorPosition({ x: e.clientX, y: e.clientY });
                                    } else {
                                        setIsCharacterHovered(false);
                                    }
                                }}
                                onMouseLeave={() => setIsCharacterHovered(false)}
                                style={{ cursor: isCharacterHovered ? 'none' : 'default' }}
                            >
                                <div className="floating">
                                    <div
                                        className="pixel-art"
                                        style={{
                                            width: 'clamp(400px, 33vw, 800px)',
                                            position: 'relative',
                                        }}
                                    >
                                        <img
                                            src="/images/Adobe Express - file (2).png"
                                            alt="Assistant character"
                                            className="w-full h-auto block pixel-art"
                                        />
                                    </div>
                                </div>
                            </div>


                            {isCharacterHovered && (
                                <div
                                    className="custom-cursor pixel-font fixed pointer-events-none z-50"
                                    style={{
                                        left: `${cursorPosition.x + 15}px`,
                                        top: `${cursorPosition.y + 15}px`,
                                        transform: 'translate(0, 0)',
                                    }}
                                >
                                    <div className="cursor-text">
                                        NEED HELP?
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

export default App;
