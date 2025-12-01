import { useState, useEffect } from 'react';

function Loading({ onLoadingComplete }) {
    const [progress, setProgress] = useState(0);
    const [glitchActive, setGlitchActive] = useState(false);
    const [scanlinePosition, setScanlinePosition] = useState(0);
    const [loadingText, setLoadingText] = useState('LOADING');

    useEffect(() => {
        const duration = 3000; // 3 seconds loading time
        const interval = 50;
        const increment = (interval / duration) * 100;

        const progressInterval = setInterval(() => {
            setProgress((prev) => {
                const newProgress = prev + increment;
                if (newProgress >= 100) {
                    clearInterval(progressInterval);
                    if (onLoadingComplete) {
                        setTimeout(() => onLoadingComplete(), 500);
                    }
                    return 100;
                }
                return newProgress;
            });
        }, interval);

        return () => clearInterval(progressInterval);
    }, [onLoadingComplete]);

    useEffect(() => {
        const glitchInterval = setInterval(() => {
            setGlitchActive(true);
            setTimeout(() => setGlitchActive(false), 150);
        }, 2000);
        return () => clearInterval(glitchInterval);
    }, []);

    useEffect(() => {
        const scanInterval = setInterval(() => {
            setScanlinePosition((prev) => (prev + 1) % 100);
        }, 30);
        return () => clearInterval(scanInterval);
    }, []);

    useEffect(() => {
        const textStates = ['LOADING', 'LOADING.', 'LOADING..', 'LOADING...'];
        let index = 0;
        const textInterval = setInterval(() => {
            setLoadingText(textStates[index]);
            index = (index + 1) % textStates.length;
        }, 400);
        return () => clearInterval(textInterval);
    }, []);

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center"
            style={{
                background: 'linear-gradient(180deg, #1a0b2e 0%, #2d1b4e 30%, #1e1438 70%, #0f0a1e 100%)',
            }}
        >
            
            <div className="tech-grid-pixel absolute inset-0 z-0 opacity-15" />

            
            <div
                className="absolute inset-0 z-2 pointer-events-none"
                style={{
                    background: `linear-gradient(to bottom, transparent ${scanlinePosition}%, rgba(192, 132, 252, 0.2) ${scanlinePosition}%, rgba(192, 132, 252, 0.2) ${scanlinePosition + 0.5}%, transparent ${scanlinePosition + 0.5}%)`,
                }}
            />

            
            {glitchActive && <div className="glitch-overlay-pixel absolute inset-0 z-3 pointer-events-none" />}

            
            <div
                className="absolute inset-0 opacity-20"
                style={{
                    backgroundImage: 'url(/images/bg_img.jpg)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    imageRendering: 'pixelated',
                }}
            />

            
            <div className="relative z-10 flex flex-col items-center justify-center px-8">
                
                <h1
                    className={`pixel-font text-center mb-8 ${glitchActive ? 'glitch-text-pixel' : ''}`}
                    style={{
                        fontSize: 'clamp(40px, 8vw, 100px)',
                        color: '#d8c6f2',
                        letterSpacing: '0.15em',
                        textShadow:
                            '4px 4px 0px rgba(0, 0, 0, 0.6), 0 0 30px rgba(216, 198, 242, 0.4), 0 0 50px rgba(124, 58, 237, 0.3)',
                        lineHeight: '1.1',
                    }}
                >
                    TEKRON
                </h1>

                
                <div
                    className="pixel-font mb-12"
                    style={{
                        fontSize: 'clamp(20px, 4vw, 40px)',
                        color: '#a855f7',
                        letterSpacing: '0.2em',
                        textShadow: '4px 4px 0px rgba(0, 0, 0, 0.6), 0 0 20px rgba(168, 85, 247, 0.5)',
                    }}
                >
                    2026
                </div>

                
                <div className="mb-6" style={{ width: 'clamp(300px, 60vw, 600px)' }}>
                    <div
                        className="relative"
                        style={{
                            background: 'rgba(0, 0, 0, 0.8)',
                            border: 'none',
                            borderRadius: 0,
                            boxShadow: `
                                0 0 0 2px #000000,
                                0 0 0 4px #1e1438,
                                0 0 0 6px #a855f7,
                                0 0 0 8px #000000,
                                0 0 20px rgba(168, 85, 247, 0.5),
                                inset 0 0 15px rgba(0, 0, 0, 0.8)
                            `,
                            height: '40px',
                            imageRendering: 'pixelated',
                        }}
                    >
                        
                        <div
                            className="absolute top-0 left-0 h-full transition-all duration-100"
                            style={{
                                width: `${progress}%`,
                                background: 'linear-gradient(90deg, #7c3aed 0%, #a855f7 50%, #c084fc 100%)',
                                boxShadow: `
                                    0 0 20px rgba(168, 85, 247, 0.8),
                                    0 0 40px rgba(192, 132, 252, 0.4),
                                    inset 0 2px 0 rgba(255, 255, 255, 0.3)
                                `,
                                imageRendering: 'pixelated',
                            }}
                        >
                            
                            <div
                                className="absolute inset-0"
                                style={{
                                    background: 'repeating-linear-gradient(90deg, transparent, transparent 4px, rgba(255, 255, 255, 0.1) 4px, rgba(255, 255, 255, 0.1) 8px)',
                                    animation: 'progressScan 1s linear infinite',
                                }}
                            />
                        </div>

                        
                        <div
                            className="absolute inset-0 flex items-center justify-center pixel-font"
                            style={{
                                fontSize: 'clamp(10px, 1.2vw, 16px)',
                                color: '#d8c6f2',
                                textShadow: '2px 2px 0px #000000, 0 0 10px rgba(168, 85, 247, 0.8)',
                                letterSpacing: '0.1em',
                            }}
                        >
                            {Math.floor(progress)}%
                        </div>
                    </div>
                </div>

                
                <div
                    className="pixel-font text-center"
                    style={{
                        fontSize: 'clamp(10px, 1vw, 14px)',
                        color: '#c084fc',
                        letterSpacing: '0.15em',
                        textShadow: '2px 2px 0px rgba(0, 0, 0, 0.5), 0 0 15px rgba(192, 132, 252, 0.5)',
                    }}
                >
                    {loadingText}
                </div>

                
                <div
                    className="pixel-font mt-8 text-center"
                    style={{
                        fontSize: 'clamp(6px, 0.7vw, 10px)',
                        color: '#8b5cf6',
                        letterSpacing: '0.1em',
                        textShadow: '1px 1px 0px rgba(0, 0, 0, 0.5)',
                        opacity: 0.7,
                    }}
                >
                    &gt; INITIALIZING TEKRON SYSTEMS...
                    <br />
                    &gt; NEWTON SCHOOL OF TECHNOLOGY
                </div>
            </div>

            
            <div
                className="absolute bottom-4 left-4 pixel-font"
                style={{
                    fontSize: '8px',
                    color: '#a855f7',
                    textShadow: '1px 1px 0px #000000',
                    opacity: 0.6,
                }}
            >
                v2.0.26
            </div>

            <div
                className="absolute bottom-4 right-4 pixel-font"
                style={{
                    fontSize: '8px',
                    color: '#a855f7',
                    textShadow: '1px 1px 0px #000000',
                    opacity: 0.6,
                }}
            >
                SYS_OK
            </div>

            <style jsx>{`
                @keyframes progressScan {
                    0% {
                        transform: translateX(-100%);
                    }
                    100% {
                        transform: translateX(100%);
                    }
                }
            `}</style>
        </div>
    );
}

export default Loading;
