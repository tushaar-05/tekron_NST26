
import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { keyframes, css } from 'styled-components';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import UnifiedBackground from '../../components/layout/UnifiedBackground';
import MiniNavbar from '../../components/layout/MiniNavbar';

// Asset Mappings
import opt0 from '../../assets/images/gallery/ui/opt_0.jpg';
import opt1 from '../../assets/images/gallery/ui/opt_1.jpg'; // Light Bloom / Rays
import opt2 from '../../assets/images/gallery/ui/opt_2.jpg'; // Texture
import opt3 from '../../assets/images/gallery/ui/opt_3.jpg'; // Clouds / Mist
import opt5 from '../../assets/images/gallery/ui/opt_5.png'; // Photo Frame
import opt6 from '../../assets/images/gallery/ui/opt_6.jpg'; // Decorative Icon

// --- Animations ---
const bob = keyframes`
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-30px) rotate(1deg); }
`;

const cloudDriftLeft = keyframes`
  0% { transform: translate(-60%, -50%) scale(1.2) rotate(0deg); opacity: 0.2; }
  100% { transform: translate(-40%, -55%) scale(1.5) rotate(10deg); opacity: 0.4; }
`;

const cloudDriftRight = keyframes`
  0% { transform: translate(-40%, -50%) scale(1.1) rotate(0deg); opacity: 0.1; }
  100% { transform: translate(-60%, -45%) scale(1.4) rotate(-8deg); opacity: 0.3; }
`;

const noticeFade = keyframes`
  0% { opacity: 0; transform: translateY(20px); }
  20%, 80% { opacity: 0.5; transform: translateY(0); }
  100% { opacity: 0; transform: translateY(-20px); }
`;

// --- Styled Components ---

const PageContainer = styled.div`
  min-height: 100vh;
  width: 100%;
  background: #000;
  position: relative;
  overflow: hidden;
`;

// --- Video Entry ---
const VideoPortal = styled(motion.div)`
  position: fixed;
  inset: 0;
  z-index: 2000;
  background: #000;
  
  video {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const SkipGate = styled.button`
  position: absolute;
  top: 50px;
  right: 50px;
  z-index: 2001;
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.4);
  padding: 10px 20px;
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.7rem;
  text-transform: uppercase;
  letter-spacing: 0.3em;
  cursor: pointer;
  transition: all 0.4s ease;
  
  &:hover {
    color: #fff;
    border-color: #fff;
    background: rgba(255, 255, 255, 0.05);
  }
`;

const UnlockOverlay = styled(motion.div)`
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 2005;
  background: radial-gradient(circle, rgba(168, 85, 247, 0.15) 0%, transparent 70%);
`;

const UnlockButton = styled(motion.button)`
  background: transparent;
  border: 2px solid #a855f7;
  color: #fff;
  padding: 20px 40px;
  font-family: 'Press Start 2P', monospace;
  font-size: 0.8rem;
  letter-spacing: 0.1em;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  box-shadow: 0 0 30px rgba(168, 85, 247, 0.3);
  
  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 300%;
    height: 300%;
    background: radial-gradient(circle, rgba(168, 85, 247, 0.4) 0%, transparent 60%);
    transform: translate(-50%, -50%);
    opacity: 0;
    transition: opacity 0.4s ease;
  }
  
  &:hover::before {
    opacity: 1;
  }
  
  .label-sub {
    display: block;
    font-family: 'Space Grotesk', sans-serif;
    font-size: 0.6rem;
    margin-top: 10px;
    opacity: 0.4;
    text-transform: uppercase;
    letter-spacing: 0.4em;
  }
`;

const EntranceBloom = styled(motion.div)`
  position: fixed;
  inset: 0;
  z-index: 1500;
  background-image: url(${opt1});
  background-size: cover;
  background-position: center;
  mix-blend-mode: screen;
  pointer-events: none;
`;

// --- Atmospheric Memory Space ---
const VaultInterior = styled.div`
  position: fixed;
  inset: 0;
  background-image: url(${opt0});
  background-size: cover;
  background-position: center;
  z-index: 0;

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background-image: url(${opt2});
    background-size: 500px;
    opacity: 0.08;
    mix-blend-mode: overlay;
    pointer-events: none;
  }
