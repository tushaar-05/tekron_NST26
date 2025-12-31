import React from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';

const CardContainer = styled(motion.div)`
  background: linear-gradient(135deg, rgba(30, 20, 56, 0.8), rgba(45, 27, 78, 0.6));
  backdrop-filter: blur(20px);
  border: 2px solid transparent;
  border-radius: 20px;
  overflow: hidden;
  position: relative;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 20px;
    padding: 2px;
    background: linear-gradient(135deg, #a855f7, #7c3aed, #6366f1);
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    opacity: 0;
    transition: opacity 0.4s ease;
  }

  &:hover::before {
    opacity: 1;
  }

  &:hover {
    transform: translateY(-10px) scale(1.02);
    box-shadow: 
      0 20px 40px rgba(168, 85, 247, 0.3),
      0 0 60px rgba(124, 58, 237, 0.2),
      inset 0 0 30px rgba(168, 85, 247, 0.1);
  }

  &::after {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle, rgba(168, 85, 247, 0.1) 0%, transparent 70%);
    opacity: 0;
    transition: opacity 0.4s ease;
  }

  &:hover::after {
    opacity: 1;
  }
`;

const ImageContainer = styled.div`
  width: 100%;
  height: 220px;
  background: ${props => props.image ? `url(${props.image}) center/cover no-repeat` : 'linear-gradient(135deg, #1e1438 0%, #2d1b4e 50%, #1a0b2e 100%)'};
  display: flex;
  align-items: center;
  justify-content: center;
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
  }
`;

const IconCircle = styled(motion.div)`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background: linear-gradient(135deg, rgba(168, 85, 247, 0.2), rgba(124, 58, 237, 0.3));
  border: 3px solid rgba(168, 85, 247, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
  color: #d8c6f2;
  font-weight: 800;
  text-shadow: 0 0 20px rgba(168, 85, 247, 0.6);
  position: relative;
  z-index: 2;

  &::before {
    content: '';
    position: absolute;
    inset: -10px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(168, 85, 247, 0.2) 0%, transparent 70%);
    animation: pulse 2s ease-in-out infinite;
  }

  @keyframes pulse {
    0%, 100% {
      transform: scale(1);
      opacity: 0.5;
    }
    50% {
      transform: scale(1.2);
      opacity: 0.8;
    }
  }
`;

const Content = styled.div`
  padding: 1.75rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  position: relative;
  z-index: 1;
`;

const CategoryBadge = styled.span`
  display: inline-block;
  padding: 0.4rem 1rem;
  background: ${props => {
    if (props.category === 'Competition') return 'linear-gradient(135deg, #a855f7, #7c3aed)';
    if (props.category === 'Workshop') return 'linear-gradient(135deg, #6366f1, #4f46e5)';
    return 'linear-gradient(135deg, #8b5cf6, #6d28d9)';
  }};
  color: #fff;
  font-size: 0.9rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  border-radius: 8px;
  width: fit-content;
  box-shadow: 0 4px 12px rgba(168, 85, 247, 0.3);
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  font-family: 'VT323', monospace;
`;

const Title = styled.h3`
  color: #fff;
  font-size: 2rem;
  font-weight: 800;
  margin: 0;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.5);
  letter-spacing: 0.5px;
  line-height: 1.3;
  background: linear-gradient(135deg, #ffffff, #d8c6f2);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-family: 'VT323', monospace;
`;

const Description = styled.p`
  color: #c8b6e2;
  font-size: 1.3rem;
  line-height: 1.4;
  margin: 0;
  opacity: 0.9;
  font-family: 'VT323', monospace;
`;

const Particles = styled.div`
  position: absolute;
  inset: 0;
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.4s ease;

  ${CardContainer}:hover & {
    opacity: 1;
  }
`;

const Particle = styled(motion.div)`
  position: absolute;
  width: 4px;
  height: 4px;
  background: ${props => props.color || '#a855f7'};
  border-radius: 50%;
  box-shadow: 0 0 10px ${props => props.color || '#a855f7'};
`;

const MetaInfo = styled.div`
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-top: 16px;
  padding-top: 16px;
  border-top: 1px solid rgba(168, 85, 247, 0.2);
`;

const MetaItem = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 1.1rem;
  color: #c8b6e2;
  background: rgba(168, 85, 247, 0.1);
  padding: 6px 10px;
  border-radius: 6px;
  border: 1px solid rgba(168, 85, 247, 0.2);
  font-family: 'VT323', monospace;
  white-space: nowrap;

  span {
    color: #fff;
    font-weight: 600;
  }
`;

const RegisterButton = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 14px;
  background: linear-gradient(135deg, #a855f7, #7c3aed);
  color: #fff;
  font-size: 1.1rem;
  font-weight: 700;
  text-decoration: none;
  border-radius: 8px;
  border: 2px solid rgba(168, 85, 247, 0.5);
  font-family: 'VT323', monospace;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(168, 85, 247, 0.3);
  text-transform: uppercase;
  letter-spacing: 1px;
  white-space: nowrap;

  &:hover {
    background: linear-gradient(135deg, #7c3aed, #6366f1);
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(168, 85, 247, 0.5);
  }

  &:active {
    transform: translateY(0);
  }
`;

const EventCard = ({ title, category, image, description, prizePool, unstopLink, onClick }) => {
  const particles = Array.from({ length: 8 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    color: ['#a855f7', '#7c3aed', '#6366f1', '#8b5cf6'][Math.floor(Math.random() * 4)]
  }));

  // Truncate description for card view
  const truncate = (str, n) => {
    return (str?.length > n) ? str.substr(0, n - 1) + '...' : str;
  };

  return (
    <CardContainer
      onClick={onClick}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <ImageContainer image={image}>
        {!image && (
          <IconCircle
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            {title.charAt(0)}
          </IconCircle>
        )}
      </ImageContainer>

      <Content>
        <CategoryBadge category={category}>{category}</CategoryBadge>
        <Title>{title}</Title>

        {/* Description - Conditionally Rendered */}
        {description && (
          <Description>
            {truncate(description, 100)}
          </Description>
        )}

        {/* Meta Info (Prize Pool + Register Button) - Conditionally Rendered */}
        {(prizePool || unstopLink) && (
          <MetaInfo>
            {prizePool && (
              <MetaItem>
                🏆 <span>Prize Pool:</span> {prizePool}
              </MetaItem>
            )}
            {unstopLink && (
              <RegisterButton
                href={unstopLink}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
              >
                📝 Register
              </RegisterButton>
            )}
          </MetaInfo>
        )}
      </Content>

      <Particles>
        {particles.map(particle => (
          <Particle
            key={particle.id}
            color={particle.color}
            style={{ left: `${particle.x}%`, top: `${particle.y}%` }}
            animate={{
              y: [0, -20, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: particle.id * 0.2,
            }}
          />
        ))}
      </Particles>
    </CardContainer>
  );
};

export default EventCard;