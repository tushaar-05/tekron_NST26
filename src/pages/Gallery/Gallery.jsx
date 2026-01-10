
import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { keyframes, css } from 'styled-components';
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import UnifiedBackground from '../../components/layout/UnifiedBackground';
import MiniNavbar from '../../components/layout/MiniNavbar';


// Asset Mappings - Kept for potential future use or specific effects
import opt1 from '../../assets/images/gallery/ui/opt_1.jpg'; // Light Bloom / Rays


// --- Animations ---
// (Unused animations removed)
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
    transform: scale(1.1);
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
  background: radial-gradient(circle, rgba(0, 0, 0, 0.6) 0%, rgba(0,0,0,0.2) 70%);
`;

const UnlockButton = styled(motion.button)`
  background: rgba(26, 11, 46, 0.8);
  border: 2px solid #d8b4fe;
  color: #fff;
  padding: 20px 40px;
  font-family: 'Press Start 2P', monospace;
  font-size: 0.8rem;
  letter-spacing: 0.1em;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  box-shadow: 0 0 40px rgba(168, 85, 247, 0.6), inset 0 0 20px rgba(168, 85, 247, 0.3);
  
  &::before {
  content: '';
  position: absolute;
  top: 50 %;
  left: 50 %;
  width: 300 %;
  height: 300 %;
  background: radial - gradient(circle, rgba(168, 85, 247, 0.4) 0 %, transparent 60 %);
  transform: translate(-50 %, -50 %);
  opacity: 0;
  transition: opacity 0.4s ease;
}
  
  &: hover::before {
  opacity: 1;
}
  
  .label - sub {
  display: block;
  font - family: 'Space Grotesk', sans - serif;
  font - size: 0.6rem;
  margin - top: 10px;
  opacity: 0.4;
  text - transform: uppercase;
  letter - spacing: 0.4em;
}
`;

const EntranceBloom = styled(motion.div)`
position: fixed;
inset: 0;
z - index: 1500;
background - image: url(${opt1});
background - size: cover;
background - position: center;
mix - blend - mode: screen;
pointer - events: none;
`;

// --- Atmospheric Memory Space ---
// --- Holographic Background Effects ---
const scanline = keyframes`
  0% { transform: translateY(-100%); }
  100% { transform: translateY(100%); }
`;

const gridMove = keyframes`
  0% { background-position: 0 0; }
  100% { background-position: 40px 40px; }
`;

const HoloGridBackground = styled.div`
  position: fixed;
  inset: 0;
  background-color: #05020a;
  background-image: 
    linear-gradient(rgba(168, 85, 247, 0.1) 1px, transparent 1px),
    linear-gradient(90deg, rgba(168, 85, 247, 0.1) 1px, transparent 1px);
  background-size: 40px 40px;
  animation: ${gridMove} 4s linear infinite;
  perspective: 1000px;
  z-index: 0;
  
  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(circle at center, transparent 0%, #000 90%);
  }
`;

const ScanlineOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: linear-gradient(
    to bottom,
    transparent 50%,
    rgba(168, 85, 247, 0.05) 50%,
    rgba(168, 85, 247, 0.05) 51%,
    transparent 51%
  );
  background-size: 100% 4px;
  pointer-events: none;
  z-index: 10;
`;






const SystemAlert = styled.div`
position: fixed;
bottom: 50px;
left: 50 %;
transform: translateX(-50 %);
font - family: 'Press Start 2P', monospace;
font - size: 0.55rem;
color: #fff;
text - align: center;
line - height: 2.2;
z - index: 100;
opacity: 0;
/* Unused component definitions removed */
`;

// --- Quantum Data Card (Crazy Mode) ---

const CardWrapper = styled(motion.div)`
  perspective: 2000px;
  width: 100%;
  height: 420px;
  cursor: pointer;
  z-index: 10;
`;

const DataPrism = styled(motion.div)`
  width: 100%;
  height: 100%;
  position: relative;
  transform-style: preserve-3d;
  background: rgba(10, 5, 20, 0.4);
  border: 1px solid rgba(168, 85, 247, 0.3);
  backdrop-filter: blur(8px);
  
  &::before {
    content: '';
    position: absolute;
    inset: -1px;
    background: linear-gradient(
      180deg, 
      transparent 0%, 
      rgba(168, 85, 247, 0) 40%, 
      rgba(168, 85, 247, 0.4) 100%
    );
    z-index: -1;
    transform: translateZ(-20px);
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &:hover::before {
    opacity: 1;
  }
`;

