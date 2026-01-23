import React from 'react';
import { useLocation } from 'react-router-dom';
import VisitorCounter from '../ui/VisitorCounter';

const Footer = () => {
  const location = useLocation();
  const isLandingPage = location.pathname === '/';

  return (
    <div className="border-t border-white/10 pt-12 pb-6 text-center w-full relative z-10">
      <h2 className="text-2xl md:text-3xl text-white mb-8 tracking-[0.2em] uppercase opacity-80 font-['VT323',_monospace]">Connect_Network</h2>
      <div className="flex justify-center gap-6 mb-8">
        <a
          href="https://www.instagram.com/tekronfest/"
          target="_blank"
          rel="noopener noreferrer"
          className="w-16 h-16 border border-white/20 flex items-center justify-center hover:bg-white/10 hover:border-purple-500 transition-all group"
        >
          <svg
            className="w-8 h-8 stroke-white group-hover:stroke-purple-400 transition-colors"
            fill="none"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            viewBox="0 0 24 24"
          >
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
          </svg>
        </a>
        <a href="https://www.youtube.com/@NewtonSchoolOfTechnology-ADYPU" target="_blank" rel="noopener noreferrer" className="w-16 h-16 border border-white/20 flex items-center justify-center hover:bg-white/10 hover:border-red-500 hover:text-red-400 transition-all">
          <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" /></svg>
        </a>
      </div>
      <p className="text-white/20 text-sm font-mono mb-2">{`//`} SYSTEM_VERSION_2.0</p>

      {/* Visitor Counter - Bottom Right on Desktop */}
      {!isLandingPage && (
        <div className="mt-4 md:mt-0 md:absolute md:right-8 md:bottom-8 z-50">
          <VisitorCounter />
        </div>
      )}
    </div>
  );
};

export default Footer;
