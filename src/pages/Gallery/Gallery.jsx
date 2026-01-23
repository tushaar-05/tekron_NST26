
import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { keyframes, css } from 'styled-components';
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import UnifiedBackground from '../../components/layout/UnifiedBackground';
import MiniNavbar from '../../components/layout/MiniNavbar';
import Footer from '../../components/layout/Footer';


// Asset Mappings 
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

// --- Shard Grid Components (Promoted to Main Display) ---

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
  cursor: pointer;
  background: rgba(20, 10, 30, 0.5);
  
  img, video {
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
    
    img, video {
      opacity: 1;
      filter: grayscale(0) contrast(1.1);
      transform: scale(1.05);
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
  pointer-events: all;
  
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

  img, video {
    max-width: 100%;
    max-height: 85vh;
    display: block;
    box-shadow: 0 0 30px rgba(0,0,0,0.8);
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
  const [selectedImage, setSelectedImage] = useState(null);
  const [viewState, setViewState] = useState('grid');
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

  const galleryAssets = [
    { type: 'image', src: '/images/gallery/1.jpeg' },
    { type: 'image', src: '/images/gallery/2.jpeg' },
    { type: 'image', src: '/images/gallery/3.jpeg' },
    { type: 'image', src: '/images/gallery/4.jpeg' },
    { type: 'image', src: '/images/gallery/5.jpeg' },
    { type: 'image', src: '/images/gallery/6.jpeg' },
    { type: 'video', src: '/images/gallery/7.mp4' },
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

              <div className="w-full">
                <ShardGrid>
                  {galleryAssets.map((asset, i) => (
                    <ShardImage
                      key={i}
                      variants={{
                        hidden: { opacity: 0, y: 50 },
                        show: { opacity: 1, y: 0 }
                      }}
                      initial="hidden"
                      animate="show"
                      transition={{ delay: i * 0.1 }}
                      onClick={() => setSelectedImage(asset)}
                    >
                      {asset.type === 'video' ? (
                        <video src={asset.src} muted loop onMouseOver={e => e.target.play()} onMouseOut={e => e.target.pause()} />
                      ) : (
                        <img src={asset.src} alt="Archive" loading="lazy" />
                      )}
                      <div className="meta-overlay">
                        <span>{asset.type.toUpperCase()}_0{i + 1}.RAW</span>
                        <span>{(Math.random() * 5 + 1).toFixed(1)}MB</span>
                      </div>
                    </ShardImage>
                  ))}
                </ShardGrid>
                <Footer />
              </div>
            </div>

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
                    {selectedImage.type === 'video' ? (
                      <video src={selectedImage.src} autoPlay controls style={{ maxWidth: '100%', maxHeight: '85vh' }} />
                    ) : (
                      <img src={selectedImage.src} alt="Analysis Subject" />
                    )}
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
