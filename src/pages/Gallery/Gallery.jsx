import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Gallery() {
    const navigate = useNavigate();
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedImage, setSelectedImage] = useState(null);

    // Sample gallery images (replace with your actual images)
    useEffect(() => {
        // In a real app, you would fetch these from an API
        const sampleImages = [
            { id: 1, src: '/src/assets/images/gallery/1.jpg', alt: 'Event 1', category: 'conference' },
            { id: 2, src: '/src/assets/images/gallery/2.jpg', alt: 'Event 2', category: 'workshop' },
            { id: 3, src: '/src/assets/images/gallery/3.jpg', alt: 'Event 3', category: 'competition' },
            { id: 4, src: '/src/assets/images/gallery/4.jpg', alt: 'Event 4', category: 'conference' },
            { id: 5, src: '/src/assets/images/gallery/5.jpg', alt: 'Event 5', category: 'workshop' },
            { id: 6, src: '/src/assets/images/gallery/6.jpg', alt: 'Event 6', category: 'competition' },
        ];
        
        // Simulate loading
        const timer = setTimeout(() => {
            setImages(sampleImages);
            setLoading(false);
        }, 500);

        return () => clearTimeout(timer);
    }, []);

    const openModal = (image) => {
        setSelectedImage(image);
    };

    const closeModal = () => {
        setSelectedImage(null);
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-900">
                <div className="text-white text-2xl">Loading gallery...</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-900 text-white p-6">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-4xl font-bold mb-8 text-center">Gallery</h1>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {images.map((image) => (
                        <div 
                            key={image.id} 
                            className="relative group cursor-pointer overflow-hidden rounded-lg shadow-lg transform transition-transform hover:scale-105"
                            onClick={() => openModal(image)}
                        >
                            <img 
                                src={image.src} 
                                alt={image.alt}
                                className="w-full h-64 object-cover transition-opacity group-hover:opacity-80"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                                <div>
                                    <h3 className="text-white text-lg font-semibold">{image.alt}</h3>
                                    <span className="text-sm text-gray-300">{image.category}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Image Modal */}
                {selectedImage && (
                    <div 
                        className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4"
                        onClick={closeModal}
                    >
                        <div className="relative max-w-4xl w-full">
                            <button 
                                onClick={closeModal}
                                className="absolute -top-10 right-0 text-white text-2xl hover:text-gray-300"
                            >
                                &times;
                            </button>
                            <img 
                                src={selectedImage.src} 
                                alt={selectedImage.alt}
                                className="w-full max-h-[80vh] object-contain"
                            />
                            <div className="mt-2 text-center text-white">
                                <h3 className="text-xl font-semibold">{selectedImage.alt}</h3>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Gallery;
