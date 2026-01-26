import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const EventCard = ({ title, category, image, description, prizePool, unstopLink, registrationDeadline, isRegistrationClosed = false, onClick, priority = false }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    if (!registrationDeadline) return;

    const targetDate = new Date(registrationDeadline).getTime();

    const updateCountdown = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft({ days, hours, minutes, seconds });
        setIsExpired(false);
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        setIsExpired(true);
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, [registrationDeadline]);

  const showClosedStatus = isRegistrationClosed || isExpired;

  return (
    <motion.div
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "50px" }}
      className="group relative w-full bg-black/40 backdrop-blur-md border border-white/10 rounded-xl overflow-hidden cursor-pointer transition-all duration-500 hover:border-purple-500/50 hover:shadow-[0_0_30px_rgba(168,85,247,0.15)]"
    >
      {/* Animated Gradient Border Overlay */}
      <div className={`absolute inset-0 bg-gradient-to-r from-transparent via-purple-500/10 to-transparent translate-x-[-100%] transition-transform duration-1000 group-hover:translate-x-[100%] z-0 pointer-events-none`} />

      {/* Hero Image Section - Redesigned for better poster visibility */}
      <div className="relative h-96 w-full overflow-hidden border-b border-purple-500/20 bg-transparent">

        {image ? (
          <>
            <img
              src={image}
              alt={title}
              loading={priority ? "eager" : "lazy"}
              onLoad={() => setImageLoaded(true)}
              className={`w-full h-full object-cover object-top transition-all duration-700 group-hover:scale-105 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
            />
          </>
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800">
            <span className="text-4xl font-bold text-white/10">{title.charAt(0)}</span>
          </div>
        )}

        {/* Category Tag - Repositioned */}
        <div className="absolute top-4 left-4 z-20">
          <span className="px-3 py-1.5 bg-purple-600/80 backdrop-blur-md border border-purple-400/50 text-xs uppercase tracking-widest text-white font-bold rounded shadow-lg shadow-purple-500/20">
            {category}
          </span>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-5 sm:p-6 relative z-10">
        <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-2 font-['VT323'] tracking-wide group-hover:text-purple-300 transition-colors uppercase truncate">
          {title}
        </h3>

        {description && (
          <p className="text-sm text-gray-400 line-clamp-2 mb-4 sm:mb-6 font-mono leading-relaxed h-10">
            {description}
          </p>
        )}

        {/* Footer Meta */}
        <div className="flex items-center justify-between pt-4 border-t border-white/5">
          {prizePool && (
            <div className="flex flex-col">
              <span className="text-xs text-purple-200 uppercase tracking-wider font-mono font-bold mb-1">Prize Pool</span>
              <span className="text-2xl md:text-3xl text-yellow-400 font-bold font-['VT323'] drop-shadow-[0_0_10px_rgba(250,204,21,0.4)]">
                {prizePool}
              </span>
            </div>
          )}

          {unstopLink && (
            <a
              href={showClosedStatus ? "#" : unstopLink}
              target={showClosedStatus ? "_self" : "_blank"}
              rel="noopener noreferrer"
              onClick={(e) => {
                e.stopPropagation();
                if (showClosedStatus) e.preventDefault();
              }}
              className={`flex items-center gap-2 px-3 py-2.5 sm:px-4 sm:py-2.5 md:px-6 md:py-2.5 rounded transition-all group/btn ${showClosedStatus
                ? 'bg-gray-700/50 border-gray-600 text-gray-400 cursor-not-allowed'
                : 'bg-purple-600 hover:bg-purple-500 border border-purple-400 hover:border-purple-300 shadow-[0_0_15px_rgba(147,51,234,0.3)] hover:shadow-[0_0_25px_rgba(168,85,247,0.5)]'
                }`}
            >
              <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-white">
                Register
              </span>
              {!showClosedStatus && (
                <svg className="w-4 h-4 text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
              )}
            </a>
          )}
        </div>

        {registrationDeadline && (
          <div className="mt-4 pt-3 border-t border-white/5 w-full">
            <div className="flex items-center justify-between">
              <span className="text-[10px] text-purple-300 font-mono uppercase tracking-wider">
                Registration Ends In
              </span>
              <div className="flex gap-2 items-center bg-black/40 px-3 py-1.5 rounded border border-purple-500/20 shadow-inner">
                <div className="flex flex-col items-center min-w-[28px]">
                  <span className="text-base font-bold text-white leading-none font-['VT323']">{showClosedStatus ? 0 : timeLeft.days}</span>
                  <span className="text-[9px] text-purple-400 leading-none mt-0.5">DAYS</span>
                </div>
                <span className="text-purple-500 text-xs mb-2">:</span>
                <div className="flex flex-col items-center min-w-[28px]">
                  <span className="text-base font-bold text-white leading-none font-['VT323']">{showClosedStatus ? '00' : String(timeLeft.hours).padStart(2, '0')}</span>
                  <span className="text-[9px] text-purple-400 leading-none mt-0.5">HRS</span>
                </div>
                <span className="text-purple-500 text-xs mb-2">:</span>
                <div className="flex flex-col items-center min-w-[28px]">
                  <span className="text-base font-bold text-white leading-none font-['VT323']">{showClosedStatus ? '00' : String(timeLeft.minutes).padStart(2, '0')}</span>
                  <span className="text-[9px] text-purple-400 leading-none mt-0.5">MINS</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </motion.div >
  );
};

export default EventCard;
