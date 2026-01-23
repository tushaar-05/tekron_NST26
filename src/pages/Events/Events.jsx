import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UnifiedBackground from '../../components/layout/UnifiedBackground';
import MiniNavbar from '../../components/layout/MiniNavbar';
import Footer from '../../components/layout/Footer';
import CompetitionModal from '../../components/ui/CompetitionModal/CompetitionModal';
import { events } from '../../data/eventsData';

// EventCard Component removed - using shared component
import EventCard from '../../components/ui/EventCard/EventCard';

// Events Page Component
export default function Events() {
  const navigate = useNavigate();
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleEventClick = (event) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  return (
    <UnifiedBackground>
      <div className="w-full overflow-x-hidden relative" style={{ color: 'white', padding: '80px 20px 60px', minHeight: '100vh' }}>
        {/* Back Button */}
        {/* Back Button */}
        <MiniNavbar />

        {/* Content Wrapper */}
        <div className="max-w-7xl mx-auto px-5">
          {/* Header */}
          <header className="text-center mb-16">
            <h1
              className="text-3xl sm:text-4xl md:text-6xl font-extrabold mb-5 leading-tight px-2"
              style={{
                background: 'linear-gradient(90deg, #a855f7, #6366f1)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}
            >
              Events & Workshops
            </h1>
            <p className="mt-4 sm:mt-6 md:mt-8 text-sm sm:text-base md:text-lg lg:text-xl text-purple-200/60 max-w-2xl mx-auto font-['VT323'] leading-relaxed px-2">
              Immerse yourself in cutting-edge technology experiences and hands-on learning.
              From inspiring talks to interactive workshops, discover the future of innovation.
            </p>
          </header>

          {/* Events Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {events.map((event) => (
              <EventCard
                key={event.id}
                {...event}
                onClick={() => handleEventClick(event)}
              />
            ))}
          </div>

          <CompetitionModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            data={selectedEvent}
          />
        </div>
      </div>
      <Footer />
    </UnifiedBackground>
  );
}