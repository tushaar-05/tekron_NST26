/**
 * Gallery Component - Interactive Mosaic Gallery
 *
 * HOW TO RUN:
 * - Start dev server: npm run dev
 * - Open http://localhost:3000 (or the shown port)
 *
 * WHAT TO TEST:
 * - Auto-scroll: each of 3 columns loops seamlessly (L down @26s, C up @20s, R down @24s).
 * - Hover pause: hover a tile pauses its column immediately; hovering empty column space does NOT pause.
 * - Wheel force-scroll: hover a tile, wheel scroll pauses animation, moves column, resumes ~150ms after stop.
 * - Dialog: Enter/Space or click opens frosted dialog with pixel-block sweep overlay; ESC / outside click closes.
 * - Nav: MAP notch button (same as home page) that navigates to map; nav does not block mosaic interactions.
 * - Accessibility: tiles tabindex=0, dialog aria-modal/labels, Escape closes.
 *
 * Extra notes (per request, kept as code comments):
 * - Remove any homepage moving white line / glitch CSS or JS from this file.
 * - Make sure hover pause triggers only when hovering a `.tile` element, not when hovering empty column area.
 */

import { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

function Gallery() {
    // Dialog state
    const [selectedTile, setSelectedTile] = useState(null);
    const [sweepKey, setSweepKey] = useState(0);

    const navigate = useNavigate();

    // Column controls
    const pausedColumns = useRef(new Set());
    const hoverTimers = useRef([null, null, null]);
    const wheelTimers = useRef([null, null, null]);
    const columnRefs = [useRef(null), useRef(null), useRef(null)];
    const contentRefs = [useRef(null), useRef(null), useRef(null)];
    const stripHeights = useRef([0, 0, 0]); // half-height of duplicated strip

    // Speeds/directions sourced from data attributes and applied inline
    const columnSpeeds = [38, 50, 38]; // seconds
    const directions = ['down', 'up', 'down'];

    // Seeds for stable picsum images
    const seeds = [
        [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
        [21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40],
        [41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60],
    ];

    const tiles = seeds.flatMap((columnSeeds, colIdx) =>
        columnSeeds.map((seed, tileIdx) => ({
            id: `col-${colIdx}-tile-${tileIdx}`,
            column: colIdx,
            seed,
            title: `Gallery Image ${seed}`,
            description: `Image seeded ${seed} — stable placeholder.`,
            // Tile display should be crisp at gallery level (no pixelation)
            imageUrl: `https://picsum.photos/seed/${seed}/1200/900`,
        }))
    );

    const columns = [
        tiles.filter((t) => t.column === 0),
        tiles.filter((t) => t.column === 1),
        tiles.filter((t) => t.column === 2),
    ];

    // Apply speeds and set base transforms on mount
    useEffect(() => {
        contentRefs.forEach((ref, idx) => {
            const el = ref.current;
            if (!el) return;
            const speed = columnSpeeds[idx];
            el.dataset.speed = String(speed);
            el.style.animationDuration = `${speed}s`;
            el.style.animationName = directions[idx] === 'down' ? 'scrollDown' : 'scrollUp';
            el.style.animationTimingFunction = 'linear';
            el.style.animationIterationCount = 'infinite';
            // Base transform so the two strips stack seamlessly
            el.style.transform = directions[idx] === 'down' ? 'translateY(-50%)' : 'translateY(0)';
        });
    }, []);

    // Measure strip heights once and on resize (used to wrap manual wheel transforms)
    useEffect(() => {
        const measure = () => {
            contentRefs.forEach((ref, idx) => {
                const el = ref.current;
                if (!el) return;
                stripHeights.current[idx] = el.scrollHeight / 2;
            });
        };
        measure();
        window.addEventListener('resize', measure);
        return () => window.removeEventListener('resize', measure);
    }, []);

    // Helper: pause column animation
    const pauseColumn = useCallback((colIdx) => {
        const content = contentRefs[colIdx].current;
        if (!content) return;
        pausedColumns.current.add(colIdx);
        content.style.animationPlayState = 'paused';
    }, []);

    // Helper: resume column animation (clears inline transforms)
    const resumeColumn = useCallback((colIdx) => {
        const content = contentRefs[colIdx].current;
        if (!content) return;
        pausedColumns.current.delete(colIdx);
        content.style.transform = '';
        content.style.animation = 'none';
        // Force reflow then restart animation so it picks up from duplicated start cleanly
        void content.offsetHeight;
        const speed = content.dataset.speed || `${columnSpeeds[colIdx]}s`;
        content.style.animationName = directions[colIdx] === 'down' ? 'scrollDown' : 'scrollUp';
        content.style.animationDuration = typeof speed === 'string' && speed.endsWith('s') ? speed : `${speed}s`;
        content.style.animationTimingFunction = 'linear';
        content.style.animationIterationCount = 'infinite';
        content.style.animationPlayState = 'running';
        // Reset base transform to match animation start frame
        content.style.transform = directions[colIdx] === 'down' ? 'translateY(-50%)' : 'translateY(0)';
    }, []);

    // Hover pause on tiles only
    const handleTileEnter = useCallback((colIdx) => {
        if (hoverTimers.current[colIdx]) clearTimeout(hoverTimers.current[colIdx]);
        pauseColumn(colIdx);
    }, [pauseColumn]);

    const handleTileLeave = useCallback((colIdx) => {
        if (hoverTimers.current[colIdx]) clearTimeout(hoverTimers.current[colIdx]);
        hoverTimers.current[colIdx] = setTimeout(() => {
            resumeColumn(colIdx);
        }, 100); // 100–180ms requested; choose 140ms
    }, [resumeColumn]);

    // Force-scroll with wheel (only when hovering a .tile).
    // Touch swipe support is not implemented; to add later, mirror this logic in pointer/touchmove and call pauseColumn/resumeColumn with the same wrapping math.
    const handleWheel = useCallback(
        (e, colIdx) => {
            const tileEl = e.target.closest('.gallery-tile');
            if (!tileEl) return; // only tiles trigger force-scroll

            e.preventDefault();
            e.stopPropagation();

            const content = contentRefs[colIdx].current;
            if (!content) return;

            pauseColumn(colIdx);

            // Clear pending resume timers
            if (wheelTimers.current[colIdx]) clearTimeout(wheelTimers.current[colIdx]);

            // Get current translateY in px from computed style (animation frame)
            const computed = window.getComputedStyle(content);
            const matrix = computed.transform;
            let currentY = 0;
            if (matrix && matrix !== 'none') {
                const values = matrix.match(/matrix.*\\((.+)\\)/);
                if (values && values[1]) {
                    const parts = values[1].split(',').map((v) => parseFloat(v.trim()));
                    currentY = parts.length === 6 ? parts[5] : 0;
                }
            } else {
                currentY = directions[colIdx] === 'down' ? -stripHeights.current[colIdx] : 0;
            }

            const sensitivity = 0.7; // smooth feel
            let nextY = currentY - e.deltaY * sensitivity; // negative moves content up (visual down)

            // Wrap within one strip length to preserve seamless loop
            const half = stripHeights.current[colIdx] || 1;
            while (nextY <= -half) nextY += half;
            while (nextY >= 0) nextY -= half;

            content.style.animation = 'none';
            content.style.transform = `translateY(${nextY}px)`;

            wheelTimers.current[colIdx] = setTimeout(() => {
                resumeColumn(colIdx);
            }, 150);
        },
        [pauseColumn, resumeColumn]
    );

    // Open dialog
    const openDialog = (tile) => {
        setSelectedTile(tile);
        setSweepKey(Date.now()); // restart overlay animation
        document.body.style.overflow = 'hidden';
    };

    // Close dialog
    const closeDialog = useCallback(() => {
        setSelectedTile(null);
        document.body.style.overflow = '';
    }, []);

    // ESC to close
    useEffect(() => {
        const onKey = (e) => {
            if (e.key === 'Escape' && selectedTile) {
                closeDialog();
            }
        };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [selectedTile, closeDialog]);

    // Cleanup timers on unmount
    useEffect(() => {
        return () => {
            hoverTimers.current.forEach((t) => t && clearTimeout(t));
            wheelTimers.current.forEach((t) => t && clearTimeout(t));
            document.body.style.overflow = '';
        };
    }, []);

    // Keyboard activation for tiles
    const handleTileKeyDown = (e, tile) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            openDialog(tile);
        }
    };

    const handleNavigateToMap = () => {
        navigate('/map');
    };

    return (
        <div
            className="w-screen h-screen overflow-hidden relative"
            style={{
                background: 'linear-gradient(180deg, #1a0b2e 0%, #2d1b4e 30%, #1e1438 70%, #0f0a1e 100%)',
                fontFamily: "'Press Start 2P', cursive",
            }}
        >
            {/* Background grid (glow only) — glitch/moving line intentionally removed per requirements */}
            <div className="tech-grid-pixel absolute inset-0 z-0 opacity-10" />

            {/* Navigation - Same as home page: MAP notch button */}
            <button
                className="notch-nav-button absolute top-0 left-1/2 transform -translate-x-1/2 z-40 pixel-art"
                onClick={handleNavigateToMap}
                aria-label="Navigate to map"
            >
                <div className="notch-nav-content">
                    <span className="notch-text-default pixel-font text-white text-[17px]">MAP</span>
                    <span className="notch-text-expanded pixel-font text-white text-[17px]">NAVIGATE</span>
                </div>
            </button>

            {/* Mosaic Container */}
            <div
                className="absolute inset-0 flex justify-center items-center pt-24 pb-8 px-4"
                style={{ maxWidth: '1400px', margin: '0 auto' }}
            >
                <div className="flex gap-4 w-full h-full">
                    {columns.map((columnTiles, colIdx) => {
                        const duplicated = [...columnTiles, ...columnTiles]; // duplicated-strip technique: two identical stacks to allow 50% translateY loop with no gaps

                        return (
                            <div
                                key={colIdx}
                                ref={columnRefs[colIdx]}
                                className="flex-1 overflow-hidden"
                                style={{ maxHeight: '100%', position: 'relative' }}
                                onWheel={(e) => handleWheel(e, colIdx)}
                                onWheelCapture={(e) => handleWheel(e, colIdx)}
                            >
                                <div
                                    ref={contentRefs[colIdx]}
                                    className="flex flex-col gap-4"
                                    data-speed={columnSpeeds[colIdx]}
                                    style={{
                                        willChange: 'transform',
                                        animationPlayState: pausedColumns.current.has(colIdx) ? 'paused' : 'running',
                                    }}
                                >
                                    {duplicated.map((tile, idx) => (
                                        <div
                                            key={`${tile.id}-${idx}`}
                                            className="gallery-tile relative cursor-pointer focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-transparent"
                                            role="button"
                                            tabIndex={0}
                                            aria-label={`View ${tile.title}`}
                                            onMouseEnter={() => handleTileEnter(colIdx)}
                                            onMouseLeave={() => handleTileLeave(colIdx)}
                                            onFocus={() => handleTileEnter(colIdx)}
                                            onBlur={() => handleTileLeave(colIdx)}
                                            onClick={() => openDialog(tile)}
                                            onKeyDown={(e) => handleTileKeyDown(e, tile)}
                                            style={{
                                                borderRadius: '12px',
                                                boxShadow: 'inset 0 2px 8px rgba(0,0,0,0.25), 0 4px 12px rgba(0,0,0,0.35)',
                                                overflow: 'hidden',
                                                minHeight: '180px',
                                                backgroundImage: `url(${tile.imageUrl})`,
                                                backgroundSize: 'cover',
                                                backgroundPosition: 'center',
                                                transition: 'transform 0.2s ease',
                                            }}
                                        >
                                            <div
                                                className="absolute inset-0"
                                                style={{
                                                    background: 'linear-gradient(180deg, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.35) 100%)',
                                                }}
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Dialog */}
            {selectedTile && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center p-4"
                    role="dialog"
                    aria-modal="true"
                    aria-label={selectedTile.title}
                    onClick={closeDialog}
                    style={{ backgroundColor: 'rgba(0, 0, 0, 0.8)' }}
                >
                    <div
                        className="relative bg-gray-900 rounded-2xl p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto"
                        onClick={(e) => e.stopPropagation()}
                        style={{
                            background: 'rgba(30,30,40,0.9)',
                            backdropFilter: 'blur(20px)',
                            border: '3px solid rgba(192,132,252,0.6)',
                            boxShadow:
                                '0 0 0 2px #000, 0 0 0 4px rgba(168,85,247,0.4), 0 0 30px rgba(168,85,247,0.35), inset 0 0 20px rgba(0,0,0,0.45)',
                            borderRadius: '16px',
                        }}
                    >
                        <button
                            onClick={closeDialog}
                            aria-label="Close dialog"
                            className="absolute top-4 right-4 text-white hover:text-purple-300 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 rounded"
                            style={{ fontSize: '32px', lineHeight: '1', padding: '4px 12px', fontFamily: "'Press Start 2P', cursive" }}
                        >
                            ×
                        </button>

                        <div className="relative mb-6 overflow-hidden rounded-lg" style={{ aspectRatio: '4 / 3', background: '#0d0d16' }}>
                            <img
                                src={selectedTile.imageUrl}
                                alt={selectedTile.title}
                                className="w-full h-full object-cover"
                                loading="lazy"
                                style={{ display: 'block' }}
                            />
                            {/* Pixel-block sweep overlay: plays once on open; uses chunked gradients moving L->R then fading */}
                            <div
                                key={sweepKey}
                                className="absolute inset-0 pointer-events-none pixel-sweep-mask"
                                aria-hidden="true"
                            />
                        </div>

                        <h2
                            className="pixel-font text-xl mb-3"
                            style={{ color: '#c084fc', textShadow: '2px 2px 0px #000000, 0 0 10px rgba(192,132,252,0.5)' }}
                        >
                            {selectedTile.title}
                        </h2>
                        <p
                            className="pixel-font text-sm leading-relaxed"
                            style={{ color: '#d8c6f2', textShadow: '1px 1px 0px #000000', lineHeight: '1.7' }}
                        >
                            {selectedTile.description}
                        </p>
                    </div>
                </div>
            )}

            {/* CSS Animations and helpers */}
            <style>{`
                /* duplicated-strip infinite loop:
                   We render two identical stacks of tiles (100% + 100% height).
                   The animation translates the stack exactly 50% so copy B replaces copy A seamlessly. */
                @keyframes scrollDown {
                    0% { transform: translateY(-50%); }
                    100% { transform: translateY(0%); }
                }
                @keyframes scrollUp {
                    0% { transform: translateY(0%); }
                    100% { transform: translateY(-50%); }
                }

                /* Pixel-block sweep overlay in dialog: chunky pattern sliding L->R then fading */
                @keyframes pixelSweepMove {
                    0% { transform: translateX(-110%); opacity: 1; }
                    70% { transform: translateX(0%); opacity: 0.9; }
                    100% { transform: translateX(110%); opacity: 0; }
                }
                .pixel-sweep-mask {
                    background:
                        repeating-linear-gradient(
                            90deg,
                            rgba(0,0,0,0.25) 0px,
                            rgba(0,0,0,0.25) 14px,
                            rgba(0,0,0,0.4) 14px,
                            rgba(0,0,0,0.4) 28px
                        ),
                        repeating-linear-gradient(
                            0deg,
                            rgba(192,132,252,0.15) 0px,
                            rgba(192,132,252,0.15) 12px,
                            rgba(0,0,0,0.35) 12px,
                            rgba(0,0,0,0.35) 24px
                        );
                    mix-blend-mode: soft-light;
                    animation: pixelSweepMove 1.1s ease-out forwards;
                }

                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
            `}</style>
        </div>
    );
}

export default Gallery;