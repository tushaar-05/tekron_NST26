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
  padding: 12px;
  
  @media (min-width: 640px) {
    padding: 20px;
  }
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
  top: 12px;
  right: 12px;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(4px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  width: 36px;
  height: 36px;
  border-radius: 50%;
  color: white;
  font-size: 20px;
  cursor: pointer;
  z-index: 10;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  
  @media (min-width: 640px) {
    top: 16px;
    right: 16px;
    width: 40px;
    height: 40px;
    font-size: 22px;
  }
  
  @media (min-width: 768px) {
    top: 20px;
    right: 20px;
    width: 44px;
    height: 44px;
    font-size: 24px;
  }

  &:hover {
    background: #a855f7;
    border-color: #a855f7;
    transform: rotate(90deg) scale(1.1);
    box-shadow: 0 0 15px rgba(168, 85, 247, 0.5);
  }
`;

const Banner = styled.div`
  height: 200px;
  width: 100%;
  background: ${props => props.image ? `url(${props.image})` : 'linear-gradient(135deg, #2d1b4e, #1a0b2e)'};
  background-size: cover;
  background-position: center;
  position: relative;
  
  @media (min-width: 640px) {
    height: 250px;
  }
  
  @media (min-width: 768px) {
    height: 300px;
  }

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 100px;
    background: linear-gradient(to top, #1e1438, transparent);
    
    @media (min-width: 768px) {
      height: 150px;
    }
  }
`;

const Content = styled.div`
  padding: 20px;
  position: relative;
  margin-top: -40px;
  
  @media (min-width: 640px) {
    padding: 30px;
    margin-top: -50px;
  }
  
  @media (min-width: 768px) {
    padding: 40px;
    margin-top: -60px;
  }
`;

const CategoryBadge = styled.span`
  background: linear-gradient(135deg, #a855f7, #7c3aed);
  color: white;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 600;
  letter-spacing: 1px;
  text-transform: uppercase;
  margin-bottom: 12px;
  display: inline-block;
  box-shadow: 0 4px 12px rgba(168, 85, 247, 0.4);
  font-family: 'VT323', monospace;
  
  @media (min-width: 640px) {
    padding: 6px 16px;
    font-size: 1.1rem;
    margin-bottom: 16px;
  }
`;

const Title = styled.h2`
  font-size: 2rem;
  font-weight: 800;
  margin: 0 0 16px;
  background: linear-gradient(135deg, #ffffff, #d8c6f2);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-family: 'VT323', monospace;
  line-height: 1.2;
  
  @media (min-width: 640px) {
    font-size: 3rem;
    margin: 0 0 20px;
  }
  
  @media (min-width: 768px) {
    font-size: 4rem;
    margin: 0 0 24px;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 12px;
  margin-bottom: 20px;
  
  @media (min-width: 640px) {
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 16px;
    margin-bottom: 24px;
  }
  
  @media (min-width: 768px) {
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 20px;
    margin-bottom: 32px;
  }
`;

const InfoBox = styled.div`
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(168, 85, 247, 0.2);
  padding: 12px;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  gap: 6px;
  font-family: 'VT323', monospace;

  h4 {
    color: #a855f7;
    margin: 0;
    font-size: 0.9rem;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    
    @media (min-width: 640px) {
      font-size: 1rem;
    }
    
    @media (min-width: 768px) {
      font-size: 1.1rem;
    }
  }

  p {
    color: white;
    margin: 0;
    font-weight: 600;
    font-size: 1.2rem;
    
    @media (min-width: 640px) {
      font-size: 1.35rem;
    }
    
    @media (min-width: 768px) {
      font-size: 1.5rem;
    }
  }
  
  @media (min-width: 640px) {
    padding: 14px;
    border-radius: 14px;
    gap: 7px;
  }
  
  @media (min-width: 768px) {
    padding: 16px;
    border-radius: 16px;
    gap: 8px;
  }
`;

const Description = styled.div`
  color: #c8b6e2;
  line-height: 1.4;
  font-size: 1.1rem;
  margin-bottom: 24px;
  font-family: 'VT323', monospace;
  
  @media (min-width: 640px) {
    font-size: 1.3rem;
    margin-bottom: 32px;
  }
  
  @media (min-width: 768px) {
    font-size: 1.5rem;
    margin-bottom: 40px;
  }
  
  p {
    margin-bottom: 12px;
    
    @media (min-width: 640px) {
      margin-bottom: 14px;
    }
    
    @media (min-width: 768px) {
      margin-bottom: 16px;
    }
  }
`;

const RegisterButton = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 14px;
  background: linear-gradient(135deg, #a855f7, #6366f1);
  color: white;
  text-decoration: none;
  font-weight: 700;
  font-size: 1.3rem;
  border-radius: 10px;
  transition: all 0.3s;
  box-shadow: 0 8px 24px rgba(168, 85, 247, 0.4);
  text-transform: uppercase;
  letter-spacing: 1px;
  font-family: 'VT323', monospace;
  
  @media (min-width: 640px) {
    padding: 16px;
    font-size: 1.5rem;
    border-radius: 11px;
  }
  
  @media (min-width: 768px) {
    padding: 18px;
    font-size: 1.75rem;
    border-radius: 12px;
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 12px 32px rgba(168, 85, 247, 0.6);
  }
`;

const RulebookButton = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 14px;
  background: rgba(168, 85, 247, 0.1);
  border: 2px solid #a855f7;
  color: #a855f7;
  text-decoration: none;
  font-weight: 700;
  font-size: 1.3rem;
  border-radius: 10px;
  transition: all 0.3s;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-family: 'VT323', monospace;
  
  @media (min-width: 640px) {
    padding: 16px;
    font-size: 1.5rem;
    border-radius: 11px;
  }
  
  @media (min-width: 768px) {
    padding: 18px;
    font-size: 1.75rem;
    border-radius: 12px;
  }

  &:hover {
    background: rgba(168, 85, 247, 0.2);
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(168, 85, 247, 0.2);
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 24px;
  
  @media (min-width: 640px) {
    flex-direction: row;
    gap: 16px;
    margin-top: 32px;
  }
  
  @media (min-width: 768px) {
    gap: 20px;
    margin-top: 40px;
  }
`;


const Section = styled.div`
  margin-top: 24px;
  background: rgba(255, 255, 255, 0.02);
  border-radius: 12px;
  padding: 16px;
  border: 1px solid rgba(168, 85, 247, 0.1);
  font-family: 'VT323', monospace;
  
  @media (min-width: 640px) {
    margin-top: 32px;
    border-radius: 14px;
    padding: 20px;
  }
  
  @media (min-width: 768px) {
    margin-top: 40px;
    border-radius: 16px;
    padding: 24px;
  }
  
  h3 {
    color: #a855f7;
    font-size: 1.3rem;
    font-weight: 700;
    margin: 0 0 14px;
    display: flex;
    align-items: center;
    gap: 8px;
    letter-spacing: 0.5px;
    text-transform: uppercase;
    
    @media (min-width: 640px) {
      font-size: 1.5rem;
      margin: 0 0 16px;
      gap: 9px;
    }
    
    @media (min-width: 768px) {
      font-size: 1.75rem;
      margin: 0 0 20px;
      gap: 10px;
    }
    
    &::before {
      content: '';
      display: block;
      width: 3px;
      height: 18px;
      background: linear-gradient(to bottom, #a855f7, #6366f1);
      border-radius: 2px;
      
      @media (min-width: 640px) {
        width: 3.5px;
        height: 20px;
      }
      
      @media (min-width: 768px) {
        width: 4px;
        height: 24px;
      }
    }
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
    display: grid;
    grid-template-columns: 1fr;
    gap: 10px;
    
    @media (min-width: 640px) {
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 11px;
    }
    
    @media (min-width: 768px) {
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 12px;
    }
    
    li {
      background: rgba(168, 85, 247, 0.05);
      padding: 10px 14px;
      border-radius: 8px;
      color: #e2e8f0;
      font-size: 1.05rem;
      border: 1px solid rgba(168, 85, 247, 0.1);
      transition: all 0.2s;
      
      @media (min-width: 640px) {
        padding: 11px 15px;
        font-size: 1.15rem;
      }
      
      @media (min-width: 768px) {
        padding: 12px 16px;
        font-size: 1.25rem;
      }
      
      &:hover {
        background: rgba(168, 85, 247, 0.1);
        border-color: rgba(168, 85, 247, 0.3);
      }
    }
  }

  p {
    color: #cbd5e1;
    line-height: 1.4;
    font-size: 1.1rem;
    margin: 0;
    white-space: pre-line;
    
    @media (min-width: 640px) {
      font-size: 1.25rem;
    }
    
    @media (min-width: 768px) {
      font-size: 1.4rem;
    }
  }
`;

const formatContent = (content) => {
  if (!content) return null;

  const lines = content.split('\n');

  return lines.map((line, index) => {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const phoneRegex = /(\b\d{10}\b)/g;

    const parts = line.split(urlRegex);

    const elements = parts.map((part, partIndex) => {
      if (part.match(urlRegex)) {
        return <a key={partIndex} href={part} target="_blank" rel="noopener noreferrer" style={{ color: '#a855f7', textDecoration: 'underline' }}>{part}</a>;
      }

      const phoneParts = part.split(phoneRegex);
      return phoneParts.map((subPart, subPartIndex) => {
        if (subPart.match(phoneRegex)) {
          return <a key={`${partIndex}-${subPartIndex}`} href={`tel:${subPart}`} style={{ color: '#a855f7', textDecoration: 'underline' }}>{subPart}</a>;
        }
        return subPart;
      });
    });

    return (
      <React.Fragment key={index}>
        {elements}
        {index < lines.length - 1 && <br />}
      </React.Fragment>
    );
  });
};

const CompetitionModal = ({ isOpen, onClose, data }) => {

  return (
    <AnimatePresence>
      {isOpen && data && (
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
                  {section.content && <p>{formatContent(section.content)}</p>}
                  {section.items && (
                    <ul>
                      {section.items.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  )}
                </Section>
              ))}

              <ButtonGroup>
                <RegisterButton
                  href={data.unstopLink || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {data.unstopLink ? 'Register' : 'Allocating Slots Soon'}
                </RegisterButton>

                {data.rulebookLink && (
                  <RulebookButton
                    href={data.rulebookLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Rulebook
                  </RulebookButton>
                )}
              </ButtonGroup>


            </Content>
          </ModalContainer>
        </Overlay>
      )}
    </AnimatePresence>
  );
};

export default CompetitionModal;
