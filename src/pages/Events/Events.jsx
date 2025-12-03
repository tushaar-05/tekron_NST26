import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Events() {
    const navigate = useNavigate();

    useEffect(() => {
        document.title = 'Events | TEKRON 2026';
    }, []);

    const events = [
        {
            id: 1,
            title: 'Tech Talks',
            date: 'March 15, 2026',
            time: '10:00 AM - 12:00 PM',
            location: 'Main Auditorium',
            description: 'Insightful talks from industry leaders about the latest technological advancements.'
        },
        {
            id: 2,
            title: 'Hackathon',
            date: 'March 16, 2026',
            time: '9:00 AM - 5:00 PM',
            location: 'Innovation Lab',
            description: 'A 24-hour coding competition to solve real-world problems with innovative solutions.'
        },
        {
            id: 3,
            title: 'Workshop: AI & ML',
            date: 'March 17, 2026',
            time: '2:00 PM - 5:00 PM',
            location: 'Computer Lab 3',
            description: 'Hands-on workshop on Artificial Intelligence and Machine Learning fundamentals.'
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-b from-[#1a0b2e] to-[#2d1b69] text-white p-8">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl md:text-6xl font-bold mb-12 text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
                    Events
                </h1>
                
                <div className="space-y-6">
                    {events.map((event) => (
                        <div key={event.id} className="bg-black/30 backdrop-blur-sm border border-purple-500/30 rounded-lg p-6 hover:border-purple-400/50 transition-all">
                            <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                                <h2 className="text-2xl font-bold text-purple-300">{event.title}</h2>
                                <div className="text-sm text-purple-200 mt-2 md:mt-0">
                                    <p>{event.date}</p>
                                    <p>{event.time}</p>
                                    <p>{event.location}</p>
                                </div>
                            </div>
                            <p className="text-gray-200">{event.description}</p>
                            <button className="mt-4 px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors">
                                Learn More
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

export default Events;