`;

const MistLayer = styled(motion.div)`
  position: fixed;
  top: 50%;
  left: 50%;
  width: 200vw;
  height: 200vh;
  background-image: url(${opt3});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  mix-blend-mode: screen;
  pointer-events: none;
  z-index: ${props => props.$z || 1};
  animation: ${props => props.$reverse ? cloudDriftRight : cloudDriftLeft} ${props => props.$dur || '30s'} infinite alternate linear;
`;


const SystemAlert = styled.div`
  position: fixed;
  bottom: 50px;
  left: 50%;
  transform: translateX(-50%);
  font-family: 'Press Start 2P', monospace;
  font-size: 0.55rem;
  color: #fff;
  text-align: center;
  line-height: 2.2;
  z-index: 100;
  opacity: 0;
  animation: ${noticeFade} 5s forwards;
  pointer-events: none;
  letter-spacing: 0.1em;
`;

// --- Memory Bundle (Cluster Card) ---

const MemoryPack = ({ category, onClick, index }) => {
  // Pre-generate random offsets for the "bundle" look
  const photoOffsets = useMemo(() => [
    { x: -40, y: 10, r: -12, scale: 0.85, id: 'back-left' },
    { x: 50, y: -20, r: 15, scale: 0.8, id: 'back-right' },
    { x: -10, y: 40, r: 5, scale: 0.9, id: 'mid-left' },
    { x: 0, y: 0, r: 0, scale: 1.1, id: 'front-center', primary: true }
  ], []);

  return (
    <BundleContainer
      $dur={`${7 + index * 0.4}s`}
      $delay={`${index * 0.2}s`}
      onClick={() => onClick(category)}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1.5 + (index * 0.2), duration: 1 }}
      whileHover="hover"
    >
      <categoryGlow className="category-glow" />

      {photoOffsets.map((off, i) => (
        <PhotoFrame
          key={off.id}
          $z={off.primary ? 5 : 2}
          variants={{
            hover: {
              x: off.x * 1.5,
              y: off.y * 1.5,
              rotate: off.r * 1.2,
              scale: off.scale * 1.05
            }
          }}
          style={{
            x: off.x,
            y: off.y,
            rotate: off.r,
            scale: off.scale
          }}
        >
          <img src={category.images[i % category.images.length]} alt="" />
        </PhotoFrame>
      ))}

      <EngravedLabel $color={category.color}>
        <div className="title">{category.title}</div>
        <div className="accent" />
      </EngravedLabel>
    </BundleContainer>
  );
};

const BundleContainer = styled(motion.div)`
  position: relative;
  width: 260px;
  height: 320px;
  display: flex;
  justify-content: center;
  align-items: center;
  animation: ${bob} ${props => props.$dur || '8s'} ease-in-out infinite;
  animation-delay: ${props => props.$delay || '0s'};
  cursor: pointer;
  z-index: 5;
`;

const PhotoFrame = styled(motion.div)`
  position: absolute;
  width: 150px;
  height: 200px;
  z-index: ${props => props.$z || 2};
  background-image: url(${opt5});
  background-size: 100% 100%;
  padding: 12px;
  filter: drop-shadow(0 15px 30px rgba(0,0,0,0.6));
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 4px;
    filter: brightness(0.8);
    transition: filter 0.4s ease;
  }

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    box-shadow: inset 0 0 40px rgba(0,0,0,0.5);
    pointer-events: none;
  }
`;

const EngravedLabel = styled.div`
  position: absolute;
  bottom: -40px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  width: max-content;

  .title {
    font-family: 'Press Start 2P', monospace;
    font-size: 0.75rem;
    color: #fff;
    text-shadow: 
      0 0 10px ${props => props.$color || '#a855f7'},
      0 0 20px ${props => props.$color || '#a855f7'},
      2px 2px 0px rgba(0,0,0,0.8);
    letter-spacing: 0.2em;
    opacity: 0.8;
  }

  .accent {
    width: 30px;
    height: 2px;
    background: ${props => props.$color || '#a855f7'};
    box-shadow: 0 0 10px ${props => props.$color || '#a855f7'};
  }
`;

// --- Category Explorer Overlay ---

const ArchiveOverlay = styled(motion.div)`
  position: fixed;
  inset: 0;
  z-index: 3000;
  background: rgba(0, 0, 0, 0.95);
  backdrop-filter: blur(25px);
  padding: 70px 50px;
  overflow-y: auto;
