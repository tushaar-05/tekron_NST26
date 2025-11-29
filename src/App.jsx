import { useState, useEffect } from 'react';

function App() {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

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

    // Generate static stars (no cursor movement)
    const stars = Array.from({ length: 200 }, (_, i) => ({
        id: i,
        // left: `${Math.random() * 100}%`,
        // top: `${Math.random() * 100}%`,
        // size: Math.random() * 3 + 1,
        // delay: Math.random() * 3,
    }));

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
                    backgroundImage: 'url(/images/background.jpg)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    imageRendering: 'pixelated',
                }}
            />

            {/* Stars layer - static with twinkle only */}
            <div className="absolute inset-0 z-0">
                {stars.map((star) => (
                    <div
                        key={star.id}
                        className="absolute rounded-full bg-white star"
                        style={{
                            left: star.left,
                            top: star.top,
                            width: `${star.size}px`,
                            height: `${star.size}px`,
                            animationDelay: `${star.delay}s`,
                        }}
                    />
                ))}
            </div>

            {/* 5.webp - Back layer (teal/cyan) - Horizontal emphasis */}
            <div
                className="absolute transition-transform duration-200 ease-out"
                style={{
                    bottom: '-3%',
                    left: '0%',
                    zIndex: 5,
                    width: '100%',
                    transform: `translate(${mousePosition.x * 10}px, ${mousePosition.y * 10}px)`,
                    willChange: 'transform',
                }}
            >
                <img
                    src="/images/5.webp"
                    alt="Back teal cloud"
                    className="w-full h-auto pixel-art"
                />
            </div>

            {/* 4.webp - Middle of page - Diagonal movement */}
            <div
                className="absolute transition-transform duration-300 ease-out"
                style={{
                    top: '35%',
                    left: '50%',
                    transform: `translate(-50%, -50%) translate(${mousePosition.x * 10}px, ${mousePosition.y * 10}px)`,
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

            {/* 3.webp - 100px down from 4 - Opposite diagonal */}
            <div
                className="absolute transition-transform duration-300 ease-out"
                style={{
                    top: 'calc(50% + 100px)',
                    left: '50%',
                    transform: `translate(-50%, -50%) translate(${mousePosition.x * -10}px, ${mousePosition.y * 10}px)`,
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

            {/* 2.webp - Bottom most - Vertical emphasis */}
            <div
                className="absolute transition-transform duration-300 ease-out"
                style={{
                    bottom: '-2%',
                    left: '0%',
                    zIndex: 15,
                    width: '100%',
                    transform: `translate(${mousePosition.x * 10}px, ${mousePosition.y * 10}px)`,
                    willChange: 'transform',
                }}
            >
                <img
                    src="/images/2.webp"
                    alt="Bottom cloud"
                    className="w-full h-auto pixel-art"
                />
            </div>

            {/* 1.webp - Above 2 at bottom - Slow and subtle */}
            <div
                className="absolute transition-transform duration-500 ease-out"
                style={{
                    bottom: '-20%',
                    left: '-2.5%',
                    zIndex: 18,
                    width: '105%',
                    transform: `translate(${mousePosition.x * 10}px, ${mousePosition.y * 10}px)`,
                    willChange: 'transform',
                }}
            >
                <img
                    src="/images/1.webp"
                    alt="Cloud above bottom"
                    className="w-full h-auto pixel-art"
                />
            </div>

            {/* Navigation pill at top */}
            <div className="absolute top-8 left-1/2 transform -translate-x-1/2 z-40">
                <div className="nav-pill px-8 py-3 rounded-full">
                    <span className="pixel-font text-purple-200 text-xs tracking-wider">NAVIGATE</span>
                </div>
            </div>

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
                    }}
                >
                    HEADING
                </h1>

                {/* Lorem ipsum paragraph */}
                <div className="max-w-4xl mx-auto mb-10">
                    <p
                        className="pixel-font text-center leading-relaxed"
                        style={{
                            fontSize: 'clamp(7px, 0.75vw, 12px)',
                            color: '#c8b6e2',
                            lineHeight: '2',
                            textShadow: '1px 1px 2px rgba(0, 0, 0, 0.5)',
                        }}
                    >
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua. Ut enim ad minim veniam, quis nostrud
                        exercitation ullamco laboris nisi ut aliquip ex ea
                        commodo consequat. Duis aute irure dolor in reprehenderit
                        in voluptate velit esse cillum dolore eu fugiat nulla
                        pariatur. Excepteur sint occaecat cupidatat non proident,
                        sunt in culpa qui officia deserunt mollit anim id est
                        laborum.
                    </p>
                </div>

                {/* Register button */}
                <button className="pixel-button pixel-font px-16 py-5 rounded-xl text-white mb-16 transform hover:scale-105 transition-transform"
                    style={{
                        fontSize: 'clamp(14px, 1.4vw, 22px)',
                        letterSpacing: '0.15em',
                    }}
                >
                    REGISTER
                </button>

                {/* Character and dialogue bubble container */}
                <div className="absolute bottom-16 right-16 flex items-end gap-8 z-30">
                    {/* Dialogue bubble */}
                    <div className="dialogue-bubble px-10 py-7 rounded-3xl relative">
                        <p className="pixel-font text-cyan-100 mb-5" style={{ fontSize: '11px', lineHeight: '1.8', textShadow: '0 0 10px rgba(34, 211, 238, 0.3)' }}>
                            Hey, my name is __,<br />
                            your assistant
                        </p>

                        {/* Arrow buttons */}
                        <div className="flex justify-center gap-6">
                            <button
                                className="text-cyan-400 hover:text-cyan-200 transition-all hover:scale-125 transform"
                                style={{ fontSize: '18px', textShadow: '0 0 10px rgba(34, 211, 238, 0.5)' }}
                            >
                                &lt;
                            </button>
                            <button
                                className="text-cyan-400 hover:text-cyan-200 transition-all hover:scale-125 transform"
                                style={{ fontSize: '18px', textShadow: '0 0 10px rgba(34, 211, 238, 0.5)' }}
                            >
                                &gt;
                            </button>
                        </div>

                        {/* Bubble pointer (triangle pointing right) */}
                        <div
                            className="absolute right-0 top-1/2 transform translate-x-full -translate-y-1/2"
                            style={{
                                width: 0,
                                height: 0,
                                borderTop: '18px solid transparent',
                                borderBottom: '18px solid transparent',
                                borderLeft: '18px solid #22d3ee',
                                filter: 'drop-shadow(0 0 8px rgba(34, 211, 238, 0.4))',
                            }}
                        />
                    </div>

                    {/* Character */}
                    <div className="floating">
                        <div
                            className="pixel-art"
                            style={{
                                width: 'clamp(400px, 33vw, 800px)',
                                position: 'absolute',
                                bottom: -380,
                                right: -440,
                                transform: 'translate(-50%, -50%)',
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
            </div>
        </div>
    );
}

export default App;
