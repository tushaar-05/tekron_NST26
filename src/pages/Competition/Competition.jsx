import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import UnifiedBackground from '../../components/layout/UnifiedBackground';
import { competitions } from '../../data/eventsData';
import EventCard from '../../components/ui/EventCard/EventCard';

const Page = styled.div`
  min-height: 100vh;
  padding: 100px 20px 40px;
  color: white;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const Header = styled.header`
  text-align: center;
  margin-bottom: 60px;
`;

const Title = styled.h1`
  font-size: 3.5rem;
  font-weight: 800;
  margin-bottom: 20px;
  background: linear-gradient(90deg, #a855f7, #6366f1);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const Subtitle = styled.p`
  font-size: 1.25rem;
  color: #c8b6e2;
  max-width: 700px;
  margin: 0 auto;
  line-height: 1.6;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 30px;
  padding: 20px 0;
`;

const BackButton = styled.button`
  position: fixed;
  top: 30px;
  left: 30px;
  padding: 12px 24px;
  background: rgba(168, 85, 247, 0.1);
  border: 2px solid rgba(168, 85, 247, 0.3);
  border-radius: 8px;
  color: white;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  z-index: 100;

  &:hover {
    background: rgba(168, 85, 247, 0.2);
    transform: translateY(-2px);
  }
`;

const Competition = () => {
  const navigate = useNavigate();

  return (
    <UnifiedBackground>
      <Page>
        <BackButton onClick={() => navigate('/map')}>
          ← Back to Map
        </BackButton>

        <Container>
          <Header>
            <Title>Competitions</Title>
            <Subtitle>
              Test your skills and compete with the best in our exciting range of competitions.
              From coding challenges to robotics, there's something for everyone.
            </Subtitle>
          </Header>

          <Grid>
            {competitions.map((comp) => (
              <EventCard
                key={comp.id}
                title={comp.title}
                category={comp.category}
              />
            ))}
          </Grid>
        </Container>
      </Page>
    </UnifiedBackground>
  );
};

export default Competition;
