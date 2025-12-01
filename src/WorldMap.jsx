import { useState } from 'react';

function WorldMap({ onNavigateHome }) {
    const [hoveredIsland, setHoveredIsland] = useState(null);

    const islands = [
        { id: 'home', name: 'HOME', position: { left: '21%', top: '38%' }, size: { width: '12%', height: '20%' } },
        { id: 'events', name: 'EVENTS', position: { left: '35.5%', top: '20%' }, size: { width: '12%', height: '20%' } },
        { id: 'library', name: 'LIBRARY', position: { left: '60%', top: '15%' }, size: { width: '12%', height: '22%' } },
        { id: 'profile', name: 'PROFILE', position: { left: '77%', top: '30%' }, size: { width: '12%', height: '20%' } },
        { id: 'leaderboard', name: 'LEADERBOARD', position: { left: '81%', top: '55%' }, size: { width: '12%', height: '20%' } },
        { id: 'contact', name: 'CONTACT', position: { left: '65%', top: '75%' }, size: { width: '12%', height: '20%' } },
        { id: 'shop', name: 'SHOP', position: { left: '40%', top: '78%' }, size: { width: '12%', height: '20%' } },
        { id: 'training', name: 'TRAINING', position: { left: '20%', top: '60%' }, size: { width: '12%', height: '20%' } },
    ];

    const handleIslandClick = (island) => {
        if (island.id === 'home' && onNavigateHome) {
            onNavigateHome();
        } else {
            console.log(`Navigating to: ${island.name}`);
        }
    };

    return (
        <div className="world-map-container">
            
            <div className="world-map-wrapper">
                <img
                    src="/images/world-map.jpg"
                    alt="TEKRON World Map"
                    className="world-map-image pixel-art"
                />

                
                {islands.map((island) => (
                    <div
                        key={island.id}
                        className={`island-hotspot ${hoveredIsland === island.id ? 'hovered' : ''}`}
                        style={{
                            position: 'absolute',
                            left: island.position.left,
                            top: island.position.top,
                            width: island.size.width,
                            height: island.size.height,
                            transform: 'translate(-50%, -50%)',
                        }}
                        onMouseEnter={() => setHoveredIsland(island.id)}
                        onMouseLeave={() => setHoveredIsland(null)}
                        onClick={() => handleIslandClick(island)}
                    >
                        
                        {hoveredIsland === island.id && (
                            <div className="island-tooltip pixel-font">
                                {island.name}
                            </div>
                        )}
                    </div>
                ))}
            </div>

            <style jsx>{`
                .world-map-container {
                    width: 100%;
                    height: 100vh;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background: linear-gradient(180deg, #0a0a1e 0%, #1a0b2e 50%, #0f0a1e 100%);
                    overflow: hidden;
                }

                .world-map-wrapper {
                    position: relative;
                    width: 90vw;
                    max-width: 1400px;
                    aspect-ratio: 1 / 1;
                    margin: 0 auto;
                }

                .world-map-image {
                    width: 100%;
                    height: 100%;
                    object-fit: contain;
                    image-rendering: pixelated;
                    image-rendering: -moz-crisp-edges;
                    image-rendering: crisp-edges;
                }

                .island-hotspot {
                    cursor: pointer;
                    transition: all 0.2s ease;
                    z-index: 10;
                }

                .island-hotspot:hover {
                    filter: brightness(1.3);
                }

                .island-hotspot::before {
                    content: '';
                    position: absolute;
                    inset: -10%;
                    background: radial-gradient(circle, rgba(192, 132, 252, 0.3) 0%, transparent 70%);
                    opacity: 0;
                    transition: opacity 0.3s ease;
                    pointer-events: none;
                    border-radius: 50%;
                }

                .island-hotspot.hovered::before {
                    opacity: 1;
                    animation: pulse 1.5s ease-in-out infinite;
                }

                .island-tooltip {
                    position: absolute;
                    bottom: -40px;
                    left: 50%;
                    transform: translateX(-50%);
                    background: rgba(30, 30, 40, 0.95);
                    border: none;
                    border-radius: 0;
                    box-shadow: 
                        0 0 0 2px #000000,
                        0 0 0 4px #a855f7,
                        0 0 20px rgba(168, 85, 247, 0.6);
                    padding: 8px 16px;
                    color: #c084fc;
                    font-size: 10px;
                    white-space: nowrap;
                    text-shadow: 
                        1px 1px 0px #000000,
                        0 0 10px rgba(168, 85, 247, 0.5);
                    letter-spacing: 0.1em;
                    image-rendering: pixelated;
                    animation: fadeIn 0.2s ease;
                    pointer-events: none;
                }

                @keyframes pulse {
                    0%, 100% {
                        opacity: 1;
                        transform: scale(1);
                    }
                    50% {
                        opacity: 0.7;
                        transform: scale(1.1);
                    }
                }

                @keyframes fadeIn {
                    from {
                        opacity: 0;
                        transform: translateX(-50%) translateY(5px);
                    }
                    to {
                        opacity: 1;
                        transform: translateX(-50%) translateY(0);
                    }
                }

                /* Responsive adjustments */
                @media (max-width: 768px) {
                    .world-map-wrapper {
                        width: 95vw;
                    }

                    .island-tooltip {
                        font-size: 8px;
                        padding: 6px 12px;
                        bottom: -35px;
                    }
                }
            `}</style>
        </div>
    );
}

export default WorldMap;