const HoloProjector = styled.div`
  position: absolute;
  bottom: -20px;
  left: 10%;
  right: 10%;
  height: 20px;
  background: radial-gradient(ellipse at center, rgba(168, 85, 247, 0.8) 0%, transparent 70%);
  filter: blur(10px);
  opacity: 0;
  transition: opacity 0.3s ease;
  transform: rotateX(90deg);
  
  ${CardWrapper}:hover & {
    opacity: 1;
  }
`;

const GlitchLayer = styled(motion.div)`
  position: absolute;
  inset: 0;
  background-image: url(${props => props.$src});
  background-size: cover;
  background-position: center;
  mix-blend-mode: color-dodge;
  opacity: 0;
  z-index: 2;
  filter: contrast(1.5) brightness(1.2);
`;

const QuantumImage = styled(motion.div)`
  position: absolute;
  inset: 10px;
  background-image: url(${props => props.$src});
  background-size: cover;
  background-position: center;
  filter: grayscale(1) contrast(1.2) brightness(0.8);
  transition: filter 0.2s ease;
  border: 1px solid rgba(255, 255, 255, 0.1);
  overflow: hidden;

  /* Scanline internal */
  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(to bottom, transparent 50%, rgba(0, 0, 0, 0.4) 50%);
    background-size: 100% 4px;
    pointer-events: none;
    z-index: 10;
  }

  ${CardWrapper}:hover & {
    filter: grayscale(0) contrast(1.1) brightness(1);
    border-color: rgba(168, 85, 247, 0.6);
  }
`;

const DataOverlay = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 20px;
  background: linear-gradient(to top, rgba(0,0,0,0.95), transparent);
  transform: translateZ(30px);
  z-index: 20;
  pointer-events: none;
`;

const TechTitle = styled.h3`
  font-family: 'Press Start 2P', monospace;
  color: #fff;
  font-size: 0.85rem;
  text-shadow: 0 0 10px rgba(168, 85, 247, 0.8);
  margin-bottom: 5px;
  text-transform: uppercase;
  letter-spacing: 0.1em;
`;

const TechSubtitle = styled.div`
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.6rem;
  color: #d8b4fe;
  letter-spacing: 0.2em;
  opacity: 0.8;
  display: flex;
  justify-content: space-between;
  border-top: 1px dashed rgba(255, 255, 255, 0.2);
  padding-top: 8px;
  margin-top: 8px;
`;

const CornerDecor = styled.div`
  position: absolute;
  width: 10px;
  height: 10px;
  border: 2px solid #a855f7;
  transition: all 0.3s ease;
  z-index: 30;

  &.tl { top: -2px; left: -2px; border-right: 0; border-bottom: 0; }
  &.tr { top: -2px; right: -2px; border-left: 0; border-bottom: 0; }
  &.bl { bottom: -2px; left: -2px; border-right: 0; border-top: 0; }
  &.br { bottom: -2px; right: -2px; border-left: 0; border-top: 0; }

  ${CardWrapper}:hover & {
    width: 20px;
    height: 20px;
    border-color: #fff;
    box-shadow: 0 0 10px #a855f7;
  }
