import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// EventCard Component
const EventCard = ({ title, category }) => {
  const [isHovered, setIsHovered] = useState(false);

  const particles = Array.from({ length: 8 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    color: ['#a855f7', '#7c3aed', '#6366f1', '#8b5cf6'][Math.floor(Math.random() * 4)]
  }));

  const getCategoryGradient = (cat) => {
    if (cat === 'Competition') return 'from-purple-500 to-purple-700';
    if (cat === 'Workshop') return 'from-indigo-500 to-indigo-700';
    return 'from-violet-500 to-violet-800';
  };

  const getDescription = (cat) => {
    if (cat === 'Competition') return 'Compete with the best and showcase your skills';
    if (cat === 'Workshop') return 'Learn from experts and gain hands-on experience';
    return 'Experience innovation and technology firsthand';
  };

  return (
    <div
      className="relative overflow-hidden rounded-3xl cursor-pointer transition-all duration-500 ease-out"
      style={{
        background: 'linear-gradient(135deg, rgba(30, 20, 56, 0.8), rgba(45, 27, 78, 0.6))',
        backdropFilter: 'blur(20px)',
        transform: isHovered ? 'translateY(-10px) scale(1.02)' : 'translateY(0) scale(1)',
        boxShadow: isHovered
          ? '0 20px 40px rgba(168, 85, 247, 0.3), 0 0 60px rgba(124, 58, 237, 0.2)'
          : '0 4px 6px rgba(0, 0, 0, 0.1)'
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className="absolute inset-0 rounded-3xl transition-opacity duration-400"
        style={{
          padding: '2px',
          background: 'linear-gradient(135deg, #a855f7, #7c3aed, #6366f1)',
          WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude',
          opacity: isHovered ? 1 : 0
        }}
      />

      <div
        className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%] transition-opacity duration-400 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(168, 85, 247, 0.1) 0%, transparent 70%)',
          opacity: isHovered ? 1 : 0
        }}
      />

      <div className="relative w-full h-56 flex items-center justify-center overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #1e1438 0%, #2d1b4e 50%, #1a0b2e 100%)'
        }}>
        <div className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `
              repeating-linear-gradient(0deg, rgba(168, 85, 247, 0.1) 0px, transparent 1px, transparent 2px, rgba(168, 85, 247, 0.1) 3px),
              repeating-linear-gradient(90deg, rgba(168, 85, 247, 0.1) 0px, transparent 1px, transparent 2px, rgba(168, 85, 247, 0.1) 3px)
            `
          }}
        />

        <div className="relative z-10">
          <div
            className="w-24 h-24 rounded-full flex items-center justify-center text-5xl font-extrabold relative transition-transform duration-300"
            style={{
              background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.2), rgba(124, 58, 237, 0.3))',
              border: '3px solid rgba(168, 85, 247, 0.4)',
              color: '#d8c6f2',
              textShadow: '0 0 20px rgba(168, 85, 247, 0.6)',
              transform: isHovered ? 'scale(1.1) rotate(5deg)' : 'scale(1) rotate(0deg)'
            }}
          >
            <div
              className="absolute rounded-full animate-pulse"
              style={{
                inset: '-10px',
                background: 'radial-gradient(circle, rgba(168, 85, 247, 0.2) 0%, transparent 70%)',
                animation: 'pulse 2s ease-in-out infinite'
              }}
            />
            <span className="relative z-10">{title.charAt(0)}</span>
          </div>
        </div>
      </div>

      <div className="relative z-10 p-7 flex flex-col gap-3">
        <span
          className={`inline-block py-2 px-4 bg-gradient-to-r ${getCategoryGradient(category)} text-white text-xs font-bold uppercase tracking-wider rounded-lg w-fit shadow-lg`}
          style={{ textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)' }}
        >
          {category}
        </span>

        <h3
          className="text-2xl font-extrabold m-0 leading-tight tracking-wide"
          style={{
            background: 'linear-gradient(135deg, #ffffff, #d8c6f2)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            textShadow: '0 2px 8px rgba(0, 0, 0, 0.5)'
          }}
        >
          {title}
        </h3>

        <p className="text-sm leading-relaxed m-0 opacity-90" style={{ color: '#c8b6e2' }}>
          {getDescription(category)}
        </p>
      </div>

      {isHovered && (
        <div className="absolute inset-0 pointer-events-none">
          {particles.map((particle, index) => (
            <div
              key={particle.id}
              className="absolute w-1 h-1 rounded-full"
              style={{
                left: `${particle.x}%`,
                top: `${particle.y}%`,
                background: particle.color,
                boxShadow: `0 0 10px ${particle.color}`,
                animation: `float-${index} 2s ease-in-out infinite`,
                animationDelay: `${index * 0.2}s`
              }}
            />
          ))}
        </div>
      )}

      <style>{`
        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 0.5; }
          50% { transform: scale(1.2); opacity: 0.8; }
        }
        ${particles.map((_, i) => `
          @keyframes float-${i} {
            0%, 100% { transform: translateY(0); opacity: 0; }
            50% { transform: translateY(-20px); opacity: 1; }
          }
        `).join('')}
      `}</style>
    </div>
  );
};

