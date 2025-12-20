import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ComingSoon = ({ title = 'Coming Soon', launchDate = '2024-01-01', transparent = false }) => {
  const navigate = useNavigate();
  const [timeLeft, setTimeLeft] = useState({});
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [glitchEffect, setGlitchEffect] = useState(false);

  const handleExploreClick = () => {
    navigate('/map');
  };

  const handleMouseMove = (e) => {
    setCursorPosition({ x: e.clientX, y: e.clientY });
  };

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = +new Date(launchDate) - +new Date();
      let timeLeft = {};

      if (difference > 0) {
        timeLeft = {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        };
      }
      return timeLeft;
    };

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
      // Random glitch effect
      if (Math.random() > 0.95) {
        setGlitchEffect(true);
        setTimeout(() => setGlitchEffect(false), 100);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [launchDate]);

  const timerComponents = Object.keys(timeLeft).map((interval) => (
    <div key={interval} style={styles.timerUnit}>
      <div style={styles.timerNumber}>{timeLeft[interval]}</div>
      <div style={styles.timerLabel}>{interval.toUpperCase()}</div>
    </div>
  ));

  return (
    <div
      className="pixel-font"
      style={{
        ...styles.container,
        background: transparent ? 'transparent' : styles.container.background,
        ...(glitchEffect && styles.glitchEffect)
      }}
      onMouseMove={handleMouseMove}
    >
      {/* Animated Background Grid */}
      <div style={styles.gridBackground}></div>

      {/* Cursor Trail Effect */}
      <div
        style={{
          ...styles.cursorTrail,
          left: cursorPosition.x - 25,
          top: cursorPosition.y - 25,
        }}
      ></div>

      {/* Main Content */}
      <div style={styles.contentWrapper}>
        {/* Title with pixel animation */}
        <h1 style={styles.title}>
          <span style={styles.titleText}>{title}</span>
          <span style={styles.titlePixel}></span>
        </h1>

        {/* Subtitle */}
        <p style={styles.subtitle}>
          PREPARING AN EPIC ADVENTURE
        </p>

        {/* Description */}
        <div style={styles.descriptionBox}>
          <div style={styles.descriptionBorder}>
            <p style={styles.description}>
              We're crafting something extraordinary!
              Our team of pixel wizards is hard at work creating
              an experience you won't forget.
            </p>
            <div style={styles.loadingBar}>
              <div style={styles.loadingProgress}></div>
            </div>
            <p style={styles.progressText}>DEVELOPMENT IN PROGRESS • 78% COMPLETE</p>
          </div>
        </div>

        {/* Interactive Button */}
        <button
          onClick={handleExploreClick}
          style={styles.button}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-4px) scale(1.05)';
            e.currentTarget.style.boxShadow = '8px 8px 0px rgba(0,0,0,0.4)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0) scale(1)';
            e.currentTarget.style.boxShadow = '4px 4px 0px rgba(0,0,0,0.3)';
          }}
        >
          <span style={styles.buttonText}>EXPLORE MAP</span>
          <span style={styles.buttonPixel}></span>
        </button>
      </div>

      {/* Animated Pixel Art */}
      <div style={styles.pixelArtContainer}>
        <div style={styles.pixelCharacter}>
          <div style={styles.pixelHead}></div>
          <div style={styles.pixelBody}></div>
          <div style={styles.pixelArm}></div>
          <div style={styles.pixelLeg}></div>
        </div>
      </div>

      {/* Global Styles */}
      <style jsx global>{`
        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 0.8; }
          50% { transform: scale(1.1); opacity: 1; }
        }
        @keyframes rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
        @keyframes glitch {
          0% { transform: translate(0); }
          20% { transform: translate(-2px, 2px); }
          40% { transform: translate(-2px, -2px); }
          60% { transform: translate(2px, 2px); }
          80% { transform: translate(2px, -2px); }
          100% { transform: translate(0); }
        }
        @keyframes scanline {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100vh); }
        }
        @keyframes loading {
          0% { width: 0%; }
          50% { width: 100%; }
          100% { width: 0%; }
        }
        .pixel-font {
          font-family: 'Press Start 2P', 'Courier New', monospace;
          image-rendering: pixelated;
        }
      `}</style>
    </div>
  );
};

