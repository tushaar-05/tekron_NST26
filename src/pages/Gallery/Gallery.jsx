import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import UnifiedBackground from '../../components/layout/UnifiedBackground';

// --- Shared Animations ---
const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.8, ease: [0.21, 0.45, 0.32, 0.9] }
};

// --- Styled Components ---
const PageContent = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 120px 20px 100px;
  position: relative;
  z-index: 10;
`;

const Section = styled.section`
  margin-bottom: 120px;
  @media (max-width: 768px) {
    margin-bottom: 80px;
  }
`;

const VaultContainer = styled(motion.div)`
  position: fixed;
  inset: 0;
  z-index: 50;
  background: black; 
`;

const VaultDoor = styled(motion.div)`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
`;

const BentoBlock = styled(motion.div)`
  background: rgba(168, 85, 247, 0.05);
  border: 1px solid rgba(168, 85, 247, 0.1);
  border-radius: 24px;
  padding: 24px;
  transition: all 0.4s ease;
  
  &:hover {
    background: rgba(168, 85, 247, 0.1);
    border-color: rgba(168, 85, 247, 0.3);
  }
`;

const ValueHub = styled(motion.div)`
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(15px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 40px;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(168, 85, 247, 0.5), transparent);
  }
`;

const ImageCard = styled(motion.div)`
  position: relative;
  background: rgba(10, 10, 10, 0.6);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 32px;
  overflow: hidden;
  cursor: pointer;
  aspect-ratio: ${props => props.$aspect || '1/1'};
  transition: all 0.5s cubic-bezier(0.23, 1, 0.32, 1);
  
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(circle at top right, rgba(168, 85, 247, 0.15), transparent 70%);
    opacity: 0;
    transition: opacity 0.4s;
    pointer-events: none;
  }
  
  &:hover::before {
    opacity: 1;
  }
  
  &:hover {
    transform: translateY(-10px);
    border-color: rgba(168, 85, 247, 0.3);
    box-shadow: 0 20px 40px -20px rgba(168, 85, 247, 0.3);
  }
  
  img, video {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s cubic-bezier(0.23, 1, 0.32, 1);
  }
  
  &:hover img,
  &:hover video {
    transform: scale(1.05);
  }
`;

const CategoryTab = styled(motion.button)`
  padding: 14px 36px;
  background: ${props => props.$active ? 'rgba(168, 85, 247, 0.2)' : 'rgba(255, 255, 255, 0.03)'};
  border: 1px solid ${props => props.$active ? 'rgba(168, 85, 247, 0.5)' : 'rgba(255, 255, 255, 0.1)'};
  border-radius: 20px;
  color: ${props => props.$active ? '#a855f7' : 'rgba(255, 255, 255, 0.5)'};
  font-family: 'Press Start 2P', monospace;
  font-size: 10px;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  cursor: pointer;
  transition: all 0.3s;
  backdrop-filter: blur(10px);
  
  &:hover {
    background: rgba(168, 85, 247, 0.15);
    border-color: rgba(168, 85, 247, 0.4);
    color: #a855f7;
    transform: translateY(-2px);
  }
