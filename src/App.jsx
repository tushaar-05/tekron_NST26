import { useState, useEffect } from 'react';

function App() {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [dialogueIndex, setDialogueIndex] = useState(0);
    const [isDialogueOpen, setIsDialogueOpen] = useState(true);
    const [isCharacterHovered, setIsCharacterHovered] = useState(false);
    const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
    const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

    const dialogues = [
        {
            text: "Hey there! I'm your virtual assistant, here to guide you through this amazing journey. Welcome to our pixelated world!"
        },
        {
            text: "Welcome! We're excited to have you here. Get ready to explore and discover something incredible."
        },
        {
            text: "Don't forget to register to unlock all features and join our community. Click the REGISTER button above to get started!"
        },
        {
            text: "See that navigation notch at the top? Hover over it to expand and click NAVIGATE. You'll enter a map where you can choose different islands and navigate to various pages. Each island is a new adventure!"
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
        <div
            className="relative w-screen h-screen overflow-hidden"
            style={{
                background: 'linear-gradient(180deg, #1a0b2e 0%, #2d1b4e 30%, #1e1438 70%, #0f0a1e 100%)',
            }}
        >
            {/* Background image layer */}
            <div
                className="absolute inset-0 z-0 opacity-30"
                style={{
                    backgroundImage: 'url(/images/bg_img.jpg)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    imageRendering: 'pixelated',
                }}
            />

            {/* 5.webp - Back layer (teal/cyan) - Horizontal emphasis - Slowest */}
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

            {/* 4.webp - Middle of page - Diagonal movement - Medium speed */}
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

            {/* 3.webp - 100px down from 4 - Opposite diagonal - Medium-fast speed */}
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

            {/* 2.webp - Bottom most - Vertical emphasis - Fast speed */}
            <div
                className="absolute transition-transform duration-300 ease-out"
                style={{
                    bottom: '-2%',
                    opacity: 0.7,
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

            {/* 1.webp - Above 2 at bottom - Fastest speed */}
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

            {/* Notch navigation button */}
            <button className="notch-nav-button absolute top-0 left-1/2 transform -translate-x-1/2 z-40 pixel-art">
                <div className="notch-nav-content">
                    <span className="notch-text-default pixel-font text-white text-xs">MAP</span>
                    <span className="notch-text-expanded pixel-font text-white text-xs">NAVIGATE</span>
                </div>
            </button>

            {/* Main content container */}
            <div className="relative z-20 h-full flex flex-col items-center justify-center px-8">
                {/* Heading */}
                <h1
                    className="pixel-font text-center mb-6"
                    style={{
                        fontSize: 'clamp(60px, 10vw, 140px)',
                        color: '#d8c6f2',
                        letterSpacing: '0.15em',
                        textShadow: '6px 6px 0px rgba(0, 0, 0, 0.6), 0 0 40px rgba(216, 198, 242, 0.3)',
                        lineHeight: '1.1',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <span>TEKRON</span>
                    <span className="text-purple-500 text-[60px]">2026</span>
                </h1>

                {/* Countdown Timer */}
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

                {/* Lorem ipsum paragraph */}
                <div className="max-w-4xl mx-auto mb-10">
                    <p
                        className="pixel-font text-center leading-relaxed"
                        style={{
                            fontSize: 'clamp(7px, 0.75vw, 16px)',
                            color: '#c8b6e2',
                            lineHeight: '2',
                            textShadow: '1px 1px 2px rgba(0, 0, 0, 0.5)',
                        }}
                    >
                        Come to TEKRON, the wild tech fest! Hack the end of the world with AI bosses sipping bad coffee, qubits that hate rules, and hackers who plug cables into your dreams. We're all glitches anyway—join the fun, blow up old ideas with fireworks from junk computers, and turn bugs into wins. Plug in or just scroll forever? Your call.
                    </p>
                </div>

                {/* Register button */}
                <button className="pixel-button pixel-font px-16 py-5 text-white mb-16"
                    style={{
                        fontSize: 'clamp(14px, 1.4vw, 22px)',
                        letterSpacing: '0.15em',
                    }}
                >
                    REGISTER
                </button>

                {/* Dialogue bubble */}
                {isDialogueOpen && (
                    <div className="absolute bottom-[500px] right-[10px] z-50">
                        <div className="dialogue-bubble px-8 py-6 relative">
                            {/* Close button */}
                            <button
                                onClick={() => setIsDialogueOpen(false)}
                                className="absolute top-2 right-2 pixel-font"
                                style={{ fontSize: '12px', cursor: 'pointer', lineHeight: '1', color: '#c084fc' }}
                                onMouseEnter={(e) => e.target.style.color = '#d8c6f2'}
                                onMouseLeave={(e) => e.target.style.color = '#c084fc'}
                            >
                                ×
                            </button>

                            <p className="pixel-font mb-4" style={{ fontSize: '10px', lineHeight: '1.8', color: '#d8c6f2', textShadow: '1px 1px 0px #000000, 0 0 10px rgba(168, 85, 247, 0.3)', imageRendering: 'pixelated' }}>
                                {dialogues[dialogueIndex].text}
                            </p>

                            {/* Progress dots */}
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
                                        }}
                                    />
                                ))}
                            </div>

                            {/* Arrow buttons */}
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

                            {/* Bubble pointer (triangle pointing down) */}
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

                {/* Character */}
                <div 
                    className="absolute bottom-0 right-[-80px] z-30"
                    onClick={() => setIsDialogueOpen(!isDialogueOpen)}
                    onMouseMove={(e) => {
                        const rect = e.currentTarget.getBoundingClientRect();
                        const mouseX = e.clientX - rect.left;
                        // Shift center point to the left (about 20% from left edge)
                        const centerX = rect.width * 0.2;
                        
                        // Only show cursor if mouse is on the right side (from adjusted center)
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
                                src="/images/CH02.jpg"
                                alt="Assistant character"
                                className="w-full h-auto block pixel-art"
                            />
                        </div>
                    </div>
                </div>

                {/* Custom cursor */}
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
                            CLICK ME
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default App;
