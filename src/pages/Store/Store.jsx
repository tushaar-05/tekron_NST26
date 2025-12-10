import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Store() {
    const navigate = useNavigate();

    useEffect(() => {
        document.title = 'Store | TEKRON 2026';
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-b from-[#1a0b2e] to-[#2d1b69] text-white p-8">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-4xl md:text-6xl font-bold mb-12 text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
                    TEKRON Store
                </h1>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {[
                        { id: 1, name: 'TEKRON T-Shirt', price: '₹599', image: '/store/tshirt.jpg' },
                        { id: 2, name: 'TEKRON Hoodie', price: '₹1299', image: '/store/hoodie.jpg' },
                        { id: 3, name: 'TEKRON Cap', price: '₹399', image: '/store/cap.jpg' },
                    ].map((item) => (
                        <div key={item.id} className="bg-black/30 backdrop-blur-sm border border-purple-500/30 rounded-lg overflow-hidden transition-transform hover:scale-105">
                            <div className="h-48 bg-purple-900/50 flex items-center justify-center">
                                <span className="text-gray-400">Image: {item.name}</span>
                            </div>
                            <div className="p-4">
                                <h3 className="text-xl font-bold mb-2">{item.name}</h3>
                                <p className="text-purple-300 mb-4">{item.price}</p>
                                <button className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg transition-colors">
                                    Add to Cart
                                </button>
                            </div>
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

export default Store;