`;

const QuantumDataCard = ({ category, index, onClick }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [15, -15]), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-15, 15]), { stiffness: 300, damping: 30 });
  const sheenGradient = useTransform(x, [-0.5, 0.5],
    ['linear-gradient(115deg, transparent 0%, rgba(255,255,255,0) 100%)', 'linear-gradient(115deg, transparent 0%, rgba(255,255,255,0.1) 100%)']
  );

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = (mouseX / width) - 0.5;
    const yPct = (mouseY / height) - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <CardWrapper
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={() => onClick(category)}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
    >
      <DataPrism style={{ rotateX, rotateY }}>
        <CornerDecor className="tl" />
        <CornerDecor className="tr" />
        <CornerDecor className="bl" />
        <CornerDecor className="br" />

        <HoloProjector />

        <QuantumImage $src={category.images[0]} style={{ transform: 'translateZ(10px)' }} />

        {/* Animated Glitch/Sheen Layer */}
        <GlitchLayer
          $src={category.images[0]}
          style={{
            x: useTransform(x, [-0.5, 0.5], [-10, 10]),
            opacity: useTransform(x, [-0.5, 0.5], [0, 0.3]),
            transform: 'translateZ(20px)'
          }}
        />

        <DataOverlay>
          <TechTitle>{category.title}</TechTitle>
          <TechSubtitle>
            <span>SEC-{index + 1} // ARCHIVE</span>
            <span>{category.images.length} FILES</span>
          </TechSubtitle>
        </DataOverlay>

        {/* Floating Particles/Scanlines */}
        <motion.div
          style={{
            position: 'absolute', top: '20%', left: 0, right: 0, height: '1px', background: 'rgba(168, 85, 247, 0.5)',
            boxShadow: '0 0 10px #a855f7', transform: 'translateZ(40px)', opacity: 0
          }}
          animate={{ top: ['0%', '100%'], opacity: [0, 1, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear", delay: index * 0.5 }}
        />

      </DataPrism>
    </CardWrapper>
  );
};

// --- Category Explorer Overlay ---

// --- Quantum Archive Overlay ---

const OverlayContainer = styled(motion.div)`
  position: fixed;
  inset: 0;
  z-index: 3000;
  background: #05020a;
  overflow-y: auto;
  perspective: 1000px;

  /* Code Rain / Matrix Background Effect */
  background-image: 
    linear-gradient(rgba(168, 85, 247, 0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(168, 85, 247, 0.03) 1px, transparent 1px);
  background-size: 20px 20px;
`;

const TerminalHeader = styled.div`
  position: sticky;
  top: 0;
  z-index: 40;
  background: rgba(5, 2, 10, 0.95);
  border-bottom: 1px solid rgba(168, 85, 247, 0.3);
  backdrop-filter: blur(10px);
  padding: 20px 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  &::after {
    content: '';
    position: absolute;
    bottom: -1px;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, #a855f7, transparent);
    animation: ${gridMove} 2s linear infinite; /* Reusing gridMove for shimmery line */
  }
`;

const TerminalText = styled.div`
  font-family: 'Space Mono', monospace;
  color: #a855f7;
  font-size: 0.8rem;
  display: flex;
  flex-direction: column;
  gap: 4px;

  .path {
    opacity: 0.5;
    font-size: 0.7rem;
  }

  .command {
    color: #fff;
    &::after {
      content: '_';
      animation: blink 1s step-end infinite;
    }
  }

  @keyframes blink { 50% { opacity: 0; } }
`;

const EjectButton = styled.button`
  background: rgba(255, 0, 80, 0.1);
  border: 1px solid rgba(255, 0, 80, 0.4);
  color: #ff0050;
  font-family: 'Press Start 2P', monospace;
  font-size: 0.7rem;
  padding: 12px 24px;
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 0.1em;

  &:hover {
    background: rgba(255, 0, 80, 0.2);
    box-shadow: 0 0 15px rgba(255, 0, 80, 0.4);
    text-shadow: 0 0 5px #ff0050;
  }
`;

const ShardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
  max-width: 1400px;
  margin: 40px auto;
  padding: 0 40px 80px;
`;

const ShardImage = styled(motion.div)`
  position: relative;
  height: 300px;
  border: 1px solid rgba(168, 85, 247, 0.1);
  overflow: hidden;
  cursor: crosshair;
  background: rgba(20, 10, 30, 0.5);
  
  /* Shard shape via clip-path could be added here, but simple rectangles fit strict grid better */
  /* clip-path: polygon(10% 0, 100% 0, 100% 90%, 90% 100%, 0 100%, 0 10%); */

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: 0.6;
    filter: grayscale(1) contrast(1.2);
    transition: all 0.4s cubic-bezier(0.2, 0.8, 0.2, 1);
  }

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    box-shadow: inset 0 0 0 1px rgba(168, 85, 247, 0);
    transition: all 0.3s ease;
    z-index: 2;
    pointer-events: none;
  }

  /* Tech Overlay on Hover */
  .meta-overlay {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 10px;
    background: rgba(0, 0, 0, 0.8);
    transform: translateY(100%);
    transition: transform 0.3s ease;
    z-index: 3;
    display: flex;
    justify-content: space-between;
    font-family: 'Space Mono', monospace;
    font-size: 0.6rem;
    color: #a855f7;
  }

  &:hover {
    z-index: 10;
    border-color: #a855f7;
    
    img {
      opacity: 1;
      filter: grayscale(0) contrast(1.1);
      transform: scale(1.1);
    }

    &::before {
      box-shadow: inset 0 0 20px rgba(168, 85, 247, 0.3);
    }

    .meta-overlay {
      transform: translateY(0);
    }
  }
`;

// --- Analysis Modal ---

const AnalysisModal = styled(motion.div)`
  position: fixed;
  inset: 0;
  z-index: 4000;
  background: rgba(0, 0, 0, 0.98);
  display: flex;
  align-items: center;
  justify-content: center;
  
  /* Grid lines overlay */
  background-image: 
    linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
  background-size: 100px 100px;
`;

const ViewerFrame = styled.div`
  position: relative;
  max-width: 90vw;
  max-height: 90vh;
  border: 1px solid rgba(168, 85, 247, 0.5);
  box-shadow: 0 0 50px rgba(168, 85, 247, 0.1);

  img {
    max-width: 100%;
    max-height: 85vh;
    display: block;
  }
`;



const PageHeader = styled.div`
  text-align: center;
  margin-bottom: 60px;
  position: relative;
  z-index: 10;
  padding-top: 100px; /* Clear navbar */

  h1 {
    font-family: 'Press Start 2P', monospace;
    font-size: 2.5rem; /* Responsive sizing handled in index.css typically, but forcing specific here */
    color: #fff;
    text-shadow: 0 0 20px rgba(168, 85, 247, 0.5);
    margin-bottom: 16px;
    
    @media (max-width: 768px) {
      font-size: 1.5rem;
    }
  }

  p {
    font-family: 'Space Grotesk', sans-serif;
    color: rgba(255, 255, 255, 0.6);
    font-size: 0.9rem;
    letter-spacing: 0.3em;
    text-transform: uppercase;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 15px;

    &::before, &::after {
      content: '';
      width: 40px;
      height: 1px;
      background: linear-gradient(90deg, transparent, #a855f7, transparent);
    }
  }
`;

const ScanningBar = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: #a855f7;
  box-shadow: 0 0 15px #a855f7;
  animation: scan 3s linear infinite alternate;
  opacity: 0.7;
  pointer-events: none;

  @keyframes scan {
    0% { top: 0; }
    100% { top: 100%; }
  }
`;

const HUDOverlay = styled.div`
  position: absolute;
  inset: 0;
  border: 20px solid transparent;
  border-image: linear-gradient(45deg, #a855f7, transparent 20%, transparent 80%, #a855f7) 1;
  pointer-events: none;

  &::after {
    content: 'ANALYSIS MODE // ENHANCE';
    position: absolute;
    top: -30px;
    left: 0;
    font-family: 'Space Mono', monospace;
    font-size: 0.7rem;
    color: #a855f7;
    letter-spacing: 0.2em;
  }
`;

const CloseAnalaysis = styled.button`
  position: absolute;
  top: 40px;
  right: 40px;
  background: transparent;
  border: none;
  color: rgba(255, 255, 255, 0.5);
  font-family: 'Press Start 2P', monospace;
  font-size: 1.5rem;
  cursor: pointer;
  transition: color 0.3s;

  &:hover { color: #ff0050; }
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
            <HoloGridBackground />
            <ScanlineOverlay />

            <div className="fixed inset-0 flex flex-col p-6 sm:p-12 overflow-y-auto">
              {/* Navbar */}
              <MiniNavbar />

              {/* Header */}
              <PageHeader>
                <h1>SECURED ARCHIVES</h1>
                <p>SELECT A DATA FRAGMENT TO DECRYPT</p>
              </PageHeader>

              <div className="max-w-7xl w-full mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 content-start pb-20">
                {categories.map((cat, i) => (
                  <QuantumDataCard
                    key={cat.id}
                    category={cat}
                    index={i}
                    onClick={setSelectedCategory}
                  />
                ))}
              </div>
            </div>

            {/* Archive Overlay Detail */}
            <AnimatePresence>
              {selectedCategory && (
                <OverlayContainer
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <TerminalHeader>
                    <TerminalText>
                      <span className="path">~/ARCHIVE/{selectedCategory.title.replace(' ', '_')}</span>
                      <span className="command">EXECUTE DECRYPTION *.*</span>
                    </TerminalText>
                    <EjectButton onClick={() => setSelectedCategory(null)}>
                      EJECT DRIVE
                    </EjectButton>
                  </TerminalHeader>

                  <ShardGrid>
                    {selectedCategory.images.map((img, i) => (
                      <ShardImage
                        key={i}
                        variants={{
                          hidden: { opacity: 0, y: 50 },
                          show: { opacity: 1, y: 0 }
                        }}
                        initial="hidden"
                        animate="show"
                        transition={{ delay: i * 0.05 }}
                        onClick={() => setSelectedImage(img)}
                      >
                        <img src={img} alt="Evidence" loading="lazy" />
                        <div className="meta-overlay">
                          <span>IMG_0{i + 1}.RAW</span>
                          <span>{(Math.random() * 5 + 1).toFixed(1)}MB</span>
                        </div>
                      </ShardImage>
                    ))}
                  </ShardGrid>
                </OverlayContainer>
              )}
            </AnimatePresence>

            {/* Modal Detail View */}
            <AnimatePresence>
              {selectedImage && (
                <AnalysisModal
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setSelectedImage(null)}
                >
                  <CloseAnalaysis onClick={() => setSelectedImage(null)}>×</CloseAnalaysis>

                  <ViewerFrame onClick={(e) => e.stopPropagation()}>
                    <img src={selectedImage} alt="Analysis Subject" />
                    <ScanningBar />
                    <HUDOverlay />
                  </ViewerFrame>
                </AnalysisModal>
              )}
            </AnimatePresence>
          </>
        )}
      </PageContainer>
    </UnifiedBackground>
  );
};

export default Gallery;