`;

const PixelLabel = ({ children, color = '#a855f7' }) => (
  <span className="text-[10px] pixel-font tracking-widest uppercase mb-4 block" style={{ color }}>
    {children}
  </span>
);

// --- Gallery Data ---
const galleryData = {
  all: [
    { id: 1, type: 'image', src: '/images/gallery/event1.jpg', category: 'events', aspect: '16/9', title: 'Opening Ceremony' },
    { id: 2, type: 'image', src: '/images/gallery/team1.jpg', category: 'team', aspect: '1/1', title: 'Core Team' },
    { id: 3, type: 'video', src: '/videos/gallery/highlight1.mp4', category: 'highlights', aspect: '9/16', title: 'Event Highlights' },
    { id: 4, type: 'image', src: '/images/gallery/event2.jpg', category: 'events', aspect: '4/3', title: 'Hackathon' },
    { id: 5, type: 'image', src: '/images/gallery/sponsor1.jpg', category: 'sponsors', aspect: '16/9', title: 'Sponsor Booth' },
    { id: 6, type: 'image', src: '/images/gallery/team2.jpg', category: 'team', aspect: '1/1', title: 'Volunteers' },
    { id: 7, type: 'image', src: '/images/gallery/event3.jpg', category: 'events', aspect: '16/9', title: 'Cultural Night' },
    { id: 8, type: 'video', src: '/videos/gallery/highlight2.mp4', category: 'highlights', aspect: '16/9', title: 'Aftermovie' },
  ],
  events: [],
  team: [],
  highlights: [],
  sponsors: []
};

// Populate categories
galleryData.all.forEach(item => {
  if (galleryData[item.category]) {
    galleryData[item.category].push(item);
  }
});

// --- Vault Animation Component with Video ---
const VaultAnimation = ({ onUnlock }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = React.useRef(null);

  const handleClick = () => {
    if (isPlaying) return;
    setIsPlaying(true);

    // Play the video
    if (videoRef.current) {
      videoRef.current.play();
    }
  };

  return (
    <VaultContainer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <VaultDoor
        onClick={handleClick}
        style={{ cursor: !isPlaying ? 'pointer' : 'default' }}
      >
        {/* Vault Video Background */}
        <div className="absolute inset-0">
          <video
            ref={videoRef}
            src="/videos/vault.mp4"
            className="w-full h-full object-cover"
            muted
            playsInline
            onEnded={() => onUnlock()}
          />
          {/* Overlay gradient for better text visibility */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60" />
        </div>

        {/* Title & Status */}
        <motion.div
          className="absolute top-16 left-0 right-0 text-center px-4"
          animate={isPlaying ? {
            opacity: [1, 1, 0],
            y: [0, 0, -30]
          } : {}}
          transition={{ duration: 3, delay: 0.6 }}
        >
          <PixelLabel color={isPlaying ? "#22c55e" : "#00fff9"}>
            {isPlaying ? 'UNLOCKING_VAULT...' : 'MEMORY_VAULT_v2.6'}
          </PixelLabel>
          <h1 className="text-5xl md:text-7xl font-bold pixel-font text-white mb-6 tracking-tight"
            style={{ textShadow: `0 0 40px ${isPlaying ? 'rgba(34, 197, 94, 0.5)' : 'rgba(0, 255, 249, 0.5)'}` }}>
            GALLERY
          </h1>
          <div className="flex items-center justify-center gap-3">
            <motion.div
              className={`w-3 h-3 rounded-full ${isPlaying ? 'bg-green-500' : 'bg-cyan-400'}`}
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
              style={{ boxShadow: `0 0 15px ${isPlaying ? 'rgba(34, 197, 94, 0.8)' : 'rgba(0, 255, 249, 0.8)'}` }}
            />
            <p className="text-sm font-mono uppercase tracking-widest"
              style={{ color: isPlaying ? '#22c55e' : '#00fff9', textShadow: `0 0 10px ${isPlaying ? 'rgba(34, 197, 94, 0.5)' : 'rgba(0, 255, 249, 0.5)'}` }}>
              {isPlaying ? '&gt; ACCESS_GRANTED' : '&gt; CLICK_TO_UNLOCK'}
            </p>
          </div>
        </motion.div>

        {/* Corner Frame Accents */}
        {[0, 1, 2, 3].map(i => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              top: i < 2 ? '20px' : 'auto',
              bottom: i >= 2 ? '20px' : 'auto',
              left: i % 2 === 0 ? '20px' : 'auto',
              right: i % 2 === 1 ? '20px' : 'auto',
              width: '60px',
              height: '60px',
              border: `2px solid ${isPlaying ? 'rgba(34, 197, 94, 0.5)' : 'rgba(0, 255, 249, 0.5)'}`,
              borderRadius: '8px',
            }}
            animate={isPlaying ? {
              scale: [1, 1.1, 0],
              opacity: [1, 1, 0]
            } : {
              opacity: [0.3, 1, 0.3]
            }}
            transition={isPlaying ? {
              duration: 3,
              delay: i * 0.2
            } : {
              duration: 2,
              repeat: Infinity,
              delay: i * 0.2
            }}
          />
        ))}

        {/* Click Indicator (only when not playing) */}
        {!isPlaying && (
          <motion.div
            className="absolute bottom-20 left-1/2 transform -translate-x-1/2"
            animate={{
              y: [0, -10, 0],
              opacity: [0.5, 1, 0.5]
            }}
            transition={{
              duration: 2,
              repeat: Infinity
            }}
          >
            <div className="text-4xl">👆</div>
          </motion.div>
        )}
      </VaultDoor>
    </VaultContainer>
  );
};

// --- Main Gallery Component ---
const Gallery = () => {
  const navigate = useNavigate();
  const [vaultUnlocked, setVaultUnlocked] = useState(false);
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedImage, setSelectedImage] = useState(null);

  const categories = [
    { id: 'all', label: 'ALL_MEMORIES', icon: '🎯' },
    { id: 'events', label: 'EVENTS', icon: '🎪' },
    { id: 'team', label: 'TEAM', icon: '👥' },
    { id: 'highlights', label: 'HIGHLIGHTS', icon: '⚡' },
    { id: 'sponsors', label: 'SPONSORS', icon: '🤝' }
  ];

  const currentGallery = galleryData[activeCategory] || [];

  return (
    <UnifiedBackground>
      <AnimatePresence>
        {!vaultUnlocked && (
          <VaultAnimation onUnlock={() => setVaultUnlocked(true)} />
        )}
      </AnimatePresence>

      {vaultUnlocked && (
        <>
          <motion.button
            onClick={() => navigate('/map')}
            className="fixed top-12 left-12 z-[100] px-8 py-4 pixel-font text-[10px] bg-[#7c3aed] text-white hover:scale-110 active:scale-95 transition-all shadow-[4px_4px_0px_#000]"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            ← EXIT_MAP
          </motion.button>

          <PageContent>
            {/* Header */}
            <Section>
              <motion.div
                className="text-center"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <PixelLabel color="#a855f7">MEMORY_VAULT_ACCESSED</PixelLabel>
                <h1 className="text-7xl md:text-9xl font-bold pixel-font text-white mb-8 tracking-tight"
                  style={{ textShadow: '0 0 40px rgba(168, 85, 247, 0.4)' }}>
                  GALLERY
                </h1>
                <p className="text-xl font-mono text-white/40 max-w-2xl mx-auto">
                  &gt; ARCHIVED_MOMENTS // TEKRON_LEGACY // v.1.0_TO_2.6
                </p>
                <motion.div className="h-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent mt-12 mx-auto max-w-xl"
                  animate={{ opacity: [0.2, 0.8, 0.2] }} transition={{ duration: 3, repeat: Infinity }} />
              </motion.div>
            </Section>

            {/* Category Tabs */}
            <Section>
              <ValueHub className="p-8 md:p-12">
                <div className="flex flex-wrap justify-center gap-4">
                  {categories.map((cat, i) => (
                    <CategoryTab
                      key={cat.id}
                      $active={activeCategory === cat.id}
                      onClick={() => setActiveCategory(cat.id)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 + i * 0.1 }}
                    >
                      <span className="mr-2">{cat.icon}</span>
                      {cat.label}
                    </CategoryTab>
                  ))}
                </div>
              </ValueHub>
            </Section>

            {/* Gallery Grid */}
            <Section>
              <motion.div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
                layout
              >
                <AnimatePresence mode="popLayout">
                  {currentGallery.map((item, i) => (
                    <ImageCard
                      key={item.id}
                      $aspect={item.aspect}
                      onClick={() => setSelectedImage(item)}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ delay: i * 0.05 }}
                      layout
                    >
                      {item.type === 'image' ? (
                        <img src={item.src} alt={item.title} />
                      ) : (
                        <video src={item.src} muted loop autoPlay playsInline />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity flex items-end p-8">
                        <div>
                          <div className="text-xs font-mono text-purple-400 uppercase tracking-widest mb-2">
                            {item.category}_ARCHIVE
                          </div>
                          <div className="text-lg font-bold pixel-font text-white">
                            {item.title}
                          </div>
                        </div>
                      </div>
                    </ImageCard>
                  ))}
                </AnimatePresence>
              </motion.div>

              {/* Empty State */}
              {currentGallery.length === 0 && (
                <motion.div
                  className="text-center py-32"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <BentoBlock className="max-w-md mx-auto p-16">
                    <div className="text-6xl mb-8">📸</div>
                    <p className="text-2xl font-mono text-white/20 uppercase tracking-widest">
                      NO_MEMORIES_FOUND
                    </p>
                  </BentoBlock>
                </motion.div>
              )}
            </Section>
          </PageContent>

          {/* Lightbox */}
          <AnimatePresence>
            {selectedImage && (
              <motion.div
                className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/95 backdrop-blur-xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedImage(null)}
              >
                <motion.div
                  className="relative max-w-6xl max-h-[90vh] w-full bg-black/60 border border-purple-500/30 rounded-[3rem] overflow-hidden backdrop-blur-2xl"
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  onClick={(e) => e.stopPropagation()}
                  style={{ boxShadow: '0 0 80px rgba(168, 85, 247, 0.3)' }}
                >
                  {selectedImage.type === 'image' ? (
                    <img
                      src={selectedImage.src}
                      alt={selectedImage.title}
                      className="w-full h-full object-contain"
                    />
                  ) : (
                    <video
                      src={selectedImage.src}
                      controls
                      autoPlay
                      className="w-full h-full object-contain"
                    />
                  )}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-8">
                    <div className="text-xs font-mono text-purple-400 uppercase tracking-widest mb-2">
                      {selectedImage.category}_ARCHIVE
                    </div>
                    <div className="text-2xl font-bold pixel-font text-white">
                      {selectedImage.title}
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedImage(null)}
                    className="absolute top-8 right-8 w-14 h-14 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center text-white transition-all backdrop-blur-sm"
                    style={{ boxShadow: '0 0 20px rgba(168, 85, 247, 0.3)' }}
                  >
                    ✕
                  </button>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}
    </UnifiedBackground>
  );
};

export default Gallery;
