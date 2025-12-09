import { useEffect, useState } from 'react';
import VendingMachine from '../../components/ui/VendingMachine/VendingMachine';
import styled from 'styled-components';

// Sample competition data
const competitions = [
  {
    id: 1,
    title: 'CODE WARS',
    description: 'A 24-hour hackathon to build innovative solutions for real-world problems using cutting-edge technologies.',
    prize: '₹50,000',
    image: 'https://images.unsplash.com/photo-1544984243-ec57ea16fe25?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    deadline: '15th March 2025'
  },
  {
    id: 2,
    title: 'ROBO SOCCER',
    description: 'Design and program autonomous robots to compete in an exciting game of robot soccer.',
    prize: '₹75,000',
    image: 'https://images.unsplash.com/photo-1544984243-ec57ea16fe25?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    deadline: '18th March 2025'
  },
  {
    id: 3,
    title: 'TECH QUIZ',
    description: 'Test your technical knowledge in this fast-paced quiz competition with exciting prizes.',
    prize: '₹30,000',
    image: 'https://images.unsplash.com/photo-1544984243-ec57ea16fe25?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    deadline: '12th March 2025'
  }
];

const PageContainer = styled.div`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #0a0418 0%, #1a0b2e 50%, #2d1b69 100%);
  padding: 2rem;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: 
      radial-gradient(circle at 20% 30%, rgba(138, 79, 255, 0.1) 0%, transparent 20%),
      radial-gradient(circle at 80% 70%, rgba(138, 79, 255, 0.1) 0%, transparent 20%);
    pointer-events: none;
  }
`;

const Stars = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: 
    radial-gradient(1px 1px at 20px 30px, #8a4fff, rgba(0,0,0,0)),
    radial-gradient(1px 1px at 40px 70px, #d8c6f2, rgba(0,0,0,0)),
    radial-gradient(1px 1px at 60px 20px, #8a4fff, rgba(0,0,0,0)),
    radial-gradient(1px 1px at 80px 50px, #d8c6f2, rgba(0,0,0,0)),
    radial-gradient(1px 1px at 100px 80px, #8a4fff, rgba(0,0,0,0));
  background-size: 100px 100px;
  animation: twinkle 5s infinite;
  opacity: 0.5;
  
  @keyframes twinkle {
    0% { opacity: 0.3; }
    50% { opacity: 0.7; }
    100% { opacity: 0.3; }
  }
`;

const CompetitionCard = styled.div`
  background: rgba(26, 11, 46, 0.8);
  border: 2px solid #8a4fff;
  border-radius: 8px;
  padding: 15px;
  margin: 10px 0;
  color: #fff;
  transition: transform 0.3s, box-shadow 0.3s;
  cursor: pointer;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 15px rgba(138, 79, 255, 0.4);
  }
  
  h3 {
    color: #d8c6f2;
    margin: 0 0 10px 0;
    font-size: 1.2em;
    text-shadow: 0 0 5px rgba(138, 79, 255, 0.7);
  }
  
  p {
    margin: 5px 0;
    font-size: 0.9em;
    color: #c0a9ff;
  }
  
  .prize {
    color: #ffd700;
    font-weight: bold;
  }
  
  .deadline {
    font-size: 0.8em;
    color: #ff7eb9;
  }
  
  img {
    width: 100%;
    height: 150px;
    object-fit: cover;
    border-radius: 4px;
    margin-bottom: 10px;
    border: 1px solid #4a2a8a;
  }
`;

const CompetitionsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
  padding: 20px;
  width: 100%;
  height: 100%;
  overflow-y: auto;
  
  /* Custom scrollbar */
  &::-webkit-scrollbar {
    width: 8px;
  }
  
  &::-webkit-scrollbar-track {
    background: rgba(45, 27, 105, 0.3);
    border-radius: 4px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: #8a4fff;
    border-radius: 4px;
  }
  
  &::-webkit-scrollbar-thumb:hover {
    background: #a87bff;
  }
`;

function Competition() {
    const [selectedCompetition, setSelectedCompetition] = useState(null);
    
    useEffect(() => {
        document.title = 'Competitions | TEKRON 2026';
    }, []);

    return (
        <PageContainer>
            <Stars />
            <VendingMachine>
                <CompetitionsContainer>
                    {competitions.map(comp => (
                        <CompetitionCard 
                            key={comp.id}
                            onClick={() => setSelectedCompetition(comp)}
                        >
                            <img src={comp.image} alt={comp.title} />
                            <h3>{comp.title}</h3>
                            <p>{comp.description}</p>
                            <p className="prize">Prize: {comp.prize}</p>
                            <p className="deadline">Deadline: {comp.deadline}</p>
                        </CompetitionCard>
                    ))}
                </CompetitionsContainer>
            </VendingMachine>
        </PageContainer>
    );
}

export default Competition;
