import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const MiniNavbar = ({ to = '/map', label = 'BACK TO MAP' }) => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-6 left-0 w-full flex justify-center z-50 pointer-events-none"
    >
      <motion.button
        onClick={() => navigate(to)}
        className="pointer-events-auto px-6 py-2 pixel-font text-[10px] sm:text-xs backdrop-blur-md border border-purple-400/30 rounded-full shadow-lg flex items-center gap-2"
        style={{
          background: 'linear-gradient(135deg, rgba(124, 58, 237, 0.2) 0%, rgba(168, 85, 247, 0.2) 100%)',
          boxShadow: '0 0 15px rgba(124, 58, 237, 0.3), 0 4px 8px rgba(0, 0, 0, 0.2)'
        }}
        whileHover={{
          scale: 1.05,
          background: 'linear-gradient(135deg, rgba(124, 58, 237, 0.3) 0%, rgba(168, 85, 247, 0.3) 100%)',
          boxShadow: '0 0 20px rgba(168, 85, 247, 0.4), 0 6px 12px rgba(0, 0, 0, 0.3)'
        }}
        whileTap={{ scale: 0.95 }}
      >
        <span className="text-base">←</span>
        <span className="tracking-widest opacity-90">{label}</span>
      </motion.button>
    </motion.div>
  );
};

export default MiniNavbar;
