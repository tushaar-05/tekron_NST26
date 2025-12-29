import React from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.85);
  backdrop-filter: blur(8px);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
`;

const ModalContainer = styled(motion.div)`
  background: linear-gradient(135deg, #2d1b4e, #1a0b2e);
  border: 1px solid rgba(168, 85, 247, 0.4);
  border-radius: 24px;
  width: 100%;
  max-width: 800px;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);

  &::-webkit-scrollbar {
    width: 8px;
  }
  &::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.05);
  }
  &::-webkit-scrollbar-thumb {
    background: rgba(168, 85, 247, 0.3);
    border-radius: 4px;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  background: rgba(255, 255, 255, 0.1);
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  color: white;
  font-size: 20px;
  cursor: pointer;
  z-index: 10;
  transition: all 0.2s;

  &:hover {
    background: rgba(168, 85, 247, 0.4);
    transform: rotate(90deg);
  }
`;

const Banner = styled.div`
  height: 300px;
  width: 100%;
  background: ${props => props.image ? `url(${props.image})` : 'linear-gradient(135deg, #2d1b4e, #1a0b2e)'};
  background-size: cover;
  background-position: center;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 150px;
    background: linear-gradient(to top, #1e1438, transparent);
  }
`;

const Content = styled.div`
  padding: 40px;
  position: relative;
  margin-top: -60px;
`;

const CategoryBadge = styled.span`
  background: linear-gradient(135deg, #a855f7, #7c3aed);
  color: white;
  padding: 6px 16px;
  border-radius: 20px;
  font-size: 1.1rem;
  font-weight: 600;
  letter-spacing: 1px;
  text-transform: uppercase;
  margin-bottom: 16px;
  display: inline-block;
  box-shadow: 0 4px 12px rgba(168, 85, 247, 0.4);
  font-family: 'VT323', monospace;
`;

const Title = styled.h2`
  font-size: 4rem;
  font-weight: 800;
  margin: 0 0 24px;
  background: linear-gradient(135deg, #ffffff, #d8c6f2);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-family: 'VT323', monospace;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-bottom: 32px;
`;

const InfoBox = styled.div`
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(168, 85, 247, 0.2);
  padding: 16px;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  font-family: 'VT323', monospace;

  h4 {
    color: #a855f7;
    margin: 0;
    font-size: 1.1rem;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  p {
    color: white;
    margin: 0;
    font-weight: 600;
    font-size: 1.5rem;
  }
`;

const Description = styled.div`
  color: #c8b6e2;
  line-height: 1.4;
  font-size: 1.5rem;
  margin-bottom: 40px;
  font-family: 'VT323', monospace;
  
  p {
    margin-bottom: 16px;
  }
`;

const RegisterButton = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 18px;
  background: linear-gradient(135deg, #a855f7, #6366f1);
  color: white;
  text-decoration: none;
  font-weight: 700;
  font-size: 1.75rem;
  border-radius: 12px;
  transition: all 0.3s;
  box-shadow: 0 8px 24px rgba(168, 85, 247, 0.4);
  text-transform: uppercase;
  letter-spacing: 1px;
  font-family: 'VT323', monospace;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 12px 32px rgba(168, 85, 247, 0.6);
  }
`;


const Section = styled.div`
  margin-top: 40px;
  background: rgba(255, 255, 255, 0.02);
  border-radius: 16px;
  padding: 24px;
  border: 1px solid rgba(168, 85, 247, 0.1);
  font-family: 'VT323', monospace;
  
  h3 {
    color: #a855f7;
    font-size: 1.75rem;
    font-weight: 700;
    margin: 0 0 20px;
    display: flex;
    align-items: center;
    gap: 10px;
    letter-spacing: 0.5px;
    text-transform: uppercase;
    
    &::before {
      content: '';
      display: block;
      width: 4px;
      height: 24px;
      background: linear-gradient(to bottom, #a855f7, #6366f1);
      border-radius: 2px;
    }
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 12px;
    
    li {
      background: rgba(168, 85, 247, 0.05);
      padding: 12px 16px;
      border-radius: 8px;
      color: #e2e8f0;
      font-size: 1.25rem;
      border: 1px solid rgba(168, 85, 247, 0.1);
      transition: all 0.2s;
      
      &:hover {
        background: rgba(168, 85, 247, 0.1);
        border-color: rgba(168, 85, 247, 0.3);
      }
    }
  }

  p {
    color: #cbd5e1;
    line-height: 1.4;
    font-size: 1.4rem;
    margin: 0;
    white-space: pre-line;
  }
`;

const CompetitionModal = ({ isOpen, onClose, data }) => {
  if (!isOpen || !data) return null;

  return (
    <AnimatePresence>
      <Overlay
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <ModalContainer
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          onClick={e => e.stopPropagation()}
        >
          <CloseButton onClick={onClose}>×</CloseButton>

          <Banner image={data.image} />

          <Content>
            <CategoryBadge>{data.category}</CategoryBadge>
            <Title>{data.title}</Title>

            <Grid>
              {data.teamSize && (
                <InfoBox>
                  <h4>Team Size</h4>
                  <p>{data.teamSize}</p>
                </InfoBox>
              )}
              {data.date && (
                <InfoBox>
                  <h4>Date</h4>
                  <p>{data.date}</p>
                </InfoBox>
              )}
              {data.prizePool && (
                <InfoBox>
                  <h4>Prize Pool</h4>
                  <p>{data.prizePool}</p>
                </InfoBox>
              )}
            </Grid>

            <Description>
              {data.description}
            </Description>

            {data.sections && data.sections.map((section, index) => (
              <Section key={index}>
                <h3>{section.title}</h3>
                {section.content && <p>{section.content}</p>}
                {section.items && (
                  <ul>
                    {section.items.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                )}
              </Section>
            ))}

            <RegisterButton
              href={data.unstopLink || '#'}
              target="_blank"
              rel="noopener noreferrer"
            >
              {data.unstopLink ? 'Register' : 'Allocating Slots Soon'}
            </RegisterButton>
          </Content>
        </ModalContainer>
      </Overlay>
    </AnimatePresence>
  );
};

export default CompetitionModal;
