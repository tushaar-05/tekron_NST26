import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { events } from '../../data/eventsData';
import EventCard from '../../components/ui/EventCard/EventCard';
import { motion } from 'framer-motion';

const PageContainer = styled.div`
  min-height: 100vh;
  padding: 120px 20px 60px;
  background: linear-gradient(180deg, #1a0b2e 0%, #2d1b4e 30%, #1e1438 70%, #0f0a1e 100%);
  color: #fff;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: 
      repeating-linear-gradient(
        0deg,
        rgba(168, 85, 247, 0.03) 0px,
        transparent 1px,
        transparent 2px,
        rgba(168, 85, 247, 0.03) 3px
      ),
      repeating-linear-gradient(
        90deg,
        rgba(168, 85, 247, 0.03) 0px,
        transparent 1px,
        transparent 2px,
        rgba(168, 85, 247, 0.03) 3px
      );
    opacity: 0.3;
    pointer-events: none;
  }
`;

const ContentWrapper = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 60px;
`;

const Title = styled(motion.h1)`
  font-size: clamp(2.5rem, 6vw, 4.5rem);
  font-weight: 900;
  margin-bottom: 20px;
  background: linear-gradient(135deg, #ffffff, #d8c6f2, #a855f7);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-transform: uppercase;
  letter-spacing: 3px;
  text-shadow: 0 0 40px rgba(168, 85, 247, 0.3);
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: -15px;
    left: 50%;
    transform: translateX(-50%);
    width: 120px;
    height: 4px;
    background: linear-gradient(90deg, transparent, #a855f7, transparent);
    box-shadow: 0 0 20px rgba(168, 85, 247, 0.6);
  }
`;

const Subtitle = styled(motion.p)`
  font-size: clamp(1rem, 2vw, 1.25rem);
  color: #c8b6e2;
  max-width: 700px;
  margin: 30px auto 0;
  line-height: 1.8;
  opacity: 0.9;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 35px;
  padding: 20px 0;
`;

const BackButton = styled(motion.button)`
  position: fixed;
  top: 30px;
  left: 30px;
  z-index: 100;
  padding: 12px 24px;
  background: linear-gradient(135deg, rgba(168, 85, 247, 0.2), rgba(124, 58, 237, 0.3));
  backdrop-filter: blur(10px);
  border: 2px solid rgba(168, 85, 247, 0.4);
  border-radius: 12px;
  color: #fff;
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 8px;
  text-transform: uppercase;
  letter-spacing: 1px;

  &:hover {
    background: linear-gradient(135deg, rgba(168, 85, 247, 0.4), rgba(124, 58, 237, 0.5));
    border-color: rgba(168, 85, 247, 0.8);
    box-shadow: 0 0 20px rgba(168, 85, 247, 0.4);
    transform: translateX(-5px);
  }

  &::before {
    content: '←';
    font-size: 1.2rem;
  }
`;

const Events = () => {
  const navigate = useNavigate();

  return (
    <PageContainer>
      <BackButton
        onClick={() => navigate('/map')}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Back to Map
      </BackButton>
      <ContentWrapper>
        <Header>
          <Title
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            Events & Workshops
          </Title>
          <Subtitle
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            Immerse yourself in cutting-edge technology experiences and hands-on learning.
            From inspiring talks to interactive workshops, discover the future of innovation.
          </Subtitle>
        </Header>

        <Grid>
          {events.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <EventCard title={event.title} category={event.category} />
            </motion.div>
          ))}
        </Grid>
      </ContentWrapper>
    </PageContainer>
  );
};

export default Events;
