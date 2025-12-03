import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Competition() {
    const navigate = useNavigate();

    useEffect(() => {
        document.title = 'Competitions | TEKRON 2026';
    }, []);

    const competitions = [
        {
            id: 1,
            title: 'Code Wars',
            type: 'Coding',
            teamSize: '1-2 members',
            prize: '₹50,000',
            deadline: 'March 10, 2026',
            description: 'A competitive programming challenge to test your algorithmic skills and problem-solving abilities.'
        },
        {
            id: 2,
            title: 'Hack the Future',
            type: 'Hackathon',
            teamSize: '2-4 members',
            prize: '₹1,00,000',
            deadline: 'March 12, 2026',
            description: 'Build innovative solutions to real-world problems in this 24-hour hackathon.'
        },
        {
            id: 3,
            title: 'Robo Rumble',
            type: 'Robotics',
            teamSize: '2-3 members',
            prize: '₹75,000',
            deadline: 'March 8, 2026',
            description: 'Design and program robots to complete challenging tasks in this exciting robotics competition.'
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-b from-[#1a0b2e] to-[#2d1b69] text-white p-8">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl md:text-6xl font-bold mb-4 text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
                    Competitions
                </h1>
                <p className="text-center text-xl text-purple-200 mb-12">Test your skills and win exciting prizes!</p>
                
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {competitions.map((comp) => (
                        <div key={comp.id} className="bg-black/30 backdrop-blur-sm border border-purple-500/30 rounded-lg p-6 hover:border-purple-400/50 transition-all">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h2 className="text-2xl font-bold text-purple-300">{comp.title}</h2>
                                    <span className="text-sm bg-purple-900/50 text-purple-300 px-2 py-1 rounded">
                                        {comp.type}
                                    </span>
                                </div>
                                <div className="text-right">
                                    <p className="text-2xl font-bold text-yellow-400">{comp.prize}</p>
                                    <p className="text-xs text-purple-200">Prize Money</p>
                                </div>
                            </div>
                            
                            <p className="text-gray-200 mb-4">{comp.description}</p>
                            
                            <div className="flex justify-between text-sm text-purple-200 mb-4">
                                <div>
                                    <p className="font-semibold">Team Size</p>
                                    <p>{comp.teamSize}</p>
                                </div>
                                <div className="text-right">
                                    <p className="font-semibold">Deadline</p>
                                    <p>{comp.deadline}</p>
                                </div>
                            </div>
                            
                            <button className="w-full py-2 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors">
                                Register Now
                            </button>
                        </div>
                    ))}
                </div>

                <div className="flex justify-center mt-12">
                    <button 
                        onClick={() => navigate(-1)}
                        className="px-8 py-3 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-lg transition-all duration-300 transform hover:scale-105"
                    >
                        Back to Map
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Competition;