// Events Page Component
export default function Events() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('All');

  // Sample events data
  const events = [
    { id: 1, title: 'AI Hackathon 2024', category: 'Competition' },
    { id: 2, title: 'Web3 Workshop', category: 'Workshop' },
    { id: 3, title: 'Tech Keynote', category: 'Event' },
    { id: 4, title: 'Code Sprint', category: 'Competition' },
    { id: 5, title: 'React Masterclass', category: 'Workshop' },
    { id: 6, title: 'Innovation Summit', category: 'Event' },
    { id: 7, title: 'Data Science Challenge', category: 'Competition' },
    { id: 8, title: 'Cloud Computing 101', category: 'Workshop' },
    { id: 9, title: 'Startup Showcase', category: 'Event' },
  ];

  const categories = ['All', ...new Set(events.map(event => event.category))];

  const filteredEvents = activeTab === 'All'
    ? events
    : events.filter(event => event.category === activeTab);

  return (
    <div className="w-full overflow-x-hidden relative" style={{ background: '#0f0a1e', color: 'white', padding: '80px 20px 60px', minHeight: '100vh' }}>
      {/* Back Button */}
      <button
        onClick={() => navigate('/map')}
        className="fixed top-8 left-8 px-6 py-3 rounded-lg font-semibold text-base cursor-pointer transition-all duration-300 z-50"
        style={{
          background: 'rgba(168, 85, 247, 0.1)',
          border: '2px solid rgba(168, 85, 247, 0.3)',
          backdropFilter: 'blur(10px)',
          color: 'white'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = 'rgba(168, 85, 247, 0.2)';
          e.currentTarget.style.transform = 'translateY(-2px)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = 'rgba(168, 85, 247, 0.1)';
          e.currentTarget.style.transform = 'translateY(0)';
        }}
      >
        ← Back to Map
      </button>

      {/* Content Wrapper */}
      <div className="max-w-7xl mx-auto px-5">
        {/* Header */}
        <header className="text-center mb-16">
          <h1
            className="text-6xl font-extrabold mb-5 leading-tight"
            style={{
              background: 'linear-gradient(90deg, #a855f7, #6366f1)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}
          >
            Events & Workshops
          </h1>
          <p className="text-xl max-w-3xl mx-auto leading-relaxed" style={{ color: '#c8b6e2' }}>
            Immerse yourself in cutting-edge technology experiences and hands-on learning.
            From inspiring talks to interactive workshops, discover the future of innovation.
          </p>
        </header>

        {/* Category Tabs */}
        <div className="flex justify-center gap-4 mb-10 flex-wrap">
          {categories.map(category => (
            <button
              key={category}
              className="px-5 py-2 rounded-full font-semibold cursor-pointer transition-all duration-300"
              style={{
                border: '2px solid rgba(168, 85, 247, 0.3)',
                background: activeTab === category ? 'rgba(168, 85, 247, 0.2)' : 'transparent',
                color: 'white'
              }}
              onClick={() => setActiveTab(category)}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(168, 85, 247, 0.2)';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = activeTab === category ? 'rgba(168, 85, 247, 0.2)' : 'transparent';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {filteredEvents.map((event) => (
            <EventCard
              key={event.id}
              title={event.title}
              category={event.category}
            />
          ))}
        </div>
      </div>
    </div>
  );
}