import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function About() {
    const navigate = useNavigate();

    useEffect(() => {
        document.title = 'About TEKRON | TEKRON 2026';
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-b from-[#1a0b2e] to-[#2d1b69] text-white p-8">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-4xl md:text-6xl font-bold mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
                    About TEKRON
                </h1>
                
                <div className="bg-black/30 backdrop-blur-sm border border-purple-500/30 rounded-lg p-8 mb-8">
                    <h2 className="text-2xl font-bold mb-4 text-purple-400">Our Mission</h2>
                    <p className="text-lg mb-6 leading-relaxed">
                        TEKRON is an annual technical symposium that brings together the brightest minds in technology, 
                        innovation, and research. Our mission is to foster learning, collaboration, and innovation 
                        in the field of technology.
                    </p>

                    <h2 className="text-2xl font-bold mb-4 text-purple-400 mt-8">Our Vision</h2>
                    <p className="text-lg mb-6 leading-relaxed">
                        To create a platform where technology enthusiasts can come together to share knowledge, 
                        showcase innovations, and build meaningful connections that drive technological advancement.
                    </p>
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

export default About;
