import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import UnifiedBackground from '../../components/layout/UnifiedBackground';
import { competitions } from '../../data/eventsData';
import EventCard from '../../components/ui/EventCard/EventCard';
import CompetitionModal from '../../components/ui/CompetitionModal/CompetitionModal';
import { motion, AnimatePresence } from 'framer-motion';
import MiniNavbar from '../../components/layout/MiniNavbar';



const Competition = () => {
  const navigate = useNavigate();
  const [selectedComp, setSelectedComp] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Progressive Rendering State
  const [visibleCount, setVisibleCount] = useState(6);

  useEffect(() => {
    if (visibleCount < competitions.length) {
      const timer = setTimeout(() => {
        setVisibleCount(prev => Math.min(prev + 4, competitions.length));
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [visibleCount]);

  const handleCardClick = (comp) => {
    setSelectedComp(comp);
    setIsModalOpen(true);
  };

  const visibleCompetitions = competitions.slice(0, visibleCount);

  return (
    <UnifiedBackground>
      <div className="min-h-screen pb-20 pt-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <MiniNavbar />

        {/* Decorative Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-[100px] animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-600/20 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '2s' }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[url('/grid.svg')] opacity-10" />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Hero Section */}
          <header className="text-center mb-20 relative">
            <div className="mb-6">
              <span className="inline-block py-1 px-3 rounded border border-purple-500/30 bg-purple-500/10 text-purple-300 text-[10px] tracking-[0.3em] font-mono mb-4 backdrop-blur-sm">
                SYSTEM_CONFIRMED // PROTOCOL_INITIATED
              </span>
            </div>
            <h1
              className="text-4xl md:text-6xl lg:text-7xl font-bold text-center pixel-font mb-4"
              style={{
                letterSpacing: '0.1em',
                textShadow: '4px 4px 0px rgba(0, 0, 0, 0.6)',
                imageRendering: 'pixelated',
                lineHeight: '1.1'
              }}
            >
              <span className="text-purple-300" style={{ filter: 'drop-shadow(0 0 15px rgba(168,85,247,0.5))' }}>
                COMPETITIONS
              </span>
            </h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="mt-8 text-lg md:text-xl text-purple-200/60 max-w-2xl mx-auto font-['VT323'] leading-relaxed"
            >
              Test your skills in the crucible of code and creativity.
              Compete with the elite in scenarios designed to push your cognitive limits.
            </motion.p>
          </header>

          {/* Grid Layout */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">
            <AnimatePresence>
              {visibleCompetitions.map((comp, index) => (
                <motion.div
                  key={comp.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                >
                  <EventCard
                    {...comp}
                    onClick={() => handleCardClick(comp)}
                    priority={index < 4}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Loading Indicator */}
          {visibleCount < competitions.length && (
            <div className="text-center py-12">
              <div className="inline-flex items-center gap-2 text-purple-400/50 font-mono text-xs tracking-widest animate-pulse">
                <div className="w-2 h-2 bg-purple-500 rounded-full" />
                SEARCHING_ADDITIONAL_PROTOCOLS...
              </div>
            </div>
          )}

          <div className="mt-20 pt-10 border-t border-white/5 text-center">
            <p className="text-white/20 font-mono text-[10px] uppercase tracking-[0.5em]">
              Dominance is not given. It is seized.
            </p>
          </div>
        </div>

        <CompetitionModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          data={selectedComp}
        />
      </div>
    </UnifiedBackground>
  );
};

export default Competition;