`;

const ArchiveHeader = styled.div`
  max-width: 1200px;
  margin: 0 auto 80px;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  border-left: 2px solid ${props => props.$color || '#fff'};
  padding-left: 30px;

  .vault-id {
    font-family: 'Space Grotesk', sans-serif;
    font-size: 0.6rem;
    color: rgba(255, 255, 255, 0.4);
    letter-spacing: 0.5em;
    margin-bottom: 5px;
  }

  h2 {
    font-family: 'Press Start 2P', monospace;
    color: #fff;
    font-size: 2.5rem;
  }

  .close-btn {
    font-family: 'Space Grotesk', sans-serif;
    color: rgba(255, 255, 255, 0.5);
    font-size: 0.7rem;
    letter-spacing: 0.4em;
    cursor: pointer;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    padding-bottom: 5px;
    transition: all 0.3s ease;
    
    &:hover { color: #fff; border-color: #fff; }
  }
`;

const StaggeredGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  grid-auto-rows: 240px;
  gap: 30px;
  max-width: 1200px;
  margin: 0 auto;
`;

const ArchivePhoto = styled(motion.div)`
  grid-row-end: span ${props => props.$span || 1};
  position: relative;
  overflow: hidden;
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.05);
  cursor: zoom-in;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.8s cubic-bezier(0.2, 0.8, 0.2, 1);
  }

  &:hover img { transform: scale(1.08); }

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    box-shadow: inset 0 0 30px rgba(168, 85, 247, 0);
    transition: box-shadow 0.4s ease;
  }

  &:hover::after { box-shadow: inset 0 0 50px rgba(168, 85, 247, 0.2); }
`;

// --- Main Logic ---

const Gallery = () => {
  const navigate = useNavigate();
  const [stage, setStage] = useState('loading'); // loading, entry, revealing, inside
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [viewState, setViewState] = useState('grid'); // grid, zoom-in
  const [isOpened, setIsOpened] = useState(false);
  const [isStarted, setIsStarted] = useState(false);

  const videoRef = useRef(null);
  const hasFinished = useRef(false);

  useEffect(() => {
    const hasAccessed = sessionStorage.getItem('tekron_vault_session') === 'true';
    if (hasAccessed) {
      setStage('inside');
      setIsOpened(true);
      setIsStarted(true);
    } else {
      setStage('entry');
    }
  }, []);

  const startVaultSequence = () => {
    setIsStarted(true);
    if (videoRef.current) {
      videoRef.current.play().catch(err => {
        console.warn("Autoplay blocked, attempting with mute:", err);
        videoRef.current.muted = true;
        videoRef.current.play();
      });
    }
  };

  const handleGateFinished = () => {
    if (hasFinished.current) return;
    hasFinished.current = true;

    sessionStorage.setItem('tekron_vault_session', 'true');
    setStage('revealing');
    setTimeout(() => {
      setStage('inside');
      setIsOpened(true);
    }, 1800);
  };

  const categories = [
    {
      id: 'competitions',
      title: 'COMPETITIONS',
      desc: 'Artifacts of tactical triumph and binary warfare.',
      color: '#00f2ff',
      images: [
        'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=800',
        'https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=800',
        'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=800',
        'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=800'
      ]
    },
    {
      id: 'cultural',
      title: 'CULTURAL',
      desc: 'The rhythmic pulse of the Tekron legacy.',
      color: '#f0f',
      images: [
        'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?q=80&w=800',
        'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=800',
        'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=800',
        'https://images.unsplash.com/photo-1514525253361-b83f8b9627c5?q=80&w=800'
      ]
    },
    {
      id: 'workshops',
      title: 'WORKSHOPS',
      desc: 'Encoded knowledge from the pioneers of innovation.',
      color: '#7000ff',
      images: [
        'https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=800',
        'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=800',
        'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=800',
        'https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=800'
      ]
    },
    {
      id: 'master',
      title: 'MASTERCLASSES',
      desc: 'Strategic frequency adjustments by industry veterans.',
      color: '#ffaa00',
      images: [
        'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?q=80&w=800',
        'https://images.unsplash.com/photo-1505373633560-fa91a7042a32?q=80&w=800',
        'https://images.unsplash.com/photo-1491438590914-bc09fcaaf77a?q=80&w=800',
        'https://images.unsplash.com/photo-1515187029135-18ee286d815b?q=80&w=800'
      ]
    }
  ];

  return (
    <UnifiedBackground>
      <PageContainer>
        <AnimatePresence>
          {stage === 'entry' && (
            <VideoPortal
              key="gate"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.2 }}
            >
              <SkipGate onClick={handleGateFinished}>Skip Sequence</SkipGate>

              <AnimatePresence>
                {!isStarted && (
                  <UnlockOverlay
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <UnlockButton
                      onClick={startVaultSequence}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      OPEN VAULT
                      <span className="label-sub">INITIALIZE DECRYPTION</span>
                    </UnlockButton>
                  </UnlockOverlay>
                )}
              </AnimatePresence>

              <video
                ref={videoRef}
                src="/videos/vault.mp4"
                muted
                playsInline
                onTimeUpdate={(e) => {
                  // End at 6 seconds per user request
                  if (e.target.currentTime >= 6) {
                    handleGateFinished();
                  }
                }}
                onEnded={handleGateFinished}
              />
            </VideoPortal>
          )}

          {stage === 'revealing' && (
            <EntranceBloom
              key="bloom"
              initial={{ opacity: 0, scale: 1 }}
              animate={{ opacity: [0, 0.4, 0], scale: [1, 1.1] }}
              transition={{ duration: 1.2, ease: "easeOut" }}
            />
          )}
        </AnimatePresence>

        {stage === 'inside' && (
          <>
            <VaultInterior />

            <MistLayer $z={1} $dur="35s" />


            {isOpened && (
              <SystemAlert>
                SYSTEM NOTICE:<br />
                ARCHIVE DECRYPTED. VISUAL MEMORIES SYNCHRONIZED.<br />
                TEKRON PRESERVATION UNIT // SECTOR 07
              </SystemAlert>
            )}

            <MiniNavbar label="EXIT VAULT" />

            <motion.div
              style={{ height: '100vh', width: '100%', perspective: '2000px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              animate={{
                scale: selectedCategory ? 1.5 : 1,
                rotateX: selectedCategory ? 10 : 0,
              }}
              transition={{ duration: 0.8, ease: 'easeInOut' }}
            >
              <div className="grid grid-cols-2 gap-x-8 gap-y-16 md:gap-x-24 md:gap-y-20 p-6 md:p-12 max-w-6xl mx-auto">
                {categories.map((cat, i) => (
                  <MemoryPack
                    key={cat.id}
                    category={cat}
                    index={i}
                    onClick={setSelectedCategory}
                  />
                ))}
              </div>
            </motion.div>

            {/* Archive Overlay Detail */}
            <AnimatePresence>
              {selectedCategory && (
                <ArchiveOverlay
                  initial={{ opacity: 0, y: '20%' }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: '50%' }}
                  transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                >
                  <div className="max-w-6xl mx-auto h-full relative">
                    <ArchiveHeader $color={selectedCategory.color}>
                      <div>
                        <div className="vault-id">TK-UNIT-0{categories.indexOf(selectedCategory) + 1}</div>
                        <h2>{selectedCategory.title}</h2>
                        <p className="text-white/50 font-space-grotesk mt-2">{selectedCategory.desc}</p>
                      </div>
                      <div className="close-btn" onClick={() => setSelectedCategory(null)}>
                        RESTORE DASHBOARD ×
                      </div>
                    </ArchiveHeader>

                    <StaggeredGrid>
                      {selectedCategory.images.map((img, i) => (
                        <ArchivePhoto
                          key={i}
                          $span={i % 3 === 0 ? 1.5 : 1}
                          onClick={() => setSelectedImage(img)}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.2 + (i * 0.1) }}
                        >
                          <img src={img} alt="" />
                        </ArchivePhoto>
                      ))}
                    </StaggeredGrid>
                  </div>
                </ArchiveOverlay>
              )}
            </AnimatePresence>

            {/* Modal Detail View */}
            <AnimatePresence>
              {selectedImage && (
                <motion.div
                  className="fixed inset-0 z-[4000] bg-black/98 flex items-center justify-center p-12"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setSelectedImage(null)}
                >
                  <motion.img
                    src={selectedImage}
                    className="max-w-full max-h-full object-contain shadow-[0_0_80px_rgba(168,85,247,0.4)] rounded-lg"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  />
                  <div className="absolute top-10 right-10 text-white/30 hover:text-white pixel-font text-[10px] cursor-pointer">
                    ESC ARCHIVE
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </>
        )}
      </PageContainer>
    </UnifiedBackground>
  );
};

export default Gallery;