const styles = {
  container: {
    position: 'relative',
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #0d0419 0%, #1a0b2e 50%, #0d0419 100%)',
    overflow: 'hidden',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '2rem',
    color: '#d8c6f2',
  },
  glitchEffect: {
    animation: 'glitch 0.1s linear',
  },
  gridBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundImage: `
      linear-gradient(rgba(138, 79, 255, 0.1) 1px, transparent 1px),
      linear-gradient(90deg, rgba(138, 79, 255, 0.1) 1px, transparent 1px)
    `,
    backgroundSize: '40px 40px',
    opacity: 0.3,
  },
  cursorTrail: {
    position: 'fixed',
    width: '50px',
    height: '50px',
    background: 'radial-gradient(circle, rgba(138, 79, 255, 0.2) 0%, transparent 70%)',
    borderRadius: '50%',
    pointerEvents: 'none',
    zIndex: 0,
    transition: 'all 0.1s ease-out',
  },
  contentWrapper: {
    position: 'relative',
    zIndex: 2,
    textAlign: 'center',
    maxWidth: '800px',
    padding: '2rem',
    background: 'rgba(13, 4, 25, 0.8)',
    border: '3px solid #8a4fff',
    boxShadow: '0 0 40px rgba(138, 79, 255, 0.3)',
  },
  title: {
    fontSize: '3rem',
    marginBottom: '1rem',
    color: '#8a4fff',
    textTransform: 'uppercase',
    letterSpacing: '2px',
    textShadow: '6px 6px 0px rgba(0,0,0,0.5)',
    position: 'relative',
  },
  titleText: {
    position: 'relative',
    zIndex: 2,
  },
  titlePixel: {
    position: 'absolute',
    top: '5px',
    left: '5px',
    right: '-5px',
    bottom: '-5px',
    background: '#6a3dff',
    zIndex: 1,
    opacity: 0.5,
  },
  subtitle: {
    fontSize: '1.2rem',
    color: '#b39ddb',
    marginBottom: '2rem',
    letterSpacing: '3px',
    textShadow: '0 0 10px rgba(138, 79, 255, 0.5)',
    animation: 'pulse 2s infinite',
  },
  descriptionBox: {
    margin: '2rem 0',
    padding: '1rem',
    background: 'rgba(26, 11, 46, 0.7)',
    border: '2px solid #8a4fff',
    position: 'relative',
  },
  descriptionBorder: {
    padding: '1.5rem',
    border: '1px solid rgba(138, 79, 255, 0.3)',
  },
  description: {
    fontSize: '0.9rem',
    lineHeight: '1.8',
    color: '#b39ddb',
    marginBottom: '1.5rem',
    textShadow: '2px 2px 0px rgba(0,0,0,0.5)',
  },
  loadingBar: {
    width: '100%',
    height: '8px',
    background: 'rgba(138, 79, 255, 0.2)',
    border: '1px solid #8a4fff',
    margin: '1rem 0',
    position: 'relative',
    overflow: 'hidden',
  },
  loadingProgress: {
    position: 'absolute',
    height: '100%',
    background: 'linear-gradient(90deg, #8a4fff, #a16bff)',
    width: '78%',
    animation: 'pulse 1.5s infinite',
  },
  progressText: {
    fontSize: '0.7rem',
    color: '#8a4fff',
    letterSpacing: '1px',
    marginTop: '0.5rem',
  },
  timerContainer: {
    display: 'flex',
    justifyContent: 'center',
    gap: '1.5rem',
    margin: '2rem 0',
  },
  timerUnit: {
    padding: '1rem',
    minWidth: '100px',
    background: 'rgba(138, 79, 255, 0.1)',
    border: '2px solid #8a4fff',
    position: 'relative',
  },
  timerNumber: {
    fontSize: '2rem',
    color: '#fff',
    textShadow: '0 0 15px rgba(138, 79, 255, 0.8)',
    marginBottom: '0.5rem',
  },
  timerLabel: {
    fontSize: '0.7rem',
    color: '#b39ddb',
    letterSpacing: '1px',
  },
  launchedText: {
    fontSize: '1.5rem',
    color: '#8a4fff',
    padding: '1rem',
    animation: 'pulse 1s infinite',
  },
  button: {
    padding: '15px 40px',
    fontSize: '0.9rem',
    fontFamily: '"Press Start 2P", monospace',
    color: '#fff',
    background: 'linear-gradient(45deg, #8a4fff, #6a3dff)',
    border: '3px solid #a16bff',
    borderRadius: '0',
    cursor: 'pointer',
    position: 'relative',
    overflow: 'hidden',
    boxShadow: '4px 4px 0px rgba(0,0,0,0.3)',
    transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
    margin: '2rem 0',
    textTransform: 'uppercase',
    letterSpacing: '2px',
    zIndex: 2,
  },
  buttonText: {
    position: 'relative',
    zIndex: 2,
  },
  buttonPixel: {
    position: 'absolute',
    top: 0,
    left: '-100%',
    width: '100%',
    height: '100%',
    background: 'linear-gradient(45deg, #9a5fff, #7a4dff)',
    transition: 'left 0.3s',
    zIndex: 1,
  },
  socialContainer: {
    marginTop: '2rem',
    paddingTop: '1rem',
    borderTop: '1px solid rgba(138, 79, 255, 0.3)',
  },
  socialText: {
    fontSize: '0.8rem',
    color: '#b39ddb',
    marginBottom: '1rem',
    letterSpacing: '2px',
  },
  socialIcons: {
    display: 'flex',
    justifyContent: 'center',
    gap: '1.5rem',
  },
  socialIcon: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    cursor: 'pointer',
    transition: 'all 0.3s',
  },
  iconPixel: {
    width: '40px',
    height: '40px',
    background: 'rgba(138, 79, 255, 0.2)',
    border: '2px solid #8a4fff',
    marginBottom: '0.5rem',
    transition: 'all 0.3s',
  },
  iconText: {
    fontSize: '0.7rem',
    color: '#b39ddb',
    textTransform: 'uppercase',
  },
  pixelArtContainer: {
    position: 'absolute',
    bottom: '2rem',
    right: '2rem',
    animation: 'float 4s infinite ease-in-out',
  },
  pixelCharacter: {
    position: 'relative',
    width: '100px',
    height: '150px',
  },
  pixelHead: {
    position: 'absolute',
    top: '0',
    left: '25px',
    width: '50px',
    height: '50px',
    background: '#8a4fff',
    border: '2px solid #6a3dff',
  },
  pixelBody: {
    position: 'absolute',
    top: '50px',
    left: '30px',
    width: '40px',
    height: '60px',
    background: '#8a4fff',
    border: '2px solid #6a3dff',
  },
  pixelArm: {
    position: 'absolute',
    top: '60px',
    left: '0',
    width: '30px',
    height: '10px',
    background: '#6a3dff',
    animation: 'pulse 1s infinite alternate',
  },
  pixelLeg: {
    position: 'absolute',
    top: '110px',
    left: '35px',
    width: '10px',
    height: '40px',
    background: '#6a3dff',
  },
};

export default ComingSoon;